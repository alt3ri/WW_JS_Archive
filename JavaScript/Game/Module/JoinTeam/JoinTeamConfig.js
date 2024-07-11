"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.JoinTeamConfig = void 0);
const RoleDescriptionById_1 = require("../../../Core/Define/ConfigQuery/RoleDescriptionById");
const RoleInfoById_1 = require("../../../Core/Define/ConfigQuery/RoleInfoById");
const ConfigBase_1 = require("../../../Core/Framework/ConfigBase");
class JoinTeamConfig extends ConfigBase_1.ConfigBase {
  GetRoleDescriptionConfig(e) {
    return RoleDescriptionById_1.configRoleDescriptionById.GetConfig(e);
  }
  GetRoleConfig(e) {
    return RoleInfoById_1.configRoleInfoById.GetConfig(e);
  }
  GetRoleNameId(e) {
    var e = this.GetRoleDescriptionConfig(e);
    if (e) return (e = e.RoleId), this.GetRoleConfig(e).Name;
  }
  GetRoleTexturePath(e) {
    e = this.GetRoleDescriptionConfig(e);
    if (e) return e.Texture;
  }
  GetRoleDescriptionId(e) {
    e = this.GetRoleDescriptionConfig(e);
    if (e) return e.Description;
  }
  GetRoleElementId(e) {
    var e = this.GetRoleDescriptionConfig(e);
    if (e) return (e = e.RoleId), this.GetRoleConfig(e).ElementId;
  }
  GetRoleConfigId(e) {
    e = this.GetRoleDescriptionConfig(e);
    if (e) return e.RoleId;
  }
}
exports.JoinTeamConfig = JoinTeamConfig;
// # sourceMappingURL=JoinTeamConfig.js.map
