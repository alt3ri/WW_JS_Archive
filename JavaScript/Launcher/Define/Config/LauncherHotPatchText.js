"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LauncherHotPatchText = void 0);
class LauncherHotPatchText {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsLauncherHotPatchText(t, s) {
    return (s || new LauncherHotPatchText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id(t) {
    const s = this.J7.__offset(this.z7, 4);
    return s ? this.J7.__string(this.z7 + s, t) : null;
  }
  text() {
    const t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.LauncherHotPatchText = LauncherHotPatchText;
// # sourceMappingURL=LauncherHotPatchText.js.map
