"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySwitchToggle = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivitySwitchToggle extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.H5e = void 0),
      (this.Nel = new Map()),
      (this.Fel = 0),
      (this.j5e = void 0),
      (this.W5e = void 0),
      (this.K5e = 0),
      (this.Bke = (t) => {
        this.j5e && this.j5e(this.K5e, t);
      }),
      (this.A5e = () =>
        !this.W5e || this.W5e(this.K5e, this.H5e.GetToggleState())),
      (this.BNe = (t) => {
        var e,
          i = this.Nel.get(t);
        void 0 !== i &&
          ((e = this.Vel(t)),
          this.Nel.set(t, e),
          i && !e ? this.Hel(!1) : !i && e && this.Hel(!0));
      }),
      (this.K5e = t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Bke]]);
  }
  OnStart() {
    (this.H5e = this.GetExtendToggle(0)),
      this.H5e.CanExecuteChange.Bind(this.A5e),
      this.GetItem(2).SetUIActive(!1);
  }
  OnBeforeShow() {
    this.KBl(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.BNe,
      );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.BNe,
    );
  }
  OnBeforeDestroy() {
    this.Nel.clear();
  }
  BindOnCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  BindOnToggleFunction(t) {
    this.j5e = t;
  }
  SetToggleState(t, e = !0) {
    this.H5e.SetToggleStateForce(t ? 1 : 0, e);
  }
  SetToggleTextId(t) {
    this.GetText(1).ShowTextNew(t);
  }
  Hel(t) {
    var e = this.Fel;
    t ? this.Fel++ : this.Fel--,
      ((e && !this.Fel) || (!e && this.Fel)) &&
        this.SetRedDotState(0 < this.Fel);
  }
  SetRedDotState(t) {
    this.GetItem(2).SetUIActive(t);
  }
  GetToggleRedDot() {
    return this.GetItem(2);
  }
  Vel(t) {
    return ModelManager_1.ModelManager.ActivityModel.GetActivityRedDotState(t);
  }
  BindRedDotIds(t) {
    (this.Nel = new Map()), (this.Fel = 0);
    for (const i of t) {
      var e = this.Vel(i);
      this.Nel.set(i, e), e && this.Fel++;
    }
    this.SetRedDotState(0 < this.Fel);
  }
  KBl() {
    for (const t of this.Nel.keys()) this.BNe(t);
  }
}
exports.ActivitySwitchToggle = ActivitySwitchToggle;
//# sourceMappingURL=ActivitySwitchToggle.js.map
