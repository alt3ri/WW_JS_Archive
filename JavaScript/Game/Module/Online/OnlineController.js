"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineController = void 0);
const Log_1 = require("../../../Core/Common/Log");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController");
const OnlineHallData_1 = require("./OnlineHallData");
const OnlineModel_1 = require("./OnlineModel");
const LIST_REQUEST_CD = 30;
class OnlineController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      (OnlineController.Uqi =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "netstate_push_interval",
        ) * TimeUtil_1.TimeUtil.InverseMillisecond),
      (OnlineController.Aqi =
        CommonParamById_1.configCommonParamById.GetIntConfig("netstate_great")),
      (OnlineController.Pqi =
        CommonParamById_1.configCommonParamById.GetIntConfig("netstate_good")),
      (OnlineController.xqi =
        CommonParamById_1.configCommonParamById.GetIntConfig("netstate_weak")),
      !0
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDone,
      OnlineController.b4e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFinishLoadingState,
        OnlineController.wqi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        OnlineController.E3t,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      OnlineController.b4e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFinishLoadingState,
        OnlineController.wqi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ScenePlayerLeaveScene,
        OnlineController.E3t,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(7337, OnlineController.ApplyJoinWorldNotify),
      Net_1.Net.Register(24023, OnlineController.AgreeJoinResultNotify),
      Net_1.Net.Register(21212, OnlineController.AllApplyJoinNotify),
      Net_1.Net.Register(7487, OnlineController.JoinWorldTeamNotify),
      Net_1.Net.Register(20308, OnlineController.PlayerLeaveWorldTeamNotify),
      Net_1.Net.Register(7081, OnlineController.PlayerEnterWorldTeamNotify),
      Net_1.Net.Register(
        7355,
        OnlineController.WorldTeamPlayerInfoChangeNotify,
      ),
      Net_1.Net.Register(
        28527,
        OnlineController.UpdateWorldTeamPlayerFightInfoNotify,
      ),
      Net_1.Net.Register(6968, OnlineController.ReceiveRechallengeNotify),
      Net_1.Net.Register(19634, OnlineController.InviteRechallengeNotify),
      Net_1.Net.Register(
        14623,
        OnlineController.ReceiveRechallengePlayerIdsNotify,
      ),
      Net_1.Net.Register(6400, OnlineController.PlayerNetStateNotify),
      Net_1.Net.Register(9468, OnlineController.MatchChangePlayerUiStateNotify),
      Net_1.Net.Register(4796, OnlineController.PlayerTeleportStateNotify),
      Net_1.Net.Register(25706, OnlineController.ApplyerEnterSceneNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(7337),
      Net_1.Net.UnRegister(24023),
      Net_1.Net.UnRegister(20308),
      Net_1.Net.UnRegister(7487),
      Net_1.Net.UnRegister(21212),
      Net_1.Net.UnRegister(7081),
      Net_1.Net.UnRegister(7355),
      Net_1.Net.UnRegister(28527),
      Net_1.Net.UnRegister(6968),
      Net_1.Net.UnRegister(19634),
      Net_1.Net.UnRegister(14623),
      Net_1.Net.UnRegister(6400),
      Net_1.Net.UnRegister(9468),
      Net_1.Net.UnRegister(4796),
      Net_1.Net.UnRegister(25706);
  }
  static RefreshWorldList() {
    const e = TimeUtil_1.TimeUtil.GetServerTime();
    return (
      e - OnlineController.FVt > LIST_REQUEST_CD &&
      (ModelManager_1.ModelManager.OnlineModel.CleanFriendWorldList(),
      ModelManager_1.ModelManager.OnlineModel.CleanStrangerWorldList(),
      OnlineController.LobbyListRequest(!1),
      OnlineController.LobbyListRequest(!0),
      (OnlineController.FVt = e),
      !0)
    );
  }
  static OnTick(e) {
    ModelManager_1.ModelManager.GameModeModel.WorldDone &&
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (OnlineController.Bqi > OnlineController.Uqi &&
        ((OnlineController.Bqi -= OnlineController.Uqi),
        OnlineController.PlayerNetStatePush()),
      (OnlineController.Bqi += e));
  }
  static LobbyListRequest(l) {
    const e = new Protocol_1.Aki.Protocol.Qcs();
    (e.e8n = l),
      Net_1.Net.Call(18887, e, (e) => {
        if (
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
              "协议id",
              "9663" + Protocol_1.Aki.Protocol.Xcs.name,
            ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys)
        )
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            15020,
          );
        else
          for (const o of e.Y5n) {
            const n = new OnlineHallData_1.OnlineHallData(o);
            l
              ? ModelManager_1.ModelManager.OnlineModel.PushFriendWorldList(n)
              : ModelManager_1.ModelManager.OnlineModel.PushStrangerWorldList(
                  n,
                );
          }
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnRefreshWorldList,
        );
      });
  }
  static WorldEnterPermissionsRequest(e) {
    const n = new Protocol_1.Aki.Protocol.Ocs();
    (n.Ikn = e),
      Net_1.Net.Call(28642, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9671" + Protocol_1.Aki.Protocol.kcs.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                14015,
              )
            : (ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(
                e.Ikn,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRefreshPermissionsSetting,
              ));
      });
  }
  static ApplyJoinWorldRequest(e, n) {
    const o = new Protocol_1.Aki.Protocol.Ncs();
    (o.aFn = e),
      (o.t8n = n),
      Net_1.Net.Call(7899, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9669" + Protocol_1.Aki.Protocol.Fcs.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              14476,
              e.Fms,
            );
      });
  }
  static bqi() {
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
    const e = new Protocol_1.Aki.Protocol.Ycs();
    (e.aFn = n),
      Net_1.Net.Call(8821, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9661" + Protocol_1.Aki.Protocol.Jcs.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrLobbyTryQuerySelf
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "CanNotSearchSelf",
                )
              : e.lkn === Protocol_1.Aki.Protocol.lkn.Proto_ErrHostOffline
                ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                    "OnlineInvalidUserId",
                  )
                : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.lkn,
                    27989,
                  )
            : (e = e.pbs) && e.aFn !== 0
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
    const o = new Protocol_1.Aki.Protocol.$cs();
    (o.aFn = n),
      (o.i8n = e),
      Net_1.Net.Call(24130, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9666" + Protocol_1.Aki.Protocol.Hcs.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                1697,
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
    const e = new Protocol_1.Aki.Protocol.ios();
    (e.K5n = n),
      Net_1.Net.Call(26132, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9666" + Protocol_1.Aki.Protocol.ros.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                1697,
              )
            : ((e = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
              ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
                e,
                n,
              ));
      });
  }
  static CheckPlayerNetHealthy(e) {
    let n;
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e
      ? ((n = this.GetNetPingState(Net_1.Net.RttMs)), this.IsNetStateGood(n))
      : !!(n =
          ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e)) &&
          this.IsNetStateGood(n.PingState);
  }
  static IsNetStateGood(e) {
    return (
      e === Protocol_1.Aki.Protocol.oFs.Proto_GREAT ||
      e === Protocol_1.Aki.Protocol.oFs.Proto_GOOD
    );
  }
  static ApplyRechallengeRequest(e) {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    const n = new Protocol_1.Aki.Protocol.Oss();
    (n.V5n = e),
      Net_1.Net.Call(13121, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9624" + Protocol_1.Aki.Protocol.kss.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              16522,
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
  static ReceiveRechallengeRequest() {
    const e = new Protocol_1.Aki.Protocol.Fss();
    Net_1.Net.Call(28900, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
          "协议id",
          "9624" + Protocol_1.Aki.Protocol.Vss.name,
        ]),
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            12176,
          );
    });
  }
  static InviteRechallengeRequest() {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    const e = new Protocol_1.Aki.Protocol.$ss();
    Net_1.Net.Call(11267, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
          "协议id",
          "9624" + Protocol_1.Aki.Protocol.kss.name,
        ]),
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              16522,
            )
          : (UiManager_1.UiManager.OpenView("OnlineChallengeStateView"),
            UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView") &&
              UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"));
    });
  }
  static LeaveWorldTeamRequest(e) {
    const n = new Protocol_1.Aki.Protocol.ids();
    (n.aFn = e),
      Net_1.Net.Call(19381, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9624" + Protocol_1.Aki.Protocol.rds.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.lkn,
                20914,
              )
            : ModelManager_1.ModelManager.OnlineModel.ClearOnlineTeamMap();
      });
  }
  static KickWorldTeamRequest(e) {
    const n = new Protocol_1.Aki.Protocol.ods();
    (n.aFn = e),
      Net_1.Net.Call(1996, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9626" + Protocol_1.Aki.Protocol.nds.name,
          ]),
          e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.lkn,
              29330,
            );
      });
  }
  static PlayerNetStatePush() {
    var e = new Protocol_1.Aki.Protocol.lds();
    var n = Net_1.Net.RttMs;
    var e =
      ((e.r8n = n),
      Net_1.Net.Send(3429, e),
      ModelManager_1.ModelManager.PlayerInfoModel.GetId());
    var n = this.GetNetPingState(n);
    const o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(e);
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
      ? Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN
      : e <= OnlineController.Aqi
        ? Protocol_1.Aki.Protocol.oFs.Proto_GREAT
        : e <= OnlineController.Pqi
          ? Protocol_1.Aki.Protocol.oFs.Proto_GOOD
          : e <= OnlineController.xqi
            ? Protocol_1.Aki.Protocol.oFs.Proto_POOR
            : Protocol_1.Aki.Protocol.oFs.Proto_UNKNOWN;
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "OnlineWorldHallView",
      OnlineController.V4e,
      "OnlineController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "OnlineWorldHallView",
      OnlineController.V4e,
    );
  }
  static ShowTipsWhenOnlineDisabled() {
    if (!ModelManager_1.ModelManager.OnlineModel.IsOnlineDisabled()) return !0;
    let e;
    let n;
    const o = ModelManager_1.ModelManager.OnlineModel.GetOnlineDisabledSource();
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
  static qqi() {
    const e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(136);
    e.SetCloseFunction(() => {
      ControllerHolder_1.ControllerHolder.KuroSdkController.PostKuroSdkEvent(5);
    }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowNetWorkConfirmBoxView(
        e,
      );
  }
}
(exports.OnlineController = OnlineController),
  ((_a = OnlineController).FVt = 0),
  (OnlineController.Gqi = !1),
  (OnlineController.Bqi = 0),
  (OnlineController.b4e = () => {
    ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(
      ModelManager_1.ModelManager.FunctionModel.GetWorldPermission(),
    );
  }),
  (OnlineController.E3t = (e) => {
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
      ));
  }),
  (OnlineController.wqi = () => {
    OnlineController.Gqi &&
      ((OnlineController.Gqi = !1),
      ModelManager_1.ModelManager.DeadReviveModel.AllDead) &&
      UiManager_1.UiManager.OpenView("ReviveView"),
      OnlineController.Nqi &&
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          OnlineController.Nqi[0],
          OnlineController.Nqi[1],
        ),
        (OnlineController.Nqi = void 0));
  }),
  (OnlineController.ApplyJoinWorldNotify = (e) => {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
          "协议id",
          "9667" + Protocol_1.Aki.Protocol.Vcs.name,
        ]),
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
        !OnlineController.bqi())
    ) {
      const n = new OnlineHallData_1.OnlineApplyData(
        e.Rgs,
        e.aFn,
        e.fbs,
        e.$gs,
        e.r3n,
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
    e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ApplyRefused",
          e.Rgs,
        )
      : (OnlineController.Nqi = ["EnteringOtherWorld", [e.Rgs]]);
  }),
  (OnlineController.AllApplyJoinNotify = (e) => {
    for (const n of e.vbs) {
      const o = new OnlineHallData_1.OnlineApplyData(
        n.Rgs,
        n.aFn,
        n.fbs,
        n.$gs,
        n.r3n,
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
        "9620 " + Protocol_1.Aki.Protocol.Zcs.name,
      ]);
    const o = ModelManager_1.ModelManager.OnlineModel;
    const l = (o.ClearWorldTeamPlayerFightInfo(), n.ZEs.length);
    let r = 0;
    for (let e = 0; e < l; e++) {
      const t = n.ZEs[e];
      let a = new OnlineHallData_1.OnlineTeamData(
        t.Rgs,
        t.aFn,
        t.r3n,
        t.$gs,
        t.l5n,
        e + 1,
        t.pbs,
        t.Sbs,
      );
      const i =
        (ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(a),
        new Array());
      for (const M of t.Mbs.FLs) {
        const _ = new OnlineHallData_1.WorldTeamRoleInfo(M.l3n, M.XAs);
        (_.RoleIndex = r++), i.push(_);
      }
      a = new OnlineHallData_1.WorldTeamPlayerFightInfo(
        ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
          t.aFn,
        ).Name,
        t.aFn,
        t.Mbs.z4n,
        i,
      );
      o.PushWorldTeamPlayerFightInfo(a);
    }
    ModelManager_1.ModelManager.OnlineModel.SetTeamOwnerId(n.qps),
      ModelManager_1.ModelManager.DeadReviveModel.AllDead &&
        (OnlineController.Gqi = !0),
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
        "9621 " + Protocol_1.Aki.Protocol.eds.name,
      ]);
    const n = e.aFn;
    const o = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(n);
    if (o.IsSelf) {
      if (!ModelManager_1.ModelManager.GameModeModel.WorldDone)
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Formation", 5, "离开队伍时世界未加载完成"),
          void _a.qqi()
        );
      UiManager_1.UiManager.IsViewOpen("OnlineWorldHallView") &&
        UiManager_1.UiManager.CloseView("OnlineWorldHallView"),
        n !== ModelManager_1.ModelManager.OnlineModel.OwnerId &&
          e.V5n === Protocol_1.Aki.Protocol.iFs.Proto_Dissolve &&
          (OnlineController.Nqi = ["LeaderExitOnlineTeam", [o.Name]]),
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
        "9621 " + Protocol_1.Aki.Protocol.tds.name,
      ]);
    var e = e.pys;
    const n = new OnlineHallData_1.OnlineTeamData(
      e.Rgs,
      e.aFn,
      e.r3n,
      e.$gs,
      e.l5n,
      ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() + 1,
      e.pbs,
      e.Sbs,
    );
    const o = new Array();
    for (const t of e.Mbs.FLs) {
      const l = new OnlineHallData_1.WorldTeamRoleInfo(t.l3n, t.XAs);
      o.push(l);
    }
    const r = new OnlineHallData_1.WorldTeamPlayerFightInfo(
      e.Rgs,
      e.aFn,
      e.Mbs.z4n,
      o,
    );
    ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(n),
      ModelManager_1.ModelManager.OnlineModel.PushWorldTeamPlayerFightInfo(r),
      ModelManager_1.ModelManager.OnlineModel.WorldTeamPlayerResetIndex(),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "IsEnteringWorld",
        e.Rgs,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
      );
  }),
  (OnlineController.WorldTeamPlayerInfoChangeNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9619 " + Protocol_1.Aki.Protocol.zcs.name,
      ]);
    const n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
      e.aFn,
    );
    if (n) {
      switch (e.TIs) {
        case Protocol_1.Aki.Protocol.rFs.Proto_Head:
          n.HeadId = e.Z3n;
          break;
        case Protocol_1.Aki.Protocol.rFs.r3n:
          n.Level = e.Z3n;
          break;
        case Protocol_1.Aki.Protocol.rFs.e4n:
          n.Name = e.t4n;
          break;
        case Protocol_1.Aki.Protocol.rFs.l5n:
          n.Signature = e.t4n;
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
    const n = e.Mbs;
    const o =
      ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
        e.aFn,
      );
    if (o) {
      const i = n.FLs;
      const l = o.GetIsDiffRoleList(i);
      const r = ModelManager_1.ModelManager.SceneTeamModel;
      const t = ModelManager_1.ModelManager.OnlineModel;
      if (((o.CurRoleId = n.z4n), l)) {
        const i = new Array();
        for (const _ of n.FLs) {
          const a = new OnlineHallData_1.WorldTeamRoleInfo(_.l3n, _.XAs);
          i.push(a);
        }
        (o.RoleInfos = i), t.WorldTeamPlayerResetIndex();
      } else
        for (const M of r.GetTeamItemsByPlayer(e.aFn))
          M.SetRemoteIsControl(M.GetConfigId === n.z4n);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Formation", 5, "获取WorldTeamPlayerFightInfo失败", [
          "playerId",
          e.aFn,
        ]);
  }),
  (OnlineController.ReceiveRechallengeNotify = (e) => {
    var e = e.aFn;
    const n =
      (ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
        e,
        0,
      ),
      ModelManager_1.ModelManager.PlayerInfoModel.GetId());
    e === ModelManager_1.ModelManager.OnlineModel.OwnerId &&
      ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
        n,
      ) === 0 &&
      UiManager_1.UiManager.OpenView("OnlineChallengeStateView"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PlayerChallengeStateChange,
        e,
        0,
      );
  }),
  (OnlineController.InviteRechallengeNotify = (e) => {
    (ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
      ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
    ) === 0 &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam()) ||
      (ModelManager_1.ModelManager.OnlineModel.SetChallengeApplyPlayerId(e.QUs),
      UiManager_1.UiManager.IsViewOpen("OnlineChallengeStateView")) ||
      UiManager_1.UiManager.OpenView("OnlineChallengeApplyView");
  }),
  (OnlineController.ReceiveRechallengePlayerIdsNotify = (e) => {
    ModelManager_1.ModelManager.OnlineModel.ResetContinuingChallengeConfirmState();
    for (const n of e.XUs)
      ModelManager_1.ModelManager.OnlineModel.SetContinuingChallengeConfirmState(
        n,
        0,
      );
  }),
  (OnlineController.PlayerNetStateNotify = (e) => {
    const n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
      e.aFn,
    );
    n &&
      ((n.PingState = e.Sbs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        e.aFn,
        n.PingState,
      ));
  }),
  (OnlineController.MatchChangePlayerUiStateNotify = (e) => {
    ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
      e.aFn,
      e.K5n,
    );
  }),
  (OnlineController.PlayerTeleportStateNotify = (e) => {
    let n;
    let o;
    const l = e.aFn;
    ModelManager_1.ModelManager.OnlineModel.SetPlayerTeleportState(l, e.Ebs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshPlayerUiState,
        l,
      ),
      l !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        ((n = e.Ebs === Protocol_1.Aki.Protocol.nFs.Proto_Default),
        ModelManager_1.ModelManager.OnlineModel.SetRoleActivated(l, n),
        n) &&
        (e.ybs
          ? (n = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(e.ybs.rkn),
            )) &&
            n.Entity &&
            ((o = n.Entity.GetComponent(3)),
            (e = Vector_1.Vector.Create(e.ybs.$kn.X, e.ybs.$kn.Y, e.ybs.$kn.Z)),
            o.FixBornLocation("队友传送完成", !0, e, !0),
            n.Entity.GetComponent(57)?.ClearReplaySamples())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiPlayerTeam",
              15,
              "队友传送完成通知缺失位置信息",
              ["playerId", l],
            ));
  }),
  (OnlineController.ApplyerEnterSceneNotify = (e) => {
    e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.lkn);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
      9,
      void 0,
      void 0,
      [e],
    );
  }),
  (OnlineController.V4e = (e) =>
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
// # sourceMappingURL=OnlineController.js.map
