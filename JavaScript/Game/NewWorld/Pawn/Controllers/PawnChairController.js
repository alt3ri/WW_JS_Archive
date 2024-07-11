"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PawnChairController = exports.SubEntityInteractLogicController =
    void 0);
const puerts_1 = require("puerts");
const Log_1 = require("../../../../Core/Common/Log");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const ModelManager_1 = require("../../../Manager/ModelManager");
class SubEntityInteractLogicController {
  constructor(t) {
    (this.MasterEntity = void 0),
      (this.Entity = void 0),
      (this.CreatureDataComp = void 0),
      (this.InteractComp = void 0),
      (this.CreatureDataComp = t),
      (this.Entity = t.Entity),
      (this.InteractComp =
        this.Entity.GetComponent(178)?.GetInteractController());
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
    super(...arguments), (this.mor = 40), (this.dor = void 0);
  }
  Possess(t, e) {
    return (this.MasterEntity = t), !0;
  }
  GetInteractPoint() {
    var t = this.Entity.GetComponent(1);
    const e = Vector_1.Vector.Create();
    const r = Vector_1.Vector.Create();
    const s = Vector_1.Vector.Create(t.ActorRightProxy);
    var t = Vector_1.Vector.Create(t.ActorLocationProxy);
    return s.Normalize(), s.Multiply(this.mor, r), t.Addition(r, e), e;
  }
  GetForwardDirection() {
    return this.Entity.GetComponent(1).ActorRightProxy;
  }
  Cor(e) {
    if (this.dor && this.MasterEntity) {
      let t;
      const r = this.MasterEntity.GetComponent(2);
      let s =
        (r.Actor.CapsuleComponent.SetCollisionResponseToChannel(2, e ? 0 : 2),
        (0, puerts_1.$ref)(void 0));
      const o = (this.dor.Owner.GetAttachedActors(s), (0, puerts_1.$unref)(s));
      const i = o.Num();
      i === 0 &&
        ((s = this.CreatureDataComp.GetPbDataId()),
        (t = this.dor.CreatureData.GetPbDataId()),
        Log_1.Log.CheckWarn()) &&
        Log_1.Log.Warn(
          "AI",
          51,
          "[PawnChairController] Scene Interaction Loaded UnComplete!",
          ["itemPbDataId", s],
          ["OwnerPbDataId", t],
        );
      for (let t = 0; t < i; ++t) {
        const n = o.Get(t);
        const a = (0, puerts_1.$ref)(void 0);
        const h = (n.GetAttachedActors(a), (0, puerts_1.$unref)(a));
        const d = h.Num();
        for (let t = 0; t < d; ++t)
          r.Actor.CapsuleComponent.IgnoreActorWhenMoving(h.Get(t), e);
      }
    }
  }
  ResetCollision() {
    this.Entity.GetComponent(182) && this.Cor(!1);
  }
  IgnoreCollision() {
    this.Entity.GetComponent(182) && this.Cor(!0);
  }
  IsSceneInteractionLoadCompleted() {
    let t = this.Entity.GetComponent(182);
    if (!t) return !1;
    let e = this.CreatureDataComp.GetPbDataId();
    const r = ModelManager_1.ModelManager.CreatureModel.GetOwnerEntity(e);
    if (
      (r &&
        (e =
          ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(r)) &&
        (this.dor = e.Entity.GetComponent(182)),
      this.dor || (this.dor = t),
      !this.dor.Owner)
    )
      return !1;
    e = (0, puerts_1.$ref)(void 0);
    if (
      (this.dor.Owner.GetAttachedActors(e), (0, puerts_1.$unref)(e).Num() !== 0)
    )
      return !0;
    {
      t = this.CreatureDataComp.GetPbDataId();
      const r = this.dor.CreatureData.GetPbDataId();
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
// # sourceMappingURL=PawnChairController.js.map
