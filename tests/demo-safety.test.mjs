import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

test("login explicitly identifies demo access and does not imply credential verification", async () => {
  const login = await readFile(new URL("../src/pages/Login/Login.jsx", import.meta.url), "utf8");
  const context = await readFile(new URL("../src/context/AuthContext.jsx", import.meta.url), "utf8");

  assert.match(login, /Acesso demonstrativo/);
  assert.match(login, /usuário e senha ainda não são validados/i);
  assert.match(context, /services\/mock\/mockData/);
  assert.match(context, /sessionStorage/);
});

test("prototype does not claim a server-side authorization boundary", async () => {
  const readme = await readFile(new URL("../README.md", import.meta.url), "utf8");
  assert.match(readme, /autenticação real/i);
  assert.match(readme, /proteção de rotas é somente lógica de interface/i);
  assert.match(readme, /não use dados reais/i);
});
