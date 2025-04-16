"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleSettleInfoRoleGrid = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
class RogueBattleSettleInfoRoleGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, t) {
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(e.Uac.Ud1);
    i
      ? ((i = {
          Type: 2,
          ItemConfigId: e.Uac.Ud1,
          SkinId: i.GetRoleSkinId(),
          ElementId: i.GetElementInfo().Id,
          Data: e,
          IsTrialRoleVisible: i.IsTrialRole(),
        }),
        this.Apply(i),
        (i = this.RefreshComponent(
          RogueBattleSettleInfoRoleGridLevelComponent,
          !0,
          e,
        )),
        this.SetComponentVisible(i, !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("RogueBattle", 34, "刷新角色信息失败，角色配置不存在", [
          "ConfigId:",
          e.Uac.Ud1,
        ]);
  }
}
exports.RogueBattleSettleInfoRoleGrid = RogueBattleSettleInfoRoleGrid;
class RogueBattleSettleInfoRoleGridLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  GetResourceId() {
    return "UiItem_ItemRoleInfo";
  }
  OnRefresh(e) {
    this.GetText(0)?.SetText(""),
      this.GetText(3)?.SetText(e.Uac.F6n.toString());
  }
}
//# sourceMappingURL=RogueBattleSettleInfoRoleGrid.js.map
