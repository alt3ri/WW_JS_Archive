"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceController = exports.SETTLE_TYPE_MATERIALS =
    void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
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
  SolarSpeedDefine_1 = require("../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine"),
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
      InstanceDungeonEntranceController.K9a(),
      !0
    );
  }
  static OnClear() {
    return (
      (this.uhi = void 0),
      (this._hi = void 0),
      InstanceDungeonEntranceController.$9a(),
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
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        InstanceDungeonEntranceController.p5a,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        InstanceDungeonEntranceController.chi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPowerChanged,
        InstanceDungeonEntranceController.A6e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TeleportComplete,
        InstanceDungeonEntranceController.yCc,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      InstanceDungeonEntranceController.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        InstanceDungeonEntranceController.p5a,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnLeaveOnlineWorld,
        InstanceDungeonEntranceController.chi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPowerChanged,
        InstanceDungeonEntranceController.A6e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TeleportComplete,
        InstanceDungeonEntranceController.yCc,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(25953, InstanceDungeonEntranceController.mhi),
      Net_1.Net.Register(18440, InstanceDungeonEntranceController.dhi),
      Net_1.Net.Register(16277, InstanceDungeonEntranceController.Chi),
      Net_1.Net.Register(
        20954,
        InstanceDungeonEntranceController.MatchTeamNotify,
      ),
      Net_1.Net.Register(29332, InstanceDungeonEntranceController.ghi),
      Net_1.Net.Register(
        18552,
        InstanceDungeonEntranceController.MatchTeamStateNotify,
      ),
      Net_1.Net.Register(20033, InstanceDungeonEntranceController.fhi),
      Net_1.Net.Register(23779, InstanceDungeonEntranceController.phi),
      Net_1.Net.Register(27712, InstanceDungeonEntranceController.vhi),
      Net_1.Net.Register(18943, InstanceDungeonEntranceController.Mhi),
      Net_1.Net.Register(20440, InstanceDungeonEntranceController.Ehi),
      Net_1.Net.Register(22196, InstanceDungeonEntranceController.Shi),
      Net_1.Net.Register(26813, InstanceDungeonEntranceController.yhi),
      Net_1.Net.Register(20989, InstanceDungeonEntranceController.Ihi),
      Net_1.Net.Register(18059, InstanceDungeonEntranceController.Thi),
      Net_1.Net.Register(25196, InstanceDungeonEntranceController.Lhi),
      Net_1.Net.Register(25550, InstanceDungeonEntranceController.Dhi),
      Net_1.Net.Register(20141, InstanceDungeonEntranceController.Rhi),
      Net_1.Net.Register(24307, InstanceDungeonEntranceController.NMl);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(25953),
      Net_1.Net.UnRegister(18440),
      Net_1.Net.UnRegister(16277),
      Net_1.Net.UnRegister(20954),
      Net_1.Net.UnRegister(29332),
      Net_1.Net.UnRegister(18552),
      Net_1.Net.UnRegister(20033),
      Net_1.Net.UnRegister(23779),
      Net_1.Net.UnRegister(27712),
      Net_1.Net.UnRegister(18943),
      Net_1.Net.UnRegister(20440),
      Net_1.Net.UnRegister(22196),
      Net_1.Net.UnRegister(26813),
      Net_1.Net.UnRegister(20989),
      Net_1.Net.UnRegister(18059),
      Net_1.Net.UnRegister(25196),
      Net_1.Net.UnRegister(25550),
      Net_1.Net.UnRegister(24307);
  }
  static K9a() {
    InstanceDungeonEntranceController.X9a.set(
      8500,
      MowingRiskInstanceView_1.MowingRiskInstanceView,
    );
  }
  static $9a() {
    InstanceDungeonEntranceController.X9a.clear();
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
          Log_1.Log.Error("InstanceDungeon", 16, "副本入口打开错误", [
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
        )
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("InstanceDungeon", 16, "进入副本失败，副本Id不存在", [
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
            16,
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
            16,
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
          Log_1.Log.Error("InstanceDungeon", 16, "副本没有编队配置", [
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
            16,
            "请求进入副本失败，自动上阵角色列表为空",
            ["autoRoleGroupIdList", r],
          ),
        !1
      );
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "InstanceDungeon",
        16,
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
    return InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
  }
  static async LeaveInstanceDungeonRequest(e = 0) {
    var n = Protocol_1.Aki.Protocol.Hos.create(),
      e = ((n.XVn = e), await Net_1.Net.CallAsync(20996, n));
    return !(
      !e ||
      (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
        (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          15799,
        ),
        1))
    );
  }
  static async RestartInstanceDungeon(e = void 0) {
    let n = ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList;
    if (!n) {
      n = [];
      for (const o of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems())
        n.push(o.GetConfigId);
    }
    return InstanceDungeonController_1.InstanceDungeonController.SingleInstReChallengeRequest(
      n,
      e,
    );
  }
  static async InstEntranceDetailRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Vos(),
      e = ((n.L9n = e), await Net_1.Net.CallAsync(28110, n));
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
          21602,
        ),
        !1
      );
    (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.length = 0),
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.ClearDungeonArchiveInfo();
    for (const o of e.pws)
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceInstanceIdList.push(
        o.r6n,
      ),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetInstanceResetTime(
          o.r6n,
          o.ZLs,
        ),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetDungeonArchiveInfo(
          o.r6n,
          o.sDc,
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
        (n.uAc = new Protocol_1.Aki.Protocol.pOc()),
        (n.uAc.mAc =
          ModelManager_1.ModelManager.DangoAbyssModel.GetMatchDangoRoleOwnData(
            ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
            e,
          )),
        await Net_1.Net.CallAsync(22478, n));
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
          16089,
        ),
        !1))
    );
  }
  static async MatchChangeReadyRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Oas(),
      n = ((n.D9n = e), await Net_1.Net.CallAsync(27505, n));
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
            22431,
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
      e = await Net_1.Net.CallAsync(22605, e);
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
            26583,
          ),
          !1)
        : (EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam),
          !0))
    );
  }
  static async KickMatchTeamPlayerRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Was(),
      e = ((n.W5n = e), await Net_1.Net.CallAsync(19923, n));
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
          20932,
        ),
        !1))
    );
  }
  static async SetMatchTeamMatchFlagRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Qas(),
      e = ((n.u6n = e), await Net_1.Net.CallAsync(21642, n));
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
          17667,
        ),
        !1))
    );
  }
  static async EnterMatchInstRequest() {
    var e = new Protocol_1.Aki.Protocol.Jas(),
      e = await Net_1.Net.CallAsync(16168, e);
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
            28036,
            void 0,
            !0,
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel
              .IsNeedErrorCodeForEnterInstance,
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
      e.Entity.GetComponent(82)?.Restore();
  }
  static RegisterDungeonEntranceRestoreCb(e) {
    var n =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceEntityId;
    n &&
    (n = ModelManager_1.ModelManager.CreatureModel.GetEntityById(n))?.IsInit &&
    (n = n.Entity.GetComponent(82))
      ? n.RegisterRestoreCb(e)
      : e();
  }
  static async oYa(e, n = !1) {
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
        this.O3a(),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Chat", 27, "PrivateChatRequest 通信受限"),
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
          Net_1.Net.Call(21542, o, (e) => {
            e &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
                  "协议id",
                  "10051" + Protocol_1.Aki.Protocol.yas.name,
                ]),
              e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
                ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                    e.Q4n,
                    16718,
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
    this.oYa(e, n);
  }
  static CancelMatchRequest() {
    var e = new Protocol_1.Aki.Protocol.Tas();
    Net_1.Net.Call(17496, e, (e) => {
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
          "协议id",
          "10053" + Protocol_1.Aki.Protocol.Las.name,
        ]),
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16127,
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
      Net_1.Net.Call(16945, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10059" + Protocol_1.Aki.Protocol.Uas.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                16024,
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
      Net_1.Net.Call(29840, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10080" + Protocol_1.Aki.Protocol.ehs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              17951,
            );
      });
  }
  static TeamMatchAcceptInviteRequest(e, n) {
    var o = new Protocol_1.Aki.Protocol.ohs();
    (o.r6n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId()),
      (o.CIa = e
        ? Protocol_1.Aki.Protocol.GR_.jc_
        : n
          ? Protocol_1.Aki.Protocol.GR_.Proto_ActiveRefuse
          : Protocol_1.Aki.Protocol.GR_.Proto_TimeOutRefuse),
      (o.qVn = ModelManager_1.ModelManager.OnlineModel.OwnerId),
      Net_1.Net.Call(29837, o, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10085" + Protocol_1.Aki.Protocol.nhs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              16609,
            );
      });
  }
  static TeamMatchInviteRequest() {
    var e = new Protocol_1.Aki.Protocol.ths();
    (e.r6n = ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceId()),
      Net_1.Net.Call(25415, e, (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 5, "协议接收", [
            "协议id",
            "10085" + Protocol_1.Aki.Protocol.ihs.name,
          ]),
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              21240,
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
                ModelManager_1.ModelManager.PowerModel.IsPowerEnough(o) ||
                ModelManager_1.ModelManager.InstanceDungeonModel
                  .HidePowerLackConfirmBox
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
                    (n.HasToggle = !0),
                    (n.ToggleText =
                      ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                        "PlotSkipConfirmToggle",
                      )),
                    n.SetToggleFunction((e) => {
                      ModelManager_1.ModelManager.InstanceDungeonModel.HidePowerLackConfirmBox =
                        e;
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
  static async O3a() {
    await PlatformSdkManagerNew_1.PlatformSdkManagerNew.GetPlatformSdk().OpenMessageBox(
      ModelManager_1.ModelManager.PlayerInfoModel.GetThirdPartyUserId(),
      3,
      6,
    );
  }
  static CreateInstanceSubViewByType(e) {
    e = InstanceDungeonEntranceController.X9a.get(e);
    if (e) return new e();
  }
  static CheckRightTitleAvailableByInstanceId(e) {
    return (
      9e3 !==
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(
        e,
      )
    );
  }
  static GetPictureItemDataGetter(e) {
    if (
      9e3 ===
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(
        e,
      )
    )
      return () =>
        ModelManager_1.ModelManager.SolarSpeedModel.GetInfoPicturePathByInstanceId(
          e,
        );
  }
  static GetDescWidelyItemDataGetter(e) {
    if (
      9e3 ===
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(
        e,
      )
    ) {
      const n =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      return void 0 === n ? void 0 : () => n.DungeonDesc;
    }
  }
  static GetTitleWidelyItemDataGetter(e) {
    if (
      9e3 ===
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(
        e,
      )
    ) {
      const n =
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
      return void 0 === n ? void 0 : () => n.MapName;
    }
  }
  static GetScoreListItemDataGetter(r) {
    if (
      9e3 ===
      ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig?.GetEntranceIdByInstanceId(
        r,
      )
    )
      return () => {
        var e,
          n,
          o = ModelManager_1.ModelManager.SolarSpeedModel,
          t = o.GetHistoryRankByInstanceId(r);
        if (void 0 !== t && 0 !== t)
          return (
            (e = o.GetHistoryHighScoreByInstanceId(r)),
            (n = o.GetHistoryLapRecordByInstanceId(r) ?? 0),
            (o = void 0 === t ? void 0 : o.GetMedalPathByRank(t)),
            {
              TitleTextId1: SolarSpeedDefine_1.SOLAR_SPEED_HIGHEST_RANK_TEXT_ID,
              TitleTextId2:
                SolarSpeedDefine_1.SOLAR_SPEED_HIGHEST_SCORE_TEXT_ID,
              TitleTextId3: SolarSpeedDefine_1.SOLAR_SPEED_LAP_RECORD_TEXT_ID,
              ScoreText1: t?.toString() ?? "",
              ScoreText2: e?.toString() ?? "",
              ScoreText3:
                0 === n
                  ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      SolarSpeedDefine_1.SOLAR_SPEED_LAP_RECORD_NO_RECORD_TEXT_ID,
                    ) ?? "")
                  : TimeUtil_1.TimeUtil.GetTimeString(n),
              MedalPathId: o,
            }
          );
      };
  }
}
(exports.InstanceDungeonEntranceController = InstanceDungeonEntranceController),
  ((_a = InstanceDungeonEntranceController).uhi = void 0),
  (InstanceDungeonEntranceController.LimitOpenView = !0),
  (InstanceDungeonEntranceController._hi = void 0),
  (InstanceDungeonEntranceController.whi = !1),
  (InstanceDungeonEntranceController.bhi = !1),
  (InstanceDungeonEntranceController.IsSettleExternalProcess = !1),
  (InstanceDungeonEntranceController.X9a = new Map()),
  (InstanceDungeonEntranceController.nye = () => {
    (_a.whi = !1),
      InstanceDungeonEntranceController.uhi &&
        (InstanceDungeonEntranceController.Ihi(
          InstanceDungeonEntranceController.uhi,
        ),
        (InstanceDungeonEntranceController.uhi = void 0));
  }),
  (InstanceDungeonEntranceController.p5a = () => {
    _a.HandleExitMatch &&
      ((_a.HandleExitMatch = !1), _a.LeaveMatchTeamRequest()),
      _a.HandleTipsExitMatchId &&
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "CancelMatch",
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
              _a.HandleTipsExitMatchId,
            ).MapName,
          ),
        ),
        (_a.HandleTipsExitMatchId = 0));
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
  (InstanceDungeonEntranceController.yCc = () => {
    _a.HandleExitMatch &&
      ((_a.HandleExitMatch = !1), _a.LeaveMatchTeamRequest());
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
        UiManager_1.UiManager.IsViewShow("DangoAbyssInsSelectView") ||
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
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnMatchingChange,
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
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnMatchingChange),
      UiManager_1.UiManager.IsViewShow("InstanceDungeonEntranceView") ||
        (InstanceDungeonEntranceController.OpenEditBattleView(),
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
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnLeaveTeam),
        (_a.HandleExitMatch = !1))
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
  (InstanceDungeonEntranceController.Ihi = (o) => {
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
      ((_a.bhi = o.Mws), ModelManager_1.ModelManager.GameModeModel.WorldDone)
    )
      if (o.Sws)
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "InstanceDungeonRewardTimeNotEnough",
        );
      else if (
        (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SyncSettleRewardItemList(
          o.gws,
        ),
        o.Mws)
      ) {
        var t = InstanceDungeonEntranceController.Ahi(o.Mws),
          r = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
            ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
          ).SettleButtonType;
        if (r !== SETTLE_TYPE_CLOSE) {
          var a = [],
            l = o.gws;
          for (const u of Object.keys(l)) {
            var _ = l[u]?.O9n;
            if (_) {
              var i = Number(u);
              for (const E of _) {
                var c = new RewardItemData_1.RewardItemData(
                  E.L8n,
                  E.m9n,
                  void 0,
                  i,
                );
                a.push(c);
              }
            }
          }
          let e =
              1 < o.B9n
                ? ActivityDoubleRewardController_1.ActivityDoubleRewardController.GetDungeonUpActivityFullTip(
                    [1, 2],
                  )
                : void 0,
            n = !1;
          var g,
            s,
            M,
            d,
            C,
            r = ModelManager_1.ModelManager.CreatureModel?.GetInstanceId();
          r &&
            ((g =
              ConfigManager_1.ConfigManager.InstanceDungeonConfig?.GetConfig(r)
                ?.InstSubType ?? 0),
            ([r, s, M, d, C] =
              ModelManager_1.ModelManager.ActivityRegressModel.GetDungeonDoubleDropTuple(
                r,
              )),
            r &&
              ((r = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(C)),
              (C = ConfigManager_1.ConfigManager.TextConfig.GetMultiText(
                d,
                s,
                M,
              )),
              (e = "" + r + C)),
            (n =
              CommonParamById_1.configCommonParamById
                .GetIntArrayConfig("MultiRewardLevelInstType")
                ?.includes(g) ?? !1)),
            ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
              0 < a.length ? INSTANCE_SUCCESS : INSTANCE_SUCCESS_NO_REWARD,
              !0,
              a,
              void 0,
              void 0,
              t,
              void 0,
              void 0,
              void 0,
              e,
              void 0,
              ModelManager_1.ModelManager.GameModeModel.IsMulti,
              void 0,
              void 0,
              n,
            );
        }
      } else InstanceDungeonEntranceController.OpenInstanceDungeonFailView();
    else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("InstanceDungeon", 5, "副本结算通知时，世界未加载完成"),
        (InstanceDungeonEntranceController.uhi = o);
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
      n = o.Entity.GetComponent(102);
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
      ModelManager_1.ModelManager.PlotModel.IsInPlot ||
        (UiManager_1.UiManager.IsViewShow("OnlineChallengeApplyView") &&
          UiManager_1.UiManager.CloseView("OnlineChallengeApplyView"),
        UiManager_1.UiManager.OpenView("OnlineChallengeApplyView"));
  }),
  (InstanceDungeonEntranceController.NMl = (e) => {
    e = ConfigManager_1.ConfigManager.ErrorCodeConfig.GetTextByErrorId(e.Q4n);
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByItsType(
      9,
      void 0,
      void 0,
      [e],
    );
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
    var n,
      o = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    ModelManager_1.ModelManager.OnlineModel.GetIsMyTeam() ||
      1 !== o.GetMatchingState() ||
      ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
        "LeaderCancelMatch",
      ),
      ModelManager_1.ModelManager.LoadingModel?.IsLoading &&
        0 !== (n = o.GetMatchingId()) &&
        (_a.HandleTipsExitMatchId = n),
      o.CancelMatchingTimer();
  }),
  (InstanceDungeonEntranceController.Rhi = (e) => {
    e.CIa !== Protocol_1.Aki.Protocol.GR_.jc_ &&
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
    (BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()
      ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "IOSCannotUseTips",
        )
      : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "InstanceDungeonShieldViewCantOpen",
        ),
    !1)),
  (InstanceDungeonEntranceController.HandleTipsExitMatchId = 0),
  (InstanceDungeonEntranceController.HandleExitMatch = !1),
  (InstanceDungeonEntranceController.OpenEditBattleView = () => {
    const e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
    var n, o;
    ModelManager_1.ModelManager.LoadingModel.IsLoading
      ? (_a.HandleExitMatch = !0)
      : ((n =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
            ?.P5n),
        (o =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo()
            ?.g8n),
        n && o
          ? ((n = Vector_1.Vector.Create(n)),
            (o = Rotator_1.Rotator.Create(o)),
            TeleportController_1.TeleportController.TeleportToPosition(
              n.ToUeVector(),
              o.ToUeRotator(),
              void 0,
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
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnEnterTeam,
            )));
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
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return void 0 !== n && 22 === n.InstSubType
      ? ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextIdByInstanceId(
          e,
        )
      : void 0;
  }),
  (InstanceDungeonEntranceController.GetInstanceSubtitleArgsByInstanceId = (
    e,
  ) => {
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return void 0 !== n && 22 === n.InstSubType
      ? ModelManager_1.ModelManager.MowingRiskModel.BuildInstanceSubtitleTextArgsByInstanceId(
          e,
        )
      : void 0;
  }),
  (InstanceDungeonEntranceController.GetIconRightPathGetter = (e) => {
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return void 0 !== n && 28 === n.InstSubType
      ? ModelManager_1.ModelManager.SolarSpeedModel.GetIconPathInInstanceSeriesItemByInstanceId(
          e,
        )
      : void 0;
  }),
  (InstanceDungeonEntranceController.GetInstanceItemLockStateGetter = (e) => {
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return (
      void 0 !== n &&
      28 !== n.InstSubType &&
      !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.CheckInstanceUnlock(
        e,
      )
    );
  });
//# sourceMappingURL=InstanceDungeonEntranceController.js.map
