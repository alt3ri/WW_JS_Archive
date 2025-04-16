"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonRightTitleItem = void 0);
const ue_1 = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  InstanceDungeonRecommendElementItem_1 = require("./InstanceDungeonRecommendElementItem");
class InstanceDungeonRightTitleItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.sih = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, ue_1.UIText],
      [1, ue_1.UIText],
      [2, ue_1.UIItem],
    ];
  }
  RefreshItem(e, t, n) {
    this.SetActive(!0),
      this.GetText(0).ShowTextNew(e),
      this.GetText(1).ShowTextNew(t),
      this.UpdateInstanceDungeonRecommendElementItem(n);
  }
  RefreshName(e) {
    this.GetText(0).SetText(e);
  }
  RefreshDesc(e) {
    this.GetText(1).SetText(e);
  }
  UpdateInstanceDungeonRecommendElementItem(e) {
    !e || e.length <= 0
      ? this.sih?.SetActive(!1)
      : this.sih
        ? (this.sih?.SetActive(!0), this.sih?.RefreshItem(e))
        : ((this.sih =
            new InstanceDungeonRecommendElementItem_1.InstanceDungeonRecommendElementItem()),
          this.sih
            .CreateThenShowByResourceIdAsync(
              "UiItem_InstanceDungeon_RecommendElement",
              this.GetItem(2),
            )
            .then(() => {
              this.sih?.RefreshItem(e);
            })
            .catch(() => {}));
  }
}
exports.InstanceDungeonRightTitleItem = InstanceDungeonRightTitleItem;
//# sourceMappingURL=InstanceDungeonRightTitleItem.js.map
