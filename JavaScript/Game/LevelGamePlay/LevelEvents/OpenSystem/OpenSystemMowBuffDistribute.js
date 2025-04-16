"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemMowBuffDistribute = void 0);
const UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemMowBuffDistribute extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, s) {
    return (
      await UiManager_1.UiManager.OpenViewAsync("BossRushBuffInGameView"), !0
    );
  }
  GetViewName(e) {
    return "BossRushBuffInGameView";
  }
}
exports.OpenSystemMowBuffDistribute = OpenSystemMowBuffDistribute;
//# sourceMappingURL=OpenSystemMowBuffDistribute.js.map
