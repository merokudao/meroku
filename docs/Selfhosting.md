To make your repo compatible with Meroku, you need to add a file having name `Selfhosting`. No extentions.

The simplest `Selfhosting` file is an empty file.

# Purpose

The purpose of `Selfhosting` file is to provide a space for developers to write arbitraty
commands/code that will enable the repo to work on Meroku Selfhosting platform.

# Specifications


## Format

The format for `Selfhosting` file is :

```
# Comment
[INSTRUCTION] arguments
```

The `INSTRUCTION` is optional. If this is not present, it is assumed that the instruction is a `RUN` instruction.

The specifics of other instructions are mentioned below:

## Instructions

### DIST_ENVFILE

Meroku recommends developers to add a file with distribution environment variables.
if it is called `.env.dist`, it is automatically used. If the name of file is anything else, you would use this instruction to let Meroku know about it.

Usage example: In this case, the example env is `.env.distro`

```
DIST_ENVFILE .env.distro
```

[More on env files here.](EnvironmentVariables.md)

### RUN

This instruction runs the command in a `/bin/sh` shell. The base is [alpine linux](https://www.alpinelinux.org). You can use it do any extra tasks required for your dApp to run.

Examples:
1. Download something using `wget` or `curl`

```
RUN curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | sh
```

Since any argument without instruction is interpreted as `RUN` instruction, the above could also be written as

```
curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh | sh
```

2. Pre conditioning scripts.

### BUILD

This instruction builds your dApp. This is a script from `package.json`. By default, Meroku searches for following scripts in order and uses the first one that it finds for building. If you want to use a different command, you can specify that using the `BUILD` instruction.

Order of search for build script: `build`, `build:prod`

For example - If you have a script called "build_prod" defined in `package.json`, then you will have to define it in `Selfhosting` file as follows

```
BUILD build_prod
```


### START

This instruction starts your dApp. If this is not present, meroku will do following in order:

1. Look for "start" | "start:prod" | "start:dev"

If this is present, that particular command will be run to start the app

Meroku assumes the program to be shutting down by sending it a SIGTERM or SIGHUP. Hence, there is no explicit instruction for stopping the dApp.


### Complete example

A complete example of a `Selfhosting` file would look like


```
EXAMPLE_ENVFILE .env.dev

# Download and install direnv
curl -sfL https://direnv.net/install.sh | bash

# Run Direnv
/usr/local/sbin/direnv allow

BUILD build

START dev:start

```

Note that if defaults are used then the `Selfhosting` file can be an empty file as well.



