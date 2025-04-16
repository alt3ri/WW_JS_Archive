"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbActivateSpecifiedPieceConfig = void 0);
const FbJigsawConfig_1 = require("../Action/FbJigsawConfig");
class FbActivateSpecifiedPieceConfig {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.MNh = !1),
      (this.ENh = void 0),
      (this.pFh = !1),
      (this.vFh = void 0);
  }
  static Create(i) {
    if (i) return new FbActivateSpecifiedPieceConfig(i);
  }
  get Jigsaw() {
    return (
      this.MNh ||
        ((this.MNh = !0),
        (this.ENh = FbJigsawConfig_1.FbJigsawConfig.Create(
          this.FbDataInternal.jigsaw(),
        ))),
      this.ENh
    );
  }
  get SelfState() {
    return (
      this.pFh ||
        ((this.pFh = !0), (this.vFh = this.FbDataInternal.selfState())),
      this.vFh
    );
  }
}
exports.FbActivateSpecifiedPieceConfig = FbActivateSpecifiedPieceConfig;
//# sourceMappingURL=FbActivateSpecifiedPieceConfig.js.map
