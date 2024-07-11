"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityController = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ControllerBase_1 = require("../../../Core/Framework/ControllerBase");
const Net_1 = require("../../../Core/Net/Net");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const InputManager_1 = require("../../Ui/Input/InputManager");
const UiManager_1 = require("../../Ui/UiManager");
const ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine");
const ActivityManager_1 = require("./ActivityManager");
class ActivityController extends ControllerBase_1.ControllerBase {
  static OnInit() {
    return (
      this.OnAddEvents(),
      this.OnRegisterNetEvent(),
      ActivityManager_1.ActivityManager.Init(),
      this.OnAddOpenViewCheckFunction(),
      InputManager_1.InputManager.RegisterOpenViewFunc(
        "CommonActivityView",
        ActivityController.a3e,
      ),
      !0
    );
  }
  static OnClear() {
    return (
      this.OnRemoveEvents(),
      this.OnUnRegisterNetEvent(),
      ActivityManager_1.ActivityManager.Clear(),
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
  static CheckIfOpeningActivityAndBackToBattleView() {
    let e, t;
    UiManager_1.UiManager.IsViewOpen("CommonActivityView") &&
      ((e = () => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ResetToBattleView,
        );
      }),
      (t = new ConfirmBoxDefine_1.ConfirmBoxDataNew(115)).FunctionMap.set(1, e),
      t.FunctionMap.set(0, e),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        t,
      ));
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      ActivityController.RequestActivityData,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LocalStorageInitPlayerId,
        ActivityController.h3e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnReceiveActivityData,
        ActivityController.d2e,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnLoadingNetDataDone,
      ActivityController.RequestActivityData,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LocalStorageInitPlayerId,
        ActivityController.h3e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnReceiveActivityData,
        ActivityController.d2e,
      );
  }
  static InitActivity(e) {}
  static OnRegisterNetEvent() {
    Net_1.Net.Register(15548, ActivityController.l3e),
      Net_1.Net.Register(14647, ActivityController._3e);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(15548), Net_1.Net.UnRegister(14647);
  }
  static OpenActivityById(e = 0, t = 4) {
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)
      ? (e =
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
          : UiManager_1.UiManager.OpenView("CommonActivityView", t))
      : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        );
  }
  static OpenActivityContentView(e) {
    const t = ActivityManager_1.ActivityManager.GetActivityController(e.Type);
    ModelManager_1.ModelManager.ActivityModel.SetCurrentSelectActivityId(e.Id),
      t.OpenView(e);
  }
  static RequestReadActivity(t) {
    let e;
    t?.GetIfFirstOpen() &&
      (((e = new Protocol_1.Aki.Protocol.M$n()).YFn = t.Id),
      Net_1.Net.Call(16881, e, (e) => {
        e.lkn !== Protocol_1.Aki.Protocol.lkn.Sys &&
          ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            15351,
          ),
          ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
      })),
      ModelManager_1.ModelManager.ActivityModel.OnReceiveActivityRead(t.Id);
  }
  static CreateActivityData(e) {
    return ActivityManager_1.ActivityManager.GetActivityController(
      e.Ikn,
    ).CreateActivityData(e);
  }
}
(exports.ActivityController = ActivityController),
  ((_a = ActivityController).a3e = () => {
    ActivityController.OpenActivityById(0, 3);
  }),
  (ActivityController.CheckCanOpen = () => {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053)
      ? ModelManager_1.ModelManager.ActivityModel.GetCurrentShowingActivities()
          .length !== 0
      : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
          "FunctionDisable",
        ),
        !1);
  }),
  (ActivityController.u3e = () => {
    ModelManager_1.ModelManager.ActivityModel.RefreshShowingActivities();
  }),
  (ActivityController.d2e = (e, t) => {
    ActivityController.InitActivity(e);
  }),
  (ActivityController.h3e = () => {
    ModelManager_1.ModelManager.ActivityModel.InitCache();
  }),
  (ActivityController.RequestActivityData = async () => {
    let e;
    ModelManager_1.ModelManager.FunctionModel.IsOpen(10053) &&
      ((e = new Protocol_1.Aki.Protocol.v$n()),
      (e = await Net_1.Net.CallAsync(15557, e)).lkn !==
      Protocol_1.Aki.Protocol.lkn.Sys
        ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
            e.lkn,
            17575,
          )
        : (ModelManager_1.ModelManager.ActivityModel.OnReceiveMessageData(
            e.L0s,
          ),
          ModelManager_1.ModelManager.ActivityModel.InitCache()));
  }),
  (ActivityController.l3e = (e) => {
    ModelManager_1.ModelManager.ActivityModel.OnActivityUpdate(e.L0s),
      ActivityController.u3e();
  }),
  (ActivityController._3e = (e) => {
    ModelManager_1.ModelManager.ActivityModel.OnDisableActivity(e.R0s),
      ActivityController.u3e();
  });
// # sourceMappingURL=ActivityController.js.map
