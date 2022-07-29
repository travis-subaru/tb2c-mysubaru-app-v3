function outputObjectType(object, depth) {
    let output = "";
    for (let key of Object.keys(object)) {
        for (let i = 0; i < depth; i++) {
            output += '\t';
        }
        const keyType = typeof(object[key]);
        if (keyType !== 'object') {
            output += `${key}: ${keyType}`;
        } else {
            output += `${key}: {\n${outputObjectType(object[key], depth+1)}`;
            for (let i = 0; i < depth; i++) {
                output += '\t';
            }
            output += '}';
        }
        output += '\n';
    }
    return output;
}

function language() {
    const fs = require('fs');
    const source = 'content/messages.en.json';
    const target = 'src/model/I18N.ts';

    console.log(`START ${target}`);

    let output = "";
    output += "/** NOTE: This file is autogenerated at build time. Your changes will be overwritten! */\n";
    output += "\n";
    output += "import { LanguageID } from './Language';\n";
    output += "\n";
    output += "export interface I18N {\n";
    output += "\t__inherit: LanguageID,\n";
    const data = fs.readFileSync(source);
    const json = JSON.parse(data);
    output += outputObjectType(json, 1);
    output += "}\n";
    fs.writeFile(target, output, (error) => {
        if (error) throw error;
        console.log(`DONE ${target}`);
    });
}

language();