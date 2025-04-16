"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WorldMapSecondaryTipListItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase");
class WorldMapSecondaryTipListItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Refresh(e, t, s) {
    this.GetText(0).SetText(e.Name), this.GetText(1).SetText(e.Desc);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
  GetNameTxt() {
    return this.GetText(0);
  }
  GetDescTxt() {
    return this.GetText(1);
  }
}
exports.WorldMapSecondaryTipListItem = WorldMapSecondaryTipListItem;
//# sourceMappingURL=WorldMapSecondaryTipListItem.js.map
