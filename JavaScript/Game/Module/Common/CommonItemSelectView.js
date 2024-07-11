"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonItemSelectView = exports.CommonItemSelectViewOpenViewData =
    void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../Ui/Base/UiPanelBase");
const UiPopViewData_1 = require("../../Ui/Define/UiPopViewData");
const SelectableComponent_1 = require("./PropItem/SelectablePropItem/SelectableComponent");
const VisionRecoverySelectableComponent_1 = require("./PropItem/SelectablePropItem/VisionRecoverySelectableComponent");
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
    super(), (this.OIt = void 0), e && this.CreateThenShowByActor(e.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ];
  }
  kIt(e) {
    this.GetItem(3).SetUIActive(e?.length <= 0);
  }
  UpdateSelectableComponent(e, t, i, o, s = void 0) {
    this.OIt ||
      ((this.OIt = new (
        e === 0
          ? SelectableComponent_1.SelectableComponent
          : VisionRecoverySelectableComponent_1.VisionRecoverySelectableComponent
      )()),
      this.OIt.InitLoopScroller(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1),
        o,
      )),
      this.SetMaxSize(o.MaxSelectedGridNum),
      this.kIt(t),
      this.OIt.UpdateComponent(t, i, s);
  }
  GetCurrentSelectedData() {
    return this.OIt.GetCurrentSelectedData();
  }
  UpdateByDataList(e) {
    this.OIt.UpdateDataList(e);
  }
  SetMaxSize(e) {
    this.OIt.SetMaxSize(e);
  }
  OnBeforeDestroy() {
    this.OIt?.Destroy();
  }
}
exports.CommonItemSelectView = CommonItemSelectView;
// # sourceMappingURL=CommonItemSelectView.js.map
