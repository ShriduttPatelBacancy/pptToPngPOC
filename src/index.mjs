import Converter from "ppt-png";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const wait = async () => new Promise((res) => setTimeout(res, 3600));

export const convertPPtToPng = async () => {
  const pptFilePath = path.join(
    __dirname,
    "assets",
    "How to use PMS_ (1).pptx"
  );

  const fileName = pptFilePath.split("/").pop();
  console.log("🚀 ~ pptFilePath:", pptFilePath);
  const outputFolderPath = path.join(
    __dirname,
    "Out/",
    `${fileName.substring(0, fileName.lastIndexOf("."))}/`
  );
  console.log("🚀 ~ outputFolderPath:", outputFolderPath);
  if (!fs.existsSync(outputFolderPath)) {
    fs.mkdirSync(outputFolderPath, { recursive: true });
  }
  const converter = Converter.create({
    files: [pptFilePath],
    output: outputFolderPath,
    options: {
      outputType: "jpg",
      deletePdfFile: true,
      density: 250,
      quality: 100,
    },
  });
  const result = converter.convert();
  console.log("🚀 ~ result:", result);

  console.log("======= UPLOAD FILES TO S3 =======");
  await wait();
  // fs.rmSync(outputFolderPath, { recursive: true, force: true });
};

// docker build -t convert-ppt-png .
// docker run -d --name convert-ppt-png-container -p 3000:3000 convert-ppt-png