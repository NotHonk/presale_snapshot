const fs = require("fs").promises;
const api =
  "https://api.tonraffles.app/api/v1/fairlaunch/purchases?address=EQDu9ZUCPWK5wgxiW-eiWuJZKANQMhKOPrUS4ZrQO5MUdOx-&limit=2000&offset=0";
const path = "./snapshot.csv";

async function snapshot() {
  try {
    const response = await fetch(api);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const body = await response.json();
    const list = body["data"].filter((x) => x["total_amount"] >= 5000000000);

    const csv = list
      .map((x) => `${x["owner"]},${x["total_amount"]}`)
      .join("\n");
    await fs.writeFile(path, "Address,Amount\n" + csv);
    console.log("Snapshot saved successfully.");
  } catch (e) {
    console.error("An error occurred:", e);
  }
}

snapshot();
