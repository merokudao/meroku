![MerokuDAO](./img/logoBIG.jpeg)

Meroku is the world's first community-owned omnichain dapp store. We are trying to remove redundant costs which exist in web2 (eg. cloud hosting ) and centralised authorities who control access and define their own rules to stop dapp developers from innovating. We feel the future will be self-hosted dapp stores with complete transparency. This framework is the start of that journey, please join us and help create a more open and secure web3.

Please note: We don't have a website or any token. This repo is only official spot.

## Benefits:

- It allows you (the user) to install and run dApps locally. Complete trust and security + self hosting.
- It allows you (the developer of dApp) to distribute it to a huge audience without hosting
anywhere.


# Prerequisites

1. Docker Desktop is required. [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)
2. `nvm` or node version 17 or more.

# Usage (for users)

## Installation

1. Clone the repo `git clone https://github.com/merokudao/meroku.git`
2. Update the `.env` file. In this file, update the variable `HOSTING_DIR=/workspace/hosting_dir/` to
a location on your local filesystem. This location is used to by Meroku for internal purposes.

## Add an app

`node -r ts-node/register src/app.ts add <repoUrl> <name>`

Adds a public git repo hosted at `repoUrl` with the name `name` to local hosting.

## Start an app

`node -r ts-node/register src/app.ts start <name>`

## Stop an app

`node -r ts-node/register src/app.ts start <name>`


## Repos with which this can be tried

- https://github.com/r4881t/v4-ui
- https://github.com/r4881t/cryptoboys-nft-marketplace


# For Developers

In order to make your repo compatible with Meroku, you will need to add a file called `Selfhosting` and specify an appropriate environment file. The details of both are given below.

1. [`Selfhosting` file Spec](docs/Selfhosting.md)
2. [Environment Variables](docs/EnvironmentVariables.md)

# Contributing

Community Guidelines Coming Soon.

# Roadmap

Check out the [roadmap](docs/Roadmap.md).
