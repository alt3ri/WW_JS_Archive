"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipToMoonChasingBase = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiManager_1 = require("../../../Ui/UiManager"),
  SkipTask_1 = require("./SkipTask");
class SkipToMoonChasingBase extends SkipTask_1.SkipTask {
  CheckMainViewOpen() {
    return (
      void 0 !== UiManager_1.UiManager.GetViewByName("MoonChasingMainView")
    );
  }
  SkipToMap(e) {
    var e =
      ConfigManager_1.ConfigManager.ActivityMoonChasingConfig.GetActivityMoonChasingConfig(
        e,
      );
    void 0 !== e &&
      ((e = { MarkId: e.FocusMarkId, MarkType: 6 }),
      ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
        2,
        !1,
        e,
      ));
  }
}
exports.SkipToMoonChasingBase = SkipToMoonChasingBase;
//# sourceMappingURL=SkipToMoonChasingBase.js.map
