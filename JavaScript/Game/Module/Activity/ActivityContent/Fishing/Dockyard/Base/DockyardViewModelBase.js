"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardViewModelBase = void 0);
const CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil");
class DockyardViewModelBase {
  constructor() {
    (this.Yzt = void 0),
      (this.IsInTrawlState = !1),
      (this.CloseClick = () => {
        this.BackpackPanelModel?.IsInSelectState
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_SelectingQuit",
            )
          : this.Yzt?.CloseMe();
      }),
      (this.CheckCurrencyItemClick = () =>
        !this.BackpackPanelModel?.IsInSelectState ||
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_SelectingQuit",
        ),
        !1));
  }
  get RequestCabinType() {
    return this.IsInTrawlState
      ? Protocol_1.Aki.Protocol.IXl.Proto_NetCabin
      : Protocol_1.Aki.Protocol.IXl.Proto_ShipCabin;
  }
  RegisterView(t) {
    (this.Yzt = t),
      this.BackpackPanelModel.RegisterViewModel(this),
      this.ListPanelModel.RegisterBackpackPanelModel(this.BackpackPanelModel);
  }
  AllSellClick() {}
  IsTrawlInteractive() {
    return this.IsInTrawlState;
  }
  SetInSelectState(t) {
    t ||
      (this.Yzt?.HideTipsPanel(),
      this.ListPanelModel.Panel?.SetDragTipsActive(!1));
  }
  TrawlClick(t) {
    (this.IsInTrawlState = t), this.Yzt?.SetTrawlState(t);
  }
  ItemBlockClick(t) {
    this.Yzt?.ShowTipsPanel(t);
  }
  DeleteClick() {
    var t = this.TXl(),
      e = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected(),
      t = {
        Type: this.RequestCabinType,
        LeftDataList: t,
        RightDataList: e,
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
  HandleDragResult() {
    if (this.BackpackPanelModel?.IsDragFail) {
      if (this.IsInTrawlState) {
        if (this.BackpackPanelModel.Panel.IsWareHouseDragToBackpack())
          return void this.BackpackPanelModel.Panel.SetItemBlockToWareHouse();
        if (this.ListPanelModel.CanDragToListPanel(!1)) return void this.bXl();
        this.ListPanelModel.RefreshDragTips(!1, !0);
      }
      this.BackpackPanelModel.Panel.HandleDragFail();
    } else this.BackpackPanelModel?.Panel.HandleDragSuccess();
  }
  BackpackTick(t) {
    this.BackpackPanelModel.Tick(),
      this.ListPanelModel.RefreshDragTips(
        this.BackpackPanelModel.IsInDragState,
        !this.BackpackPanelModel.IsDragFail,
      );
  }
  NotifyItemBlockToWareHouse(t) {
    this.ListPanelModel.SetItemBlockToWareHouse(t);
  }
  GetQuicklySellPanelParentItem() {
    return this.Yzt.GetQuicklySellPanelParentItem?.();
  }
  NotifyQuicklySellActive(t) {
    this.Yzt.NotifyQuicklySellActive?.(t);
  }
  async TrySetSelectedItemBlockToWareHouse() {
    return !!this.ListPanelModel.CanDragToListPanel(!0) && this.bXl();
  }
  async TrySetSelectedItemBlockToBackpack() {
    const e = new CustomPromise_1.CustomPromise();
    var t = this.GetLeftPanelItemBlockDataList(),
      i = this.BackpackPanelModel.Panel.GetItemBlockDataList(),
      t = {
        Type: this.RequestCabinType,
        LeftDataList: t,
        RightDataList: i,
        Callback: (t) => {
          t &&
            (this.ListPanelModel.DeleteSelectedItemBlockAndRefresh(),
            this.BackpackPanelModel.Panel.HandleFinishConfirm()),
            e.SetResult(t);
        },
      };
    return (
      ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(
        t,
      ),
      e.Promise
    );
  }
  GetLeftPanelItemBlockDataList() {
    var t = [];
    if (this.IsInTrawlState)
      for (const e of this.ListPanelModel.ShowItemList)
        e.IncId !== this.ListPanelModel.InSelectedBlockId &&
          t.push(e.GetServerData());
    return t;
  }
  TXl() {
    var t = [];
    if (this.IsInTrawlState)
      for (const e of this.ListPanelModel.ShowItemList)
        e.IncId !== this.ListPanelModel.InSelectedBlockId &&
          e.IncId !== this.BackpackPanelModel.InSelectedBlockId &&
          t.push(e.GetServerData());
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
    const e = new CustomPromise_1.CustomPromise();
    var t = this.GetLeftPanelItemBlockDataList(),
      i = this.BackpackPanelModel.Panel.GetItemBlockDataListExcludeSelected(),
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
          LeftDataList: t,
          RightDataList: i,
          Callback: (t) => {
            t
              ? this.BackpackPanelModel.Panel.SetItemBlockToWareHouse()
              : this.BackpackPanelModel.Panel.HandleDragFail(),
              e.SetResult(t);
          },
        });
    return (
      ControllerHolder_1.ControllerHolder.FishingController.RequestFishingCabinPut(
        s,
      ),
      e.Promise
    );
  }
  GetItemBlockData(t) {
    var e = ModelManager_1.ModelManager.DockyardModel.GetItemBlockData(t);
    return e || ModelManager_1.ModelManager.DockyardModel.GetDataByTrawl(t);
  }
}
exports.DockyardViewModelBase = DockyardViewModelBase;
//# sourceMappingURL=DockyardViewModelBase.js.map
