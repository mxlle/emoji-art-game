const fs = require('fs-extra');
const childProcess = require('child_process');

// Remove current build
fs.removeSync('./dist/');

// Transpile the typescript files
try {
    childProcess.execSync('tsc --build tsconfig.prod.json', {stdio: 'inherit'});
} catch {
    process.exit(1);
}