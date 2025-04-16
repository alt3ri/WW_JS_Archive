"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayCommonEffect = void 0);
const UnionEffectPos2Helper_1 = require("./UnionEffectPos2Helper");
class FbPlayCommonEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Hdh = !1),
      (this.Xdr = void 0),
      (this.Wdh = !1),
      (this.Qdh = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayCommonEffect(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Path() {
    return (
      this.Hdh || ((this.Hdh = !0), (this.Xdr = this.FbDataInternal.path())),
      this.Xdr
    );
  }
  get Pos2() {
    var t, s;
    return (
      !this.Wdh &&
        ((this.Wdh = !0),
        (t = this.FbDataInternal.pos2Type()),
        (s =
          UnionEffectPos2Helper_1.UnionEffectPos2Helper.GetUnionEffectPos2Object(
            t,
          ))) &&
        (this.Qdh =
          UnionEffectPos2Helper_1.UnionEffectPos2Helper.ReadUnionEffectPos2(
            t,
            this.FbDataInternal.pos2(s),
          )),
      this.Qdh
    );
  }
}
exports.FbPlayCommonEffect = FbPlayCommonEffect;
//# sourceMappingURL=FbPlayCommonEffect.js.map
