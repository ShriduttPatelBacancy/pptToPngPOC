import Converter from 'ppt-png'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs'

const wait = async () => new Promise(res => setTimeout(res, 3600));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pptFilePath = path.join(__dirname, 'assets', 'samplepptx.pptx');

const fileName = pptFilePath.split('/').pop();
console.log("🚀 ~ pptFilePath:", pptFilePath);
const outputFolderPath = path.join(__dirname, 'Out/', `${fileName.substring(0, fileName.lastIndexOf('.'))}/`);
console.log("🚀 ~ outputFolderPath:", outputFolderPath);
if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, { recursive: true });
}
const converter = Converter.create({
    files: [pptFilePath],
    output: outputFolderPath,
    deletePdfFile: true

});
const result =converter.convert();
console.log("🚀 ~ result:", result)

console.log("======= UPLOAD FILES TO S3 =======");
await wait();
fs.rmSync(outputFolderPath, { recursive: true, force: true });



