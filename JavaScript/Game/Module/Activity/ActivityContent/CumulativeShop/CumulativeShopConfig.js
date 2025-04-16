"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CumulativeShopConfig = void 0);
const ConsumptiveTaskById_1 = require("../../../../../Core/Define/ConfigQuery/ConsumptiveTaskById"),
  ConsumptiveTaskTabById_1 = require("../../../../../Core/Define/ConfigQuery/ConsumptiveTaskTabById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase");
class CumulativeShopConfig extends ConfigBase_1.ConfigBase {
  GetCumulativeShopTaskConfig(e) {
    return ConsumptiveTaskById_1.configConsumptiveTaskById.GetConfig(e);
  }
  GetCumulativeShopTaskTabConfig(e) {
    return ConsumptiveTaskTabById_1.configConsumptiveTaskTabById.GetConfig(e);
  }
}
exports.CumulativeShopConfig = CumulativeShopConfig;
//# sourceMappingURL=CumulativeShopConfig.js.map
