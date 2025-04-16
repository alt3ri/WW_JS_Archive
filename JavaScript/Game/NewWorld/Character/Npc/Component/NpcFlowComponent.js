"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var n,
      r = arguments.length,
      s =
        r < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, o, i);
    else
      for (var a = t.length - 1; 0 <= a; a--)
        (n = t[a]) && (s = (r < 3 ? n(s) : 3 < r ? n(e, o, s) : n(e, o)) || s);
    return 3 < r && s && Object.defineProperty(e, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFlowComponent = void 0);
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent"),
  NpcFlowLogic_1 = require("../Logics/NpcFlowLogic"),
  STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
let NpcFlowComponent = class NpcFlowComponent extends CharacterFlowComponent_1.CharacterFlowComponent {
  constructor() {
    super(...arguments), (this.Stn = void 0), (this.yj_ = -1), (this.KYs = -1);
  }
  OnStart() {
    return (this.Stn = this.Entity.GetComponent(119)), super.OnStart(), !0;
  }
  InitFlowLogic(t) {
    t &&
      ((this.FlowLogic = new NpcFlowLogic_1.NpcFlowLogic(this.ActorComp, t)),
      this.InitFlowLogicRange(
        this.FlowData?.EnterRange,
        this.FlowData?.LeaveRange,
      ),
      (this.IsEnter = !1),
      (this.IsInit = !0));
  }
  InitFlowLogicRange(t, e) {
    return (
      !!super.InitFlowLogicRange(t, e) &&
      (this.Stn?.SetLogicRange(
        e ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      ),
      !0)
    );
  }
  CheckCondition() {
    return (
      !!super.CheckCondition() &&
      !!this.Stn &&
      ((this.Stn.IsInLogicRange &&
        ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId !==
          this.Entity.Id) ||
        (this.ForceStopFlow(), !1))
    );
  }
  TryPlayMontage(t) {
    (this.KYs = -1), (this.yj_ = -1);
    var e = this.Entity.GetComponent(45);
    return (
      e &&
        t?.includes("/") &&
        (this.KYs = e.PlayPerformMontage(3, {
          MontagePath: t,
          OnStartCallback: (t) => {
            this.yj_ = t;
          },
          OnEndCallback: () => {
            this.yj_ = -1;
          },
        })),
      !1
    );
  }
  Vtn() {
    var t;
    this.ActorComp &&
      this.ActorComp.SkeletalMesh &&
      (t = this.Entity.GetComponent(45)) &&
      (t.EnableAction(this.KYs, !1),
      t.StopPerformMontage(3, {
        Method: 0,
        BlendOutTime: STOP_MONTAGE_BLEND_OUT_TIME,
        HandleId: this.yj_,
      }));
  }
  RemoveFlowActions() {
    var t = this.FlowLogic;
    t?.HideDialogueText(), t?.ClearAudio(), this.Vtn();
  }
  GetTimberId() {
    return this.FlowData?.TimberId;
  }
};
(NpcFlowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(183)],
  NpcFlowComponent,
)),
  (exports.NpcFlowComponent = NpcFlowComponent);
//# sourceMappingURL=NpcFlowComponent.js.map
