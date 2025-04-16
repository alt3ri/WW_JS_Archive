"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceTowerDefenceItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
class InstanceDungeonEntranceTowerDefenceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uth = void 0),
      (this.Hzs = void 0),
      (this.JGe = () =>
        new CommonItemSmallItemGrid_1.CommonItemSmallItemGrid());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Hzs = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(0),
      this.JGe,
    )),
      this.GetItem(3).SetUIActive(!1),
      this.GetItem(5).SetUIActive(!1),
      this.SetButtonUiActive(1, !1),
      this.Uth && this.RefreshItem(this.Uth.Data),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        "TowerDefence_Vison",
      );
  }
  RefreshItem(e) {
    this.InAsyncLoading()
      ? (this.Uth = { Data: e })
      : this.Hzs.RefreshByData(e, () => {
          for (const e of this.Hzs.GetScrollItemList())
            e.SetQuality(), e.SetAllowClickBack(!1);
        });
  }
}
exports.InstanceDungeonEntranceTowerDefenceItem =
  InstanceDungeonEntranceTowerDefenceItem;
//# sourceMappingURL=InstanceDungeonEntranceTowerDefenceItem.js.map
