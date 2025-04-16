"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleRandomEventItem = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RogueBattleRandomEventItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Data = void 0),
      (this.yOc = () => {
        1 === this.GetExtendToggle(0).GetToggleState() &&
          this.ScrollViewDelegate?.SelectGridProxy(
            this.GridIndex,
            this.DisplayIndex,
            !0,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.yOc]]);
  }
  Refresh(e, t, s) {
    this.Data = e;
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1),
      (ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = this.Data);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0),
      (ModelManager_1.ModelManager.RogueBattleModel.SelectGainData = void 0);
  }
}
exports.RogueBattleRandomEventItem = RogueBattleRandomEventItem;
//# sourceMappingURL=RogueBattleRandomEventItem.js.map
