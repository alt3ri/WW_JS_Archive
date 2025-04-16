"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  InstOnlineType_1 = require("../../../Core/Define/Config/SubType/InstOnlineType"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  PhantomItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByItemId"),
  TowerDefenceInstanceById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceById"),
  TowerDefenceInstanceByInstanceId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceByInstanceId"),
  TowerDefenceMapMarkByActivityId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceMapMarkByActivityId"),
  TowerDefencePhantomById_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  SolarSpeedDefine_1 = require("../Activity/ActivityContent/SolarisSpeed/SolarSpeedDefine"),
  TowerDefenseRolePanel_1 = require("../Activity/ActivityContent/SolarisSpeed/View/TowerDefenseRolePanel"),
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  EditFormationDefine_1 = require("../EditFormation/EditFormationDefine"),
  InstanceDungeonController_1 = require("../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TowerDefenceDefine_1 = require("./TowerDefenceDefine"),
  TowerDefenceInBattleView_1 = require("./View/TowerDefenceInBattleView"),
  TowerDefencePhantomIconItem_1 = require("./View/TowerDefencePhantomIconItem"),
  TowerDefencePhantomSkillItem_1 = require("./View/TowerDefencePhantomSkillItem"),
  TowerDefenceSubView_1 = require("./View/TowerDefenceSubView");
class TowerDefenseController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.tZs = (e) => {
        var n;
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 64, "塔防活动状态变化时刷新的数据", [
            "notify",
            e,
          ]),
          e.Izs &&
            ((n =
              ModelManager_1.ModelManager
                .TowerDefenseModel).PhantomMessageCache.ParseTowerDefenseActivityData(
              e.Izs,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RefreshCommonActivityRedDot,
              n.PhantomMessageCache.Id,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TowerDefenseOnActivityInfoUpdateNotify,
            ));
      }),
      (this.iZs = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            64,
            "副本数据发生变化时的变化，包括是否副本解锁，副本分数等",
            ["notify", e],
          ),
          ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseInstanceDataList(
            e.Mzs,
            !1,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TowerDefenseOnInstanceInfoUpdateNotify,
          );
      }),
      (this.rZs = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            64,
            "战斗声骸升级/获得经验时刷新的数据",
            ["notify", e],
          ),
          ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseOwnPhantomDataList(
            e.Dps,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify,
          ),
          TowerDefenseController.zra();
      }),
      (this.ECa = (e) => {
        ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed
          ? TowerDefenseController.ERa(e)
          : (ModelManager_1.ModelManager.TowerDefenseModel.DelayedEndNotify =
              e);
      }),
      (this.Zra = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 64, "进入战斗副本时刷新的数据", [
            "notify",
            e,
          ]);
        var n,
          t,
          r = ModelManager_1.ModelManager.TowerDefenseModel;
        r.ResetPhantomOwnerDataList();
        for ([n, t] of e.Y7n.entries()) {
          var o = r.PhantomOwnerDataList[n],
            a = t.hxs,
            i = a.s5n;
          (o.RoleCfgId = t.Q6n),
            (o.PhantomId = i),
            r.PhantomMessageCache.OwnPhantomInBattleDataCache.set(i, a);
        }
      }),
      (this.tQa = (n) => {
        const t = MathUtils_1.MathUtils.LongToNumber(n.ZM_);
        var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
        const r = TimeUtil_1.TimeUtil.SetTimeSecond(t - e);
        var o = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(r + 0.5);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            64,
            "局内角色角色角色复活通知",
            ["notify", n],
            ["time", t],
            ["local time with stop", e],
            ["local time", TimeUtil_1.TimeUtil.GetServerTimeStamp()],
            ["count down", o],
          ),
          void 0 !== o.CountDownText &&
            (TowerDefenseController.CheckIsSelf(n.W5n)
              ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "TowerDefenceRoleDie",
                  o.CountDownText,
                )
              : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                  "TowerDefencePlayerDie",
                  o.CountDownText,
                ));
        const a = ModelManager_1.ModelManager.TowerDefenseModel;
        e = TimerSystem_1.TimerSystem.Forever(() => {
          var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
          e >= t
            ? (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName
                  .OnRefreshFormationCooldownExternalInBattleView,
                n.W5n,
                n.Q6n,
              ),
              a.TryRemoveTimerInBattle(n.W5n, n.Q6n))
            : EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName
                  .OnRefreshFormationCooldownExternalInBattleView,
                n.W5n,
                n.Q6n,
                TimeUtil_1.TimeUtil.SetTimeSecond(t - e),
                r,
              );
        }, 100);
        a.TryAddTimerInBattle(e, n.W5n, n.Q6n);
      }),
      (this.iQa = (n) => {
        const t = MathUtils_1.MathUtils.LongToNumber(n.ZM_);
        var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
        const r = TimeUtil_1.TimeUtil.SetTimeSecond(t - e);
        e = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
          0.5 + TimeUtil_1.TimeUtil.SetTimeSecond(t - e),
        );
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            64,
            "局内玩家玩家玩家复活通知",
            ["notify", n],
            ["time", MathUtils_1.MathUtils.LongToNumber(n.ZM_)],
            [
              "local time with stop",
              TimeUtil_1.TimeUtil.GetServerStopTimeStamp(),
            ],
            ["local time", TimeUtil_1.TimeUtil.GetServerTimeStamp()],
            ["count down", e],
          ),
          TowerDefenseController.CheckIsSelf(n.W5n)
            ? (ModelManager_1.ModelManager.TowerDefenseModel.SelfReviveTargetTimestampForUi =
                MathUtils_1.MathUtils.LongToNumber(n.ZM_))
            : void 0 !== e.CountDownText &&
              ((i =
                ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
                  n.W5n,
                )?.PlayerNumber ?? 0),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "TowerDefencePlayerRoleDie",
                i,
                e.CountDownText,
              ));
        const o = ModelManager_1.ModelManager.TowerDefenseModel;
        o.TryRemoveTimerInBattle(n.W5n);
        var a,
          i =
            ModelManager_1.ModelManager.BattleUiModel.FormationPanelData
              ?.PositionItemMap;
        if (i) {
          const o = ModelManager_1.ModelManager.TowerDefenseModel;
          for (const [, l] of i)
            l.PlayerId === n.W5n &&
              ((a = TimerSystem_1.TimerSystem.Forever(() => {
                var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
                e >= t
                  ? (EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName
                        .OnRefreshFormationCooldownExternalInBattleView,
                      n.W5n,
                      0,
                    ),
                    o.TryRemoveTimerInBattle(n.W5n, l.RoleId))
                  : EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName
                        .OnRefreshFormationCooldownExternalInBattleView,
                      n.W5n,
                      0,
                      TimeUtil_1.TimeUtil.SetTimeSecond(t - e),
                      r,
                    );
              }, 100)),
              o.TryAddTimerInBattle(a, n.W5n, l.RoleId));
        }
      });
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg();
  }
  OnCreateSubPageComponent(e) {
    return new TowerDefenceSubView_1.TowerDefenseSubView();
  }
  OnGetActivityResource(e) {
    return "UiItem_LordGymMainA";
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      TowerDefenseController.sZs,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect,
        TowerDefenseController.aZs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        TowerDefenseController.hZs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        TowerDefenseController.lZs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        TowerDefenseController._Zs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceExternalConfirm,
        TowerDefenseController.Fil,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleScoreChanged,
        TowerDefenseController.mZs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView,
        TowerDefenseController.WZs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm,
        TowerDefenseController.yCa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        TowerDefenseController.yRa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        TowerDefenseController.IRa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSelectInstanceIdChallenge,
        TowerDefenseController.y1l,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      TowerDefenseController.sZs,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect,
        TowerDefenseController.aZs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        TowerDefenseController.hZs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        TowerDefenseController.lZs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        TowerDefenseController._Zs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceExternalConfirm,
        TowerDefenseController.Fil,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleScoreChanged,
        TowerDefenseController.mZs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView,
        TowerDefenseController.WZs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm,
        TowerDefenseController.yCa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        TowerDefenseController.yRa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        TowerDefenseController.IRa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSelectInstanceIdChallenge,
        TowerDefenseController.y1l,
      );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(21520, this.tZs),
      Net_1.Net.Register(16448, this.iZs),
      Net_1.Net.Register(22962, this.rZs),
      Net_1.Net.Register(20538, this.ECa),
      Net_1.Net.Register(27118, this.Zra),
      Net_1.Net.Register(25015, this.tQa),
      Net_1.Net.Register(16192, this.iQa);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(21520),
      Net_1.Net.UnRegister(16448),
      Net_1.Net.UnRegister(22962),
      Net_1.Net.UnRegister(20538),
      Net_1.Net.UnRegister(27118),
      Net_1.Net.UnRegister(25015),
      Net_1.Net.UnRegister(16192);
  }
  GetActivityLevelUnlockState(e) {
    return TowerDefenseController.CheckIsInstanceUnlock(e);
  }
  static MarkPhantomIconScrollDataChosen(e, n, t) {
    var r = ModelManager_1.ModelManager.TowerDefenseModel,
      o = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      o = r.GetOwnerData(o, t);
    if (n)
      if (o && o.PhantomId !== TowerDefenceDefine_1.DEFAULT_ID)
        r.CurrentSelfPhantomIdInUiTemp = o.PhantomId;
      else
        for (const l of e) {
          var a = l.Data;
          if (!a.IsOccupied && !a.IsLocked) {
            r.CurrentSelfPhantomIdInUiTemp = a.ConfigId;
            break;
          }
        }
    for (const s of e) {
      var i = s.Data;
      i.IsChosen = r.CurrentSelfPhantomIdInUiTemp === i.ConfigId;
    }
  }
  static CheckSelfPhantomCancelAble(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      t = n.GetOwnerData(t, e);
    return (
      !(!t || t.PhantomId === TowerDefenceDefine_1.DEFAULT_ID) &&
      n.CurrentSelfPhantomIdInUiTemp === t.PhantomId
    );
  }
  static BuildCurrentPhantomNameTextIdInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomNameTextId();
  }
  static BuildPreviewRewardData() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetPreviewRewardData();
  }
  static BuildPhantomForInstanceDungeonEntranceData(e) {
    var n = [];
    for (const r of TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
      e,
    ).OptionalBuff) {
      var t = {
        ItemId:
          TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(r)
            .PhantomItemId,
        IncId: 0,
      };
      n.push([t, 0]);
    }
    return n;
  }
  static BuildRecommendLevelForInstanceDungeonEntranceData(e) {
    return {
      TextId: "RecommendLevel",
      Level:
        InstanceDungeonById_1.configInstanceDungeonById
          .GetConfig(e)
          ?.RecommendLevel.get(1) ?? 0,
    };
  }
  static BuildTotalScoreContent() {
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.TotalScore.toString();
  }
  static BuildPhantomTipsInBattleData() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel,
      n = e.GetCurrentPhantomSkillCfgListInBattle(),
      t = e.GetCurrentPhantomLevelInBattle(),
      n = n[t - 1];
    return {
      TitleTextId: n.Name,
      PhantomTextId: n.Name,
      Level: t,
      DescTextId: n.Description,
      DescArgs: e.GetCurrentPhantomSkillDescriptionArgsInBattle(),
    };
  }
  static BuildTeamPhantomIconData(e, n) {
    e = ModelManager_1.ModelManager.TowerDefenseModel.GetOwnerData(e, n);
    if (e) {
      n = e.PhantomId;
      if (n && !(n <= 0)) {
        e =
          TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(n);
        if (e)
          return PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(
            e.PhantomItemId,
          )?.IconMiddle;
      }
    }
  }
  static nZs(e) {
    return [
      {
        ButtonTextId: "Text_ButtonTextExit_Text",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: TowerDefenseController.CZs,
      },
      {
        ButtonTextId: "TowerDefence_Restart",
        DescriptionTextId: "TowerDefence_GPint",
        DescriptionArgs: [e],
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: TowerDefenseController.gZs,
      },
    ];
  }
  static BuildPhantomIdListByOwnRoleCfgIdList(e) {
    var n = [];
    if (TowerDefenseController.CheckInUiFlow()) {
      var t = ModelManager_1.ModelManager.TowerDefenseModel,
        r = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const a of e) {
        var o = t.GetOwnerData(r, a);
        let e = TowerDefenceDefine_1.DEFAULT_ID;
        o && (e = o.PhantomId), n.push(e);
      }
    }
    return n;
  }
  static BuildInstanceCountDownTextParam(e) {
    var t = ModelManager_1.ModelManager.TowerDefenseModel,
      n =
        TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
          e,
        );
    if (n) {
      t = t.PhantomMessageCache.StageMapCache.get(n.Id);
      if (t) {
        t =
          t.UnlockTime * TimeUtil_1.TimeUtil.Millisecond -
          TimeUtil_1.TimeUtil.GetServerTime();
        if (t <= 0) return "";
        var r = Math.max(t, TimeUtil_1.TimeUtil.Minute);
        let e = 1,
          n = 1;
        return (
          r > CommonDefine_1.SECOND_PER_DAY
            ? ((e = 3), (n = 3))
            : t > CommonDefine_1.SECOND_PER_HOUR && ((e = 2), (n = 2)),
          TimeUtil_1.TimeUtil.GetCountDownDataFormat2(r, e, n).CountDownText ??
            ""
        );
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TowerDefense",
          64,
          "指定塔防副本协议数据不存在",
          ["InstanceId", e],
          ["TowerDefenseInstanceId", n.Id],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("TowerDefense", 64, "副本ID与塔防副本表不对应", [
          "InstanceId",
          e,
        ]);
  }
  static BuildInstanceCountDownText(e) {
    e = this.BuildInstanceCountDownTextParam(e);
    if (e)
      return StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityMowing_UnlockCondition",
        ),
        e,
      );
  }
  static dZs() {
    if (
      TowerDefenseController.CheckInUiFlow() &&
      TowerDefenseController.toa()
    ) {
      var t = ModelManager_1.ModelManager.TowerDefenseModel,
        e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
      if (e) {
        let n = 0;
        for (const s of e.TRs) {
          var r = s.W5n;
          for (const _ of s.J6n) {
            var o = _.Q6n,
              a = _.Tzs,
              i = TowerDefenseController.CheckIsSelf(r),
              l = t.PhantomOwnerDataList[n++];
            (l.PlayerId = r),
              (l.IsSelf = i),
              (l.RoleCfgId = o),
              (l.RoleSkinId = _.eI_),
              (l.PhantomId = a),
              i && t.RoleCfgId2PhantomIdMapCache.set(o, a);
          }
        }
        for (let e = n; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++)
          t.ResetPhantomOwnerDataByIndex(e),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "TowerDefense",
                64,
                "同步匹配数据时，队伍不足3人，所以将不足的数据重置",
                ["第几个角色是空缺", e],
              );
      }
    }
  }
  static Fea() {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      t = ModelManager_1.ModelManager.EditBattleTeamModel;
    for (let e = 0; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var r = t.GetRoleSlotData(e + 1);
      if (r) {
        var r = r.GetRoleData,
          o = n.PhantomOwnerDataList[e];
        if (r) {
          (o.PlayerId = r.PlayerId),
            (o.IsSelf = r.IsSelf),
            (o.RoleCfgId = r.ConfigId),
            (o.RoleSkinId = r.SkinId),
            (o.PhantomId =
              n.RoleCfgId2PhantomIdMapCache.get(r.ConfigId) ??
              TowerDefenceDefine_1.DEFAULT_ID);
          continue;
        }
      }
      n.ResetPhantomOwnerDataByIndex(e);
    }
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 64, "单机战队编辑界面同步后的Owner数据", [
        "OwnerData",
        n.PhantomOwnerDataList,
      ]);
  }
  static zra() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel,
      n = e.GetCurrentPhantomIdInBattle(),
      e =
        e.PhantomMessageCache.OwnPhantomInBattleNewLevelUpFlagCache.get(n) ??
        !1;
    !UiManager_1.UiManager.IsViewOpen("TowerDefenceInBattleTips") &&
      e &&
      UiManager_1.UiManager.OpenView("TowerDefenceInBattleTips");
  }
  static async EnterTowerDefense() {
    var e = ModelManager_1.ModelManager.InstanceDungeonEntranceModel,
      n = ModelManager_1.ModelManager.EditBattleTeamModel,
      t = e.InstanceId;
    return t
      ? ((n = n.GetOwnRoleConfigIdList[0]),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "TowerDefense",
            10,
            "进入塔防副本",
            ["instanceId", t],
            ["RoleIdList", n],
          ),
        await InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
          t,
          n,
          e.EntranceId,
          0,
          void 0,
          ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
            n,
          ),
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("TowerDefense", 64, "进入副本失败，副本Id不存在", [
            "instanceId",
            t,
          ]),
        !1);
  }
  static RequestScoreReward(n) {
    var e = Protocol_1.Aki.Protocol.gzs.create();
    const t = ModelManager_1.ModelManager.TowerDefenseModel;
    (e.BVn = [n]),
      Net_1.Net.CallAsync(22376, e).then(
        (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "TowerDefense",
              64,
              "塔防积分奖励的response",
              ["response", e],
              ["rewardId", n],
            ),
            e &&
              e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
              (t.PhantomMessageCache.UpdateByScoreRewardRequest(n),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                t.GetPreviewRewardData(),
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                t.PhantomMessageCache.Id,
              ));
        },
        () => {},
      );
  }
  static RequestInstanceReward(n) {
    var e = Protocol_1.Aki.Protocol.mzs.create();
    const t = ModelManager_1.ModelManager.TowerDefenseModel;
    (e.BVn = [n]),
      Net_1.Net.CallAsync(22184, e).then(
        (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "TowerDefense",
              64,
              "塔防关卡奖励的response",
              ["response", e],
              ["instanceId", n],
            ),
            e &&
              e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
              (t.PhantomMessageCache.UpdateByInstanceRewardRequest(n),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                t.GetPreviewRewardData(),
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                t.PhantomMessageCache.Id,
              ));
        },
        () => {},
      );
  }
  static async RequestSelfRankData(e) {
    var n = Protocol_1.Aki.Protocol.tnc.create(),
      e = ((n.s5n = e), await Net_1.Net.CallAsync(25554, n));
    e &&
      ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetSelfServerData(
        e._sc,
      );
  }
  static async RequestRankList(e) {
    var n = Protocol_1.Aki.Protocol.hoc.create(),
      e = ((n.s5n = e), await Net_1.Net.CallAsync(24523, n));
    e &&
      (e.Q4n === Protocol_1.Aki.Protocol.Q4n.Proto_ErrTowerDefenceRankCd
        ? (ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetSelfServerData(
            e._sc,
          ),
          ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetIsOpenAnonymousName(
            !e.csc,
          ))
        : e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
          ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              29435,
            )
          : (ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetFriendServerData(
              e.lsc,
            ),
            ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetSelfServerData(
              e._sc,
            ),
            ModelManager_1.ModelManager.TowerDefenseModel.RankData.SetIsOpenAnonymousName(
              !e.csc,
            )));
  }
  static RequestRankShowName(e, n) {
    var t = Protocol_1.Aki.Protocol._oc.create();
    (t.csc = e),
      Net_1.Net.Call(28546, t, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                29435,
              )
            : n?.());
      });
  }
  static SetCurrentTowerDefensePhantomIdInUiTemp(e) {
    ModelManager_1.ModelManager.TowerDefenseModel.CurrentSelfPhantomIdInUiTemp =
      e;
  }
  static ResetCurrentTowerDefensePhantomIdInUiTemp() {
    ModelManager_1.ModelManager.TowerDefenseModel.ResetCurrentPhantomIdInUiTempToFirstAvailable();
  }
  static ToggleInBattleView() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.BattleUiToggleTowerDefenseInfoView,
    );
  }
  static ResetCurrentPhantomLevelUpFlag(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      t = n.GetCurrentPhantomIdInBattle(),
      r = n.GetCurrentPhantomLevelInBattle();
    n.PhantomMessageCache.OwnPhantomInBattleNewLevelUpFlagCache.set(t, e < r);
  }
  static TryReopenInBattleTip() {
    TowerDefenseController.zra();
  }
  static TryOpenPhantomViewByPlayerIdAndRoleId(e, n) {
    TowerDefenseController.CheckIsSelf(e) &&
      (ModelManager_1.ModelManager.InstanceDungeonModel.GetPrewarPlayerReadyState(
        e,
      )
        ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "TowerDefence_PhantasmTips",
          )
        : ((e = { RoleCfgId: n }),
          UiManager_1.UiManager.OpenView("TowerDefencePhantomView", e)));
  }
  static SyncSelfTowerDefensePhantomId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      t = n.GetOwnerData(t, e);
    t
      ? ((t.PhantomId = n.CurrentSelfPhantomIdInUiTemp),
        n.RoleCfgId2PhantomIdMapCache.set(e, n.CurrentSelfPhantomIdInUiTemp),
        TowerDefenseController.toa()
          ? ((t = ModelManager_1.ModelManager.EditBattleTeamModel),
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(
              t.GetOwnRoleConfigIdList[0],
            ).then(
              (e) => {
                e &&
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.TowerDefensePhantomChanged,
                  );
              },
              () => {},
            ))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "TowerDefense",
                64,
                "单机同步自己的声骸数据，id：" + n.CurrentSelfPhantomIdInUiTemp,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TowerDefensePhantomChanged,
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TowerDefense",
          64,
          "自己选择声骸后，找不到自己的OwnerData，声骸ID不进行同步",
          ["roleCfgId", e],
        );
  }
  static ERa(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "TowerDefense",
        64,
        "战斗结束时刷新的数据，然后根据是否在副本中决定是否打开奖励面板",
        ["notify", e],
      ),
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
        (e.KRs && ModelManager_1.ModelManager.GameModeModel.IsMulti
          ? this.nSc(e)
          : this.OpenTowerDefenseResultView(e),
        UiManager_1.UiManager.IsViewOpen("TowerDefenceInBattleTips") &&
          UiManager_1.UiManager.CloseView("TowerDefenceInBattleTips"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify,
        ));
  }
  static OpenTowerDefenseResultView(r) {
    var o = r.r6n,
      o =
        TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(o);
    if (void 0 !== o) {
      o = o.IsDifficult;
      let e = "",
        n = "",
        t = void 0;
      var a = TowerDefenseController.nZs(r.tBs),
        o =
          (o
            ? ((n = r.KRs
                ? ((e = "TowerDefenceWinTime"),
                  TimeUtil_1.TimeUtil.GetTimeString(r.Qxs))
                : ((e = "TowerDefencelose"), "")),
              (a[1].DescriptionTextId = "TowerDefenceBestTime"),
              (a[1].DescriptionArgs = [
                TimeUtil_1.TimeUtil.GetTimeString(r.JM_),
              ]))
            : r.KRs
              ? ((e = "MowingCurrentPoint"), (n = ""), (t = r.SMs))
              : ((e = "TowerDefencelose"), (n = "")),
          {
            ConfigId: r.KRs
              ? TowerDefenceDefine_1.INSTANCE_SUCCESS
              : TowerDefenceDefine_1.INSTANCE_FAIL,
            IsSuccess: r.KRs,
            ExploreRecordInfo: {
              TitleTextId: e,
              Record: n,
              RecordRollingTo: t,
              IsNewRecord: o
                ? 0 !== r.Qxs && r.JM_ >= r.Qxs
                : r.SMs >= r.tBs && 0 !== r.SMs,
            },
            ButtonInfoList: a,
          });
      ItemRewardController_1.ItemRewardController.OpenExploreRewardViewNew(o);
    }
  }
  static nSc(e) {
    var n = [],
      t = [];
    for (const s of e.Dsc) {
      var r = s.W5n;
      let e = 0;
      var o = t.indexOf(r),
        o =
          (-1 !== o ? (e = o) : ((e = t.length), t.push(r)),
          ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(r)),
        a = o?.IsSelf ?? !1,
        i = [];
      for (const _ of s.Bsc) {
        var l = { Title: _.s5n, Count: _.SMs };
        i.push(l);
      }
      r = {
        Rank: 0,
        PlayerId: r,
        IsAddButtonAvailable:
          !a && !ModelManager_1.ModelManager.FriendModel.IsMyFriend(r),
        IsSelf: a,
        BgPath: SolarSpeedDefine_1.rankBgPathMap[0],
        MedalColorHex: SolarSpeedDefine_1.medalColorHex[0],
        FxColorHex: SolarSpeedDefine_1.fxColorHex[0],
        PlayerIndexIconPath: (a
          ? SolarSpeedDefine_1.playerIndexSelfIconMap
          : SolarSpeedDefine_1.playerIndexIconMap)[e],
        NameText: o?.PlayerName ?? "",
        IconData: {
          IconPath:
            void 0 === o
              ? ""
              : ModelManager_1.ModelManager.PersonalModel.GetPlayerHeadData(
                  o.HeadId,
                  !1,
                ).GetRoleHeadIconCircle(),
        },
        BestTitle: s.tbs,
        DescDataList: i,
      };
      n.push(r);
    }
    const s = {
      TitleId: "TowerDefenceSettlement01",
      RoleDataList: n,
      PanelType: TowerDefenseRolePanel_1.TowerDefenseRolePanel,
      ConfirmClick: () => {
        TowerDefenseController.OpenTowerDefenseResultView(e);
      },
    };
    UiManager_1.UiManager.OpenView("SolarSpeedResultView", s);
  }
  static GetLevelInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomLevelInBattle();
  }
  static GetLevelContentInBattle() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    return e.CheckCurrentActivityShowDifferent()
      ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "TowerDefencewenhao",
        ) ?? "")
      : e.GetCurrentPhantomLevelInBattle().toString();
  }
  static GetExpDataInBattle() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    if (!e.CheckCurrentActivityShowDifferent())
      return e.GetCurrentPhantomExpPairInBattle();
  }
  static GetProgressInBattle() {
    var e =
      ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomExpPairInBattle();
    return 0 === e.Exp ? 0 : 0 === e.Threshold ? 1 : e.Exp / e.Threshold;
  }
  static GetIsFirstOpen() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().GetIfFirstOpen();
  }
  static GetActivitySubViewTitle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().GetTitle();
  }
  static GetActivityCfg() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg()
      .LocalConfig;
  }
  static GetActivityPreviewReward() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().GetPreviewReward();
  }
  static TryGetReviveViewName() {
    if (!UiManager_1.UiManager.IsViewOpen("ExploreRewardView"))
      return "TowerDefenceReviveView";
  }
  static GetCurrentSceneTeamItem() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetCurrentTeamItem;
  }
  static GetAllOwnSceneTeamItems() {
    return ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems(!0);
  }
  static GetRecordByInstanceId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      e =
        TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
          e,
        );
    return e ? (n.PhantomMessageCache.StageMapCache.get(e.Id)?.Record ?? 0) : 0;
  }
  static GetPassTimeContentByInstanceId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      e =
        TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
          e,
        );
    let t = 0;
    return (
      e &&
        ((n = n.PhantomMessageCache.StageMapCache.get(e.Id)),
        (t = n && n.Passed ? n.PassTime : 0)),
      TimeUtil_1.TimeUtil.GetTimeString(t)
    );
  }
  static GetTotalScoreLimitByInstanceId(e) {
    e =
      TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
        e,
      );
    return e ? e.UnlockScoreLimit : 0;
  }
  static GetCurrentScoreLimit() {
    var e,
      n = ModelManager_1.ModelManager.TowerDefenseModel;
    let t = 0;
    for ([e] of n.PhantomMessageCache.StageMapCache) {
      var r =
        TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(e);
      void 0 !== r &&
        n.PhantomMessageCache.IsStageUnlockedByTowerDefenseInstanceId(e) &&
        (t = r.UnlockScoreLimit > t ? r.UnlockScoreLimit : t);
    }
    return t;
  }
  static GetMarkIdByActivityId(e) {
    e =
      TowerDefenceMapMarkByActivityId_1.configTowerDefenceMapMarkByActivityId.GetConfig(
        e,
      );
    return void 0 === e ? 0 : e.MarkId;
  }
  static GetSuitableInstanceId() {
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.GetSuitableInstanceId();
  }
  static GetPhantomSkillDescriptionArgsByPhantomId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    if (n.CheckCurrentActivityShowDifferent())
      return (
        (n = n.PhantomConfigCache.get(e)),
        (e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(
          n.PhantomItemId,
        ).SkillId),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillDescExByPhantomSkillIdAndQuality(
          e,
          5,
        )
      );
  }
  static GetPhantomSkillDescriptionByPhantomId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    if (n.CheckCurrentActivityShowDifferent())
      return (
        (n = n.PhantomConfigCache.get(e)),
        (e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(
          n.PhantomItemId,
        ).SkillId),
        ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomSkillBySkillId(
          e,
        ).DescriptionEx
      );
  }
  static CheckActivityUnlockByCondition() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().IsUnLock();
  }
  static CheckInInstanceDungeon() {
    var e;
    return (
      !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      21 ===
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          ?.InstSubType)
    );
  }
  static CheckIsInstanceUnlock(e) {
    return ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.IsStageUnLocked(
      e,
    );
  }
  static CheckIsInstanceSingle() {
    var e;
    return (
      !!ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
      ((e = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
        ?.OnlineType === InstOnlineType_1.InstOnlineType.Single)
    );
  }
  static CheckHasReward() {
    return ModelManager_1.ModelManager.TowerDefenseModel.CheckHasReward();
  }
  static CheckHasNewStage() {
    return ModelManager_1.ModelManager.TowerDefenseModel.HasNotClickNewLevel();
  }
  static CheckIsSelf(e) {
    return ModelManager_1.ModelManager.PlayerInfoModel.GetId() === e;
  }
  static CheckActivityUnlockByMulti() {
    return !(
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
      ModelManager_1.ModelManager.PlayerInfoModel.GetId() !==
        ModelManager_1.ModelManager.OnlineModel.OwnerId
    );
  }
  static CheckInUiFlow() {
    return ModelManager_1.ModelManager.TowerDefenseModel.IsUiFlowOpen;
  }
  static CheckIsSelfEntrance(e) {
    return TowerDefenceDefine_1.entranceSet.has(e);
  }
  static CheckIsPhantomViewOpened() {
    return ModelManager_1.ModelManager.TowerDefenseModel.IsPhantomViewOpened;
  }
  static CheckAllPhantomsReady() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel,
      n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const t of e.PhantomOwnerDataList)
      if (n === t.PlayerId && 0 < t.RoleCfgId && t.PhantomId <= 0) return !1;
    return !0;
  }
  static CheckIsTowerEntity(e) {
    var n;
    return (
      !!TowerDefenseController.CheckInInstanceDungeon() &&
      ((n = ModelManager_1.ModelManager.CreatureModel.GetInstanceId()),
      !!(n =
        TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
          n,
        ))) &&
      n.BaseEntityId === e.TrackTarget
    );
  }
  static toa() {
    return (
      0 !==
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
    );
  }
  static CheckIsChallengeInstanceByInstanceId(e) {
    e =
      TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
        e,
      );
    return void 0 !== e && e.IsDifficult;
  }
  static CheckInstancePassedByInstanceId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      e =
        TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
          e,
        );
    return !!e && (n.PhantomMessageCache.StageMapCache.get(e.Id)?.Passed ?? !1);
  }
  static CheckCurrentPhantomIsOccupiedInUi() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    return e.CheckPhantomIsOccupied(e.CurrentSelfPhantomIdInUiTemp);
  }
  static SetIsUiFlowOpen(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel;
    (n.IsUiFlowOpen = e), (n.IsPhantomViewOpened = !1);
  }
  static SetPhantomViewOpened(e) {
    ModelManager_1.ModelManager.TowerDefenseModel.IsPhantomViewOpened = e;
  }
}
((exports.TowerDefenseController =
  TowerDefenseController).BuildPhantomIconItem = () =>
  new TowerDefencePhantomIconItem_1.TowerDefensePhantomIconItem()),
  (TowerDefenseController.BuildPhantomSkillItem = () =>
    new TowerDefencePhantomSkillItem_1.TowerDefensePhantomSkillItem()),
  (TowerDefenseController.BuildPhantomSkillInBattleItem = () =>
    new TowerDefenceInBattleView_1.TowerDefensePhantomSkillInBattleItem()),
  (TowerDefenseController.BuildPhantomIconScrollData = () => {
    var e,
      n,
      t,
      r = [],
      o = ModelManager_1.ModelManager.TowerDefenseModel,
      a = o.SortedPhantomConfigCache,
      i = ModelManager_1.ModelManager.InstanceDungeonEntranceModel;
    for (const l of a)
      o.CheckPhantomAvailableInActivityByActivityId(l.ActivityId) &&
        ((e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(
          l.PhantomItemId,
        )),
        (n = TowerDefenseController.toa()
          ? i.GetMatchingId()
          : i.SelectInstanceId),
        (t =
          TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
            n,
          )) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Activity",
              64,
              "副本ID配置错误，无法在塔防副本配置中找到，请检查联机塔防表和副本表",
              ["选中的副本ID", n],
            )),
        (n = !t?.OptionalBuff.includes(l.Id) ?? !0),
        (t = {
          Type: 3,
          Data: {
            ConfigId: l.Id,
            HexColorPath:
              ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                l.MarkResourceId,
              ) ?? "",
            IsLocked: n,
            IsChosen: !1,
            IsOccupied: o.CheckPhantomIsOccupied(l.Id),
          },
          PhantomId: l.PhantomItemId,
          QualityId: e.QualityId,
          IsLockVisibleBlack: n || !o.IsPhantomViewOpened,
        }),
        r.push(t));
    return r.sort(TowerDefenseController.Bua), r;
  }),
  (TowerDefenseController.BuildPhantomSkillLayoutData = () => {
    var e,
      n,
      t = [],
      r = ModelManager_1.ModelManager.TowerDefenseModel,
      o = r.PhantomConfigCache.get(r.CurrentSelfPhantomIdInUiTemp),
      a = TowerDefenseController.GetPhantomSkillDescriptionArgsByPhantomId(
        r.CurrentSelfPhantomIdInUiTemp,
      );
    for ([e, n] of o.SkillDataList.entries()) {
      var i =
        TowerDefenseController.GetPhantomSkillDescriptionByPhantomId(
          r.CurrentSelfPhantomIdInUiTemp,
        ) ?? n.Description;
      t.push({
        SkillTextId: n.Name,
        DescriptionTextId: i,
        DescriptionArgs: a,
        Level: (e + 1).toString(),
      });
    }
    return t;
  }),
  (TowerDefenseController.BuildPhantomOtherData = () => {
    var e,
      n = ModelManager_1.ModelManager.TowerDefenseModel,
      t = ModelManager_1.ModelManager.InstanceDungeonEntranceModel,
      r = n.PhantomConfigCache.get(n.CurrentSelfPhantomIdInUiTemp);
    if (r)
      return (
        (t = TowerDefenseController.toa()
          ? t.GetMatchingId()
          : t.SelectInstanceId),
        (e =
          TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
            t,
          )),
        (r = {
          NameTextId: r.PhantomNameTextId,
          TypeIconPath: r.TypeIconPath,
          TypeTextId: r.PhantomTypeTextId,
          IsLocked:
            !e?.OptionalBuff.includes(n.CurrentSelfPhantomIdInUiTemp) ?? !0,
        }),
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            64,
            "塔防声骸选择界面杂项数据",
            ["ITowerDefensePhantomOtherData", r],
            ["instanceId", t],
          ),
        r
      );
  }),
  (TowerDefenseController.BuildPhantomIconInBattleData = () => {
    var e =
        ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomIdInBattle(),
      e =
        TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(
          e,
        )?.PhantomItemId;
    return { Type: 3, Data: e, PhantomId: e };
  }),
  (TowerDefenseController.BuildPhantomSkillInBattleLayoutData = () => {
    var e,
      n,
      t = [],
      r = ModelManager_1.ModelManager.TowerDefenseModel,
      o = r.GetCurrentPhantomSkillCfgListInBattle(),
      a = r.GetCurrentPhantomLevelInBattle(),
      i = r.GetCurrentPhantomIdInBattle();
    for ([e, n] of o.entries()) {
      var l =
        TowerDefenseController.GetPhantomSkillDescriptionByPhantomId(i) ??
        n.Description;
      t.push({
        Skill: n.Name,
        Description: l,
        DescriptionArgs: r.GetCurrentPhantomSkillDescriptionArgsInBattle(),
        IsUnlock: a > e,
      });
    }
    return t;
  }),
  (TowerDefenseController.Bua = (e, n) => {
    (e = e.Data), (n = n.Data);
    return e.IsLocked === n.IsLocked
      ? e.ConfigId - n.ConfigId
      : e.IsLocked
        ? 1
        : -1;
  }),
  (TowerDefenseController.HandleOnClickReward = () => {
    UiManager_1.UiManager.OpenView(
      "ActivityRewardPopUpView",
      ModelManager_1.ModelManager.TowerDefenseModel.GetPreviewRewardData(),
      (e, n) => {
        UiManager_1.UiManager.IsViewOpen("CommonActivityView") &&
          UiManager_1.UiManager.GetViewByName(
            "CommonActivityView",
          )?.AddChildViewById(n);
      },
    );
  }),
  (TowerDefenseController.aZs = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 64, "当塔防快速选人确定时"),
      TowerDefenseController.CheckInUiFlow() &&
        (TowerDefenseController.Fea(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefensePhantomChanged,
        ));
  }),
  (TowerDefenseController.hZs = () => {}),
  (TowerDefenseController.lZs = () => {
    TowerDefenseController.CheckInInstanceDungeon() &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TowerDefenseShowInBattleView,
        !0,
      );
  }),
  (TowerDefenseController._Zs = () => {
    ModelManager_1.ModelManager.TowerDefenseModel.ResetTimerCacheInBattle();
    var e = UiManager_1.UiManager.GetViewByName("BattleView");
    e && e.ResetFormationCooldownExternal(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TowerDefenseShowInBattleView,
        !1,
      );
  }),
  (TowerDefenseController.Fil = () => {
    TowerDefenseController.CheckInInstanceDungeon() &&
      InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
        () => {
          UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
            UiManager_1.UiManager.CloseView("ExploreRewardView"),
            ModelManager_1.ModelManager.TowerDefenseModel.ResetAllCache();
        },
      );
  }),
  (TowerDefenseController.CZs = (e) => {
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
      () => {
        UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
          UiManager_1.UiManager.CloseView("ExploreRewardView"),
          ModelManager_1.ModelManager.TowerDefenseModel.ResetAllCache();
      },
    );
  }),
  (TowerDefenseController.gZs = (e) => {
    ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg().CheckIfClose()
      ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "TowerDefenceActivityEnd",
        )
      : ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("TowerDefense", 64, "奖励结算时，申请多人投票"),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack(
            e,
          ))
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("TowerDefense", 64, "奖励结算时，申请单人重进副本"),
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RestartInstanceDungeon().finally(
            () => {
              UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
                UiManager_1.UiManager.CloseView("ExploreRewardView");
            },
          ));
  }),
  (TowerDefenseController.mZs = (e, n) => {
    TowerDefenseController.CheckInInstanceDungeon() &&
      Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "TowerDefense",
        64,
        "战斗分数",
        ["scoreId", e],
        ["scoreValue", n],
      );
  }),
  (TowerDefenseController.WZs = () => {
    TowerDefenseController.CheckInUiFlow() ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "TowerDefense",
          64,
          "当前关闭的是副本入口面板，但是该面板不是因为由塔防活动拉起的",
        )),
      TowerDefenseController.SetIsUiFlowOpen(!1);
  }),
  (TowerDefenseController.sZs = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 64, "当队伍选人变化时", ["Reason", e]),
      TowerDefenseController.CheckInUiFlow() &&
        (TowerDefenseController.toa()
          ? TowerDefenseController.dZs()
          : ("单机切换队伍时" === e &&
              ModelManager_1.ModelManager.TowerDefenseModel.RoleCfgId2PhantomIdMapCache.clear(),
            TowerDefenseController.Fea()),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefensePhantomChanged,
        ));
  }),
  (TowerDefenseController.yCa = (e) => {
    TowerDefenseController.SyncSelfTowerDefensePhantomId(e),
      TowerDefenseController.ResetCurrentTowerDefensePhantomIdInUiTemp();
  }),
  (TowerDefenseController.yRa = () => {
    var e;
    TowerDefenseController.CheckInInstanceDungeon() &&
      (e = ModelManager_1.ModelManager.TowerDefenseModel).DelayedEndNotify &&
      (TowerDefenseController.ERa(e.DelayedEndNotify),
      (e.DelayedEndNotify = void 0));
  }),
  (TowerDefenseController.IRa = (e) => {
    TowerDefenseController.CheckInUiFlow() &&
      "EditBattleTeamView" === e &&
      (UiManager_1.UiManager.IsViewOpen("TowerDefencePhantomView") &&
        UiManager_1.UiManager.CloseView("TowerDefencePhantomView"),
      ModelManager_1.ModelManager.TowerDefenseModel.RoleCfgId2PhantomIdMapCache.clear(),
      TowerDefenseController.CheckActivityUnlockByMulti() ||
        TowerDefenseController.SetIsUiFlowOpen(!1));
  }),
  (TowerDefenseController.y1l = (e) => {
    ModelManager_1.ModelManager.TowerDefenseModel.SetLevelHasClickByInstanceId(
      e,
    );
  });
//# sourceMappingURL=TowerDefenceController.js.map
