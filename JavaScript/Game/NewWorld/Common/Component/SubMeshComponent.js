"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, s, i) {
    var h,
      r = arguments.length,
      o =
        r < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, s))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(e, t, s, i);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (h = e[n]) && (o = (r < 3 ? h(o) : 3 < r ? h(t, s, o) : h(t, s)) || o);
    return 3 < r && o && Object.defineProperty(t, s, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SubMeshComponent = void 0);
const UE = require("ue"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../Core/Utils/FNameUtil"),
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
  constructor(e, t) {
    (this.Name = e),
      (this.Mesh = t),
      (this.VisibleInternal = !1),
      (this.iCa = void 0),
      (this.rCa = () => {
        this.Mesh.SetVisibility(!1, !1), (this.iCa = void 0);
      }),
      (this.CurrentPdHandle = 0),
      (this.CurrentEffectHandle = 0),
      (this.VisibleInternal = t.bVisible);
  }
  get Visible() {
    return this.VisibleInternal;
  }
  SetVisible(e, t = 0) {
    this.VisibleInternal !== e &&
      ((this.VisibleInternal = e),
      this.iCa &&
        (TimerSystem_1.TimerSystem.Remove(this.iCa), (this.iCa = void 0)),
      !this.VisibleInternal && 0 < t
        ? (this.iCa = TimerSystem_1.TimerSystem.Delay(this.rCa, t))
        : this.Mesh.SetVisibility(e, !1));
  }
}
class SubMeshOrder {
  constructor(e, t, s, i) {
    (this.Visible = e),
      (this.CharControllerData = t),
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
      var t = this.ActorComp.Owner.K2_GetComponentsByClass(
        UE.SkeletalMeshComponent.StaticClass(),
      );
      for (let e = t.Num() - 1; 0 <= e; --e) {
        var s = t.Get(e),
          i = s.GetName();
        standardMeshNames.has(i) ||
          this.SubMeshMap.set(i, new SubMeshItem(i, s));
      }
    }
  }
  OnTick(e) {
    for (var [t, s] of this.SubMeshOrderMap) this.SetSubMeshVisible(t, s);
    this.SubMeshOrderMap.clear();
  }
  SetSubMeshVisible(e, t) {
    var s,
      i,
      e = this.SubMeshMap.get(e);
    e &&
      e.Visible !== t.Visible &&
      (e.CurrentPdHandle &&
        (this.CharRenderComp?.RemoveMaterialControllerData(e.CurrentPdHandle),
        (e.CurrentPdHandle = 0)),
      t.CharControllerData &&
        (e.CurrentPdHandle =
          this.CharRenderComp?.AddMaterialControllerData(
            t.CharControllerData,
          ) ?? 0),
      e.CurrentEffectHandle &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          e.CurrentEffectHandle,
          "SubMesh",
          !0,
          !0,
        ),
        (e.CurrentEffectHandle = 0)),
      t.EffectDataAssetRef &&
        (s = t.EffectDataAssetRef.ToAssetPathName()) &&
        ((s = this.CharActorComp?.GetReplaceEffect(s) ?? s),
        ((i = new SkeletalMeshEffectContext_1.SkeletalMeshEffectContext(
          this.Entity.Id,
        )).SkeletalMeshComp = e.Mesh),
        (s = EffectSystem_1.EffectSystem.SpawnEffect(
          e.Mesh,
          new UE.Transform(),
          s,
          "SubMeshComponent",
          i,
          3,
        ))) &&
        EffectSystem_1.EffectSystem.IsValid(s) &&
        ((i = EffectSystem_1.EffectSystem.GetEffectActor(s)),
        (e.CurrentEffectHandle = s),
        i.K2_AttachToComponent(e.Mesh, FNameUtil_1.FNameUtil.NONE, 0, 0, 0, !1),
        i.K2_SetActorRelativeTransform(new UE.Transform(), !1, void 0, !0),
        EffectSystem_1.EffectSystem.ForceCheckPendingInit(s)),
      e.SetVisible(t.Visible, t.DelayTime));
  }
  SetSubMeshOrder(e, t, s, i, h) {
    this.SubMeshOrderMap.set(e, new SubMeshOrder(t, s, i, h));
  }
};
(SubMeshComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(203)],
  SubMeshComponent,
)),
  (exports.SubMeshComponent = SubMeshComponent);
//# sourceMappingURL=SubMeshComponent.js.map
