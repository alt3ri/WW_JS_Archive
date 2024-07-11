"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InputManager = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Global_1 = require("../../../Game/Global");
const ModelManager_1 = require("../../../Game/Manager/ModelManager");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const UiConfig_1 = require("../Define/UiConfig");
const UiLayerType_1 = require("../Define/UiLayerType");
const InputDistributeController_1 = require("../InputDistribute/InputDistributeController");
const InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine");
const LguiEventSystemManager_1 = require("../LguiEventSystem/LguiEventSystemManager");
const UiManager_1 = require("../UiManager");
const Input_1 = require("./Input");
const InputDefine_1 = require("./InputDefine");
const InputViewRecord_1 = require("./InputViewRecord");
class InputManager {
  static Init() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.UiManagerInit,
      this.il,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UiManagerDestroy,
        this.ht,
      );
  }
  static RegisterOpenViewFunc(e, n) {
    this.acr.set(e, n);
  }
  static RegisterCloseViewFunc(e, n) {
    this.hcr.set(e, n);
  }
  static lcr() {
    InputDistributeController_1.InputDistributeController.BindAction(
      InputMappingsDefine_1.actionMappings.Gm指令,
      this._cr,
    ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.显示鼠标,
        this.ucr,
      ),
      InputDistributeController_1.InputDistributeController.BindActions(
        [
          InputMappingsDefine_1.actionMappings.任务,
          InputMappingsDefine_1.actionMappings.功能菜单,
          InputMappingsDefine_1.actionMappings.商店,
          InputMappingsDefine_1.actionMappings.地图,
          InputMappingsDefine_1.actionMappings.幻象列表界面,
          InputMappingsDefine_1.actionMappings.编队,
          InputMappingsDefine_1.actionMappings.背包,
          InputMappingsDefine_1.actionMappings.角色选择界面,
          InputMappingsDefine_1.actionMappings.邮件,
          InputMappingsDefine_1.actionMappings.聊天,
          InputMappingsDefine_1.actionMappings.教程,
          InputMappingsDefine_1.actionMappings.联机,
          InputMappingsDefine_1.actionMappings.小活动,
          InputMappingsDefine_1.actionMappings.调谐,
          InputMappingsDefine_1.actionMappings.变星,
          InputMappingsDefine_1.actionMappings.拾音辑录,
        ],
        this.ccr,
      ),
      InputDistributeController_1.InputDistributeController.BindAction(
        InputMappingsDefine_1.actionMappings.幻象探索选择界面,
        this.mcr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OpenView,
        this.UKe,
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
        this.gMt,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshCursor,
        this.dcr,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.RefreshStateOnPlatformChanged,
      );
  }
  static Bfe() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      InputMappingsDefine_1.actionMappings.Gm指令,
      this._cr,
    ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.显示鼠标,
        this.ucr,
      ),
      InputDistributeController_1.InputDistributeController.UnBindActions(
        [
          InputMappingsDefine_1.actionMappings.任务,
          InputMappingsDefine_1.actionMappings.功能菜单,
          InputMappingsDefine_1.actionMappings.商店,
          InputMappingsDefine_1.actionMappings.地图,
          InputMappingsDefine_1.actionMappings.幻象列表界面,
          InputMappingsDefine_1.actionMappings.编队,
          InputMappingsDefine_1.actionMappings.背包,
          InputMappingsDefine_1.actionMappings.角色选择界面,
          InputMappingsDefine_1.actionMappings.邮件,
          InputMappingsDefine_1.actionMappings.教程,
          InputMappingsDefine_1.actionMappings.联机,
          InputMappingsDefine_1.actionMappings.小活动,
          InputMappingsDefine_1.actionMappings.调谐,
          InputMappingsDefine_1.actionMappings.变星,
          InputMappingsDefine_1.actionMappings.拾音辑录,
        ],
        this.ccr,
      ),
      InputDistributeController_1.InputDistributeController.UnBindAction(
        InputMappingsDefine_1.actionMappings.幻象探索选择界面,
        this.mcr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OpenView,
        this.UKe,
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
        this.gMt,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshCursor,
        this.dcr,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPlatformChanged,
        this.RefreshStateOnPlatformChanged,
      );
  }
  static Ccr(e, n) {
    return !(
      e === InputMappingsDefine_1.actionMappings.功能菜单 &&
      (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
        !ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
          2,
        )) &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.InputDistribute,
        e,
      ),
      1)
    );
  }
  static gcr(e) {
    InputManager.fcr(e), InputManager.pcr(e), InputManager.vcr(e);
  }
  static Mcr(e) {
    InputManager.Scr(e), InputManager.Ecr(e), InputManager.ycr(e);
  }
  static vcr(e) {
    let n = UiConfig_1.UiConfig.TryGetViewInfo(e);
    n &&
      !n.CanOpenViewByShortcutKey &&
      ((n = this.Icr.Add(e)), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "InputManager",
        8,
        "添加不允许打开界面快捷键的界面",
        ["viewName", e],
        ["length", this.Icr.Size()],
        ["count", n],
      );
  }
  static Ecr(e) {
    let n;
    this.Icr.Has(e) &&
      ((n = this.Icr.Remove(e)), Log_1.Log.CheckInfo()) &&
      Log_1.Log.Info(
        "InputManager",
        8,
        "删除不允许打开界面快捷键的界面",
        ["viewName", e],
        ["length", this.Icr.Size()],
        ["count", n ?? 0],
      );
  }
  static Tcr() {
    return !this.Icr.HasAny();
  }
  static SetMouseCursorVisibleType(e) {
    switch ((this.Lcr = e)) {
      case InputDefine_1.EMouseCursorVisibleType.AlwaysVisible:
        this.SetShowCursor(!0);
        break;
      case InputDefine_1.EMouseCursorVisibleType.AlwaysHide:
        this.SetShowCursor(!1);
        break;
      default:
        this.Dcr();
    }
  }
  static fcr(e) {
    let n;
    e === "BattleView"
      ? InputManager.Rcr()
      : InputManager.Ucr() &&
        ((n = InputManager.IsShowMouseCursor()), InputManager.Acr(e)) &&
        !n &&
        (InputManager.MoveCursorToCenter(),
        InputManager.SetEventDataPrevPositionToCenter());
  }
  static pcr(e) {
    const n = UiConfig_1.UiConfig.TryGetViewInfo(e);
    n &&
      n.IsShortKeysExitView &&
      n.Type !== UiLayerType_1.ELayerType.Normal &&
      this.Pcr.Add(e);
  }
  static ycr(e) {
    this.Pcr.Remove(e);
  }
  static Acr(e) {
    let n;
    const t = UiConfig_1.UiConfig.TryGetViewInfo(e);
    return !(
      !t ||
      (t.ShowCursorType === 2
        ? (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputManager",
              8,
              "打开界面时显示鼠标 失败，原因是因为此界面的显示鼠标类型为：不影响鼠标显隐",
              ["viewName", e],
            ),
          1)
        : t.ShowCursorType === 0
          ? (Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "InputManager",
                8,
                "打开界面时显示鼠标 失败，原因是因为此界面的显示鼠标类型为：隐藏鼠标",
                ["viewName", e],
              ),
            this.Dcr(),
            1)
          : ((n = this.xcr.Add(e)),
            InputManager.Lcr !== InputDefine_1.EMouseCursorVisibleType.None ||
              (Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "InputManager",
                  8,
                  "打开界面时尝试显示鼠标成功",
                  ["ViewName", e],
                  ["ShowCursorType", t.ShowCursorType],
                  ["count", n],
                ),
              this.Dcr(),
              0)))
    );
  }
  static Scr(e) {
    const n = UiConfig_1.UiConfig.TryGetViewInfo(e);
    n &&
      (n.ShowCursorType === 2
        ? Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputManager",
            8,
            "关闭界面时尝试隐藏失败，原因是因为UI表中，此界面的显示鼠标类型为：不影响鼠标显隐藏",
            ["viewName", e],
          )
        : InputManager.Lcr !== InputDefine_1.EMouseCursorVisibleType.None
          ? Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputManager",
              8,
              "关闭界面时尝试隐藏失败，原因是因为运行了总是显示鼠标的GM指令",
            )
          : this.xcr.Has(e)
            ? (this.xcr.Remove(e),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "InputManager",
                  8,
                  "关闭界面时尝试隐藏鼠标成功",
                  ["viewName", e],
                  ["ShowCursorType", n.ShowCursorType],
                ),
              this.Dcr())
            : Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "InputManager",
                8,
                "关闭界面时尝试隐藏失败，原因是因为此界面没有再显示鼠标界面列表中",
                ["viewName", e],
                ["ShowMouseViewList", this.xcr],
              ));
  }
  static Dcr() {
    const e = this.xcr.HasAny();
    this.SetAlwaysShowCursor(e);
  }
  static Rcr() {
    InputManager.xcr.Clear(), InputManager.SetAlwaysShowCursor(!1);
  }
  static SetAlwaysShowCursor(e) {
    let n;
    (this.wcr = e) !== this.Bcr &&
      (n = ModelManager_1.ModelManager.LoadingModel) &&
      !n.IsLoading &&
      this.SetShowCursor(e);
  }
  static bcr(e) {
    return (
      !ModelManager_1.ModelManager.LoadingModel.IsLoading &&
      !LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.includes(
        e,
      ) &&
      (this.Y7t(e), !0)
    );
  }
  static Y7t(e) {
    const n = this.acr.get(e);
    n ? n() : UiManager_1.UiManager.OpenView(e);
  }
  static qcr(e) {
    return !(
      ModelManager_1.ModelManager.LoadingModel.IsLoading ||
      this.Pcr.HasAny() ||
      !UiManager_1.UiManager.IsViewShow(e) ||
      (this.$Oe(e), 0)
    );
  }
  static $Oe(e) {
    const n = this.hcr.get(e);
    n ? n() : UiManager_1.UiManager.CloseView(e);
  }
  static SetShowCursor(e, n = !0) {
    let t, a;
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("InputManager", 8, "设置鼠标可见性", ["value", e]),
      this.Ucr() &&
        ((this.Bcr = e),
        (t =
          this.Bcr && !ModelManager_1.ModelManager.PlatformModel.IsGamepad()),
        (a = Global_1.Global.CharacterController),
        t
          ? ((a.bShowMouseCursor = !0), this._4s())
          : ((a.bShowMouseCursor = !1), this.u4s()),
        n) &&
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnShowMouseCursor,
          e,
        );
  }
  static _4s() {
    const e = Global_1.Global.CharacterController;
    this.a4s ||
      UE.KuroInputFunctionLibrary.HasInputModeReply(this.a4s) ||
      (this.a4s = UE.KuroInputFunctionLibrary.SetGameAndUIInputMode(
        e,
        "InputManager设置输入模式",
      ));
  }
  static u4s() {
    let e;
    this.a4s &&
      ((e = Global_1.Global.CharacterController),
      UE.KuroInputFunctionLibrary.ReplyInputMode(e, this.a4s),
      (this.a4s = void 0));
  }
  static Gcr() {
    let e, n, t;
    if (this.Ucr())
      return (
        (e = Global_1.Global.CharacterController),
        (n = (0, puerts_1.$ref)(0)),
        (t = (0, puerts_1.$ref)(0)),
        e.GetViewportSize(n, t),
        { X: (0, puerts_1.$unref)(n) / 2, Y: (0, puerts_1.$unref)(t) / 2 }
      );
  }
  static MoveCursorToCenter() {
    const e = this.Gcr();
    e && Global_1.Global.CharacterController.SetMouseLocation(e.X, e.Y);
  }
  static SetEventDataPrevPositionToCenter() {
    const e = this.Gcr();
    e &&
      LguiEventSystemManager_1.LguiEventSystemManager.SetEventDataPrevPosition(
        e.X,
        e.Y,
      );
  }
  static IsShowMouseCursor() {
    return !!this.Ucr() && Global_1.Global.CharacterController.bShowMouseCursor;
  }
  static Ucr() {
    const e = Global_1.Global.CharacterController;
    return !(!e || !e.IsValid());
  }
  static SetInputRespondToKey(e) {
    e !== "" && (Input_1.Input.OnlyRespondToKey = e);
  }
  static ResetInputRespondToKey(e) {
    e === Input_1.Input.OnlyRespondToKey &&
      (Input_1.Input.OnlyRespondToKey = "");
  }
}
(exports.InputManager = InputManager),
  ((_a = InputManager).Lcr = InputDefine_1.EMouseCursorVisibleType.None),
  (InputManager.wcr = !1),
  (InputManager.Bcr = !1),
  (InputManager.gU = !1),
  (InputManager.xcr = new InputViewRecord_1.InputViewRecord()),
  (InputManager.Icr = new InputViewRecord_1.InputViewRecord()),
  (InputManager.Pcr = new InputViewRecord_1.InputViewRecord()),
  (InputManager.acr = new Map()),
  (InputManager.hcr = new Map()),
  (InputManager.a4s = void 0),
  (InputManager.il = () => {
    InputManager.gU ||
      (InputManager.lcr(),
      (InputManager.gU = !0),
      InputManager.xcr.Clear(),
      InputManager.Icr.Clear(),
      InputManager.Pcr.Clear()),
      UE.KuroInputFunctionLibrary.ClearInputModeReply();
  }),
  (InputManager.ht = () => {
    InputManager.gU &&
      (InputManager.Bfe(),
      InputManager.xcr.Clear(),
      InputManager.Icr.Clear(),
      InputManager.Pcr.Clear(),
      (InputManager.gU = !1));
  }),
  (InputManager._cr = (e, n) => {
    n === 1 &&
      ModelManager_1.ModelManager.SundryModel.GmBlueprintGmIsOpen &&
      ModelManager_1.ModelManager.SundryModel.CanOpenGmView &&
      (UiManager_1.UiManager.IsViewOpen("GmView")
        ? UiManager_1.UiManager.CloseView("GmView")
        : UiManager_1.UiManager.OpenView("GmView"));
  }),
  (InputManager.ucr = (e, n) => {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "InputManager",
        8,
        "按Alt尝试显示鼠标",
        ["是否通过GM总是显示鼠标", InputManager.Lcr],
        ["是否已经打开总是显示鼠标界面", InputManager.wcr],
        ["是否尝试显示鼠标", n === 0],
      ),
      InputManager.Lcr !==
        InputDefine_1.EMouseCursorVisibleType.AlwaysVisible &&
        ((n = n === 0),
        InputManager.wcr
          ? n && InputManager.SetShowCursor(!0)
          : (InputManager.MoveCursorToCenter(), InputManager.SetShowCursor(n)));
  }),
  (InputManager.ccr = (e, n) => {
    n === 0 &&
      (InputManager.Tcr()
        ? InputManager.Ccr(e, n)
          ? (n = InputDefine_1.openViewActionsMap.get(e)) && InputManager.bcr(n)
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "InputManager",
              28,
              "特殊情况，不处理分发，在别的模块处理",
            )
        : (n = InputDefine_1.closeViewActionsMap.get(e)) &&
          InputManager.qcr(n));
  }),
  (InputManager.mcr = (e, n) => {
    e = InputDefine_1.openViewActionsMap.get(e);
    e &&
      (InputManager.Tcr() && n === 0
        ? InputManager.bcr(e)
        : UiManager_1.UiManager.IsViewOpen(e) &&
          UiManager_1.UiManager.CloseView(e));
  }),
  (InputManager.UKe = (e) => {
    InputManager.gcr(e);
  }),
  (InputManager.$Ge = (e) => {
    InputManager.Mcr(e);
  }),
  (InputManager.gMt = () => {
    InputManager.Rcr(), InputManager.Icr.Clear(), InputManager.Pcr.Clear();
  }),
  (InputManager.dcr = () => {
    InputManager.Dcr();
  }),
  (InputManager.nye = () => {
    InputManager.Rcr();
  }),
  (InputManager.RefreshStateOnPlatformChanged = () => {
    _a.SetShowCursor(_a.Bcr);
  });
// # sourceMappingURL=InputManager.js.map
