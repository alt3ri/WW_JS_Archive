"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResBondRole = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResBondRole {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get RoleId() {
    return this.roleid();
  }
  get BondIds() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.bondidsLength(),
      this.bondids,
      this,
    );
  }
  get TrialRoleId() {
    return this.trialroleid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsRogueResBondRole(t, s) {
    return (s || new RogueResBondRole()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetBondidsAt(t) {
    return this.bondids(t);
  }
  bondids(t) {
    var s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  bondidsLength() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  bondidsArray() {
    var t = this.J7.__offset(this.z7, 6);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  trialroleid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RogueResBondRole = RogueResBondRole;
//# sourceMappingURL=RogueResBondRole.js.map
