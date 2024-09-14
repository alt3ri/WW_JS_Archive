"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuickNavigateDynamicItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class QuickNavigateDynamicItem extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  GetItemSize(e) {
    if (0 === e.ItemType) {
      const t = this.GetItem(0);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    const t = this.GetItem(1);
    return new UE.Vector2D(t.GetWidth(), t.GetHeight());
  }
  ClearItem() {}
}
exports.QuickNavigateDynamicItem = QuickNavigateDynamicItem;
//# sourceMappingURL=QuickNavigateDynamicItem.js.map
