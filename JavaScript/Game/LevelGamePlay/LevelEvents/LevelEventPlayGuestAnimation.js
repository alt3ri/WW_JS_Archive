"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelEventGuestAnimation = void 0);
const EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelEventGuestAnimation extends LevelGeneralBase_1.LevelEventBase {
  ExecuteNew(e, t, a) {
    var n = e;
    switch (n.UiAnimationConfig.Type) {
      case "Play":
        this.SFc(n.UiAnimationConfig);
        break;
      case "Stop":
        this.MFc(n.UiAnimationConfig);
    }
  }
  SFc(e) {
    "GuestCartethyia" === e.PlayGuestUiAnimation.Type &&
      ((ModelManager_1.ModelManager.BattleUiModel.GuestEffect = !0),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShowGuestEffect,
        !0,
      ));
  }
  MFc(e) {
    "GuestCartethyia" === e.StopGuestUiAnimation.Type &&
      ((ModelManager_1.ModelManager.BattleUiModel.GuestEffect = !1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ShowGuestEffect,
        !1,
      ));
  }
}
exports.LevelEventGuestAnimation = LevelEventGuestAnimation;
//# sourceMappingURL=LevelEventPlayGuestAnimation.js.map
