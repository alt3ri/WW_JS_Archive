"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AutoRole = void 0);
class AutoRole {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get ModelId() {
    return this.modelid();
  }
  get AiId() {
    return this.aiid();
  }
  __init(t, s) {
    return (this.z7 = t), (this.J7 = s), this;
  }
  static getRootAsAutoRole(t, s) {
    return (s || new AutoRole()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  modelid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  aiid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.AutoRole = AutoRole;
//# sourceMappingURL=AutoRole.js.map
