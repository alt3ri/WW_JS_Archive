"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerBuffItem = void 0);
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
class ShipTowerBuffItem extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments),
      (this.BuffData = void 0),
      (this.OnItemClickCallback = void 0),
      (this.GetStageIdCallback = void 0),
      (this.pZ_ = void 0);
  }
  OnRefresh(e) {
    (this.BuffData = e),
      this.UpdateBuffInfo(),
      this.UpdateBuffSelected(),
      e.IsSelected && this.OnExtendToggleStateChanged(1);
  }
  UpdateBuffInfo() {
    var e = this.BuffData,
      t = this.GetStageIdCallback?.(),
      t = {
        Type: 4,
        ItemConfigId: e.ItemId,
        IsLockVisible: !e.IsUnlock,
        IsDisable: !e.IsCanUse(t),
        Level: e.CanUseCountStr(t),
        BottomTextId: e.ItemNameKey,
        IsNewVisible: e.IsFirstGet(),
        Data: e,
      };
    this.Apply(t);
  }
  OnForceSelected() {
    this.SetSelected(!0, !0);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  OnBeforeDestroy() {
    this.BuffData?.ClearSelected();
  }
  OnExtendToggleStateChanged(e) {
    this.BuffData?.SetSelected(!0),
      this.ScrollViewDelegate?.SelectGridProxy(
        this.GridIndex,
        this.DisplayIndex,
        !1,
      ),
      this.OnItemClickCallback?.(this.BuffData);
  }
  OnCanExecuteChange() {
    return !this.BuffData?.IsSelected;
  }
  UpdateBuffState() {
    this.UpdateBuffInfo();
  }
  UpdateBuffSelected() {
    this.BuffData?.IsSelected !== this.pZ_ &&
      (this.SetSelected(!!this.BuffData?.IsSelected, !0),
      (this.pZ_ = this.BuffData?.IsSelected));
  }
}
exports.ShipTowerBuffItem = ShipTowerBuffItem;
//# sourceMappingURL=ShipTowerBuffItem.js.map
