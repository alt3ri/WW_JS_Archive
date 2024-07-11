"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySwitchToggle = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivitySwitchToggle extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.H5e = void 0),
      (this.j5e = void 0),
      (this.W5e = void 0),
      (this.K5e = 0),
      (this.Bke = (t) => {
        this.j5e && this.j5e(this.K5e, t);
      }),
      (this.A5e = () =>
        !this.W5e || this.W5e(this.K5e, this.H5e.GetToggleState())),
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
      this.H5e.CanExecuteChange.Bind(this.A5e);
  }
  BindOnCanToggleExecuteChange(t) {
    this.W5e = t;
  }
  BindOnToggleFunction(t) {
    this.j5e = t;
  }
  SetToggleState(t, i = !0) {
    this.H5e.SetToggleStateForce(t ? 1 : 0, i);
  }
  SetToggleTextId(t) {
    this.GetText(1).ShowTextNew(t);
  }
  GetToggleRedDot() {
    return this.GetItem(2);
  }
}
exports.ActivitySwitchToggle = ActivitySwitchToggle;
//# sourceMappingURL=ActivitySwitchToggle.js.map
