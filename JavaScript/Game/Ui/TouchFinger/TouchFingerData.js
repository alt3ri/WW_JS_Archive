"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TouchFingerData = void 0);
const UE = require("ue");
const LguiEventSystemManager_1 = require("../LguiEventSystem/LguiEventSystemManager");
class TouchFingerData {
  constructor(t) {
    (this.Hmr = void 0),
      (this.jmr = void 0),
      (this.Wmr = !1),
      (this.Rbn = BigInt(0)),
      (this.Kmr = t);
  }
  StartTouch(t) {
    (this.Hmr = t), (this.jmr = t), (this.Wmr = !0);
  }
  EndTouch() {
    (this.Hmr = void 0), (this.jmr = void 0), (this.Wmr = !1);
  }
  MoveTouch(t) {
    this.Rbn !== UE.KismetSystemLibrary.GetFrameCount() &&
      ((this.jmr = this.Hmr),
      (this.Rbn = UE.KismetSystemLibrary.GetFrameCount())),
      (this.Hmr = t);
  }
  GetFingerIndex() {
    return this.Kmr;
  }
  GetTouchPosition() {
    return this.Hmr;
  }
  GetLastTouchPosition() {
    return this.jmr;
  }
  IsInTouch() {
    return this.Wmr;
  }
  IsTouchEmpty() {
    return !LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
      this.Kmr,
    );
  }
  GetPointerEventData() {
    return LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
      this.Kmr,
    );
  }
  IsTouchComponentContainTag(t) {
    var e = this.GetPointerEventData();
    const i = e.pressComponent;
    var e = e.enterComponent;
    return i?.IsValid()
      ? i.ComponentHasTag(t)
      : !!e?.IsValid() && e.ComponentHasTag(t);
  }
}
exports.TouchFingerData = TouchFingerData;
// # sourceMappingURL=TouchFingerData.js.map
