"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnChairController = exports.SubEntityInteractLogicController =
    void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class SubEntityInteractLogicController {
  constructor(t) {
    (this.MasterEntity = void 0),
      (this.Entity = void 0),
      (this.CreatureDataComp = void 0),
      (this.InteractComp = void 0),
      (this.CreatureDataComp = t),
      (this.Entity = t.Entity),
      (this.InteractComp =
        this.Entity.GetComponent(182)?.GetInteractController());
  }
  Possess(t, r = 0) {
    return !0;
  }
  UnPossess(t) {
    return !0;
  }
  IsPossessed() {
    return void 0 !== this.MasterEntity;
  }
  IsPossessedBy(t) {
    return void 0 !== this.MasterEntity && this.MasterEntity === t;
  }
  Dispose() {
    (this.MasterEntity = void 0),
      (this.Entity = void 0),
      (this.CreatureDataComp = void 0),
      (this.InteractComp = void 0);
  }
}
((exports.SubEntityInteractLogicController =
  SubEntityInteractLogicController).TmpVector = Vector_1.Vector.Create()),
  (SubEntityInteractLogicController.TmpVector2 = Vector_1.Vector.Create());
class PawnChairController extends SubEntityInteractLogicController {
  constructor() {
    super(...arguments), (this.CFa = 40), (this.mrr = void 0);
  }
  Possess(t, r) {
    return (this.MasterEntity = t), !0;
  }
  UnPossess(t) {
    return !(this.MasterEntity = void 0);
  }
  GetSitLocation() {
    var t = PawnChairController.TmpVector,
      r = (t.Reset(), PawnChairController.TmpVector2),
      s = this.Entity.GetComponent(1),
      i = (r.DeepCopy(s.ActorLocationProxy), this.MasterEntity.GetComponent(2)),
      e = i.ScaledHalfHeight,
      i = i.ActorLocationProxy;
    return (
      (this.mrr || s).ActorRightProxy.Multiply(this.CFa, t),
      (r.Z = this.mrr ? this.mrr.ActorLocationProxy.Z + e : i.Z),
      t.AdditionEqual(r),
      t
    );
  }
  GetForwardDirection() {
    return this.Entity.GetComponent(1).ActorRightProxy;
  }
  drr(r) {
    if (
      this.mrr &&
      this.MasterEntity &&
      this.mrr.GetIsSceneInteractionLoadCompleted()
    ) {
      var s = r ? 0 : 2,
        i = this.MasterEntity.GetComponent(2),
        t = (0, puerts_1.$ref)(void 0),
        e = (this.mrr.Owner.GetAttachedActors(t), (0, puerts_1.$unref)(t)),
        o = e.Num();
      0 === o &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "AI",
          51,
          "[PawnChairController.IgnoreChairActorsCollision] 场景交互物体未加载完全",
          ["itemPbDataId", this.CreatureDataComp.GetPbDataId()],
          ["OwnerPbDataId", this.mrr.CreatureData.GetPbDataId()],
        );
      for (let t = 0; t < o; ++t) {
        var n = e.Get(t),
          h = (0, puerts_1.$ref)(void 0),
          a = (n.GetAttachedActors(h), (0, puerts_1.$unref)(h)),
          l = a.Num();
        for (let t = 0; t < l; ++t) {
          var u = a.Get(t);
          u.IsValid() &&
            (i.Actor.IgnoreActorWhenMoving(a.Get(t), r, !0),
            (u = u)?.IsValid()) &&
            u
              .GetComponentByClass(UE.StaticMeshComponent.StaticClass())
              ?.SetCollisionResponseToChannel(2, s);
        }
      }
    }
  }
  ResetCollision() {
    this.Entity.GetComponent(187) && this.drr(!1);
  }
  IgnoreCollision() {
    this.Entity.GetComponent(187) && this.drr(!0);
  }
  IsSceneInteractionLoadCompleted() {
    var t,
      r = this.Entity.GetComponent(187);
    return !(
      !r ||
      !r.GetIsSceneInteractionLoadCompleted() ||
      ((t = this.CreatureDataComp.GetPbDataId()),
      (t = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(t))
        ? !(t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t))
            ?.Valid ||
          ((this.mrr = t.Entity.GetComponent(187)), !this.mrr) ||
          !this.mrr.GetIsSceneInteractionLoadCompleted()
        : ((this.mrr = r), 0))
    );
  }
}
exports.PawnChairController = PawnChairController;
//# sourceMappingURL=PawnChairController.js.map
