import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AddedValidator,
  AdminChanged,
  BeaconUpgraded,
  Burned,
  ChangedProtocolFee,
  ChangedValidatorIndex,
  Deposited,
  DisabledSafeguard,
  DistributedProtocolFee,
  Initialized,
  NewSystemStakeLimit,
  OwnershipTransferred,
  Paused,
  ReenabledSafeguard,
  RemovedValidator,
  ReplacedValidator,
  Unpaused,
  UpdatedPriceRatio,
  Upgraded,
  Withdrawn
} from "../generated/LiquidStakingProxy/LiquidStakingProxy"

export function createAddedValidatorEvent(
  admin: Address,
  validatorAdded: Address
): AddedValidator {
  let addedValidatorEvent = changetype<AddedValidator>(newMockEvent())

  addedValidatorEvent.parameters = new Array()

  addedValidatorEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )
  addedValidatorEvent.parameters.push(
    new ethereum.EventParam(
      "validatorAdded",
      ethereum.Value.fromAddress(validatorAdded)
    )
  )

  return addedValidatorEvent
}

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createBurnedEvent(tokens: BigInt, exchanger: Address): Burned {
  let burnedEvent = changetype<Burned>(newMockEvent())

  burnedEvent.parameters = new Array()

  burnedEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )
  burnedEvent.parameters.push(
    new ethereum.EventParam("exchanger", ethereum.Value.fromAddress(exchanger))
  )

  return burnedEvent
}

export function createChangedProtocolFeeEvent(
  admin: Address,
  newBasisRate: BigInt
): ChangedProtocolFee {
  let changedProtocolFeeEvent = changetype<ChangedProtocolFee>(newMockEvent())

  changedProtocolFeeEvent.parameters = new Array()

  changedProtocolFeeEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )
  changedProtocolFeeEvent.parameters.push(
    new ethereum.EventParam(
      "newBasisRate",
      ethereum.Value.fromUnsignedBigInt(newBasisRate)
    )
  )

  return changedProtocolFeeEvent
}

export function createChangedValidatorIndexEvent(
  newIndex: BigInt,
  priorIndex: BigInt
): ChangedValidatorIndex {
  let changedValidatorIndexEvent = changetype<ChangedValidatorIndex>(
    newMockEvent()
  )

  changedValidatorIndexEvent.parameters = new Array()

  changedValidatorIndexEvent.parameters.push(
    new ethereum.EventParam(
      "newIndex",
      ethereum.Value.fromUnsignedBigInt(newIndex)
    )
  )
  changedValidatorIndexEvent.parameters.push(
    new ethereum.EventParam(
      "priorIndex",
      ethereum.Value.fromUnsignedBigInt(priorIndex)
    )
  )

  return changedValidatorIndexEvent
}

export function createDepositedEvent(
  user: Address,
  deposit: BigInt,
  tokens: BigInt
): Deposited {
  let depositedEvent = changetype<Deposited>(newMockEvent())

  depositedEvent.parameters = new Array()

  depositedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam(
      "deposit",
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  )
  depositedEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )

  return depositedEvent
}

export function createDisabledSafeguardEvent(
  admin: Address
): DisabledSafeguard {
  let disabledSafeguardEvent = changetype<DisabledSafeguard>(newMockEvent())

  disabledSafeguardEvent.parameters = new Array()

  disabledSafeguardEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return disabledSafeguardEvent
}

export function createDistributedProtocolFeeEvent(
  treasury: Address,
  rewardedShares: BigInt,
  protocolFees: BigInt,
  priceRatio: BigInt
): DistributedProtocolFee {
  let distributedProtocolFeeEvent = changetype<DistributedProtocolFee>(
    newMockEvent()
  )

  distributedProtocolFeeEvent.parameters = new Array()

  distributedProtocolFeeEvent.parameters.push(
    new ethereum.EventParam("treasury", ethereum.Value.fromAddress(treasury))
  )
  distributedProtocolFeeEvent.parameters.push(
    new ethereum.EventParam(
      "rewardedShares",
      ethereum.Value.fromUnsignedBigInt(rewardedShares)
    )
  )
  distributedProtocolFeeEvent.parameters.push(
    new ethereum.EventParam(
      "protocolFees",
      ethereum.Value.fromUnsignedBigInt(protocolFees)
    )
  )
  distributedProtocolFeeEvent.parameters.push(
    new ethereum.EventParam(
      "priceRatio",
      ethereum.Value.fromUnsignedBigInt(priceRatio)
    )
  )

  return distributedProtocolFeeEvent
}

export function createInitializedEvent(version: i32): Initialized {
  let initializedEvent = changetype<Initialized>(newMockEvent())

  initializedEvent.parameters = new Array()

  initializedEvent.parameters.push(
    new ethereum.EventParam(
      "version",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(version))
    )
  )

  return initializedEvent
}

export function createNewSystemStakeLimitEvent(
  newLimit: BigInt,
  priorLimit: BigInt
): NewSystemStakeLimit {
  let newSystemStakeLimitEvent = changetype<NewSystemStakeLimit>(newMockEvent())

  newSystemStakeLimitEvent.parameters = new Array()

  newSystemStakeLimitEvent.parameters.push(
    new ethereum.EventParam(
      "newLimit",
      ethereum.Value.fromUnsignedBigInt(newLimit)
    )
  )
  newSystemStakeLimitEvent.parameters.push(
    new ethereum.EventParam(
      "priorLimit",
      ethereum.Value.fromUnsignedBigInt(priorLimit)
    )
  )

  return newSystemStakeLimitEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPausedEvent(): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  return pausedEvent
}

export function createReenabledSafeguardEvent(
  admin: Address,
  newLimit: BigInt
): ReenabledSafeguard {
  let reenabledSafeguardEvent = changetype<ReenabledSafeguard>(newMockEvent())

  reenabledSafeguardEvent.parameters = new Array()

  reenabledSafeguardEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )
  reenabledSafeguardEvent.parameters.push(
    new ethereum.EventParam(
      "newLimit",
      ethereum.Value.fromUnsignedBigInt(newLimit)
    )
  )

  return reenabledSafeguardEvent
}

export function createRemovedValidatorEvent(
  validatorRemoved: Address,
  admin: Address
): RemovedValidator {
  let removedValidatorEvent = changetype<RemovedValidator>(newMockEvent())

  removedValidatorEvent.parameters = new Array()

  removedValidatorEvent.parameters.push(
    new ethereum.EventParam(
      "validatorRemoved",
      ethereum.Value.fromAddress(validatorRemoved)
    )
  )
  removedValidatorEvent.parameters.push(
    new ethereum.EventParam("admin", ethereum.Value.fromAddress(admin))
  )

  return removedValidatorEvent
}

export function createReplacedValidatorEvent(
  newValidator: Address,
  oldValidator: Address
): ReplacedValidator {
  let replacedValidatorEvent = changetype<ReplacedValidator>(newMockEvent())

  replacedValidatorEvent.parameters = new Array()

  replacedValidatorEvent.parameters.push(
    new ethereum.EventParam(
      "newValidator",
      ethereum.Value.fromAddress(newValidator)
    )
  )
  replacedValidatorEvent.parameters.push(
    new ethereum.EventParam(
      "oldValidator",
      ethereum.Value.fromAddress(oldValidator)
    )
  )

  return replacedValidatorEvent
}

export function createUnpausedEvent(): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  return unpausedEvent
}

export function createUpdatedPriceRatioEvent(
  updatedRatio: BigInt,
  accumulatedRewards: BigInt,
  totalSupply: BigInt
): UpdatedPriceRatio {
  let updatedPriceRatioEvent = changetype<UpdatedPriceRatio>(newMockEvent())

  updatedPriceRatioEvent.parameters = new Array()

  updatedPriceRatioEvent.parameters.push(
    new ethereum.EventParam(
      "updatedRatio",
      ethereum.Value.fromUnsignedBigInt(updatedRatio)
    )
  )
  updatedPriceRatioEvent.parameters.push(
    new ethereum.EventParam(
      "accumulatedRewards",
      ethereum.Value.fromUnsignedBigInt(accumulatedRewards)
    )
  )
  updatedPriceRatioEvent.parameters.push(
    new ethereum.EventParam(
      "totalSupply",
      ethereum.Value.fromUnsignedBigInt(totalSupply)
    )
  )

  return updatedPriceRatioEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createWithdrawnEvent(
  user: Address,
  tokens: BigInt,
  rate: BigInt,
  payout: BigInt
): Withdrawn {
  let withdrawnEvent = changetype<Withdrawn>(newMockEvent())

  withdrawnEvent.parameters = new Array()

  withdrawnEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  withdrawnEvent.parameters.push(
    new ethereum.EventParam("tokens", ethereum.Value.fromUnsignedBigInt(tokens))
  )
  withdrawnEvent.parameters.push(
    new ethereum.EventParam("rate", ethereum.Value.fromUnsignedBigInt(rate))
  )
  withdrawnEvent.parameters.push(
    new ethereum.EventParam("payout", ethereum.Value.fromUnsignedBigInt(payout))
  )

  return withdrawnEvent
}
