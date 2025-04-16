"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PersonalRoleSmallItemGrid = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PersonalRoleSmallItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.v3l = void 0),
      (this.AVi = void 0),
      (this.PVi = (e) => {
        1 === e && this.AVi && this.AVi(this.v3l);
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
  Refresh(e, t, s) {
    this.v3l = e;
    var i = ModelManager_1.ModelManager.PlayerInfoModel.GetNumberPropById(4);
    const r = this.GetTexture(0);
    r.SetUIActive(!1),
      this.SetTextureShowUntilLoaded(e.GetRoleCardHeadIcon(), r, () => {
        r.SetUIActive(!0);
      }),
      this.GetTexture(0).SetIsGray(e.Lock),
      this.GetItem(3).SetUIActive(e.Id === i);
    e = t ? 1 : 0;
    this.GetExtendToggle(1).SetToggleState(e);
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
}
exports.PersonalRoleSmallItemGrid = PersonalRoleSmallItemGrid;
//# sourceMappingURL=PersonalRoleSmallItemGrid.js.map
