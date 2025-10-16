# KSBA School Management System - CSV Template Guide

## 📋 Bulk Results Upload Instructions

This guide explains how to use the CSV template for bulk uploading student results to the KSBA School Management System.

## 📥 Getting the Template

1. **Login to Admin Panel** with password: `admin123`
2. **Go to Results Section** in the admin dashboard
3. **Click "📥 Download Template"** button
4. **Save the file** as `KSBA_Results_Template.csv`

## 📊 CSV Format Structure

### Required Columns (First 4):
- **studentName** - Full name of the student
- **rollNumber** - Unique roll number (e.g., KS001, KS002)
- **class** - Class name (e.g., Class 10, Class 9, LKG, UKG)
- **examType** - Type of exam (e.g., Final Term, Mid Term, First Term, Annual)

### Subject Columns (Groups of 3):
For each subject, you need 3 columns:
- **subjectXName** - Name of the subject (e.g., Mathematics, Science, English)
- **subjectXMarks** - Marks obtained by student (e.g., 95, 88, 92)
- **subjectXTotal** - Total marks for the subject (e.g., 100, 50)

### Example Format:
```csv
studentName,rollNumber,class,examType,subject1Name,subject1Marks,subject1Total,subject2Name,subject2Marks,subject2Total
John Doe,KS001,Class 10,Final Term,Mathematics,95,100,Science,88,100
```

## 🎯 Sample Data Included

The template includes sample data for:
- **Class 10 Students** - 5 subjects (Math, Science, English, Social Studies, Hindi)
- **Class 9 Students** - 5 subjects with different exam types
- **Class 8 Students** - First Term results
- **Class 7 Students** - Annual exam results
- **LKG/UKG Students** - 3-4 subjects with 50 marks total

## ✅ Data Validation Rules

### Student Information:
- **Student Name**: Required, cannot be empty
- **Roll Number**: Required, should be unique
- **Class**: Must match available classes (LKG, UKG, Class 1-10)
- **Exam Type**: Common types (Final Term, Mid Term, First Term, Annual)

### Subject Information:
- **Subject Name**: Required if marks are provided
- **Marks Obtained**: Must be a number, cannot exceed total marks
- **Total Marks**: Must be a positive number (usually 100 or 50)

### Automatic Calculations:
- **Total Marks**: Sum of all subject marks
- **Percentage**: (Total Obtained / Total Maximum) × 100
- **Grade**: Automatically assigned based on percentage
  - A+ (90-100%)
  - A (80-89%)
  - B (70-79%)
  - C (60-69%)
  - D (50-59%)
  - F (Below 50%)

## 📝 How to Fill the Template

### Step 1: Open in Excel/Google Sheets
- Open the downloaded CSV file in Excel or Google Sheets
- **Do not change the header row** (first row)

### Step 2: Replace Sample Data
- Delete the sample data rows (keep the header)
- Add your actual student data

### Step 3: Subject Configuration
- **Minimum**: 1 subject per student
- **Maximum**: 5 subjects per student (can be extended)
- **Leave empty**: If a student has fewer subjects, leave those columns empty

### Step 4: Save as CSV
- **File → Save As → CSV format**
- Ensure it's saved as `.csv` extension

## 🚀 Upload Process

### Step 1: Upload File
- Drag and drop the CSV file to the upload zone
- Or click to select the file from your computer

### Step 2: Process Data
- Click "🔄 Process CSV File" button
- System will validate and parse your data

### Step 3: Preview Results
- Review the parsed data in the preview table
- Check statistics (total results, classes, exam types)

### Step 4: Confirm Upload
- Click "✅ Confirm & Upload All Results" if data looks correct
- Or click "❌ Cancel" to make changes

## ⚠️ Common Issues & Solutions

### Issue: "No valid results found"
**Solution**: Ensure each row has at least:
- Student name, roll number, class, exam type
- At least one complete subject (name, marks, total)

### Issue: "Error parsing CSV"
**Solution**: Check for:
- Commas within text (use quotes: "Smith, John")
- Missing required fields
- Invalid characters or formatting

### Issue: "File size too large"
**Solution**: 
- Maximum file size is 5MB
- Split large files into smaller batches

### Issue: Incorrect grades calculated
**Solution**: Verify:
- Marks don't exceed total marks
- Total marks are positive numbers
- All numeric fields contain valid numbers

## 📊 Example Data Formats

### High School (Class 9-10):
```csv
studentName,rollNumber,class,examType,subject1Name,subject1Marks,subject1Total,subject2Name,subject2Marks,subject2Total,subject3Name,subject3Marks,subject3Total,subject4Name,subject4Marks,subject4Total,subject5Name,subject5Marks,subject5Total
John Doe,KS001,Class 10,Final Term,Mathematics,95,100,Science,88,100,English,92,100,Social Studies,85,100,Hindi,90,100
```

### Primary School (LKG/UKG):
```csv
studentName,rollNumber,class,examType,subject1Name,subject1Marks,subject1Total,subject2Name,subject2Marks,subject2Total,subject3Name,subject3Marks,subject3Total
Alex Miller,KS009,LKG,Final Term,English,45,50,Mathematics,42,50,Drawing,48,50
```

## 🔧 Technical Specifications

- **File Format**: CSV (Comma Separated Values)
- **Encoding**: UTF-8 with BOM for Excel compatibility
- **Maximum File Size**: 5MB
- **Maximum Records**: No limit (memory dependent)
- **Supported Characters**: All Unicode characters
- **Date Format**: System automatically adds current date

## 📞 Support

If you encounter issues:
1. Check this guide for common solutions
2. Verify your CSV format matches the template
3. Ensure all required fields are filled
4. Try with a smaller sample first

## 🎉 Success Tips

- **Start Small**: Test with 2-3 students first
- **Use Template**: Always start with the downloaded template
- **Double Check**: Review data in preview before confirming
- **Backup**: Keep a copy of your original data
- **Consistent Format**: Use consistent naming for classes and subjects

---

**KSBA School Management System v1.0**  
*Excellence in Education - Digital Management*
