"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayMontage = void 0);
const FbActionMontage_1 = require("./FbActionMontage");
class FbPlayMontage {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.gdh = !1),
      (this.fdh = void 0),
      (this.Xdh = !1),
      (this.Ydh = void 0),
      (this.zdh = !1),
      (this.Jdh = void 0),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(t) {
    if (t) return new FbPlayMontage(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get ActionMontage() {
    return (
      this.gdh ||
        ((this.gdh = !0),
        (this.fdh = FbActionMontage_1.FbActionMontage.Create(
          this.FbDataInternal.actionMontage(),
        ))),
      this.fdh
    );
  }
  get ExpressionMontage() {
    return (
      this.Xdh ||
        ((this.Xdh = !0), (this.Ydh = this.FbDataInternal.expressionMontage())),
      this.Ydh
    );
  }
  get MouthSequence() {
    return (
      this.zdh ||
        ((this.zdh = !0), (this.Jdh = this.FbDataInternal.mouthSequence())),
      this.Jdh
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbPlayMontage = FbPlayMontage;
//# sourceMappingURL=FbPlayMontage.js.map
