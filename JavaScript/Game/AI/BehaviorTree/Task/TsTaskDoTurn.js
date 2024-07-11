"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 });
const Log_1 = require("../../../../Core/Common/Log");
const Time_1 = require("../../../../Core/Common/Time");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const Global_1 = require("../../../Global");
const GlobalData_1 = require("../../../GlobalData");
const ModelManager_1 = require("../../../Manager/ModelManager");
const BlackboardController_1 = require("../../../World/Controller/BlackboardController");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsTaskAbortImmediatelyBase_1 = require("./TsTaskAbortImmediatelyBase");
class TsTaskDoTurn extends TsTaskAbortImmediatelyBase_1.default {
  constructor() {
    super(...arguments),
      (this.TurnToPlayer = !1),
      (this.TargetConfigId = 0),
      (this.TargetEntityKey = ""),
      (this.TargetDirectKey = ""),
      (this.TurnAngleAxis = 0),
      (this.TurnSpeed = 0),
      (this.MinAngle = 0),
      (this.LoopTime = 0),
      (this.IsInitTsVariables = !1),
      (this.TsTurnToPlayer = !1),
      (this.TsTargetConfigId = 0),
      (this.TsTargetEntityKey = ""),
      (this.TsTargetDirectKey = ""),
      (this.TsTurnAngleAxis = 0),
      (this.TsTurnSpeed = 0),
      (this.TsMinAngle = 0),
      (this.TsLoopTime = 0),
      (this.EndForward = void 0),
      (this.EndTime = -0);
  }
  InitTsVariables() {
    (this.IsInitTsVariables && !GlobalData_1.GlobalData.IsPlayInEditor) ||
      ((this.IsInitTsVariables = !0),
      (this.TsTurnToPlayer = this.TurnToPlayer),
      (this.TsTargetConfigId = this.TargetConfigId),
      (this.TsTargetEntityKey = this.TargetEntityKey),
      (this.TsTargetDirectKey = this.TargetDirectKey),
      (this.TsTurnAngleAxis = this.TurnAngleAxis),
      (this.TsTurnSpeed = this.TurnSpeed),
      (this.TsMinAngle = this.MinAngle),
      (this.TsLoopTime = this.LoopTime));
  }
  ReceiveExecuteAI(t, i) {
    this.InitTsVariables();
    var t = t.AiController;
    t &&
      ((t = t.CharActorComp),
      this.InitTurnForward(t),
      (this.EndTime = this.TsLoopTime + Time_1.Time.WorldTime));
  }
  InitTurnForward(s) {
    if (
      (this.EndForward || (this.EndForward = Vector_1.Vector.Create()),
      this.TsTurnToPlayer)
    ) {
      var t = Global_1.Global.BaseCharacter;
      t &&
        t.CharacterActorComponent.ActorLocationProxy.Subtraction(
          s.ActorLocationProxy,
          this.EndForward,
        );
    } else if (this.TsTargetConfigId > 0) {
      const e = ModelManager_1.ModelManager.CreatureModel.GetAllScenePlayers();
      for (let t = 0, i = e.length; t < i; t++) {
        const r = e[t];
        for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(
          r.GetPlayerId(),
        )) {
          let h = o.EntityHandle;
          h &&
            (h = h.Entity.GetComponent(0)) &&
            h.GetVisible() &&
            h.GetPbDataId() === this.TsTargetConfigId &&
            r.GetLocation().Subtraction(s.ActorLocationProxy, this.EndForward);
        }
      }
    } else
      this.TsTargetEntityKey !== ""
        ? ((t = BlackboardController_1.BlackboardController.GetEntityIdByEntity(
            s.Entity.Id,
            this.TsTargetEntityKey,
          )),
          EntitySystem_1.EntitySystem.Get(t)
            .GetComponent(3)
            .ActorLocationProxy.Subtraction(
              s.ActorLocationProxy,
              this.EndForward,
            ))
        : this.TsTargetDirectKey !== ""
          ? (t =
              BlackboardController_1.BlackboardController.GetVectorValueByEntity(
                s.Entity.Id,
                this.TsTargetDirectKey,
              )) && this.EndForward.FromUeVector(t)
          : ((t = Vector_1.Vector.Create(s.ActorForward)).Normalize(
              MathUtils_1.MathUtils.SmallNumber,
            ),
            t.RotateAngleAxis(
              this.TsTurnAngleAxis,
              Vector_1.Vector.UpVectorProxy,
              this.EndForward,
            ));
    (this.EndForward.Z = 0),
      this.EndForward.Normalize(MathUtils_1.MathUtils.SmallNumber);
  }
  ReceiveTickAI(t, i, s) {
    let e;
    const r = t.AiController;
    r
      ? ((e = r.CharActorComp.ActorForward),
        (MathUtils_1.MathUtils.GetAngleByVectorDot(e, this.EndForward) <=
          this.TsMinAngle ||
          (AiContollerLibrary_1.AiControllerLibrary.TurnToDirect(
            r.CharActorComp,
            this.EndForward,
            this.TsTurnSpeed,
          ),
          this.EndTime < Time_1.Time.WorldTime)) &&
          this.Finish(!0))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
            "Type",
            t.GetClass().GetName(),
          ]),
        this.FinishExecute(!1));
  }
  OnClear() {
    this.EndForward.Reset(), (this.EndTime = 0);
  }
}
exports.default = TsTaskDoTurn;
// # sourceMappingURL=TsTaskDoTurn.js.map
