"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueFromSummoned = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../../Core/Common/Log"),
  EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem"),
  FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil"),
  Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator"),
  Transform_1 = require("../../../../../../../Core/Utils/Math/Transform"),
  Vector_1 = require("../../../../../../../Core/Utils/Math/Vector"),
  EffectContext_1 = require("../../../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../../../Effect/EffectSystem"),
  BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController"),
  GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueFromSummoned extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.k$o = void 0),
      (this.F$o = void 0),
      (this.p$o = void 0),
      (this.V$o = void 0),
      (this.m$o = 0),
      (this.H$o = void 0),
      (this.j$o = void 0),
      (this.W$o = !1);
  }
  OnInit() {
    var t,
      e = this.Instigator?.Entity;
    e
      ? (this.Vi(),
        (this.H$o = Transform_1.Transform.Create()),
        this.H$o.SetScale3D(Vector_1.Vector.OneVectorProxy),
        (this.j$o = Transform_1.Transform.Create()),
        (t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          e.Id,
          this.CueConfig.CompName,
        )),
        (this.k$o =
          EntitySystem_1.EntitySystem.Get(t)?.CheckGetComponent(3)?.Actor),
        (this.F$o = e.Id))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("Battle", 49, "无法获取Buff施放者");
  }
  OnCreate() {
    this.k$o
      ? ((this.m$o = EffectSystem_1.EffectSystem.SpawnEffect(
          this.k$o,
          new UE.Transform(),
          this.CueConfig.Path,
          "[GameplayCueFromSummoned.OnCreate]",
          new EffectContext_1.EffectContext(this.F$o),
          0,
        )),
        this.K$o(),
        1 === this.CueConfig.Comp && (this.W$o = !0))
      : Log_1.Log.CheckWarn() && Log_1.Log.Warn("Battle", 49, "无法获取召唤物");
  }
  OnTick(t) {
    this.W$o && this.K$o();
  }
  OnDestroy() {
    (this.k$o = void 0),
      (this.F$o = void 0),
      (this.W$o = !1),
      (this.V$o = void 0),
      this.p$o.splice(0, this.p$o.length),
      (this.p$o = void 0),
      (this.H$o = void 0),
      (this.j$o = void 0),
      EffectSystem_1.EffectSystem.IsValid(this.m$o) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.m$o,
          "[GameplayCueEffect.OnDestroy]",
          !1,
        ),
        (this.m$o = 0));
  }
  Vi() {
    var t = Vector_1.Vector.Create(
        this.CueConfig.Location.X,
        this.CueConfig.Location.Y,
        this.CueConfig.Location.Z,
      ),
      e = Rotator_1.Rotator.Create(
        this.CueConfig.Rotation.Y,
        this.CueConfig.Rotation.Z,
        this.CueConfig.Rotation.X,
      ),
      i = Vector_1.Vector.Create(
        this.CueConfig.Scale.X,
        this.CueConfig.Scale.Y,
        this.CueConfig.Scale.Z,
      ),
      s =
        ((this.V$o = Transform_1.Transform.Create(e.Quaternion(), t, i)),
        (this.p$o = new Array()),
        this.CueConfig.Socket.split("#"));
    for (let t = 0, e = s?.length; t < e; t++)
      this.p$o.push(FNameUtil_1.FNameUtil.GetDynamicFName(s[t]));
  }
  K$o() {
    var t, e, i, s;
    EffectSystem_1.EffectSystem.IsValid(this.m$o) &&
      (t = EffectSystem_1.EffectSystem.GetEffectActor(this.m$o)) &&
      t.IsValid() &&
      ((e = this.H$o.GetLocation()),
      0 < this.p$o.length
        ? e.FromUeVector(this.k$o.Mesh.GetSocketLocation(this.p$o[0]))
        : e.DeepCopy(this.k$o.CharacterActorComponent.ActorLocationProxy),
      (i = this.j$o.GetLocation()),
      1 < this.p$o.length
        ? i.FromUeVector(this.ActorInternal.Mesh.GetSocketLocation(this.p$o[1]))
        : i.DeepCopy(
            this.ActorInternal.CharacterActorComponent.ActorLocationProxy,
          ),
      (s = this.H$o.GetRotation()),
      i.SubtractionEqual(e).ToOrientationQuat(s),
      this.V$o.ComposeTransforms(this.H$o, this.j$o),
      t.K2_SetActorLocationAndRotation(
        this.j$o.GetLocation().ToUeVector(),
        this.j$o.GetRotation().Rotator().ToUeRotator(),
        !1,
        void 0,
        !0,
      ));
  }
}
exports.GameplayCueFromSummoned = GameplayCueFromSummoned;
//# sourceMappingURL=GameplayCueFromSummoned.js.map
