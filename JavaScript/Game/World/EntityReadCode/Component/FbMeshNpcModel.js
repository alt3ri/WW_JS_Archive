"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMeshNpcModel = void 0);
class FbMeshNpcModel {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.IKh = !1),
      (this.TKh = void 0);
  }
  static Create(t) {
    if (t) return new FbMeshNpcModel(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Mesh() {
    return (
      this.IKh || ((this.IKh = !0), (this.TKh = this.FbDataInternal.mesh())),
      this.TKh
    );
  }
}
exports.FbMeshNpcModel = FbMeshNpcModel;
//# sourceMappingURL=FbMeshNpcModel.js.map
