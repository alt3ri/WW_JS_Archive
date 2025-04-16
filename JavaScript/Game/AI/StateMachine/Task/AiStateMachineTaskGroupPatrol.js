"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskGroupPatrol = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskGroupPatrol extends AiStateMachineTask_1.AiStateMachineTask {
  OnEnter(e) {
    var a =
      ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(
        this.Node.Entity.Id,
      );
    a && (a.GroupPatrolState = 1);
  }
  OnExit(e) {
    var a =
      ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(
        this.Node.Entity.Id,
      );
    a && (a.Group?.PausePatrol(), (a.GroupPatrolState = 0));
  }
  OnTick(e, a) {
    ModelManager_1.ModelManager.MonsterGroupPatrolModel.GetMonsterInfoByEntityId(
      this.Node.Entity.Id,
    ) || (this.Node.TaskFinish = !0);
  }
}
exports.AiStateMachineTaskGroupPatrol = AiStateMachineTaskGroupPatrol;
//# sourceMappingURL=AiStateMachineTaskGroupPatrol.js.map
