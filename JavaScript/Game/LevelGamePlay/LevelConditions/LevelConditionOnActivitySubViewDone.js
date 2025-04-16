"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionOnActivitySubViewDone = void 0);
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionOnActivitySubViewDone extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, t, ...i) {
    e = e.LimitParams.get("ActivityId");
    return void 0 !== e && Number(e) === i[0];
  }
}
exports.LevelConditionOnActivitySubViewDone =
  LevelConditionOnActivitySubViewDone;
//# sourceMappingURL=LevelConditionOnActivitySubViewDone.js.map
