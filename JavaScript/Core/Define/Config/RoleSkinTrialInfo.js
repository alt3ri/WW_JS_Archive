"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSkinTrialInfo = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleSkinTrialInfo {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get RoleId() {
    return this.roleid();
  }
  get TrialRoleId() {
    return this.trialroleid();
  }
  get PreviewSkinId() {
    return this.previewskinid();
  }
  get InstanceId() {
    return this.instanceid();
  }
  get AccessId() {
    return this.accessid();
  }
  get DropId() {
    return this.dropid();
  }
  get RoleIcon() {
    return this.roleicon();
  }
  get Introduction() {
    return this.introduction();
  }
  get UiConfigId() {
    return this.uiconfigid();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRoleSkinTrialInfo(t, i) {
    return (i || new RoleSkinTrialInfo()).__init(
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
  trialroleid() {
    var t = this.J7.__offset(this.z7, 8);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  previewskinid() {
    var t = this.J7.__offset(this.z7, 10);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  instanceid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  accessid() {
    var t = this.J7.__offset(this.z7, 14);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  dropid() {
    var t = this.J7.__offset(this.z7, 16);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  roleicon(t) {
    var i = this.J7.__offset(this.z7, 18),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  introduction(t) {
    var i = this.J7.__offset(this.z7, 20),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  uiconfigid() {
    var t = this.J7.__offset(this.z7, 22);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
}
exports.RoleSkinTrialInfo = RoleSkinTrialInfo;
//# sourceMappingURL=RoleSkinTrialInfo.js.map
