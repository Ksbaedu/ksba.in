// KSBA School Management System - Main Application
console.log('🏫 KSBA School Management System v1.0');

// Application State
const appState = {
    currentPage: 'home',
    isAuthenticated: false,
    data: {
        students: [],
        teachers: [],
        classes: [],
        admissions: [],
        results: [],
        announcements: [],
        routines: []
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
    console.log('📁 Initializing application...');
    
    loadAppData();
    initializeEventListeners();
    showPage('home');
    
    console.log('✅ Application initialized successfully');
});

// Data Management
function loadAppData() {
    const savedData = localStorage.getItem('ksba_data');
    if (savedData) {
        try {
            const parsedData = JSON.parse(savedData);
            appState.data = { ...appState.data, ...parsedData };
            console.log('📁 Data loaded from localStorage');
        } catch (error) {
            console.error('❌ Error loading data:', error);
        }
    }
    
    // Initialize with sample data if empty
    initializeSampleData();
}

function saveAppData() {
    try {
        localStorage.setItem('ksba_data', JSON.stringify(appState.data));
        console.log('💾 Data saved to localStorage');
    } catch (error) {
        console.error('❌ Error saving data:', error);
    }
}

function initializeSampleData() {
    // Sample announcements
    if (appState.data.announcements.length === 0) {
        appState.data.announcements = [
            {
                id: 1,
                title: 'Welcome to New Academic Year',
                content: 'Classes will commence from January 15, 2025. All students are requested to report on time.',
                date: '2024-12-28',
                status: 'active'
            }
        ];
    }

    // Sample results
    if (appState.data.results.length === 0) {
        appState.data.results = [
            {
                id: 1,
                studentName: 'Aarav Sharma',
                rollNumber: 'KS001',
                class: 'Class 5',
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
                class: 'Class 5',
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
            }
        ];
    }
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
        searchBtn.addEventListener('click', handleResultsSearch);
    }

    const clearFiltersBtn = document.getElementById('clear-filters-btn');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearResultsFilters);
    }

    const showAllBtn = document.getElementById('show-all-results-btn');
    if (showAllBtn) {
        showAllBtn.addEventListener('click', showAllResults);
    }

    // Admin Login
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', handleAdminLogin);
    }
}

// Page Navigation
function showPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    const targetPage = document.getElementById(pageId + '-page');
    if (targetPage) {
        targetPage.classList.add('active');
        appState.currentPage = pageId;
        
        // Update navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-page="${pageId}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    // Load page-specific data
    switch (pageId) {
        case 'home':
            loadHomeData();
            break;
        case 'results':
            // Results page is ready
            break;
        case 'admin':
            if (!appState.isAuthenticated) {
                showAdminLogin();
            } else {
                showAdminDashboard();
            }
            break;
    }
}

// Home Page Functions
function loadHomeData() {
    updateHomePageStats();
    loadHomeAnnouncements();
}

function updateHomePageStats() {
    const homeStudentsEl = document.getElementById('total-students');
    
    if (homeStudentsEl) {
        // Count approved admissions as students
        const approvedStudents = appState.data.admissions.filter(admission => 
            admission.status === 'approved'
        ).length;
        
        // Add existing students count
        const totalStudents = appState.data.students.length + approvedStudents;
        
        // Animate the counter
        animateCounter(homeStudentsEl, parseInt(homeStudentsEl.textContent) || 0, totalStudents);
    }
}

function animateCounter(element, start, end) {
    const duration = 1000; // 1 second
    const increment = (end - start) / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
            current = end;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
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
        age: formData.get('age'),
        class: formData.get('class'),
        parent_name: formData.get('parent_name'),
        parent_contact: formData.get('parent_contact'),
        parent_email: formData.get('parent_email'),
        address: formData.get('address'),
        applicationDate: new Date().toISOString().split('T')[0],
        status: 'pending'
    };

    // Add to admissions array
    appState.data.admissions.push(admissionData);
    
    // Save data
    saveAppData();

    // Show success message
    showMessage('admission-message', '✅ Application submitted successfully! You will be contacted soon.', 'success');
    
    // Reset form
    e.target.reset();

    // Update home page student count immediately
    updateHomePageStats();

    console.log('📝 New admission application:', admissionData);
}

// Results Functions
function handleResultsSearch() {
    const searchTerm = document.getElementById('result-search').value.trim();
    const classFilter = document.getElementById('result-class-filter').value;
    const sectionFilter = document.getElementById('result-section-filter').value;
    const examFilter = document.getElementById('result-exam-filter').value;
    const resultsDisplay = document.getElementById('results-display');

    // Filter results based on all criteria
    let filteredResults = appState.data.results.filter(result => {
        const matchesSearch = !searchTerm || 
            result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesClass = !classFilter || result.class === classFilter;
        const matchesSection = !sectionFilter || result.section === sectionFilter;
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
        displaySingleResult(filteredResults[0]);
    } else {
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
                ${results.map(result => `
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
    const searchTerm = document.getElementById('result-search').value.trim();
    const classFilter = document.getElementById('result-class-filter').value;
    const sectionFilter = document.getElementById('result-section-filter').value;
    const examFilter = document.getElementById('result-exam-filter').value;
    const resultsDisplay = document.getElementById('results-display');

    const hasFilters = searchTerm || classFilter || sectionFilter || examFilter;
    
    if (!hasFilters) {
        resultsDisplay.innerHTML = '<div class="no-results">Please apply some search criteria first, then click "Show All Matching"</div>';
        return;
    }

    let filteredResults = appState.data.results.filter(result => {
        const matchesSearch = !searchTerm || 
            result.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            result.studentName.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesClass = !classFilter || result.class === classFilter;
        const matchesSection = !sectionFilter || result.section === sectionFilter;
        const matchesExam = !examFilter || result.examType === examFilter;
        
        return matchesSearch && matchesClass && matchesSection && matchesExam;
    });

    if (filteredResults.length === 0) {
        resultsDisplay.innerHTML = '<div class="no-results">No results found matching your search criteria</div>';
        return;
    }
    
    displayMultipleResults(filteredResults);
}

// Admin Functions
function handleAdminLogin(e) {
    e.preventDefault();
    
    const password = document.getElementById('admin-password').value;
    
    if (password === 'admin123') {
        appState.isAuthenticated = true;
        showAdminDashboard();
        showMessage('login-message', '✅ Login successful!', 'success');
    } else {
        showMessage('login-message', '❌ Invalid password!', 'error');
    }
}

function showAdminLogin() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="login-container">
            <div class="login-form">
                <h3>🔐 Admin Login</h3>
                <form id="login-form">
                    <div class="form-group">
                        <label for="admin-password">Password</label>
                        <input type="password" id="admin-password" required>
                    </div>
                    <button type="submit" class="submit-btn">Login</button>
                </form>
                <div id="login-message" class="message"></div>
            </div>
        </div>
    `;
    
    // Re-attach event listener
    document.getElementById('login-form').addEventListener('submit', handleAdminLogin);
}

function showAdminDashboard() {
    const adminContent = document.getElementById('admin-content');
    adminContent.innerHTML = `
        <div class="admin-dashboard">
            <div class="dashboard-header">
                <h3>📊 Admin Dashboard</h3>
                <button onclick="logout()" class="logout-btn">🚪 Logout</button>
            </div>
            
            <div class="dashboard-stats">
                <div class="stat-card">
                    <h4>👥 Total Students</h4>
                    <p class="stat-number">${appState.data.students.length + appState.data.admissions.filter(a => a.status === 'approved').length}</p>
                </div>
                <div class="stat-card">
                    <h4>📝 Pending Admissions</h4>
                    <p class="stat-number">${appState.data.admissions.filter(a => a.status === 'pending').length}</p>
                </div>
                <div class="stat-card">
                    <h4>📊 Total Results</h4>
                    <p class="stat-number">${appState.data.results.length}</p>
                </div>
                <div class="stat-card">
                    <h4>📢 Active Announcements</h4>
                    <p class="stat-number">${appState.data.announcements.filter(a => a.status === 'active').length}</p>
                </div>
            </div>
            
            <div class="admin-sections">
                <div class="admin-section">
                    <h4>📝 Recent Admissions</h4>
                    <div class="admissions-list">
                        ${appState.data.admissions.slice(-5).map(admission => `
                            <div class="admission-item">
                                <div class="admission-info">
                                    <h5>${admission.name}</h5>
                                    <p>Class: ${admission.class} | Applied: ${formatDate(admission.applicationDate)}</p>
                                </div>
                                <div class="admission-actions">
                                    ${admission.status === 'pending' ? `
                                        <button class="btn-approve" onclick="updateAdmissionStatus(${admission.id}, 'approved')">✅ Approve</button>
                                        <button class="btn-reject" onclick="updateAdmissionStatus(${admission.id}, 'rejected')">❌ Reject</button>
                                    ` : `
                                        <span class="status-badge status-${admission.status}">${admission.status}</span>
                                    `}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function updateAdmissionStatus(id, status) {
    const admission = appState.data.admissions.find(a => a.id === id);
    if (admission) {
        admission.status = status;
        saveAppData();
        showAdminDashboard();
        updateHomePageStats(); // Update home page student count
        showMessage('admin-message', `✅ Admission ${status} successfully!`, 'success');
    }
}

function logout() {
    appState.isAuthenticated = false;
    showAdminLogin();
}

// Utility Functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showMessage(elementId, message, type) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = `<div class="message ${type}">${message}</div>`;
        setTimeout(() => {
            element.innerHTML = '';
        }, 5000);
    }
}

// Export functions for global access
window.showPage = showPage;
window.showDetailedResult = showDetailedResult;
window.updateAdmissionStatus = updateAdmissionStatus;
window.logout = logout;
