"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.InstanceDungeonEntranceFlowAbyss = void 0);
const ModelManager_1 = require("../../../Manager/ModelManager"),
  EditBattleTeamController_1 = require("../../EditBattleTeam/EditBattleTeamController"),
  InstanceDungeonController_1 = require("../InstanceDungeonController"),
  InstanceDungeonEntranceFlowBase_1 = require("./InstanceDungeonEntranceFlowBase");
class InstanceDungeonEntranceFlowAbyss extends InstanceDungeonEntranceFlowBase_1.InstanceDungeonEntranceFlowBase {
  OnCreate() {
    this.AddStep(() => {
      ModelManager_1.ModelManager.DangoAbyssModel.InitCacheDangoOwnerMap(),
        ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(!0),
        EditBattleTeamController_1.EditBattleTeamController.PlayerOpenEditBattleTeamView(
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId,
          !1,
          !0,
        );
    }),
      this.AddStep(() => {
        ModelManager_1.ModelManager.DangoAbyssModel.SetInAbyssFlow(!1);
        var e =
          ModelManager_1.ModelManager.EditBattleTeamModel
            .GetOwnRoleConfigIdList[0];
        const n = ModelManager_1.ModelManager.PlayerInfoModel.GetId(),
          o = {};
        e.forEach((e) => {
          var a =
            ModelManager_1.ModelManager.DangoAbyssModel.GetPlayerRoleCfgOwnerData(
              n,
              e,
            );
          o[e.toString()] = a ? a.DangoId : 0;
        });
        var a = { fsc: o },
          a =
            (ModelManager_1.ModelManager.DangoAbyssModel.SaveCacheDangoOwnerMap(),
            (ModelManager_1.ModelManager.InstanceDungeonModel.InstanceEnterContentText.Qsc =
              a),
            ModelManager_1.ModelManager.DangoAbyssModel
              .CurrentSelectEntranceId),
          r =
            ModelManager_1.ModelManager.InstanceDungeonEntranceModel.InstanceId;
        this.K2c(r, e, a);
      });
  }
  async K2c(e, a, n) {
    (await InstanceDungeonController_1.InstanceDungeonController.PrewarTeamFightRequest(
      e,
      a,
      n,
      0,
      void 0,
      void 0,
    ))
      ? (ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
          9,
          5,
          !0,
        ),
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
          9,
          7,
          !0,
        ),
        ModelManager_1.ModelManager.BattleUiModel.ChildViewData?.SetChildVisible(
          9,
          8,
          !0,
        ),
        ModelManager_1.ModelManager.DangoAbyssModel.SaveFormationSelectRole(
          ModelManager_1.ModelManager.DangoAbyssModel.CurrentSelectChallengeId,
          a,
        ),
        ModelManager_1.ModelManager.EditBattleTeamModel.SetInstanceDungeonId(
          void 0,
        ))
      : this.RevertStep();
  }
}
exports.InstanceDungeonEntranceFlowAbyss = InstanceDungeonEntranceFlowAbyss;
//# sourceMappingURL=InstanceDungeonEntranceFlowAbyss.js.map
