"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowFarmGold = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  FarmGoldController_1 = require("../../Activity/ActivityContent/FarmGold/FarmGoldController"),
  FarmGoldData_1 = require("../../Activity/ActivityContent/FarmGold/FarmGoldData"),
  EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
  InstanceDungeonController_1 = require("../InstanceDungeonController"),
  InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowFarmGold extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      FarmGoldController_1.FarmGoldController.OpenDefaultFarmGoldView();
    }),
      this.AddStep(() => {
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
          !1,
          !0,
        );
      }),
      this.AddStep(() => {
        var e =
            ModelManager_1.ModelManager.EditBattleTeamModel
              .GetOwnRoleConfigIdList[0],
          n = FarmGoldData_1.FarmGoldData.CurrentSelectEntranceId;
        InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
          e,
          n,
          0,
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel
            .TransitionOption,
          ModelManager_1.ModelManager.TowerDefenseModel.GetProtocolPhantomIdList(
            e,
          ),
        );
      });
  }
}
exports.InstanceDungeonEntranceFlowFarmGold =
  InstanceDungeonEntranceFlowFarmGold;
//# sourceMappingURL=InstanceDungeonEntranceFlowFarmGold.js.map
