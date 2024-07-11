"use strict";
let ScanComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    let s;
    const o = arguments.length;
    let a =
      o < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      a = Reflect.decorate(t, e, i, n);
    else
      for (let r = t.length - 1; r >= 0; r--)
        (s = t[r]) && (a = (o < 3 ? s(a) : o > 3 ? s(e, i, a) : s(e, i)) || a);
    return o > 3 && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanComponent = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const Global_1 = require("../../../../Global");
const GlobalData_1 = require("../../../../GlobalData");
const LevelGamePlayUtils_1 = require("../../../../LevelGamePlay/LevelGamePlayUtils");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ItemMaterialControllerActorData_1 = require("../../../../Render/Scene/Item/MaterialController/ItemMaterialControllerActorData");
const M_TO_CM = 100;
const SECONDS_TO_MILLISECONDS = 1e3;
class TimerManageContainer {
  constructor(t) {
    (this.vJo = void 0),
      (this.TDe = void 0),
      (this.C$i = () => {
        (this.TDe = void 0), this.vJo();
      }),
      (this.vJo = t);
  }
  Delay(t, e = !1) {
    (void 0 !== this.TDe && !e) ||
      (this.Remove(),
      (e = t < TimerSystem_1.MIN_TIME ? TimerSystem_1.MIN_TIME : t),
      (this.TDe = TimerSystem_1.TimerSystem.Delay(this.C$i, e)));
  }
  Remove() {
    return !(
      void 0 === this.TDe ||
      !TimerSystem_1.TimerSystem.Has(this.TDe) ||
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0))
    );
  }
  Stop() {
    this.Remove() && this.C$i();
  }
}
let ScanComponent = (ScanComponent_1 = class ScanComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.nXt = void 0),
      (this.Vpr = void 0),
      (this.Izr = void 0),
      (this.Tzr = !1),
      (this.Lzr = !1),
      (this.Dzr = new Array()),
      (this.Qwn = !1),
      (this.Rzr = 0),
      (this.Azr = 0),
      (this.xC = !1),
      (this.Uzr = !1),
      (this.Pzr = void 0),
      (this.xzr = void 0),
      (this.wzr = !1),
      (this.Bzr = 0),
      (this.bzr = !1),
      (this.qzr = new Map()),
      (this.Gzr = void 0),
      (this.Nzr = void 0),
      (this.Ozr = () => {
        this.bzr || ((this.bzr = !0), this.kzr());
      }),
      (this.zpe = (t, e) => {
        e = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(e);
        if (
          e &&
          this.Nzr?.includes(e) &&
          (this.Nzr.splice(this.Nzr.indexOf(e), 1), this.Nzr.length <= 0)
        )
          for (const i of this.qzr.values()) i.Stop();
      });
  }
  pie() {
    let t;
    ScanComponent_1.Fzr === -1 &&
      ((t = ConfigManager_1.ConfigManager.LevelGamePlayConfig.ScanMaxDistance),
      (ScanComponent_1.Fzr = t * M_TO_CM * t * M_TO_CM)),
      ScanComponent_1.Vzr === -1 &&
        ((t =
          ConfigManager_1.ConfigManager.LevelGamePlayConfig
            .ScanShowInteractionEffectMaxDistance),
        (ScanComponent_1.Vzr = t * M_TO_CM * t * M_TO_CM)),
      ScanComponent_1.Hzr === -1 &&
        ((t =
          ConfigManager_1.ConfigManager.LevelGamePlayConfig
            .ScanDetectConcealedDistance),
        (ScanComponent_1.Hzr = t * M_TO_CM * t * M_TO_CM));
  }
  OnStart() {
    if (
      (this.pie(),
      (this.nXt = this.Entity.GetComponent(1)),
      (this.Vpr = this.Entity.GetComponent(0)),
      (this.Izr = this.Entity.GetComponent(106)),
      this.Izr &&
        this.Izr.SetLogicRange(
          ConfigManager_1.ConfigManager.LevelGamePlayConfig
            .ScanDetectConcealedDistance * M_TO_CM,
        ),
      (this.Pzr =
        LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(
          this.Vpr,
        )),
      (this.xzr = this.Pzr?.ScanCompositeConfig),
      (this.xC = !1),
      (this.Uzr = !!this.Pzr?.ScanInfos && this.Pzr.ScanInfos.length > 0),
      this.Uzr)
    ) {
      for (const e of this.Pzr.ScanInfos)
        if (
          (e.ResourcePath?.length > 0 && (this.Lzr = !0),
          e.IconPath?.length > 0 && (this.Tzr = !0),
          this.Lzr && this.Tzr)
        )
          break;
      var t = this.Vpr.GetPbEntityInitData();
      var t = (0, IComponent_1.getComponent)(
        t.ComponentsData,
        "RefreshGroupComponent",
      );
      t && t.EntityIds.length > 0 && (this.Gzr = t.EntityIds);
    }
    return (
      this.Vpr.IsConcealed &&
        ((t = this.Qio()),
        (this.bzr = t > ScanComponent_1.Hzr),
        this.kzr(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Ozr,
        ),
        (this.wzr = !0)),
      !0
    );
  }
  OnEnd() {
    for (const [t, e] of this.qzr)
      t === "InteractionEffect" ? e.Remove() : e.Stop();
    return (
      this.qzr.clear(),
      EffectSystem_1.EffectSystem.IsValid(this.Azr) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.Azr,
          "[TimerManageContainer.OnEnd]",
          !1,
        ),
        (this.Azr = 0)),
      this.wzr &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.Ozr,
        ),
      (this.Gzr = void 0),
      !(this.Nzr = void 0)
    );
  }
  OnTick(t) {
    let e;
    this.Vpr.IsConcealed &&
      !this.xC &&
      this.Uzr &&
      this.Izr?.IsInLogicRange &&
      ((e = this.Qio()),
      (this.bzr && e <= ScanComponent_1.Hzr) ||
        (!this.bzr && e > ScanComponent_1.Hzr)) &&
      ((this.bzr = !this.bzr), this.kzr());
  }
  Qio() {
    if (this.nXt && Global_1.Global.BaseCharacter) {
      let t;
      let e = Global_1.Global.BaseCharacter.CharacterActorComponent;
      if (e)
        return (
          (t = this.nXt.ActorLocationProxy),
          (e = e.ActorLocationProxy),
          Vector_1.Vector.DistSquared(t, e)
        );
    }
  }
  kzr() {
    let t, e;
    this.Vpr.IsConcealed &&
      (EffectSystem_1.EffectSystem.IsValid(this.Azr) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.Azr,
          "[TimerManageContainer.ChangeVoicePrintEffect]",
          !1,
        ),
        (this.Azr = 0)),
      (e = this.nXt.Owner)) &&
      (t = this.bzr
        ? this.xzr?.FarVoiceEffectPath
        : this.xzr?.NearVoiceEffectPath) &&
      ((this.Azr = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        e.GetTransform(),
        t,
        "[TimerManageContainer.ChangeVoicePrintEffect]",
        new EffectContext_1.EffectContext(this.Entity.Id),
      )),
      EffectSystem_1.EffectSystem.IsValid(this.Azr)) &&
      (e = EffectSystem_1.EffectSystem.GetSureEffectActor(this.Azr)) &&
      e.IsValid() &&
      (e.RootComponent.K2_SetWorldLocation(
        this.jzr().K2_GetComponentLocation(),
        !1,
        void 0,
        !1,
      ),
      e.RootComponent.K2_SetWorldRotation(
        Rotator_1.Rotator.ZeroRotator,
        !1,
        void 0,
        !1,
      ));
  }
  StartProcess() {
    this.Uzr &&
      ((this.Bzr = this.Qio()),
      this.Vpr.IsConcealed && this.Bzr > ScanComponent_1.Hzr
        ? ScanComponent_1.EnableLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelPlay",
            32,
            "[ScanComponent] 隐藏物体，超出了取消隐藏的距离",
            ["PbdataId", this.Vpr.GetPbDataId()],
            ["DistanceWithPlayerCm", this.Bzr],
            ["ScanDetectConcealedDistanceSquaredCm", ScanComponent_1.Hzr],
          )
        : (this.Gzr &&
            this.Gzr?.length > 0 &&
            (this.Wzr(), this.Nzr.length <= 0)) ||
          ((this.xC = !0),
          this.Kzr(),
          EffectSystem_1.EffectSystem.IsValid(this.Azr) &&
            (EffectSystem_1.EffectSystem.StopEffectById(
              this.Azr,
              "[TimerManageContainer.StartProcess]",
              !1,
            ),
            (this.Azr = 0)),
          this.Bzr < ScanComponent_1.Vzr &&
            this.xzr?.ShowInteractionEffect &&
            (ScanComponent_1.EnableLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 显示交互特效", [
                "PbdataId",
                this.Vpr.GetPbDataId(),
              ]),
            this.Qzr()),
          this.Bzr < ScanComponent_1.Fzr &&
            (this.Lzr &&
              (ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 显示额外的特效",
                  ["PbdataId", this.Vpr.GetPbDataId()],
                ),
              this.Xzr()),
            this.Tzr &&
              (ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 显示Icon", [
                  "PbdataId",
                  this.Vpr.GetPbDataId(),
                ]),
              this.$zr()),
            this.Yzr()),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnScanStart,
            this.Pzr.Interval,
          ),
          this.Nzr && this.Nzr?.length > 0 && this.Jzr(),
          this.Vpr.GetBaseInfo()?.ScanFunction?.TraceEffect && this.zzr()));
  }
  Kzr() {
    this.Vpr.IsConcealed &&
      ((this.Vpr.IsConcealed = !1),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnEntityConcealedChange,
        !1,
      ),
      this.xzr?.ScanConcealEffectPath) &&
      this.nXt?.Owner &&
      (ScanComponent_1.EnableLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 播放扫描显形特效", [
          "PbdataId",
          this.Vpr.GetPbDataId(),
        ]),
      EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        this.nXt.Owner.GetTransform(),
        this.xzr.ScanConcealEffectPath,
        "[ScanComponent.CancelEntityConcealState]",
        new EffectContext_1.EffectContext(this.Entity.Id),
      ));
    const t = this.Entity.GetComponent(177);
    t?.HasTag(1227933697) && t.RemoveTag(1227933697);
  }
  Zzr(e, t = !1) {
    let i = !1;
    let n = (0, puerts_1.$ref)(void 0);
    const s = (e.GetAttachedActors(n, !0), (0, puerts_1.$unref)(n));
    if (s && s.Num() > 0)
      for (let t = 0; t < s.Num(); t++) {
        const o = s.Get(t);
        o && (i = this.Zzr(o));
      }
    if (
      e instanceof UE.StaticMeshActor ||
      e instanceof UE.BP_KuroDestructibleActor_C
    ) {
      if (!this.xzr?.ItemMaterialDataPath) return !1;
      this.Rzr++,
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.xzr.ItemMaterialDataPath,
          ItemMaterialControllerActorData_1.default,
          (t) => {
            this.xC
              ? (t =
                  ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
                    t,
                    e,
                  )) !== -1 && this.Dzr.push(t)
              : ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 扫描过程已结束，加载超时",
                  ["pbdataId", this.Vpr.GetPbDataId()],
                );
          },
        );
    } else {
      if (!this.xzr?.ItemMaterialDataPath) return !1;
      if (!e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass()))
        return !1;
      i = !0;
    }
    n = this.xzr?.ItemMaterialDataPath;
    return (
      t &&
        i &&
        n &&
        (this.Entity.GetComponent(2)?.ApplySimpleMaterialEffect(n),
        (this.Qwn = !0),
        this.Rzr++),
      i
    );
  }
  Qzr() {
    const e = this.Entity?.GetComponent(1)?.Owner;
    if (e) {
      const i = "InteractionEffect";
      let t = this.qzr.get(i);
      t && this.Dzr.length > 0
        ? t.Delay(
            this.xzr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS,
            !0,
          )
        : ((this.Rzr = 0),
          this.Zzr(e, !0),
          this.Rzr > 0 &&
            (t && t.Remove(),
            (t = new TimerManageContainer(() => {
              ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 倒计时结束,关闭特效",
                  ["pbdataId", this.Vpr.GetPbDataId()],
                  ["Delay", this.xzr?.InteractionEffectInterval],
                );
              for (const t of this.Dzr)
                ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(
                  t,
                );
              this.Qwn &&
                this.Entity.GetComponent(2)?.RemoveSimpleMaterialEffect(),
                (this.Dzr.length = 0),
                this.qzr.delete(i);
            })).Delay(
              this.xzr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS,
              !0,
            ),
            this.qzr.set(i, t)));
    }
  }
  $zr() {
    for (const e of this.Pzr.ScanInfos)
      if (e.IconPath.length !== 0) {
        const i = "Icon";
        let t = this.qzr.get(i);
        if (!t) {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ScanTrackedStart,
            this.Entity.Id,
            this.Pzr,
          ),
            (t = new TimerManageContainer(() => {
              ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 倒计时结束,触发Icon关闭事件",
                  ["pbdataId", this.Vpr.GetPbDataId()],
                  ["Delay", e.Interval],
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ScanTrackedEnd,
                  this.Entity.Id,
                ),
                this.qzr.delete(i);
            })).Delay(e.Interval * SECONDS_TO_MILLISECONDS, !0),
            this.qzr.set(i, t);
          break;
        }
        t.Delay(e.Interval * SECONDS_TO_MILLISECONDS, !0);
      }
  }
  Yzr() {
    const t = this.xzr?.ScanAudioEvent;
    const e = this.nXt?.Owner;
    t && e && AudioSystem_1.AudioSystem.PostEvent(t, e);
  }
  Xzr() {
    if (this.nXt) {
      const i = this.nXt.Owner;
      if (i)
        for (const o of this.Pzr.ScanInfos)
          if (o.ResourcePath.length !== 0) {
            let t = o.ResourcePath;
            let n = t.indexOf("'");
            n !== -1 && (t = t.substring(n + 1, t.length - 2));
            const a = "Effect_" + o.UId.toString();
            let e = this.qzr.get(a);
            if (e) e.Delay(o.Interval * SECONDS_TO_MILLISECONDS, !0);
            else {
              const r = EffectSystem_1.EffectSystem.SpawnEffect(
                GlobalData_1.GlobalData.World,
                i.GetTransform(),
                t,
                "[ScanComponent.EffectProcess]",
                new EffectContext_1.EffectContext(this.Entity.Id),
              );
              if (EffectSystem_1.EffectSystem.IsValid(r)) {
                n = EffectSystem_1.EffectSystem.GetSureEffectActor(r);
                if (n && n.IsValid()) {
                  n.RootComponent.K2_SetWorldLocation(
                    this.jzr().K2_GetComponentLocation(),
                    !1,
                    void 0,
                    !1,
                  );
                  const s = this.nXt.ActorRotationProxy;
                  s.Set(0, s.Yaw, 0),
                    n.RootComponent.K2_SetWorldRotation(
                      s.ToUeRotator(),
                      !1,
                      void 0,
                      !1,
                    ),
                    (e = new TimerManageContainer(() => {
                      ScanComponent_1.EnableLog &&
                        Log_1.Log.CheckInfo() &&
                        Log_1.Log.Info(
                          "LevelPlay",
                          32,
                          "[ScanComponent] 倒计时结束,关闭额外特效",
                          ["pbdataId", this.Vpr.GetPbDataId()],
                          ["Delay", o.Interval],
                        ),
                        EffectSystem_1.EffectSystem.StopEffectById(
                          r,
                          "[ScanComponent.EffectProcess]",
                          !1,
                        ),
                        this.qzr.delete(a);
                    })).Delay(o.Interval * SECONDS_TO_MILLISECONDS, !0),
                    this.qzr.set(a, e);
                  break;
                }
              }
            }
          }
    }
  }
  zzr() {
    if (this.nXt) {
      const e = this.nXt.Owner;
      if (e) {
        const i = this.Vpr.GetBaseInfo()?.ScanFunction?.TraceEffect;
        var n = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
          i.Target,
        );
        if (n) {
          const o = "TrackEffect";
          let t = this.qzr.get(o);
          if (t) t.Delay(this.Pzr.Interval * SECONDS_TO_MILLISECONDS, !0);
          else {
            var n = n.Entity.GetComponent(1);
            const s = Vector_1.Vector.Create();
            var n =
              (n.ActorLocationProxy.Subtraction(this.nXt.ActorLocationProxy, s),
              s.Normalize(),
              new UE.Rotator());
            s.ToOrientationRotator(n);
            const a = EffectSystem_1.EffectSystem.SpawnEffect(
              GlobalData_1.GlobalData.World,
              e.GetTransform(),
              i.Effect,
              "[ScanComponent.TrackEffectProcess]",
              new EffectContext_1.EffectContext(this.Entity.Id),
            );
            EffectSystem_1.EffectSystem.IsValid(a) &&
              EffectSystem_1.EffectSystem.GetEffectActor(a).K2_SetActorRotation(
                n,
                !1,
              ),
              (t = new TimerManageContainer(() => {
                ScanComponent_1.EnableLog &&
                  Log_1.Log.CheckInfo() &&
                  Log_1.Log.Info(
                    "LevelPlay",
                    32,
                    "[ScanComponent] 倒计时结束,关闭追踪特效",
                    ["pbdataId", this.Vpr.GetPbDataId()],
                    ["Delay", this.Pzr.Interval],
                  ),
                  EffectSystem_1.EffectSystem.IsValid(a) &&
                    EffectSystem_1.EffectSystem.StopEffectById(
                      a,
                      "[ScanComponent.TrackEffectProcess]",
                      !1,
                    ),
                  this.qzr.delete(o);
              })).Delay(this.Pzr.Interval * SECONDS_TO_MILLISECONDS, !0),
              this.qzr.set(o, t);
          }
        } else
          ScanComponent_1.EnableLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelPlay",
              32,
              "[ScanComponent] 追踪特效找不到对应目标Entity",
              ["pbdataId", i?.Target],
            );
      }
    }
  }
  jzr() {
    const t = this.Entity.GetComponent(1)?.Owner;
    const e = t?.GetComponentByClass(UE.StaticMeshComponent.StaticClass());
    return e || t?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
  }
  Wzr() {
    this.Nzr ? (this.Nzr.length = 0) : (this.Nzr = []);
    for (const t of this.Gzr)
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) &&
        this.Nzr.push(t);
  }
  Jzr() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
    const t = "GroupEntityListen";
    const e = this.xzr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS;
    let i = this.qzr.get(t);
    i
      ? i.Delay(e, !0)
      : ((i = new TimerManageContainer(() => {
          ScanComponent_1.EnableLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelPlay",
              32,
              "[ScanComponent] 倒计时结束,移除组监听",
              ["pbdataId", this.Vpr.GetPbDataId()],
              ["Delay", e],
            ),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ),
            this.qzr.delete(t);
        })).Delay(e, !0),
        this.qzr.set(t, i));
  }
});
(ScanComponent.EnableLog = !1),
  (ScanComponent.Fzr = -1),
  (ScanComponent.Vzr = -1),
  (ScanComponent.Hzr = -1),
  (ScanComponent = ScanComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(71)],
      ScanComponent,
    )),
  (exports.ScanComponent = ScanComponent);
// # sourceMappingURL=ScanComponent.js.map
