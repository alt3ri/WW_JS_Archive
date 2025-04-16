"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemAccessedFromGiftPathConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ItemAccessedPathById_1 = require("../../../../Core/Define/ConfigQuery/ItemAccessedPathById"),
  ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ItemDefines_1 = require("./ItemDefines");
class ItemAccessedFromGiftPathConfig extends ConfigBase_1.ConfigBase {
  GetItemAccessedFromGiftPathConfig(e) {
    return ItemAccessedPathById_1.configItemAccessedPathById.GetConfig(e);
  }
  GetGiftItemGroupById(e) {
    var t = new Array(),
      r = ItemAccessedPathById_1.configItemAccessedPathById.GetConfig(e);
    if (r)
      for (const I of r.GiftItemGroup) {
        var o,
          i = ItemInfoById_1.configItemInfoById.GetConfig(I);
        i &&
        11 === i.ItemType &&
        i.Parameters.has(ItemDefines_1.EItemFunctionType.ManualOpenGift)
          ? ((i = i.Parameters.get(
              ItemDefines_1.EItemFunctionType.ManualOpenGift,
            )),
            (o =
              ConfigManager_1.ConfigManager.GiftPackageConfig?.GetGiftPackageConfig(
                i,
              )) && o.Content.has(e)
              ? t.push(I)
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SkipInterface",
                  77,
                  "[SkipInterface]礼包内不存在对应道具 ",
                  ["itemID: ", e],
                  ["giftItemID: ", I],
                  ["giftID", i],
                ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SkipInterface",
              77,
              "[SkipInterface]道具存在异常 ",
              ["giftItemID: ", I],
            );
      }
    else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "SkipInterface",
          77,
          "[SkipInterface]道具ID不存在，找不到ItemAccessedPath配置",
          ["itemID: ", e],
        );
    return t;
  }
}
exports.ItemAccessedFromGiftPathConfig = ItemAccessedFromGiftPathConfig;
//# sourceMappingURL=ItemAccessedFromGiftPathConfig.js.map
