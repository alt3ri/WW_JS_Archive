"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiTimeDilation_1 = require("../../Ui/Base/UiTimeDilation"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../../Ui/UiManager"),
  WorldGlobal_1 = require("../../World/WorldGlobal"),
  BlackScreenController_1 = require("../BlackScreen/BlackScreenController"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  RoleController_1 = require("../RoleUi/RoleController"),
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
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(28975, InstanceDungeonController.shi),
      Net_1.Net.Register(20520, InstanceDungeonController.nhi);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(28975), Net_1.Net.UnRegister(20520);
  }
  static GetBeInviteOverdueTime(e) {
    return e
      ? (e.GetLimitTimestamp() - TimeUtil_1.TimeUtil.GetServerTimeStamp()) /
          WorldGlobal_1.ONE_SECOND_FOR_MILLISECOND
      : 0;
  }
  static GetInstExchangeRewardRequest() {
    var e = new Protocol_1.Aki.Protocol.Kos();
    Net_1.Net.Call(27474, e, (e) => {
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
    let t = r ? 219 : 4;
    if (ModelManager_1.ModelManager.TowerModel.CheckInTower()) {
      t = 133;
      const i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
      (i.IsEscViewTriggerCallBack = !1),
        i.FunctionMap.set(1, () => {
          TowerController_1.TowerController.LeaveTower(), n && n();
        }),
        i.FunctionMap.set(2, () => {
          TowerController_1.TowerController.ReChallengeTower(), e && e();
        }),
        void ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
          i,
        );
    } else if (ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike())
      UiManager_1.UiManager.OpenView("RoguelikeExitTips");
    else {
      TowerDefenceController_1.TowerDefenseController.CheckInInstanceDungeon() &&
        (t = 207);
      var l =
        ModelManager_1.ModelManager.InstanceDungeonModel?.InstanceFinishSuccess;
      if (
        ModelManager_1.ModelManager.InstanceDungeonModel?.GetInstanceDungeonInfo()
          ?.FinishEscAction &&
        o &&
        1 === l
      )
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest(
          0,
          0,
          1,
        );
      else {
        const i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(t);
        (i.IsEscViewTriggerCallBack = !1),
          i.FunctionMap.set(0, n),
          i.FunctionMap.set(1, () => {
            r &&
              (this.Syn() ||
                InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
              )),
              n && n();
          }),
          i.FunctionMap.set(2, () => {
            this.Syn() ||
              (r
                ? InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon()
                : InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeonRequest()),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
              ),
              e && e();
          }),
          (i.BeforePlayCloseFunction = () => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("InstanceDungeon", 5, "副本离开确认框时停结束"),
              -1 !== this.ahi &&
                ((this.ahi = -1),
                UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
                  ViewId: this.ahi,
                  TimeDilation: 1,
                  DebugName: "ConfirmBoxView",
                  Reason: "InstanceDungeon",
                }));
          }),
          ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
            i,
          ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("InstanceDungeon", 5, "副本离开确认框触发时停");
        o = UiManager_1.UiManager.GetViewByName("ConfirmBoxView");
        o &&
          ((this.ahi = o.GetViewId()),
          UiTimeDilation_1.UiTimeDilation.SetGameTimeDilation({
            ViewId: this.ahi,
            TimeDilation: 0,
            DebugName: "ConfirmBoxView",
            Reason: "InstanceDungeon",
          }));
      }
    }
  }
  static NeedOpenReChallengeConfirmBox() {
    return (
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(
        ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
      ).SettleButtonType ===
        InstanceDungeonEntranceController_1.SETTLE_TYPE_MATERIALS &&
      !ModelManager_1.ModelManager.GameModeModel.IsMulti
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
      21 === n?.InstSubType ||
      22 === n?.InstSubType
    );
  }
  static async PrewarTeamFightRequest(e, n, o = 0, r = 0, t, l) {
    if (RoleController_1.RoleController.IsInRoleTrial())
      return (
        ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TrialRoleDungeonsLimit",
        ),
        !1
      );
    if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInstanceTip",
        ),
        !1
      );
    if (this.IsForbidDungeon(e))
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInstanceTip",
        ),
        !1
      );
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    var i = Protocol_1.Aki.Protocol.Oos.create(),
      e =
        ((i.d5n = e),
        (i.C5n = n),
        (i.L9n = o),
        (i.g5n = r),
        (i.f5n = t),
        (i.Tzs = l ?? []),
        BlackScreenController_1.BlackScreenController.AddBlackScreen(
          "None",
          "LeaveScene",
        ),
        await Net_1.Net.CallAsync(23442, i).finally(() => {
          BlackScreenController_1.BlackScreenController.RemoveBlackScreen(
            "None",
            "LeaveScene",
          );
        }));
    return e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          e.Q4n,
          15565,
        ),
        !1)
      : ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
          n),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EnterInstanceDungeon,
        ),
        !0);
  }
  static async SingleInstReChallengeRequest(e) {
    if (ModelManager_1.ModelManager.SceneTeamModel.IsPhantomTeam)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
          "PhantomFormationEnterInstanceTip",
        ),
        !1
      );
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestoreDungeonEntranceEntity();
    var n = Protocol_1.Aki.Protocol.ins.create(),
      n =
        ((n.C5n = e),
        (n.Tzs =
          ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
            e,
          ) ?? []),
        await Net_1.Net.CallAsync(22356, n));
    return n.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
      ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
          n.Q4n,
          21037,
        ),
        !1)
      : ((ModelManager_1.ModelManager.InstanceDungeonModel.LastEnterRoleList =
          e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.EnterInstanceDungeon,
        ),
        !0);
  }
  static IsForbidDungeon(e) {
    return !(this.fXa || !this.pXa || this.pXa.includes(e));
  }
  static UpdateForbidDungeon(e, n) {
    (this.fXa = e), (this.pXa = n);
  }
}
((exports.InstanceDungeonController = InstanceDungeonController).ahi = -1),
  (InstanceDungeonController.fXa = !0),
  (InstanceDungeonController.pXa = []),
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
          Log_1.Log.Debug("InstanceDungeon", 28, "加载结束但是副本行为树为空")),
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
        )));
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
      e.s5n === ModelManager_1.ModelManager.CreatureModel.GetInstanceId() &&
        ((ModelManager_1.ModelManager.InstanceDungeonModel.InstanceFinishSuccess =
          e.tMs ? 1 : 2),
        (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceRewardHaveTake =
          e.Ews));
  });
//# sourceMappingURL=InstanceDungeonController.js.map
