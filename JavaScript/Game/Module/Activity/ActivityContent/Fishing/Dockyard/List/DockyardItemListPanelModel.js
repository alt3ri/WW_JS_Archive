"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardItemListPanelModel = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  FishingDefine_1 = require("../../FishingDefine");
class DockyardItemListPanelModel {
  constructor() {
    (this.Panel = void 0),
      (this.BackpackPanelModel = void 0),
      (this.GYl = new Map()),
      (this.ShowItemList = []),
      (this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID),
      (this.ComponentData = {
        TitleText: "",
        GetCountText: void 0,
        HelpBtnId: 0,
        TimeText: "",
      }),
      (this.DragClick = (t) => {
        this.Ek_(t);
      }),
      (this.DragBegin = (t) => {
        this.mRo(t.IncId) &&
          ((this.InSelectedBlockId = t.IncId),
          ModelManager_1.ModelManager.DockyardModel.AddListItemReadFlag(
            t.ItemId,
          ),
          this.BackpackPanelModel?.WareHouseItemDragBegin(t),
          this.Panel.RefreshListItemRedDot(t.ItemId),
          this.Panel.RefreshListItemStateByIncId(t.IncId),
          this.Panel.RefreshListItem());
      });
  }
  RegisterPanel(t) {
    (this.Panel = t), this.OnInit();
  }
  RefreshShowItemList() {
    this.GYl.clear(), (this.ShowItemList = this.GetShowItemList());
    for (const t of this.ShowItemList) this.GYl.set(t.IncId, t);
  }
  RegisterBackpackPanelModel(t) {
    this.BackpackPanelModel = t;
  }
  async Ek_(t) {
    t.IncId !== this.InSelectedBlockId &&
      (((await this.BackpackPanelModel?.TrySetSelectedItemBlockConfirm()) ??
        !0) &&
        ((this.InSelectedBlockId = t.IncId),
        ModelManager_1.ModelManager.DockyardModel.AddListItemReadFlag(t.ItemId),
        this.BackpackPanelModel?.WareHouseItemClick(t),
        this.Panel.RefreshListItemRedDot(t.ItemId)),
      this.Panel.RefreshListItemStateByIncId(t.IncId));
  }
  mRo(t) {
    return (
      t !== this.InSelectedBlockId &&
      (this.BackpackPanelModel?.IsWareHouseItemCanClick(t) ?? !0)
    );
  }
  W7_() {
    var t;
    return (
      this.InSelectedBlockId !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID &&
      ((t = this.FYl(this.InSelectedBlockId)),
      (this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID),
      t)
    );
  }
  SetItemBlockToWareHouse(t) {
    this.W7_(), this.NYl(t), this.Panel?.RefreshListItem();
  }
  DeleteItemBlockListFromWareHouse(t) {
    let e = !1;
    for (const s of t) {
      var i = this.FYl(s);
      e = e || i;
    }
    e && this.Panel?.RefreshListItem();
  }
  DeleteSelectedItemBlockAndRefresh() {
    this.W7_() && this.Panel?.RefreshListItem();
  }
  ResetSelectedBlock() {
    this.InSelectedBlockId = FishingDefine_1.UNVALID_ITEM_BLOCK_ID;
  }
  HasItemBlockInWareHouse(t) {
    return this.GYl.has(t);
  }
  NYl(t) {
    this.ShowItemList.unshift(t), this.GYl.set(t.IncId, t);
  }
  FYl(t) {
    var e = this.GYl.get(t),
      e = this.ShowItemList.indexOf(e),
      e = (0 <= e && this.ShowItemList.splice(e, 1), this.GYl.delete(t));
    return e;
  }
  Yq_() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10076);
  }
  CheckSelectedInList() {
    const e = this.BackpackPanelModel?.GetSelectedId();
    return (
      e !== FishingDefine_1.UNVALID_ITEM_BLOCK_ID &&
      0 < this.GetShowItemList().filter((t) => t.IncId === e).length
    );
  }
  CanDragToListPanel(t) {
    return !(
      (!t && !this.Panel?.CheckInViewport()) ||
      !this.CheckOtherCanDragCondition(!0) ||
      (!this.Yq_() &&
        !this.CheckSelectedInList() &&
        (ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
          "Fishing_FishingBanMoveBack",
        ),
        1))
    );
  }
  RefreshDragTips(t, e) {
    var i;
    this.Panel &&
      ((i =
        this.Panel.CheckInViewport() && this.CheckOtherCanDragCondition(!1)),
      this.Panel.SetDragTipsActive(t && !e && i));
  }
  CheckOtherCanDragCondition(t) {
    return !0;
  }
  OnInit() {}
}
exports.DockyardItemListPanelModel = DockyardItemListPanelModel;
//# sourceMappingURL=DockyardItemListPanelModel.js.map
