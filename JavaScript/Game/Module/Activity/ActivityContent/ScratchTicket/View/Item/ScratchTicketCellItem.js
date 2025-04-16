"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScratchTicketCellItem = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  UiViewSequence_1 = require("../../../../../../Ui/Base/UiViewSequence"),
  SmallItemGrid_1 = require("../../../../../Common/SmallItemGrid/SmallItemGrid"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract");
class ScratchTicketCellItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.inl = void 0),
      (this.rMt = void 0),
      (this.UiLevelSequence = void 0),
      (this.sft = void 0),
      (this.Hvl = () => {
        this.Hqe(this.inl), this.UiLevelSequence.PlaySequence("RevaelB");
      }),
      (this.lRo = () => {
        this.rMt && this.rMt(this.inl);
      }),
      (this.u6e = (e) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e.Data[0].ItemId,
        );
      }),
      (this.c6e = () => !1);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.lRo]]);
  }
  OnBeforeCreate() {
    (this.UiLevelSequence = new UiViewSequence_1.UiBehaviorLevelSequence(this)),
      this.AddUiBehavior(this.UiLevelSequence);
  }
  async OnBeforeStartAsync() {
    (this.sft = new SmallItemGrid_1.SmallItemGrid()),
      await this.sft.CreateThenShowByResourceIdAsync(
        "UiItem_ItemBaseB",
        this.GetItem(2),
      ),
      this.sft.BindOnExtendToggleClicked(this.u6e),
      this.sft.BindOnCanExecuteChange(this.c6e);
  }
  OnBeforeShow() {
    this.UiLevelSequence.AddSequenceFinishEvent("RevaelA", this.Hvl);
  }
  Refresh(e, t, i) {
    this.Hqe(e),
      this.GetItem(2).SetUIActive(!1),
      this.GetItem(3).SetUIActive(!1),
      this.GetSprite(1).SetUIActive(!1);
  }
  RefreshByResultData(e, t) {
    (this.inl = e),
      6 !== t.SequenceType && 7 !== t.SequenceType && this.Hqe(this.inl),
      this.lwr(t.SequenceType);
  }
  Hqe(e) {
    var e = (this.inl = e).GetItemData();
    void 0 === e
      ? (this.GetItem(2).SetUIActive(!1),
        this.GetItem(3).SetUIActive(!1),
        this.GetSprite(1).SetUIActive(!1))
      : (this.GetItem(2).SetUIActive(!0),
        this.GetItem(3).SetUIActive(!0),
        this.GetSprite(1).SetUIActive(!0),
        (e = {
          Data: e,
          Type: 4,
          ItemConfigId: e[0].ItemId,
          BottomText: e[1].toString(),
        }),
        this.sft.Apply(e));
  }
  lwr(e) {
    switch (e) {
      case 0:
      case 5:
        this.UiLevelSequence.PlaySequence("Strike");
        break;
      case 1:
        this.UiLevelSequence.PlaySequence("StrikeL");
        break;
      case 2:
        this.UiLevelSequence.PlaySequence("StrikeR");
        break;
      case 3:
        this.UiLevelSequence.PlaySequence("StrikeA");
        break;
      case 4:
        this.UiLevelSequence.PlaySequence("StrikeB");
        break;
      case 6:
        this.UiLevelSequence.PlaySequence("Warning");
        break;
      case 7:
        this.UiLevelSequence.PlaySequence("RevaelA");
    }
  }
  OnBeforeHide() {
    this.UiLevelSequence.RemoveSequenceFinishEvent("RevaelA", this.Hvl);
  }
  SetClickCallback(e) {
    this.rMt = e;
  }
}
exports.ScratchTicketCellItem = ScratchTicketCellItem;
//# sourceMappingURL=ScratchTicketCellItem.js.map
