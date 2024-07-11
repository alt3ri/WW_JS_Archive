"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundAreaPlayTipsController = void 0);
const SoundAreaPlayInfoById_1 = require("../../../Core/Define/ConfigQuery/SoundAreaPlayInfoById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
class SoundAreaPlayTipsController extends UiControllerBase_1.UiControllerBase {
  static async OpenSoundAreaPlayTips(e) {
    const r = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
    if (
      r?.MaxCount &&
      ((
        LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips,
        ) ?? new Map()
      ).get(e) ?? 0) >= r?.MaxCount
    )
      return !1;
    return UiManager_1.UiManager.IsViewShow("SoundAreaPlayTips")
      ? (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.SilentTipsRefresh,
          e,
        ),
        !0)
      : void 0 !==
          (await UiManager_1.UiManager.OpenViewAsync("SoundAreaPlayTips", e));
  }
}
exports.SoundAreaPlayTipsController = SoundAreaPlayTipsController;
// # sourceMappingURL=SoundAreaPlayTipsController.js.map
