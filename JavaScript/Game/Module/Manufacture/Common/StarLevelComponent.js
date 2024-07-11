"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StarLevelComponent = void 0);
const CookLevelView_1 = require("../../Cook/View/CookLevelView"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew");
class StarLevelComponent {
  constructor(e) {
    (this.Gqt = (e, o, t) => {
      var r = new CookLevelView_1.StarItem();
      return (
        r.CreateThenShowByActor(o.GetOwner()),
        r.SetState(e),
        { Key: t, Value: r }
      );
    }),
      (this.$be = new GenericLayoutNew_1.GenericLayoutNew(e, this.Gqt));
  }
  ShowLevel(o, e) {
    var t = new Array(e);
    for (let e = 0; e < o; e++) t[e] = !0;
    this.$be.RebuildLayoutByDataNew(t);
  }
  Clear() {
    this.$be.ClearChildren();
  }
}
exports.StarLevelComponent = StarLevelComponent;
//# sourceMappingURL=StarLevelComponent.js.map
