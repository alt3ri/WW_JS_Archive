"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StaticTabComponent = void 0);
const CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class StaticTabComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i) {
    super(),
      (this.ProxyCreate = t),
      (this.ToggleCallBack = i),
      (this.eGe = void 0),
      (this.NOe = CommonDefine_1.INVALID_VALUE),
      (this.MUt = void 0),
      (this.C5e = (t, i) => {
        t = this.ProxyCreate(t, i);
        return (
          (t.GridIndex = i),
          t.InitTabItem(),
          t.SetSelectedCallBack(this.gDt),
          t.SetCanExecuteChange(this.Lke),
          { Key: i, Value: t }
        );
      }),
      (this.gDt = (t) => {
        this.bbt(), (this.NOe = t), this.ToggleCallBack(t);
      }),
      (this.Lke = (t, i) =>
        !(this.NOe === t && !i) && (!this.MUt || this.MUt(t)));
  }
  Init(t) {
    this.RegistTabItem(t);
  }
  RegistTabItem(i) {
    this.eGe = new Array();
    var e = i.length;
    for (let t = 0; t < e; t++) {
      var s = i[t],
        s = this.C5e(s, t);
      this.eGe.push(s);
    }
    this.NOe = 0;
  }
  OnStart() {
    var i = this.GetItem(0).GetAttachUIChildren(),
      e = ((this.eGe = new Array()), i.Num());
    for (let t = 0; t < e; t++) {
      var s = i.Get(t),
        s = this.C5e(s, t);
      this.eGe.push(s);
    }
    this.NOe = 0;
  }
  OnBeforeDestroy() {
    this.eGe &&
      (this.eGe.forEach((t) => {
        t.Value.Destroy();
      }),
      (this.eGe = []));
  }
  bbt() {
    var t;
    this.NOe !== CommonDefine_1.INVALID_VALUE &&
      (t = this.eGe[this.NOe]) &&
      t.Value.SetForceSwitch(0);
  }
  SelectToggleByIndex(t, i = !1) {
    if (i) {
      const e = this.eGe[this.NOe];
      e && e.Value.SetForceSwitch(0), (this.NOe = CommonDefine_1.INVALID_VALUE);
    }
    if (t !== this.NOe) {
      const e = this.eGe[t];
      e && e.Value.SetForceSwitch(1, !0);
    }
  }
  GetSelectedIndex() {
    return this.NOe;
  }
  SetCanChange(t) {
    this.MUt = t;
  }
}
exports.StaticTabComponent = StaticTabComponent;
//# sourceMappingURL=StaticTabComponent.js.map
