"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEffectSplineEquidistantPointMode = void 0);
class FbEffectSplineEquidistantPointMode {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._9h = !1),
      (this.c9h = 0);
  }
  static Create(t) {
    if (t) return new FbEffectSplineEquidistantPointMode(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Space() {
    return (
      this._9h || ((this._9h = !0), (this.c9h = this.FbDataInternal.space())),
      this.c9h
    );
  }
}
exports.FbEffectSplineEquidistantPointMode = FbEffectSplineEquidistantPointMode;
//# sourceMappingURL=FbEffectSplineEquidistantPointMode.js.map
