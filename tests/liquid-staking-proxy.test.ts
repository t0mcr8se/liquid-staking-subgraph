import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { AddedValidator } from "../generated/schema"
import { AddedValidator as AddedValidatorEvent } from "../generated/LiquidStakingProxy/LiquidStakingProxy"
import { handleAddedValidator } from "../src/liquid-staking-proxy"
import { createAddedValidatorEvent } from "./liquid-staking-proxy-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let admin = Address.fromString("0x0000000000000000000000000000000000000001")
    let validatorAdded = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newAddedValidatorEvent = createAddedValidatorEvent(
      admin,
      validatorAdded
    )
    handleAddedValidator(newAddedValidatorEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AddedValidator created and stored", () => {
    assert.entityCount("AddedValidator", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AddedValidator",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "admin",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AddedValidator",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "validatorAdded",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
