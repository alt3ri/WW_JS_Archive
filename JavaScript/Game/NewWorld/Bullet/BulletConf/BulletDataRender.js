"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletDataRender = void 0);
const BulletHitEffectConf_1 = require("./BulletHitEffectConf");
class BulletDataRender {
  constructor(t) {
    (this.Pe = void 0),
      (this.a9o = void 0),
      (this.h9o = void 0),
      (this.l9o = void 0),
      (this.Z8s = void 0),
      (this._9o = void 0),
      (this.u9o = void 0),
      (this.c9o = void 0),
      (this.m9o = void 0),
      (this.d9o = void 0),
      (this.C9o = void 0),
      (this.g9o = void 0),
      (this.f9o = void 0),
      (this.p9o = void 0),
      (this.v9o = void 0),
      (this.wKs = void 0),
      (this.Pe = t);
  }
  get VictimCameraShakeOnHit() {
    return (
      void 0 === this.a9o &&
        (this.a9o = this.Pe.命中时受击者震屏.ToAssetPathName()),
      this.a9o
    );
  }
  get AttackerCameraShakeOnHit() {
    return (
      void 0 === this.h9o &&
        (this.h9o = this.Pe.命中时攻击者震屏.ToAssetPathName()),
      this.h9o
    );
  }
  get EffectOnHit() {
    if (void 0 === this.l9o) {
      this.l9o = new Map();
      var i = this.Pe.命中特效DA;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.l9o.set(s, i.Get(s).ToAssetPathName());
      }
    }
    return this.l9o;
  }
  get AudioOnHit() {
    return void 0 === this.Z8s && (this.Z8s = this.Pe.命中音效), this.Z8s;
  }
  get EffectOnHitConf() {
    if (void 0 === this._9o) {
      this._9o = new Map();
      var i = this.Pe.命中特效配置,
        s = i.Num();
      for (let t = 0; t < s; t++) {
        var e = i.Get(t),
          h = new BulletHitEffectConf_1.BulletHitEffectConf(e);
        this._9o.set(e.类型, h);
      }
    }
    return this._9o;
  }
  get EffectBullet() {
    return (
      void 0 === this.u9o && (this.u9o = this.Pe.子弹特效DA.ToAssetPathName()),
      this.u9o
    );
  }
  get EffectBulletParams() {
    if (void 0 === this.c9o) {
      this.c9o = new Map();
      var i = this.Pe.子弹特效DA参数;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.c9o.set(s, i.Get(s));
      }
    }
    return this.c9o;
  }
  get EffectStopInsteadDestroy() {
    return (
      void 0 === this.m9o && (this.m9o = this.Pe.子弹销毁调用子弹停止特效),
      this.m9o
    );
  }
  get HandOverParentEffect() {
    return (
      void 0 === this.d9o && (this.d9o = this.Pe.接手父子弹的特效), this.d9o
    );
  }
  get CameraShakeCountMax() {
    return void 0 === this.C9o && (this.C9o = this.Pe.最大震动次数), this.C9o;
  }
  get SpecialEffect() {
    if (void 0 === this.g9o) {
      this.g9o = new Map();
      var i = this.Pe.特殊特效DA;
      for (let t = 0; t < i.Num(); t++) {
        var s = i.GetKey(t);
        this.g9o.set(s, i.Get(s).ToAssetPathName());
      }
    }
    return this.g9o;
  }
  get AttackerCameraShakeOnStart() {
    return (
      void 0 === this.f9o &&
        (this.f9o = this.Pe.生成时攻击者震屏.ToAssetPathName()),
      this.f9o
    );
  }
  get CameraShakeToSummonOwner() {
    return (
      void 0 === this.p9o && (this.p9o = this.Pe.震屏关联到召唤兽主人), this.p9o
    );
  }
  get AttackerCameraShakeOnHitWeakPoint() {
    return (
      void 0 === this.v9o &&
        (this.v9o = this.Pe.命中弱点时攻击者震屏.ToAssetPathName()),
      this.v9o
    );
  }
  get OnHitMaterialEffect() {
    return (
      void 0 === this.wKs && (this.wKs = this.Pe.受击闪白.ToAssetPathName()),
      this.wKs
    );
  }
  Preload() {
    this.EffectBullet;
    return (
      this.HandOverParentEffect,
      this.CameraShakeCountMax,
      this.SpecialEffect,
      this.AttackerCameraShakeOnStart,
      this.AudioOnHit,
      !0
    );
  }
}
exports.BulletDataRender = BulletDataRender;
//# sourceMappingURL=BulletDataRender.js.map
