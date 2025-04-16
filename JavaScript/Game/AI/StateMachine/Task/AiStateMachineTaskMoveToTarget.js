"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskMoveToTarget = void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  CharacterUnifiedStateTypes_1 = require("../../../NewWorld/Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  AiContollerLibrary_1 = require("../../Controller/AiContollerLibrary"),
  AiStateMachineTask_1 = require("./AiStateMachineTask"),
  TRIGGER_PERIOD = 500;
class AiStateMachineTaskMoveToTarget extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.TargetType = 0),
      (this.MoveState = 0),
      (this.EndDistance = 0),
      (this.TurnSpeed = 0),
      (this.WalkOff = !1),
      (this.Due = Vector_1.Vector.Create()),
      (this.Xne = !1),
      (this._se = 0),
      (this.pRa = 0);
  }
  OnInit(t) {
    return (
      (this.TargetType = t.TaskMoveToTarget.TargetType),
      (this.MoveState = t.TaskMoveToTarget.MoveState),
      (this.EndDistance = t.TaskMoveToTarget.EndDistance),
      (this.TurnSpeed = t.TaskMoveToTarget.TurnSpeed),
      (this.WalkOff = t.TaskMoveToTarget.WalkOff),
      !0
    );
  }
  OnEnter(t) {
    switch (
      ((this.Xne = !0),
      this.WalkOff || this.Node.MoveComponent?.SetWalkOffLedgeRecord(!1),
      this.TargetType)
    ) {
      case 0:
        this.vRa();
        break;
      case 1:
        this.MRa();
    }
    this.SRa();
  }
  OnTick() {
    this.Xne &&
      1 === this.TargetType &&
      this.Node.ElapseTime >= this.pRa + TRIGGER_PERIOD &&
      (this.MRa(), this.SRa());
  }
  vRa() {
    var t;
    (this._se = this.Node.Owner.GetBlackboard(2) ?? 0),
      this._se &&
        (t = ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
          this._se,
        )) &&
        ((this.Due.X = t.Transform.Pos.X),
        (this.Due.Y = t.Transform.Pos.Y),
        (this.Due.Z = t.Transform.Pos.Z));
  }
  MRa() {
    var t = this.Node.AiController.AiHateList.GetCurrentTarget(),
      t = (t?.Valid || this.$ne(!1), t.Entity.GetComponent(1));
    (this.Due.X = t.ActorLocation.X),
      (this.Due.Y = t.ActorLocation.Y),
      (this.Due.Z = t.ActorLocation.Z);
  }
  SRa() {
    if (
      this.Node.MoveComponent.MoveController.NavigateMoveToLocation(
        {
          Position: this.Due,
          TurnSpeed: this.TurnSpeed,
          Distance: this.EndDistance,
          ResetCondition: () => !1,
          CallbackList: [
            (t) => {
              this.$ne(1 === t);
            },
          ],
        },
        !1,
        !1,
      )
    ) {
      var t = this.Node.Entity.GetComponent(173);
      if (t.Valid)
        switch (this.MoveState) {
          case 1:
            t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Walk);
            break;
          case 2:
            t.SetMoveState(CharacterUnifiedStateTypes_1.ECharMoveState.Run);
        }
      this.pRa = this.Node.ElapseTime;
    } else this.$ne(!1);
  }
  $ne(t = 0) {
    this.Xne && ((this.Node.TaskFinish = !0), (this.Xne = !1));
  }
  OnExit() {
    var t = this.Node.AiComponent.TsAiController;
    t &&
      (AiContollerLibrary_1.AiControllerLibrary.ClearInput(t),
      this.WalkOff || this.Node.MoveComponent?.SetWalkOffLedgeRecord(!0));
  }
}
exports.AiStateMachineTaskMoveToTarget = AiStateMachineTaskMoveToTarget;
//# sourceMappingURL=AiStateMachineTaskMoveToTarget.js.map
