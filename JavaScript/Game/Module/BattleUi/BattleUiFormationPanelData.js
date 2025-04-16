"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiFormationPanelData = exports.FormationItemData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../../Ui/InputDistribute/InputMappingsDefine"),
  actionNames = [
    InputMappingsDefine_1.actionMappings.切换角色1,
    InputMappingsDefine_1.actionMappings.切换角色2,
    InputMappingsDefine_1.actionMappings.切换角色3,
    InputMappingsDefine_1.actionMappings.切换角色4,
  ];
class FormationItemData {
  constructor() {
    (this.PlayerId = 0),
      (this.RoleId = 0),
      (this.RoleSkinId = 0),
      (this.CreatureDataId = 0);
  }
}
exports.FormationItemData = FormationItemData;
class BattleUiFormationPanelData {
  constructor() {
    (this.HIt = void 0),
      (this.Nk_ = new Map()),
      (this.PositionItemMap = new Map());
  }
  Init() {}
  Clear() {
    this.PositionItemMap.clear();
  }
  UpdateFormationPanelData() {
    this.PositionItemMap.clear();
    var e = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0,
      t =
        !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance();
    for (const p of ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
      : [e]) {
      var a = p === e,
        o = ModelManager_1.ModelManager.SceneTeamModel.GetTeamPlayerData(p);
      if (o) {
        o = o.GetGroup(1)?.GetRoleList();
        if (o)
          if (a)
            for (const M of o) {
              var r = M.RoleId,
                n =
                  ModelManager_1.ModelManager.RoleSkinModel.GetRoleSkinIdByRoleId(
                    r,
                  );
              this.PAl(p, r, n, M.CreatureDataId);
            }
          else {
            var i =
              ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
                p,
              );
            for (const u of o) {
              var s = u.RoleId,
                l = i?.GetRoleInfoByConfigId(s)?.RoleSkinId ?? 0;
              this.PAl(p, s, l, u.CreatureDataId);
            }
          }
      } else if (!a && t) {
        o =
          ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
            p,
          )?.RoleInfos;
        if (o) for (const d of o) this.PAl(p, d.RoleId, d.RoleSkinId);
      }
    }
  }
  PAl(e, t, a, o = void 0) {
    var r = this.PositionItemMap.size + 1,
      n = new FormationItemData();
    (n.PlayerId = e),
      (n.RoleId = t),
      (n.RoleSkinId = a),
      void 0 !== o && (n.CreatureDataId = o),
      this.PositionItemMap.set(r, n);
  }
  GetItemData(e) {
    return this.PositionItemMap.get(e);
  }
  GetRolePosition(e, t) {
    for (var [a, o] of this.PositionItemMap)
      if (o.PlayerId === e && o.RoleId === t) return a;
    return 0;
  }
  GetActionNames() {
    return actionNames;
  }
  SetInputType(e) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Battle", 48, "切换编队ActionInputHandler", ["type", e]),
      (this.HIt = this.Nk_.get(e));
  }
  RegisterInputHandler(e, t) {
    this.Nk_.set(e, t);
  }
  GetInputHandler() {
    return this.HIt;
  }
}
exports.BattleUiFormationPanelData = BattleUiFormationPanelData;
//# sourceMappingURL=BattleUiFormationPanelData.js.map
