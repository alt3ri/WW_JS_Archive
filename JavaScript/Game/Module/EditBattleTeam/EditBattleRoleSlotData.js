"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditBattleRoleSlotData = void 0);
const ModelManager_1 = require("../../Manager/ModelManager");
const EditBattleRoleData_1 = require("./EditBattleRoleData");
class EditBattleRoleSlotData {
  constructor(t) {
    (this.wnt = void 0), (this.cC = t);
  }
  SetRoleData(t) {
    this.wnt = t;
  }
  SetRoleDataByPrewarInfo(t) {
    const e = t.GetConfigId();
    const a = t.GetOnlineNumber();
    const i = t.GetPlayerName();
    const o = t.GetPlayerId();
    const r = t.GetLevel();
    const s = t.IsSelf();
    var t = t.GetIsReady();
    this.wnt || (this.wnt = new EditBattleRoleData_1.EditBattleRoleData()),
      this.wnt.Init(o, e, a, i, r, s, t);
  }
  ResetRoleData() {
    this.wnt = void 0;
  }
  get GetRoleData() {
    return this.wnt;
  }
  get GetRoleConfigId() {
    const t = this.GetRoleData;
    if (t) return t.ConfigId;
  }
  get HasRole() {
    return void 0 !== this.GetRoleData;
  }
  get GetPosition() {
    return this.cC;
  }
  get IsProhibit() {
    let t;
    let e = ModelManager_1.ModelManager.EditBattleTeamModel;
    return (
      !e.IsMultiInstanceDungeon &&
      (e.GetLeaderIsSelf
        ? ((t = this.GetPosition),
          (e = e.GetMaxLimitRoleCount()) !== 0 && e < t)
        : !this.HasRole || !this.GetRoleData.IsSelf)
    );
  }
  get CanEditRoleSlot() {
    return (
      !this.IsProhibit &&
      (this.HasRole
        ? this.GetRoleData.IsSelf
        : ModelManager_1.ModelManager.EditBattleTeamModel.GetLeaderIsSelf)
    );
  }
}
exports.EditBattleRoleSlotData = EditBattleRoleSlotData;
// # sourceMappingURL=EditBattleRoleSlotData.js.map
