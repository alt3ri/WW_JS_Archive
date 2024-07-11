"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DropDownItemBase = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DropDownItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Xy = 0),
      (this.U4e = void 0),
      (this.fTt = void 0),
      (this.LTt = () => {
        this.U4e?.(this.Xy);
      }),
      (this.DTt = () => this.fTt?.(this.Xy) ?? !1),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnStartImplement() {
    const t = this.GetDropDownToggle();
    t.OnStateChange.Add(this.LTt), t.CanExecuteChange.Bind(this.DTt);
  }
  OnBeforeDestroyImplement() {
    const t = this.GetDropDownToggle();
    t.OnStateChange.Clear(), t.CanExecuteChange.Unbind();
  }
  ShowDropDownItemBase(t, e) {
    (this.Xy = e), this.OnShowDropDownItemBase(t);
  }
  SetToggleFunction(t) {
    this.U4e = t;
  }
  SetCanExecuteFunction(t) {
    this.fTt = t;
  }
  SetToggle(t) {
    const e = t ? 1 : 0;
    this.GetDropDownToggle().SetToggleState(e, t);
  }
  SetToggleForce(t) {
    const e = t ? 1 : 0;
    this.GetDropDownToggle().SetToggleStateForce(e, t);
  }
}
exports.DropDownItemBase = DropDownItemBase;
// # sourceMappingURL=DropDownItemBase.js.map
