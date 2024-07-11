"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GamePingController = void 0);
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const NetInfo_1 = require("../../../Core/Net/NetInfo");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiManager_1 = require("../../Ui/UiManager");
const REFRESH_PING_INTERVAL_MS = 100;
const MAX_PING_MS = 999;
const MIN_PING_MS = 1;
class GamePingController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return this.OnAddEvents(), this.CFe(), !0;
  }
  static OnClear() {
    return this.OnRemoveEvents(), this.RVt(), !0;
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.Uje,
    );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      this.Uje,
    );
  }
  static CFe() {
    GamePingController.qWt = TimerSystem_1.TimerSystem.Forever(
      GamePingController.GWt,
      REFRESH_PING_INTERVAL_MS,
    );
  }
  static RVt() {
    void 0 !== GamePingController.qWt &&
      (TimerSystem_1.TimerSystem.Remove(GamePingController.qWt),
      (GamePingController.qWt = void 0));
  }
}
((exports.GamePingController = GamePingController).qWt = void 0),
  (GamePingController.Uje = () => {
    UiManager_1.UiManager.OpenView("PingView");
  }),
  (GamePingController.GWt = () => {
    var e = Math.ceil(NetInfo_1.NetInfo.RttMs);
    var e = Math.min(e, MAX_PING_MS);
    (e = Math.max(e, MIN_PING_MS)),
      (ModelManager_1.ModelManager.GamePingModel.CurrentPing = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnCheckGamePing,
        e,
      );
  });
// # sourceMappingURL=GamePingController.js.map
