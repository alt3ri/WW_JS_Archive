"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbElementDamage = void 0);
class FbElementDamage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.I3h = !1),
      (this.T3h = 0),
      (this.F3h = !1),
      (this.N3h = 0),
      (this.V3h = !1),
      (this.j3h = 0),
      (this.H3h = !1),
      (this.W3h = 0),
      (this.Q3h = !1),
      (this.K3h = 0),
      (this.$3h = !1),
      (this.X3h = 0),
      (this.Y3h = !1),
      (this.z3h = 0),
      (this.J3h = !1),
      (this.Z3h = 0);
  }
  static Create(t) {
    if (t) return new FbElementDamage(t);
  }
  get DefaultValue() {
    return (
      this.I3h ||
        ((this.I3h = !0), (this.T3h = this.FbDataInternal.defaultValue())),
      this.T3h
    );
  }
  get Physics() {
    return (
      this.F3h || ((this.F3h = !0), (this.N3h = this.FbDataInternal.physics())),
      this.N3h
    );
  }
  get Ice() {
    return (
      this.V3h || ((this.V3h = !0), (this.j3h = this.FbDataInternal.ice())),
      this.j3h
    );
  }
  get Fire() {
    return (
      this.H3h || ((this.H3h = !0), (this.W3h = this.FbDataInternal.fire())),
      this.W3h
    );
  }
  get Thunder() {
    return (
      this.Q3h || ((this.Q3h = !0), (this.K3h = this.FbDataInternal.thunder())),
      this.K3h
    );
  }
  get Wind() {
    return (
      this.$3h || ((this.$3h = !0), (this.X3h = this.FbDataInternal.wind())),
      this.X3h
    );
  }
  get Light() {
    return (
      this.Y3h || ((this.Y3h = !0), (this.z3h = this.FbDataInternal.light())),
      this.z3h
    );
  }
  get Dark() {
    return (
      this.J3h || ((this.J3h = !0), (this.Z3h = this.FbDataInternal.dark())),
      this.Z3h
    );
  }
}
exports.FbElementDamage = FbElementDamage;
//# sourceMappingURL=FbElementDamage.js.map
