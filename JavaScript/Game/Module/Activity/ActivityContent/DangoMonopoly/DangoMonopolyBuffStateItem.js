"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyBuffStateItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoMonopolyBuffStateItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0), (this.ClickCallBack = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UITexture],
    ];
  }
  Refresh(t) {
    (this.fGt = t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, this.constructor.name, [
          "",
          this.fGt,
        ]),
      this.GetItem(0)?.SetUIActive(this.fGt.IsActive),
      this.GetItem(1)?.SetUIActive(!this.fGt.IsActive),
      this.GetSprite(2)?.SetUIActive(this.fGt.IsActive),
      this.GetText(3)?.ShowTextNew(this.fGt.PropertyDesc),
      this.GetText(4)?.ShowTextNew(this.fGt.PropertyDesc),
      this.SetTextureByPath(this.fGt.DangoIcon, this.GetTexture(5));
  }
}
exports.DangoMonopolyBuffStateItem = DangoMonopolyBuffStateItem;
//# sourceMappingURL=DangoMonopolyBuffStateItem.js.map
