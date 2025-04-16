"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleMapRoleAttributeBuffsItem =
    exports.RougeBattleAttributeBuffItem =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiManager_1 = require("../../../Ui/UiManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RougeBattleAttributeBuffItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.eHr = 0),
      (this.OnClickCall = void 0),
      (this.eTt = () => {
        this.GetExtendToggle(11)?.SetToggleState(0),
          this.OnClickCall && this.OnClickCall(this.eHr);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UIItem],
      [11, UE.UIExtendToggle],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[11, this.eTt]]);
  }
  Refresh(e, t, i) {
    (this.eHr = e), this.GetItem(10)?.SetUIActive(!1);
    e =
      ConfigManager_1.ConfigManager.RogueBattleConfig.GetRogueResCharacterBuff(
        e,
      );
    this.SetSpriteByPath(e.AffixIcon, this.GetSprite(9), !1);
  }
}
exports.RougeBattleAttributeBuffItem = RougeBattleAttributeBuffItem;
class RogueBattleMapRoleAttributeBuffsItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.fC1 = void 0),
      (this.Qd1 = []),
      (this.Fao = () => {
        var e = new RougeBattleAttributeBuffItem();
        return (e.OnClickCall = this.Os_), e;
      }),
      (this.Os_ = (e) => {
        e = { Index: this.Qd1.indexOf(e), AffixIds: this.Qd1 };
        UiManager_1.UiManager.OpenView("RogueBattleRoleAffixDetailView", e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.fC1 = new GenericLayout_1.GenericLayout(
      this.GetGridLayout(1),
      this.Fao,
    );
  }
  OnBeforeDestroy() {
    this.fC1 = void 0;
  }
  Refresh(e) {
    (e = ModelManager_1.ModelManager.RogueBattleModel.GetIncIdByRoleId(e)),
      (e = ModelManager_1.ModelManager.RogueBattleModel.GetRoleInfoById(e).Ph1);
    0 === e.length
      ? (this.GetItem(3)?.SetUIActive(!0),
        this.fC1.GetRootUiItem().SetUIActive(!1))
      : (this.GetItem(3)?.SetUIActive(!1),
        this.fC1.GetRootUiItem().SetUIActive(!0),
        this.fC1?.RefreshByData(e),
        (this.Qd1 = e));
  }
}
exports.RogueBattleMapRoleAttributeBuffsItem =
  RogueBattleMapRoleAttributeBuffsItem;
//# sourceMappingURL=RogueBattleMapRoleAttrBuffItem.js.map
