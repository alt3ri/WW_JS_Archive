"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardWareHouseViewModelBase = void 0);
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardWareHouseViewModelBase {
  constructor() {
    (this.View = void 0),
      (this.ViewTitle = ""),
      (this.CloseClick = () => {
        this.BackpackPanelModel?.IsInSelectState
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_SelectingQuit",
            )
          : this.OnCloseClick();
      }),
      (this.CheckCurrencyItemClick = () =>
        !this.BackpackPanelModel.IsInSelectState ||
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_SelectingQuit",
        ),
        !1));
  }
  RegisterView(t) {
    (this.View = t),
      this.BackpackPanelModel.RegisterViewModel(this),
      this.ListPanelModel.RegisterBackpackPanelModel(this.BackpackPanelModel),
      this.OnInit();
  }
  ItemBlockClick(t) {
    this.View?.ShowTipsPanel(t);
  }
  SetInSelectState(t) {
    t ||
      (this.View?.HideTipsPanel(),
      this.ListPanelModel.Panel?.SetDragTipsActive(!1));
  }
  HandleDragResult() {
    this.BackpackPanelModel.IsDragFail
      ? this.BackpackPanelModel.Panel.IsWareHouseDragToBackpack()
        ? this.BackpackPanelModel.Panel.SetItemBlockToWareHouse()
        : this.ListPanelModel.CanDragToListPanel(!1)
          ? this.bXl()
          : (this.BackpackPanelModel.Panel.HandleDragFail(),
            this.ListPanelModel.RefreshDragTips(!1, !0))
      : this.BackpackPanelModel.Panel.HandleDragSuccess();
  }
  DeleteClick() {
    var t = this.TXl(),
      i = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected(),
      t = {
        Type: this.RequestCabinType,
        RequestId: this.RequestId,
        LeftDataList: t,
        RightDataList: i,
        RemoveIncId: this.BackpackPanelModel.InSelectedBlockId,
        Callback: (t) => {
          t &&
            (this.ListPanelModel.DeleteSelectedItemBlockAndRefresh(),
            this.BackpackPanelModel.Panel.DestroySelectItemBlock());
        },
      };
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(
      t,
    );
  }
  RotateClick() {
    this.BackpackPanelModel.IsOutOfRange ||
      this.BackpackPanelModel.Panel.RotateClick();
  }
  ConfirmClick() {
    this.BackpackPanelModel.CanConfirm()
      ? this.BackpackPanelModel.IsOverlap()
        ? this.BackpackPanelModel.Panel.HandleOverlapConfirm()
        : this.TrySetSelectedItemBlockToBackpack()
      : ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_CantPutDown",
        );
  }
  NotifyItemBlockToWareHouse(t) {
    this.ListPanelModel.SetItemBlockToWareHouse(t);
  }
  BackpackTick(t) {
    this.BackpackPanelModel.Tick(),
      this.ListPanelModel.RefreshDragTips(
        this.BackpackPanelModel.IsInDragState,
        !this.BackpackPanelModel.IsDragFail,
      );
  }
  GetQuicklySellPanelParentItem() {
    return this.View.GetPanelParentItem();
  }
  NotifyQuicklySellActive(t) {
    this.View.NotifyQuicklySellActive(t);
  }
  async TrySetSelectedItemBlockToWareHouse() {
    return !!this.ListPanelModel.CanDragToListPanel(!0) && this.bXl();
  }
  async TrySetSelectedItemBlockToBackpack() {
    const i = new CustomPromise_1.CustomPromise();
    var t = this.LXl(),
      e = this.BackpackPanelModel.Panel.GetItemBlockDataList(),
      t = {
        Type: this.RequestCabinType,
        RequestId: this.RequestId,
        LeftDataList: t,
        RightDataList: e,
        Callback: (t) => {
          t &&
            (this.ListPanelModel.DeleteSelectedItemBlockAndRefresh(),
            this.BackpackPanelModel.Panel.HandleFinishConfirm()),
            i.SetResult(t);
        },
      };
    return (
      ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(
        t,
      ),
      i.Promise
    );
  }
  LXl() {
    var t = [];
    for (const i of this.ListPanelModel.ShowItemList)
      i.IncId !== this.ListPanelModel.InSelectedBlockId &&
        t.push(i.GetServerData());
    return t;
  }
  TXl() {
    var t = [];
    for (const i of this.ListPanelModel.ShowItemList)
      i.IncId !== this.ListPanelModel.InSelectedBlockId &&
        i.IncId !== this.BackpackPanelModel.InSelectedBlockId &&
        t.push(i.GetServerData());
    return t;
  }
  async bXl() {
    if (
      this.ListPanelModel.HasItemBlockInWareHouse(
        this.BackpackPanelModel.InSelectedBlockId,
      )
    )
      return (
        this.ListPanelModel.ResetSelectedBlock(),
        this.ListPanelModel.Panel.RefreshListItemStateByIncId(
          this.BackpackPanelModel.InSelectedBlockId,
        ),
        this.BackpackPanelModel.Panel.DestroySelectItemBlock(),
        !0
      );
    const i = new CustomPromise_1.CustomPromise();
    var t = this.LXl(),
      e = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected(),
      s = this.BackpackPanelModel.Panel.InSelectItemBlock.GetData(),
      s = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(
        s.Data,
        s.Rotate,
        s.LeftTopPosInPanel,
      ),
      s =
        (t.push(s),
        {
          Type: this.RequestCabinType,
          RequestId: this.RequestId,
          LeftDataList: t,
          RightDataList: e,
          Callback: (t) => {
            t
              ? this.BackpackPanelModel.Panel.SetItemBlockToWareHouse()
              : this.BackpackPanelModel.Panel.HandleDragFail(),
              i.SetResult(t);
          },
        });
    return (
      ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(
        s,
      ),
      i.Promise
    );
  }
  OnInit() {}
  async BeforeStartAsync() {
    await this.View?.CreateQuestPanel(!1);
  }
  OnCloseClick() {
    this.View?.CloseMe();
  }
  get RequestId() {
    return 0;
  }
}
exports.DockyardWareHouseViewModelBase = DockyardWareHouseViewModelBase;
//# sourceMappingURL=DockyardWareHouseViewModelBase.js.map
