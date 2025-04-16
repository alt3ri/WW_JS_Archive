"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BirthdayRoleHeadItem = void 0);
const UE = require("ue"),
  RoleInfoById_1 = require("../../../../Core/Define/ConfigQuery/RoleInfoById"),
  RoleSkinById_1 = require("../../../../Core/Define/ConfigQuery/RoleSkinById"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class BirthdayRoleHeadItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.OnToggleClickCallBack = void 0),
      (this.N8e = () => {
        this.OnToggleClickCallBack &&
          this.OnToggleClickCallBack(this.GridIndex, this.dFe);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UITexture],
      [2, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.N8e]]);
  }
  OnStart() {
    this.GetExtendToggle(0).CanExecuteChange.Bind(() => !0);
  }
  Refresh(e, t, i) {
    this.dFe = e;
    let r = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
      this.dFe,
    )?.GetRoleSkinId();
    r = r || RoleInfoById_1.configRoleInfoById.GetConfig(this.dFe).SkinId;
    var e = RoleSkinById_1.configRoleSkinById.GetConfig(r),
      e =
        (e &&
          ((e = e.RoleHeadIconCircle),
          this.SetTextureByPath(e, this.GetTexture(1))),
        this.SetToggleState(t),
        ModelManager_1.ModelManager.BirthdayModel.IsRoleSelected(this.dFe));
    this.GetTexture(2).SetUIActive(e);
  }
  SetToggleState(e) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0).SetToggleState(e);
  }
  OnSelected(e) {
    this.SetToggleState(!0);
  }
  OnDeselected(e) {
    this.SetToggleState(!1);
  }
}
exports.BirthdayRoleHeadItem = BirthdayRoleHeadItem;
//# sourceMappingURL=BirthdayRoleHeadItem.js.map
