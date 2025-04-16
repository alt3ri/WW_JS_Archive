"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleBirthday = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleBirthday {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get RoleId() {
    return this.roleid();
  }
  get Priority() {
    return this.priority();
  }
  get Name() {
    return this.name();
  }
  get CardTextKey() {
    return this.cardtextkey();
  }
  get VoiceEvent() {
    return this.voiceevent();
  }
  get SceneCameraId() {
    return this.scenecameraid();
  }
  get CardCameraId() {
    return this.cardcameraid();
  }
  __init(t, e) {
    return (this.z7 = t), (this.J7 = e), this;
  }
  static getRootAsRoleBirthday(t, e) {
    return (e || new RoleBirthday()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  priority() {
    var t = this.J7.__offset(this.z7, 6);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  name(t) {
    var e = this.J7.__offset(this.z7, 8),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  cardtextkey(t) {
    var e = this.J7.__offset(this.z7, 10),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  voiceevent(t) {
    var e = this.J7.__offset(this.z7, 12),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  scenecameraid(t) {
    var e = this.J7.__offset(this.z7, 14),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
  cardcameraid(t) {
    var e = this.J7.__offset(this.z7, 16),
      e = e ? this.J7.__string(this.z7 + e, t) : null;
    return (
      "string" == typeof e &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(e),
      e
    );
  }
}
exports.RoleBirthday = RoleBirthday;
//# sourceMappingURL=RoleBirthday.js.map
