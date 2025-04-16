"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleTrialRoleConfig = void 0);
const GameUtils_1 = require("../../../Game/GameUtils");
class RoleTrialRoleConfig {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get RoleId() {
    return this.roleid();
  }
  get RoleStand() {
    return this.rolestand();
  }
  get RoleStand2() {
    return this.rolestand2();
  }
  get RoleIcon() {
    return this.roleicon();
  }
  get UiConfigId() {
    return this.uiconfigid();
  }
  get Introduction() {
    return this.introduction();
  }
  __init(t, i) {
    return (this.z7 = t), (this.J7 = i), this;
  }
  static getRootAsRoleTrialRoleConfig(t, i) {
    return (i || new RoleTrialRoleConfig()).__init(
      t.readInt32(t.position()) + t.position(),
      t,
    );
  }
  roleid() {
    var t = this.J7.__offset(this.z7, 4);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  rolestand(t) {
    var i = this.J7.__offset(this.z7, 6),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  rolestand2(t) {
    var i = this.J7.__offset(this.z7, 8),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  roleicon(t) {
    var i = this.J7.__offset(this.z7, 10),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
  uiconfigid() {
    var t = this.J7.__offset(this.z7, 12);
    return t ? this.J7.readInt32(this.z7 + t) : 0;
  }
  introduction(t) {
    var i = this.J7.__offset(this.z7, 14),
      i = i ? this.J7.__string(this.z7 + i, t) : null;
    return (
      "string" == typeof i &&
        GameUtils_1.GameUtils.IsOptimizeDbString &&
        GameUtils_1.GameUtils.InternalizedString(i),
      i
    );
  }
}
exports.RoleTrialRoleConfig = RoleTrialRoleConfig;
//# sourceMappingURL=RoleTrialRoleConfig.js.map
