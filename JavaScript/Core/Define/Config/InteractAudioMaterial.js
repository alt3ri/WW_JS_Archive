"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InteractAudioMaterial = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class InteractAudioMaterial {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get CollisionMaterial() {
    return this.collisionmaterial();
  }
  get IsActiveImpacter() {
    return this.isactiveimpacter();
  }
  get AudioEvent() {
    return this.audioevent();
  }
  get ImpactMass() {
    return this.impactmass();
  }
  get Maxforce() {
    return this.maxforce();
  }
  get MinimumPosteventForce() {
    return this.minimumposteventforce();
  }
  get MinimumTimeBetweenAkevent() {
    return this.minimumtimebetweenakevent();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsInteractAudioMaterial(t, i) {
    return (i || new InteractAudioMaterial()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  collisionmaterial(t) {
    var i = this.J7.__offset(this.z7, 4),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  isactiveimpacter() {
    var t = this.J7.__offset(this.z7, 6);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  audioevent(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  impactmass() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  maxforce() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  minimumposteventforce() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  minimumtimebetweenakevent() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
}
exports.InteractAudioMaterial = InteractAudioMaterial;
//# sourceMappingURL=InteractAudioMaterial.js.map
