"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleFavorPreciousItemComponent = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GRAY_COLOR = "8F8F8FFF",
  NORMAL_COLOR = "FFFFFFFF";
class RoleFavorPreciousItemComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s = !1) {
    super(),
      (this.xbt = void 0),
      (this.fuo = void 0),
      (this.puo = void 0),
      (this.vuo = void 0),
      (this.Muo = i),
      (this.Rjt = s),
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
    this.Muo &&
      ((this.xbt = this.GetTexture(0)),
      (this.fuo = this.GetItem(2)),
      (this.puo = this.GetItem(3)),
      (this.vuo = this.GetItem(4)),
      this.SetTextureByPath(this.Muo.Pic, this.xbt),
      this.Euo(this.Rjt));
  }
  OnBeforeDestroy() {
    (this.Muo = void 0),
      (this.Rjt = !1),
      (this.xbt = void 0),
      (this.fuo = void 0),
      (this.puo = void 0),
      (this.vuo = void 0);
  }
  Refresh(t, i = !1) {
    (this.Muo = t),
      (this.Rjt = i),
      this.SetTextureByPath(this.Muo.Pic, this.xbt),
      this.Euo(this.Rjt);
  }
  Euo(t) {
    t
      ? this.xbt.SetColor(UE.Color.FromHex(GRAY_COLOR))
      : this.xbt.SetColor(UE.Color.FromHex(NORMAL_COLOR)),
      this.xbt.SetUIActive(!t),
      this.fuo.SetUIActive(!1),
      this.puo.SetUIActive(!1),
      this.vuo.SetUIActive(!1);
  }
}
exports.RoleFavorPreciousItemComponent = RoleFavorPreciousItemComponent;
//# sourceMappingURL=RoleFavorPreciousItemComponent.js.map
