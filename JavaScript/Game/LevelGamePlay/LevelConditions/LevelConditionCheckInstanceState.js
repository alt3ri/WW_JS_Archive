"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckInstanceState = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckInstanceState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, a) {
    if (!e.LimitParams) return !1;
    var r = e.LimitParams.get("InstanceId");
    if (!r) return !1;
    const t = parseInt(r);
    var r = e.LimitParams.get("State");
    switch (r ? parseInt(r) : 0) {
      case 1:
        return ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceFinished(
          t,
        );
      case 2:
        return !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceFinished(
          t,
        );
      default:
        return !1;
    }
  }
}
exports.LevelConditionCheckInstanceState = LevelConditionCheckInstanceState;
// # sourceMappingURL=LevelConditionCheckInstanceState.js.map
