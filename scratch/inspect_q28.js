const fs = require('fs');

const registryContent = fs.readFileSync('./src/lib/data/questionContentRegistry.ts', 'utf8');

const startIdx = registryContent.indexOf('"cambridge19_gr_test1":');
if (startIdx !== -1) {
  const block = registryContent.slice(startIdx, startIdx + 20000);
  const q28Idx = block.indexOf('"28":');
  console.log(block.slice(q28Idx, q28Idx + 2500));
}
