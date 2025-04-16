"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenSimpleGameplay = void 0);
const UnionUiGameHelper_1 = require("./UnionUiGameHelper");
class FbOpenSimpleGameplay {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.cIh = !1),
      (this.uIh = void 0),
      (this.dIh = !1),
      (this.mIh = void 0);
  }
  static Create(e) {
    if (e) return new FbOpenSimpleGameplay(e);
  }
  get GameplayConfig() {
    var e, i;
    return (
      !this.cIh &&
        ((this.cIh = !0),
        (e = this.FbDataInternal.gameplayConfigType()),
        (i = UnionUiGameHelper_1.UnionUiGameHelper.GetUnionUiGameObject(e))) &&
        (this.uIh = UnionUiGameHelper_1.UnionUiGameHelper.ReadUnionUiGame(
          e,
          this.FbDataInternal.gameplayConfig(i),
        )),
      this.uIh
    );
  }
  get FinishSendSelfEvent() {
    return (
      this.dIh ||
        ((this.dIh = !0),
        (this.mIh = this.FbDataInternal.finishSendSelfEvent())),
      this.mIh
    );
  }
}
exports.FbOpenSimpleGameplay = FbOpenSimpleGameplay;
//# sourceMappingURL=FbOpenSimpleGameplay.js.map
