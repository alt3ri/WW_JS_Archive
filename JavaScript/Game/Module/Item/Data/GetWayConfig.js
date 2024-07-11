"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GetWayConfig = void 0);
const AccessPathById_1 = require("../../../../Core/Define/ConfigQuery/AccessPathById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class GetWayConfig extends ConfigBase_1.ConfigBase {
  GetWayName(e) {
    e = AccessPathById_1.configAccessPathById.GetConfig(e);
    if (e)
      return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Description);
  }
  GetConfigById(e) {
    return AccessPathById_1.configAccessPathById.GetConfig(e);
  }
}
exports.GetWayConfig = GetWayConfig;
// # sourceMappingURL=GetWayConfig.js.map
