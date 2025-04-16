"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePingController = void 0);
const NetInfo_1 = require("../../../Core/Net/NetInfo"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  CloudGameManager_1 = require("../../Manager/CloudGameManager"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  REFRESH_PING_INTERVAL_MS = 100,
  MAX_PING_MS = 999,
  MIN_PING_MS = 1;
class GamePingController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return this.P3e(), !0;
  }
  static OnClear() {
    return this.R6t(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.FWe,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.FWe,
    );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "PingView",
      GamePingController.iVe,
      "GamePingController.CanOpenView",
    );
  }
  static gTo() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    return (
      0 === e ||
      !(e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)) ||
      1 !== e.WorldDungeonSubType
    );
  }
  static P3e() {
    GamePingController.qKt = TimerSystem_1.TimerSystem.Forever(
      GamePingController.GKt,
      REFRESH_PING_INTERVAL_MS,
    );
  }
  static R6t() {
    void 0 !== GamePingController.qKt &&
      (TimerSystem_1.TimerSystem.Remove(GamePingController.qKt),
      (GamePingController.qKt = void 0));
  }
}
(exports.GamePingController = GamePingController),
  ((_a = GamePingController).qKt = void 0),
  (GamePingController.iVe = (e) => !!_a.gTo()),
  (GamePingController.FWe = () => {
    CloudGameManager_1.CloudGameManager.IsCloudGame ||
      UiManager_1.UiManager.OpenView("PingView");
  }),
  (GamePingController.GKt = () => {
    var e = Math.ceil(NetInfo_1.NetInfo.RttMs),
      e = Math.min(e, MAX_PING_MS);
    (e = Math.max(e, MIN_PING_MS)),
      (ModelManager_1.ModelManager.GamePingModel.CurrentPing = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCheckGamePing,
        e,
      );
  });
//# sourceMappingURL=GamePingController.js.map
