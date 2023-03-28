const hre = require("hardhat");

async function main() {
  const Multisig = await hre.ethers.getContractFactory("Multisig");
  const encodedData = await Multisig.interface.encodeFunctionData(
    "initialize",
    [["0x53b8E7c9D1e0E9BdF5e2c3197b070542611995e7"], 1]
  );

  console.log(`Encoded data - ${encodedData}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
