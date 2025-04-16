"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OpenSystemPhonograph = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  OpenSystemBase_1 = require("./OpenSystemBase"),
  ConfigManager_1 = require("../../../Manager/ConfigManager");
class OpenSystemPhonograph extends OpenSystemBase_1.OpenSystemBase {
  async ExecuteOpenView(e, r) {
    e.GramophoneId &&
      (ModelManager_1.ModelManager.PhonographModel.CurrentPlayActorEntityId =
        e.GramophoneId);
    e = ConfigManager_1.ConfigManager.PhonographConfig.GetUnlockItemIds();
    return 0 < e.length
      ? ControllerHolder_1.ControllerHolder.PhonographController.UnlockMusicRequest(
          e,
        )
      : void 0 !==
          (await UiManager_1.UiManager.OpenViewAsync("PhonographView"));
  }
  GetViewName(e) {
    return 0 <
      ConfigManager_1.ConfigManager.PhonographConfig.GetUnlockItemIds().length
      ? "PhonographNewMusicView"
      : "PhonographView";
  }
}
exports.OpenSystemPhonograph = OpenSystemPhonograph;
//# sourceMappingURL=OpenSystemPhonograph.js.map
