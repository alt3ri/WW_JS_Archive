"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonDescWidelyItem = void 0);
const ue_1 = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class InstanceDungeonDescWidelyItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, ue_1.UIText]];
  }
  RefreshItem(e) {
    LguiUtil_1.LguiUtil.TrySetLocalTextNew(this.GetText(0), e);
  }
}
exports.InstanceDungeonDescWidelyItem = InstanceDungeonDescWidelyItem;
//# sourceMappingURL=InstanceDungeonDescWidelyItem.js.map
