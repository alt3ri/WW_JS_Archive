"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayerAttribute = void 0);
const UnionPlayerAttributeHelper_1 = require("./UnionPlayerAttributeHelper");
class FbPlayerAttribute {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.s_h = !1),
      (this.Hye = void 0),
      (this.rJh = !1),
      (this.oJh = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayerAttribute(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Option() {
    return (
      this.s_h || ((this.s_h = !0), (this.Hye = this.FbDataInternal.option())),
      this.Hye
    );
  }
  get AttributeTypes() {
    if (!this.rJh) {
      (this.rJh = !0), (this.oJh = new Array());
      var i = this.FbDataInternal.attributeTypesLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.attributeTypesType(t),
            r =
              UnionPlayerAttributeHelper_1.UnionPlayerAttributeHelper.GetUnionPlayerAttributeObject(
                e,
              );
          r &&
            void 0 !==
              (e =
                UnionPlayerAttributeHelper_1.UnionPlayerAttributeHelper.ReadUnionPlayerAttribute(
                  e,
                  this.FbDataInternal.attributeTypes(t, r),
                )) &&
            this.oJh.push(e);
        }
    }
    return this.oJh;
  }
}
exports.FbPlayerAttribute = FbPlayerAttribute;
//# sourceMappingURL=FbPlayerAttribute.js.map
