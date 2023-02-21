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
  Withdrawn as WithdrawnEvent
} from "../generated/LiquidStakingProxy/LiquidStakingProxy"
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
} from "../generated/schema"

export function handleAddedValidator(event: AddedValidatorEvent): void {
  let entity = new AddedValidator(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.admin = event.params.admin
  entity.validatorAdded = event.params.validatorAdded

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleAdminChanged(event: AdminChangedEvent): void {
  let entity = new AdminChanged(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousAdmin = event.params.previousAdmin
  entity.newAdmin = event.params.newAdmin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBeaconUpgraded(event: BeaconUpgradedEvent): void {
  let entity = new BeaconUpgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.beacon = event.params.beacon

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBurned(event: BurnedEvent): void {
  let entity = new Burned(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokens = event.params.tokens
  entity.exchanger = event.params.exchanger

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangedProtocolFee(event: ChangedProtocolFeeEvent): void {
  let entity = new ChangedProtocolFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.admin = event.params.admin
  entity.newBasisRate = event.params.newBasisRate

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleChangedValidatorIndex(
  event: ChangedValidatorIndexEvent
): void {
  let entity = new ChangedValidatorIndex(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newIndex = event.params.newIndex
  entity.priorIndex = event.params.priorIndex

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDeposited(event: DepositedEvent): void {
  let entity = new Deposited(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.deposit = event.params.deposit
  entity.tokens = event.params.tokens

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDisabledSafeguard(event: DisabledSafeguardEvent): void {
  let entity = new DisabledSafeguard(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.admin = event.params.admin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDistributedProtocolFee(
  event: DistributedProtocolFeeEvent
): void {
  let entity = new DistributedProtocolFee(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.treasury = event.params.treasury
  entity.rewardedShares = event.params.rewardedShares
  entity.protocolFees = event.params.protocolFees
  entity.priceRatio = event.params.priceRatio

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleInitialized(event: InitializedEvent): void {
  let entity = new Initialized(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.version = event.params.version

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleNewSystemStakeLimit(
  event: NewSystemStakeLimitEvent
): void {
  let entity = new NewSystemStakeLimit(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newLimit = event.params.newLimit
  entity.priorLimit = event.params.priorLimit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReenabledSafeguard(event: ReenabledSafeguardEvent): void {
  let entity = new ReenabledSafeguard(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.admin = event.params.admin
  entity.newLimit = event.params.newLimit

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRemovedValidator(event: RemovedValidatorEvent): void {
  let entity = new RemovedValidator(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.validatorRemoved = event.params.validatorRemoved
  entity.admin = event.params.admin

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleReplacedValidator(event: ReplacedValidatorEvent): void {
  let entity = new ReplacedValidator(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newValidator = event.params.newValidator
  entity.oldValidator = event.params.oldValidator

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpdatedPriceRatio(event: UpdatedPriceRatioEvent): void {
  let entity = new UpdatedPriceRatio(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.updatedRatio = event.params.updatedRatio
  entity.accumulatedRewards = event.params.accumulatedRewards
  entity.totalSupply = event.params.totalSupply

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUpgraded(event: UpgradedEvent): void {
  let entity = new Upgraded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.implementation = event.params.implementation

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleWithdrawn(event: WithdrawnEvent): void {
  let entity = new Withdrawn(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.user = event.params.user
  entity.tokens = event.params.tokens
  entity.rate = event.params.rate
  entity.payout = event.params.payout

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
