"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const ComposeController_1 = require("../ComposeController");
class ComposeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  OnRefresh(e, o, r) {
    const t = e.ItemId;
    var i =
      ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(t);
    const s = e.IsUnlock > 0;
    let a = !0;
    switch (e.MainType) {
      case 1:
        a =
          e.SubType === 35 ||
          ComposeController_1.ComposeController.CheckCanReagentProduction(t);
        break;
      case 2:
        var l = e;
        a = ComposeController_1.ComposeController.CheckCanStructure(l.ItemId);
        break;
      case 3:
        l = e;
        ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
          l.ItemId,
        ).IsUnlock !== 0
          ? (a = ComposeController_1.ComposeController.CheckCanPurification(
              l.ItemId,
            ))
          : (a = !1);
    }
    var i = i.ItemId;
    const m =
      ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
    m &&
      ((i = {
        Type: 4,
        Data: e,
        ItemConfigId: i,
        StarLevel: m.QualityId,
        BottomTextId: m.Name,
        IsProhibit: !s,
        IsNewVisible: e.IsNew,
        IsDisable: s && !a,
        IsOmitBottomText: !0,
        IsTimeFlagVisible: e.ExistEndTime > 0,
      }),
      this.Apply(i),
      this.SetSelected(o));
  }
}
exports.ComposeMediumItemGrid = ComposeMediumItemGrid;
// # sourceMappingURL=ComposeMediumItemGrid.js.map
