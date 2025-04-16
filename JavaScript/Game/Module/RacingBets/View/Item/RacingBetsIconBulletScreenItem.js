"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsIconBulletScreenItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract");
class RacingBetsIconBulletScreenItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.$m1 = void 0),
      (this.OBc = () => {
        this.$m1 && this.$m1(this.Pe);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UITexture],
      [0, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[0, this.OBc]]);
  }
  Refresh(t) {
    (this.Pe = t), this.SetTextureShowUntilLoaded(t.Icon, this.GetTexture(1));
  }
  BindClickBulletScreenCallBack(t) {
    this.$m1 = t;
  }
}
exports.RacingBetsIconBulletScreenItem = RacingBetsIconBulletScreenItem;
//# sourceMappingURL=RacingBetsIconBulletScreenItem.js.map
