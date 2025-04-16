"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerHeadData = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
class PlayerHeadData {
  constructor(t) {
    (this.Id = void 0),
      (this.Config = void 0),
      (this.d3l = !0),
      (this.m3l = void 0),
      (this.Id = t.Id),
      0 < (this.Config = t).RoleSkinId &&
        (this.m3l = ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinData(
          t.RoleSkinId,
        ));
  }
  set Lock(t) {
    this.d3l = t;
  }
  get Lock() {
    return this.d3l;
  }
  GetName() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).Name;
  }
  GetRoleHeadIconLarge() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config)
      .RoleHeadIconLarge;
  }
  GetRoleHeadIcon() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).RoleHeadIcon;
  }
  GetRoleCardHeadIcon() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config).Card;
  }
  GetRoleHeadIconCircle() {
    return (this.m3l ? this.m3l.GetRoleSkinConfig() : this.Config)
      .RoleHeadIconCircle;
  }
}
exports.PlayerHeadData = PlayerHeadData;
//# sourceMappingURL=PlayerHeadData.js.map
