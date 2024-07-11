"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FoleySynthController = void 0);
const FoleySynthHandler_1 = require("./FoleySynthHandler");
class FoleySynthController {
  constructor(t, s, i) {
    (this.ActorComp = t),
      (this.AkComp = s),
      (this.TagComp = i),
      (this.E$o = new Array()),
      (this.Lo = void 0);
  }
  Init(t) {
    t && ((this.Lo = t), this.Vi(t));
  }
  Tick(t) {
    if (
      this.Lo?.IsLoadSuccess() &&
      (!this.TagComp.HasTag(-1371021686) || this.TagComp.HasTag(1781274524))
    )
      for (const s of this.E$o) s.Tick(t);
  }
  Clear() {
    for (const t of this.E$o) t.Clear();
    (this.E$o.length = 0), (this.Lo = void 0);
  }
  SetDebug(t, s) {
    for (const i of s) i < this.E$o.length && this.E$o[i].SetDebug(t);
  }
  Vi(t) {
    var s;
    t.FoleySynthModel1Configs &&
      0 < t.FoleySynthModel1Configs.length &&
      ((s = new FoleySynthHandler_1.FoleySynthModel1Handler(
        this.ActorComp,
        this.AkComp,
        2,
      )).Init(t.FoleySynthModel1Configs),
      this.E$o.push(s)),
      t.FoleySynthModel2Configs &&
        0 < t.FoleySynthModel2Configs.length &&
        ((s = new FoleySynthHandler_1.FoleySynthModel2Handler(
          this.ActorComp,
          this.AkComp,
          t.Model2AccelerationMaxCount,
        )).Init(t.FoleySynthModel2Configs),
        (s.VelocityMaxCount = t.Model2VelocityMaxCount),
        this.E$o.push(s));
  }
}
exports.FoleySynthController = FoleySynthController;
//# sourceMappingURL=FoleySynthController.js.map
