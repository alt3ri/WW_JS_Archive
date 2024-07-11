"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const ItemInfoById_1 = require("../../../Core/Define/ConfigQuery/ItemInfoById");
const ItemInfoByItemType_1 = require("../../../Core/Define/ConfigQuery/ItemInfoByItemType");
const ItemMainTypeById_1 = require("../../../Core/Define/ConfigQuery/ItemMainTypeById");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const QualityInfoById_1 = require("../../../Core/Define/ConfigQuery/QualityInfoById");
const SpecialItemById_1 = require("../../../Core/Define/ConfigQuery/SpecialItemById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class ItemConfig extends ConfigBase_1.ConfigBase {
  GetConfig(e) {
    const i = ItemInfoById_1.configItemInfoById.GetConfig(e);
    if (i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Item", 17, "获取物品配置错误", ["itemConfigId", e]);
  }
  GetConfigListByItemType(e) {
    return ItemInfoByItemType_1.configItemInfoByItemType.GetConfigList(e);
  }
  GetSpecialItemConfig(e) {
    const i = SpecialItemById_1.configSpecialItemById.GetConfig(e);
    if (i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Item", 8, "获取特殊物品配置错误", ["specialItemId", e]);
  }
  GetMainTypeConfig(e) {
    const i = ItemMainTypeById_1.configItemMainTypeById.GetConfig(e);
    if (i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Item", 17, "获取物品主类型配置错误", ["mainType", e]);
  }
  GetQualityConfig(e) {
    const i = QualityInfoById_1.configQualityInfoById.GetConfig(e);
    if (i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Item", 17, "获取获取物品品质配置错误", ["qualityId", e]);
  }
  GetItemListMaxSize() {
    const e =
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "item_list_max_size",
      );
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Reward",
            9,
            '外入包列表最大数量无法找到, 请检测c.参数字段"item_list_max_size"',
          )),
      e
    );
  }
  GetPriorItemListMaxSize() {
    const e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "item_prior_list_max_size",
    );
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Reward",
            5,
            '外入包列表最大数量无法找到, 请检测c.参数字段"item_prior_list_max_size"',
          )),
      e
    );
  }
  GetItemName(e) {
    e = this.GetConfig(e).Name;
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e) ?? "";
  }
  GetItemDesc(e) {
    e = this.GetConfig(e).ShowTypes[0];
    if (e) {
      var e =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemShowTypeConfig(e);
      if (e)
        return (
          (e = e.Name), MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)
        );
    }
  }
  GetItemAttributeDesc(e) {
    e = this.GetConfig(e);
    if (e)
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        e.AttributesDescription,
      );
  }
}
exports.ItemConfig = ItemConfig;
// # sourceMappingURL=ItemConfig.js.map
