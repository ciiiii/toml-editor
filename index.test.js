const index = require("./index");

function getTomlString() {
  return `
    key1 = "value1"
    [table1]
    key1 = "value1"
    [table1.table2]
    key1 = "value1"
    key2 = "value2"
    [table1.table2.table3]
    key1 = "value1"
    [table1.table2.table3.table4.table5.table6]
    key1 = "value1"
    key2 = "value2"
  `;
}

test("long key", () => {
  let key = "table1.table2.table3.table4.table5.table6.key1";
  let value = "newvalue1";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
});

test("short but dont miss", () => {
  let key = "table1.table2.key2";
  let value = "newvalue2";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
  expect(value != index.getTomlValue(tomlObj, "table1.table2.key1"));
});

test("net new key", () => {
  let key = "table1.key1";
  let value = "newvalue2";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
});

test("long net new key", () => {
  let key =
    "table1.table2.table3.table4.table5.table6.table7.table8.table9.key1";
  let value = "newvalue2";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
});

test("single existing key", () => {
  let key = "key1";
  let value = "newvalue1";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
});

test("single new key", () => {
  let key = "key2";
  let value = "newvalue2";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
});

test("two existing key", () => {
  let key = "table1.key1";
  let value = "newvalue1";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
});

test("two new key", () => {
  let key = "table1.key2";
  let value = "newvalue2";

  let tomlContent = getTomlString();
  let tomlObj = index.parseTomlContent(tomlContent);

  index.updateToml(tomlObj, key, value);
  let setValue = index.getTomlValue(tomlObj, key);

  expect(setValue === value).toBeTruthy();
});
