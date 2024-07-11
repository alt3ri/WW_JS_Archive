"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SelectablePropItemBase = void 0);
const GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  SelectablePropTypeItemVariantSelect_1 = require("./SelectablePropTypeItemVariantSelect"),
  SelectablePropTypeOne_1 = require("./SelectablePropTypeOne");
class SelectablePropItemBase extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e = 1) {
    super(),
      (this.PropData = void 0),
      (this.OnToggleClick = (e) => {}),
      (this.XBt = void 0),
      (this.ComponentType = e);
  }
  OnRegisterComponent() {
    0 === this.ComponentType
      ? (this.XBt = new SelectablePropTypeOne_1.SelectablePropTypeOne(
          this.RootItem,
        ))
      : 1 === this.ComponentType &&
        (this.XBt =
          new SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect(
            this.RootItem,
          )),
      this.XBt.SetToggleClick(this.OnToggleClick);
  }
  GetSelectItem() {
    return this.XBt.GetSelectItem();
  }
  GetReduceButton() {
    return this.XBt.GetReduceButton();
  }
  GetControlItem() {
    return this.XBt.GetControlItem();
  }
  GetFinishSelectItem() {
    return this.XBt.GetFinishSelectItem();
  }
  GetSelectNumberText() {
    return this.XBt.GetSelectNumberText();
  }
  GetSelectableToggle() {
    return this.XBt.GetSelectableToggle();
  }
  SetRoleIconState() {
    this.XBt.SetRoleIconState();
  }
  ShowDefaultDownText() {
    this.XBt instanceof
      SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect &&
      this.XBt.ShowDefaultDownText();
  }
  RefreshRightDownLockSprite(e) {
    this.XBt instanceof
      SelectablePropTypeItemVariantSelect_1.SelectablePropTypeItemVariantSelect &&
      this.XBt.RefreshRightDownLockSprite(e);
  }
  Refresh(e, t, r) {
    (this.PropData = e), this.XBt.Refresh(e, t, r), this.OnRefresh(t, r);
  }
  OnRefresh(e, t) {}
  Clear() {}
}
exports.SelectablePropItemBase = SelectablePropItemBase;
//# sourceMappingURL=SelectablePropItemBase.js.map
