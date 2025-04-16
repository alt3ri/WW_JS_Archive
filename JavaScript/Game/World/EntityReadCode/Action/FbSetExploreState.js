"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetExploreState = void 0);
const UnionExploreStateHelper_1 = require("./UnionExploreStateHelper");
class FbSetExploreState {
  constructor(e) {
    (this.FbDataInternal = e), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(e) {
    if (e) return new FbSetExploreState(e);
  }
  get Config() {
    var e, t;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (e = this.FbDataInternal.configType()),
        (t =
          UnionExploreStateHelper_1.UnionExploreStateHelper.GetUnionExploreStateObject(
            e,
          ))) &&
        (this.TAe =
          UnionExploreStateHelper_1.UnionExploreStateHelper.ReadUnionExploreState(
            e,
            this.FbDataInternal.config(t),
          )),
      this.TAe
    );
  }
}
exports.FbSetExploreState = FbSetExploreState;
//# sourceMappingURL=FbSetExploreState.js.map
