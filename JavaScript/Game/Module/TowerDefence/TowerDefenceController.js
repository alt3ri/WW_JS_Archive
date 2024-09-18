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
  ActivityControllerBase_1 = require("../Activity/ActivityControllerBase"),
  EditFormationDefine_1 = require("../EditFormation/EditFormationDefine"),
  InstanceDungeonController_1 = require("../InstanceDungeon/InstanceDungeonController"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeon/InstanceDungeonEntranceController"),
  ItemRewardController_1 = require("../ItemReward/ItemRewardController"),
  TowerDefenceDefine_1 = require("./TowerDefenceDefine"),
  TowerDefenceInBattleView_1 = require("./View/TowerDefenceInBattleView"),
  TowerDefencePhantomIconItem_1 = require("./View/TowerDefencePhantomIconItem"),
  TowerDefencePhantomSkillItem_1 = require("./View/TowerDefencePhantomSkillItem"),
  TowerDefenceSubView_1 = require("./View/TowerDefenceSubView");
class TowerDefenseController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.tZs = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 65, "塔防活动状态变化时刷新的数据", [
            "notify",
            e,
          ]),
          e.Izs &&
            (ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseActivityData(
              e.Izs,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TowerDefenseOnActivityInfoUpdateNotify,
            ));
      }),
      (this.iZs = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            65,
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
            65,
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
      (this.SCa = (e) => {
        ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed
          ? TowerDefenseController.pRa(e)
          : (ModelManager_1.ModelManager.TowerDefenseModel.DelayedEndNotify =
              e);
      }),
      (this.Zra = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 65, "进入战斗副本时刷新的数据", [
            "notify",
            e,
          ]);
        var n,
          r,
          t = ModelManager_1.ModelManager.TowerDefenseModel;
        t.ResetPhantomOwnerDataList();
        for ([n, r] of e.Y7n.entries()) {
          var o = t.PhantomOwnerDataList[n],
            a = r.hxs,
            i = a.s5n;
          (o.RoleCfgId = r.Q6n),
            (o.PhantomId = i),
            t.PhantomMessageCache.OwnPhantomInBattleDataCache.set(i, a);
        }
      }),
      (this.Z7a = (e) => {
        const n = MathUtils_1.MathUtils.LongToNumber(e.Eih);
        var r = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
        const t = TimeUtil_1.TimeUtil.SetTimeSecond(n - r);
        var o = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(t);
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            65,
            "局内角色角色角色复活通知",
            ["notify", e],
            ["time", n],
            ["local time with stop", r],
            ["local time", TimeUtil_1.TimeUtil.GetServerTimeStamp()],
            ["count down", o],
          ),
          TowerDefenseController.CheckIsSelf(e.W5n)
            ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "TowerDefenceRoleDie",
                o.CountDownText,
              )
            : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "TowerDefencePlayerDie",
                o.CountDownText,
              );
        const a =
          ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetRolePosition(
            e.W5n,
            e.Q6n,
          );
        if (void 0 !== a) {
          const i = ModelManager_1.ModelManager.TowerDefenseModel,
            l = TimerSystem_1.TimerSystem.Forever(() => {
              var e = TimeUtil_1.TimeUtil.GetServerStopTimeStamp();
              e >= n
                ? (EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName
                      .OnRefreshFormationCooldownExternalInBattleView,
                    a - 1,
                  ),
                  i.TryRemoveTimerInBattle(l))
                : EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName
                      .OnRefreshFormationCooldownExternalInBattleView,
                    a - 1,
                    TimeUtil_1.TimeUtil.SetTimeSecond(n - e),
                    t,
                  );
            }, 100);
          i.TryAddTimerInBattle(l);
        }
      }),
      (this.eHa = (e) => {
        var n,
          r = MathUtils_1.MathUtils.LongToNumber(e.Eih),
          t = TimeUtil_1.TimeUtil.GetServerStopTimeStamp(),
          r = TimeUtil_1.TimeUtil.GetRemainTimeDataFormat3(
            TimeUtil_1.TimeUtil.SetTimeSecond(r - t),
          );
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            65,
            "局内玩家玩家玩家复活通知",
            ["notify", e],
            ["time", MathUtils_1.MathUtils.LongToNumber(e.Eih)],
            [
              "local time with stop",
              TimeUtil_1.TimeUtil.GetServerStopTimeStamp(),
            ],
            ["local time", TimeUtil_1.TimeUtil.GetServerTimeStamp()],
            ["count down", r],
          ),
          TowerDefenseController.CheckIsSelf(e.W5n)
            ? (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ResetToBattleView,
              ),
              (t = TowerDefenseController.TryGetReviveViewName()) &&
                ((n = { RemainTime: r.RemainingTime }),
                UiManager_1.UiManager.OpenView(t, n)))
            : ((t =
                ModelManager_1.ModelManager.OnlineModel?.GetCurrentTeamListById(
                  e.W5n,
                )?.PlayerNumber ?? 0),
              ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
                "TowerDefencePlayerRoleDie",
                t,
                r.CountDownText,
              ));
      });
  }
  OnCreateActivityData(e) {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetOrCreateParsedTowerDefenseMsg();
  }
  OnCreateSubPageComponent(e) {
    return new TowerDefenceSubView_1.TowerDefenseSubView();
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityTD";
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
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        TowerDefenseController.uZs,
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
        TowerDefenseController.ECa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        TowerDefenseController.vRa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        TowerDefenseController.MRa,
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
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        TowerDefenseController.uZs,
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
        TowerDefenseController.ECa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        TowerDefenseController.vRa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        TowerDefenseController.MRa,
      );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(22477, this.tZs),
      Net_1.Net.Register(16126, this.iZs),
      Net_1.Net.Register(18323, this.rZs),
      Net_1.Net.Register(16382, this.SCa),
      Net_1.Net.Register(23289, this.Zra),
      Net_1.Net.Register(28214, this.Z7a),
      Net_1.Net.Register(17341, this.eHa);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(22477),
      Net_1.Net.UnRegister(16126),
      Net_1.Net.UnRegister(18323),
      Net_1.Net.UnRegister(16382),
      Net_1.Net.UnRegister(23289),
      Net_1.Net.UnRegister(28214),
      Net_1.Net.UnRegister(17341);
  }
  GetActivityLevelUnlockState(e) {
    return TowerDefenseController.CheckIsInstanceUnlock(e);
  }
  static MarkPhantomIconScrollDataChosen(e, n, r) {
    var t = ModelManager_1.ModelManager.TowerDefenseModel,
      o = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      o = t.GetOwnerData(o, r);
    if (n)
      if (o && o.PhantomId !== TowerDefenceDefine_1.DEFAULT_ID)
        t.CurrentSelfPhantomIdInUiTemp = o.PhantomId;
      else
        for (const l of e) {
          var a = l.Data;
          if (!a.IsOccupied && !a.IsLocked) {
            t.CurrentSelfPhantomIdInUiTemp = a.ConfigId;
            break;
          }
        }
    for (const s of e) {
      var i = s.Data;
      i.IsChosen = t.CurrentSelfPhantomIdInUiTemp === i.ConfigId;
    }
  }
  static CheckSelfPhantomCancelAble(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      r = n.GetOwnerData(r, e);
    return (
      !(!r || r.PhantomId === TowerDefenceDefine_1.DEFAULT_ID) &&
      n.CurrentSelfPhantomIdInUiTemp === r.PhantomId
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
    for (const t of TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
      e,
    ).OptionalBuff) {
      var r = {
        ItemId:
          TowerDefencePhantomById_1.configTowerDefencePhantomById.GetConfig(t)
            .PhantomItemId,
        IncId: 0,
      };
      n.push([r, 0]);
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
      r = e.GetCurrentPhantomLevelInBattle(),
      n = n[r - 1];
    return {
      TitleTextId: n.Name,
      PhantomTextId: n.Name,
      Level: r,
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
      var r = ModelManager_1.ModelManager.TowerDefenseModel,
        t = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
      for (const a of e) {
        var o = r.GetOwnerData(t, a);
        let e = TowerDefenceDefine_1.DEFAULT_ID;
        o && (e = o.PhantomId), n.push(e);
      }
    }
    return n;
  }
  static BuildInstanceCountDownText(e) {
    var r = ModelManager_1.ModelManager.TowerDefenseModel,
      n =
        TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
          e,
        );
    if (n) {
      r = r.PhantomMessageCache.StageMapCache.get(n.Id);
      if (r) {
        r =
          r.UnlockTime * TimeUtil_1.TimeUtil.Millisecond -
          TimeUtil_1.TimeUtil.GetServerTime();
        if (r <= 0) return "";
        var t = Math.max(r, TimeUtil_1.TimeUtil.Minute);
        let e = 1,
          n = 1;
        t > CommonDefine_1.SECOND_PER_DAY
          ? ((e = 3), (n = 3))
          : r > CommonDefine_1.SECOND_PER_HOUR && ((e = 2), (n = 2));
        r =
          TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, e, n).CountDownText ??
          "";
        return StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
            "ActivityMowing_UnlockCondition",
          ),
          r,
        );
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TowerDefense",
          65,
          "指定塔防副本协议数据不存在",
          ["InstanceId", e],
          ["TowerDefenseInstanceId", n.Id],
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("TowerDefense", 65, "副本ID与塔防副本表不对应", [
          "InstanceId",
          e,
        ]);
  }
  static dZs() {
    if (
      TowerDefenseController.CheckInUiFlow() &&
      TowerDefenseController.toa()
    ) {
      var r = ModelManager_1.ModelManager.TowerDefenseModel,
        e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
      if (e) {
        let n = 0;
        for (const s of e.TRs) {
          var t = s.W5n;
          for (const _ of s.J6n) {
            var o = _.Q6n,
              a = _.Tzs,
              i = TowerDefenseController.CheckIsSelf(t),
              l = r.PhantomOwnerDataList[n++];
            (l.PlayerId = t),
              (l.IsSelf = i),
              (l.RoleCfgId = o),
              (l.PhantomId = a),
              i && r.RoleCfgId2PhantomIdMapCache.set(o, a);
          }
        }
        for (let e = n; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++)
          r.ResetPhantomOwnerDataByIndex(e),
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "TowerDefense",
                65,
                "同步匹配数据时，队伍不足3人，所以将不足的数据重置",
                ["第几个角色是空缺", e],
              );
      }
    }
  }
  static Fea() {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      r = ModelManager_1.ModelManager.EditBattleTeamModel;
    for (let e = 0; e < EditFormationDefine_1.EDITE_FORAMTION_MAX_NUM; e++) {
      var t = r.GetRoleSlotData(e + 1);
      if (t) {
        var t = t.GetRoleData,
          o = n.PhantomOwnerDataList[e];
        if (t) {
          (o.PlayerId = t.PlayerId),
            (o.IsSelf = t.IsSelf),
            (o.RoleCfgId = t.ConfigId),
            (o.PhantomId =
              n.RoleCfgId2PhantomIdMapCache.get(t.ConfigId) ??
              TowerDefenceDefine_1.DEFAULT_ID);
          continue;
        }
      }
      n.ResetPhantomOwnerDataByIndex(e);
    }
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 65, "单机战队编辑界面同步后的Owner数据", [
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
      r = e.InstanceId;
    return r
      ? ((n = n.GetOwnRoleConfigIdList[0]),
        (e =
          await InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
            r,
            n,
            e.EntranceId,
            0,
            void 0,
            ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
              n,
            ),
          )) ||
          InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.RevertEntranceFlowStep(),
        e)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("TowerDefense", 65, "进入副本失败，副本Id不存在", [
            "instanceId",
            r,
          ]),
        !1);
  }
  static RequestScoreReward(n) {
    var e = Protocol_1.Aki.Protocol.gzs.create();
    const r = ModelManager_1.ModelManager.TowerDefenseModel;
    (e.BVn = [n]),
      Net_1.Net.CallAsync(27456, e).then(
        (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("TowerDefense", 65, "塔防积分奖励的response", [
              "response",
              e,
            ]),
            e &&
              e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
              (r.PhantomMessageCache.UpdateByScoreRewardRequest(n),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                r.GetPreviewRewardData(),
              ));
        },
        () => {},
      );
  }
  static RequestInstanceReward(n) {
    var e = Protocol_1.Aki.Protocol.mzs.create();
    const r = ModelManager_1.ModelManager.TowerDefenseModel;
    (e.BVn = [n]),
      Net_1.Net.CallAsync(15504, e).then(
        (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("TowerDefense", 65, "塔防关卡奖励的response", [
              "response",
              e,
            ]),
            e &&
              e.Q4n === Protocol_1.Aki.Protocol.Q4n.KRs &&
              (r.PhantomMessageCache.UpdateByInstanceRewardRequest(n),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRewardPopUpView,
                r.GetPreviewRewardData(),
              ));
        },
        () => {},
      );
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
      r = n.GetCurrentPhantomIdInBattle(),
      t = n.GetCurrentPhantomLevelInBattle();
    n.PhantomMessageCache.OwnPhantomInBattleNewLevelUpFlagCache.set(r, e < t);
  }
  static TryReopenInBattleTip() {
    TowerDefenseController.zra();
  }
  static SyncSelfTowerDefensePhantomId(e) {
    var n = ModelManager_1.ModelManager.TowerDefenseModel,
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
      r = n.GetOwnerData(r, e);
    r
      ? ((r.PhantomId = n.CurrentSelfPhantomIdInUiTemp),
        n.RoleCfgId2PhantomIdMapCache.set(e, n.CurrentSelfPhantomIdInUiTemp),
        TowerDefenseController.toa()
          ? ((r = ModelManager_1.ModelManager.EditBattleTeamModel),
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(
              r.GetOwnRoleConfigIdList[0],
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
                65,
                "单机同步自己的声骸数据，id：" + n.CurrentSelfPhantomIdInUiTemp,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TowerDefensePhantomChanged,
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TowerDefense",
          65,
          "自己选择声骸后，找不到自己的OwnerData，声骸ID不进行同步",
          ["roleCfgId", e],
        );
  }
  static pRa(t) {
    if (
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "TowerDefense",
          65,
          "战斗结束时刷新的数据，然后根据是否在副本中决定是否打开奖励面板",
          ["notify", t],
        ),
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
    ) {
      var o = t.r6n,
        o =
          TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(
            o,
          );
      if (void 0 !== o) {
        o = o.IsDifficult;
        let e = "",
          n = "",
          r = void 0;
        var a = TowerDefenseController.nZs(t.tBs),
          o =
            (o
              ? t.KRs
                ? ((e = "TowerDefenceWinTime"),
                  (n = TimeUtil_1.TimeUtil.GetTimeString(t.Qxs)),
                  (a[1].DescriptionTextId = "TowerDefenceBestTime"),
                  (a[1].DescriptionArgs = [t.yih]))
                : ((e = "TowerDefencelose"), (n = ""))
              : ((e = "MowingCurrentPoint"), (n = ""), (r = t.SMs)),
            TowerDefenseController.CheckIsInstanceSingle()
              ? void 0
              : ItemRewardController_1.ItemRewardController.BuildExploreFriendDataList());
        ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          t.KRs
            ? TowerDefenceDefine_1.INSTANCE_SUCCESS
            : TowerDefenceDefine_1.INSTANCE_FAIL,
          t.KRs,
          void 0,
          {
            TitleTextId: e,
            Record: n,
            RecordRollingTo: r,
            IsNewRecord: t.SMs >= t.tBs && 0 !== t.SMs,
          },
          void 0,
          a,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          o,
        ),
          UiManager_1.UiManager.IsViewOpen("TowerDefenceInBattleTips") &&
            UiManager_1.UiManager.CloseView("TowerDefenceInBattleTips"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify,
          );
      }
    }
  }
  static GetLevelInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomLevelInBattle();
  }
  static GetLevelContentInBattle() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    return e.CheckCurrentActivityIsSecondEdition()
      ? (MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "TowerDefencewenhao",
        ) ?? "")
      : e.GetCurrentPhantomLevelInBattle().toString();
  }
  static GetExpDataInBattle() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    if (!e.CheckCurrentActivityIsSecondEdition())
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
    let r = 0;
    return (
      e &&
        ((n = n.PhantomMessageCache.StageMapCache.get(e.Id)),
        (r = n && n.Passed ? n.PassTime : 0)),
      TimeUtil_1.TimeUtil.GetTimeString(r)
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
    let r = 0;
    for ([e] of n.PhantomMessageCache.StageMapCache) {
      var t =
        TowerDefenceInstanceById_1.configTowerDefenceInstanceById.GetConfig(e);
      void 0 !== t &&
        n.PhantomMessageCache.IsStageUnlockedByTowerDefenseInstanceId(e) &&
        (r = t.UnlockScoreLimit > r ? t.UnlockScoreLimit : r);
    }
    return r;
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
    if (n.CheckCurrentActivityIsSecondEdition())
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
    var e = ModelManager_1.ModelManager.TowerDefenseModel;
    return !e.IsEnterInActivityClicked && e.CheckHasNewStage();
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
  static CheckIsPhantomViewOpened() {
    return ModelManager_1.ModelManager.TowerDefenseModel.IsPhantomViewOpened;
  }
  static CheckAllPhantomsReady() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel,
      n = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    for (const r of e.PhantomOwnerDataList)
      if (n === r.PlayerId && 0 < r.RoleCfgId && r.PhantomId <= 0) return !1;
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
      r,
      t = [],
      o = ModelManager_1.ModelManager.TowerDefenseModel;
    for (const a of o.SortedPhantomConfigCache)
      o.CheckPhantomAvailableInActivityByActivityId(a.ActivityId) &&
        ((e = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(
          a.PhantomItemId,
        )),
        (n =
          (ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? ModelManager_1.ModelManager.EditBattleTeamModel
                .GetInstanceDungeonId
            : ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .SelectInstanceId) ?? 0),
        (r =
          TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
            n,
          )) ||
          (Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Activity",
              65,
              "副本ID配置错误，无法在塔防副本配置中找到，请检查联机塔防表和副本表",
              ["选中的副本ID", n],
            )),
        (n = !r?.OptionalBuff.includes(a.Id) ?? !0),
        (r = {
          Type: 3,
          Data: {
            ConfigId: a.Id,
            HexColorPath:
              ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
                a.MarkResourceId,
              ) ?? "",
            IsLocked: n,
            IsChosen: !1,
            IsOccupied: o.CheckPhantomIsOccupied(a.Id),
          },
          PhantomId: a.PhantomItemId,
          QualityId: e.QualityId,
          IsLockVisibleBlack: n || !o.IsPhantomViewOpened,
        }),
        t.push(r));
    return t.sort(TowerDefenseController.Bua), t;
  }),
  (TowerDefenseController.BuildPhantomSkillLayoutData = () => {
    var e,
      n,
      r = [],
      t = ModelManager_1.ModelManager.TowerDefenseModel,
      o = t.PhantomConfigCache.get(t.CurrentSelfPhantomIdInUiTemp),
      a = TowerDefenseController.GetPhantomSkillDescriptionArgsByPhantomId(
        t.CurrentSelfPhantomIdInUiTemp,
      );
    for ([e, n] of o.SkillDataList.entries()) {
      var i = n.Description;
      r.push({
        SkillTextId: n.Name,
        DescriptionTextId: i,
        DescriptionArgs: a,
        Level: (e + 1).toString(),
      });
    }
    return r;
  }),
  (TowerDefenseController.BuildPhantomOtherData = () => {
    var e = ModelManager_1.ModelManager.TowerDefenseModel,
      n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel,
      r = e.PhantomConfigCache.get(e.CurrentSelfPhantomIdInUiTemp),
      n = TowerDefenseController.toa() ? n.GetMatchingId() : n.SelectInstanceId,
      t =
        TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
          n,
        ),
      r = {
        NameTextId: r.PhantomNameTextId,
        TypeIconPath: r.TypeIconPath,
        TypeTextId: r.PhantomTypeTextId,
        IsLocked:
          !t?.OptionalBuff.includes(e.CurrentSelfPhantomIdInUiTemp) ?? !0,
      };
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "TowerDefense",
          65,
          "塔防声骸选择界面杂项数据",
          ["ITowerDefensePhantomOtherData", r],
          ["instanceId", n],
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
      r = [],
      t = ModelManager_1.ModelManager.TowerDefenseModel,
      o = t.GetCurrentPhantomSkillCfgListInBattle(),
      a = t.GetCurrentPhantomLevelInBattle();
    for ([e, n] of o.entries())
      r.push({
        Skill: n.Name,
        Description: n.Description,
        DescriptionArgs: t.GetCurrentPhantomSkillDescriptionArgsInBattle(),
        IsUnlock: a > e,
      });
    return r;
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
    );
  }),
  (TowerDefenseController.aZs = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 65, "当塔防快速选人确定时"),
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
  (TowerDefenseController.uZs = () => {
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
    ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 65, "奖励结算时，申请多人投票"),
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.SettleViewButtonSuccessOnMultiCallBack(
          e,
        ))
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 65, "奖励结算时，申请单人重进副本"),
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
        65,
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
          65,
          "当前关闭的是副本入口面板，但是该面板不是因为由塔防活动拉起的",
        )),
      TowerDefenseController.SetIsUiFlowOpen(!1);
  }),
  (TowerDefenseController.sZs = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 65, "当队伍选人变化时", ["Reason", e]),
      TowerDefenseController.CheckInUiFlow() &&
        (TowerDefenseController.toa()
          ? TowerDefenseController.dZs()
          : TowerDefenseController.Fea(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefensePhantomChanged,
        ));
  }),
  (TowerDefenseController.ECa = (e) => {
    TowerDefenseController.SyncSelfTowerDefensePhantomId(e),
      TowerDefenseController.ResetCurrentTowerDefensePhantomIdInUiTemp();
  }),
  (TowerDefenseController.vRa = () => {
    var e;
    TowerDefenseController.CheckInInstanceDungeon() &&
      (e = ModelManager_1.ModelManager.TowerDefenseModel).DelayedEndNotify &&
      (TowerDefenseController.pRa(e.DelayedEndNotify),
      (e.DelayedEndNotify = void 0));
  }),
  (TowerDefenseController.MRa = (e) => {
    TowerDefenseController.CheckInUiFlow() &&
      "EditBattleTeamView" === e &&
      (UiManager_1.UiManager.IsViewOpen("TowerDefencePhantomView") &&
        UiManager_1.UiManager.CloseView("TowerDefencePhantomView"),
      ModelManager_1.ModelManager.TowerDefenseModel.RoleCfgId2PhantomIdMapCache.clear(),
      TowerDefenseController.CheckActivityUnlockByMulti() ||
        TowerDefenseController.SetIsUiFlowOpen(!1));
  });
//# sourceMappingURL=TowerDefenceController.js.map
