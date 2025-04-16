"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapFog = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class MapFog {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Fog() {
    return this.fog();
  }
  get MapId() {
    return this.mapid();
  }
  get AreaId() {
    return this.areaid();
  }
  get GravityFlip() {
    return this.gravityflip();
  }
  get UnlockCondition() {
    return this.unlockcondition();
  }
  get FogUnlockPosition() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.fogunlockpositionLength(),
      this.fogunlockposition,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsMapFog(t, i) {
    return (i || new MapFog()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  fog() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  areaid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gravityflip() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 1;
  }
  unlockcondition() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetFogunlockpositionAt(t) {
    return this.fogunlockposition(t);
  }
  fogunlockposition(t) {
    var i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  fogunlockpositionLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  fogunlockpositionArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.MapFog = MapFog;
//# sourceMappingURL=MapFog.js.map
