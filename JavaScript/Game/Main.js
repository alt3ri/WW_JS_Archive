"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const puerts_1 = require("puerts");
const GameProcedure_1 = require("./GameProcedure");
function main() {
  const e = puerts_1.argv.getByName("GameInstance");
  GameProcedure_1.GameProcedure.Start(e);
}
main();
// # sourceMappingURL=Main.js.map
