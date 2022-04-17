Meroku understands the environment variables by reading the example env file.
This file is specified using `DIST_ENVFILE` instruction in the `Selfhosting` file.

# Distribution Environment File (.env.dist)

As a developer, when you publish your app on Meroku, it is expected that the user will be able to
start using the app without any environment variable changes.

To configure the environment variables in your app, you should use a "Distribution Environment File"
. This file can be named as `.env.dist`. This file should contain all values so that your
users can start using the dApp without any extra effort.

The format of this file is below

```
KEY=[VALUE]
```

Note that `VALUE` is optional. If it is not specified, Meroku will ask the user to specify it. Unless this value is specified, the dApp won't start.

For example:

1. Web3 dApp with smart contracts deployed on blockchain

Your app would require the deployed addresses of contracts, the RPC endpoint of the network, endpoints of any GraphQL service. You should be having these info with you (as you must have deployed
the contracts on these networks before shipping). So you should create a distribution env file
called as `.env.dist` (you can also choose any other name and specify it in `Selfhosting` file using `DIST_ENVFILE` instruction).

This `.env.dist` will contain all distribution environment variables.

## Letting users define environment variables

In cases, where you app must require the user to configure some environment variables,
the same can be done by keeping the value of variable as empty. User will have to specify
the value of these env variables before the dApp can start.
