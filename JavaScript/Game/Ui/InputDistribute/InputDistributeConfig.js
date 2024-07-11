"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputDistributeConfig = void 0);
const UiShowByViewName_1 = require("../../../Core/Define/ConfigQuery/UiShowByViewName"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class InputDistributeConfig extends ConfigBase_1.ConfigBase {
  IsViewAllowFightInput(e) {
    e = UiShowByViewName_1.configUiShowByViewName.GetConfig(e);
    return !!e && e.IsAllowFightInput;
  }
}
exports.InputDistributeConfig = InputDistributeConfig;
//# sourceMappingURL=InputDistributeConfig.js.map
