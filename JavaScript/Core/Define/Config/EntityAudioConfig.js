"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityAudioConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class EntityAudioConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Name() {
    return this.name();
  }
  get EnableVb() {
    return this.enablevb();
  }
  get RtpcName() {
    return this.rtpcname();
  }
  get TriggerDistance() {
    return this.triggerdistance();
  }
  get BoneHiddenSwitch() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bonehiddenswitchLength(),
      this.bonehiddenswitch,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsEntityAudioConfig(t, i) {
    return (i || new EntityAudioConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    var i = this.J7.__offset(this.z7, 4),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  name(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  enablevb() {
    var t = this.J7.__offset(this.z7, 8);
    return !!t && !!this.J7.readInt8(this.z7 + t);
  }
  rtpcname(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  triggerdistance() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readFloat32(this.z7 + t) : 500;
  }
  GetBonehiddenswitchAt(t) {
    return this.bonehiddenswitch(t);
  }
  bonehiddenswitch(t, i) {
    var s = this.J7.__offset(this.z7, 14),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, i) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  bonehiddenswitchLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
}
exports.EntityAudioConfig = EntityAudioConfig;
//# sourceMappingURL=EntityAudioConfig.js.map
