"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBoxAkEvent = void 0);
class FbBoxAkEvent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.G8h = !1),
      (this.O8h = void 0),
      (this.NIh = !1),
      (this.cui = 0);
  }
  static Create(t) {
    if (t) return new FbBoxAkEvent(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AudioType() {
    return (
      this.G8h ||
        ((this.G8h = !0), (this.O8h = this.FbDataInternal.audioType())),
      this.O8h
    );
  }
  get Priority() {
    return (
      this.NIh ||
        ((this.NIh = !0), (this.cui = this.FbDataInternal.priority())),
      this.cui
    );
  }
}
exports.FbBoxAkEvent = FbBoxAkEvent;
//# sourceMappingURL=FbBoxAkEvent.js.map
