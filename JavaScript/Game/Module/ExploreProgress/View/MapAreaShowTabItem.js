"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapAreaShowTabItem = void 0);
const UE = require("ue"),
  CommonTabItemBase_1 = require("../../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiTabSequence_1 = require("../../DynamicTab/UiTabViewBehavior/UiTabSequence");
class MapAreaShowTabItem extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.hHe = (e) => {
        1 === e && this.SelectedCallBack(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.hHe]]);
  }
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  OnSetToggleState(e, t) {
    this.GetExtendToggle(0).SetToggleStateForce(e, t);
  }
  OnRefresh(e, t, s) {
    e.Data && this.UpdateTabIcon(e.Data.GetIcon());
  }
  OnUpdateTabIcon(e) {}
  GetTabToggle() {
    return this.GetExtendToggle(0);
  }
  UpdateView(e) {
    this.GetText(1).ShowTextNew(e.StateNameKey),
      this.RootItem.SetUIActive(!e.IsNoneState),
      this.UpdateTabRedDot(e);
  }
  UpdateTabRedDot(e) {
    e.IsNoneState ||
      ((e = e.HasCanTakeStageReward()), this.GetItem(2)?.SetUIActive(e));
  }
}
exports.MapAreaShowTabItem = MapAreaShowTabItem;
//# sourceMappingURL=MapAreaShowTabItem.js.map
