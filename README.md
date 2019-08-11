redir-cli
=========

Input processing command line toolkit

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/redir-cli.svg)](https://npmjs.org/package/redir-cli)
[![Downloads/week](https://img.shields.io/npm/dw/redir-cli.svg)](https://npmjs.org/package/redir-cli)
[![License](https://img.shields.io/npm/l/redir-cli.svg)](https://github.com/RYLabs/redir-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g redir-cli
$ redir COMMAND
running command...
$ redir (-v|--version|version)
redir-cli/0.2.4 darwin-x64 node-v12.1.0
$ redir --help [COMMAND]
USAGE
  $ redir COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`redir edit NAME`](#redir-edit-name)
* [`redir hello [FILE]`](#redir-hello-file)
* [`redir help [COMMAND]`](#redir-help-command)
* [`redir run NAME`](#redir-run-name)
* [`redir scripts`](#redir-scripts)

## `redir edit NAME`

Edit a redir script

```
USAGE
  $ redir edit NAME

ARGUMENTS
  NAME  name of the script

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/edit.ts](https://github.com/RYLabs/redir-cli/blob/v0.2.4/src/commands/edit.ts)_

## `redir hello [FILE]`

describe the command here

```
USAGE
  $ redir hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ redir hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/RYLabs/redir-cli/blob/v0.2.4/src/commands/hello.ts)_

## `redir help [COMMAND]`

display help for redir

```
USAGE
  $ redir help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_

## `redir run NAME`

Execute a redir script

```
USAGE
  $ redir run NAME

ARGUMENTS
  NAME  name of the script to run

OPTIONS
  -h, --help  show CLI help
  --fetch     Pass result to fetch
```

_See code: [src/commands/run.ts](https://github.com/RYLabs/redir-cli/blob/v0.2.4/src/commands/run.ts)_

## `redir scripts`

List available scripts

```
USAGE
  $ redir scripts

OPTIONS
  -h, --help  show CLI help
```

_See code: [src/commands/scripts.ts](https://github.com/RYLabs/redir-cli/blob/v0.2.4/src/commands/scripts.ts)_
<!-- commandsstop -->
