"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardItemData = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class RewardItemData {
  constructor(t, i, e, s = 0) {
    (this.ConfigId = 0),
      (this.UniqueId = 0),
      (this.Count = 0),
      (this.Lo = void 0),
      (this.CJt = void 0),
      (this.F0i = 0),
      (this.jPt = 0),
      (this.Mal = 0),
      (this.ConfigId = t),
      (this.Count = i),
      (this.UniqueId = e),
      (this.Mal = s);
    i = ConfigManager_1.ConfigManager.InventoryConfig;
    (this.Lo = i.GetItemConfigData(t)),
      this.Lo
        ? ((this.CJt = i.GetItemTypeConfig(this.Lo.ItemType)),
          (this.F0i = this.CJt.SortIndex),
          (this.jPt = this.Lo.QualityId))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RewardItem",
            37,
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
  GetDropItemType() {
    return this.Mal;
  }
}
exports.RewardItemData = RewardItemData;
//# sourceMappingURL=RewardItemData.js.map
