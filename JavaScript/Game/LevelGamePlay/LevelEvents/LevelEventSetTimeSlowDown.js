"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventSetTimeSlowDown = void 0);
const StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  Global_1 = require("../../Global"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventSetTimeSlowDown extends LevelGeneralBase_1.LevelEventBase {
  Execute(e, l) {
    l &&
      e &&
      (l = e.get("DilationPercent")) &&
      !StringUtils_1.StringUtils.IsEmpty(l) &&
      ((e = parseFloat(l)), (l = Global_1.Global.BaseCharacter)) &&
      (l.CustomTimeDilation = e);
  }
}
exports.LevelEventSetTimeSlowDown = LevelEventSetTimeSlowDown;
//# sourceMappingURL=LevelEventSetTimeSlowDown.js.map
