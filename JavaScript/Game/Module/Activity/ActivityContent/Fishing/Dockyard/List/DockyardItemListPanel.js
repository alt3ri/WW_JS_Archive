"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DockyardItemListPanel = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  Transform_1 = require("../../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../../../../../Core/Utils/StringUtils"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../../Ui/Base/UiSequencePlayer"),
  LguiEventSystemManager_1 = require("../../../../../../Ui/LguiEventSystem/LguiEventSystemManager"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView"),
  DockyardItemListItem_1 = require("./DockyardItemListItem");
class DockyardItemListPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Spt = void 0),
      (this.PanelModel = void 0),
      (this.Eec = Transform_1.Transform.Create()),
      (this.cz = Vector_1.Vector.Create()),
      (this.kYl = void 0),
      (this.Iec = void 0),
      (this.Qd_ = !1),
      (this.iU_ = void 0),
      (this.W2e = () => {
        var t = new DockyardItemListItem_1.DockyardItemListItem();
        return (t.OpenParam = this.PanelModel), t;
      });
  }
  OnRegisterComponent() {
    (this.PanelModel = this.OpenParam),
      this.PanelModel.RegisterPanel(this),
      (this.ComponentRegisterInfos = [
        [0, UE.UIItem],
        [1, UE.UIText],
        [2, UE.UILoopScrollViewComponent],
        [3, UE.UIItem],
        [4, UE.UIText],
        [5, UE.UISprite],
        [6, UE.UIButtonComponent],
        [7, UE.UIItem],
        [8, UE.UIItem],
        [9, UE.UIText],
      ]);
  }
  async OYl() {
    (this.Spt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(2),
      this.GetItem(3).GetOwner(),
      this.W2e,
      !0,
    )),
      await this.RefreshListItem();
  }
  InitTitle() {
    var t = this.GetText(4),
      i = !StringUtils_1.StringUtils.IsBlank(
        this.PanelModel.ComponentData.TitleText,
      );
    t.SetUIActive(i),
      i &&
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          t,
          this.PanelModel.ComponentData.TitleText,
        );
  }
  SetCountText() {
    var t = this.GetText(1),
      i = this.PanelModel.ComponentData.GetCountText?.(),
      s = void 0 !== i && !StringUtils_1.StringUtils.IsBlank(i);
    t.SetUIActive(s), s && t.SetText(i);
  }
  InitHelpItem() {
    var t = this.GetButton(6),
      i = 0 !== this.PanelModel.ComponentData.HelpBtnId;
    t.RootUIComp.SetUIActive(i),
      i && (t.HelpGroupId = this.PanelModel.ComponentData.HelpBtnId);
  }
  InitTimeItem() {
    var t = this.GetItem(8),
      i = !StringUtils_1.StringUtils.IsBlank(
        this.PanelModel.ComponentData.TimeText,
      );
    t.SetUIActive(i),
      i &&
        ((t = this.GetText(9)),
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          t,
          "Fishing_CageTime",
          this.PanelModel.ComponentData.TimeText,
        ));
  }
  async OnBeforeStartAsync() {
    (this.iU_ = new UiSequencePlayer_1.UiSequencePlayer(this.GetItem(7))),
      await this.OYl(),
      this.InitTitle(),
      this.SetCountText(),
      this.InitHelpItem(),
      this.InitTimeItem();
  }
  OnStart() {
    (this.Iec = this.GetItem(7)),
      (this.Qd_ = this.Iec.bIsUIActive),
      this.SetDragTipsActive(!1),
      this.Eec.FromUeTransform(this.Iec.K2_GetComponentToWorld());
    var t = this.Iec.GetPivot();
    this.kYl = {
      Left: -t.X * this.Iec.Width,
      Right: (1 - t.X) * this.Iec.Width,
      Top: (1 - t.Y) * this.Iec.Height,
      Bottom: -t.Y * this.Iec.Height,
    };
  }
  async OnBeforeShowAsyncImplement() {
    this.PanelModel.RefreshShowItemList(), await this.RefreshListItem();
  }
  OnBeforeDestroy() {
    this.iU_.Clear();
  }
  async RefreshListItem() {
    var t = this.PanelModel.ShowItemList;
    this.Spt.SetTargetRootComponentActive(0 < t.length),
      this.GetItem(0)?.SetUIActive(0 === t.length),
      0 < t.length && (await this.Spt.RefreshByDataAsync(t)),
      this.SetCountText();
  }
  CheckInViewport() {
    var t = LguiEventSystemManager_1.LguiEventSystemManager.GetPointerEventData(
      0,
      !0,
    );
    return (
      this.cz.Set(t.worldPoint.X, 0, t.worldPoint.Z),
      this.Eec.FromUeTransform(this.Iec.K2_GetComponentToWorld()),
      this.Eec.InverseTransformPosition(this.cz, this.cz),
      !(
        this.cz.X < this.kYl.Left ||
        this.cz.X > this.kYl.Right ||
        this.cz.Y < this.kYl.Bottom ||
        this.cz.Y > this.kYl.Top
      )
    );
  }
  async rU_() {
    this.iU_.StopSequenceByKey("Hide", !1, !0),
      this.GetItem(7)?.SetUIActive(!0);
    var t = new CustomPromise_1.CustomPromise();
    await this.iU_.PlaySequenceAsync("Show", t);
  }
  async oU_() {
    this.iU_.StopSequenceByKey("Show", !1, !0);
    var t = new CustomPromise_1.CustomPromise();
    await this.iU_.PlaySequenceAsync("Hide", t),
      this.GetItem(7)?.SetUIActive(!1);
  }
  SetDragTipsActive(t) {
    var i;
    this.Qd_ !== t &&
      ((this.Qd_ = t) ? this.rU_() : this.oU_(),
      (i = this.PanelModel.ShowItemList),
      this.GetItem(0)?.SetUIActive(0 === i.length && !t));
  }
  RefreshListItemStateByIncId(i) {
    var t = this.PanelModel.ShowItemList.findIndex((t) => t.IncId === i);
    0 <= t && this.Spt.UnsafeGetGridProxy(t)?.RefreshToggleState();
  }
  RefreshListItemRedDot(i) {
    for (let t = 0; t < this.PanelModel.ShowItemList.length; t++)
      this.PanelModel.ShowItemList[t].ItemId === i &&
        t >= this.Spt.Iei &&
        t <= this.Spt.NCi &&
        this.Spt.UnsafeGetGridProxy(t)?.RefreshRedDot();
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    var i;
    return !(this.PanelModel.ShowItemList.length <= 0) &&
      (i = this.Spt.GetGridByDisplayIndex(0))
      ? [i, i]
      : void 0;
  }
}
exports.DockyardItemListPanel = DockyardItemListPanel;
//# sourceMappingURL=DockyardItemListPanel.js.map
