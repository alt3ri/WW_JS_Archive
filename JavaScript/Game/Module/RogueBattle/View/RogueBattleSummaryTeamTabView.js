"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleSummaryTeamTabView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  RogueBattleMapRoleAttrInfo_1 = require("../Component/RogueBattleMapRoleAttrInfo"),
  RogueBattleSummaryRoleItem_1 = require("../Component/RogueBattleSummaryRoleItem");
class RogueBattleSummaryTeamTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.aI1 = 0),
      (this.SC1 = void 0),
      (this.TSn = void 0),
      (this.sI1 = () => {
        var e = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          this.aI1,
        );
        RoleController_1.RoleController.OnSelectedRoleChange(
          this.aI1,
          e.SkinId,
        );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  async OnBeforeStartAsync() {
    (this.SC1 =
      new RogueBattleMapRoleAttrInfo_1.RogueBattleMapRoleAttributeItem()),
      await this.SC1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      this.AddChild(this.SC1),
      (this.TSn =
        new RogueBattleSummaryRoleItem_1.RogueBattleSummaryRoleItem()),
      await this.TSn.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      this.AddChild(this.TSn);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain,
      this.sI1,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResMapSummaryTeamShowAgain,
      this.sI1,
    );
  }
  OnBeforeShow() {
    var e =
      ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()[0].GetConfigId;
    (this.aI1 = e), this.sI1(), this.SC1?.Refresh(e);
  }
  OnBeforeDestroy() {
    (this.SC1 = void 0), (this.TSn = void 0);
  }
}
exports.RogueBattleSummaryTeamTabView = RogueBattleSummaryTeamTabView;
//# sourceMappingURL=RogueBattleSummaryTeamTabView.js.map
