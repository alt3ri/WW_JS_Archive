"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ViewHotKeyHandle = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  LevelEventLockInputState_1 = require("../../LevelGamePlay/LevelEventLockInputState"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputDistributeController_1 = require("../InputDistribute/InputDistributeController"),
  UiManager_1 = require("../UiManager");
class ViewHotKeyHandle {
  constructor(i) {
    (this.ActionName = void 0),
      (this.InputControllerType = 0),
      (this.ViewName = void 0),
      (this.ViewParam = []),
      (this.IsPressTrigger = !0),
      (this.PressStartTime = 0),
      (this.PressTriggerTime = 0),
      (this.IsReleaseTrigger = !1),
      (this.ReleaseInvalidTime = 0),
      (this.IsPressClose = !1),
      (this.IsReleaseClose = !1),
      (this.uti = void 0),
      (this.Xya = void 0),
      (this.Smr = void 0),
      (this.gJa = void 0),
      (this.Yya = void 0),
      (this.Jya = 0),
      (this.OnInputAction = (i, t) => {
        this.zya() && (0 === t ? this.Press() : 1 === t && this.Release());
      }),
      (this.Zya = () => {
        this.eIa(), this.xmr();
      }),
      (this.ActionName = i.ActionName),
      (this.InputControllerType = i.InputControllerType),
      (this.ViewName = i.ViewName),
      (this.ViewParam = i.ViewParam),
      (this.IsPressTrigger = i.IsPressTrigger),
      (this.PressStartTime = i.PressStartTime),
      (this.PressTriggerTime = i.PressTriggerTime),
      (this.IsReleaseTrigger = i.IsReleaseTrigger),
      (this.ReleaseInvalidTime = i.ReleaseInvalidTime),
      (this.IsPressClose = i.IsPressClose),
      (this.IsReleaseClose = i.IsReleaseClose),
      (this.uti = i.OpenViewCallback),
      (this.Xya = i.CloseViewCallback),
      (this.Smr = i.IsAllowOpenViewByShortcutKey),
      (this.gJa = i.IsAllowCloseViewByShortcutKey);
  }
  Destroy() {
    this.UnBind(),
      this.eIa(),
      (this.uti = void 0),
      (this.Xya = void 0),
      (this.Smr = void 0),
      (this.gJa = void 0);
  }
  Bind() {
    InputDistributeController_1.InputDistributeController.BindAction(
      this.ActionName,
      this.OnInputAction,
    );
  }
  UnBind() {
    InputDistributeController_1.InputDistributeController.UnBindAction(
      this.ActionName,
      this.OnInputAction,
    );
  }
  zya() {
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
  BindOpenViewCallback(i) {
    this.uti = i;
  }
  BindCloseViewCallback(i) {
    this.Xya = i;
  }
  Press() {
    !this.ViewName ||
      StringUtils_1.StringUtils.IsBlank(this.ViewName) ||
      ((this.Jya = Time_1.Time.WorldTime),
      this.IsPressTrigger && this.tIa(),
      this.IsPressClose && this.wmr());
  }
  Release() {
    var i;
    this.eIa(),
      this.IsReleaseTrigger &&
        ((i = Time_1.Time.WorldTime),
        this.ReleaseInvalidTime <= 0 ||
          i - this.Jya <= this.ReleaseInvalidTime) &&
        this.xmr(),
      this.IsReleaseClose && this.wmr();
  }
  tIa() {
    return this.PressTriggerTime <= 0
      ? this.xmr()
      : (this.eIa(),
        (this.Yya = TimerSystem_1.TimerSystem.Delay(
          this.Zya,
          this.PressTriggerTime,
        )),
        !1);
  }
  eIa() {
    this.Yya &&
      TimerSystem_1.TimerSystem.Has(this.Yya) &&
      TimerSystem_1.TimerSystem.Remove(this.Yya),
      (this.Yya = void 0);
  }
  xmr() {
    if (UiManager_1.UiManager.IsViewOpen(this.ViewName)) return !1;
    if (ModelManager_1.ModelManager.LoadingModel.IsLoading) return !1;
    if (this.CheckHasInputLimit()) return !1;
    if (void 0 !== this.Smr && !this.Smr()) return !1;
    if (this.SpecialConditionCheck()) {
      if (!this.sUl()) return !1;
      this.YHt();
    } else
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "InputManager",
          27,
          "特殊情况，不处理分发，在别的模块处理",
        );
    return !0;
  }
  wmr() {
    return !(
      !UiManager_1.UiManager.IsViewOpen(this.ViewName) ||
      !UiManager_1.UiManager.IsViewShow(this.ViewName) ||
      ModelManager_1.ModelManager.LoadingModel.IsLoading ||
      (void 0 !== this.gJa && !this.gJa()) ||
      (this.$Oe(), 0)
    );
  }
  YHt() {
    !this.ViewName ||
      StringUtils_1.StringUtils.IsBlank(this.ViewName) ||
      (this.uti
        ? this.uti()
        : UiManager_1.UiManager.OpenView(
            this.ViewName,
            0 < this.ViewParam.length ? this.ViewParam : void 0,
          ));
  }
  $Oe() {
    !this.ViewName ||
      StringUtils_1.StringUtils.IsBlank(this.ViewName) ||
      (this.Xya ? this.Xya() : UiManager_1.UiManager.CloseView(this.ViewName));
  }
  sUl() {
    var i =
      ModelManager_1.ModelManager.InputDistributeModel?.GetNotAllowFightInputViewNameSet();
    return !i || 0 === i.size || !!i.has(this.ViewName);
  }
  CheckHasInputLimit() {
    return LevelEventLockInputState_1.LevelEventLockInputState.InputLimitView.includes(
      this.ViewName,
    );
  }
  SpecialConditionCheck() {
    return !0;
  }
}
exports.ViewHotKeyHandle = ViewHotKeyHandle;
//# sourceMappingURL=ViewHotKeyHandle.js.map
