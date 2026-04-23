# IQM Creative App - Test Cases Analysis & Recommendations

## 🎨 Creative App Overview

**URL:** https://apitesting.stage.iqm.com/creatives/u/0/

### App Features Discovered
- **Creative Types:** Image (19), HTML (7), Video (11), Audio (14), Native (5)
- **Total Creatives:** 56
- **View Modes:** All Creatives, Ungrouped Creatives, Grouped Creatives
- **Main Actions:** Add New, Search, Filter by type, Select/Bulk operations
- **UI Elements:** 41 clickable elements, 10 editable elements, 6 sidebar panels

---

## 📊 Current Test Coverage

### Existing Test Files
1. **login.spec.js** - Login functionality (3 tests)
   - ✅ Successful login
   - ✅ Invalid email handling
   - ✅ Invalid password handling

2. **dashboard.spec.js** - Dashboard interactions (13 tests)
   - ✅ Button interactions (+New IO, +New Campaign, Logout, Save/Reset Dashboard)
   - ✅ Form tests (search, filter, input validation)
   - ✅ Data table tests (display, headers, sorting, pagination, filtering)

3. **explore-dashboard.spec.js** - Dashboard exploration & test planning (1 test)
   - ✅ Automated discovery of page elements and test plan generation

4. **creative-exploration.spec.js** - Creative app exploration (1 test)
   - ✅ Automated discovery of Creative app features and UI elements

---

## 🎯 Recommended New Test Cases

### 1. **Authentication & Session Management** (HIGH PRIORITY)
**Category:** Security & User Management

#### 1.1 Session Timeout Tests
- [ ] Verify user is logged out after session timeout
- [ ] Verify session timeout warning appears before logout
- [ ] Verify user can extend session before timeout
- [ ] Verify session data is cleared on timeout

#### 1.2 Password Management
- [ ] Verify password reset functionality
- [ ] Verify password change functionality
- [ ] Verify password strength validation
- [ ] Verify password visibility toggle works

#### 1.3 Multi-Session Handling
- [ ] Verify user cannot have multiple active sessions
- [ ] Verify login from different device logs out previous session
- [ ] Verify concurrent login attempts are handled

#### 1.4 Remember Me / Auto-Login
- [ ] Verify "Remember Me" checkbox functionality
- [ ] Verify auto-login with saved credentials
- [ ] Verify auto-login can be disabled

---

### 2. **Creative/Campaign Management** (HIGH PRIORITY)
**Category:** Core Functionality

#### 2.1 Create New Campaign
- [ ] Verify campaign creation form displays all required fields
- [ ] Verify campaign can be created with valid data
- [ ] Verify campaign creation fails with missing required fields
- [ ] Verify campaign creation fails with invalid data
- [ ] Verify success message appears after campaign creation
- [ ] Verify new campaign appears in campaign list
- [ ] Verify campaign ID is generated correctly

#### 2.2 Edit Campaign
- [ ] Verify campaign edit form loads existing data
- [ ] Verify campaign can be updated with valid data
- [ ] Verify campaign update fails with invalid data
- [ ] Verify changes are saved correctly
- [ ] Verify edit history is tracked

#### 2.3 Delete Campaign
- [ ] Verify delete confirmation dialog appears
- [ ] Verify campaign is deleted after confirmation
- [ ] Verify deleted campaign is removed from list
- [ ] Verify undo functionality if available
- [ ] Verify associated data is handled correctly

#### 2.4 Campaign Duplication
- [ ] Verify campaign can be duplicated
- [ ] Verify duplicated campaign has unique ID
- [ ] Verify all campaign settings are copied
- [ ] Verify duplicated campaign appears in list

#### 2.5 Campaign Status Management
- [ ] Verify campaign status can be changed (Active/Inactive/Draft)
- [ ] Verify status change is reflected immediately
- [ ] Verify status change affects campaign behavior
- [ ] Verify status history is tracked

---

### 3. **IO (Insertion Order) Management** (HIGH PRIORITY)
**Category:** Core Functionality

#### 3.1 Create New IO
- [ ] Verify IO creation form displays all required fields
- [ ] Verify IO can be created with valid data
- [ ] Verify IO creation fails with missing required fields
- [ ] Verify IO creation fails with invalid data
- [ ] Verify IO is linked to correct campaign
- [ ] Verify IO ID is generated correctly
- [ ] Verify success notification appears

#### 3.2 Edit IO
- [ ] Verify IO edit form loads existing data
- [ ] Verify IO can be updated with valid data
- [ ] Verify IO update fails with invalid data
- [ ] Verify changes are saved correctly
- [ ] Verify edit timestamp is updated

#### 3.3 Delete IO
- [ ] Verify delete confirmation dialog appears
- [ ] Verify IO is deleted after confirmation
- [ ] Verify deleted IO is removed from list
- [ ] Verify associated data is handled correctly

#### 3.4 IO Status Management
- [ ] Verify IO status can be changed
- [ ] Verify status change affects IO behavior
- [ ] Verify status transitions are valid

---

### 4. **Data Filtering & Search** (MEDIUM PRIORITY)
**Category:** User Experience

#### 4.1 Campaign Filtering
- [ ] Verify campaigns can be filtered by status
- [ ] Verify campaigns can be filtered by date range
- [ ] Verify campaigns can be filtered by name
- [ ] Verify multiple filters can be applied simultaneously
- [ ] Verify filter results are accurate
- [ ] Verify filter can be cleared

#### 4.2 IO Filtering
- [ ] Verify IOs can be filtered by campaign
- [ ] Verify IOs can be filtered by status
- [ ] Verify IOs can be filtered by date range
- [ ] Verify multiple filters work together

#### 4.3 Search Functionality
- [ ] Verify search works with partial text
- [ ] Verify search is case-insensitive
- [ ] Verify search results are highlighted
- [ ] Verify search handles special characters
- [ ] Verify search returns no results gracefully

#### 4.4 Sorting
- [ ] Verify campaigns can be sorted by name
- [ ] Verify campaigns can be sorted by date
- [ ] Verify campaigns can be sorted by status
- [ ] Verify sort order can be reversed (ASC/DESC)
- [ ] Verify sort persists across page navigation

---

### 5. **Data Export & Reporting** (MEDIUM PRIORITY)
**Category:** Data Management

#### 5.1 Export Functionality
- [ ] Verify campaigns can be exported to CSV
- [ ] Verify campaigns can be exported to Excel
- [ ] Verify campaigns can be exported to PDF
- [ ] Verify export includes all relevant data
- [ ] Verify export file is properly formatted
- [ ] Verify export file can be downloaded

#### 5.2 Report Generation
- [ ] Verify campaign performance report can be generated
- [ ] Verify IO performance report can be generated
- [ ] Verify reports include correct metrics
- [ ] Verify reports can be filtered by date range
- [ ] Verify reports can be exported

---

### 6. **Bulk Operations** (MEDIUM PRIORITY)
**Category:** Efficiency

#### 6.1 Bulk Campaign Actions
- [ ] Verify multiple campaigns can be selected
- [ ] Verify bulk status change works
- [ ] Verify bulk delete works with confirmation
- [ ] Verify bulk export works
- [ ] Verify select all/deselect all works

#### 6.2 Bulk IO Actions
- [ ] Verify multiple IOs can be selected
- [ ] Verify bulk status change works
- [ ] Verify bulk delete works
- [ ] Verify bulk operations show progress

---

### 7. **Form Validation** (MEDIUM PRIORITY)
**Category:** Data Integrity

#### 7.1 Required Field Validation
- [ ] Verify all required fields are marked
- [ ] Verify form cannot be submitted with empty required fields
- [ ] Verify error messages appear for missing fields
- [ ] Verify error messages are clear and helpful

#### 7.2 Data Type Validation
- [ ] Verify email fields accept only valid emails
- [ ] Verify numeric fields accept only numbers
- [ ] Verify date fields accept only valid dates
- [ ] Verify URL fields accept only valid URLs

#### 7.3 Field Length Validation
- [ ] Verify minimum length requirements are enforced
- [ ] Verify maximum length requirements are enforced
- [ ] Verify character count is displayed
- [ ] Verify truncation is handled gracefully

#### 7.4 Custom Validation
- [ ] Verify budget fields accept valid amounts
- [ ] Verify date ranges are valid (start < end)
- [ ] Verify duplicate names are prevented
- [ ] Verify cross-field validation works

---

### 8. **Error Handling & Edge Cases** (MEDIUM PRIORITY)
**Category:** Robustness

#### 8.1 Network Error Handling
- [ ] Verify app handles network timeout gracefully
- [ ] Verify app handles connection loss gracefully
- [ ] Verify retry mechanism works
- [ ] Verify error message is user-friendly

#### 8.2 Server Error Handling
- [ ] Verify 404 errors are handled
- [ ] Verify 500 errors are handled
- [ ] Verify 403 (permission denied) errors are handled
- [ ] Verify error messages are informative

#### 8.3 Concurrent Operations
- [ ] Verify simultaneous edits are handled
- [ ] Verify last-write-wins or conflict resolution works
- [ ] Verify user is notified of conflicts
- [ ] Verify data integrity is maintained

#### 8.4 Empty State Handling
- [ ] Verify empty campaign list displays helpful message
- [ ] Verify empty IO list displays helpful message
- [ ] Verify empty search results display helpful message
- [ ] Verify "Create New" button is visible in empty states

---

### 9. **UI/UX & Accessibility** (LOW PRIORITY)
**Category:** User Experience

#### 9.1 Responsive Design
- [ ] Verify layout works on mobile (320px)
- [ ] Verify layout works on tablet (768px)
- [ ] Verify layout works on desktop (1920px)
- [ ] Verify elements are properly aligned
- [ ] Verify text is readable on all screen sizes

#### 9.2 Keyboard Navigation
- [ ] Verify Tab key navigates through form fields
- [ ] Verify Enter key submits forms
- [ ] Verify Escape key closes modals
- [ ] Verify keyboard shortcuts work (if any)

#### 9.3 Screen Reader Support
- [ ] Verify form labels are associated with inputs
- [ ] Verify buttons have descriptive text
- [ ] Verify tables have proper headers
- [ ] Verify error messages are announced

#### 9.4 Visual Consistency
- [ ] Verify consistent button styling
- [ ] Verify consistent color scheme
- [ ] Verify consistent typography
- [ ] Verify consistent spacing

---

### 10. **Performance & Load Testing** (LOW PRIORITY)
**Category:** Performance

#### 10.1 Page Load Performance
- [ ] Verify dashboard loads within 3 seconds
- [ ] Verify campaign list loads within 2 seconds
- [ ] Verify IO list loads within 2 seconds
- [ ] Verify images load correctly

#### 10.2 Large Dataset Handling
- [ ] Verify app handles 1000+ campaigns
- [ ] Verify app handles 10000+ IOs
- [ ] Verify pagination works with large datasets
- [ ] Verify search is fast with large datasets

#### 10.3 Memory & Resource Usage
- [ ] Verify app doesn't leak memory
- [ ] Verify app handles rapid navigation
- [ ] Verify app handles rapid form submissions

---

### 11. **User Permissions & Role-Based Access** (MEDIUM PRIORITY)
**Category:** Security

#### 11.1 Admin Permissions
- [ ] Verify admin can create campaigns
- [ ] Verify admin can edit all campaigns
- [ ] Verify admin can delete campaigns
- [ ] Verify admin can manage users

#### 11.2 User Permissions
- [ ] Verify user can create campaigns
- [ ] Verify user can only edit own campaigns
- [ ] Verify user cannot delete campaigns
- [ ] Verify user cannot manage other users

#### 11.3 View-Only Permissions
- [ ] Verify view-only user can see campaigns
- [ ] Verify view-only user cannot edit
- [ ] Verify view-only user cannot delete
- [ ] Verify view-only user cannot create

#### 11.4 Permission Enforcement
- [ ] Verify disabled buttons for unauthorized actions
- [ ] Verify API rejects unauthorized requests
- [ ] Verify error message for permission denied

---

### 12. **Notifications & Alerts** (LOW PRIORITY)
**Category:** User Feedback

#### 12.1 Success Notifications
- [ ] Verify success message appears after create
- [ ] Verify success message appears after update
- [ ] Verify success message appears after delete
- [ ] Verify success message auto-dismisses

#### 12.2 Error Notifications
- [ ] Verify error message appears on failure
- [ ] Verify error message is descriptive
- [ ] Verify error message can be dismissed
- [ ] Verify error message doesn't block UI

#### 12.3 Warning Notifications
- [ ] Verify warning appears before destructive actions
- [ ] Verify warning can be acknowledged
- [ ] Verify warning can be dismissed

#### 12.4 Info Notifications
- [ ] Verify info messages appear for important updates
- [ ] Verify info messages are non-intrusive
- [ ] Verify info messages can be dismissed

---

## 📈 Test Case Priority Matrix

### 🔴 HIGH PRIORITY (Implement First)
1. Authentication & Session Management
2. Creative/Campaign Management
3. IO Management
4. Form Validation

**Estimated Test Cases:** ~40-50 tests

### 🟡 MEDIUM PRIORITY (Implement Second)
1. Data Filtering & Search
2. Data Export & Reporting
3. Bulk Operations
4. Error Handling & Edge Cases
5. User Permissions & Role-Based Access

**Estimated Test Cases:** ~50-60 tests

### 🟢 LOW PRIORITY (Implement Last)
1. UI/UX & Accessibility
2. Performance & Load Testing
3. Notifications & Alerts

**Estimated Test Cases:** ~30-40 tests

---

## 📋 Implementation Roadmap

### Phase 1: Core Functionality (Week 1-2)
- [ ] Authentication & Session Management tests
- [ ] Campaign Management tests
- [ ] IO Management tests
- [ ] Form Validation tests

### Phase 2: User Experience (Week 3-4)
- [ ] Data Filtering & Search tests
- [ ] Error Handling tests
- [ ] Bulk Operations tests
- [ ] Notifications tests

### Phase 3: Advanced Features (Week 5-6)
- [ ] Data Export & Reporting tests
- [ ] User Permissions tests
- [ ] Performance tests
- [ ] Accessibility tests

---

## 🛠️ Testing Best Practices

### Using Playwright AI Features
```javascript
// Use .or() chains for resilient selectors
const button = page.locator('button.submit')
  .or(page.locator('button[type="submit"]'))
  .or(page.getByRole('button', { name: /submit/i }))
  .first();

// Use semantic locators
await page.getByRole('button', { name: /create/i }).click();
await page.getByLabel(/email/i).fill('test@example.com');

// Use regex for flexibility
await page.getByRole('button', { name: /log ?in|sign ?in/i }).click();
```

### Test Organization
- Group related tests using `test.describe()`
- Use `test.beforeEach()` for setup
- Use `test.afterEach()` for cleanup
- Keep tests independent and isolated

### Assertions
- Use `expect()` for clear assertions
- Verify both positive and negative cases
- Check for error messages
- Verify state changes

---

## 📊 Test Metrics

### Current Coverage
- **Total Test Cases:** 17
- **Coverage Areas:** Login, Dashboard, Exploration
- **Coverage %:** ~15-20% of recommended tests

### Recommended Coverage
- **Total Test Cases:** 120-150
- **Coverage Areas:** All major features
- **Coverage %:** ~80-90% of critical paths

---

## 🚀 Next Steps

1. **Review** this analysis with the team
2. **Prioritize** test cases based on business needs
3. **Create** test files for each category
4. **Implement** tests following Playwright AI best practices
5. **Execute** tests in CI/CD pipeline
6. **Monitor** test results and coverage metrics
7. **Iterate** based on feedback and new features

