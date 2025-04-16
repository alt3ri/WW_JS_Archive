"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityPackageData = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityPackageNode_1 = require("./FbEntityPackageNode");
class FbEntityPackageData {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Vjh = !1),
      (this.jjh = 0),
      (this.Hjh = !1),
      (this.Wjh = 0),
      (this.Qjh = !1),
      (this.Kjh = void 0);
  }
  static Create(t) {
    if (t) return new FbEntityPackageData(t);
  }
  get PackagedLevelId() {
    return (
      this.Vjh ||
        ((this.Vjh = !0), (this.jjh = this.FbDataInternal.packagedLevelId())),
      this.jjh
    );
  }
  get PackageEntityId() {
    return (
      this.Hjh ||
        ((this.Hjh = !0), (this.Wjh = this.FbDataInternal.packageEntityId())),
      this.Wjh
    );
  }
  get PackageTree() {
    if (!this.Qjh) {
      (this.Qjh = !0), (this.Kjh = new Array());
      var e = this.FbDataInternal.packageTreeLength();
      if (e)
        for (let t = 0; t < e; ++t) {
          var i = this.FbDataInternal.packageTree(
            t,
            new fb_component_1.EntityPackageNode(),
          );
          this.Kjh.push(FbEntityPackageNode_1.FbEntityPackageNode.Create(i));
        }
    }
    return this.Kjh;
  }
}
exports.FbEntityPackageData = FbEntityPackageData;
//# sourceMappingURL=FbEntityPackageData.js.map
