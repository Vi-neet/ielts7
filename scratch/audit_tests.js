const fs = require('fs');

const registryPath = './src/lib/data/questionContentRegistry.ts';
const mockTestsPath = './src/data/mockTests.ts';

const registryContent = fs.readFileSync(registryPath, 'utf8');
const registryKeys = new Set([...registryContent.matchAll(/"(cambridge\d+_[a-z]+_test\d+)":/g)].map(m => m[1]));

const mockContent = fs.readFileSync(mockTestsPath, 'utf8');
const mockKeys = new Set([...mockContent.matchAll(/"(cambridge\d+_[a-z]+_test\d+)":/g)].map(m => m[1]));

console.log('=== TEST REGISTRY AUDIT ===');
console.log('Unique tests in questionContentRegistry:', registryKeys.size);
console.log('Unique tests in mockTests:', mockKeys.size);

const missingInRegistry = [];
for (const key of mockKeys) {
  if (!registryKeys.has(key)) {
    missingInRegistry.push(key);
  }
}

console.log('Missing in questionContentRegistry (Fallback used):', missingInRegistry);

// Analyze Question Types across questionContentRegistry
const typeCounts = {};
const groupCounts = {};

const qTypeRegex = /"questionType":\s*"([^"]+)"/g;
for (const match of registryContent.matchAll(qTypeRegex)) {
  const type = match[1];
  typeCounts[type] = (typeCounts[type] || 0) + 1;
}

console.log('\n=== QUESTION TYPES IN AST REGISTRY ===');
console.log(JSON.stringify(typeCounts, null, 2));

// Check all question files in src/data/tests/questions
const questionsDir = './src/data/tests/questions';
const questionFiles = fs.readdirSync(questionsDir);

console.log('\n=== JSX QUESTION FILES ===');
console.log('Total JSX Question Files:', questionFiles.length);

const categories = {
  ar: [], // Academic Reading
  gr: [], // General Reading
  ls: []  // Listening
};

questionFiles.forEach(f => {
  if (f.includes('_ar_')) categories.ar.push(f);
  else if (f.includes('_gr_')) categories.gr.push(f);
  else if (f.includes('_ls_')) categories.ls.push(f);
});

console.log('Academic Reading JSX files:', categories.ar.length);
console.log('General Reading JSX files:', categories.gr.length);
console.log('Listening JSX files:', categories.ls.length);
