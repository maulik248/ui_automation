/**
 * Test Data Loader
 * Utility for loading test data from fixtures and files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Load JSON fixture file
 */
export function loadFixture(fixtureName) {
  const fixturePath = path.join(__dirname, '../testdata/fixtures', `${fixtureName}.json`);
  
  if (!fs.existsSync(fixturePath)) {
    throw new Error(`Fixture file not found: ${fixturePath}`);
  }
  
  const fileContent = fs.readFileSync(fixturePath, 'utf-8');
  return JSON.parse(fileContent);
}

/**
 * Get creative fixture by key
 */
export function getCreativeFixture(key) {
  const fixtures = loadFixture('creative-fixtures');
  
  // Navigate nested keys (e.g., 'validCreatives.imageCreative')
  const keys = key.split('.');
  let value = fixtures;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      throw new Error(`Fixture key not found: ${key}`);
    }
  }
  
  return value;
}

/**
 * Get all valid creatives
 */
export function getAllValidCreatives() {
  const fixtures = loadFixture('creative-fixtures');
  return fixtures.validCreatives;
}

/**
 * Get all invalid creatives
 */
export function getAllInvalidCreatives() {
  const fixtures = loadFixture('creative-fixtures');
  return fixtures.invalidCreatives;
}

/**
 * Get all edge case creatives
 */
export function getAllEdgeCaseCreatives() {
  const fixtures = loadFixture('creative-fixtures');
  return fixtures.edgeCaseCreatives;
}

/**
 * Get creative file path
 */
export function getCreativeFilePath(type, filename) {
  const validTypes = ['images', 'videos', 'audio', 'html'];
  
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid creative type: ${type}. Valid types: ${validTypes.join(', ')}`);
  }
  
  const filePath = path.join(__dirname, '../testdata/creatives', type, filename);
  
  if (!fs.existsSync(filePath)) {
    throw new Error(`Creative file not found: ${filePath}`);
  }
  
  return filePath;
}

/**
 * List all creative files of a type
 */
export function listCreativeFiles(type) {
  const validTypes = ['images', 'videos', 'audio', 'html'];
  
  if (!validTypes.includes(type)) {
    throw new Error(`Invalid creative type: ${type}. Valid types: ${validTypes.join(', ')}`);
  }
  
  const dirPath = path.join(__dirname, '../testdata/creatives', type);
  
  if (!fs.existsSync(dirPath)) {
    return [];
  }
  
  return fs.readdirSync(dirPath).filter(file => {
    const filePath = path.join(dirPath, file);
    return fs.statSync(filePath).isFile();
  });
}

/**
 * Get all creative files
 */
export function getAllCreativeFiles() {
  const types = ['images', 'videos', 'audio', 'html'];
  const allFiles = {};
  
  for (const type of types) {
    allFiles[type] = listCreativeFiles(type);
  }
  
  return allFiles;
}

/**
 * Check if creative file exists
 */
export function creativeFileExists(type, filename) {
  try {
    getCreativeFilePath(type, filename);
    return true;
  } catch {
    return false;
  }
}

/**
 * Get fixture statistics
 */
export function getFixtureStats() {
  const fixtures = loadFixture('creative-fixtures');
  
  return {
    validCreatives: Object.keys(fixtures.validCreatives).length,
    invalidCreatives: Object.keys(fixtures.invalidCreatives).length,
    edgeCaseCreatives: Object.keys(fixtures.edgeCaseCreatives).length,
    bulkCreatives: Object.keys(fixtures.bulkCreatives).length,
    searchTestData: Object.keys(fixtures.searchTestData).length,
    updateTestData: Object.keys(fixtures.updateTestData).length,
    deleteTestData: Object.keys(fixtures.deleteTestData).length,
    duplicateTestData: Object.keys(fixtures.duplicateTestData).length,
  };
}

/**
 * Get creative file statistics
 */
export function getCreativeFileStats() {
  const allFiles = getAllCreativeFiles();
  
  return {
    images: allFiles.images.length,
    videos: allFiles.videos.length,
    audio: allFiles.audio.length,
    html: allFiles.html.length,
    total: Object.values(allFiles).reduce((sum, arr) => sum + arr.length, 0),
  };
}

/**
 * Create test data with timestamp
 */
export function createTestDataWithTimestamp(baseData) {
  return {
    ...baseData,
    name: `${baseData.name} ${Date.now()}`,
  };
}

/**
 * Create multiple test data items
 */
export function createMultipleTestData(baseData, count) {
  return Array.from({ length: count }, (_, i) => ({
    ...baseData,
    name: `${baseData.name} ${i + 1} ${Date.now()}`,
  }));
}

/**
 * Merge fixture data with overrides
 */
export function mergeFixtureData(fixtureKey, overrides = {}) {
  const fixtureData = getCreativeFixture(fixtureKey);
  return {
    ...fixtureData,
    ...overrides,
  };
}

/**
 * Get random creative fixture
 */
export function getRandomCreativeFixture() {
  const validCreatives = getAllValidCreatives();
  const keys = Object.keys(validCreatives);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return validCreatives[randomKey];
}

/**
 * Get random creative file
 */
export function getRandomCreativeFile(type) {
  const files = listCreativeFiles(type);
  
  if (files.length === 0) {
    throw new Error(`No creative files found for type: ${type}`);
  }
  
  const randomFile = files[Math.floor(Math.random() * files.length)];
  return getCreativeFilePath(type, randomFile);
}

/**
 * Export all utilities
 */
export default {
  loadFixture,
  getCreativeFixture,
  getAllValidCreatives,
  getAllInvalidCreatives,
  getAllEdgeCaseCreatives,
  getCreativeFilePath,
  listCreativeFiles,
  getAllCreativeFiles,
  creativeFileExists,
  getFixtureStats,
  getCreativeFileStats,
  createTestDataWithTimestamp,
  createMultipleTestData,
  mergeFixtureData,
  getRandomCreativeFixture,
  getRandomCreativeFile,
};
