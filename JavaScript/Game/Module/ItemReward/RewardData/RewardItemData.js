"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardItemData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class RewardItemData {
  constructor(t, e, i) {
    (this.CJt = void 0),
      (this.F0i = 0),
      (this.jPt = 0),
      (this.ConfigId = t),
      (this.Count = e),
      (this.UniqueId = i);
    e = ConfigManager_1.ConfigManager.InventoryConfig;
    (this.Lo = e.GetItemConfigData(t)),
      this.Lo
        ? ((this.CJt = e.GetItemTypeConfig(this.Lo.ItemType)),
          (this.F0i = this.CJt.SortIndex),
          (this.jPt = this.Lo.QualityId))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RewardItem",
            8,
            "生成奖励物品数据时，没有在d.道具中找到",
            ["configId", t],
          );
  }
  GetConfig() {
    return this.Lo;
  }
  GetTypeSortIndex() {
    return this.F0i;
  }
  GetQualityId() {
    return this.jPt;
  }
}
exports.RewardItemData = RewardItemData;
//# sourceMappingURL=RewardItemData.js.map
