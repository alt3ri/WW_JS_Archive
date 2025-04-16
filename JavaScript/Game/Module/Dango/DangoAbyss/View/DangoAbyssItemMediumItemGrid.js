"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssItemMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  SelectablePropMediumItemGrid_1 = require("../../../Common/PropItem/SelectablePropItem/SelectablePropMediumItemGrid");
class DangoAbyssItemMediumItemGrid extends SelectablePropMediumItemGrid_1.SelectablePropMediumItemGrid {
  constructor() {
    super(...arguments), (this.StateForEquip = !0);
  }
  RefreshUi(e) {
    var i,
      o = ModelManager_1.ModelManager.DangoAbyssModel.GetPluginItemInfoById(
        e.IncId,
      ),
      s =
        ConfigManager_1.ConfigManager.DangoAbyssConfig.GetAbyssQualityByPluginItemId(
          e.ItemId,
        );
    o &&
      s &&
      ((s = o.GetConfig()),
      (i = { DangoConfigId: o.GetRoleId() }),
      (s = {
        Type: 4,
        Data: e,
        ItemConfigId: e.ItemId,
        BottomTextId: s.Name,
        IsLockVisible: o.GetIsLock(),
        DangoRoleHeadInfo: i,
        IsDisable: !this.StateForEquip && !o.GetCanRecovery(),
      }),
      this.StateForEquip
        ? this.SetReduceButton(void 0)
        : ((i = { IsVisible: 0 < e.SelectedCount, LongPressConfigId: 1 }),
          (s.ReduceButtonInfo = i)),
      this.Apply(s));
  }
  OnSelected(e) {
    e &&
      (this.SetSelected(!0, !0),
      this.StateForEquip
        ? this.SetReduceButton(void 0)
        : this.SetReduceButton({ IsVisible: !0, LongPressConfigId: 1 }));
  }
}
exports.DangoAbyssItemMediumItemGrid = DangoAbyssItemMediumItemGrid;
//# sourceMappingURL=DangoAbyssItemMediumItemGrid.js.map
