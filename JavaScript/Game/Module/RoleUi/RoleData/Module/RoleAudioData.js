"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleAudioData = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  RoleModuleDataBase_1 = require("./RoleModuleDataBase");
class RoleAnimAudioData {
  constructor(e, a) {
    (this.CanInterrupt = e), (this.AudioPath = a);
  }
}
class RoleAudioData extends RoleModuleDataBase_1.RoleModuleDataBase {
  constructor(e) {
    super(e), (this.j1o = new Map()), this.W1o();
  }
  W1o() {
    var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleAudioMap(
      this.RoleId,
    );
    if (e)
      for (const t of e) {
        var a = new RoleAnimAudioData(t.CanInterrupt, t.AudioPath);
        this.j1o.set(t.ActionName, a);
      }
  }
  GetAudioPathByName(e) {
    if (this.j1o) return this.j1o.get(e);
  }
}
exports.RoleAudioData = RoleAudioData;
//# sourceMappingURL=RoleAudioData.js.map
