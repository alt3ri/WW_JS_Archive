"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, r) {
    var i,
      a = arguments.length,
      s =
        a < 3
          ? t
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(t, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, o, r);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (i = e[n]) && (s = (a < 3 ? i(s) : 3 < a ? i(t, o, s) : i(t, o)) || s);
    return 3 < a && s && Object.defineProperty(t, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterMorphComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../../Core/Utils/DataTableUtil"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  ModelUtil_1 = require("../../../../../../Core/Utils/ModelUtil"),
  CameraController_1 = require("../../../../../Camera/CameraController"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  CharacterNameDefines_1 = require("../../CharacterNameDefines"),
  CAPSULE_COMPONENT = "CapsuleComponent",
  CAPSULE_HALF_HEIGHT = "CapsuleHalfHeight",
  CAPSULE_RADIUS = "CapsuleRadius",
  MESH_COMPONENT = "Mesh",
  MESH_LOCATION = "Location";
let CharacterMorphComponent = class CharacterMorphComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.m6_ = 0),
      (this.CW_ = void 0),
      (this.f6_ = void 0),
      (this.g6_ = void 0),
      (this.qQ_ = !1),
      (this.EIe = void 0),
      (this.C6_ = void 0),
      (this.Hte = void 0),
      (this.Gce = void 0);
  }
  OnInitData() {
    return !0;
  }
  OnStart() {
    return (
      (this.EIe = this.Entity.GetComponent(0)),
      (this.C6_ = this.Entity.GetComponent(216)),
      (this.Hte = this.Entity.GetComponent(3)),
      (this.Gce = this.Entity.GetComponent(176)),
      this.p6_(),
      !0
    );
  }
  OnEnd() {
    var e;
    if (
      this.qQ_ &&
      (0 !== this.m6_ &&
        (e = this.GetMorphCameraConfig()) &&
        CameraController_1.CameraController.UnloadCharacterCameraConfig(e),
      this.f6_)
    ) {
      for (const t of this.f6_.values())
        (t.SkeletalMesh = void 0), (t.AnimClass = void 0);
      this.f6_.clear(), (this.f6_ = void 0);
    }
    return !0;
  }
  p6_() {
    if ((this.dZ_(), this.g6_)) {
      var t,
        o,
        r = this.C6_?.GetFightInfo()?.MorphModelInfoMap,
        i = new Map();
      for ([t, o] of this.g6_.entries())
        if (0 === o)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Battle",
              67,
              "[CharacterMorphComponent]初始化获取ModelId有误",
              ["ModelId", o],
              ["MorphType", t],
            ),
            i.set(t, { ModelId: 0 });
        else {
          var a = ModelUtil_1.ModelUtil.GetModelConfig(o),
            s = r?.Get(t);
          let e = void 0;
          0 === t
            ? (e = {
                ModelId: o,
                SkeletalMesh: ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  a.网格体.ToAssetPathName(),
                  UE.SkeletalMesh,
                ),
                AnimClass: ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  a.动画蓝图.ToAssetPathName(),
                  UE.Class,
                ),
                ComponentFloatParams: new Map(),
                ComponentVectorParams: new Map(),
              })
            : ((e = {
                ModelId: o,
                SkeletalMesh: ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  a.网格体.ToAssetPathName(),
                  UE.SkeletalMesh,
                ),
                AnimClass: ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                  a.动画蓝图.ToAssetPathName(),
                  UE.Class,
                ),
                DtBaseMovementSetting: s?.DtBaseMovementSetting,
                DtCameraConfig: s?.DtCameraConfig,
                InputComponentClass: s?.InputComponentClass,
                ComponentFloatParams: new Map(),
                ComponentVectorParams: new Map(),
              }),
              this.mZ_(e, s?.ComponentFloatParams),
              this.fZ_(e, s?.ComponentVectorParams)),
            e.SkeletalMesh ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Battle",
                  67,
                  "[CharacterMorphComponent]初始化资源有误",
                  ["ModelId", o],
                  ["MorphType", t],
                  ["SkeletalMeshPath", a.网格体.ToAssetPathName()],
                )),
            e.AnimClass ||
              (Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Battle",
                  67,
                  "[CharacterMorphComponent]初始化资源有误",
                  ["ModelId", o],
                  ["MorphType", t],
                  ["AnimClassPath", a.动画蓝图.ToAssetPathName()],
                )),
            i.set(t, e);
        }
      (this.f6_ = i), (this.qQ_ = 0 !== i.size);
    }
  }
  dZ_() {
    if (!this.g6_) {
      var t = this.C6_?.GetFightInfo()?.MorphModelInfoMap;
      if (t && 0 < t.Num()) {
        var e,
          o = new Map();
        for (let e = 0; e < t.Num(); e++) {
          var r,
            i = t.GetKey(e);
          0 === i
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "[CharacterMorphComponent]不需要配置默认形态",
              )
            : (r = t.Get(i)) &&
              (0 !== r.ModelId
                ? o.set(i, r.ModelId)
                : Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    67,
                    "[CharacterMorphComponent]多形态配置的模型Id为0",
                    ["MorphType", i],
                  ));
        }
        0 < o.size &&
          0 !== (e = this.EIe?.GetModelId() ?? 0) &&
          (o.set(0, e), (this.g6_ = o));
      }
    }
  }
  mZ_(e, t) {
    if (t) {
      var o = e.ComponentFloatParams;
      for (let e = 0; e < t.Num(); e++) {
        var r = t.GetKey(e),
          i = t.Get(r),
          r = r.split(".");
        if (!(void 0 === i || r.length < 2)) {
          var a = r[0],
            r = r[1];
          let e = o.get(a);
          e || ((e = new Map()), o.set(a, e)), e.set(r, i);
        }
      }
    }
  }
  fZ_(e, t) {
    if (t) {
      var o = e.ComponentVectorParams;
      for (let e = 0; e < t.Num(); e++) {
        var r = t.GetKey(e),
          i = t.Get(r),
          r = r.split(".");
        if (!(void 0 === i || r.length < 2)) {
          var a = r[0],
            r = r[1];
          let e = o.get(a);
          e || ((e = new Map()), o.set(a, e));
          a = Vector_1.Vector.Create();
          a.FromUeVector(i), e.set(r, a);
        }
      }
    }
  }
  GetMorphType() {
    return this.m6_;
  }
  GetMorphData(e = void 0) {
    return void 0 !== e ? this.f6_?.get(e) : this.CW_;
  }
  GetMorphCameraConfig(e = void 0) {
    (e = e ?? this.m6_),
      (e = this.GetMorphData(e)?.DtCameraConfig?.ToAssetPathName() ?? "");
    let t = void 0;
    if (
      !e ||
      "None" === e ||
      (t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
        e,
        UE.DataTable,
      ))?.IsValid()
    )
      return t;
  }
  v6_(e) {
    return e < 2;
  }
  IsEnableMorph() {
    return this.qQ_;
  }
  HasComponentVectorParam(e, t, o) {
    e = this.GetMorphData(e);
    return !!e && !!e.ComponentVectorParams?.get(t)?.get(o);
  }
  SetComponentVectorParam(t, o, r, i) {
    t = this.GetMorphData(t);
    if (t) {
      t = t.ComponentVectorParams;
      let e = t?.get(o);
      void 0 === e && ((e = new Map()), t?.set(o, e)), e.set(r, i);
    }
  }
  SetMorphType(e) {
    var t;
    e !== this.m6_ &&
      (this.v6_(e)
        ? (t = this.f6_?.get(e))
          ? t.SkeletalMesh && t.AnimClass
            ? (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Battle",
                  67,
                  "[CharacterMorphComponent]设置形态成功, 开始切换",
                  ["MorphType", e],
                  ["SkeletalMesh", t.SkeletalMesh],
                  ["AnimClass", t.AnimClass],
                ),
              (this.m6_ = e),
              (this.CW_ = t),
              this.Hte?.ChangeMeshAnim(t.SkeletalMesh, t.AnimClass),
              this.EIe?.SetModelConfig(t.ModelId),
              this.Hte?.UpdateModelResPath(),
              this.pW_(),
              this.gZ_(),
              this.vW_(),
              this.OQ_(),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnCharacterMorphTypeChanged,
                this.Entity,
                e,
              ),
              EventSystem_1.EventSystem.EmitWithTarget(
                this.Entity,
                EventDefine_1.EEventName.OnCharacterMorphTypeChanged,
                this.Entity,
                e,
              ))
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "[CharacterMorphComponent]设置形态失败, 对应形态数据有误",
                ["MorphType", e],
                ["SkeletalMesh", t.SkeletalMesh],
                ["AnimClass", t.AnimClass],
              )
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              67,
              "[CharacterMorphComponent]设置形态失败, 无对应形态数据",
              ["MorphType", e],
            )
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            67,
            "[CharacterMorphComponent]设置了无效的形态类型",
            ["MorphType", e],
          ));
  }
  pW_() {
    if (this.Gce) {
      let e = void 0;
      var t;
      (e =
        0 === this.m6_
          ? this.Hte?.Actor.DtBaseMovementSetting
          : this.CW_?.DtBaseMovementSetting?.Get()) &&
        (t = DataTableUtil_1.DataTableUtil.GetDataTableRow(
          e,
          CharacterNameDefines_1.CharacterNameDefines.NORMAL.toString(),
        )) &&
        this.Gce.SetMovementData(t, !0);
    }
  }
  gZ_() {
    var e,
      t,
      o = this.Hte?.Actor.Mesh;
    o &&
      ((e =
        this.CW_?.ComponentVectorParams?.get(MESH_COMPONENT)?.get(
          MESH_LOCATION,
        )),
      0 === this.m6_ ||
        this.HasComponentVectorParam(0, MESH_COMPONENT, MESH_LOCATION) ||
        ((t = Vector_1.Vector.Create()).FromUeVector(o.RelativeLocation),
        this.SetComponentVectorParam(0, MESH_COMPONENT, MESH_LOCATION, t)),
      e) &&
      o.K2_SetRelativeLocation(e.ToUeVectorOld(), !1, void 0, !1);
  }
  vW_() {
    var e, t;
    0 === this.m6_
      ? this.Hte?.ResetCapsuleRadiusAndHeight(!0)
      : ((e = (t = this.CW_?.ComponentFloatParams?.get(CAPSULE_COMPONENT))?.get(
          CAPSULE_HALF_HEIGHT,
        )),
        (t = t?.get(CAPSULE_RADIUS)),
        (void 0 === e && void 0 === t) ||
          ((e = e ?? this.Hte?.HalfHeight ?? 0),
          (t = t ?? this.Hte?.Radius ?? 0),
          0 < e && 0 < t
            ? this.Hte?.SetRadiusAndHalfHeight(t, e, !0, !0)
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "[CharacterMorphComponent]更新胶囊体失败, 参数非法",
                ["Radius", t],
                ["HalfHeight", e],
              )));
  }
  OQ_() {
    var e,
      t = this.Hte?.Actor.DtCameraConfig;
    t &&
      (e = this.GetMorphCameraConfig()) &&
      (0 === this.m6_
        ? (CameraController_1.CameraController.UnloadCharacterCameraConfig(e),
          CameraController_1.CameraController.LoadCharacterCameraConfig(t))
        : (CameraController_1.CameraController.UnloadCharacterCameraConfig(t),
          CameraController_1.CameraController.LoadCharacterCameraConfig(e)));
  }
};
(CharacterMorphComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(276)],
  CharacterMorphComponent,
)),
  (exports.CharacterMorphComponent = CharacterMorphComponent);
//# sourceMappingURL=CharacterMorphComponent.js.map
