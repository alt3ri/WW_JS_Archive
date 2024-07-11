"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TouchFingerData = void 0);
const UE = require("ue"),
  LguiEventSystemManager_1 = require("../LguiEventSystem/LguiEventSystemManager");
class TouchFingerData {
  constructor(t) {
    (this.Fdr = void 0),
      (this.Vdr = void 0),
      (this.Hdr = !1),
      (this.AOn = BigInt(0)),
      (this.jdr = t);
  }
  StartTouch(t) {
    (this.Fdr = t), (this.Vdr = t), (this.Hdr = !0);
  }
  EndTouch() {
    (this.Fdr = void 0), (this.Vdr = void 0), (this.Hdr = !1);
  }
  MoveTouch(t) {
    this.AOn !== UE.KismetSystemLibrary.GetFrameCount() &&
      ((this.Vdr = this.Fdr),
      (this.AOn = UE.KismetSystemLibrary.GetFrameCount())),
      (this.Fdr = t);
  }
  GetFingerIndex() {
    return this.jdr;
  }
  GetTouchPosition() {
    return this.Fdr;
  }
  GetLastTouchPosition() {
    return this.Vdr;
  }
  IsInTouch() {
    return this.Hdr;
  }
  IsTouchEmpty() {
    return !LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
      this.jdr,
    );
  }
  GetPointerEventData() {
    return LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
      this.jdr,
    );
  }
  IsTouchComponentContainTag(t) {
    var e = this.GetPointerEventData(),
      i = e.pressComponent,
      e = e.enterComponent;
    return i?.IsValid()
      ? i.ComponentHasTag(t)
      : !!e?.IsValid() && e.ComponentHasTag(t);
  }
}
exports.TouchFingerData = TouchFingerData;
//# sourceMappingURL=TouchFingerData.js.map
