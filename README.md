# NFT Staking

This project implements a mock NFT staking interface. Users can view staked NFTs and rewards earned over time.

## Installation

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the server
   - a) Run the development frontend server: `npm run dev`
   - b) Run the production build
     - 1. Create a production build: `npm run build`
     - 2. Start the production server: `npm run start`

## Usage

The staking interface displays mock staked NFTs and the rewards earned for each NFT. Users have an initial balance of 100 C tokens which will increase as they earn staking rewards.

1. Stake for a period and claim full reward

Users can stake their NFTs for a fixed staking period to earn rewards. There are 3 staking periods:

- 60 days: Earn 10 C tokens
- 90 days: Earn 20 C tokens
- 120 days: Earn 30 C tokens

At the end of the staking period, users can claim the full reward amount which will be added to their C balance.

![image](https://im4.ezgif.com/tmp/ezgif-4-c99ff3f577.gif)


2. Unstake early and claim penalty reward

Users can unstake their NFT before the end of the staking period, but will earn a penalty reward. The penalty is a deduction of 5 C tokens from the period reward.

![image](https://im4.ezgif.com/tmp/ezgif-4-440fe3e7de.gif)

<br />

### For example:

1. Stake for 90 days (reward = 20 C)
2. Unstake after 60 days
3. Claim penalty reward = 20 - 5 = 15 C tokens
4. Penalty reward (15 C) will be added to the user's balance

The penalty aims to incentivize staking for the full period.
