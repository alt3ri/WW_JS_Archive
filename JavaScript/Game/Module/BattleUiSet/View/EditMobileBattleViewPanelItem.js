"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditMobileBattleViewPanelItem = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  BattleUiSetDefine_1 = require("../BattleUiSetDefine"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class EditMobileBattleViewPanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Xot = new UE.Vector()),
      (this.vgt = void 0),
      (this.pgt = void 0),
      (this.Agt = (t) => {
        var i, s;
        !this.PanelItemData ||
          !this.pgt ||
          2 <=
            ModelManager_1.ModelManager.BattleUiSetModel.GetTouchFingerDataCount() ||
          ((i = t.GetLocalPointInPlane()),
          (t = t.dragComponent.GetOwner().GetActorScale3D()),
          (s = (i.X - this.pgt.X) * t.X),
          (t = (i.Y - this.pgt.Y) * t.Z),
          0 != s &&
            0 != t &&
            ((this.vgt.X += s),
            (this.vgt.Y += t),
            (this.vgt.Z = 0),
            this.SetRelativeLocation(this.vgt),
            (this.pgt = i)));
      }),
      (this.Pgt = (t) => {
        this.PanelItemData &&
          this.PanelItemData.CanEdit &&
          ((this.pgt = t.GetLocalPointInPlane()),
          (this.vgt = this.RootItem.RelativeLocation),
          ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
            this.PanelItemData,
          ));
      }),
      (this.xgt = () => {
        this.pgt = void 0;
      }),
      (this.$gt = () => {
        this.PanelItemData && this.PanelItemData.CanEdit
          ? ((this.pgt = void 0),
            ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
              this.PanelItemData,
            ))
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "NotEdit",
            );
      }),
      (this.Ygt = () => {
        this.pgt = void 0;
      }),
      (this.Jgt = (t) => {
        this.PanelItemData &&
          this.PanelItemData.CanEdit &&
          1 === t &&
          ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
            this.PanelItemData,
          );
      }),
      (this.zgt = () => {
        var t;
        return this.PanelItemData && this.PanelItemData.CanEdit
          ? !(t =
              ModelManager_1.ModelManager.BattleUiSetModel
                .SelectedPanelItemData) ||
              t.ConfigId !== this.PanelItemData.ConfigId
          : (ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "NotEdit",
            ),
            !1);
      });
  }
  OnStart() {
    var t = this.OpenParam;
    this.aGe(t.PanelItemData, t.PanelItem, t.BattleViewBaseActor);
  }
  aGe(t, i, s) {
    (this.PanelItemData = t),
      (this.PanelItem = i),
      (this.Xgt = s),
      (this.Zgt = this.RootActor.GetComponentByClass(
        UE.UIDraggableComponent.StaticClass(),
      )),
      (this.e0t = this.RootActor.GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )),
      (this.$Ve = this.RootActor.GetComponentByClass(
        UE.UIExtendToggle.StaticClass(),
      )),
      this.Ore(),
      t && this.Refresh();
  }
  OnBeforeDestroy() {
    this.kre(),
      (this.PanelItemData = void 0),
      (this.Zgt = void 0),
      (this.e0t = void 0),
      (this.Xot = void 0),
      (this.$Ve = void 0),
      (this.Xgt = void 0),
      (this.PanelItem = void 0);
  }
  Ore() {
    this.Zgt &&
      (this.Zgt.OnPointerDragCallBack.Bind(this.Agt),
      this.Zgt.OnPointerBeginDragCallBack.Bind(this.Pgt),
      this.Zgt.OnPointerEndDragCallBack.Bind(this.xgt)),
      this.e0t &&
        (this.e0t.OnPointDownCallBack.Bind(this.$gt),
        this.e0t.OnPointUpCallBack.Bind(this.Ygt)),
      this.$Ve &&
        (this.$Ve.OnStateChange.Add(this.Jgt),
        this.$Ve.CanExecuteChange.Bind(this.zgt));
  }
  kre() {
    this.Zgt && this.Zgt.OnPointerDragCallBack.Unbind(),
      this.e0t &&
        (this.e0t.OnPointDownCallBack.Unbind(),
        this.e0t.OnPointUpCallBack.Unbind()),
      this.$Ve &&
        (this.$Ve.OnStateChange.Remove(this.Jgt),
        this.$Ve.CanExecuteChange.Unbind());
  }
  SetRelativeLocation(t) {
    t = this.t0t(t);
    (this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX()),
      (this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY()),
      this.RootItem.K2_SetRelativeLocation(t, !1, void 0, !1);
  }
  GetRelativeLocation() {
    return this.vgt;
  }
  OnSave() {
    this.PanelItemData &&
      ((this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX()),
      (this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY()));
  }
  t0t(t) {
    var i = this.RootActor.GetActorScale3D().X,
      s = this.RootItem.GetPivot(),
      h = s.Y,
      s = s.X,
      e = this.Xgt.GetUIItem(),
      r = e.Width / 2,
      e = e.Height / 2,
      a = this.RootItem.Width * i,
      i = this.RootItem.Height * i,
      o = a * s - r,
      r = r - a * (1 - s),
      a = i * h - e,
      s = e - i * (1 - h);
    return (
      (t.X = MathUtils_1.MathUtils.Clamp(t.X, o, r)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, a, s)),
      t
    );
  }
  Refresh() {
    var t;
    this.PanelItemData &&
      ((t = this.PanelItemData.Size),
      (this.Xot.X = t),
      (this.Xot.Y = t),
      (this.Xot.Z = t),
      this.RootItem.SetUIItemScale(this.Xot),
      this.RootItem.SetAnchorOffsetX(this.PanelItemData.OffsetX),
      this.RootItem.SetAnchorOffsetY(this.PanelItemData.OffsetY),
      this.RootItem.SetUIItemAlpha(this.PanelItemData.Alpha),
      this.RootItem.SetHierarchyIndex(this.PanelItemData.HierarchyIndex),
      (this.vgt = this.RootItem.RelativeLocation));
  }
  Reset() {
    var t;
    this.PanelItemData &&
      ((t = this.PanelItemData.SourceSize),
      (this.Xot.X = t),
      (this.Xot.Y = t),
      (this.Xot.Z = t),
      this.RootItem.SetUIItemScale(this.Xot),
      this.RootItem.SetAnchorOffsetX(this.PanelItemData.SourceOffsetX),
      this.RootItem.SetAnchorOffsetY(this.PanelItemData.SourceOffsetY),
      this.RootItem.SetUIItemAlpha(this.PanelItemData.SourceAlpha),
      this.RootItem.SetHierarchyIndex(this.PanelItemData.SourceHierarchyIndex),
      (this.vgt = this.RootItem.RelativeLocation));
  }
  SetSelected(t) {
    this.$Ve &&
      (t ? this.$Ve.SetToggleState(1, !1) : this.$Ve.SetToggleState(0, !1));
  }
  ApplyTopIndex() {
    this.GetRootItem().SetHierarchyIndex(
      BattleUiSetDefine_1.MAX_HIERACHY_INDEX,
    );
  }
}
exports.EditMobileBattleViewPanelItem = EditMobileBattleViewPanelItem;
//# sourceMappingURL=EditMobileBattleViewPanelItem.js.map
