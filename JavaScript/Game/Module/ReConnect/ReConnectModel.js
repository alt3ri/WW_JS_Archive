"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ReConnectModel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine");
class ReConnectModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Tso = !1),
      (this.Lso = 0),
      (this.Dso = 0),
      (this.Rso = 0),
      (this.Uso = 0),
      (this.Aso = new Set()),
      (this.Pso = 0),
      (this.xso = 0),
      (this.wso = 0),
      (this.Bso = void 0),
      (this.bso = 1e3),
      (this.qso = 60),
      (this.Gso = void 0),
      (this.Nso = ""),
      (this.Oso = NetworkDefine_1.ENetworkType.None),
      (this.kso = void 0);
  }
  OnInit() {
    return (
      this.ClearReconnectData(),
      void 0 === this.Uso && (this.Uso = 0),
      (this.Pso =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "max_try_reconnect_count",
        ) ?? 3),
      (this.xso =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "reconnect_count_per_try",
        ) ?? 3),
      (this.qso =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "reconnect_channel_close_seconds",
        ) ?? 60),
      (this.bso =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "reconnect_show_mask_timeout_ms",
        ) ?? 1e3),
      -1 ===
      UE.KismetSystemLibrary.GetCommandLine().search("-InfinityReconnect")
        ? (this.Tso = !1)
        : ((this.Tso = !0),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Reconnect",
              42,
              "[InfinityReconnect] Enable infinity reconnect.",
            )),
      !0
    );
  }
  OnClear() {
    return this.ClearReconnectData(), !0;
  }
  ClearReconnectData() {
    (this.Lso = 0),
      (this.Dso = 0),
      this.ResetReconnectStatus(),
      (this.ReconvTraceId = "");
  }
  get ServerChannelCloseTimeMs() {
    return 1e3 * this.qso;
  }
  AddRpc(e) {
    this.Aso.add(e);
  }
  DelRpc(e) {
    this.Aso.delete(e);
  }
  IsRpcEmpty() {
    return this.Aso.size <= 0;
  }
  GetUnResponsedRpcStr() {
    let e = "";
    for (const t of this.Aso) e += `[${t}]`;
    return e;
  }
  IsReConnectMaxCount() {
    return this.Lso > this.xso;
  }
  GetReConnectCount() {
    return this.Lso;
  }
  ReSetReConnectCount() {
    this.Lso = 0;
  }
  AddReConnectCount() {
    return this.Lso++, this.Uso++, this.Lso;
  }
  IsTryMaxCount() {
    return !this.Tso && this.Dso >= this.Pso;
  }
  AddTryCount() {
    this.Dso++;
  }
  GetTryCount() {
    return this.Dso;
  }
  get GetTotalReConnectCount() {
    return this.Uso;
  }
  GetReConnectStatus() {
    return this.Rso;
  }
  ResetReconnectStatus() {
    this.Rso = 0;
  }
  SetReconnectDoing() {
    this.Rso = 1;
  }
  CancelShowMaskTimer() {
    this.Bso &&
      (TimerSystem_1.TimerSystem.Remove(this.Bso), (this.Bso = void 0));
  }
  StartShowMaskTimer(e) {
    this.Bso = TimerSystem_1.TimerSystem.Delay(() => {
      e(), (this.Bso = void 0);
    }, this.bso);
  }
  SetCurIncId() {
    this.wso = ReConnectModel.Fso;
  }
  IsReConnectIdSame() {
    return this.wso === ReConnectModel.Fso;
  }
  static AddReConnectIncId() {
    ReConnectModel.Fso++;
  }
  set DisconnectedFunction(e) {
    this.Gso = e;
  }
  get DisconnectedFunction() {
    return this.Gso;
  }
  get ReconvTraceId() {
    return this.Nso;
  }
  set ReconvTraceId(e) {
    this.Nso = e;
  }
  get LastNetworkType() {
    return this.Oso;
  }
  set LastNetworkType(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Reconnect",
        31,
        "set LastNetworkType",
        ["old", this.Oso],
        ["new", e],
      ),
      (this.Oso = e);
  }
  get NetworkListener() {
    return this.kso || (this.kso = new UE.KuroNetworkChange()), this.kso;
  }
}
(exports.ReConnectModel = ReConnectModel).Fso = 0;
//# sourceMappingURL=ReConnectModel.js.map
