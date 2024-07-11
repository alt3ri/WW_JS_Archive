"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallHelper = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  MapMarkByMarkId_1 = require("../../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../../Ui/UiManager"),
  AdventureGuideController_1 = require("../../../../AdventureGuide/AdventureGuideController"),
  LogReportController_1 = require("../../../../LogReport/LogReportController"),
  LogReportDefine_1 = require("../../../../LogReport/LogReportDefine"),
  ScrollingTipsController_1 = require("../../../../ScrollingTips/ScrollingTipsController"),
  WorldMapController_1 = require("../../../../WorldMap/WorldMapController"),
  ActivityManager_1 = require("../../../ActivityManager"),
  ActivityRecallDefine_1 = require("../ActivityRecallDefine");
class ActivityRecallHelper {
  static get ActivityRecallData() {
    var e = ModelManager_1.ModelManager.ActivityRecallModel.ActivityId;
    return ModelManager_1.ModelManager.ActivityModel.GetActivityById(e);
  }
  static get ActivityRecallController() {
    return ActivityManager_1.ActivityManager.GetActivityController(
      ActivityRecallHelper.ActivityRecallData.Type,
    );
  }
  static get IsActivityRecallReady() {
    return (
      0 !== ModelManager_1.ModelManager.ActivityRecallModel.ActivityId &&
      void 0 !== ActivityRecallHelper.ActivityRecallData
    );
  }
  static RefreshItemGrid(e, r, t, [a, i, l]) {
    var o = r.Id;
    switch (
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(o)
    ) {
      case 1:
        var n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o),
          n = {
            Data: r,
            ElementId: n.ElementId,
            Type: 2,
            ItemConfigId: o,
            BottomText: t.toString(),
            QualityId: n.QualityId,
          };
        e.Apply(n);
        break;
      case 3:
        n = { Data: r, Type: 3, ItemConfigId: o, BottomText: t.toString() };
        e.Apply(n);
        break;
      default:
        n = { Data: r, Type: 4, ItemConfigId: o, BottomText: t.toString() };
        e.Apply(n);
    }
    e.SetLockVisible(a), e.SetReceivableVisible(i), e.SetReceivedVisible(l);
  }
  static RequestAllScoreRewards() {
    var e =
      ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList();
    const t = ActivityRecallHelper.ActivityRecallData,
      a = [];
    e.forEach((e) => {
      var r = e.Id;
      1 === t.GetRecallTaskScoreRewardState(e) && a.push(r);
    }),
      0 < a.length &&
        ActivityRecallHelper.ActivityRecallController.RequestClaimScoreReward(
          a,
        );
  }
  static IsRecallEntryType(e) {
    return 1 === e || 0 === e || 2 === e || 3 === e;
  }
  static RecallTaskJump(e) {
    var r = e.TaskType,
      t = e.TaskSubType;
    if (r === ActivityRecallDefine_1.EActivityRecallTaskType.Constant) {
      if (1 === t) return this.p_a(e);
      if (2 === t) return this.v_a(e);
    }
    if (
      r === ActivityRecallDefine_1.EActivityRecallTaskType.DailyA ||
      r === ActivityRecallDefine_1.EActivityRecallTaskType.DailyB
    ) {
      if (4 === t) return this.M_a(e);
      if (3 === t) return this.S_a(e);
    }
    return (
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallHelper->RecallTaskJump 没有定义该类型的回流活动任务跳转！",
          ["recallTaskType: ", r],
          ["recallTaskSubType: ", t],
          ["config: ", e],
        ),
      !1
    );
  }
  static p_a(e) {
    var r = ActivityRecallHelper.GetFirstMainLineUnFinishTaskId();
    return void 0 === r
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1)
      : (UiManager_1.UiManager.OpenView("QuestView", r), !0);
  }
  static v_a(e) {
    var r = ActivityRecallHelper.GetFirstMainLineUnFinishTaskId(),
      t = ActivityRecallHelper.GetFirstShowRoleQuest();
    return void 0 === t && void 0 === r
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Role_Precondition",
        ),
        !1)
      : void 0 === t
        ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
            "RecallActivity_Tips_01",
          ),
          !1)
        : (UiManager_1.UiManager.OpenView("QuestView", t.Id), !0);
  }
  static GetFirstShowRoleQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(3);
    e.sort((e, r) => {
      var t =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
            e.MainTypeId,
          ),
        a = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
          r.MainTypeId,
        );
      return t && a
        ? t.SortValue !== a.SortValue
          ? t.SortValue - a.SortValue
          : e.Id - r.Id
        : 0;
    });
    for (const r of e) if (r.CanShowInUiPanel()) return r;
  }
  static M_a(e) {
    var r =
      ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
    if (void 0 === r)
      return (
        AdventureGuideController_1.AdventureGuideController.OpenGuideView(
          "NewSoundAreaView",
        ),
        !1
      );
    r.sort((e, r) => e.FillAmount - r.FillAmount);
    r = r[0];
    return 0 === r.TrainingType || 1 === r.TrainingType
      ? (AdventureGuideController_1.AdventureGuideController.OpenGuideView(
          "NewSoundAreaView",
          19,
        ),
        !0)
      : 3 === r.TrainingType
        ? (AdventureGuideController_1.AdventureGuideController.OpenGuideView(
            "NewSoundAreaView",
            4,
          ),
          !0)
        : 2 === r.TrainingType &&
          (AdventureGuideController_1.AdventureGuideController.OpenGuideView(
            "NewSoundAreaView",
            22,
          ),
          !0);
  }
  static S_a(e) {
    var r = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas();
    if (void 0 === r || r.size <= 0)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1
      );
    var t,
      a = [];
    for ([t] of r) {
      var i =
        ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(t);
      void 0 !== i && a.push(i);
    }
    if ((a.sort((e, r) => e.GetProgress() - r.GetProgress()), a.length <= 0))
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            64,
            "[回流活动]ActivityRecallHelper->RecallDailyExploreTaskJump 探索任务跳转失败，当前没有探索度数据",
          ),
        !1
      );
    let l = void 0;
    for (const c of a) {
      var o = c.AreaId,
        n = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o);
      if (void 0 === n)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            64,
            "[回流活动]ActivityRecallHelper->RecallDailyExploreTaskJump 探索任务跳转缺少area配置, 请检查q.区域表",
            ["areaId: ", o],
          );
      else if (0 === n.DeliveryMarkId)
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "ActivityRecall",
              64,
              "[回流活动]ActivityRecallHelper->RecallDailyExploreTaskJump 探索任务跳转缺少DeliveryMarkId配置, 请检查q.区域表,并联系技术策划对齐",
              ["areaId: ", o],
              ["DeliveryMarkId: ", n.DeliveryMarkId],
            );
      else {
        (o = n.DeliveryMarkId),
          (o = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(o));
        if (
          ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(o.FogHide)
        ) {
          l = n;
          break;
        }
      }
    }
    return void 0 === l
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1)
      : ((r = {
          MarkId: l.DeliveryMarkId,
          MarkType: l.DeliveryMarkType,
          StartScale: ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
          OpenAreaId: 0,
        }),
        WorldMapController_1.WorldMapController.OpenView(2, !1, r),
        !0);
  }
  static GetMinExploreAreaInfo() {
    var e = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas();
    if (!(void 0 === e || e.size <= 0)) {
      var r,
        t = [];
      for ([r] of e) {
        var a =
          ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
            r,
          );
        void 0 !== a && t.push(a);
      }
      if (
        (t.sort((e, r) => e.GetProgress() - r.GetProgress()), !(t.length <= 0))
      ) {
        let e = void 0;
        for (const o of t) {
          var i = o.AreaId,
            i = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(i);
          if (void 0 !== i && 0 !== i.DeliveryMarkId) {
            var l = i.DeliveryMarkId,
              l = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(l);
            if (
              ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(l.FogHide)
            ) {
              e = i;
              break;
            }
          }
        }
        return e;
      }
    }
  }
  static IsMainLineTaskFinish(e) {
    let r = !0;
    return (
      e.ArgId.forEach((e) => {
        e = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
        r = r && e;
      }),
      r
    );
  }
  static IsRoleTaskFinish() {
    var e =
      ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(3);
    return (
      void 0 !== e &&
      ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e.Id)
    );
  }
  static GetFirstUnFinishTask(e) {
    for (const t of e.ArgId) {
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t);
      if (0 !== r && 3 !== r) return t;
    }
  }
  static GetFirstMainLineUnFinishTaskId() {
    var e =
      ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1);
    if (e) return e.Id;
  }
  static CheckIfEntryOpen(e) {
    var r,
      t,
      e = e.GachaId;
    return 0 < e
      ? void 0 !== (t = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e))
        ? ((r = TimeUtil_1.TimeUtil.GetServerTime()),
          (e = ActivityRecallHelper.GetValidGachaPool(e)),
          [0 < (t = t.GetPoolEndTimeByPoolInfo(e) - r), t])
        : [!1, 0]
      : [!0, void 0];
  }
  static GetValidGachaPool(e) {
    for (const t of ModelManager_1.ModelManager.GachaModel.GachaInfoArray)
      if (ModelManager_1.ModelManager.GachaModel.CheckGachaValid(t)) {
        var r = t.UsePoolId,
          r = 0 < r ? t.GetPoolInfo(r) : t.GetFirstValidPool();
        if (r && t.Id === e) return r;
      }
  }
  static ReportRecallLog1023(e) {
    ActivityRecallHelper.pda("1023", e);
  }
  static ReportRecallLog1024(e, r = 0) {
    ActivityRecallHelper.pda("1024", e, r);
  }
  static pda(e, r, t = 0) {
    var a = ActivityRecallHelper.ActivityRecallData,
      i = new LogReportDefine_1.ActivityRecallLogData();
    (i.event_id = e),
      (i.i_activity_id = a.Id),
      (i.i_activity_type = a.Type),
      (i.i_time_left = a.GetActivityOpenTimeLeft()),
      (i.i_type = r),
      (i.i_quest_id = t),
      LogReportController_1.LogReportController.LogReport(i);
  }
  static GetGachaRoleId(e) {
    return ConfigManager_1.ConfigManager.GachaConfig.GetGachaViewInfo(e)
      .PreviewIdList[0];
  }
  static GetGachaTrialRoleId(e) {
    e = ActivityRecallHelper.GetGachaRoleId(e);
    return ConfigManager_1.ConfigManager.GachaConfig.GetGachaTextureInfo(e)
      .TrialId;
  }
  static GetRoleConfigByGachaId(e) {
    e = ActivityRecallHelper.GetGachaRoleId(e);
    return ConfigManager_1.ConfigManager.GachaConfig.GetRoleInfoById(e);
  }
  static GetRecallOpenEntryViewConfigList() {
    var e,
      r = [],
      t =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallEntryConfigByEntryType(
          1,
        ),
      t =
        (r.push(t),
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallEntryConfigByEntryType(
          2,
        )),
      [t, a] =
        (r.push(t),
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallRoleEntryConfigByEntryType()),
      [i] = ActivityRecallHelper.CheckIfEntryOpen(t);
    let l = !1;
    return (
      void 0 !== a &&
        (([e] = ActivityRecallHelper.CheckIfEntryOpen(a)), (l = e)),
      (i || l) && (i && r.push(t), !i) && l && r.push(a),
      r
    );
  }
  static GetSortedOpenRecallBaseConfigList() {
    var [e, r] =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallRoleBaseConfigByEntryType(),
      t = [];
    return (
      e && ActivityRecallHelper.CheckIfEntryOpen(e)[0] && t.push(e),
      r && ActivityRecallHelper.CheckIfEntryOpen(r)[0] && t.push(r),
      t
    );
  }
  static GetSortedOpenRecallEntryConfigList() {
    var [e, r] =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallRoleEntryConfigByEntryType(),
      t = [];
    return (
      t.push(e),
      t.push(r),
      t.sort((e, r) => {
        if (void 0 === e || void 0 === r) {
          const t = e ? 1 : 0,
            a = r ? 1 : 0;
          return a - t;
        }
        const t = ActivityRecallHelper.CheckIfEntryOpen(e)[0] ? 1 : 0,
          a = ActivityRecallHelper.CheckIfEntryOpen(r)[0] ? 1 : 0;
        return a - t;
      }),
      t
    );
  }
}
exports.ActivityRecallHelper = ActivityRecallHelper;
//# sourceMappingURL=ActivityRecallHelper.js.map
