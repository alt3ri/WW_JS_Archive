"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowTowerDefense = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
  TowerDefenceController_1 = require("../../TowerDefence/TowerDefenceController"),
  InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowTowerDefense extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(!0),
        UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView");
    }),
      this.AddStep(() => {
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
        ),
          TowerDefenceController_1.TowerDefenseController.SetPhantomViewOpened(
            !1,
          );
      }),
      this.AddStep(() => {
        TowerDefenceController_1.TowerDefenseController.EnterTowerDefense()
          .then((e) => {
            e &&
              EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
          })
          .finally(() => {
            this.Reset(),
              TowerDefenceController_1.TowerDefenseController.SetIsUiFlowOpen(
                !1,
              );
          });
      });
  }
}
exports.InstanceDungeonEntranceFlowTowerDefense =
  InstanceDungeonEntranceFlowTowerDefense;
//# sourceMappingURL=InstanceDungeonEntranceFlowTowerDefence.js.map
