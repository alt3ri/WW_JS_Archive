"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CooperationController = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  InputMappingsDefine_1 = require("../../../Ui/InputDistribute/InputMappingsDefine"),
  FormationDataController_1 = require("../../Abilities/FormationDataController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
class CooperationController {
  static TryCooperate(e) {
    if (ModelManager_1.ModelManager.SceneTeamModel.ChangingRole)
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 48, "在换人请求返回前尝试换人");
    else {
      var o = ModelManager_1.ModelManager.SceneTeamModel,
        r = o.GetCurrentTeamItem,
        a = r?.EntityHandle;
      if (a && r.GetCreatureDataId() !== e) {
        var n = o.GetTeamItem(e, { ParamType: 3 });
        if (n?.EntityHandle)
          if (n.IsMyRole()) {
            a = a.Entity.CheckGetComponent(203);
            if (a.HasTag(1008164187))
              n.IsDead() &&
                ControllerHolder_1.ControllerHolder.DeadReviveController.TryReviveRoleWhenCurrentRoleDead(
                  n.GetCreatureDataId(),
                  n.GetConfigId,
                );
            else if (!a.HasTag(191377386)) {
              var l = ModelManager_1.ModelManager.TowerModel.CheckInTower(),
                t =
                  ModelManager_1.ModelManager.ShipTowerModel.CheckInBattleShipTower(),
                t = l || t;
              if (a.HasTag(-1697149502))
                t &&
                  !FormationDataController_1.FormationDataController
                    .GlobalIsInFight &&
                  ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                    "CannotChangeRoleBeforeStartBattle",
                  );
              else {
                a = o.CurrentGroupType;
                if (-1 !== a && 3 !== a)
                  return n.IsDead()
                    ? ModelManager_1.ModelManager.SceneTeamModel.IsAllDid() || l
                      ? void (
                          l &&
                          ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                            "InstanceDungeonShieldViewCantOpen",
                          )
                        )
                      : void ControllerHolder_1.ControllerHolder.DeadReviveController.TryReviveRole(
                          n.GetCreatureDataId(),
                          n.GetConfigId,
                        )
                    : void (0 !== (t = n.CanGoBattle())
                        ? Log_1.Log.CheckInfo() &&
                          Log_1.Log.Info(
                            "SceneTeam",
                            48,
                            "上场角色无法换人",
                            ["Result", t],
                            ["roleId", n.GetConfigId],
                          )
                        : this.n7a(r, n));
                Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "SceneTeam",
                    48,
                    "当前正在幻象组或剧情组，不能切角色",
                  );
              }
            }
          } else
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 48, "上场角色为其他玩家的角色", [
                "CreatureDataId",
                e,
              ]),
              n.IsDead()
                ? ControllerHolder_1.ControllerHolder.DeadReviveController.CheckOtherPlayerReviveCooldown(
                    n.GetPlayerId(),
                    n.GetCreatureDataId(),
                  )
                : this.n7a(r, n);
        else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("SceneTeam", 48, "上场角色实体不存在", [
              "CreatureDataId",
              e,
            ]);
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 48, "下场角色实体不存在或相同", [
            "CreatureDataId",
            e,
          ]);
    }
  }
  static n7a(e, o) {
    for (const r of ModelManager_1.ModelManager.CooperationModel.GetHandlers())
      if (r.Trigger(e, o)) break;
  }
}
(exports.CooperationController = CooperationController).FormationInputHandler =
  (e) => {
    let o = -1;
    switch (e) {
      case InputMappingsDefine_1.actionMappings.切换角色1:
        o = 1;
        break;
      case InputMappingsDefine_1.actionMappings.切换角色2:
        o = 2;
        break;
      case InputMappingsDefine_1.actionMappings.切换角色3:
        o = 3;
        break;
      case InputMappingsDefine_1.actionMappings.切换角色4:
        o = 4;
    }
    o < 0 ||
      ((e =
        ModelManager_1.ModelManager.BattleUiModel.FormationPanelData?.GetItemData(
          o,
        )?.CreatureDataId ?? 0),
      CooperationController.TryCooperate(e));
  };
//# sourceMappingURL=CooperationController.js.map
