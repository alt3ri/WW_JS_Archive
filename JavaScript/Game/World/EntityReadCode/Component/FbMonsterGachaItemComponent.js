"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonsterGachaItemComponent = void 0);
class FbMonsterGachaItemComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.X7h = !1),
      (this.Y7h = void 0),
      (this.z7h = !1),
      (this.J7h = void 0),
      (this.Qvh = !1),
      (this.Kvh = void 0);
  }
  static Create(t) {
    if (t) return new FbMonsterGachaItemComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get MaterialDataPath() {
    return (
      this.X7h ||
        ((this.X7h = !0), (this.Y7h = this.FbDataInternal.materialDataPath())),
      this.Y7h
    );
  }
  get MonsterType() {
    return (
      this.z7h ||
        ((this.z7h = !0), (this.J7h = this.FbDataInternal.monsterType())),
      this.J7h
    );
  }
  get MonsterEntityIds() {
    if (!this.Qvh) {
      (this.Qvh = !0), (this.Kvh = new Array());
      var s = this.FbDataInternal.monsterEntityIdsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.Kvh.push(this.FbDataInternal.monsterEntityIds(t));
    }
    return this.Kvh;
  }
}
exports.FbMonsterGachaItemComponent = FbMonsterGachaItemComponent;
//# sourceMappingURL=FbMonsterGachaItemComponent.js.map
