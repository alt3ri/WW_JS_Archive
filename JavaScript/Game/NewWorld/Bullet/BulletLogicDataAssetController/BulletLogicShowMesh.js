"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicShowMesh = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EffectModelHelper_1 = require("../../../Render/Effect/Data/EffectModelHelper"),
  BulletLogicController_1 = require("./BulletLogicController"),
  MIN_LOD = 99;
class BulletLogicShowMesh extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e),
      (this.l9e = void 0),
      (this.N7o = void 0),
      (this.a7o = void 0),
      (this.O7o = new Array()),
      (this.h7o = t);
  }
  BulletLogicAction(t = 0) {
    (this.a7o = this.Bullet.GetBulletInfo()),
      this.a7o
        ? this.a7o.Target
          ? (this.k7o(), this.F7o(), this.V7o(), this.H7o())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败")
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法获取BattleInfo");
  }
  OnBulletDestroy() {
    const e = this.Bullet.GetBulletInfo();
    this.N7o && e.Actor.K2_DestroyComponent(this.N7o),
      this.l9e && (e.Actor.K2_DestroyComponent(this.l9e), (this.l9e = void 0)),
      this.O7o.forEach((t) => {
        t && e.Actor.K2_DestroyComponent(t);
      }),
      (this.O7o.length = 0);
  }
  k7o() {
    if (this.a7o.Target) {
      var t = this.a7o.Target.GetComponent(3).Actor.Mesh;
      if (((this.N7o = this.j7o(t)), this.N7o))
        return (
          (t = (0, puerts_1.$ref)(new UE.HitResult())),
          this.N7o.K2_SetWorldTransform(
            this.a7o.ActorComponent.ActorTransform,
            !1,
            t,
            !0,
          ),
          this.N7o.CopyPoseFromSkeletalComponent(
            this.a7o.Target.GetComponent(3).Actor.Mesh,
          ),
          this.N7o.SetForcedLOD(MIN_LOD),
          !(this.N7o.CastShadow = !1)
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "PoseComponent初始化失败");
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败");
    return !1;
  }
  j7o(t) {
    var e = void 0;
    return (
      (e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
        this.a7o.Actor,
        UE.PoseableMeshComponent.StaticClass(),
        void 0,
        void 0,
        !1,
      )).SetSkeletalMesh(t.SkeletalMesh, !1),
      e
    );
  }
  F7o() {
    this.l9e ||
      (this.l9e = this.a7o.Actor.AddComponentByClass(
        UE.CharRenderingComponent_C.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      this.l9e
        ? (this.l9e.Init(0), this.l9e.AddComponentByCase(0, this.N7o))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "BulletLogicShowMesh中渲染组件添加失败");
  }
  V7o() {
    var t = this.Bullet.GetBulletInfo().Target;
    if (t) {
      var e = t.GetComponent(71);
      if (e) {
        (e = e.GetWeaponMesh()),
          (t = t.GetComponent(0).GetRoleConfig().WeaponScale);
        const s = Vector_1.Vector.Create(t[0], t[1], t[2]);
        let i = 0;
        const o = [1, 2, 3, 4, 5];
        e.CharacterWeapons.forEach((t) => {
          var e;
          t.WeaponHidden ||
            ((e = void 0),
            (e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
              this.a7o.Actor,
              UE.PoseableMeshComponent.StaticClass(),
              void 0,
              void 0,
              !1,
            )).SetSkeletalMesh(t.Mesh.SkeletalMesh, !1),
            e.CopyPoseFromSkeletalComponent(t.Mesh),
            e.SetForcedLOD(MIN_LOD),
            (e.CastShadow = !1),
            this.W7o(e, t.BattleSocket, s.ToUeVector()),
            this.l9e.AddComponentByCase(o[i + 1], e),
            this.O7o.push(e)),
            ++i;
        });
      }
    }
  }
  H7o() {
    const e = this.h7o.MaterialEffect.AssetPathName?.toString();
    "" !== e &&
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.PD_CharacterControllerData_C,
        (t) => {
          t
            ? this.l9e.AddMaterialControllerData(t)
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Battle",
                4,
                "无法找到BulletLogicShowMesh子弹材质效果",
                ["EffectPath", e],
              );
        },
      );
  }
  W7o(t, e, i) {
    var s = new UE.Transform();
    s.SetScale3D(i),
      t.K2_AttachToComponent(this.N7o, e, 0, 0, 0, !0),
      t.K2_SetRelativeTransform(s, !1, void 0, !0);
  }
}
exports.BulletLogicShowMesh = BulletLogicShowMesh;
//# sourceMappingURL=BulletLogicShowMesh.js.map
