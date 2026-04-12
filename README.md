# 🏫 Sanjeevini Convent School – Admission Form System

A digital version of the physical school admission form that exactly replicates
the layout of the original paper form.

---

## 📁 Project Structure

```
sanjeevini_school/
├── app.py                  # Flask backend (routes + SQLite logic)
├── requirements.txt        # Python dependencies
├── admissions.db           # SQLite database (auto-created on first run)
├── templates/
│   ├── index.html          # Main admission form page
│   ├── records.html        # Saved records listing page
│   └── print_form.html     # Print-ready form (exact replica layout)
└── static/
    ├── css/
    │   └── style.css       # All styling (form + app UI + print)
    └── js/
        └── form.js         # Save / Load / Print / PDF logic
```

---

## ⚡ Quick Start

### Step 1 – Install Python (if not installed)
Download from https://www.python.org/downloads/ (Python 3.8+)

### Step 2 – Install dependencies
```bash
cd sanjeevini_school
pip install -r requirements.txt
```

### Step 3 – Run the app
```bash
python app.py
```

### Step 4 – Open in browser
```
http://localhost:5000
```

---

## 🎯 How to Use

### Fill a New Form
1. Open http://localhost:5000
2. Fill in all the fields (same layout as the paper form)
3. Click **💾 Save Record** → A unique Student ID is assigned (e.g. SCS-2024-0001)

### Print the Form
- Click **🖨️ Print Form** → Opens a print-ready page
- Press Ctrl+P (or click Print button) to print

### Export as PDF
- Click **📄 Download PDF** → Opens print dialog
- In the print dialog, select **"Save as PDF"** as the printer
- The PDF will look exactly like the printed form

### View Saved Records
- Click **📋 View Records** in the navbar
- Search by student name or ID
- Click **✏️ Edit** to load a record back into the form
- Click **🖨️ Print** to print directly from records list
- Click **🗑️ Delete** to permanently remove a record

### Keyboard Shortcut
- **Ctrl + S** (or Cmd + S on Mac) = Save the current form

---

## 🗄️ Database

- SQLite database file: `admissions.db` (auto-created)
- Each record stores the complete form as JSON
- Student IDs format: `SCS-YYYY-NNNN` (e.g. SCS-2024-0001)

---

## 🖨️ Print / PDF Tips

- The print layout exactly matches the original paper form
- Use **A4** paper size in print settings
- Set margins to **Default** or **Minimum**
- Disable "Print headers and footers" for cleanest output
- For PDF: In Chrome, use "Save as PDF" destination

---

## 🔧 Troubleshooting

**Port already in use?**
```bash
python app.py  # app runs on port 5000 by default
```
Change port in app.py: `app.run(port=5001)`

**Database issues?**
Delete `admissions.db` and restart – it will be recreated automatically.

---

## 📋 Features Summary

| Feature | Status |
|---------|--------|
| Form UI matches physical form 1:1 | ✅ |
| All fields editable | ✅ |
| SQLite local storage | ✅ |
| Unique Student ID per record | ✅ |
| Print-ready layout | ✅ |
| PDF export via browser | ✅ |
| View/search saved records | ✅ |
| Load & edit existing records | ✅ |
| Delete records | ✅ |
| Keyboard shortcut (Ctrl+S) | ✅ |
