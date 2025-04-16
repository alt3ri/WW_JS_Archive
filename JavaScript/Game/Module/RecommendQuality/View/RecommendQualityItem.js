"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RecommendQualityItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class RecommendQualityItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.lml = (e) => {
        1 === e &&
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
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UISprite],
    ]),
      (this.BtnBindInfo = [[0, this.lml]]);
  }
  Refresh(e) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Login",
        69,
        "RecommendQualityItem Refresh",
        ["quality", e.Quality],
        ["name", e.Name],
        ["isRecommend", e.IsRecommend],
      ),
      this.SetTextureShowUntilLoaded(e.Bg, this.GetTexture(1)),
      this.GetText(2)?.ShowTextNew(e.Name),
      this.GetSprite(3)?.SetUIActive(e.IsRecommend);
  }
  OnSelected() {
    this.GetExtendToggle(0)?.SetToggleState(1);
  }
  OnDeselected(e) {
    this.GetExtendToggle(0)?.SetToggleState(0);
  }
}
exports.RecommendQualityItem = RecommendQualityItem;
//# sourceMappingURL=RecommendQualityItem.js.map
