"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxMark = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TreasureBoxMark {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get MarkId() {
    return this.markid();
  }
  get MarkPic() {
    return this.markpic();
  }
  get MarkTitle() {
    return this.marktitle();
  }
  get MarkDesc() {
    return this.markdesc();
  }
  get ShowPriority() {
    return this.showpriority();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(
      this.showrangeLength(),
      this.showrange,
      this,
    );
  }
  get Scale() {
    return this.scale();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsTreasureBoxMark(t, s) {
    return (s || new TreasureBoxMark()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markpic(t) {
    var s = this.J7.__offset(this.z7, 6),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  marktitle(t) {
    var s = this.J7.__offset(this.z7, 8),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  markdesc(t) {
    var s = this.J7.__offset(this.z7, 10),
      s = s ? this.J7.__string(this.z7 + s, t) : null;
    return (
      "string" == typeof s &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(s),
      s
    );
  }
  showpriority() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    var s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  showrangeLength() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showrangeArray() {
    var t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  scale() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
}
exports.TreasureBoxMark = TreasureBoxMark;
//# sourceMappingURL=TreasureBoxMark.js.map
