"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallHelper = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  MapMarkByMarkId_1 = require("../../../../../../Core/Define/ConfigQuery/MapMarkByMarkId"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  LocalStorage_1 = require("../../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../../Common/LocalStorageDefine"),
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
  static get IsActivityOpen() {
    return (
      !!ActivityRecallHelper.ActivityRecallData &&
      ActivityRecallHelper.ActivityRecallData.IsActivityOpen()
    );
  }
  static get ActivityRecallFirstShow() {
    var e, r;
    return (
      void 0 === ActivityRecallHelper.HHa &&
        ((e = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .ActivityRecallWatchFirstShowTime,
        )),
        (r = ActivityRecallHelper.ActivityRecallData.EndShowTime),
        (ActivityRecallHelper.HHa = void 0 === e || e < r)),
      ActivityRecallHelper.HHa
    );
  }
  static set ActivityRecallFirstShow(e) {
    var r;
    ActivityRecallHelper.HHa !== e &&
      (e ||
        ((r = ActivityRecallHelper.ActivityRecallData.EndShowTime),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .ActivityRecallWatchFirstShowTime,
          r,
        )),
      (ActivityRecallHelper.HHa = e));
  }
  static get IsActivityRecallReady() {
    return (
      0 !== ModelManager_1.ModelManager.ActivityRecallModel.ActivityId &&
      void 0 !== ActivityRecallHelper.ActivityRecallData
    );
  }
  static RefreshItemGrid(e, r, i, [t, a, l]) {
    var o = r.Id;
    switch (
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemDataTypeByConfigId(o)
    ) {
      case 1:
        var c = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(o),
          c = {
            Data: r,
            ElementId: c.ElementId,
            Type: 2,
            ItemConfigId: o,
            BottomText: i.toString(),
            QualityId: c.QualityId,
            IsLockVisible: t,
            IsReceivableVisible: a,
            IsReceivedVisible: l,
          };
        e.Apply(c);
        break;
      case 3:
        c = {
          Data: r,
          Type: 3,
          ItemConfigId: o,
          BottomText: i.toString(),
          IsLockVisible: t,
          IsReceivableVisible: a,
          IsReceivedVisible: l,
        };
        e.Apply(c);
        break;
      default:
        c = {
          Data: r,
          Type: 4,
          ItemConfigId: o,
          BottomText: i.toString(),
          IsLockVisible: t,
          IsReceivableVisible: a,
          IsReceivedVisible: l,
        };
        e.Apply(c);
    }
    e.SetLockVisible(t), e.SetReceivableVisible(a);
    var n = e.SetReceivedVisible(l);
    l &&
      void 0 !== n &&
      n.IsCreate &&
      n.IsStartOrStarting &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "ActivityRecall",
        64,
        "[回流活动可领取图标状态异常]->SetReceivedVisible",
        ["IsCreate", n.IsCreate],
        ["IsStart", n.IsStart],
        ["IsStarting", n.IsStarting],
        ["receivedVisible", l],
      );
  }
  static RequestAllScoreRewards() {
    var e =
      ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList();
    const i = ActivityRecallHelper.ActivityRecallData,
      t = [];
    e.forEach((e) => {
      var r = e.Id;
      1 === i.GetRecallTaskScoreRewardState(e) && t.push(r);
    }),
      0 < t.length &&
        ActivityRecallHelper.ActivityRecallController.RequestClaimScoreReward(
          t,
        );
  }
  static IsRecallEntryType(e) {
    return 1 === e || 0 === e || 2 === e || 3 === e;
  }
  static RecallTaskJump(e) {
    var r = e.TaskType,
      i = e.TaskSubType;
    if (r === ActivityRecallDefine_1.EActivityRecallTaskType.Constant) {
      if (1 === i) return this.Ada(e);
      if (2 === i) return this.Uda(e);
    }
    if (
      r === ActivityRecallDefine_1.EActivityRecallTaskType.DailyA ||
      r === ActivityRecallDefine_1.EActivityRecallTaskType.DailyB
    ) {
      if (4 === i) return this.wda(e);
      if (3 === i) return this.Pda(e);
    }
    return (
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallHelper->RecallTaskJump 没有定义该类型的回流活动任务跳转！",
          ["recallTaskType: ", r],
          ["recallTaskSubType: ", i],
          ["config: ", e],
        ),
      !1
    );
  }
  static Ada(e) {
    var r = ActivityRecallHelper.GetFirstMainLineUnFinishTaskId();
    return void 0 === r
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1)
      : (UiManager_1.UiManager.OpenView("QuestView", r), !0);
  }
  static Uda(e) {
    var r = ActivityRecallHelper.GetFirstShowRoleQuest();
    return void 0 === r
      ? (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Role_Precondition",
        ),
        !1)
      : (UiManager_1.UiManager.OpenView("QuestView", r.Id), !0);
  }
  static GetFirstShowRoleQuest() {
    var e = ModelManager_1.ModelManager.QuestNewModel.GetQuestsByType(3);
    e.sort((e, r) => {
      var i =
          ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
            e.MainTypeId,
          ),
        t = ConfigManager_1.ConfigManager.QuestNewConfig.GetQuestMainTypeConfig(
          r.MainTypeId,
        );
      return i && t
        ? i.SortValue !== t.SortValue
          ? i.SortValue - t.SortValue
          : e.Id - r.Id
        : 0;
    });
    for (const r of e) if (r.CanShowInUiPanel()) return r;
  }
  static wda(e) {
    var r =
      ModelManager_1.ModelManager.TrainingDegreeModel.GetTrainingDataList();
    if (void 0 === r)
      return (
        AdventureGuideController_1.AdventureGuideController.OpenGuideView(
          "NewSoundAreaView",
        ),
        !1
      );
    r.sort((e, r) => {
      var i = StringUtils_1.StringUtils.IsEmpty(e.TipsId) ? 0 : 1,
        t = StringUtils_1.StringUtils.IsEmpty(r.TipsId) ? 0 : 1;
      return i != t ? t - i : e.FillAmount - r.FillAmount;
    });
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
  static Pda(e) {
    var r = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas();
    if (void 0 === r || r.size <= 0)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1
      );
    var i,
      t = [];
    for ([i] of r) {
      var a =
        ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(i);
      void 0 !== a && t.push(a);
    }
    if ((t.sort((e, r) => e.GetProgress() - r.GetProgress()), t.length <= 0))
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
    for (const n of t) {
      var o = n.AreaId,
        c = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(o);
      if (void 0 === c)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            64,
            "[回流活动]ActivityRecallHelper->RecallDailyExploreTaskJump 探索任务跳转缺少area配置, 请检查q.区域表",
            ["areaId: ", o],
          );
      else if (0 === c.DeliveryMarkId)
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "ActivityRecall",
              64,
              "[回流活动]ActivityRecallHelper->RecallDailyExploreTaskJump 探索任务跳转缺少DeliveryMarkId配置, 请检查q.区域表,并联系技术策划对齐",
              ["areaId: ", o],
              ["DeliveryMarkId: ", c.DeliveryMarkId],
            );
      else {
        (o = c.DeliveryMarkId),
          (o = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(o));
        if (
          ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(o.FogHide)
        ) {
          l = c;
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
        i = [];
      for ([r] of e) {
        var t =
          ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(
            r,
          );
        void 0 !== t && i.push(t);
      }
      if (
        (i.sort((e, r) => e.GetProgress() - r.GetProgress()), !(i.length <= 0))
      ) {
        let e = void 0;
        for (const o of i) {
          var a = o.AreaId,
            a = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(a);
          if (void 0 !== a && 0 !== a.DeliveryMarkId) {
            var l = a.DeliveryMarkId,
              l = MapMarkByMarkId_1.configMapMarkByMarkId.GetConfig(l);
            if (
              ModelManager_1.ModelManager.MapModel.CheckAreasUnlocked(l.FogHide)
            ) {
              e = a;
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
    for (const i of e.ArgId) {
      var r = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i);
      if (0 !== r && 3 !== r) return i;
    }
  }
  static GetFirstMainLineUnFinishTaskId() {
    var e =
      ModelManager_1.ModelManager.QuestNewModel.GetFirstShowQuestByType(1);
    if (e) return e.Id;
  }
  static CheckIfEntryOpen(e) {
    var r,
      i,
      e = e.GachaId;
    return 0 < e
      ? void 0 !== (i = ModelManager_1.ModelManager.GachaModel.GetGachaInfo(e))
        ? ((r = TimeUtil_1.TimeUtil.GetServerTime()),
          (e = ActivityRecallHelper.GetValidGachaPool(e)),
          [0.1 < (i = i.GetPoolEndTimeByPoolInfo(e) - r), i])
        : [!1, 0]
      : [!0, void 0];
  }
  static GetValidGachaPool(e) {
    for (const i of ModelManager_1.ModelManager.GachaModel.GachaInfoArray)
      if (ModelManager_1.ModelManager.GachaModel.CheckGachaValid(i)) {
        var r = i.UsePoolId,
          r = 0 < r ? i.GetPoolInfo(r) : i.GetFirstValidPool();
        if (r && i.Id === e) return r;
      }
  }
  static ReportRecallLog1023(e) {
    ActivityRecallHelper.aga("1023", e);
  }
  static ReportRecallLog1024(e, r = 0) {
    ActivityRecallHelper.aga("1024", e, r);
  }
  static aga(e, r, i = 0) {
    var t = ActivityRecallHelper.ActivityRecallData,
      a = new LogReportDefine_1.ActivityRecallLogData();
    (a.event_id = e),
      (a.i_activity_id = t.Id),
      (a.i_activity_type = t.Type),
      (a.i_time_left = t.GetActivityOpenTimeLeft()),
      (a.i_type = r),
      (a.i_quest_id = i),
      LogReportController_1.LogReportController.LogReport(a);
  }
  static GetGachaRoleId(e) {
    return ActivityRecallHelper.GetValidGachaPool(e).PreviewIdList[0];
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
      i =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallEntryConfigByEntryType(
          1,
        ),
      i =
        (r.push(i),
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallEntryConfigByEntryType(
          2,
        )),
      [i, t] =
        (r.push(i),
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallRoleEntryConfigByEntryType()),
      [a] = ActivityRecallHelper.CheckIfEntryOpen(i);
    let l = !1;
    return (
      void 0 !== t &&
        (([e] = ActivityRecallHelper.CheckIfEntryOpen(t)), (l = e)),
      (a || l) && (a && r.push(i), !a) && l && r.push(t),
      r
    );
  }
  static GetSortedOpenRecallBaseConfigList() {
    var [e, r] =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallRoleBaseConfigByEntryType(),
      i = [];
    return (
      e && ActivityRecallHelper.CheckIfEntryOpen(e)[0] && i.push(e),
      r && ActivityRecallHelper.CheckIfEntryOpen(r)[0] && i.push(r),
      i
    );
  }
  static GetSortedOpenRecallEntryConfigList() {
    var [e, r] =
        ModelManager_1.ModelManager.ActivityRecallModel.GetRecallRoleEntryConfigByEntryType(),
      i = [];
    return (
      i.push(e),
      i.push(r),
      i.sort((e, r) => {
        if (void 0 === e || void 0 === r) {
          const i = e ? 1 : 0,
            t = r ? 1 : 0;
          return t - i;
        }
        const i = ActivityRecallHelper.CheckIfEntryOpen(e)[0] ? 1 : 0,
          t = ActivityRecallHelper.CheckIfEntryOpen(r)[0] ? 1 : 0;
        return t - i;
      }),
      i
    );
  }
}
(exports.ActivityRecallHelper = ActivityRecallHelper).HHa = void 0;
//# sourceMappingURL=ActivityRecallHelper.js.map
