const TonWeb = require('tonweb');
const fs = require("fs").promises;
const path = "./holders.csv";

const api = 'https://tonapi.io/v2/jettons/0%3A50875b34524365db0ef4fb40c5b3bc92c849a8101d5ab76c622ab56219b0563a/holders?limit=1000&offset=0'

function uqAddress(address) {
    return new TonWeb.Address(address).toString(true, false, false)
}

async function snapshot() {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const body = await response.json();
    const list = body["addresses"]
    const airdrops = list.splice(0, 40)
        .map((x) => `${uqAddress(x.owner.address)},${x.balance}`)
        .join('\n')
    await fs.writeFile(path, "Address,Amount\n" + airdrops);
    console.log("Snapshot saved successfully.");
  } catch (e) {
    console.error("An error occurred:", e);
  }
}

snapshot();
