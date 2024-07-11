"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRewardList = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../../../../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout");
class ActivityRewardList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.s4e = void 0),
      (this.a4e = void 0),
      (this.InitCommonGridItem = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIHorizontalLayout],
      [3, UE.UIItem],
    ];
  }
  InitGridLayout(e) {
    (this.a4e = e),
      void 0 === this.s4e &&
        (this.s4e = new GenericLayout_1.GenericLayout(
          this.GetHorizontalLayout(2),
          this.a4e,
        ));
  }
  SetTitleByTextId(e) {
    this.GetText(1).ShowTextNew(e);
  }
  SetTitleByText(e) {
    this.GetText(1).SetText(e);
  }
  GetBgTexture() {
    return this.GetTexture(0);
  }
  RefreshItemLayout(e, t) {
    this.s4e.RefreshByData(e, t);
  }
  GetLayoutItemList() {
    return this.s4e.GetLayoutItemList();
  }
  SetItemLayoutVisible(e) {
    this.s4e.SetActive(e);
  }
}
exports.ActivityRewardList = ActivityRewardList;
//# sourceMappingURL=ActivityRewardList.js.map
