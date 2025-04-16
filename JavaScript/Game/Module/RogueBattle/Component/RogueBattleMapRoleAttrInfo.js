"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapRoleAttributeItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  RoleController_1 = require("../../RoleUi/RoleController"),
  RoleDefine_1 = require("../../RoleUi/RoleDefine"),
  RogueBattleMapRoleAttrBuffItem_1 = require("./RogueBattleMapRoleAttrBuffItem"),
  RogueBattleMapRoleAttrFettersItem_1 = require("./RogueBattleMapRoleAttrFettersItem"),
  RogueBattleMapRoleAttrNameItem_1 = require("./RogueBattleMapRoleAttrNameItem");
class RogueBattleMapRoleAttributeItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.gC1 = void 0),
      (this.CC1 = void 0),
      (this.ySn = void 0),
      (this.p5t = () => {
        var e = !ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(
          this.dFe,
        );
        if (!e) {
          var t,
            i = [];
          for (const o of ModelManager_1.ModelManager.RogueBattleModel
            .SummaryRoleList)
            o >= RoleDefine_1.ROBOT_DATA_MIN_ID
              ? i.push(o)
              : ((t =
                  ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(
                    o,
                  )),
                i.push(t.TrialRoleId));
          RoleController_1.RoleController.OpenRoleMainView(1, this.dFe, i);
        }
      }),
      (this.fPi = (e) => {
        this.Refresh(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.p5t]]);
  }
  BindEvent() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
      this.fPi,
    );
  }
  UnbindEvent() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RogueResMapSummaryTeamUpdate,
      this.fPi,
    );
  }
  async OnBeforeStartAsync() {
    (this.gC1 =
      new RogueBattleMapRoleAttrNameItem_1.RogueBattleMapRoleAttributeNameItem()),
      await this.gC1.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.CC1 =
        new RogueBattleMapRoleAttrFettersItem_1.RogueBattleMapRoleAttributeFettersItem()),
      await this.CC1.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
      (this.ySn =
        new RogueBattleMapRoleAttrBuffItem_1.RogueBattleMapRoleAttributeBuffsItem()),
      await this.ySn.CreateThenShowByActorAsync(this.GetItem(2).GetOwner());
  }
  OnBeforeDestroy() {
    (this.gC1 = void 0), (this.CC1 = void 0), (this.ySn = void 0);
  }
  Refresh(e) {
    this.dFe = e;
    var t = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e);
    this.GetButton(3)?.RootUIComp.SetUIActive(t),
      this.GetItem(4)?.SetUIActive(!t),
      this.gC1.Refresh(e),
      this.CC1.Refresh(e),
      t
        ? (this.ySn.SetUiActive(!0), this.ySn.Refresh(e))
        : this.ySn.SetUiActive(!1);
  }
}
exports.RogueBattleMapRoleAttributeItem = RogueBattleMapRoleAttributeItem;
//# sourceMappingURL=RogueBattleMapRoleAttrInfo.js.map
