"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayEffect = void 0);
const UnionPos2Helper_1 = require("./UnionPos2Helper");
class FbPlayEffect {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Hdh = !1),
      (this.Xdr = void 0),
      (this.Wdh = !1),
      (this.Qdh = void 0);
  }
  static Create(t) {
    if (t) return new FbPlayEffect(t);
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
        (s = UnionPos2Helper_1.UnionPos2Helper.GetUnionPos2Object(t))) &&
        (this.Qdh = UnionPos2Helper_1.UnionPos2Helper.ReadUnionPos2(
          t,
          this.FbDataInternal.pos2(s),
        )),
      this.Qdh
    );
  }
}
exports.FbPlayEffect = FbPlayEffect;
//# sourceMappingURL=FbPlayEffect.js.map
