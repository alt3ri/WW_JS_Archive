"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var i,
      s = arguments.length,
      n =
        s < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, o, r);
    else
      for (var c = e.length - 1; 0 <= c; c--)
        (i = e[c]) && (n = (s < 3 ? i(n) : 3 < s ? i(t, o, n) : i(t, o)) || n);
    return 3 < s && n && Object.defineProperty(t, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFlowComponent = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent"),
  NpcFlowLogic_1 = require("../Logics/NpcFlowLogic"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
let NpcFlowComponent = class NpcFlowComponent extends CharacterFlowComponent_1.CharacterFlowComponent {
  constructor() {
    super(...arguments), (this.Stn = void 0), (this.Ftn = !1);
  }
  OnStart() {
    return (this.Stn = this.Entity.GetComponent(108)), super.OnStart(), !0;
  }
  InitFlowLogic(e) {
    e &&
      ((this.FlowLogic = new NpcFlowLogic_1.NpcFlowLogic(this.ActorComp, e)),
      this.InitFlowLogicRange(
        this.FlowData?.EnterRange,
        this.FlowData?.LeaveRange,
      ),
      (this.IsEnter = !1),
      (this.IsInit = !0));
  }
  InitFlowLogicRange(e, t) {
    return (
      !!super.InitFlowLogicRange(e, t) &&
      (this.Stn?.SetLogicRange(
        t ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
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
  TryPlayMontage(e) {
    const t = this.Entity.GetComponent(36);
    return (
      t &&
        e?.includes("/") &&
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, (e) => {
          ObjectUtils_1.ObjectUtils.IsValid(e) &&
            t?.MainAnimInstance &&
            ((this.Ftn = !0),
            t.PlayOnce(e, () => {
              this.Ftn = !1;
            }));
        }),
      !1
    );
  }
  Vtn() {
    var e;
    this.ActorComp &&
      this.ActorComp.SkeletalMesh &&
      (e = this.Entity.GetComponent(36)) &&
      (this.Ftn &&
        e.IsMontagePlaying() &&
        e.StopMontage(STOP_MONTAGE_BLEND_OUT_TIME),
      (this.Ftn = !1));
  }
  RemoveFlowActions() {
    this.Entity.GetComponent(72).HideDialogueText(),
      this.FlowLogic?.ClearAudio(),
      this.Vtn();
  }
  GetTimberId() {
    return this.FlowData?.TimberId;
  }
};
(NpcFlowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(169)],
  NpcFlowComponent,
)),
  (exports.NpcFlowComponent = NpcFlowComponent);
//# sourceMappingURL=NpcFlowComponent.js.map
