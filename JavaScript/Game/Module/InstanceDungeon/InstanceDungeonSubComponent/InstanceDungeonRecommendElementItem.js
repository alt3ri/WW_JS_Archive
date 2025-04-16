"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonRecommendElementItem = void 0);
const ue_1 = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  TowerElementItem_1 = require("../../TowerDetailUi/View/TowerElementItem"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class InstanceDungeonRecommendElementItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Uth = void 0),
      (this.Mli = void 0),
      (this.jli = () => {
        return new TowerElementItem_1.TowerElementItem();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIHorizontalLayout]];
  }
  OnStart() {
    (this.Mli = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.jli,
    )),
      this.Uth && this.RefreshItem(this.Uth.Element);
  }
  RefreshItem(e) {
    this.InAsyncLoading()
      ? (this.Uth = { Element: e })
      : this.Mli?.RefreshByData(e);
  }
}
exports.InstanceDungeonRecommendElementItem =
  InstanceDungeonRecommendElementItem;
//# sourceMappingURL=InstanceDungeonRecommendElementItem.js.map
