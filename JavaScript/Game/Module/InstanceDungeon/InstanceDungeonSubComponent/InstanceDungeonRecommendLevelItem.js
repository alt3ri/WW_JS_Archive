"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonRecommendLevelItem = void 0);
const ue_1 = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonRecommendLevelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Uth = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText]];
  }
  OnStart() {
    this.Uth && this.RefreshItem(this.Uth.Level);
  }
  RefreshItem(e) {
    this.InAsyncLoading()
      ? (this.Uth = { Level: e })
      : LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), e.TextId, e.Level);
  }
}
exports.InstanceDungeonRecommendLevelItem = InstanceDungeonRecommendLevelItem;
//# sourceMappingURL=InstanceDungeonRecommendLevelItem.js.map
