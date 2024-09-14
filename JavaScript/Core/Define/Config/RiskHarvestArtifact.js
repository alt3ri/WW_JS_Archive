"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RiskHarvestArtifact = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RiskHarvestArtifact {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get BuffGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.buffgroupLength(),
      this.buffgroup,
      this,
    );
  }
  get BasicBuffGroup() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.basicbuffgroupLength(),
      this.basicbuffgroup,
      this,
    );
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRiskHarvestArtifact(t, s) {
    return (s || new RiskHarvestArtifact()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBuffgroupAt(t) {
    return this.buffgroup(t);
  }
  buffgroup(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  buffgroupLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  buffgroupArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  GetBasicbuffgroupAt(t) {
    return this.basicbuffgroup(t);
  }
  basicbuffgroup(t) {
    var s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  basicbuffgroupLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  basicbuffgroupArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.RiskHarvestArtifact = RiskHarvestArtifact;
//# sourceMappingURL=RiskHarvestArtifact.js.map
