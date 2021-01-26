import * as fs from "fs";
import * as R from "ramda";

const OUTPUT_DIR: {[k in string]: string} = {
  ITEMS: "json/items",
  VILLAGERS: "json/villagers"
};
const FILE: {[k in string]: string} =  {
  ITEMS: "./items.json",
  VILLAGERS: "./villagers.json"
}

Object.keys(OUTPUT_DIR).forEach((k) => {
  if (!fs.existsSync(OUTPUT_DIR[k])) {
    fs.mkdirSync(OUTPUT_DIR[k]);
  }
})

function readJSON(filename: string) {
  const rawFileString = fs.readFileSync(filename).toString();
  return JSON.parse(rawFileString);
}

function writeJSON(filename: string, json: any) {
  fs.writeFileSync(filename, JSON.stringify(json));
}

export const rejectNil = R.reject(R.isNil);

/**
 * generate items
 */
function generateItems() {
  const data = readJSON(FILE.ITEMS);
  Object.values(data).forEach((item: any) => {
    item.variants.forEach((variant: any) => {
      writeJSON(`${OUTPUT_DIR.ITEMS}/${variant.uniqueEntryId}.json`, item);
    });
  });
}

/**
 * generate villager
 */
function generateVillagers() {
  const data = readJSON(FILE.VILLAGERS);
  Object.values(data).forEach((villager: any) => {
    writeJSON(`${OUTPUT_DIR.VILLAGERS}/${villager.uniqueEntryId}.json`, villager);
  });
}

generateItems();
generateVillagers();