import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { useAtom, useAtomValue } from 'jotai'

import { Vault } from '../types'
import { addressAtom, connectedWalletAtom } from 'src/state/wallet/atoms'
import { readyAtom } from 'src/state/squeethPool/atoms'
import { useGetCollatRatioAndLiqPrice, useGetVault, useNormFactor } from 'src/state/controller/hooks'
import {
  collatPercentAtom,
  existingCollatAtom,
  existingCollatPercentAtom,
  existingLiqPriceAtom,
  vaultAtom,
} from 'src/state/positions/atoms'

export const useVaultData = (vid: number) => {
  const [vault, setVault] = useAtom(vaultAtom)
  const [existingCollatPercent, setExistingCollatPercent] = useAtom(existingCollatPercentAtom)
  const [existingCollat, setExistingCollat] = useAtom(existingCollatAtom)
  const [existingLiqPrice, setExistingLiqPrice] = useAtom(existingLiqPriceAtom)
  const [collatPercent, setCollatPercent] = useAtom(collatPercentAtom)
  const [isVaultLoading, setVaultLoading] = useState(true)

  const normFactor = useNormFactor()
  const getVault = useGetVault()
  const getCollatRatioAndLiqPrice = useGetCollatRatioAndLiqPrice()
  const ready = useAtomValue(readyAtom)
  const connected = useAtomValue(connectedWalletAtom)
  const address = useAtomValue(addressAtom)

  const updateVault = async () => {
    if (!connected || !ready) return

    const _vault = await getVault(vid)

    if (!_vault) return

    setVault(_vault)
    setExistingCollat(_vault.collateralAmount)

    getCollatRatioAndLiqPrice(
      _vault.collateralAmount,
      _vault.shortAmount,
      _vault.NFTCollateralId ? Number(_vault.NFTCollateralId) : undefined,
    ).then(({ collateralPercent, liquidationPrice }) => {
      setExistingCollatPercent(collateralPercent)
      setCollatPercent(collateralPercent)
      setExistingLiqPrice(new BigNumber(liquidationPrice))
      setVaultLoading(false)
    })
  }

  useEffect(() => {
    updateVault()
  }, [vid, normFactor.toString(), address, connected, ready])

  return {
    vault,
    existingCollatPercent,
    existingLiqPrice,
    updateVault,
    setCollatPercent,
    collatPercent,
    isVaultLoading: isVaultLoading,
    setVaultLoading,
    existingCollat,
  }
}
