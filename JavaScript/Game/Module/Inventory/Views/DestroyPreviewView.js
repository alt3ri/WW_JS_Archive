"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DestroyPreviewView = void 0);
const UE = require("ue");
const UiViewBase_1 = require("../../../Ui/Base/UiViewBase");
const ButtonItem_1 = require("../../Common/Button/ButtonItem");
const LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView");
const DestroyPreviewGrid_1 = require("./DestroyPreviewGrid");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
const GRID_SIZE = 210;
const GRID_NORMAL_WIDTH_SIZE = 630;
const GRID_NORMAL_HEIGHT_SIZE = 525;
const layoutSize = [
  [GRID_NORMAL_WIDTH_SIZE, GRID_NORMAL_HEIGHT_SIZE],
  [GRID_SIZE, GRID_SIZE],
  [2 * GRID_SIZE, GRID_SIZE],
  [GRID_NORMAL_WIDTH_SIZE, GRID_SIZE],
  [GRID_NORMAL_WIDTH_SIZE, 2 * GRID_SIZE],
  [GRID_NORMAL_WIDTH_SIZE, 2 * GRID_SIZE],
  [GRID_NORMAL_WIDTH_SIZE, 2 * GRID_SIZE],
];
class DestroyPreviewView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Nci = void 0),
      (this.Oci = void 0),
      (this.kci = []),
      (this.Fci = void 0),
      (this.Vci = void 0),
      (this.Hci = !1),
      (this.jci = () => {
        return new DestroyPreviewGrid_1.DestroyPreviewGrid();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UILoopScrollViewComponent],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    let e;
    let t;
    const i = this.OpenParam;
    i &&
      ((e = this.GetLoopScrollViewComponent(0)),
      (this.Nci = new LoopScrollView_1.LoopScrollView(
        e,
        this.GetItem(2).GetOwner(),
        this.jci,
      )),
      await this.Nci.RefreshByDataAsync(i.OriginList),
      this.Wci(i.OriginList.length, e),
      (this.kci = i.OriginList),
      (e = this.GetLoopScrollViewComponent(1)),
      (this.Oci = new LoopScrollView_1.LoopScrollView(
        e,
        this.GetItem(2).GetOwner(),
        this.jci,
      )),
      (t = i.ResultList.length === 0),
      this.GetText(3).SetUIActive(t),
      e.RootUIComp.SetUIActive(!t),
      t ||
        (await this.Oci.RefreshByDataAsync(i.ResultList),
        this.Wci(i.ResultList.length, e)),
      (this.Hci = !t),
      (this.Fci = new ButtonItem_1.ButtonItem(this.GetItem(4))),
      this.Fci.SetFunction(() => {
        this.CloseMe();
      }),
      (this.Vci = new ButtonItem_1.ButtonItem(this.GetItem(5))),
      this.Vci.SetFunction(() => {
        this.Kci(), this.CloseMe();
      }));
  }
  OnAfterShow() {
    this.Hci && this.UiViewSequence.PlaySequence("Notice");
  }
  Wci(e, t) {
    let i = GRID_NORMAL_WIDTH_SIZE;
    let o = GRID_NORMAL_HEIGHT_SIZE;
    e < layoutSize.length && ((i = layoutSize[e][0]), (o = layoutSize[e][1])),
      t.RootUIComp.SetWidth(i),
      t.RootUIComp.SetHeight(o);
  }
  Kci() {
    const e = [];
    for (const i of this.kci) {
      const t = { G3n: i[0].ItemId, Q5n: i[0].IncId, I5n: i[1] };
      e.push(t);
    }
    ControllerHolder_1.ControllerHolder.InventoryController.ItemDestructRequest(
      e,
    );
  }
}
exports.DestroyPreviewView = DestroyPreviewView;
// # sourceMappingURL=DestroyPreviewView.js.map
