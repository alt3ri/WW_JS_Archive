"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotFixListenDeviceSwitchText = void 0);
const InputDevice_1 = require("../../InputDevice/InputDevice"),
  HotPatchInputDefine_1 = require("../../PlayerInput/HotPatchInputDefine"),
  HotFixManager_1 = require("./HotFixManager");
class HotFixListenDeviceSwitchText {
  constructor(t, e) {
    (this.UiText = t),
      (this.GamepadDataMap = e),
      (this.CurrentTextId = ""),
      (this.CurrentArgs = []),
      (this.T2e = () => {
        void 0 !== this.CurrentTextId &&
          "" !== this.CurrentTextId &&
          this.SetLocalText(this.CurrentTextId, ...this.CurrentArgs);
      });
  }
  hg1(e, i) {
    i = HotPatchInputDefine_1.gamepadActionInputMap.get(i);
    if (i) {
      i = HotPatchInputDefine_1.gamepadKeyPathMap.get(i);
      if (i) {
        let t = void 0;
        InputDevice_1.InputDevice.IsXboxGamepad() && i?.XBox
          ? (t = i.XBox)
          : InputDevice_1.InputDevice.IsPsGamepad() && (t = i.Ps),
          t &&
            (this.UiText.SetRichText(!0),
            HotFixManager_1.HotFixManager.SetLocalText(
              this.UiText,
              e,
              `<texture=${t}>`,
            ));
      }
    }
  }
  AddGamepadChange() {
    InputDevice_1.InputDevice.RegisterInputChangeDelegate(this.T2e);
  }
  RemoveGamepadChange() {
    InputDevice_1.InputDevice.UnRegisterInputChangeDelegate(this.T2e);
  }
  SetLocalText(t, ...e) {
    (this.CurrentTextId = t), (this.CurrentArgs = e);
    var i = this.GamepadDataMap.get(t);
    i && InputDevice_1.InputDevice.IsInGamepad()
      ? this.hg1(i[0], i[1])
      : HotFixManager_1.HotFixManager.SetLocalText(this.UiText, t, ...e);
  }
  SetUiActive(t) {
    this.UiText.SetUIActive(t);
  }
}
exports.HotFixListenDeviceSwitchText = HotFixListenDeviceSwitchText;
//# sourceMappingURL=HotFixListenDeviceSwitchText.js.map
