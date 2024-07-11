"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EditMobileBattleView = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const EditMobileBattleViewPanel_1 = require("./EditMobileBattleViewPanel");
class EditMobileBattleView extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.Pit = new Map()),
      this.CreateThenShowByResourceIdAsync("UiView_FightEdit", e);
  }
  async OnBeforeStartAsync() {
    await this.xCt();
  }
  OnAfterShow() {
    const e = ModelManager_1.ModelManager.BattleUiSetModel;
    for (const t of e.GetPanelItemDataMap().values())
      if (t.IsDefaultSelected) {
        e.SetPanelItemSelected(t);
        break;
      }
  }
  async xCt() {
    const t = ModelManager_1.ModelManager.BattleUiSetModel.GetPanelDataMap();
    const a = this.RootActor.GetComponentByClass(
      UE.LGUIComponentsRegistry.StaticClass(),
    ).Components;
    const i = [];
    for (let e = 0; e < a.Num(); e++) {
      var r;
      var s;
      let n = a.Get(e);
      n &&
        n.GetUIItem().IsUIActiveSelf() &&
        (r = t.get(e)) &&
        ((r = { PanelData: r, BattleViewBaseActor: this.RootActor }),
        (n = (s =
          new EditMobileBattleViewPanel_1.EditMobileBattleViewPanel()).CreateThenShowByActorAsync(
          n,
          r,
        )),
        i.push(n),
        this.Pit.set(e, s));
    }
    await Promise.all(i);
  }
  ResetAllPanelItem() {
    for (const e of this.Pit.values()) e.ResetAllPanelItem();
  }
  SavePanelItem() {
    for (const e of this.Pit.values()) e.SavePanelItem();
  }
  GetPanel(e) {
    return this.Pit.get(e);
  }
  GetPanelItem(e) {
    const t = this.Pit.get(e.PanelIndex);
    if (t) return t.GetPanelItem(e.PanelItemIndex);
  }
  RefreshHierarchyIndex() {
    for (const a of this.Pit.values()) {
      let e = a.PanelData;
      const t = a.GetRootItem();
      e && ((e = t.GetHierarchyIndex()), a.RefreshHierarchyIndex(e));
    }
  }
  IsAnyItemOverlap(e) {
    for (const t of this.Pit.values()) if (t.IsAnyItemOverlap(e)) return !0;
    return !1;
  }
}
exports.EditMobileBattleView = EditMobileBattleView;
// # sourceMappingURL=EditMobileBattleView.js.map
