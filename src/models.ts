import { glob } from "glob";

export default async function initModels() {
  glob("dist/models/*.js", async (err, files) => {
    if (err) {
      console.log(err);
      return;
    }

    for (const file of files) {
      const splitFile = file.split("/");
      const name = "./models/" + splitFile[splitFile.length - 1];

      const model = require(name).default;
      await model.createTable();
    }
  });
}
