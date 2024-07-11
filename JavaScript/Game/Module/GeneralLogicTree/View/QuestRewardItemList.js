"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.QuestRewardItemList = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  GenericScrollView_1 = require("../../Util/ScrollView/GenericScrollView"),
  QuestRewardItemGrid_1 = require("./QuestRewardItemGrid");
class QuestRewardItemList extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.wqe = void 0),
      (this.kGe = void 0),
      (this.OFt = void 0),
      (this.d2t = (e, r, t) => {
        r = this.xYt(r);
        return r.Refresh(e, !1, t), { Key: t, Value: r };
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
      }),
      e && this.CreateThenShowByActor(e);
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
      (this.kGe = new GenericScrollView_1.GenericScrollView(
        this.GetScrollViewWithScrollbar(2),
        this.d2t,
      ));
  }
  Refresh(e) {
    e.sort((e, r) => {
      var t = e.GetTypeSortIndex(),
        i = r.GetTypeSortIndex();
      return t !== i
        ? i - t
        : (i = e.GetQualityId()) !== (t = r.GetQualityId())
          ? t - i
          : e.ConfigId - r.ConfigId;
    }),
      this.kGe.RefreshByData(e);
  }
  xYt(e) {
    var r = new QuestRewardItemGrid_1.QuestRewardItemGrid();
    return (
      r.Initialize(e.GetOwner()),
      r.BindOnCanExecuteChange(() => !1),
      r.BindOnExtendToggleClicked(this.wYt),
      r.SetActive(!0),
      r
    );
  }
}
exports.QuestRewardItemList = QuestRewardItemList;
//# sourceMappingURL=QuestRewardItemList.js.map
