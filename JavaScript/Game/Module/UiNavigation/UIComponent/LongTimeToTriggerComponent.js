"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LongTimeToTriggerComponent = void 0);
const TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  HotKeyViewDefine_1 = require("../HotKeyViewDefine"),
  UiNavigationNewController_1 = require("../New/UiNavigationNewController"),
  HotKeyComponent_1 = require("./HotKeyComponent");
class LongTimeToTriggerComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.vqo = 0),
      (this.Mqo = void 0),
      (this.Eqo = !1),
      (this.Sqo = () => {
        this.vqo += TimerSystem_1.MIN_TIME;
        var e,
          i = this.GetHotKeyConfig();
        let t = 0;
        this.vqo > i.ReleaseFailureTime &&
          (this.yqo(),
          (e = i.LongPressTime),
          (t = (this.vqo - i.ReleaseFailureTime) / e)),
          1 <= t
            ? this.ReleaseWithoutCheck()
            : this.CurComponent.SetLongPressState(t);
      });
  }
  OnPress(e) {
    this.Iqo(), this.Tqo();
  }
  OnRelease(e) {
    this.vqo >= e.LongPressTime + e.ReleaseFailureTime &&
      this.c8i(e.BindButtonTag),
      this.CurComponent.SetLongPressState(0),
      this.Iqo(),
      (this.Eqo = !1);
  }
  c8i(e) {
    e === HotKeyViewDefine_1.EXIT_TAG
      ? UiNavigationNewController_1.UiNavigationNewController.HotKeyCloseView()
      : UiNavigationNewController_1.UiNavigationNewController.ClickButton(e);
  }
  OnUnRegisterMe() {
    this.Iqo();
  }
  Iqo() {
    this.Mqo &&
      (TimerSystem_1.TimerSystem.Remove(this.Mqo), (this.Mqo = void 0)),
      (this.vqo = 0);
  }
  Tqo() {
    this.Mqo = TimerSystem_1.TimerSystem.Forever(
      this.Sqo,
      TimerSystem_1.MIN_TIME,
    );
  }
  yqo() {
    if (!this.Eqo) {
      this.Eqo = !0;
      var e = ModelManager_1.ModelManager.UiNavigationModel;
      if (e)
        for (const i of e.GetActionHotKeyComponentSet(this.GetActionName()))
          i.ResetPressState();
    }
  }
}
exports.LongTimeToTriggerComponent = LongTimeToTriggerComponent;
//# sourceMappingURL=LongTimeToTriggerComponent.js.map
