"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueResTalentTreeDesc = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RogueResTalentTreeDesc {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get TalentName() {
    return this.talentname();
  }
  get TalentDesc() {
    return this.talentdesc();
  }
  get Args() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.argsLength(),
      this.args,
      this,
    );
  }
  get TalentIcon() {
    return this.talenticon();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRogueResTalentTreeDesc(t, e) {
    return (e || new RogueResTalentTreeDesc()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  talentname(t) {
    var e = this.J7.__offset(this.z7, 6),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  talentdesc(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  GetArgsAt(t) {
    return this.args(t);
  }
  args(t, e) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.J7.__vector(this.z7 + s) + 4 * t, e) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  argsLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  talenticon(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.RogueResTalentTreeDesc = RogueResTalentTreeDesc;
//# sourceMappingURL=RogueResTalentTreeDesc.js.map
