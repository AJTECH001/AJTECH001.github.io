// Writes a small HTML redirect page for each URL retired in the move to a
// security-focused portfolio, so old links land on the closest current page.
// GitHub Pages cannot send real HTTP redirects; meta refresh plus a canonical
// link is the static equivalent that search engines follow.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const outDir = new URL("../out/", import.meta.url).pathname;

const retired = [
  ["/work/personal-technology-headquarters", "/work/"],
  ["/work/infrastructure-engineering-lab", "/work/"],
  ["/journal", "/writing/"],
  ["/journal/building-a-personal-technology-headquarters", "/writing/"],
  ["/research/infrastructure-engineering", "/writing/"],
  ["/research/self-hosted-infrastructure", "/writing/"],
  ["/research/data-center-engineering", "/writing/"],
  ["/research/ai-infrastructure", "/writing/"],
  [
    "/research/systems-programming-and-rust",
    "/research/solana-program-security-account-validation/",
  ],
  [
    "/research/blockchain-protocol-security",
    "/research/recurring-smart-contract-vulnerability-classes/",
  ],
];

const page = (to) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Moved</title>
<meta name="robots" content="noindex">
<link rel="canonical" href="${to}">
<meta http-equiv="refresh" content="0; url=${to}">
</head>
<body><p>This page has moved to <a href="${to}">${to}</a>.</p></body>
</html>
`;

for (const [from, to] of retired) {
  const dir = join(outDir, from);
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, "index.html"), page(to));
}
console.log(`Wrote ${retired.length} redirect pages.`);
