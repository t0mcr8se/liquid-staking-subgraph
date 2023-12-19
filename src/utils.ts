import { Address, BigDecimal, BigInt, ethereum, log } from "@graphprotocol/graph-ts"
import {
  Deposited as DepositedEvent,
  LiquidStakingProxy,
  LiquidStakingProxy as LiquidStakingProxyContract,
  Withdrawn as WithdrawnEvent,
} from "../generated/LiquidStakingProxy/LiquidStakingProxy"
import { VoltagePair as PairContract } from "../generated/LiquidStakingProxy/VoltagePair"
import { StakedFuse as StakedFuseContract } from "../generated/StakedFuse/StakedFuse"
import {
  DayData,
  Deposit,
  History,
  LiquidStaking,
  StakedFuse,
  User,
  Validator,
  Withdraw,
} from "../generated/schema"
const LIQUID_STAKING_ADDRESS = "0xa3dc222eC847Aac61FB6910496295bF344Ea46be".toLowerCase()
const FUSE_BUSD_PAIR_ADDRESS = Address.fromHexString("0x91520fc2942fd52949514f159aa4927b8850178d")
const BIG_DECIMAL_ZERO = BigDecimal.fromString("0")
const BIG_DECIMAL_1E18 = BigDecimal.fromString("1000000000000000000")
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"

export function getLiquidStakingContract(): LiquidStakingProxyContract {
  return LiquidStakingProxyContract.bind(Address.fromString(LIQUID_STAKING_ADDRESS))
}

export function getFusePrice(): BigDecimal {
  const pair = PairContract.bind(Address.fromBytes(FUSE_BUSD_PAIR_ADDRESS))
  const reservesResult = pair.try_getReserves()
  if (reservesResult.reverted) {
    log.info("[getJoePrice] getReserves reverted", [])
    return BIG_DECIMAL_ZERO
  }
  const reserves = reservesResult.value
  if (reserves.value0.toBigDecimal().equals(BigDecimal.fromString("0"))) {
    log.error("[getJoePrice] USDC reserve 0", [])
    return BIG_DECIMAL_ZERO
  }
  return reserves.value1
    .toBigDecimal()
    .times(BIG_DECIMAL_1E18)
    .div(reserves.value0.toBigDecimal())
    .div(BIG_DECIMAL_1E18)
}

function getOrCreateStakedFuse(sfAddress: Address): StakedFuse {
  let sf = StakedFuse.load(sfAddress.toHex())
  let sfContract = StakedFuseContract.bind(sfAddress)
  if (sf == null) {
    sf = new StakedFuse(sfAddress.toHex())
    sf.address = sfAddress
    sf.decimals = sfContract.decimals()
    sf.symbol = sfContract.symbol()
    sf.name = sfContract.name()
    sf.totalSupply = sfContract.totalSupply()
  }
  sf.save()
  return sf
}

function createLiquidStaking(block: ethereum.Block): LiquidStaking {
  let ls = new LiquidStaking(LIQUID_STAKING_ADDRESS)
  let liquidStakingContract = getLiquidStakingContract()
  let sf = getOrCreateStakedFuse(liquidStakingContract.getSFToken())

  ls.sFuse = sf.id
  ls.ratio = liquidStakingContract.priceRatio()

  ls.totalStaked = BIG_DECIMAL_ZERO
  ls.totalStakedUSD = BIG_DECIMAL_ZERO

  // We assume the contract is empty
  ls.sFuseMinted = BIG_DECIMAL_ZERO
  ls.sFuseBurned = BIG_DECIMAL_ZERO

  ls.totalRewards = BIG_DECIMAL_ZERO
  ls.totalRewardsUSD = BIG_DECIMAL_ZERO

  ls.totalFees = BIG_DECIMAL_ZERO
  ls.totalFeesUSD = BIG_DECIMAL_ZERO

  ls.fuseEntered = BIG_DECIMAL_ZERO
  ls.fuseEnteredUSD = BIG_DECIMAL_ZERO

  ls.fuseExited = BIG_DECIMAL_ZERO
  ls.fuseExitedUSD = BIG_DECIMAL_ZERO

  // ls.updatedAt = block.timestamp

  ls.usersCount = BigInt.fromI32(0)
  ls.validatorsCount = BigInt.fromI32(0)

  ls.protocolFeeBasis = liquidStakingContract.getProtocolFeeBasis()

  ls.isPaused = liquidStakingContract.isPaused()
  ls.isSafeguardEnabled = liquidStakingContract.isSafeguardLimitEnabled()

  ls.admin = liquidStakingContract.owner()

  ls.systemStakeLimit = liquidStakingContract.systemStakeLimit()

  ls.save()
  return ls
}

export function getOrCreateLiquidStaking(block: ethereum.Block | null = null): LiquidStaking {
  let liquidStaking = LiquidStaking.load(LIQUID_STAKING_ADDRESS)
  if (liquidStaking == null && block != null) {
    liquidStaking = createLiquidStaking(block)
  }
  return liquidStaking as LiquidStaking
}

function getDay(timestamp: BigInt): BigInt {
  return timestamp.div(BigInt.fromI32(86400))
}

function createHistory(day: BigInt): History {
  let history = new History(day.toString())
  let ls = getOrCreateLiquidStaking()

  history.date = day
  history.sFuse = ls.sFuse
  history.ratio = ls.ratio
  history.totalStaked = ls.totalStaked
  history.totalStakedUSD = ls.totalStakedUSD

  history.sFuseMinted = ls.sFuseMinted
  history.sFuseBurned = ls.sFuseBurned

  history.totalRewards = ls.totalRewards
  history.totalRewardsUSD = ls.totalRewardsUSD

  history.totalFees = ls.totalFees
  history.totalFeesUSD = ls.totalFeesUSD

  history.fuseEntered = ls.fuseEntered
  history.fuseEnteredUSD = ls.fuseEnteredUSD

  history.fuseExited = ls.fuseExited
  history.fuseExitedUSD = ls.fuseExitedUSD

  history.usersCount = ls.usersCount
  history.validatorsCount = ls.validatorsCount

  history.protocolFeeBasis = ls.protocolFeeBasis
  history.isPaused = ls.isPaused
  history.isSafeguardEnabled = ls.isSafeguardEnabled
  history.admin = ls.admin
  history.systemStakeLimit = ls.systemStakeLimit

  return history
}

export function getOrCreateHistory(block: ethereum.Block): History {
  let day = getDay(block.timestamp)
  let history = History.load(day.toString())
  if (history == null) {
    history = createHistory(day)
    history.fuseStakedDay = BIG_DECIMAL_ZERO
    history.fuseStakedDayUSD = BIG_DECIMAL_ZERO
    history.fuseUnstakedDay = BIG_DECIMAL_ZERO
    history.fuseUnstakedDayUSD = BIG_DECIMAL_ZERO
    history.volumeDay = BIG_DECIMAL_ZERO
    history.volumeDayUSD = BIG_DECIMAL_ZERO

    history.fuseRewardsDay = BIG_DECIMAL_ZERO
    history.fuseRewardsDayUSD = BIG_DECIMAL_ZERO
    history.adminFeesDay = BIG_DECIMAL_ZERO
    history.adminFeesDayUSD = BIG_DECIMAL_ZERO
  }

  let ls = getOrCreateLiquidStaking()

  history.date = day
  history.sFuse = ls.sFuse
  history.ratio = ls.ratio
  history.totalStaked = ls.totalStaked
  history.totalStakedUSD = ls.totalStakedUSD

  history.sFuseMinted = ls.sFuseMinted
  history.sFuseBurned = ls.sFuseBurned

  history.totalRewards = ls.totalRewards
  history.totalRewardsUSD = ls.totalRewardsUSD

  history.totalFees = ls.totalFees
  history.totalFeesUSD = ls.totalFeesUSD

  history.fuseEntered = ls.fuseEntered
  history.fuseEnteredUSD = ls.fuseEnteredUSD

  history.fuseExited = ls.fuseExited
  history.fuseExitedUSD = ls.fuseExitedUSD

  history.usersCount = ls.usersCount
  history.validatorsCount = ls.validatorsCount

  history.protocolFeeBasis = ls.protocolFeeBasis
  history.isPaused = ls.isPaused
  history.isSafeguardEnabled = ls.isSafeguardEnabled

  history.volumeDay = BIG_DECIMAL_ZERO
  history.volumeDayUSD = BIG_DECIMAL_ZERO

  history.save()
  return history as History
}

export function getOrCreateValidator(address: Address, block: ethereum.Block): Validator {
  let validator = Validator.load(address.toHexString())
  if (validator == null) {
    validator = new Validator(address.toHexString())
    let liquidStaking = getOrCreateLiquidStaking(block)
    validator.addedAt = block.timestamp
    validator.liquidStaking = liquidStaking.id
    validator.totalFuseDelegated = BIG_DECIMAL_ZERO
    validator.active = false
    validator.save()
  }
  return validator
}

export function getOrCreateUser(address: Address, block: ethereum.Block): User {
  let user = User.load(address.toHexString())

  if (user == null) {
    user = new User(address.toHexString())
    let liquidStaking = getOrCreateLiquidStaking(block)
    user.liquidStaking = liquidStaking.id
    user.stakedFuseBalance = BIG_DECIMAL_ZERO
    user.fuseEntered = BIG_DECIMAL_ZERO
    user.fuseExited = BIG_DECIMAL_ZERO
    user.save()
  }

  return user
}

export function updateDayData(event: ethereum.Event): DayData {
  const deposit = Deposit.load(event.transaction.hash)
  const withdraw = Withdraw.load(event.transaction.hash)

  const liquidStakingProxy = LiquidStakingProxy.bind(
    Address.fromBytes(Address.fromHexString(LIQUID_STAKING_ADDRESS))
  )
  let fusePrice = getFusePrice()

  const balance = liquidStakingProxy
    .try_systemTotalStaked()
    .value.toBigDecimal()
    .div(
      BigInt.fromString("10")
        .pow(18 as u8)
        .toBigDecimal()
    )

  let day = getDay(event.block.timestamp)
  const id = day.toString()

  let dayData = DayData.load(id)

  if (dayData === null) {
    dayData = new DayData(id)
    dayData.volume = BIG_DECIMAL_ZERO
    dayData.blockNumber = event.block.number
    dayData.balance = BIG_DECIMAL_ZERO
    dayData.balanceUSD = BIG_DECIMAL_ZERO
    dayData.volumeUSD = BIG_DECIMAL_ZERO
    dayData.timestamp = event.block.timestamp
    dayData.priceUSD = BIG_DECIMAL_ZERO
  }

  if (deposit !== null) {
    dayData.volume = dayData.volume.plus(
      deposit.value.toBigDecimal().div(
        BigInt.fromString("10")
          .pow(18 as u8)
          .toBigDecimal()
      )
    )
  }
  if (withdraw !== null) {
    dayData.volume = dayData.volume.plus(
      withdraw.value.toBigDecimal().div(
        BigInt.fromString("10")
          .pow(18 as u8)
          .toBigDecimal()
      )
    )
  }
  dayData.volumeUSD = dayData.volume.times(fusePrice)
  dayData.balanceUSD = balance.times(fusePrice)
  dayData.priceUSD = BigDecimal.fromString("1").times(fusePrice)

  dayData.balance = balance

  dayData.save()

  return dayData as DayData
}
