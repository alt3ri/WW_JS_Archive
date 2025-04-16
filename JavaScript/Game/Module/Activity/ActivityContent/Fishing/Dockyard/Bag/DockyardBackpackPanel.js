"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardBackpackPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  TickSystem_1 = require("../../../../../../../Core/Tick/TickSystem"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer"),
  LguiEventSystemManager_1 = require("../../../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil"),
  DockyardItemBlock_1 = require("../Item/DockyardItemBlock"),
  DockyardQuicklySellPanel_1 = require("../Tips/DockyardQuicklySellPanel"),
  DockyardBackpackGrid_1 = require("./DockyardBackpackGrid");
class ButtonSequencePlayer {
  constructor(t) {
    (this.UiItem = t),
      (this.$pt = void 0),
      (this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.UiItem));
  }
  SetActive(t) {
    this.UiItem.SetUIActive(t), t && this.$pt.PlaySequencePurely("Show");
  }
  Clear() {
    this.$pt.Clear();
  }
}
class DockyardBackpackPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.InSelectItemBlock = void 0),
      (this.V$l = new Map()),
      (this.YJl = new Set()),
      (this.j$l = new Set()),
      (this.Layout = void 0),
      (this.ItemBlockMap = new Map()),
      (this.sKe = TickSystem_1.TickSystem.InvalidId),
      (this.PanelModel = void 0),
      (this.m8t = void 0),
      (this.H$l = !0),
      (this.W$l = void 0),
      (this.DragRoot = void 0),
      (this.Q$l = void 0),
      (this.K$l = TickSystem_1.TickSystem.InvalidId),
      (this.$$l = {
        RowStartIndex: -1,
        RowEndIndex: -1,
        ColStartIndex: -1,
        ColEndIndex: -1,
      }),
      (this.X$l = {
        RowStartIndex: -1,
        RowEndIndex: -1,
        ColStartIndex: -1,
        ColEndIndex: -1,
      }),
      (this.zx_ = void 0),
      (this.Jx_ = void 0),
      (this.ga = void 0),
      (this.vYl = void 0),
      (this.Zx_ = void 0),
      (this.eU_ = void 0),
      (this.Sk_ = void 0),
      (this.yr_ = () => {
        this.mGe(), this.zO_();
      }),
      (this.sGe = () => {
        return new DockyardBackpackGrid_1.DockyardBackpackGrid(this.PanelModel);
      }),
      (this.Y$l = () => {
        var t =
            LguiEventSystemManager_1.LguiEventSystemManager.IsPressComponentIsValid(
              0,
            ),
          i =
            LguiEventSystemManager_1.LguiEventSystemManager.IsNowTriggerPressed(
              0,
            );
        t || i
          ? ((t =
              LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
                0,
                !0,
              )),
            this.InSelectItemBlock?.OnDrag(t))
          : (this.InSelectItemBlock?.OnDragEnd(), this.z$l());
      }),
      (this.QuicklySellPanel = void 0),
      (this.Ozl = new Set()),
      (this.PanelModel = t),
      this.PanelModel.InitPanel(this);
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UILayoutBase],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIExtendToggle],
      [5, UE.UIExtendToggle],
      [6, UE.UIButtonComponent],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIButtonComponent],
      [11, UE.UIButtonComponent],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [4, this.PanelModel.OnSellClick],
        [5, this.PanelModel.OnTrawlClick],
        [6, this.PanelModel.OnDeleteClick],
        [7, this.PanelModel.OnRotateClick],
        [8, this.PanelModel.OnConfirmClick],
        [10, this.PanelModel.OnAllSellClick],
        [11, this.PanelModel.OnBackToWareHouseClick],
        [13, this.PanelModel.OnMaskClick],
      ]);
  }
  J$l() {
    (this.sKe = TickSystem_1.TickSystem.Add(
      this.PanelModel.BackpackTick,
      "DockyardBackpackPanel",
      0,
      !0,
    ).Id),
      this.sKe !== TickSystem_1.TickSystem.InvalidId &&
        TickSystem_1.TickSystem.Pause(this.sKe);
  }
  Z$l() {
    (this.zx_ = new ButtonSequencePlayer(this.GetExtendToggle(4).RootUIComp)),
      (this.Jx_ = new ButtonSequencePlayer(this.GetExtendToggle(5).RootUIComp)),
      (this.ga = new ButtonSequencePlayer(this.GetButton(6).RootUIComp)),
      (this.vYl = new ButtonSequencePlayer(this.GetButton(7).RootUIComp)),
      (this.Zx_ = new ButtonSequencePlayer(this.GetButton(8).RootUIComp)),
      (this.eU_ = new ButtonSequencePlayer(this.GetButton(10).RootUIComp)),
      (this.Sk_ = new ButtonSequencePlayer(this.GetButton(11).RootUIComp)),
      (this.Q$l = this.GetItem(2)),
      (this.W$l = this.GetItem(9)),
      (this.DragRoot = this.GetItem(3)),
      (this.m8t = this.GetButton(8)),
      this.m8t.SetCanClickWhenDisable(!0),
      (this.H$l = this.m8t.IsSelfInteractive),
      this.eXl(),
      this.tXl(),
      this.SetConfirmNiagaraActive(!1),
      this.k8_(!1);
  }
  eXl() {
    this.zx_.SetActive(this.PanelModel.IsQuickSellOpen()),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFishingBackpackQuickSellToggleStateChange,
        this.PanelModel.IsQuickSellOpen(),
      );
  }
  tXl() {
    this.Jx_.SetActive(this.PanelModel.GetIsTrawlOpen());
  }
  async dAn() {
    this.Layout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(1),
      this.sGe,
      this.Q$l.GetOwner(),
    );
    var t = this.PanelModel.BackpackData.GetBackpackDataList();
    if (
      (await this.Layout.RefreshByDataAsync(t, !0),
      this.PanelModel.IsQuickSellOpen())
    )
      for (const i of this.Layout.GetLayoutItemList())
        i.IsQuicklySell() && this.Ozl.add(i);
  }
  async iXl(t, i) {
    var e = new DockyardItemBlock_1.DockyardItemBlock(t);
    return (
      (e.OpenParam = this.PanelModel),
      this.ItemBlockMap.set(t.Data.IncId, e),
      await e.CreateThenShowByResourceIdAsync(
        "UiItem_InteractionSeaGridItem",
        i,
      ),
      e
    );
  }
  oXl() {
    for (const t of this.Layout.GetLayoutItemList()) t.ResetPreviewBgForce();
    for (const i of this.ItemBlockMap.values())
      i.InitAnchorOffset(
        this.Q$l.Width,
        this.Q$l.Height,
        i.GetData().LeftTopPosInPanel.RowIndex,
        i.GetData().LeftTopPosInPanel.ColIndex,
      ),
        this.nXl(i);
  }
  mGe() {
    var t = ModelManager_1.ModelManager.DockyardModel.BackpackUseSize,
      i = ModelManager_1.ModelManager.DockyardModel.BackpackSize;
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      "Fishing_CabinCapacity",
      t,
      i,
    );
  }
  zO_() {
    var t =
      0 < ModelManager_1.ModelManager.DockyardModel.GetTrawlDataList().length;
    this.GetItem(12)?.SetUIActive(t);
  }
  k8_(t) {
    this.GetItem(14)?.SetUIActive(t);
  }
  async OnBeforeStartAsync() {
    this.J$l(),
      this.Z$l(),
      await Promise.all([this.dAn(), this.aXl()]),
      this.mGe(),
      this.zO_(),
      this.Fzl();
  }
  async PKt() {
    var t = this.PanelModel.BackpackData.GetBackpackItemMap();
    if (0 < this.ItemBlockMap.size) {
      this.PanelModel.BackpackData.RefreshBackpackData();
      for (const a of this.ItemBlockMap.keys())
        t.get(a) || this.DestroyItemBlockById(a);
      var i,
        e,
        s = [];
      for ([i, e] of t) {
        var h = this.ItemBlockMap.get(i);
        h ? h.RefreshItemBlockData(e) : s.push(this.iXl(e, this.W$l));
      }
      await Promise.all(s);
    } else {
      var r = [];
      for (const n of t.values()) r.push(this.iXl(n, this.W$l));
      await Promise.all(r);
    }
    this.oXl();
  }
  async OnBeforeShowAsyncImplement() {
    await this.PKt();
  }
  OnBeforeShow() {
    this.sKe !== TickSystem_1.TickSystem.InvalidId &&
      TickSystem_1.TickSystem.Resume(this.sKe),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.FishingRefreshBackpackData,
        this.yr_,
      );
  }
  OnAfterHide() {
    this.sKe !== TickSystem_1.TickSystem.InvalidId &&
      TickSystem_1.TickSystem.Pause(this.sKe),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.FishingRefreshBackpackData,
        this.yr_,
      );
  }
  OnBeforeDestroy() {
    this.sKe !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.sKe),
      (this.sKe = TickSystem_1.TickSystem.InvalidId)),
      this.zx_.Clear(),
      this.Jx_.Clear(),
      this.ga.Clear(),
      this.vYl.Clear(),
      this.Zx_.Clear(),
      this.eU_.Clear(),
      this.Sk_.Clear();
  }
  hXl(e, t) {
    this.V$l.clear(), this.YJl.clear(), this.j$l.clear();
    var s = Math.max(t.RowStartIndex, 0),
      h = Math.min(t.RowEndIndex, FishingDefine_1.BACKPACK_ROW_COUNT - 1),
      r = Math.max(t.ColStartIndex, 0),
      a = Math.min(t.ColEndIndex, FishingDefine_1.BACKPACK_COL_COUNT - 1),
      n = e.GetUniqueId(),
      o = e.IsPartOutOfRange(
        t,
        FishingDefine_1.BACKPACK_ROW_COUNT,
        FishingDefine_1.BACKPACK_COL_COUNT,
      );
    let c = !1;
    for (let i = s; i <= h; i++)
      for (let t = r; t <= a; t++) {
        var l,
          _,
          v = this.lXl(i, t);
        v &&
          ((l = v.GetItemBlockId()),
          e.IsValidGridPos(i, t)
            ? ((c ||= v.InDisable()),
              this.YJl.add(v),
              ((l !== n && l !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID) || o) &&
                ((_ = this.V$l.get(l) ?? []).push(v), this.V$l.set(l, _)))
            : l !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID && this.j$l.add(l));
      }
    (this.PanelModel.IsSetFail = o || 1 < this.V$l.size || c),
      (this.PanelModel.IsDragFail = this.PanelModel.IsOutOfRange),
      this.PanelModel.IsInSelectState ? this._Xl(n) : this.zJl(n);
  }
  cXl(t, e) {
    var s = 0 <= t.RowStartIndex ? t.RowStartIndex : 0,
      h =
        t.RowEndIndex < FishingDefine_1.BACKPACK_ROW_COUNT
          ? t.RowEndIndex
          : FishingDefine_1.BACKPACK_ROW_COUNT - 1,
      r = 0 <= t.ColStartIndex ? t.ColStartIndex : 0,
      a =
        t.ColEndIndex < FishingDefine_1.BACKPACK_COL_COUNT
          ? t.ColEndIndex
          : FishingDefine_1.BACKPACK_COL_COUNT - 1;
    for (let i = s; i <= h; i++)
      for (let t = r; t <= a; t++) this.lXl(i, t)?.ResetPreviewBg(e);
  }
  uXl(t) {
    var i = this.ItemBlockMap.get(t);
    if (i) return i;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Dockyard", 10, "选择的道具不存在", ["ItemBlockId", t]);
  }
  lXl(t, i) {
    t = this.PanelModel.BackpackData.GetBackpackPosByPos(t, i);
    if (t) return this.Layout.GetLayoutItemByKey(t);
  }
  nXl(t) {
    var i = t.GetLeftTopPosRangeByPanel(this.DragRoot);
    this.hXl(t, i);
  }
  _Xl(t) {
    let i = 3;
    this.PanelModel.IsSetFail ? (i = 5) : 1 === this.V$l.size && (i = 4);
    for (const e of this.YJl) e.RefreshPreview(t, i);
  }
  zJl(t) {
    for (const i of this.YJl) i.RefreshPreview(t, 7);
  }
  tU_(t) {
    for (const i of this.YJl) i.PlaySequence(t);
  }
  dXl() {
    this.PanelModel.IsDragFail &&
      (this.InSelectItemBlock.ResetToAppropriatePos(
        FishingDefine_1.BACKPACK_ROW_COUNT,
        FishingDefine_1.BACKPACK_COL_COUNT,
        this.DragRoot,
      ),
      this.PanelModel.RefreshPanel());
  }
  CZ_(t) {
    this.ga.SetActive(this.PanelModel.IsDeleteOpen && t);
  }
  SetButtonsState(t) {
    this.CZ_(t),
      this.vYl.SetActive(t),
      this.Zx_.SetActive(t),
      this.Sk_.SetActive(t && this.PanelModel.GetIsBackToWareHouseOpen()),
      this.GetButton(13).RootUIComp.SetUIActive(t),
      this.GetItem(16).SetUIActive(t),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingBackpackBtnStateChange,
        t,
      );
  }
  SetAllSellBtnState(t) {
    this.eU_.SetActive(this.PanelModel.IsAllSellOpen && !t);
  }
  SetItemBlockTextureMaskActive(t) {
    for (const i of this.ItemBlockMap.values())
      i.GetData().Data.IncId !== this.PanelModel.InSelectedBlockId &&
        i.SetTextureMaskActive(t);
    for (const e of this.Layout.GetLayoutItemList())
      e.GetItemBlockId() !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID &&
        e.SetSpriteMaskActive(t);
  }
  RefreshAllBackpackGridState(t = !0) {
    var i = this.InSelectItemBlock.GetLeftTopPosRangeByPanel(this.DragRoot),
      e = this.InSelectItemBlock.IsRangeChange(this.$$l, i);
    (!e && t) ||
      ((t = this.InSelectItemBlock.IsOutOfRange(
        i,
        FishingDefine_1.BACKPACK_ROW_COUNT,
        FishingDefine_1.BACKPACK_COL_COUNT,
      )),
      this.PanelModel.IsOutOfRange && t) ||
      ((this.PanelModel.IsMoved = e && this.PanelModel.IsInDragState),
      (this.PanelModel.IsOutOfRange = t),
      this.cXl(this.$$l, this.PanelModel.InSelectedBlockId),
      this.hXl(this.InSelectItemBlock, i)),
      DockyardPanelUtil_1.DockyardPanelUtil.DeepCopyItemRangePos(this.$$l, i);
  }
  HandleDragFail() {
    this.InSelectItemBlock.AdsorbToAppropriatePosByAttachItem(
      this.X$l.RowStartIndex,
      this.X$l.ColStartIndex,
      this.DragRoot,
    ),
      this.PanelModel.RefreshPanel(),
      this.tU_("Success"),
      this.PanelModel.IsInHighlight
        ? this.SetButtonsState(!0)
        : this.HandleFinishConfirm();
  }
  HandleDragSuccess() {
    DockyardPanelUtil_1.DockyardPanelUtil.DeepCopyItemRangePos(
      this.X$l,
      this.$$l,
    ),
      this.InSelectItemBlock.AdsorbToAppropriatePosByAttachItem(
        this.X$l.RowStartIndex,
        this.X$l.ColStartIndex,
        this.DragRoot,
      );
    var t = this.PanelModel.IsSetFail ? "Fail" : "Success";
    this.tU_(t),
      !this.PanelModel.IsInHighlight && this.PanelModel.IsMoved
        ? this.PanelModel.OnConfirmClick()
        : this.SetButtonsState(!0);
  }
  SetItemBlockToWareHouse() {
    this.PanelModel.SetItemBlockToWareHouse(
      this.InSelectItemBlock.GetData().Data,
    ),
      this.DestroySelectItemBlock(),
      this.Gzl();
  }
  CanDrag(t) {
    return (
      this.PanelModel.InSelectedBlockId ===
        FishingDefine_1.UNVALID_ITEM_BLOCK_ID ||
      this.PanelModel.InSelectedBlockId === t
    );
  }
  ItemBlockClick(t) {
    (this.PanelModel.InSelectedBlockId = t),
      (this.PanelModel.IsInSelectState = !0),
      (this.InSelectItemBlock = this.uXl(t)),
      (this.$$l = this.InSelectItemBlock.GetLeftTopPosRangeByPanel(
        this.DragRoot,
      )),
      DockyardPanelUtil_1.DockyardPanelUtil.DeepCopyItemRangePos(
        this.X$l,
        this.$$l,
      ),
      this.InSelectItemBlock.SetItemBlockSelectState(!0),
      this.InSelectItemBlock.SetUiParent(this.DragRoot),
      this.PanelModel.RefreshPanel(!1);
  }
  RotateClick() {
    this.InSelectItemBlock.RotateBlock(),
      this.PanelModel.RefreshPanel(!1),
      this.dXl();
    var t = this.PanelModel.IsSetFail ? "Fail" : "Success";
    this.tU_(t);
  }
  CanConfirm() {
    return this.m8t.IsSelfInteractive;
  }
  IsOverlap() {
    return 1 === this.V$l.size;
  }
  HandleOverlapConfirm() {
    (this.PanelModel.IsInSelectState = !1),
      this.InSelectItemBlock.SetItemBlockSelectState(!1),
      this.InSelectItemBlock.SetUiParent(this.W$l),
      this.InSelectItemBlock.PlaySelectSequence("PutIn"),
      this.tU_("PutIn"),
      this.nXl(this.InSelectItemBlock);
    var t = this.V$l.keys().next().value;
    for (const i of this.V$l.get(t))
      i.SetItemBlockId(this.PanelModel.InSelectedBlockId);
    this.PanelModel.OnItemBlockClick(this.V$l.keys().next().value),
      this.InSelectItemBlock.PlaySelectSequence("Grab"),
      this.SetButtonsState(!0),
      this.Gzl();
  }
  HandleFinishConfirm() {
    (this.PanelModel.IsInSelectState = !1),
      this.InSelectItemBlock.SetItemBlockSelectState(!1),
      this.InSelectItemBlock.SetUiParent(this.W$l),
      this.InSelectItemBlock.PlaySelectSequence("PutIn"),
      this.tU_("PutIn"),
      this.nXl(this.InSelectItemBlock),
      (this.PanelModel.InSelectedBlockId =
        FishingDefine_1.UNVALID_ITEM_BLOCK_ID),
      (this.InSelectItemBlock = void 0),
      this.Gzl();
  }
  GetItemBlockDataList() {
    var t = [];
    for (const e of this.ItemBlockMap.values()) {
      var i = e.GetData(),
        i = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(
          i.Data,
          i.Rotate,
          i.LeftTopPosInPanel,
        );
      t.push(i);
    }
    return t;
  }
  GetOriginalItemBlockDataByIncId(t) {
    for (const e of this.ItemBlockMap.values()) {
      var i = e.GetData();
      if (i.Data.IncId === t) return i.Data;
    }
  }
  GetItemBlockDataListExcludeSelected() {
    var t,
      i = [];
    for (const e of this.ItemBlockMap.values())
      e.GetData().Data.IncId !== this.PanelModel.InSelectedBlockId &&
        ((t = e.GetData()),
        (t = DockyardPanelUtil_1.DockyardPanelUtil.CreateFishingItemInfo(
          t.Data,
          t.Rotate,
          t.LeftTopPosInPanel,
        )),
        i.push(t));
    return i;
  }
  GetQuicklySellItemIdList() {
    var t = new Set();
    for (const e of this.PanelModel.TempQuicklySellIncIdSet) {
      var i = this.ItemBlockMap.get(e);
      i && t.add(i.GetItemId());
    }
    return Array.from(t);
  }
  SetConfirmInteractive(t) {
    this.H$l !== t && ((this.H$l = t), this.m8t.SetSelfInteractive(t));
  }
  SetConfirmNiagaraActive(t) {
    this.GetItem(15).SetUIActive(t);
  }
  gXl() {
    this.z$l(),
      (this.K$l = TickSystem_1.TickSystem.Add(
        this.Y$l,
        "CheckItemBlockMove",
        0,
        !0,
      ).Id);
  }
  z$l() {
    this.K$l !== TickSystem_1.TickSystem.InvalidId &&
      (TickSystem_1.TickSystem.Remove(this.K$l),
      (this.K$l = TickSystem_1.TickSystem.InvalidId));
  }
  DestroyItemBlockById(t) {
    var i = this.ItemBlockMap.get(t);
    this.cXl(i.GetData().PanelRange, t),
      this.ItemBlockMap.delete(t),
      this.PanelModel.BackpackData.DeleteItemBlockData(t),
      i.Destroy();
  }
  DestroySelectItemBlock() {
    this.cXl(this.$$l, this.PanelModel.InSelectedBlockId),
      (this.PanelModel.IsInSelectState = !1),
      this.ItemBlockMap.delete(this.PanelModel.InSelectedBlockId),
      this.PanelModel.BackpackData.DeleteItemBlockData(
        this.PanelModel.InSelectedBlockId,
      ),
      this.InSelectItemBlock.Destroy(),
      (this.PanelModel.InSelectedBlockId =
        FishingDefine_1.UNVALID_ITEM_BLOCK_ID),
      (this.InSelectItemBlock = void 0);
  }
  async CreateItemBlockByView(t) {
    var i = this.PanelModel.BackpackData.AddItemBlockData(t),
      i = await this.iXl(i, this.DragRoot);
    i.InitAnchorOffset(
      this.Q$l.Width,
      this.Q$l.Height,
      -t.ValidStartPos.RowIndex,
      -t.ValidStartPos.ColIndex,
    ),
      i.PlaySelectSequence("Drop"),
      this.PanelModel.OnItemBlockClick(t.IncId),
      this.SetButtonsState(!0);
  }
  async CreateItemBlockByViewAndFollow(t) {
    this.gXl();
    var i,
      t = this.PanelModel.BackpackData.AddItemBlockData(t),
      t = await this.iXl(t, this.DragRoot);
    this.K$l !== TickSystem_1.TickSystem.InvalidId
      ? ((i =
          LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
            0,
            !0,
          )),
        t.SetAnchorOffsetByEventDataPointerPosition(i.pointerPosition),
        t.OnPointerDown(i))
      : this.SetItemBlockToWareHouse();
  }
  IsWareHouseDragToBackpack() {
    return this.K$l !== TickSystem_1.TickSystem.InvalidId;
  }
  ReplaceSelectItemBlock(t) {
    (this.PanelModel.IsInSelectState = !1),
      this.PanelModel.BackpackData.DeleteItemBlockData(
        this.PanelModel.InSelectedBlockId,
      ),
      this.ItemBlockMap.delete(this.PanelModel.InSelectedBlockId),
      this.PanelModel.BackpackData.AddItemBlockData(t),
      this.ItemBlockMap.set(t.IncId, this.InSelectItemBlock),
      this.InSelectItemBlock?.GetData().RefreshData(t),
      this.PanelModel?.OnItemBlockClick(t.IncId);
  }
  async aXl() {
    var t;
    this.PanelModel.IsQuickSellOpen() &&
      (t = this.PanelModel.GetQuicklySellPanelParentItem()) &&
      ((this.QuicklySellPanel =
        new DockyardQuicklySellPanel_1.DockyardQuicklySellPanel()),
      (this.QuicklySellPanel.ConfirmBtnClick =
        this.PanelModel.QuicklySellClick),
      (this.QuicklySellPanel.CloseBtnClick = () => {
        this.GetExtendToggle(4)?.SetToggleState(0, !0);
      }),
      await this.QuicklySellPanel.CreateByResourceIdAsync(
        "UiItem_TipInfoSell",
        t,
      ));
  }
  ShowQuicklySellPanel() {
    var t = this.Fzl();
    this.jzl(t), this.QuicklySellPanel?.SetPanelVisible(!0);
  }
  HideQuicklySellPanel() {
    this.Nzl(), this.QuicklySellPanel?.SetPanelVisible(!1);
  }
  CloseQuicklySellPanel() {
    this.PanelModel.RefreshBackpackQuicklySellData(),
      this.Nzl(),
      this.GetExtendToggle(4)?.SetToggleState(0, !0),
      this.eXl(),
      this.k8_(!1);
  }
  Fzl() {
    if (!this.QuicklySellPanel) return new Set();
    (this.PanelModel.TempQuicklySellType = 0),
      this.PanelModel.TempQuicklySellIncIdSet.clear();
    var t,
      i = new Set();
    for (const s of this.Layout.GetLayoutItemList()) {
      var e = s.GetItemBlockId();
      s.IsQuicklySell() &&
        (e === FishingDefine_1.UNVALID_ITEM_BLOCK_ID
          ? (this.PanelModel.TempQuicklySellType = 1)
          : (this.PanelModel.TempQuicklySellIncIdSet.add(e),
            0 !== this.PanelModel.TempQuicklySellType ||
              this.ItemBlockMap.get(e).GetData().Data.IsCanSell ||
              ((this.PanelModel.TempQuicklySellType = 2), i.add(e))));
    }
    return (
      this.PanelModel.IsInSelectState ||
        ((t = this.Vzl(i)),
        this.QuicklySellPanel?.RefreshPanel(
          t,
          this.PanelModel.TempQuicklySellType,
        ),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("Dockyard", 10, "快速出售总价格", [
            "allSellPrice",
            t,
          ])),
      this.k8_(0 === this.PanelModel.TempQuicklySellType),
      i
    );
  }
  Vzl(t) {
    let i = 0;
    for (const h of this.PanelModel.TempQuicklySellIncIdSet) {
      var e;
      t.has(h) ||
        ((e = this.ItemBlockMap.get(h).GetData().Data.Price), (i += e));
    }
    var s = ModelManager_1.ModelManager.DockyardModel.GetQuicklySellRatio();
    return (i += Math.floor((i * s) / 100));
  }
  jzl(t) {
    for (const e of this.Ozl) {
      var i = e.GetItemBlockId();
      t.has(i) || i === FishingDefine_1.UNVALID_ITEM_BLOCK_ID
        ? e.RefreshQuicklySell(2)
        : e.RefreshQuicklySell(1);
    }
  }
  Nzl() {
    for (const t of this.Ozl) t.ResetQuicklySell();
  }
  Gzl() {
    var t;
    this.PanelModel.IsQuickSellOpen() &&
      ((t = this.Fzl()), this.QuicklySellPanel?.IsShowOrShowing) &&
      this.jzl(t);
  }
}
exports.DockyardBackpackPanel = DockyardBackpackPanel;
//# sourceMappingURL=DockyardBackpackPanel.js.map
