"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityGravityConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class EntityGravityConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get MapId() {
    return this.mapid();
  }
  get EntityId() {
    return this.entityid();
  }
  get GravityDirection() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.gravitydirectionLength(),
      this.gravitydirection,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsEntityGravityConfig(t, i) {
    return (i || new EntityGravityConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  mapid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  entityid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetGravitydirectionAt(t) {
    return this.gravitydirection(t);
  }
  gravitydirection(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readFloat32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  gravitydirectionLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  gravitydirectionArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Float32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.EntityGravityConfig = EntityGravityConfig;
//# sourceMappingURL=EntityGravityConfig.js.map
