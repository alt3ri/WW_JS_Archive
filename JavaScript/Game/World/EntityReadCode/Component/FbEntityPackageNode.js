"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityPackageNode = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component");
class FbEntityPackageNode {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.bxh = !1),
      (this.Lxh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityPackageNode(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get Children() {
    if (!this.bxh) {
      (this.bxh = !0), (this.Lxh = new Array());
      var e = this.FbDataInternal.childrenLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.children(
            t,
            new fb_component_1.EntityPackageNode(),
          );
          this.Lxh.push(FbEntityPackageNode.Create(i));
        }
    }
    return this.Lxh;
  }
}
exports.FbEntityPackageNode = FbEntityPackageNode;
//# sourceMappingURL=FbEntityPackageNode.js.map
