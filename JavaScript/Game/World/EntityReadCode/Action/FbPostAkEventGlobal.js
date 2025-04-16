"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPostAkEventGlobal = void 0);
class FbPostAkEventGlobal {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.zfh = !1),
      (this.Jfh = void 0);
  }
  static Create(t) {
    if (t) return new FbPostAkEventGlobal(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AkEvent() {
    return (
      this.zfh || ((this.zfh = !0), (this.Jfh = this.FbDataInternal.akEvent())),
      this.Jfh
    );
  }
}
exports.FbPostAkEventGlobal = FbPostAkEventGlobal;
//# sourceMappingURL=FbPostAkEventGlobal.js.map
