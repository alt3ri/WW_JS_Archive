"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataSummon = void 0);
class BulletDataSummon {
  constructor(t) {
    (this.I9o = void 0), (this.T9o = void 0), (this.Pe = t);
  }
  get EntityId() {
    return void 0 === this.I9o && (this.I9o = this.Pe.实体ID), this.I9o;
  }
  get DestroyEntityOnBulletEnd() {
    return (
      void 0 === this.T9o && (this.T9o = this.Pe.是否随子弹销毁而销毁), this.T9o
    );
  }
}
exports.BulletDataSummon = BulletDataSummon;
//# sourceMappingURL=BulletDataSummon.js.map
