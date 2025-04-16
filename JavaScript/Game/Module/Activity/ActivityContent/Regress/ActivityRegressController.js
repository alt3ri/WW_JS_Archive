"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressController = void 0);
const UE = require("ue"),
  LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController"),
  SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask"),
  WorldMapController_1 = require("../../../WorldMap/WorldMapController"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityRegressData_1 = require("./ActivityRegressData"),
  ActivityRegressDefine_1 = require("./ActivityRegressDefine"),
  ActivityHomePageRegressSubView_1 = require("./HomePage/ActivityHomePageRegressSubView");
class ActivityRegressController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Jca = new Map()),
      (this.nye = () => {
        this.Jca.set(
          ActivityRegressDefine_1.ERecallStartCondition.WorldDone,
          !0,
        ),
          this.zca();
      }),
      (this.itt = () => {
        var e =
            ModelManager_1.ModelManager.ActivityRegressModel
              .IsActivityRecallReady,
          e =
            (this.Jca.set(
              ActivityRegressDefine_1.ERecallStartCondition.RecallReady,
              e,
            ),
            ModelManager_1.ModelManager.ActivityRegressModel
              .ActivityRecallFirstShow),
          e =
            (this.Jca.set(
              ActivityRegressDefine_1.ERecallStartCondition.FirstShow,
              e,
            ),
            ModelManager_1.ModelManager.ActivityRegressModel
              .ActivityRecallForbidStart),
          e =
            (this.Jca.set(
              ActivityRegressDefine_1.ERecallStartCondition.UnForbidStart,
              !e,
            ),
            ModelManager_1.ModelManager.ActivityRegressModel.IsActivityOpen);
        this.Jca.set(ActivityRegressDefine_1.ERecallStartCondition.IsOpen, e),
          this.zca();
      }),
      (this.TDa = (e) => {
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData &&
          ActivityRegressDefine_1.RECALL_SCORE_ITEM_ID === e &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityId,
          );
      });
  }
  OnInit() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ActivityRecall", 63, "回流活动->初始化回流活动"),
      !0
    );
  }
  OnOpenView(e) {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
        this.itt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.TDa,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
        this.itt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCommonItemCountAnyChange,
        this.TDa,
      );
  }
  OnClear() {
    return this.Jca.clear(), !0;
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityCircumfluenceMain";
  }
  OnCreateActivityData(e) {
    return (
      (ModelManager_1.ModelManager.ActivityRegressModel.ActivityId = e.s5n),
      new ActivityRegressData_1.ActivityRegressData()
    );
  }
  OnCreateSubPageComponent(e) {
    return new ActivityHomePageRegressSubView_1.ActivityHomePageRegressSubView();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  RequestClaimSignReward(e) {
    this.Fh1(e, Protocol_1.Aki.Protocol.Ja1.Proto_SignReward);
  }
  RequestClaimQuestionnaireReward(e) {
    this.Fh1(e, Protocol_1.Aki.Protocol.Ja1.za1);
  }
  RequestClaimScoreReward(r) {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId,
      t = Protocol_1.Aki.Protocol.ja1.create();
    (t.BVn = r),
      (t.w6n = e),
      Net_1.Net.Call(19044, t, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                25299,
              )
            : (ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetRegressScoreRewardReached(
                r,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RecallActivityInfoUpdate,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RefreshCommonActivityRedDot,
                ModelManager_1.ModelManager.ActivityRegressModel.ActivityId,
              )));
      });
  }
  RequestClaimTaskReward(e) {
    this.Fh1(e, Protocol_1.Aki.Protocol.Ja1.Proto_TaskReward);
  }
  Fh1(e, r) {
    var t = ModelManager_1.ModelManager.ActivityRegressModel.ActivityId,
      i = Protocol_1.Aki.Protocol.$a1.create();
    (i.w6n = t),
      (i.k6n = r),
      (i.gps = e),
      Net_1.Net.Call(26837, i, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            18998,
          );
      });
  }
  async RequestGachaInfo() {
    var e = Protocol_1.Aki.Protocol.Xrs.create(),
      e =
        ((e.r9n = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        ).LanguageType),
        await Net_1.Net.CallAsync(21233, e));
    e
      ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            19120,
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Gacha", 63, "抽卡服务端数据:", [
              "Result",
              JSON.stringify(e),
            ]),
          ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(e.zUs),
          (ModelManager_1.ModelManager.GachaModel.TodayResultCount = e.ZUs),
          (ModelManager_1.ModelManager.GachaModel.RecordId = e.ews))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "回流活动->ActivityRegressController.RequestGachaInfo 请求抽卡数据失败",
        );
  }
  zca() {
    let e = !0,
      r = void 0;
    for (const o in ActivityRegressDefine_1.ERecallStartCondition) {
      var t = Number(o);
      if (!isNaN(t))
        if (!(this.Jca.get(t) ?? !1)) {
          (e = !1), (r = ActivityRegressDefine_1.ERecallStartCondition[t]);
          break;
        }
    }
    var i;
    e
      ? ModelManager_1.ModelManager.ActivityRegressModel.AlreadyStartView ||
        ((i = new SplashScreenTask_1.SplashScreenTask(4, 0, () => {
          UiManager_1.UiManager.OpenView("ActivityRegressStartupView");
        })),
        SplashScreenController_1.SplashScreenController.PushSplashScreenTask(i))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          63,
          "[回流活动]不播放回流开场领奖,ActivityRecallController.CheckIfStart->",
          ["未满足启动的条件", r],
        );
  }
  OpenQuestionnaire(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("ActivityRecall", 63, "回流活动->打开调查问卷", [
        "type",
        e,
      ]);
    var r = !ControllerHolder_1.ControllerHolder.KuroSdkController.CanUseSdk(),
      e = this.GetQuestionnaireUrl(e);
    r
      ? ModelManager_1.ModelManager.MailModel.OpenWebBrowser(e)
      : ControllerHolder_1.ControllerHolder.KuroSdkController.SdkOpenUrlWnd(
          "",
          e,
          !0,
          !1,
        );
  }
  RequestQuestionOpen(e) {
    const r =
      ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(
        e,
      );
    e = Protocol_1.Aki.Protocol.zp1.create();
    (e.ev1 = r.Id),
      Net_1.Net.Call(16707, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
            ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
              e.Q4n,
              23229,
            ),
          ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.SetQuestionnaireReached(
            r.Id,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RecallActivityInfoUpdate,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityId,
          ));
      });
  }
  GetQuestionnaireUrl(e) {
    var e =
        ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(
          e,
        ),
      r = ModelManager_1.ModelManager.LoginModel.GetServerId() ?? "",
      t = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? "",
      i =
        CommonParamById_1.configCommonParamById.GetStringConfig(
          "mail_question_key",
        ),
      i = "" + e.QuestionnaireId + t + ";" + r + i;
    return (
      e.HyperLink +
      `?sojumpparm=${t};${r}&parmsign=${UE.KuroStaticLibrary.HashStringWithSHA1(i)}&langv=` +
      ConfigManager_1.ConfigManager.LanguageConfig.GetLanguageDefineByLanguageCode(
        LanguageSystem_1.LanguageSystem.PackageLanguage,
      ).QuestionnaireId
    );
  }
  RequestAllTaskScoreRewards() {
    var e = ModelManager_1.ModelManager.ActivityRegressModel.Grade,
      r = [];
    for (const i of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(
      e,
    )) {
      var t = i.Id;
      1 ===
        ModelManager_1.ModelManager.ActivityRegressModel.ActivityData.GetRegressTaskScoreRewardState(
          i,
        ) && r.push(t);
    }
    0 < r.length && this.RequestClaimScoreReward(r);
  }
  JumpByQuestConfig(e) {
    var r = e.TaskType;
    if (0 === r) {
      var t,
        i,
        o = e.TaskSubType;
      if (1 === o)
        return (
          (t =
            ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId()),
          (i =
            ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest()),
          void 0 === t && void 0 !== i ? this.Vh1(e) : this.Nh1(e)
        );
      if (2 === o) return this.Py1();
    }
    return 1 === r
      ? (ControllerHolder_1.ControllerHolder.AdventureGuideController.OpenGuideView(
          "DailyActivityTabView",
        ),
        !0)
      : (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            63,
            "回流活动->JumpToQuestView 没有定义该类型的回流活动任务跳转！",
            ["taskType: ", r],
            ["taskSubType: ", e.TaskSubType],
            ["config: ", e],
          ),
        !1);
  }
  Nh1(e) {
    var r =
      ModelManager_1.ModelManager.ActivityRegressModel.GetFirstUnFinishMainQuestId();
    return void 0 === r
      ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1)
      : (UiManager_1.UiManager.OpenView("QuestView", r), !0);
  }
  Vh1(e) {
    var r =
      ModelManager_1.ModelManager.ActivityRegressModel.GetFirstShowRoleQuest();
    return void 0 === r
      ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Role_Precondition",
        ),
        !1)
      : (UiManager_1.UiManager.OpenView("QuestView", r.Id), !0);
  }
  Py1() {
    var e = ModelManager_1.ModelManager.MapModel.GetAllUnlockedAreas();
    if (void 0 === e || e.size <= 0)
      return (
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1
      );
    var r,
      t = [];
    for ([r] of e) {
      var i =
        ModelManager_1.ModelManager.ExploreProgressModel.GetExploreAreaData(r);
      void 0 !== i && t.push(i);
    }
    if ((t.sort((e, r) => e.GetProgress() - r.GetProgress()), t.length <= 0))
      return (
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            63,
            "[回流活动]ActivityRegress->RecallDailyExploreTaskJump 探索任务跳转失败，当前没有探索度数据",
          ),
        !1
      );
    let o = void 0;
    for (const l of t) {
      var a = l.AreaId,
        n = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(a);
      if (void 0 === n)
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "ActivityRecall",
            63,
            "[回流活动]ActivityRegress->RecallDailyExploreTaskJump 探索任务跳转缺少area配置, 请检查q.区域表",
            ["areaId: ", a],
          );
      else if (0 === n.DeliveryMarkId)
        ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "ActivityRecall",
              63,
              "[回流活动]ActivityRegress-> 探索任务跳转缺少DeliveryMarkId配置, 请检查q.区域表,并联系技术策划对齐",
              ["areaId: ", a],
              ["DeliveryMarkId: ", n.DeliveryMarkId],
            );
      else {
        (a = n.DeliveryMarkId),
          (a = ConfigManager_1.ConfigManager.MapConfig.GetConfigMark(a));
        if (ModelManager_1.ModelManager.MapModel.CheckFogUnlocked(a.FogHide)) {
          o = n;
          break;
        }
      }
    }
    return void 0 === o
      ? (ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "RecallActivity_Tips_01",
        ),
        !1)
      : ((e = {
          MarkId: o.DeliveryMarkId,
          MarkType: o.DeliveryMarkType,
          StartScale: ModelManager_1.ModelManager.WorldMapModel.MapScaleMin,
          OpenFogId: 0,
        }),
        WorldMapController_1.WorldMapController.OpenView(2, !1, e),
        !0);
  }
}
exports.ActivityRegressController = ActivityRegressController;
//# sourceMappingURL=ActivityRegressController.js.map
