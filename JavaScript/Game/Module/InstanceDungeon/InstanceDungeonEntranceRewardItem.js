"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceRewardItem = void 0);
const ue_1 = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
class InstanceDungeonEntranceRewardItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(),
      (this.Jhi = void 0),
      (this.zhi = !0),
      (this.Zhi = 0),
      (this.eli = () => {
        return new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid();
      }),
      (this.R2e = () => {
        UiManager_1.UiManager.OpenView("InstanceDungeonReward");
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, ue_1.UIScrollViewWithScrollbarComponent],
      [1, ue_1.UIButtonComponent],
      [2, ue_1.UIText],
      [3, ue_1.UIItem],
      [4, ue_1.UIText],
      [5, ue_1.UIItem],
      [6, ue_1.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.R2e]]);
  }
  OnStart() {
    this.Jhi = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.eli,
    );
  }
  OnBeforeDestroy() {
    this.Jhi && (this.Jhi = void 0);
  }
  RefreshReward(e, t) {
    (this.zhi = t),
      this.Jhi.RefreshByDataAsync(e).then(() => {
        let t = 0;
        this.Jhi?.GetScrollItemList().forEach((e) => {
          e.SetReceivedVisible(!this.zhi),
            e.SetFirstRewardVisible(t++ < this.Zhi);
        });
      });
  }
  RefreshRewardText(e) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(2),
      "Text_RewardPreview_Text",
    );
  }
  SetRewardBtnActive(e) {
    this.GetButton(1).GetOwner().GetUIItem().SetUIActive(e),
      this.GetItem(6)?.SetUIActive(e);
  }
  SetDoubleRewardActivity(e) {
    this.GetItem(3).SetUIActive(void 0 !== e),
      this.GetItem(5).SetUIActive(void 0 !== e),
      e &&
        ((e = e.GetNumTxtAndParam()),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e[0], e[1], e[2]));
  }
  SetFirstRewardLength(e) {
    this.Zhi = e;
  }
}
exports.InstanceDungeonEntranceRewardItem = InstanceDungeonEntranceRewardItem;
//# sourceMappingURL=InstanceDungeonEntranceRewardItem.js.map
