"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditMobileBattleViewPanelItem = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const BattleUiSetDefine_1 = require("../BattleUiSetDefine");
const ControllerHolder_1 = require("../../../Manager/ControllerHolder");
class EditMobileBattleViewPanelItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wit = new UE.Vector()),
      (this.aCt = void 0),
      (this.sCt = void 0),
      (this.pCt = (t) => {
        let i, s;
        !this.PanelItemData ||
          !this.sCt ||
          ModelManager_1.ModelManager.BattleUiSetModel.GetTouchFingerDataCount() >=
            2 ||
          ((i = t.GetLocalPointInPlane()),
          (t = t.dragComponent.GetOwner().GetActorScale3D()),
          (s = (i.X - this.sCt.X) * t.X),
          (t = (i.Y - this.sCt.Y) * t.Z),
          s != 0 &&
            t != 0 &&
            ((this.aCt.X += s),
            (this.aCt.Y += t),
            (this.aCt.Z = 0),
            this.SetRelativeLocation(this.aCt),
            (this.sCt = i)));
      }),
      (this.vCt = (t) => {
        this.PanelItemData &&
          this.PanelItemData.CanEdit &&
          ((this.sCt = t.GetLocalPointInPlane()),
          (this.aCt = this.RootItem.RelativeLocation),
          ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
            this.PanelItemData,
          ));
      }),
      (this.MCt = () => {
        this.sCt = void 0;
      }),
      (this.GCt = () => {
        this.PanelItemData && this.PanelItemData.CanEdit
          ? ((this.sCt = void 0),
            ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
              this.PanelItemData,
            ))
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "NotEdit",
            );
      }),
      (this.NCt = () => {
        this.sCt = void 0;
      }),
      (this.OCt = (t) => {
        this.PanelItemData &&
          this.PanelItemData.CanEdit &&
          t === 1 &&
          ModelManager_1.ModelManager.BattleUiSetModel.SetPanelItemSelected(
            this.PanelItemData,
          );
      }),
      (this.kCt = () => {
        let t;
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
    const t = this.OpenParam;
    this.aGe(t.PanelItemData, t.PanelItem, t.BattleViewBaseActor);
  }
  aGe(t, i, s) {
    (this.PanelItemData = t),
      (this.PanelItem = i),
      (this.qCt = s),
      (this.FCt = this.RootActor.GetComponentByClass(
        UE.UIDraggableComponent.StaticClass(),
      )),
      (this.VCt = this.RootActor.GetComponentByClass(
        UE.UIButtonComponent.StaticClass(),
      )),
      (this.b5e = this.RootActor.GetComponentByClass(
        UE.UIExtendToggle.StaticClass(),
      )),
      this.Ore(),
      t && this.Refresh();
  }
  OnBeforeDestroy() {
    this.kre(),
      (this.PanelItemData = void 0),
      (this.FCt = void 0),
      (this.VCt = void 0),
      (this.wit = void 0),
      (this.b5e = void 0),
      (this.qCt = void 0),
      (this.PanelItem = void 0);
  }
  Ore() {
    this.FCt &&
      (this.FCt.OnPointerDragCallBack.Bind(this.pCt),
      this.FCt.OnPointerBeginDragCallBack.Bind(this.vCt),
      this.FCt.OnPointerEndDragCallBack.Bind(this.MCt)),
      this.VCt &&
        (this.VCt.OnPointDownCallBack.Bind(this.GCt),
        this.VCt.OnPointUpCallBack.Bind(this.NCt)),
      this.b5e &&
        (this.b5e.OnStateChange.Add(this.OCt),
        this.b5e.CanExecuteChange.Bind(this.kCt));
  }
  kre() {
    this.FCt && this.FCt.OnPointerDragCallBack.Unbind(),
      this.VCt &&
        (this.VCt.OnPointDownCallBack.Unbind(),
        this.VCt.OnPointUpCallBack.Unbind()),
      this.b5e &&
        (this.b5e.OnStateChange.Remove(this.OCt),
        this.b5e.CanExecuteChange.Unbind());
  }
  SetRelativeLocation(t) {
    t = this.HCt(t);
    (this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX()),
      (this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY()),
      this.RootItem.K2_SetRelativeLocation(t, !1, void 0, !1);
  }
  GetRelativeLocation() {
    return this.aCt;
  }
  OnSave() {
    this.PanelItemData &&
      ((this.PanelItemData.EditOffsetX = this.RootItem.GetAnchorOffsetX()),
      (this.PanelItemData.EditOffsetY = this.RootItem.GetAnchorOffsetY()));
  }
  HCt(t) {
    var i = this.RootActor.GetActorScale3D().X;
    var s = this.RootItem.GetPivot();
    const h = s.Y;
    var s = s.X;
    var e = this.qCt.GetUIItem();
    var r = e.Width / 2;
    var e = e.Height / 2;
    var a = this.RootItem.Width * i;
    var i = this.RootItem.Height * i;
    const o = a * s - r;
    var r = r - a * (1 - s);
    var a = i * h - e;
    var s = e - i * (1 - h);
    return (
      (t.X = MathUtils_1.MathUtils.Clamp(t.X, o, r)),
      (t.Y = MathUtils_1.MathUtils.Clamp(t.Y, a, s)),
      t
    );
  }
  Refresh() {
    let t;
    this.PanelItemData &&
      ((t = this.PanelItemData.Size),
      (this.wit.X = t),
      (this.wit.Y = t),
      (this.wit.Z = t),
      this.RootItem.SetUIItemScale(this.wit),
      this.RootItem.SetAnchorOffsetX(this.PanelItemData.OffsetX),
      this.RootItem.SetAnchorOffsetY(this.PanelItemData.OffsetY),
      this.RootItem.SetUIItemAlpha(this.PanelItemData.Alpha),
      this.RootItem.SetHierarchyIndex(this.PanelItemData.HierarchyIndex),
      (this.aCt = this.RootItem.RelativeLocation));
  }
  Reset() {
    let t;
    this.PanelItemData &&
      ((t = this.PanelItemData.SourceSize),
      (this.wit.X = t),
      (this.wit.Y = t),
      (this.wit.Z = t),
      this.RootItem.SetUIItemScale(this.wit),
      this.RootItem.SetAnchorOffsetX(this.PanelItemData.SourceOffsetX),
      this.RootItem.SetAnchorOffsetY(this.PanelItemData.SourceOffsetY),
      this.RootItem.SetUIItemAlpha(this.PanelItemData.SourceAlpha),
      this.RootItem.SetHierarchyIndex(this.PanelItemData.SourceHierarchyIndex),
      (this.aCt = this.RootItem.RelativeLocation));
  }
  SetSelected(t) {
    this.b5e &&
      (t ? this.b5e.SetToggleState(1, !1) : this.b5e.SetToggleState(0, !1));
  }
  ApplyTopIndex() {
    this.GetRootItem().SetHierarchyIndex(
      BattleUiSetDefine_1.MAX_HIERACHY_INDEX,
    );
  }
}
exports.EditMobileBattleViewPanelItem = EditMobileBattleViewPanelItem;
// # sourceMappingURL=EditMobileBattleViewPanelItem.js.map
