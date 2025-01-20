import {
  Asset,
  BASE_FEE,
  Horizon,
  Keypair,
  Networks,
  Operation,
  TransactionBuilder,
} from "@stellar/stellar-sdk";

import {
  ISSUER_SECRET_KEY,
  DISTRIBUTOR_SECRET_KEY,
  SERVER_URL,
} from "../config/environment.js";

const server = new Horizon.Server(SERVER_URL);
const baseDistributionAmount = "10000";

const issuerKeypair = Keypair.fromSecret(ISSUER_SECRET_KEY);
const asset = new Asset("eUSD", issuerKeypair.publicKey());

/**
 * Fund the distributor account with the custom asset.
 */
async function fundDistributorAccount() {
  const distributorKeypair = Keypair.fromSecret(DISTRIBUTOR_SECRET_KEY);

  try {
    const issuerAccount = await server.loadAccount(
      distributorKeypair.publicKey()
    );

    const changeTrustOperation = Operation.changeTrust({
      asset,
      source: distributorKeypair.publicKey(),
    });

    const paymentOperation = Operation.payment({
      source: issuerKeypair.publicKey(),
      destination: distributorKeypair.publicKey(),
      amount: baseDistributionAmount,
      asset,
    });

    const transaction = new TransactionBuilder(issuerAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(changeTrustOperation)
      .addOperation(paymentOperation)
      .setTimeout(30)
      .build();

    transaction.sign(distributorKeypair);
    transaction.sign(issuerKeypair);

    const result = await server.submitTransaction(transaction);
    console.log("Transaction hash result", result.hash);
    console.log("Distributor account funded successfully.");
  } catch (error) {
    console.error(
      "Error funding distributor account:",
      error.response?.data || error
    );
  }
}

/**
 * Fund a specific account with the custom asset.
 * @param {string} account - The public key of the account to fund.
 */
export async function fundAccount(account) {
  await fundDistributorAccount();

  const distributorKeypair = Keypair.fromSecret(DISTRIBUTOR_SECRET_KEY);

  try {
    const distributorAccount = await server.loadAccount(
      distributorKeypair.publicKey()
    );

    const paymentOperation = Operation.payment({
      destination: account,
      amount: baseDistributionAmount,
      asset,
    });

    const transaction = new TransactionBuilder(distributorAccount, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(paymentOperation)
      .setTimeout(30)
      .build();

    transaction.sign(distributorKeypair);

    await server.submitTransaction(transaction);
    console.log(`Account ${account} funded successfully.`);
  } catch (error) {
    console.error(
      `Error funding account ${account}:`,
      error.response?.data || error
    );
  }
}
