"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiStateMachineTaskPatrol = void 0);
const GlobalData_1 = require("../../../GlobalData"),
  TsAiController_1 = require("../../Controller/TsAiController"),
  AiStateMachineTask_1 = require("./AiStateMachineTask");
class AiStateMachineTaskPatrol extends AiStateMachineTask_1.AiStateMachineTask {
  constructor() {
    super(...arguments),
      (this.JLn = void 0),
      (this.$ie = void 0),
      (this.Jh = void 0),
      (this.Gce = void 0),
      (this.mBe = void 0),
      (this.zLn = void 0),
      (this.Hte = void 0),
      (this.Bte = void 0),
      (this.MoveState = 0),
      (this.OpenDebugMode = !1);
  }
  OnInit(t) {
    return (
      (this.MoveState = t.TaskPatrol.MoveState),
      (this.OpenDebugMode = t.TaskPatrol.OpenDebugMode),
      !0
    );
  }
  OnEnter(t) {
    var i = this.Node.AiComponent.TsAiController;
    i instanceof TsAiController_1.default &&
    ((this.Bte = i.AiController),
    (this.JLn = this.Bte.AiPatrol),
    (this.$ie = this.JLn.GetConfig()),
    this.$ie)
      ? ((this.Jh = this.Bte.CharAiDesignComp.Entity),
        (this.Gce = this.Jh.GetComponent(38)),
        (this.mBe = this.Jh.GetComponent(92)),
        (this.zLn = this.Jh.GetComponent(41)),
        (this.Hte = this.Bte.CharActorComp),
        this.ZLn())
      : this.$ne();
  }
  OnExit(t) {
    this.Node.TaskFinish ||
      (this.zLn.PausePatrol(
        this.$ie.SplineEntityId,
        "AiStateMachineTaskPatrol",
      ),
      this.eDn()),
      this.Gce && (this.Gce.StopMove(!0), (this.Gce.IsSpecialMove = !1));
  }
  $ne() {
    this.Node.TaskFinish = !0;
  }
  tDn() {
    this.JLn.GeneratePatrol(!0),
      this.JLn.StartPatrol(!0, () => {
        this.iDn();
      }),
      this.JLn.ResetBaseInfoByMainPoint(this.Gce, this.mBe, this.MoveState);
  }
  iDn() {
    var t;
    GlobalData_1.GlobalData.BpEventManager &&
      (t = this.JLn?.PatrolPoint) &&
      t.IsMain &&
      GlobalData_1.GlobalData.BpEventManager.AI巡逻达到样条点.Broadcast(
        this.Hte.Actor,
        this.JLn.PatrolIndex,
      );
  }
  oDn() {
    const i = this.JLn?.PatrolPoint;
    var t;
    i &&
      (this.zLn.HasPatrolRecord()
        ? this.zLn.ResumePatrol(
            this.$ie.SplineEntityId,
            "AiStateMachineTaskPatrol",
          )
        : ((t = {
            DebugMode: this.OpenDebugMode,
            UseNearestPoint: !0,
            ReturnFalseWhenNavigationFailed: !1,
            OnArrivePointHandle: () => {
              var t = this.zLn.GetLastPointRawIndex();
              -1 !== t && this.JLn.SetPatrolIndex(t), i.IsMain && this.iDn();
            },
            OnPatrolEndHandle: (t) => {
              1 === t && this.eDn(), this.$ne();
            },
          }),
          this.zLn.StartPatrol(this.$ie.SplineEntityId, t)));
  }
  eDn() {
    this.iDn(), this.JLn?.PatrolFinish();
  }
  ZLn() {
    this.$ie.ContainZ &&
      this.Gce &&
      this.Gce.CharacterMovement.SetMovementMode(5),
      this.tDn(),
      this.JLn?.PatrolPoint
        ? (this.oDn(),
          void 0 !== this.Bte.AiPatrol.StartWithInversePath &&
            (this.Bte.AiPatrol.StartWithInversePath = void 0))
        : this.$ne();
  }
}
exports.AiStateMachineTaskPatrol = AiStateMachineTaskPatrol;
//# sourceMappingURL=AiStateMachineTaskPatrol.js.map
