const { ethers } = require("hardhat")

async function main() {
  const [deployer] = await ethers.getSigners()
  console.log("Deploying with:", deployer.address)

  const Admin = await ethers.getContractFactory("RampAdmin")
  const admin = await Admin.deploy(deployer.address, 50) // 0.5% fee
  await admin.waitForDeployment()
  console.log("RampAdmin:", await admin.getAddress())

  const Vault = await ethers.getContractFactory("RampVault")
  const vault = await Vault.deploy(deployer.address)
  await vault.waitForDeployment()
  console.log("RampVault:", await vault.getAddress())

  const Registry = await ethers.getContractFactory("ReceiptRegistry")
  const registry = await Registry.deploy()
  await registry.waitForDeployment()
  console.log("ReceiptRegistry:", await registry.getAddress())

  const USDC = await ethers.getContractFactory("MockUSDC")
  const usdc = await USDC.deploy()
  await usdc.waitForDeployment()
  console.log("MockUSDC:", await usdc.getAddress())
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})