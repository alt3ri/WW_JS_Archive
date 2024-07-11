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
      (this.I1a = !1),
      (this.T1a = new Map()),
      (this.nye = () => {
        this.T1a.set(
          ActivityRecallDefine_1.ERecallStartCondition.WorldDone,
          !0,
        ),
          this.L1a();
      }),
      (this.itt = () => {
        var e =
            ActivityRecallHelper_1.ActivityRecallHelper.IsActivityRecallReady,
          e =
            (this.T1a.set(
              ActivityRecallDefine_1.ERecallStartCondition.RecallReady,
              e,
            ),
            ModelManager_1.ModelManager.ActivityRecallModel
              .ActivityRecallFirstShow),
          e =
            (this.T1a.set(
              ActivityRecallDefine_1.ERecallStartCondition.FirstShow,
              e,
            ),
            ModelManager_1.ModelManager.ActivityRecallModel
              .ActivityRecallForbidStart),
          e =
            (this.T1a.set(
              ActivityRecallDefine_1.ERecallStartCondition.UnForbidStart,
              !e,
            ),
            ActivityRecallHelper_1.ActivityRecallHelper.ActivityRecallData.IsActivityOpen());
        this.T1a.set(ActivityRecallDefine_1.ERecallStartCondition.IsOpen, e),
          this.L1a();
      }),
      (this.JDe = () => {
        this.T1a.set(
          ActivityRecallDefine_1.ERecallStartCondition.ActivateBattle,
          !0,
        ),
          this.L1a();
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
    return this.T1a.clear(), !(this.I1a = !1);
  }
  OnGetActivityResource(e) {
    return "UiItem_ActivityCircumfluenceMain";
  }
  OnCreateActivityData(e) {
    return (
      (ModelManager_1.ModelManager.ActivityRecallModel.ActivityId = e.J4n),
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
    this.D1a([e], Protocol_1.Aki.Protocol.Wua.Proto_SignReward);
  }
  RequestClaimScoreReward(e) {
    this.D1a(e, Protocol_1.Aki.Protocol.Wua.Proto_ScoreReward);
  }
  RequestClaimTaskReward(e) {
    this.D1a([e], Protocol_1.Aki.Protocol.Wua.Proto_TaskReward);
  }
  D1a(e, t) {
    var i = ModelManager_1.ModelManager.ActivityRecallModel.ActivityId,
      r = Protocol_1.Aki.Protocol.bua.create();
    (r.IVn = e ?? []),
      (r.T6n = i),
      (r.x6n = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallController->RequestRecallReward",
          ["请求领取回流活动奖励, request", r],
        ),
      Net_1.Net.Call(15936, r, (e) => {
        e &&
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            16068,
          );
      });
  }
  async RequestGachaInfo() {
    var e = Protocol_1.Aki.Protocol.Vrs.create(),
      e =
        ((e.XVn = LanguageSystem_1.LanguageSystem.GetLanguageDefineByCode(
          LanguageSystem_1.LanguageSystem.PackageLanguage,
        ).LanguageType),
        await Net_1.Net.CallAsync(12155, e));
    e
      ? e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            16631,
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Gacha", 64, "抽卡服务端数据:", [
              "Result",
              JSON.stringify(e),
            ]),
          ModelManager_1.ModelManager.GachaModel.InitGachaInfoMap(e.jUs),
          (ModelManager_1.ModelManager.GachaModel.TodayResultCount = e.WUs),
          (ModelManager_1.ModelManager.GachaModel.RecordId = e.KUs))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallController.RequestGachaInfo 请求抽卡数据失败",
        );
  }
  L1a() {
    let e = !0,
      t = void 0;
    for (const r in ActivityRecallDefine_1.ERecallStartCondition) {
      var i = Number(r);
      if (!isNaN(i))
        if (!(this.T1a.get(i) ?? !1)) {
          (e = !1), (t = ActivityRecallDefine_1.ERecallStartCondition[i]);
          break;
        }
    }
    e
      ? this.I1a ||
        ((this.I1a = !0),
        UiManager_1.UiManager.OpenView("ActivityRecallStartView"))
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          64,
          "[回流活动]不播放回流开场领奖,ActivityRecallController.CheckIfStart->",
          ["未满足启动的条件", t],
        );
  }
}
exports.ActivityRecallController = ActivityRecallController;
//# sourceMappingURL=ActivityRecallController.js.map
