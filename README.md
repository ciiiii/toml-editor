# toml-editor

This is a Github action, you can use it to edit your toml file. Read more about those here:
[https://developer.github.com/actions/](https://developer.github.com/actions/)

## Usage

`workflow.yml`

```yaml
- name: TOML Editor V2
  uses: colathro/toml-editor@1.1.0
  with:
    file: "file/path/xx.toml"
    key: "a.b.c"
    value: "abc"
```

### Arguments

All arguments are of type string.

| Name  | Required | Description                    |
| ----- | -------- | ------------------------------ |
| file  | Yes      | The relative path of toml file |
| key   | Yes      | Key need to modify             |
| value | Yes      | Value to set                   |

### Key Example

```toml
[params]
hello = "" # key = "params.hello"

[params.config]
appId = "" # key = "params.config.appId"
```

### Development

## Dependencies

`npm install`

`npm i -g @vercel/ncc`

## Testing

`yarn test`

## Building

`ncc build index.js --license licenses.txt`

After building check in dist/index.js.
