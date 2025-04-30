import { readdir, readFile, writeFile } from "fs/promises";
import { join } from "path";

const OUT_FILE = "../Data/v1.json";
const RAW_DATA_PATH = "../Data/Raw";

interface RawData {
    variantName: string;
    allowBaby: boolean;
    weight: number;
    mods: RawDataMod[];
    maps: RawDataMap[];
    dinos: RawDataDino[];
}

interface RawDataMod {
    id: number;
    name: string;
}

interface RawDataMap {
    type: "required" | "disallowed";
    name: string;
}

interface RawDataDino {
    class: string;
    group: string | null;
}

interface ParsedData {
    groups: ParsedDataGroup[];
    variants: ParsedDataVariant[];
}

interface ParsedDataGroup {
    name: string;
    dinos: ParsedDataDino[];
}

interface ParsedDataDino {
    class: string;
    allowBaby: boolean;
    variant: string;
    mods: string[];
    maps: string[];
    mapsExcluded: string[];
}

interface ParsedDataVariant {
    name: string;
    weight: number;
    weightConfigKey: string;
}


const variantMap = new Map<string, ParsedDataVariant>();
const groupMap = new Map<string, ParsedDataGroup>();

console.log("Parsing data...");
const dataArray: RawData[] = [];
const modsMap = new Map<number, string>();

for (const folder of await readdir(RAW_DATA_PATH)) {
    for (const file of await readdir(join(RAW_DATA_PATH, folder))) {
        console.log(`Parsing file ${file}...`);
        const data: RawData = await JSON.parse(await readFile(join(RAW_DATA_PATH, folder, file), "utf-8"));
        for (const requirement of data.mods) {
            if (requirement.id && requirement.name) {
                modsMap.set(requirement.id, requirement.name);
            }
        }
        dataArray.push(data);
    }
}

for (const data of dataArray) {
    console.log(`Parsing variant ${data.variantName} with ${data.dinos.length} dinos...`);

    if (!variantMap.has(data.variantName)) {
        const weightConfigKey = data.variantName.replace(/-([a-z])/g, (_, char) => char.toUpperCase()).replace(/^[a-z]/, (char) => char.toUpperCase()) + "SpawnWeight";
        variantMap.set(data.variantName, {
            name: data.variantName,
            weight: data.weight,
            weightConfigKey,
        });
    }

    for (const dino of data.dinos) {
        if (!dino.class) throw new Error(`Dino class is missing in ${data.variantName}`);

        const group = groupMap.get(dino.group) || {
            name: dino.group,
            dinos: []
        }
        const mods = new Set<string>();
        for (const requirement of data.mods || []) {
            const modName = modsMap.get(requirement.id);
            if (!modName) throw new Error(`Unknown mod: ${modName}`);
            mods.add(modName);
        }
        const maps = new Set<string>();
        const mapsExcluded = new Set<string>();
        for (const map of data.maps || []) {
            if (map.type === "disallowed") {
                mapsExcluded.add(map.name);
            } else {
                maps.add(map.name);
            }
        }
        group.dinos.push({
            class: dino.class,
            allowBaby: data.allowBaby,
            variant: data.variantName,
            mods: Array.from(mods),
            maps: Array.from(maps),
            mapsExcluded: Array.from(mapsExcluded)
        })
        groupMap.set(dino.group, group);
    }
}

console.log("Writing data...");
const parsedData: ParsedData = {
    groups: Array.from(groupMap.values()),
    variants: Array.from(variantMap.values())
}
await writeFile(OUT_FILE, JSON.stringify(parsedData, null, 2), "utf-8");


console.log("Done.");
