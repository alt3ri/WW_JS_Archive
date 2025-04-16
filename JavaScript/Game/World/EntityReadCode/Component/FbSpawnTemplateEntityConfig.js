"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpawnTemplateEntityConfig = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbSpawnTemplateEntityConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.$Ac = !1),
      (this.WAc = void 0),
      (this.QAc = !1),
      (this.KAc = void 0),
      (this.XAc = !1),
      (this.YAc = void 0),
      (this.zAc = !1),
      (this.JAc = void 0);
  }
  static Create(t) {
    if (t) return new FbSpawnTemplateEntityConfig(t);
  }
  get TemplateBpType() {
    return (
      this.$Ac ||
        ((this.$Ac = !0), (this.WAc = this.FbDataInternal.templateBpType())),
      this.WAc
    );
  }
  get PosOffset() {
    return (
      this.QAc ||
        ((this.QAc = !0),
        (this.KAc = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.posOffset(),
        ))),
      this.KAc
    );
  }
  get RotOffset() {
    return (
      this.XAc ||
        ((this.XAc = !0),
        (this.YAc = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.rotOffset(),
        ))),
      this.YAc
    );
  }
  get GroupTypes() {
    if (!this.zAc) {
      (this.zAc = !0), (this.JAc = new Array());
      var i = this.FbDataInternal.groupTypesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.JAc.push(this.FbDataInternal.groupTypes(t));
    }
    return this.JAc;
  }
}
exports.FbSpawnTemplateEntityConfig = FbSpawnTemplateEntityConfig;
//# sourceMappingURL=FbSpawnTemplateEntityConfig.js.map
