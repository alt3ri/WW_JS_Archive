"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssAttributeBaseItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase");
class DangoAbyssAttributeBaseItem extends UiPanelBase_1.UiPanelBase {
  async Init(e) {
    await super.CreateByActorAsync(e.GetOwner(), void 0, !0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  GetItemSize(e) {
    if (e.Attribute) {
      const t = this.GetItem(1);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    if (e.Tag) {
      const t = this.GetItem(2);
      return new UE.Vector2D(t.GetWidth(), t.GetHeight());
    }
    const t = this.GetItem(0);
    return new UE.Vector2D(t.GetWidth(), t.GetHeight());
  }
  ClearItem() {}
}
exports.DangoAbyssAttributeBaseItem = DangoAbyssAttributeBaseItem;
//# sourceMappingURL=DangoAbyssAttributeBaseItem.js.map
