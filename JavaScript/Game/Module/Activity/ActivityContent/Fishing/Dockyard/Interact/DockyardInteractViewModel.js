"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardInteractViewModel = void 0);
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil"),
  DockyardInteractBackpackPanelModel_1 = require("./DockyardInteractBackpackPanelModel"),
  DockyardInteractPanelModel_1 = require("./DockyardInteractPanelModel");
class DockyardInteractViewModel {
  constructor() {
    (this.Yzt = void 0),
      (this.ConfigId = -1),
      (this.ActionIncId = -1),
      (this.IsComplete = !1),
      (this.BackpackPanelModel =
        new DockyardInteractBackpackPanelModel_1.DockyardInteractBackpackPanelModel()),
      (this.InteractPanelModel =
        new DockyardInteractPanelModel_1.DockyardInteractPanelModel()),
      (this.JXl = void 0),
      (this.CloseClick = () => {
        this.BackpackPanelModel.IsInSelectState
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_SelectingQuit",
            )
          : this.Yzt?.CloseMe();
      }),
      (this.CheckCurrencyItemClick = () =>
        !this.BackpackPanelModel.IsInSelectState ||
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_SelectingQuit",
        ),
        !1));
  }
  RegisterView(t) {
    (this.Yzt = t),
      (this.BackpackPanelModel.ConfigId = this.ConfigId),
      this.BackpackPanelModel.RegisterViewModel(this),
      (this.InteractPanelModel.ConfigId = this.ConfigId),
      this.InteractPanelModel.RegisterViewModel(this),
      this.BackpackPanelModel.RegisterInteractPanel(this.InteractPanelModel),
      this.InteractPanelModel.RegisterBackpackPanel(this.BackpackPanelModel);
  }
  SetInSelectState(t) {
    t || this.Yzt?.HideTipsPanel();
  }
  ItemBlockClick(t) {
    this.Yzt?.ShowTipsPanel(t);
  }
  DeleteClick() {
    var t = this.TXl(),
      i = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected(),
      t = {
        InteractId: this.ConfigId,
        LeftDataList: t,
        RightDataList: i,
        ActionIncId: this.ActionIncId,
        RemoveIncId: this.BackpackPanelModel.InSelectedBlockId,
        Callback: (t) => {
          t && this.BackpackPanelModel.Panel.DestroySelectItemBlock();
        },
      };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingHandIn(
      t,
    );
  }
  RotateClick() {
    this.BackpackPanelModel.IsOutOfRange
      ? this.InteractPanelModel.IsOutOfRange ||
        this.InteractPanelModel.Panel.RotateClick()
      : this.BackpackPanelModel.Panel.RotateClick();
  }
  ConfirmClick() {
    var t, i;
    this.JXl &&
      (this.JXl.CanConfirm()
        ? this.JXl.IsOverlap()
          ? this.JXl.Panel.HandleOverlapConfirm()
          : ((i = this.LXl()),
            (t = this.qr_()),
            (i = {
              InteractId: this.ConfigId,
              LeftDataList: i,
              RightDataList: t,
              ActionIncId: this.ActionIncId,
              Callback: (t, i) => {
                (this.IsComplete = i),
                  t && this.JXl?.Panel.HandleFinishConfirm(),
                  i && this.Yzt?.OpenInteractFinishTipsView();
              },
            }),
            ControllerHolder_1.ControllerHolder.FishingController.RequestFishingHandIn(
              i,
            ))
        : this.JXl.ShowScrollingTips());
  }
  HandleDragBegin() {
    this.InteractPanelModel.LastCanTickState
      ? (this.JXl = this.InteractPanelModel)
      : this.BackpackPanelModel.IsOutOfRange ||
        (this.JXl = this.BackpackPanelModel);
  }
  HandleDragResult() {
    this.BackpackPanelModel.IsOutOfRange
      ? this.InteractPanelModel.IsOutOfRange
        ? (this.InteractPanelModel.LastCanTickState
            ? ((this.JXl = this.InteractPanelModel),
              this.InteractPanelModel.Panel)
            : this.JXl?.Panel
          ).HandleDragFail()
        : ((this.JXl = this.InteractPanelModel),
          this.InteractPanelModel.Panel.HandleDragSuccess())
      : ((this.JXl = this.BackpackPanelModel),
        this.BackpackPanelModel.Panel.HandleDragSuccess());
  }
  BackpackTick(t) {
    this.InteractPanelModel.Tick(t), this.BackpackPanelModel.Tick();
  }
  IsConfirmInteractive() {
    return (
      this.InteractPanelModel.CanConfirm() || !this.BackpackPanelModel.IsSetFail
    );
  }
  IsConfirmNiagaraActive() {
    return (
      this.InteractPanelModel.CanConfirm() ||
      this.BackpackPanelModel.IsInCanConfirm
    );
  }
  GetItemBlockDataByIncId(t) {
    return this.BackpackPanelModel.Panel.GetOriginalItemBlockDataByIncId(t);
  }
  LXl() {
    var t,
      i,
      e = [];
    for (const r of this.InteractPanelModel.ShowItemMap.values()) {
      var s = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(
        r.Data,
        r.Rotate,
        r.Pos,
      );
      e.push(s);
    }
    return (
      this.JXl === this.InteractPanelModel &&
        ((i = this.BackpackPanelModel.Panel.InSelectItemBlock.GetData()),
        (t = this.JXl.Panel.GetLeftTopPanelPos(i.Data.ItemId)),
        (i = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(
          i.Data,
          i.Rotate,
          t,
        )),
        e.push(i)),
      e
    );
  }
  qr_() {
    var t = this.BackpackPanelModel.Panel.GetItemBlockDataList();
    if (this.JXl === this.InteractPanelModel)
      for (const i of t)
        if (i.b9n === this.BackpackPanelModel.InSelectedBlockId) {
          t.splice(t.indexOf(i), 1);
          break;
        }
    return t;
  }
  TXl() {
    var t,
      i = [];
    for (const e of this.InteractPanelModel.ShowItemMap.values())
      e.Data.IncId !== this.BackpackPanelModel.InSelectedBlockId &&
        ((t = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(
          e.Data,
          e.Rotate,
          e.Pos,
        )),
        i.push(t));
    return i;
  }
}
exports.DockyardInteractViewModel = DockyardInteractViewModel;
//# sourceMappingURL=DockyardInteractViewModel.js.map
