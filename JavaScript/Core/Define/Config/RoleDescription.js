"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleDescription = void 0);
class RoleDescription {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get Texture() {
    return this.texture();
  }
  get Description() {
    return this.description();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRoleDescription(t, i) {
    return (i || new RoleDescription()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  texture(t) {
    var i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  description(t) {
    var i = this.J7.__offset(this.z7, 10);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
}
exports.RoleDescription = RoleDescription;
//# sourceMappingURL=RoleDescription.js.map
