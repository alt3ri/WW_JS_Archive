"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpawnMonsterComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSpawnMonsterConfig_1 = require("./FbSpawnMonsterConfig"),
  UnionSpawnMonsterConstraintHelper_1 = require("./UnionSpawnMonsterConstraintHelper"),
  UnionSpawnMonsterStartConditionHelper_1 = require("./UnionSpawnMonsterStartConditionHelper");
class FbSpawnMonsterComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Oqh = !1),
      (this.Fqh = void 0),
      (this.Nqh = !1),
      (this.Vqh = void 0),
      (this.jqh = !1),
      (this.Hqh = !1),
      (this.Wqh = !1),
      (this.Qqh = void 0);
  }
  static Create(t) {
    if (t) return new FbSpawnMonsterComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get ActiveType() {
    var t, n;
    return (
      !this.Oqh &&
        ((this.Oqh = !0),
        (t = this.FbDataInternal.activeTypeType()),
        (n =
          UnionSpawnMonsterStartConditionHelper_1.UnionSpawnMonsterStartConditionHelper.GetUnionSpawnMonsterStartConditionObject(
            t,
          ))) &&
        (this.Fqh =
          UnionSpawnMonsterStartConditionHelper_1.UnionSpawnMonsterStartConditionHelper.ReadUnionSpawnMonsterStartCondition(
            t,
            this.FbDataInternal.activeType(n),
          )),
      this.Fqh
    );
  }
  get SpawnMonsterConfigs() {
    if (!this.Nqh) {
      (this.Nqh = !0), (this.Vqh = new Array());
      var n = this.FbDataInternal.spawnMonsterConfigsLength();
      if (n)
        for (let t = 0; t < n; ++t) {
          var i = this.FbDataInternal.spawnMonsterConfigs(
            t,
            new fb_component_1.SpawnMonsterConfig(),
          );
          this.Vqh.push(FbSpawnMonsterConfig_1.FbSpawnMonsterConfig.Create(i));
        }
    }
    return this.Vqh;
  }
  get IssharedHatred() {
    return (
      this.jqh ||
        ((this.jqh = !0), (this.Hqh = this.FbDataInternal.issharedHatred())),
      this.Hqh
    );
  }
  get SpawnMonsterConstraintType() {
    var t, n;
    return (
      !this.Wqh &&
        ((this.Wqh = !0),
        (t = this.FbDataInternal.spawnMonsterConstraintTypeType()),
        (n =
          UnionSpawnMonsterConstraintHelper_1.UnionSpawnMonsterConstraintHelper.GetUnionSpawnMonsterConstraintObject(
            t,
          ))) &&
        (this.Qqh =
          UnionSpawnMonsterConstraintHelper_1.UnionSpawnMonsterConstraintHelper.ReadUnionSpawnMonsterConstraint(
            t,
            this.FbDataInternal.spawnMonsterConstraintType(n),
          )),
      this.Qqh
    );
  }
}
exports.FbSpawnMonsterComponent = FbSpawnMonsterComponent;
//# sourceMappingURL=FbSpawnMonsterComponent.js.map
