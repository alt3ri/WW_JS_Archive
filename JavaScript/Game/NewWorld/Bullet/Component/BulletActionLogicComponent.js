"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    let l;
    const a = arguments.length;
    let r =
      a < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, e, o, i);
    else
      for (let s = t.length - 1; s >= 0; s--)
        (l = t[s]) && (r = (a < 3 ? l(r) : a > 3 ? l(e, o, r) : l(e, o)) || r);
    return a > 3 && r && Object.defineProperty(e, o, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletActionLogicComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../Core/Entity/EntityComponent");
const PerformanceDecorators_1 = require("../../../../Core/Performance/PerformanceDecorators");
const BulletLogicAdditiveAccelerateController_1 = require("../BulletLogicDataAssetController/BulletLogicAdditiveAccelerateController");
const BulletLogicCreateBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicCreateBulletController");
const BulletLogicCurveMovementController_1 = require("../BulletLogicDataAssetController/BulletLogicCurveMovementController");
const BulletLogicDestroyBulletController_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyBulletController");
const BulletLogicDestroyOtherBullet_1 = require("../BulletLogicDataAssetController/BulletLogicDestroyOtherBullet");
const BulletLogicForceController_1 = require("../BulletLogicDataAssetController/BulletLogicForceController");
const BulletLogicFreezeController_1 = require("../BulletLogicDataAssetController/BulletLogicFreezeController");
const BulletLogicManipulatableCreateBullet_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableCreateBullet");
const BulletLogicManipulatableTagsChange_1 = require("../BulletLogicDataAssetController/BulletLogicManipulatableTagsChange");
const BulletLogicReboundController_1 = require("../BulletLogicDataAssetController/BulletLogicReboundController");
const BulletLogicShakeCameraController_1 = require("../BulletLogicDataAssetController/BulletLogicShakeCameraController");
const BulletLogicShowMesh_1 = require("../BulletLogicDataAssetController/BulletLogicShowMesh");
const BulletLogicSpawnObstacles_1 = require("../BulletLogicDataAssetController/BulletLogicSpawnObstacles");
const BulletLogicSpeedReduceController_1 = require("../BulletLogicDataAssetController/BulletLogicSpeedReduceController");
const BulletLogicSuiGuang_1 = require("../BulletLogicDataAssetController/BulletLogicSuiGuang");
const BulletLogicSupportController_1 = require("../BulletLogicDataAssetController/BulletLogicSupportController");
const BulletLogicWhirlpool_1 = require("../BulletLogicDataAssetController/BulletLogicWhirlpool");
const LogicDataAdditiveAccelerate_1 = require("../LogicDataClass/LogicDataAdditiveAccelerate");
const LogicDataCreateBullet_1 = require("../LogicDataClass/LogicDataCreateBullet");
const LogicDataDestroyBullet_1 = require("../LogicDataClass/LogicDataDestroyBullet");
const LogicDataDestroyOtherBullet_1 = require("../LogicDataClass/LogicDataDestroyOtherBullet");
const LogicDataForce_1 = require("../LogicDataClass/LogicDataForce");
const LogicDataFreeze_1 = require("../LogicDataClass/LogicDataFreeze");
const LogicDataManipulatableCreateBullet_1 = require("../LogicDataClass/LogicDataManipulatableCreateBullet");
const LogicDataManipulatableTagsChange_1 = require("../LogicDataClass/LogicDataManipulatableTagsChange");
const LogicDataRebound_1 = require("../LogicDataClass/LogicDataRebound");
const LogicDataShakeScreen_1 = require("../LogicDataClass/LogicDataShakeScreen");
const LogicDataShowMesh_1 = require("../LogicDataClass/LogicDataShowMesh");
const LogicDataSpawnObstacles_1 = require("../LogicDataClass/LogicDataSpawnObstacles");
const LogicDataSpeedReduce_1 = require("../LogicDataClass/LogicDataSpeedReduce");
const LogicDataSplineMovement_1 = require("../LogicDataClass/LogicDataSplineMovement");
const LogicDataSuiGuang_1 = require("../LogicDataClass/LogicDataSuiGuang");
const LogicDataSupport_1 = require("../LogicDataClass/LogicDataSupport");
const LogicDataWhirlpool_1 = require("../LogicDataClass/LogicDataWhirlpool");
const RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent");
let BulletActionLogicComponent = class BulletActionLogicComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this._9o = void 0),
      (this.tbr = void 0),
      (this.ibr = void 0),
      (this.obr = void 0),
      (this.rbr = void 0),
      (this.nbr = void 0),
      (this.sbr = void 0),
      (this.abr = void 0),
      (this.hbr = void 0),
      (this.lbr = !1),
      (this._br = !1);
  }
  get ObstaclesDetect() {
    return this.lbr;
  }
  OnStart() {
    (this._9o = this.Entity.GetBulletInfo()),
      ((this._9o.ActionLogicComponent = this).tbr = this._9o.BulletDataMain),
      (this._br =
        this.tbr.Base.ContinuesCollision &&
        (this.tbr.Base.Interval > 0 || this.tbr.Base.CollisionActiveDelay > 0));
    const t = this.tbr.Execution.GbDataList;
    if (t && t.length > 0)
      for (const o of t) {
        const e = this.ubr(o);
        o.ExecuteStage === 0
          ? (this.ibr || (this.ibr = []), this.ibr.push(e))
          : o.ExecuteStage === 2
            ? (this.rbr || (this.rbr = []), this.rbr.push(e))
            : o.ExecuteStage === 1
              ? (this.obr || (this.obr = []), this.obr.push(e))
              : o.ExecuteStage === 3
                ? (this.nbr || (this.nbr = []), this.nbr.push(e))
                : o.ExecuteStage === 4
                  ? (this.sbr || (this.sbr = []), this.sbr.push(e))
                  : o.ExecuteStage === 5 &&
                    (this.abr || (this.abr = []), this.abr.push(e)),
          e.NeedTick && (this.hbr || (this.hbr = []), this.hbr.push(e));
      }
    return !0;
  }
  OnAfterInit() {
    if (this.ibr) for (const t of this.ibr) t.OnInit(), t.BulletLogicAction();
    if (this.rbr) for (const e of this.rbr) e.OnInit();
    if (this.obr) for (const o of this.obr) o.OnInit();
    if (this.nbr) for (const i of this.nbr) i.OnInit();
    if (this.sbr) for (const l of this.sbr) l.OnInit();
    if (this.abr) for (const a of this.abr) a.OnInit();
  }
  OnTick(t) {
    if (this._9o.IsInit) {
      if (this._br && this._9o.CollisionInfo.HaveCharacterInBullet && this.obr)
        for (const e of this.obr) e.BulletLogicAction();
      if (!this._9o.NeedDestroy && this.hbr)
        for (const o of this.hbr) o.Tick(t);
    }
  }
  OnEnd() {
    if (this.ibr) for (const t of this.ibr) t.OnBulletDestroy();
    if (this.obr) for (const e of this.obr) e.OnBulletDestroy();
    if (this.rbr) for (const o of this.rbr) o.OnBulletDestroy();
    if (this.nbr) for (const i of this.nbr) i.OnBulletDestroy();
    if (this.sbr) for (const l of this.sbr) l.OnBulletDestroy();
    if (this.abr) for (const a of this.abr) a.OnBulletDestroy();
    return !(this.lbr = !1);
  }
  ActionDestroy() {
    if (this.rbr) for (const t of this.rbr) t.BulletLogicAction();
  }
  ActionHit(t) {
    if (this._9o.IsInit && !this._br && this.obr)
      for (const e of this.obr) e.BulletLogicAction(t);
  }
  ActionHitObstacles(t) {
    if (this._9o.IsInit && this.obr)
      for (const e of this.obr) e.BulletLogicActionOnHitObstacles(t);
  }
  ActionRebound(t) {
    if (this.nbr) for (const e of this.nbr) e.BulletLogicAction(t);
  }
  ActionSupport(t) {
    if (
      ((!this.sbr || this.sbr?.length <= 0) &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Bullet",
          21,
          "与子弹碰撞, 执行Support",
          ["This.Id", this._9o.BulletRowName],
          ["this.OnSupportController.Len", this.sbr?.length],
        ),
      this.sbr)
    )
      for (const e of this.sbr) e.BulletLogicAction(t);
  }
  ActionTickMovement(t) {
    if (this.abr) for (const e of this.abr) e.BulletLogicAction(t);
  }
  ubr(t) {
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
            ? ((this.lbr = !0),
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
// # sourceMappingURL=BulletActionLogicComponent.js.map
