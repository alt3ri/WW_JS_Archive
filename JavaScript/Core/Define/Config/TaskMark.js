"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TaskMark = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class TaskMark {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get MarkId() {
    return this.markid();
  }
  get MarkPic() {
    return this.markpic();
  }
  get MarkAcceptablePic() {
    return this.markacceptablepic();
  }
  get NpcTaskIcon() {
    return this.npctaskicon();
  }
  get IconDistant() {
    return this.icondistant();
  }
  get TrackTextStartEffectColor() {
    return this.tracktextstarteffectcolor();
  }
  get ShowRange() {
    return GameUtils_1.GameUtils.ConvertToArray(this.showrangeLength(), (t) =>
      this.showrange(t),
    );
  }
  get ShowPriority() {
    return this.showpriority();
  }
  get Scale() {
    return this.scale();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsTaskMark(t, s) {
    return (s || new TaskMark()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  markid() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  markpic(t) {
    const s = this.J7.__offset(this.z7, 6);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  markacceptablepic(t) {
    const s = this.J7.__offset(this.z7, 8);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  npctaskicon(t) {
    const s = this.J7.__offset(this.z7, 10);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  icondistant() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 2e4;
  }
  tracktextstarteffectcolor(t) {
    const s = this.J7.__offset(this.z7, 14);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  GetShowrangeAt(t) {
    return this.showrange(t);
  }
  showrange(t) {
    const s = this.J7.__offset(this.z7, 16);
    return s ? this.J7.readInt32(this.J7.__vector(this.z7 + s) + 4 * t) : 0;
  }
  showrangeLength() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.__vector_len(this.z7 + t) : 0;
  }
  showrangeArray() {
    const t = this.J7.__offset(this.z7, 16);
    return t
      ? new Int32Array(
          this.J7.bytes().buffer,
          this.J7.bytes().byteOffset + this.J7.__vector(this.z7 + t),
          this.J7.__vector_len(this.z7 + t),
        )
      : null;
  }
  showpriority() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  scale() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readFloat32(this.z7 + t) : 1;
  }
}
exports.TaskMark = TaskMark;
// # sourceMappingURL=TaskMark.js.map
