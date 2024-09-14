"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowAttached = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController"),
  InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowAttached extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceRootView");
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
exports.InstanceDungeonEntranceFlowAttached =
  InstanceDungeonEntranceFlowAttached;
//# sourceMappingURL=InstanceDungeonEntranceFlowAttached.js.map
