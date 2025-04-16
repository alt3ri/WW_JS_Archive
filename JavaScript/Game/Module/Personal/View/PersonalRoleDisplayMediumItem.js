"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleDisplayMediumItem =
    exports.PersonalRoleDisplayContentData =
      void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  MediumItemGrid_1 = require("../../Common/MediumItemGrid/MediumItemGrid"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalRoleDisplayContentData {
  constructor() {
    (this.RoleId = 0), (this.IfOtherData = !1);
  }
}
exports.PersonalRoleDisplayContentData = PersonalRoleDisplayContentData;
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
  Refresh(t, e, i) {
    (this.GridIndex = i),
      (this.dFe = t.RoleId),
      this.dFe < 0
        ? (this.GetItem(0).SetUIActive(!0), this.Nha.SetUiActive(!1))
        : (this.GetItem(0).SetUIActive(!1),
          this.Nha.SetUiActive(!0),
          (i =
            ModelManager_1.ModelManager.RoleSkinModel.GetRoleOriginalSkinData(
              this.dFe,
              !t.IfOtherData,
            )),
          (t = {
            Type: 2,
            Data: this.dFe,
            SkinId: i.GetItemId(),
            ItemConfigId: this.dFe,
            BottomText: ConfigManager_1.ConfigManager.RoleConfig.GetRoleName(
              i.GetName(),
            ),
          }),
          this.Nha.Apply(t),
          (i = e ? 1 : 0),
          this.Nha.GetItemGridExtendToggle().SetToggleStateForce(i));
  }
  BindClickItemCallBack(t) {
    this.kha = t;
  }
  OnSelected(t) {
    this.Nha.GetItemGridExtendToggle().SetToggleStateForce(1);
  }
  OnDeselected(t) {
    this.Nha.GetItemGridExtendToggle().SetToggleStateForce(0);
  }
}
exports.PersonalRoleDisplayMediumItem = PersonalRoleDisplayMediumItem;
//# sourceMappingURL=PersonalRoleDisplayMediumItem.js.map
