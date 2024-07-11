"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemChasingMoonMain = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  MoonChasingMainViewModel_1 = require("../../../Module/Activity/ActivityContent/MoonChasing/Main/MoonChasingMainViewModel"),
  UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase");
class OpenSystemChasingMoonMain extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, n) {
    var i = new MoonChasingMainViewModel_1.MoonChasingMainViewModel();
    return (
      !!UiManager_1.UiManager.IsViewOpen("MoonChasingMainView") ||
      (await ControllerHolder_1.ControllerHolder.MoonChasingController.OpenMainView(
        i,
      ))
    );
  }
  GetViewName(e) {
    return "MoonChasingMainView";
  }
}
exports.OpenSystemChasingMoonMain = OpenSystemChasingMoonMain;
//# sourceMappingURL=OpenSystemChasingMoonMain.js.map
