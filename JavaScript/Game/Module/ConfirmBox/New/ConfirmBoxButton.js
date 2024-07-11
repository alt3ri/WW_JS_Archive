"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConfirmBoxButton = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  ConfirmBoxDefine_1 = require("../ConfirmBoxDefine");
class ConfirmBoxButton extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Timer = void 0),
      (this.DelayTime = 0),
      (this.ClickFunction = void 0),
      (this.j7e = () => {
        this.CloseView();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [0, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[0, this.j7e]]);
  }
  CloseView() {
    this.ClickFunction && this.ClickFunction();
  }
  SetText(i) {
    this.GetText(1).SetText(
      ConfigManager_1.ConfigManager.ConfirmBoxConfig.GetButtonText(i),
    );
  }
  SetBtnCanClick(i) {
    var e = this.RootActor.GetComponentByClass(
      UE.UIInteractionGroup.StaticClass(),
    );
    e && e.SetInteractable(i);
  }
  SetTimer(i, e, t) {
    t || this.SetBtnCanClick(t),
      (this.DelayTime = e),
      this.mbt(i),
      (this.Timer = TimerSystem_1.TimerSystem.Forever(() => {
        --this.DelayTime,
          this.mbt(i),
          this.DelayTime <= 0 &&
            (t ? this.CloseView() : this.SetBtnCanClick(!0));
      }, ConfirmBoxDefine_1.BUTTON_DELAYTIME));
  }
  mbt(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      i,
      0 < this.DelayTime ? this.DelayTime : "",
    );
  }
  SetClickFunction(i) {
    this.ClickFunction = i;
  }
  OnBeforeDestroy() {
    this.Timer &&
      (TimerSystem_1.TimerSystem.Remove(this.Timer), (this.Timer = void 0));
  }
}
exports.ConfirmBoxButton = ConfirmBoxButton;
//# sourceMappingURL=ConfirmBoxButton.js.map
