"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, s, i) {
    var h,
      r = arguments.length,
      o =
        r < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, s))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, e, s, i);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (h = t[n]) && (o = (r < 3 ? h(o) : 3 < r ? h(e, s, o) : h(e, s)) || o);
    return 3 < r && o && Object.defineProperty(e, s, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubMeshComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
  Transform_1 = require("../../../../Core/Utils/Math/Transform"),
  SkeletalMeshEffectContext_1 = require("../../../Effect/EffectContext/SkeletalMeshEffectContext"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  standardMeshNames = new Set([
    "Mesh",
    "Hulu",
    "OtherCase0",
    "WeaponCase0",
    "WeaponCase1",
  ]);
class SubMeshItem {
  constructor(t, e) {
    (this.Name = t),
      (this.Mesh = e),
      (this.VisibleInternal = !1),
      (this.hva = void 0),
      (this.lva = () => {
        this.Mesh.SetVisibility(!1, !1), (this.hva = void 0);
      }),
      (this.CurrentPdHandle = 0),
      (this.CurrentEffectHandle = 0),
      (this.ywc = void 0),
      (this.Swc = FNameUtil_1.FNameUtil.NONE),
      (this.Mwc = Transform_1.Transform.Create()),
      (this.VisibleInternal = e.bVisible),
      (this.ywc = e.GetAttachParent()),
      (this.Swc = e.GetAttachSocketName()),
      this.Mwc.FromUeTransform(e.GetRelativeTransform());
  }
  get Visible() {
    return this.VisibleInternal;
  }
  SetVisible(t, e = 0) {
    this.VisibleInternal !== t &&
      ((this.VisibleInternal = t),
      this.hva &&
        (TimerSystem_1.TimerSystem.Remove(this.hva), (this.hva = void 0)),
      !this.VisibleInternal && 0 < e
        ? (this.hva = TimerSystem_1.TimerSystem.Delay(this.lva, e))
        : this.Mesh.SetVisibility(t, !1));
  }
  AttachToNewSocket(t, e) {
    this.Mesh.K2_AttachToComponent(this.ywc, t, 0, 0, 0, !0),
      this.Mesh.K2_SetRelativeTransform(e, !1, void 0, !0);
  }
  ResetAttach() {
    this.Mesh.K2_AttachToComponent(this.ywc, this.Swc, 0, 0, 0, !0),
      this.Mesh.K2_SetRelativeTransform(
        this.Mwc.ToUeTransformOld(),
        !1,
        void 0,
        !0,
      );
  }
}
class SubMeshOrder {
  constructor(t, e, s, i) {
    (this.Visible = t),
      (this.CharControllerData = e),
      (this.EffectDataAssetRef = s),
      (this.DelayTime = i);
  }
}
let SubMeshComponent = class SubMeshComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.CharActorComp = void 0),
      (this.CharRenderComp = void 0),
      (this.SubMeshMap = new Map()),
      (this.SubMeshOrderMap = new Map());
  }
  OnStart() {
    return (
      (this.ActorComp = this.Entity.GetComponent(1)),
      (this.CharActorComp = this.Entity.GetComponent(3)),
      (this.CharRenderComp = this.CharActorComp?.Actor.CharRenderingComponent),
      !0
    );
  }
  OnActivate() {
    if (this.ActorComp) {
      var e = this.ActorComp.Owner.K2_GetComponentsByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      );
      for (let t = e.Num() - 1; 0 <= t; --t) {
        var s = e.Get(t),
          i = s.GetName();
        standardMeshNames.has(i) ||
          this.SubMeshMap.set(i, new SubMeshItem(i, s));
      }
    }
  }
  OnAfterTick(t) {
    this.Ewc();
  }
  OnEnable() {
    this.Ewc(!1);
  }
  Ewc(t = !0) {
    for (var [e, s] of this.SubMeshOrderMap) this.SetSubMeshVisible(e, s, t);
    this.SubMeshOrderMap.clear();
  }
  SetSubMeshVisible(t, e, s = !0) {
    var i,
      t = this.SubMeshMap.get(t);
    t &&
      t.Visible !== e.Visible &&
      (t.CurrentPdHandle &&
        (this.CharRenderComp?.RemoveMaterialControllerData(t.CurrentPdHandle),
        (t.CurrentPdHandle = 0)),
      s &&
        e.CharControllerData &&
        (t.CurrentPdHandle =
          this.CharRenderComp?.AddMaterialControllerData(
            e.CharControllerData,
          ) ?? 0),
      t.CurrentEffectHandle &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          t.CurrentEffectHandle,
          "SubMesh",
          !0,
          !0,
        ),
        (t.CurrentEffectHandle = 0)),
      s &&
        e.EffectDataAssetRef &&
        (s = e.EffectDataAssetRef.ToAssetPathName()) &&
        ((s = this.CharActorComp?.GetReplaceEffect(s) ?? s),
        ((i = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
          this.Entity.Id,
        )).SkeletalMeshComp = t.Mesh),
        (s = EffectSystem_1.EffectSystem.SpawnEffect(
          t.Mesh,
          new UE.TransformDouble(),
          s,
          "SubMeshComponent",
          i,
          3,
        ))) &&
        EffectSystem_1.EffectSystem.IsValid(s) &&
        ((i = EffectSystem_1.EffectSystem.GetEffectActor(s)),
        (t.CurrentEffectHandle = s),
        i.K2_AttachToComponent(t.Mesh, FNameUtil_1.FNameUtil.NONE, 0, 0, 0, !1),
        i.D_K2_SetActorRelativeTransform(
          new UE.TransformDouble(),
          !1,
          void 0,
          !0,
        ),
        EffectSystem_1.EffectSystem.ForceCheckPendingInit(s)),
      t.SetVisible(e.Visible, e.DelayTime));
  }
  SetSubMeshOrder(t, e, s, i, h) {
    this.SubMeshOrderMap.set(t, new SubMeshOrder(e, s, i, h));
  }
  SetSubMeshAttach(t, e, s) {
    this.SubMeshMap.get(t)?.AttachToNewSocket(e, s);
  }
  ResetSubMeshAttach(t) {
    this.SubMeshMap.get(t)?.ResetAttach();
  }
};
(SubMeshComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(220)],
  SubMeshComponent,
)),
  (exports.SubMeshComponent = SubMeshComponent);
//# sourceMappingURL=SubMeshComponent.js.map
