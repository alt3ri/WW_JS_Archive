"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TreasureBoxDetectorMark = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TreasureBoxDetectorMark {
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
  get TrackHudEnable() {
    return this.trackhudenable();
  }
  get TrackAutoCancelDistance() {
    return this.trackautocanceldistance();
  }
  __init(t, r) {
    return (this.z7 = t), (this.J7 = r), this;
  }
  static getRootAsTreasureBoxDetectorMark(t, r) {
    return (r || new TreasureBoxDetectorMark()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  markid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markpic(t) {
    var r = this.J7.__offset(this.z7, 6),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
    );
  }
  marktitle(t) {
    var r = this.J7.__offset(this.z7, 8),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
    );
  }
  markdesc(t) {
    var r = this.J7.__offset(this.z7, 10),
      r = r ? this.J7.__string(this.z7 + r, t) : null;
    return (
      "string" == typeof r &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(r),
      r
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
    var r = this.J7.__offset(this.z7, 14);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
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
  trackhudenable() {
    var t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  trackautocanceldistance() {
    var t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readFloat32(this.z7 + t) : -1;
  }
}
exports.TreasureBoxDetectorMark = TreasureBoxDetectorMark;
//# sourceMappingURL=TreasureBoxDetectorMark.js.map
