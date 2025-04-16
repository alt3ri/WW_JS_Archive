"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundAreaPlayTipsController = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager");
class SoundAreaPlayTipsController extends UiControllerBase_1.UiControllerBase {
  static async OpenSoundAreaPlayTips(e) {
    return (
      !!ModelManager_1.ModelManager.SoundAreaPlayTipsModel.CheckInfoIdCanShow(
        e,
      ) &&
      (UiManager_1.UiManager.IsViewShow("SoundAreaPlayTips")
        ? (EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.SilentTipsRefresh,
            e,
          ),
          !0)
        : void 0 !==
          (await UiManager_1.UiManager.OpenViewAsync("SoundAreaPlayTips", e)))
    );
  }
}
exports.SoundAreaPlayTipsController = SoundAreaPlayTipsController;
//# sourceMappingURL=SoundAreaPlayTipsController.js.map
