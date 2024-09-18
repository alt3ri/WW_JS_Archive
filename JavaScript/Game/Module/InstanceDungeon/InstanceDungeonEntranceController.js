"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceController = exports.SETTLE_TYPE_MATERIALS =
    void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  PlatformSdkManagerNew_1 = require("../../../Launcher/Platform/PlatformSdk/PlatformSdkManagerNew"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  BossRushController_1 = require("../Activity/ActivityContent/BossRush/BossRushController"),
  ActivityDoubleRewardController_1 = require("../Activity/ActivityContent/DoubleReward/ActivityDoubleRewardController"),
  MowingRiskInstanceView_1 = require("../Activity/ActivityContent/MowingRisk/View/MowingRiskInstanceView"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  EditBattleTeamController_1 = require("../EditBattleTeam/EditBattleTeamController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  RewardItemData_1 = require("../ItemReward/RewardData/RewardItemData"),
  OnlineController_1 = require("../Online/OnlineController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TeleportController_1 = require("../Teleport/TeleportController"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  TowerController_1 = require("../TowerDetailUi/TowerController"),
  InstanceDungeonController_1 = require("./InstanceDungeonController"),
  ONE_SECONDS = 1e3,
  INSTANCE_SUCCESS = 3004,
  INSTANCE_FAIL = 3005,
  INSTANCE_SUCCESS_NO_REWARD = 3007,
  SETTLE_TYPE_ONETIME = 1,
  SETTLE_TYPE_ROLETRIAL = 2,
  SETTLE_TYPE_NONE = 3,
  SETTLE_TYPE_CLOSE = ((exports.SETTLE_TYPE_MATERIALS = 4), 5);
class InstanceDungeonEntranceController extends UiControllerBase_1.UiControllerBase {
  static OnInit() {
    return (
      (this._hi =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(
          5,
        ).IconSmall),
      InstanceDungeonEntranceController.h8a(),
      !0
    );
  }
  static OnClear() {
    return (
      (this.uhi = void 0),
      (this._hi = void 0),
      InstanceDungeonEntranceController._8a(),
      !0
    );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "All",
      InstanceDungeonEntranceController.OpenViewLimit,
      "InstanceDungeonEntranceController.OpenViewLimit",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "All",
      InstanceDungeonEntranceController.OpenViewLimit,
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.WorldDone,
      InstanceDungeonEntranceController.nye,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        InstanceDungeonEntranceController.chi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPowerChanged,
        InstanceDungeonEntranceController.A6e,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      InstanceDungeonEntranceController.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        InstanceDungeonEntranceController.chi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPowerChanged,
        InstanceDungeonEntranceController.A6e,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19184, InstanceDungeonEntranceController.mhi),
      Net_1.Net.Register(21963, InstanceDungeonEntranceController.dhi),
      Net_1.Net.Register(21725, InstanceDungeonEntranceController.Chi),
      Net_1.Net.Register(
        24628,
        InstanceDungeonEntranceController.MatchTeamNotify,
      ),
      Net_1.Net.Register(21443, InstanceDungeonEntranceController.ghi),
      Net_1.Net.Register(
        17349,
        InstanceDungeonEntranceController.MatchTeamStateNotify,
      ),
      Net_1.Net.Register(24505, InstanceDungeonEntranceController.fhi),
      Net_1.Net.Register(18798, InstanceDungeonEntranceController.phi),
      Net_1.Net.Register(29811, InstanceDungeonEntranceController.vhi),
      Net_1.Net.Register(20011, InstanceDungeonEntranceController.Mhi),
      Net_1.Net.Register(19712, InstanceDungeonEntranceController.Ehi),
      Net_1.Net.Register(18085, InstanceDungeonEntranceController.Shi),
      Net_1.Net.Register(18461, InstanceDungeonEntranceController.yhi),
      Net_1.Net.Register(26908, InstanceDungeonEntranceController.Ihi),
      Net_1.Net.Register(29420, InstanceDungeonEntranceController.Thi),
      Net_1.Net.Register(17345, InstanceDungeonEntranceController.Lhi),
      Net_1.Net.Register(15471, InstanceDungeonEntranceController.Dhi),
      Net_1.Net.Register(29587, InstanceDungeonEntranceController.Rhi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19184),
      Net_1.Net.UnRegister(21963),
      Net_1.Net.UnRegister(21725),
      Net_1.Net.UnRegister(24628),
      Net_1.Net.UnRegister(21443),
      Net_1.Net.UnRegister(17349),
      Net_1.Net.UnRegister(24505),
      Net_1.Net.UnRegister(18798),
      Net_1.Net.UnRegister(29811),
      Net_1.Net.UnRegister(20011),
      Net_1.Net.UnRegister(19712),
      Net_1.Net.UnRegister(18085),
      Net_1.Net.UnRegister(18461),
      Net_1.Net.UnRegister(26908),
      Net_1.Net.UnRegister(29420),
      Net_1.Net.UnRegister(17345),
      Net_1.Net.UnRegister(15471);
  }
  static h8a() {
    InstanceDungeonEntranceController.u8a.set(
      8500,
      MowingRiskInstanceView_1.MowingRiskInstanceView,
    );
  }
  static _8a() {
    InstanceDungeonEntranceController.u8a.clear();
  }
  static async EnterEntrance(e, n = 0, o) {
    var t;
    return e
      ? ((t =
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlowId(
            e,
          )),
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId =
          n),
        o && this.RegisterDungeonEntranceRestoreCb(o),
        3 !== t &&
          4 !== t &&
          (7 === t
            ? BossRushController_1.BossRushController.OpenDefaultBossRushView()
            : 5 === t
              ? TowerController_1.TowerController.OpenTowerView()
              : ((ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId =
                  e),
                InstanceDungeonEntranceController.Uhi())))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 17, "副本入口打开错误", [
            "entranceId",
            e,
          ]),
        !1);
  }
  static async Uhi() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    const n =
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(
        e,
      );
    return (
      !!n &&
      InstanceDungeonEntranceController.InstEntranceDetailRequest(e).finally(
        () => {
          n.Start();
        },
      )
    );
  }
  static ContinueEntranceFlow() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId,
      e =
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(
          e,
        );
    e && e.Flow();
  }
  static RevertEntranceFlowStep() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
    e &&
      (e =
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetInstanceDungeonEntranceFlow(
          e,
        )) &&
      e.RevertStep();
  }
  static async EnterInstanceDungeon() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    return e
      ? InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
          e,
          ModelManager_1.ModelManager.EditBattleTeamModel
            .GetOwnRoleConfigIdList[0],
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId,
          0,
          void 0,
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 17, "进入副本失败，副本Id不存在", [
            "instanceId",
            e,
          ]),
        !1);
  }
  static async EnterInstanceDungeonByAutoRole() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
    if (!e)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            17,
            "请求进入副本失败，副本Id不存在",
            ["instanceId", e],
          ),
        !1
      );
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    if (!n)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            17,
            "请求进入副本失败，副本不存在",
            ["instanceId", e],
          ),
        !1
      );
    let o = !1;
    var t = n.TrialRoleFormation,
      t =
        (t &&
          (t =
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetTrialRoleConfig(
              t,
            )) &&
          ((r = 0 < t.MaleFormation.length && 0 < t.FemaleFormation.length),
          (o = t.OnlyTrial && r)),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId);
    if (o)
      return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
        e,
        [],
        t,
      );
    var r = n.FightFormationId,
      n =
        ConfigManager_1.ConfigManager.EditBattleTeamConfig.GetFightFormationConfig(
          r,
        );
    if (!n)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 17, "副本没有编队配置", [
            "instanceId",
            e,
          ]),
        !1
      );
    r = n.AutoRole;
    if (!r || 0 === r.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "InstanceDungeon",
            17,
            "请求进入副本失败，自动上阵角色列表为空",
            ["autoRoleGroupIdList", r],
          ),
        !1
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "InstanceDungeon",
        17,
        "请求进入副本跳过编队，并且配置了自动上阵角色",
        ["instanceId", e],
        ["autoRoleGroupIdList", r],
      );
    var a = new Array();
    for (const l of r)
      a.push(
        ConfigManager_1.ConfigManager.RoleConfig.GetTrialRoleIdConfigByGroupId(
          l,
        ),
      );
    return InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
      e,
      a,
      t,
    );
  }
  static async LeaveInstanceDungeon() {
    return (
      ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceDungeonInfo(),
      InstanceDungeonEntranceController.LeaveInstanceDungeonRequest()
    );
  }
  static async LeaveInstanceDungeonRequest(e, n, o = 0) {
    var t = Protocol_1.Aki.Protocol.Hos.create(),
      e =
        ((t.r6n = e ?? 0),
        (t.g5n = n ?? 0),
        (t.XVn = o),
        await Net_1.Net.CallAsync(28041, t));
    return !(
      !e ||
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          16561,
        ),
        1))
    );
  }
  static async RestartInstanceDungeon() {
    let e = ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList;
    if (!e) {
      e = [];
      for (const n of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
        e.push(n.GetConfigId);
    }
    return InstanceDungeonController_1.InstanceDungeonController.SingleInstReChallengeRequest(
      e,
    );
  }
  static async InstEntranceDetailRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Vos(),
      e = ((n.L9n = e), await Net_1.Net.CallAsync(24520, n));
    if (!e) return !1;
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10209" + Protocol_1.Aki.Protocol.$os.name,
        ]),
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs)
    )
      return (
        ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          17449,
        ),
        !1
      );
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.length = 0;
    for (const o of e.pws)
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.push(
        o.r6n,
      ),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetInstanceResetTime(
          o.r6n,
          o.ZLs,
        );
    return (
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEndTime =
        e.gPs),
      !0
    );
  }
  static async MatchChangeRoleRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Bas(),
      e =
        ((n.Q6n = e),
        (n.Tzs =
          TowerDefenceController_1.TowerDefenseController.BuildPhantomIdListByOwnRoleCfgIdList(
            e,
          )),
        await Net_1.Net.CallAsync(21170, n));
    return (
      !!e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10061" + Protocol_1.Aki.Protocol.qas.name,
        ]),
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
        (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          22788,
        ),
        !1))
    );
  }
  static async MatchChangeReadyRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Oas(),
      n = ((n.D9n = e), await Net_1.Net.CallAsync(23005, n));
    return (
      !!n &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10064" + Protocol_1.Aki.Protocol.kas.name,
        ]),
      n.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            n.Q4n,
            29220,
          ),
          !1)
        : ((n = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
          ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(
            n,
            e,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.PrewarReadyChanged,
            n,
            e,
          ),
          !0))
    );
  }
  static async LeaveMatchTeamRequest() {
    var e = new Protocol_1.Aki.Protocol.Fas(),
      e = await Net_1.Net.CallAsync(20718, e);
    return (
      !!e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10066" + Protocol_1.Aki.Protocol.Vas.name,
        ]),
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            18194,
          ),
          !1)
        : (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam),
          !0))
    );
  }
  static async KickMatchTeamPlayerRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Was(),
      e = ((n.W5n = e), await Net_1.Net.CallAsync(17031, n));
    return (
      !!e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10071" + Protocol_1.Aki.Protocol.Kas.name,
        ]),
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
        (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          28492,
        ),
        !1))
    );
  }
  static async SetMatchTeamMatchFlagRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Qas(),
      e = ((n.u6n = e), await Net_1.Net.CallAsync(24686, n));
    return (
      !!e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10075" + Protocol_1.Aki.Protocol.Xas.name,
        ]),
      e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs ||
        (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          15982,
        ),
        !1))
    );
  }
  static async EnterMatchInstRequest() {
    var e = new Protocol_1.Aki.Protocol.Jas(),
      e = await Net_1.Net.CallAsync(20638, e);
    return (
      !!e &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10073" + Protocol_1.Aki.Protocol.zas.name,
        ]),
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            25219,
          ),
          !1)
        : (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam),
          !0))
    );
  }
  static CheckInstanceShieldView(e) {
    var n;
    return (
      !!InstanceDungeonEntranceController.LimitOpenView &&
      !!(n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()) &&
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.CheckViewShield(n, e)
    );
  }
  static RestoreDungeonEntranceEntity() {
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId;
    e &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(e))
        ?.IsInit &&
      e.Entity.GetComponent(75)?.Restore();
  }
  static RegisterDungeonEntranceRestoreCb(e) {
    var n =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId;
    n &&
    (n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n))?.IsInit &&
    (n = n.Entity.GetComponent(75))
      ? n.RegisterRestoreCb(e)
      : e();
  }
  static async wQa(e, n = !1) {
    var o;
    return 1 ===
      (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetCommunicationRestrictedAsync(
        ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyAccountId(),
      ))
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "CommunicationRectricted",
          ),
        ),
        this.bNa(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Chat", 28, "PrivateChatRequest 通信受限"),
        !1)
      : ModelManager_1.ModelManager.GameModeModel.IsMulti ||
          OnlineController_1.OnlineController.CheckPlatformCanopen()
        ? (((o = new Protocol_1.Aki.Protocol.Eas()).r6n = e),
          (o.A9n =
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId),
          (o.U9n = n),
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(
            e,
          ),
          Net_1.Net.Call(16077, o, (e) => {
            e &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
                  "协议id",
                  "10051" + Protocol_1.Aki.Protocol.yas.name,
                ]),
              e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.Q4n,
                    29707,
                  )
                : (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
                    1,
                  ),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnMatchingBegin,
                  )));
          }),
          !0)
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "MultiPlayerTeam",
              5,
              "AgreeJoinResultRequest未通过PS5平台会员检测",
            ),
          !1);
  }
  static StartMatchRequest(e, n = !1) {
    this.wQa(e, n);
  }
  static CancelMatchRequest() {
    var e = new Protocol_1.Aki.Protocol.Tas();
    Net_1.Net.Call(16092, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10053" + Protocol_1.Aki.Protocol.Las.name,
        ]),
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16794,
            )
          : (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
              0,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnMatchingChange,
            ));
    }),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "CancelMatch",
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(),
          ).MapName,
        ),
      ),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingId(0);
  }
  static MatchConfirmRequest(n) {
    var e = new Protocol_1.Aki.Protocol.Pas();
    (e.R9n = n),
      Net_1.Net.Call(28206, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10059" + Protocol_1.Aki.Protocol.Uas.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                29261,
              ),
              ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
                0,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnMatchingChange,
              ))
            : (ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(
                ModelManager_1.ModelManager.CreatureModel.GetPlayerId(),
                !0,
              ),
              n
                ? ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
                    3,
                  )
                : (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
                    0,
                  ),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.OnMatchingChange,
                  )));
      });
  }
  static TeamChallengeRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.Zas();
    (o.r6n = e),
      (o.A9n =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId),
      (o.U9n = n),
      Net_1.Net.Call(23740, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10080" + Protocol_1.Aki.Protocol.ehs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              15624,
            );
      });
  }
  static TeamMatchAcceptInviteRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.ohs();
    (o.r6n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId()),
      (o.mIa = e
        ? Protocol_1.Aki.Protocol.coh.Proto_Accept
        : n
          ? Protocol_1.Aki.Protocol.coh.Proto_ActiveRefuse
          : Protocol_1.Aki.Protocol.coh.Proto_TimeOutRefuse),
      (o.qVn = ModelManager_1.ModelManager.OnlineModel.OwnerId),
      Net_1.Net.Call(18477, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10085" + Protocol_1.Aki.Protocol.nhs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              27437,
            );
      });
  }
  static TeamMatchInviteRequest() {
    var e = new Protocol_1.Aki.Protocol.ths();
    (e.r6n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId()),
      Net_1.Net.Call(26812, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10085" + Protocol_1.Aki.Protocol.ihs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              23852,
            );
      });
  }
  static async OpenInstanceDungeonFailView() {
    if (!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
      return !1;
    if (ModelManager_1.ModelManager.RoguelikeModel?.CheckInRoguelike())
      return !1;
    var e = InstanceDungeonEntranceController.Ahi(!1);
    if (
      UiManager_1.UiManager.IsViewShow("InstanceDungeonFailView") ||
      ModelManager_1.ModelManager.GameModeModel.IsMulti
    )
      return !1;
    {
      var n = InstanceDungeonEntranceController.Phi();
      const o = new CustomPromise_1.CustomPromise();
      return (
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          INSTANCE_FAIL,
          !1,
          void 0,
          void 0,
          n,
          e,
          void 0,
          void 0,
          void 0,
          void 0,
          (e) => {
            o.SetResult(e);
          },
        ),
        o.Promise
      );
    }
  }
  static Ahi(e) {
    var n = [],
      o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      ),
      t = o.SettleButtonType,
      r = ModelManager_1.ModelManager.GameModeModel.IsMulti;
    if (
      ((e &&
        !r &&
        t !== SETTLE_TYPE_NONE &&
        t !== SETTLE_TYPE_ONETIME &&
        t !== exports.SETTLE_TYPE_MATERIALS) ||
        ((o = {
          ButtonTextId: "Text_ButtonTextExit_Text",
          DescriptionTextId: "GenericPromptTypes_2_GeneralText",
          DescriptionArgs: void 0,
          TimeDown: o.AutoLeaveTime * TimeUtil_1.TimeUtil.InverseMillisecond,
          IsTimeDownCloseView: !0,
          OnTimeDownOnCallback: () => {
            InstanceDungeonEntranceController.LeaveInstanceDungeon();
          },
          IsClickedCloseView: !1,
          OnClickedCallback: (e) => {
            InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
              () => {
                UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
                  UiManager_1.UiManager.CloseView("ExploreRewardView");
              },
            );
          },
        }),
        n.push(o)),
      r)
    )
      (o = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()
        ? "Text_ContinueChallenge_Text"
        : "Text_SuggestContinueChallenge_Text"),
        (r = []),
        (a = ModelManager_1.ModelManager.PowerModel.PowerCount),
        r.push(a),
        (a = `<texture=${this._hi}/>`),
        r.push(a),
        (a = {
          ButtonTextId: o,
          DescriptionTextId: "Text_RemainText_Text",
          DescriptionArgs: r,
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback:
            InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack,
          ClickCd:
            ModelManager_1.ModelManager.OnlineModel.ApplyCd *
            TimeUtil_1.TimeUtil.InverseMillisecond,
        }),
        n.push(a);
    else {
      if (!e || t === exports.SETTLE_TYPE_MATERIALS) {
        this.whi = !0;
        o = [];
        let e = ModelManager_1.ModelManager.PowerModel.PowerCount.toString();
        const l =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
        var r =
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
              l,
            ),
          a =
            (ModelManager_1.ModelManager.PowerModel.IsPowerEnough(r) ||
              (e = `<color=#c25757>${e}</color>`),
            o.push(e),
            `<texture=${this._hi}/>`),
          a =
            (o.push(a),
            {
              ButtonTextId: "Text_ChallengeAgain_Text",
              DescriptionTextId: r ? "Text_RemainText_Text" : void 0,
              DescriptionArgs: r ? o : void 0,
              IsTimeDownCloseView: !1,
              IsClickedCloseView: !1,
              OnClickedCallback: (e) => {
                var n,
                  o =
                    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
                      l,
                    );
                ModelManager_1.ModelManager.PowerModel.IsPowerEnough(o)
                  ? ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceCanChallenge(
                      l,
                    )
                    ? InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
                        () => {
                          UiManager_1.UiManager.IsViewShow(
                            "ExploreRewardView",
                          ) &&
                            UiManager_1.UiManager.CloseView(
                              "ExploreRewardView",
                            );
                        },
                      )
                    : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                        "InstanceDungeonLackChallengeTimes",
                      )
                  : (((n = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                      176,
                    )).ShowPowerItem = !0),
                    n.SetTextArgs(
                      o.toString(),
                      ModelManager_1.ModelManager.PowerModel.PowerCount.toString(),
                    ),
                    n.FunctionMap.set(1, () => {}),
                    n.FunctionMap.set(2, () => {
                      InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
                        () => {
                          UiManager_1.UiManager.IsViewShow(
                            "ExploreRewardView",
                          ) &&
                            UiManager_1.UiManager.CloseView(
                              "ExploreRewardView",
                            );
                        },
                      );
                    }),
                    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                      n,
                    ));
              },
            });
        n.push(a);
      }
      !e ||
        (t !== SETTLE_TYPE_ROLETRIAL && t !== SETTLE_TYPE_NONE) ||
        n.push({
          ButtonTextId: "Text_KeepOnButton_Text",
          DescriptionTextId: void 0,
          IsTimeDownCloseView: !1,
          IsClickedCloseView: !1,
          OnClickedCallback: (e) => {
            UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
              (UiManager_1.UiManager.CloseView("ExploreRewardView"),
              (this.whi = !1));
          },
        });
    }
    return n;
  }
  static Phi() {
    var e = [],
      n = ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
    if (n) {
      for (const t of n) {
        var o = { TrainingData: t };
        e.push(o);
      }
      return e;
    }
  }
  static Bhi(e) {
    var n = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e).MapName,
    );
    ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "TeamLeaderMatch",
      n,
    );
    const o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    o.SetMatchingId(e),
      o.SetMatchingState(1),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingBegin),
      UiManager_1.UiManager.IsViewOpen("OnlineWorldHallView") ||
        UiManager_1.UiManager.IsViewOpen("InstanceDungeonEntranceView") ||
        UiManager_1.UiManager.IsViewOpen("EditBattleTeamView") ||
        ((o.MatchingTime = 0),
        (o.OnStopTimer = () => 1 !== o.GetMatchingState()),
        this.StartMatchTimer());
  }
  static StartMatchTimer(e) {
    const n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    void 0 !== n.MatchingTimer &&
      TimerSystem_1.TimerSystem.Remove(n.MatchingTimer),
      (n.MatchingTimer = TimerSystem_1.TimerSystem.Forever(() => {
        n.OnStopTimer
          ? n.OnStopTimer()
            ? (void 0 !== n.MatchingTimer &&
                TimerSystem_1.TimerSystem.Remove(n.MatchingTimer),
              (n.MatchingTimer = void 0),
              n.OnStopHandle && n.OnStopHandle())
            : (n.MatchingTimeIncrease(), e && e())
          : (void 0 !== n.MatchingTimer &&
              TimerSystem_1.TimerSystem.Remove(n.MatchingTimer),
            (n.OnStopTimer = void 0),
            (n.OnStopHandle = void 0),
            (n.MatchingTimer = void 0));
      }, ONE_SECONDS));
  }
  static u3a() {
    this.c3a &&
      TimerSystem_1.TimerSystem.Has(this.c3a) &&
      (TimerSystem_1.TimerSystem.Remove(this.c3a), (this.c3a = void 0));
  }
  static async bNa() {
    (await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      6,
    )) &&
      (this.u3a(),
      (this.c3a = TimerSystem_1.TimerSystem.Forever(() => {
        PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().GetMessageBoxCurrentState(
          (e) => {
            3 === e &&
              (this.u3a(),
              PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().TerminateMessageBox());
          },
        );
      }, 500)));
  }
  static CreateInstanceSubViewByType(e) {
    e = InstanceDungeonEntranceController.u8a.get(e);
    if (e) return new e();
  }
}
(exports.InstanceDungeonEntranceController = InstanceDungeonEntranceController),
  ((_a = InstanceDungeonEntranceController).uhi = void 0),
  (InstanceDungeonEntranceController.LimitOpenView = !0),
  (InstanceDungeonEntranceController._hi = void 0),
  (InstanceDungeonEntranceController.whi = !1),
  (InstanceDungeonEntranceController.bhi = !1),
  (InstanceDungeonEntranceController.IsSettleExternalProcess = !1),
  (InstanceDungeonEntranceController.c3a = void 0),
  (InstanceDungeonEntranceController.u8a = new Map()),
  (InstanceDungeonEntranceController.nye = () => {
    (_a.whi = !1),
      InstanceDungeonEntranceController.uhi &&
        (InstanceDungeonEntranceController.Ihi(
          InstanceDungeonEntranceController.uhi,
        ),
        (InstanceDungeonEntranceController.uhi = void 0));
  }),
  (InstanceDungeonEntranceController.A6e = () => {
    var e;
    _a.whi &&
      ((e = _a.Ahi(_a.bhi)),
      ItemRewardController_1.ItemRewardController.SetButtonList(e),
      (e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId),
      (e =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetInstancePowerCost(
          e,
        )),
      ModelManager_1.ModelManager.PowerModel.IsPowerEnough(e)) &&
      UiManager_1.UiManager.IsViewOpen("ConfirmBoxView") &&
      UiManager_1.UiManager.CloseView("ConfirmBoxView");
  }),
  (InstanceDungeonEntranceController.chi = () => {
    ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
      0,
    ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
  }),
  (InstanceDungeonEntranceController.Chi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10054" + Protocol_1.Aki.Protocol.Das.name,
      ]),
      e.x9n === Protocol_1.Aki.Protocol.b5s.Proto_TimeOut &&
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "MatchingTimeOut",
        ),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
        0,
      ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange),
      ModelManager_1.ModelManager.InstanceDungeonModel.ResetData();
  }),
  (InstanceDungeonEntranceController.MatchTeamNotify = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10056" + Protocol_1.Aki.Protocol.Aas.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamInfo(e.Ibs),
      ModelManager_1.ModelManager.InstanceDungeonModel.InitMatchingTeamConfirmReadyState(
        e.Ibs.TRs,
      );
    const n =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
    if (
      (ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckInstanceIdIsTowerDefense(
        n,
      ) && TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(!0),
      ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchingPlayerConfirmStateByPlayerId(
        ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      ))
    ) {
      if (
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
          4,
        ),
        !UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") &&
          !UiManager_1.UiManager.IsViewShow("EditBattleTeamView"))
      ) {
        InstanceDungeonEntranceController.OpenEditBattleView();
        const n =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId();
        return void (
          ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.CheckInstanceIdIsTowerDefense(
            n,
          ) &&
          TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(!0)
        );
      }
    } else {
      if (
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
          2,
        ),
        UiManager_1.UiManager.IsViewOpen("OnlineMatchSuccessView"))
      )
        return;
      UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") ||
        UiManager_1.UiManager.IsViewShow("EditBattleTeamView") ||
        UiManager_1.UiManager.OpenView("OnlineMatchSuccessView");
    }
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
  }),
  (InstanceDungeonEntranceController.ghi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10057" + Protocol_1.Aki.Protocol.xas.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
        1,
      ),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
  }),
  (InstanceDungeonEntranceController.MatchTeamStateNotify = (e) => {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10075" + Protocol_1.Aki.Protocol.bas.name,
        ]),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamState(e.P9n),
      e.P9n === Protocol_1.Aki.Protocol.B5s.Proto_ReadyConfirm)
    ) {
      if (
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
          4,
        ),
        !UiManager_1.UiManager.IsViewOpen("InstanceDungeonEntranceView"))
      )
        return (
          InstanceDungeonEntranceController.OpenEditBattleView(),
          void (
            UiManager_1.UiManager.IsViewShow("OnlineMatchSuccessView") &&
            UiManager_1.UiManager.CloseView("OnlineMatchSuccessView")
          )
        );
    } else
      e.P9n === Protocol_1.Aki.Protocol.B5s.Proto_WaiteConfirm &&
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
          3,
        );
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange);
  }),
  (InstanceDungeonEntranceController.fhi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10076" + Protocol_1.Aki.Protocol.was.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(
        e.Tbs,
        !0,
      );
    var n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    e.Tbs === n &&
      ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchingTeamReady() &&
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
        4,
      ),
      UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView")
        ? EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnMatchingChange,
          )
        : (InstanceDungeonEntranceController.OpenEditBattleView(),
          UiManager_1.UiManager.IsViewOpen("OnlineMatchSuccessView") &&
            UiManager_1.UiManager.CloseView("OnlineMatchSuccessView")));
  }),
  (InstanceDungeonEntranceController.phi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10062" + Protocol_1.Aki.Protocol.Gas.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchTeamInfoPlayerRole(
        e.W5n,
        e.J6n,
      );
  }),
  (InstanceDungeonEntranceController.vhi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10065" + Protocol_1.Aki.Protocol.Nas.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(
        e.W5n,
        e.D9n,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PrewarReadyChanged,
        e.W5n,
        e.D9n,
      ),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
        e.W5n,
        e.D9n
          ? Protocol_1.Aki.Protocol.G5s.CTs
          : Protocol_1.Aki.Protocol.G5s.Proto_Wait,
      );
  }),
  (InstanceDungeonEntranceController.Mhi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10068" + Protocol_1.Aki.Protocol.$as.name,
      ]);
    var n = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    e.W5n === n
      ? (ModelManager_1.ModelManager.InstanceDungeonModel.IsMatchTeamHost() ||
          e.Lbs !== Protocol_1.Aki.Protocol.q5s.Proto_HostLeave ||
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "LeaderExitMatching",
          ),
        e.Lbs === Protocol_1.Aki.Protocol.q5s.Proto_BeKick &&
          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
            "MatchLeaveTeamByKickOut",
          ),
        ModelManager_1.ModelManager.InstanceDungeonModel.ResetData(),
        EditBattleTeamController_1.EditBattleTeamController.ExitEditBattleTeam(
          !1,
        ),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetMatchingState(
          0,
        ),
        ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView(),
        ModelManager_1.ModelManager.OnlineModel.ClearPlayerTeleportState(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnMatchingChange,
        ),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam))
      : ((n = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamName(
          e.W5n,
        )),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "OthersLeaveMatchTeam",
          n,
        ),
        ModelManager_1.ModelManager.InstanceDungeonModel.RemovePrewarFormationDataByPlayer(
          e.W5n,
        ),
        ModelManager_1.ModelManager.OnlineModel.DeletePlayerTeleportState(
          e.W5n,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.PrewarFormationChanged,
        ));
  }),
  (InstanceDungeonEntranceController.Ehi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10076" + Protocol_1.Aki.Protocol.jas.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetMatchingPlayerConfirmState(
        e.jRs.W5n,
        !1,
      ),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetPrewarPlayerReadyState(
        e.jRs.W5n,
        !1,
      ),
      ModelManager_1.ModelManager.InstanceDungeonModel.AddPrewarFormationDataByPlayerInfo(
        e.jRs,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.PrewarFormationChanged,
      );
  }),
  (InstanceDungeonEntranceController.Shi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10076" + Protocol_1.Aki.Protocol.Yas.name,
      ]);
    var n = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
    n
      ? ((n = n.qVn),
        ModelManager_1.ModelManager.InstanceDungeonModel.SetPlayerUiState(
          n,
          e.Rbs
            ? Protocol_1.Aki.Protocol.G5s.Proto_Matching
            : Protocol_1.Aki.Protocol.G5s.Proto_Wait,
        ),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetEditBattleTeamMatching(
          e.Rbs,
        ))
      : e.Rbs
        ? _a.Bhi(e.r6n)
        : (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CancelMatchingTimer(),
          ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "LeaderCancelMatch",
            ));
  }),
  (InstanceDungeonEntranceController.Ihi = (e) => {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10216" + Protocol_1.Aki.Protocol.Xos.name,
        ]),
      InstanceDungeonEntranceController.IsSettleExternalProcess)
    )
      InstanceDungeonEntranceController.IsSettleExternalProcess = !1;
    else if (
      ((_a.bhi = e.Mws), ModelManager_1.ModelManager.GameModeModel.WorldDone)
    )
      if (e.Sws)
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "InstanceDungeonRewardTimeNotEnough",
        );
      else if (
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SyncSettleRewardItemList(
          e.gws,
        ),
        e.Mws)
      ) {
        var n = InstanceDungeonEntranceController.Ahi(e.Mws),
          o = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          ).SettleButtonType;
        if (o !== SETTLE_TYPE_CLOSE) {
          var t = [];
          for (const a of Object.keys(e.gws)) {
            var r = new RewardItemData_1.RewardItemData(
              Number.parseInt(a),
              e.gws[a],
            );
            t.push(r);
          }
          o =
            1 < e.B9n
              ? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip(
                  [1, 2],
                )
              : void 0;
          ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
            0 < t.length ? INSTANCE_SUCCESS : INSTANCE_SUCCESS_NO_REWARD,
            !0,
            t,
            void 0,
            void 0,
            n,
            void 0,
            void 0,
            void 0,
            o,
            void 0,
            ModelManager_1.ModelManager.GameModeModel.IsMulti,
          );
        }
      } else InstanceDungeonEntranceController.OpenInstanceDungeonFailView();
    else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InstanceDungeon", 5, "副本结算通知时，世界未加载完成"),
        (InstanceDungeonEntranceController.uhi = e);
  }),
  (InstanceDungeonEntranceController.yhi = (n) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10217" + Protocol_1.Aki.Protocol.les.name,
      ]);
    var o = MathUtils_1.MathUtils.LongToNumber(n.s5n),
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(o);
    if (o) {
      let e = void 0;
      switch (n.Y4n) {
        case Protocol_1.Aki.Protocol.U3s.Proto_NotUnlock:
          e = -421801185;
          break;
        case Protocol_1.Aki.Protocol.U3s.Proto_Unlockable:
          e = 1960897308;
          break;
        case Protocol_1.Aki.Protocol.U3s.Proto_Unlocked:
          e = 1196894179;
          break;
        default:
          e = -421801185;
      }
      n = o.Entity.GetComponent(95);
      n && n.ChangeLockTag(e);
    }
  }),
  (InstanceDungeonEntranceController.mhi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10200" + Protocol_1.Aki.Protocol.qos.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InitInstanceDataList(
        e.fws,
      );
  }),
  (InstanceDungeonEntranceController.dhi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10201" + Protocol_1.Aki.Protocol.Gos.name,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InitInstanceDataList(
        e.fws,
      );
  }),
  (InstanceDungeonEntranceController.Thi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10083" + Protocol_1.Aki.Protocol.rhs.name,
      ]);
    var n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    n.CancelMatchingTimer(),
      ModelManager_1.ModelManager.InstanceDungeonModel.SetInstanceId(e.r6n),
      n.SetMatchingId(e.r6n),
      UiManager_1.UiManager.IsViewShow("OnlineChallengeApplyView") &&
        UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"),
      UiManager_1.UiManager.OpenView("OnlineChallengeApplyView");
  }),
  (InstanceDungeonEntranceController.Lhi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "10087" + Protocol_1.Aki.Protocol.Ias.name,
      ]),
      _a.Bhi(e.r6n);
  }),
  (InstanceDungeonEntranceController.Dhi = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
        "协议id",
        "11865" + Protocol_1.Aki.Protocol.Ras.name,
      ]);
    var n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
      1 !== n.GetMatchingState() ||
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "LeaderCancelMatch",
      ),
      n.CancelMatchingTimer();
  }),
  (InstanceDungeonEntranceController.Rhi = (e) => {
    e.mIa !== Protocol_1.Aki.Protocol.coh.Proto_Accept &&
      ((e = ModelManager_1.ModelManager.OnlineModel.GetCurrentTeamListById(
        e.W5n,
      ).Name),
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "RefuseInviteMatch",
        e,
      ));
  }),
  (InstanceDungeonEntranceController.OpenViewLimit = (e) =>
    !InstanceDungeonEntranceController.CheckInstanceShieldView(e) ||
    (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "InstanceDungeonShieldViewCantOpen",
    ),
    !1)),
  (InstanceDungeonEntranceController.OpenEditBattleView = () => {
    const e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
    var n =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
          ?.P5n,
      o =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
          ?.g8n;
    n && o
      ? ((n = Vector_1.Vector.Create(n)),
        (o = Rotator_1.Rotator.Create(o)),
        TeleportController_1.TeleportController.TeleportToPosition(
          n.ToUeVector(),
          o.ToUeRotator(),
          "InstanceDungeonEntranceController.OpenEditBattleView",
        ).finally(() => {
          (ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
            !0),
            EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
              e,
              !0,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEnterTeam,
            );
        }))
      : ((ModelManager_1.ModelManager.EditBattleTeamModel.InstanceMultiEnter =
          !0),
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          e,
          !0,
        ),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnEnterTeam));
  }),
  (InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack = (
    e,
  ) => {
    var n, o;
    ModelManager_1.ModelManager.OnlineModel.AllowInitiate
      ? ((n = ModelManager_1.ModelManager.CreatureModel.IsMyWorld()),
        0 < (o = ModelManager_1.ModelManager.OnlineModel.NextInitiateLeftTime)
          ? n
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "NextInviteTime",
                TimeUtil_1.TimeUtil.GetCoolDown(o),
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "NextSuggestTime",
                TimeUtil_1.TimeUtil.GetCoolDown(o),
              )
          : (UiManager_1.UiManager.IsViewOpen("OnlineChallengeApplyView") &&
              UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"),
            2 !==
              ModelManager_1.ModelManager.OnlineModel.GetContinuingChallengeConfirmState(
                ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
              ) && n
              ? OnlineController_1.OnlineController.InviteRechallengeRequest()
              : OnlineController_1.OnlineController.ApplyRechallengeRequest(
                  Protocol_1.Aki.Protocol.o8s.Proto_Settle,
                )))
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "CannotInvite",
        );
  }),
  (InstanceDungeonEntranceController.GetInstanceSubtitleTextIdByInstanceId = (
    e,
  ) => {
    e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return void 0 !== e && 22 === e.InstSubType
      ? ModelManager_1.ModelManager.MowingRiskModel.InstanceSubtitleTextId
      : void 0;
  }),
  (InstanceDungeonEntranceController.GetInstanceSubtitleArgsByInstanceId = (
    e,
  ) => {
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return void 0 !== n && 22 === n.InstSubType
      ? [
          ModelManager_1.ModelManager.MowingRiskModel.GetScoreByInstanceId(
            e,
          ).toString(),
        ]
      : void 0;
  });
//# sourceMappingURL=InstanceDungeonEntranceController.js.map
