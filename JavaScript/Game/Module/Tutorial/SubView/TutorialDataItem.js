"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TutorialDataItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class TutorialDataItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.RRo = void 0),
      (this.URo = void 0),
      (this.N8e = (t) => {
        1 === t && ((t = this.GetExtendToggle(2)), this.URo(this.RRo, t));
      });
  }
  async Init(t) {
    await super.CreateByActorAsync(t.GetOwner(), void 0, !0);
  }
  ClearItem() {}
  GetUsingItem(t) {
    return (t.IsTypeTitle ? this.GetItem(0) : this.GetRootItem()).GetOwner();
  }
  Update(t, i) {
    (this.RRo = t).IsTypeTitle ? this.kxt() : this.ARo();
  }
  InitData(t) {
    this.RRo = t;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIExtendToggle],
      [3, UE.UIItem],
      [4, UE.UIText],
    ]),
      (this.BtnBindInfo = [[2, this.N8e]]);
  }
  SetOnToggleSelected(t) {
    this.URo = t;
  }
  kxt() {
    this.GetItem(0).SetUIActive(!0),
      this.GetExtendToggle(2).RootUIComp.SetUIActive(!1);
    var t = this.GetText(1);
    this.RRo.Text
      ? t.SetText(this.RRo.Text)
      : LguiUtil_1.LguiUtil.SetLocalTextNew(t, this.RRo.TextId);
  }
  ARo() {
    this.GetItem(0).SetUIActive(!1);
    var t = this.GetExtendToggle(2),
      i = (t.RootUIComp.SetUIActive(!0), this.GetText(4));
    this.RRo.Text
      ? i.SetText(this.RRo.Text)
      : LguiUtil_1.LguiUtil.SetLocalTextNew(i, this.RRo.TextId),
      this.RefreshRed(),
      t.SetToggleState(0, !1),
      this.RRo.Selected && this.OnSelected(!0);
  }
  RefreshRed() {
    this.RRo.IsTypeTitle ||
      this.GetItem(3).SetUIActive(this.RRo.SavedData.HasRedDot);
  }
  OnSelected(t) {
    this.GetExtendToggle(2).SetToggleState(1, t), this.N8e(1);
  }
  OnBeforeDestroy() {
    this.RRo && (this.RRo = void 0);
  }
}
exports.TutorialDataItem = TutorialDataItem;
//# sourceMappingURL=TutorialDataItem.js.map
