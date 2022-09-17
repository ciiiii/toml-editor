"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeTomlObj = exports.stringifyToml = exports.parseTomlContent = exports.getTomlContent = exports.getTomlValue = exports.updateToml = void 0;
const core = __importStar(require("@actions/core"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const toml = __importStar(require("@iarna/toml"));
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
    }
    catch (error) {
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
        }
        else if (targetTable[keys[index]] === undefined) {
            let newTable = {};
            targetTable[keys[index]] = newTable;
            targetTable = newTable;
        }
        else {
            targetTable = targetTable[keys[index]];
        }
    }
    targetTable[keys[keys.length - 1]] = value;
}
exports.updateToml = updateToml;
function getTomlValue(tomlObj, key) {
    let keys = key.split(".");
    let targetTable = null;
    for (let index = 0; index < keys.length; index++) {
        if (targetTable === null) {
            targetTable = tomlObj[keys[index]];
        }
        else {
            targetTable = targetTable[keys[index]];
        }
    }
    return targetTable;
}
exports.getTomlValue = getTomlValue;
function getTomlContent(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`The toml file does not exist: ${filePath}`);
    }
    return fs.readFileSync(filePath, "utf8");
}
exports.getTomlContent = getTomlContent;
function parseTomlContent(tomlContent) {
    return toml.parse(tomlContent);
}
exports.parseTomlContent = parseTomlContent;
function stringifyToml(tomlObj) {
    return toml.stringify(tomlObj);
}
exports.stringifyToml = stringifyToml;
function writeTomlObj(tomlObj, filePath) {
    fs.writeFileSync(filePath, stringifyToml(tomlObj));
}
exports.writeTomlObj = writeTomlObj;
run();
