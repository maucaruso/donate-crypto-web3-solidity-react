import Web3 from "web3";
import ABI from "./ABI.json";

// Endereço do contrato, pode ser obtido no remix: http://remix.ethereum.org/#lang=en&optimize=false&runs=200&evmVersion=null&version=soljson-v0.8.18+commit.87f61d96.js
const CONTRACT_ADDRESS = "0x6b48d701c61b57Fae21d07Eb754Cb57bCFCfa3db"

export async function doLogin() {
  if (!window.ethereum) throw new Error("No MetaMask found!");
  
  const web3 = new Web3(window.ethereum);
  const accounts = await web3.eth.requestAccounts();
  
  if (!accounts || !accounts.length) throw new Error("Wallet not found/allowed.");
  
  localStorage.setItem("wallet", accounts[0]);
  
  return accounts[0];
}

function getContract() {
  const web3 = new Web3(window.ethereum);
  const from = localStorage.getItem("wallet");
  return new web3.eth.Contract(ABI, CONTRACT_ADDRESS, { from });
}

export async function addCampaign(campaign) {
  const contract = getContract();
  console.log(contract);
  return contract.methods.addCampaign(campaign.title, campaign.description, campaign.videoUrl, campaign.imageUrl).send();
}

export function getLastCampaignId() {
  const contract = getContract();
  return contract.methods.nextId().call();
}