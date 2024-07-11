"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckLevel = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckLevel extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, r) {
    let a;
    return (
      !!e.LimitParams &&
      !!(e = e.LimitParams.get("Level")) &&
      !!(a =
        ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(0)) &&
      a >= parseInt(e)
    );
  }
}
exports.LevelConditionCheckLevel = LevelConditionCheckLevel;
// # sourceMappingURL=LevelConditionCheckLevel.js.map
