"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GiftPackageConfig = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const GiftPackageById_1 = require("../../../../../Core/Define/ConfigQuery/GiftPackageById");
const ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class GiftPackageConfig extends ConfigBase_1.ConfigBase {
  GetGiftPackageConfig(e) {
    return GiftPackageById_1.configGiftPackageById.GetConfig(e);
  }
  GetGiftItemList(e, i) {
    i.length = 0;
    const o = GiftPackageById_1.configGiftPackageById.GetConfig(e);
    if (o) {
      i.length = 0;
      for (let [a, t] of o.Content) {
        a = [{ IncId: 0, ItemId: a }, t];
        i.push(a);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Temp", 11, "GiftPackage里没有该id", ["Id", e]);
  }
}
exports.GiftPackageConfig = GiftPackageConfig;
// # sourceMappingURL=GiftPackageConfig.js.map
