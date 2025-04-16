"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEditCustomAoiComponent = void 0);
class FbEditCustomAoiComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Ayh = !1),
      (this.xyh = void 0);
  }
  static Create(t) {
    if (t) return new FbEditCustomAoiComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Entities() {
    if (!this.Ayh) {
      (this.Ayh = !0), (this.xyh = new Array());
      var i = this.FbDataInternal.entitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.xyh.push(this.FbDataInternal.entities(t));
    }
    return this.xyh;
  }
}
exports.FbEditCustomAoiComponent = FbEditCustomAoiComponent;
//# sourceMappingURL=FbEditCustomAoiComponent.js.map
