const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const initSqlJs = require('sql.js');

const app = express();
const PORT = 5000;
const DB_PATH = path.join(__dirname, 'quantumresolve.db');

app.use(cors());
app.use(express.json());

let db;

// Save database changes to disk
function saveDatabase() {
  const data = db.export();
  fs.writeFileSync(DB_PATH, Buffer.from(data));
}

// Helper to run SELECT queries and return clean JS objects
function queryAll(sql, params = []) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const rows = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject());
  }
  stmt.free();
  return rows;
}

// Helper to run INSERT / UPDATE / DELETE queries
function runQuery(sql, params = []) {
  db.run(sql, params);
  saveDatabase();
}

// Format a database complaint row into the exact structure React expects
function formatComplaint(row) {
  return {
    id: row.id,
    title: row.title,
    category: row.category,
    location: row.location,
    description: row.description,
    priority: row.priority,
    status: row.status,
    studentName: row.studentName,
    studentRoll: row.studentRoll,
    department: row.department,
    date: row.date,
    estimatedResolution: row.estimatedResolution,
    assignedStaff: row.assignedStaff,
    adminRemarks: row.adminRemarks,
    staffRemarks: row.staffRemarks,
    timeline: row.timeline ? JSON.parse(row.timeline) : []
  };
}

// Initialize SQLite Database and Tables
initSqlJs().then((SQL) => {
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    db = new SQL.Database(fileBuffer);
  } else {
    db = new SQL.Database();
  }

  // 1. Create Users Table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      role TEXT NOT NULL,
      rollNumber TEXT,
      department TEXT,
      phone TEXT,
      room TEXT
    )
  `);

  // 2. Create Complaints Table
  db.run(`
    CREATE TABLE IF NOT EXISTS complaints (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      location TEXT NOT NULL,
      description TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      studentName TEXT NOT NULL,
      studentRoll TEXT,
      department TEXT DEFAULT 'Awaiting Assignment',
      date TEXT NOT NULL,
      estimatedResolution TEXT DEFAULT 'Under Review',
      assignedStaff TEXT DEFAULT 'Unassigned',
      adminRemarks TEXT DEFAULT '',
      staffRemarks TEXT DEFAULT '',
      timeline TEXT NOT NULL
    )
  `);

  // Seed initial users if database is brand new
  const userCount = queryAll('SELECT COUNT(*) as count FROM users')[0].count;
  if (userCount === 0) {
    runQuery(
      `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['STU-001', 'Rahul Sharma', 'student@college.edu', 'student', '21CSE045', 'Computer Science & Engineering', '+91 98765 43210', 'Hostel A - 302']
    );
    runQuery(
      `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['ADM-001', 'Dr. Arvind Swamy', 'admin.chief@college.edu', 'admin', null, 'Central Administration', '+91 98111 22233', 'Admin Block - 101']
    );
    runQuery(
      `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      ['DEP-001', 'Electrical & Maintenance Dept', 'electrical.dept@college.edu', 'department', null, 'Electrical & Maintenance', '+91 94444 55555', 'Maintenance Wing']
    );
  }

  // Seed initial sample complaints if database is brand new
  const complaintCount = queryAll('SELECT COUNT(*) as count FROM complaints')[0].count;
  if (complaintCount === 0) {
    const sampleTimeline1 = JSON.stringify([
      { status: 'Submitted', date: '2026-11-10 09:30 AM', note: 'Complaint logged by student.' },
      { status: 'In Progress', date: '2026-11-11 02:15 PM', note: 'Assigned to Electrical Department.' }
    ]);
    runQuery(
      `INSERT INTO complaints VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ['CMP-2026-001', 'Projector flickering in Room 302', 'Classroom', 'Block B, Room 302', 'The ceiling projector turns off every 10 minutes during lectures.', 'High', 'In Progress', 'Rahul Sharma', '21CSE045', 'Electrical & Maintenance', '2026-11-10', '2026-11-16', 'Mr. Ramesh Kumar', 'Assigned on priority.', 'Replacement bulb requested.', sampleTimeline1]
    );

    const sampleTimeline2 = JSON.stringify([
      { status: 'Submitted', date: '2026-11-12 08:10 PM', note: 'Complaint logged by student.' },
      { status: 'Pending', date: '2026-11-13 09:00 AM', note: 'Awaiting department assignment.' }
    ]);
    runQuery(
      `INSERT INTO complaints VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      ['CMP-2026-002', 'Hostel Wi-Fi low bandwidth on 3rd Floor', 'Internet/Wi-Fi', 'Hostel Block A, 3rd Floor', 'Wi-Fi speeds drop below 1 Mbps after 8 PM.', 'Medium', 'Pending', 'Ananya Gupta', '22CSE102', 'IT Services', '2026-11-12', 'Under Review', 'Unassigned', 'Under initial evaluation.', '', sampleTimeline2]
    );
  }

  saveDatabase();

  // ==================== API ROUTES ====================

  // 1. Login Endpoint
  app.post('/api/login', (req, res) => {
    const { email, role } = req.body;
    const existing = queryAll('SELECT * FROM users WHERE LOWER(email) = LOWER(?) AND role = ?', [email, role]);

    if (existing.length > 0) {
      return res.json(existing[0]);
    }

    // Create user record if logging in with a new institutional email
    const newUser = {
      id: `${role.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`,
      name: email.split('@')[0].replace('.', ' ').toUpperCase(),
      email: email,
      role: role,
      rollNumber: role === 'student' ? '21CSE099' : null,
      department: role === 'student' ? 'Computer Science & Engineering' : 'Central Administration',
      phone: '+91 98765 43210',
      room: role === 'student' ? 'Hostel B - 204' : null
    };

    runQuery(
      `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [newUser.id, newUser.name, newUser.email, newUser.role, newUser.rollNumber, newUser.department, newUser.phone, newUser.room]
    );

    res.json(newUser);
  });

  // 2. Register Student Endpoint
  app.post('/api/register', (req, res) => {
    const { name, email, rollNumber, department, phone, room } = req.body;
    const existing = queryAll('SELECT * FROM users WHERE LOWER(email) = LOWER(?)', [email]);

    if (existing.length > 0) {
      return res.json(existing[0]);
    }

    const newUser = {
      id: `STU-${Date.now().toString().slice(-4)}`,
      name,
      email,
      role: 'student',
      rollNumber: rollNumber || '21CSE000',
      department: department || 'Computer Science & Engineering',
      phone: phone || '',
      room: room || ''
    };

    runQuery(
      `INSERT INTO users VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [newUser.id, newUser.name, newUser.email, newUser.role, newUser.rollNumber, newUser.department, newUser.phone, newUser.room]
    );

    res.status(201).json(newUser);
  });

  // 3. Get All Complaints
  app.get('/api/complaints', (req, res) => {
    const rows = queryAll('SELECT * FROM complaints ORDER BY rowid DESC');
    res.json(rows.map(formatComplaint));
  });

  // 4. Create New Complaint
  app.post('/api/complaints', (req, res) => {
    const { title, category, location, description, priority, studentName, studentRoll } = req.body;
    const count = queryAll('SELECT COUNT(*) as count FROM complaints')[0].count;
    const newId = `CMP-2026-${(count + 1).toString().padStart(3, '0')}`;
    const today = new Date().toISOString().split('T')[0];

    const initialTimeline = [
      { status: 'Submitted', date: new Date().toLocaleString(), note: 'Complaint filed online.' },
      { status: 'Pending', date: new Date().toLocaleString(), note: 'Queued for central admin assignment.' }
    ];

    runQuery(
      `INSERT INTO complaints VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        newId,
        title,
        category,
        location,
        description,
        priority,
        'Pending',
        studentName || 'Rahul Sharma',
        studentRoll || '21CSE045',
        'Awaiting Assignment',
        today,
        'Under Review',
        'Unassigned',
        '',
        '',
        JSON.stringify(initialTimeline)
      ]
    );

    const created = queryAll('SELECT * FROM complaints WHERE id = ?', [newId])[0];
    res.status(201).json(formatComplaint(created));
  });

  // 5. Admin Update Complaint (Status, Department, Remarks)
  app.put('/api/complaints/:id/admin', (req, res) => {
    const { id } = req.params;
    const { status, adminRemarks, department } = req.body;

    const existing = queryAll('SELECT * FROM complaints WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Not found' });

    const current = formatComplaint(existing[0]);
    const updatedTimeline = [
      ...current.timeline,
      { status, date: new Date().toLocaleString(), note: adminRemarks || `Status updated to ${status} by Admin` }
    ];

    runQuery(
      `UPDATE complaints SET status = ?, adminRemarks = ?, department = ?, timeline = ? WHERE id = ?`,
      [status, adminRemarks || current.adminRemarks, department || current.department, JSON.stringify(updatedTimeline), id]
    );

    const updated = queryAll('SELECT * FROM complaints WHERE id = ?', [id])[0];
    res.json(formatComplaint(updated));
  });

  // 6. Department Staff Update Complaint (Status, Staff Remarks, Est. Date)
  app.put('/api/complaints/:id/department', (req, res) => {
    const { id } = req.params;
    const { status, staffRemarks, estimatedResolution } = req.body;

    const existing = queryAll('SELECT * FROM complaints WHERE id = ?', [id]);
    if (existing.length === 0) return res.status(404).json({ error: 'Not found' });

    const current = formatComplaint(existing[0]);
    const updatedTimeline = [
      ...current.timeline,
      { status, date: new Date().toLocaleString(), note: staffRemarks || `Maintenance staff updated status to ${status}` }
    ];

    runQuery(
      `UPDATE complaints SET status = ?, staffRemarks = ?, estimatedResolution = ?, timeline = ? WHERE id = ?`,
      [status, staffRemarks || current.staffRemarks, estimatedResolution || current.estimatedResolution, JSON.stringify(updatedTimeline), id]
    );

    const updated = queryAll('SELECT * FROM complaints WHERE id = ?', [id])[0];
    res.json(formatComplaint(updated));
  });

  app.listen(PORT, () => {
    console.log(`QuantumResolve Backend & SQLite Database running on http://localhost:${PORT}`);
  });
});