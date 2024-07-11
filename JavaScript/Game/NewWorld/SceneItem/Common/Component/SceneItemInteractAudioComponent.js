"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    let s;
    const r = arguments.length;
    let n =
      r < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, i, o);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (s = t[h]) && (n = (r < 3 ? s(n) : r > 3 ? s(e, i, n) : s(e, i)) || n);
    return r > 3 && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemInteractAudioComponent = void 0);
const AudioController_1 = require("../../../../../Core/Audio/AudioController");
const Log_1 = require("../../../../../Core/Common/Log");
const CommonDefine_1 = require("../../../../../Core/Define/CommonDefine");
const InteractAudioMaterialByCollisionMaterial_1 = require("../../../../../Core/Define/ConfigQuery/InteractAudioMaterialByCollisionMaterial");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const TsBaseItem_1 = require("../../BaseItem/TsBaseItem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const RTPC_MAX = 100;
let SceneItemInteractAudioComponent = class SceneItemInteractAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.Qln = void 0),
      (this.Xln = !1),
      (this.Mass = -0),
      (this.$ln = -0),
      (this.BY = -0),
      (this.bY = -0),
      (this.Yln = -0),
      (this.wrr = Vector_1.Vector.Create()),
      (this.Jln = -0),
      (this.zln = Vector_1.Vector.Create()),
      (this.Zln = ""),
      (this.e1n = "physical_obj_mass"),
      (this.t1n = "physical_obj_velocity");
  }
  static get Dependencies() {
    return [182, 0];
  }
  OnStart() {
    return (
      this.BFr(),
      this.Xln
        ? ((this.nXt = this.Entity.GetComponent(182)),
          (this.Qln = this.nXt.StaticMesh),
          this.Qln &&
            this.Qln.OnComponentHit.Add((t, e, i, o, s) => {
              this.i1n(s);
            }))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Audio", 34, "未开启控物碰撞音效"),
      !0
    );
  }
  BFr() {
    let t;
    const e = this.Entity.GetComponent(0);
    var i = e.GetPbEntityInitData();
    var i = (0, IComponent_1.getComponent)(
      i.ComponentsData,
      "InteractAudioComponent",
    );
    i.CollisionMaterial || i.InteractEventConfig
      ? i.CollisionMaterial &&
        ((i = i.CollisionMaterial),
        (t =
          InteractAudioMaterialByCollisionMaterial_1.configInteractAudioMaterialByCollisionMaterial.GetConfig(
            i,
          ))
          ? ((this.Xln = t.IsActiveImpacter),
            (this.Mass = t.ImpactMass),
            (this.$ln =
              t.MinimumTimeBetweenAkevent *
              CommonDefine_1.MILLIONSECOND_PER_SECOND),
            (this.BY = t.Maxforce),
            (this.bY = t.MinimumPosteventForce),
            (this.Zln = t.AudioEvent),
            AudioController_1.AudioController.SetRTPCValue(this.Mass, this.e1n))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error("Audio", 34, "该类型未配置在 交互材质音频表 中", [
              "type",
              i,
            ]))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Audio", 34, "该组件未配置音效相关配置", [
          "PbDataId",
          e.GetPbDataId(),
        ]);
  }
  i1n(t) {
    let e = new Date().getTime();
    this.Yln && e - this.Yln < this.$ln
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          34,
          "跳过该次碰撞音效",
          ["LastTime", this.Yln],
          ["CurTime", e],
          ["Interval", this.$ln],
        )
      : ((this.Yln = e),
        (e = t.Actor) !== this.nXt.Owner &&
          (this.GetVelocity(),
          (this.Jln = this.wrr.Size()),
          this.Jln < this.bY
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Audio", 34, "速度太小 不触发碰撞音效", [
                "Velocity",
                this.Jln,
              ])
            : (this.wrr.MultiplyEqual(this.Mass),
              (this.Jln = this.wrr.Size()),
              e instanceof TsBaseItem_1.default &&
                ((t = ActorUtils_1.ActorUtils.GetEntityByActor(e)),
                (this.zln = Vector_1.Vector.Create(
                  t.Entity.GetComponent(112).GetVelocity(),
                )),
                this.zln.MultiplyEqual(t.Entity.GetComponent(112).Mass)),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  34,
                  "碰撞物及被碰撞物动量",
                  ["myMomentum", this.Jln],
                  ["otherMomentum", this.zln.Size()],
                ),
              this.wrr.AdditionEqual(this.zln),
              (this.Jln = this.wrr.Size()),
              (e = MathUtils_1.MathUtils.RangeClamp(
                this.Jln,
                0,
                this.BY,
                0,
                RTPC_MAX,
              )),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  34,
                  "总动量及Rtpc值",
                  ["totalMomentum", this.Jln],
                  ["rtpcValue", e],
                ),
              (t = this.nXt.Owner),
              AudioController_1.AudioController.SetRTPCValue(e, this.t1n),
              AudioController_1.AudioController.PostEvent(this.Zln, t))));
  }
  GetVelocity() {
    const t = this.nXt.Owner;
    return t?.IsValid()
      ? (this.wrr.FromUeVector(t.GetVelocity()), this.wrr)
      : Vector_1.Vector.ZeroVectorProxy;
  }
  OnClear() {
    return this.Qln?.OnComponentHit.Clear(), !0;
  }
};
(SceneItemInteractAudioComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(112)],
  SceneItemInteractAudioComponent,
)),
  (exports.SceneItemInteractAudioComponent = SceneItemInteractAudioComponent);
// # sourceMappingURL=SceneItemInteractAudioComponent.js.map
