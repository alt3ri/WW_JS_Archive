"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleShopGrid = void 0);
const ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LoopScrollMediumItemGrid_1 = require("../../Common/MediumItemGrid/LoopScrollMediumItemGrid"),
  RogueBattleShopGridComponent_1 = require("./RogueBattleShopGridComponent");
class RogueBattleShopGrid extends LoopScrollMediumItemGrid_1.LoopScrollMediumItemGrid {
  constructor() {
    super(...arguments), (this.Data = void 0), (this.SelectCallback = void 0);
  }
  OnRefresh(e, t, o) {
    var i,
      r = (this.Data = e).Rac;
    r &&
      (i =
        ConfigManager_1.ConfigManager.RogueBattleConfig?.GetRogueResBuffPoolById(
          r.v9n,
        )) &&
      ((i = {
        Type: 4,
        Data: e,
        IconPath: i.BuffIcon,
        QualityId: i.Quality,
        QualityType: "MediumItemGridQualitySpritePath",
        IsDisable: !!r && r.O2s,
      }),
      this.Apply(i),
      r) &&
      ((i = this.RefreshComponent(
        RogueBattleShopGridComponent_1.RogueBattleDiscountTagComponent,
        !0,
        e,
      )),
      (r = r.qN_ !== r.kN_),
      this.SetComponentVisible(i, r),
      (i = this.RefreshComponent(
        RogueBattleShopGridComponent_1.RogueBattleShopDiscount,
        !0,
        e,
      )),
      this.SetComponentVisible(i, !0),
      (r = this.RefreshComponent(
        RogueBattleShopGridComponent_1.RogueBattleGridElementComponent,
        !0,
        e,
      )),
      this.SetComponentVisible(r, !0));
  }
  OnExtendToggleStateChanged(e) {
    1 === e && this.OnSelected(!0);
  }
  OnSelected(e) {
    this.SetSelected(!0),
      (ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = this.Data),
      e && this.SelectCallback?.(this.GridIndex, this.Data);
  }
  OnDeselected(e) {
    this.SetSelected(!1),
      (ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = void 0);
  }
}
exports.RogueBattleShopGrid = RogueBattleShopGrid;
//# sourceMappingURL=RogueBattleShopGrid.js.map
