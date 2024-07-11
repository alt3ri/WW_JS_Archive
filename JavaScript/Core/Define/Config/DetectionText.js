"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DetectionText = void 0);
class DetectionText {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Text() {
    return this.text();
  }
  get SubText() {
    return this.subtext();
  }
  get Icon() {
    return this.icon();
  }
  get HelpGroupId() {
    return this.helpgroupid();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsDetectionText(t, e) {
    return (e || new DetectionText()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  text(t) {
    const e = this.J7.__offset(this.z7, 6);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  subtext(t) {
    const e = this.J7.__offset(this.z7, 8);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  icon(t) {
    const e = this.J7.__offset(this.z7, 10);
    return e ? this.J7.__string(this.z7 + e, t) : null;
  }
  helpgroupid() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.DetectionText = DetectionText;
// # sourceMappingURL=DetectionText.js.map
