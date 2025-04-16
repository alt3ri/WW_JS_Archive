"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonsterGachaBaseComponent = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbMonsterFormation_1 = require("./FbMonsterFormation"),
  FbMonsterGachaSlot_1 = require("./FbMonsterGachaSlot");
class FbMonsterGachaBaseComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Qvh = !1),
      (this.Kvh = void 0),
      (this.bSh = !1),
      (this.TAe = void 0),
      (this.Z7h = !1),
      (this.eWh = void 0);
  }
  static Create(t) {
    if (t) return new FbMonsterGachaBaseComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
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
  get Config() {
    if (!this.bSh) {
      (this.bSh = !0), (this.TAe = new Array());
      var s = this.FbDataInternal.configLength();
      if (s)
        for (let t = 0; t < s; ++t) {
          var i = this.FbDataInternal.config(
            t,
            new fb_component_1.MonsterGachaSlot(),
          );
          this.TAe.push(FbMonsterGachaSlot_1.FbMonsterGachaSlot.Create(i));
        }
    }
    return this.TAe;
  }
  get Formation() {
    if (!this.Z7h) {
      (this.Z7h = !0), (this.eWh = new Array());
      var s = this.FbDataInternal.formationLength();
      if (s)
        for (let t = 0; t < s; ++t) {
          var i = this.FbDataInternal.formation(
            t,
            new fb_component_1.MonsterFormation(),
          );
          this.eWh.push(FbMonsterFormation_1.FbMonsterFormation.Create(i));
        }
    }
    return this.eWh;
  }
}
exports.FbMonsterGachaBaseComponent = FbMonsterGachaBaseComponent;
//# sourceMappingURL=FbMonsterGachaBaseComponent.js.map
