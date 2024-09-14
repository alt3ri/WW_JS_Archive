"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskTurnTo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelAiTask_1 = require("../LevelAiTask"),
  TURN_SPEED = 200,
  TOLERANCE = 10;
class LevelAiTaskTurnTo extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments), (this.Tae = void 0), (this.WTe = 0);
  }
  ExecuteTask() {
    var e = this.Params;
    if (!e) return 1;
    var r = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
      e.EntityId,
    );
    if (!r)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("LevelAi", 30, "执行转向动作时实体不存在:", [
            "PbDataId",
            e.EntityId,
          ]),
        1
      );
    this.Tae = r.Entity.GetComponent(3);
    r = r.Entity.GetComponent(38)?.CharacterMovement;
    if (!r?.IsValid()) return 1;
    (this.WTe = r.MovementMode), (r.MovementMode = 1);
    r = Vector_1.Vector.Create(e.Pos.X ?? 0, e.Pos.Y ?? 0, e.Pos.Z ?? 0);
    return (
      AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
        this.Tae,
        r,
        TURN_SPEED,
      ),
      (this.NotifyTick = !0),
      3
    );
  }
  TickTask(e) {
    this.Tae.InputRotatorProxy.Equals(this.Tae.ActorRotationProxy, TOLERANCE) &&
      ((this.Tae.Entity.GetComponent(38).CharacterMovement.MovementMode =
        this.WTe),
      this.FinishLatentTask(0));
  }
  AbortTask() {
    return this.Tae?.ClearInput(), 2;
  }
  OnTaskFinished(e) {
    (this.Tae = void 0), (this.WTe = 0);
  }
}
exports.LevelAiTaskTurnTo = LevelAiTaskTurnTo;
//# sourceMappingURL=LevelAiTaskTurnTo.js.map
