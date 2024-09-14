"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EnrichmentAreaItemView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  WorldMapDefine_1 = require("../../../WorldMap/WorldMapDefine"),
  MarkBlueRangeImageComponent_1 = require("./Components/MarkBlueRangeImageComponent"),
  ServerMarkItemView_1 = require("./ServerMarkItemView");
class EnrichmentAreaItemView extends ServerMarkItemView_1.ServerMarkItemView {
  constructor(e) {
    super(e), (this.uGa = void 0), (this.kRi = void 0);
  }
  OnInitialize() {
    super.OnInitialize(),
      (this.kRi = new UE.Vector2D(
        this.Holder.UiPosition.X,
        this.Holder.UiPosition.Y,
      )),
      this.cGa(!0),
      this.OnIconPathChanged(this.Holder.IconPath);
  }
  async GetRangeComponentAsync() {
    var e;
    return (
      this.RangeComponentInternal ||
        ((this.RangeComponentInternal =
          new MarkBlueRangeImageComponent_1.MarkBlueRangeImageComponent()),
        await this.RangeComponentInternal.CreateThenShowByResourceIdAsync(
          "UiItem_ProbeArea",
          this.RootItem.GetParentAsUIItem(),
          !0,
        ),
        this.RangeComponentInternal?.GetRootItem()?.SetAnchorOffset(this.kRi),
        this.RangeComponentInternal?.GetRootItem().SetAsFirstHierarchy(),
        this.SetScale(this.Holder.MarkScale),
        (e = this.Holder.MarkRange),
        this.RangeComponentInternal.RangeImage.SetWidth(2 * e),
        this.RangeComponentInternal.RangeImage.SetHeight(2 * e)),
      this.RangeComponentInternal
    );
  }
  cGa(e) {
    this.uGa !== e &&
      ((this.uGa = e),
      this.GetRangeComponentAsync().then((e) => {
        e.SetActive(this.uGa),
          this.RangeComponentInternal?.GetRootItem()?.SetAnchorOffset(this.kRi);
      }));
  }
  OnSafeUpdate(e, t, i) {
    var r, s, n;
    this.Holder &&
      ((r = this.GetSprite(1)),
      (s = (n = this.Holder).CheckCanShowIcon()),
      (n = n.CheckCanShowView()),
      r?.SetUIActive(s),
      this.RangeComponentInternal?.SetUiActive(n));
  }
  OnIconPathChanged(e) {
    const t = this.Holder.CheckCanShowIcon();
    var i = this.GetSprite(1);
    i.SetUIActive(t),
      this.LoadIcon(i, e),
      this.Holder.IsMultiMap() &&
        this.GetChildIconComponentAsync().then((e) => {
          e.SetUiActive(t),
            (e.Icon =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                WorldMapDefine_1.MULTI_MAP_ICON_PATH,
              ));
        });
  }
  ShowVerticalPointer() {
    return !1;
  }
  OnBeforeDestroy() {
    this.RangeComponentInternal?.Destroy(), super.OnBeforeDestroy();
  }
}
exports.EnrichmentAreaItemView = EnrichmentAreaItemView;
//# sourceMappingURL=EnrichmentAreaItemView.js.map
