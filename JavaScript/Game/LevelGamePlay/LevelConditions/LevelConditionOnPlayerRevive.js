"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnPlayerRevive = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnPlayerRevive extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r, ...l) {
    var s = l[0],
      n = l[1],
      v = l[2],
      l = l[3];
    return s && 1 === n && 1 === v && 2 === l;
  }
}
exports.LevelConditionOnPlayerRevive = LevelConditionOnPlayerRevive;
//# sourceMappingURL=LevelConditionOnPlayerRevive.js.map
