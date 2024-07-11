"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueEffect = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../../Core/Utils/MathUtils"),
  SkeletalMeshEffectContext_1 = require("../../../../../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
  CharacterNameDefines_1 = require("../../../CharacterNameDefines"),
  GameplayCueMagnitude_1 = require("./GameplayCueMagnitude"),
  RATE = 50,
  VOLUME_MIN = 5,
  VOLUME_MAX = 60;
class GameplayCueEffect extends GameplayCueMagnitude_1.GameplayCueMagnitude {
  constructor() {
    super(...arguments),
      (this.EffectViewHandle = 0),
      (this.TargetMesh = void 0),
      (this.TargetSocket = void 0),
      (this.TargetWeaponComp = void 0),
      (this.TargetCharacterWeapon = void 0),
      (this.RelativeTransform = void 0),
      (this.SocketTransform = Transform_1.Transform.Create()),
      (this.TargetTransform = Transform_1.Transform.Create());
  }
  OnInit() {
    super.OnInit(),
      this.IsInstant &&
        0 !== this.CueConfig.Magni &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Battle",
          29,
          "瞬间型Buff特效不能应用特效幅度，因为瞬间型Buff特效依赖特效自身管理生命周期",
          ["BuffId", this.BuffId],
          ["CueId:", this.CueConfig.Id],
        ),
      2 === this.CueConfig.Comp
        ? ((this.TargetWeaponComp = this.yXo()),
          (this.TargetCharacterWeapon = this.IXo()),
          this.TargetCharacterWeapon?.Mesh instanceof
            UE.SkeletalMeshComponent &&
            (this.TargetMesh = this.TargetCharacterWeapon.Mesh))
        : (this.TargetMesh = this.TXo()),
      (this.TargetSocket = FNameUtil_1.FNameUtil.GetDynamicFName(
        this.CueConfig.Socket,
      )),
      this.TargetMesh?.DoesSocketExist(this.TargetSocket) ||
        (this.TargetSocket = CharacterNameDefines_1.CharacterNameDefines.ROOT);
    var t = Vector_1.Vector.Create(
        this.CueConfig.Location.X,
        this.CueConfig.Location.Y,
        this.CueConfig.Location.Z,
      ),
      e = Rotator_1.Rotator.Create(
        this.CueConfig.Rotation.X,
        this.CueConfig.Rotation.Y,
        this.CueConfig.Rotation.Z,
      ),
      s = Vector_1.Vector.Create(
        this.CueConfig.Scale.X,
        this.CueConfig.Scale.Y,
        this.CueConfig.Scale.Z,
      );
    this.RelativeTransform = Transform_1.Transform.Create(e.Quaternion(), t, s);
  }
  OnTick(t) {
    super.OnTick(t);
  }
  OnCreate() {
    var t = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(void 0),
      e =
        ((t.SkeletalMeshComp = this.TargetMesh),
        this.Entity.CheckGetComponent(157)
          ?.GetBuffByHandle(this.ActiveHandleId)
          ?.GetInstigator());
    (t.EntityId = e ? e.Id : void 0),
      (this.EffectViewHandle = EffectSystem_1.EffectSystem.SpawnEffect(
        this.ActorInternal,
        this.RelativeTransform.ToUeTransform(),
        this.CueConfig.Path,
        "[GameplayCueEffect.OnCreate]",
        t,
        0,
        (t) => {
          this.BeginCallback?.(),
            this.UseMagnitude() &&
              EffectSystem_1.EffectSystem.FreezeHandle(t, !0);
        },
      )),
      this.LXo() &&
        (this.CueComp.AddEffectToSet(this.EffectViewHandle),
        this.AttachEffect(),
        this.DXo(),
        super.OnCreate());
  }
  OnDestroy() {
    if (
      (super.OnDestroy(),
      EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle))
    )
      switch (
        (EffectSystem_1.EffectSystem.SetTimeScale(this.EffectViewHandle, 1),
        this.CueConfig.EndRule)
      ) {
        case 0:
          EffectSystem_1.EffectSystem.StopEffectById(
            this.EffectViewHandle,
            "[GameplayCueEffect.OnDestroy]",
            !0,
          );
          break;
        case 1:
          EffectSystem_1.EffectSystem.StopEffectById(
            this.EffectViewHandle,
            "[GameplayCueEffect.OnDestroy]",
            !1,
          );
      }
    2 === this.CueConfig.Comp &&
      this.TargetCharacterWeapon?.RemoveBuffEffect(this.EffectViewHandle);
  }
  OnSetMagnitude(t) {
    EffectSystem_1.EffectSystem.HandleSeekToTimeWithProcess(
      this.EffectViewHandle,
      t,
      !0,
    );
  }
  AttachEffect() {
    var t = EffectSystem_1.EffectSystem.GetEffectActor(this.EffectViewHandle);
    1 === this.CueConfig.Comp || 2 === this.CueConfig.Comp
      ? (this.RXo(t),
        t.K2_AttachToComponent(
          this.TargetMesh,
          this.TargetSocket,
          this.CueConfig.LocRule,
          this.CueConfig.RotaRule,
          this.CueConfig.SclRule,
          !1,
        ),
        2 === this.CueConfig.Comp &&
          this.TargetCharacterWeapon?.AddBuffEffect(this.EffectViewHandle))
      : (this.SocketTransform.FromUeTransform(
          this.TargetMesh.GetSocketTransform(this.TargetSocket),
        ),
        this.RelativeTransform.ComposeTransforms(
          this.SocketTransform,
          this.TargetTransform,
        ),
        t.K2_SetActorTransform(
          this.TargetTransform.ToUeTransform(),
          !1,
          void 0,
          !0,
        ));
  }
  TXo() {
    if (this.ActorInternal?.IsValid()) {
      if ("Mesh" === this.CueConfig.CompName) return this.ActorInternal.Mesh;
      var e = this.ActorInternal.K2_GetComponentsByClass(
        UE.MeshComponent.StaticClass(),
      );
      for (let t = 0; t < e.Num(); t++) {
        var s = e.Get(t);
        if (
          s instanceof UE.SkeletalMeshComponent &&
          s.GetName() === this.CueConfig.CompName
        )
          return s;
      }
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 29, "Cue信息错误！或者无法找到合适的组件", [
          "CueId:",
          this.CueConfig.Id,
        ]);
    }
  }
  yXo() {
    var t;
    return this.ActorInternal?.IsValid() &&
      2 === this.CueConfig.Comp &&
      (t = this.Entity?.GetComponent(69))?.Valid
      ? t
      : void 0;
  }
  IXo() {
    if (this.ActorInternal?.IsValid() && 2 === this.CueConfig.Comp) {
      var t = this.yXo();
      if (t) {
        t = t.GetWeaponMesh();
        if (t) {
          var e = parseInt(this.CueConfig.CompName.replace("WeaponCase", ""));
          if (!(e < 0 || e > t.CharacterWeapons.length))
            return t.CharacterWeapons[e];
        }
      }
    }
  }
  RXo(t) {
    var e,
      s = this.CueConfig.TargetScaleUp[0],
      i = this.CueConfig.TargetScaleUp[1];
    i <= s ||
      ((e = (0, puerts_1.$ref)(new UE.Vector())),
      UE.KismetSystemLibrary.GetComponentBounds(
        this.TargetMesh,
        (0, puerts_1.$ref)(new UE.Vector()),
        e,
        (0, puerts_1.$ref)(0),
      ),
      (e =
        (((((e = (0, puerts_1.$unref)(e)).X / RATE) * e.Y) / RATE) * e.Z) /
        RATE),
      (e =
        (((e = MathUtils_1.MathUtils.Clamp(e, VOLUME_MIN, VOLUME_MAX)) -
          VOLUME_MIN) /
          (VOLUME_MAX - VOLUME_MIN)) *
          (i - s) +
        s),
      t.SetActorScale3D(t.GetActorScale3D().op_Multiply(e)));
  }
  LXo() {
    var t;
    return (
      !!EffectSystem_1.EffectSystem.IsValid(this.EffectViewHandle) &&
      !(
        !(t = EffectSystem_1.EffectSystem.GetEffectActor(
          this.EffectViewHandle,
        )) || !t.IsValid()
      )
    );
  }
  DXo() {
    this.EndCallback &&
      EffectSystem_1.EffectSystem.AddFinishCallback(
        this.EffectViewHandle,
        (t) => {
          this.EndCallback?.();
        },
      );
  }
}
exports.GameplayCueEffect = GameplayCueEffect;
//# sourceMappingURL=GameplayCueEffect.js.map
