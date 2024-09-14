"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComponentAction = void 0);
const CustomPromise_1 = require("../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../Core/Common/Log"),
  List_1 = require("../../../Core/Container/List");
var EComponentState, EActionCommandType;
!(function (t) {
  (t[(t.Register = 0)] = "Register"),
    (t[(t.Creating = 1)] = "Creating"),
    (t[(t.Create = 2)] = "Create"),
    (t[(t.Starting = 3)] = "Starting"),
    (t[(t.Start = 4)] = "Start"),
    (t[(t.Showing = 5)] = "Showing"),
    (t[(t.Show = 6)] = "Show"),
    (t[(t.Hiding = 7)] = "Hiding"),
    (t[(t.Hide = 8)] = "Hide"),
    (t[(t.Destroying = 9)] = "Destroying"),
    (t[(t.Destroy = 10)] = "Destroy");
})((EComponentState = EComponentState || {})),
  (function (t) {
    (t[(t.Default = 0)] = "Default"),
      (t[(t.Start = 1)] = "Start"),
      (t[(t.Show = 2)] = "Show"),
      (t[(t.Hide = 3)] = "Hide"),
      (t[(t.Destroy = 4)] = "Destroy");
  })((EActionCommandType = EActionCommandType || {}));
class ComponentAction {
  constructor() {
    (this.ComponentId = 0),
      (this.C_r = EComponentState.Register),
      (this.WaitToDestroy = !1),
      (this.DeadPromise = new CustomPromise_1.CustomPromise()),
      (this.g_r = new List_1.default({
        ActionCommand: EActionCommandType.Default,
        Processed: !0,
      })),
      (this.ComponentId = ++ComponentAction.f_r);
  }
  get IsRegister() {
    return this.C_r === EComponentState.Register;
  }
  get IsCreating() {
    return this.C_r === EComponentState.Creating;
  }
  get IsCreate() {
    return this.C_r === EComponentState.Create;
  }
  get IsCreateOrCreating() {
    return this.IsCreating || this.IsCreate;
  }
  get IsStarting() {
    return this.C_r === EComponentState.Starting;
  }
  get IsStart() {
    return this.C_r === EComponentState.Start;
  }
  get IsStartOrStarting() {
    return this.IsStarting || this.IsStart;
  }
  get IsShowing() {
    return this.C_r === EComponentState.Showing;
  }
  get IsShow() {
    return this.C_r === EComponentState.Show;
  }
  get IsShowOrShowing() {
    return this.IsShowing || this.IsShow;
  }
  get IsHiding() {
    return this.C_r === EComponentState.Hiding;
  }
  get IsHide() {
    return this.C_r === EComponentState.Hide;
  }
  get IsHideOrHiding() {
    return this.IsHiding || this.IsHide;
  }
  get IsDestroying() {
    return this.C_r === EComponentState.Destroying;
  }
  get IsDestroy() {
    return this.C_r === EComponentState.Destroy;
  }
  get IsDestroyOrDestroying() {
    return this.IsDestroy || this.IsDestroying;
  }
  get IsBusy() {
    return (
      this.IsCreating ||
      this.IsStarting ||
      this.IsShowing ||
      this.IsHiding ||
      this.IsDestroying
    );
  }
  async CreateAsync() {
    if (this.IsCreateOrCreating)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "UiCore",
          17,
          "Enter CreateAsync failed, Duplicate call",
          ["ComponentState", EComponentState[this.C_r]],
          ["ComponentName", this.constructor.name],
          ["ComponentId", this.ComponentId],
        );
    else {
      if (!this.IsRegister)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "Enter CreateAsync failed",
              ["ComponentState", EComponentState[this.C_r]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            ),
          !1
        );
      if (
        ((this.C_r = EComponentState.Creating),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter CreateAsync Creating",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          ),
        !(await this.OnCreateAsyncImplement()))
      )
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "Creating failed",
              ["ComponentState", EComponentState[this.C_r]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            ),
          !1
        );
      (this.C_r = EComponentState.Create),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter CreateAsync Create",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          );
    }
    return !0;
  }
  async StartAsync() {
    var t;
    return this.IsBusy
      ? this.p_r(EActionCommandType.Start)
      : ((t = await this.v_r()), this.M_r(), t);
  }
  async v_r() {
    if (this.IsStartOrStarting)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "UiCore",
          17,
          "Enter StartAsyncImplement failed, Duplicate call",
          ["ComponentState", EComponentState[this.C_r]],
          ["ComponentName", this.constructor.name],
          ["ComponentId", this.ComponentId],
        );
    else {
      if (!this.IsCreate)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "Enter StartAsyncImplement failed",
              ["ComponentState", EComponentState[this.C_r]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            ),
          !1
        );
      (this.C_r = EComponentState.Starting),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter StartAsyncImplement Starting",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          ),
        await this.OnStartAsyncImplement(),
        (this.C_r = EComponentState.Start),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter StartAsyncImplement Start",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          );
    }
    return !0;
  }
  async ShowAsync() {
    var t;
    return this.IsBusy
      ? this.p_r(EActionCommandType.Show)
      : ((t = await this.E_r()), this.M_r(), t);
  }
  async E_r() {
    if (this.IsShowOrShowing)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "UiCore",
          17,
          "Enter ShowAsyncImplement failed, Duplicate call",
          ["ComponentState", EComponentState[this.C_r]],
          ["ComponentName", this.constructor.name],
          ["ComponentId", this.ComponentId],
        );
    else {
      if (!this.IsStartOrStarting && !this.IsHideOrHiding)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "Enter ShowAsyncImplement failed",
              ["ComponentState", EComponentState[this.C_r]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            ),
          !1
        );
      (this.C_r = EComponentState.Showing),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter ShowAsyncImplement Showing",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          ),
        await this.OnShowAsyncImplement(),
        (this.C_r = EComponentState.Show),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter ShowAsyncImplement Show",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          );
    }
    return !0;
  }
  async HideAsync() {
    var t;
    return this.IsBusy
      ? this.p_r(EActionCommandType.Hide)
      : ((t = await this.S_r()), this.M_r(), t);
  }
  async S_r() {
    if (this.IsHideOrHiding)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "UiCore",
          17,
          "Enter HideAsyncImplement failed, Duplicate call",
          ["ComponentState", EComponentState[this.C_r]],
          ["ComponentName", this.constructor.name],
          ["ComponentId", this.ComponentId],
        );
    else {
      if (!this.IsStartOrStarting && !this.IsShowOrShowing)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "UiCore",
              17,
              "Enter HideAsyncImplement failed",
              ["ComponentState", EComponentState[this.C_r]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            ),
          !1
        );
      (this.C_r = EComponentState.Hiding),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter HideAsyncImplement Hiding",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          ),
        await this.OnHideAsyncImplement(),
        (this.C_r = EComponentState.Hide),
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter HideAsyncImplement Hide",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          );
    }
    return !0;
  }
  async DestroyAsync() {
    var t;
    return (
      (this.WaitToDestroy = !0),
      this.g_r.RemoveAllNodeWithoutHead(),
      this.IsBusy
        ? this.p_r(EActionCommandType.Destroy)
        : ((t = await this.y_r()), this.g_r.RemoveAllNodeWithoutHead(), t)
    );
  }
  async CloseMeAsync() {
    return this.DestroyAsync();
  }
  async y_r() {
    if (this.IsDestroyOrDestroying)
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "UiCore",
          17,
          "Enter DestroyAsyncImplement failed, Duplicate call",
          ["ComponentState", EComponentState[this.C_r]],
          ["ComponentName", this.constructor.name],
          ["ComponentId", this.ComponentId],
        );
    else
      try {
        this.IsShowOrShowing && (await this.S_r()),
          (this.WaitToDestroy = !1),
          ComponentAction.OpenLog &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "UiCore",
              17,
              "Enter DestroyAsyncImplement Destroying",
              ["ComponentState", EComponentState[this.C_r]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            ),
          (this.C_r = EComponentState.Destroying),
          await this.OnDestroyAsyncImplement(),
          (this.C_r = EComponentState.Destroy),
          ComponentAction.OpenLog &&
            Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "UiCore",
              17,
              "Enter DestroyAsyncImplement Destroy",
              ["ComponentState", EComponentState[this.C_r]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            );
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Game",
              17,
              "Enter DestroyAsyncImplement Error",
              t,
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Game",
              17,
              "Enter DestroyAsyncImplement Exception",
              ["error", t],
            );
      } finally {
        ComponentAction.OpenLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "Enter DestroyAsyncImplement Dead",
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          ),
          this.DeadPromise.IsFulfilled() || this.DeadPromise.SetResult();
      }
    return !0;
  }
  Show(t = void 0) {
    this.ShowAsync().then(t);
  }
  Hide(t = void 0) {
    this.HideAsync().then(t);
  }
  Destroy(t = void 0) {
    this.DestroyAsync().then(t);
  }
  async OnCreateAsyncImplement() {
    return Promise.resolve(!0);
  }
  async OnStartAsyncImplement() {}
  async OnShowAsyncImplement() {}
  async OnHideAsyncImplement() {}
  async OnDestroyAsyncImplement() {}
  static I_r(t, e) {
    return (
      t === e ||
      (t === EActionCommandType.Show && e === EActionCommandType.Hide) ||
      (t === EActionCommandType.Hide && e === EActionCommandType.Show)
    );
  }
  T_r() {
    switch (this.C_r) {
      case EComponentState.Starting:
        return EActionCommandType.Start;
      case EComponentState.Showing:
        return EActionCommandType.Show;
      case EComponentState.Hiding:
        return EActionCommandType.Hide;
      case EComponentState.Destroying:
        return EActionCommandType.Destroy;
      default:
        return EActionCommandType.Default;
    }
  }
  p_r(t) {
    var e, n;
    return this.T_r() === t
      ? (Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "UiCore",
            17,
            "[TryCacheAction] is same with current action",
            ["actionType", EActionCommandType[t]],
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          ),
        !1)
      : (n = (e = this.g_r.TailNode).Element.ActionCommand) === t
        ? (Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "UiCore",
              17,
              "[TryCacheAction] is same with tail action",
              ["actionType", EActionCommandType[t]],
              ["ComponentState", EComponentState[n]],
              ["ComponentName", this.constructor.name],
              ["ComponentId", this.ComponentId],
            ),
          !1)
        : n === EActionCommandType.Destroy
          ? (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "UiCore",
                17,
                "[TryCacheAction] tailActionType is Destroy, not allow to cache any action",
                ["actionType", EActionCommandType[t]],
                ["ComponentState", EComponentState[this.C_r]],
                ["ComponentName", this.constructor.name],
                ["ComponentId", this.ComponentId],
              ),
            !1)
          : ComponentAction.I_r(n, t)
            ? (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "UiCore",
                  17,
                  "[TryCacheAction] remove tail action which is pair with this action",
                  ["actionType", EActionCommandType[t]],
                  ["tailActionType", EActionCommandType[n]],
                  ["ComponentState", EComponentState[this.C_r]],
                  ["ComponentName", this.constructor.name],
                  ["ComponentId", this.ComponentId],
                ),
              this.g_r.RemoveNode(e),
              !1)
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "UiCore",
                  17,
                  "[TryCacheAction] done",
                  ["actionType", EActionCommandType[t]],
                  [
                    "tailActionType",
                    EActionCommandType[this.g_r.TailNode.Element.ActionCommand],
                  ],
                  ["ComponentState", EComponentState[this.C_r]],
                  ["ComponentName", this.constructor.name],
                  ["ComponentId", this.ComponentId],
                ),
              this.g_r.AddTail({ ActionCommand: t, Processed: !1 }),
              !0);
  }
  async M_r() {
    let t = this.g_r.GetHeadNextNode();
    for (; void 0 !== t && !t.Element.Processed; ) {
      var e = t.Element.ActionCommand;
      switch (
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "UiCore",
            17,
            "[ExecuteCachedActions]",
            ["actionType", EActionCommandType[e]],
            ["ComponentState", EComponentState[this.C_r]],
            ["ComponentName", this.constructor.name],
            ["ComponentId", this.ComponentId],
          ),
        e)
      ) {
        case EActionCommandType.Start:
          await this.v_r();
          break;
        case EActionCommandType.Show:
          await this.E_r();
          break;
        case EActionCommandType.Hide:
          await this.S_r();
          break;
        case EActionCommandType.Destroy:
          await this.y_r();
      }
      (t.Element.Processed = !0),
        void 0 === (t = t.Next) && (t = this.g_r.GetHeadNextNode());
    }
    this.g_r.RemoveAllNodeWithoutHead();
  }
  OnStartImplementCompatible() {}
  OnShowImplementCompatible() {}
  OnHideImplementCompatible() {}
  OnDestroyImplementCompatible() {}
  StartCompatible() {
    (this.C_r = EComponentState.Starting),
      this.OnStartImplementCompatible(),
      (this.C_r = EComponentState.Start);
  }
  ShowCompatible() {
    (this.C_r = EComponentState.Showing),
      this.OnShowImplementCompatible(),
      (this.C_r = EComponentState.Show);
  }
  HideCompatible() {
    (this.C_r = EComponentState.Hiding),
      this.OnHideImplementCompatible(),
      (this.C_r = EComponentState.Hide);
  }
  DestroyCompatible() {
    this.IsShowOrShowing && this.HideCompatible(),
      (this.C_r = EComponentState.Destroying),
      this.OnDestroyImplementCompatible(),
      (this.C_r = EComponentState.Destroy),
      this.DeadPromise.SetResult();
  }
}
((exports.ComponentAction = ComponentAction).OpenLog = !0),
  (ComponentAction.f_r = 0);
//# sourceMappingURL=ComponentAction.js.map
