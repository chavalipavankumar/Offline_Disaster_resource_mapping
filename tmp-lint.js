const { ESLint } = require("eslint");
const fs = require("fs");

(async function main() {
  const eslint = new ESLint();
  const results = await eslint.lintFiles(["./**/*.{ts,tsx}"]);
  const errors = results.filter(r => r.errorCount > 0);
  
  const output = [];
  for (const r of errors) {
    for (const msg of r.messages) {
      if (msg.severity === 2) {
        output.push({ file: r.filePath, line: msg.line, msg: msg.message });
      }
    }
  }
  fs.writeFileSync("lint-errors.json", JSON.stringify(output, null, 2));
})().catch(console.error);
