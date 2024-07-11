"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  OnlineHallData_1 = require("./OnlineHallData"),
  OnlineModel_1 = require("./OnlineModel"),
  LIST_REQUEST_CD = 30;
class OnlineController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      (OnlineController.UGi =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "netstate_push_interval",
        ) * TimeUtil_1.TimeUtil.InverseMillisecond),
      (OnlineController.AGi =
        CommonParamById_1.configCommonParamById.GetIntConfig("netstate_great")),
      (OnlineController.PGi =
        CommonParamById_1.configCommonParamById.GetIntConfig("netstate_good")),
      (OnlineController.xGi =
        CommonParamById_1.configCommonParamById.GetIntConfig("netstate_weak")),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.ScenePlayerLeaveScene,
      OnlineController.y4t,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        OnlineController.$5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFinishLoadingState,
        OnlineController.wGi,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.ScenePlayerLeaveScene,
      OnlineController.y4t,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        OnlineController.$5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFinishLoadingState,
        OnlineController.wGi,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(5709, OnlineController.ApplyJoinWorldNotify),
      Net_1.Net.Register(12847, OnlineController.AgreeJoinResultNotify),
      Net_1.Net.Register(23482, OnlineController.AllApplyJoinNotify),
      Net_1.Net.Register(17840, OnlineController.JoinWorldTeamNotify),
      Net_1.Net.Register(25439, OnlineController.PlayerLeaveWorldTeamNotify),
      Net_1.Net.Register(17966, OnlineController.PlayerEnterWorldTeamNotify),
      Net_1.Net.Register(
        9146,
        OnlineController.WorldTeamPlayerInfoChangeNotify,
      ),
      Net_1.Net.Register(
        10751,
        OnlineController.UpdateWorldTeamPlayerFightInfoNotify,
      ),
      Net_1.Net.Register(24747, OnlineController.ReceiveRechallengeNotify),
      Net_1.Net.Register(2817, OnlineController.InviteRechallengeNotify),
      Net_1.Net.Register(
        27751,
        OnlineController.ReceiveRechallengePlayerIdsNotify,
      ),
      Net_1.Net.Register(9521, OnlineController.PlayerNetStateNotify),
      Net_1.Net.Register(
        23710,
        OnlineController.MatchChangePlayerUiStateNotify,
      ),
      Net_1.Net.Register(17029, OnlineController.PlayerTeleportStateNotify),
      Net_1.Net.Register(15428, OnlineController.ApplyerEnterSceneNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(5709),
      Net_1.Net.UnRegister(12847),
      Net_1.Net.UnRegister(25439),
      Net_1.Net.UnRegister(17840),
      Net_1.Net.UnRegister(23482),
      Net_1.Net.UnRegister(17966),
      Net_1.Net.UnRegister(9146),
      Net_1.Net.UnRegister(10751),
      Net_1.Net.UnRegister(24747),
      Net_1.Net.UnRegister(2817),
      Net_1.Net.UnRegister(27751),
      Net_1.Net.UnRegister(9521),
      Net_1.Net.UnRegister(23710),
      Net_1.Net.UnRegister(17029),
      Net_1.Net.UnRegister(15428);
  }
  static RefreshWorldList() {
    var e = TimeUtil_1.TimeUtil.GetServerTime();
    return (
      e - OnlineController.F6t > LIST_REQUEST_CD &&
      (ModelManager_1.ModelManager.OnlineModel.CleanFriendWorldList(),
      ModelManager_1.ModelManager.OnlineModel.CleanStrangerWorldList(),
      OnlineController.LobbyListRequest(!1),
      OnlineController.LobbyListRequest(!0),
      (OnlineController.F6t = e),
      !0)
    );
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.GameModeModel.WorldDone &&
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (OnlineController.BGi > OnlineController.UGi &&
        ((OnlineController.BGi -= OnlineController.UGi),
        OnlineController.PlayerNetStatePush()),
      (OnlineController.BGi += e));
  }
  static LobbyListRequest(l) {
    var e = new Protocol_1.Aki.Protocol.$0s();
    (e.B7n = l),
      Net_1.Net.Call(28280, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
              "协议id",
              "9663" + Protocol_1.Aki.Protocol.H0s.name,
            ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs)
        )
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            26384,
          );
        else
          for (const o of e.U9n) {
            var n = new OnlineHallData_1.OnlineHallData(o);
            l
              ? ModelManager_1.ModelManager.OnlineModel.PushFriendWorldList(n)
              : ModelManager_1.ModelManager.OnlineModel.PushStrangerWorldList(
                  n,
                );
          }
        ModelManager_1.ModelManager.OnlineModel.SortWorldList(l),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRefreshWorldList,
          );
      });
  }
  static WorldEnterPermissionsRequest(e) {
    var n = new Protocol_1.Aki.Protocol.x0s();
    (n.Z4n = e),
      Net_1.Net.Call(1231, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9671" + Protocol_1.Aki.Protocol.b0s.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                25262,
              )
            : (ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(
                e.Z4n,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRefreshPermissionsSetting,
              ));
      });
  }
  static ApplyJoinWorldRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.B0s();
    (o.q5n = e),
      (o.w7n = n),
      Net_1.Net.Call(1119, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9669" + Protocol_1.Aki.Protocol.q0s.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              18254,
              e.ivs,
            );
      });
  }
  static bGi() {
    return (
      !!(
        UiManager_1.UiManager.IsViewOpen("CycleTowerView") ||
        UiManager_1.UiManager.IsViewOpen("CycleTowerChallengeView") ||
        UiManager_1.UiManager.IsViewOpen("CycleTowerTeamView")
      ) ||
      !!(
        UiManager_1.UiManager.IsViewOpen("SingleTimeTowerView") ||
        UiManager_1.UiManager.IsViewOpen("SingleTimeTowerChallengeView") ||
        UiManager_1.UiManager.IsViewOpen("SingleTimeTowerTeamView")
      )
    );
  }
  static LobbyQueryPlayersRequest(n) {
    var e = new Protocol_1.Aki.Protocol.j0s();
    (e.q5n = n),
      Net_1.Net.Call(27974, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9661" + Protocol_1.Aki.Protocol.W0s.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrLobbyTryQuerySelf
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "CanNotSearchSelf",
                )
              : e.O4n === Protocol_1.Aki.Protocol.O4n.Proto_ErrHostOffline
                ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "OnlineInvalidUserId",
                  )
                : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.O4n,
                    6220,
                  )
            : (e = e.aOs) && 0 !== e.q5n
              ? (ModelManager_1.ModelManager.OnlineModel.CleanSearchResultList(),
                (e = new OnlineHallData_1.OnlineHallData(e)),
                ModelManager_1.ModelManager.OnlineModel.PushSearchResultList(e),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnSearchWorld,
                  n,
                ))
              : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "OnlineInvalidUserId",
                );
      });
  }
  static AgreeJoinResultRequest(n, e) {
    var o = new Protocol_1.Aki.Protocol.O0s();
    (o.q5n = n),
      (o.b7n = e),
      Net_1.Net.Call(15318, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9666" + Protocol_1.Aki.Protocol.k0s.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                24501,
              )
            : (ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(
                n,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRefreshApply,
              ));
      });
  }
  static MatchChangePlayerUiStateRequest(n) {
    var e = new Protocol_1.Aki.Protocol.ehs();
    (e.T9n = n),
      Net_1.Net.Call(1747, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9666" + Protocol_1.Aki.Protocol.ths.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                24501,
              )
            : ((e = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
              ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
                e,
                n,
              ));
      });
  }
  static CheckPlayerNetHealthy(e) {
    var n;
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e
      ? ((n = this.GetNetPingState(Net_1.Net.RttMs)), this.IsNetStateGood(n))
      : !!(n =
          ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)) &&
          this.IsNetStateGood(n.PingState);
  }
  static IsNetStateGood(e) {
    return (
      e === Protocol_1.Aki.Protocol.Y8s.Proto_GREAT ||
      e === Protocol_1.Aki.Protocol.Y8s.Proto_GOOD
    );
  }
  static ApplyRechallengeRequest(e) {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    var n = new Protocol_1.Aki.Protocol.b1s();
    (n.E9n = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
      ),
      Net_1.Net.Call(12703, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "MultiPlayerTeam",
            5,
            "协议接收",
            ["协议id", "9624" + Protocol_1.Aki.Protocol.B1s.name],
            ["response", e],
          ),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              18836,
            ),
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "HaveInvite",
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "HaveSuggest",
              );
      });
  }
  static ReceiveRechallengeRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.G1s();
    (o.b7n = e
      ? Protocol_1.Aki.Protocol.SRa.Proto_Accept
      : n
        ? Protocol_1.Aki.Protocol.SRa.Proto_ActiveRefuse
        : Protocol_1.Aki.Protocol.SRa.Proto_TimeOutRefuse),
      Net_1.Net.Call(24071, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9624" + Protocol_1.Aki.Protocol.O1s.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              15391,
            );
      });
  }
  static InviteRechallengeRequest() {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    var e = new Protocol_1.Aki.Protocol.k1s();
    Net_1.Net.Call(3393, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
          "协议id",
          "9624" + Protocol_1.Aki.Protocol.k1s.name,
        ]),
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              4683,
            )
          : (UiManager_1.UiManager.OpenView("OnlineChallengeStateView"),
            UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView") &&
              UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"));
    });
  }
  static LeaveWorldTeamRequest(e) {
    var n = new Protocol_1.Aki.Protocol.J0s();
    (n.q5n = e),
      Net_1.Net.Call(4442, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9624" + Protocol_1.Aki.Protocol.z0s.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                24336,
              )
            : ModelManager_1.ModelManager.OnlineModel.ClearOnlineTeamMap();
      });
  }
  static KickWorldTeamRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Z0s();
    (n.q5n = e),
      Net_1.Net.Call(21614, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9626" + Protocol_1.Aki.Protocol.egs.name,
          ]),
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.O4n,
              14162,
            );
      });
  }
  static PlayerNetStatePush() {
    var e = new Protocol_1.Aki.Protocol.ogs(),
      n = Net_1.Net.RttMs,
      e =
        ((e.q7n = n),
        Net_1.Net.Send(4357, e),
        ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
      n = this.GetNetPingState(n),
      o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e);
    o &&
      o.PingState !== n &&
      ((o.PingState = n),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        e,
        n,
      ));
  }
  static GetNetPingState(e) {
    return e < 0
      ? Protocol_1.Aki.Protocol.Y8s.Proto_UNKNOWN
      : e <= OnlineController.AGi
        ? Protocol_1.Aki.Protocol.Y8s.Proto_GREAT
        : e <= OnlineController.PGi
          ? Protocol_1.Aki.Protocol.Y8s.Proto_GOOD
          : e <= OnlineController.xGi
            ? Protocol_1.Aki.Protocol.Y8s.Proto_POOR
            : Protocol_1.Aki.Protocol.Y8s.Proto_UNKNOWN;
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "OnlineWorldHallView",
      OnlineController.iVe,
      "OnlineController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "OnlineWorldHallView",
      OnlineController.iVe,
    );
  }
  static ShowTipsWhenOnlineDisabled() {
    if (!ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled()) return !0;
    var e,
      n,
      o = ModelManager_1.ModelManager.OnlineModel.GetOnlineDisabledSource();
    if (!o) return !0;
    for ([e, n] of o)
      switch (n) {
        case 0:
          var l = ModelManager_1.ModelManager.QuestNewModel.GetQuest(e).Name;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            OnlineModel_1.onlineDisabledSourceTipsId[n],
            l,
          );
          break;
        case 1:
          l =
            ModelManager_1.ModelManager.LevelPlayModel.GetProcessingLevelPlayInfo(
              e,
            ).Name;
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            OnlineModel_1.onlineDisabledSourceTipsId[n],
            l,
          );
          break;
        default:
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            OnlineModel_1.onlineDisabledSourceTipsId[n],
          );
      }
    return !1;
  }
  static qGi() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(136);
    e.SetCloseFunction(() => {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
        e,
      );
  }
}
(exports.OnlineController = OnlineController),
  ((_a = OnlineController).F6t = 0),
  (OnlineController.BGi = 0),
  (OnlineController.$5e = () => {
    ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(
      ModelManager_1.ModelManager.FunctionModel.GetWorldPermission(),
    );
  }),
  (OnlineController.y4t = (e) => {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      (ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
        e,
        1,
      ),
      ModelManager_1.ModelManager.OnlineModel.SetAllowInitiate(!1),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlayerChallengeStateChange,
        e,
        1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
      ));
  }),
  (OnlineController.wGi = () => {
    OnlineController.NGi &&
      (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        OnlineController.NGi[0],
        OnlineController.NGi[1],
      ),
      (OnlineController.NGi = void 0));
  }),
  (OnlineController.ApplyJoinWorldNotify = (e) => {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
          "协议id",
          "9667" + Protocol_1.Aki.Protocol.G0s.name,
        ]),
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
        !OnlineController.bGi())
    ) {
      const n = new OnlineHallData_1.OnlineApplyData(
        e.HMs,
        e.q5n,
        e.nOs,
        e.sSs,
        e.P6n,
      );
      ModelManager_1.ModelManager.OnlineModel.PushCurrentApplyList(n),
        ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1 &&
          UiManager_1.UiManager.OpenView("OnlineApplyView"),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply),
        TimerSystem_1.TimerSystem.Delay(() => {
          ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(
            n.PlayerId,
          ) &&
            (ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(
              n.PlayerId,
            ),
            OnlineController.AgreeJoinResultRequest(n.PlayerId, !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshApply,
            ));
        }, n.ApplyTimeLeftTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
  }),
  (OnlineController.AgreeJoinResultNotify = (e) => {
    e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ApplyRefused",
          e.HMs,
        )
      : (OnlineController.NGi = ["EnteringOtherWorld", [e.HMs]]);
  }),
  (OnlineController.AllApplyJoinNotify = (e) => {
    for (const n of e.sOs) {
      const o = new OnlineHallData_1.OnlineApplyData(
        n.HMs,
        n.q5n,
        n.nOs,
        n.sSs,
        n.P6n,
      );
      ModelManager_1.ModelManager.OnlineModel.PushCurrentApplyList(o),
        TimerSystem_1.TimerSystem.Delay(() => {
          ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(
            o.PlayerId,
          ) &&
            (ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(
              o.PlayerId,
            ),
            OnlineController.AgreeJoinResultRequest(o.PlayerId, !1),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshApply,
            ));
        }, o.ApplyTimeLeftTime * TimeUtil_1.TimeUtil.InverseMillisecond);
    }
    ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1 &&
      UiManager_1.UiManager.OpenView("OnlineApplyView"),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
  }),
  (OnlineController.JoinWorldTeamNotify = (n) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9620 " + Protocol_1.Aki.Protocol.Q0s.name,
      ]);
    var o = ModelManager_1.ModelManager.OnlineModel,
      l = (o.ClearWorldTeamPlayerFightInfo(), n.vRs.length);
    let r = 0;
    for (let e = 0; e < l; e++) {
      var t = n.vRs[e],
        a = new OnlineHallData_1.OnlineTeamData(
          t.HMs,
          t.q5n,
          t.P6n,
          t.sSs,
          t.HVn,
          e + 1,
          t.aOs,
          t.lOs,
        ),
        i =
          (ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(a),
          new Array());
      for (const M of t.hOs.sUs) {
        var _ = new OnlineHallData_1.WorldTeamRoleInfo(M.O6n, M.Cbs);
        (_.RoleIndex = r++), i.push(_);
      }
      a = new OnlineHallData_1.WorldTeamPlayerFightInfo(
        ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
          t.q5n,
        ).Name,
        t.q5n,
        t.hOs.PVn,
        i,
      );
      o.PushWorldTeamPlayerFightInfo(a);
    }
    ModelManager_1.ModelManager.OnlineModel.SetTeamOwnerId(n.zys),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.ResetToBattleView,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
      );
  }),
  (OnlineController.PlayerLeaveWorldTeamNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9621 " + Protocol_1.Aki.Protocol.X0s.name,
      ]);
    var n = e.q5n,
      o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(n);
    if (o.IsSelf) {
      if (!ModelManager_1.ModelManager.GameModeModel.WorldDone)
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Formation", 5, "离开队伍时世界未加载完成"),
          void _a.qGi()
        );
      UiManager_1.UiManager.IsViewOpen("OnlineWorldHallView") &&
        UiManager_1.UiManager.CloseView("OnlineWorldHallView"),
        n !== ModelManager_1.ModelManager.OnlineModel.OwnerId &&
          e.E9n === Protocol_1.Aki.Protocol.Q8s.Proto_Dissolve &&
          (OnlineController.NGi = ["LeaderExitOnlineTeam", [o.Name]]),
        ModelManager_1.ModelManager.OnlineModel.SetTeamOwnerId(-1),
        ModelManager_1.ModelManager.OnlineModel.ClearOnlineTeamMap(),
        ModelManager_1.ModelManager.OnlineModel.ClearPlayerTeleportState(),
        ModelManager_1.ModelManager.OnlineModel.ClearWorldTeamPlayerFightInfo(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnLeaveOnlineWorld,
        );
    } else
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "ExitOnlineTeam",
        o.Name,
      ),
        ModelManager_1.ModelManager.OnlineModel.ResetTeamDataPlayer(
          o.PlayerNumber,
        ),
        ModelManager_1.ModelManager.OnlineModel.DeleteCurrentTeamListById(n),
        ModelManager_1.ModelManager.OnlineModel.DeleteWorldTeamPlayerFightInfo(
          n,
        ),
        ModelManager_1.ModelManager.OnlineModel.DeletePlayerTeleportState(n);
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshOnlineTeamList,
    );
  }),
  (OnlineController.PlayerEnterWorldTeamNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9621 " + Protocol_1.Aki.Protocol.Y0s.name,
      ]);
    var e = e.ORs,
      n = new OnlineHallData_1.OnlineTeamData(
        e.HMs,
        e.q5n,
        e.P6n,
        e.sSs,
        e.HVn,
        ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() + 1,
        e.aOs,
        e.lOs,
      ),
      o = new Array();
    for (const t of e.hOs.sUs) {
      var l = new OnlineHallData_1.WorldTeamRoleInfo(t.O6n, t.Cbs);
      o.push(l);
    }
    var r = new OnlineHallData_1.WorldTeamPlayerFightInfo(
      e.HMs,
      e.q5n,
      e.hOs.PVn,
      o,
    );
    ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(n),
      ModelManager_1.ModelManager.OnlineModel.PushWorldTeamPlayerFightInfo(r),
      ModelManager_1.ModelManager.OnlineModel.WorldTeamPlayerResetIndex(),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "IsEnteringWorld",
        e.HMs,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
      );
  }),
  (OnlineController.WorldTeamPlayerInfoChangeNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9619 " + Protocol_1.Aki.Protocol.K0s.name,
      ]);
    var n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
      e.q5n,
    );
    if (n) {
      switch (e.HDs) {
        case Protocol_1.Aki.Protocol.X8s.Proto_Head:
          n.HeadId = e.B8n;
          break;
        case Protocol_1.Aki.Protocol.X8s.P6n:
          n.Level = e.B8n;
          break;
        case Protocol_1.Aki.Protocol.X8s.w8n:
          n.Name = e.b8n;
          break;
        case Protocol_1.Aki.Protocol.X8s.HVn:
          n.Signature = e.b8n;
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnWorldTeamPlayerInfoChanged,
          e,
        );
    }
  }),
  (OnlineController.UpdateWorldTeamPlayerFightInfoNotify = (e) => {
    var n = e.hOs,
      o = ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
        e.q5n,
      );
    if (o) {
      const i = n.sUs;
      var l = o.GetIsDiffRoleList(i),
        r = ModelManager_1.ModelManager.SceneTeamModel,
        t = ModelManager_1.ModelManager.OnlineModel;
      if (((o.CurRoleId = n.PVn), l)) {
        const i = new Array();
        for (const _ of n.sUs) {
          var a = new OnlineHallData_1.WorldTeamRoleInfo(_.O6n, _.Cbs);
          i.push(a);
        }
        (o.RoleInfos = i), t.WorldTeamPlayerResetIndex();
      } else
        for (const M of r.GetTeamItemsByPlayer(e.q5n))
          M.SetRemoteIsControl(M.GetConfigId === n.PVn);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Formation", 5, "获取WorldTeamPlayerFightInfo失败", [
          "playerId",
          e.q5n,
        ]);
  }),
  (OnlineController.ReceiveRechallengeNotify = (e) => {
    var n = e.q5n;
    e.b7n !== Protocol_1.Aki.Protocol.SRa.Proto_Accept
      ? (UiManager_1.UiManager.IsViewOpen("OnlineChallengeStateView") &&
          UiManager_1.UiManager.CloseView("OnlineChallengeStateView"),
        n !== ModelManager_1.ModelManager.PlayerInfoModel?.GetId() &&
          ((e =
            ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
              n,
            ).Name),
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "RefuseInviteMatch",
            e,
          )))
      : (ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
          n,
          0,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
        ),
        (e = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
        n === ModelManager_1.ModelManager.OnlineModel.OwnerId &&
          0 ===
            ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
              e,
            ) &&
          UiManager_1.UiManager.OpenView("OnlineChallengeStateView"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PlayerChallengeStateChange,
          n,
          0,
        ));
  }),
  (OnlineController.InviteRechallengeNotify = (e) => {
    var n =
      ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
        ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      );
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
    ),
      (0 === n && ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
        (ModelManager_1.ModelManager.OnlineModel.SetChallengeApplyPlayerId(
          e.d2s,
        ),
        UiManager_1.UiManager.IsViewOpen("OnlineChallengeStateView")) ||
        (UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView")
          ? EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnRefreshSuggestChallengePlayerInfo,
            )
          : UiManager_1.UiManager.OpenView("OnlineChallengeApplyView"));
  }),
  (OnlineController.ReceiveRechallengePlayerIdsNotify = (e) => {
    ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState();
    for (const n of e.m2s)
      ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
        n,
        0,
      ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
        );
  }),
  (OnlineController.PlayerNetStateNotify = (e) => {
    var n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
      e.q5n,
    );
    n &&
      ((n.PingState = e.lOs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        e.q5n,
        n.PingState,
      ));
  }),
  (OnlineController.MatchChangePlayerUiStateNotify = (e) => {
    ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
      e.q5n,
      e.T9n,
    );
  }),
  (OnlineController.PlayerTeleportStateNotify = (e) => {
    var n,
      o,
      l = e.q5n;
    ModelManager_1.ModelManager.OnlineModel.SetPlayerTeleportState(l, e._Os),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshPlayerUiState,
        l,
      ),
      l !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        ((n = e._Os === Protocol_1.Aki.Protocol.J8s.Proto_Default),
        ModelManager_1.ModelManager.OnlineModel.SetRoleActivated(l, n),
        n) &&
        (e.uOs
          ? (n = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(e.uOs.P4n),
            )) &&
            n.Entity &&
            ((o = n.Entity.GetComponent(3)),
            (e = Vector_1.Vector.Create(e.uOs.y5n.X, e.uOs.y5n.Y, e.uOs.y5n.Z)),
            o.FixBornLocation("队友传送完成", !0, e, !0),
            n.Entity.GetComponent(59)?.ClearReplaySamples())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiPlayerTeam",
              15,
              "队友传送完成通知缺失位置信息",
              ["playerId", l],
            ));
  }),
  (OnlineController.ApplyerEnterSceneNotify = (e) => {
    e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.O4n);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
      9,
      void 0,
      void 0,
      [e],
    );
  }),
  (OnlineController.iVe = (e) =>
    ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterOnlineTip",
        ),
        !1)
      : !(
          (!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
            !ModelManager_1.ModelManager.FunctionModel.IsOpen(10021)) ||
          (!ModelManager_1.ModelManager.GameModeModel.IsMulti &&
          ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
            ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "OnlineDisabledByInstance",
              ),
              1)
            : !OnlineController.ShowTipsWhenOnlineDisabled())
        ));
//# sourceMappingURL=OnlineController.js.map
