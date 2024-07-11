"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelUpController = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  KuroSdkReport_1 = require("../../KuroSdk/KuroSdkReport"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class LevelUpController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPlayerLevelChanged,
      this.x2e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlayerExpChanged,
        this.Ngi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFinishLoadingState,
        this.ivi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPlayerLevelChanged,
      this.x2e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlayerExpChanged,
        this.Ngi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFinishLoadingState,
        this.ivi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        this.Ilt,
      );
  }
}
((exports.LevelUpController = LevelUpController).Ngi = (e, n, t) => {
  var r,
    o = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
  o < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel() ||
    ((r = ConfigManager_1.ConfigManager.FunctionConfig.GetDifferenceExp(
      o,
      n,
      o,
      e,
    )),
    ModelManager_1.ModelManager.LevelUpModel.SetExpChange(o, e, n, t, r));
}),
  (LevelUpController.x2e = (e, n, t, r, o, a, i) => {
    var s;
    KuroSdkReport_1.KuroSdkReport.OnPlayerLevelChange(n),
      n < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel() ||
        ((s = ConfigManager_1.ConfigManager.FunctionConfig.GetDifferenceExp(
          e,
          r,
          n,
          t,
        )),
        ModelManager_1.ModelManager.LevelUpModel.SetLevelUp(
          e,
          n,
          t,
          r,
          o,
          a,
          i,
          s,
        ));
  }),
  (LevelUpController.ivi = () => {
    var e = ModelManager_1.ModelManager.FunctionModel.GetPlayerLevel();
    e < ConfigManager_1.ConfigManager.LevelUpConfig.GetHiddenLevelUpLevel() ||
      ModelManager_1.ModelManager.LevelUpModel.SetShowLevelOnly(e);
  }),
  (LevelUpController.Ilt = (e) => {
    2 === e && LevelUpController.ivi();
  });
//# sourceMappingURL=LevelUpController.js.map
