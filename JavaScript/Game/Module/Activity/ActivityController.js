"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
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
      );
  }
  static InitActivity(e) {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(10554, ActivityController.T4e),
      Net_1.Net.Register(7236, ActivityController.L4e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(10554), Net_1.Net.UnRegister(7236);
  }
  static R6t() {
    void 0 !== this.Mna &&
      (TimerSystem_1.TimerSystem.Remove(this.Mna), (this.Mna = void 0));
  }
  static P3e() {
    this.R6t(),
      (this.Mna = TimerSystem_1.TimerSystem.Forever(this.Sna, CHECKGAP));
  }
  static OpenActivityById(e = 0, t = 4, i) {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)
      ? !!(e =
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
      (((e = new Protocol_1.Aki.Protocol.M$n()).T6n = t.Id),
      Net_1.Net.Call(9182, e, (e) => {
        e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.O4n,
            4264,
          ),
          ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
      })),
      ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
  }
  static CreateActivityData(e) {
    return ActivityManager_1.ActivityManager.GetActivityController(
      e.Z4n,
    ).CreateActivityData(e);
  }
  static IsOpeningActivityRelativeView(e) {
    e = ActivityManager_1.ActivityManager.GetActivityController(e);
    return !!e && e.GetIsOpeningActivityRelativeView();
  }
}
(exports.ActivityController = ActivityController),
  ((_a = ActivityController).Mna = void 0),
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
  (ActivityController.Sna = () => {
    _a.RequestActivityData();
  }),
  (ActivityController.RequestActivityData = async () => {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) &&
      (await new Promise((t) => {
        var e = new Protocol_1.Aki.Protocol.v$n();
        Net_1.Net.Call(10314, e, (e) => {
          e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                19387,
              )
            : (ModelManager_1.ModelManager.ActivityModel.OnReceiveMessageData(
                e.$ps,
              ),
              ModelManager_1.ModelManager.ActivityModel.InitCache()),
            t();
        });
      }));
  }),
  (ActivityController.T4e = (e) => {
    ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate(e.$ps),
      ActivityController.D4e();
  }),
  (ActivityController.L4e = (e) => {
    ModelManager_1.ModelManager.ActivityModel.OnDisableActivity(e.Hps),
      ActivityController.D4e();
  });
//# sourceMappingURL=ActivityController.js.map
