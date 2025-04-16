"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerScoreTargetItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerScoreTargetItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UITexture],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnBeforeCreate() {}
  OnStart() {}
  OnBeforeDestroy() {}
  Refresh(e) {
    (this.fGt = e),
      this.GetText(2).SetText(this.fGt.Title),
      this.GetText(3).SetText(this.fGt.ScoreTarget.toString()),
      this.GetSprite(0).SetUIActive(!this.fGt.IsFinish),
      this.GetSprite(1).SetUIActive(this.fGt.IsFinish),
      this.Ma_(),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 69, this.constructor.name, [
          "Refresh",
          this.fGt,
        ]);
  }
  Ma_() {
    var e = this.fGt?.ScoreGradeRes;
    this.GetItem(4).SetUIActive(!!e),
      e &&
        ((e =
          ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
        this.SetTextureByPath(e, this.GetTexture(5)));
  }
}
exports.ShipTowerScoreTargetItem = ShipTowerScoreTargetItem;
//# sourceMappingURL=ShipTowerScoreTargetItem.js.map
