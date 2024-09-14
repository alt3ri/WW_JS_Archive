"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    var i,
      a = arguments.length,
      n =
        a < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, o, r);
    else
      for (var s = t.length - 1; 0 <= s; s--)
        (i = t[s]) && (n = (a < 3 ? i(n) : 3 < a ? i(e, o, n) : i(e, o)) || n);
    return 3 < a && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseCharacterComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ObjectUtils_1 = require("../../../../../Core/Utils/ObjectUtils"),
  StringUtils_1 = require("../../../../../Core/Utils/StringUtils"),
  TraceElementCommon_1 = require("../../../../../Core/Utils/TraceElementCommon"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  CombineMeshTool_1 = require("../../../Character/Common/Blueprint/Utils/CombineMeshTool"),
  BaseActorComponent_1 = require("../../../Common/Component/BaseActorComponent"),
  CustomMovementDefine_1 = require("./Move/CustomMovementDefine"),
  PROFILE_KEY = "CharacterActorComponent_FixBornLocation",
  FIX_LOCATION_TOLERANCE = 2;
let BaseCharacterComponent = class BaseCharacterComponent extends BaseActorComponent_1.BaseActorComponent {
  constructor() {
    super(...arguments),
      (this.SubEntityType = 0),
      (this.EntityType = Protocol_1.Aki.Protocol.kks.Proto_Npc),
      (this.RadiusInternal = 0),
      (this.HalfHeightInternal = 0),
      (this.DefaultRadiusInternal = 0),
      (this.DefaultHalfHeightInternal = 0),
      (this.ModelResPath = ""),
      (this.ClassDefaultObject = void 0),
      (this.wBn = !1);
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
  SetCamp(t) {
    var e = this.Entity.GetComponent(0);
    (e?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Npc &&
      e?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Monster &&
      e?.GetEntityType() !== Protocol_1.Aki.Protocol.kks.Proto_Vision) ||
      (((e = e?.GetEntityCamp()) || 0 === e) &&
        t instanceof TsBaseCharacter_1.default &&
        (t.Camp = e));
  }
  FixActorLocation(
    t,
    e = !0,
    o = void 0,
    r = "unknown.FixActorLocation",
    i = !0,
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
            ["Context", r],
          ),
        [!1, void 0]
      );
    var o = o ?? this.ActorLocationProxy,
      n = ModelManager_1.ModelManager.TraceElementModel.CommonStartLocation,
      s = ModelManager_1.ModelManager.TraceElementModel.CommonEndLocation;
    a
      ? (this.ActorUpProxy.Multiply(this.ScaledRadius, n),
        this.ActorUpProxy.Multiply(-this.ScaledRadius + t, s))
      : (this.ActorUpProxy.Multiply(
          this.ScaledHalfHeight - this.ScaledRadius,
          n,
        ),
        this.ActorUpProxy.Multiply(-this.ScaledHalfHeight + t, s)),
      n.AdditionEqual(o),
      s.AdditionEqual(o);
    let h = this.FixBornLocationInternal(o, n, s, !1, e, r);
    return (
      !h &&
        i &&
        (this.ActorUpProxy.Multiply(
          this.ScaledHalfHeight - this.ScaledRadius,
          MathUtils_1.MathUtils.CommonTempVector,
        ),
        n.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector),
        (h = this.FixBornLocationInternal(o, n, s, !0, e, r))),
      h
    );
  }
  FixBornLocationInternal(
    t,
    i,
    a,
    n,
    s = !0,
    h = "unknown.FixBornLocationInternal",
  ) {
    s = ModelManager_1.ModelManager.CreatureModel.EnableEntityLog && s;
    s &&
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
        ["射线开始位置", i],
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
          this.Actor.CharacterMovement.CustomMovementMode !==
            CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_ROLL &&
          (e = !0);
        break;
      default:
        e = !0;
    }
    if (s && e)
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
    var o = ModelManager_1.ModelManager.TraceElementModel.GetActorTrace();
    (o.WorldContextObject = this.Actor),
      (o.Radius = this.ScaledRadius),
      TraceElementCommon_1.TraceElementCommon.SetStartLocation(o, i),
      TraceElementCommon_1.TraceElementCommon.SetEndLocation(o, a),
      o.ActorsToIgnore.Empty();
    for (const r of ModelManager_1.ModelManager.WorldModel.ActorsToIgnoreSet)
      o.ActorsToIgnore.Add(r);
    var t = TraceElementCommon_1.TraceElementCommon.ShapeTrace(
        this.Actor.CapsuleComponent,
        o,
        PROFILE_KEY,
        PROFILE_KEY,
      ),
      c = o.HitResult;
    if (
      (s &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "[CharacterActorComponent.FixBornLocation] 实体地面修正:检测地面结果",
          ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
          ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
          ["isHit", t],
          ["hitResult.bBlockingHit", c.bBlockingHit],
          ["allowStartPenetrating", n],
          ["hitResult.bStartPenetrating", c.bStartPenetrating],
          ["Context", h],
        ),
      t && c.bBlockingHit)
    ) {
      if (!n && c.bStartPenetrating) return [!1, void 0];
      var l = ModelManager_1.ModelManager.TraceElementModel.CommonHitLocation;
      let e = "";
      var _ = c.Actors.Num();
      let o = -1,
        r = "";
      TraceElementCommon_1.TraceElementCommon.GetHitLocation(c, 0, l);
      for (let t = 0; t < _; ++t) {
        var C = c.Actors.Get(t);
        if (
          C?.IsValid() &&
          ((e += C.GetName() + ", "), !C.IsA(UE.Character.StaticClass()))
        ) {
          (o = t),
            (r = C.GetName()),
            TraceElementCommon_1.TraceElementCommon.GetHitLocation(c, t, l);
          break;
        }
      }
      return (
        this.ActorUpProxy.Multiply(
          this.ScaledHalfHeight - this.ScaledRadius + FIX_LOCATION_TOLERANCE,
          MathUtils_1.MathUtils.CommonTempVector,
        ),
        l.AdditionEqual(MathUtils_1.MathUtils.CommonTempVector),
        s &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Entity",
            3,
            "[CharacterActorComponent.FixBornLocation] 实体地面修正:射线碰到地面",
            ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
            ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
            ["Actors", e],
            ["HitLocationIndex", o],
            ["HitLocationName", r],
            ["经过修正的位置", l],
            ["Context", h],
          ),
        this.wBn ||
          ((this.wBn = !0),
          (i = this.Entity.GetComponent(163)) &&
            ((a = i.GetMeshTransform().GetLocation()),
            MathUtils_1.MathUtils.CommonTempVector.Set(
              0,
              0,
              -FIX_LOCATION_TOLERANCE,
            ),
            i.AddModelLocation(MathUtils_1.MathUtils.CommonTempVector),
            s) &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Entity",
              51,
              "[CharacterActorComponent.FixBornLocation] 实体地面修正:模型位置修正",
              ["CreatureDataId", this.CreatureDataInternal.GetCreatureDataId()],
              ["PbDataId", this.CreatureDataInternal.GetPbDataId()],
              ["OrigMeshLocation", a],
              ["FixMeshLocation", i.GetMeshTransform().GetLocation()],
              ["Context", h],
            )),
        ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(),
        [!0, l]
      );
    }
    return (
      ModelManager_1.ModelManager.TraceElementModel.ClearActorTrace(),
      [!1, void 0]
    );
  }
  InitActorNew(t) {
    var e,
      o = this.CreatureDataInternal,
      r = o.GetTransform(),
      i = void 0,
      a =
        (this.CreatureDataInternal.SetModelConfig(t),
        this.w2r(),
        this.CreatureDataInternal.GetModelConfig());
    if (a) {
      if ((i = ActorUtils_1.ActorUtils.LoadActorByModelConfig(a, r))?.IsValid())
        return (
          (r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            a.蓝图.ToAssetPathName(),
            UE.Class,
          )),
          (this.ClassDefaultObject = UE.KuroStaticLibrary.GetDefaultObject(r)),
          ObjectUtils_1.ObjectUtils.SoftObjectPathIsValid(a.DA)
            ? ((r = a.DA.AssetPathName?.toString())?.length &&
                "None" !== r &&
                (r = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  a.DA.AssetPathName?.toString(),
                  UE.PD_NpcSetupData_C,
                ))?.IsValid() &&
                i instanceof TsBaseCharacter_1.default &&
                ((e = i.Mesh.GetRelativeTransform()),
                CombineMeshTool_1.CombineMeshTool.LoadDaConfig(i, e, i.Mesh, r),
                3 === i.RenderType) &&
                i.CharRenderingComponent.UpdateNpcDitherComponent(),
              (e = a.动画蓝图.Get()) &&
                i instanceof TsBaseCharacter_1.default &&
                i.Mesh.SetAnimClass(e))
            : i instanceof TsBaseCharacter_1.default &&
              ActorUtils_1.ActorUtils.LoadAndChangeMeshAnim(
                i.Mesh,
                a.网格体,
                a.动画蓝图,
              ),
          GlobalData_1.GlobalData.IsPlayInEditor &&
            (r = this.CreatureDataInternal.GetPbDataId()) &&
            i.Tags.Add(new UE.FName("PbDataId:" + r)),
          i
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
  w2r() {
    if (
      this.CreatureDataInternal.GetEntityType() ===
      Protocol_1.Aki.Protocol.kks.Proto_Npc
    ) {
      var e = this.CreatureDataInternal.GetModelConfig();
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
    return super.OnClear();
  }
};
(BaseCharacterComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(2)],
  BaseCharacterComponent,
)),
  (exports.BaseCharacterComponent = BaseCharacterComponent);
//# sourceMappingURL=BaseCharacterComponent.js.map
