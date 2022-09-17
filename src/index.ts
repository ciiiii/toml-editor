import * as core from "@actions/core";
import * as path from "path";
import * as fs from "fs";
import * as toml from "@iarna/toml";

function run() {
  try {
    const fileName = core.getInput("file", { required: true });
    const key = core.getInput("key", { required: true });
    const value = core.getInput("value", { required: true });

    const filePath = path.join(process.env.GITHUB_WORKSPACE, fileName);

    let tomlContent = getTomlContent(filePath);
    let tomlObj = parseTomlContent(tomlContent);

    updateToml(tomlObj, key, value);
    writeTomlObj(tomlObj, filePath);
  } catch (error) {
    core.setFailed(error.message);
  }
}

export interface Jsonmap {
  [key: string]: any;
}

export function updateToml(tomlObj: Jsonmap, key: string, value: any) {
  let keys = key.split(".");

  if (keys.length == 1) {
    tomlObj[keys[0]] = value;
    return;
  }

  let targetTable: any = null;
  for (let index = 0; index < keys.length - 1; index++) {
    if (targetTable === null) {
      targetTable = tomlObj[keys[index]];
    } else if (targetTable[keys[index]] === undefined) {
      let newTable = {};
      targetTable[keys[index]] = newTable;
      targetTable = newTable;
    } else {
      targetTable = targetTable[keys[index]];
    }
  }
  targetTable[keys[keys.length - 1]] = value;
}

export function getTomlValue(tomlObj: Jsonmap, key: string): string {
  let keys = key.split(".");

  let targetTable = null;
  for (let index = 0; index < keys.length; index++) {
    if (targetTable === null) {
      targetTable = tomlObj[keys[index]];
    } else {
      targetTable = targetTable[keys[index]];
    }
  }

  return targetTable;
}

export function getTomlContent(filePath: string) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`The toml file does not exist: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

export function parseTomlContent(tomlContent: string): Jsonmap {
  return toml.parse(tomlContent);
}

export function stringifyToml(tomlObj: Jsonmap): string {
  return toml.stringify(tomlObj);
}

export function writeTomlObj(tomlObj: Jsonmap, filePath: string) {
  fs.writeFileSync(filePath, stringifyToml(tomlObj));
}

run();
