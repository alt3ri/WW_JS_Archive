"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InventoryFilter = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CommonFilter_1 = require("./CommonFilter"),
  VisionDestroyFilterLogic_1 = require("./VisionDestroyFilterLogic");
class InventoryFilter extends CommonFilter_1.CommonFilter {
  constructor() {
    super(...arguments),
      (this.YLt = (i) => {
        return i.GetQuality();
      }),
      (this.JLt = (i) => {
        var t = i.GetConfigId();
        if (
          2 ===
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
            t,
          )
        )
          return (
            (t = i.GetUniqueId()),
            (i =
              ModelManager_1.ModelManager.InventoryModel.GetWeaponItemData(t))
              ? i.GetConfig().WeaponType
              : void 0
          );
      }),
      (this.zLt = (i) => {
        var t = i.GetConfigId();
        if (
          3 ===
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(
            t,
          )
        )
          return (
            (t = i.GetUniqueId()),
            (i =
              ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
                t,
              ))
              ? i.GetMonsterId()
              : void 0
          );
      }),
      (this.ZLt = (i) => {
        var t = i.GetSelectOn(),
          i = 1 === i.GetItemOperationType();
        return t && i;
      });
  }
  OnInitFilterMap() {
    this.FilterMap.set(22, this.YLt),
      this.FilterMap.set(2, this.JLt),
      this.FilterMap.set(3, this.zLt),
      this.FilterMap.set(18, this.zLt),
      this.FilterMap.set(19, this.zLt),
      this.FilterMap.set(20, this.zLt),
      this.FilterMap.set(21, this.zLt),
      this.FilterMap.set(
        14,
        VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomRarity,
      ),
      this.FilterMap.set(
        23,
        VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomCost,
      ),
      this.FilterMap.set(
        24,
        VisionDestroyFilterLogic_1.VisionDestroyFilterLogic.GetPhantomQuality,
      ),
      this.FilterMap.set(
        25,
        VisionDestroyFilterLogic_1.VisionDestroyFilterLogic
          .GetVisionDestroyFetterGroup,
      ),
      this.FilterMap.set(
        26,
        VisionDestroyFilterLogic_1.VisionDestroyFilterLogic
          .GetVisionDestroyAttribute,
      );
  }
  DefaultFilterList() {
    return [this.ZLt];
  }
}
exports.InventoryFilter = InventoryFilter;
//# sourceMappingURL=InventoryFilter.js.map
