"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CollectItemConfig = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  DarkCoastDeliveryById_1 = require("../../../Core/Define/ConfigQuery/DarkCoastDeliveryById"),
  DragonPoolAll_1 = require("../../../Core/Define/ConfigQuery/DragonPoolAll"),
  DragonPoolById_1 = require("../../../Core/Define/ConfigQuery/DragonPoolById"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class CollectItemConfig extends ConfigBase_1.ConfigBase {
  GetAllDragonPoolConfigList() {
    return DragonPoolAll_1.configDragonPoolAll.GetConfigList();
  }
  GetDragonPoolConfigById(o) {
    return DragonPoolById_1.configDragonPoolById.GetConfig(o);
  }
  GetDarkCoastDeliveryById(o) {
    var e = DarkCoastDeliveryById_1.configDarkCoastDeliveryById.GetConfig(o);
    if (void 0 !== e) return e;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("MingSuTi", 59, "DarkCoastDelivery表无当前id", [
        "id",
        o.toString(),
      ]);
  }
}
exports.CollectItemConfig = CollectItemConfig;
//# sourceMappingURL=CollectItemConfig.js.map
