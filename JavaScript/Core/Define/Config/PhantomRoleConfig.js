"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomRoleConfig = void 0);
class PhantomRoleConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get GeDesc() {
    return this.gedesc();
  }
  get Name() {
    return this.name();
  }
  get MeshId() {
    return this.meshid();
  }
  get SkillId() {
    return this.skillid();
  }
  get SkillTreeGroupId() {
    return this.skilltreegroupid();
  }
  get CameraConfig() {
    return this.cameraconfig();
  }
  get CameraFloatHeight() {
    return this.camerafloatheight();
  }
  get PropertyId() {
    return this.propertyid();
  }
  get RoleHeadIcon() {
    return this.roleheadicon();
  }
  get CameraId() {
    return this.cameraid();
  }
  get SearchId() {
    return this.searchid();
  }
  get HUDId() {
    return this.hudid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsPhantomRoleConfig(t, i) {
    return (i || new PhantomRoleConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  id() {
    const t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  gedesc(t) {
    const i = this.J7.__offset(this.z7, 6);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  name(t) {
    const i = this.J7.__offset(this.z7, 8);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  meshid() {
    const t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skillid() {
    const t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  skilltreegroupid() {
    const t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  cameraconfig() {
    const t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  camerafloatheight() {
    const t = this.J7.__offset(this.z7, 18);
    return t ? this.J7.readFloat32(this.z7 + t) : 0;
  }
  propertyid() {
    const t = this.J7.__offset(this.z7, 20);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleheadicon(t) {
    const i = this.J7.__offset(this.z7, 22);
    return i ? this.J7.__string(this.z7 + i, t) : null;
  }
  cameraid() {
    const t = this.J7.__offset(this.z7, 24);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  searchid() {
    const t = this.J7.__offset(this.z7, 26);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  hudid() {
    const t = this.J7.__offset(this.z7, 28);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.PhantomRoleConfig = PhantomRoleConfig;
// # sourceMappingURL=PhantomRoleConfig.js.map
