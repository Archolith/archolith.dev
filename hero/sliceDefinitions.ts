export interface SliceDefinition {
    id: "surface" | "proxy" | "session" | "memory" | "filter" | "foundation";
    layerId: `L${number}`;
    name: string;
    accent: string;
    depth: string;
    measure: string;
    summary: string;
    detail: string;
    note: string;
}

export const sliceDefinitions: SliceDefinition[] = [
    {
        id: "surface",
        layerId: "L0",
        name: "Surface",
        accent: "#8eaed5",
        depth: "02m",
        measure: "128k > survey brief",
        summary: "Incoming signal mass compresses into order.",
        detail: "Converging traces, scan bands, and collapsing density establish the first readable seam.",
        note: "ingress / compression face"
    },
    {
        id: "proxy",
        layerId: "L1",
        name: "Proxy",
        accent: "#56a8e8",
        depth: "08m",
        measure: ":9800 routing seam",
        summary: "Interception plate and reroute geometry.",
        detail: "Channels, gate geometry, and seam crossings redirect traffic without changing the upstream contract.",
        note: "routing / interception plate"
    },
    {
        id: "session",
        layerId: "L2",
        name: "Session",
        accent: "#62a98c",
        depth: "15m",
        measure: "ttl 24h / active tail",
        summary: "Temporary assembly layer.",
        detail: "Linked fragments and working-state marks hold the current turn together before they decay or promote.",
        note: "working state / transient joins"
    },
    {
        id: "memory",
        layerId: "L3",
        name: "Memory",
        accent: "#82729e",
        depth: "23m",
        measure: "promote > 0.90",
        summary: "Dense archival layer.",
        detail: "Engraved relationships, compressed structures, and durable promotions form the long-term graph bed.",
        note: "archive / promoted structure"
    },
    {
        id: "filter",
        layerId: "L4",
        name: "Filter",
        accent: "#c29b58",
        depth: "31m",
        measure: "threshold / subtraction",
        summary: "Selective subtraction.",
        detail: "Cut lines, masked removals, and threshold marks strip superseded matter before it crosses budget.",
        note: "budget gate / subtraction plate"
    },
    {
        id: "foundation",
        layerId: "L5",
        name: "Foundation",
        accent: "#a28670",
        depth: "39m",
        measure: "load grid / schema base",
        summary: "Load-bearing base grid.",
        detail: "Bedrock lattice, survey rails, and schema understructure carry the entire stack without ornament.",
        note: "bedrock / structural grid"
    }
];
