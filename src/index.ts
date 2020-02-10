import * as core from "@actions/core";
import * as toml from "@iarna/toml";
import * as fs from "fs";
import * as path from "path";

interface Jsonmap {
  [key: string]: any;
}

function run() {
  try {
    const fileName = core.getInput("file", { required: true });
    const key = core.getInput("key", { required: true });
    const value = core.getInput("value", { required: true });
    const filePath = path.join(process.env.GITHUB_WORKSPACE, fileName);
    if (!fs.existsSync(filePath)) {
      throw new Error(`The toml file does not exist: ${fileName}`);
    }
    let f = fs.readFileSync(filePath, "utf8");
    let data = toml.parse(f);
    fs.writeFileSync(fileName, toml.stringify(setTomlByKey(data, key, value)));
  } catch (error) {}
}

function setTomlByKey(t: object, key: string, value: any): Jsonmap {
  let k = key.split(".");
  if (k.length == 1) {
    t[k[0]] = value;
  } else if (k.length == 2) {
    t[k[0]][k[1]] = value;
  } else if (k.length == 3) {
    t[k[0]][k[1]][k[2]] = value;
  }
  return t;
}

run();
