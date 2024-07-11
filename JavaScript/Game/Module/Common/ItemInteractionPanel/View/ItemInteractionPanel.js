"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ItemInteractionPanel = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  ItemInteractionPanelItemData_1 = require("../ItemInteractionPanelItemData"),
  ItemInteractionMediumItemGrid_1 = require("./ItemInteractionMediumItemGrid"),
  ItemInteractionPanelMainTypeItem_1 = require("./ItemInteractionPanelMainTypeItem");
class ItemInteractionPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.HAt = void 0),
      (this.jAt = new Map()),
      (this.iCt = new Map()),
      (this.WAt = []),
      (this.KAt = []),
      (this.QAt = new Map()),
      (this.XAt = void 0),
      (this.$At = void 0),
      (this.YAt = void 0),
      (this.JAt = void 0),
      (this.z9e = () => {
        var t =
          new ItemInteractionMediumItemGrid_1.ItemInteractionMediumItemGrid();
        return (
          t.BindOnExtendToggleStateChanged(this.zAt),
          t.BindOnExtendToggleClicked(this.MFe),
          t.BindReduceLongPress(this.ZAt),
          t
        );
      }),
      (this.ZAt = (t, e, i) => {
        i && this.YAt && this.YAt(i);
      }),
      (this.zAt = (t) => {
        t = t.Data;
        this.KAt.indexOf(t) < 0 || this.SetItemGridSelected(!0, t);
      }),
      (this.MFe = (t) => {
        t = t.Data;
        this.$At && this.$At(t);
      }),
      (this.ePt = (t) => {
        this.SelectedMainType(t);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UILoopScrollViewComponent],
      [6, UE.UIItem],
    ];
  }
  OnStart() {
    this.XAt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(5),
      this.GetItem(6).GetOwner(),
      this.z9e,
    );
  }
  async Refresh(t) {
    (this.HAt = t), this.tPt(), await this.iPt();
    t = this.WAt[0];
    t && this.SelectedMainType(t);
  }
  BindOnReduceButtonTrigger(t) {
    this.YAt = t;
  }
  BindOnItemExtendToggleStateChanged(t) {
    this.$At = t;
  }
  OnBeforeDestroy() {
    (this.WAt.length = 0),
      (this.KAt.length = 0),
      (this.XAt = void 0),
      (this.JAt = void 0),
      this.jAt.clear(),
      this.iCt.clear(),
      (this.$At = void 0),
      (this.YAt = void 0),
      this.oPt();
  }
  tPt() {
    this.jAt.clear(),
      this.iCt.clear(),
      (this.WAt.length = 0),
      (this.KAt.length = 0);
    var t = ConfigManager_1.ConfigManager.InventoryConfig;
    for (const h of this.HAt.ItemInfoList) {
      var e,
        i,
        s = h.ItemConfigId,
        r = t.GetItemConfig(s);
      r &&
        ((e = r.MainTypeId),
        (r = new ItemInteractionPanelItemData_1.ItemInteractionPanelItemData(
          h,
          r.QualityId,
        )),
        (i = this.jAt.get(e))
          ? i.push(r)
          : (this.jAt.set(e, [r]), this.WAt.push(e)),
        this.iCt.set(s, r));
    }
    for (const n of this.jAt.values())
      n.sort((t, e) => {
        var i = t.GetQualityId(),
          s = e.GetQualityId();
        return i !== s
          ? i - s
          : (i = t.GetItemCount()) !== (s = e.GetItemCount())
            ? s - i
            : t.ItemConfigId - e.ItemConfigId;
      });
  }
  async iPt() {
    this.oPt();
    var t = this.GetItem(4),
      e = t.GetOwner(),
      i = (t.SetUIActive(!0), []);
    for (const h of this.WAt) {
      var s = LguiUtil_1.LguiUtil.DuplicateActor(e, this.GetItem(3)),
        r =
          new ItemInteractionPanelMainTypeItem_1.ItemInteractionPanelMainTypeItem();
      r.BindOnExtendToggleStateChanged(this.ePt),
        i.push(r.CreateByActorAsync(s, h)),
        this.QAt.set(h, r);
    }
    await Promise.all(i), t.SetUIActive(!1);
  }
  SelectedMainType(t) {
    this.RefreshItemPanel(this.jAt.get(t)), this.JAt?.SetSelected(!1);
    t = this.QAt.get(t);
    t && (t.SetSelected(!0), t.SetRedDotVisible(!1), (this.JAt = t));
  }
  SetMainTypeRedDotVisible(t, e) {
    this.QAt.get(t)?.SetRedDotVisible(e);
  }
  oPt() {
    for (const t of this.QAt.values()) t.Destroy();
    this.QAt.clear();
  }
  RefreshItemPanel(t) {
    this.XAt?.RefreshByData(t), (this.KAt = t);
  }
  RefreshItemGrid(t) {
    t = this.KAt.indexOf(t);
    t < 0 || this.XAt?.RefreshGridProxy(t);
  }
  SetItemGridSelected(t, e) {
    var i = this.KAt.indexOf(e);
    i < 0 || ((e.IsSelected = t), this.XAt?.RefreshGridProxy(i));
  }
  GetCurrentItemDataList() {
    return this.KAt;
  }
  GetItemData(t) {
    return this.iCt.get(t);
  }
  GetItemDataMainTypeMap() {
    return this.jAt;
  }
  GetMainTypeIdList() {
    return this.WAt;
  }
}
exports.ItemInteractionPanel = ItemInteractionPanel;
//# sourceMappingURL=ItemInteractionPanel.js.map
