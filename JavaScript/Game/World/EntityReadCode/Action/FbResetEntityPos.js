"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbResetEntityPos = void 0);
class FbResetEntityPos {
  constructor(t) {
    (this.FbDataInternal = t), (this.a_h = !1), (this.I9o = 0);
  }
  static Create(t) {
    if (t) return new FbResetEntityPos(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
}
exports.FbResetEntityPos = FbResetEntityPos;
//# sourceMappingURL=FbResetEntityPos.js.map
