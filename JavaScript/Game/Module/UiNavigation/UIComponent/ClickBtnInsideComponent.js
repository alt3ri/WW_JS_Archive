"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ClickBtnInsideComponent = void 0);
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiNavigationJoystickInput_1 = require("../Module/UiNavigationJoystickInput");
const UiNavigationNewController_1 = require("../New/UiNavigationNewController");
const HotKeyComponent_1 = require("./HotKeyComponent");
class ClickBtnInsideComponent extends HotKeyComponent_1.HotKeyComponent {
  constructor() {
    super(...arguments),
      (this.Q4s = (t) => {
        (this.IsAxisAllDirection() ||
          (t === 2 && this.IsAxisReverse()) ||
          (t === 3 && this.IsAxisPositive())) &&
          UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(
            this.GetBindButtonTag(),
          );
      });
  }
  OnPress(t) {
    UiNavigationNewController_1.UiNavigationNewController.ClickButtonInside(
      t.BindButtonTag,
    );
  }
  OnStartInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.RegisterLeftJoystickFunction(
      this.Q4s,
    );
  }
  OnFinishInputAxis(t) {
    UiNavigationJoystickInput_1.UiNavigationJoystickInput.UnRegisterLeftJoystickFunction(
      this.Q4s,
    );
  }
  OnRefreshHotKeyText(i) {
    const e = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      i = i.GetFocusListener();
      if (i) {
        let t =
          UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
            i,
            e,
          );
        i = (t = t || i.GetChildListenerByTag(e))?.GetTextChangeComponent();
        i
          ? this.SetHotKeyDescTextForce(i.Text.GetText())
          : this.ResetHotKeyDescTextForce();
      }
    }
  }
  OnRefreshSelfHotKeyState(i) {
    const e = this.GetBindButtonTag();
    if (!StringUtils_1.StringUtils.IsEmpty(e)) {
      i = i.GetFocusListener();
      if (i) {
        let t =
          UiNavigationNewController_1.UiNavigationNewController.GetFocusListenerInsideListenerByTag(
            i,
            e,
          );
        (t = t || i.GetChildListenerByTag(e)),
          this.SetVisibleMode(2, t?.IsListenerActive() ?? !1);
      } else this.SetVisibleMode(2, !1);
    }
  }
}
exports.ClickBtnInsideComponent = ClickBtnInsideComponent;
// # sourceMappingURL=ClickBtnInsideComponent.js.map
