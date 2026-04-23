/**
 * Test Data Builder
 * Provides factory methods for creating test data
 */

/**
 * Generate unique creative name
 */
function generateUniqueName(prefix = 'Test Creative') {
  return `${prefix} ${Date.now()}`;
}

/**
 * Generate unique email
 */
function generateUniqueEmail(prefix = 'test') {
  return `${prefix}${Date.now()}@example.com`;
}

/**
 * Creative data builder
 */
export class CreativeDataBuilder {
  /**
   * Create basic creative data
   */
  static createCreative(overrides = {}) {
    return {
      name: generateUniqueName('Creative'),
      type: 'image',
      description: 'Test creative description',
      ...overrides,
    };
  }

  /**
   * Create image creative
   */
  static createImageCreative(overrides = {}) {
    return this.createCreative({
      type: 'image',
      ...overrides,
    });
  }

  /**
   * Create video creative
   */
  static createVideoCreative(overrides = {}) {
    return this.createCreative({
      type: 'video',
      ...overrides,
    });
  }

  /**
   * Create audio creative
   */
  static createAudioCreative(overrides = {}) {
    return this.createCreative({
      type: 'audio',
      ...overrides,
    });
  }

  /**
   * Create HTML creative
   */
  static createHtmlCreative(overrides = {}) {
    return this.createCreative({
      type: 'html',
      ...overrides,
    });
  }

  /**
   * Create native creative
   */
  static createNativeCreative(overrides = {}) {
    return this.createCreative({
      type: 'native',
      ...overrides,
    });
  }

  /**
   * Create multiple creatives
   */
  static createBulkCreatives(count, type = 'image', overrides = {}) {
    return Array.from({ length: count }, (_, i) => 
      this.createCreative({
        name: generateUniqueName(`Creative ${i + 1}`),
        type,
        ...overrides,
      })
    );
  }

  /**
   * Create creative with all fields
   */
  static createCompleteCreative(overrides = {}) {
    return this.createCreative({
      name: generateUniqueName('Complete Creative'),
      type: 'image',
      description: 'Complete test creative with all fields',
      tags: ['test', 'automation'],
      status: 'active',
      ...overrides,
    });
  }

  /**
   * Create creative with minimal fields
   */
  static createMinimalCreative(overrides = {}) {
    return {
      name: generateUniqueName('Minimal Creative'),
      ...overrides,
    };
  }

  /**
   * Create creative with invalid data
   */
  static createInvalidCreative(overrides = {}) {
    return {
      name: '', // Invalid: empty name
      type: 'invalid-type', // Invalid: unknown type
      ...overrides,
    };
  }

  /**
   * Create creative with special characters
   */
  static createCreativeWithSpecialChars(overrides = {}) {
    return this.createCreative({
      name: `Creative @#$%^&*() ${Date.now()}`,
      description: 'Description with special chars: @#$%^&*()',
      ...overrides,
    });
  }

  /**
   * Create creative with long name
   */
  static createCreativeWithLongName(overrides = {}) {
    const longName = 'A'.repeat(255) + ` ${Date.now()}`;
    return this.createCreative({
      name: longName,
      ...overrides,
    });
  }

  /**
   * Create creative with unicode characters
   */
  static createCreativeWithUnicode(overrides = {}) {
    return this.createCreative({
      name: `Creative 测试 🎨 ${Date.now()}`,
      description: 'Description with unicode: 日本語 العربية 한국어',
      ...overrides,
    });
  }
}

/**
 * Search data builder
 */
export class SearchDataBuilder {
  /**
   * Create search query
   */
  static createSearchQuery(overrides = {}) {
    return {
      query: 'test',
      type: null,
      status: null,
      dateFrom: null,
      dateTo: null,
      ...overrides,
    };
  }

  /**
   * Create search by name
   */
  static searchByName(name) {
    return this.createSearchQuery({ query: name });
  }

  /**
   * Create search by type
   */
  static searchByType(type) {
    return this.createSearchQuery({ type });
  }

  /**
   * Create search by status
   */
  static searchByStatus(status) {
    return this.createSearchQuery({ status });
  }

  /**
   * Create search by date range
   */
  static searchByDateRange(dateFrom, dateTo) {
    return this.createSearchQuery({ dateFrom, dateTo });
  }

  /**
   * Create advanced search
   */
  static createAdvancedSearch(overrides = {}) {
    return this.createSearchQuery({
      query: 'test',
      type: 'image',
      status: 'active',
      dateFrom: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
      dateTo: new Date(),
      ...overrides,
    });
  }
}

/**
 * Filter data builder
 */
export class FilterDataBuilder {
  /**
   * Create filter
   */
  static createFilter(overrides = {}) {
    return {
      type: null,
      status: null,
      dateRange: null,
      ...overrides,
    };
  }

  /**
   * Create filter by type
   */
  static filterByType(type) {
    return this.createFilter({ type });
  }

  /**
   * Create filter by status
   */
  static filterByStatus(status) {
    return this.createFilter({ status });
  }

  /**
   * Create filter by date range
   */
  static filterByDateRange(dateRange) {
    return this.createFilter({ dateRange });
  }

  /**
   * Create multiple filters
   */
  static createMultipleFilters(overrides = {}) {
    return this.createFilter({
      type: 'image',
      status: 'active',
      dateRange: 'last30days',
      ...overrides,
    });
  }
}

/**
 * Bulk operation data builder
 */
export class BulkOperationDataBuilder {
  /**
   * Create bulk delete operation
   */
  static createBulkDelete(creativeIds = []) {
    return {
      operation: 'delete',
      creativeIds,
    };
  }

  /**
   * Create bulk status change operation
   */
  static createBulkStatusChange(creativeIds = [], newStatus = 'active') {
    return {
      operation: 'updateStatus',
      creativeIds,
      newStatus,
    };
  }

  /**
   * Create bulk export operation
   */
  static createBulkExport(creativeIds = [], format = 'csv') {
    return {
      operation: 'export',
      creativeIds,
      format,
    };
  }

  /**
   * Create bulk tag operation
   */
  static createBulkTag(creativeIds = [], tags = []) {
    return {
      operation: 'addTags',
      creativeIds,
      tags,
    };
  }
}

/**
 * Validation data builder
 */
export class ValidationDataBuilder {
  /**
   * Create validation test cases
   */
  static getValidationTestCases() {
    return [
      {
        name: 'Empty name',
        data: { name: '' },
        shouldFail: true,
        errorMessage: 'Name is required',
      },
      {
        name: 'Valid name',
        data: { name: 'Test Creative' },
        shouldFail: false,
      },
      {
        name: 'Name with special characters',
        data: { name: 'Test @#$%^&*()' },
        shouldFail: false,
      },
      {
        name: 'Very long name',
        data: { name: 'A'.repeat(300) },
        shouldFail: true,
        errorMessage: 'Name is too long',
      },
      {
        name: 'Invalid type',
        data: { type: 'invalid-type' },
        shouldFail: true,
        errorMessage: 'Invalid creative type',
      },
      {
        name: 'Valid type',
        data: { type: 'image' },
        shouldFail: false,
      },
    ];
  }

  /**
   * Create field validation test cases
   */
  static getFieldValidationCases() {
    return {
      name: [
        { value: '', valid: false },
        { value: 'Valid Name', valid: true },
        { value: 'A'.repeat(255), valid: true },
        { value: 'A'.repeat(256), valid: false },
      ],
      type: [
        { value: 'image', valid: true },
        { value: 'video', valid: true },
        { value: 'audio', valid: true },
        { value: 'html', valid: true },
        { value: 'native', valid: true },
        { value: 'invalid', valid: false },
      ],
      description: [
        { value: '', valid: true },
        { value: 'Valid description', valid: true },
        { value: 'A'.repeat(1000), valid: true },
      ],
    };
  }
}

/**
 * Error scenario data builder
 */
export class ErrorScenarioDataBuilder {
  /**
   * Get error scenarios
   */
  static getErrorScenarios() {
    return [
      {
        name: 'Network error',
        scenario: 'Simulate network failure',
        expectedError: 'Network error',
      },
      {
        name: 'Server error',
        scenario: 'Simulate 500 server error',
        expectedError: 'Server error',
      },
      {
        name: 'Unauthorized',
        scenario: 'Simulate 401 unauthorized',
        expectedError: 'Unauthorized',
      },
      {
        name: 'Not found',
        scenario: 'Simulate 404 not found',
        expectedError: 'Not found',
      },
      {
        name: 'Timeout',
        scenario: 'Simulate request timeout',
        expectedError: 'Timeout',
      },
    ];
  }

  /**
   * Get conflict scenarios
   */
  static getConflictScenarios() {
    return [
      {
        name: 'Duplicate name',
        scenario: 'Create creative with existing name',
        expectedError: 'Creative with this name already exists',
      },
      {
        name: 'Concurrent edit',
        scenario: 'Edit creative being edited by another user',
        expectedError: 'Creative is being edited',
      },
      {
        name: 'Deleted creative',
        scenario: 'Edit creative that was deleted',
        expectedError: 'Creative not found',
      },
    ];
  }
}
