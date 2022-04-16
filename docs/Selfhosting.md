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

### EXAMPLE_ENVFILE

Meroku recommends developers to add a file with example environment variables.
if it is called `.env.example`, it is automatically used. If the name of file is anything else, you would use this instruction to let Meroku know about it.

Usage example: In this case, the example env is `.env.dev`

```
EXAMPLE_ENVFILE .env.dev
```

### RUN

This instruction runs a command in the shell. The Meroku shell is a `/bin/sh` from [alpine linux](https://www.alpinelinux.org).

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




