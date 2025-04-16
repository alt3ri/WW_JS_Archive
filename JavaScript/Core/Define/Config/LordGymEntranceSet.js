"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LordGymEntranceSet = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class LordGymEntranceSet {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get PreviewRewardId() {
    return this.previewrewardid();
  }
  get MarkId() {
    return this.markid();
  }
  get LordEntranceList() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.lordentrancelistLength(),
      this.lordentrancelist,
      this,
    );
  }
  get MapNoteUnlockCondition() {
    return this.mapnoteunlockcondition();
  }
  get Title() {
    return this.title();
  }
  get Description() {
    return this.description();
  }
  get HelpId() {
    return this.helpid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsLordGymEntranceSet(t, i) {
    return (i || new LordGymEntranceSet()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  previewrewardid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetLordentrancelistAt(t) {
    return this.lordentrancelist(t);
  }
  lordentrancelist(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.readInt32(this.J7.__vector(this.z7 + i) + 4 * t) : 0;
  }
  lordentrancelistLength() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  lordentrancelistArray() {
    var t = this.J7.__offset(this.z7, 10);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  mapnoteunlockcondition() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  title(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 16),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  helpid() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.LordGymEntranceSet = LordGymEntranceSet;
//# sourceMappingURL=LordGymEntranceSet.js.map
