import worker from "../src/index.js";

export default worker.fetch;

export const config = {
    runtime: "edge",
    regions: [
        "cle1",
        "iad1",
        "pdx1",
        "sfo1",
    ],
};