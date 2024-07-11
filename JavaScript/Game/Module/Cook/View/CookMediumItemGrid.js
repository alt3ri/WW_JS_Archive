"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CookMediumItemGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer");
const LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid");
const CookController_1 = require("../CookController");
class CookMediumItemGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Gft = void 0);
  }
  OnStart() {
    this.Gft = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetRootItem(),
    );
  }
  OnBeforeDestroy() {
    this.Gft.Clear(), (this.Gft = void 0);
  }
  OnSelected(e) {
    this.SetSelected(!0);
  }
  OnDeselected(e) {
    this.SetSelected(!1);
  }
  OnRefresh(e, o, r) {
    this.SetSelected(o);
    var o = e.ItemId;
    const i = {
      Type: 4,
      Data: e,
      IsNewVisible: e.IsNew,
      IsProhibit: !e.IsUnLock,
      IsOmitBottomText: !0,
    };
    let t = e.MainType;
    if (t === 1) {
      var n =
        ConfigManager_1.ConfigManager.CookConfig.GetCookProcessedById(
          o,
        ).FinalItemId;
      var s =
        ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n);
      if (!s) return;
      var l =
        CookController_1.CookController.CheckCanProcessed(o) && e.IsUnLock;
      (i.IsDisable = e.IsUnLock && !l),
        (i.BottomTextId = s.Name),
        (i.ItemConfigId = n),
        (i.StarLevel = s.QualityId);
    }
    if (t === 0) {
      (l = ConfigManager_1.ConfigManager.CookConfig.GetCookFormulaById(o)),
        (n = l.FoodItemId),
        (s =
          ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(n));
      if (!s) return;
      (t = e),
        (n = CookController_1.CookController.CheckCanCook(o) && e.IsUnLock);
      (i.IsDisable = e.IsUnLock && !n),
        (i.BottomTextId = s.Name),
        (i.ItemConfigId = l.FoodItemId),
        (i.StarLevel = s.QualityId),
        (i.IsTimeFlagVisible = t.ExistEndTime > 0);
    }
    this.Apply(i);
  }
}
exports.CookMediumItemGrid = CookMediumItemGrid;
// # sourceMappingURL=CookMediumItemGrid.js.map
