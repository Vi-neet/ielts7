const fs = require('fs');

const registryContent = fs.readFileSync('./src/lib/data/questionContentRegistry.ts', 'utf8');

// Find cambridge19_gr_test1 block
const startIdx = registryContent.indexOf('"cambridge19_gr_test1":');
if (startIdx !== -1) {
  const slice = registryContent.slice(startIdx, startIdx + 8000);
  console.log(slice.slice(0, 3000));
} else {
  console.log('cambridge19_gr_test1 NOT found in registryContent!');
}
