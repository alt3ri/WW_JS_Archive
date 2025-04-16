"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPostAkEventTargeted = void 0);
class FbPostAkEventTargeted {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.zfh = !1),
      (this.Jfh = void 0);
  }
  static Create(t) {
    if (t) return new FbPostAkEventTargeted(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get AkEvent() {
    return (
      this.zfh || ((this.zfh = !0), (this.Jfh = this.FbDataInternal.akEvent())),
      this.Jfh
    );
  }
}
exports.FbPostAkEventTargeted = FbPostAkEventTargeted;
//# sourceMappingURL=FbPostAkEventTargeted.js.map
