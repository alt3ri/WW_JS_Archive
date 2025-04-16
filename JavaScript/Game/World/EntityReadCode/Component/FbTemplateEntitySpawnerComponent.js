"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTemplateEntitySpawnerComponent = void 0);
const UnionSpawnConfigHelper_1 = require("./UnionSpawnConfigHelper"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup");
class FbTemplateEntitySpawnerComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.ZAc = !1),
      (this.ePc = void 0),
      (this.tPc = !1),
      (this.iPc = void 0),
      (this.bQh = !1),
      (this.LQh = void 0);
  }
  static Create(t) {
    if (t) return new FbTemplateEntitySpawnerComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get SpawnConditions() {
    return (
      this.ZAc ||
        ((this.ZAc = !0),
        (this.ePc = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.spawnConditions(),
        ))),
      this.ePc
    );
  }
  get ClearConditions() {
    return (
      this.tPc ||
        ((this.tPc = !0),
        (this.iPc = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.clearConditions(),
        ))),
      this.iPc
    );
  }
  get SpawnConfig() {
    var t, i;
    return (
      !this.bQh &&
        ((this.bQh = !0),
        (t = this.FbDataInternal.spawnConfigType()),
        (i =
          UnionSpawnConfigHelper_1.UnionSpawnConfigHelper.GetUnionSpawnConfigObject(
            t,
          ))) &&
        (this.LQh =
          UnionSpawnConfigHelper_1.UnionSpawnConfigHelper.ReadUnionSpawnConfig(
            t,
            this.FbDataInternal.spawnConfig(i),
          )),
      this.LQh
    );
  }
}
exports.FbTemplateEntitySpawnerComponent = FbTemplateEntitySpawnerComponent;
//# sourceMappingURL=FbTemplateEntitySpawnerComponent.js.map
