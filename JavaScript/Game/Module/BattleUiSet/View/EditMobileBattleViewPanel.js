"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditMobileBattleViewPanel = void 0);
const UE = require("ue");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const EditMobileBattleViewPanelItem_1 = require("./EditMobileBattleViewPanelItem");
class EditMobileBattleViewPanel extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments), (this.wCt = new Map()), (this.BCt = void 0);
  }
  async OnBeforeStartAsync() {
    const e = this.OpenParam;
    await this.bCt(e.PanelData, e.BattleViewBaseActor);
  }
  OnBeforeDestroy() {
    (this.BCt = void 0),
      (this.PanelData = void 0),
      (this.qCt = void 0),
      this.wCt.clear();
  }
  async bCt(e, t) {
    (this.PanelData = e),
      (this.qCt = t),
      (this.BCt = this.RootActor.GetComponentByClass(
        UE.LGUIComponentsRegistry.StaticClass(),
      ));
    const i = [];
    const a = e?.GetPanelItemDataMap();
    if (e?.IsOnlyPanelEdit)
      (t = {
        PanelItemData: a.get(-1),
        PanelItem: this.RootItem,
        BattleViewBaseActor: this.qCt,
      }),
        (t = (e =
          new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(
          this.RootActor,
          t,
        )),
        i.push(t),
        this.wCt.set(-1, e);
    else {
      const s = this.BCt.Components;
      for (let e = 0; e < s.Num(); e++) {
        var r;
        var l;
        let n = s.Get(e);
        n &&
          n.GetUIItem().IsUIActiveSelf() &&
          n.GetComponentByClass(UE.LGUIComponentsRegistry.StaticClass()) &&
          ((r = {
            PanelItemData: a?.get(e),
            PanelItem: this.RootItem,
            BattleViewBaseActor: this.qCt,
          }),
          (n = (l =
            new EditMobileBattleViewPanelItem_1.EditMobileBattleViewPanelItem()).CreateThenShowByActorAsync(
            n,
            r,
          )),
          i.push(n),
          this.wCt.set(e, l));
      }
      await Promise.all(i);
    }
  }
  ResetAllPanelItem() {
    for (const e of this.wCt.values()) e.PanelItemData && e.Reset();
  }
  SavePanelItem() {
    for (const e of this.wCt.values()) e.OnSave();
  }
  GetPanelItem(e) {
    return this.wCt.get(e);
  }
  RefreshHierarchyIndex(e) {
    for (const a of this.wCt.values()) {
      var t;
      const i = a.PanelItemData;
      i &&
        ((t = a.GetRootItem()),
        (i.EditorHierarchyIndex = t.GetHierarchyIndex()));
    }
  }
  IsAnyItemOverlap(t) {
    const i = this.BCt.Components;
    for (let e = 0; e < i.Num(); e++) {
      let a = this.GetPanelItem(e);
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
// # sourceMappingURL=EditMobileBattleViewPanel.js.map
