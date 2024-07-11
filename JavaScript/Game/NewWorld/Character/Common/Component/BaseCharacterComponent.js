"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    let r;
    const a = arguments.length;
    let s =
      a < 3 ? e : i === null ? (i = Object.getOwnPropertyDescriptor(e, o)) : i;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, o, i);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (r = t[n]) && (s = (a < 3 ? r(s) : a > 3 ? r(e, o, s) : r(e, o)) || s);
    return a > 3 && s && Object.defineProperty(e, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseCharacterComponent = void 0);
const UE = require("ue");
const ActorSystem_1 = require("../../../../../Core/Actor/ActorSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils");
const StringUtils_1 = require("../../../../../Core/Utils/StringUtils");
const TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const GlobalData_1 = require("../../../../GlobalData");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const RenderConfig_1 = require("../../../../Render/Config/RenderConfig");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const CombineMeshTool_1 = require("../../../Character/Common/Blueprint/Utils/CombineMeshTool");
const BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent");
const CustomMovementDefine_1 = require("./Move/CustomMovementDefine");
const PROFILE_KEY = "CharacterActorComponent_FixBornLocation";
const DITHER_RATE_PER_SECOND = 0.33;
const FIX_LOCATION_TOLERANCE = 2;
let BaseCharacterComponent = class BaseCharacterComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments),
      (this.SubEntityType = 0),
      (this.EntityType = Protocol_1.Aki.Protocol.HBs.Proto_Npc),
      (this.RadiusInternal = 0),
      (this.HalfHeightInternal = 0),
      (this.DefaultRadiusInternal = 0),
      (this.DefaultHalfHeightInternal = 0),
      (this.ModelResPath = ""),
      (this.ClassDefaultObject = void 0),
      (this.HolographicEffectActor = void 0),
      (this.SimpleMatControlComponentInternal = void 0),
      (this.IsInitSimpleMatController = !1),
      (this.Qxn = !1);
  }
  get SimpleMatControlComponent() {
    if (!this.IsInitSimpleMatController) {
      this.IsInitSimpleMatController = !0;
      const t = this.Actor.AddComponentByClass(
        UE.BP_NPCMaterialController_C.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
      );
      if (!t?.IsValid()) return;
      this.SimpleMatControlComponentInternal = t;
    }
    return this.SimpleMatControlComponentInternal;
  }
  get Actor() {
    return this.ActorInternal;
  }
  get SkeletalMesh() {
    return this.Actor.Mesh;
  }
  get ScaledRadius() {
    return this.RadiusInternal * this.ActorScaleProxy.X;
  }
  get Radius() {
    return this.RadiusInternal;
  }
  get ScaledHalfHeight() {
    return this.HalfHeightInternal * this.ActorScaleProxy.Z;
  }
  get HalfHeight() {
    return this.HalfHeightInternal;
  }
  tFr() {
    this.Actor.DitherEffectController?.EnterAppearEffect(
      DITHER_RATE_PER_SECOND,
      1,
      !0,
    );
  }
  ApplySimpleMaterialEffect(e) {
    e !== "" &&
      e !== "None" &&
      this.SimpleMatControlComponent?.IsValid() &&
      ResourceSystem_1.ResourceSystem.LoadAsync(
        e,
        UE.PD_HolographicEffect_C,
        (t) => {
          this.Actor?.IsValid() &&
            this.SimpleMatControlComponent?.IsValid() &&
            (t?.IsValid()
              ? ((this.SimpleMatControlComponent.DATA = t),
                this.SimpleMatControlComponent.StartEffect())
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "NPC",
                  51,
                  "[BaseCharacterComp.ApplySimpleMaterialEffect] 加载DA失败",
                  ["EffectPath", e],
                  ["PbDataId", this.CreatureData.GetPbDataId()],
                ));
        },
      );
  }
  RemoveSimpleMaterialEffect() {
    this.SimpleMatControlComponent?.IsValid() &&
      this.SimpleMatControlComponent.EndEffect();
  }
  iFr() {
    let t = this.CreatureData.GetPbEntityInitData();
    t &&
      (t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "EntityVisibleComponent",
      )) &&
      (t.UseFadeEffect &&
        this.Actor.DitherEffectController?.EnterAppearEffect(
          DITHER_RATE_PER_SECOND,
          1,
          !0,
        ),
      t.UseHolographicEffect) &&
      this.LoadAndSetHolographicEffect();
  }
  LoadAndSetHolographicEffect() {
    if (!this.HolographicEffectActor?.IsValid()) {
      const t =
        this.CreatureData.GetModelConfig()?.DA.AssetPathName?.toString();
      if (t?.length && t !== "None")
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "NPC",
            51,
            "[BaseCharacterComp.LoadAndSetHolographicEffect] 无法为拼装NPC实体添加投影效果",
            ["CombineDaPath", t],
            ["PbDataId", this.CreatureData.GetPbDataId()],
          );
      else {
        const r = RenderConfig_1.RenderConfig.HolographicPath;
        ResourceSystem_1.ResourceSystem.LoadAsync(
          r,
          UE.PD_CharacterControllerDataGroup_C,
          (t) => {
            let e, o, i;
            this.Actor?.IsValid() &&
              (t?.IsValid()
                ? (o = (e = this.Owner.K2_GetComponentsByClass(
                    UE.SkeletalMeshComponent.StaticClass(),
                  )).Num())
                  ? ((this.HolographicEffectActor =
                      ActorSystem_1.ActorSystem.Get(
                        UE.BP_MaterialControllerRenderActor_C.StaticClass(),
                        this.Actor.GetOwner().GetTransform(),
                      )),
                    (i =
                      this.HolographicEffectActor).CharRenderingComponent.Init(
                      7,
                    ),
                    i.CharRenderingComponent.AddComponentByCase(0, e.Get(0)),
                    i.CharRenderingComponent.AddMaterialControllerDataGroup(t))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "NPC",
                      51,
                      "[BaseCharacterComp.LoadAndSetHolographicEffect] 尝试添加投影效果时找不到实体MeshComp",
                      ["EffectPath", r],
                      ["PbDataId", this.CreatureData.GetPbDataId()],
                      ["SkeletalCompNum", o],
                    )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "NPC",
                    51,
                    "[BaseCharacterComp.LoadAndSetHolographicEffect] 无法找到投影材质效果DA",
                    ["EffectPath", r],
                    ["PbDataId", this.CreatureData.GetPbDataId()],
                  ));
          },
        );
      }
    }
  }
  SetNpcBornEffect() {
    this.SubEntityType === 2 ? this.tFr() : this.iFr();
  }
  SetNpcBornMaterial() {
    let t;
    this.Owner.IsA(UE.BP_BaseNPC_C.StaticClass()) &&
      (t = this.Owner)?.BornEffect &&
      (t = t.BornEffect.AssetPathName.toString()) !== "" &&
      t !== "None" &&
      this.ApplySimpleMaterialEffect(t);
  }
  SetCamp(t) {
    let e = this.Entity.GetComponent(0);
    (e?.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
      e?.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Monster &&
      e?.GetEntityType() !== Protocol_1.Aki.Protocol.HBs.Proto_Vision) ||
      (((e = e?.GetEntityCamp()) || e === 0) &&
        t instanceof TsBaseCharacter_1.default &&
        (t.Camp = e));
  }
  PendingToDestroy() {
    if (
      this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
      this.SubEntityType === 2
    )
      this.Actor.DitherEffectController?.EnterDisappearEffect(
        DITHER_RATE_PER_SECOND,
        1,
      );
    else {
      let t = this.Entity.GetComponent(0)?.GetPbEntityInitData();
      if (!t) return !1;
      t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "EntityVisibleComponent",
      );
      if (!t || !t.UseFadeEffect) return !1;
      this.EntityType === Protocol_1.Aki.Protocol.HBs.Proto_Npc &&
        this.CreatureData.GetVisible() &&
        this.Actor.DitherEffectController?.EnterDisappearEffect(
          DITHER_RATE_PER_SECOND,
          1,
        );
    }
    return !0;
  }
  FixActorLocation(
    t,
    e = !0,
    o = void 0,
    i = "unknown.FixActorLocation",
    r = !0,
    a = !1,
  ) {
    if (!this.Actor.CapsuleComponent?.IsValid())
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "[CharacterActorComponent.FixBornLocation] capsule为空。",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
            ["Context", i],
          ),
        [!1, void 0]
      );
    var o = o ?? this.ActorLocationProxy;
    const s = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation;
    var a =
      (a
        ? s.Set(o.X, o.Y, o.Z + this.ScaledRadius)
        : s.Set(o.X, o.Y, o.Z + this.ScaledHalfHeight),
      ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation);
    a.Set(o.X, o.Y, o.Z + t);
    let n = this.FixBornLocationInternal(o, s, a, !1, e, i);
    return (
      !n &&
        r &&
        ((s.Z = s.Z + this.ScaledHalfHeight - this.ScaledRadius),
        (n = this.FixBornLocationInternal(o, s, a, !0, e, i))),
      n
    );
  }
  FixBornLocationInternal(
    t,
    r,
    a,
    s,
    n = !0,
    h = "unknown.FixBornLocationInternal",
  ) {
    n &&
      Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Entity",
        3,
        "[CharacterActorComponent.FixBornLocation] 实体地面修正:前",
        ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
        ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
        ["K2_GetActorLocation", this.Actor.K2_GetActorLocation()],
        ["ActorLocationProxy", t],
        ["InitLocation", this.CreatureDataInternal.GetInitLocation()],
        ["射线开始位置", r],
        ["射线结束位置", a],
        ["Context", h],
      );
    let e = !1;
    switch (this.Actor.CharacterMovement.MovementMode) {
      case 1:
      case 2:
      case 0:
      case 3:
        break;
      case 6:
        this.Actor.CharacterMovement.CustomMovementMode !==
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SLIDE &&
          this.Actor.CharacterMovement.CustomMovementMode !==
            CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_SKI &&
          (e = !0);
        break;
      default:
        e = !0;
    }
    if (e)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[CharacterActorComponent.FixBornLocation] 实体地面修正:无需修正",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
            ["MovementMode", this.Actor.CharacterMovement.MovementMode],
            ["Context", h],
          ),
        [!0, t]
      );
    const o = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    (o.WorldContextObject = this.Actor),
      (o.Radius = this.ScaledRadius),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, r),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, a),
      o.ActorsToIgnore.Empty();
    for (const i of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
      o.ActorsToIgnore.Add(i);
    var t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
      this.Actor.CapsuleComponent,
      o,
      PROFILE_KEY,
      PROFILE_KEY,
    );
    const c = o.HitResult;
    if (
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[CharacterActorComponent.FixBornLocation] 实体地面修正:检测地面结果",
          ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
          ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
          ["isHit", t],
          ["hitResult.bBlockingHit", c.bBlockingHit],
          ["allowStartPenetrating", s],
          ["hitResult.bStartPenetrating", c.bStartPenetrating],
          ["Context", h],
        ),
      t && c.bBlockingHit)
    ) {
      if (!s && c.bStartPenetrating) return [!1, void 0];
      const _ = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
      let e = "";
      const C = c.Actors.Num();
      let o = -1;
      let i = "";
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(c, 0, _);
      for (let t = 0; t < C; ++t) {
        const l = c.Actors.Get(t);
        if (
          l?.IsValid() &&
          ((e += l.GetName() + ", "), !l.IsA(UE.Character.StaticClass()))
        ) {
          (o = t),
            (i = l.GetName()),
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(c, t, _);
          break;
        }
      }
      return (
        (_.Z += this.ScaledHalfHeight - this.ScaledRadius),
        (_.Z += FIX_LOCATION_TOLERANCE),
        n &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
            ["Actors", e],
            ["HitLocationIndex", o],
            ["HitLocationName", i],
            ["经过修正的位置", _],
            ["Context", h],
          ),
        this.Qxn ||
          ((this.Qxn = !0),
          (r = this.Entity.GetComponent(160)) &&
            ((a = r.GetMeshTransform().GetLocation()),
            MathUtils_1.MathUtils.CommonTempVector.Set(
              0,
              0,
              -FIX_LOCATION_TOLERANCE,
            ),
            r.AddModelLocation(MathUtils_1.MathUtils.CommonTempVector),
            Log_1.Log.CheckInfo()) &&
            Log_1.Log.Info(
              "Entity",
              51,
              "[CharacterActorComponent.FixBornLocation] 实体地面修正:模型位置修正",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
              ["OrigMeshLocation", a],
              ["FixMeshLocation", r.GetMeshTransform().GetLocation()],
              ["Context", h],
            )),
        ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(),
        [!0, _]
      );
    }
    return (
      ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(),
      [!1, void 0]
    );
  }
  InitActorNew(t) {
    let e;
    const o = this.CreatureDataInternal;
    let i = o.GetTransform();
    let r = void 0;
    const a =
      (this.CreatureDataInternal.SetModelConfig(t),
      this.oFr(),
      this.CreatureDataInternal.GetModelConfig());
    if (a) {
      if ((r = ActorUtils_1.ActorUtils.LoadActorByModelConfig(a, i))?.IsValid())
        return (
          (i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            a.蓝图.ToAssetPathName(),
            UE.Class,
          )),
          (this.ClassDefaultObject = UE.KuroStaticLibrary.GetDefaultObject(i)),
          ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(a.DA)
            ? ((i = a.DA.AssetPathName?.toString())?.length &&
                i !== "None" &&
                (i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  a.DA.AssetPathName?.toString(),
                  UE.PD_NpcSetupData_C,
                ))?.IsValid() &&
                r instanceof TsBaseCharacter_1.default &&
                ((e = r.Mesh.GetRelativeTransform()),
                CombineMeshTool_1.CombineMeshTool.LoadDaConfig(r, e, r.Mesh, i),
                r.RenderType === 3) &&
                r.CharRenderingComponent.UpdateNpcDitherComponent(),
              (e = a.动画蓝图.Get()) &&
                r instanceof TsBaseCharacter_1.default &&
                r.Mesh.SetAnimClass(e))
            : r instanceof TsBaseCharacter_1.default &&
              ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(
                r.Mesh,
                a.网格体,
                a.动画蓝图,
              ),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            (i = this.CreatureDataInternal.GetPbDataId()) &&
            r.Tags.Add(new UE.FName("PbDataId:" + i)),
          r
        );
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          7,
          "[CharacterActorComponent.OnInit] 缺少ModelConfig配置",
          ["CreatureDataId", o.GetCreatureDataId()],
          ["ModelId", t],
        );
  }
  InitSizeInternal() {
    (this.RadiusInternal = this.Actor.CapsuleComponent.CapsuleRadius),
      (this.HalfHeightInternal = this.Actor.CapsuleComponent.CapsuleHalfHeight),
      (this.DefaultRadiusInternal = this.RadiusInternal),
      (this.DefaultHalfHeightInternal = this.HalfHeightInternal);
  }
  oFr() {
    if (
      this.CreatureDataInternal.GetEntityType() ===
      Protocol_1.Aki.Protocol.HBs.Proto_Npc
    ) {
      let e = this.CreatureDataInternal.GetModelConfig();
      if (e) {
        e = UE.KismetSystemLibrary.GetPathName(e.蓝图.Get());
        if (e) {
          let t = e.substr(0, e.lastIndexOf(StringUtils_1.SLASH_STRING));
          t = t.substr(0, t.lastIndexOf(StringUtils_1.SLASH_STRING));
          e = new Array();
          e.push(t),
            e.push("/Montage"),
            (this.ModelResPath = e.join(StringUtils_1.EMPTY_STRING));
        }
      }
    }
  }
  OnClear() {
    return (
      !!super.OnClear() &&
      (this.SimpleMatControlComponentInternal?.IsValid() &&
        this.SimpleMatControlComponent.K2_DestroyComponent(this.Actor),
      this.HolographicEffectActor?.IsValid() &&
        ActorSystem_1.ActorSystem.Put(this.HolographicEffectActor),
      !0)
    );
  }
};
(BaseCharacterComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(2)],
  BaseCharacterComponent,
)),
  (exports.BaseCharacterComponent = BaseCharacterComponent);
// # sourceMappingURL=BaseCharacterComponent.js.map
