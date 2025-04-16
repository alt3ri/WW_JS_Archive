"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardInteractPanel = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  FishingDefine_1 = require("../../FishingDefine"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil"),
  DockyardInteractGrid_1 = require("./DockyardInteractGrid"),
  DockyardInteractItemBlock_1 = require("./DockyardInteractItemBlock");
class DockyardInteractPanel extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.NXl = new Set()),
      (this.V__ = new Set()),
      (this.Layout = void 0),
      (this.AttachItem = void 0),
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
      (this.PanelModel = void 0),
      (this.sGe = () => {
        return new DockyardInteractGrid_1.DockyardInteractGrid(this.PanelModel);
      }),
      (this.PanelModel = t),
      this.PanelModel.InitPanel(this);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILayoutBase],
      [1, UE.UIItem],
      [2, UE.UIItem],
    ];
  }
  Z$l() {
    this.AttachItem = this.GetItem(2);
  }
  async dAn() {
    var t = this.GetItem(1);
    (this.Layout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(0),
      this.sGe,
      t.GetOwner(),
    )),
      await this.Layout.RefreshByDataAsync(this.PanelModel.PosDataList);
  }
  async Rr_(t, i, e) {
    var s = { ColIndex: i.ArrayInt[0], RowIndex: i.ArrayInt[1] },
      i = i.ArrayInt[2],
      t = new DockyardInteractItemBlock_1.DockyardInteractItemBlock(t, s, i, e);
    (t.OpenParam = this.PanelModel),
      this.V__.add(t),
      await t.CreateThenShowByResourceIdAsync(
        "UiItem_InteractionSeaGridIcon",
        this.GetItem(2),
      );
  }
  async Pr_() {
    var t = this.GetItem(1),
      i = [];
    for (const e of ConfigManager_1.ConfigManager.FishingConfig.GetFishingDelivery(
      this.PanelModel.ConfigId,
    ).NeedItems)
      i.push(this.Rr_(e[0], e[1], t.Width));
    await Promise.all(i), this.wr_();
  }
  wr_() {
    var t = ModelManager_1.ModelManager.FishingModel.GetDataMapByInteract(
      this.PanelModel.ConfigId,
    );
    if (t)
      for (const e of t.values()) {
        var i = this.j__(e.ItemId, e.PosY, e.PosX);
        i && i.SetItemData(e);
      }
  }
  async OnBeforeStartAsync() {
    this.Z$l(), await this.Pr_(), await this.dAn();
  }
  lXl(t, i) {
    t = this.PanelModel.GetInteractPosByPos(t, i);
    if (t) return this.Layout.GetLayoutItemByKey(t);
  }
  j__(t, i, e) {
    for (const s of this.V__.values())
      if (
        s.ItemId === t &&
        s.StartPos.ColIndex === e &&
        s.StartPos.RowIndex === i
      )
        return s;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Dockyard",
        10,
        "查找不到对应的InteractItemBlock",
        ["ItemId", t],
        ["RowIndex", i],
        ["ColIndex", e],
      );
  }
  cXl(t) {
    var e = 0 <= t.RowStartIndex ? t.RowStartIndex : 0,
      s =
        t.RowEndIndex < FishingDefine_1.INTERACT_ROW_COUNT && 0 <= t.RowEndIndex
          ? t.RowEndIndex
          : FishingDefine_1.INTERACT_ROW_COUNT - 1,
      a = 0 <= t.ColStartIndex ? t.ColStartIndex : 0,
      h =
        t.ColEndIndex < FishingDefine_1.INTERACT_COL_COUNT && 0 <= t.ColEndIndex
          ? t.ColEndIndex
          : FishingDefine_1.INTERACT_COL_COUNT - 1;
    for (let i = e; i <= s; i++)
      for (let t = a; t <= h; t++) this.lXl(i, t)?.ResetPreviewBg();
  }
  hXl(e, t) {
    this.NXl.clear();
    var s,
      a = Math.max(t.RowStartIndex, 0),
      h = Math.min(t.RowEndIndex, FishingDefine_1.INTERACT_ROW_COUNT - 1),
      n = Math.max(t.ColStartIndex, 0),
      r = Math.min(t.ColEndIndex, FishingDefine_1.INTERACT_COL_COUNT - 1),
      o = e.GetItemId(),
      i = e.IsPartOutOfRange(
        t,
        FishingDefine_1.INTERACT_ROW_COUNT,
        FishingDefine_1.INTERACT_COL_COUNT,
      ),
      c = e.IsOutOfRange(
        t,
        FishingDefine_1.INTERACT_ROW_COUNT,
        FishingDefine_1.INTERACT_COL_COUNT,
      );
    (this.PanelModel.IsAllMatch = !i && !c),
      (this.PanelModel.IsOverlapAnother = !i && !c);
    for (let i = a; i <= h; i++)
      for (let t = n; t <= r; t++)
        e.IsValidGridPos(i, t) &&
          (s = this.lXl(i, t)) &&
          (this.NXl.add(s),
          s.GetTargetItemId() !== o && (this.PanelModel.IsAllMatch = !1),
          s.IsFinishInteract || (this.PanelModel.IsOverlapAnother = !1));
    this.PanelModel.IsAllMatch &&
      (i = this.j__(o, t.RowStartIndex, t.ColStartIndex)) &&
      ((this.PanelModel.IsAllMatch = i.RotateType === e.GetData().Rotate),
      (this.PanelModel.MatchPos.RowIndex =
        t.RowStartIndex + i.ValidStartPos.RowIndex),
      (this.PanelModel.MatchPos.ColIndex =
        t.ColStartIndex + i.ValidStartPos.ColIndex)),
      (this.PanelModel.IsOverlapAnother &&= this.PanelModel.IsAllMatch);
    for (const d of this.NXl) d.RefreshBgSprite(this.PanelModel.IsAllMatch);
  }
  dXl() {
    this.PanelModel.IsOutOfRange &&
      (this.PanelModel.InSelectItemBlock.ResetToAppropriatePos(
        FishingDefine_1.INTERACT_ROW_COUNT,
        FishingDefine_1.INTERACT_COL_COUNT,
        this.AttachItem,
      ),
      this.RefreshAllBackpackGridState());
  }
  nXl(t) {
    var i = t.GetLeftTopPosRangeByPanel(this.AttachItem);
    this.hXl(t, i);
  }
  InitAppropriatePos(t) {
    var i = DockyardPanelUtil_1.DockyardPanelUtil.RotateOriginalPosData(
      t.PosDoublyList,
      t.Rotate,
    );
    (this.X$l.RowStartIndex = t.PosY),
      (this.X$l.RowEndIndex = t.PosY + i.length - 1),
      (this.X$l.ColStartIndex = t.PosX),
      (this.X$l.ColEndIndex = t.PosX + i[0].length - 1);
  }
  RefreshAllBackpackGridState(t = !0) {
    var i = this.PanelModel.InSelectItemBlock.GetLeftTopPosRangeByPanel(
      this.AttachItem,
    );
    (!this.PanelModel.InSelectItemBlock.IsRangeChange(this.$$l, i) && t) ||
      ((t = this.PanelModel.InSelectItemBlock.IsOutOfRange(
        i,
        FishingDefine_1.INTERACT_ROW_COUNT,
        FishingDefine_1.INTERACT_COL_COUNT,
      )),
      this.PanelModel.IsOutOfRange && t) ||
      ((this.PanelModel.IsOutOfRange = t),
      this.cXl(this.$$l),
      this.hXl(this.PanelModel.InSelectItemBlock, i)),
      DockyardPanelUtil_1.DockyardPanelUtil.DeepCopyItemRangePos(this.$$l, i);
  }
  HandleDragSuccess() {
    DockyardPanelUtil_1.DockyardPanelUtil.DeepCopyItemRangePos(
      this.X$l,
      this.$$l,
    ),
      this.PanelModel.InSelectItemBlock.AdsorbToAppropriatePosByAttachItem(
        this.X$l.RowStartIndex,
        this.X$l.ColStartIndex,
        this.AttachItem,
      ),
      this.PanelModel.BackpackPanelModel.Panel.SetButtonsState(!0);
  }
  HandleDragFail() {
    this.PanelModel.InSelectItemBlock.AdsorbToAppropriatePosByAttachItem(
      this.X$l.RowStartIndex,
      this.X$l.ColStartIndex,
      this.AttachItem,
    ),
      this.RefreshAllBackpackGridState(!1),
      this.PanelModel.BackpackPanelModel.Panel.SetButtonsState(!0),
      this.PanelModel.BackpackPanelModel?.RefreshPanel(!1);
  }
  RotateClick() {
    this.PanelModel.InSelectItemBlock.RotateBlock(),
      this.RefreshAllBackpackGridState(!1),
      this.dXl(),
      this.PanelModel.BackpackPanelModel?.RefreshPanel(!1);
  }
  DisableInteractItemBlock(t, i) {
    t = this.j__(t.ItemId, i.RowIndex, i.ColIndex);
    t && t.SetItemData(void 0);
  }
  EnableInteractItemBlock(t) {
    var i = this.j__(t.ItemId, this.$$l.RowStartIndex, this.$$l.ColStartIndex);
    i && i.SetItemData(t);
  }
  HandleOverlapConfirm() {
    this.nXl(this.PanelModel.InSelectItemBlock),
      this.PanelModel.ChangeShowItemData();
  }
  HandleFinishConfirm() {
    this.nXl(this.PanelModel.InSelectItemBlock),
      this.PanelModel.ChangeShowItemData(),
      this.PanelModel.BackpackPanelModel?.Panel.DestroySelectItemBlock();
  }
  GetLeftTopPanelPos(t) {
    return this.j__(t, this.$$l.RowStartIndex, this.$$l.ColStartIndex)
      ? { RowIndex: this.$$l.RowStartIndex, ColIndex: this.$$l.ColStartIndex }
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Dockyard", 10, "查找不到对应的InteractItemBlock", [
            "ItemId",
            t,
          ]),
        { RowIndex: -1, ColIndex: -1 });
  }
  ResetLastBackpackGridShowType() {
    this.cXl(this.$$l);
  }
}
exports.DockyardInteractPanel = DockyardInteractPanel;
//# sourceMappingURL=DockyardInteractPanel.js.map
