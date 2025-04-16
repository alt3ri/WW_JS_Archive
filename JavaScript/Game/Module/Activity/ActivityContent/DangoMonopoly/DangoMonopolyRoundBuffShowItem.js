"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoMonopolyRoundBuffShowItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class DangoMonopolyRoundBuffShowItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments), (this.fGt = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    await super.OnBeforeStartAsync();
  }
  Refresh(o) {
    (this.fGt = o),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("DangoMonopoly", 69, "DangoRoundBuffShowItem", [
          "",
          this.fGt,
        ]),
      this.SetTextureByPath(this.fGt.DangoIcon, this.GetTexture(1)),
      this.GetText(2).ShowTextNew(this.fGt.DangoName),
      this.GetText(3).ShowTextNew(this.fGt.PropertyDesc);
  }
}
exports.DangoMonopolyRoundBuffShowItem = DangoMonopolyRoundBuffShowItem;
//# sourceMappingURL=DangoMonopolyRoundBuffShowItem.js.map
