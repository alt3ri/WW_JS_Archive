"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotKeyMap = void 0);
class HotKeyMap {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ActionName() {
    return this.actionname();
  }
  get AxisName() {
    return this.axisname();
  }
  get AxisDirection() {
    return this.axisdirection();
  }
  get TextId() {
    return this.textid();
  }
  get Type() {
    return this.type();
  }
  get LongPressTime() {
    return this.longpresstime();
  }
  get ReleaseFailureTime() {
    return this.releasefailuretime();
  }
  get BindButtonTag() {
    return this.bindbuttontag();
  }
  get ApplicableType() {
    return this.applicabletype();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsHotKeyMap(t, i) {
    return (i || new HotKeyMap()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  actionname(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  axisname(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  axisdirection() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  textid(t) {
    const i = this.J7.__offset(this.z7, 12);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  type(t) {
    const i = this.J7.__offset(this.z7, 14);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  longpresstime() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  releasefailuretime() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  bindbuttontag(t) {
    const i = this.J7.__offset(this.z7, 20);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  applicabletype() {
    const t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.HotKeyMap = HotKeyMap;
// # sourceMappingURL=HotKeyMap.js.map
