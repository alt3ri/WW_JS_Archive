"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformInteractState = void 0);
const UE = require("ue"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  NpcPerformBaseState_1 = require("./NpcPerformBaseState");
class NpcPerformInteractState extends NpcPerformBaseState_1.NpcPerformBaseState {
  constructor() {
    super(...arguments),
      (this.Atr = ""),
      (this.Qer = void 0),
      (this.Ptr = !1),
      (this.xtr = () => {
        this.StateMachine.Switch(1);
      });
  }
  CanChangeFrom(e) {
    var t = this.Owner.Entity.GetComponent(185);
    return this.Ptr && 1 === e && !t.IsInPlot;
  }
  OnCreate(e) {
    super.OnCreate(e),
      e?.ShowOnInteract?.Montage
        ? ((this.Ptr = !0), (this.Atr = e.ShowOnInteract.Montage))
        : (this.Ptr = !1);
  }
  OnEnter(e) {
    ResourceSystem_1.ResourceSystem.LoadAsync(this.Atr, UE.AnimMontage, (e) => {
      e?.IsValid() &&
        this?.Owner?.Valid &&
        (this.PlayMontage({ MontageAsset: e }), (this.Qer = e));
    }),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnInteractPlotEnd,
        this.xtr,
      );
  }
  OnUpdate(e) {}
  OnExit(e) {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnInteractPlotEnd,
      this.xtr,
    ),
      this.Owner.Entity.GetComponent(3).ClearInput(),
      this.StopMontage({ Method: 0, BlendOutTime: 0.5, Montage: this.Qer }),
      (this.Qer = void 0);
  }
  OnDestroy() {}
}
exports.NpcPerformInteractState = NpcPerformInteractState;
//# sourceMappingURL=NpcPerformInteractState.js.map
