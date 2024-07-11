"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostItemGrid = void 0);
const ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ItemGridVariantSelect_1 = require("../../Common/ItemGrid/ItemGridVariantSelect"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class CostItemGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = void 0) {
    super(), (this.ebt = void 0), t && this.CreateThenShowByActor(t.GetOwner());
  }
  Refresh(t, e, r) {
    this.RefreshBySelectedData(t);
  }
  OnStart() {
    this.ebt = new ItemGridVariantSelect_1.ItemGridVariantSelect(
      this.RootItem.GetOwner(),
    );
    this.ebt.SetToggleClickEvent((t, e) => {
      ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
        this.ebt.GetConfigId(),
      ),
        this.ebt.GetClickToggle().SetToggleState(0, !1);
    }),
      this.ebt.GetAddButton().RootUIComp.SetUIActive(!1),
      this.ebt.GetReduceButton().RootUIComp.SetUIActive(!1),
      this.ebt.RefreshItemShowState(!0);
  }
  RefreshBySelectedData(t) {
    this.ebt.RefreshByItemId(t.ItemId), this.RefreshCountBySelectedData(t);
  }
  OnBeforeDestroy() {
    this.ebt?.Destroy();
  }
  RefreshCountBySelectedData(t) {
    var e = t.SelectedCount,
      t = t.Count;
    let r = e < t ? "Text_ItemNotEnoughText_Text" : "Text_ItemEnoughText_Text";
    this.ebt.RefreshTextDownByTextId(!0, r, e, t);
  }
}
exports.CostItemGrid = CostItemGrid;
//# sourceMappingURL=CostItemGrid.js.map
