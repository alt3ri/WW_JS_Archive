"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionDragonPoolState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionDragonPoolState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    var r;
    return !(
      !e.LimitParams ||
      ((r = e.LimitParams.get("DragonPoolId")),
      (e = e.LimitParams.get("State")),
      !r) ||
      !e ||
      ModelManager_1.ModelManager.MingSuModel.GetTargetDragonPoolActiveById(
        parseInt(r),
      ) !== parseInt(e)
    );
  }
}
exports.LevelConditionDragonPoolState = LevelConditionDragonPoolState;
//# sourceMappingURL=LevelConditionDragonPoolState.js.map
