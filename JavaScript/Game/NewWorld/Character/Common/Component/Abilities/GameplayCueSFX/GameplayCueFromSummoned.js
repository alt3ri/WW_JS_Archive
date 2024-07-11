"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GameplayCueFromSummoned = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../../../Core/Common/Log");
const EntitySystem_1 = require("../../../../../../../Core/Entity/EntitySystem");
const FNameUtil_1 = require("../../../../../../../Core/Utils/FNameUtil");
const Rotator_1 = require("../../../../../../../Core/Utils/Math/Rotator");
const Transform_1 = require("../../../../../../../Core/Utils/Math/Transform");
const Vector_1 = require("../../../../../../../Core/Utils/Math/Vector");
const EffectContext_1 = require("../../../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../../../Effect/EffectSystem");
const BlackboardController_1 = require("../../../../../../World/Controller/BlackboardController");
const GameplayCueBase_1 = require("./GameplayCueBase");
class GameplayCueFromSummoned extends GameplayCueBase_1.GameplayCueBase {
  constructor() {
    super(...arguments),
      (this.HXo = void 0),
      (this.jXo = void 0),
      (this.SXo = void 0),
      (this.WXo = void 0),
      (this.gXo = 0),
      (this.KXo = void 0),
      (this.QXo = void 0),
      (this.XXo = !1);
  }
  OnInit() {
    let t;
    const e = this.Entity.CheckGetComponent(157)
      ?.GetBuffByHandle(this.ActiveHandleId)
      ?.GetInstigator();
    e
      ? (this.Vi(),
        (this.KXo = Transform_1.Transform.Create()),
        this.KXo.SetScale3D(Vector_1.Vector.OneVectorProxy),
        (this.QXo = Transform_1.Transform.Create()),
        (t = BlackboardController_1.BlackboardController.GetIntValueByEntity(
          e.Id,
          this.CueConfig.CompName,
        )),
        (this.HXo =
          EntitySystem_1.EntitySystem.Get(t)?.CheckGetComponent(3)?.Actor),
        (this.jXo = e.Id))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 49, "无法获取Buff施放者");
  }
  OnCreate() {
    this.HXo
      ? ((this.gXo = EffectSystem_1.EffectSystem.SpawnEffect(
          this.HXo,
          new UE.Transform(),
          this.CueConfig.Path,
          "[GameplayCueFromSummoned.OnCreate]",
          new EffectContext_1.EffectContext(this.jXo),
          0,
        )),
        this.$Xo(),
        this.CueConfig.Comp === 1 && (this.XXo = !0))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 49, "无法获取召唤物");
  }
  OnTick(t) {
    this.XXo && this.$Xo();
  }
  OnDestroy() {
    (this.HXo = void 0),
      (this.jXo = void 0),
      (this.XXo = !1),
      (this.WXo = void 0),
      this.SXo.splice(0, this.SXo.length),
      (this.SXo = void 0),
      (this.KXo = void 0),
      (this.QXo = void 0),
      EffectSystem_1.EffectSystem.IsValid(this.gXo) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.gXo,
          "[GameplayCueEffect.OnDestroy]",
          !1,
        ),
        (this.gXo = 0));
  }
  Vi() {
    const t = Vector_1.Vector.Create(
      this.CueConfig.Location.X,
      this.CueConfig.Location.Y,
      this.CueConfig.Location.Z,
    );
    const e = Rotator_1.Rotator.Create(
      this.CueConfig.Rotation.Y,
      this.CueConfig.Rotation.Z,
      this.CueConfig.Rotation.X,
    );
    const i = Vector_1.Vector.Create(
      this.CueConfig.Scale.X,
      this.CueConfig.Scale.Y,
      this.CueConfig.Scale.Z,
    );
    const s =
      ((this.WXo = Transform_1.Transform.Create(e.Quaternion(), t, i)),
      (this.SXo = new Array()),
      this.CueConfig.Socket.split("#"));
    for (let t = 0, e = s?.length; t < e; t++)
      this.SXo.push(FNameUtil_1.FNameUtil.GetDynamicFName(s[t]));
  }
  $Xo() {
    let t, e, i, s;
    EffectSystem_1.EffectSystem.IsValid(this.gXo) &&
      (t = EffectSystem_1.EffectSystem.GetEffectActor(this.gXo)) &&
      t.IsValid() &&
      ((e = this.KXo.GetLocation()),
      this.SXo.length > 0
        ? e.FromUeVector(this.HXo.Mesh.GetSocketLocation(this.SXo[0]))
        : e.DeepCopy(this.HXo.CharacterActorComponent.ActorLocationProxy),
      (i = this.QXo.GetLocation()),
      this.SXo.length > 1
        ? i.FromUeVector(this.ActorInternal.Mesh.GetSocketLocation(this.SXo[1]))
        : i.DeepCopy(
            this.ActorInternal.CharacterActorComponent.ActorLocationProxy,
          ),
      (s = this.KXo.GetRotation()),
      i.SubtractionEqual(e).ToOrientationQuat(s),
      this.WXo.ComposeTransforms(this.KXo, this.QXo),
      t.K2_SetActorLocationAndRotation(
        this.QXo.GetLocation().ToUeVector(),
        this.QXo.GetRotation().Rotator().ToUeRotator(),
        !1,
        void 0,
        !0,
      ));
  }
}
exports.GameplayCueFromSummoned = GameplayCueFromSummoned;
// # sourceMappingURL=GameplayCueFromSummoned.js.map
