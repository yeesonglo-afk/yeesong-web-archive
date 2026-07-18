import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Yeesong \(Yisong Luo\) — Portfolio<\/title>/i);
  assert.match(html, /aria-label="Portfolio navigation"/);
  assert.match(html, /src="\/portfolio\/keynote\/hero\.jpg"/);
  assert.match(html, /src="\/portfolio\/keynote-v2\/about\.png"/);
  assert.match(html, /src="\/portfolio\/keynote-v2\/work\.png"/);
  assert.match(html, /src="\/portfolio\/keynote-v2\/life\.png"/);
  assert.match(html, />About Me</);
  assert.match(html, />Key Projects</);
  assert.match(html, />Life</);
  assert.match(html, /mailto:yeesonglo@gmail\.com/);
  assert.match(html, /linkedin\.com\/in\/yeesong/);
  assert.doesNotMatch(html, /role="dialog"/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});
