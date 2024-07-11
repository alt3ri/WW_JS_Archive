"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleSmallItemGrid = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalRoleSmallItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.dFe = 0),
      (this.AVi = void 0),
      (this.PVi = (e) => {
        1 === e && this.AVi && this.AVi(this.dFe);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIExtendToggle],
      [2, UE.UIInteractionGroup],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.PVi]]);
  }
  Refresh(e, t, r) {
    this.dFe = e;
    var i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e),
      s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e),
      a = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4),
      s =
        (this.SetRoleIcon(s.RoleHeadIcon, this.GetTexture(0), e),
        this.GetTexture(0).SetIsGray(void 0 === i),
        this.GetItem(3).SetUIActive(e === a),
        t ? 1 : 0);
    this.GetExtendToggle(1).SetToggleState(s);
  }
  BindToggleClickCallBack(e) {
    this.AVi = e;
  }
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(1).SetToggleState(0);
  }
  GetRoleId() {
    return this.dFe;
  }
  GetKey(e, t) {
    return this.dFe;
  }
}
exports.PersonalRoleSmallItemGrid = PersonalRoleSmallItemGrid;
//# sourceMappingURL=PersonalRoleSmallItemGrid.js.map
