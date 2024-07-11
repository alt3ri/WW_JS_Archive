"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (s = t[h]) && (n = (r < 3 ? s(n) : 3 < r ? s(e, i, n) : s(e, i)) || n);
    return 3 < r && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemInteractAudioComponent = void 0);
const AudioController_1 = require("../../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  InteractAudioMaterialByCollisionMaterial_1 = require("../../../../../Core/Define/ConfigQuery/InteractAudioMaterialByCollisionMaterial"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils"),
  TsBaseItem_1 = require("../../BaseItem/TsBaseItem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  RTPC_MAX = 100;
let SceneItemInteractAudioComponent = class SceneItemInteractAudioComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.Rln = void 0),
      (this.Uln = !1),
      (this.Mass = -0),
      (this.Aln = -0),
      (this.BY = -0),
      (this.bY = -0),
      (this.Pln = -0),
      (this.Anr = Vector_1.Vector.Create()),
      (this.xln = -0),
      (this.wln = Vector_1.Vector.Create()),
      (this.Bln = ""),
      (this.bln = "physical_obj_mass"),
      (this.qln = "physical_obj_velocity");
  }
  static get Dependencies() {
    return [185, 0];
  }
  OnStart() {
    return (
      this.mFr(),
      this.Uln
        ? ((this.n$t = this.Entity.GetComponent(185)),
          (this.Rln = this.n$t.StaticMesh),
          this.Rln &&
            this.Rln.OnComponentHit.Add((t, e, i, o, s) => {
              this.Gln(s);
            }))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Audio", 34, "未开启控物碰撞音效"),
      !0
    );
  }
  mFr() {
    var t,
      e = this.Entity.GetComponent(0),
      i = e.GetPbEntityInitData(),
      i = (0, IComponent_1.getComponent)(
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
          ? ((this.Uln = t.IsActiveImpacter),
            (this.Mass = t.ImpactMass),
            (this.Aln =
              t.MinimumTimeBetweenAkevent *
              CommonDefine_1.MILLIONSECOND_PER_SECOND),
            (this.BY = t.Maxforce),
            (this.bY = t.MinimumPosteventForce),
            (this.Bln = t.AudioEvent),
            AudioController_1.AudioController.SetRTPCValue(this.Mass, this.bln))
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
  Gln(t) {
    var e = new Date().getTime();
    this.Pln && e - this.Pln < this.Aln
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Audio",
          34,
          "跳过该次碰撞音效",
          ["LastTime", this.Pln],
          ["CurTime", e],
          ["Interval", this.Aln],
        )
      : ((this.Pln = e),
        (e = t.Actor) !== this.n$t.Owner &&
          (this.GetVelocity(),
          (this.xln = this.Anr.Size()),
          this.xln < this.bY
            ? Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Audio", 34, "速度太小 不触发碰撞音效", [
                "Velocity",
                this.xln,
              ])
            : (this.Anr.MultiplyEqual(this.Mass),
              (this.xln = this.Anr.Size()),
              e instanceof TsBaseItem_1.default &&
                ((t = ActorUtils_1.ActorUtils.GetEntityByActor(e)),
                (this.wln = Vector_1.Vector.Create(
                  t.Entity.GetComponent(114).GetVelocity(),
                )),
                this.wln.MultiplyEqual(t.Entity.GetComponent(114).Mass)),
              Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Audio",
                  34,
                  "碰撞物及被碰撞物动量",
                  ["myMomentum", this.xln],
                  ["otherMomentum", this.wln.Size()],
                ),
              this.Anr.AdditionEqual(this.wln),
              (this.xln = this.Anr.Size()),
              (e = MathUtils_1.MathUtils.RangeClamp(
                this.xln,
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
                  ["totalMomentum", this.xln],
                  ["rtpcValue", e],
                ),
              (t = this.n$t.Owner),
              AudioController_1.AudioController.SetRTPCValue(e, this.qln),
              AudioController_1.AudioController.PostEvent(this.Bln, t))));
  }
  GetVelocity() {
    var t = this.n$t.Owner;
    return t?.IsValid()
      ? (this.Anr.FromUeVector(t.GetVelocity()), this.Anr)
      : Vector_1.Vector.ZeroVectorProxy;
  }
  OnClear() {
    return this.Rln?.OnComponentHit.Clear(), !0;
  }
};
(SceneItemInteractAudioComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(114)],
  SceneItemInteractAudioComponent,
)),
  (exports.SceneItemInteractAudioComponent = SceneItemInteractAudioComponent);
//# sourceMappingURL=SceneItemInteractAudioComponent.js.map
