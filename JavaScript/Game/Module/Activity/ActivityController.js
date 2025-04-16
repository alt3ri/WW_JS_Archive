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
      !(ActivityController.A1h = !1)
    );
  }
  static OnClear() {
    return (
      this.OnRemoveEvents(),
      this.OnUnRegisterNetEvent(),
      ActivityManager_1.ActivityManager.Clear(),
      this.R6t(),
      this.OnRemoveOpenViewCheckFunction(),
      !(ActivityController.A1h = !1)
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
    var t = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        );
      },
      e = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115);
    e.FunctionMap.set(1, t),
      e.FunctionMap.set(0, t),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        e,
      );
  }
  static rYa() {
    var t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(224);
    ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
      t,
    );
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      ActivityController.Q5e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        ActivityController.nye,
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
        EventDefine_1.EEventName.WorldDone,
        ActivityController.nye,
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
  static InitActivity(t) {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(26498, ActivityController.T4e),
      Net_1.Net.Register(25939, ActivityController.L4e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(26498), Net_1.Net.UnRegister(25939);
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
  static OpenActivityById(t = 0, e = 4, i) {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)
      ? 0 ===
        ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities()
          .length
        ? (ControllerHolder_1.ControllerHolder.ActivityController.rYa(), !1)
        : (UiManager_1.UiManager.IsViewOpen("CommonActivityView")
            ? EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.ActivityViewChange,
                t,
              )
            : UiManager_1.UiManager.OpenView("CommonActivityView", [e, t], i),
          !0)
      : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        ),
        !1);
  }
  static OpenActivityContentView(t) {
    ActivityManager_1.ActivityManager.GetActivityController(t.Type).OpenView(t);
  }
  static RequestReadActivity(e) {
    var t;
    e?.GetIfFirstOpen() &&
      (((t = new Protocol_1.Aki.Protocol.M$n()).w6n = e.Id),
      Net_1.Net.Call(26925, t, (t) => {
        t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            t.Q4n,
            25947,
          ),
          ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(e.Id);
      })),
      ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(e.Id);
  }
  static RequestPreOpenActivity(e, i) {
    var t;
    e?.CanPreOpen() &&
      (((t = new Protocol_1.Aki.Protocol.ak_()).w6n = e.Id),
      Net_1.Net.Call(20302, t, (t) => {
        t
          ? t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                t.Q4n,
                15087,
              ),
              i?.(!1))
            : (EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnActivityPreOpen,
                e.Id,
              ),
              i?.(!0))
          : i?.(!1);
      }));
  }
  static CreateActivityData(t) {
    return ActivityManager_1.ActivityManager.GetActivityController(
      t.h5n,
    ).CreateActivityData(t);
  }
  static IsOpeningActivityRelativeView(t) {
    t = ActivityManager_1.ActivityManager.GetActivityController(t);
    return !!t && t.GetIsOpeningActivityRelativeView();
  }
  static OpenActivityConditionView(t) {
    t &&
      ((t = new ActivityCommonDefine_1.ActivityConditionGroupData(t)),
      UiManager_1.UiManager.OpenView("ActivityConditionView", t));
  }
  static CheckIsActivityClose(t, e) {
    if (e)
      ModelManager_1.ModelManager.ActivityModel.GetActivityById(
        e,
      )?.CheckIfClose() &&
        ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
    else if (t)
      for (const i of ModelManager_1.ModelManager.ActivityModel.GetActivitiesByType(
        t,
      ))
        if (i.CheckIfClose())
          return void ControllerHolder_1.ControllerHolder.ActivityController.ShowActivityRefreshAndBackToBattleView();
  }
}
(exports.ActivityController = ActivityController),
  ((_a = ActivityController).zaa = void 0),
  (ActivityController.A1h = !1),
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
  (ActivityController.AFe = (t, e) => {
    ActivityController.InitActivity(t);
  }),
  (ActivityController.I4e = () => {
    ModelManager_1.ModelManager.ActivityModel.InitCache();
  }),
  (ActivityController.Q5e = () => {
    _a.P3e();
  }),
  (ActivityController.nye = () => {
    ActivityController.A1h ||
      ((ActivityController.A1h = !0), _a.RequestActivityData());
  }),
  (ActivityController.g3e = (t) => {
    for (const i of t) {
      var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(i);
      if (e && ActivityController.IsOpeningActivityRelativeView(e.Type))
        return void _a.ShowActivityRefreshAndBackToBattleView();
    }
  }),
  (ActivityController._Mo = () => {
    _a.RequestActivityData().then((t) => {
      t &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Activity",
            37,
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
      new Promise((e) => {
        var t = new Protocol_1.Aki.Protocol.v$n();
        Net_1.Net.Call(28575, t, (t) => {
          t
            ? t.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
              ? (ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                  t.Q4n,
                  21437,
                ),
                e(!1))
              : (ModelManager_1.ModelManager.ActivityModel.OnReceiveMessageData(
                  t.Yps,
                ),
                ModelManager_1.ModelManager.ActivityModel.InitCache(),
                e(!0))
            : e(!1);
        });
      })
    );
  }),
  (ActivityController.T4e = (t) => {
    ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate(t.Yps),
      ActivityController.D4e();
  }),
  (ActivityController.L4e = (t) => {
    ModelManager_1.ModelManager.ActivityModel.OnDisableActivity(t.Jps),
      ActivityController.D4e();
  });
//# sourceMappingURL=ActivityController.js.map
