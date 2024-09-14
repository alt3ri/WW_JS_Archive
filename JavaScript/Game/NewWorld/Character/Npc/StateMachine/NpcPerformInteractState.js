"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.NpcPerformInteractState = void 0);
const StateBase_1 = require("../../../../../Core/Utils/StateMachine/StateBase"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem");
class NpcPerformInteractState extends StateBase_1.StateBase {
  constructor() {
    super(...arguments),
      (this.Atr = ""),
      (this.Qer = void 0),
      (this.otr = void 0),
      (this.Ptr = !1),
      (this.xtr = () => {
        this.StateMachine.Switch(1);
      });
  }
  get NpcMontageController() {
    return this.otr;
  }
  set NpcMontageController(t) {
    this.otr = t;
  }
  CanChangeFrom(t) {
    var e = this.Owner.Entity.GetComponent(172);
    return this.Ptr && 1 === t && !e.IsInPlot;
  }
  OnCreate(t) {
    t?.ShowOnInteract?.Montage
      ? ((this.Ptr = !0), (this.Atr = t.ShowOnInteract.Montage))
      : (this.Ptr = !1);
  }
  OnEnter(t) {
    this.otr.LoadAsync(this.Atr, (t) => {
      t?.IsValid() && this?.Owner?.Valid && (this.otr?.Play(t), (this.Qer = t));
    }),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Owner,
        EventDefine_1.EEventName.OnInteractPlotEnd,
        this.xtr,
      );
  }
  OnUpdate(t) {}
  OnExit(t) {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Owner,
      EventDefine_1.EEventName.OnInteractPlotEnd,
      this.xtr,
    ),
      this.Owner.Entity.GetComponent(3).ClearInput(),
      this.otr?.ForceStop(0.5, this.Qer),
      (this.Qer = void 0);
  }
  OnDestroy() {
    this.otr = void 0;
  }
}
exports.NpcPerformInteractState = NpcPerformInteractState;
//# sourceMappingURL=NpcPerformInteractState.js.map
