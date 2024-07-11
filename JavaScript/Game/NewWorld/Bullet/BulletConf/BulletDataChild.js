"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataChild = void 0);
class BulletDataChild {
  constructor(t) {
    (this.W6o = void 0),
      (this.K6o = void 0),
      (this.Q6o = void 0),
      (this.e6o = void 0),
      (this.X6o = void 0),
      (this.$6o = void 0),
      (this.Pe = t);
  }
  get RowName() {
    return void 0 === this.W6o && (this.W6o = this.Pe.召唤子弹ID), this.W6o;
  }
  get Delay() {
    return void 0 === this.K6o && (this.K6o = this.Pe.召唤子弹延迟), this.K6o;
  }
  get Num() {
    return void 0 === this.Q6o && (this.Q6o = this.Pe.召唤子弹数量), this.Q6o;
  }
  get Interval() {
    return void 0 === this.e6o && (this.e6o = this.Pe.召唤子弹间隔), this.e6o;
  }
  get Condition() {
    return void 0 === this.X6o && (this.X6o = this.Pe.召唤触发), this.X6o;
  }
  get BreakOnFail() {
    return void 0 === this.$6o && (this.$6o = this.Pe.失败是否停止), this.$6o;
  }
}
exports.BulletDataChild = BulletDataChild;
//# sourceMappingURL=BulletDataChild.js.map
