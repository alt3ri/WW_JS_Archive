"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadIconEnergyBar = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class HeadIconEnergyBar {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Type() {
    return this.type();
  }
  get AttributeId() {
    return this.attributeid();
  }
  get PrefabPath() {
    return this.prefabpath();
  }
  get EffectCd() {
    return this.effectcd();
  }
  get PlayIncreaseEffect() {
    return this.playincreaseeffect();
  }
  get PlayDecreaseEffect() {
    return this.playdecreaseeffect();
  }
  get FormationVisible() {
    return this.formationvisible();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsHeadIconEnergyBar(t, e) {
    return (e || new HeadIconEnergyBar()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  type() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  attributeid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  prefabpath(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  effectcd() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  playincreaseeffect() {
    var t = this.J7.__offset(this.z7, 14);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  playdecreaseeffect() {
    var t = this.J7.__offset(this.z7, 16);
    return !t || !!this.J7.readInt8(this.z7 + t);
  }
  formationvisible() {
    var t = this.J7.__offset(this.z7, 18);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
}
exports.HeadIconEnergyBar = HeadIconEnergyBar;
//# sourceMappingURL=HeadIconEnergyBar.js.map
