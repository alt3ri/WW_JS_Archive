"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDirectTrainController = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../../../Core/Net/Net"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  QuestController_1 = require("../../../QuestNew/Controller/QuestController"),
  SplashScreenController_1 = require("../../../SplashScreen/SplashScreenController"),
  SplashScreenTask_1 = require("../../../SplashScreen/SplashScreenTask"),
  ActivityControllerBase_1 = require("../../ActivityControllerBase"),
  ActivityDirectTrainData_1 = require("./ActivityDirectTrainData"),
  ActivityDirectTrainDefine_1 = require("./ActivityDirectTrainDefine"),
  ActivityDirectTrainHelper_1 = require("./ActivityDirectTrainHelper"),
  ActivityDirectTrainSubView_1 = require("./ActivityDirectTrainSubView");
class ActivityDirectTrainController extends ActivityControllerBase_1.ActivityControllerBase {
  constructor() {
    super(...arguments),
      (this.aU_ = void 0),
      (this.hU_ = new Map()),
      (this.nye = () => {
        this.zca();
      }),
      (this.itt = (e) => {
        var t =
          ActivityDirectTrainHelper_1.ActivityDirectTrainHelper.GetActivityData()?.IsUnLock();
        this.hU_.set(
          ActivityDirectTrainDefine_1.EDirectTrainStartCondition.ActivityOpen,
          t,
        ),
          t &&
            ModelManager_1.ModelManager.ActivityModel.HaveShowingActivity() &&
            this.zca();
      }),
      (this.lU_ = (e) => {
        this.aU_ = e.w6n;
      });
  }
  OnGetIsOpeningActivityRelativeView() {
    throw new Error("Method not implemented.");
  }
  OnInit() {
    return (
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Activity", 63, "[剧情直通车]初始化剧情直通车活动"),
      !0
    );
  }
  OnAddEvents() {
    EventSystem_1.EventSystem.Add(EventDefine_1.EEventName.WorldDone, this.nye),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.itt,
      ),
      Net_1.Net.Register(27778, this.lU_);
  }
  OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.WorldDone,
      this.nye,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.itt,
      ),
      Net_1.Net.UnRegister(27778);
  }
  OnOpenView(e) {}
  OnCreateActivityData(e) {
    return (
      (ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId = e.s5n),
      new ActivityDirectTrainData_1.ActivityDirectTrainData()
    );
  }
  OnCreateSubPageComponent(e) {
    return new ActivityDirectTrainSubView_1.ActivityDirectTrainSubView();
  }
  OnGetActivityResource(e) {
    return "UiItem_PlotTrain";
  }
  RequestThroughTrain(t) {
    var e = Protocol_1.Aki.Protocol.zp_.create();
    (e.w6n = ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId),
      Net_1.Net.Call(28135, e, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                24640,
              )
            : ((e =
                ModelManager_1.ModelManager.ActivityDirectTrainModel.GetSkipQuestId()) !==
                ModelManager_1.ModelManager.QuestNewModel.GetCurTrackedQuest()
                  ?.Id &&
                QuestController_1.QuestNewController.RequestTrackQuest(
                  e,
                  !0,
                  1,
                ),
              t?.()));
      });
  }
  async RequestThroughTrainFinishViewAsync() {
    var e;
    (this.hU_.get(
      ActivityDirectTrainDefine_1.EDirectTrainStartCondition
        .ServerConditionDone,
    ) ??
      !1) &&
      (((e = Protocol_1.Aki.Protocol.Kx_.create()).w6n =
        ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId),
      await Net_1.Net.CallAsync(22305, e),
      this.hU_.set(
        ActivityDirectTrainDefine_1.EDirectTrainStartCondition
          .ServerConditionDone,
        !1,
      ));
  }
  zca() {
    void 0 !== this.aU_ &&
      this.aU_ ===
        ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId &&
      this.hU_.set(
        ActivityDirectTrainDefine_1.EDirectTrainStartCondition
          .ServerConditionDone,
        !0,
      );
    let e = !0,
      t = void 0;
    for (const n in ActivityDirectTrainDefine_1.EDirectTrainStartCondition) {
      var r = Number(n);
      if (!isNaN(r))
        if (!(this.hU_.get(r) ?? !1)) {
          (e = !1),
            (t = ActivityDirectTrainDefine_1.EDirectTrainStartCondition[r]);
          break;
        }
    }
    if (e) {
      if (
        !ModelManager_1.ModelManager.ActivityDirectTrainModel.AlreadyStartView
      ) {
        const o =
          ModelManager_1.ModelManager.ActivityDirectTrainModel.ActivityId;
        var i;
        0 !== o &&
          ((i = new SplashScreenTask_1.SplashScreenTask(3, 0, () => {
            ControllerHolder_1.ControllerHolder.ActivityController.OpenActivityById(
              o,
            );
          })),
          SplashScreenController_1.SplashScreenController.PushSplashScreenTask(
            i,
          ));
      }
    } else
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityDirectTrain",
          63,
          "[直通车活动]CheckIsStart->",
          ["未满足启动的条件", t],
        );
  }
}
exports.ActivityDirectTrainController = ActivityDirectTrainController;
//# sourceMappingURL=ActivityDirectTrainController.js.map
