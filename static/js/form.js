/**
 * Sanjeevini Convent School – Admission Form JS
 * Handles: save, load, print, PDF download, form reset
 */

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

function showToast(msg, type = 'default') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = `toast ${type}`;
  setTimeout(() => t.classList.add('hidden'), 3500);
}

function getVal(id)       { return (document.getElementById(id)?.value || '').trim(); }
function setVal(id, val)  { const el = document.getElementById(id); if (el) el.value = val || ''; }
function setChecked(name, val) {
  document.querySelectorAll(`input[name="${name}"]`).forEach(r => {
    r.checked = (r.value === val);
  });
}
function getRadio(name) {
  const sel = document.querySelector(`input[name="${name}"]:checked`);
  return sel ? sel.value : '';
}
function getCheckbox(id) {
  return document.getElementById(id)?.checked ? true : false;
}
function setCheckbox(id, val) {
  const el = document.getElementById(id);
  if (el) el.checked = !!val;
}

// ─────────────────────────────────────────────
//  COLLECT FORM DATA → JS Object
// ─────────────────────────────────────────────

function collectFormData() {
  return {
    // IDs
    student_id: getVal('current_student_id'),   // hidden holder

    // Header
    serial_no:   getVal('serial_no'),
    form_date:   getVal('form_date'),

    // Office (top)
    o_standard:  getVal('o_standard'),
    o_sec:       getVal('o_sec'),
    o_admn:      getVal('o_admn'),
    o_hm:        getVal('o_hm'),
    o_principal: getVal('o_principal'),

    // 1-3
    pupil_name:  getVal('pupil_name'),
    sex:         getRadio('sex'),
    dob_day:     getVal('dob_day'),
    dob_month:   getVal('dob_month'),
    dob_year:    getVal('dob_year'),
    dob_words:   getVal('dob_words'),

    // 4
    village:  getVal('village'),
    town:     getVal('town'),
    taluk:    getVal('taluk'),
    district: getVal('district'),
    state:    getVal('state'),

    // 5
    father_name:      getVal('father_name'),
    father_qual:      getVal('father_qual'),
    father_occ:       getVal('father_occ'),
    father_income:    getVal('father_income'),
    father_living:    getCheckbox('father_living'),
    father_not_living:getCheckbox('father_not_living'),

    mother_name:      getVal('mother_name'),
    mother_qual:      getVal('mother_qual'),
    mother_occ:       getVal('mother_occ'),
    mother_income:    getVal('mother_income'),
    mother_living:    getCheckbox('mother_living'),
    mother_not_living:getCheckbox('mother_not_living'),

    grandfather_name: getVal('grandfather_name'),

    // 6
    child_aadhar:  getVal('child_aadhar'),
    father_aadhar: getVal('father_aadhar'),
    mother_aadhar: getVal('mother_aadhar'),
    ration_card:   getVal('ration_card'),
    bank_ac:       getVal('bank_ac'),
    ifsc:          getVal('ifsc'),
    dise_no:       getVal('dise_no'),

    // 7-10
    nationality:     getVal('nationality'),
    religion:        getVal('religion'),
    caste:           getVal('caste'),
    sub_caste:       getVal('sub_caste'),
    sc_no:           getVal('sc_no'),
    sc_date:         getVal('sc_date'),
    mother_tongue:   getVal('mother_tongue'),
    other_languages: getVal('other_languages'),

    // 11-12 Address
    parent_address1:   getVal('parent_address1'),
    parent_address2:   getVal('parent_address2'),
    parent_address3:   getVal('parent_address3'),
    parent_address4:   getVal('parent_address4'),
    guardian_address1: getVal('guardian_address1'),
    guardian_address2: getVal('guardian_address2'),
    guardian_address3: getVal('guardian_address3'),
    guardian_address4: getVal('guardian_address4'),

    // 13 Previous School
    prev_school_1: getVal('prev_school_1'),
    prev_class_1:  getVal('prev_class_1'),
    prev_year_1:   getVal('prev_year_1'),
    prev_school_2: getVal('prev_school_2'),
    prev_class_2:  getVal('prev_class_2'),
    prev_year_2:   getVal('prev_year_2'),
    prev_school_3: getVal('prev_school_3'),
    prev_class_3:  getVal('prev_class_3'),
    prev_year_3:   getVal('prev_year_3'),

    // 14-16
    slc:          getRadio('slc'),
    slc_no_num:   getVal('slc_no_num'),
    vacc:         getRadio('vacc'),
    vacc_cert:    getRadio('vacc_cert'),
    medium:       getVal('medium'),

    // Declaration
    admission_class: getVal('admission_class'),
    sign_date:       getVal('sign_date'),
    parent_sign:     getVal('parent_sign'),

    // Office (bottom)
    o2_standard: getVal('o2_standard'),
    o2_sec:      getVal('o2_sec'),
    o2_receipt:  getVal('o2_receipt'),

    // Final declaration
    decl_applicant: getVal('decl_applicant'),
    decl_parent:    getVal('decl_parent'),
  };
}

// ─────────────────────────────────────────────
//  POPULATE FORM FROM Object
// ─────────────────────────────────────────────

function populateForm(d) {
  // Store the student_id in a hidden input
  setVal('current_student_id', d.student_id || '');

  setVal('serial_no', d.serial_no);
  setVal('form_date', d.form_date);
  setVal('o_standard', d.o_standard);
  setVal('o_sec', d.o_sec);
  setVal('o_admn', d.o_admn);
  setVal('o_hm', d.o_hm);
  setVal('o_principal', d.o_principal);

  setVal('pupil_name', d.pupil_name);
  setChecked('sex', d.sex);
  setVal('dob_day', d.dob_day);
  setVal('dob_month', d.dob_month);
  setVal('dob_year', d.dob_year);
  setVal('dob_words', d.dob_words);

  setVal('village', d.village);
  setVal('town', d.town);
  setVal('taluk', d.taluk);
  setVal('district', d.district);
  setVal('state', d.state);

  setVal('father_name', d.father_name);
  setVal('father_qual', d.father_qual);
  setVal('father_occ', d.father_occ);
  setVal('father_income', d.father_income);
  setCheckbox('father_living', d.father_living);
  setCheckbox('father_not_living', d.father_not_living);

  setVal('mother_name', d.mother_name);
  setVal('mother_qual', d.mother_qual);
  setVal('mother_occ', d.mother_occ);
  setVal('mother_income', d.mother_income);
  setCheckbox('mother_living', d.mother_living);
  setCheckbox('mother_not_living', d.mother_not_living);

  setVal('grandfather_name', d.grandfather_name);

  setVal('child_aadhar', d.child_aadhar);
  setVal('father_aadhar', d.father_aadhar);
  setVal('mother_aadhar', d.mother_aadhar);
  setVal('ration_card', d.ration_card);
  setVal('bank_ac', d.bank_ac);
  setVal('ifsc', d.ifsc);
  setVal('dise_no', d.dise_no);

  setVal('nationality', d.nationality);
  setVal('religion', d.religion);
  setVal('caste', d.caste);
  setVal('sub_caste', d.sub_caste);
  setVal('sc_no', d.sc_no);
  setVal('sc_date', d.sc_date);
  setVal('mother_tongue', d.mother_tongue);
  setVal('other_languages', d.other_languages);

  setVal('parent_address1', d.parent_address1);
  setVal('parent_address2', d.parent_address2);
  setVal('parent_address3', d.parent_address3);
  setVal('parent_address4', d.parent_address4);
  setVal('guardian_address1', d.guardian_address1);
  setVal('guardian_address2', d.guardian_address2);
  setVal('guardian_address3', d.guardian_address3);
  setVal('guardian_address4', d.guardian_address4);

  setVal('prev_school_1', d.prev_school_1);
  setVal('prev_class_1',  d.prev_class_1);
  setVal('prev_year_1',   d.prev_year_1);
  setVal('prev_school_2', d.prev_school_2);
  setVal('prev_class_2',  d.prev_class_2);
  setVal('prev_year_2',   d.prev_year_2);
  setVal('prev_school_3', d.prev_school_3);
  setVal('prev_class_3',  d.prev_class_3);
  setVal('prev_year_3',   d.prev_year_3);

  setChecked('slc', d.slc);
  setVal('slc_no_num', d.slc_no_num);
  setChecked('vacc', d.vacc);
  setChecked('vacc_cert', d.vacc_cert);
  setVal('medium', d.medium);

  setVal('admission_class', d.admission_class);
  setVal('sign_date', d.sign_date);
  setVal('parent_sign', d.parent_sign);

  setVal('o2_standard', d.o2_standard);
  setVal('o2_sec', d.o2_sec);
  setVal('o2_receipt', d.o2_receipt);

  setVal('decl_applicant', d.decl_applicant);
  setVal('decl_parent', d.decl_parent);
}

// ─────────────────────────────────────────────
//  SAVE FORM
// ─────────────────────────────────────────────

async function saveForm() {
  const data = collectFormData();
  if (!data.pupil_name) {
    showToast('⚠️ Please enter the pupil name first.', 'error');
    return;
  }
  try {
    const resp = await fetch('/api/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await resp.json();
    if (result.success) {
      // Store the assigned student ID
      setVal('current_student_id', result.student_id);
      document.getElementById('current-sid').textContent = result.student_id;
      document.getElementById('student-id-badge').classList.add('visible');

      const action = result.action === 'updated' ? 'updated' : 'saved';
      showToast(`✅ Record ${action}! ID: ${result.student_id}`, 'success');
    } else {
      showToast('❌ Save failed: ' + result.error, 'error');
    }
  } catch (err) {
    showToast('❌ Network error: ' + err.message, 'error');
  }
}

// ─────────────────────────────────────────────
//  PRINT
// ─────────────────────────────────────────────

async function printForm() {
  const sid = getVal('current_student_id');
  if (!sid) {
    // Auto-save first, then print
    await saveForm();
    const sid2 = getVal('current_student_id');
    if (!sid2) { showToast('⚠️ Save failed. Cannot print.', 'error'); return; }
    window.open(`/print/${sid2}`, '_blank');
    return;
  }
  window.open(`/print/${sid}`, '_blank');
}

// ─────────────────────────────────────────────
//  PDF DOWNLOAD (browser print-to-PDF)
// ─────────────────────────────────────────────

async function downloadPDF() {
  const sid = getVal('current_student_id');
  if (!sid) {
    await saveForm();
    const sid2 = getVal('current_student_id');
    if (!sid2) { showToast('⚠️ Save failed. Cannot generate PDF.', 'error'); return; }
    openPDFWindow(sid2);
    return;
  }
  openPDFWindow(sid);
}

function openPDFWindow(sid) {
  const win = window.open(`/print/${sid}`, '_blank');
  if (win) {
    win.addEventListener('load', () => {
      setTimeout(() => win.print(), 400);
    });
    showToast('📄 Use "Save as PDF" in the print dialog.', 'success');
  }
}

// ─────────────────────────────────────────────
//  RESET FORM
// ─────────────────────────────────────────────

function resetForm() {
  if (!confirm('Start a new form? Unsaved changes will be lost.')) return;
  document.querySelectorAll('input[type="text"], input[type="date"]').forEach(el => el.value = '');
  document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(el => el.checked = false);
  setVal('current_student_id', '');
  document.getElementById('student-id-badge').classList.remove('visible');
  document.getElementById('current-sid').textContent = '';
  window.scrollTo(0, 0);
  showToast('🆕 New form started.', 'default');
}

// ─────────────────────────────────────────────
//  LOAD EXISTING RECORD (from URL param)
// ─────────────────────────────────────────────

async function loadFromURL() {
  const params = new URLSearchParams(window.location.search);
  const sid = params.get('load');
  if (!sid) return;

  try {
    const resp = await fetch(`/api/record/${encodeURIComponent(sid)}`);
    if (!resp.ok) { showToast('⚠️ Record not found.', 'error'); return; }
    const data = await resp.json();
    populateForm(data);
    document.getElementById('current-sid').textContent = sid;
    document.getElementById('student-id-badge').classList.add('visible');
    showToast(`✅ Loaded record: ${sid}`, 'success');
    // Clean URL
    window.history.replaceState({}, '', '/');
  } catch (err) {
    showToast('❌ Failed to load record.', 'error');
  }
}

// ─────────────────────────────────────────────
//  HIDDEN INPUT for current student ID
// ─────────────────────────────────────────────

function ensureHiddenInput() {
  if (!document.getElementById('current_student_id')) {
    const inp = document.createElement('input');
    inp.type = 'hidden';
    inp.id   = 'current_student_id';
    inp.value = '';
    document.body.appendChild(inp);
  }
}

// ─────────────────────────────────────────────
//  INIT
// ─────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  ensureHiddenInput();
  loadFromURL();

  // Set today's date as default for form_date
  if (!getVal('form_date')) {
    const today = new Date().toISOString().split('T')[0];
    setVal('form_date', today);
  }

  // Keyboard shortcut: Ctrl+S = Save
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
      saveForm();
    }
  });
});
