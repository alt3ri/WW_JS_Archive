"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAnimalModel = void 0);
const UnionAnimalModelTypeHelper_1 = require("./UnionAnimalModelTypeHelper");
class FbAnimalModel {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$Qh = !1),
      (this.XQh = void 0),
      (this._11 = !1),
      (this.c11 = void 0),
      (this._Kh = !1),
      (this.cKh = void 0);
  }
  static Create(t) {
    if (t) return new FbAnimalModel(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BlueprintPath() {
    return (
      this.$Qh ||
        ((this.$Qh = !0), (this.XQh = this.FbDataInternal.blueprintPath())),
      this.XQh
    );
  }
  get AnimalModel() {
    var t, i;
    return (
      !this._11 &&
        ((this._11 = !0),
        (t = this.FbDataInternal.animalModelType()),
        (i =
          UnionAnimalModelTypeHelper_1.UnionAnimalModelTypeHelper.GetUnionAnimalModelTypeObject(
            t,
          ))) &&
        (this.c11 =
          UnionAnimalModelTypeHelper_1.UnionAnimalModelTypeHelper.ReadUnionAnimalModelType(
            t,
            this.FbDataInternal.animalModel(i),
          )),
      this.c11
    );
  }
  get Abp() {
    return (
      this._Kh || ((this._Kh = !0), (this.cKh = this.FbDataInternal.abp())),
      this.cKh
    );
  }
}
exports.FbAnimalModel = FbAnimalModel;
//# sourceMappingURL=FbAnimalModel.js.map
