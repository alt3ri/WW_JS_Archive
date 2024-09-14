"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataTimeScale = void 0);
class BulletDataTimeScale {
  constructor(t) {
    (this.L9o = void 0),
      (this.D9o = void 0),
      (this.R9o = void 0),
      (this.U9o = void 0),
      (this.A9o = void 0),
      (this.P9o = void 0),
      (this.x9o = void 0),
      (this.w9o = void 0),
      (this.B9o = void 0),
      (this.b9o = void 0),
      (this.mSa = void 0),
      (this.Pe = t);
  }
  get AreaTimeScale() {
    return (
      void 0 === this.L9o && (this.L9o = this.Pe.区域受击者时间膨胀), this.L9o
    );
  }
  get TimeScaleOnHit() {
    return void 0 === this.D9o && (this.D9o = this.Pe.受击顿帧), this.D9o;
  }
  get ForceBulletTimeScaleInArea() {
    return (
      void 0 === this.R9o && (this.R9o = this.Pe.强制影响区域内子弹), this.R9o
    );
  }
  get TimeScaleOnAttack() {
    return void 0 === this.U9o && (this.U9o = this.Pe.攻击顿帧), this.U9o;
  }
  get TimeScaleOnAttackIgnoreAttacker() {
    return (
      void 0 === this.A9o && (this.A9o = this.Pe.攻击顿帧忽略攻击者), this.A9o
    );
  }
  get TimeScaleEffectImmune() {
    return void 0 === this.P9o && (this.P9o = this.Pe.时间膨胀失效), this.P9o;
  }
  get TimeScaleWithAttacker() {
    return (
      void 0 === this.x9o && (this.x9o = this.Pe.是否跟随攻击者顿帧), this.x9o
    );
  }
  get CharacterCustomKeyTimeScale() {
    return (
      void 0 === this.w9o && (this.w9o = this.Pe.自定义连携顿帧单位key),
      this.w9o
    );
  }
  get AttackerTimeScaleOnHitWeakPoint() {
    return (
      void 0 === this.B9o && (this.B9o = this.Pe.命中弱点攻击者顿帧), this.B9o
    );
  }
  get VictimTimeScaleOnHitWeakPoint() {
    return (
      void 0 === this.b9o && (this.b9o = this.Pe.命中弱点受击者顿帧), this.b9o
    );
  }
  get RemoveHitTimeScaleOnDestroy() {
    return (
      void 0 === this.mSa && (this.mSa = this.Pe.子弹销毁时移除受击顿帧),
      this.mSa
    );
  }
}
exports.BulletDataTimeScale = BulletDataTimeScale;
//# sourceMappingURL=BulletDataTimeScale.js.map
