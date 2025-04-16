"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsTextBulletScreenItem = void 0);
const UE = require("ue"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  DangoManager_1 = require("../../../Dango/DangoLogic/DangoManager");
class RacingBetsTextBulletScreenItem extends GridProxyAbstract_1.GridProxyAbstract {
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
      [2, UE.UIText],
      [0, UE.UIButtonComponent],
      [3, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.OBc]]);
  }
  Refresh(t) {
    (this.Pe = t),
      this.GetText(2).ShowTextNew(t.Name),
      2 === t.Type
        ? (this.GetTexture(1).SetUIActive(!0),
          (t = DangoManager_1.DangoManager.GetDangoData(t.DangoId)),
          this.SetTextureShowUntilLoaded(
            t.DangoConfig.IconSmall,
            this.GetTexture(1),
          ),
          this.GetSprite(3).SetUIActive(!1))
        : (this.GetTexture(1).SetUIActive(!1),
          this.GetSprite(3).SetUIActive(!0));
  }
  BindClickBulletScreenCallBack(t) {
    this.$m1 = t;
  }
}
exports.RacingBetsTextBulletScreenItem = RacingBetsTextBulletScreenItem;
//# sourceMappingURL=RacingBetsTextBulletScreenItem.js.map
