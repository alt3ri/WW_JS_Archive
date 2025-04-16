"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFixedAngleItem = void 0);
class FbFixedAngleItem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.c7h = !1),
      (this.u7h = 0),
      (this.d7h = !1),
      (this.m7h = 0),
      (this.C7h = !1),
      (this.g7h = 0);
  }
  static Create(t) {
    if (t) return new FbFixedAngleItem(t);
  }
  get InitAngle() {
    return (
      this.c7h ||
        ((this.c7h = !0), (this.u7h = this.FbDataInternal.initAngle())),
      this.u7h
    );
  }
  get TargetAngle() {
    return (
      this.d7h ||
        ((this.d7h = !0), (this.m7h = this.FbDataInternal.targetAngle())),
      this.m7h
    );
  }
  get RotateAngle() {
    return (
      this.C7h ||
        ((this.C7h = !0), (this.g7h = this.FbDataInternal.rotateAngle())),
      this.g7h
    );
  }
}
exports.FbFixedAngleItem = FbFixedAngleItem;
//# sourceMappingURL=FbFixedAngleItem.js.map
