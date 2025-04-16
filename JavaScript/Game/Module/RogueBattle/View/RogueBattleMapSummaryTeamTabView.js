"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapSummaryTeamTabView = void 0);
const UE = require("ue"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  RogueBattleMapRoleAttrInfo_1 = require("../Component/RogueBattleMapRoleAttrInfo"),
  RogueBattleMapRoleListPanel_1 = require("../Component/RogueBattleMapRoleListPanel");
class RogueBattleMapSummaryTeamTabView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments), (this.SC1 = void 0), (this.Vlo = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  AddEventListener() {
    this.SC1.BindEvent(), this.Vlo.BindEvent();
  }
  RemoveEventListener() {
    this.SC1.UnbindEvent(), this.Vlo.UnbindEvent();
  }
  OnAfterShow() {
    this.UiViewSequence.PlaySequence("Start");
  }
  async OnBeforeStartAsync() {
    (this.SC1 =
      new RogueBattleMapRoleAttrInfo_1.RogueBattleMapRoleAttributeItem()),
      await this.SC1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.Vlo =
        new RogueBattleMapRoleListPanel_1.RogueBattleMapRoleListPanel()),
      await this.Vlo.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  OnBeforeDestroy() {
    (this.SC1 = void 0), (this.Vlo = void 0);
  }
}
exports.RogueBattleMapSummaryTeamTabView = RogueBattleMapSummaryTeamTabView;
//# sourceMappingURL=RogueBattleMapSummaryTeamTabView.js.map
