"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySwitchToggle = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class ActivitySwitchToggle extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.R4e = void 0),
      (this.U4e = void 0),
      (this.A4e = void 0),
      (this.P4e = 0),
      (this.x4e = (t) => {
        this.U4e && this.U4e(this.P4e, t);
      }),
      (this.d4e = () =>
        !this.A4e || this.A4e(this.P4e, this.R4e.GetToggleState())),
      (this.P4e = t);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.x4e]]);
  }
  OnStart() {
    (this.R4e = this.GetExtendToggle(0)),
      this.R4e.CanExecuteChange.Bind(this.d4e);
  }
  BindOnCanToggleExecuteChange(t) {
    this.A4e = t;
  }
  BindOnToggleFunction(t) {
    this.U4e = t;
  }
  SetToggleState(t, i = !0) {
    this.R4e.SetToggleStateForce(t ? 1 : 0, i);
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
