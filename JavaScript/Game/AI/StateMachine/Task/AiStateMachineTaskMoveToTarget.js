"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskMoveToTarget = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
const CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes");
const AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary");
const TsAiController_1 = require("../../Controller/TsAiController");
const AiStateMachineTask_1 = require("./AiStateMachineTask");
const NAVIGATION_COMPLETE_DISTANCE = 10;
class AiStateMachineTaskMoveToTarget extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.MoveState = 0),
      (this.NavigationOn = !1),
      (this.EndDistance = 0),
      (this.TurnSpeed = 0),
      (this.FixPeriod = 0),
      (this.WalkOff = !1),
      (this.sse = Vector_1.Vector.Create()),
      (this.ase = !1),
      (this.hse = void 0),
      (this.lse = 0),
      (this.Xne = !1),
      (this._se = 0);
  }
  OnInit(t) {
    return (
      (this.MoveState = t.TaskMoveToTarget.MoveState),
      (this.NavigationOn = t.TaskMoveToTarget.NavigationOn),
      (this.EndDistance = t.TaskMoveToTarget.EndDistance),
      (this.TurnSpeed = t.TaskMoveToTarget.TurnSpeed),
      (this.FixPeriod = t.TaskMoveToTarget.FixPeriod),
      (this.WalkOff = t.TaskMoveToTarget.WalkOff),
      !0
    );
  }
  OnEnter(t) {
    const i = this.Node.AiComponent.TsAiController;
    const e = i.AiController;
    if (e) {
      const r = e.CharActorComp;
      if (
        (this.WalkOff || r.Entity.GetComponent(36)?.SetWalkOffLedgeRecord(!1),
        (this._se = this.Node.Owner.GetBlackboard(2) ?? 0),
        this._se)
      ) {
        const s =
          ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
            this._se,
          );
        if (s) {
          (this.sse.X = s.Transform.Pos.X),
            (this.sse.Y = s.Transform.Pos.Y),
            (this.sse.Z = s.Transform.Pos.Z);
          const h = e.CharAiDesignComp?.Entity.GetComponent(158);
          if (h?.Valid)
            switch (this.MoveState) {
              case 1:
                h.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Walk,
                );
                break;
              case 2:
                h.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
                break;
              case 3:
                h.SetMoveState(
                  CharacterUnifiedStateTypes_1.ECharMoveState.Sprint,
                );
            }
          this.use(i, r.ActorLocation);
        } else
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
              "Type",
              i.GetClass().GetName(),
            ]);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("BehaviorTree", 6, "错误的Controller类型", [
          "Type",
          i.GetClass().GetName(),
        ]),
        this.$ne();
  }
  OnTick() {
    let t;
    let i;
    let e;
    let r = this.Node.AiComponent.TsAiController;
    !(
      r instanceof TsAiController_1.default &&
      ((e = (r = r.AiController.CharActorComp).ActorLocationProxy), this.ase) &&
      ((t = this.NavigationOn
        ? Vector_1.Vector.Create(this.hse[this.lse])
        : this.sse),
      (i = Vector_1.Vector.Create(t)).Subtraction(e, i),
      (i.Z = 0),
      (e = i.Size()),
      (this.NavigationOn && this.lse !== this.hse.length - 1) ||
        !(e < this.EndDistance))
    )
      ? this.$ne()
      : (e < NAVIGATION_COMPLETE_DISTANCE && this.lse++,
        AiContollerLibrary_1.AiControllerLibrary.TurnToTarget(
          r,
          t,
          this.TurnSpeed,
        ),
        (i.Z = 0),
        (i.X /= e),
        (i.Y /= e),
        r.SetInputDirect(i));
  }
  use(t, i) {
    this.NavigationOn
      ? (this.hse || (this.hse = new Array()),
        (this.ase = AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
          t,
          i,
          this.sse.ToUeVector(),
          this.hse,
        )),
        (this.lse = 1))
      : (this.ase = !0);
  }
  $ne() {
    this.Xne && ((this.Node.TaskFinish = !0), (this.Xne = !1));
  }
  OnExit() {
    const t = this.Node.AiComponent.TsAiController;
    t &&
      (AiContollerLibrary_1.AiControllerLibrary.ClearInput(t),
      this.WalkOff ||
        t.AiController.CharActorComp.Entity.GetComponent(
          36,
        )?.SetWalkOffLedgeRecord(!0));
  }
}
exports.AiStateMachineTaskMoveToTarget = AiStateMachineTaskMoveToTarget;
// # sourceMappingURL=AiStateMachineTaskMoveToTarget.js.map
