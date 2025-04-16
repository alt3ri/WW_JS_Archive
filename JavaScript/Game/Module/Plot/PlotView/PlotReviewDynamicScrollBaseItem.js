"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotReviewDynamicScrollBaseItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class PlotReviewDynamicScrollBaseItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  GetItemSize(e) {
    let s = void 0;
    switch (e.Type) {
      case 0:
        s = 0;
        break;
      case 1:
        s = 1;
    }
    e = this.GetItem(s);
    return new UE.Vector2D(e.GetWidth(), e.GetHeight());
  }
  ClearItem() {}
}
exports.PlotReviewDynamicScrollBaseItem = PlotReviewDynamicScrollBaseItem;
//# sourceMappingURL=PlotReviewDynamicScrollBaseItem.js.map
