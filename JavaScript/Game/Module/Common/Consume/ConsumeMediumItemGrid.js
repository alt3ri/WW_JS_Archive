"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ConsumeMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../MediumItemGrid/LoopScrollMediumItemGrid");
class ConsumeMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  OnRefresh(e, o, t) {
    var i = ConfigManager_1.ConfigManager.InventoryConfig,
      r = e[0].ItemId,
      n = e[0].IncId,
      s = e[1];
    if (0 === r) {
      const l = { Type: 1 };
      void this.Apply(l);
    } else {
      var a =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(r);
      if (a) {
        i = i.GetItemDataTypeByConfigId(r);
        if (3 === i) {
          var d =
            ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomBattleData(
              n,
            );
          const l = {
            Type: 4,
            Data: e,
            ItemConfigId: r,
            BottomTextId: a.Name,
            StarLevel: a.QualityId,
            Level: d.GetCost(),
            IsLevelTextUseChangeColor: !0,
            ReduceButtonInfo: { IsVisible: !0, LongPressConfigId: 1 },
          };
          (l.BottomTextId = "VisionLevel"),
            (l.BottomTextParameter = [d.GetPhantomLevel()]),
            (l.VisionFetterGroupId = d.GetFetterGroupId()),
            void this.Apply(l);
        } else if (2 === i) {
          d = ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByIncId(n);
          const l = {
            Type: 4,
            Data: e,
            ItemConfigId: r,
            BottomTextId: "Text_LevelShow_Text",
            BottomTextParameter: [d.GetLevel()],
            StarLevel: a.QualityId,
            Level: d.GetResonanceLevel(),
            ReduceButtonInfo: { IsVisible: !0, LongPressConfigId: 1 },
          };
          void this.Apply(l);
        } else {
          const l = {
            Type: 4,
            Data: e,
            ItemConfigId: r,
            StarLevel: a.QualityId,
            ReduceButtonInfo: { IsVisible: !0, LongPressConfigId: 1 },
          };
          void 0 !== n && 0 < n
            ? (l.BottomTextId = a.Name)
            : (l.BottomText = s.toString()),
            this.Apply(l);
        }
      }
    }
  }
}
exports.ConsumeMediumItemGrid = ConsumeMediumItemGrid;
//# sourceMappingURL=ConsumeMediumItemGrid.js.map
