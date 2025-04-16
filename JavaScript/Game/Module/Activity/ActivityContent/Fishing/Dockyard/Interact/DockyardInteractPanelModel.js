"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardInteractPanelModel = void 0);
const ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardInteractGridData_1 = require("./DockyardInteractGridData"),
  DockyardInteractItemBlockData_1 = require("./DockyardInteractItemBlockData");
class DockyardInteractPanelModel {
  constructor() {
    (this.ConfigId = 0),
      (this.Panel = void 0),
      (this.IsOutOfRange = !0),
      (this.IsAllMatch = !1),
      (this.IsOverlapAnother = !1),
      (this.y$l = []),
      (this.PosDataList = []),
      (this.v$l = new Map()),
      (this.LastCanTickState = !1),
      (this.ViewModel = void 0),
      (this.BackpackPanelModel = void 0),
      (this.ShowItemMap = new Map()),
      (this.MatchPos = { RowIndex: -1, ColIndex: -1 }),
      (this.DragClick = (t, i) => {
        this.mRo(t.IncId) &&
          ((this.LastCanTickState = !0),
          this.Panel.InitAppropriatePos(t),
          this.ShowItemMap.delete(t.IncId),
          this.Panel.DisableInteractItemBlock(t, i),
          (i = ModelManager_1.ModelManager.FishingModel.GetDataByInteract(
            this.ConfigId,
            t.IncId,
          )),
          this.BackpackPanelModel.WareHouseItemDragBegin(i));
      }),
      (this.DragBegin = (t, i) => {
        this.mRo(t.IncId) &&
          ((this.LastCanTickState = !0),
          this.Panel.InitAppropriatePos(t),
          this.ShowItemMap.delete(t.IncId),
          this.ViewModel?.HandleDragBegin(),
          this.Panel.DisableInteractItemBlock(t, i),
          (i = ModelManager_1.ModelManager.FishingModel.GetDataByInteract(
            this.ConfigId,
            t.IncId,
          )),
          this.BackpackPanelModel.WareHouseItemDragBegin(i));
      });
  }
  get InSelectItemBlock() {
    return this.BackpackPanelModel.Panel.InSelectItemBlock;
  }
  Yfo() {
    for (let i = 0; i < FishingDefine_1.INTERACT_ROW_COUNT; i++) {
      this.y$l[i] = [];
      for (let t = 0; t < FishingDefine_1.INTERACT_COL_COUNT; t++) {
        var e = { RowIndex: i, ColIndex: t },
          s = new DockyardInteractGridData_1.DockyardInteractGridData(e);
        this.PosDataList.push(e), this.y$l[i].push(e), this.v$l.set(e, s);
      }
    }
  }
  iXl(t, i, e, s) {
    t = new DockyardInteractItemBlockData_1.DockyardInteractItemBlockData(t);
    return (t.Pos.RowIndex = i), (t.Pos.ColIndex = e), (t.Rotate = s), t;
  }
  Dr_() {
    var t = ModelManager_1.ModelManager.FishingModel.GetDataMapByInteract(
      this.ConfigId,
    );
    if (t)
      for (const e of t) {
        var i = this.iXl(e[1], e[1].PosY, e[1].PosX, e[1].Rotate);
        this.ShowItemMap.set(e[0], i);
      }
  }
  InitPanel(t) {
    (this.Panel = t), this.Dr_(), this.Yfo();
  }
  RegisterViewModel(t) {
    this.ViewModel = t;
  }
  RegisterBackpackPanel(t) {
    this.BackpackPanelModel = t;
  }
  GetInteractGridData(t) {
    return this.v$l.get(t);
  }
  GetInteractPosByPos(t, i) {
    return this.y$l[t][i];
  }
  Tick(t) {
    this.BackpackPanelModel.IsOutOfRange
      ? this.InSelectItemBlock?.IsItemBlockInPanel(this.Panel.AttachItem)
        ? (this.Panel.RefreshAllBackpackGridState(
            this.LastCanTickState === this.BackpackPanelModel.IsOutOfRange,
          ),
          (this.LastCanTickState = this.BackpackPanelModel.IsOutOfRange))
        : (this.LastCanTickState && this.Panel.ResetLastBackpackGridShowType(),
          (this.IsOutOfRange = !0),
          (this.LastCanTickState = !1))
      : (this.LastCanTickState && this.Panel.ResetLastBackpackGridShowType(),
        (this.LastCanTickState = !1));
  }
  CanConfirm() {
    return this.IsAllMatch;
  }
  IsOverlap() {
    return this.IsOverlapAnother;
  }
  ChangeShowItemData() {
    var t = this.InSelectItemBlock.GetData(),
      i = t.Data,
      e = this.Br_(i.ItemId, t.Rotate),
      t = this.iXl(i, this.MatchPos.RowIndex, this.MatchPos.ColIndex, t.Rotate);
    this.ShowItemMap.set(i.IncId, t),
      this.Panel.EnableInteractItemBlock(i),
      e &&
        (this.BackpackPanelModel.Panel.ReplaceSelectItemBlock(e.Data),
        this.ShowItemMap.delete(e.Data.IncId));
  }
  ShowScrollingTips() {
    ControllerHolder_1.ControllerHolder.ScrollingTipsController.ShowTipsByTextId(
      "Fishing_MatchFail",
    );
  }
  Br_(t, i) {
    for (const e of this.ShowItemMap.values())
      if (
        e.Data.ItemId === t &&
        e.Pos.ColIndex === this.MatchPos.ColIndex &&
        e.Pos.RowIndex === this.MatchPos.RowIndex &&
        i === e.Rotate
      )
        return e;
  }
  mRo(t) {
    return this.BackpackPanelModel.IsWareHouseItemCanClick(t) ?? !0;
  }
}
exports.DockyardInteractPanelModel = DockyardInteractPanelModel;
//# sourceMappingURL=DockyardInteractPanelModel.js.map
