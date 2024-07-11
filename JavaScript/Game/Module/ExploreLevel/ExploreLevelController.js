"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreLevelController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(8637, ExploreLevelController.lVt);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(8637);
  }
  static ExploreScoreRewardRequest(e, o) {
    var r = new Protocol_1.Aki.Protocol.ets();
    (r.l6n = e),
      (r.wVn = o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "客户端请求请求探索进度评分奖励 ExploreScoreRewardRequest",
          ["request", r],
        ),
      Net_1.Net.Call(9079, r, this._Vt);
  }
  static CountryExploreScoreInfoRequest(l, s) {
    var e = new Protocol_1.Aki.Protocol.its();
    (e.bVn = l),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "客户端请求国家探索评分信息 CountryExploreScoreInfoRequest",
          ["request", e],
        );
    Net_1.Net.Call(7914, e, (e) => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "服务端返回国家探索评分信息 CountryExploreScoreInfoResponse",
          ["response", e],
        ),
        s && s();
      var o = ModelManager_1.ModelManager.ExploreLevelModel;
      for (const t of e.wPs) {
        var r = t.l6n;
        for (const n of t.wVn) o.SetCountryExploreScoreReceived(r, n, !0);
      }
      o.SetCountryExploreScore(l, e.UPs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
        );
    });
  }
  static async CountryExploreScoreInfoAsyncRequest(e) {
    var o = new Protocol_1.Aki.Protocol.its(),
      o =
        ((o.bVn = e),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "ExploreLevel",
            8,
            "客户端请求国家探索评分信息 CountryExploreScoreInfoRequest",
            ["request", o],
          ),
        await Net_1.Net.CallAsync(7914, o));
    if (o) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "服务端返回国家探索评分信息 CountryExploreScoreInfoResponse",
          ["response", o],
        );
      var r = ModelManager_1.ModelManager.ExploreLevelModel;
      for (const n of o.wPs) {
        var t = n.l6n;
        for (const l of n.wVn) r.SetCountryExploreScoreReceived(t, l, !0);
      }
      r.SetCountryExploreScore(e, o.UPs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
        );
    }
  }
}
((exports.ExploreLevelController = ExploreLevelController).lVt = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info("ExploreLevel", 8, "服务端通知探索等级 ExploreLevelNotify", [
      "notify",
      e,
    ]);
  var o = ModelManager_1.ModelManager.ExploreLevelModel;
  for (const r of e.bPs) o.SetCountryExploreLevel(r.bVn, r.xPs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExploreLevelNotify);
}),
  (ExploreLevelController._Vt = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "ExploreLevel",
        8,
        "服务端返回探索评分奖励 ExploreScoreRewardResponse",
        ["response", e],
      ),
      e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnExploreScoreRewardResponse,
        );
  });
//# sourceMappingURL=ExploreLevelController.js.map
