"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnChairController = exports.SubEntityInteractLogicController =
    void 0);
const puerts_1 = require("puerts"),
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
        this.Entity.GetComponent(181)?.GetInteractController());
  }
  Possess(t, e = 0) {
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
class PawnChairController extends (exports.SubEntityInteractLogicController =
  SubEntityInteractLogicController) {
  constructor() {
    super(...arguments), (this.crr = 40), (this.mrr = void 0);
  }
  Possess(t, e) {
    return (this.MasterEntity = t), !0;
  }
  GetInteractPoint() {
    var t = this.Entity.GetComponent(1),
      e = Vector_1.Vector.Create(),
      r = Vector_1.Vector.Create(),
      s = Vector_1.Vector.Create(t.ActorRightProxy),
      t = Vector_1.Vector.Create(t.ActorLocationProxy);
    return s.Normalize(), s.Multiply(this.crr, r), t.Addition(r, e), e;
  }
  GetForwardDirection() {
    return this.Entity.GetComponent(1).ActorRightProxy;
  }
  drr(e) {
    if (this.mrr && this.MasterEntity) {
      var t,
        r = this.MasterEntity.GetComponent(2),
        s =
          (r.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, e ? 0 : 2),
          (0, puerts_1.$ref)(void 0)),
        o = (this.mrr.Owner.GetAttachedActors(s), (0, puerts_1.$unref)(s)),
        i = o.Num();
      0 === i &&
        ((s = this.CreatureDataComp.GetPbDataId()),
        (t = this.mrr.CreatureData.GetPbDataId()),
        Log_1.Log.CheckWarn()) &&
        Log_1.Log.Warn(
          "AI",
          51,
          "[PawnChairController] Scene Interaction Loaded UnComplete!",
          ["itemPbDataId", s],
          ["OwnerPbDataId", t],
        );
      for (let t = 0; t < i; ++t) {
        var n = o.Get(t),
          a = (0, puerts_1.$ref)(void 0),
          h = (n.GetAttachedActors(a), (0, puerts_1.$unref)(a)),
          d = h.Num();
        for (let t = 0; t < d; ++t)
          r.Actor.CapsuleComponent.IgnoreActorWhenMoving(h.Get(t), e);
      }
    }
  }
  ResetCollision() {
    this.Entity.GetComponent(185) && this.drr(!1);
  }
  IgnoreCollision() {
    this.Entity.GetComponent(185) && this.drr(!0);
  }
  IsSceneInteractionLoadCompleted() {
    var t = this.Entity.GetComponent(185);
    if (!t) return !1;
    var e = this.CreatureDataComp.GetPbDataId();
    const r = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(e);
    if (
      (r &&
        (e =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r)) &&
        (this.mrr = e.Entity.GetComponent(185)),
      this.mrr || (this.mrr = t),
      !this.mrr.Owner)
    )
      return !1;
    e = (0, puerts_1.$ref)(void 0);
    if (
      (this.mrr.Owner.GetAttachedActors(e), 0 !== (0, puerts_1.$unref)(e).Num())
    )
      return !0;
    {
      t = this.CreatureDataComp.GetPbDataId();
      const r = this.mrr.CreatureData.GetPbDataId();
      return (
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "AI",
            51,
            "[PawnChairController] Scene Interaction Loaded UnComplete!",
            ["itemPbDataId", t],
            ["OwnerPbDataId", r],
          ),
        !1
      );
    }
  }
}
exports.PawnChairController = PawnChairController;
//# sourceMappingURL=PawnChairController.js.map
