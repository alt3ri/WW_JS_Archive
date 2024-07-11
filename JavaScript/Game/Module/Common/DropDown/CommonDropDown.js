"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonDropDown = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  DynamicMaskButton_1 = require("../../DynamicMask/DynamicMaskButton"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class CommonDropDown extends UiPanelBase_1.UiPanelBase {
  constructor(t, i, s) {
    super(),
      (this.SourceItem = t),
      (this.CreateDropDownItem = i),
      (this.CreateTitleItem = s),
      (this.eGe = void 0),
      (this.ypt = void 0),
      (this.hLt = CommonDefine_1.INVALID_VALUE),
      (this.lLt = void 0),
      (this._Lt = void 0),
      (this.uLt = 2),
      (this.cLt = !1),
      (this.mLt = Transform_1.Transform.Create()),
      (this.dLt = Vector_1.Vector.Create()),
      (this.CLt = void 0),
      (this.gLt = void 0),
      (this.rPr = void 0),
      (this.ije = () => {
        var t = this.GetItem(1);
        t.bIsUIActive
          ? this.vLt()
          : (t.SetUIActive(!0), (this.cLt = !0), this.MLt().finally(void 0));
      }),
      (this.sGe = (t, i, s) => {
        (i = this.CreateDropDownItem(i, t)), (t = this.CLt(t));
        return (
          i.ShowDropDownItemBase(t, s),
          i.SetToggleFunction(this.ELt),
          i.SetCanExecuteFunction(this.SLt),
          { Key: s, Value: i }
        );
      }),
      (this.ELt = (t) => {
        var i = this.hLt;
        (this.hLt = t),
          this.yLt(i),
          this.ILt(),
          this._Lt?.(this.hLt, this.ypt[this.hLt]);
      }),
      (this.SLt = (t) => this.hLt !== t),
      (this.vLt = () => {
        this.GetItem(1).SetUIActive(!1), this.TLt();
      }),
      (this.RLt = () => {
        var t, i, s;
        this.cLt &&
          (0 !== this.uLt &&
          (1 === this.uLt ||
            ((t = (s = this.GetButton(0).RootUIComp).GetRootCanvas()),
            (i = UiLayer_1.UiLayer.GetLayerRootUiItem(
              UiLayerType_1.ELayerType.Pop,
            )),
            (i = Transform_1.Transform.Create(
              i.K2_GetComponentToWorld().Inverse(),
            )),
            this.mLt.FromUeTransform(this.rPr),
            this.mLt.ComposeTransforms(i, this.mLt),
            (i =
              s.GetLocalSpaceBottom() - this.eGe.GetRootUiItem().GetHeight()),
            this.mLt.TransformPosition(
              Vector_1.Vector.Create(0, i, 0),
              this.dLt,
            ),
            (s = t.GetClipRectMin()),
            this.dLt.Y < s.Y))
            ? this.ULt()
            : this.ALt(),
          (this.cLt = !1));
      });
  }
  async Init() {
    await this.CreateByActorAsync(this.SourceItem.GetOwner()).finally(() => {
      this.SetActive(!0);
    });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UILayoutBase],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ije]]);
  }
  OnStart() {
    (this.eGe = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetLayoutBase(2),
      this.sGe,
      this.GetItem(3),
    )),
      this.eGe.BindLateUpdate(this.RLt),
      this.GetItem(1).SetUIActive(!1),
      (this.gLt = this.CreateTitleItem(this.GetItem(4)));
  }
  OnBeforeDestroy() {
    this.eGe.UnBindLateUpdate(), this.lLt?.Destroy(), this.gLt.Destroy();
  }
  InitScroll(t, i, s = 0) {
    (this.ypt = t),
      (this.CLt = i),
      this.eGe.RebuildLayoutByDataNew(t),
      this.SetSelectedIndex(s);
  }
  async MLt() {
    this.lLt ||
      ((this.lLt = new DynamicMaskButton_1.DynamicMaskButton()),
      this.lLt.SetButtonFunction(this.vLt),
      await this.lLt.Init()),
      (this.rPr = this.RootActor.RootComponent.K2_GetComponentToWorld()),
      this.lLt.SetAttachChildItem(this.RootItem),
      this.lLt.SetActive(!0);
  }
  TLt() {
    this.lLt && (this.lLt.ResetItemParent(), this.lLt.SetActive(!1));
  }
  yLt(t) {
    t !== CommonDefine_1.INVALID_VALUE &&
      this.eGe.GetLayoutItemByKey(t).SetToggle(!1);
  }
  ILt() {
    var t = this.CLt(this.ypt[this.hLt]),
      i = this.eGe.GetLayoutItemByIndex(this.hLt);
    this.gLt.ShowTemp(t, i), this.vLt();
  }
  ALt() {
    var t = this.GetItem(1);
    t.SetAnchorVAlign(3),
      t.SetPivot(new UE.Vector2D(0.5, 1)),
      t.SetAnchorOffsetX(0),
      t.SetAnchorOffsetY(0);
  }
  ULt() {
    var t = this.GetItem(1);
    t.SetAnchorVAlign(1),
      t.SetPivot(new UE.Vector2D(0.5, 0)),
      t.SetAnchorOffsetX(0),
      t.SetAnchorOffsetY(0);
  }
  SetSelectedIndex(t) {
    this.eGe.GetLayoutItemByKey(t).SetToggle(!0);
  }
  GetSelectedIndex() {
    return this.hLt;
  }
  SetShowType(t) {
    this.uLt !== t && ((this.uLt = t), (this.cLt = !0));
  }
  SetOnSelectCall(t) {
    this._Lt = t;
  }
  GetDropDownItemObject(t) {
    return this.eGe.GetLayoutItemByIndex(t);
  }
  GetDropDownItemList() {
    return this.eGe.GetLayoutItemList();
  }
  RefreshAllDropDownItem() {
    var t = this.CLt(this.ypt[this.hLt]),
      i = this.eGe.GetLayoutItemByIndex(this.hLt);
    this.gLt.ShowTemp(t, i), this.eGe.RebuildLayoutByDataNew(this.ypt);
  }
}
exports.CommonDropDown = CommonDropDown;
//# sourceMappingURL=CommonDropDown.js.map
