"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowNormal = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  UiManager_1 = require("../../../Ui/UiManager"),
  EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
  InstanceDungeonEntranceController_1 = require("../InstanceDungeonEntranceController"),
  BaseInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/BaseInstanceDungeonViewModel"),
  SolarSpeedInstanceDungeonViewModel_1 = require("../InstanceDungeonViewModel/SolarSpeedInstanceDungeonViewModel"),
  InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowNormal extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      var e =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.EntranceId;
      let n = void 0;
      (n = new (
        9e3 === e
          ? SolarSpeedInstanceDungeonViewModel_1.SolarSpeedInstanceDungeonViewModel
          : BaseInstanceDungeonViewModel_1.BaseInstanceDungeonViewModel
      )()),
        UiManager_1.UiManager.OpenView("InstanceDungeonEntranceView", n);
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
exports.InstanceDungeonEntranceFlowNormal = InstanceDungeonEntranceFlowNormal;
//# sourceMappingURL=InstanceDungeonEntranceFlowNormal.js.map
