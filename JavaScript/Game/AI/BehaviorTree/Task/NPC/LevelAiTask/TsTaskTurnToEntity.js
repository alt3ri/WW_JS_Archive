"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  Global_1 = require("../../../../../Global"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
  AiContollerLibrary_1 = require("../../../../Controller/AiContollerLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase"),
  TOLERANCE = 3;
class TsTaskTurnToEntity extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.TurnMode = 0),
      (this.TargetEntityId = 0),
      (this.TargetPos = new UE.Vector()),
      (this.TurnSpeed = 180),
      (this.TsTurnMode = 0),
      (this.TsTargetEntityId = 0),
      (this.TsTargetPos = void 0),
      (this.TsTurnSpeed = 180),
      (this.Character = void 0),
      (this.MovementMode = 0),
      (this.IsInitTsVariables = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsTurnMode = this.TurnMode),
      (this.TsTargetEntityId = this.TargetEntityId),
      (this.TsTargetPos = Vector_1.Vector.Create(
        this.TargetPos.X,
        this.TargetPos.Y,
        this.TargetPos.Z,
      )),
      (this.TsTurnSpeed = this.TurnSpeed));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var e,
      s = t.AiController;
    s
      ? ((e = (s = s.CharAiDesignComp.Entity).GetComponent(0)),
        s?.Valid
          ? ((this.Character = s.GetComponent(3)),
            (s = s.GetComponent(38)?.CharacterMovement)?.IsValid()
              ? ((this.MovementMode = s.MovementMode),
                (s.MovementMode = 1),
                MathUtils_1.MathUtils.CommonTempVector.Reset(),
                this.GetTurnToPosition(MathUtils_1.MathUtils.CommonTempVector)
                  ? AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
                      this.Character,
                      MathUtils_1.MathUtils.CommonTempVector,
                      this.TsTurnSpeed,
                    )
                  : this.FinishExecute(!0))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelAi",
                    51,
                    "[TsTaskTurnToEntity]无效的CharacterMovement",
                    ["PbDataId", e.GetPbDataId()],
                  ),
                this.FinishExecute(!0)))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelAi", 30, "执行转向动作时实体不存在:", [
                "PbDataId",
                e.GetPbDataId(),
              ]),
            this.FinishExecute(!0)))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!0));
  }
  ReceiveTickAI(t, i, e) {
    GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(
      this.Character,
    ) < TOLERANCE &&
      ((this.Character.Entity.GetComponent(38).CharacterMovement.MovementMode =
        this.MovementMode),
      this.Finish(!0));
  }
  OnAbort() {
    this.Character?.ClearInput();
  }
  OnClear() {
    (this.Character = void 0), (this.MovementMode = 0);
  }
  GetTurnToPosition(t) {
    switch (this.TsTurnMode) {
      case 2:
        var i = ModelManager_1.ModelManager.CreatureModel?.GetEntityByPbDataId(
          this.TsTargetEntityId,
        );
        if (!i?.Valid) return !1;
        i = i.Entity.GetComponent(1);
        t.DeepCopy(i.ActorLocationProxy);
        break;
      case 4:
        i = Global_1.Global.BaseCharacter;
        if (!i?.IsValid()) return !1;
        t.DeepCopy(i.CharacterActorComponent.ActorLocationProxy);
        break;
      case 3:
        t.DeepCopy(this.TsTargetPos);
        break;
      default:
        return !1;
    }
    return !0;
  }
}
exports.default = TsTaskTurnToEntity;
//# sourceMappingURL=TsTaskTurnToEntity.js.map
