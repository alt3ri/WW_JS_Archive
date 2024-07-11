"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemInteractionPanelItemData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class ItemInteractionPanelItemData {
  constructor(t, e) {
    (this.ItemConfigId = 0),
      (this.HPt = 0),
      (this.hPt = 0),
      (this.jPt = 0),
      (this.NeedCount = 0),
      (this.IsSelected = !1),
      (this.ItemConfigId = t.ItemConfigId),
      (this.HPt = t.CurrentCount);
    t = t.NeedCount;
    t && (this.NeedCount = t),
      (this.jPt = e),
      (this.hPt =
        ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
          this.ItemConfigId,
        ));
  }
  SetCurrentCount(t) {
    this.HPt = t;
  }
  GetCurrentCount() {
    return this.HPt;
  }
  GetItemCount() {
    return this.hPt;
  }
  IsEnable() {
    return this.hPt >= this.NeedCount;
  }
  GetQualityId() {
    return this.jPt;
  }
}
exports.ItemInteractionPanelItemData = ItemInteractionPanelItemData;
//# sourceMappingURL=ItemInteractionPanelItemData.js.map
