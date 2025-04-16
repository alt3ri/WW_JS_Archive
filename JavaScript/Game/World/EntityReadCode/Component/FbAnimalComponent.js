"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAnimalComponent = void 0);
const UnionSpecialAnimalConfigHelper_1 = require("./UnionSpecialAnimalConfigHelper");
class FbAnimalComponent {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.s4h = !1),
      (this.a4h = !1),
      (this.p8h = !1),
      (this.v8h = 0),
      (this.y8h = !1),
      (this.S8h = 0),
      (this.M8h = !1),
      (this.E8h = !1),
      (this.I8h = !1),
      (this.T8h = void 0);
  }
  static Create(i) {
    if (i) return new FbAnimalComponent(i);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get IsStare() {
    return (
      this.s4h || ((this.s4h = !0), (this.a4h = this.FbDataInternal.isStare())),
      this.a4h
    );
  }
  get AnimalAttackRange() {
    return (
      this.p8h ||
        ((this.p8h = !0), (this.v8h = this.FbDataInternal.animalAttackRange())),
      this.v8h
    );
  }
  get MoveRange() {
    return (
      this.y8h ||
        ((this.y8h = !0), (this.S8h = this.FbDataInternal.moveRange())),
      this.S8h
    );
  }
  get CanKillSelf() {
    return (
      this.M8h ||
        ((this.M8h = !0), (this.E8h = this.FbDataInternal.canKillSelf())),
      this.E8h
    );
  }
  get SpecialAnimalConfig() {
    var i, t;
    return (
      !this.I8h &&
        ((this.I8h = !0),
        (i = this.FbDataInternal.specialAnimalConfigType()),
        (t =
          UnionSpecialAnimalConfigHelper_1.UnionSpecialAnimalConfigHelper.GetUnionSpecialAnimalConfigObject(
            i,
          ))) &&
        (this.T8h =
          UnionSpecialAnimalConfigHelper_1.UnionSpecialAnimalConfigHelper.ReadUnionSpecialAnimalConfig(
            i,
            this.FbDataInternal.specialAnimalConfig(t),
          )),
      this.T8h
    );
  }
}
exports.FbAnimalComponent = FbAnimalComponent;
//# sourceMappingURL=FbAnimalComponent.js.map
