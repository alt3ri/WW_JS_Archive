"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardItemBlock = void 0);
const UE = require("ue"),
  Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../../../../Core/Utils/Math/Vector2D"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  DockyardPanelUtil_1 = require("../DockyardPanelUtil"),
  DockyardItemBlockGrid_1 = require("./DockyardItemBlockGrid"),
  MATERIAL_OFFSET_VALUE = 0.012;
class DockyardItemBlock extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Data = t),
      (this.Layout = void 0),
      (this.ParentModel = void 0),
      (this.A5_ = Vector2D_1.Vector2D.Create()),
      (this.cie = Rotator_1.Rotator.Create()),
      (this.LCa = Vector2D_1.Vector2D.Create()),
      (this.ZXl = Vector2D_1.Vector2D.Create()),
      (this.P5_ = Vector_1.Vector.Create()),
      (this.eYl = Vector2D_1.Vector2D.Create()),
      (this.tYl = Vector_1.Vector.Create()),
      (this.iYl = Vector_1.Vector.Create()),
      (this.rYl = Transform_1.Transform.Create()),
      (this.oYl = Transform_1.Transform.Create()),
      (this.nYl = Vector_1.Vector.Create()),
      (this.wPr = Vector2D_1.Vector2D.Create()),
      (this.sYl = Vector2D_1.Vector2D.Create()),
      (this.aYl = Vector2D_1.Vector2D.Create()),
      (this.hYl = void 0),
      (this.HA_ = new UE.FName("Offset")),
      (this.$pt = void 0),
      (this.lYl = 0),
      (this.BlockWidth = 0),
      (this.BlockHeight = 0),
      (this.sGe = () => {
        var t = new DockyardItemBlockGrid_1.DockyardItemBlockGrid();
        return (t.OpenParam = this), t;
      }),
      (this.OnPointerDown = (t) => {
        var i = this.ParentModel?.DragBegin(this.Data.Data.IncId);
        this.cYl(),
          this.ParentModel.CanDrag(this.Data.Data.IncId) &&
            ((t = t.pointerPosition),
            LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(
              t,
              this.LCa,
            ),
            this.ParentModel?.OnItemBlockClick(this.Data.Data.IncId)),
          i && this.PlaySelectSequence("Grab");
      }),
      (this.OnPointerUp = (t) => {
        this.ParentModel?.DragEnd(this.Data.Data.IncId) &&
          this.PlaySelectSequence("Drop");
      }),
      (this.OnDragBegin = () => {
        this.ParentModel?.DragBegin(this.Data.Data.IncId) &&
          this.PlaySelectSequence("Grab"),
          this.cYl();
      }),
      (this.OnDrag = (t) => {
        var i, s, h;
        this.ParentModel.CanDrag(this.Data.Data.IncId) &&
          ((t = t.pointerPosition),
          (i = Vector2D_1.Vector2D.Create()),
          LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiPosition(t, i),
          (t = i.X - this.LCa.X),
          (s = i.Y - this.LCa.Y),
          (0 ===
            (h = Vector2D_1.Vector2D.Create(i.X, i.Y).SubtractionEqual(
              this.LCa,
            )).X &&
            0 === h.Y) ||
            (this.ZXl.FromUeVector2D(this.RootItem.GetAnchorOffset()),
            (this.ZXl.X += t),
            (this.ZXl.Y += s),
            this.RootItem?.SetAnchorOffset(this.ZXl.ToUeVector2D()),
            this.LCa.DeepCopy(i),
            this.cYl()));
      }),
      (this.OnDragEnd = () => {
        this.ParentModel?.DragEnd(this.Data.Data.IncId) &&
          this.PlaySelectSequence("Drop");
      });
  }
  OnRegisterComponent() {
    (this.ParentModel = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UILayoutBase],
        [2, UE.UIItem],
        [3, UE.UITexture],
        [4, UE.UITexture],
      ]);
  }
  async dAn() {
    this.Layout = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(1),
      this.sGe,
      this.GetItem(2).GetOwner(),
    );
    var t = this.Data.GetPosDataList();
    await this.Layout.RefreshByDataAsync(t);
  }
  W2e() {
    var t = this.GetItem(2);
    this.lYl = t.Width;
  }
  dYl() {
    var t = this.GetLayoutBase(1).RootUIComp,
      i = this.Data.Data.PosDoublyList,
      s = i[0].length,
      i = i.length;
    t.SetWidth(s * this.lYl),
      (this.BlockWidth = this.lYl * s),
      (this.BlockHeight = this.lYl * i);
  }
  JJl() {
    var t = this.GetItem(0),
      i = this.Data.Data.ValidDoublyList,
      s = i[0].length,
      i = i.length,
      s = (s - 1) * this.lYl,
      i = (i - 1) * this.lYl,
      h =
        (t.SetWidth(t.Width + s),
        t.SetHeight(t.Height + i),
        t.GetAnchorOffset()),
      e = this.Data.Data.ValidStartPos;
    t.SetAnchorOffset(
      new UE.Vector2D(
        h.X + e.ColIndex * this.lYl + s / 2,
        h.Y - e.RowIndex * this.lYl - i / 2,
      ),
    );
  }
  mYl() {
    var t = this.Data.GetOriginalPivot();
    this.RootItem?.SetPivot(t.ToUeVector2D());
  }
  async CYl(t) {
    var i = this.Data.Data.ValidDoublyList[0].length * this.lYl,
      s = (t.SetWidth(i), this.Data.Data.ValidDoublyList.length * this.lYl),
      i =
        (t.SetHeight(s),
        this.Data.Data.ValidStartPos.ColIndex * this.lYl + i / 2),
      s = this.Data.Data.ValidStartPos.RowIndex * this.lYl + s / 2,
      i = (t.SetAnchorOffset(new UE.Vector2D(i, -s)), this.Data.Data.ItemId),
      s = ConfigManager_1.ConfigManager.FishingConfig.GetFishingItemConfig(i);
    await this.SetTextureAsync(s.Pic, t);
  }
  Z$l() {
    (this.$pt = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem)),
      this.rYl.FromUeTransform(this.ParentUiItem.K2_GetComponentToWorld()),
      this.GetItem(0).SetUIActive(!1),
      this.$A_(!1);
  }
  async OnBeforeStartAsync() {
    this.W2e(),
      this.JJl(),
      this.dYl(),
      this.mYl(),
      this.Z$l(),
      await Promise.all([
        this.CYl(this.GetTexture(3)),
        this.CYl(this.GetTexture(4)),
        this.dAn(),
      ]),
      this.SetTextureMaskActive(!1);
  }
  OnStart() {
    this.rt_();
  }
  OnBeforeDestroy() {
    this.$pt.Clear();
  }
  cYl() {
    this.Data.RefreshLeftTopPosInBackpack(
      this.ZXl,
      this.BlockWidth,
      this.BlockHeight,
      this.lYl,
    );
    var t = this.Data.LeftTopAnchorOffset;
    this.tYl.Set(t.X, t.Y, 0), this.rYl.TransformPosition(this.tYl, this.tYl);
  }
  gYl(t) {
    var i;
    this.hYl !== t &&
      (this.oYl.FromUeTransform(t.K2_GetComponentToWorld()),
      (i = t.GetPivot()),
      this.sYl.Set(t.Width, t.Height),
      this.wPr.Set(i.X * this.sYl.X, (1 - i.Y) * this.sYl.Y),
      (this.hYl = t));
  }
  pYl() {
    var t = this.Data.GetTopLeftOffsetByRotate();
    return (
      this.Data.IsInUpOrDown()
        ? ((t.X *= this.BlockWidth), (t.Y *= this.BlockHeight))
        : ((t.X *= this.BlockHeight), (t.Y *= this.BlockWidth)),
      t
    );
  }
  SetAnchorOffset(t, i) {
    this.ZXl.Set(t, i),
      this.RootItem?.SetAnchorOffset(this.ZXl.ToUeVector2D()),
      this.eYl.DeepCopy(this.ZXl),
      this.cYl();
  }
  SetAnchorOffsetByEventDataPointerPosition(t) {
    LguiUtil_1.LguiUtil.ConvertPointerPositionToLguiCenterPosition(t, this.A5_),
      this.P5_.Set(this.A5_.X, 0, this.A5_.Y),
      this.RootItem.SetUIWorldLocation(this.P5_.ToUeVectorOld());
    t = this.RootItem.GetAnchorOffset();
    this.ZXl.Set(t.X, t.Y), this.eYl.DeepCopy(this.ZXl), this.cYl();
  }
  InitAnchorOffset(t, i, s, h) {
    s = this.Data.GetCenterPosInBackpack(s, h);
    this.SetAnchorOffset(t * s.X, i * s.Y * -1);
  }
  RotateBlock() {
    this.Data.RotateData(), this.rt_();
  }
  rt_() {
    var t = this.Data.GetRotateValue();
    (this.cie.Yaw = t),
      this.RootItem.SetUIRelativeRotation(this.cie.ToUeRotator());
  }
  ot_(t) {
    for (const i of this.Layout.GetLayoutItemList()) i.RefreshDragItemActive(t);
  }
  $A_(t) {
    t
      ? this.GetTexture(3).SetCustomMaterialScalarParameter(
          this.HA_,
          MATERIAL_OFFSET_VALUE,
        )
      : this.GetTexture(3).SetCustomMaterialScalarParameter(this.HA_, -1);
  }
  PlaySelectSequence(t) {
    this.$pt.StopPrevSequence(!1, !0), this.$pt.PlaySequencePurely(t);
  }
  SetItemBlockSelectState(t) {
    this.GetItem(0).SetUIActive(t), this.ot_(t), this.$A_(t);
  }
  SetUiParent(t) {
    this.ParentUiItem !== t &&
      ((this.ParentUiItem = t),
      this.GetOriginalItem().SetUIParent(t, !0),
      this.rYl.FromUeTransform(t.K2_GetComponentToWorld()));
  }
  GetLeftTopPosRangeByOffset(t) {
    return this.Data.GetLeftTopPosRangeByLeftTopPos(t, this.lYl);
  }
  IsValidGridPos(t, i) {
    return this.Data.IsValidGridPos(t, i);
  }
  ResetToAppropriatePos(t, i, s) {
    var h = this.GetLeftTopPosRangeByPanel(s);
    let e = 0,
      r =
        ((e =
          h.RowEndIndex >= t
            ? h.RowStartIndex - (h.RowEndIndex - t)
            : 0 <= h.RowStartIndex
              ? h.RowStartIndex
              : 0),
        0);
    (r =
      h.ColEndIndex >= i
        ? h.ColStartIndex - (h.ColEndIndex - i)
        : 0 <= h.ColStartIndex
          ? h.ColStartIndex
          : 0),
      this.AdsorbToAppropriatePosByAttachItem(e, r, s);
  }
  AdsorbToAppropriatePosByAttachItem(t, i, s) {
    var i = this.lYl * i,
      t = this.lYl * t,
      h = this.pYl(),
      e = s.GetPivot(),
      i =
        (this.iYl.Set(
          i - e.X * s.Width - h.X,
          -t - (1 - e.Y) * s.Height - h.Y,
          0,
        ),
        this.oYl.FromUeTransform(s.K2_GetComponentToWorld()),
        this.oYl.TransformPosition(this.iYl, this.iYl),
        this.RootItem.SetUIWorldLocation(this.iYl.ToUeVectorOld()),
        this.RootItem.GetAnchorOffset());
    this.ZXl.Set(i.X, i.Y), this.eYl.DeepCopy(this.ZXl);
  }
  GetUniqueId() {
    return this.Data.Data.IncId;
  }
  GetItemId() {
    return this.Data.Data.ItemId;
  }
  GetData() {
    return this.Data;
  }
  SetHierarchyIndex(t) {
    this.RootItem.SetHierarchyIndex(t);
  }
  IsRangeChange(t, i) {
    return (
      t.RowStartIndex !== i.RowStartIndex ||
      t.RowEndIndex !== i.RowEndIndex ||
      t.ColStartIndex !== i.ColStartIndex ||
      t.ColEndIndex !== i.ColEndIndex
    );
  }
  IsPartOutOfRange(s, h, e) {
    if (
      !(
        0 <= s.RowStartIndex &&
        s.RowEndIndex < h &&
        0 <= s.ColStartIndex &&
        s.ColEndIndex < e
      )
    )
      for (let i = s.RowStartIndex; i <= s.RowEndIndex; i++)
        for (let t = s.ColStartIndex; t <= s.ColEndIndex; t++)
          if (
            !(0 <= i && i < h && 0 <= t && t < e) &&
            this.IsValidGridPos(i, t)
          )
            return !0;
    return !1;
  }
  IsOutOfRange(s, h, e) {
    if (
      !(
        s.RowEndIndex < 0 ||
        s.RowStartIndex >= h ||
        s.ColEndIndex < 0 ||
        s.ColStartIndex >= e
      )
    )
      for (let i = s.RowStartIndex; i <= s.RowEndIndex; i++)
        for (let t = s.ColStartIndex; t <= s.ColEndIndex; t++)
          if (
            !(i < 0 || i >= h || t < 0 || t >= e) &&
            this.IsValidGridPos(i, t)
          )
            return !1;
    return !0;
  }
  IsItemBlockInPanel(t) {
    return (
      this.gYl(t),
      this.oYl.InverseTransformPosition(this.tYl, this.nYl),
      (this.nYl.X += this.wPr.X),
      (this.nYl.Y -= this.wPr.Y),
      !(
        this.nYl.X < -this.BlockWidth ||
        this.nYl.X > this.sYl.X ||
        this.nYl.Y < -this.BlockHeight ||
        this.nYl.Y > this.sYl.Y
      )
    );
  }
  GetLeftTopPosRangeByPanel(t) {
    return (
      this.cYl(),
      this.gYl(t),
      this.oYl.InverseTransformPosition(this.tYl, this.nYl),
      this.aYl.Set(this.nYl.X + this.wPr.X, this.nYl.Y - this.wPr.Y),
      DockyardPanelUtil_1.DockyardPanelUtil.CreateAndDeepCopyItemRangePos(
        this.GetLeftTopPosRangeByOffset(this.aYl),
      )
    );
  }
  GetValueByPanelPos(t) {
    var i = t.RowIndex,
      t = t.ColIndex;
    return this.Data.Data.PosDoublyList[i][t];
  }
  SetTextureMaskActive(t) {
    this.GetTexture(4).SetUIActive(t);
  }
  RefreshItemBlockData(t) {
    this.Data = t;
  }
}
exports.DockyardItemBlock = DockyardItemBlock;
//# sourceMappingURL=DockyardItemBlock.js.map
