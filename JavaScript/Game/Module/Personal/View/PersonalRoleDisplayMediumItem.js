"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleDisplayMediumItem = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalRoleDisplayMediumItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.osa = void 0),
      (this.nsa = void 0),
      (this.ssa = () => {
        this.nsa && this.nsa(this.dFe);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.osa = new MediumItemGrid_1.MediumItemGrid()),
      this.osa.Initialize(this.GetItem(1).GetOwner()),
      this.osa.BindOnCanExecuteChange(() => !1),
      this.osa.BindOnExtendToggleRelease(this.ssa);
  }
  Refresh(e, t, i) {
    (this.GridIndex = i),
      (this.dFe = e) < 0
        ? (this.GetItem(0).SetUIActive(!0), this.osa.SetUiActive(!1))
        : (this.GetItem(0).SetUIActive(!1),
          this.osa.SetUiActive(!0),
          (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
          (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name)),
          this.osa.Apply({ Type: 2, Data: e, ItemConfigId: e, BottomText: i }),
          (e = t ? 1 : 0),
          this.osa.GetItemGridExtendToggle().SetToggleStateForce(e));
  }
  BindClickItemCallBack(e) {
    this.nsa = e;
  }
  OnSelected(e) {
    this.osa.GetItemGridExtendToggle().SetToggleStateForce(1);
  }
  OnDeselected(e) {
    this.osa.GetItemGridExtendToggle().SetToggleStateForce(0);
  }
}
exports.PersonalRoleDisplayMediumItem = PersonalRoleDisplayMediumItem;
//# sourceMappingURL=PersonalRoleDisplayMediumItem.js.map
