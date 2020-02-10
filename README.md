# toml-editor

This is a Github action, you can use it to edit your toml file. Read more about those here:
[https://developer.github.com/actions/](https://developer.github.com/actions/)

## Usage

`workflow.yml`

```yaml
- name: Edit Toml
  uses: ciiiii/toml-editor@1.0.0
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

### key example

```toml
[params]
hello = "" # key = "params.hello"

[params.config]
appId = "" # key = "params.config.appId"
```
