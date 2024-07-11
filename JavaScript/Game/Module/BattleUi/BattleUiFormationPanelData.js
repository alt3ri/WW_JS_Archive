"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BattleUiFormationPanelData = exports.FormationItemData = void 0);
const ControllerHolder_1 = require("../../Manager/ControllerHolder"),
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
    (this.PlayerId = 0), (this.RoleId = 0), (this.CreatureDataId = 0);
  }
}
exports.FormationItemData = FormationItemData;
class BattleUiFormationPanelData {
  constructor() {
    this.PositionItemMap = new Map();
  }
  Init() {}
  Clear() {
    this.PositionItemMap.clear();
  }
  UpdateFormationPanelData() {
    this.PositionItemMap.clear();
    let e = 1;
    var t = ModelManager_1.ModelManager.GameModeModel.IsMulti,
      a =
        !ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance() &&
        t,
      r = ModelManager_1.ModelManager.PlayerInfoModel.GetId() ?? 0;
    for (const p of t
      ? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
      : [r]) {
      var n =
        ModelManager_1.ModelManager.SceneTeamModel.GetTeamItemsByPlayer(p);
      if (0 === n.length && a) {
        var o =
          ModelManager_1.ModelManager.OnlineModel.GetWorldTeamPlayerFightInfo(
            p,
          )?.RoleInfos;
        if (o)
          for (const M of o) {
            var i = M.RoleId,
              s = new FormationItemData();
            (s.PlayerId = p),
              (s.RoleId = i),
              this.PositionItemMap.set(e, s),
              e++;
          }
      } else
        for (const u of n) {
          var l = new FormationItemData();
          (l.PlayerId = p),
            (l.RoleId = u.GetConfigId),
            (l.CreatureDataId = u.GetCreatureDataId()),
            this.PositionItemMap.set(e, l),
            e++;
        }
    }
  }
  GetItemData(e) {
    return this.PositionItemMap.get(e);
  }
  GetRolePosition(e, t) {
    for (var [a, r] of this.PositionItemMap)
      if (r.PlayerId === e && r.RoleId === t) return a;
    return 0;
  }
  GetActionNames() {
    return actionNames;
  }
}
exports.BattleUiFormationPanelData = BattleUiFormationPanelData;
//# sourceMappingURL=BattleUiFormationPanelData.js.map
