"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditMobileBattleViewPanel = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  EditMobileBattleViewPanelItem_1 = require("./EditMobileBattleViewPanelItem");
class EditMobileBattleViewPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.Wgt = new Map()), (this.Kgt = void 0);
  }
  async OnBeforeStartAsync() {
    var e = this.OpenParam;
    await this.Qgt(e.PanelData, e.BattleViewBaseActor);
  }
  OnBeforeDestroy() {
    (this.Kgt = void 0),
      (this.PanelData = void 0),
      (this.Xgt = void 0),
      this.Wgt.clear();
  }
  async Qgt(e, t) {
    (this.PanelData = e),
      (this.Xgt = t),
      (this.Kgt = this.RootActor.GetComponentByClass(
        UE.LGUIComponentsRegistry.StaticClass(),
      ));
    var i = [],
      a = e?.GetPanelItemDataMap();
    if (e?.IsOnlyPanelEdit)
      (t = {
        PanelItemData: a.get(-1),
        PanelItem: this.RootItem,
        BattleViewBaseActor: this.Xgt,
      }),
        (t = (e =
          new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(
          this.RootActor,
          t,
        )),
        i.push(t),
        this.Wgt.set(-1, e);
    else {
      var s = this.Kgt.Components;
      for (let e = 0; e < s.Num(); e++) {
        var r,
          l,
          n = s.Get(e);
        n &&
          n.GetUIItem().IsUIActiveSelf() &&
          n.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass()) &&
          ((r = {
            PanelItemData: a?.get(e),
            PanelItem: this.RootItem,
            BattleViewBaseActor: this.Xgt,
          }),
          (n = (l =
            new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(
            n,
            r,
          )),
          i.push(n),
          this.Wgt.set(e, l));
      }
      await Promise.all(i);
    }
  }
  ResetAllPanelItem() {
    for (const e of this.Wgt.values()) e.PanelItemData && e.Reset();
  }
  SavePanelItem() {
    for (const e of this.Wgt.values()) e.OnSave();
  }
  GetPanelItem(e) {
    return this.Wgt.get(e);
  }
  RefreshHierarchyIndex(e) {
    for (const a of this.Wgt.values()) {
      var t,
        i = a.PanelItemData;
      i &&
        ((t = a.GetRootItem()),
        (i.EditorHierarchyIndex = t.GetHierarchyIndex()));
    }
  }
  IsAnyItemOverlap(t) {
    var i = this.Kgt.Components;
    for (let e = 0; e < i.Num(); e++) {
      var a = this.GetPanelItem(e);
      if (a) {
        a = a.PanelItemData;
        if (!a || a.IsCheckOverlap) {
          a = i.Get(e);
          if (a && a instanceof UE.UIBaseActor) {
            a = a.GetUIItem();
            if (
              a.IsUIActiveInHierarchy() &&
              a.IsRaycastTarget() &&
              a !== t &&
              a.GetOverlapWith(t)
            )
              return !0;
          }
        }
      }
    }
    return !1;
  }
}
exports.EditMobileBattleViewPanel = EditMobileBattleViewPanel;
//# sourceMappingURL=EditMobileBattleViewPanel.js.map
