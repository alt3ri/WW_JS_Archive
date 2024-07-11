"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleLevelUpCostItem = void 0);
const UE = require("ue"),
  LongPressButtonItem_1 = require("../../Common/Button/LongPressButtonItem"),
  ItemGridVariantSelect_1 = require("../../Common/ItemGrid/ItemGridVariantSelect"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RoleLevelUpCostItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t = void 0, e, s, i, r, h = void 0) {
    super(),
      (this.Buo = e),
      (this.buo = s),
      (this.Ruo = i),
      (this.Uuo = r),
      (this.BelongView = h),
      (this.ebt = void 0),
      (this.quo = void 0),
      (this.Guo = void 0),
      t && this.CreateThenShowByActor(t.GetOwner());
  }
  Nuo() {
    return this.ebt.GetConfigId();
  }
  Refresh(t, e, s) {
    this.RefreshBySelectedData(t);
  }
  OnStart() {
    this.ebt = new ItemGridVariantSelect_1.ItemGridVariantSelect(
      this.RootItem.GetOwner(),
      void 0,
      this.BelongView,
    );
    (this.quo = new LongPressButtonItem_1.LongPressButtonItem(
      this.ebt.GetClickToggle(),
      1,
      () => {
        this.Buo?.(this.Nuo());
      },
    )),
      this.quo.SetTickConditionDelegate(() => this.Ruo?.(this.Nuo()) ?? !1),
      (this.Guo = new LongPressButtonItem_1.LongPressButtonItem(
        this.ebt.GetReduceButton(),
        1,
        () => {
          this.buo?.(this.Nuo());
        },
      )),
      this.Guo.SetTickConditionDelegate(() => this.Uuo?.(this.Nuo()) ?? !1);
    this.ebt.SetToggleClickEvent((t, e) => {
      this.ebt.GetClickToggle().SetToggleState(0, !1);
    }),
      this.ebt.GetAddButton().RootUIComp.SetUIActive(!1),
      this.ebt.RefreshItemShowState(!0);
  }
  RefreshBySelectedData(t) {
    this.ebt.RefreshByItemId(t.ItemId), this.RefreshCountBySelectedData(t);
  }
  RefreshCountBySelectedData(t) {
    var e = t.SelectedCount,
      t = t.Count;
    this.ebt.RefreshTextDown(!0, e + "/" + t),
      this.ebt.GetReduceButton().RootUIComp.SetUIActive(0 < e);
  }
  OnBeforeDestroy() {
    this.quo.Clear(), this.Guo.Clear();
  }
  GetUiItemForGuide() {
    return this.ebt
      ?.GetClickToggle()
      ?.GetOwner()
      .GetComponentByClass(UE.UIItem.StaticClass());
  }
}
exports.RoleLevelUpCostItem = RoleLevelUpCostItem;
//# sourceMappingURL=RoleLevelUpCostItem.js.map
