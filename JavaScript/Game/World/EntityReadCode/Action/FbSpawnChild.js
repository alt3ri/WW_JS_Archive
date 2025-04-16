"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpawnChild = void 0);
const FbTransform_1 = require("./FbTransform");
class FbSpawnChild {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Iph = !1),
      (this.Tph = void 0),
      (this.bph = !1),
      (this.Lph = void 0);
  }
  static Create(t) {
    if (t) return new FbSpawnChild(t);
  }
  get TemplateGuid() {
    return (
      this.Iph ||
        ((this.Iph = !0), (this.Tph = this.FbDataInternal.templateGuid())),
      this.Tph
    );
  }
  get Transform() {
    return (
      this.bph ||
        ((this.bph = !0),
        (this.Lph = FbTransform_1.FbTransform.Create(
          this.FbDataInternal.transform(),
        ))),
      this.Lph
    );
  }
}
exports.FbSpawnChild = FbSpawnChild;
//# sourceMappingURL=FbSpawnChild.js.map
