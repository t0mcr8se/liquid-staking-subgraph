import { BigDecimal, BigInt } from "@graphprotocol/graph-ts"
import {
  AddedValidator as AddedValidatorEvent,
  AdminChanged as AdminChangedEvent,
  BeaconUpgraded as BeaconUpgradedEvent,
  Burned as BurnedEvent,
  ChangedProtocolFee as ChangedProtocolFeeEvent,
  ChangedValidatorIndex as ChangedValidatorIndexEvent,
  Deposited as DepositedEvent,
  DisabledSafeguard as DisabledSafeguardEvent,
  DistributedProtocolFee as DistributedProtocolFeeEvent,
  Initialized as InitializedEvent,
  NewSystemStakeLimit as NewSystemStakeLimitEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  Paused as PausedEvent,
  ReenabledSafeguard as ReenabledSafeguardEvent,
  RemovedValidator as RemovedValidatorEvent,
  ReplacedValidator as ReplacedValidatorEvent,
  Unpaused as UnpausedEvent,
  UpdatedPriceRatio as UpdatedPriceRatioEvent,
  Upgraded as UpgradedEvent,
  Withdrawn as WithdrawnEvent,
} from "../generated/LiquidStakingProxy/LiquidStakingProxy"
import { Transfer as TransferEvent } from "../generated/StakedFuse/StakedFuse"
import {
  getFusePrice,
  getLiquidStakingContract,
  getOrCreateHistory,
  getOrCreateLiquidStaking,
  getOrCreateUser,
  getOrCreateValidator,
  updateDayData,
  ZERO_ADDRESS,
} from "./utils"
import { Deposit, Withdraw } from "../generated/schema"

export function handleAddedValidator(event: AddedValidatorEvent): void {
  let validator = getOrCreateValidator(event.params.validatorAdded, event.block)
  let lsContract = getLiquidStakingContract()
  validator.active = true
  // validator.index = lsContract.getValidatorsLength().minus(BigInt.fromI32(1))
  validator.save()
}

export function handleAdminChanged(event: AdminChangedEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)
  ls.admin = event.params.newAdmin
  history.admin = event.params.newAdmin
  ls.save()
  history.save()
}

export function handleChangedProtocolFee(event: ChangedProtocolFeeEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)
  ls.protocolFeeBasis = event.params.newBasisRate
  history.protocolFeeBasis = event.params.newBasisRate
}

export function handleChangedValidatorIndex(event: ChangedValidatorIndexEvent): void {
  // const lsContract = getLiquidStakingContract()
  // let validatorA = lsContract.getValidatorAt(event.params.newIndex)
  // let validatorB = lsContract.getValidatorAt(event.params.priorIndex)
  // let validatorAEntity = getOrCreateValidator(validatorA, event.block)
  // let validatorBEntity = getOrCreateValidator(validatorB, event.block)
  // validatorAEntity.index = event.params.newIndex
  // validatorBEntity.index = event.params.priorIndex
  // validatorAEntity.save()
  // validatorBEntity.save()
}

export function handleDisabledSafeguard(event: DisabledSafeguardEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)

  ls.isSafeguardEnabled = false
  history.isSafeguardEnabled = false

  ls.save()
  history.save()
}

export function handleDistributedProtocolFee(event: DistributedProtocolFeeEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)
  let fusePrice = getFusePrice()
  let feeBasis = ls.protocolFeeBasis
  let fees = event.params.protocolFees.toBigDecimal()
  let rewardAmount = fees.times(BigDecimal.fromString("10000")).div(feeBasis.toBigDecimal())

  ls.totalFees = ls.totalFees.plus(fees)
  ls.totalFeesUSD = ls.totalFeesUSD.plus(fees.times(fusePrice))

  history.totalFees = ls.totalFees
  history.totalFeesUSD = ls.totalFeesUSD

  history.adminFeesDay = history.adminFeesDay.plus(fees)
  history.adminFeesDayUSD = history.adminFeesDayUSD.plus(fees.times(fusePrice))

  ls.totalRewards = ls.totalRewards.plus(rewardAmount)
  ls.totalRewardsUSD = ls.totalRewardsUSD.plus(rewardAmount.times(fusePrice))

  history.totalRewards = ls.totalRewards
  history.totalRewardsUSD = ls.totalRewardsUSD

  history.fuseRewardsDay = history.fuseRewardsDay.plus(rewardAmount)
  history.fuseRewardsDayUSD = history.fuseRewardsDayUSD.plus(rewardAmount.times(fusePrice))

  ls.save()
  history.save()
}

export function handleNewSystemStakeLimit(event: NewSystemStakeLimitEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)

  ls.systemStakeLimit = event.params.newLimit
  history.systemStakeLimit = event.params.newLimit

  ls.save()
  history.save()
}

export function handlePaused(event: PausedEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)

  ls.isPaused = true
  history.isPaused = true

  ls.save()
  history.save()
}

export function handleReenabledSafeguard(event: ReenabledSafeguardEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)

  ls.isSafeguardEnabled = true
  history.isSafeguardEnabled = true

  ls.save()
  history.save()
}

export function handleRemovedValidator(event: RemovedValidatorEvent): void {
  let validator = getOrCreateValidator(event.params.validatorRemoved, event.block)
  validator.active = false
  validator.save()
}

export function handleReplacedValidator(event: ReplacedValidatorEvent): void {
  let oldValidator = getOrCreateValidator(event.params.oldValidator, event.block)
  let newValidator = getOrCreateValidator(event.params.newValidator, event.block)

  oldValidator.active = false
  newValidator.active = true

  newValidator.totalFuseDelegated = oldValidator.totalFuseDelegated

  oldValidator.save()
  newValidator.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)

  ls.isPaused = false
  history.isPaused = false

  ls.save()
  history.save()
}

export function handleUpdatedPriceRatio(event: UpdatedPriceRatioEvent): void {
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)

  ls.ratio = event.params.updatedRatio
  history.ratio = event.params.updatedRatio

  ls.save()
  history.save()
}

export function handleTransfer(event: TransferEvent): void {
  let from = event.params.from
  let to = event.params.to

  if (from.toHexString() == ZERO_ADDRESS || to.toHexString() == ZERO_ADDRESS) {
    // Skip, already handled with Withdraw and Deposit
    return
  }

  let ls = getOrCreateLiquidStaking()

  let ratio = ls.ratio
  let sFuseAmount = event.params.value.toBigDecimal()
  let fuseAmount = sFuseAmount.times(ratio.toBigDecimal())

  let userA = getOrCreateUser(from, event.block)
  let userB = getOrCreateUser(to, event.block)

  userA.stakedFuseBalance = userA.stakedFuseBalance.minus(sFuseAmount)
  userB.stakedFuseBalance = userB.stakedFuseBalance.plus(sFuseAmount)

  userA.fuseExited = userA.fuseExited.plus(fuseAmount)
  userB.fuseEntered = userB.fuseEntered.plus(fuseAmount)

  userA.save()
  userB.save()
}

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposit(event.transaction.hash)
  entity.user = event.params.user
  entity.value = event.params.deposit
  entity.blockNumber = event.block.number
  entity.save()
  updateDayData(event)

  let user = getOrCreateUser(event.params.user, event.block)
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)
  let fusePrice = getFusePrice()

  let sFuseAmount = event.params.tokens.toBigDecimal()
  let fuseAmount = event.params.deposit.toBigDecimal()

  user.stakedFuseBalance = user.stakedFuseBalance.plus(sFuseAmount)
  user.fuseEntered = user.fuseEntered.plus(fuseAmount)

  ls.totalStaked = ls.totalStaked.plus(fuseAmount)
  ls.totalFeesUSD = ls.totalFeesUSD.plus(fuseAmount.times(fusePrice))

  history.totalStaked = ls.totalStaked
  history.totalFeesUSD = ls.totalFeesUSD

  ls.sFuseMinted = ls.sFuseMinted.plus(sFuseAmount)
  history.sFuseMinted = ls.sFuseMinted

  ls.fuseEntered = ls.fuseEntered.plus(fuseAmount)
  history.fuseEntered = ls.fuseEntered

  history.fuseStakedDay = history.fuseStakedDay.plus(fuseAmount)
  history.fuseStakedDayUSD = history.fuseStakedDayUSD.plus(fuseAmount.times(fusePrice))

  user.save()
  ls.save()
  history.save()
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  let entity = new Withdraw(event.transaction.hash)
  entity.user = event.params.user
  entity.value = event.params.payout
  entity.blockNumber = event.block.number
  entity.save()

  updateDayData(event)
  let user = getOrCreateUser(event.params.user, event.block)
  let ls = getOrCreateLiquidStaking()
  let history = getOrCreateHistory(event.block)
  let fusePrice = getFusePrice()

  let sFuseAmount = event.params.tokens.toBigDecimal()
  let fuseAmount = event.params.payout.toBigDecimal()

  user.stakedFuseBalance = user.stakedFuseBalance.minus(sFuseAmount)
  user.fuseEntered = user.fuseEntered.minus(fuseAmount)

  ls.totalStaked = ls.totalStaked.minus(fuseAmount)
  ls.totalFeesUSD = ls.totalFeesUSD.minus(fuseAmount.times(fusePrice))

  history.totalStaked = ls.totalStaked
  history.totalFeesUSD = ls.totalFeesUSD

  ls.sFuseBurned = ls.sFuseBurned.plus(sFuseAmount)
  history.sFuseBurned = ls.sFuseBurned

  ls.fuseExited = ls.fuseExited.plus(fuseAmount)
  history.fuseExited = ls.fuseExited

  history.fuseUnstakedDay = history.fuseUnstakedDay.plus(fuseAmount)
  history.fuseUnstakedDayUSD = history.fuseUnstakedDayUSD.plus(fuseAmount.times(fusePrice))

  user.save()
  ls.save()
  history.save()
}
