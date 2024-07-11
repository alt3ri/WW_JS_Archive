"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyConfig = void 0);
const OpenAndCloseViewHotKeyAll_1 = require("../../../Core/Define/ConfigQuery/OpenAndCloseViewHotKeyAll"),
  ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class ViewHotKeyConfig extends ConfigBase_1.ConfigBase {
  GetAllOpenAndCloseViewHotKeyConfig() {
    return OpenAndCloseViewHotKeyAll_1.configOpenAndCloseViewHotKeyAll.GetConfigList();
  }
}
exports.ViewHotKeyConfig = ViewHotKeyConfig;
//# sourceMappingURL=ViewHotKeyConfig.js.map
