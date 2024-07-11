"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemForging = void 0);
const UiManager_1 = require("../../../Ui/UiManager");
const OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemForging extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, t) {
    return (
      void 0 !== (await UiManager_1.UiManager.OpenViewAsync("ForgingRootView"))
    );
  }
  GetViewName(e) {
    return "ForgingRootView";
  }
}
exports.OpenSystemForging = OpenSystemForging;
// # sourceMappingURL=OpenSystemForging.js.map
