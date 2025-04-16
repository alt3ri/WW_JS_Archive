"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapRoleAttributeFettersItem =
    exports.RougeBattleAttributeFetterItem =
      void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RougeBattleAttributeFetterItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.J01 = 0),
      (this.kqe = () => {
        (ModelManager_1.ModelManager.RogueBattleModel.CurrentMapSummaryBond =
          this.J01),
          (ModelManager_1.ModelManager.RogueBattleModel.IsMapSummaryBondJumping =
            !0),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RogueResMapSummaryTeamToBondUpdate,
          ),
          this.GetExtendToggle(2)?.SetToggleState(0);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[2, this.kqe]]);
  }
  Refresh(e, t, r) {
    (this.J01 = e.ConfigId), this.GetText(1)?.SetText("Lv." + e.Level);
    e = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(
      e.ConfigId,
    );
    this.SetTextureByPath(e.Icon, this.GetTexture(0));
  }
}
exports.RougeBattleAttributeFetterItem = RougeBattleAttributeFetterItem;
class RogueBattleMapRoleAttributeFettersItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.hm1 = void 0),
      (this.Fao = () => new RougeBattleAttributeFetterItem());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    this.hm1 = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(1),
      this.Fao,
    );
  }
  OnBeforeDestroy() {
    this.hm1 = void 0;
  }
  Refresh(e) {
    var t = ModelManager_1.ModelManager.RogueBattleModel.IsRoleGot(e),
      e = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(e),
      e =
        ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBondRole(e),
      r = new Array();
    for (const a of e.BondIds) {
      var i =
          ModelManager_1.ModelManager.RogueBattleModel.GetRoleBondDataById(a),
        n = ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResBond(a),
        s = i ? i.F6n : 0,
        i = {
          ConfigId: a,
          Level: s,
          IsUnlock: t && void 0 !== i,
          IsMaxLevel: void 0 !== i && s === n.starmapLength(),
        };
      r.push(i);
    }
    this.hm1?.RefreshByData(r);
  }
}
exports.RogueBattleMapRoleAttributeFettersItem =
  RogueBattleMapRoleAttributeFettersItem;
//# sourceMappingURL=RogueBattleMapRoleAttrFettersItem.js.map
