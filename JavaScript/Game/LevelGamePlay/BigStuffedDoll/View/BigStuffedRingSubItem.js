"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BigStuffedRingSubItem = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class BigStuffedRingSubItem extends UiPanelBase_1.UiPanelBase {
  constructor(e, t) {
    super(),
      (this.RingId = e),
      (this.RingConfig = t),
      (this.Type = void 0),
      (this.TextureRing = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
    ];
  }
  OnStart() {
    this.TextureRing = this.GetTexture(1);
  }
  OnBeforeDestroy() {
    this.TextureRing = void 0;
  }
}
exports.BigStuffedRingSubItem = BigStuffedRingSubItem;
//# sourceMappingURL=BigStuffedRingSubItem.js.map
