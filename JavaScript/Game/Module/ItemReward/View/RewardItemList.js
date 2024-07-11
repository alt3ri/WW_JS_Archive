"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardItemList = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew");
const RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class RewardItemList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wqe = void 0),
      (this.kGe = void 0),
      (this.N2t = void 0),
      (this.mkt = () => {
        return this.P0i();
      }),
      (this.w$t = (e) => {
        this.N2t?.SetSelected(!1, !0), (this.N2t = e.MediumItemGrid);
        var e = e.Data;
        const r = e.ConfigId;
        var e = e.UniqueId;
        void 0 !== e && e > 0
          ? ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemUid(
              e,
              r,
            )
          : ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
              r,
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = []);
  }
  OnStart() {
    (this.wqe = this.GetItem(1)),
      this.wqe.SetUIActive(!1),
      (this.kGe = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(2),
        this.mkt,
      ));
  }
  OnBeforeDestroy() {
    (this.N2t = void 0), (this.kGe = void 0);
  }
  Refresh(e) {
    e.sort((e, r) => {
      let i = e.GetTypeSortIndex();
      let t = r.GetTypeSortIndex();
      return i !== t
        ? t - i
        : (t = e.GetQualityId()) !== (i = r.GetQualityId())
          ? i - t
          : e.ConfigId - r.ConfigId;
    }),
      this.kGe.RefreshByData(e);
  }
  P0i() {
    const e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
    return (
      e.BindOnCanExecuteChange(() => !1),
      e.BindOnExtendToggleClicked(this.w$t),
      e
    );
  }
}
exports.RewardItemList = RewardItemList;
// # sourceMappingURL=RewardItemList.js.map
