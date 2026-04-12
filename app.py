"""
Sanjeevini Convent School - Admission Form Application
Flask backend with SQLite database
"""

from flask import Flask, render_template, request, jsonify, send_file
import sqlite3
import json
import os
from datetime import datetime
import io

app = Flask(__name__)
DB_PATH = os.path.join(os.path.dirname(__file__), 'admissions.db')


# ─────────────────────────────────────────────
#  DATABASE SETUP
# ─────────────────────────────────────────────

def get_db():
    """Open a database connection."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Create the admissions table if it doesn't exist."""
    conn = get_db()
    conn.execute('''
        CREATE TABLE IF NOT EXISTS admissions (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id      TEXT UNIQUE NOT NULL,
            created_at      TEXT NOT NULL,
            updated_at      TEXT NOT NULL,
            form_data       TEXT NOT NULL   -- entire form as JSON
        )
    ''')
    conn.commit()
    conn.close()
    print("✅ Database initialised at:", DB_PATH)


def generate_student_id():
    """Generate a unique student ID like SCS-2024-0001."""
    conn = get_db()
    row = conn.execute('SELECT COUNT(*) as cnt FROM admissions').fetchone()
    count = row['cnt'] + 1
    conn.close()
    year = datetime.now().year
    return f"SCS-{year}-{count:04d}"


# ─────────────────────────────────────────────
#  ROUTES
# ─────────────────────────────────────────────

@app.route('/')
def index():
    """Render the main admission form page."""
    return render_template('index.html')


@app.route('/records')
def records():
    """Render the saved records page."""
    return render_template('records.html')


@app.route('/api/save', methods=['POST'])
def save_form():
    """Save or update an admission form record."""
    data = request.get_json()
    if not data:
        return jsonify({'success': False, 'error': 'No data received'}), 400

    now = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    existing_id = data.get('student_id', '').strip()

    conn = get_db()
    try:
        if existing_id:
            # Update existing record
            conn.execute(
                'UPDATE admissions SET form_data=?, updated_at=? WHERE student_id=?',
                (json.dumps(data), now, existing_id)
            )
            conn.commit()
            return jsonify({'success': True, 'student_id': existing_id, 'action': 'updated'})
        else:
            # Insert new record
            student_id = generate_student_id()
            data['student_id'] = student_id
            conn.execute(
                'INSERT INTO admissions (student_id, created_at, updated_at, form_data) VALUES (?,?,?,?)',
                (student_id, now, now, json.dumps(data))
            )
            conn.commit()
            return jsonify({'success': True, 'student_id': student_id, 'action': 'saved'})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
    finally:
        conn.close()


@app.route('/api/records', methods=['GET'])
def get_records():
    """Return all admission records (id, name, date) for listing."""
    search = request.args.get('q', '').strip().lower()
    conn = get_db()
    rows = conn.execute(
        'SELECT student_id, form_data, created_at FROM admissions ORDER BY id DESC'
    ).fetchall()
    conn.close()

    results = []
    for row in rows:
        fd = json.loads(row['form_data'])
        name = fd.get('pupil_name', '').strip()
        sid  = row['student_id']
        if search and search not in name.lower() and search not in sid.lower():
            continue
        results.append({
            'student_id': sid,
            'name': name,
            'created_at': row['created_at'],
            'sex': fd.get('sex', ''),
            'dob_day': fd.get('dob_day', ''),
            'dob_month': fd.get('dob_month', ''),
            'dob_year': fd.get('dob_year', ''),
        })
    return jsonify(results)


@app.route('/api/record/<student_id>', methods=['GET'])
def get_record(student_id):
    """Return a single record's full form data."""
    conn = get_db()
    row = conn.execute(
        'SELECT form_data FROM admissions WHERE student_id=?', (student_id,)
    ).fetchone()
    conn.close()
    if not row:
        return jsonify({'error': 'Record not found'}), 404
    return jsonify(json.loads(row['form_data']))


@app.route('/api/record/<student_id>', methods=['DELETE'])
def delete_record(student_id):
    """Delete an admission record."""
    conn = get_db()
    conn.execute('DELETE FROM admissions WHERE student_id=?', (student_id,))
    conn.commit()
    conn.close()
    return jsonify({'success': True})


@app.route('/print/<student_id>')
def print_form(student_id):
    """Render print-ready form for a given student."""
    conn = get_db()
    row = conn.execute(
        'SELECT form_data FROM admissions WHERE student_id=?', (student_id,)
    ).fetchone()
    conn.close()
    if not row:
        return "Record not found", 404
    fd = json.loads(row['form_data'])
    return render_template('print_form.html', data=fd)


# ─────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────

if __name__ == '__main__':
    init_db()
    print("🏫 Starting Sanjeevini Convent School Admission System...")
    print("🌐 Open http://localhost:5000 in your browser")
    app.run(debug=True, port=5000)
