![MerokuDAO](./img/Merokusplash.png)

Meroku is the world's first community-owned omnichain dapp store. We are trying to remove redundant costs which exist in web2 (eg. cloud hosting ) and centralised authorities who control access and define their own rules to stop dapp developers from innovating. We feel the future will be self-hosted dapp stores with complete transparency. This framework is the start of that journey, please join us and help create a more open and secure web3.

Please note: We don't have a website or any token. This repo is only official spot.

## Benefits:

- It allows you (the user) to install and run dApps locally. Complete trust and security + self hosting.
- It allows you (the developer of dApp) to distribute it to a huge audience without hosting
anywhere.


# Prerequisites

1. Docker Desktop is required. [Install Docker Desktop](https://www.docker.com/products/docker-desktop/)

# Usage (for users)

## Installation

1. Download the binary for your OS and architecture from [https://github.com/merokudao/meroku/releases](https://github.com/merokudao/meroku/releases) latest release.
2. As Meroku is evolving fast, different releases might have different installation method. It is recommened to read the release doc for installation method for that release.

This will install the command `meroku-(os)-(archi)` on your system.

## Search for an app

### Basic

`meroku-macos-x64 search <queryText>` Search for all dApps with the query 'queryText'.

### Advanced

Search across name and description. Additionally filter in the results using specific
tags or chains.

```
$ meroku-macos-x64 search -h
Usage: app search [options] <query>

Search for dApps. Searches by default in dApp name across all chains

Arguments:
  query                       Type a few characters to search for a dApp

Options:
  -t, --tag [tag...]          Filter dApps by these tags only
  -c, --chainId [chainId...]  Filter dApps by these chainIds only
  -d, --description           Search in description (default: false)
  -h, --help                  display help for command
```

You can provide multiple chains like `-c 137 1 80001` and similarly multiple tags like `-t tag1 tag2` and so on.

## Add an app

`meroku-macos-x64 add <repoUrl> <name>`

Adds a public git repo hosted at `repoUrl` with the name `name` to local hosting.

## Start an app

`meroku-macos-x64 start <name>`

## Stop an app

`meroku-macos-x64 start <name>`


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
