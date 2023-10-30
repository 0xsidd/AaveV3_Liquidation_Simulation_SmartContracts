import { ethers } from "hardhat";
import { expect } from "chai";
require("dotenv").config();

import aaveOracleV3Abi from "../helper/abi/aaveOracleV3.json";
// V3
const aaveOracleV3Address:any = process.env.AAVE_ORACLE_V3?.toString();
const aaveOracleV3PoolAdmin:any = process.env.AAVE_ORACLE_POOL_ADMIN?.toString();
let aaveV3Oracle:any;
let aavePoolAdminSigner:any;

//
let updatedOracle:any;
const wbtc = process.env.WBTC?.toString();

describe("Deploy and Upgrade oracles", async () => {
  beforeEach(async () => {    
    aavePoolAdminSigner = await ethers.getImpersonatedSigner(
      aaveOracleV3PoolAdmin
    );
    aaveV3Oracle = new ethers.Contract(
      aaveOracleV3Address,
      aaveOracleV3Abi,
      aavePoolAdminSigner
    );
    const UpdatedOracle = await ethers.getContractFactory("oracle");
    updatedOracle = await UpdatedOracle.deploy();
  });
  it("Shoud update oracle and return correct values", async () => {
    //V3 upgrade check
    await aaveV3Oracle
      .connect(aavePoolAdminSigner)
      .setAssetSources([wbtc], [updatedOracle.address]);
    await expect(Number(await aaveV3Oracle.getAssetPrice(wbtc))).to.be.equal(
      17000000000
    );
  });
});
