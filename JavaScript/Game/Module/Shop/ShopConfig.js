"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShopConfig = void 0);
const Log_1 = require("../../../Core/Common/Log");
const MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang");
const ShopFixedByShopId_1 = require("../../../Core/Define/ConfigQuery/ShopFixedByShopId");
const ShopFixedByShopIdAndId_1 = require("../../../Core/Define/ConfigQuery/ShopFixedByShopIdAndId");
const ShopInfoById_1 = require("../../../Core/Define/ConfigQuery/ShopInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
const ConfigManager_1 = require("../../Manager/ConfigManager");
class ShopConfig extends ConfigBase_1.ConfigBase {
  GetTextConfig(e) {
    return ConfigManager_1.ConfigManager.TextConfig.GetTextById(e);
  }
  GetShopName(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetShopInfoConfig(e) {
    const o = ShopInfoById_1.configShopInfoById.GetConfig(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Shop", 19, "查表ShopInfo错误", ["Id", e])),
      o
    );
  }
  GetFixedShopList(e) {
    const o = ShopFixedByShopId_1.configShopFixedByShopId.GetConfigList(e);
    return (
      o ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Shop", 19, "表ShopFixed配置找不到", ["ShopId", e])),
      o
    );
  }
  GetShopFixedInfoByItemId(e, o) {
    const r = ShopFixedByShopIdAndId_1.configShopFixedByShopIdAndId.GetConfig(
      e,
      o,
    );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Shop",
            19,
            "表ShopFixed配置找不到",
            ["ShopId", e],
            ["Id", o],
          )),
      r
    );
  }
}
exports.ShopConfig = ShopConfig;
// # sourceMappingURL=ShopConfig.js.map
