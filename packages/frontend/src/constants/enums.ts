export enum TradeMode {
  Buy,
  Sell,
}

export enum Vaults {
  ETHBear = 'ETH Bear Yield Vault', // long 1 eth + short squeeth
  CrabVault = 'Crab Vault', // long 2 eth + short squeeth
  ETHBull = 'ETH Bull Yield Vault', // long 3 eth + short squeeth
  Custom = 'Custom Vault', // long x eth + short squeeth
  Short = 'Short Squeeth', //pure short squeeth
}

export enum TransactionType {
  BUY = 'Bought',
  SELL = 'Sold',
  MINT_SHORT = 'Minted and sold',
  BURN_SHORT = 'Bought back and burned',
}
