"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelAiTaskTurnAndPlayMontage = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../Utils/GravityUtils"),
  LevelAiTask_1 = require("../LevelAiTask"),
  TURN_SPEED = 200,
  TOLERANCE = 10;
class LevelAiTaskTurnAndPlayMontage extends LevelAiTask_1.LevelAiTask {
  constructor() {
    super(...arguments),
      (this.Tae = void 0),
      (this.WTe = 0),
      (this.bTe = 0),
      (this.NTe = 0),
      (this.OTe = 0),
      (this.KTe = 0);
  }
  ExecuteTask() {
    return (this.KTe = 1), (this.NotifyTick = !0), 3;
  }
  TickTask(t) {
    switch (this.KTe) {
      case 1:
        this.QTe(), (this.KTe = 2);
        break;
      case 2:
        GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(
          this.Tae,
        ) < TOLERANCE &&
          ((this.Tae.Entity.GetComponent(44).CharacterMovement.MovementMode =
            this.WTe),
          (this.KTe = 3));
        break;
      case 3:
        this.XTe(), (this.KTe = 4);
        break;
      case 4:
        break;
      default:
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "LevelAi",
            50,
            "[TurnToAndPlayMontage] 阶段切换出错",
            ["CurPhase", this.KTe],
          );
    }
  }
  AbortTask() {
    return (
      this.KTe < 3
        ? this.Tae?.ClearInput()
        : this.CreatureDataComponent.Entity.GetComponent(
            45,
          ).VolatileMontageStopByLoad(3, this.bTe, 0),
      2
    );
  }
  OnTaskFinished(t) {
    (this.Tae = void 0), (this.WTe = 0);
  }
  QTe() {
    var t,
      e = this.Params;
    e
      ? (t = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          e.EntityId,
        ))
        ? ((this.Tae = t.Entity.GetComponent(3)),
          (t = t.Entity.GetComponent(44)?.CharacterMovement)?.IsValid()
            ? ((this.WTe = t.MovementMode),
              (t.MovementMode = 1),
              (t = Vector_1.Vector.Create(
                e.Pos.X ?? 0,
                e.Pos.Y ?? 0,
                e.Pos.Z ?? 0,
              )),
              AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
                this.Tae,
                t,
                TURN_SPEED,
              ))
            : this.FinishLatentTask(1))
        : (Log_1.Log.CheckError() &&
            Log_1.Log.Error("LevelAi", 29, "执行转向动作时实体不存在:", [
              "PbDataId",
              e.EntityId,
            ]),
          this.FinishLatentTask(1))
      : this.FinishLatentTask(1);
  }
  XTe() {
    var t,
      e = this.Params;
    e
      ? ((this.NTe = e.LoopDuration ?? 0),
        (this.OTe = e.RepeatTimes ?? 0),
        (t = this.CreatureDataComponent.Entity.GetComponent(45)),
        (e = { IsAbp: e.IsAbpMontage, MontageId: e.MontageId }),
        (e = t.GetMontagePath(e))
          ? (this.bTe = t.VolatileMontagePlayByLoad(
              3,
              e,
              void 0,
              (t) => {
                this.FinishLatentTask(0);
              },
              this.NTe,
              this.OTe,
            ))
          : this.FinishLatentTask(0))
      : this.FinishLatentTask(1);
  }
}
exports.LevelAiTaskTurnAndPlayMontage = LevelAiTaskTurnAndPlayMontage;
//# sourceMappingURL=LevelAiTaskTurnAndPlayMontage.js.map
