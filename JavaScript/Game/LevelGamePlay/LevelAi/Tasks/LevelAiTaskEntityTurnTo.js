"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskEntityTurnTo = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary"),
  Global_1 = require("../../../Global"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelAiTask_1 = require("../LevelAiTask"),
  TURN_SPEED = 200,
  TOLERANCE = 10;
class LevelAiTaskEntityTurnTo extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments),
      (this.Tae = void 0),
      (this.WTe = 0),
      (this.zLe = Vector_1.Vector.Create());
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
    return r?.IsValid() && this._Xa(this.zLe, e)
      ? ((this.WTe = r.MovementMode),
        (r.MovementMode = 1),
        AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
          this.Tae,
          this.zLe,
          TURN_SPEED,
        ),
        (this.NotifyTick = !0),
        3)
      : 1;
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
  _Xa(e, r) {
    switch (r.Target.Type) {
      case 2:
        var t = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          r.EntityId,
        );
        if (!t?.Valid) return !1;
        t = t.Entity.GetComponent(1);
        e.DeepCopy(t.ActorLocationProxy);
        break;
      case 4:
        t = Global_1.Global.BaseCharacter;
        if (!t?.IsValid()) return !1;
        e.DeepCopy(t.CharacterActorComponent.ActorLocationProxy);
        break;
      case 3:
        e.Set(r.Target.Pos.X ?? 0, r.Target.Pos.Y ?? 0, r.Target.Pos.Z ?? 0);
        break;
      default:
        return !1;
    }
    return !0;
  }
}
exports.LevelAiTaskEntityTurnTo = LevelAiTaskEntityTurnTo;
//# sourceMappingURL=LevelAiTaskEntityTurnTo.js.map
