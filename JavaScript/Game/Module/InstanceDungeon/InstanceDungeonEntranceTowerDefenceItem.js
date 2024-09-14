"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceTowerDefenceItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  CommonItemSmallItemGrid_1 = require("../Common/ItemGrid/CommonItemSmallItemGrid"),
  GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew");
class InstanceDungeonEntranceTowerDefenceItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
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
      this.SetButtonUiActive(1, !1);
  }
  SetPhantoms(e) {
    this.Hzs.RefreshByDataAsync(e).then(() => {
      this.Hzs.GetScrollItemList().forEach((e) => {
        e.SetToggleInteractive(!1), e.SetQuality();
      });
    });
  }
}
exports.InstanceDungeonEntranceTowerDefenceItem =
  InstanceDungeonEntranceTowerDefenceItem;
//# sourceMappingURL=InstanceDungeonEntranceTowerDefenceItem.js.map
