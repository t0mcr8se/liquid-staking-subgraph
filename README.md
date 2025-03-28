# Fuse Liquid Staking Subgraph

## Overview
This repository contains the subgraph for tracking the Fuse Liquid Staking protocol. It indexes key contract events and entities such as users, validators, staking rewards, fees, and historical data.

## Features
- Tracks deposits, withdrawals, and staking rewards
- Monitors validator additions and removals
- Computes protocol fees and system stake limits
- Provides historical data snapshots

## Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/)
- [Yarn](https://yarnpkg.com/)
- [The Graph CLI](https://github.com/graphprotocol/graph-cli)

### Install Dependencies
```sh
yarn install
```

## Usage

### Generate Code
```sh
yarn codegen
```

### Build Subgraph
```sh
yarn build
```

### Deploy Subgraph
#### Deploy to The Graph Hosted Service
```sh
yarn deploy
```

#### Deploy Locally
```sh
yarn create-local
yarn deploy-local
```

#### Remove Local Deployment
```sh
yarn remove-local
```

### Run Tests
```sh
yarn test
```

## Subgraph Structure
- **schema.graphql**: Defines the GraphQL schema and entities
- **subgraph.yaml**: Configures data sources, entities, and event handlers
- **src/mapping.ts**: Contains the mappings for processing on-chain events

## Entities
- **LiquidStaking**: Tracks staking activity and rewards
- **StakedFuse**: Represents staked Fuse tokens
- **User**: Represents individual stakers
- **Validator**: Tracks staking validators
- **History**: Stores historical snapshots of staking activity
- **DayData**: Stores daily aggregated data
- **Deposit**: Tracks staking deposits
- **Withdraw**: Tracks staking withdrawals

## Contracts:
### LiquidStaking Proxy:
(0xa3dc222eC847Aac61FB6910496295bF344Ea46be)[https://explorer.fuse.io/address/0xa3dc222eC847Aac61FB6910496295bF344Ea46be]
### Liquid Staked Fuse Token:
(0xb1DD0B683d9A56525cC096fbF5eec6E60FE79871)[https://explorer.fuse.io/address/0xb1DD0B683d9A56525cC096fbF5eec6E60FE79871]

