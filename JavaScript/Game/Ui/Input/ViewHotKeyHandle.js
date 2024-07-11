"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandle = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../InputDistribute/InputDistributeController"),
  InputMappingsDefine_1 = require("../InputDistribute/InputMappingsDefine"),
  UiManager_1 = require("../UiManager"),
  InputManager_1 = require("./InputManager");
class ViewHotKeyHandle {
  constructor(t) {
    (this.ActionName = void 0),
      (this.InputControllerType = 0),
      (this.ViewName = void 0),
      (this.IsPressTrigger = !0),
      (this.PressStartTime = 0),
      (this.PressTriggerTime = 0),
      (this.IsReleaseTrigger = !1),
      (this.ReleaseInvalidTime = 0),
      (this.IsPressClose = !1),
      (this.IsReleaseClose = !1),
      (this.uti = void 0),
      (this.xMa = void 0),
      (this.PMa = void 0),
      (this.wMa = 0),
      (this.bMe = (t, e) => {
        this.BMa() && (0 === e ? this.Press() : 1 === e && this.Release());
      }),
      (this.bMa = () => {
        this.qMa(), this.xmr();
      }),
      (this.ActionName = t.ActionName),
      (this.InputControllerType = t.InputControllerType),
      (this.ViewName = t.ViewName),
      (this.IsPressTrigger = t.IsPressTrigger),
      (this.PressStartTime = t.PressStartTime),
      (this.PressTriggerTime = t.PressTriggerTime),
      (this.IsReleaseTrigger = t.IsReleaseTrigger),
      (this.ReleaseInvalidTime = t.ReleaseInvalidTime),
      (this.IsPressClose = t.IsPressClose),
      (this.IsReleaseClose = t.IsReleaseClose),
      (this.uti = t.OpenViewCallback),
      (this.xMa = t.CloseViewCallback);
  }
  Destroy() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      this.ActionName,
      this.bMe,
    ),
      this.qMa(),
      (this.uti = void 0),
      (this.xMa = void 0);
  }
  BindAction() {
    InputDistributeController_1.InputDistributeController.BindAction(
      this.ActionName,
      this.bMe,
    );
  }
  BMa() {
    switch (this.InputControllerType) {
      case 0:
        return !0;
      case 1:
        return Info_1.Info.IsInKeyBoard();
      case 2:
        return Info_1.Info.IsInGamepad();
      default:
        return !1;
    }
  }
  BindOpenViewCallback(t) {
    this.uti = t;
  }
  BindCloseViewCallback(t) {
    this.xMa = t;
  }
  Press() {
    !this.ViewName ||
      StringUtils_1.StringUtils.IsBlank(this.ViewName) ||
      ((this.wMa = Time_1.Time.WorldTime),
      this.IsPressTrigger && this.GMa(),
      this.IsPressClose && this.wmr());
  }
  Release() {
    var t;
    this.qMa(),
      this.IsReleaseTrigger &&
        ((t = Time_1.Time.WorldTime),
        this.ReleaseInvalidTime <= 0 ||
          t - this.wMa <= this.ReleaseInvalidTime) &&
        this.xmr(),
      this.IsReleaseClose && this.wmr();
  }
  GMa() {
    return this.cmr()
      ? this.PressTriggerTime <= 0
        ? this.xmr()
        : (this.qMa(),
          (this.PMa = TimerSystem_1.TimerSystem.Delay(
            this.bMa,
            this.PressTriggerTime,
          )),
          !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputManager",
            28,
            "特殊情况，不处理分发，在别的模块处理",
          ),
        !0);
  }
  qMa() {
    this.PMa &&
      TimerSystem_1.TimerSystem.Has(this.PMa) &&
      TimerSystem_1.TimerSystem.Remove(this.PMa),
      (this.PMa = void 0);
  }
  xmr() {
    return (
      !UiManager_1.UiManager.IsViewOpen(this.ViewName) &&
      !(
        ModelManager_1.ModelManager.LoadingModel.IsLoading ||
        LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.includes(
          this.ViewName,
        ) ||
        !InputManager_1.InputManager.IsAllowOpenViewByShortcutKey() ||
        (this.YHt(), 0)
      )
    );
  }
  wmr() {
    return (
      !!UiManager_1.UiManager.IsViewOpen(this.ViewName) &&
      !(
        !UiManager_1.UiManager.IsViewShow(this.ViewName) ||
        ModelManager_1.ModelManager.LoadingModel.IsLoading ||
        !InputManager_1.InputManager.IsAllowCloseViewByShortcutKey() ||
        (this.$Oe(), 0)
      )
    );
  }
  YHt() {
    !this.ViewName ||
      StringUtils_1.StringUtils.IsBlank(this.ViewName) ||
      (this.uti ? this.uti() : UiManager_1.UiManager.OpenView(this.ViewName));
  }
  $Oe() {
    !this.ViewName ||
      StringUtils_1.StringUtils.IsBlank(this.ViewName) ||
      (this.xMa ? this.xMa() : UiManager_1.UiManager.CloseView(this.ViewName));
  }
  cmr() {
    return !(
      this.ActionName === InputMappingsDefine_1.actionMappings.功能菜单 &&
      (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() ||
        !ModelManager_1.ModelManager.BattleUiModel.ChildViewData.GetChildVisible(
          2,
        )) &&
      (EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.InputDistribute,
        this.ActionName,
      ),
      1)
    );
  }
}
exports.ViewHotKeyHandle = ViewHotKeyHandle;
//# sourceMappingURL=ViewHotKeyHandle.js.map
