"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapPlayPointDetailView = void 0);
const UE = require("ue"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  MapExplorePlayProgressPanel_1 = require("./MapExplorePlayProgressPanel");
class MapPlayPointDetailView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments), (this.tNl = void 0), (this.DNl = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    (this.DNl = this.OpenParam),
      (this.tNl =
        new MapExplorePlayProgressPanel_1.MapExplorePlayProgressPanel()),
      await this.tNl.Init(this.GetItem(0));
  }
  OnBeforeShow() {
    var e = this.DNl.ExploreAreaItemData,
      s = (this.tNl.UpdateData(e.PlayProgressDataList), e.PlayPointTotalCount),
      i = e.PlayPointCompletedCount,
      t = e.PlayPointToBeCompletedCount,
      r = e.PlayPointLockedCount,
      s =
        (this.GetText(1).SetText(s.toString()),
        this.GetText(2).SetText(i.toString()),
        this.GetText(3).SetText(t.toString()),
        this.GetText(4).SetText(r.toString()),
        this.GetText(5).SetText(e.GetPlayDetailTitle()),
        this.GetText(6).ShowTextNew(e.GetNameId()),
        e.HasSpecialPlayPoint());
    this.GetItem(8).SetUIActive(s),
      s && this.GetText(7).ShowTextNew(e.SpecialPlayerDesc);
  }
}
exports.MapPlayPointDetailView = MapPlayPointDetailView;
//# sourceMappingURL=MapPlayPointDetailView.js.map
