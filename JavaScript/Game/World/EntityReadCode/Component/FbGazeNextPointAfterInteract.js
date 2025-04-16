"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGazeNextPointAfterInteract = void 0);
const FbGazeCondition_1 = require("./FbGazeCondition"),
  FbGazePerformance_1 = require("./FbGazePerformance");
class FbGazeNextPointAfterInteract {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.LGh = !1),
      (this.AGh = void 0),
      (this.xGh = !1),
      (this.RGh = void 0);
  }
  static Create(t) {
    if (t) return new FbGazeNextPointAfterInteract(t);
  }
  get GazeCondition() {
    return (
      this.LGh ||
        ((this.LGh = !0),
        (this.AGh = FbGazeCondition_1.FbGazeCondition.Create(
          this.FbDataInternal.gazeCondition(),
        ))),
      this.AGh
    );
  }
  get GazePerformance() {
    return (
      this.xGh ||
        ((this.xGh = !0),
        (this.RGh = FbGazePerformance_1.FbGazePerformance.Create(
          this.FbDataInternal.gazePerformance(),
        ))),
      this.RGh
    );
  }
}
exports.FbGazeNextPointAfterInteract = FbGazeNextPointAfterInteract;
//# sourceMappingURL=FbGazeNextPointAfterInteract.js.map
