"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonController = void 0);
const ue_1 = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  BaseConfigController_1 = require("../../../Launcher/BaseConfig/BaseConfigController"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  BabelTowerController_1 = require("../Activity/ActivityContent/BabelTower/BabelTowerController"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  ReconnectDefine_1 = require("../ReConnect/ReconnectDefine"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TowerDefenceController_1 = require("../TowerDefence/TowerDefenceController"),
  TowerController_1 = require("../TowerDetailUi/TowerController"),
  InstanceDungeonEntranceController_1 = require("./InstanceDungeonEntranceController");
class InstanceDungeonController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
      this.ohi,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.$5e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputDistribute,
        this.rhi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnInstResultNotify,
        this.nhi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoadingViewOnAfterShow,
        this.Hsl,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.GeneralLogicTreeWakeUp,
      this.ohi,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        this.$5e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputDistribute,
        this.rhi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnInstResultNotify,
        this.nhi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoadingViewOnAfterShow,
        this.Hsl,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26020, InstanceDungeonController.shi),
      Net_1.Net.Register(19445, InstanceDungeonController.nhi),
      Net_1.Net.Register(16307, InstanceDungeonController.Xoh),
      Net_1.Net.Register(20066, InstanceDungeonController.pMl),
      Net_1.Net.Register(17107, InstanceDungeonController.Hy1);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26020),
      Net_1.Net.UnRegister(19445),
      Net_1.Net.UnRegister(16307),
      Net_1.Net.UnRegister(20066),
      Net_1.Net.UnRegister(17107);
  }
  static GetBeInviteOverdueTime(e) {
    return e
      ? (e.GetLimitTimestamp() - TimeUtil_1.TimeUtil.GetServerTimeStamp()) /
          WorldGlobal_1.ONE_SECOND_FOR_MILLISECOND
      : 0;
  }
  static GetInstExchangeRewardRequest(e) {
    var n = new Protocol_1.Aki.Protocol.Kos();
    (n.Cal = e),
      Net_1.Net.Call(27325, n, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeScrollingTipsView(
            e.Q4n,
            [],
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("MultiPlayerTeam", 5, "协议接收", [
              "协议id",
              "10214" + Protocol_1.Aki.Protocol.Qos.name,
            ]);
      });
  }
  static OnClickInstanceDungeonExitButton(e, n, o = !0) {
    const r = this.NeedOpenReChallengeConfirmBox();
    let t = r
      ? 219
      : BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()
        ? 296
        : 4;
    if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
      t = 133;
      const a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
      (a.IsEscViewTriggerCallBack = !1),
        a.FunctionMap.set(1, () => {
          TowerController_1.TowerController.OpenTowerView(!0), n && n();
        }),
        a.FunctionMap.set(2, () => {
          ModelManager_1.ModelManager.TowerModel.IsWaitTowerSettlement ||
            (TowerController_1.TowerController.ReChallengeTower(), e && e());
        }),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          a,
        );
    } else if (
      ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()
    )
      ControllerHolder_1.ControllerHolder.MapRogueController.OpenExploreEnd();
    else if (
      ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike() ||
      ModelManager_1.ModelManager.WeeklyRogueModel.CheckIsInWeeklyRogue()
    )
      UiManager_1.UiManager.OpenView("RoguelikeExitTips");
    else {
      if (
        TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon()
      )
        t = 207;
      else {
        if (ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower())
          return void this.eq_(e, n);
        if (
          ModelManager_1.ModelManager.BabelTowerModel.CheckInBattleBabelTower()
        )
          return void BabelTowerController_1.BabelTowerController.OnClickInstanceDungeonExitButton();
        var l =
          ModelManager_1.ModelManager.InstanceDungeonModel.GetCurrentDungeonExitConfirmId();
        void 0 !== l && 0 < l && (t = l);
      }
      l =
        ModelManager_1.ModelManager.InstanceDungeonModel?.InstanceFinishSuccess;
      if (
        ModelManager_1.ModelManager.InstanceDungeonModel?.GetInstanceDungeonInfo()
          ?.FinishEscAction &&
        o &&
        1 === l
      )
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest(
          1,
        );
      else {
        const a = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
        (a.IsEscViewTriggerCallBack = !1),
          a.FunctionMap.set(0, n),
          a.FunctionMap.set(1, () => {
            r &&
              (this.Syn() ||
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
              )),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.LeaveInstanceExternalCancel,
              ),
              n && n();
          }),
          a.FunctionMap.set(2, () => {
            if (!this.Syn())
              if (r)
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon();
              else {
                if (
                  BaseConfigController_1.BaseConfigController.GetIosAuditFirstDownloadTipWithSkip()
                )
                  return (
                    ue_1.KuroVariableFunctionLibrary.SetBoolValue(
                      "IosAuditNeedHotPatch",
                      !0,
                    ),
                    void ControllerHolder_1.ControllerHolder.ReConnectController.Logout(
                      ReconnectDefine_1.ELogoutReason.ExitGameConfirmBox,
                    )
                  );
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest();
              }
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
            ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.LeaveInstanceExternalConfirm,
              ),
              e && e();
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            a,
          );
      }
    }
  }
  static eq_(e, n) {
    var o = new ConfirmBoxDefine_1.ConfirmBoxDataNew(252);
    (o.IsEscViewTriggerCallBack = !1),
      o.FunctionMap.set(1, () => {
        ModelManager_1.ModelManager.ShipTowerModel?.OpenViewMainFromFight(),
          n?.();
      }),
      o.FunctionMap.set(2, () => {
        ModelManager_1.ModelManager.ShipTowerModel?.AgainChallenge(), e?.();
      }),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        o,
      );
  }
  static NeedOpenReChallengeConfirmBox() {
    return (
      4 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        ).InstSubType && !ModelManager_1.ModelManager.GameModeModel.IsMulti
    );
  }
  static Syn() {
    let e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SelectInstanceId;
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      (e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId());
    var n = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e);
    return (
      19 === n?.InstSubType ||
      20 === n?.InstSubType ||
      24 === n?.InstSubType ||
      21 === n?.InstSubType ||
      22 === n?.InstSubType ||
      25 === n?.InstSubType ||
      33 === n?.InstSubType
    );
  }
  static async PrewarTeamFightRequest(e, n, o = 0, r = 0, t, l) {
    if (
      ControllerHolder_1.ControllerHolder.RoleController.IsInRoleTrial() &&
      !InstanceDungeonController.CanTrialRoleEnterDungeon(o, e)
    )
      return (
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText(),
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleDungeonsLimit",
        ),
        !1
      );
    if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
      return (
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText(),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInstanceTip",
        ),
        !1
      );
    if (this.IsForbidDungeon(e))
      return (
        ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText(),
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInstanceTip",
        ),
        !1
      );
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    var a = [];
    for (const _ of n) 0 !== _ && a.push(_);
    var i = Protocol_1.Aki.Protocol.Oos.create(),
      e =
        ((i.d5n = e),
        (i.C5n = a),
        (i.L9n = o),
        (i.g5n = r),
        (i.f5n = t),
        (i.Tzs = l ?? []),
        (i.$ah =
          ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText),
        (i.nDc =
          ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue),
        BlackScreenController_1.BlackScreenController.AddBlackScreen(
          "None",
          "PreWarLeaveScene",
        ),
        (InstanceDungeonController.jsl = !0),
        await Net_1.Net.CallAsync(22656, i).finally(() => {
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
            "None",
            "PreWarLeaveScene",
          );
        }));
    return (
      (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceContinue = !1),
      ModelManager_1.ModelManager.InstanceDungeonModel.ClearInstanceEnterContentText(),
      e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            25228,
            void 0,
            !0,
            InstanceDungeonController.Stc(e.Q4n),
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.EnterInstanceDungeonFail,
            e.Q4n,
          ),
          !1)
        : ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
            n),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.EnterInstanceDungeon,
          ),
          !0)
    );
  }
  static async SingleInstReChallengeRequest(e, n = void 0) {
    if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInstanceTip",
        ),
        !1
      );
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    var o = Protocol_1.Aki.Protocol.ins.create(),
      n =
        ((o.C5n = e),
        (o.Tzs =
          ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
            e,
          ) ?? []),
        (o.$ah = n),
        BlackScreenController_1.BlackScreenController.AddBlackScreen(
          "None",
          "SingleInstReChallengeRequest",
        ),
        await Net_1.Net.CallAsync(23647, o).finally(() => {
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
            "None",
            "SingleInstReChallengeRequest",
          );
        }));
    return n.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          n.Q4n,
          15800,
        ),
        !1)
      : ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
          e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EnterInstanceDungeon,
        ),
        !0);
  }
  static TeleportDungeonRequest(e, n = !0) {
    var o = Protocol_1.Aki.Protocol.oC_.create();
    (o.w5n = this.TeleportDungeonActionIncIdHandle),
      (o.ORs = this.TeleportDungeonActionHostIdHandle),
      (o.C5n = e),
      (o.ybs = n),
      (o.nDc = this.TeleportDungeonContinueLastInst),
      Net_1.Net.Call(17425, o, (e) => {
        e.Cvs !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Cvs,
            25228,
          );
      }),
      (this.TeleportDungeonContinueLastInst = !1),
      (this.TeleportDungeonActionHostIdHandle = 0),
      (this.TeleportDungeonActionIncIdHandle = 0);
  }
  static IsForbidDungeon(e) {
    if (!this.XJa) {
      if (!this.YJa) return !0;
      if (!this.YJa.includes(e)) return !0;
    }
    return !1;
  }
  static UpdateForbidDungeon(e, n) {
    (this.XJa = e), (this.YJa = n);
  }
  static UpdateTrialRoleDungeonWhiteList(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InstanceDungeon", 48, "更新试用角色副本白名单", [
        "DungeonList",
        e,
      ]);
    var n =
      ModelManager_1.ModelManager.InstanceDungeonModel
        .TrialRoleDungeonWhiteList;
    n.length = 0;
    for (const o of e) n.push(o);
  }
  static CanTrialRoleEnterDungeon(e, n) {
    if (e <= 0 || n <= 0) return !1;
    if (
      !ModelManager_1.ModelManager.InstanceDungeonModel.TrialRoleDungeonWhiteList.includes(
        n,
      )
    )
      return !1;
    let o = !0;
    var n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      n =
        (0 < n &&
          12 ===
            (n =
              ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(n))
              ?.InstSubType &&
          0 < n?.WorldDungeonSubType &&
          (o = !1),
        ConfigManager_1.ConfigManager.InstanceDungeonEntranceConfig.GetConfig(
          e,
        ));
    return !(o && (!n || 2 !== n.FlowId));
  }
  static Stc(e) {
    return e !== Protocol_1.Aki.Protocol.Q4n.Proto_TeamParkMemberErr;
  }
  static CheckAndShowDungeonArchiveExpireTips(e) {
    var n;
    !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveActivate(
      e,
    ) ||
      e <= 0 ||
      (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveExpire(
        e,
      ) &&
        !ModelManager_1.ModelManager.InstanceDungeonEntranceModel.IsDungeonArchiveExpireTipsShow(
          e,
        ) &&
        ((n =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetDungeonArchiveExpireLocalTips(
            e,
          )),
        StringUtils_1.StringUtils.IsEmpty(n) ||
          ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
            n,
          ),
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.SetDungeonArchiveExpireTipsShow(
          e,
        )));
  }
}
(exports.InstanceDungeonController = InstanceDungeonController),
  ((_a = InstanceDungeonController).XJa = !0),
  (InstanceDungeonController.jsl = !1),
  (InstanceDungeonController.YJa = []),
  (InstanceDungeonController.rhi = (e) => {
    !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
      e !== InputMappingsDefine_1.actionMappings.功能菜单 ||
      LevelEventLockInputState_1.LevelEventLockInputState.InputLimitEsc ||
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() ||
      InstanceDungeonController.OnClickInstanceDungeonExitButton();
  }),
  (InstanceDungeonController.ohi = () => {
    var e;
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      ((e =
        ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonInfo()) ||
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("InstanceDungeon", 27, "加载结束但是副本行为树为空")),
      e?.SetTrack(!0));
  }),
  (InstanceDungeonController.$5e = () => {
    ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      (ModelManager_1.ModelManager.InstanceDungeonModel.ConstructCurrentDungeonAreaName(),
      ModelManager_1.ModelManager.InstanceDungeonModel.GetInstanceDungeonName() &&
        UiManager_1.UiManager.OpenView("InstanceDungeonAreaView"),
      (ModelManager_1.ModelManager.InstanceDungeonModel.CurrentInstanceIsFinish =
        ModelManager_1.ModelManager.ExchangeRewardModel?.IsFinishInstance(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
        ))),
      _a.TeleportDungeonActionDungeonIdHandle &&
        (ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          _a.TeleportDungeonActionDungeonIdHandle,
          !1,
          !1,
        ),
        (_a.TeleportDungeonActionDungeonIdHandle = 0));
  }),
  (InstanceDungeonController.shi = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InstanceDungeon", 5, "副本信息通知", [
        "副本玩法Id:",
        e.s5n,
      ]),
      ModelManager_1.ModelManager.InstanceDungeonModel.CreateInstanceInfo(
        e.s5n,
      );
  }),
  (InstanceDungeonController.nhi = (e) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InstanceDungeon", 5, "副本结束通知", ["副本Id:", e.s5n]),
      e.s5n !== ModelManager_1.ModelManager.CreatureModel.GetInstanceId()
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "InstanceDungeon",
            63,
            "副本结束通知跳过更新,与当前副本id不一致",
            ["副本Id:", e.s5n],
            [
              "当前副本Id:",
              ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
            ],
          )
        : ((ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess =
            e.tMs ? 1 : 2),
          (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake =
            e.Ews));
  }),
  (InstanceDungeonController.Hsl = () => {
    InstanceDungeonController.jsl &&
      (BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
        "None",
        "PreWarLeaveScene",
      ),
      (InstanceDungeonController.jsl = !1));
  }),
  (InstanceDungeonController.TeleportDungeonActionHostIdHandle = 0),
  (InstanceDungeonController.TeleportDungeonActionIncIdHandle = 0),
  (InstanceDungeonController.TeleportDungeonActionDungeonIdHandle = 0),
  (InstanceDungeonController.TeleportDungeonContinueLastInst = !1),
  (InstanceDungeonController.Xoh = (n) => {
    var e,
      o = n.M9n;
    (_a.TeleportDungeonActionHostIdHandle = n.ORs),
      (_a.TeleportDungeonActionIncIdHandle = n.w5n),
      ModelManager_1.ModelManager.SundryModel?.IsBlockTpDungeon()
        ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
            "TeleportDungeon被GM屏蔽，跳过执行",
          ),
          _a.TeleportDungeonRequest([], !1))
        : ControllerHolder_1.ControllerHolder.InstanceDungeonController.IsForbidDungeon(
              o,
            )
          ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
              "PhantomFormationEnterInstanceTip",
            ),
            _a.TeleportDungeonRequest([], !1))
          : !ControllerHolder_1.ControllerHolder.ConfirmBoxController.CheckIsConfirmBoxOpen() &&
              ((e =
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                  .InstanceId),
              (e =
                ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
                  e,
                ))) &&
              e.InstType
            ? ((_a.TeleportDungeonContinueLastInst = n.nDc),
              n.gS_
                ? ((e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
                    164,
                  )).FunctionMap.set(2, () => {
                    var e = n.M9n;
                    (ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId =
                      e),
                      _a.TeleportDungeonRequest(
                        ModelManager_1.ModelManager.InstanceDungeonModel
                          .LastEnterRoleList,
                      );
                  }),
                  e.FunctionMap.set(1, () => {
                    _a.TeleportDungeonRequest([], !1),
                      ControllerHolder_1.ControllerHolder.ConfirmBoxController.CloseConfirmBoxView();
                  }),
                  ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
                    e,
                  ))
                : n.CS_
                  ? ((ModelManager_1.ModelManager.EditBattleTeamModel.IsFormTeleportAction =
                      !0),
                    ModelManager_1.ModelManager.LoadingModel?.IsLoading
                      ? (_a.TeleportDungeonActionDungeonIdHandle = o)
                      : ControllerHolder_1.ControllerHolder.EditBattleTeamController.PlayerOpenEditBattleTeamView(
                          o,
                          !1,
                          !1,
                        ))
                  : _a.TeleportDungeonRequest(
                      ModelManager_1.ModelManager.InstanceDungeonModel
                        .LastEnterRoleList,
                    ))
            : _a.TeleportDungeonRequest([], !1);
  }),
  (InstanceDungeonController.pMl = (e) => {
    (e = e.M9n),
      (e = ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)),
      (e =
        e && e.InstType === Protocol_1.Aki.Protocol.i4s.Proto_BigWorldInstance
          ? "TrialRoleTransmitLimit"
          : "TrialRoleDungeonsLimit");
    ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
      e,
    );
  }),
  (InstanceDungeonController.Hy1 = (e) => {
    ModelManager_1.ModelManager.InstanceDungeonModel?.ClearInstanceIdsWithSaveData();
    for (const o of e.BVn) {
      var n = MathUtils_1.MathUtils.LongToNumber(o);
      ModelManager_1.ModelManager.InstanceDungeonModel?.AddInstanceIdsWithSaveData(
        n,
      );
    }
  });
//# sourceMappingURL=InstanceDungeonController.js.map
