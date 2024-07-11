"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProtocolMonitorController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Net_1 = require("../../../Core/Net/Net");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
class ProtocolMonitorController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return Net_1.Net.SetProtocolMonitorHandle(ProtocolMonitorController.eX), !0;
  }
  static Wio(o) {
    return !0;
  }
}
(exports.ProtocolMonitorController = ProtocolMonitorController).eX = (o, r) => {
  const e = ConfigManager_1.ConfigManager.ProtocolMonitorConfig.GetActionId(o);
  e &&
    ProtocolMonitorController.Wio(r) &&
    (Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ProtocolMonitor",
        9,
        "协议监听触发",
        ["messageId", o],
        ["actionId", e],
      ),
    ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActions(
      e,
      void 0,
    ));
};
// # sourceMappingURL=ProtocolMonitorController.js.map
