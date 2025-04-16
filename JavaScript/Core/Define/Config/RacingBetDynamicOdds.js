"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetDynamicOdds = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RacingBetDynamicOdds {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get LegId() {
    return this.legid();
  }
  get Proportion() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.proportionLength(),
      this.proportion,
      this,
    );
  }
  get DynamicOdds() {
    return this.dynamicodds();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRacingBetDynamicOdds(t, i) {
    return (i || new RacingBetDynamicOdds()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  legid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetProportionAt(t) {
    return this.proportion(t);
  }
  proportion(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  proportionLength() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  proportionArray() {
    var t = this.J7.__offset(this.z7, 8);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  dynamicodds() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RacingBetDynamicOdds = RacingBetDynamicOdds;
//# sourceMappingURL=RacingBetDynamicOdds.js.map
