"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTeleControlBaseCfg = void 0);
class FbTeleControlBaseCfg {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.o2h = !1),
      (this.n2h = void 0),
      (this.s2h = !1),
      (this.a2h = !1),
      (this.h2h = !1),
      (this.l2h = !1);
  }
  static Create(t) {
    if (t) return new FbTeleControlBaseCfg(t);
  }
  get CommonConfig() {
    return (
      this.o2h ||
        ((this.o2h = !0), (this.n2h = this.FbDataInternal.commonConfig())),
      this.n2h
    );
  }
  get CanRotate() {
    return (
      this.s2h ||
        ((this.s2h = !0), (this.a2h = this.FbDataInternal.canRotate())),
      this.a2h
    );
  }
  get InitialGravity() {
    return (
      this.h2h ||
        ((this.h2h = !0), (this.l2h = this.FbDataInternal.initialGravity())),
      this.l2h
    );
  }
}
exports.FbTeleControlBaseCfg = FbTeleControlBaseCfg;
//# sourceMappingURL=FbTeleControlBaseCfg.js.map
