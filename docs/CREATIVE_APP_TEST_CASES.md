# IQM Creative App - Comprehensive Test Cases

## 🎨 Creative App Overview

**URL:** https://apitesting.stage.iqm.com/creatives/u/0/

### Discovered Features
- **Creative Types:** Image (19), HTML (7), Video (11), Audio (14), Native (5)
- **Total Creatives:** 56
- **View Modes:** All Creatives, Ungrouped Creatives, Grouped Creatives
- **Main Actions:** Add New, Search, Filter by type, Select/Bulk operations
- **UI Elements:** 41 clickable elements, 10 editable elements, 6 sidebar panels

---

## 📋 Test Cases by Category

### 1. 🔘 Button Interaction Tests (HIGH PRIORITY)

#### 1.1 Add New Creative Button
- [ ] **Test:** Verify "Add New" button is visible and enabled
  - **Steps:** Navigate to Creative app, locate "Add New" button
  - **Expected:** Button is visible and clickable
  
- [ ] **Test:** Verify "Add New" button opens creative creation dialog/form
  - **Steps:** Click "Add New" button
  - **Expected:** Creative creation form/modal appears
  
- [ ] **Test:** Verify "Add New" button shows loading state during submission
  - **Steps:** Click "Add New", fill form, submit
  - **Expected:** Loading indicator appears during submission

#### 1.2 Navigation Buttons
- [ ] **Test:** Verify "All Creatives" tab is clickable and loads all creatives
  - **Steps:** Click "All Creatives" tab
  - **Expected:** All 56 creatives are displayed
  
- [ ] **Test:** Verify "Ungrouped Creatives" tab filters correctly
  - **Steps:** Click "Ungrouped Creatives" tab
  - **Expected:** Only ungrouped creatives are displayed
  
- [ ] **Test:** Verify "Grouped Creatives" tab filters correctly
  - **Steps:** Click "Grouped Creatives" tab
  - **Expected:** Only grouped creatives are displayed

#### 1.3 Creative Type Filter Buttons
- [ ] **Test:** Verify "Image" filter shows only image creatives (19)
  - **Steps:** Click "Image" button/tab
  - **Expected:** Only 19 image creatives displayed
  
- [ ] **Test:** Verify "HTML" filter shows only HTML creatives (7)
  - **Steps:** Click "HTML" button/tab
  - **Expected:** Only 7 HTML creatives displayed
  
- [ ] **Test:** Verify "Video" filter shows only video creatives (11)
  - **Steps:** Click "Video" button/tab
  - **Expected:** Only 11 video creatives displayed
  
- [ ] **Test:** Verify "Audio" filter shows only audio creatives (14)
  - **Steps:** Click "Audio" button/tab
  - **Expected:** Only 14 audio creatives displayed
  
- [ ] **Test:** Verify "Native" filter shows only native creatives (5)
  - **Steps:** Click "Native" button/tab
  - **Expected:** Only 5 native creatives displayed

#### 1.4 Action Buttons on Creative Items
- [ ] **Test:** Verify edit button on creative item is clickable
  - **Steps:** Hover over creative item, click edit button
  - **Expected:** Edit form/modal opens with creative data
  
- [ ] **Test:** Verify delete button on creative item is clickable
  - **Steps:** Hover over creative item, click delete button
  - **Expected:** Delete confirmation dialog appears
  
- [ ] **Test:** Verify preview button on creative item is clickable
  - **Steps:** Hover over creative item, click preview button
  - **Expected:** Creative preview opens in modal or new view
  
- [ ] **Test:** Verify duplicate button on creative item is clickable
  - **Steps:** Hover over creative item, click duplicate button
  - **Expected:** Duplicate confirmation or new creative created

#### 1.5 Bulk Action Buttons
- [ ] **Test:** Verify "Select All" checkbox selects all creatives
  - **Steps:** Click "Select All" checkbox
  - **Expected:** All visible creatives are selected
  
- [ ] **Test:** Verify bulk delete button appears when items selected
  - **Steps:** Select multiple creatives, verify bulk delete button
  - **Expected:** Bulk delete button is visible and enabled
  
- [ ] **Test:** Verify bulk delete works with confirmation
  - **Steps:** Select creatives, click bulk delete, confirm
  - **Expected:** Selected creatives are deleted

---

### 2. 🔍 Search & Filter Tests (HIGH PRIORITY)

#### 2.1 Search Functionality
- [ ] **Test:** Verify search by creative ID works
  - **Steps:** Enter creative ID in search field
  - **Expected:** Only matching creative is displayed
  
- [ ] **Test:** Verify search by creative name works
  - **Steps:** Enter creative name in search field
  - **Expected:** Matching creatives are displayed
  
- [ ] **Test:** Verify search by 3rd Party ID works
  - **Steps:** Enter 3rd party ID in search field
  - **Expected:** Matching creative is displayed
  
- [ ] **Test:** Verify search is case-insensitive
  - **Steps:** Search with different case variations
  - **Expected:** Results are the same regardless of case
  
- [ ] **Test:** Verify search with partial text works
  - **Steps:** Enter partial creative name
  - **Expected:** All matching creatives are displayed
  
- [ ] **Test:** Verify search with special characters works
  - **Steps:** Search for creative with special characters
  - **Expected:** Creative is found correctly
  
- [ ] **Test:** Verify search returns no results gracefully
  - **Steps:** Search for non-existent creative
  - **Expected:** "No results" message appears

#### 2.2 Filter by Creative Type
- [ ] **Test:** Verify filter by Image type works
  - **Steps:** Click Image filter
  - **Expected:** Only image creatives displayed (19)
  
- [ ] **Test:** Verify filter by HTML type works
  - **Steps:** Click HTML filter
  - **Expected:** Only HTML creatives displayed (7)
  
- [ ] **Test:** Verify filter by Video type works
  - **Steps:** Click Video filter
  - **Expected:** Only video creatives displayed (11)
  
- [ ] **Test:** Verify filter by Audio type works
  - **Steps:** Click Audio filter
  - **Expected:** Only audio creatives displayed (14)
  
- [ ] **Test:** Verify filter by Native type works
  - **Steps:** Click Native filter
  - **Expected:** Only native creatives displayed (5)

#### 2.3 Combined Search & Filter
- [ ] **Test:** Verify search works with type filter applied
  - **Steps:** Apply type filter, then search
  - **Expected:** Search results respect the type filter
  
- [ ] **Test:** Verify filter works with search applied
  - **Steps:** Search for creative, then apply type filter
  - **Expected:** Filter respects the search results
  
- [ ] **Test:** Verify clearing search shows all filtered results
  - **Steps:** Search, then clear search field
  - **Expected:** All creatives of selected type are shown

#### 2.4 Filter Persistence
- [ ] **Test:** Verify filter persists on page refresh
  - **Steps:** Apply filter, refresh page
  - **Expected:** Same filter is still applied
  
- [ ] **Test:** Verify search persists on page refresh
  - **Steps:** Search for creative, refresh page
  - **Expected:** Same search results are shown

---

### 3. 📝 Creative Management Tests (HIGH PRIORITY)

#### 3.1 Create New Creative
- [ ] **Test:** Verify creative creation form displays all required fields
  - **Steps:** Click "Add New" button
  - **Expected:** Form shows all required fields (name, type, file, etc.)
  
- [ ] **Test:** Verify creative can be created with valid data
  - **Steps:** Fill form with valid data, submit
  - **Expected:** Creative is created and appears in list
  
- [ ] **Test:** Verify creative creation fails with missing required fields
  - **Steps:** Leave required fields empty, try to submit
  - **Expected:** Error message appears for missing fields
  
- [ ] **Test:** Verify creative creation fails with invalid data
  - **Steps:** Enter invalid data (e.g., wrong file type), submit
  - **Expected:** Error message appears
  
- [ ] **Test:** Verify success message appears after creation
  - **Steps:** Create creative successfully
  - **Expected:** Success notification appears
  
- [ ] **Test:** Verify new creative appears in creative list
  - **Steps:** Create creative, check list
  - **Expected:** New creative is visible in list
  
- [ ] **Test:** Verify creative ID is generated correctly
  - **Steps:** Create creative, check ID
  - **Expected:** Unique ID is assigned

#### 3.2 Edit Creative
- [ ] **Test:** Verify edit form loads existing creative data
  - **Steps:** Click edit on existing creative
  - **Expected:** Form shows current creative data
  
- [ ] **Test:** Verify creative can be updated with valid data
  - **Steps:** Edit creative data, submit
  - **Expected:** Changes are saved
  
- [ ] **Test:** Verify creative update fails with invalid data
  - **Steps:** Enter invalid data, try to submit
  - **Expected:** Error message appears
  
- [ ] **Test:** Verify changes are reflected in creative list
  - **Steps:** Edit creative, check list
  - **Expected:** Updated data is visible in list
  
- [ ] **Test:** Verify edit timestamp is updated
  - **Steps:** Edit creative, check timestamp
  - **Expected:** Timestamp shows recent edit time

#### 3.3 Delete Creative
- [ ] **Test:** Verify delete confirmation dialog appears
  - **Steps:** Click delete on creative
  - **Expected:** Confirmation dialog appears
  
- [ ] **Test:** Verify creative is deleted after confirmation
  - **Steps:** Confirm delete
  - **Expected:** Creative is removed from list
  
- [ ] **Test:** Verify delete can be cancelled
  - **Steps:** Click delete, then cancel
  - **Expected:** Creative is not deleted
  
- [ ] **Test:** Verify success message appears after delete
  - **Steps:** Delete creative
  - **Expected:** Success notification appears

#### 3.4 Duplicate Creative
- [ ] **Test:** Verify duplicate button creates copy of creative
  - **Steps:** Click duplicate on creative
  - **Expected:** New creative with same data is created
  
- [ ] **Test:** Verify duplicated creative has unique ID
  - **Steps:** Duplicate creative, check ID
  - **Expected:** New creative has different ID
  
- [ ] **Test:** Verify duplicated creative appears in list
  - **Steps:** Duplicate creative, check list
  - **Expected:** Duplicated creative is visible

#### 3.5 Creative Preview
- [ ] **Test:** Verify preview button opens creative preview
  - **Steps:** Click preview on creative
  - **Expected:** Preview modal/window opens
  
- [ ] **Test:** Verify preview displays creative correctly
  - **Steps:** Open preview
  - **Expected:** Creative is displayed properly
  
- [ ] **Test:** Verify preview can be closed
  - **Steps:** Open preview, close it
  - **Expected:** Preview closes without issues

---

### 4. ✅ Form Validation Tests (MEDIUM PRIORITY)

#### 4.1 Required Field Validation
- [ ] **Test:** Verify creative name is required
  - **Steps:** Leave name empty, try to submit
  - **Expected:** Error message appears
  
- [ ] **Test:** Verify creative type is required
  - **Steps:** Leave type unselected, try to submit
  - **Expected:** Error message appears
  
- [ ] **Test:** Verify file upload is required
  - **Steps:** Leave file empty, try to submit
  - **Expected:** Error message appears

#### 4.2 File Validation
- [ ] **Test:** Verify file size validation for images
  - **Steps:** Upload oversized image
  - **Expected:** Error message about file size
  
- [ ] **Test:** Verify file type validation for images
  - **Steps:** Upload non-image file as image
  - **Expected:** Error message about file type
  
- [ ] **Test:** Verify file type validation for videos
  - **Steps:** Upload non-video file as video
  - **Expected:** Error message about file type
  
- [ ] **Test:** Verify file type validation for audio
  - **Steps:** Upload non-audio file as audio
  - **Expected:** Error message about file type
  
- [ ] **Test:** Verify file type validation for HTML
  - **Steps:** Upload non-HTML file as HTML
  - **Expected:** Error message about file type

#### 4.3 Image Dimension Validation
- [ ] **Test:** Verify image dimension validation
  - **Steps:** Upload image with invalid dimensions
  - **Expected:** Error message about dimensions
  
- [ ] **Test:** Verify minimum image dimensions are enforced
  - **Steps:** Upload image smaller than minimum
  - **Expected:** Error message appears
  
- [ ] **Test:** Verify maximum image dimensions are enforced
  - **Steps:** Upload image larger than maximum
  - **Expected:** Error message appears

#### 4.4 Text Field Validation
- [ ] **Test:** Verify creative name length validation
  - **Steps:** Enter name exceeding max length
  - **Expected:** Error message or truncation
  
- [ ] **Test:** Verify description length validation
  - **Steps:** Enter description exceeding max length
  - **Expected:** Error message or truncation
  
- [ ] **Test:** Verify special characters are handled
  - **Steps:** Enter special characters in name
  - **Expected:** Either accepted or error message

#### 4.5 Naming Convention Validation
- [ ] **Test:** Verify duplicate creative names are prevented
  - **Steps:** Try to create creative with existing name
  - **Expected:** Error message about duplicate name
  
- [ ] **Test:** Verify creative name format validation
  - **Steps:** Enter invalid name format
  - **Expected:** Error message about format

---

### 5. 📋 Bulk Operations Tests (MEDIUM PRIORITY)

#### 5.1 Select Operations
- [ ] **Test:** Verify individual creative can be selected
  - **Steps:** Click checkbox on creative
  - **Expected:** Creative is selected (checkbox checked)
  
- [ ] **Test:** Verify multiple creatives can be selected
  - **Steps:** Click checkboxes on multiple creatives
  - **Expected:** All selected creatives are checked
  
- [ ] **Test:** Verify "Select All" selects all visible creatives
  - **Steps:** Click "Select All" checkbox
  - **Expected:** All creatives are selected
  
- [ ] **Test:** Verify "Deselect All" deselects all creatives
  - **Steps:** Select all, then click "Deselect All"
  - **Expected:** All creatives are deselected

#### 5.2 Bulk Delete
- [ ] **Test:** Verify bulk delete button appears when items selected
  - **Steps:** Select creatives
  - **Expected:** Bulk delete button is visible
  
- [ ] **Test:** Verify bulk delete confirmation dialog appears
  - **Steps:** Click bulk delete button
  - **Expected:** Confirmation dialog appears
  
- [ ] **Test:** Verify bulk delete works with confirmation
  - **Steps:** Confirm bulk delete
  - **Expected:** Selected creatives are deleted
  
- [ ] **Test:** Verify bulk delete can be cancelled
  - **Steps:** Click bulk delete, then cancel
  - **Expected:** Creatives are not deleted

#### 5.3 Bulk Status Change
- [ ] **Test:** Verify bulk status change button appears when items selected
  - **Steps:** Select creatives
  - **Expected:** Bulk status change button is visible
  
- [ ] **Test:** Verify bulk status change works
  - **Steps:** Select creatives, change status
  - **Expected:** All selected creatives status is updated

#### 5.4 Bulk Export
- [ ] **Test:** Verify bulk export button appears when items selected
  - **Steps:** Select creatives
  - **Expected:** Bulk export button is visible
  
- [ ] **Test:** Verify bulk export works
  - **Steps:** Select creatives, click export
  - **Expected:** Export file is downloaded

---

### 6. 🎯 Creative Type Specific Tests (MEDIUM PRIORITY)

#### 6.1 Image Creative Tests
- [ ] **Test:** Verify image creative displays thumbnail
  - **Steps:** View image creative in list
  - **Expected:** Thumbnail is displayed
  
- [ ] **Test:** Verify image dimensions are shown
  - **Steps:** View image creative details
  - **Expected:** Dimensions are displayed
  
- [ ] **Test:** Verify image file size is shown
  - **Steps:** View image creative details
  - **Expected:** File size is displayed

#### 6.2 Video Creative Tests
- [ ] **Test:** Verify video creative displays thumbnail
  - **Steps:** View video creative in list
  - **Expected:** Video thumbnail is displayed
  
- [ ] **Test:** Verify video duration is shown
  - **Steps:** View video creative details
  - **Expected:** Duration is displayed
  
- [ ] **Test:** Verify video can be previewed
  - **Steps:** Click preview on video creative
  - **Expected:** Video player opens

#### 6.3 Audio Creative Tests
- [ ] **Test:** Verify audio creative displays icon
  - **Steps:** View audio creative in list
  - **Expected:** Audio icon is displayed
  
- [ ] **Test:** Verify audio duration is shown
  - **Steps:** View audio creative details
  - **Expected:** Duration is displayed
  
- [ ] **Test:** Verify audio can be previewed
  - **Steps:** Click preview on audio creative
  - **Expected:** Audio player opens

#### 6.4 HTML Creative Tests
- [ ] **Test:** Verify HTML creative displays preview
  - **Steps:** View HTML creative in list
  - **Expected:** HTML preview is displayed
  
- [ ] **Test:** Verify HTML can be edited
  - **Steps:** Click edit on HTML creative
  - **Expected:** HTML editor opens

#### 6.5 Native Creative Tests
- [ ] **Test:** Verify native creative displays correctly
  - **Steps:** View native creative in list
  - **Expected:** Native creative is displayed
  
- [ ] **Test:** Verify native creative can be previewed
  - **Steps:** Click preview on native creative
  - **Expected:** Preview opens

---

### 7. 🔐 Error Handling & Edge Cases (MEDIUM PRIORITY)

#### 7.1 Network Error Handling
- [ ] **Test:** Verify app handles network timeout gracefully
  - **Steps:** Simulate network timeout during creative load
  - **Expected:** Error message appears, user can retry
  
- [ ] **Test:** Verify app handles connection loss gracefully
  - **Steps:** Simulate connection loss
  - **Expected:** Error message appears, user can retry
  
- [ ] **Test:** Verify retry mechanism works
  - **Steps:** Trigger error, click retry
  - **Expected:** Operation is retried

#### 7.2 Server Error Handling
- [ ] **Test:** Verify 404 errors are handled
  - **Steps:** Try to access non-existent creative
  - **Expected:** Error message appears
  
- [ ] **Test:** Verify 500 errors are handled
  - **Steps:** Simulate server error
  - **Expected:** Error message appears
  
- [ ] **Test:** Verify 403 (permission denied) errors are handled
  - **Steps:** Try to access unauthorized creative
  - **Expected:** Error message appears

#### 7.3 Concurrent Operations
- [ ] **Test:** Verify simultaneous edits are handled
  - **Steps:** Edit same creative from two sessions
  - **Expected:** Conflict is handled gracefully
  
- [ ] **Test:** Verify last-write-wins or conflict resolution works
  - **Steps:** Edit same creative concurrently
  - **Expected:** One version is saved, user is notified

#### 7.4 Empty State Handling
- [ ] **Test:** Verify empty creative list displays helpful message
  - **Steps:** Filter to show no creatives
  - **Expected:** "No creatives" message appears
  
- [ ] **Test:** Verify "Add New" button is visible in empty state
  - **Steps:** View empty creative list
  - **Expected:** "Add New" button is visible

---

### 8. 🎨 UI/UX & Accessibility Tests (LOW PRIORITY)

#### 8.1 Responsive Design
- [ ] **Test:** Verify layout works on mobile (320px)
  - **Steps:** View app on mobile device
  - **Expected:** Layout is responsive and usable
  
- [ ] **Test:** Verify layout works on tablet (768px)
  - **Steps:** View app on tablet device
  - **Expected:** Layout is responsive and usable
  
- [ ] **Test:** Verify layout works on desktop (1920px)
  - **Steps:** View app on desktop
  - **Expected:** Layout is responsive and usable

#### 8.2 Keyboard Navigation
- [ ] **Test:** Verify Tab key navigates through elements
  - **Steps:** Use Tab key to navigate
  - **Expected:** Focus moves through interactive elements
  
- [ ] **Test:** Verify Enter key activates buttons
  - **Steps:** Focus on button, press Enter
  - **Expected:** Button is activated
  
- [ ] **Test:** Verify Escape key closes modals
  - **Steps:** Open modal, press Escape
  - **Expected:** Modal closes

#### 8.3 Screen Reader Support
- [ ] **Test:** Verify buttons have descriptive text
  - **Steps:** Check button labels with screen reader
  - **Expected:** Labels are clear and descriptive
  
- [ ] **Test:** Verify form labels are associated with inputs
  - **Steps:** Check form with screen reader
  - **Expected:** Labels are properly associated
  
- [ ] **Test:** Verify error messages are announced
  - **Steps:** Trigger error with screen reader active
  - **Expected:** Error message is announced

#### 8.4 Visual Consistency
- [ ] **Test:** Verify consistent button styling
  - **Steps:** Compare button styles across app
  - **Expected:** All buttons have consistent styling
  
- [ ] **Test:** Verify consistent color scheme
  - **Steps:** Check color usage across app
  - **Expected:** Colors are consistent
  
- [ ] **Test:** Verify consistent typography
  - **Steps:** Check font usage across app
  - **Expected:** Fonts are consistent

---

### 9. ⚡ Performance Tests (LOW PRIORITY)

#### 9.1 Page Load Performance
- [ ] **Test:** Verify creative list loads within 3 seconds
  - **Steps:** Measure page load time
  - **Expected:** Page loads in < 3 seconds
  
- [ ] **Test:** Verify creative details load within 2 seconds
  - **Steps:** Open creative details
  - **Expected:** Details load in < 2 seconds
  
- [ ] **Test:** Verify search results load within 2 seconds
  - **Steps:** Perform search
  - **Expected:** Results load in < 2 seconds

#### 9.2 Large Dataset Handling
- [ ] **Test:** Verify app handles 1000+ creatives
  - **Steps:** Load app with many creatives
  - **Expected:** App remains responsive
  
- [ ] **Test:** Verify search is fast with large datasets
  - **Steps:** Search with many creatives
  - **Expected:** Search completes quickly

#### 9.3 Memory & Resource Usage
- [ ] **Test:** Verify app doesn't leak memory
  - **Steps:** Monitor memory usage during extended use
  - **Expected:** Memory usage remains stable
  
- [ ] **Test:** Verify app handles rapid navigation
  - **Steps:** Rapidly navigate between creatives
  - **Expected:** App remains responsive

---

### 10. 🔔 Notifications & Alerts Tests (LOW PRIORITY)

#### 10.1 Success Notifications
- [ ] **Test:** Verify success message appears after create
  - **Steps:** Create creative
  - **Expected:** Success notification appears
  
- [ ] **Test:** Verify success message appears after update
  - **Steps:** Update creative
  - **Expected:** Success notification appears
  
- [ ] **Test:** Verify success message appears after delete
  - **Steps:** Delete creative
  - **Expected:** Success notification appears
  
- [ ] **Test:** Verify success message auto-dismisses
  - **Steps:** Trigger success notification
  - **Expected:** Notification disappears after timeout

#### 10.2 Error Notifications
- [ ] **Test:** Verify error message appears on failure
  - **Steps:** Trigger error
  - **Expected:** Error notification appears
  
- [ ] **Test:** Verify error message is descriptive
  - **Steps:** Trigger error
  - **Expected:** Error message explains the issue
  
- [ ] **Test:** Verify error message can be dismissed
  - **Steps:** Trigger error, close notification
  - **Expected:** Notification closes

#### 10.3 Warning Notifications
- [ ] **Test:** Verify warning appears before destructive actions
  - **Steps:** Attempt delete
  - **Expected:** Warning appears
  
- [ ] **Test:** Verify warning can be acknowledged
  - **Steps:** View warning, click confirm
  - **Expected:** Action proceeds

---

## 📊 Test Case Summary

### By Priority
- **🔴 HIGH PRIORITY:** 40+ tests
  - Button Interactions
  - Search & Filter
  - Creative Management
  - Form Validation

- **🟡 MEDIUM PRIORITY:** 50+ tests
  - Bulk Operations
  - Creative Type Specific
  - Error Handling
  - Notifications

- **🟢 LOW PRIORITY:** 30+ tests
  - UI/UX & Accessibility
  - Performance
  - Advanced Features

### Total Estimated Test Cases: 120-150

---

## 🚀 Implementation Roadmap

### Phase 1: Core Functionality (Week 1-2)
- [ ] Button Interaction tests
- [ ] Search & Filter tests
- [ ] Creative Management tests (CRUD)
- [ ] Form Validation tests

### Phase 2: Advanced Features (Week 3-4)
- [ ] Bulk Operations tests
- [ ] Creative Type Specific tests
- [ ] Error Handling tests
- [ ] Notifications tests

### Phase 3: Quality & Performance (Week 5-6)
- [ ] UI/UX & Accessibility tests
- [ ] Performance tests
- [ ] Edge case tests
- [ ] Integration tests

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
await page.getByRole('button', { name: /add new/i }).click();
await page.getByLabel(/search/i).fill('creative name');

// Use regex for flexibility
await page.getByRole('button', { name: /delete|remove/i }).click();
```

### Test Organization
```javascript
test.describe('Creative Management', () => {
  test.beforeEach(async ({ page }) => {
    // Setup: Login and navigate to creative app
  });

  test('Create new creative', async ({ page }) => {
    // Test implementation
  });

  test.afterEach(async ({ page }) => {
    // Cleanup: Delete test data
  });
});
```

### Assertions
```javascript
// Verify element visibility
await expect(button).toBeVisible();

// Verify element state
await expect(button).toBeEnabled();

// Verify text content
await expect(heading).toContainText('Creatives');

// Verify URL
await expect(page).toHaveURL(/creatives/);
```

---

## 📈 Coverage Goals

### Current Coverage
- **Test Files:** 4
- **Test Cases:** 18
- **Coverage %:** ~15%

### Target Coverage
- **Test Files:** 8-10
- **Test Cases:** 120-150
- **Coverage %:** ~80-90%

---

## 🎯 Next Steps

1. **Review** this test case document
2. **Prioritize** based on business needs
3. **Create** test files for each category
4. **Implement** tests following best practices
5. **Execute** tests in CI/CD pipeline
6. **Monitor** test results and coverage
7. **Iterate** based on feedback

