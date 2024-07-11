"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorPreciousItemComponent = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GRAY_COLOR = "8F8F8FFF";
const NORMAL_COLOR = "FFFFFFFF";
class RoleFavorPreciousItemComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s = !1) {
    super(),
      (this.UBt = void 0),
      (this.S_o = void 0),
      (this.E_o = void 0),
      (this.y_o = void 0),
      (this.I_o = i),
      (this.RHt = s),
      t && this.CreateThenShowByActor(t.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UINiagara],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnStart() {
    this.I_o &&
      ((this.UBt = this.GetTexture(0)),
      (this.S_o = this.GetItem(2)),
      (this.E_o = this.GetItem(3)),
      (this.y_o = this.GetItem(4)),
      this.SetTextureByPath(this.I_o.Pic, this.UBt),
      this.T_o(this.RHt));
  }
  OnBeforeDestroy() {
    (this.I_o = void 0),
      (this.RHt = !1),
      (this.UBt = void 0),
      (this.S_o = void 0),
      (this.E_o = void 0),
      (this.y_o = void 0);
  }
  Refresh(t, i = !1) {
    (this.I_o = t),
      (this.RHt = i),
      this.SetTextureByPath(this.I_o.Pic, this.UBt),
      this.T_o(this.RHt);
  }
  T_o(t) {
    t
      ? this.UBt.SetColor(UE.Color.FromHex(GRAY_COLOR))
      : this.UBt.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
      this.UBt.SetUIActive(!t),
      this.S_o.SetUIActive(!1),
      this.E_o.SetUIActive(!1),
      this.y_o.SetUIActive(!1);
  }
}
exports.RoleFavorPreciousItemComponent = RoleFavorPreciousItemComponent;
// # sourceMappingURL=RoleFavorPreciousItemComponent.js.map
