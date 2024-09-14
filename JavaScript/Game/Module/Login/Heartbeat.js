"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Heartbeat = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  HeartbeatDefine_1 = require("./HeartbeatDefine");
class Heartbeat {
  static SetMaxTimeOutHandler(t) {
    this.$Qs = t;
  }
  static GetHeartbeatInterval() {
    return this.sMi;
  }
  static SendHeartbeatImmediately() {
    this.aMi = 9999999;
  }
  static BeginHeartBeat(t) {
    (this.hMi = !0),
      (this.lMi = !1),
      (this._Mi = Date.now()),
      (this.uMi = 0),
      this.SetHeartBeatMode(0),
      this.SendHeartbeatImmediately(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StartHeartBeat),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Heartbeat",
          9,
          "开启心跳",
          ["MaxTimeOutCount", this.TimeOutMaxCount],
          ["ConnectTimeOut", this.cMi],
          ["HeartbeatInterval", this.sMi],
          ["Reason", HeartbeatDefine_1.EBeginHeartbeat[t]],
        );
  }
  static SetHeartBeatMode(t) {
    if (t !== this.mMi)
      switch ((this.mMi = t)) {
        case 0:
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Heartbeat", 9, "设置心跳配置为普通状态"),
            (this.TimeOutMaxCount =
              CommonParamById_1.configCommonParamById.GetIntConfig(
                "normal_heartbeat_timeout_reconnect",
              ) ?? 3),
            (this.cMi =
              CommonParamById_1.configCommonParamById.GetIntConfig(
                "normal_heartbeat_timeout_ms",
              ) ?? 3e3),
            (this.sMi =
              CommonParamById_1.configCommonParamById.GetIntConfig(
                "normal_heartbeat_interval_ms",
              ) ?? 7e3);
          break;
        case 1:
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Heartbeat", 9, "设置心跳配置为战斗状态"),
            (this.TimeOutMaxCount =
              CommonParamById_1.configCommonParamById.GetIntConfig(
                "battle_heartbeat_timeout_reconnect",
              ) ?? 3),
            (this.cMi =
              CommonParamById_1.configCommonParamById.GetIntConfig(
                "battle_heartbeat_timeout_ms",
              ) ?? 900),
            (this.sMi =
              CommonParamById_1.configCommonParamById.GetIntConfig(
                "battle_heartbeat_interval_ms",
              ) ?? 1e3);
      }
  }
  static StopHeartBeat(t) {
    this.hMi = !1;
    var e = this.uMi;
    (this.uMi = 0),
      this.SetHeartBeatMode(0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.StopHeartBeat),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Heartbeat",
          9,
          "结束心跳",
          ["MaxTimeOutCount", this.TimeOutMaxCount],
          ["ConnectTimeOut", this.cMi],
          ["HeartbeatInterval", this.sMi],
          ["TimeOutCount", e],
          ["Reason", HeartbeatDefine_1.EStopHeartbeat[t]],
        );
  }
  static dMi() {
    this.uMi++,
      this.hMi &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Heartbeat", 9, "心跳超时", ["次数", this.uMi]),
        this.uMi < this.TimeOutMaxCount
          ? this.SendHeartbeatImmediately()
          : TimerSystem_1.TimerSystem.Next(() => {
              this.$Qs?.();
            }));
  }
  static RegisterTick() {
    void 0 === Heartbeat.CMi &&
      (Heartbeat.CMi = TimerSystem_1.TimerSystem.Forever(
        Heartbeat.Tick,
        TimerSystem_1.MIN_TIME,
      ));
  }
  static gMi() {
    (this.aMi = 0),
      Log_1.Log.CheckDebug() && Log_1.Log.Debug("Net", 9, "发送心跳");
    var t = new Protocol_1.Aki.Protocol.Cos();
    Net_1.Net.Call(
      1650,
      Protocol_1.Aki.Protocol.Cos.create(t),
      this.fMi,
      this.cMi,
    ),
      (this.lMi = !0),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.SendHeartbeat);
  }
}
(exports.Heartbeat = Heartbeat),
  ((_a = Heartbeat).hMi = !1),
  (Heartbeat.lMi = !1),
  (Heartbeat.uMi = 0),
  (Heartbeat.TimeOutMaxCount = 0),
  (Heartbeat.cMi = 0),
  (Heartbeat.sMi = 0),
  (Heartbeat.aMi = 0),
  (Heartbeat._Mi = 0),
  (Heartbeat.CMi = void 0),
  (Heartbeat.$Qs = void 0),
  (Heartbeat.mMi = void 0),
  (Heartbeat.Tick = (t) => {
    var e;
    _a.hMi &&
      ((e = Date.now()),
      (t = Math.max(e - _a._Mi, t)),
      (_a.aMi += t),
      (_a._Mi = e),
      _a.aMi < _a.sMi || _a.lMi || _a.gMi());
  }),
  (Heartbeat.fMi = (t) => {
    (_a.lMi = !1), t || Heartbeat.dMi();
  });
//# sourceMappingURL=Heartbeat.js.map
