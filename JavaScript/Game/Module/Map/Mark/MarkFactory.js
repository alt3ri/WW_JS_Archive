"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MarkFactory = void 0);
const MarkItemEntity_1 = require("../Marks/MarkItemEntity");
class MarkFactory {
  static CreateAndAssembleMark(t) {
    var r = this.qd1(t);
    return this.pn_(r, t), r;
  }
  static pn_(t, r) {
    r = this.fn_.get(r.MarkType);
    if (r) for (const a of r) t.AddComponent(a);
  }
  static CreateAndAssembleConfigMark(t) {
    var r = this.vn_(t);
    return this.pn_(r, t), r;
  }
  static CreateAndAssembleServerMark(t) {
    var r = this.Gd1(t);
    return this.pn_(r, t), r;
  }
  static qd1(t) {
    var r = new MarkItemEntity_1.MarkItemEntity();
    return (
      (r.GamePlay.MarkId = t.MarkId),
      (r.GamePlay.MarkType = t.MarkType),
      (r.GamePlay.Gravity = t.Gravity),
      (r.GamePlay.MapId = t.MapId),
      r
    );
  }
}
(exports.MarkFactory = MarkFactory),
  ((_a = MarkFactory).vn_ = (t) => {
    var r = _a.qd1(t);
    return (
      (r.AddComponent(15).MapMarkConfig = t.Config),
      (r.AddComponent(18).EntityId = t.EntityId),
      r
    );
  }),
  (MarkFactory.Gd1 = (t) => {
    var r = _a.qd1(t);
    return (r.AddComponent(18).EntityId = t.EntityId), r;
  }),
  (MarkFactory.fn_ = new Map([
    [29, [14]],
    [28, [14]],
    [10, [13]],
    [32, [16, 15]],
    [31, [15]],
  ]));
//# sourceMappingURL=MarkFactory.js.map
