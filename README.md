# Prerequisites

This has been tested on Mac OS X with Docker Desktop. This should work if you have Docker Desktop installed.

# Usage

## Add an app

`node -r ts-node/register src/app.ts add <repoUrl> <name>`

Adds a public git repo hosted at `repoUrl` with the name `name` to local hosting.

## Start an app

`node -r ts-node/register src/app.ts start <name>`

## Stop an app

`node -r ts-node/register src/app.ts start <name>`


## Repos with which this can be tried

- https://github.com/r4881t/v4-ui
