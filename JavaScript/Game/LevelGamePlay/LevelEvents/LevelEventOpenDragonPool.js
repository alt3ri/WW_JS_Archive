"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventOpenDragonPool = void 0);
const MingSuController_1 = require("../../Module/MingSu/MingSuController");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventOpenDragonPool extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, o) {
    e &&
      (e = e.get("DragonPoolId")) &&
      MingSuController_1.MingSuController.OpenView(parseInt(e));
  }
}
exports.LevelEventOpenDragonPool = LevelEventOpenDragonPool;
// # sourceMappingURL=LevelEventOpenDragonPool.js.map
