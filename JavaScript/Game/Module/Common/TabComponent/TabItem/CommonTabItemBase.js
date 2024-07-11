"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonTabItemBase = exports.CommonTabItemData = void 0);
const UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class CommonTabItemData {
  constructor() {
    (this.Index = 0),
      (this.Data = void 0),
      (this.RedDotName = void 0),
      (this.RedDotUid = void 0);
  }
}
exports.CommonTabItemData = CommonTabItemData;
class CommonTabItemBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.CurrentData = void 0),
      (this.Fbt = !1),
      (this.SelectedCallBack = void 0),
      (this.Vbt = void 0),
      (this.Lke = () => {
        var t;
        return (
          !this.Vbt ||
          ((t = this.Vbt(this.GridIndex, this.Fbt)), (this.Fbt = !1), t)
        );
      });
  }
  Refresh(t, e, s) {
    (this.CurrentData = t), this.OnRefresh(t, e, s);
  }
  OnRefresh(t, e, s) {}
  Clear() {
    this.OnClear();
  }
  OnClear() {}
  OnSelected(t) {}
  OnDeselected(t) {}
  GetKey(t, e) {
    return this.GridIndex;
  }
  InitTabItem() {}
  OnStart() {
    this.GetTabToggle().CanExecuteChange.Bind(this.Lke);
  }
  SetSelectedCallBack(t) {
    this.SelectedCallBack = t;
  }
  SetCanExecuteChange(t) {
    this.Vbt = t;
  }
  UpdateTabIcon(t) {
    this.OnUpdateTabIcon(t);
  }
  SetForceSwitch(t, e = !1) {
    (this.Fbt = !0), this.SetToggleState(t, e);
  }
  SetToggleState(t, e = !1) {
    this.OnSetToggleState(t, e);
  }
}
exports.CommonTabItemBase = CommonTabItemBase;
//# sourceMappingURL=CommonTabItemBase.js.map
