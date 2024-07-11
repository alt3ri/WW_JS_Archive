"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FunctionTabLayout = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class FunctionTabItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UIExtendToggle]];
  }
  SetToggleState(t) {
    this.GetExtendToggle(0).SetToggleState(t ? 1 : 0, !1);
  }
}
class FunctionTabLayout extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.B9t = void 0),
      (this.b9t = -1),
      (this.q9t = 0),
      (this.Z3e = (t, e, s) => {
        return { Key: s, Value: new FunctionTabItem(e) };
      }),
      this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    this.B9t = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetLayoutBase(0),
      this.Z3e,
      this.GetItem(1),
    );
  }
  OnBeforeDestroy() {
    this.B9t.ClearChildren();
  }
  RefreshTab(t) {
    1 < (this.q9t = t)
      ? (this.SetActive(!0), this.B9t.RebuildLayoutByDataNew(void 0, t))
      : this.SetActive(!1);
  }
  SetToggleSelectByIndex(t) {
    if (!(this.q9t <= 1) && this.b9t !== t) {
      if (-1 !== this.b9t) {
        const e = this.B9t.GetLayoutItemByKey(this.b9t);
        e.SetToggleState(!1);
      }
      const e = this.B9t.GetLayoutItemByKey(t);
      e.SetToggleState(!0), (this.b9t = t);
    }
  }
}
exports.FunctionTabLayout = FunctionTabLayout;
//# sourceMappingURL=FunctionTabLayout.js.map
