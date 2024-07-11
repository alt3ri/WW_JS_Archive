"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletLogicShowMesh = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const EffectModelHelper_1 = require("../../../Render/Effect/Data/EffectModelHelper");
const BulletLogicController_1 = require("./BulletLogicController");
const MIN_LOD = 99;
class BulletLogicShowMesh extends BulletLogicController_1.BulletLogicController {
  constructor(t, e) {
    super(t, e),
      (this.$6e = void 0),
      (this.F9o = void 0),
      (this._9o = void 0),
      (this.V9o = new Array()),
      (this.u9o = t);
  }
  BulletLogicAction(t = 0) {
    (this._9o = this.Bullet.GetBulletInfo()),
      this._9o
        ? this._9o.Target
          ? (this.H9o(), this.j9o(), this.W9o(), this.K9o())
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败")
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "无法获取BattleInfo");
  }
  OnBulletDestroy() {
    const e = this.Bullet.GetBulletInfo();
    this.F9o && e.Actor.K2_DestroyComponent(this.F9o),
      this.$6e && (e.Actor.K2_DestroyComponent(this.$6e), (this.$6e = void 0)),
      this.V9o.forEach((t) => {
        t && e.Actor.K2_DestroyComponent(t);
      }),
      (this.V9o.length = 0);
  }
  H9o() {
    if (this._9o.Target) {
      let t = this._9o.Target.GetComponent(3).Actor.Mesh;
      if (((this.F9o = this.Q9o(t)), this.F9o))
        return (
          (t = (0, puerts_1.$ref)(new UE.HitResult())),
          this.F9o.K2_SetWorldTransform(
            this._9o.ActorComponent.ActorTransform,
            !1,
            t,
            !0,
          ),
          this.F9o.CopyPoseFromSkeletalComponent(
            this._9o.Target.GetComponent(3).Actor.Mesh,
          ),
          this.F9o.SetForcedLOD(MIN_LOD),
          !(this.F9o.CastShadow = !1)
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "PoseComponent初始化失败");
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 4, "子弹没有目标，生成残影失败");
    return !1;
  }
  Q9o(t) {
    let e = void 0;
    return (
      (e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
        this._9o.Actor,
        UE.PoseableMeshComponent.StaticClass(),
        void 0,
        void 0,
        !1,
      )).SetSkeletalMesh(t.SkeletalMesh, !1),
      e
    );
  }
  j9o() {
    this.$6e ||
      (this.$6e = this._9o.Actor.AddComponentByClass(
        UE.CharRenderingComponent_C.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      )),
      this.$6e
        ? (this.$6e.Init(0), this.$6e.AddComponentByCase(0, this.F9o))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Battle", 4, "BulletLogicShowMesh中渲染组件添加失败");
  }
  W9o() {
    let t = this.Bullet.GetBulletInfo().Target;
    if (t) {
      let e = t.GetComponent(69);
      if (e) {
        (e = e.GetWeaponMesh()),
          (t = t.GetComponent(0).GetRoleConfig().WeaponScale);
        const s = Vector_1.Vector.Create(t[0], t[1], t[2]);
        let i = 0;
        const o = [1, 2, 3, 4, 5];
        e.CharacterWeapons.forEach((t) => {
          let e;
          t.WeaponHidden ||
            ((e = void 0),
            (e = EffectModelHelper_1.EffectModelHelper.AddSceneComponent(
              this._9o.Actor,
              UE.PoseableMeshComponent.StaticClass(),
              void 0,
              void 0,
              !1,
            )).SetSkeletalMesh(t.Mesh.SkeletalMesh, !1),
            e.CopyPoseFromSkeletalComponent(t.Mesh),
            e.SetForcedLOD(MIN_LOD),
            (e.CastShadow = !1),
            this.X9o(e, t.BattleSocket, s.ToUeVector()),
            this.$6e.AddComponentByCase(o[i + 1], e),
            this.V9o.push(e)),
            ++i;
        });
      }
    }
  }
  K9o() {
    const e = this.u9o.MaterialEffect.AssetPathName?.toString();
    e !== "" &&
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.PD_CharacterControllerData_C,
        (t) => {
          t
            ? this.$6e.AddMaterialControllerData(t)
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
  X9o(t, e, i) {
    const s = new UE.Transform();
    s.SetScale3D(i),
      t.K2_AttachToComponent(this.F9o, e, 0, 0, 0, !0),
      t.K2_SetRelativeTransform(s, !1, void 0, !0);
  }
}
exports.BulletLogicShowMesh = BulletLogicShowMesh;
// # sourceMappingURL=BulletLogicShowMesh.js.map
