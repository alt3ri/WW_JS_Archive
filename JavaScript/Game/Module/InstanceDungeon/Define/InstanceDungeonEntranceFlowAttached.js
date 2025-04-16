"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowAttached = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController"),
  MowingInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/MowingInstanceDungeonViewModel"),
  InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowAttached extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      var e =
        new MowingInstanceDungeonViewModel_1.MowingInstanceDungeonViewModel();
      UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView", e);
    }),
      this.AddStep(() => {
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
        );
      }),
      this.AddStep(() => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.EnterInstanceDungeon().then(
          (e) => {
            EditBattleTeamController_1.EditBattleTeamController.CloseEditBattleTeamView(),
              e ? this.Reset() : this.RevertStep();
          },
          () => {},
        );
      });
  }
}
exports.InstanceDungeonEntranceFlowAttached =
  InstanceDungeonEntranceFlowAttached;
//# sourceMappingURL=InstanceDungeonEntranceFlowAttached.js.map
