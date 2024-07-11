"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreLevelController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreLevelController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(23940, ExploreLevelController.l5t);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(23940);
  }
  static ExploreScoreRewardRequest(e, o) {
    const r = new Protocol_1.Aki.Protocol.sJn();
    (r.wFn = e),
      (r.e5n = o),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "客户端请求请求探索进度评分奖励 ExploreScoreRewardRequest",
          ["request", r],
        ),
      Net_1.Net.Call(16043, r, this._5t);
  }
  static CountryExploreScoreInfoRequest(l, s) {
    const e = new Protocol_1.Aki.Protocol.hJn();
    (e.t5n = l),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "客户端请求国家探索评分信息 CountryExploreScoreInfoRequest",
          ["request", e],
        );
    Net_1.Net.Call(10593, e, (e) => {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "服务端返回国家探索评分信息 CountryExploreScoreInfoResponse",
          ["response", e],
        ),
        s && s();
      const o = ModelManager_1.ModelManager.ExploreLevelModel;
      for (const t of e.dLs) {
        const r = t.wFn;
        for (const n of t.e5n) o.SetCountryExploreScoreReceived(r, n, !0);
      }
      o.SetCountryExploreScore(l, e.cLs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
        );
    });
  }
  static async CountryExploreScoreInfoAsyncRequest(e) {
    var o = new Protocol_1.Aki.Protocol.hJn();
    var o =
      ((o.t5n = e),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "客户端请求国家探索评分信息 CountryExploreScoreInfoRequest",
          ["request", o],
        ),
      await Net_1.Net.CallAsync(10593, o));
    if (o) {
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "ExploreLevel",
          8,
          "服务端返回国家探索评分信息 CountryExploreScoreInfoResponse",
          ["response", o],
        );
      const r = ModelManager_1.ModelManager.ExploreLevelModel;
      for (const n of o.dLs) {
        const t = n.wFn;
        for (const l of n.e5n) r.SetCountryExploreScoreReceived(t, l, !0);
      }
      r.SetCountryExploreScore(e, o.cLs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnCountryExploreScoreInfoResponse,
        );
    }
  }
}
((exports.ExploreLevelController = ExploreLevelController).l5t = (e) => {
  Log_1.Log.CheckInfo() &&
    Log_1.Log.Info("ExploreLevel", 8, "服务端通知探索等级 ExploreLevelNotify", [
      "notify",
      e,
    ]);
  const o = ModelManager_1.ModelManager.ExploreLevelModel;
  for (const r of e.CLs) o.SetCountryExploreLevel(r.t5n, r.mLs);
  EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnExploreLevelNotify);
}),
  (ExploreLevelController._5t = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "ExploreLevel",
        8,
        "服务端返回探索评分奖励 ExploreScoreRewardResponse",
        ["response", e],
      ),
      e.lkn === Protocol_1.Aki.Protocol.lkn.Sys &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnExploreScoreRewardResponse,
        );
  });
// # sourceMappingURL=ExploreLevelController.js.map
