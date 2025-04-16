"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExploreProgressReward = void 0);
class ExploreProgressReward {
  constructor() {
    (this.J7 = null), (this.z7 = 0);
  }
  get Id() {
    return this.id();
  }
  get Area() {
    return this.area();
  }
  get StepId() {
    return this.stepid();
  }
  get DropReward() {
    return this.dropreward();
  }
  get NeedExploreProgress() {
    return this.needexploreprogress();
  }
  __init(r, t) {
    return (this.z7 = r), (this.J7 = t), this;
  }
  static getRootAsExploreProgressReward(r, t) {
    return (t || new ExploreProgressReward()).__init(
      r.readInt32(r.position()) + r.position(),
      r,
    );
  }
  id() {
    var r = this.J7.__offset(this.z7, 4);
    return r ? this.J7.readInt32(this.z7 + r) : 0;
  }
  area() {
    var r = this.J7.__offset(this.z7, 6);
    return r ? this.J7.readInt32(this.z7 + r) : 0;
  }
  stepid() {
    var r = this.J7.__offset(this.z7, 8);
    return r ? this.J7.readInt32(this.z7 + r) : 0;
  }
  dropreward() {
    var r = this.J7.__offset(this.z7, 10);
    return r ? this.J7.readInt32(this.z7 + r) : 0;
  }
  needexploreprogress() {
    var r = this.J7.__offset(this.z7, 12);
    return r ? this.J7.readInt32(this.z7 + r) : 0;
  }
}
exports.ExploreProgressReward = ExploreProgressReward;
//# sourceMappingURL=ExploreProgressReward.js.map
