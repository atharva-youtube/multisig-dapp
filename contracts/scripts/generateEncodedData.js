const hre = require("hardhat");

async function main() {
  const Multisig = await hre.ethers.getContractFactory("Multisig");
  const encodedData = await Multisig.interface.encodeFunctionData(
    "initialize",
    [["0x1aEe598A33B002d3857bAF8663651924d174F56c"], 1]
  );

  console.log(`Encoded data - ${encodedData}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
