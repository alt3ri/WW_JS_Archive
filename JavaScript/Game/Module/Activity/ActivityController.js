"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityController = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ControllerBase_1 = require("../../../Core/Framework/ControllerBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputManager_1 = require("../../Ui/Input/InputManager"),
  UiManager_1 = require("../../Ui/UiManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  ActivityCommonDefine_1 = require("./ActivityCommonDefine"),
  ActivityManager_1 = require("./ActivityManager"),
  CHECKGAP = 6e5;
class ActivityController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.OnAddEvents(),
      this.OnRegisterNetEvent(),
      ActivityManager_1.ActivityManager.Init(),
      this.OnAddOpenViewCheckFunction(),
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "CommonActivityView",
        ActivityController.y4e,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      this.OnRemoveEvents(),
      this.OnUnRegisterNetEvent(),
      ActivityManager_1.ActivityManager.Clear(),
      this.R6t(),
      this.OnRemoveOpenViewCheckFunction(),
      !0
    );
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "CommonActivityView",
      ActivityController.CheckCanOpen,
      "ActivityController.CheckCanOpen",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "CommonActivityView",
      ActivityController.CheckCanOpen,
    );
  }
  static ShowActivityRefreshAndBackToBattleView() {
    var e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        );
      },
      t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
    t.FunctionMap.set(1, e),
      t.FunctionMap.set(0, e),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      );
  }
  static PQa() {
    var e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(224);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
      e,
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      ActivityController.Q5e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LocalStorageInitPlayerId,
        ActivityController.I4e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnReceiveActivityData,
        ActivityController.AFe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnActivityClose,
        ActivityController.g3e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CrossDay,
        ActivityController._Mo,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      ActivityController.Q5e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LocalStorageInitPlayerId,
        ActivityController.I4e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnReceiveActivityData,
        ActivityController.AFe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnActivityClose,
        ActivityController.g3e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CrossDay,
        ActivityController._Mo,
      );
  }
  static InitActivity(e) {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15124, ActivityController.T4e),
      Net_1.Net.Register(22819, ActivityController.L4e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15124), Net_1.Net.UnRegister(22819);
  }
  static R6t() {
    void 0 !== this.zaa &&
      (TimerSystem_1.TimerSystem.Remove(this.zaa), (this.zaa = void 0));
  }
  static P3e() {
    this.R6t(),
      (this.zaa = TimerSystem_1.TimerSystem.Forever(
        this.Zaa,
        CHECKGAP,
        void 0,
        void 0,
        void 0,
        !1,
      ));
  }
  static OpenActivityById(e = 0, t = 4, i) {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)
      ? 0 ===
        ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities()
          .length
        ? (ControllerHolder_1.ControllerHolder.ActivityController.PQa(), !1)
        : !!(e =
            ModelManager_1.ModelManager.ActivityModel.GetCurrentOpenActivityData(
              e,
            )) &&
          (ModelManager_1.ModelManager.ActivityModel.SetCurrentSelectActivityId(
            e.Id,
          ),
          e.NeedSelfControlFirstRedPoint() || this.RequestReadActivity(e),
          UiManager_1.UiManager.IsViewOpen("CommonActivityView")
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ActivityViewChange,
              )
            : UiManager_1.UiManager.OpenView("CommonActivityView", t, i),
          !0)
      : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        ),
        !1);
  }
  static OpenActivityContentView(e) {
    var t = ActivityManager_1.ActivityManager.GetActivityController(e.Type);
    ModelManager_1.ModelManager.ActivityModel.SetCurrentSelectActivityId(e.Id),
      t.OpenView(e);
  }
  static RequestReadActivity(t) {
    var e;
    t?.GetIfFirstOpen() &&
      (((e = new Protocol_1.Aki.Protocol.M$n()).w6n = t.Id),
      Net_1.Net.Call(24348, e, (e) => {
        e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.Q4n,
            18758,
          ),
          ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
      })),
      ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
  }
  static CreateActivityData(e) {
    return ActivityManager_1.ActivityManager.GetActivityController(
      e.h5n,
    ).CreateActivityData(e);
  }
  static IsOpeningActivityRelativeView(e) {
    e = ActivityManager_1.ActivityManager.GetActivityController(e);
    return !!e && e.GetIsOpeningActivityRelativeView();
  }
  static OpenActivityConditionView(e) {
    e &&
      ((e = new ActivityCommonDefine_1.ActivityConditionGroupData(e)),
      UiManager_1.UiManager.OpenView("ActivityConditionView", e));
  }
  static CheckIsActivityClose(e, t) {
    if (t)
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        t,
      )?.CheckIfClose() &&
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
    else if (e)
      for (const i of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(
        e,
      ))
        if (i.CheckIfClose())
          return void ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
  }
}
(exports.ActivityController = ActivityController),
  ((_a = ActivityController).zaa = void 0),
  (ActivityController.y4e = () => {
    ActivityController.OpenActivityById(0, 3);
  }),
  (ActivityController.CheckCanOpen = () => {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)
      ? 0 !==
          ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities()
            .length
      : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        ),
        !1);
  }),
  (ActivityController.D4e = () => {
    ModelManager_1.ModelManager.ActivityModel.RefreshShowingActivities();
  }),
  (ActivityController.AFe = (e, t) => {
    ActivityController.InitActivity(e);
  }),
  (ActivityController.I4e = () => {
    ModelManager_1.ModelManager.ActivityModel.InitCache();
  }),
  (ActivityController.Q5e = () => {
    _a.RequestActivityData(), _a.P3e();
  }),
  (ActivityController.g3e = (e) => {
    for (const i of e) {
      var t = ModelManager_1.ModelManager.ActivityModel.GetActivityById(i);
      if (t && ActivityController.IsOpeningActivityRelativeView(t.Type))
        return void _a.ShowActivityRefreshAndBackToBattleView();
    }
  }),
  (ActivityController._Mo = () => {
    _a.RequestActivityData().then((e) => {
      e &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Activity",
            38,
            "[CrossDay][Activity] 跨天活动数据刷新完成",
          ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ActivityCrossDayRefresh,
        ));
    });
  }),
  (ActivityController.Zaa = () => {
    _a.RequestActivityData();
  }),
  (ActivityController.RequestActivityData = async () => {
    return (
      !!ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) &&
      new Promise((t) => {
        var e = new Protocol_1.Aki.Protocol.v$n();
        Net_1.Net.Call(29259, e, (e) => {
          e
            ? e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  e.Q4n,
                  28236,
                ),
                t(!1))
              : (ModelManager_1.ModelManager.ActivityModel.OnReceiveMessageData(
                  e.Yps,
                ),
                ModelManager_1.ModelManager.ActivityModel.InitCache(),
                t(!0))
            : t(!1);
        });
      })
    );
  }),
  (ActivityController.T4e = (e) => {
    ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate(e.Yps),
      ActivityController.D4e();
  }),
  (ActivityController.L4e = (e) => {
    ModelManager_1.ModelManager.ActivityModel.OnDisableActivity(e.Jps),
      ActivityController.D4e();
  });
//# sourceMappingURL=ActivityController.js.map
