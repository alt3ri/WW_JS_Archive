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
      (this.Nha = void 0),
      (this.kha = void 0),
      (this.Fha = () => {
        this.kha && this.kha(this.dFe);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.Nha = new MediumItemGrid_1.MediumItemGrid()),
      this.Nha.Initialize(this.GetItem(1).GetOwner()),
      this.Nha.BindOnCanExecuteChange(() => !1),
      this.Nha.BindOnExtendToggleRelease(this.Fha);
  }
  Refresh(e, t, i) {
    (this.GridIndex = i),
      (this.dFe = e) < 0
        ? (this.GetItem(0).SetUIActive(!0), this.Nha.SetUiActive(!1))
        : (this.GetItem(0).SetUIActive(!1),
          this.Nha.SetUiActive(!0),
          (i = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e)),
          (i = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i.Name)),
          this.Nha.Apply({ Type: 2, Data: e, ItemConfigId: e, BottomText: i }),
          (e = t ? 1 : 0),
          this.Nha.GetItemGridExtendToggle().SetToggleStateForce(e));
  }
  BindClickItemCallBack(e) {
    this.kha = e;
  }
  OnSelected(e) {
    this.Nha.GetItemGridExtendToggle().SetToggleStateForce(1);
  }
  OnDeselected(e) {
    this.Nha.GetItemGridExtendToggle().SetToggleStateForce(0);
  }
}
exports.PersonalRoleDisplayMediumItem = PersonalRoleDisplayMediumItem;
//# sourceMappingURL=PersonalRoleDisplayMediumItem.js.map
