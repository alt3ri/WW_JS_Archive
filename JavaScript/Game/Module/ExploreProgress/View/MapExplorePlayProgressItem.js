"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapExplorePlayProgressItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class MapExplorePlayProgressItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.Cxo = void 0), (this.Pe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
    ];
  }
  OnBeforeCreate() {
    this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem);
  }
  Refresh(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Map", 69, this.constructor.name, ["", e]),
      (this.Pe = e),
      this.UpdatePlayPointType(),
      void 0 !== e.LastPlayPointState
        ? this.B7l(e.LastPlayPointState)
        : this.B7l(e.PlayPointState);
  }
  UpdatePlayPointType() {
    !this.Pe.IgnoreHiddenType && 1 === this.Pe.PlayPointType
      ? this.GetSprite(4).SetUIActive(!0)
      : this.GetSprite(4).SetUIActive(!1);
  }
  B7l(e) {
    switch (e) {
      case 0:
        this.GetSprite(1).SetUIActive(!0),
          this.GetSprite(2).SetUIActive(!1),
          this.GetSprite(3).SetUIActive(!1),
          this.GetSprite(5).SetFillAmount(0);
        break;
      case 1:
        this.GetSprite(1).SetUIActive(!1),
          this.GetSprite(2).SetUIActive(!0),
          this.GetSprite(3).SetUIActive(!1),
          this.GetSprite(5).SetFillAmount(0);
        break;
      case 2:
        this.GetSprite(1).SetUIActive(!1),
          this.GetSprite(2).SetUIActive(!1),
          this.GetSprite(3).SetUIActive(!0),
          this.GetSprite(5).SetFillAmount(1);
    }
  }
  CheckPlayStateChanged() {
    void 0 !== this.Pe.LastPlayPointState &&
      (this.Cxo?.PlayLevelSequenceByName("Complete"),
      this.B7l(this.Pe.PlayPointState),
      (this.Pe.LastPlayPointState = void 0));
  }
  OnBeforeDestroy() {
    this.Cxo?.Clear(), (this.Cxo = void 0);
  }
}
exports.MapExplorePlayProgressItem = MapExplorePlayProgressItem;
//# sourceMappingURL=MapExplorePlayProgressItem.js.map
