/**
 * KSBA School Management System - Complete JavaScript Application
 * A fully functional web app with local storage and Google Sheets integration
 */

// Application Configuration
const CONFIG = {
    ADMIN_PASSWORD: 'admin123',
    STORAGE_KEY: 'ksba_school_data',
    GOOGLE_SHEETS_URL: '', // Will be set when connected to Google Sheets
    VERSION: '1.0.0'
};

// Application State
let appState = {
    currentPage: 'home',
    isAdminLoggedIn: false,
    currentAdminSection: 'overview',
    data: {
        students: [],
        admissions: [],
        announcements: [],
        results: [],
        routines: []
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🏫 KSBA School Management System v' + CONFIG.VERSION);
    
    // Load data from localStorage
    loadAppData();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Load initial data
    loadInitialData();
    
    // Add debug info
    console.log('📊 Current app state:', appState);
    console.log('👥 Students loaded:', appState.data.students.length);
    console.log('📝 Admissions loaded:', appState.data.admissions.length);
    
    // Show home page
    showPage('home');
    
    console.log('✅ Application initialized successfully');
});

// Data Management Functions
function loadAppData() {
    try {
        const savedData = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            appState.data = { ...appState.data, ...parsedData };
            console.log('📁 Data loaded from localStorage');
        }
    } catch (error) {
        console.error('❌ Error loading data:', error);
    }
}

function saveAppData() {
    try {
        localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(appState.data));
        console.log('💾 Data saved to localStorage');
    } catch (error) {
        console.error('❌ Error saving data:', error);
    }
}

function loadInitialData() {
    if (appState.data.announcements.length === 0) {
        appState.data.announcements = [
            {
                id: 1,
                title: 'Welcome to New Academic Year 2025',
                content: 'Classes will commence from January 15, 2025. All students are requested to report on time with proper uniform and books.',
                date: '2024-12-28',
                status: 'active'
            },
            {
                id: 2,
                title: 'Annual Sports Day',
                content: 'Our annual sports day will be held on February 14, 2025. Participation is mandatory for all students.',
                date: '2024-12-25',
                status: 'active'
            }
        ];
    }

    // Add sample students if none exist (for testing)
    if (appState.data.students.length === 0) {
        appState.data.students = [
            {
                id: 1001,
                name: 'Aarav Sharma',
                rollNumber: 'KS25001',
                class: 'Class 5',
                section: 'A',
                age: 11,
                parent_name: 'Rajesh Sharma',
                parent_contact: '+91-9876543210',
                parent_email: 'rajesh.sharma@email.com',
                address: '123 Main Street, Delhi',
                admissionDate: '2024-01-15',
                status: 'active',
                originalAdmissionId: 1
            },
            {
                id: 1002,
                name: 'Priya Patel',
                rollNumber: 'KS25002',
                class: 'Class 6',
                section: 'B',
                age: 12,
                parent_name: 'Suresh Patel',
                parent_contact: '+91-9876543211',
                parent_email: 'suresh.patel@email.com',
                address: '456 Park Avenue, Mumbai',
                admissionDate: '2024-01-16',
                status: 'active',
                originalAdmissionId: 2
            }
        ];
        
        console.log('📚 Sample students added for testing');
        saveAppData();
    }

    // Add sample admissions if none exist (for testing)
    if (appState.data.admissions.length === 0) {
        appState.data.admissions = [
            {
                id: 2001,
                name: 'Rohit Kumar',
                age: 10,
                class: 'Class 4',
                class_applied: 'Class 4',
                parent_name: 'Sunil Kumar',
                parent_contact: '+91-9876543212',
                parent_email: 'sunil.kumar@email.com',
                address: '789 School Road, Bangalore',
                applicationDate: '2024-12-20',
                status: 'pending'
            },
            {
                id: 2002,
                name: 'Anita Singh',
                age: 13,
                class: 'Class 7',
                class_applied: 'Class 7',
                parent_name: 'Ramesh Singh',
                parent_contact: '+91-9876543213',
                parent_email: 'ramesh.singh@email.com',
                address: '321 Garden Street, Chennai',
                applicationDate: '2024-12-22',
                status: 'approved'
            },
            {
                id: 2003,
                name: 'Vikash Patel',
                age: 8,
                class: 'Class 2',
                class_applied: 'Class 2',
                parent_name: 'Mahesh Patel',
                parent_contact: '+91-9876543214',
                parent_email: 'mahesh.patel@email.com',
                address: '654 Market Lane, Pune',
                applicationDate: '2024-12-25',
                status: 'rejected'
            }
        ];
        
        console.log('📝 Sample admissions added for testing');
        saveAppData();
    }

    if (appState.data.results.length === 0) {
        appState.data.results = [
            {
                id: 1,
                studentName: 'Aarav Sharma',
                rollNumber: 'KS001',
                class: 'Class 10',
                section: 'A',
                examType: 'Final Term',
                subjects: [
                    { name: 'Mathematics', marks: 95, totalMarks: 100 },
                    { name: 'Science', marks: 88, totalMarks: 100 },
                    { name: 'English', marks: 92, totalMarks: 100 },
                    { name: 'Social Studies', marks: 85, totalMarks: 100 }
                ],
                totalMarks: 360,
                maxMarks: 400,
                percentage: 90,
                grade: 'A+'
            },
            {
                id: 2,
                studentName: 'Priya Patel',
                rollNumber: 'KS002',
                class: 'Class 10',
                section: 'B',
                examType: 'Final Term',
                subjects: [
                    { name: 'Mathematics', marks: 87, totalMarks: 100 },
                    { name: 'Science', marks: 91, totalMarks: 100 },
                    { name: 'English', marks: 89, totalMarks: 100 },
                    { name: 'Social Studies', marks: 82, totalMarks: 100 }
                ],
                totalMarks: 349,
                maxMarks: 400,
                percentage: 87,
                grade: 'A'
            },
            {
                id: 3,
                studentName: 'Rahul Kumar',
                rollNumber: 'KS003',
                class: 'Class 9',
                section: 'A',
                examType: 'Mid Term',
                subjects: [
                    { name: 'Mathematics', marks: 78, totalMarks: 100 },
                    { name: 'Science', marks: 82, totalMarks: 100 },
                    { name: 'English', marks: 85, totalMarks: 100 },
                    { name: 'Hindi', marks: 80, totalMarks: 100 }
                ],
                totalMarks: 325,
                maxMarks: 400,
                percentage: 81,
                grade: 'A'
            },
            {
                id: 4,
                studentName: 'Sneha Singh',
                rollNumber: 'KS004',
                class: 'Class 8',
                section: 'C',
                examType: 'First Term',
                subjects: [
                    { name: 'Mathematics', marks: 92, totalMarks: 100 },
                    { name: 'Science', marks: 89, totalMarks: 100 },
                    { name: 'English', marks: 94, totalMarks: 100 }
                ],
                totalMarks: 275,
                maxMarks: 300,
                percentage: 92,
                grade: 'A+'
            }
        ];
    }

    if (appState.data.routines.length === 0) {
        appState.data.routines = [
            {
                id: 1,
                class: 'Class 10',
                routineType: 'Daily',
                title: 'Class 10 Daily Routine',
                timeSlots: [
                    { startTime: '08:00', endTime: '08:45', subject: 'Mathematics', teacher: 'Mr. Sharma' },
                    { startTime: '08:45', endTime: '09:30', subject: 'English', teacher: 'Ms. Patel' },
                    { startTime: '09:30', endTime: '09:45', subject: 'Break', teacher: '' },
                    { startTime: '09:45', endTime: '10:30', subject: 'Science', teacher: 'Dr. Kumar' },
                    { startTime: '10:30', endTime: '11:15', subject: 'Social Studies', teacher: 'Mrs. Singh' }
                ]
            },
            {
                id: 2,
                class: 'Class 9',
                routineType: 'Daily',
                title: 'Class 9 Daily Routine',
                timeSlots: [
                    { startTime: '08:00', endTime: '08:45', subject: 'English', teacher: 'Ms. Patel' },
                    { startTime: '08:45', endTime: '09:30', subject: 'Mathematics', teacher: 'Mr. Sharma' },
                    { startTime: '09:30', endTime: '09:45', subject: 'Break', teacher: '' },
                    { startTime: '09:45', endTime: '10:30', subject: 'Hindi', teacher: 'Mrs. Gupta' },
                    { startTime: '10:30', endTime: '11:15', subject: 'Science', teacher: 'Dr. Kumar' }
                ]
            }
        ];
    }

    saveAppData();
    updateStatistics();
}

// Event Listeners
function initializeEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = e.target.getAttribute('data-page');
            showPage(page);
        });
    });

    // Admission Form
    const admissionForm = document.getElementById('admission-form');
    if (admissionForm) {
        admissionForm.addEventListener('submit', handleAdmissionSubmit);
    }

    // Results Search
    const searchBtn = document.getElementById('search-results-btn');
    if (searchBtn) {
        console.log('Search button found, adding event listener');
        searchBtn.addEventListener('click', function() {
            console.log('Search button clicked');
            handleResultsSearch();
        });
    } else {
        console.log('Search button NOT found');
    }

    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearResultsFilters);
    }

    const showAllBtn = document.getElementById('show-all-results-btn');
    if (showAllBtn) {
        console.log('Show All button found, adding event listener');
        showAllBtn.addEventListener('click', function() {
            console.log('Show All button clicked');
            showAllResults();
        });
    } else {
        console.log('Show All button NOT found');
    }

    const resultSearch = document.getElementById('result-search');
    if (resultSearch) {
        resultSearch.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleResultsSearch();
            }
        });
    }

    // Add event listeners for filter changes
    const resultFilters = ['result-class-filter', 'result-section-filter', 'result-exam-filter'];
    resultFilters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', handleResultsSearch);
        }
    });

    // Admin Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }

    // Admin Navigation
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const section = e.target.getAttribute('data-section');
            if (section) {
                showAdminSection(section);
            }
        });
    });

    // Admin Logout
    const logoutBtn = document.getElementById('admin-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleAdminLogout);
    }

    // Announcement Form
    const announcementForm = document.getElementById('announcement-form');
    if (announcementForm) {
        announcementForm.addEventListener('submit', handleAnnouncementSubmit);
    }

    // Result Form
    const resultForm = document.getElementById('result-form');
    if (resultForm) {
        resultForm.addEventListener('submit', handleResultSubmit);
    }

    // Routine Form
    const routineForm = document.getElementById('routine-form');
    if (routineForm) {
        routineForm.addEventListener('submit', handleRoutineSubmit);
    }

    // Add Subject Button
    const addSubjectBtn = document.getElementById('add-subject-btn');
    if (addSubjectBtn) {
        addSubjectBtn.addEventListener('click', addSubjectRow);
    }

    // Add Time Slot Button
    const addSlotBtn = document.getElementById('add-slot-btn');
    if (addSlotBtn) {
        addSlotBtn.addEventListener('click', addTimeSlotRow);
    }

    // Routine Filters
    const routineClassFilter = document.getElementById('routine-class-filter');
    const routineTypeFilter = document.getElementById('routine-type-filter');
    if (routineClassFilter) {
        routineClassFilter.addEventListener('change', filterRoutines);
    }
    if (routineTypeFilter) {
        routineTypeFilter.addEventListener('change', filterRoutines);
    }

    // CSV Upload functionality
    const csvFileInput = document.getElementById('csv-file-input');
    const uploadDropzone = document.getElementById('upload-dropzone');
    const processCsvBtn = document.getElementById('process-csv-btn');
    const downloadTemplateBtn = document.getElementById('download-template-btn');
    const confirmUploadBtn = document.getElementById('confirm-upload-btn');
    const cancelUploadBtn = document.getElementById('cancel-upload-btn');

    if (uploadDropzone) {
        uploadDropzone.addEventListener('click', () => csvFileInput.click());
        uploadDropzone.addEventListener('dragover', handleDragOver);
        uploadDropzone.addEventListener('dragleave', handleDragLeave);
        uploadDropzone.addEventListener('drop', handleFileDrop);
    }

    if (csvFileInput) {
        csvFileInput.addEventListener('change', handleFileSelect);
    }

    if (processCsvBtn) {
        processCsvBtn.addEventListener('click', processCsvFile);
    }

    if (downloadTemplateBtn) {
        downloadTemplateBtn.addEventListener('click', downloadCsvTemplate);
    }

    if (confirmUploadBtn) {
        confirmUploadBtn.addEventListener('click', confirmBulkUpload);
    }

    if (cancelUploadBtn) {
        cancelUploadBtn.addEventListener('click', cancelBulkUpload);
    }
}

// Page Navigation
function showPage(pageName) {
    // Update navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-page="${pageName}"]`).classList.add('active');

    // Show page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(`${pageName}-page`).classList.add('active');

    appState.currentPage = pageName;

    // Load page-specific data
    switch (pageName) {
        case 'home':
            loadHomeData();
            break;
        case 'routine':
            loadRoutineData();
            break;
        case 'announcements':
            loadAnnouncementsData();
            break;
        case 'admin':
            if (!appState.isAdminLoggedIn) {
                showAdminLogin();
            } else {
                showAdminDashboard();
            }
            break;
    }
}

// Home Page Functions
function loadHomeData() {
    updateStatistics();
    loadHomeAnnouncements();
}

function updateStatistics() {
    // Update home page stats
    document.getElementById('total-students').textContent = appState.data.students.length;
    document.getElementById('total-teachers').textContent = '25'; // Static for now
    document.getElementById('total-classes').textContent = '12'; // Static for now

    // Update admin stats
    if (document.getElementById('admin-total-students')) {
        document.getElementById('admin-total-students').textContent = appState.data.students.length;
        document.getElementById('admin-pending-admissions').textContent = appState.data.admissions.filter(a => a.status === 'pending').length;
        document.getElementById('admin-total-announcements').textContent = appState.data.announcements.filter(a => a.status === 'active').length;
    }
}

function loadHomeAnnouncements() {
    const container = document.getElementById('home-announcements');
    const activeAnnouncements = appState.data.announcements.filter(a => a.status === 'active').slice(0, 3);

    if (activeAnnouncements.length === 0) {
        container.innerHTML = '<div class="no-results">No announcements available</div>';
        return;
    }

    container.innerHTML = activeAnnouncements.map(announcement => `
        <div class="announcement-card">
            <h4>${announcement.title}</h4>
            <p>${announcement.content}</p>
            <span class="date">${formatDate(announcement.date)}</span>
        </div>
    `).join('');
}

// Admission Functions
function handleAdmissionSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const admissionData = {
        id: Date.now(),
        name: formData.get('name'),
        age: parseInt(formData.get('age')),
        class_applied: formData.get('class_applied'),
        parent_name: formData.get('parent_name'),
        parent_contact: formData.get('parent_contact'),
        address: formData.get('address'),
        status: 'pending',
        applicationDate: new Date().toISOString().split('T')[0]
    };

    // Validate data
    if (!admissionData.name || !admissionData.age || !admissionData.class_applied || !admissionData.parent_contact) {
        showMessage('admission-message', 'Please fill all required fields', 'error');
        return;
    }

    // Save admission
    appState.data.admissions.push(admissionData);
    saveAppData();

    // Show success message
    showMessage('admission-message', '✅ Application submitted successfully! You will be contacted soon.', 'success');
    
    // Reset form
    e.target.reset();

    // Update statistics
    updateStatistics();

    console.log('📝 New admission application:', admissionData);
}

// Results Functions
function handleResultsSearch() {
    console.log('handleResultsSearch called');
    
    const searchTerm = document.getElementById('result-search').value.trim();
    const classFilter = document.getElementById('result-class-filter').value;
    const sectionFilter = document.getElementById('result-section-filter').value;
    const examFilter = document.getElementById('result-exam-filter').value;
    const resultsDisplay = document.getElementById('results-display');
    
    console.log('Search filters:', { searchTerm, classFilter, sectionFilter, examFilter });

    // Filter results based on all criteria
    let filteredResults = appState.data.results.filter(result => {
        // Text search (name or roll number)
        const matchesSearch = !searchTerm || 
            result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Class filter
        const matchesClass = !classFilter || result.class === classFilter;
        
        // Section filter
        const matchesSection = !sectionFilter || result.section === sectionFilter;
        
        // Exam type filter
        const matchesExam = !examFilter || result.examType === examFilter;
        
        return matchesSearch && matchesClass && matchesSection && matchesExam;
    });

    if (filteredResults.length === 0) {
        const hasFilters = searchTerm || classFilter || sectionFilter || examFilter;
        const message = hasFilters ? 
            'No results found matching your search criteria' : 
            'Enter search criteria or use filters to find results';
        resultsDisplay.innerHTML = `<div class="no-results">${message}</div>`;
        return;
    }

    // Display results
    if (filteredResults.length === 1) {
        // Show detailed view for single result
        displaySingleResult(filteredResults[0]);
    } else {
        // Show list view for multiple results with search info
        displayMultipleResults(filteredResults, true);
    }
}

function displaySingleResult(result) {
    const resultsDisplay = document.getElementById('results-display');
    resultsDisplay.innerHTML = `
        <div class="result-card">
            <div class="result-header">
                <h3>${result.studentName}</h3>
                <p>Roll: ${result.rollNumber} | Class: ${result.class} ${result.section ? '- Section ' + result.section : ''} | Exam: ${result.examType}</p>
            </div>
            <div class="result-summary">
                <div class="summary-item">
                    <span>Total Marks:</span>
                    <span>${result.totalMarks}/${result.maxMarks}</span>
                </div>
                <div class="summary-item">
                    <span>Percentage:</span>
                    <span>${result.percentage}%</span>
                </div>
                <div class="summary-item">
                    <span>Grade:</span>
                    <span class="grade">${result.grade}</span>
                </div>
            </div>
            <div class="subjects-table">
                <h4>Subject-wise Results</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Subject</th>
                            <th>Marks Obtained</th>
                            <th>Total Marks</th>
                            <th>Percentage</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${result.subjects.map(subject => `
                            <tr>
                                <td>${subject.name}</td>
                                <td>${subject.marks}</td>
                                <td>${subject.totalMarks}</td>
                                <td>${Math.round((subject.marks / subject.totalMarks) * 100)}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    `;
}

function displayMultipleResults(results, showSearchInfo = false) {
    const resultsDisplay = document.getElementById('results-display');
    
    // Get current search criteria for display
    let searchInfo = '';
    if (showSearchInfo) {
        const searchTerm = document.getElementById('result-search').value.trim();
        const classFilter = document.getElementById('result-class-filter').value;
        const sectionFilter = document.getElementById('result-section-filter').value;
        const examFilter = document.getElementById('result-exam-filter').value;
        
        const criteria = [];
        if (searchTerm) criteria.push(`"${searchTerm}"`);
        if (classFilter) criteria.push(`Class: ${classFilter}`);
        if (sectionFilter) criteria.push(`Section: ${sectionFilter}`);
        if (examFilter) criteria.push(`Exam: ${examFilter}`);
        
        if (criteria.length > 0) {
            searchInfo = `<p class="search-info">Showing results for: ${criteria.join(', ')}</p>`;
        }
    }
    
    resultsDisplay.innerHTML = `
        <div class="results-list">
            <h4>Found ${results.length} Result${results.length !== 1 ? 's' : ''}</h4>
            ${searchInfo}
            <div class="results-grid">
                ${results.map((result, index) => `
                    <div class="result-summary-card" onclick="showDetailedResult(${result.id})">
                        <div class="card-header">
                            <h5>${result.studentName}</h5>
                            <span class="roll-number">${result.rollNumber}</span>
                        </div>
                        <div class="card-details">
                            <p><strong>Class:</strong> ${result.class} ${result.section ? '- Section ' + result.section : ''}</p>
                            <p><strong>Exam:</strong> ${result.examType}</p>
                            <p><strong>Grade:</strong> <span class="grade-badge grade-${result.grade.replace('+', 'plus')}">${result.grade}</span></p>
                            <p><strong>Percentage:</strong> ${result.percentage}%</p>
                        </div>
                        <div class="card-footer">
                            <small>Click to view detailed results</small>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function showDetailedResult(resultId) {
    const result = appState.data.results.find(r => r.id === resultId);
    if (result) {
        displaySingleResult(result);
    }
}

function clearResultsFilters() {
    document.getElementById('result-search').value = '';
    document.getElementById('result-class-filter').value = '';
    document.getElementById('result-section-filter').value = '';
    document.getElementById('result-exam-filter').value = '';
    
    const resultsDisplay = document.getElementById('results-display');
    resultsDisplay.innerHTML = '<div class="no-results">Enter search criteria or use filters to find results</div>';
}

function showAllResults() {
    console.log('showAllResults called');
    
    const searchTerm = document.getElementById('result-search').value.trim();
    const classFilter = document.getElementById('result-class-filter').value;
    const sectionFilter = document.getElementById('result-section-filter').value;
    const examFilter = document.getElementById('result-exam-filter').value;
    const resultsDisplay = document.getElementById('results-display');

    console.log('Filters:', { searchTerm, classFilter, sectionFilter, examFilter });

    // Check if any filters are applied
    const hasFilters = searchTerm || classFilter || sectionFilter || examFilter;
    
    if (!hasFilters) {
        resultsDisplay.innerHTML = '<div class="no-results">Please apply some search criteria first, then click "Show All Matching"</div>';
        return;
    }

    // Filter results based on current criteria
    let filteredResults = appState.data.results.filter(result => {
        // Text search (name or roll number)
        const matchesSearch = !searchTerm || 
            result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        
        // Class filter
        const matchesClass = !classFilter || result.class === classFilter;
        
        // Section filter
        const matchesSection = !sectionFilter || result.section === sectionFilter;
        
        // Exam type filter
        const matchesExam = !examFilter || result.examType === examFilter;
        
        return matchesSearch && matchesClass && matchesSection && matchesExam;
    });

    console.log('Filtered results:', filteredResults);

    if (filteredResults.length === 0) {
        resultsDisplay.innerHTML = '<div class="no-results">No results found matching your search criteria</div>';
        return;
    }
    
    // Always show multiple results view when "Show All" is clicked
    displayMultipleResults(filteredResults);
}

// Announcements Functions
function loadAnnouncementsData() {
    const container = document.getElementById('announcements-container');
    const activeAnnouncements = appState.data.announcements.filter(a => a.status === 'active');

    if (activeAnnouncements.length === 0) {
        container.innerHTML = '<div class="no-results">No announcements available</div>';
        return;
    }

    container.innerHTML = activeAnnouncements.map(announcement => `
        <div class="announcement-card">
            <h4>${announcement.title}</h4>
            <p>${announcement.content}</p>
            <span class="date">${formatDate(announcement.date)}</span>
        </div>
    `).join('');
}

// Admin Functions
function handleAdminLogin(e) {
    e.preventDefault();
    console.log('🔐 Admin login attempt');
    
    const passwordField = document.getElementById('admin-password');
    if (!passwordField) {
        console.error('❌ Password field not found');
        return;
    }
    
    const password = passwordField.value;
    console.log('🔑 Password entered:', password ? 'Yes' : 'No');
    console.log('🔑 Expected password:', CONFIG.ADMIN_PASSWORD);
    
    if (password === CONFIG.ADMIN_PASSWORD) {
        console.log('✅ Password correct, logging in');
        appState.isAdminLoggedIn = true;
        showAdminDashboard();
        showMessage('login-message', '✅ Login successful!', 'success');
    } else {
        console.log('❌ Password incorrect');
        showMessage('login-message', '❌ Invalid password. Try: admin123', 'error');
    }
}

function handleAdminLogout() {
    appState.isAdminLoggedIn = false;
    showAdminLogin();
}

function showAdminLogin() {
    document.getElementById('admin-login').classList.remove('hidden');
    document.getElementById('admin-dashboard').classList.add('hidden');
    
    // Re-attach event listener for login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.removeEventListener('submit', handleAdminLogin);
        loginForm.addEventListener('submit', handleAdminLogin);
    }
}

function showAdminDashboard() {
    document.getElementById('admin-login').classList.add('hidden');
    document.getElementById('admin-dashboard').classList.remove('hidden');
    
    // Load admin data
    loadAdminData();
    showAdminSection('overview');
}

function showAdminSection(section) {
    console.log('🔧 Switching to admin section:', section);
    
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    // Show selected section
    const targetSection = document.getElementById(`admin-${section}`);
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('✅ Section activated:', section);
    } else {
        console.error('❌ Section not found:', `admin-${section}`);
    }
    
    // Update navigation
    document.querySelectorAll('.admin-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    const navBtn = document.querySelector(`[data-section="${section}"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }
    
    // Load section data
    switch(section) {
        case 'overview':
            loadAdminOverview();
            break;
        case 'admissions':
            loadAdminAdmissions();
            break;
        case 'students':
            console.log('🎯 Loading students section...');
            loadAdminStudents();
            break;
        case 'results':
            loadAdminResults();
            break;
        case 'routine':
            loadAdminRoutine();
            break;
        case 'announcements':
            loadAdminAnnouncements();
            break;
    }
}

function loadAdminData() {
    // Load admin data
    updateStatistics();
}

function loadAdminAdmissions() {
    const container = document.getElementById('admissions-list');
    const admissions = appState.data.admissions;

    if (admissions.length === 0) {
        container.innerHTML = '<div class="no-results">No admission applications found</div>';
        return;
    }

    container.innerHTML = `
        <div class="admissions-header">
            <h4>📊 Total Applications: ${admissions.length}</h4>
            <div class="admission-stats">
                <span class="stat-item">Pending: ${admissions.filter(a => a.status === 'pending').length}</span>
                <span class="stat-item">Approved: ${admissions.filter(a => a.status === 'approved').length}</span>
                <span class="stat-item">Rejected: ${admissions.filter(a => a.status === 'rejected').length}</span>
            </div>
        </div>
        <div class="admissions-grid">
            ${admissions.map(admission => `
                <div class="admission-card">
                    <div class="admission-info">
                        <h5>${admission.name}</h5>
                        <p><strong>Age:</strong> ${admission.age} years</p>
                        <p><strong>Class Applied:</strong> ${admission.class || admission.class_applied}</p>
                        <p><strong>Parent:</strong> ${admission.parent_name}</p>
                        <p><strong>Contact:</strong> ${admission.parent_contact}</p>
                        <p><strong>Email:</strong> ${admission.parent_email}</p>
                        <p><strong>Address:</strong> ${admission.address}</p>
                        <p><strong>Applied:</strong> ${formatDate(admission.applicationDate)}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${admission.status}">${admission.status}</span></p>
                    </div>
                    <div class="admission-actions">
                        ${admission.status === 'pending' ? `
                            <button class="btn-approve" onclick="updateAdmissionStatus(${admission.id}, 'approved')">✅ Approve</button>
                            <button class="btn-reject" onclick="updateAdmissionStatus(${admission.id}, 'rejected')">❌ Reject</button>
                        ` : ''}
                        <button class="btn-edit" onclick="editAdmission(${admission.id})">✏️ Edit</button>
                        <button class="btn-delete" onclick="deleteAdmission(${admission.id})">🗑️ Delete</button>
                        <button class="btn-download" onclick="downloadAdmission(${admission.id})">📄 Download</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function updateAdmissionStatus(admissionId, newStatus) {
    const admission = appState.data.admissions.find(a => a.id === admissionId);
    if (admission) {
        admission.status = newStatus;
        
        // If approved, add to students array
        if (newStatus === 'approved') {
            const student = {
                id: Date.now(),
                name: admission.name,
                rollNumber: generateRollNumber(),
                class: admission.class,
                section: 'A', // Default section
                age: admission.age,
                parent_name: admission.parent_name,
                parent_contact: admission.parent_contact,
                parent_email: admission.parent_email,
                address: admission.address,
                admissionDate: new Date().toISOString().split('T')[0],
                status: 'active',
                originalAdmissionId: admissionId
            };
            
            appState.data.students.push(student);
            console.log(`✅ Student added: ${student.name} (Roll: ${student.rollNumber})`);
        }
        
        saveAppData();
        loadAdminAdmissions();
        updateStatistics();
        
        // Refresh students section if it's currently active
        if (document.getElementById('admin-students').classList.contains('active')) {
            loadAdminStudents();
        }
        
        console.log(`📝 Admission ${admissionId} status updated to: ${newStatus}`);
    }
}

function generateRollNumber() {
    const year = new Date().getFullYear().toString().slice(-2);
    const studentCount = appState.data.students.length + 1;
    return `KS${year}${studentCount.toString().padStart(3, '0')}`;
}

function editAdmission(admissionId) {
    const admission = appState.data.admissions.find(a => a.id === admissionId);
    if (!admission) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>✏️ Edit Admission: ${admission.name}</h3>
                <button onclick="closeModal()" class="close-btn">✕</button>
            </div>
            <form id="edit-admission-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Student Name</label>
                        <input type="text" name="name" value="${admission.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Age</label>
                        <input type="number" name="age" value="${admission.age}" min="5" max="20" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Class Applied</label>
                        <select name="class" required>
                            <option value="Class 1" ${(admission.class || admission.class_applied) === 'Class 1' ? 'selected' : ''}>Class 1</option>
                            <option value="Class 2" ${(admission.class || admission.class_applied) === 'Class 2' ? 'selected' : ''}>Class 2</option>
                            <option value="Class 3" ${(admission.class || admission.class_applied) === 'Class 3' ? 'selected' : ''}>Class 3</option>
                            <option value="Class 4" ${(admission.class || admission.class_applied) === 'Class 4' ? 'selected' : ''}>Class 4</option>
                            <option value="Class 5" ${(admission.class || admission.class_applied) === 'Class 5' ? 'selected' : ''}>Class 5</option>
                            <option value="Class 6" ${(admission.class || admission.class_applied) === 'Class 6' ? 'selected' : ''}>Class 6</option>
                            <option value="Class 7" ${(admission.class || admission.class_applied) === 'Class 7' ? 'selected' : ''}>Class 7</option>
                            <option value="Class 8" ${(admission.class || admission.class_applied) === 'Class 8' ? 'selected' : ''}>Class 8</option>
                            <option value="Class 9" ${(admission.class || admission.class_applied) === 'Class 9' ? 'selected' : ''}>Class 9</option>
                            <option value="Class 10" ${(admission.class || admission.class_applied) === 'Class 10' ? 'selected' : ''}>Class 10</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select name="status">
                            <option value="pending" ${admission.status === 'pending' ? 'selected' : ''}>Pending</option>
                            <option value="approved" ${admission.status === 'approved' ? 'selected' : ''}>Approved</option>
                            <option value="rejected" ${admission.status === 'rejected' ? 'selected' : ''}>Rejected</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Parent Name</label>
                    <input type="text" name="parent_name" value="${admission.parent_name}" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Parent Contact</label>
                        <input type="tel" name="parent_contact" value="${admission.parent_contact}" required>
                    </div>
                    <div class="form-group">
                        <label>Parent Email</label>
                        <input type="email" name="parent_email" value="${admission.parent_email}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <textarea name="address" rows="3" required>${admission.address}</textarea>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="closeModal()" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-save">💾 Save Changes</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('edit-admission-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Update admission data
        admission.name = formData.get('name');
        admission.age = formData.get('age');
        admission.class = formData.get('class');
        admission.class_applied = formData.get('class'); // For backward compatibility
        admission.status = formData.get('status');
        admission.parent_name = formData.get('parent_name');
        admission.parent_contact = formData.get('parent_contact');
        admission.parent_email = formData.get('parent_email');
        admission.address = formData.get('address');

        saveAppData();
        loadAdminAdmissions();
        updateStatistics();
        closeModal();
        
        console.log(`✅ Admission updated: ${admission.name}`);
    });
}

function deleteAdmission(admissionId) {
    const admission = appState.data.admissions.find(a => a.id === admissionId);
    if (!admission) return;

    if (confirm(`Are you sure you want to delete admission application for "${admission.name}"? This action cannot be undone.`)) {
        appState.data.admissions = appState.data.admissions.filter(a => a.id !== admissionId);
        saveAppData();
        loadAdminAdmissions();
        updateStatistics();
        console.log(`🗑️ Admission deleted: ${admission.name}`);
    }
}

function downloadAdmission(admissionId) {
    const admission = appState.data.admissions.find(a => a.id === admissionId);
    if (!admission) return;

    const csvContent = [
        'Name,Age,Class Applied,Parent Name,Parent Contact,Parent Email,Address,Application Date,Status',
        `"${admission.name}","${admission.age}","${admission.class || admission.class_applied}","${admission.parent_name}","${admission.parent_contact}","${admission.parent_email}","${admission.address}","${admission.applicationDate}","${admission.status}"`
    ].join('\n');

    downloadCSV(csvContent, `admission_${admission.name.replace(/\s+/g, '_')}_${admission.applicationDate}.csv`);
}

function loadAdminStudents() {
    console.log('📚 Loading admin students section...');
    const container = document.getElementById('students-list');
    const students = appState.data.students;
    
    console.log('👥 Students found:', students.length);
    console.log('📋 Students data:', students);

    if (!container) {
        console.error('❌ Students container not found!');
        return;
    }

    if (students.length === 0) {
        console.log('📝 No students found, showing empty message');
        container.innerHTML = `
            <div class="no-results">
                <p>No students found</p>
                <p><small>Students will appear here when admissions are approved</small></p>
            </div>
        `;
        return;
    }
    
    console.log('✅ Rendering students grid...');

    container.innerHTML = `
        <div class="students-header">
            <h4>📊 Total Students: ${students.length}</h4>
            <button onclick="downloadAllStudents()" class="download-btn">📥 Download All Students</button>
        </div>
        <div class="students-grid">
            ${students.map(student => `
                <div class="student-card">
                    <div class="student-info">
                        <h5>${student.name}</h5>
                        <p><strong>Roll:</strong> ${student.rollNumber}</p>
                        <p><strong>Class:</strong> ${student.class} ${student.section ? '- Section ' + student.section : ''}</p>
                        <p><strong>Age:</strong> ${student.age} years</p>
                        <p><strong>Parent:</strong> ${student.parent_name}</p>
                        <p><strong>Contact:</strong> ${student.parent_contact}</p>
                        <p><strong>Email:</strong> ${student.parent_email}</p>
                        <p><strong>Address:</strong> ${student.address}</p>
                        <p><strong>Admission Date:</strong> ${formatDate(student.admissionDate)}</p>
                        <p><strong>Status:</strong> <span class="status-badge status-${student.status}">${student.status}</span></p>
                    </div>
                    <div class="student-actions">
                        <button onclick="editStudent(${student.id})" class="btn-edit">✏️ Edit</button>
                        <button onclick="deleteStudent(${student.id})" class="btn-delete">🗑️ Delete</button>
                        <button onclick="downloadStudent(${student.id})" class="btn-download">📄 Download</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function editStudent(studentId) {
    const student = appState.data.students.find(s => s.id === studentId);
    if (!student) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>✏️ Edit Student: ${student.name}</h3>
                <button onclick="closeModal()" class="close-btn">✕</button>
            </div>
            <form id="edit-student-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Name</label>
                        <input type="text" name="name" value="${student.name}" required>
                    </div>
                    <div class="form-group">
                        <label>Roll Number</label>
                        <input type="text" name="rollNumber" value="${student.rollNumber}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Class</label>
                        <select name="class" required>
                            <option value="Class 1" ${student.class === 'Class 1' ? 'selected' : ''}>Class 1</option>
                            <option value="Class 2" ${student.class === 'Class 2' ? 'selected' : ''}>Class 2</option>
                            <option value="Class 3" ${student.class === 'Class 3' ? 'selected' : ''}>Class 3</option>
                            <option value="Class 4" ${student.class === 'Class 4' ? 'selected' : ''}>Class 4</option>
                            <option value="Class 5" ${student.class === 'Class 5' ? 'selected' : ''}>Class 5</option>
                            <option value="Class 6" ${student.class === 'Class 6' ? 'selected' : ''}>Class 6</option>
                            <option value="Class 7" ${student.class === 'Class 7' ? 'selected' : ''}>Class 7</option>
                            <option value="Class 8" ${student.class === 'Class 8' ? 'selected' : ''}>Class 8</option>
                            <option value="Class 9" ${student.class === 'Class 9' ? 'selected' : ''}>Class 9</option>
                            <option value="Class 10" ${student.class === 'Class 10' ? 'selected' : ''}>Class 10</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Section</label>
                        <select name="section">
                            <option value="A" ${student.section === 'A' ? 'selected' : ''}>A</option>
                            <option value="B" ${student.section === 'B' ? 'selected' : ''}>B</option>
                            <option value="C" ${student.section === 'C' ? 'selected' : ''}>C</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Age</label>
                        <input type="number" name="age" value="${student.age}" min="5" max="20" required>
                    </div>
                    <div class="form-group">
                        <label>Status</label>
                        <select name="status">
                            <option value="active" ${student.status === 'active' ? 'selected' : ''}>Active</option>
                            <option value="inactive" ${student.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                            <option value="transferred" ${student.status === 'transferred' ? 'selected' : ''}>Transferred</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label>Parent Name</label>
                    <input type="text" name="parent_name" value="${student.parent_name}" required>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Parent Contact</label>
                        <input type="tel" name="parent_contact" value="${student.parent_contact}" required>
                    </div>
                    <div class="form-group">
                        <label>Parent Email</label>
                        <input type="email" name="parent_email" value="${student.parent_email}" required>
                    </div>
                </div>
                <div class="form-group">
                    <label>Address</label>
                    <textarea name="address" rows="3" required>${student.address}</textarea>
                </div>
                <div class="form-actions">
                    <button type="button" onclick="closeModal()" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-save">💾 Save Changes</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('edit-student-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Update student data
        student.name = formData.get('name');
        student.rollNumber = formData.get('rollNumber');
        student.class = formData.get('class');
        student.section = formData.get('section');
        student.age = formData.get('age');
        student.status = formData.get('status');
        student.parent_name = formData.get('parent_name');
        student.parent_contact = formData.get('parent_contact');
        student.parent_email = formData.get('parent_email');
        student.address = formData.get('address');

        saveAppData();
        loadAdminStudents();
        updateStatistics();
        closeModal();
        
        console.log(`✅ Student updated: ${student.name}`);
    });
}

function deleteStudent(studentId) {
    const student = appState.data.students.find(s => s.id === studentId);
    if (!student) return;

    if (confirm(`Are you sure you want to delete student "${student.name}"? This action cannot be undone.`)) {
        appState.data.students = appState.data.students.filter(s => s.id !== studentId);
        saveAppData();
        loadAdminStudents();
        updateStatistics();
        console.log(`🗑️ Student deleted: ${student.name}`);
    }
}

function downloadStudent(studentId) {
    const student = appState.data.students.find(s => s.id === studentId);
    if (!student) return;

    const csvContent = [
        'Name,Roll Number,Class,Section,Age,Parent Name,Parent Contact,Parent Email,Address,Admission Date,Status',
        `"${student.name}","${student.rollNumber}","${student.class}","${student.section}","${student.age}","${student.parent_name}","${student.parent_contact}","${student.parent_email}","${student.address}","${student.admissionDate}","${student.status}"`
    ].join('\n');

    downloadCSV(csvContent, `student_${student.rollNumber}_${student.name.replace(/\s+/g, '_')}.csv`);
}

function downloadAllStudents() {
    if (appState.data.students.length === 0) {
        alert('No students to download');
        return;
    }

    const csvContent = [
        'Name,Roll Number,Class,Section,Age,Parent Name,Parent Contact,Parent Email,Address,Admission Date,Status',
        ...appState.data.students.map(student => 
            `"${student.name}","${student.rollNumber}","${student.class}","${student.section}","${student.age}","${student.parent_name}","${student.parent_contact}","${student.parent_email}","${student.address}","${student.admissionDate}","${student.status}"`
        )
    ].join('\n');

    const currentDate = new Date().toISOString().split('T')[0];
    downloadCSV(csvContent, `all_students_${currentDate}.csv`);
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', filename);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

function closeModal() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
        document.body.removeChild(modal);
    }
}

function handleAnnouncementSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const announcementData = {
        id: Date.now(),
        title: formData.get('title'),
        content: formData.get('content'),
        date: new Date().toISOString().split('T')[0],
        status: 'active'
    };

    if (!announcementData.title || !announcementData.content) {
        showMessage('announcement-message', 'Please fill all required fields', 'error');
        return;
    }

    appState.data.announcements.push(announcementData);
    saveAppData();

    showMessage('announcement-message', '✅ Announcement added successfully!', 'success');
    e.target.reset();

    loadAdminAnnouncements();
    updateStatistics();

    console.log('📢 New announcement added:', announcementData);
}

function loadAdminAnnouncements() {
    const container = document.getElementById('admin-announcements-list');
    const announcements = appState.data.announcements;

    if (announcements.length === 0) {
        container.innerHTML = '<div class="no-results">No announcements found</div>';
        return;
    }

    container.innerHTML = announcements.map(announcement => `
        <div class="announcement-item">
            <div class="item-info">
                <h4>${announcement.title}</h4>
                <p>${announcement.content}</p>
                <p>Date: ${formatDate(announcement.date)} | Status: ${announcement.status}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editAnnouncement(${announcement.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteAnnouncement(${announcement.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteAnnouncement(announcementId) {
    if (confirm('Are you sure you want to delete this announcement?')) {
        appState.data.announcements = appState.data.announcements.filter(a => a.id !== announcementId);
        saveAppData();
        loadAdminAnnouncements();
        updateStatistics();
        
        console.log(`🗑️ Announcement ${announcementId} deleted`);
    }
}


// Utility Functions
function showMessage(containerId, message, type = 'info') {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="message ${type}">${message}</div>`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            container.innerHTML = '';
        }, 5000);
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Google Sheets Integration (Future Enhancement)
function connectToGoogleSheets(sheetsUrl) {
    CONFIG.GOOGLE_SHEETS_URL = sheetsUrl;
    console.log('🔗 Google Sheets URL configured:', sheetsUrl);
    
    // This function can be enhanced to sync data with Google Sheets
    // For now, it just stores the URL for future use
}

function syncWithGoogleSheets() {
    if (!CONFIG.GOOGLE_SHEETS_URL) {
        console.log('⚠️ Google Sheets URL not configured');
        return;
    }
    
    // Future implementation for syncing data with Google Sheets
    console.log('🔄 Syncing with Google Sheets...');
}

// Routine Functions
function loadRoutineData() {
    const container = document.getElementById('routines-display');
    const classFilter = document.getElementById('routine-class-filter');
    const typeFilter = document.getElementById('routine-type-filter');
    
    let filteredRoutines = appState.data.routines;
    
    // Apply filters
    if (classFilter && classFilter.value) {
        filteredRoutines = filteredRoutines.filter(r => r.class === classFilter.value);
    }
    
    if (typeFilter && typeFilter.value) {
        filteredRoutines = filteredRoutines.filter(r => r.routineType === typeFilter.value);
    }
    
    if (filteredRoutines.length === 0) {
        container.innerHTML = '<div class="no-results">No routines found matching your criteria</div>';
        return;
    }
    
    container.innerHTML = filteredRoutines.map(routine => `
        <div class="routine-card">
            <h4>${routine.title}</h4>
            <div class="routine-meta">
                ${routine.class} • ${routine.routineType} Routine
            </div>
            <div class="routine-schedule">
                ${routine.timeSlots.map(slot => `
                    <div class="schedule-item">
                        <div class="schedule-time">${slot.startTime} - ${slot.endTime}</div>
                        <div class="schedule-subject">${slot.subject}</div>
                        <div class="schedule-teacher">${slot.teacher}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

function filterRoutines() {
    loadRoutineData();
}

// Admin Results Functions
function handleResultSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const subjects = [];
    
    // Get all subject data
    const subjectNames = formData.getAll('subjectName[]');
    const marks = formData.getAll('marks[]');
    const totalMarks = formData.getAll('totalMarks[]');
    
    for (let i = 0; i < subjectNames.length; i++) {
        if (subjectNames[i] && marks[i] && totalMarks[i]) {
            subjects.push({
                name: subjectNames[i],
                marks: parseInt(marks[i]),
                totalMarks: parseInt(totalMarks[i])
            });
        }
    }
    
    if (subjects.length === 0) {
        showMessage('result-message', 'Please add at least one subject', 'error');
        return;
    }
    
    // Calculate totals
    const totalObtained = subjects.reduce((sum, subject) => sum + subject.marks, 0);
    const maxTotal = subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
    const percentage = Math.round((totalObtained / maxTotal) * 100);
    
    // Calculate grade
    let grade = 'F';
    if (percentage >= 90) grade = 'A+';
    else if (percentage >= 80) grade = 'A';
    else if (percentage >= 70) grade = 'B';
    else if (percentage >= 60) grade = 'C';
    else if (percentage >= 50) grade = 'D';
    
    const resultData = {
        id: Date.now(),
        studentName: formData.get('studentName'),
        rollNumber: formData.get('rollNumber'),
        class: formData.get('class'),
        examType: formData.get('examType'),
        subjects: subjects,
        totalMarks: totalObtained,
        maxMarks: maxTotal,
        percentage: percentage,
        grade: grade
    };
    
    appState.data.results.push(resultData);
    saveAppData();
    
    showMessage('result-message', '✅ Result added successfully!', 'success');
    e.target.reset();
    
    // Reset subjects container
    document.getElementById('subjects-container').innerHTML = `
        <div class="subject-row">
            <input type="text" placeholder="Subject Name" name="subjectName[]" required>
            <input type="number" placeholder="Marks Obtained" name="marks[]" min="0" max="100" required>
            <input type="number" placeholder="Total Marks" name="totalMarks[]" min="1" max="100" value="100" required>
            <button type="button" class="btn-remove-subject">❌</button>
        </div>
    `;
    
    loadAdminResults();
    console.log('📋 New result added:', resultData);
}

function addSubjectRow() {
    const container = document.getElementById('subjects-container');
    const newRow = document.createElement('div');
    newRow.className = 'subject-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Subject Name" name="subjectName[]" required>
        <input type="number" placeholder="Marks Obtained" name="marks[]" min="0" max="100" required>
        <input type="number" placeholder="Total Marks" name="totalMarks[]" min="1" max="100" value="100" required>
        <button type="button" class="btn-remove-subject" onclick="removeSubjectRow(this)">❌</button>
    `;
    container.appendChild(newRow);
}

function removeSubjectRow(button) {
    button.parentElement.remove();
}

function loadAdminResults() {
    const container = document.getElementById('admin-results-list');
    const results = appState.data.results;
    
    if (results.length === 0) {
        container.innerHTML = '<div class="no-results">No results found</div>';
        return;
    }
    
    container.innerHTML = results.map(result => `
        <div class="result-item">
            <div class="result-item-info">
                <h5>${result.studentName} (${result.rollNumber})</h5>
                <p>Class: ${result.class} | Exam: ${result.examType}</p>
                <p>Total: ${result.totalMarks}/${result.maxMarks} | Percentage: ${result.percentage}% | Grade: ${result.grade}</p>
                <div class="subjects-display">
                    ${result.subjects.map(subject => `
                        <div class="subject-badge">${subject.name}: ${subject.marks}/${subject.totalMarks}</div>
                    `).join('')}
                </div>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editResult(${result.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteResult(${result.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

// Admin Routine Functions
function handleRoutineSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const timeSlots = [];
    
    // Get all time slot data
    const startTimes = formData.getAll('startTime[]');
    const endTimes = formData.getAll('endTime[]');
    const subjects = formData.getAll('subject[]');
    const teachers = formData.getAll('teacher[]');
    
    for (let i = 0; i < startTimes.length; i++) {
        if (startTimes[i] && endTimes[i] && subjects[i]) {
            timeSlots.push({
                startTime: startTimes[i],
                endTime: endTimes[i],
                subject: subjects[i],
                teacher: teachers[i] || ''
            });
        }
    }
    
    if (timeSlots.length === 0) {
        showMessage('routine-message', 'Please add at least one time slot', 'error');
        return;
    }
    
    const routineData = {
        id: Date.now(),
        class: formData.get('class'),
        routineType: formData.get('routineType'),
        title: formData.get('title'),
        timeSlots: timeSlots
    };
    
    appState.data.routines.push(routineData);
    saveAppData();
    
    showMessage('routine-message', '✅ Routine added successfully!', 'success');
    e.target.reset();
    
    // Reset time slots container
    document.getElementById('time-slots-container').innerHTML = `
        <div class="time-slot-row">
            <input type="time" name="startTime[]" required>
            <input type="time" name="endTime[]" required>
            <input type="text" placeholder="Subject/Activity" name="subject[]" required>
            <input type="text" placeholder="Teacher" name="teacher[]">
            <button type="button" class="btn-remove-slot">❌</button>
        </div>
    `;
    
    loadAdminRoutines();
    console.log('📅 New routine added:', routineData);
}

function addTimeSlotRow() {
    const container = document.getElementById('time-slots-container');
    const newRow = document.createElement('div');
    newRow.className = 'time-slot-row';
    newRow.innerHTML = `
        <input type="time" name="startTime[]" required>
        <input type="time" name="endTime[]" required>
        <input type="text" placeholder="Subject/Activity" name="subject[]" required>
        <input type="text" placeholder="Teacher" name="teacher[]">
        <button type="button" class="btn-remove-slot" onclick="removeTimeSlotRow(this)">❌</button>
    `;
    container.appendChild(newRow);
}

function removeTimeSlotRow(button) {
    button.parentElement.remove();
}

function loadAdminRoutines() {
    const container = document.getElementById('admin-routines-list');
    const routines = appState.data.routines;
    
    if (routines.length === 0) {
        container.innerHTML = '<div class="no-results">No routines found</div>';
        return;
    }
    
    container.innerHTML = routines.map(routine => `
        <div class="routine-item">
            <div class="routine-item-info">
                <h5>${routine.title}</h5>
                <p>Class: ${routine.class} | Type: ${routine.routineType}</p>
                <p>Time Slots: ${routine.timeSlots.length}</p>
            </div>
            <div class="item-actions">
                <button class="btn-edit" onclick="editRoutine(${routine.id})">✏️ Edit</button>
                <button class="btn-delete" onclick="deleteRoutine(${routine.id})">🗑️ Delete</button>
            </div>
        </div>
    `).join('');
}

function deleteResult(resultId) {
    if (confirm('Are you sure you want to delete this result?')) {
        appState.data.results = appState.data.results.filter(r => r.id !== resultId);
        saveAppData();
        loadAdminResults();
        console.log(`🗑️ Result ${resultId} deleted`);
    }
}

function editResult(resultId) {
    const result = appState.data.results.find(r => r.id === resultId);
    if (!result) return;

    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>✏️ Edit Result: ${result.studentName}</h3>
                <button onclick="closeModal()" class="close-btn">✕</button>
            </div>
            <form id="edit-result-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>Student Name</label>
                        <input type="text" name="studentName" value="${result.studentName}" required>
                    </div>
                    <div class="form-group">
                        <label>Roll Number</label>
                        <input type="text" name="rollNumber" value="${result.rollNumber}" required>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Class</label>
                        <select name="class" required>
                            <option value="Class 1" ${result.class === 'Class 1' ? 'selected' : ''}>Class 1</option>
                            <option value="Class 2" ${result.class === 'Class 2' ? 'selected' : ''}>Class 2</option>
                            <option value="Class 3" ${result.class === 'Class 3' ? 'selected' : ''}>Class 3</option>
                            <option value="Class 4" ${result.class === 'Class 4' ? 'selected' : ''}>Class 4</option>
                            <option value="Class 5" ${result.class === 'Class 5' ? 'selected' : ''}>Class 5</option>
                            <option value="Class 6" ${result.class === 'Class 6' ? 'selected' : ''}>Class 6</option>
                            <option value="Class 7" ${result.class === 'Class 7' ? 'selected' : ''}>Class 7</option>
                            <option value="Class 8" ${result.class === 'Class 8' ? 'selected' : ''}>Class 8</option>
                            <option value="Class 9" ${result.class === 'Class 9' ? 'selected' : ''}>Class 9</option>
                            <option value="Class 10" ${result.class === 'Class 10' ? 'selected' : ''}>Class 10</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Section</label>
                        <select name="section">
                            <option value="A" ${result.section === 'A' ? 'selected' : ''}>A</option>
                            <option value="B" ${result.section === 'B' ? 'selected' : ''}>B</option>
                            <option value="C" ${result.section === 'C' ? 'selected' : ''}>C</option>
                        </select>
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Exam Type</label>
                        <select name="examType" required>
                            <option value="First Term" ${result.examType === 'First Term' ? 'selected' : ''}>First Term</option>
                            <option value="Mid Term" ${result.examType === 'Mid Term' ? 'selected' : ''}>Mid Term</option>
                            <option value="Final Term" ${result.examType === 'Final Term' ? 'selected' : ''}>Final Term</option>
                            <option value="Unit Test" ${result.examType === 'Unit Test' ? 'selected' : ''}>Unit Test</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>Grade</label>
                        <select name="grade" required>
                            <option value="A+" ${result.grade === 'A+' ? 'selected' : ''}>A+</option>
                            <option value="A" ${result.grade === 'A' ? 'selected' : ''}>A</option>
                            <option value="B+" ${result.grade === 'B+' ? 'selected' : ''}>B+</option>
                            <option value="B" ${result.grade === 'B' ? 'selected' : ''}>B</option>
                            <option value="C+" ${result.grade === 'C+' ? 'selected' : ''}>C+</option>
                            <option value="C" ${result.grade === 'C' ? 'selected' : ''}>C</option>
                            <option value="D" ${result.grade === 'D' ? 'selected' : ''}>D</option>
                            <option value="F" ${result.grade === 'F' ? 'selected' : ''}>F</option>
                        </select>
                    </div>
                </div>
                
                <h4>📚 Subjects & Marks</h4>
                <div id="edit-subjects-container">
                    ${result.subjects.map((subject, index) => `
                        <div class="subject-row">
                            <div class="form-row">
                                <div class="form-group">
                                    <label>Subject Name</label>
                                    <input type="text" name="subjectName[]" value="${subject.name}" required>
                                </div>
                                <div class="form-group">
                                    <label>Marks Obtained</label>
                                    <input type="number" name="subjectMarks[]" value="${subject.marks}" min="0" max="100" required>
                                </div>
                                <div class="form-group">
                                    <label>Total Marks</label>
                                    <input type="number" name="subjectTotal[]" value="${subject.totalMarks}" min="1" max="100" required>
                                </div>
                                <div class="form-group">
                                    <button type="button" class="btn-remove" onclick="removeEditSubjectRow(this)">🗑️</button>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <button type="button" onclick="addEditSubjectRow()" class="btn-add">➕ Add Subject</button>
                
                <div class="form-actions">
                    <button type="button" onclick="closeModal()" class="btn-cancel">Cancel</button>
                    <button type="submit" class="btn-save">💾 Save Changes</button>
                </div>
            </form>
        </div>
    `;

    document.body.appendChild(modal);

    // Handle form submission
    document.getElementById('edit-result-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        
        // Get subjects data
        const subjectNames = formData.getAll('subjectName[]');
        const subjectMarks = formData.getAll('subjectMarks[]');
        const subjectTotals = formData.getAll('subjectTotal[]');
        
        const subjects = [];
        let totalMarks = 0;
        let maxMarks = 0;
        
        for (let i = 0; i < subjectNames.length; i++) {
            if (subjectNames[i] && subjectMarks[i] && subjectTotals[i]) {
                const marks = parseInt(subjectMarks[i]);
                const total = parseInt(subjectTotals[i]);
                
                subjects.push({
                    name: subjectNames[i],
                    marks: marks,
                    totalMarks: total
                });
                
                totalMarks += marks;
                maxMarks += total;
            }
        }
        
        // Calculate percentage
        const percentage = maxMarks > 0 ? Math.round((totalMarks / maxMarks) * 100) : 0;
        
        // Update result data
        result.studentName = formData.get('studentName');
        result.rollNumber = formData.get('rollNumber');
        result.class = formData.get('class');
        result.section = formData.get('section');
        result.examType = formData.get('examType');
        result.grade = formData.get('grade');
        result.subjects = subjects;
        result.totalMarks = totalMarks;
        result.maxMarks = maxMarks;
        result.percentage = percentage;

        saveAppData();
        loadAdminResults();
        updateStatistics();
        closeModal();
        
        console.log(`✅ Result updated: ${result.studentName}`);
    });
}

function addEditSubjectRow() {
    const container = document.getElementById('edit-subjects-container');
    const newRow = document.createElement('div');
    newRow.className = 'subject-row';
    newRow.innerHTML = `
        <div class="form-row">
            <div class="form-group">
                <label>Subject Name</label>
                <input type="text" name="subjectName[]" required>
            </div>
            <div class="form-group">
                <label>Marks Obtained</label>
                <input type="number" name="subjectMarks[]" min="0" max="100" required>
            </div>
            <div class="form-group">
                <label>Total Marks</label>
                <input type="number" name="subjectTotal[]" min="1" max="100" required>
            </div>
            <div class="form-group">
                <button type="button" class="btn-remove" onclick="removeEditSubjectRow(this)">🗑️</button>
            </div>
        </div>
    `;
    container.appendChild(newRow);
}

function removeEditSubjectRow(button) {
    button.closest('.subject-row').remove();
}

function deleteRoutine(routineId) {
    if (confirm('Are you sure you want to delete this routine?')) {
        appState.data.routines = appState.data.routines.filter(r => r.id !== routineId);
        saveAppData();
        loadAdminRoutines();
        console.log(`🗑️ Routine ${routineId} deleted`);
    }
}

// CSV Upload Functions
let csvData = [];
let parsedResults = [];

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.add('dragover');
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
}

function handleFileDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFileSelection(files[0]);
    }
}

function handleFileSelect(e) {
    const file = e.target.files[0];
    if (file) {
        handleFileSelection(file);
    }
}

function handleFileSelection(file) {
    if (!file.name.toLowerCase().endsWith('.csv')) {
        showMessage('bulk-upload-message', '❌ Please select a CSV file only', 'error');
        return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showMessage('bulk-upload-message', '❌ File size too large. Maximum 5MB allowed', 'error');
        return;
    }

    // Update UI
    document.getElementById('upload-dropzone').innerHTML = `
        <div class="upload-icon">📄</div>
        <p><strong>Selected:</strong> ${file.name}</p>
        <p class="upload-hint">File size: ${(file.size / 1024).toFixed(1)} KB</p>
    `;
    
    document.getElementById('process-csv-btn').style.display = 'block';
    showMessage('bulk-upload-message', '✅ File selected successfully. Click "Process CSV File" to continue.', 'success');
}

function processCsvFile() {
    const fileInput = document.getElementById('csv-file-input');
    const file = fileInput.files[0];
    
    if (!file) {
        showMessage('bulk-upload-message', '❌ No file selected', 'error');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const csvText = e.target.result;
            parseCsvData(csvText);
        } catch (error) {
            showMessage('bulk-upload-message', '❌ Error reading file: ' + error.message, 'error');
        }
    };
    
    reader.readAsText(file);
}

function parseCsvData(csvText) {
    try {
        const lines = csvText.trim().split('\n');
        if (lines.length < 2) {
            throw new Error('CSV file must contain at least a header row and one data row');
        }

        csvData = lines.map(line => {
            // Simple CSV parsing (handles basic cases)
            return line.split(',').map(cell => cell.trim().replace(/^"|"$/g, ''));
        });

        // Parse results from CSV
        parsedResults = [];
        const headers = csvData[0];
        
        for (let i = 1; i < csvData.length; i++) {
            const row = csvData[i];
            if (row.length < 4) continue; // Skip invalid rows
            
            const result = {
                studentName: row[0],
                rollNumber: row[1],
                class: row[2],
                examType: row[3],
                subjects: []
            };

            // Parse subjects (groups of 3: name, marks, total)
            for (let j = 4; j < row.length; j += 3) {
                if (j + 2 < row.length && row[j] && row[j + 1] && row[j + 2]) {
                    result.subjects.push({
                        name: row[j],
                        marks: parseInt(row[j + 1]) || 0,
                        totalMarks: parseInt(row[j + 2]) || 100
                    });
                }
            }

            if (result.subjects.length > 0) {
                // Calculate totals
                const totalObtained = result.subjects.reduce((sum, subject) => sum + subject.marks, 0);
                const maxTotal = result.subjects.reduce((sum, subject) => sum + subject.totalMarks, 0);
                const percentage = Math.round((totalObtained / maxTotal) * 100);
                
                // Calculate grade
                let grade = 'F';
                if (percentage >= 90) grade = 'A+';
                else if (percentage >= 80) grade = 'A';
                else if (percentage >= 70) grade = 'B';
                else if (percentage >= 60) grade = 'C';
                else if (percentage >= 50) grade = 'D';
                
                result.totalMarks = totalObtained;
                result.maxMarks = maxTotal;
                result.percentage = percentage;
                result.grade = grade;
                result.id = Date.now() + i; // Unique ID
                
                parsedResults.push(result);
            }
        }

        if (parsedResults.length === 0) {
            throw new Error('No valid results found in CSV file');
        }

        displayCsvPreview();
        showMessage('bulk-upload-message', `✅ Successfully parsed ${parsedResults.length} results from CSV`, 'success');

    } catch (error) {
        showMessage('bulk-upload-message', '❌ Error parsing CSV: ' + error.message, 'error');
        console.error('CSV parsing error:', error);
    }
}

function displayCsvPreview() {
    const container = document.getElementById('csv-preview-container');
    const tableContainer = document.getElementById('csv-preview-table');
    
    if (parsedResults.length === 0) {
        container.style.display = 'none';
        return;
    }

    // Create preview table
    let tableHTML = `
        <div class="upload-stats">
            <div class="stat-item">
                <div class="number">${parsedResults.length}</div>
                <div class="label">Total Results</div>
            </div>
            <div class="stat-item">
                <div class="number">${[...new Set(parsedResults.map(r => r.class))].length}</div>
                <div class="label">Classes</div>
            </div>
            <div class="stat-item">
                <div class="number">${[...new Set(parsedResults.map(r => r.examType))].length}</div>
                <div class="label">Exam Types</div>
            </div>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Student Name</th>
                    <th>Roll Number</th>
                    <th>Class</th>
                    <th>Exam Type</th>
                    <th>Subjects</th>
                    <th>Total Marks</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
    `;

    parsedResults.forEach(result => {
        const subjectsText = result.subjects.map(s => `${s.name}: ${s.marks}/${s.totalMarks}`).join(', ');
        tableHTML += `
            <tr>
                <td>${result.studentName}</td>
                <td>${result.rollNumber}</td>
                <td>${result.class}</td>
                <td>${result.examType}</td>
                <td title="${subjectsText}">${result.subjects.length} subjects</td>
                <td>${result.totalMarks}/${result.maxMarks}</td>
                <td>${result.percentage}%</td>
                <td><strong>${result.grade}</strong></td>
            </tr>
        `;
    });

    tableHTML += '</tbody></table>';
    tableContainer.innerHTML = tableHTML;
    container.style.display = 'block';
}

function confirmBulkUpload() {
    if (parsedResults.length === 0) {
        showMessage('bulk-upload-message', '❌ No results to upload', 'error');
        return;
    }

    // Add all results to the main data
    parsedResults.forEach(result => {
        appState.data.results.push(result);
    });

    saveAppData();
    loadAdminResults();
    updateStatistics();

    // Reset upload state
    resetUploadState();
    
    showMessage('bulk-upload-message', `✅ Successfully uploaded ${parsedResults.length} results!`, 'success');
    console.log(`📤 Bulk uploaded ${parsedResults.length} results`);
}

function cancelBulkUpload() {
    resetUploadState();
    showMessage('bulk-upload-message', 'Upload cancelled', 'info');
}

function resetUploadState() {
    csvData = [];
    parsedResults = [];
    
    document.getElementById('csv-file-input').value = '';
    document.getElementById('upload-dropzone').innerHTML = `
        <div class="upload-icon">📁</div>
        <p>Click to select CSV file or drag & drop here</p>
        <p class="upload-hint">Only .csv files are accepted</p>
    `;
    document.getElementById('process-csv-btn').style.display = 'none';
    document.getElementById('csv-preview-container').style.display = 'none';
}

function downloadCsvTemplate() {
    const templateData = [
        // Header row with up to 5 subjects
        ['studentName', 'rollNumber', 'class', 'examType', 'subject1Name', 'subject1Marks', 'subject1Total', 'subject2Name', 'subject2Marks', 'subject2Total', 'subject3Name', 'subject3Marks', 'subject3Total', 'subject4Name', 'subject4Marks', 'subject4Total', 'subject5Name', 'subject5Marks', 'subject5Total'],
        
        // Sample data for Class 10
        ['John Doe', 'KS001', 'Class 10', 'Final Term', 'Mathematics', '95', '100', 'Science', '88', '100', 'English', '92', '100', 'Social Studies', '85', '100', 'Hindi', '90', '100'],
        ['Jane Smith', 'KS002', 'Class 10', 'Final Term', 'Mathematics', '87', '100', 'Science', '91', '100', 'English', '89', '100', 'Social Studies', '82', '100', 'Hindi', '88', '100'],
        
        // Sample data for Class 9
        ['Mike Johnson', 'KS003', 'Class 9', 'Mid Term', 'Mathematics', '78', '100', 'Science', '82', '100', 'English', '85', '100', 'Hindi', '80', '100', 'Social Studies', '75', '100'],
        ['Sarah Wilson', 'KS004', 'Class 9', 'Mid Term', 'Mathematics', '92', '100', 'Science', '89', '100', 'English', '94', '100', 'Hindi', '87', '100', 'Social Studies', '91', '100'],
        
        // Sample data for Class 8
        ['David Brown', 'KS005', 'Class 8', 'First Term', 'Mathematics', '85', '100', 'Science', '88', '100', 'English', '82', '100', 'Hindi', '79', '100', 'Social Studies', '86', '100'],
        ['Lisa Davis', 'KS006', 'Class 8', 'First Term', 'Mathematics', '91', '100', 'Science', '94', '100', 'English', '88', '100', 'Hindi', '85', '100', 'Social Studies', '89', '100'],
        
        // Sample data for Class 7
        ['Tom Anderson', 'KS007', 'Class 7', 'Annual', 'Mathematics', '76', '100', 'Science', '79', '100', 'English', '81', '100', 'Hindi', '77', '100', 'Social Studies', '74', '100'],
        ['Emma Taylor', 'KS008', 'Class 7', 'Annual', 'Mathematics', '89', '100', 'Science', '92', '100', 'English', '87', '100', 'Hindi', '84', '100', 'Social Studies', '88', '100'],
        
        // Sample data for LKG/UKG (fewer subjects)
        ['Alex Miller', 'KS009', 'LKG', 'Final Term', 'English', '45', '50', 'Mathematics', '42', '50', 'Drawing', '48', '50', '', '', '', '', '', ''],
        ['Sophie Clark', 'KS010', 'UKG', 'Final Term', 'English', '47', '50', 'Mathematics', '44', '50', 'Drawing', '49', '50', 'EVS', '46', '50', '', '', '']
    ];

    // Create CSV content with proper formatting
    const csvContent = templateData.map(row => 
        row.map(cell => {
            // Handle empty cells and cells with commas
            if (cell === '' || cell == null) return '';
            if (cell.toString().includes(',')) return `"${cell}"`;
            return cell;
        }).join(',')
    ).join('\n');
    
    // Add BOM for proper Excel compatibility
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'KSBA_Results_Template.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }
    
    showMessage('bulk-upload-message', '📥 Template downloaded successfully! The file contains sample data for different classes.', 'success');
}

// Export functions for global access
window.updateAdmissionStatus = updateAdmissionStatus;
window.editAdmission = editAdmission;
window.deleteAdmission = deleteAdmission;
window.downloadAdmission = downloadAdmission;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.downloadStudent = downloadStudent;
window.downloadAllStudents = downloadAllStudents;
window.closeModal = closeModal;
window.deleteAnnouncement = deleteAnnouncement;
window.deleteResult = deleteResult;
window.deleteRoutine = deleteRoutine;
window.showDetailedResult = showDetailedResult;
window.editAnnouncement = function(id) { console.log('Edit announcement:', id); };
window.editResult = editResult;
window.addEditSubjectRow = addEditSubjectRow;
window.removeEditSubjectRow = removeEditSubjectRow;
window.editRoutine = function(id) { console.log('Edit routine:', id); };
window.removeSubjectRow = removeSubjectRow;
window.removeTimeSlotRow = removeTimeSlotRow;
window.connectToGoogleSheets = connectToGoogleSheets;
window.syncWithGoogleSheets = syncWithGoogleSheets;

// Add some additional CSS for results table
const additionalStyles = `
<style>
.result-card {
    background: white;
    border-radius: 0.75rem;
    padding: 2rem;
    box-shadow: var(--shadow);
}

.result-header {
    text-align: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid var(--border-color);
}

.result-header h3 {
    font-size: 1.5rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.result-summary {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
}

.summary-item {
    background: var(--light-color);
    padding: 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.summary-item .grade {
    font-weight: 700;
    color: var(--success-color);
    font-size: 1.2rem;
}

.subjects-table h4 {
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.subjects-table table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 0.5rem;
    overflow: hidden;
    box-shadow: var(--shadow);
}

.subjects-table th,
.subjects-table td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
}

.subjects-table th {
    background: var(--gradient-primary);
    color: white;
    font-weight: 600;
}

.subjects-table tr:hover {
    background: var(--light-color);
}

.status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-transform: capitalize;
}

.status-approved {
    background: #d1fae5;
    color: #065f46;
}

.status-rejected {
    background: #fee2e2;
    color: #991b1b;
}

.status-pending {
    background: #fef3c7;
    color: #92400e;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', additionalStyles);

console.log('🎉 KSBA School Management System loaded successfully!');
