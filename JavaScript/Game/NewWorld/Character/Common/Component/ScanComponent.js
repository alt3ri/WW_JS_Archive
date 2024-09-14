"use strict";
var ScanComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var s,
        o = arguments.length,
        a =
          o < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        a = Reflect.decorate(t, e, i, n);
      else
        for (var r = t.length - 1; 0 <= r; r--)
          (s = t[r]) &&
            (a = (o < 3 ? s(a) : 3 < o ? s(e, i, a) : s(e, i)) || a);
      return 3 < o && a && Object.defineProperty(e, i, a), a;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ScanComponent = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  Global_1 = require("../../../../Global"),
  GlobalData_1 = require("../../../../GlobalData"),
  LevelGamePlayUtils_1 = require("../../../../LevelGamePlay/LevelGamePlayUtils"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ItemMaterialControllerActorData_1 = require("../../../../Render/Scene/Item/MaterialController/ItemMaterialControllerActorData"),
  RoleAudioController_1 = require("../../Role/RoleAudioController"),
  M_TO_CM = 100,
  SECONDS_TO_MILLISECONDS = 1e3;
class TimerManageContainer {
  constructor(t) {
    (this.gzo = void 0),
      (this.TDe = void 0),
      (this.mYi = () => {
        (this.TDe = void 0), this.gzo();
      }),
      (this.gzo = t);
  }
  Delay(t, e = !1) {
    (void 0 !== this.TDe && !e) ||
      (this.Remove(),
      (e = t < TimerSystem_1.MIN_TIME ? TimerSystem_1.MIN_TIME : t),
      (this.TDe = TimerSystem_1.TimerSystem.Delay(this.mYi, e)));
  }
  Remove() {
    return !(
      void 0 === this.TDe ||
      !TimerSystem_1.TimerSystem.Has(this.TDe) ||
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0))
    );
  }
  Stop() {
    this.Remove() && this.mYi();
  }
}
let ScanComponent = (ScanComponent_1 = class ScanComponent extends (
  EntityComponent_1.EntityComponent
) {
  constructor() {
    super(...arguments),
      (this.n$t = void 0),
      (this.Ovr = void 0),
      (this.rzr = void 0),
      (this.nzr = !1),
      (this.szr = !1),
      (this.azr = new Array()),
      (this.jGn = !1),
      (this.hzr = 0),
      (this.lzr = 0),
      (this.xC = !1),
      (this._zr = !1),
      (this.uzr = void 0),
      (this.czr = void 0),
      (this.mzr = !1),
      (this.dzr = 0),
      (this.Czr = !1),
      (this.gzr = new Map()),
      (this.fzr = void 0),
      (this.pzr = void 0),
      (this.vzr = () => {
        this.Czr || ((this.Czr = !0), this.Mzr());
      }),
      (this.zpe = (t, e) => {
        e = ModelManager_1.ModelManager.CreatureModel.GetPbDataIdByEntity(e);
        if (
          e &&
          this.pzr?.includes(e) &&
          (this.pzr.splice(this.pzr.indexOf(e), 1), this.pzr.length <= 0)
        )
          for (const i of this.gzr.values()) i.Stop();
      });
  }
  pie() {
    var t;
    -1 === ScanComponent_1.Ezr &&
      ((t = ConfigManager_1.ConfigManager.LevelGamePlayConfig.ScanMaxDistance),
      (ScanComponent_1.Ezr = t * M_TO_CM * t * M_TO_CM)),
      -1 === ScanComponent_1.Szr &&
        ((t =
          ConfigManager_1.ConfigManager.LevelGamePlayConfig
            .ScanShowInteractionEffectMaxDistance),
        (ScanComponent_1.Szr = t * M_TO_CM * t * M_TO_CM)),
      -1 === ScanComponent_1.yzr &&
        ((t =
          ConfigManager_1.ConfigManager.LevelGamePlayConfig
            .ScanDetectConcealedDistance),
        (ScanComponent_1.yzr = t * M_TO_CM * t * M_TO_CM));
  }
  OnStart() {
    if (
      (this.pie(),
      (this.n$t = this.Entity.GetComponent(1)),
      (this.Ovr = this.Entity.GetComponent(0)),
      (this.rzr = this.Entity.GetComponent(109)),
      this.rzr &&
        this.rzr.SetLogicRange(
          ConfigManager_1.ConfigManager.LevelGamePlayConfig
            .ScanDetectConcealedDistance * M_TO_CM,
        ),
      (this.uzr =
        LevelGamePlayUtils_1.LevelGamePlayUtils.GetScanCompositeResult(
          this.Ovr,
        )),
      (this.czr = this.uzr?.ScanCompositeConfig),
      (this.xC = !1),
      (this._zr = !!this.uzr?.ScanInfos && 0 < this.uzr.ScanInfos.length),
      this._zr)
    ) {
      for (const e of this.uzr.ScanInfos)
        if (
          (0 < e.ResourcePath?.length && (this.szr = !0),
          0 < e.IconPath?.length && (this.nzr = !0),
          this.szr && this.nzr)
        )
          break;
      var t = this.Ovr.GetPbEntityInitData(),
        t = (0, IComponent_1.getComponent)(
          t.ComponentsData,
          "RefreshGroupComponent",
        );
      t && 0 < t.EntityIds.length && (this.fzr = t.EntityIds);
    }
    return (
      this.Ovr.IsConcealed &&
        ((t = this.joo()),
        (this.Czr = t > ScanComponent_1.yzr),
        this.Mzr(),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.vzr,
        ),
        (this.mzr = !0)),
      !0
    );
  }
  OnEnd() {
    for (var [t, e] of this.gzr)
      "InteractionEffect" === t ? e.Remove() : e.Stop();
    return (
      this.gzr.clear(),
      EffectSystem_1.EffectSystem.IsValid(this.lzr) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.lzr,
          "[TimerManageContainer.OnEnd]",
          !1,
        ),
        (this.lzr = 0)),
      this.mzr &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.LeaveLogicRange,
          this.vzr,
        ),
      (this.fzr = void 0),
      !(this.pzr = void 0)
    );
  }
  OnTick(t) {
    var e;
    this.Ovr.IsConcealed &&
      !this.xC &&
      this._zr &&
      this.rzr?.IsInLogicRange &&
      ((e = this.joo()),
      (this.Czr && e <= ScanComponent_1.yzr) ||
        (!this.Czr && e > ScanComponent_1.yzr)) &&
      ((this.Czr = !this.Czr), this.Mzr());
  }
  joo() {
    if (this.n$t && Global_1.Global.BaseCharacter) {
      var t,
        e = Global_1.Global.BaseCharacter.CharacterActorComponent;
      if (e)
        return (
          (t = this.n$t.ActorLocationProxy),
          (e = e.ActorLocationProxy),
          Vector_1.Vector.DistSquared(t, e)
        );
    }
  }
  Mzr() {
    var t, e;
    this.Ovr.IsConcealed &&
      (EffectSystem_1.EffectSystem.IsValid(this.lzr) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.lzr,
          "[TimerManageContainer.ChangeVoicePrintEffect]",
          !1,
        ),
        (this.lzr = 0)),
      (e = this.n$t.Owner)) &&
      (t = this.Czr
        ? this.czr?.FarVoiceEffectPath
        : this.czr?.NearVoiceEffectPath) &&
      ((this.lzr = EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        e.GetTransform(),
        t,
        "[TimerManageContainer.ChangeVoicePrintEffect]",
        new EffectContext_1.EffectContext(this.Entity.Id),
      )),
      EffectSystem_1.EffectSystem.IsValid(this.lzr)) &&
      (e = EffectSystem_1.EffectSystem.GetSureEffectActor(this.lzr)) &&
      e.IsValid() &&
      (e.RootComponent.K2_SetWorldLocation(
        this.Izr().K2_GetComponentLocation(),
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
    var t;
    this._zr &&
      ("TreasureBox" === this.Ovr?.GetPbModelConfig()?.EntityType &&
        (t =
          ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity
            ?.Entity) &&
        RoleAudioController_1.RoleAudioController.PlayRoleAudio(t, 1006),
      (this.dzr = this.joo()),
      this.Ovr.IsConcealed && this.dzr > ScanComponent_1.yzr
        ? ScanComponent_1.EnableLog &&
          Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "LevelPlay",
            32,
            "[ScanComponent] 隐藏物体，超出了取消隐藏的距离",
            ["PbdataId", this.Ovr.GetPbDataId()],
            ["DistanceWithPlayerCm", this.dzr],
            ["ScanDetectConcealedDistanceSquaredCm", ScanComponent_1.yzr],
          )
        : (this.fzr &&
            0 < this.fzr?.length &&
            (this.Tzr(), this.pzr.length <= 0)) ||
          ((this.xC = !0),
          this.Lzr(),
          EffectSystem_1.EffectSystem.IsValid(this.lzr) &&
            (EffectSystem_1.EffectSystem.StopEffectById(
              this.lzr,
              "[TimerManageContainer.StartProcess]",
              !1,
            ),
            (this.lzr = 0)),
          this.dzr < ScanComponent_1.Szr &&
            this.czr?.ShowInteractionEffect &&
            (ScanComponent_1.EnableLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 显示交互特效", [
                "PbdataId",
                this.Ovr.GetPbDataId(),
              ]),
            this.Dzr()),
          this.dzr < ScanComponent_1.Ezr &&
            (this.szr &&
              (ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 显示额外的特效",
                  ["PbdataId", this.Ovr.GetPbDataId()],
                ),
              this.Rzr()),
            this.nzr &&
              (ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 显示Icon", [
                  "PbdataId",
                  this.Ovr.GetPbDataId(),
                ]),
              this.Uzr()),
            this.Azr()),
          EventSystem_1.EventSystem.EmitWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnScanStart,
            this.uzr.Interval,
          ),
          this.pzr && 0 < this.pzr?.length && this.Pzr(),
          this.Ovr.GetBaseInfo()?.ScanFunction?.TraceEffect && this.xzr()));
  }
  Lzr() {
    this.Ovr.IsConcealed &&
      ((this.Ovr.IsConcealed = !1),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.OnEntityConcealedChange,
        !1,
      ),
      this.czr?.ScanConcealEffectPath) &&
      this.n$t?.Owner &&
      (ScanComponent_1.EnableLog &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("LevelPlay", 32, "[ScanComponent] 播放扫描显形特效", [
          "PbdataId",
          this.Ovr.GetPbDataId(),
        ]),
      EffectSystem_1.EffectSystem.SpawnEffect(
        GlobalData_1.GlobalData.World,
        this.n$t.Owner.GetTransform(),
        this.czr.ScanConcealEffectPath,
        "[ScanComponent.CancelEntityConcealState]",
        new EffectContext_1.EffectContext(this.Entity.Id),
      ));
    var t = this.Entity.GetComponent(181);
    t?.HasTag(1227933697) && t.RemoveTag(1227933697);
  }
  wzr(e, t = !1) {
    let i = !1;
    var n = (0, puerts_1.$ref)(void 0),
      s = (e.GetAttachedActors(n, !0), (0, puerts_1.$unref)(n));
    if (s && 0 < s.Num())
      for (let t = 0; t < s.Num(); t++) {
        var o = s.Get(t);
        o && (i = this.wzr(o));
      }
    if (
      e instanceof UE.StaticMeshActor ||
      e instanceof UE.BP_KuroDestructibleActor_C
    ) {
      if (!this.czr?.ItemMaterialDataPath) return !1;
      this.hzr++,
        ResourceSystem_1.ResourceSystem.LoadAsync(
          this.czr.ItemMaterialDataPath,
          ItemMaterialControllerActorData_1.default,
          (t) => {
            this.xC
              ? -1 !==
                  (t =
                    ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
                      t,
                      e,
                    )) && this.azr.push(t)
              : ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 扫描过程已结束，加载超时",
                  ["pbdataId", this.Ovr.GetPbDataId()],
                );
          },
        );
    } else {
      if (!this.czr?.ItemMaterialDataPath) return !1;
      if (!e.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass()))
        return !1;
      i = !0;
    }
    n = this.czr?.ItemMaterialDataPath;
    return (
      t &&
        i &&
        n &&
        (this.Entity.GetComponent(
          172,
        )?.MaterialController?.ApplySimpleMaterialEffect(n),
        (this.jGn = !0),
        this.hzr++),
      i
    );
  }
  Dzr() {
    var e = this.Entity?.GetComponent(1)?.Owner;
    if (e) {
      const i = "InteractionEffect";
      let t = this.gzr.get(i);
      t && 0 < this.azr.length
        ? t.Delay(
            this.czr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS,
            !0,
          )
        : ((this.hzr = 0),
          this.wzr(e, !0),
          0 < this.hzr &&
            (t && t.Remove(),
            (t = new TimerManageContainer(() => {
              ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 倒计时结束,关闭特效",
                  ["pbdataId", this.Ovr.GetPbDataId()],
                  ["Delay", this.czr?.InteractionEffectInterval],
                );
              for (const t of this.azr)
                ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(
                  t,
                );
              this.jGn &&
                this.Entity.GetComponent(
                  172,
                )?.MaterialController?.RemoveSimpleMaterialEffect(),
                (this.azr.length = 0),
                this.gzr.delete(i);
            })).Delay(
              this.czr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS,
              !0,
            ),
            this.gzr.set(i, t)));
    }
  }
  Uzr() {
    for (const e of this.uzr.ScanInfos)
      if (0 !== e.IconPath.length) {
        const i = "Icon";
        let t = this.gzr.get(i);
        if (!t) {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.ScanTrackedStart,
            this.Entity.Id,
            this.uzr,
          ),
            (t = new TimerManageContainer(() => {
              ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 倒计时结束,触发Icon关闭事件",
                  ["pbdataId", this.Ovr.GetPbDataId()],
                  ["Delay", e.Interval],
                ),
                EventSystem_1.EventSystem.Emit(
                  EventDefine_1.EEventName.ScanTrackedEnd,
                  this.Entity.Id,
                ),
                this.gzr.delete(i);
            })).Delay(e.Interval * SECONDS_TO_MILLISECONDS, !0),
            this.gzr.set(i, t);
          break;
        }
        t.Delay(e.Interval * SECONDS_TO_MILLISECONDS, !0);
      }
  }
  Azr() {
    var t = this.czr?.ScanAudioEvent,
      e = this.n$t?.Owner;
    t && e && AudioSystem_1.AudioSystem.PostEvent(t, e);
  }
  Rzr() {
    if (this.n$t) {
      var i = this.n$t.Owner;
      if (i)
        for (const o of this.uzr.ScanInfos)
          if (0 !== o.ResourcePath.length) {
            let t = o.ResourcePath;
            var n = t.indexOf("'");
            -1 !== n && (t = t.substring(n + 1, t.length - 2));
            const a = "Effect_" + o.UId.toString();
            let e = this.gzr.get(a);
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
                    this.Izr().K2_GetComponentLocation(),
                    !1,
                    void 0,
                    !1,
                  );
                  var s = this.n$t.ActorRotationProxy;
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
                          ["pbdataId", this.Ovr.GetPbDataId()],
                          ["Delay", o.Interval],
                        ),
                        EffectSystem_1.EffectSystem.StopEffectById(
                          r,
                          "[ScanComponent.EffectProcess]",
                          !1,
                        ),
                        this.gzr.delete(a);
                    })).Delay(o.Interval * SECONDS_TO_MILLISECONDS, !0),
                    this.gzr.set(a, e);
                  break;
                }
              }
            }
          }
    }
  }
  xzr() {
    if (this.n$t) {
      var i = this.n$t.Owner;
      if (i) {
        var n = this.Ovr.GetBaseInfo()?.ScanFunction?.TraceEffect,
          s = ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(
            n.Target,
          );
        let t = Vector_1.Vector.ZeroVectorProxy;
        t = s
          ? ((s = s.Entity.GetComponent(1)),
            Vector_1.Vector.Create(s.ActorLocationProxy))
          : (ScanComponent_1.EnableLog &&
              Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "LevelPlay",
                32,
                "[ScanComponent] 追踪特效找不到对应目标Entity",
                ["pbdataId", n?.Target],
              ),
            (s =
              ModelManager_1.ModelManager.CreatureModel.GetCompleteEntityData(
                n.Target,
              )),
            Vector_1.Vector.Create(
              s?.Transform?.Pos.X ?? 0,
              s?.Transform?.Pos.Y ?? 0,
              s?.Transform?.Pos.Z ?? 0,
            ));
        const a = "TrackEffect";
        let e = this.gzr.get(a);
        if (e) e.Delay(this.uzr.Interval * SECONDS_TO_MILLISECONDS, !0);
        else {
          var s = Vector_1.Vector.Create(),
            o =
              (t.Subtraction(this.n$t.ActorLocationProxy, s),
              s.Normalize(),
              new UE.Rotator());
          s.ToOrientationRotator(o);
          const r = EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            i.GetTransform(),
            n.Effect,
            "[ScanComponent.TrackEffectProcess]",
            new EffectContext_1.EffectContext(this.Entity.Id),
          );
          EffectSystem_1.EffectSystem.IsValid(r) &&
            EffectSystem_1.EffectSystem.GetEffectActor(r).K2_SetActorRotation(
              o,
              !1,
            ),
            (e = new TimerManageContainer(() => {
              ScanComponent_1.EnableLog &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "LevelPlay",
                  32,
                  "[ScanComponent] 倒计时结束,关闭追踪特效",
                  ["pbdataId", this.Ovr.GetPbDataId()],
                  ["Delay", this.uzr.Interval],
                ),
                EffectSystem_1.EffectSystem.IsValid(r) &&
                  EffectSystem_1.EffectSystem.StopEffectById(
                    r,
                    "[ScanComponent.TrackEffectProcess]",
                    !1,
                  ),
                this.gzr.delete(a);
            })).Delay(this.uzr.Interval * SECONDS_TO_MILLISECONDS, !0),
            this.gzr.set(a, e);
        }
      }
    }
  }
  Izr() {
    var t = this.Entity.GetComponent(1)?.Owner,
      e = t?.GetComponentByClass(UE.StaticMeshComponent.StaticClass());
    return e || t?.GetComponentByClass(UE.SkeletalMeshComponent.StaticClass());
  }
  Tzr() {
    this.pzr ? (this.pzr.length = 0) : (this.pzr = []);
    for (const t of this.fzr)
      ModelManager_1.ModelManager.CreatureModel.GetEntityByPbDataId(t) &&
        this.pzr.push(t);
  }
  Pzr() {
    EventSystem_1.EventSystem.Has(
      EventDefine_1.EEventName.RemoveEntity,
      this.zpe,
    ) ||
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RemoveEntity,
        this.zpe,
      );
    const t = "GroupEntityListen",
      e = this.czr.InteractionEffectInterval * SECONDS_TO_MILLISECONDS;
    let i = this.gzr.get(t);
    i
      ? i.Delay(e, !0)
      : ((i = new TimerManageContainer(() => {
          ScanComponent_1.EnableLog &&
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "LevelPlay",
              32,
              "[ScanComponent] 倒计时结束,移除组监听",
              ["pbdataId", this.Ovr.GetPbDataId()],
              ["Delay", e],
            ),
            EventSystem_1.EventSystem.Remove(
              EventDefine_1.EEventName.RemoveEntity,
              this.zpe,
            ),
            this.gzr.delete(t);
        })).Delay(e, !0),
        this.gzr.set(t, i));
  }
});
(ScanComponent.EnableLog = !1),
  (ScanComponent.Ezr = -1),
  (ScanComponent.Szr = -1),
  (ScanComponent.yzr = -1),
  (ScanComponent = ScanComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(74)],
      ScanComponent,
    )),
  (exports.ScanComponent = ScanComponent);
//# sourceMappingURL=ScanComponent.js.map
