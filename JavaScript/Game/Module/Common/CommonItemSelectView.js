"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemSelectView = exports.CommonItemSelectViewOpenViewData =
    void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiPopViewData_1 = require("../../Ui/Define/UiPopViewData"),
  SelectableComponent_1 = require("./PropItem/SelectablePropItem/SelectableComponent"),
  VisionRecoverySelectableComponent_1 = require("./PropItem/SelectablePropItem/VisionRecoverySelectableComponent");
class CommonItemSelectViewOpenViewData extends UiPopViewData_1.UiPopViewData {
  constructor() {
    super(...arguments),
      (this.ItemDataBaseList = void 0),
      (this.SelectedDataList = void 0),
      (this.SelectableComponentData = void 0),
      (this.ExpData = void 0),
      (this.SelectableComponentType = 0),
      (this.UseWayId = 0),
      (this.InitSortToggleState = !1);
  }
}
exports.CommonItemSelectViewOpenViewData = CommonItemSelectViewOpenViewData;
class CommonItemSelectView extends UiPanelBase_1.UiPanelBase {
  constructor(e = void 0) {
    super(), (this.jTt = void 0), e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  WTt(e) {
    this.GetItem(3).SetUIActive(e?.length <= 0);
  }
  UpdateSelectableComponent(e, t, i, o, s = void 0) {
    this.jTt ||
      ((this.jTt = new (
        0 === e
          ? SelectableComponent_1.SelectableComponent
          : VisionRecoverySelectableComponent_1.VisionRecoverySelectableComponent
      )()),
      this.jTt.InitLoopScroller(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1),
        o,
      )),
      this.SetMaxSize(o.MaxSelectedGridNum),
      this.WTt(t),
      this.jTt.UpdateComponent(t, i, s);
  }
  GetCurrentSelectedData() {
    return this.jTt.GetCurrentSelectedData();
  }
  UpdateByDataList(e) {
    this.jTt.UpdateDataList(e), this.WTt(e);
  }
  RefreshPartByIndex(e) {
    this.jTt.RefreshPartByIndex(e);
  }
  UpdateChangeItemSelectList() {
    this.jTt.UpdateChangeItemSelectList();
  }
  SetMaxSize(e) {
    this.jTt.SetMaxSize(e);
  }
  OnBeforeDestroy() {
    this.jTt?.Destroy();
  }
}
exports.CommonItemSelectView = CommonItemSelectView;
//# sourceMappingURL=CommonItemSelectView.js.map
