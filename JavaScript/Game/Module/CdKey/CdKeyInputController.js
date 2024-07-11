"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CdKeyInputController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  CDKEY_USE_INTERVAL = 5e3;
class CdKeyInputController extends UiControllerBase_1.UiControllerBase {
  static nEt() {
    (this.c9s = !0),
      (this.sEt = 0),
      (this.aEt = TimerSystem_1.TimerSystem.Forever(
        this.hEt,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      ));
  }
  static lEt() {
    TimerSystem_1.TimerSystem.Has(this.aEt) &&
      TimerSystem_1.TimerSystem.Remove(this.aEt),
      (this.c9s = !1),
      (this.sEt = 0),
      (this.aEt = void 0);
  }
  static OnClear() {
    return this.lEt(), !0;
  }
  static CheckInCdKeyUseCd() {
    return this.c9s;
  }
  static GetCdKeyUseCd() {
    var e = Math.ceil(
      (CDKEY_USE_INTERVAL - this.sEt) / TimeUtil_1.TimeUtil.InverseMillisecond,
    );
    return Math.max(1, e);
  }
}
(exports.CdKeyInputController = CdKeyInputController),
  ((_a = CdKeyInputController).aEt = void 0),
  (CdKeyInputController.c9s = !1),
  (CdKeyInputController.sEt = 0),
  (CdKeyInputController.hEt = (e) => {
    (CdKeyInputController.sEt += e),
      CdKeyInputController.sEt >= CDKEY_USE_INTERVAL &&
        CdKeyInputController.lEt();
  }),
  (CdKeyInputController.RequestCdKey = async (e) => {
    var t = new Protocol_1.Aki.Protocol.Dzn(),
      e =
        ((t.S8n = e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Functional", 38, "请求CdKey兑换", ["CdKey", e]),
        CdKeyInputController.nEt(),
        await Net_1.Net.CallAsync(9027, t));
    if (e) return e.O4n;
  });
//# sourceMappingURL=CdKeyInputController.js.map
