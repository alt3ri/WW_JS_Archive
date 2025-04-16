"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetSportsState = void 0);
const UnionSportStateHelper_1 = require("./UnionSportStateHelper");
class FbSetSportsState {
  constructor(t) {
    (this.FbDataInternal = t), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(t) {
    if (t) return new FbSetSportsState(t);
  }
  get Config() {
    var t, e;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (t = this.FbDataInternal.configType()),
        (e =
          UnionSportStateHelper_1.UnionSportStateHelper.GetUnionSportStateObject(
            t,
          ))) &&
        (this.TAe =
          UnionSportStateHelper_1.UnionSportStateHelper.ReadUnionSportState(
            t,
            this.FbDataInternal.config(e),
          )),
      this.TAe
    );
  }
}
exports.FbSetSportsState = FbSetSportsState;
//# sourceMappingURL=FbSetSportsState.js.map
