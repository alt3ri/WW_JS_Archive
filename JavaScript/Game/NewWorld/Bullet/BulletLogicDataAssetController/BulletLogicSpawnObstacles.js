"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicSpawnObstacles = void 0);
const UE = require("ue"),
  ActorSystem_1 = require("../../../../Core/Actor/ActorSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  GlobalData_1 = require("../../../GlobalData"),
  CharacterNameDefines_1 = require("../../Character/Common/CharacterNameDefines"),
  BulletPool_1 = require("../Model/BulletPool"),
  BulletLogicController_1 = require("./BulletLogicController");
class BulletLogicSpawnObstacles extends BulletLogicController_1.BulletLogicController {
  constructor(e, t) {
    super(e, t), (this.OC = void 0);
  }
  OnInit() {
    var e = this.LogicController,
      t = MathUtils_1.MathUtils.DefaultTransform,
      l =
        ((this.OC = ActorSystem_1.ActorSystem.Get(UE.Actor.StaticClass(), t)),
        GlobalData_1.GlobalData.IsPlayInEditor &&
          this.OC.SetActorLabel("BulletCage", !0),
        e.Model);
    let r = void 0;
    var o,
      i = this.Bullet.GetBulletInfo();
    1 === l
      ? ((o = this.OC.AddComponentByClass(
          UE.StaticMeshComponent.StaticClass(),
          !1,
          t,
          !0,
        )).SetStaticMesh(e.Mesh),
        (r = o))
      : 2 === l &&
        (r = this.OC.AddComponentByClass(
          UE.BoxComponent.StaticClass(),
          !1,
          t,
          !0,
        )),
      r &&
        (r.SetCollisionProfileName(e.ProfileName, !1),
        (r.bCanCharacterStandOn = e.CanStandOn),
        this.OC.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.NO_SLIDE),
        r.SetGenerateOverlapEvents(!1),
        (r.CreationMethod = 3),
        r.SetVisibility(e.ShowModel),
        this.OC.FinishAddComponent(r, !1, t),
        e.NeedAttach
          ? this.OC.K2_AttachToActor(
              i.Actor,
              FNameUtil_1.FNameUtil.NONE,
              2,
              2,
              1,
              !1,
            )
          : this.OC.K2_SetActorTransform(
              i.Actor.GetTransform(),
              !1,
              void 0,
              !0,
            ),
        1 === l
          ? ((o = BulletPool_1.BulletPool.CreateVector()).FromUeVector(e.Size),
            o.MultiplyEqual(0.02),
            r.SetRelativeScale3D(o.ToUeVector()),
            BulletPool_1.BulletPool.RecycleVector(o))
          : 2 === l && r.SetBoxExtent(e.Size));
  }
  OnBulletDestroy() {
    this.LogicController.NeedAttach && this.OC.K2_DetachFromActor(),
      ActorSystem_1.ActorSystem.Put(this.OC);
  }
}
exports.BulletLogicSpawnObstacles = BulletLogicSpawnObstacles;
//# sourceMappingURL=BulletLogicSpawnObstacles.js.map
