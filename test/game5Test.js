const { assert } = require("chai");
const { ethers } = require("hardhat");

describe("Game5", function() {
  it("should be a winner", async function() {
    const Game = await ethers.getContractFactory("Game5");
    const game = await Game.deploy();
    await game.deployed();

    // good luck

    let address = 0x11FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf;
    let signer;

    while(address > 0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf) {
      signer = ethers.Wallet.createRandom();

      address = await signer.address;
    }

    await ethers.provider.send("hardhat_setBalance", [
      address,
      ethers.utils.parseUnits("100", "ether").toHexString().replace("0x0", "0x"),
    ]);

    // ethers.provider.getSigner(signer.privateKey)
    await game.connect(signer.connect(ethers.provider)).win();

    // leave this assertion as-is
    assert(await game.isWon(), "You did not win the game");
  });
});
