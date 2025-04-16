"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCombinedVisibleGroupComponent = void 0);
class FbCombinedVisibleGroupComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.g5h = !1),
      (this.f5h = void 0),
      (this.p5h = !1),
      (this.v5h = !1),
      (this.V1h = !1),
      (this.j1h = void 0);
  }
  static Create(t) {
    if (t) return new FbCombinedVisibleGroupComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get AreaIds() {
    if (!this.g5h) {
      (this.g5h = !0), (this.f5h = new Array());
      var i = this.FbDataInternal.areaIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.f5h.push(this.FbDataInternal.areaIds(t));
    }
    return this.f5h;
  }
  get IncludeSubArea() {
    return (
      this.p5h ||
        ((this.p5h = !0), (this.v5h = this.FbDataInternal.includeSubArea())),
      this.v5h
    );
  }
  get EntityIds() {
    if (!this.V1h) {
      (this.V1h = !0), (this.j1h = new Array());
      var i = this.FbDataInternal.entityIdsLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.j1h.push(this.FbDataInternal.entityIds(t));
    }
    return this.j1h;
  }
}
exports.FbCombinedVisibleGroupComponent = FbCombinedVisibleGroupComponent;
//# sourceMappingURL=FbCombinedVisibleGroupComponent.js.map
