"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallTabSwitchItemPanel = void 0);
const UE = require("ue"),
  CommonTabItemBase_1 = require("../../../../Common/TabComponent/TabItem/CommonTabItemBase"),
  UiTabSequence_1 = require("../../../../DynamicTab/UiTabViewBehavior/UiTabSequence"),
  LguiUtil_1 = require("../../../../Util/LguiUtil");
class ActivityRecallTabSwitchItemPanel extends CommonTabItemBase_1.CommonTabItemBase {
  constructor() {
    super(...arguments),
      (this.hHe = (e) => {
        1 === e && this.SelectedCallBack(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIExtendToggle],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.hHe]]);
  }
  Refresh(e, t, i) {
    (this.CurrentData = e),
      this.OnRefresh(e, t, i),
      this.GetTabToggle().RootUIComp.SetUIActive(!1),
      this.GetTabToggle().RootUIComp.SetUIActive(!0);
  }
  OnStart() {
    super.OnStart(), this.GetExtendToggle(1).SetToggleState(0);
  }
  OnBeforeHide() {}
  RegisterViewModule(e) {
    e.AddUiTabViewBehavior(UiTabSequence_1.UiTabSequence).SetRootItem(e);
  }
  OnSetToggleState(e, t) {
    this.GetExtendToggle(1).SetToggleStateForce(e, t);
  }
  OnRefresh(e, t, i) {
    e.Data && this.UpdateTabIcon(e.Data.GetIcon());
  }
  OnUpdateTabIcon(e) {}
  GetTabToggle() {
    return this.GetExtendToggle(1);
  }
  UpdateView(e) {
    var t = this.GetText(0);
    LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.Title);
  }
}
exports.ActivityRecallTabSwitchItemPanel = ActivityRecallTabSwitchItemPanel;
//# sourceMappingURL=ActivityRecallTabSwitchItemPanel.js.map
