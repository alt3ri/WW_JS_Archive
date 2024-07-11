"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropData = void 0);
const ModelManager_1 = require("../../../../Manager/ModelManager");
class SelectablePropData {
  constructor() {
    (this.IncId = 0),
      (this.ItemId = 0),
      (this.Count = 1),
      (this.SelectedCount = 0),
      (this.ItemDataType = 0),
      (this.RoleId = 0),
      (this.ResonanceLevel = 0),
      (this.LevelText = ""),
      (this.ChipPath = "");
  }
  GetIsLock() {
    var t;
    return (
      !(
        this.IncId < 0 ||
        !(t = ModelManager_1.ModelManager.InventoryModel.GetAttributeItemData(
          this.IncId,
        ))
      ) && t.GetIsLock()
    );
  }
}
exports.SelectablePropData = SelectablePropData;
//# sourceMappingURL=SelectablePropItemDefine.js.map
