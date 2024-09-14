"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallController = void 0);
const LanguageSystem_1 = require("../../../../../Core/Common/LanguageSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityRecallData_1 = require("./ActivityRecallData"),
  ActivityRecallDefine_1 = require("./ActivityRecallDefine"),
  ActivityRecallSubView_1 = require("./ActivityRecallSubView"),
  ActivityRecallHelper_1 = require("./Misc/ActivityRecallHelper");
class ActivityRecallController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.Bca = !1),
      (this.qca = new Map()),
      (this.nye = () => {
        this.qca.set(
          ActivityRecallDefine_1.ERecallStartCondition.WorldDone,
          !0,
        ),
          this.Oca();
      }),
      (this.itt = () => {
        var e =
            ActivityRecallHelper_1.ActivityRecallHelper.IsActivityRecallReady,
          e =
            (this.qca.set(
              ActivityRecallDefine_1.ERecallStartCondition.RecallReady,
              e,
            ),
            ActivityRecallHelper_1.ActivityRecallHelper
              .ActivityRecallFirstShow),
          e =
            (this.qca.set(
              ActivityRecallDefine_1.ERecallStartCondition.FirstShow,
              e,
            ),
            ModelManager_1.ModelManager.ActivityRecallModel
              .ActivityRecallForbidStart),
          e =
            (this.qca.set(
              ActivityRecallDefine_1.ERecallStartCondition.UnForbidStart,
              !e,
            ),
            ActivityRecallHelper_1.ActivityRecallHelper.IsActivityOpen);
        this.qca.set(ActivityRecallDefine_1.ERecallStartCondition.IsOpen, e),
          this.Oca();
      }),
      (this.JDe = () => {
        this.qca.set(
          ActivityRecallDefine_1.ERecallStartCondition.ActivateBattle,
          !0,
        ),
          this.Oca();
      });
  }
  OnInit() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 64, "[回流活动]初始化回流活动"),
      !0
    );
  }
  OnOpenView(e) {}
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityUpdate,
        this.itt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      );
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityUpdate,
        this.itt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ActiveBattleView,
        this.JDe,
      );
  }
  OnClear() {
    return this.qca.clear(), !(this.Bca = !1);
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityCircumfluenceMain";
  }
  OnCreateActivityData(e) {
    return (
      (ModelManager_1.ModelManager.ActivityRecallModel.ActivityId = e.s5n),
      new ActivityRecallData_1.ActivityRecallData()
    );
  }
  OnCreateSubPageComponent(e) {
    return new ActivityRecallSubView_1.ActivityRecallSubView();
  }
  OnGetIsOpeningActivityRelativeView() {
    return !1;
  }
  RequestClaimSignReward(e) {
    this.kca([e], Protocol_1.Aki.Protocol.bca.Proto_SignReward);
  }
  RequestClaimScoreReward(e) {
    this.kca(e, Protocol_1.Aki.Protocol.bca.Proto_ScoreReward);
  }
  RequestClaimTaskReward(e) {
    this.kca([e], Protocol_1.Aki.Protocol.bca.Proto_TaskReward);
  }
  kca(e, t) {
    var i = ModelManager_1.ModelManager.ActivityRecallModel.ActivityId,
      r = Protocol_1.Aki.Protocol.Lca.create();
    (r.BVn = e ?? []),
      (r.w6n = i),
      (r.k6n = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallController->RequestRecallReward",
          ["请求领取回流活动奖励, request", r],
        ),
      Net_1.Net.Call(17423, r, (e) => {
        e &&
          e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            18443,
          );
      });
  }
  async RequestGachaInfo() {
    var e = Protocol_1.Aki.Protocol.Xrs.create(),
      e =
        ((e.r9n = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        ).LanguageType),
        await Net_1.Net.CallAsync(23720, e));
    e
      ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            15989,
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Gacha", 64, "抽卡服务端数据:", [
              "Result",
              JSON.stringify(e),
            ]),
          ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(e.zUs),
          (ModelManager_1.ModelManager.GachaModel.TodayResultCount = e.ZUs),
          (ModelManager_1.ModelManager.GachaModel.RecordId = e.ews))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallController.RequestGachaInfo 请求抽卡数据失败",
        );
  }
  Oca() {
    let e = !0;
    for (const i in ActivityRecallDefine_1.ERecallStartCondition) {
      var t = Number(i);
      if (!isNaN(t))
        if (!(this.qca.get(t) ?? !1)) {
          e = !1;
          break;
        }
    }
    e &&
      !this.Bca &&
      ((this.Bca = !0),
      UiManager_1.UiManager.OpenView("ActivityRecallStartView"));
  }
}
exports.ActivityRecallController = ActivityRecallController;
//# sourceMappingURL=ActivityRecallController.js.map
