import '@nomiclabs/hardhat-ethers';
import { ethers } from "hardhat";

async function main() {
  const Copyright = await ethers.getContractFactory("Copyright");
  const copyright = await Copyright.deploy("Copyright", "SSQ", "http://localhost/ipfs/");

  await copyright.deployed();

  console.log(`Copyright contract deployed at ${ copyright.address }`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
