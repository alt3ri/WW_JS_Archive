"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineController = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
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
  LIST_REQUEST_CD = 30,
  NOTIFY_PLAYSTATION_CD = +TimeUtil_1.TimeUtil.InverseMillisecond;
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
      UE.KuroStaticPS5Library.AddJoinSessionDelegate(
        (0, puerts_1.toManualReleaseDelegate)(this._3a),
      ),
      !0
    );
  }
  static OnClear() {
    return UE.KuroStaticPS5Library.ClearJoinSessionDelegate(), !0;
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
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        OnlineController.zNa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCloseLoadingView,
        OnlineController.RXa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFinishLoadingState,
        OnlineController.wGi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSetGameModeDataDone,
        OnlineController.UXa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInputAnyKey,
        this.rAt,
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
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        OnlineController.zNa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCloseLoadingView,
        OnlineController.RXa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFinishLoadingState,
        OnlineController.wGi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSetGameModeDataDone,
        OnlineController.UXa,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(20906, OnlineController.ApplyJoinWorldNotify),
      Net_1.Net.Register(23043, OnlineController.AgreeJoinResultNotify),
      Net_1.Net.Register(28495, OnlineController.AllApplyJoinNotify),
      Net_1.Net.Register(19189, OnlineController.JoinWorldTeamNotify),
      Net_1.Net.Register(15309, OnlineController.PlayerLeaveWorldTeamNotify),
      Net_1.Net.Register(19414, OnlineController.PlayerEnterWorldTeamNotify),
      Net_1.Net.Register(
        23096,
        OnlineController.WorldTeamPlayerInfoChangeNotify,
      ),
      Net_1.Net.Register(
        25372,
        OnlineController.UpdateWorldTeamPlayerFightInfoNotify,
      ),
      Net_1.Net.Register(25315, OnlineController.ReceiveRechallengeNotify),
      Net_1.Net.Register(24304, OnlineController.InviteRechallengeNotify),
      Net_1.Net.Register(
        23633,
        OnlineController.ReceiveRechallengePlayerIdsNotify,
      ),
      Net_1.Net.Register(26184, OnlineController.PlayerNetStateNotify),
      Net_1.Net.Register(
        20682,
        OnlineController.MatchChangePlayerUiStateNotify,
      ),
      Net_1.Net.Register(15702, OnlineController.PlayerTeleportStateNotify),
      Net_1.Net.Register(26711, OnlineController.ApplyerEnterSceneNotify),
      Net_1.Net.Register(23736, OnlineController.PlayerPsnSessionNotify),
      Net_1.Net.Register(29021, OnlineController.SyncPlayerLocationNotify);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(20906),
      Net_1.Net.UnRegister(23043),
      Net_1.Net.UnRegister(15309),
      Net_1.Net.UnRegister(19189),
      Net_1.Net.UnRegister(28495),
      Net_1.Net.UnRegister(19414),
      Net_1.Net.UnRegister(23096),
      Net_1.Net.UnRegister(25372),
      Net_1.Net.UnRegister(25315),
      Net_1.Net.UnRegister(24304),
      Net_1.Net.UnRegister(23633),
      Net_1.Net.UnRegister(26184),
      Net_1.Net.UnRegister(20682),
      Net_1.Net.UnRegister(15702),
      Net_1.Net.UnRegister(26711),
      Net_1.Net.UnRegister(29021);
  }
  static jWa() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestricted(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      (e) => {
        1 === e &&
          (ControllerHolder_1.ControllerHolder.OnlineController.WorldEnterPermissionsRequest(
            Protocol_1.Aki.Protocol.Y8s.Proto_ForbidJoin,
          ),
          Log_1.Log.CheckInfo()) &&
          Log_1.Log.Info("InstanceDungeon", 28, "通信受限，禁止加入联机");
      },
    );
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
  static LobbyListRequest(n) {
    var e = new Protocol_1.Aki.Protocol.Y0s();
    (e.V7n = n),
      Net_1.Net.Call(23440, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9663" + Protocol_1.Aki.Protocol.J0s.name,
          ]),
          OnlineController.Gka(e, n);
      });
  }
  static async Gka(e, n) {
    var o,
      l = await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
    if (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
      ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
        e.Q4n,
        25284,
      );
    else
      for (const r of e.O9n)
        l.get(r.hwa) ||
          ((o = new OnlineHallData_1.OnlineHallData(r)),
          n
            ? ModelManager_1.ModelManager.OnlineModel.PushFriendWorldList(o)
            : ModelManager_1.ModelManager.OnlineModel.PushStrangerWorldList(o));
    ModelManager_1.ModelManager.OnlineModel.SortWorldList(n),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshWorldList,
      );
  }
  static WorldEnterPermissionsRequest(e) {
    var n = new Protocol_1.Aki.Protocol.N0s();
    (n.h5n = e),
      Net_1.Net.Call(22225, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9671" + Protocol_1.Aki.Protocol.F0s.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                22334,
              )
            : (ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(
                e.h5n,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRefreshPermissionsSetting,
              ));
      });
  }
  static ApplyJoinWorldRequest(e, n) {
    var o;
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
    OnlineController.CheckPlatformCanopen()
      ? (((o = new Protocol_1.Aki.Protocol.V0s()).W5n = e),
        (o.H7n = n),
        Net_1.Net.Call(19888, o, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
              "协议id",
              "9669" + Protocol_1.Aki.Protocol.$0s.name,
            ]),
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
              ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                17470,
                e.lvs,
              );
        }))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "MultiPlayerTeam",
          5,
          "ApplyJoinWorldRequest未通过PS5平台会员检测",
        );
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
  static async ePa(e) {
    if (
      1 ===
      (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      ))
    )
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MultiPlayerTeam", 28, "通信受限，拒绝申请");
    else if (
      !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      !OnlineController.bGi()
    ) {
      if (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "MultiPlayerTeam",
            28,
            "好友申请进入联机",
            ["accountId", e.hwa?.toString()],
            ["onlineId", e.Vxa?.toString()],
          ),
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().NeedCheckPlayOnly())
      )
        if (
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PlayOnly() &&
          "" === e.$xa
        )
          return;
      if (
        (e.$xa && [].push(e.$xa),
        (
          await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap()
        ).get(e.hwa))
      )
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 28, "SDK屏蔽好友列表", [
            "key",
            e.$xa.toString(),
          ]);
      else {
        const n = new OnlineHallData_1.OnlineApplyData(
          e.JMs,
          e.W5n,
          e.cOs,
          e.dSs,
          e.F6n,
          e.Vxa,
        );
        ModelManager_1.ModelManager.OnlineModel.PushCurrentApplyList(n),
          ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1 &&
            UiManager_1.UiManager.OpenView("OnlineApplyView"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnRefreshApply,
          ),
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
    }
  }
  static async OnAllApplyJoinNotify(e) {
    if (
      1 ===
      (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      ))
    )
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("MultiPlayerTeam", 28, "通信受限，拒绝申请");
    else {
      for (const o of e.dOs);
      var n =
        await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap();
      for (const l of e.dOs) {
        if (n.get(l.hwa))
          return void (
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MultiPlayerTeam", 28, "SDK屏蔽好友列表", [
              "key",
              l.$xa.toString(),
            ])
          );
        if (
          PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().NeedCheckPlayOnly()
        )
          if (
            PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PlayOnly() &&
            "" === l.$xa
          )
            return;
        const r = new OnlineHallData_1.OnlineApplyData(
          l.JMs,
          l.W5n,
          l.cOs,
          l.dSs,
          l.F6n,
          l.Vxa,
        );
        ModelManager_1.ModelManager.OnlineModel.PushCurrentApplyList(r),
          TimerSystem_1.TimerSystem.Delay(() => {
            ModelManager_1.ModelManager.OnlineModel.GetCurrentApplyListById(
              r.PlayerId,
            ) &&
              (ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(
                r.PlayerId,
              ),
              OnlineController.AgreeJoinResultRequest(r.PlayerId, !1),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRefreshApply,
              ));
          }, r.ApplyTimeLeftTime * TimeUtil_1.TimeUtil.InverseMillisecond);
      }
      ModelManager_1.ModelManager.OnlineModel.GetCurrentApplySize() <= 1 &&
        UiManager_1.UiManager.OpenView("OnlineApplyView"),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnRefreshApply);
    }
  }
  static LobbyQueryPlayersRequest(n) {
    var e = new Protocol_1.Aki.Protocol.z0s();
    (e.W5n = n),
      Net_1.Net.Call(20343, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9661" + Protocol_1.Aki.Protocol.Z0s.name,
          ]),
          OnlineController.Oka(e, n);
      });
  }
  static async Oka(e, n) {
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrLobbyTryQuerySelf
        ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "CanNotSearchSelf",
          )
        : e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrHostOffline
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "OnlineInvalidUserId",
            )
          : ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              29363,
            )
      : (e = e.mOs) && 0 !== e.W5n
        ? (
            await ModelManager_1.ModelManager.KuroSdkModel.GetSdkBlockUserMap()
          ).get(e.hwa)
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MultiPlayerTeam", 28, "SDK屏蔽好友列表", [
              "key",
              e.$xa.toString(),
            ])
          : (ModelManager_1.ModelManager.OnlineModel.CleanSearchResultList(),
            (e = new OnlineHallData_1.OnlineHallData(e)),
            ModelManager_1.ModelManager.OnlineModel.PushSearchResultList(e),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnSearchWorld,
              n,
            ))
        : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            "OnlineInvalidUserId",
          );
  }
  static AgreeJoinResultRequest(n, e) {
    var o;
    !e ||
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
    OnlineController.CheckPlatformCanopen()
      ? (((o = new Protocol_1.Aki.Protocol.j0s()).W5n = n),
        (o.j7n = e),
        Net_1.Net.Call(25027, o, (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
              "协议id",
              "9666" + Protocol_1.Aki.Protocol.W0s.name,
            ]),
            e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  28745,
                )
              : (ModelManager_1.ModelManager.OnlineModel.DeleteCurrentApplyListById(
                  n,
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.OnRefreshApply,
                ));
        }))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "MultiPlayerTeam",
          5,
          "AgreeJoinResultRequest未通过PS5平台会员检测",
        );
  }
  static MatchChangePlayerUiStateRequest(n) {
    var e = new Protocol_1.Aki.Protocol.ahs();
    (e.w9n = n),
      Net_1.Net.Call(20102, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9666" + Protocol_1.Aki.Protocol.hhs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                28745,
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
      e === Protocol_1.Aki.Protocol.r7s.Proto_GREAT ||
      e === Protocol_1.Aki.Protocol.r7s.Proto_GOOD
    );
  }
  static ApplyRechallengeRequest(e) {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    var n = new Protocol_1.Aki.Protocol.F1s();
    (n.x9n = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineChallengePlayer,
      ),
      Net_1.Net.Call(22971, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "MultiPlayerTeam",
            5,
            "协议接收",
            ["协议id", "9624" + Protocol_1.Aki.Protocol.V1s.name],
            ["response", e],
          ),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              28154,
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
    var o = new Protocol_1.Aki.Protocol.H1s();
    (o.j7n = e
      ? Protocol_1.Aki.Protocol.hoh.Proto_Accept
      : n
        ? Protocol_1.Aki.Protocol.hoh.Proto_ActiveRefuse
        : Protocol_1.Aki.Protocol.hoh.Proto_TimeOutRefuse),
      Net_1.Net.Call(17713, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9624" + Protocol_1.Aki.Protocol.j1s.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              26885,
            );
      });
  }
  static InviteRechallengeRequest() {
    ModelManager_1.ModelManager.OnlineModel.RefreshInitiateTime();
    var e = new Protocol_1.Aki.Protocol.W1s();
    Net_1.Net.Call(18371, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
          "协议id",
          "9624" + Protocol_1.Aki.Protocol.W1s.name,
        ]),
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              26702,
            )
          : (UiManager_1.UiManager.OpenView("OnlineChallengeStateView"),
            UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView") &&
              UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"));
    });
  }
  static LeaveWorldTeamRequest(e) {
    var n = new Protocol_1.Aki.Protocol.ogs();
    (n.W5n = e),
      Net_1.Net.Call(21139, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9624" + Protocol_1.Aki.Protocol.ngs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                15568,
              )
            : ModelManager_1.ModelManager.OnlineModel.ClearOnlineTeamMap();
      });
  }
  static KickWorldTeamRequest(e) {
    var n = new Protocol_1.Aki.Protocol.sgs();
    (n.W5n = e),
      Net_1.Net.Call(26205, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9626" + Protocol_1.Aki.Protocol.ags.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              15961,
            );
      });
  }
  static PlayerCreatePsnSessionRequest(e) {
    var n = new Protocol_1.Aki.Protocol.oth();
    (n.JNa = e),
      Net_1.Net.Call(17643, n, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
            "协议id",
            "9626" + Protocol_1.Aki.Protocol.nth.name,
          ]);
      });
  }
  static PlayerNetStatePush() {
    var e = new Protocol_1.Aki.Protocol.ugs(),
      n = Net_1.Net.RttMs,
      e =
        ((e.W7n = n),
        Net_1.Net.Send(17110, e),
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
      ? Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN
      : e <= OnlineController.AGi
        ? Protocol_1.Aki.Protocol.r7s.Proto_GREAT
        : e <= OnlineController.PGi
          ? Protocol_1.Aki.Protocol.r7s.Proto_GOOD
          : e <= OnlineController.xGi
            ? Protocol_1.Aki.Protocol.r7s.Proto_POOR
            : Protocol_1.Aki.Protocol.r7s.Proto_UNKNOWN;
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
  static CheckPlatformCanopen() {
    var e =
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.CheckUserPremium();
    return -1 === e && this.CheckoutCommerceDialogPremiumMode(), 0 <= e;
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
  static CreatePlayerSession() {
    var e =
        ModelManager_1.ModelManager.OnlineModel.GetGameJoinTypeToPlayStationJoinType(),
      n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.CreatePlayerSession(
      e,
      n ?? 0,
    );
  }
  static LeavePlayerSession() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.LeavePlayerSession(),
      this.ZNa && (this.ZNa.Remove(), (this.ZNa = void 0));
  }
  static JoinPlayerSession(e) {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.JoinPlayerSession(
      e,
    );
  }
  static CheckJoinSession() {
    var e =
      PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.CheckJoinSession();
    ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId = e;
  }
  static NotifyPlayStationPremium() {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.NotifyPlayStationPremium(
      ModelManager_1.ModelManager.KuroSdkModel.PlayStationPlayOnlyState,
    );
  }
  static GetPlayerIdByPlayerSessionId(e) {
    return PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk()?.GetPlayerIdByPlayerSessionId(
      e,
    );
  }
  static CheckoutCommerceDialogPremiumMode() {
    this.hka = TimerSystem_1.TimerSystem.Forever(() => {
      switch (
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().PollCheckoutDialogResult()
      ) {
        case 2:
          TimerSystem_1.TimerSystem.Remove(this.hka), (this.hka = void 0);
          break;
        case 1:
          break;
        default:
          TimerSystem_1.TimerSystem.Remove(this.hka), (this.hka = void 0);
      }
    }, 500);
  }
}
(exports.OnlineController = OnlineController),
  ((_a = OnlineController).F6t = 0),
  (OnlineController.BGi = 0),
  (OnlineController.ZNa = void 0),
  (OnlineController._3a = (e, n) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Login",
        5,
        "PS5 PlaySession 点击加入事件触发 ",
        ["userId:", e],
        ["playerSession", n],
      ),
      UiManager_1.UiManager.IsViewShow("LoginView") ||
      UiManager_1.UiManager.IsViewShow("LoadingView")
        ? ((ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId =
            n),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PlayStationJoinSessionEvent,
          ),
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              5,
              "PS5 PlaySession 点击加入事件触发 登录或加载界面",
            ))
        : ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Login",
                5,
                "PS5 PlaySession 点击加入事件触发 大世界申请联机",
              ),
            (e = _a.GetPlayerIdByPlayerSessionId(n)),
            StringUtils_1.StringUtils.IsEmpty(e) ||
              "-1" === e ||
              !(n = Number(e)) ||
              n <= 0 ||
              _a.ApplyJoinWorldRequest(
                n,
                Protocol_1.Aki.Protocol.J8s.Proto_QueryJoin,
              ))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Login",
              5,
              "PS5 PlaySession 点击加入事件触发 副本中",
            );
  }),
  (OnlineController.$5e = () => {
    ModelManager_1.ModelManager.OnlineModel.SetPermissionsSetting(
      ModelManager_1.ModelManager.FunctionModel.GetWorldPermission(),
    ),
      _a.jWa();
  }),
  (OnlineController.zNa = () => {
    var e;
    "-1" !==
      ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId &&
      ((e = _a.GetPlayerIdByPlayerSessionId(
        ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId,
      )),
      (ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId =
        "-1"),
      StringUtils_1.StringUtils.IsEmpty(e) ||
        "-1" === e ||
        !(e = Number(e)) ||
        e <= 0 ||
        _a.ApplyJoinWorldRequest(
          e,
          Protocol_1.Aki.Protocol.J8s.Proto_QueryJoin,
        ));
  }),
  (OnlineController.RXa = () => {
    PlatformSdkManagerNew_1.PlatformSdkManagerNew.IsSdkOn &&
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      (_a.ZNa && (_a.ZNa.Remove(), (_a.ZNa = void 0)),
      (_a.ZNa = TimerSystem_1.TimerSystem.Forever(() => {
        _a.NotifyPlayStationPremium();
      }, NOTIFY_PLAYSTATION_CD)));
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
  (OnlineController.IsFirstSetMode = !0),
  (OnlineController.UXa = () => {
    _a.IsFirstSetMode &&
      ((_a.IsFirstSetMode = !1),
      ModelManager_1.ModelManager.GameModeModel.IsMulti) &&
      !OnlineController.CheckPlatformCanopen() &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MultiPlayerTeam",
        5,
        "ApplyJoinWorldRequest未通过PS5平台会员检测",
      );
  }),
  (OnlineController.rAt = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "MultiPlayerTeam",
        5,
        "PS5 自动登录流程 - 监听到输入，取消后续流程",
      ),
      (ModelManager_1.ModelManager.LoginModel.PlayStationGameAutoLoginId =
        "-1"),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInputAnyKey,
        OnlineController.rAt,
      );
  }),
  (OnlineController.ApplyJoinWorldNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
        "协议id",
        "9667" + Protocol_1.Aki.Protocol.H0s.name,
      ]),
      _a.ePa(e);
  }),
  (OnlineController.AgreeJoinResultNotify = (e) => {
    e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "ApplyRefused",
          e.JMs,
        )
      : (OnlineController.NGi = ["EnteringOtherWorld", [e.JMs]]);
  }),
  (OnlineController.AllApplyJoinNotify = (e) => {
    OnlineController.OnAllApplyJoinNotify(e);
  }),
  (OnlineController.JoinWorldTeamNotify = (n) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9620 " + Protocol_1.Aki.Protocol.tgs.name,
      ]);
    var e,
      o = ModelManager_1.ModelManager.OnlineModel,
      l =
        (o.ClearWorldTeamPlayerFightInfo(),
        o.ClearOtherScenePlayerDataList(),
        n.TRs.length);
    let r = 0;
    for (let e = 0; e < l; e++) {
      var t = n.TRs[e],
        a = new OnlineHallData_1.OnlineTeamData(
          t.JMs,
          t.W5n,
          t.F6n,
          t.dSs,
          t.zVn,
          e + 1,
          t.mOs,
          t.gOs,
        ),
        i =
          (ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(a),
          new Array());
      for (const M of t.COs.dUs) {
        var _ = new OnlineHallData_1.WorldTeamRoleInfo(M.Q6n, M.Ebs);
        (_.RoleIndex = r++), i.push(_);
      }
      a = new OnlineHallData_1.WorldTeamPlayerFightInfo(
        ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
          t.W5n,
        ).Name,
        t.W5n,
        t.COs.FVn,
        i,
      );
      o.PushWorldTeamPlayerFightInfo(a);
    }
    ModelManager_1.ModelManager.OnlineModel.SetTeamOwnerId(n.nIs),
      ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnEnterOnlineWorld,
      ),
      ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() &&
        ((e = _a.CreatePlayerSession()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("MultiPlayerTeam", 5, "JoinWorldTeamNotify PS5" + e),
        "-1" !== e) &&
        _a.PlayerCreatePsnSessionRequest(e);
  }),
  (OnlineController.PlayerLeaveWorldTeamNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9621 " + Protocol_1.Aki.Protocol.igs.name,
      ]);
    var n = e.W5n,
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
          e.x9n === Protocol_1.Aki.Protocol.t7s.Proto_Dissolve &&
          (OnlineController.NGi = ["LeaderExitOnlineTeam", [o.Name]]),
        ModelManager_1.ModelManager.OnlineModel.SetTeamOwnerId(-1),
        ModelManager_1.ModelManager.OnlineModel.ClearOnlineTeamMap(),
        ModelManager_1.ModelManager.OnlineModel.ClearPlayerTeleportState(),
        ModelManager_1.ModelManager.OnlineModel.ClearWorldTeamPlayerFightInfo(),
        ModelManager_1.ModelManager.OnlineModel.ClearOtherScenePlayerDataList(),
        _a.LeavePlayerSession(),
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
        ModelManager_1.ModelManager.OnlineModel.DeleteOtherScenePlayerDataList(
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
        "9621 " + Protocol_1.Aki.Protocol.rgs.name,
      ]);
    var e = e.jRs,
      n = new OnlineHallData_1.OnlineTeamData(
        e.JMs,
        e.W5n,
        e.F6n,
        e.dSs,
        e.zVn,
        ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamSize() + 1,
        e.mOs,
        e.gOs,
      ),
      o = new Array();
    for (const r of e.COs.dUs) {
      var l = new OnlineHallData_1.WorldTeamRoleInfo(r.Q6n, r.Ebs);
      o.push(l);
    }
    e = new OnlineHallData_1.WorldTeamPlayerFightInfo(
      e.JMs,
      e.W5n,
      e.COs.FVn,
      o,
    );
    ModelManager_1.ModelManager.OnlineModel.PushCurrentTeamList(n),
      ModelManager_1.ModelManager.OnlineModel.PushWorldTeamPlayerFightInfo(e),
      ModelManager_1.ModelManager.OnlineModel.WorldTeamPlayerResetIndex(),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "IsEnteringWorld",
        n.Name,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshOnlineTeamList,
      );
  }),
  (OnlineController.WorldTeamPlayerInfoChangeNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("MultiPlayerTeam", 5, "通知接收", [
        "通知id",
        "9619 " + Protocol_1.Aki.Protocol.egs.name,
      ]);
    var n = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
      e.W5n,
    );
    if (n) {
      switch (e.JDs) {
        case Protocol_1.Aki.Protocol.i7s.Proto_Head:
          n.HeadId = e.V8n;
          break;
        case Protocol_1.Aki.Protocol.i7s.F6n:
          n.Level = e.V8n;
          break;
        case Protocol_1.Aki.Protocol.i7s.H8n:
          n.Name = e.j8n;
          break;
        case Protocol_1.Aki.Protocol.i7s.zVn:
          n.Signature = e.j8n;
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
    var n = e.COs,
      o = ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
        e.W5n,
      );
    if (o) {
      const i = n.dUs;
      var l = o.GetIsDiffRoleList(i),
        r = ModelManager_1.ModelManager.SceneTeamModel,
        t = ModelManager_1.ModelManager.OnlineModel;
      if (((o.CurRoleId = n.FVn), l)) {
        const i = new Array();
        for (const _ of n.dUs) {
          var a = new OnlineHallData_1.WorldTeamRoleInfo(_.Q6n, _.Ebs);
          i.push(a);
        }
        (o.RoleInfos = i), t.WorldTeamPlayerResetIndex();
      } else
        for (const M of r.GetTeamItemsByPlayer(e.W5n))
          M.SetRemoteIsControl(M.GetConfigId === n.FVn);
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Formation", 5, "获取WorldTeamPlayerFightInfo失败", [
          "playerId",
          e.W5n,
        ]);
  }),
  (OnlineController.ReceiveRechallengeNotify = (e) => {
    var n = e.W5n;
    e.j7n !== Protocol_1.Aki.Protocol.hoh.Proto_Accept
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
          e.M2s,
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
    for (const n of e.S2s)
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
      e.W5n,
    );
    n &&
      ((n.PingState = e.gOs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshPlayerPing,
        e.W5n,
        n.PingState,
      ));
  }),
  (OnlineController.MatchChangePlayerUiStateNotify = (e) => {
    ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
      e.W5n,
      e.w9n,
    );
  }),
  (OnlineController.PlayerTeleportStateNotify = (e) => {
    var n,
      o,
      l = e.W5n;
    ModelManager_1.ModelManager.OnlineModel.SetPlayerTeleportState(l, e.fOs),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnRefreshPlayerUiState,
        l,
      ),
      l !== ModelManager_1.ModelManager.PlayerInfoModel.GetId() &&
        ((n = e.fOs === Protocol_1.Aki.Protocol.o7s.Proto_Default),
        ModelManager_1.ModelManager.OnlineModel.SetRoleActivated(l, n),
        n) &&
        (e.vOs
          ? (n = ModelManager_1.ModelManager.CreatureModel.GetEntity(
              MathUtils_1.MathUtils.LongToNumber(e.vOs.F4n),
            )) &&
            n.Entity &&
            ((o = n.Entity.GetComponent(3)),
            (e = Vector_1.Vector.Create(e.vOs.P5n.X, e.vOs.P5n.Y, e.vOs.P5n.Z)),
            o.FixBornLocation("队友传送完成", !0, e, !0) ||
              o.TeleportTo(
                e.ToUeVector(),
                o.ActorRotationProxy.ToUeRotator(),
                "队友传送完成(地面修正失败)",
              ),
            n.Entity.GetComponent(60)?.ClearReplaySamples())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "MultiPlayerTeam",
              15,
              "队友传送完成通知缺失位置信息",
              ["playerId", l],
            ));
  }),
  (OnlineController.ApplyerEnterSceneNotify = (e) => {
    e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
      9,
      void 0,
      void 0,
      [e],
    );
  }),
  (OnlineController.PlayerPsnSessionNotify = (e) => {
    ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      !ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() &&
      _a.JoinPlayerSession(e.JNa);
  }),
  (OnlineController.SyncPlayerLocationNotify = (e) => {
    for (const o of e.zih) {
      let e =
        ModelManager_1.ModelManager.OnlineModel.GetOtherScenePlayerDataByPlayerId(
          o.W5n,
        );
      e ||
        ((e = new OnlineHallData_1.OtherScenePlayerData(o.W5n, o.w7n, o.P5n)),
        ModelManager_1.ModelManager.OnlineModel.PushOtherScenePlayerDataList(
          e,
        ));
      var n = Vector_1.Vector.Create(o.P5n);
      e.SetLocation(n),
        (e.MapId = o.w7n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ScenePlayerLocationChanged,
          o.W5n,
          n,
        );
    }
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
        )),
  (OnlineController.hka = void 0);
//# sourceMappingURL=OnlineController.js.map
