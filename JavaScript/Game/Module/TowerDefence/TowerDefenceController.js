"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  InstanceDungeonById_1 = require("../../../Core/Define/ConfigQuery/InstanceDungeonById"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  PhantomItemByItemId_1 = require("../../../Core/Define/ConfigQuery/PhantomItemByItemId"),
  TowerDefenceInstanceById_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceById"),
  TowerDefenceInstanceByInstanceId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceInstanceByInstanceId"),
  TowerDefenceMapMarkByActivityId_1 = require("../../../Core/Define/ConfigQuery/TowerDefenceMapMarkByActivityId"),
  TowerDefencePhantomById_1 = require("../../../Core/Define/ConfigQuery/TowerDefencePhantomById"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
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
      (this.nJs = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 65, "塔防活动状态变化时刷新的数据", [
            "notify",
            e,
          ]),
          e.AYs &&
            (ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseActivityData(
              e.AYs,
            ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TowerDefenseOnActivityInfoUpdateNotify,
            ));
      }),
      (this.sJs = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            65,
            "副本数据发生变化时的变化，包括是否副本解锁，副本分数等",
            ["notify", e],
          ),
          ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseInstanceDataList(
            e.IYs,
            !1,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TowerDefenseOnInstanceInfoUpdateNotify,
          );
      }),
      (this.aJs = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "TowerDefense",
            65,
            "战斗声骸升级/获得经验时刷新的数据",
            ["notify", e],
          ),
          ModelManager_1.ModelManager.TowerDefenseModel.PhantomMessageCache.ParseTowerDefenseOwnPhantomDataList(
            e.Sps,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TowerDefenseOnPhantomInfoUpdateNotify,
          ),
          TowerDefenseController.wta();
      }),
      (this.Mca = (e) => {
        ModelManager_1.ModelManager.GameModeModel.WorldDoneAndLoadingClosed
          ? TowerDefenseController.EIa(e)
          : (ModelManager_1.ModelManager.TowerDefenseModel.DelayedEndNotify =
              e);
      }),
      (this.Bta = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TowerDefense", 65, "进入战斗副本时刷新的数据", [
            "notify",
            e,
          ]);
        var n,
          r,
          t = ModelManager_1.ModelManager.TowerDefenseModel;
        t.ResetPhantomOwnerDataList();
        for ([n, r] of e.F7n.entries()) {
          var o = t.PhantomOwnerDataList[n],
            a = r.txs,
            l = a.J4n;
          (o.RoleCfgId = r.O6n),
            (o.PhantomId = l),
            t.PhantomMessageCache.OwnPhantomInBattleDataCache.set(l, a);
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
    return "UiItem_ActivityTD";
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  OnOpenView(e) {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      TowerDefenseController._Js,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect,
        TowerDefenseController.uJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        TowerDefenseController.cJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        TowerDefenseController.mJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        TowerDefenseController.dJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        TowerDefenseController.CJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleScoreChanged,
        TowerDefenseController.fJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView,
        TowerDefenseController.XJs,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm,
        TowerDefenseController.Sca,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        TowerDefenseController.yIa,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        TowerDefenseController.IIa,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRefreshEditBattleRoleSlotData,
      TowerDefenseController._Js,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefenseBeforeConfirmQuickRoleSelect,
        TowerDefenseController.uJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnChangeRole,
        TowerDefenseController.cJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.EnterInstanceDungeon,
        TowerDefenseController.mJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeon,
        TowerDefenseController.dJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LeaveInstanceDungeonConfirm,
        TowerDefenseController.CJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleScoreChanged,
        TowerDefenseController.fJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnBeforeDestroyInstanceDungeonEntranceView,
        TowerDefenseController.XJs,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TowerDefenseSelfPhantomConfirm,
        TowerDefenseController.Sca,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDoneAndCloseLoading,
        TowerDefenseController.yIa,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        TowerDefenseController.IIa,
      );
  }
  OnRegisterNetEvent() {
    Net_1.Net.Register(14546, this.nJs),
      Net_1.Net.Register(17953, this.sJs),
      Net_1.Net.Register(26856, this.aJs),
      Net_1.Net.Register(16288, this.Mca),
      Net_1.Net.Register(2055, this.Bta);
  }
  OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(14546),
      Net_1.Net.UnRegister(17953),
      Net_1.Net.UnRegister(26856),
      Net_1.Net.UnRegister(16288),
      Net_1.Net.UnRegister(2055);
  }
  GetActivityLevelUnlockState(e) {
    return TowerDefenseController.CheckIsInstanceUnlock(e);
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
      e = e.GetCurrentPhantomLevelInBattle(),
      n = n[e - 1];
    return {
      TitleTextId: n.Name,
      PhantomTextId: n.Name,
      Level: e,
      DescTextId: n.Description,
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
  static lJs(e) {
    return [
      {
        ButtonTextId: "Text_ButtonTextExit_Text",
        DescriptionTextId: void 0,
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: TowerDefenseController.vJs,
      },
      {
        ButtonTextId: "TowerDefence_Restart",
        DescriptionTextId: "TowerDefence_GPint",
        DescriptionArgs: [e],
        IsTimeDownCloseView: !1,
        IsClickedCloseView: !1,
        OnClickedCallback: TowerDefenseController.MJs,
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
  static pJs() {
    if (
      TowerDefenseController.CheckInUiFlow() &&
      TowerDefenseController.qta()
    ) {
      var r = ModelManager_1.ModelManager.TowerDefenseModel,
        e = ModelManager_1.ModelManager.InstanceDungeonModel.GetMatchTeamInfo();
      if (e) {
        let n = 0;
        for (const s of e.vRs) {
          var t = s.q5n;
          for (const _ of s.V6n) {
            var o = _.O6n,
              a = _.DYs,
              l = TowerDefenseController.CheckIsSelf(t),
              i = r.PhantomOwnerDataList[n++];
            (i.PlayerId = t),
              (i.IsSelf = l),
              (i.RoleCfgId = o),
              (i.PhantomId = a),
              l && r.RoleCfgId2PhantomIdMapCache.set(o, a);
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
  static Ozs() {
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
  static wta() {
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
        InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
          r,
          n,
          e.EntranceId,
          0,
          void 0,
          ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
            n,
          ),
        ))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("TowerDefense", 65, "进入副本失败，副本Id不存在", [
            "instanceId",
            r,
          ]),
        !1);
  }
  static RequestScoreReward(n) {
    var e = Protocol_1.Aki.Protocol.MYs.create();
    const r = ModelManager_1.ModelManager.TowerDefenseModel;
    (e.IVn = [n]),
      Net_1.Net.CallAsync(24347, e).then(
        (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("TowerDefense", 65, "塔防积分奖励的response", [
              "response",
              e,
            ]),
            e &&
              e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
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
    var e = Protocol_1.Aki.Protocol.vYs.create();
    const r = ModelManager_1.ModelManager.TowerDefenseModel;
    (e.IVn = [n]),
      Net_1.Net.CallAsync(27007, e).then(
        (e) => {
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("TowerDefense", 65, "塔防关卡奖励的response", [
              "response",
              e,
            ]),
            e &&
              e.O4n === Protocol_1.Aki.Protocol.O4n.NRs &&
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
    TowerDefenseController.wta();
  }
  static SyncSelfTowerDefensePhantomId(n) {
    const r = ModelManager_1.ModelManager.TowerDefenseModel;
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId();
    const t = r.GetOwnerData(e, n);
    t
      ? ((t.PhantomId = r.CurrentSelfPhantomIdInUiTemp),
        r.RoleCfgId2PhantomIdMapCache.set(n, r.CurrentSelfPhantomIdInUiTemp),
        TowerDefenseController.qta()
          ? ((e = ModelManager_1.ModelManager.EditBattleTeamModel),
            InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchChangeRoleRequest(
              e.GetOwnRoleConfigIdList[0],
            ).then(
              (e) => {
                e
                  ? EventSystem_1.EventSystem.Emit(
                      EventDefine_1.EEventName.TowerDefensePhantomChanged,
                    )
                  : ((t.PhantomId = TowerDefenceDefine_1.DEFAULT_ID),
                    r.RoleCfgId2PhantomIdMapCache.delete(n));
              },
              () => {
                (t.PhantomId = TowerDefenceDefine_1.DEFAULT_ID),
                  r.RoleCfgId2PhantomIdMapCache.delete(n);
              },
            ))
          : (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "TowerDefense",
                65,
                "单机同步自己的声骸数据，id：" + r.CurrentSelfPhantomIdInUiTemp,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.TowerDefensePhantomChanged,
            )))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "TowerDefense",
          65,
          "自己选择声骸后，找不到自己的OwnerData，声骸ID不进行同步",
          ["roleCfgId", n],
        );
  }
  static EIa(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "TowerDefense",
        65,
        "战斗结束时刷新的数据，然后根据是否在副本中决定是否打开奖励面板",
        ["notify", e],
      ),
      ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
        (ItemRewardController_1.ItemRewardController.OpenExploreRewardView(
          e.NRs
            ? TowerDefenceDefine_1.INSTANCE_SUCCESS
            : TowerDefenceDefine_1.INSTANCE_FAIL,
          e.NRs,
          void 0,
          {
            TitleTextId: "MowingCurrentPoint",
            Record: "",
            RecordRollingTo: e.mMs,
            IsNewRecord: e.mMs >= e.Qbs && 0 !== e.mMs,
          },
          void 0,
          TowerDefenseController.lJs(e.Qbs),
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          void 0,
          ItemRewardController_1.ItemRewardController.BuildExploreFriendDataList(),
        ),
        UiManager_1.UiManager.IsViewOpen("TowerDefenceInBattleTips") &&
          UiManager_1.UiManager.CloseView("TowerDefenceInBattleTips"),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefenseOnTowerDefenseBattleEndNotify,
        ));
  }
  static GetLevelInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomLevelInBattle();
  }
  static GetLevelContentInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomLevelInBattle().toString();
  }
  static GetExpDataInBattle() {
    return ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomExpPairInBattle();
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
    return e ? n.PhantomMessageCache.StageMapCache.get(e.Id)?.Record ?? 0 : 0;
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
  static qta() {
    return (
      0 !==
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState()
    );
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
  (TowerDefenseController.BuildPhantomIconScrollData = (e) => {
    var n = [],
      r = ModelManager_1.ModelManager.TowerDefenseModel;
    for (const i of r.SortedPhantomConfigCache) {
      var t = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(
          i.PhantomItemId,
        ),
        o =
          (ModelManager_1.ModelManager.GameModeModel.IsMulti
            ? ModelManager_1.ModelManager.EditBattleTeamModel
                .GetInstanceDungeonId
            : ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                .SelectInstanceId) ?? 0,
        a =
          TowerDefenceInstanceByInstanceId_1.configTowerDefenceInstanceByInstanceId.GetConfig(
            o,
          ),
        o =
          (a ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Activity",
                65,
                "副本ID配置错误，无法在塔防副本配置中找到，请检查联机塔防表和副本表",
                ["选中的副本ID", o],
              )),
          !a?.OptionalBuff.includes(i.Id) ?? !0),
        a = {
          Type: 3,
          Data: { ConfigId: i.Id, IsLocked: o, IsChosen: !1 },
          PhantomId: i.PhantomItemId,
          QualityId: t.QualityId,
          IsLockVisibleBlack: o || !r.IsPhantomViewOpened,
        };
      n.push(a);
    }
    n.sort(TowerDefenseController.wla),
      e && (r.CurrentSelfPhantomIdInUiTemp = n[0].Data.ConfigId);
    for (const s of n) {
      var l = s.Data;
      l.IsChosen = r.CurrentSelfPhantomIdInUiTemp === l.ConfigId;
    }
    return n;
  }),
  (TowerDefenseController.BuildPhantomSkillLayoutData = () => {
    var e,
      n,
      r = [];
    for ([
      e,
      n,
    ] of ModelManager_1.ModelManager.TowerDefenseModel.GetCurrentPhantomSkillCfgTemp().entries())
      r.push({
        SkillTextId: n.Name,
        DescriptionTextId: n.Description,
        Level: (e + 1).toString(),
      });
    return r;
  }),
  (TowerDefenseController.BuildPhantomOtherData = () => {
    var e = ModelManager_1.ModelManager.TowerDefenseModel,
      n = ModelManager_1.ModelManager.InstanceDungeonEntranceModel,
      r = e.PhantomConfigCache.get(e.CurrentSelfPhantomIdInUiTemp),
      n = TowerDefenseController.qta() ? n.GetMatchingId() : n.SelectInstanceId,
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
      r.push({ Skill: n.Name, Description: n.Description, IsUnlock: a > e });
    return r;
  }),
  (TowerDefenseController.wla = (e, n) => {
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
  (TowerDefenseController.uJs = () => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 65, "当塔防快速选人确定时"),
      TowerDefenseController.CheckInUiFlow() &&
        (TowerDefenseController.Ozs(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.TowerDefensePhantomChanged,
        ));
  }),
  (TowerDefenseController.cJs = () => {}),
  (TowerDefenseController.mJs = () => {
    TowerDefenseController.CheckInInstanceDungeon() &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.TowerDefenseShowInBattleView,
        !0,
      );
  }),
  (TowerDefenseController.dJs = () => {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.TowerDefenseShowInBattleView,
      !1,
    );
  }),
  (TowerDefenseController.CJs = () => {
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
      () => {
        UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
          UiManager_1.UiManager.CloseView("ExploreRewardView"),
          ModelManager_1.ModelManager.TowerDefenseModel.ResetAllCache();
      },
    );
  }),
  (TowerDefenseController.vJs = (e) => {
    InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.LeaveInstanceDungeon().finally(
      () => {
        UiManager_1.UiManager.IsViewShow("ExploreRewardView") &&
          UiManager_1.UiManager.CloseView("ExploreRewardView"),
          ModelManager_1.ModelManager.TowerDefenseModel.ResetAllCache();
      },
    );
  }),
  (TowerDefenseController.MJs = (e) => {
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
  (TowerDefenseController.fJs = (e, n) => {
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
  (TowerDefenseController.XJs = () => {
    TowerDefenseController.CheckInUiFlow() ||
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "TowerDefense",
          65,
          "当前关闭的是副本入口面板，但是该面板不是因为由塔防活动拉起的",
        )),
      TowerDefenseController.SetIsUiFlowOpen(!1);
  }),
  (TowerDefenseController._Js = (e) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("TowerDefense", 65, "当队伍选人变化时", ["Reason", e]),
      TowerDefenseController.CheckInUiFlow()
        ? (TowerDefenseController.qta()
            ? TowerDefenseController.pJs()
            : TowerDefenseController.Ozs(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.TowerDefensePhantomChanged,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "TowerDefense",
            65,
            "队伍选人变化，但是不在UI Flow中",
          );
  }),
  (TowerDefenseController.Sca = (e) => {
    TowerDefenseController.SyncSelfTowerDefensePhantomId(e),
      TowerDefenseController.ResetCurrentTowerDefensePhantomIdInUiTemp();
  }),
  (TowerDefenseController.yIa = () => {
    var e;
    TowerDefenseController.CheckInInstanceDungeon() &&
      (e = ModelManager_1.ModelManager.TowerDefenseModel).DelayedEndNotify &&
      (TowerDefenseController.EIa(e.DelayedEndNotify),
      (e.DelayedEndNotify = void 0));
  }),
  (TowerDefenseController.IIa = (e) => {
    TowerDefenseController.CheckInUiFlow() &&
      "EditBattleTeamView" === e &&
      (ModelManager_1.ModelManager.TowerDefenseModel.RoleCfgId2PhantomIdMapCache.clear(),
      TowerDefenseController.CheckActivityUnlockByMulti() ||
        TowerDefenseController.SetIsUiFlowOpen(!1));
  });
//# sourceMappingURL=TowerDefenceController.js.map
