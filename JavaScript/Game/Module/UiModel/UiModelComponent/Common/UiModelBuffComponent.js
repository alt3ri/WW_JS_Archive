"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var f,
      s = arguments.length,
      r =
        s < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      r = Reflect.decorate(e, t, i, o);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (f = e[n]) && (r = (s < 3 ? f(r) : 3 < s ? f(t, i, r) : f(t, i)) || r);
    return 3 < s && r && Object.defineProperty(t, i, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiModelBuffComponent = void 0);
const BuffById_1 = require("../../../../../Core/Define/ConfigQuery/BuffById"),
  GameplayCueById_1 = require("../../../../../Core/Define/ConfigQuery/GameplayCueById"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  UiModelComponentDefine_1 = require("../../Define/UiModelComponentDefine"),
  UiModelComponentBase_1 = require("../UiModelComponentBase"),
  UiModelEffectComponent_1 = require("./UiModelEffectComponent");
let UiModelBuffComponent = class UiModelBuffComponent extends UiModelComponentBase_1.UiModelComponentBase {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.D_r = void 0),
      (this.BuffToEffectsMap = new Map()),
      (this.CacheEffectContext =
        new UiModelEffectComponent_1.UiModelEffectPlayContext()),
      (this.CacheLocation = Vector_1.Vector.Create()),
      (this.CacheRotator = Rotator_1.Rotator.Create()),
      (this.CacheScale = Vector_1.Vector.Create()),
      (this.CacheTransform = Transform_1.Transform.Create());
  }
  OnInit() {
    (this.n$t = this.Owner.CheckGetComponent(1)),
      (this.D_r = this.Owner.CheckGetComponent(4));
  }
  OnEnd() {
    this.RemoveAllBuffId();
  }
  AddBuffByBuffId(t) {
    if (!this.BuffToEffectsMap.has(t)) {
      var e = BuffById_1.configBuffById.GetConfig(t);
      if (e) {
        e = e.GameplayCueIds;
        if (e && 0 !== e.length)
          for (const o of e) {
            var i = GameplayCueById_1.configGameplayCueById.GetConfig(o);
            if (i) {
              i = this.PlayEffectByCueConfig(i);
              let e = this.BuffToEffectsMap.get(t);
              e || ((e = new Set()), this.BuffToEffectsMap.set(t, e)), e.add(i);
            }
          }
      }
    }
  }
  PlayEffectByCueConfig(e) {
    var t = this.CacheEffectContext,
      i =
        (t.Reset(),
        (t.EffectPath = e.Path),
        (t.AttachTargetComponent = this.n$t.MainMeshComponent),
        (t.LocationRule = e.LocRule),
        (t.RotationRule = e.RotaRule),
        (t.ScaleRule = e.SclRule),
        e.Location),
      i =
        (this.CacheLocation.Set(i.X, i.Y, i.Z),
        this.CacheTransform.SetLocation(this.CacheLocation),
        e.Rotation),
      i =
        (this.CacheRotator.Set(i.X, i.Y, i.Z),
        this.CacheTransform.SetRotation(this.CacheRotator.Quaternion()),
        e.Scale);
    return (
      this.CacheScale.Set(i.X, i.Y, i.Z),
      this.CacheTransform.SetScale3D(this.CacheScale),
      (t.Transform = this.CacheTransform.ToUeTransform()),
      (t.SocketName =
        FNameUtil_1.FNameUtil.GetDynamicFName(e.Socket) ??
        FNameUtil_1.FNameUtil.EMPTY),
      this.D_r.PlayEffectByContext(t)
    );
  }
  RemoveBuffByBuffId(e) {
    e = this.BuffToEffectsMap.get(e);
    if (e) for (const t of e) this.D_r.StopEffect(t);
  }
  RemoveAllBuffId() {
    if (0 !== this.BuffToEffectsMap.size) {
      for (const e of this.BuffToEffectsMap.keys()) this.RemoveBuffByBuffId(e);
      this.BuffToEffectsMap.clear();
    }
  }
};
(UiModelBuffComponent = __decorate(
  [(0, UiModelComponentDefine_1.RegisterUiModelComponent)(11)],
  UiModelBuffComponent,
)),
  (exports.UiModelBuffComponent = UiModelBuffComponent);
//# sourceMappingURL=UiModelBuffComponent.js.map
