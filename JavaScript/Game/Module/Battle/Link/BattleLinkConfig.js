"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleLinkConfig = void 0);
const LinkCharacterById_1 = require("../../../../Core/Define/ConfigQuery/LinkCharacterById"),
  LinkDataById_1 = require("../../../../Core/Define/ConfigQuery/LinkDataById"),
  LinkParamById_1 = require("../../../../Core/Define/ConfigQuery/LinkParamById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class BattleLinkConfig extends ConfigBase_1.ConfigBase {
  GetLinkDataConfig(e) {
    if (e) return LinkDataById_1.configLinkDataById.GetConfig(e);
  }
  GetRoleConfig(e) {
    if (e) return LinkCharacterById_1.configLinkCharacterById.GetConfig(e);
  }
  GetLinkParam(e) {
    if (e) return LinkParamById_1.configLinkParamById.GetConfig(e);
  }
}
exports.BattleLinkConfig = BattleLinkConfig;
//# sourceMappingURL=BattleLinkConfig.js.map
