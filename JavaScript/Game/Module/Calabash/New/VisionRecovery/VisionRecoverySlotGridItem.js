"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionRecoverySlotGridItem = void 0);
const VisionRecoverySlotItem_1 = require("./VisionRecoverySlotItem");
class VisionRecoverySlotGridItem extends VisionRecoverySlotItem_1.VisionRecoverySlotItem {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e) {
    this.RefreshUi(e);
  }
  Clear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
}
exports.VisionRecoverySlotGridItem = VisionRecoverySlotGridItem;
//# sourceMappingURL=VisionRecoverySlotGridItem.js.map
