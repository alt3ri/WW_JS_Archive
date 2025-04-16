"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbModelComponent = void 0);
const UnionModelTypeHelper_1 = require("./UnionModelTypeHelper");
class FbModelComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.FQh = !1),
      (this.NQh = void 0),
      (this.VQh = !1),
      (this.jQh = 0),
      (this.HQh = !1),
      (this.WQh = 0),
      (this.QQh = !1),
      (this.KQh = void 0);
  }
  static Create(t) {
    if (t) return new FbModelComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ModelType() {
    var t, e;
    return (
      !this.FQh &&
        ((this.FQh = !0),
        (t = this.FbDataInternal.modelTypeType()),
        (e =
          UnionModelTypeHelper_1.UnionModelTypeHelper.GetUnionModelTypeObject(
            t,
          ))) &&
        (this.NQh =
          UnionModelTypeHelper_1.UnionModelTypeHelper.ReadUnionModelType(
            t,
            this.FbDataInternal.modelType(e),
          )),
      this.NQh
    );
  }
  get HalfHeight() {
    return (
      this.VQh ||
        ((this.VQh = !0), (this.jQh = this.FbDataInternal.halfHeight())),
      this.jQh
    );
  }
  get TrackHeight() {
    return (
      this.HQh ||
        ((this.HQh = !0), (this.WQh = this.FbDataInternal.trackHeight())),
      this.WQh
    );
  }
  get PerformanceTags() {
    if (!this.QQh) {
      (this.QQh = !0), (this.KQh = new Array());
      var e = this.FbDataInternal.performanceTagsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.KQh.push(this.FbDataInternal.performanceTags(t));
    }
    return this.KQh;
  }
}
exports.FbModelComponent = FbModelComponent;
//# sourceMappingURL=FbModelComponent.js.map
