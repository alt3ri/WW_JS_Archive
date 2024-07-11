"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletPool = exports.SimplePool = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Pool_1 = require("../../../../Core/Container/Pool"),
  ProxyLru_1 = require("../../../../Core/Container/ProxyLru"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletEntity_1 = require("../Entity/BulletEntity"),
  BulletCollisionInfo_1 = require("./BulletCollisionInfo"),
  BulletHitActorData_1 = require("./BulletHitActorData"),
  KEY_BULLET_ENTITY = "bulletEntity",
  PRE_ADD_COUNT = 10,
  CAPACITY = 20;
class SimplePool {
  constructor() {
    this.p7 = new Array();
  }
  Get() {
    if (!(this.p7.length <= 0)) return this.p7.pop();
  }
  PreloadAdd(t) {
    t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Pool", 18, "无效对象", ["target", t])),
      this.p7.push(t);
  }
  Release(t) {
    t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Pool", 18, "无效对象", ["target", t])),
      this.p7.push(t);
  }
  Clear() {
    this.p7.length = 0;
  }
}
exports.SimplePool = SimplePool;
class BulletPool {
  static Init() {
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      var l = BulletPool.BulletEntityPool.Create(KEY_BULLET_ENTITY);
      EntitySystem_1.EntitySystem.Init(l),
        EntitySystem_1.EntitySystem.DeSpawn(l),
        BulletPool.BulletEntityPool.Put(l);
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      var e = this.BulletHitActorDataPool.Create();
      this.BulletHitActorDataPool.Put(e);
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++) {
      var o = this.BulletConditionResultPool.Create();
      this.BulletConditionResultPool.Put(o);
    }
    for (let t = 0; t < PRE_ADD_COUNT; t++)
      this.VectorPool.PreloadAdd(Vector_1.Vector.Create());
    for (let t = 0; t < PRE_ADD_COUNT; t++)
      this.RotatorPool.PreloadAdd(Rotator_1.Rotator.Create());
    for (let t = 0; t < PRE_ADD_COUNT; t++)
      this.BulletHitTempResultPool.PreloadAdd(
        new BulletHitActorData_1.BulletHitTempResult(),
      );
  }
  static Clear() {
    this.BulletEntityPool.Clear(),
      this.BulletHitActorDataPool.Clear(),
      this.BulletConditionResultPool.Clear(),
      this.VectorPool.Clear(),
      this.RotatorPool.Clear();
  }
  static CreateBulletEntity() {
    let t = BulletPool.BulletEntityPool.Get(KEY_BULLET_ENTITY);
    return (
      t
        ? EntitySystem_1.EntitySystem.Respawn(t)
        : ((t = BulletPool.BulletEntityPool.Create(KEY_BULLET_ENTITY)),
          EntitySystem_1.EntitySystem.Init(t)),
      t
    );
  }
  static RecycleBulletEntity(t) {
    EntitySystem_1.EntitySystem.DeSpawn(t), BulletPool.BulletEntityPool.Put(t);
  }
  static CreateBulletHitActorData() {
    let t = BulletPool.BulletHitActorDataPool.Get();
    return (t = t || BulletPool.BulletHitActorDataPool.Create());
  }
  static RecycleBulletHitActorData(t) {
    t.Clear(), BulletPool.BulletHitActorDataPool.Put(t);
  }
  static CreateBulletConditionResult() {
    let t = BulletPool.BulletConditionResultPool.Get();
    return (t = t || BulletPool.BulletConditionResultPool.Create());
  }
  static RecycleBulletConditionResult(t) {
    t.Clear(), BulletPool.BulletConditionResultPool.Put(t);
  }
  static CreateVector(t = !1) {
    let l = BulletPool.VectorPool.Get();
    return l ? t && l.Reset() : (l = Vector_1.Vector.Create()), this.yjo++, l;
  }
  static RecycleVector(t) {
    this.yjo--,
      BulletConstant_1.BulletConstant.OpenPoolCheck
        ? t.Set(NaN, NaN, NaN)
        : BulletPool.VectorPool.Release(t);
  }
  static CreateRotator(t = !1) {
    let l = BulletPool.RotatorPool.Get();
    return l ? t && l.Reset() : (l = Rotator_1.Rotator.Create()), this.Ijo++, l;
  }
  static RecycleRotator(t) {
    this.Ijo--,
      BulletConstant_1.BulletConstant.OpenPoolCheck
        ? t.Set(NaN, NaN, NaN)
        : BulletPool.RotatorPool.Release(t);
  }
  static CreateBulletHitTempResult() {
    let t = BulletPool.BulletHitTempResultPool.Get();
    return (
      (t = t || new BulletHitActorData_1.BulletHitTempResult()), this.Tjo++, t
    );
  }
  static RecycleBulletHitTempResult(t) {
    this.Tjo--, BulletPool.BulletHitTempResultPool.Release(t);
  }
  static CheckAtFrameEnd() {
    0 !== this.yjo &&
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 18, "当前帧子弹申请的Vector没有回收", [
          "VectorCount",
          this.yjo,
        ]),
      (this.yjo = 0)),
      0 !== this.Ijo &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Bullet", 18, "当前帧子弹申请的Rotator没有回收", [
            "RotatorCount",
            this.Ijo,
          ]),
        (this.Ijo = 0)),
      0 !== this.Tjo &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            18,
            "当前帧子弹申请的BulletHitTempResultCount没有回收",
            ["BulletHitTempResultCount", this.Tjo],
          ),
        (this.Tjo = 0));
  }
}
((exports.BulletPool = BulletPool).BulletEntityPool = new ProxyLru_1.ProxyLru(
  PRE_ADD_COUNT,
  (t) => EntitySystem_1.EntitySystem.Create(BulletEntity_1.BulletEntity),
)),
  (BulletPool.BulletHitActorDataPool = new Pool_1.Pool(
    CAPACITY,
    () => new BulletHitActorData_1.BulletHitActorData(),
  )),
  (BulletPool.BulletConditionResultPool = new Pool_1.Pool(
    CAPACITY,
    () => new BulletCollisionInfo_1.BulletConditionResult(),
  )),
  (BulletPool.VectorPool = new SimplePool()),
  (BulletPool.yjo = 0),
  (BulletPool.RotatorPool = new SimplePool()),
  (BulletPool.Ijo = 0),
  (BulletPool.BulletHitTempResultPool = new SimplePool()),
  (BulletPool.Tjo = 0);
//# sourceMappingURL=BulletPool.js.map
