"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardWareHouseView = void 0);
const UE = require("ue"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../../../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../../../../../Ui/Common/PopupCaptionItem"),
  FishingDefine_1 = require("../../FishingDefine"),
  FishingCurrencyItem_1 = require("../../FishingDock/FishingCurrencyItem"),
  DockyardBackpackPanel_1 = require("../Bag/DockyardBackpackPanel"),
  DockyardItemListPanel_1 = require("../List/DockyardItemListPanel"),
  DockyardQteSkipPanel_1 = require("../Qte/DockyardQteSkipPanel"),
  DockyardQuestInfoPanel_1 = require("../Tips/DockyardQuestInfoPanel"),
  DockyardTipsPanel_1 = require("../Tips/DockyardTipsPanel");
class DockyardWareHouseView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.lqe = void 0),
      (this.HXl = void 0),
      (this.jYl = void 0),
      (this.WXl = void 0),
      (this.ii_ = void 0),
      (this.S9_ = void 0),
      (this.HLn = void 0),
      (this.vQ_ = 1),
      (this.oec = !1),
      (this.nec = 0);
  }
  OnRegisterComponent() {
    this.QXl(),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UIItem],
        [2, UE.UIItem],
        [3, UE.UIItem],
        [4, UE.UIItem],
        [5, UE.UIItem],
      ]);
  }
  QXl() {
    (this.HLn = this.OpenParam), this.HLn.RegisterView(this);
  }
  async $D_() {
    await new FishingCurrencyItem_1.FishingCurrencyItem().CreateThenShowByResourceIdAsync(
      "UIItem_CommonCurrencyItem",
      this.lqe.GetCostContent(),
    );
  }
  async zDn() {
    (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.HLn.CloseClick),
      this.lqe.SetTitleByTextIdAndArgNew(this.HLn.ViewTitle),
      await this.$D_(),
      await this.lqe.SetCurrencyItemList([
        FishingDefine_1.FISHING_CURRENCY_ITEMID,
      ]);
    for (const i of this.lqe.GetCurrencyItemList())
      i.SetTextureClickCheckFunction(this.HLn.CheckCurrencyItemClick);
  }
  async $Xl() {
    (this.HXl = new DockyardBackpackPanel_1.DockyardBackpackPanel(
      this.HLn.BackpackPanelModel,
    )),
      await this.HXl.CreateThenShowByActorAsync(this.GetItem(1).GetOwner());
  }
  async OYl() {
    (this.jYl = new DockyardItemListPanel_1.DockyardItemListPanel()),
      await this.jYl.CreateByActorAsync(
        this.GetItem(2).GetOwner(),
        this.HLn.ListPanelModel,
      ),
      this.AddChild(this.jYl);
  }
  async XXl() {
    (this.WXl = new DockyardTipsPanel_1.DockyardTipsPanel()),
      await this.WXl.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  MQ_() {
    return this.ii_ ?? this.S9_;
  }
  async OnBeforeStartAsync() {
    await Promise.all([
      this.zDn(),
      this.$Xl(),
      this.OYl(),
      this.XXl(),
      this.HLn.BeforeStartAsync(),
    ]),
      (this.HLn.BackpackPanelModel.IsInSelectState = !1);
  }
  OnBeforeShow() {
    this.S9_?.Refresh();
  }
  OnTick(i) {
    var t;
    this.oec &&
      (0 === this.vQ_
        ? ((t = this.HLn.GetItemBlockData(this.nec)),
          this.WXl.Refresh(t),
          this.WXl.SetPanelVisible(!0),
          this.MQ_().SetPanelVisible(!1))
        : 1 === this.vQ_ &&
          (this.WXl.SetPanelVisible(!1), this.MQ_().SetPanelVisible(!0)),
      (this.oec = !1),
      (this.nec = 0));
  }
  ShowTipsPanel(i) {
    (this.oec = !0), (this.vQ_ = 0), (this.nec = i);
  }
  HideTipsPanel() {
    (this.oec = !0), (this.vQ_ = 1);
  }
  GetPanelParentItem() {
    return this.GetItem(4);
  }
  NotifyQuicklySellActive(i) {
    var t = this.MQ_(),
      e = 0 === this.vQ_ ? this.WXl : t;
    i
      ? (e.SetPanelVisible(!1), (t.LockState = !0), (this.WXl.LockState = !0))
      : ((t.LockState = !1), (this.WXl.LockState = !1), e.SetPanelVisible(!0));
  }
  async CreateQteSkipPanel() {
    (this.ii_ = new DockyardQteSkipPanel_1.DockyardQteSkipPanel()),
      await this.ii_.CreateThenShowByResourceIdAsync(
        "PnlNavigationFishNum",
        this.GetItem(5),
      );
    var i = ModelManager_1.ModelManager.FishingQteModel.GameInfo,
      [i, t] = [i.CurrentRound, i.MaxRound];
    this.ii_.SetQtePanelText(i, t);
    (this.ii_.ContinueFunc = () => {
      this.CloseMe();
    }),
      (this.ii_.ExitFunc = () => {
        ControllerHolder_1.ControllerHolder.FishingController.ShowConfirmBoxAndRequestFishingExit(
          (i) => {
            i && this.CloseMe();
          },
        );
      });
  }
  async CreateQuestPanel(i) {
    (this.S9_ = new DockyardQuestInfoPanel_1.DockyardQuestInfoPanel()),
      await this.S9_.CreateByResourceIdAsync(
        "PnlNavigationEntrustInfo",
        this.GetItem(5),
      );
    (this.S9_.ExitFunc = () => {
      ControllerHolder_1.ControllerHolder.FishingController.ShowConfirmBoxAndRequestFishingExit(
        (i) => {
          i && this.CloseMe();
        },
      );
    }),
      this.S9_.SetButtonExitVisible(i);
  }
  GetGuideUiItemAndUiItemForShowEx(i) {
    return this.jYl.GetGuideUiItemAndUiItemForShowEx(i);
  }
}
exports.DockyardWareHouseView = DockyardWareHouseView;
//# sourceMappingURL=DockyardWareHouseView.js.map
