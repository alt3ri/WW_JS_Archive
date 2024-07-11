"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HelpConfig = void 0);
const HelpTextByGroupId_1 = require("../../../Core/Define/ConfigQuery/HelpTextByGroupId");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class HelpConfig extends ConfigBase_1.ConfigBase {
  GetHelpContentInfoByGroupId(e) {
    return HelpTextByGroupId_1.configHelpTextByGroupId.GetConfigList(e);
  }
  IsGroupIdValid(e) {
    e = HelpTextByGroupId_1.configHelpTextByGroupId.GetConfigList(e);
    return void 0 !== e && e.length > 0;
  }
}
exports.HelpConfig = HelpConfig;
// # sourceMappingURL=HelpConfig.js.map
