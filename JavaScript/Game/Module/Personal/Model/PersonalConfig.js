"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalConfig = void 0);
const PlayerHeadReAll_1 = require("../../../../Core/Define/ConfigQuery/PlayerHeadReAll"),
  PlayerHeadReById_1 = require("../../../../Core/Define/ConfigQuery/PlayerHeadReById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class PersonalConfig extends ConfigBase_1.ConfigBase {
  GetPlayerHeadConfig(e) {
    return PlayerHeadReById_1.configPlayerHeadReById.GetConfig(e);
  }
  GetAllPlayerHeadConfig() {
    return PlayerHeadReAll_1.configPlayerHeadReAll.GetConfigList();
  }
}
exports.PersonalConfig = PersonalConfig;
//# sourceMappingURL=PersonalConfig.js.map
