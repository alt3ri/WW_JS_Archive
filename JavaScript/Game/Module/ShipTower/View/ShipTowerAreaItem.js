"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ShipTowerAreaItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class ShipTowerAreaItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.fGt = void 0),
      (this.ClickCallBack = void 0),
      (this.ya_ = (t) => {
        1 === t &&
          this.ScrollViewDelegate?.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !1,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.ya_]]);
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  OnStart() {
    this.EA_().bLockStateOnSelect = !0;
  }
  Refresh(t, e, s) {
    (this.fGt = t),
      this.GetText(1)?.ShowTextNew(t.Name),
      this.GetText(2)?.SetText(t.Desc),
      this.GetText(3)?.SetText(t.TimeContent ?? ""),
      this.GetSprite(4)?.SetUIActive(!!t.IsFinish),
      this.GetItem(5)?.SetUIActive(!!t.IsRedPoint),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("ShipTower", 69, "ShipTowerAreaItem", [
          "Refresh",
          this.fGt,
        ]);
  }
  OnSelected() {
    this.EA_().SetToggleState(1), this.ClickCallBack?.(this.fGt);
  }
  OnDeselected(t) {
    this.EA_().SetToggleState(0);
  }
  EA_() {
    return this.GetExtendToggle(0);
  }
}
exports.ShipTowerAreaItem = ShipTowerAreaItem;
//# sourceMappingURL=ShipTowerAreaItem.js.map
