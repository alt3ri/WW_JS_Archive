"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonRankTimeItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonRankTimeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.ItemModel = void 0);
  }
  OnRegisterComponent() {
    (this.ItemModel = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UIButtonComponent],
        [1, UE.UIText],
      ]),
      (this.BtnBindInfo = [[0, this.ItemModel.ButtonClick]]);
  }
  Refresh() {
    var e = this.ItemModel.GetContent();
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      e.TextKey,
      ...e.Params,
    ),
      this.GetButton(0).RootUIComp.SetUIActive(!0);
  }
}
exports.InstanceDungeonRankTimeItem = InstanceDungeonRankTimeItem;
//# sourceMappingURL=InstanceDungeonRankTimeItem.js.map
