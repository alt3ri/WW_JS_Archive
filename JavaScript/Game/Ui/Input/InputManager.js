"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputManager = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Global_1 = require("../../../Game/Global"),
  ModelManager_1 = require("../../../Game/Manager/ModelManager"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  UiConfig_1 = require("../Define/UiConfig"),
  UiLayerType_1 = require("../Define/UiLayerType"),
  InputDistributeController_1 = require("../InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine"),
  LguiEventSystemManager_1 = require("../LguiEventSystem/LguiEventSystemManager"),
  UiManager_1 = require("../UiManager"),
  ViewHotKeyHandleDefine_1 = require("./Handle/ViewHotKeyHandleDefine"),
  Input_1 = require("./Input"),
  InputViewRecord_1 = require("./InputViewRecord"),
  ViewHotKeyHandleContainer_1 = require("./ViewHotKeyHandleContainer");
class InputManager {
  static Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      this.il,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UiManagerDestroy,
        this.ht,
      ),
      InputManager.Wya();
  }
  static Wya() {
    var e =
      ConfigManager_1.ConfigManager.ViewHotKeyConfig.GetAllOpenAndCloseViewHotKeyConfig();
    if (e)
      for (const n of e) {
        var t = {
            ActionName: n.ActionName,
            InputControllerType: n.InputControllerType,
            ViewName: n.ViewName,
            ViewParam: n.ViewParam,
            IsPressTrigger: n.IsPressTrigger,
            PressStartTime: n.PressStartTime,
            PressTriggerTime: n.PressTriggerTime,
            IsReleaseTrigger: n.IsReleaseTrigger,
            ReleaseInvalidTime: n.ReleaseInvalidTime,
            IsPressClose: n.IsPressClose,
            IsReleaseClose: n.IsReleaseClose,
            IsAllowOpenViewByShortcutKey: () =>
              this.IsAllowOpenViewByShortcutKey(),
            IsAllowCloseViewByShortcutKey: () =>
              this.IsAllowCloseViewByShortcutKey(),
          },
          t =
            ViewHotKeyHandleDefine_1.ViewHotKeyHandleFactory.CreateViewHotKeyHandle(
              t,
              n.HandleType,
            );
        this.Qya.Add(t);
      }
  }
  static kIa() {
    this.Qya.ForEach((e) => {
      e.Bind();
    });
  }
  static RegisterOpenViewFunc(e, t) {
    e = this.Qya.Get(e);
    if (e) for (const n of e) n.BindOpenViewCallback(t);
  }
  static RegisterCloseViewFunc(e, t) {
    e = this.Qya.Get(e);
    if (e) for (const n of e) n.BindCloseViewCallback(t);
  }
  static GetViewHotKeyHandle(e) {
    return this.Qya.Get(e);
  }
  static GetAllViewHotKeyHandle() {
    return this.Qya.GetAll();
  }
  static smr() {
    InputDistributeController_1.InputDistributeController.BindAction(
      InputMappingsDefine_1.actionMappings.Gm指令,
      this.amr,
    ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.显示鼠标,
        this.hmr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.REt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCursor,
        this.umr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.InputControllerChange,
        this.RefreshStateOnPlatformChanged,
      );
  }
  static Bfe() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.Gm指令,
      this.amr,
    ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.显示鼠标,
        this.hmr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.FQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ResetModuleByResetToBattleView,
        this.REt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCursor,
        this.umr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.InputControllerChange,
        this.RefreshStateOnPlatformChanged,
      );
  }
  static mmr(e) {
    InputManager.dmr(e), InputManager.Cmr(e), InputManager.gmr(e);
  }
  static fmr(e) {
    InputManager.pmr(e), InputManager.vmr(e), InputManager.Mmr(e);
  }
  static gmr(e) {
    var t = UiConfig_1.UiConfig.TryGetViewInfo(e);
    t &&
      !t.CanOpenViewByShortcutKey &&
      ((t = this.DisableShortcutKeyViewRecord.Add(e)), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "InputManager",
        8,
        "添加不允许打开界面快捷键的界面",
        ["viewName", e],
        ["length", this.DisableShortcutKeyViewRecord.Size()],
        ["count", t],
      );
  }
  static vmr(e) {
    var t;
    this.DisableShortcutKeyViewRecord.Has(e) &&
      ((t = this.DisableShortcutKeyViewRecord.Remove(e)),
      Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "InputManager",
        8,
        "删除不允许打开界面快捷键的界面",
        ["viewName", e],
        ["length", this.DisableShortcutKeyViewRecord.Size()],
        ["count", t ?? 0],
      );
  }
  static IsAllowOpenViewByShortcutKey() {
    return !this.DisableShortcutKeyViewRecord.HasAny();
  }
  static IsAllowCloseViewByShortcutKey() {
    return !this.DisableCloseViewByShortcutKeyViewRecord.HasAny();
  }
  static SetMouseCursorVisibleType(e) {
    switch ((this.ymr = e)) {
      case 1:
        this.SetShowCursor(!0);
        break;
      case 2:
        this.SetShowCursor(!1);
        break;
      default:
        this.Imr();
    }
  }
  static dmr(e) {
    var t;
    "BattleView" === e
      ? InputManager.Tmr()
      : InputManager.Lmr() &&
        ((t = InputManager.IsShowMouseCursor()), InputManager.Dmr(e)) &&
        !t &&
        (InputManager.MoveCursorToCenter(),
        InputManager.SetEventDataPrevPositionToCenter());
  }
  static Cmr(e) {
    var t = UiConfig_1.UiConfig.TryGetViewInfo(e);
    t &&
      t.IsShortKeysExitView &&
      t.Type !== UiLayerType_1.ELayerType.Normal &&
      this.DisableCloseViewByShortcutKeyViewRecord.Add(e);
  }
  static Mmr(e) {
    this.DisableCloseViewByShortcutKeyViewRecord.Remove(e);
  }
  static Dmr(e) {
    var t,
      n = UiConfig_1.UiConfig.TryGetViewInfo(e);
    return !(
      !n ||
      (2 === n.ShowCursorType
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputManager",
              8,
              "打开界面时显示鼠标 失败，原因是因为此界面的显示鼠标类型为：不影响鼠标显隐",
              ["viewName", e],
            ),
          1)
        : 0 === n.ShowCursorType
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "InputManager",
                8,
                "打开界面时显示鼠标 失败，原因是因为此界面的显示鼠标类型为：隐藏鼠标",
                ["viewName", e],
              ),
            this.Imr(),
            1)
          : ((t = this.Umr.Add(e)),
            0 !== InputManager.ymr ||
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "InputManager",
                  8,
                  "打开界面时尝试显示鼠标成功",
                  ["ViewName", e],
                  ["ShowCursorType", n.ShowCursorType],
                  ["count", t],
                ),
              this.Imr(),
              0)))
    );
  }
  static pmr(e) {
    var t = UiConfig_1.UiConfig.TryGetViewInfo(e);
    t &&
      (2 === t.ShowCursorType
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputManager",
            8,
            "关闭界面时尝试隐藏失败，原因是因为UI表中，此界面的显示鼠标类型为：不影响鼠标显隐藏",
            ["viewName", e],
          )
        : 0 !== InputManager.ymr
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputManager",
              8,
              "关闭界面时尝试隐藏失败，原因是因为运行了总是显示鼠标的GM指令",
            )
          : this.Umr.Has(e)
            ? (this.Umr.Remove(e),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "InputManager",
                  8,
                  "关闭界面时尝试隐藏鼠标成功",
                  ["viewName", e],
                  ["ShowCursorType", t.ShowCursorType],
                ),
              this.Imr())
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "InputManager",
                8,
                "关闭界面时尝试隐藏失败，原因是因为此界面没有再显示鼠标界面列表中",
                ["viewName", e],
                ["ShowMouseViewList", this.Umr],
              ));
  }
  static Imr() {
    var e = this.Umr.HasAny();
    this.SetAlwaysShowCursor(e);
  }
  static Tmr() {
    InputManager.Umr.Clear(), InputManager.SetAlwaysShowCursor(!1);
  }
  static SetAlwaysShowCursor(e) {
    var t;
    (this.Amr = e) !== this.Pmr &&
      (t = ModelManager_1.ModelManager.LoadingModel) &&
      !t.IsLoading &&
      this.SetShowCursor(e);
  }
  static SetShowCursor(e, t = !0) {
    var n, a;
    this.Lmr()
      ? ((this.Pmr = e),
        (n = this.Pmr && !Info_1.Info.IsInGamepad()),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputManager",
            8,
            "实际设置鼠标可见性",
            ["realSetValue", n],
            ["value", e],
          ),
        (a = Global_1.Global.CharacterController),
        n
          ? ((a.bShowMouseCursor = !0), this.g9s())
          : ((a.bShowMouseCursor = !1), this.f9s()),
        t &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnShowMouseCursor,
            e,
          ))
      : Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputManager",
          8,
          "设置鼠标可见性失败，因为PlayerController不可用",
          ["value", e],
        );
  }
  static g9s() {
    var e = Global_1.Global.CharacterController;
    this.m9s ||
      UE.KuroInputFunctionLibrary.HasInputModeReply(this.m9s) ||
      (this.m9s = UE.KuroInputFunctionLibrary.SetGameAndUIInputMode(
        e,
        "InputManager设置输入模式",
      ));
  }
  static f9s() {
    var e;
    this.m9s &&
      ((e = Global_1.Global.CharacterController),
      UE.KuroInputFunctionLibrary.ReplyInputMode(e, this.m9s),
      (this.m9s = void 0));
  }
  static Bmr() {
    var e, t, n;
    if (this.Lmr())
      return (
        (e = Global_1.Global.CharacterController),
        (t = (0, puerts_1.$ref)(0)),
        (n = (0, puerts_1.$ref)(0)),
        e.GetViewportSize(t, n),
        { X: (0, puerts_1.$unref)(t) / 2, Y: (0, puerts_1.$unref)(n) / 2 }
      );
  }
  static MoveCursorToCenter() {
    var e;
    this.IsAutoMoveCursorToCenter &&
      (e = this.Bmr()) &&
      Global_1.Global.CharacterController.SetMouseLocation(e.X, e.Y);
  }
  static SetEventDataPrevPositionToCenter() {
    var e = this.Bmr();
    e &&
      LguiEventSystemManager_1.LguiEventSystemManager.SetEventDataPrevPosition(
        e.X,
        e.Y,
      );
  }
  static IsShowMouseCursor() {
    return !!this.Lmr() && Global_1.Global.CharacterController.bShowMouseCursor;
  }
  static Lmr() {
    var e = Global_1.Global.CharacterController;
    return !(!e || !e.IsValid());
  }
  static SetInputRespondToKey(e) {
    "" !== e && (Input_1.Input.OnlyRespondToKey = e);
  }
  static ResetInputRespondToKey(e) {
    e === Input_1.Input.OnlyRespondToKey &&
      (Input_1.Input.OnlyRespondToKey = "");
  }
}
(exports.InputManager = InputManager),
  ((_a = InputManager).ymr = 0),
  (InputManager.Amr = !1),
  (InputManager.Pmr = !1),
  (InputManager.gU = !1),
  (InputManager.Umr = new InputViewRecord_1.InputViewRecord()),
  (InputManager.DisableShortcutKeyViewRecord =
    new InputViewRecord_1.InputViewRecord()),
  (InputManager.DisableCloseViewByShortcutKeyViewRecord =
    new InputViewRecord_1.InputViewRecord()),
  (InputManager.m9s = void 0),
  (InputManager.Qya =
    new ViewHotKeyHandleContainer_1.ViewHotKeyHandleContainer()),
  (InputManager.IsAutoMoveCursorToCenter = !0),
  (InputManager.il = () => {
    InputManager.gU ||
      (InputManager.smr(),
      (InputManager.gU = !0),
      InputManager.Umr.Clear(),
      InputManager.DisableShortcutKeyViewRecord.Clear(),
      InputManager.DisableCloseViewByShortcutKeyViewRecord.Clear(),
      InputManager.kIa()),
      UE.KuroInputFunctionLibrary.ClearInputModeReply();
  }),
  (InputManager.ht = () => {
    InputManager.gU &&
      (InputManager.Bfe(),
      InputManager.Umr.Clear(),
      InputManager.DisableShortcutKeyViewRecord.Clear(),
      InputManager.DisableCloseViewByShortcutKeyViewRecord.Clear(),
      InputManager.Qya?.Clear(),
      (InputManager.gU = !1));
  }),
  (InputManager.amr = (e, t) => {
    1 === t &&
      ModelManager_1.ModelManager.SundryModel.GmBlueprintGmIsOpen &&
      ModelManager_1.ModelManager.SundryModel.CanOpenGmView &&
      (UiManager_1.UiManager.IsViewOpen("GmView")
        ? UiManager_1.UiManager.CloseView("GmView")
        : UiManager_1.UiManager.OpenView("GmView"));
  }),
  (InputManager.hmr = (e, t) => {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "InputManager",
        8,
        "按Alt尝试显示鼠标",
        ["是否通过GM总是显示鼠标", InputManager.ymr],
        ["是否已经打开总是显示鼠标界面", InputManager.Amr],
        ["是否尝试显示鼠标", 0 === t],
      ),
      1 !== InputManager.ymr &&
        ((t = 0 === t),
        InputManager.Amr
          ? t && InputManager.SetShowCursor(!0)
          : (InputManager.MoveCursorToCenter(), InputManager.SetShowCursor(t)));
  }),
  (InputManager.FQe = (e) => {
    InputManager.mmr(e);
  }),
  (InputManager.$Ge = (e) => {
    InputManager.fmr(e);
  }),
  (InputManager.REt = () => {
    InputManager.Tmr(),
      InputManager.DisableShortcutKeyViewRecord.Clear(),
      InputManager.DisableCloseViewByShortcutKeyViewRecord.Clear();
  }),
  (InputManager.umr = () => {
    InputManager.Imr();
  }),
  (InputManager.nye = () => {
    InputManager.Tmr();
  }),
  (InputManager.RefreshStateOnPlatformChanged = () => {
    _a.SetShowCursor(_a.Pmr);
  });
//# sourceMappingURL=InputManager.js.map
