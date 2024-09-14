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
      (this.Kya = void 0),
      (this.Smr = void 0),
      (this.P$a = void 0),
      (this.$ya = void 0),
      (this.Xya = 0),
      (this.OnInputAction = (i, t) => {
        this.Yya() && (0 === t ? this.Press() : 1 === t && this.Release());
      }),
      (this.Jya = () => {
        this.zya(), this.xmr();
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
      (this.Kya = i.CloseViewCallback),
      (this.Smr = i.IsAllowOpenViewByShortcutKey),
      (this.P$a = i.IsAllowCloseViewByShortcutKey);
  }
  Destroy() {
    this.UnBind(),
      this.zya(),
      (this.uti = void 0),
      (this.Kya = void 0),
      (this.Smr = void 0),
      (this.P$a = void 0);
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
  Yya() {
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
    this.Kya = i;
  }
  Press() {
    !this.ViewName ||
      StringUtils_1.StringUtils.IsBlank(this.ViewName) ||
      ((this.Xya = Time_1.Time.WorldTime),
      this.IsPressTrigger && this.Zya(),
      this.IsPressClose && this.wmr());
  }
  Release() {
    var i;
    this.zya(),
      this.IsReleaseTrigger &&
        ((i = Time_1.Time.WorldTime),
        this.ReleaseInvalidTime <= 0 ||
          i - this.Xya <= this.ReleaseInvalidTime) &&
        this.xmr(),
      this.IsReleaseClose && this.wmr();
  }
  Zya() {
    return this.PressTriggerTime <= 0
      ? this.xmr()
      : (this.zya(),
        (this.$ya = TimerSystem_1.TimerSystem.Delay(
          this.Jya,
          this.PressTriggerTime,
        )),
        !1);
  }
  zya() {
    this.$ya &&
      TimerSystem_1.TimerSystem.Has(this.$ya) &&
      TimerSystem_1.TimerSystem.Remove(this.$ya),
      (this.$ya = void 0);
  }
  xmr() {
    return !(
      UiManager_1.UiManager.IsViewOpen(this.ViewName) ||
      ModelManager_1.ModelManager.LoadingModel.IsLoading ||
      this.CheckHasInputLimit() ||
      (void 0 !== this.Smr && !this.Smr()) ||
      (this.SpecialConditionCheck()
        ? this.YHt()
        : Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "InputManager",
            28,
            "特殊情况，不处理分发，在别的模块处理",
          ),
      0)
    );
  }
  wmr() {
    return !(
      !UiManager_1.UiManager.IsViewOpen(this.ViewName) ||
      !UiManager_1.UiManager.IsViewShow(this.ViewName) ||
      ModelManager_1.ModelManager.LoadingModel.IsLoading ||
      (void 0 !== this.P$a && !this.P$a()) ||
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
      (this.Kya ? this.Kya() : UiManager_1.UiManager.CloseView(this.ViewName));
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
