"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemData = void 0);
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const ItemDataBase_1 = require("./ItemDataBase");
class CommonItemData extends ItemDataBase_1.ItemDataBase {
  constructor(e, t, r, i, s) {
    super(e, r, i),
      (this.UniqueId = 0),
      (this.EndTime = 0),
      (this.UniqueId = t),
      (this.EndTime = s ?? 0);
  }
  GetConfig() {
    return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfig(
      this.ConfigId,
    );
  }
  GetUniqueId() {
    return this.UniqueId;
  }
  GetMainType() {
    const e = this.GetConfig();
    if (e) return e.MainTypeId;
  }
  GetType() {
    const e = this.GetConfig();
    if (e) return e.ItemType;
  }
  GetMaxStackCount() {
    const e = this.GetConfig();
    return e ? e.MaxStackableNum : 0;
  }
  GetQuality() {
    return this.GetConfig()?.QualityId;
  }
  GetSortIndex() {
    return this.GetConfig()?.SortIndex;
  }
  GetItemAccess() {
    return this.GetConfig()?.ItemAccess;
  }
  GetShowTypeList() {
    return this.GetConfig()?.ShowTypes;
  }
  GetUseCountLimit() {
    return this.GetConfig().UseCountLimit;
  }
  GetRedDotDisableRule() {
    return this.GetConfig().RedDotDisableRule;
  }
  HasRedDot() {
    const e = this.GetConfigId();
    return ModelManager_1.ModelManager.InventoryModel.IsCommonItemHasRedDot(e);
  }
  SetEndTime(e) {
    this.EndTime = e;
  }
  IsLimitTimeItem() {
    return this.EndTime > 0 && !this.IsOverTime();
  }
  GetEndTime() {
    return this.EndTime;
  }
  IsOverTime() {
    return (
      !(this.EndTime <= 0) &&
      this.EndTime <= TimeUtil_1.TimeUtil.GetServerTimeStamp()
    );
  }
  IsValid() {
    return !this.IsOverTime();
  }
}
exports.CommonItemData = CommonItemData;
// # sourceMappingURL=CommonItemData.js.map
