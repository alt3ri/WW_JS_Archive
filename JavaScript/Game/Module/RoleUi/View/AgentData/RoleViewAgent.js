"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleViewAgent = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RoleUiDefine_1 = require("../../RoleUiDefine");
class RoleViewAgent {
  constructor() {
    (this.RoleIdList = []),
      (this.CurSelectTabName = void 0),
      (this.CurSelectRoleId = 0),
      (this.RoleViewStateInternal = 0),
      (this.TeamPositionType = void 0);
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
  CheckMainRoleToIdList(e) {
    var t;
    this.RoleIdList.length &&
      !this.RoleIdList.includes(e) &&
      ModelManager_1.ModelManager.RoleModel?.IsMainRole(e) &&
      -1 !==
        (t = this.RoleIdList.findIndex((e) =>
          ModelManager_1.ModelManager.RoleModel?.IsMainRole(e),
        )) &&
      (this.RoleIdList[t] = e);
  }
  GetCurSelectRoleId() {
    var e = this.GetRoleIdList().includes(this.CurSelectRoleId);
    return (
      (this.CurSelectRoleId <= 0 || !e) &&
        (this.CurSelectRoleId = this.GetDefaultSelectRoleId()),
      this.CurSelectRoleId
    );
  }
  GetDefaultSelectRoleId() {
    var e, t;
    return 0 < this.RoleIdList.length
      ? this.RoleIdList[0]
      : ((e = ModelManager_1.ModelManager.RoleModel.GetBattleTeamFirstRoleId()),
        (t = ModelManager_1.ModelManager.RoleModel.GetRoleSystemRoleList()),
        void 0 !== e && t.includes(e)
          ? e
          : t.length <= 0
            ? (Log_1.Log.CheckError() &&
                Log_1.Log.Error("Role", 58, "取不到角色数据！"),
              0)
            : t[0]);
  }
  SetCurSelectRoleId(e) {
    this.CurSelectRoleId = e;
  }
  GetCurSelectRoleData() {
    var e = this.GetCurSelectRoleId();
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
    var e = this.GetRoleSystemMode();
    return RoleUiDefine_1.roleSystemModeUiParam[e];
  }
  GetCurSelectTabName() {
    return this.CurSelectTabName;
  }
  GetRoleTabDataList() {
    var e = this.GetRoleSystemMode();
    return ModelManager_1.ModelManager.RoleModel.GetRoleTabListByUiParam(e);
  }
  GetCurRoleResonanceGroupIndex() {
    var e = this.GetCurSelectRoleData();
    return ModelManager_1.ModelManager.RoleModel.GetRoleResonanceGroupIndex(e);
  }
  GetCurRoleResonanceConfigList() {
    var e = this.GetCurSelectRoleData();
    return ModelManager_1.ModelManager.RoleModel.GetRoleResonanceConfigList(e);
  }
}
exports.RoleViewAgent = RoleViewAgent;
//# sourceMappingURL=RoleViewAgent.js.map
