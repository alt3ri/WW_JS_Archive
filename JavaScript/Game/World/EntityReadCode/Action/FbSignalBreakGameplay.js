"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSignalBreakGameplay = void 0);
class FbSignalBreakGameplay {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.GTh = !1),
      (this.OTh = void 0);
  }
  static Create(t) {
    if (t) return new FbSignalBreakGameplay(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SignalBreakId() {
    return (
      this.GTh ||
        ((this.GTh = !0), (this.OTh = this.FbDataInternal.signalBreakId())),
      this.OTh
    );
  }
}
exports.FbSignalBreakGameplay = FbSignalBreakGameplay;
//# sourceMappingURL=FbSignalBreakGameplay.js.map
