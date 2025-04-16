"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ComposeMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  ComposeController_1 = require("../ComposeController");
class ComposeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  OnRefresh(e, o, r) {
    var t = e.ConfigId,
      a = 0 < e.IsUnlock;
    let i = 0,
      s = !0;
    switch (e.MainType) {
      case 1:
        var m =
            ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
              e.ConfigId,
            ),
          m = ((i = m?.ItemId ?? 0), e);
        s =
          35 === m.SubType ||
          ComposeController_1.ComposeController.CheckCanReagentProduction(t);
        break;
      case 2:
        (m =
          ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
            e.ConfigId,
          )),
          (m = ((i = m?.ItemId ?? 0), e));
        s = ComposeController_1.ComposeController.CheckCanStructure(m.ConfigId);
        break;
      case 3:
        (m =
          ConfigManager_1.ConfigManager.ComposeConfig.GetSynthesisFormulaById(
            e.ConfigId,
          )),
          (m = ((i = m?.ItemId ?? 0), e));
        0 ===
        ModelManager_1.ModelManager.ComposeModel.GetPurificationDataById(
          m.ConfigId,
        ).IsUnlock
          ? (s = !1)
          : (s = ComposeController_1.ComposeController.CheckCanPurification(
              m.ConfigId,
            ));
        break;
      case 4:
        i = e.ConfigId;
        m = e;
        0 !==
        ModelManager_1.ModelManager.ComposeModel.GetExchangeDataById(m.ConfigId)
          .IsUnlock
          ? (s = ComposeController_1.ComposeController.CheckCanExchange(
              m.ConfigId,
            ))
          : (s = !1);
    }
    var n,
      l,
      d = ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(i);
    d &&
      ((l = e.IsLimitForever),
      (n = {
        IsLimitTimeItem: (n = 0 < e.TotalMakeCountInLimitTime) && l,
        IsRefreshItem: n && !l,
        BuffItem: d.ItemBuffType,
      }),
      (l = {
        Type: 4,
        Data: e,
        ItemConfigId: i,
        StarLevel: d.QualityId,
        BottomTextId: d.Name,
        IsProhibit: !a,
        IsNewVisible: e.IsNew,
        IsDisable: a && !s,
        IsOmitBottomText: !0,
        ComposeIconTag: a ? n : void 0,
      }),
      this.Apply(l),
      this.SetSelected(o));
  }
}
exports.ComposeMediumItemGrid = ComposeMediumItemGrid;
//# sourceMappingURL=ComposeMediumItemGrid.js.map
