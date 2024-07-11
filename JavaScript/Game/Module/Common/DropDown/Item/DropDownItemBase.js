"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DropDownItemBase = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DropDownItemBase extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Xy = 0),
      (this.j5e = void 0),
      (this.SLt = void 0),
      (this.PLt = () => {
        this.j5e?.(this.Xy);
      }),
      (this.gke = () => this.SLt?.(this.Xy) ?? !1),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnStartImplement() {
    var t = this.GetDropDownToggle();
    t.OnStateChange.Add(this.PLt), t.CanExecuteChange.Bind(this.gke);
  }
  OnBeforeDestroyImplement() {
    var t = this.GetDropDownToggle();
    t.OnStateChange.Clear(), t.CanExecuteChange.Unbind();
  }
  ShowDropDownItemBase(t, e) {
    (this.Xy = e), this.OnShowDropDownItemBase(t);
  }
  SetToggleFunction(t) {
    this.j5e = t;
  }
  SetCanExecuteFunction(t) {
    this.SLt = t;
  }
  SetToggle(t) {
    var e = t ? 1 : 0;
    this.GetDropDownToggle().SetToggleState(e, t);
  }
  SetToggleForce(t) {
    var e = t ? 1 : 0;
    this.GetDropDownToggle().SetToggleStateForce(e, t);
  }
}
exports.DropDownItemBase = DropDownItemBase;
//# sourceMappingURL=DropDownItemBase.js.map
