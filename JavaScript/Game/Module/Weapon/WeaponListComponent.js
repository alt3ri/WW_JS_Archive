"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponListComponent = void 0);
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew"),
  WeaponItemSmallItemGrid_1 = require("./WeaponItemSmallItemGrid");
class WeaponListComponent {
  constructor() {
    (this.Dki = void 0),
      (this.xqe = void 0),
      (this.Iko = void 0),
      (this.InitWeaponItem = () => {
        var t = new WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid();
        return (
          t.BindOnExtendToggleStateChanged(this.N8e),
          t.BindOnCanExecuteChange(this.A5e),
          t
        );
      }),
      (this.A5e = (t, e, i) => this.GetCurSelectedData() !== t),
      (this.N8e = (t) => {
        1 === t.State &&
          (t = t.MediumItemGrid) instanceof
            WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid &&
          this.Tko(t.GridIndex);
      }),
      (this.Tko = (t) => {
        this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy(),
          this.xqe.GetGenericLayout()?.SelectGridProxy(t),
          this.Iko?.();
      });
  }
  Init(t) {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
      t,
      this.InitWeaponItem,
    );
  }
  SetWeaponChangeCallBack(t) {
    this.Iko = t;
  }
  async UpdateDataList(t) {
    (this.Dki = t),
      this.xqe.SetActive(1 < t.length),
      await this.xqe.RefreshByDataAsync(this.Dki);
  }
  SetCurSelect(t) {
    var e;
    !this.Dki ||
      t < 0 ||
      t >= this.Dki.length ||
      t === this.xqe.GetGenericLayout().GetSelectedGridIndex() ||
      ((e = this.xqe.GetScrollItemByIndex(t)) &&
        (e?.SetSelected(!0), this.Tko(t)));
  }
  GetCurSelectedData() {
    var t = this.xqe.GetGenericLayout().GetSelectedGridIndex();
    if (!(!this.Dki || t < 0 || t >= this.Dki.length)) return this.Dki[t];
  }
  CancelSelect() {
    this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy();
  }
}
exports.WeaponListComponent = WeaponListComponent;
//# sourceMappingURL=WeaponListComponent.js.map
