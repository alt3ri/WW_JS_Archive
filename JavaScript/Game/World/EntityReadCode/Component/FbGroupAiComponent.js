"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGroupAiComponent = void 0);
const UnionGroupAiOptionHelper_1 = require("./UnionGroupAiOptionHelper");
class FbGroupAiComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Ayh = !1),
      (this.xyh = void 0),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbGroupAiComponent(t);
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
  get Option() {
    var t, i;
    return (
      !this.s_h &&
        ((this.s_h = !0),
        (t = this.FbDataInternal.optionType()),
        (i =
          UnionGroupAiOptionHelper_1.UnionGroupAiOptionHelper.GetUnionGroupAiOptionObject(
            t,
          ))) &&
        (this.Hye =
          UnionGroupAiOptionHelper_1.UnionGroupAiOptionHelper.ReadUnionGroupAiOption(
            t,
            this.FbDataInternal.option(i),
          )),
      this.Hye
    );
  }
}
exports.FbGroupAiComponent = FbGroupAiComponent;
//# sourceMappingURL=FbGroupAiComponent.js.map
