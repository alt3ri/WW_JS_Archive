"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionCheckDungeonFinished = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionCheckDungeonFinished extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    let a;
    return (
      !!e.LimitParams &&
      !!(a = e.LimitParams.get("InstanceId")) &&
      ((e = e.LimitParams.get("Finish")), !!a) &&
      ((a = parseInt(a)),
      (parseInt(e) === 1) ===
        ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(a))
    );
  }
}
exports.LevelConditionCheckDungeonFinished = LevelConditionCheckDungeonFinished;
// # sourceMappingURL=LevelConditionCheckDungeonFinished.js.map
