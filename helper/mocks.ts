const fs = require('fs');
const target = 'src/net/Demo.ts';

console.log(`START ${target}`);

let output = "";
output += "/** NOTE: This file is autogenerated at build time. Your changes will be overwritten! */\n";
output += "\n";
output += "import { NetworkResponse } from '../stores/Response';\n";
output += "\n";
output += "export const mockResponseForEndpoint = (endpoint: string): NetworkResponse => {\n";
output += "\tconst uri = endpoint.split(';')[0];\n";
output += "\tconst normalized = uri.split('/').join('_');\n";
for (const file of fs.readdirSync('src/mocks')) {
    output += `\tif (normalized === '${file}') { return require('../mocks/${file}'); }\n`;
}
output += "\treturn {success: false, errorCode: 'NotImplemented', data: null, dataName: null, endpoint: normalized};\n";
output += "}\n";

fs.writeFile(target, output, (error) => {
    if (error) throw error;
    console.log(`DONE ${target}`);
});