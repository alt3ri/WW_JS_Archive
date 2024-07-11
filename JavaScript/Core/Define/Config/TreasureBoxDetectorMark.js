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
    return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), (t) =>
      this.showrange(t),
    );
  }
  get Scale() {
    return this.scale();
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
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markpic(t) {
    const r = this.J7.__offset(this.z7, 6);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  marktitle(t) {
    const r = this.J7.__offset(this.z7, 8);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  markdesc(t) {
    const r = this.J7.__offset(this.z7, 10);
    return r ? this.J7.__string(this.z7 + r, t) : null;
  }
  showpriority() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    const r = this.J7.__offset(this.z7, 14);
    return r ? this.J7.readInt32(this.J7.__vector(this.z7 + r) + 4 * t) : 0;
  }
  showrangeLength() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showrangeArray() {
    const t = this.J7.__offset(this.z7, 14);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  scale() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
}
exports.TreasureBoxDetectorMark = TreasureBoxDetectorMark;
// # sourceMappingURL=TreasureBoxDetectorMark.js.map
