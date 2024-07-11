"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CostContentItem =
    exports.LevelLayoutGrid =
    exports.RoleBreakPreviewView =
      void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const UiManager_1 = require("../../../Ui/UiManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../../Util/Layout/GenericLayout");
class RoleBreakPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.QTn = void 0),
      (this.XTn = void 0),
      (this.$Tn = void 0),
      (this.YTn = void 0),
      (this.JTn = () => {
        this.YTn.HandleClickLeft();
      }),
      (this.zTn = () => {
        this.YTn.HandleClickRight();
      }),
      (this.I4t = () => {
        this.YTn.HandleViewClosePromise(
          UiManager_1.UiManager.CloseViewAsync("RoleBreakPreviewView"),
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIHorizontalLayout],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIHorizontalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [6, this.JTn],
        [7, this.zTn],
        [8, this.I4t],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.YTn = this.OpenParam),
      (this.$Tn = new CostContentItem(this.YTn)),
      await this.$Tn.CreateByActorAsync(this.GetItem(5).GetOwner());
  }
  OnStart() {
    (this.QTn = new GenericLayout_1.GenericLayout(
      this.GetHorizontalLayout(0),
      this.YTn.CreateLevelLayoutGrid,
    )),
      (this.XTn = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(3),
        this.YTn.CreateItemLayoutGrid,
      )),
      this.YTn.BindView(this),
      this.YTn.HandleViewOnStart();
  }
  OnBeforeDestroy() {
    this.YTn.Dispose(),
      (this.YTn = void 0),
      (this.QTn = void 0),
      (this.XTn = void 0),
      (this.$Tn = void 0);
  }
  RefreshLevelLayout(t) {
    this.QTn.RefreshByData(t);
  }
  RefreshItemLayout(t) {
    this.XTn.RefreshByData(t, () => {
      this.XTn?.GetUiAnimController()?.Play();
    });
  }
  RefreshLevelContent(t) {
    this.GetText(2).SetText(t.toString());
  }
  RefreshLeftButton(t) {
    this.GetButton(6).SetSelfInteractive(t);
  }
  RefreshRightButton(t) {
    this.GetButton(7).SetSelfInteractive(t);
  }
  RefreshLevelContentItem(t) {
    this.GetItem(9).SetUIActive(t);
  }
  RefreshHasBrokenTip(t) {
    this.GetText(10).SetUIActive(t);
  }
}
exports.RoleBreakPreviewView = RoleBreakPreviewView;
class LevelLayoutGrid extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(t) {
    super(),
      (this.YTn = void 0),
      (this.kqe = () => {
        this.YTn.HandleItemOnClickToggle(this.GridIndex);
      }),
      (this.YTn = t);
  }
  ZTn() {
    this.YTn = void 0;
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
    ]),
      (this.BtnBindInfo = [[5, this.kqe]]);
  }
  Refresh(t, e, s) {
    this.GridIndex = s;
    const i = t.IsAvailable;
    const h = t.LevelContent.toString();
    this.GetItem(0).SetUIActive(!i),
      this.GetText(1).SetText(i ? "" : h),
      this.GetItem(2).SetUIActive(i),
      this.GetText(3).SetText(i ? h : ""),
      this.GetItem(4).SetUIActive(s !== 0),
      this.GetExtendToggle(5).SetToggleState(t.IsChosen ? 1 : 0);
  }
  OnBeforeDestroy() {
    super.OnBeforeDestroy(), this.ZTn();
  }
}
exports.LevelLayoutGrid = LevelLayoutGrid;
class CostContentItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(), (this.YTn = void 0), (this.YTn = t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UITexture],
    ];
  }
  OnStart() {
    this.YTn.BindCostContentItem(this), this.YTn.HandleCostContentItemOnStart();
  }
  OnBeforeDestroy() {
    this.YTn.UnbindCostContentItem(), (this.YTn = void 0);
  }
  RefreshTitle(t) {
    t = t || "";
    this.GetText(0).SetText(t);
  }
  RefreshCostNumber(t) {
    t = t || "";
    this.GetText(1).SetText(t);
  }
  RefreshMoneyIcon(t) {
    this.SetItemIcon(this.GetTexture(2), t);
  }
}
exports.CostContentItem = CostContentItem;
// # sourceMappingURL=RoleBreakPreviewView.js.map
