-- Correct SQL Schema for KSBA School (matches JavaScript data structure)

-- Students Table (matches JavaScript structure)
CREATE TABLE students (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  roll_number TEXT UNIQUE NOT NULL,
  class TEXT NOT NULL,
  section TEXT,
  age INTEGER,
  parent_name TEXT,
  parent_contact TEXT,
  parent_email TEXT,
  address TEXT,
  admission_date DATE,
  status TEXT DEFAULT 'active',
  original_admission_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Admissions Table (matches JavaScript structure)
CREATE TABLE admissions (
  id BIGINT PRIMARY KEY,
  name TEXT NOT NULL,
  age INTEGER NOT NULL,
  class_applied TEXT NOT NULL,
  parent_name TEXT NOT NULL,
  parent_contact TEXT NOT NULL,
  parent_email TEXT,
  address TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  application_date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Announcements Table
CREATE TABLE announcements (
  id BIGINT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE NOT NULL,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Results Table
CREATE TABLE results (
  id BIGINT PRIMARY KEY,
  student_name TEXT NOT NULL,
  roll_number TEXT NOT NULL,
  class TEXT NOT NULL,
  section TEXT,
  exam_type TEXT NOT NULL,
  subjects JSONB NOT NULL,
  total_marks INTEGER NOT NULL,
  max_marks INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  grade TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Routines Table
CREATE TABLE routines (
  id BIGINT PRIMARY KEY,
  class TEXT NOT NULL,
  routine_type TEXT NOT NULL,
  title TEXT NOT NULL,
  time_slots JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE admissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE results ENABLE ROW LEVEL SECURITY;
ALTER TABLE routines ENABLE ROW LEVEL SECURITY;

-- Allow public access (for demo - tighten security in production)
CREATE POLICY "Allow all operations" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON admissions FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON announcements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all operations" ON routines FOR ALL USING (true) WITH CHECK (true);

-- Optional: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_students_roll_number ON students(roll_number);
CREATE INDEX IF NOT EXISTS idx_admissions_status ON admissions(status);
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status);
CREATE INDEX IF NOT EXISTS idx_results_roll_number ON results(roll_number);
CREATE INDEX IF NOT EXISTS idx_routines_class ON routines(class);
