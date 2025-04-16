"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardBackpackPanelModelBase = void 0);
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../../../../../ConfirmBox/ConfirmBoxDefine"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardBackpackData_1 = require("../Bag/DockyardBackpackData");
class DockyardBackpackPanelModelBase {
  constructor() {
    (this.fXl = !1),
      (this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID),
      (this.IsInDragState = !1),
      (this.IsOutOfRange = !1),
      (this.IsSetFail = !1),
      (this.Panel = void 0),
      (this.ViewModel = void 0),
      (this.PreviewBackpackMap = new Map()),
      (this.TempQuicklySellType = 0),
      (this.TempQuicklySellIncIdSet = new Set()),
      (this.BackpackData = void 0),
      (this.IsDragFail = !1),
      (this.IsMoved = !1),
      (this.QuicklySellClick = () => {
        var i;
        this.IsInSelectState
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_SelectingQuit",
            )
          : ((i = this.Panel.GetQuicklySellItemIdList()),
            ModelManager_1.ModelManager.FishingQuestModel.OnFishingItemSell(
              i,
              this.IsInSelectState,
              () => {
                this.xg1();
              },
            ) || this.xg1());
      }),
      (this.OnSellClick = (i) => {
        1 === i
          ? (this.ViewModel?.NotifyQuicklySellActive?.(!0),
            this.Panel.ShowQuicklySellPanel())
          : (this.ViewModel?.NotifyQuicklySellActive?.(!1),
            this.Panel.HideQuicklySellPanel());
      }),
      (this.OnTrawlClick = (i) => {
        this.IsInSelectState
          ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "Fishing_SelectingQuit",
            )
          : this.ViewModel?.TrawlClick?.(1 === i);
      }),
      (this.OnDeleteClick = () => {
        var i;
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10076)
          ? ((i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(
              235,
            )).FunctionMap.set(2, () => {
              this.ViewModel?.DeleteClick?.();
            }),
            ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
              i,
            ))
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "NotOpen",
            );
      }),
      (this.OnRotateClick = () => {
        this.ViewModel?.RotateClick?.();
      }),
      (this.OnConfirmClick = () => {
        this.ViewModel?.ConfirmClick?.();
      }),
      (this.OnAllSellClick = () => {
        this.ViewModel?.AllSellClick?.();
      }),
      (this.OnBackToWareHouseClick = () => {
        this.TrySetItemBlockBackToWareHouse();
      }),
      (this.OnMaskClick = () => {
        ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_SelectingQuit",
        );
      }),
      (this.BackpackTick = (i) => {
        this.IsInSelectState &&
          this.IsInDragState &&
          this.InSelectedBlockId !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID &&
          this.ViewModel?.BackpackTick?.(i);
      }),
      (this.IsAllSellOpen = !1),
      (this.IsDeleteOpen = !0),
      (this.BackpackData = new DockyardBackpackData_1.DockyardBackpackData(
        this.IsQuickSellOpen(),
      ));
  }
  get IsInSelectState() {
    return this.fXl;
  }
  set IsInSelectState(i) {
    (this.fXl = i),
      this.Panel.SetAllSellBtnState(i),
      this.Panel.SetItemBlockTextureMaskActive(i),
      this.ViewModel?.SetInSelectState?.(i),
      i || this.Panel.SetButtonsState(!1);
  }
  get IsInHighlight() {
    return !this.IsInCanConfirm;
  }
  get IsInCanConfirm() {
    return !this.IsSetFail && !this.IsOverlap();
  }
  yXl() {
    for (const i of this.BackpackData.GetBackpackDataList())
      this.PreviewBackpackMap.set(i, FishingDefine_1.UNVALID_ITEM_BLOCK_ID);
  }
  SetPreviewBackpackData(i, t) {
    this.PreviewBackpackMap.set(i, t);
  }
  GetPreviewBackpackData(i) {
    return this.PreviewBackpackMap.get(i);
  }
  RefreshBackpackQuicklySellData() {
    this.BackpackData.RefreshQuicklySellOpen(this.IsQuickSellOpen());
  }
  InitPanel(i) {
    (this.Panel = i), this.yXl();
  }
  RegisterViewModel(i) {
    this.ViewModel = i;
  }
  SetItemBlockToWareHouse(i) {
    this.ViewModel?.NotifyItemBlockToWareHouse?.(i);
  }
  xg1() {
    ControllerHolder_1.ControllerHolder.FishingController.RequestFishingQuickSell(
      (i) => {
        if (i) {
          this.Panel.CloseQuicklySellPanel();
          for (const t of this.TempQuicklySellIncIdSet)
            this.Panel.DestroyItemBlockById(t);
          this.TempQuicklySellIncIdSet.clear();
        }
      },
    );
  }
  Tick() {
    this.RefreshPanel();
  }
  RefreshPanel(i = !0) {
    this.Panel.RefreshAllBackpackGridState(i);
    (i = this.ViewModel?.IsConfirmInteractive
      ? this.ViewModel.IsConfirmInteractive()
      : !this.IsSetFail),
      this.Panel.SetConfirmInteractive(i),
      (i = this.ViewModel?.IsConfirmNiagaraActive
        ? this.ViewModel.IsConfirmNiagaraActive()
        : this.IsInCanConfirm);
    this.Panel.SetConfirmNiagaraActive(i);
  }
  CanConfirm() {
    return this.Panel.CanConfirm();
  }
  IsOverlap() {
    return this.Panel.IsOverlap();
  }
  GetQuicklySellPanelParentItem() {
    return this.ViewModel.GetQuicklySellPanelParentItem?.();
  }
  OnItemBlockClick(i) {
    this.IsInSelectState ||
      (this.Panel.ItemBlockClick(i), this.ViewModel?.ItemBlockClick(i));
  }
  CanDrag(i) {
    return this.Panel.CanDrag(i);
  }
  DragBegin(i) {
    return (
      !this.IsInDragState &&
      ((this.IsInDragState = !0),
      (this.IsMoved = !1),
      this.ViewModel?.HandleDragBegin?.(),
      this.Panel.SetButtonsState(!1),
      !0)
    );
  }
  DragEnd(i) {
    return (
      !!this.IsInDragState &&
      ((this.IsInDragState = !1), this.ViewModel?.HandleDragResult(), !0)
    );
  }
  WareHouseItemClick(i) {
    this.Panel.CreateItemBlockByView(i);
  }
  WareHouseItemDragBegin(i) {
    this.Panel.CreateItemBlockByViewAndFollow(i);
  }
  IsWareHouseItemCanClick(i) {
    return !this.IsInSelectState;
  }
  GetSelectedId() {
    return this.InSelectedBlockId;
  }
  async TrySetItemBlockBackToWareHouse() {
    return (
      this.InSelectedBlockId === FishingDefine_1.UNVALID_ITEM_BLOCK_ID ||
      ((await this.ViewModel?.TrySetSelectedItemBlockToWareHouse?.()) ?? !0)
    );
  }
  async TrySetSelectedItemBlockConfirm() {
    return (
      this.InSelectedBlockId === FishingDefine_1.UNVALID_ITEM_BLOCK_ID ||
      (this.IsInCanConfirm
        ? ((await this.ViewModel?.TrySetSelectedItemBlockToBackpack?.()) ?? !0)
        : ((await this.ViewModel?.TrySetSelectedItemBlockToWareHouse?.()) ??
          !0))
    );
  }
  IsQuickSellOpen() {
    return (
      !ModelManager_1.ModelManager.FishingModel.IsInDock &&
      ModelManager_1.ModelManager.DockyardModel.IsQuicklySellOpen
    );
  }
  GetIsTrawlOpen() {
    return !1;
  }
  GetIsBackToWareHouseOpen() {
    return !0;
  }
}
exports.DockyardBackpackPanelModelBase = DockyardBackpackPanelModelBase;
//# sourceMappingURL=DockyardBackpackPanelModelBase.js.map
