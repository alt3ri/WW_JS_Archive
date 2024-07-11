"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeaponListComponent = void 0);
const GenericScrollViewNew_1 = require("../Util/ScrollView/GenericScrollViewNew"),
  WeaponItemSmallItemGrid_1 = require("./WeaponItemSmallItemGrid");
class WeaponListComponent {
  constructor() {
    (this.TOi = void 0),
      (this.xqe = void 0),
      (this.DOo = void 0),
      (this.InitWeaponItem = () => {
        var t = new WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid();
        return (
          t.BindOnExtendToggleStateChanged(this.I6e),
          t.BindOnCanExecuteChange(this.d4e),
          t
        );
      }),
      (this.d4e = (t, e, i) => this.GetCurSelectedData() !== t),
      (this.I6e = (t) => {
        1 === t.State &&
          (t = t.MediumItemGrid) instanceof
            WeaponItemSmallItemGrid_1.WeaponItemSmallItemGrid &&
          this.ROo(t.GridIndex);
      }),
      (this.ROo = (t) => {
        this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy(),
          this.xqe.GetGenericLayout()?.SelectGridProxy(t),
          this.DOo?.();
      });
  }
  Init(t) {
    this.xqe = new GenericScrollViewNew_1.GenericScrollViewNew(
      t,
      this.InitWeaponItem,
    );
  }
  SetWeaponChangeCallBack(t) {
    this.DOo = t;
  }
  async UpdateDataList(t) {
    (this.TOi = t),
      this.xqe.SetActive(1 < t.length),
      await this.xqe.RefreshByDataAsync(this.TOi);
  }
  SetCurSelect(t) {
    var e;
    !this.TOi ||
      t < 0 ||
      t >= this.TOi.length ||
      t === this.xqe.GetGenericLayout().GetSelectedGridIndex() ||
      ((e = this.xqe.GetScrollItemByIndex(t)) &&
        (e?.SetSelected(!0), this.ROo(t)));
  }
  GetCurSelectedData() {
    var t = this.xqe.GetGenericLayout().GetSelectedGridIndex();
    if (!(!this.TOi || t < 0 || t >= this.TOi.length)) return this.TOi[t];
  }
  CancelSelect() {
    this.xqe.GetGenericLayout()?.DeselectCurrentGridProxy();
  }
}
exports.WeaponListComponent = WeaponListComponent;
//# sourceMappingURL=WeaponListComponent.js.map
