"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpawnEntity = void 0);
const FbTransform_1 = require("./FbTransform"),
  UnionVarRefHelper_1 = require("../Var/UnionVarRefHelper");
class FbSpawnEntity {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Pph = !1),
      (this.Uph = 0),
      (this.bph = !1),
      (this.Lph = void 0),
      (this.Dph = !1),
      (this.Bph = void 0);
  }
  static Create(t) {
    if (t) return new FbSpawnEntity(t);
  }
  get EntityDataId() {
    return (
      this.Pph ||
        ((this.Pph = !0), (this.Uph = this.FbDataInternal.entityDataId())),
      this.Uph
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
  get Save() {
    var t, i;
    return (
      !this.Dph &&
        ((this.Dph = !0),
        (t = this.FbDataInternal.saveType()),
        (i = UnionVarRefHelper_1.UnionVarRefHelper.GetUnionVarRefObject(t))) &&
        (this.Bph = UnionVarRefHelper_1.UnionVarRefHelper.ReadUnionVarRef(
          t,
          this.FbDataInternal.save(i),
        )),
      this.Bph
    );
  }
}
exports.FbSpawnEntity = FbSpawnEntity;
//# sourceMappingURL=FbSpawnEntity.js.map
