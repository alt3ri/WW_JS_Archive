"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleSmallItemGrid = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalRoleSmallItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.zke = 0),
      (this.P5i = void 0),
      (this.x5i = (e) => {
        e === 1 && this.P5i && this.P5i(this.zke);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIExtendToggle],
      [2, UE.UIInteractionGroup],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.x5i]]);
  }
  Refresh(e, t, r) {
    this.zke = e;
    const i = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(e);
    var s = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(e);
    const a = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    var s =
      (this.SetRoleIcon(s.RoleHeadIcon, this.GetTexture(0), e),
      this.GetTexture(0).SetIsGray(void 0 === i),
      this.GetItem(3).SetUIActive(e === a),
      t ? 1 : 0);
    this.GetExtendToggle(1).SetToggleState(s);
  }
  BindToggleClickCallBack(e) {
    this.P5i = e;
  }
  OnSelected(e) {
    this.GetExtendToggle(1).SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(1).SetToggleState(0);
  }
  GetRoleId() {
    return this.zke;
  }
  GetKey(e, t) {
    return this.zke;
  }
}
exports.PersonalRoleSmallItemGrid = PersonalRoleSmallItemGrid;
// # sourceMappingURL=PersonalRoleSmallItemGrid.js.map
