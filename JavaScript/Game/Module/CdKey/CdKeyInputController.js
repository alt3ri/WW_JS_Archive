"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CdKeyInputController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const CDKEY_USE_INTERVAL = 5e3;
class CdKeyInputController extends UiControllerBase_1.UiControllerBase {
  static Qvt() {
    (this.d4s = !0),
      (this.Xvt = 0),
      (this.$vt = TimerSystem_1.TimerSystem.Forever(
        this.Yvt,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      ));
  }
  static Jvt() {
    TimerSystem_1.TimerSystem.Has(this.$vt) &&
      TimerSystem_1.TimerSystem.Remove(this.$vt),
      (this.d4s = !1),
      (this.Xvt = 0),
      (this.$vt = void 0);
  }
  static OnClear() {
    return this.Jvt(), !0;
  }
  static CheckInCdKeyUseCd() {
    return this.d4s;
  }
  static GetCdKeyUseCd() {
    const e = Math.ceil(
      (CDKEY_USE_INTERVAL - this.Xvt) / TimeUtil_1.TimeUtil.InverseMillisecond,
    );
    return Math.max(1, e);
  }
}
(exports.CdKeyInputController = CdKeyInputController),
  ((_a = CdKeyInputController).$vt = void 0),
  (CdKeyInputController.d4s = !1),
  (CdKeyInputController.Xvt = 0),
  (CdKeyInputController.Yvt = (e) => {
    (CdKeyInputController.Xvt += e),
      CdKeyInputController.Xvt >= CDKEY_USE_INTERVAL &&
        CdKeyInputController.Jvt();
  }),
  (CdKeyInputController.RequestCdKey = async (e) => {
    const t = new Protocol_1.Aki.Protocol.bQn();
    var e =
      ((t.F3n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Functional", 38, "请求CdKey兑换", ["CdKey", e]),
      CdKeyInputController.Qvt(),
      await Net_1.Net.CallAsync(18692, t));
    if (e) return e.lkn;
  });
// # sourceMappingURL=CdKeyInputController.js.map
