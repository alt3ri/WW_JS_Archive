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
      (this.NBt = !1),
      (this.SelectedCallBack = void 0),
      (this.OBt = void 0),
      (this.T7e = () => {
        var t;
        return (
          !this.OBt ||
          ((t = this.OBt(this.GridIndex, this.NBt)), (this.NBt = !1), t)
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
    this.GetTabToggle().CanExecuteChange.Bind(this.T7e);
  }
  SetSelectedCallBack(t) {
    this.SelectedCallBack = t;
  }
  SetCanExecuteChange(t) {
    this.OBt = t;
  }
  UpdateTabIcon(t) {
    this.OnUpdateTabIcon(t);
  }
  SetForceSwitch(t, e = !1) {
    (this.NBt = !0), this.SetToggleState(t, e);
  }
  SetToggleState(t, e = !1) {
    this.OnSetToggleState(t, e);
  }
}
exports.CommonTabItemBase = CommonTabItemBase;
//# sourceMappingURL=CommonTabItemBase.js.map
