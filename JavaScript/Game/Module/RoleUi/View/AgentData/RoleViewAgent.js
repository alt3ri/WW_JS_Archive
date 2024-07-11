"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleViewAgent = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RoleUiDefine_1 = require("../../RoleUiDefine");
class RoleViewAgent {
  constructor() {
    (this.RoleIdList = []),
      (this.CurSelectTabName = void 0),
      (this.CurSelectRoleId = 0),
      (this.RoleViewStateInternal = 0);
  }
  Init(e, t, r) {
    (this.RoleIdList = e),
      (this.CurSelectRoleId = t),
      (this.CurSelectTabName = r);
  }
  GetRoleIdList() {
    return this.RoleIdList.length <= 0
      ? ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList()
      : this.RoleIdList;
  }
  GetCurSelectRoleId() {
    return (
      this.CurSelectRoleId <= 0 &&
        (this.CurSelectRoleId = this.GetDefaultSelectRoleId()),
      this.CurSelectRoleId
    );
  }
  GetDefaultSelectRoleId() {
    let e;
    return this.RoleIdList.length > 0
      ? this.RoleIdList[0]
      : void 0 !==
          (e = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId())
        ? e
        : (e = ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList())
              .length <= 0
          ? (Log_1.Log.CheckError() &&
              Log_1.Log.Error("Role", 59, "取不到角色数据！"),
            0)
          : e[0];
  }
  SetCurSelectRoleId(e) {
    this.CurSelectRoleId = e;
  }
  GetCurSelectRoleData() {
    const e = this.GetCurSelectRoleId();
    return ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e);
  }
  set RoleViewState(e) {
    this.RoleViewStateInternal = e;
  }
  get RoleViewState() {
    return this.RoleViewStateInternal;
  }
  GetRoleSystemMode() {
    return this.GetCurSelectRoleData().IsTrialRole() ? 0 : 1;
  }
  GetRoleSystemUiParams() {
    const e = this.GetRoleSystemMode();
    return RoleUiDefine_1.roleSystemModeUiParam[e];
  }
  GetCurSelectTabName() {
    return this.CurSelectTabName;
  }
  GetRoleTabDataList() {
    const e = this.GetRoleSystemMode();
    return ModelManager_1.ModelManager.RoleModel.GetRoleTabListByUiParam(e);
  }
  GetCurRoleResonanceGroupIndex() {
    const e = this.GetCurSelectRoleData();
    return ModelManager_1.ModelManager.RoleModel.GetRoleResonanceGroupIndex(e);
  }
  GetCurRoleResonanceConfigList() {
    const e = this.GetCurSelectRoleData();
    return ModelManager_1.ModelManager.RoleModel.GetRoleResonanceConfigList(e);
  }
}
exports.RoleViewAgent = RoleViewAgent;
// # sourceMappingURL=RoleViewAgent.js.map
