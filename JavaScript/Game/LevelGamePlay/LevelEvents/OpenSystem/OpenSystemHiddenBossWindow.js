"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemHiddenBossWindow = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemHiddenBossWindow extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    return (
      e &&
        ((e = { UiId: e.BoardId }),
        await UiManager_1.UiManager.OpenViewAsync("HiddenBossWindow", e)),
      !0
    );
  }
  GetViewName(e, s) {
    return "HiddenBossWindow";
  }
}
exports.OpenSystemHiddenBossWindow = OpenSystemHiddenBossWindow;
//# sourceMappingURL=OpenSystemHiddenBossWindow.js.map
