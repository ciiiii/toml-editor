const core = require("@actions/core");
const path = require("node:path");
const fs = require("node:fs");
const toml = require("@iarna/toml");

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

function updateToml(tomlObj, key, value) {
  let keys = key.split(".");

  if (keys.length == 1) {
    tomlObj[keys[0]] = value;
    return;
  }

  let targetTable = null;
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

function getTomlValue(tomlObj, key) {
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

function getTomlContent(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`The toml file does not exist: ${filePath}`);
  }

  return fs.readFileSync(filePath, "utf8");
}

function parseTomlContent(tomlContent) {
  return toml.parse(tomlContent);
}

function stringifyToml(tomlObj) {
  return toml.stringify(tomlObj);
}

function writeTomlObj(tomlObj, filePath) {
  fs.writeFileSync(filePath, stringifyToml(tomlObj));
}

module.exports = {
  updateToml,
  getTomlValue,
  getTomlContent,
  parseTomlContent,
  stringifyToml,
  writeTomlObj,
};

run();
