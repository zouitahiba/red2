import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("uses the Netlify Next.js build output", async () => {
  const netlifyConfig = await readFile(
    new URL("../netlify.toml", import.meta.url),
    "utf8",
  );
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url), "utf8"),
  );

  assert.match(netlifyConfig, /publish\s*=\s*["']\.next["']/);
  assert.doesNotMatch(netlifyConfig, /NETLIFY_NEXT_PLUGIN_SKIP/);
  assert.equal(packageJson.scripts.build, "next build");
});

test("does not add a title header to the shared link", async () => {
  const layout = await readFile(
    new URL("../app/layout.tsx", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(layout, /title:\s*["']/);
  assert.match(layout, /<html lang=["']fr["']>/);
});
