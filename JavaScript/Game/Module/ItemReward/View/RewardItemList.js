"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RewardItemList = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  RewardSmallItemGrid_1 = require("./RewardSmallItemGrid");
class RewardItemList extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wqe = void 0),
      (this.kGe = void 0),
      (this.OFt = void 0),
      (this.d2t = () => {
        return this.Pfi();
      }),
      (this.wYt = (e) => {
        this.OFt?.SetSelected(!1, !0), (this.OFt = e.MediumItemGrid);
        var e = e.Data,
          r = e.ConfigId,
          e = e.UniqueId;
        void 0 !== e && 0 < e
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
        this.d2t,
      ));
  }
  OnBeforeDestroy() {
    (this.OFt = void 0), (this.kGe = void 0);
  }
  Refresh(e) {
    e.sort((e, r) => {
      var i = e.GetTypeSortIndex(),
        t = r.GetTypeSortIndex();
      return i !== t
        ? t - i
        : (t = e.GetQualityId()) !== (i = r.GetQualityId())
          ? i - t
          : e.ConfigId - r.ConfigId;
    }),
      this.kGe.RefreshByData(e);
  }
  Pfi() {
    var e = new RewardSmallItemGrid_1.RewardSmallItemGrid();
    return (
      e.BindOnCanExecuteChange(() => !1),
      e.BindOnExtendToggleClicked(this.wYt),
      e
    );
  }
}
exports.RewardItemList = RewardItemList;
//# sourceMappingURL=RewardItemList.js.map
