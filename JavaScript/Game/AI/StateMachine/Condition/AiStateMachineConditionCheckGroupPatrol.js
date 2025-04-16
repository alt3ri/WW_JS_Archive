"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineConditionCheckGroupPatrol = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  AiStateMachineCondition_1 = require("./AiStateMachineCondition");
class AiStateMachineConditionCheckGroupPatrol extends AiStateMachineCondition_1.AiStateMachineCondition {
  OnTick() {
    var e =
      ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(
        this.Node.Entity.Id,
      );
    this.ResultSelf = !!e;
  }
  ToString(e, i = 0) {
    super.ToString(e, i),
      e.Append(`可以集群巡逻
`);
  }
}
exports.AiStateMachineConditionCheckGroupPatrol =
  AiStateMachineConditionCheckGroupPatrol;
//# sourceMappingURL=AiStateMachineConditionCheckGroupPatrol.js.map
