"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../../../GlobalData"),
  GravityUtils_1 = require("../../../../../Utils/GravityUtils"),
  AiContollerLibrary_1 = require("../../../../Controller/AiContollerLibrary"),
  TsTaskAbortImmediatelyBase_1 = require("../../TsTaskAbortImmediatelyBase"),
  TOLERANCE = 3;
class TsTaskTurnToPosition extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.TargetPos = new UE.Vector()),
      (this.TurnSpeed = 180),
      (this.TsTargetPos = void 0),
      (this.TsTurnSpeed = 180),
      (this.Character = void 0),
      (this.MovementMode = 0),
      (this.IsInitTsVariables = !1);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsTargetPos = Vector_1.Vector.Create(
        this.TargetPos.X,
        this.TargetPos.Y,
        this.TargetPos.Z,
      )),
      (this.TsTurnSpeed = this.TurnSpeed));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var s,
      e = t.AiController;
    e
      ? ((s = (e = e.CharAiDesignComp.Entity).GetComponent(0)),
        e?.Valid
          ? ((this.Character = e.GetComponent(3)),
            (e = e.GetComponent(37)?.CharacterMovement)?.IsValid()
              ? ((this.MovementMode = e.MovementMode),
                (e.MovementMode = 1),
                AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
                  this.Character,
                  this.TsTargetPos,
                  this.TsTurnSpeed,
                ))
              : (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelAi",
                    51,
                    "[TsTaskTurnToPosition]无效的CharacterMovement",
                    ["PbDataId", s.GetPbDataId()],
                  ),
                this.FinishExecute(!0)))
          : (Log_1.Log.CheckError() &&
              Log_1.Log.Error("LevelAi", 30, "执行转向动作时实体不存在:", [
                "PbDataId",
                s.GetPbDataId(),
              ]),
            this.FinishExecute(!0)))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!0));
  }
  ReceiveTickAI(t, i, s) {
    GravityUtils_1.GravityUtils.GetAngleOffsetFromCurrentToInputAbs(
      this.Character,
    ) < TOLERANCE &&
      ((this.Character.Entity.GetComponent(37).CharacterMovement.MovementMode =
        this.MovementMode),
      this.Finish(!0));
  }
  OnAbort() {
    this.Character?.ClearInput();
  }
  OnClear() {
    (this.Character = void 0), (this.MovementMode = 0);
  }
}
exports.default = TsTaskTurnToPosition;
//# sourceMappingURL=TsTaskTurnToPosition.js.map
