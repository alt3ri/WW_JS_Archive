"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowNormal = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiManager_1 = require("../../../Ui/UiManager");
const EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController");
const InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController");
const InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowNormal extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView");
    }),
      this.AddStep(() => {
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
        );
      }),
      this.AddStep(() => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterInstanceDungeon()
          .then(
            (e) => {
              e &&
                EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView();
            },
            () => {},
          )
          .finally(() => {
            this.Reset();
          });
      });
  }
}
exports.InstanceDungeonEntranceFlowNormal = InstanceDungeonEntranceFlowNormal;
// # sourceMappingURL=InstanceDungeonEntranceFlowNormal.js.map
