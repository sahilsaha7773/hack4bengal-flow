const fcl = require("@onflow/fcl");

fcl.config({
  "app.detail.title": "VidFlow", // this adds a custom name to our wallet
  "app.detail.icon": "https://cryptologos.cc/logos/flow-flow-logo.png", // this adds a custom image to our wallet
  "accessNode.api": process.env.NEXT_PUBLIC_ACCESS_NODE, // this is for the local emulator
  "discovery.wallet": process.env.NEXT_PUBLIC_WALLET, // this is for the local dev wallet
  "0xDeployer": process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, // this auto configures `0xDeployer` to be replaced by the address in txs and scripts
  "0xNFTStandard": process.env.NEXT_PUBLIC_NFT_STANDARD_ADDRESS,
  "0xTokenStandard": process.env.NEXT_PUBLIC_TOKEN_STANDARD_ADDRESS,
  "0xFlowToken": process.env.NEXT_PUBLIC_FLOW_TOKEN_ADDRESS
})