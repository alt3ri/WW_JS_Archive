"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var l,
      a = arguments.length,
      r =
        a < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(t, e, o, i);
    else
      for (var s = t.length - 1; 0 <= s; s--)
        (l = t[s]) && (r = (a < 3 ? l(r) : 3 < a ? l(e, o, r) : l(e, o)) || r);
    return 3 < a && r && Object.defineProperty(e, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionLogicComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators"),
  BulletLogicAdditiveAccelerateController_1 = require("../BulletLogicDataAssetController/BulletLogicAdditiveAccelerateController"),
  BulletLogicCreateBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicCreateBulletController"),
  BulletLogicCurveMovementController_1 = require("../BulletLogicDataAssetController/BulletLogicCurveMovementController"),
  BulletLogicDestroyBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyBulletController"),
  BulletLogicDestroyOtherBullet_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyOtherBullet"),
  BulletLogicForceController_1 = require("../BulletLogicDataAssetController/BulletLogicForceController"),
  BulletLogicFreezeController_1 = require("../BulletLogicDataAssetController/BulletLogicFreezeController"),
  BulletLogicManipulatableCreateBullet_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableCreateBullet"),
  BulletLogicManipulatableTagsChange_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableTagsChange"),
  BulletLogicReboundController_1 = require("../BulletLogicDataAssetController/BulletLogicReboundController"),
  BulletLogicShakeCameraController_1 = require("../BulletLogicDataAssetController/BulletLogicShakeCameraController"),
  BulletLogicShowMesh_1 = require("../BulletLogicDataAssetController/BulletLogicShowMesh"),
  BulletLogicSpawnObstacles_1 = require("../BulletLogicDataAssetController/BulletLogicSpawnObstacles"),
  BulletLogicSpeedReduceController_1 = require("../BulletLogicDataAssetController/BulletLogicSpeedReduceController"),
  BulletLogicSuiGuang_1 = require("../BulletLogicDataAssetController/BulletLogicSuiGuang"),
  BulletLogicSupportController_1 = require("../BulletLogicDataAssetController/BulletLogicSupportController"),
  BulletLogicWhirlpool_1 = require("../BulletLogicDataAssetController/BulletLogicWhirlpool"),
  LogicDataAdditiveAccelerate_1 = require("../LogicDataClass/LogicDataAdditiveAccelerate"),
  LogicDataCreateBullet_1 = require("../LogicDataClass/LogicDataCreateBullet"),
  LogicDataDestroyBullet_1 = require("../LogicDataClass/LogicDataDestroyBullet"),
  LogicDataDestroyOtherBullet_1 = require("../LogicDataClass/LogicDataDestroyOtherBullet"),
  LogicDataForce_1 = require("../LogicDataClass/LogicDataForce"),
  LogicDataFreeze_1 = require("../LogicDataClass/LogicDataFreeze"),
  LogicDataManipulatableCreateBullet_1 = require("../LogicDataClass/LogicDataManipulatableCreateBullet"),
  LogicDataManipulatableTagsChange_1 = require("../LogicDataClass/LogicDataManipulatableTagsChange"),
  LogicDataRebound_1 = require("../LogicDataClass/LogicDataRebound"),
  LogicDataShakeScreen_1 = require("../LogicDataClass/LogicDataShakeScreen"),
  LogicDataShowMesh_1 = require("../LogicDataClass/LogicDataShowMesh"),
  LogicDataSpawnObstacles_1 = require("../LogicDataClass/LogicDataSpawnObstacles"),
  LogicDataSpeedReduce_1 = require("../LogicDataClass/LogicDataSpeedReduce"),
  LogicDataSplineMovement_1 = require("../LogicDataClass/LogicDataSplineMovement"),
  LogicDataSuiGuang_1 = require("../LogicDataClass/LogicDataSuiGuang"),
  LogicDataSupport_1 = require("../LogicDataClass/LogicDataSupport"),
  LogicDataWhirlpool_1 = require("../LogicDataClass/LogicDataWhirlpool"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let BulletActionLogicComponent = class BulletActionLogicComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.a7o = void 0),
      (this.PBr = void 0),
      (this.xBr = void 0),
      (this.wBr = void 0),
      (this.BBr = void 0),
      (this.bBr = void 0),
      (this.qBr = void 0),
      (this.GBr = void 0),
      (this.NBr = void 0),
      (this.OBr = !1),
      (this.kBr = !1);
  }
  get ObstaclesDetect() {
    return this.OBr;
  }
  OnStart() {
    (this.a7o = this.Entity.GetBulletInfo()),
      ((this.a7o.ActionLogicComponent = this).PBr = this.a7o.BulletDataMain),
      (this.kBr =
        this.PBr.Base.ContinuesCollision &&
        (0 < this.PBr.Base.Interval || 0 < this.PBr.Base.CollisionActiveDelay));
    var t = this.PBr.Execution.GbDataList;
    if (t && 0 < t.length)
      for (const o of t) {
        var e = this.FBr(o);
        0 === o.ExecuteStage
          ? (this.xBr || (this.xBr = []), this.xBr.push(e))
          : 2 === o.ExecuteStage
            ? (this.BBr || (this.BBr = []), this.BBr.push(e))
            : 1 === o.ExecuteStage
              ? (this.wBr || (this.wBr = []), this.wBr.push(e))
              : 3 === o.ExecuteStage
                ? (this.bBr || (this.bBr = []), this.bBr.push(e))
                : 4 === o.ExecuteStage
                  ? (this.qBr || (this.qBr = []), this.qBr.push(e))
                  : 5 === o.ExecuteStage &&
                    (this.GBr || (this.GBr = []), this.GBr.push(e)),
          e.NeedTick && (this.NBr || (this.NBr = []), this.NBr.push(e));
      }
    return !0;
  }
  OnAfterInit() {
    if (this.xBr) for (const t of this.xBr) t.OnInit(), t.BulletLogicAction();
    if (this.BBr) for (const e of this.BBr) e.OnInit();
    if (this.wBr) for (const o of this.wBr) o.OnInit();
    if (this.bBr) for (const i of this.bBr) i.OnInit();
    if (this.qBr) for (const l of this.qBr) l.OnInit();
    if (this.GBr) for (const a of this.GBr) a.OnInit();
  }
  OnTick(t) {
    if (this.a7o.IsInit) {
      if (this.kBr && this.a7o.CollisionInfo.HaveCharacterInBullet && this.wBr)
        for (const e of this.wBr) e.BulletLogicAction();
      if (!this.a7o.NeedDestroy && this.NBr)
        for (const o of this.NBr) o.Tick(t);
    }
  }
  OnEnd() {
    if (this.xBr) for (const t of this.xBr) t.OnBulletDestroy();
    if (this.wBr) for (const e of this.wBr) e.OnBulletDestroy();
    if (this.BBr) for (const o of this.BBr) o.OnBulletDestroy();
    if (this.bBr) for (const i of this.bBr) i.OnBulletDestroy();
    if (this.qBr) for (const l of this.qBr) l.OnBulletDestroy();
    if (this.GBr) for (const a of this.GBr) a.OnBulletDestroy();
    return !(this.OBr = !1);
  }
  ActionDestroy() {
    if (this.BBr) for (const t of this.BBr) t.BulletLogicAction();
  }
  ActionHit(t) {
    if (this.a7o.IsInit && !this.kBr && this.wBr)
      for (const e of this.wBr) e.BulletLogicAction(t);
  }
  ActionHitObstacles(t) {
    if (this.a7o.IsInit && this.wBr)
      for (const e of this.wBr) e.BulletLogicActionOnHitObstacles(t);
  }
  ActionRebound(t) {
    if (this.bBr) for (const e of this.bBr) e.BulletLogicAction(t);
  }
  ActionSupport(t) {
    if (
      ((!this.qBr || this.qBr?.length <= 0) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Bullet",
          21,
          "与子弹碰撞, 执行Support",
          ["This.Id", this.a7o.BulletRowName],
          ["this.OnSupportController.Len", this.qBr?.length],
        ),
      this.qBr)
    )
      for (const e of this.qBr) e.BulletLogicAction(t);
  }
  ActionTickMovement(t) {
    if (this.GBr) for (const e of this.GBr) e.BulletLogicAction(t);
  }
  FBr(t) {
    return t instanceof LogicDataCreateBullet_1.default
      ? new BulletLogicCreateBulletController_1.BulletLogicCreateBulletController(
          t,
          this.Entity,
        )
      : t instanceof LogicDataDestroyBullet_1.default
        ? new BulletLogicDestroyBulletController_1.BulletLogicDestroyBulletController(
            t,
            this.Entity,
          )
        : t instanceof LogicDataForce_1.default
          ? new BulletLogicForceController_1.BulletLogicForceController(
              t,
              this.Entity,
            )
          : t instanceof LogicDataSpeedReduce_1.default
            ? ((this.OBr = !0),
              new BulletLogicSpeedReduceController_1.BulletLogicSpeedReduceController(
                t,
                this.Entity,
              ))
            : t instanceof LogicDataAdditiveAccelerate_1.default
              ? new BulletLogicAdditiveAccelerateController_1.BulletLogicAdditiveAccelerateController(
                  t,
                  this.Entity,
                )
              : t instanceof LogicDataFreeze_1.default
                ? new BulletLogicFreezeController_1.BulletLogicFreezeController(
                    t,
                    this.Entity,
                  )
                : t instanceof LogicDataRebound_1.default
                  ? new BulletLogicReboundController_1.BulletLogicReboundController(
                      t,
                      this.Entity,
                    )
                  : t instanceof LogicDataSupport_1.default
                    ? new BulletLogicSupportController_1.BulletLogicSupportController(
                        t,
                        this.Entity,
                      )
                    : t instanceof LogicDataSplineMovement_1.default
                      ? new BulletLogicCurveMovementController_1.BulletLogicCurveMovementController(
                          t,
                          this.Entity,
                        )
                      : t instanceof LogicDataShakeScreen_1.default
                        ? new BulletLogicShakeCameraController_1.BulletLogicShakeCameraController(
                            t,
                            this.Entity,
                          )
                        : t instanceof LogicDataShowMesh_1.default
                          ? new BulletLogicShowMesh_1.BulletLogicShowMesh(
                              t,
                              this.Entity,
                            )
                          : t instanceof LogicDataSuiGuang_1.default
                            ? new BulletLogicSuiGuang_1.BulletLogicSuiGuang(
                                t,
                                this.Entity,
                              )
                            : t instanceof LogicDataSpawnObstacles_1.default
                              ? new BulletLogicSpawnObstacles_1.BulletLogicSpawnObstacles(
                                  t,
                                  this.Entity,
                                )
                              : t instanceof
                                  LogicDataManipulatableCreateBullet_1.default
                                ? new BulletLogicManipulatableCreateBullet_1.BulletLogicManipulatableCreateBullet(
                                    t,
                                    this.Entity,
                                  )
                                : t instanceof
                                    LogicDataManipulatableTagsChange_1.default
                                  ? new BulletLogicManipulatableTagsChange_1.BulletLogicManipulatableTagsChange(
                                      t,
                                      this.Entity,
                                    )
                                  : t instanceof LogicDataWhirlpool_1.default
                                    ? new BulletLogicWhirlpool_1.BulletLogicWhirlpool(
                                        t,
                                        this.Entity,
                                      )
                                    : t instanceof
                                        LogicDataDestroyOtherBullet_1.default
                                      ? new BulletLogicDestroyOtherBullet_1.BulletLogicDestroyOtherBullet(
                                          t,
                                          this.Entity,
                                        )
                                      : void 0;
  }
};
__decorate(
  [(0, PerformanceDecorators_1.TickPerformanceEx)("Bullet", !1)],
  BulletActionLogicComponent.prototype,
  "OnTick",
  null,
),
  (BulletActionLogicComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(13)],
    BulletActionLogicComponent,
  )),
  (exports.BulletActionLogicComponent = BulletActionLogicComponent);
//# sourceMappingURL=BulletActionLogicComponent.js.map
