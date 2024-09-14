"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentAreaConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class EnrichmentAreaConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get EnrichmentId() {
    return this.enrichmentid();
  }
  get ItemId() {
    return this.itemid();
  }
  get LevelId() {
    return this.levelid();
  }
  get EntityIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.entityidsLength(),
      this.entityids,
      this,
    );
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsEnrichmentAreaConfig(t, i) {
    return (i || new EnrichmentAreaConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  enrichmentid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  itemid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  levelid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetEntityidsAt(t) {
    return this.entityids(t);
  }
  entityids(t) {
    var i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  entityidsLength() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  entityidsArray() {
    var t = this.J7.__offset(this.z7, 12);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
}
exports.EnrichmentAreaConfig = EnrichmentAreaConfig;
//# sourceMappingURL=EnrichmentAreaConfig.js.map
