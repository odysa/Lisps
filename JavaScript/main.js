import fs from "fs";
import { run } from "./eval.js";

const filePath = process.argv[2];
run(fs.readFileSync(filePath, "utf-8"));
