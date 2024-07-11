"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    let i;
    const s = arguments.length;
    let n =
      s < 3 ? t : r === null ? (r = Object.getOwnPropertyDescriptor(t, o)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(e, t, o, r);
    else
      for (let c = e.length - 1; c >= 0; c--)
        (i = e[c]) && (n = (s < 3 ? i(n) : s > 3 ? i(t, o, n) : i(t, o)) || n);
    return s > 3 && n && Object.defineProperty(t, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcFlowComponent = void 0);
const UE = require("ue");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const CharacterFlowComponent_1 = require("../../Common/Component/Flow/CharacterFlowComponent");
const NpcFlowLogic_1 = require("../Logics/NpcFlowLogic");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const STOP_MONTAGE_BLEND_OUT_TIME = 0.3;
let NpcFlowComponent = class NpcFlowComponent extends CharacterFlowComponent_1.CharacterFlowComponent {
  constructor() {
    super(...arguments), (this.Htn = void 0), (this.hin = !1);
  }
  OnStart() {
    return (this.Htn = this.Entity.GetComponent(106)), super.OnStart(), !0;
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
      (this.Htn?.SetLogicRange(
        t ?? CharacterFlowComponent_1.DEFAULT_BUBBLE_LEAVE_RANGE,
      ),
      !0)
    );
  }
  CheckCondition() {
    return (
      !!super.CheckCondition() &&
      !!this.Htn &&
      ((this.Htn.IsInLogicRange &&
        ModelManager_1.ModelManager.InteractionModel.CurrentInteractEntityId !==
          this.Entity.Id) ||
        (this.ForceStopFlow(), !1))
    );
  }
  TryPlayMontage(e) {
    const t = this.Entity.GetComponent(35);
    return (
      t &&
        e?.includes("/") &&
        ResourceSystem_1.ResourceSystem.LoadAsync(e, UE.AnimMontage, (e) => {
          ObjectUtils_1.ObjectUtils.IsValid(e) &&
            t?.MainAnimInstance &&
            ((this.hin = !0),
            t.PlayOnce(e, () => {
              this.hin = !1;
            }));
        }),
      !1
    );
  }
  lin() {
    let e;
    this.ActorComp &&
      this.ActorComp.SkeletalMesh &&
      (e = this.Entity.GetComponent(35)) &&
      (this.hin &&
        e.IsMontagePlaying() &&
        e.StopMontage(STOP_MONTAGE_BLEND_OUT_TIME),
      (this.hin = !1));
  }
  RemoveFlowActions() {
    this.Entity.GetComponent(70).HideDialogueText(),
      this.FlowLogic?.ClearAudio(),
      this.lin();
  }
  GetTimberId() {
    return this.FlowData?.TimberId;
  }
};
(NpcFlowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(167)],
  NpcFlowComponent,
)),
  (exports.NpcFlowComponent = NpcFlowComponent);
// # sourceMappingURL=NpcFlowComponent.js.map
