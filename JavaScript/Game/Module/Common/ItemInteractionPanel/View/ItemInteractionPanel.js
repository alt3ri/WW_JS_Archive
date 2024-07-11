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
      (this.KPt = void 0),
      (this.QPt = new Map()),
      (this.dgt = new Map()),
      (this.XPt = []),
      (this.$Pt = []),
      (this.YPt = new Map()),
      (this.JPt = void 0),
      (this.zPt = void 0),
      (this.ZPt = void 0),
      (this.LPt = void 0),
      (this.ext = void 0),
      (this.v0a = void 0),
      (this.cHe = () => {
        var t =
          new ItemInteractionMediumItemGrid_1.ItemInteractionMediumItemGrid();
        return (
          t.BindOnExtendToggleStateChanged(this.txt),
          t.BindOnCanExecuteChange(this.gke),
          t.BindReduceLongPress(this.ixt),
          t
        );
      }),
      (this.ixt = (t, i, e) => {
        e && this.ZPt && this.ZPt(e);
      }),
      (this.txt = (t) => {
        t = t.Data;
        this.SetItemGridSelected(!0, t), this.zPt && this.zPt(t);
      }),
      (this.gke = (t, i, e) => {
        return (
          !(
            (this.v0a && this.v0a.IsSelected && t === this.v0a) ||
            this.$Pt.indexOf(t) < 0
          ) &&
          (!this.LPt || this.LPt(t))
        );
      }),
      (this.oxt = (t) => {
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
    this.JPt = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(5),
      this.GetItem(6).GetOwner(),
      this.cHe,
    );
  }
  async Refresh(t) {
    (this.KPt = t), this.rxt(), await this.nxt();
    t = this.XPt[0];
    t && this.SelectedMainType(t);
  }
  BindOnReduceButtonTrigger(t) {
    this.ZPt = t;
  }
  BindOnItemExtendToggleStateChanged(t) {
    this.zPt = t;
  }
  BindOnCanExecuteChange(t) {
    this.LPt = t;
  }
  OnBeforeDestroy() {
    (this.XPt.length = 0),
      (this.$Pt.length = 0),
      (this.JPt = void 0),
      (this.ext = void 0),
      this.QPt.clear(),
      this.dgt.clear(),
      (this.zPt = void 0),
      (this.ZPt = void 0),
      this.sxt();
  }
  rxt() {
    this.QPt.clear(),
      this.dgt.clear(),
      (this.XPt.length = 0),
      (this.$Pt.length = 0);
    var t = ConfigManager_1.ConfigManager.InventoryConfig;
    for (const n of this.KPt.ItemInfoList) {
      var i,
        e,
        s = n.ItemConfigId,
        h = t.GetItemConfig(s);
      h &&
        ((i = h.MainTypeId),
        (h = new ItemInteractionPanelItemData_1.ItemInteractionPanelItemData(
          n,
          h.QualityId,
        )),
        (e = this.QPt.get(i))
          ? e.push(h)
          : (this.QPt.set(i, [h]), this.XPt.push(i)),
        this.dgt.set(s, h));
    }
    for (const r of this.QPt.values())
      r.sort((t, i) => {
        var e = t.GetQualityId(),
          s = i.GetQualityId();
        return e !== s
          ? e - s
          : (e = t.GetItemCount()) !== (s = i.GetItemCount())
            ? s - e
            : t.ItemConfigId - i.ItemConfigId;
      });
  }
  async nxt() {
    this.sxt();
    var t = this.GetItem(4),
      i = t.GetOwner(),
      e = (t.SetUIActive(!0), []);
    for (const n of this.XPt) {
      var s = LguiUtil_1.LguiUtil.DuplicateActor(i, this.GetItem(3)),
        h =
          new ItemInteractionPanelMainTypeItem_1.ItemInteractionPanelMainTypeItem();
      h.BindOnExtendToggleStateChanged(this.oxt),
        e.push(h.CreateByActorAsync(s, n)),
        this.YPt.set(n, h);
    }
    await Promise.all(e), t.SetUIActive(!1);
  }
  SelectedMainType(t) {
    this.RefreshItemPanel(this.QPt.get(t)), this.ext?.SetSelected(!1);
    t = this.YPt.get(t);
    t && (t.SetSelected(!0), t.SetRedDotVisible(!1), (this.ext = t));
  }
  SetMainTypeRedDotVisible(t, i) {
    this.YPt.get(t)?.SetRedDotVisible(i);
  }
  sxt() {
    for (const t of this.YPt.values()) t.Destroy();
    this.YPt.clear();
  }
  RefreshItemPanel(t) {
    this.JPt?.RefreshByData(t), (this.$Pt = t), (this.v0a = void 0);
  }
  RefreshItemGrid(t) {
    t = this.$Pt.indexOf(t);
    t < 0 || this.JPt?.RefreshGridProxy(t);
  }
  SetItemGridSelected(t, i) {
    var e = this.$Pt.indexOf(i);
    e < 0 ||
      ((i.IsSelected = t),
      (this.v0a = t ? i : void 0),
      this.JPt?.RefreshGridProxy(e));
  }
  GetCurrentItemDataList() {
    return this.$Pt;
  }
  GetItemData(t) {
    return this.dgt.get(t);
  }
  GetItemDataMainTypeMap() {
    return this.QPt;
  }
  GetMainTypeIdList() {
    return this.XPt;
  }
}
exports.ItemInteractionPanel = ItemInteractionPanel;
//# sourceMappingURL=ItemInteractionPanel.js.map
