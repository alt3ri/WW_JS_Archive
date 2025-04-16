"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapRoleLayoutGrid =
    exports.MediumItemGridRogueRoleLevelComponent =
      void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  MediumItemGridComponent_1 = require("../../Common/MediumItemGrid/MediumItemGridComponent/MediumItemGridComponent");
class MediumItemGridRogueRoleLevelComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
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
    var o = e.ConfigId,
      t = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(o);
    this.SetActive(t),
      t &&
        ((t = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(o)),
        (o = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(t)),
        e.NeedLevel
          ? this.GetText(0)?.SetText(
              "Lv." +
                ModelManager_1.ModelManager.MapRogueModel.GetRogueRoleLevel(),
            )
          : this.GetText(0)?.SetText(""),
        this.GetText(3)?.SetText(o.F6n.toString()));
  }
}
exports.MediumItemGridRogueRoleLevelComponent =
  MediumItemGridRogueRoleLevelComponent;
class RogueBattleMapRoleLayoutGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Wst = void 0);
  }
  OnRefresh(e, o, t) {
    var i = !(this.Wst = e).IsGain,
      n = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e.ConfigId),
      r = ModelManager_1.ModelManager.RogueBattleModel.GetRoleIsRogueTrial(
        e.ConfigId,
      );
    i
      ? ((i = ModelManager_1.ModelManager.RogueBattleModel.GetRoleCantGet(
          e.ConfigId,
        )),
        (i = {
          Type: 2,
          ItemConfigId: e.ConfigId,
          SkinId: n.SkinId,
          BottomTextId: i ? "RogueResRole_Unable" : "RogueRes_Overall_Role_9",
          ElementId: n.ElementId,
          Data: e,
          IsDisable: !0,
          IsTrialRoleVisible: r,
        }),
        this.Apply(i))
      : ((i = {
          Type: 2,
          ItemConfigId: e.ConfigId,
          SkinId: n.SkinId,
          ElementId: n.ElementId,
          Data: e,
          IsTrialRoleVisible: r,
        }),
        this.Apply(i)),
      this.SetBottomStarTextVisible(e);
  }
  SetBottomStarTextVisible(e) {
    this.RefreshComponent(MediumItemGridRogueRoleLevelComponent, !0, e);
  }
  OnExtendToggleClicked() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
      this.Wst.ConfigId,
    );
  }
}
exports.RogueBattleMapRoleLayoutGrid = RogueBattleMapRoleLayoutGrid;
//# sourceMappingURL=RogueBattleMapRoleListGrid.js.map
