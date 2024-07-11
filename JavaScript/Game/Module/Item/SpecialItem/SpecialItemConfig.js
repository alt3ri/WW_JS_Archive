"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialItemConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById"),
  SpecialItemById_1 = require("../../../../Core/Define/ConfigQuery/SpecialItemById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
  GameplayTagUtils_1 = require("../../../../Core/Utils/GameplayTagUtils");
class SpecialItemConfig extends ConfigBase_1.ConfigBase {
  GetConfig(e) {
    var a = ItemInfoById_1.configItemInfoById.GetConfig(e);
    if (a && a.SpecialItem) {
      a = SpecialItemById_1.configSpecialItemById.GetConfig(e);
      if (a) return a;
    }
  }
  GetAllowTagIds(e) {
    var a = SpecialItemById_1.configSpecialItemById.GetConfig(e),
      o = new Array();
    for (const t of a.AllowTags) {
      var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
      r
        ? o.push(r)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Item",
            40,
            "特殊道具Tag不存在,请检查配置",
            ["configId", e],
            ["tagName", t],
          );
    }
    return o;
  }
  GetBanTagIds(e) {
    var a = SpecialItemById_1.configSpecialItemById.GetConfig(e),
      o = new Array();
    for (const t of a.BanTags) {
      var r = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(t);
      r
        ? o.push(r)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Item",
            40,
            "特殊道具Tag不存在,请检查配置",
            ["configId", e],
            ["tagName", t],
          );
    }
    return o;
  }
}
exports.SpecialItemConfig = SpecialItemConfig;
//# sourceMappingURL=SpecialItemConfig.js.map
