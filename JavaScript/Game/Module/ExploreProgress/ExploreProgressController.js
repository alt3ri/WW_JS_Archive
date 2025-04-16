"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
class ExploreProgressController extends UiControllerBase_1.UiControllerBase {
  static OnRegisterNetEvent() {
    Net_1.Net.Register(16755, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ExploreProgress",
          69,
          "服务端推送所有已经获取的区域探索度奖励ExploreProgressRewardIdsNotify",
          ["list", e.cOl],
        ),
        ModelManager_1.ModelManager.ExploreProgressModel.UpdateAreaStageRewardDataList(
          e.cOl,
        );
    });
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(16755);
  }
  static OnAddEvents() {
    super.OnAddEvents(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        ExploreProgressController.nye,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDoneAndCloseLoading,
      ExploreProgressController.nye,
    ),
      super.OnRemoveEvents();
  }
  static async AllExploreProgressAsyncRequest() {
    var e = ModelManager_1.ModelManager.ExploreProgressModel,
      r =
        (e.InitializeExploreAreaData(),
        e.InitializeCurrentCountryIdAndAreaId(),
        new Protocol_1.Aki.Protocol.nts()),
      e =
        ((r.WVn = e.GetAllAreaIdList()),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "ExploreProgress",
            63,
            "客户端请求区域探索度ExploreProgressRequest",
            ["request", r],
          ),
        await Net_1.Net.CallAsync(25296, r));
    this.$Vt(e);
  }
  static async ReceiveAreaStageRewardAsyncRequest(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ExploreProgress",
        69,
        "客户端请求领取区域探索进度奖励ReceiveAreaStageRewardRequest",
        ["rewardIds", e],
      );
    var r = new Protocol_1.Aki.Protocol.jp_(),
      e = ((r.cOl = e), await Net_1.Net.CallAsync(27537, r));
    this.LOl(e);
  }
  static async QueryOnlinePlayersAreaAsyncRequest() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Map",
        69,
        "ExploreProgressController.QueryOnlinePlayersAreaAsyncRequest Proto_QueryOnlinePlayersAreaRequest",
      );
    var e = new Protocol_1.Aki.Protocol.R0_(),
      e = await Net_1.Net.CallAsync(22176, e);
    this.UOl(e);
  }
}
(exports.ExploreProgressController = ExploreProgressController),
  ((_a = ExploreProgressController).nye = () => {
    _a.AllExploreProgressAsyncRequest();
  }),
  (ExploreProgressController.$Vt = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ExploreProgress",
        63,
        "服务端返回区域探索度ExploreProgressResponse",
        ["response", e],
      );
    var r = ModelManager_1.ModelManager.ExploreProgressModel;
    for (const o of e.GPs) r.RefreshExploreAreaData(o);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnExploreProgressResponse,
    );
  }),
  (ExploreProgressController.LOl = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "ExploreProgress",
        69,
        "服务端返回领取区域探索进度奖励ReceiveAreaStageRewardResponse",
        ["response", e],
      ),
      e?.cOl?.length &&
        (ModelManager_1.ModelManager.ExploreProgressModel.UpdateAreaStageRewardDataList(
          e.cOl,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnReceiveAreaStageRewardResponse,
          e.cOl,
        ));
  }),
  (ExploreProgressController.UOl = (e) => {
    var r;
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Map",
        69,
        "ExploreProgressController.QueryOnlinePlayersAreaResponse",
        ["A0_", e],
      ),
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ((r = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(
            e.Q4n,
          )),
          Log_1.Log.CheckDebug() && Log_1.Log.Debug("Map", 69, "Q4n", ["", r]))
        : ModelManager_1.ModelManager.ExploreProgressModel.UpdateOnlinePlayersArea(
            e.zL_,
          );
  });
//# sourceMappingURL=ExploreProgressController.js.map
