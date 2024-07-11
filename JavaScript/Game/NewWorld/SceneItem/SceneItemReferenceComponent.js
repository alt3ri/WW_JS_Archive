"use strict";
var SceneItemReferenceComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, s) {
      var n,
        o = arguments.length,
        r =
          o < 3
            ? t
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(t, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(e, t, i, s);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (n = e[h]) &&
            (r = (o < 3 ? n(r) : 3 < o ? n(t, i, r) : n(t, i)) || r);
      return 3 < o && r && Object.defineProperty(t, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneItemReferenceComponent =
    exports.TransitStruct =
    exports.AIR_WALL =
      void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Queue_1 = require("../../../Core/Container/Queue"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  GameplayTagUtils_1 = require("../../../Core/Utils/GameplayTagUtils"),
  Quat_1 = require("../../../Core/Utils/Math/Quat"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  TsBaseCharacter_1 = require("../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  EffectContext_1 = require("../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../Effect/EffectSystem"),
  GlobalData_1 = require("../../GlobalData"),
  LevelGeneralContextDefine_1 = require("../../LevelGamePlay/LevelGeneralContextDefine"),
  SimpleLevelSequenceActor_1 = require("../../LevelGamePlay/StaticScene/SimpleLevelSequenceActor"),
  StaticSceneUtils_1 = require("../../LevelGamePlay/StaticScene/StaticSceneUtils"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ReferenceTriggerVolumeLogic_1 = require("../TriggerItems/ReferenceTriggerVolumeLogic"),
  WALL_COMMON_COLLISION_NAME = new UE.FName("InvisibleWallCommon"),
  WALL_HUGE_BOSS_COLLISION_NAME = new UE.FName("InvisibleWallHugeBoss"),
  WALL_ONLY_BULLET_COLLISION_NAME = new UE.FName("InvisibleWallBulletOnly"),
  WALL_ONLY_MONSTER_COLLISION_NAME = new UE.FName("InvisibleWallMonsterOnly"),
  PLANEWIDTH =
    ((exports.AIR_WALL = new UE.FName("AirWall")), new UE.FName("PlaneWidth")),
  CIRCLERADIUS = new UE.FName("CircleRadius"),
  PLANEHEIGHT = new UE.FName("PlaneHeight"),
  DEFAULT_HIT_CD = 1,
  DEFAULT_THICKNESS = 100,
  PATH_LENGTH = 3;
class TransitStruct {
  constructor(e = 0, t = void 0, i = void 0, s = void 0, n = !1, o = void 0) {
    (this.TransitType = 0),
      (this.Duration = void 0),
      (this.TransitFadeIn = void 0),
      (this.TransitFadeOut = void 0),
      (this.IsValid = void 0),
      (this.Mask = void 0),
      (this.TransitType = e),
      (this.Duration = t),
      (this.TransitFadeIn = i),
      (this.TransitFadeOut = s),
      (this.IsValid = n),
      (this.Mask = o);
  }
}
exports.TransitStruct = TransitStruct;
let SceneItemReferenceComponent =
  (SceneItemReferenceComponent_1 = class SceneItemReferenceComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.SIe = void 0),
        (this.Hte = void 0),
        (this.Xte = void 0),
        (this.Lo = void 0),
        (this.CMn = void 0),
        (this.gMn = void 0),
        (this.Usi = !1),
        (this.Lln = void 0),
        (this.fMn = void 0),
        (this.gU = !0),
        (this.pMn = void 0),
        (this.vMn = void 0),
        (this.MMn = new Map()),
        (this.SMn = new Map()),
        (this.EMn = new Map()),
        (this.gme = void 0),
        (this.yMn = void 0),
        (this.IMn = void 0),
        (this.TMn = void 0),
        (this.LMn = void 0),
        (this.DMn = new Queue_1.Queue()),
        (this.UAn = !1),
        (this.RAn = void 0),
        (this.xAn = void 0),
        (this.PAn = void 0),
        (this.RMn = (e) => {
          (this.gU = !1), this.IMn?.clear(), this.wAn();
        }),
        (this.wAn = () => {
          var e;
          this.xAn
            ? this.PAn === this.RAn
              ? ((this.xAn = void 0), (this.PAn = void 0), (this.RAn = void 0))
              : ((e = LevelGeneralContextDefine_1.EntityContext.Create(
                  this.Entity.Id,
                )),
                ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                  this.xAn,
                  e,
                  this.wAn,
                ),
                (this.RAn = this.PAn),
                (this.xAn = void 0),
                (this.PAn = void 0))
            : (this.UAn = !1);
        }),
        (this.qen = () => {
          this.Usi && this.AMn();
        }),
        (this.Oen = () => {
          this.Usi && this.AMn(!0);
        }),
        (this.UMn = (e) => {
          var t = this.CMn.indexOf(e.toString());
          0 <= t &&
            (this.CMn.splice(t, 1),
            this.CMn.length <= 0 && ((this.Usi = !0), this.AMn()),
            this.LMn) &&
            (t = this.Lln.GetActor(e)) instanceof UE.Volume &&
            this.LMn.AddVolume(e.toString(), t);
        }),
        (this.PMn = (e) => {
          this.gMn.has(e.toString()) &&
            (this.CMn.push(e.toString()),
            (this.Usi = !1),
            (this.gU = !0),
            this.fMn && (this.fMn.Clear(), (this.fMn = void 0)),
            this.LMn) &&
            this.LMn.RemoveVolume(e.toString());
        });
    }
    static get Dependencies() {
      return [182, 177];
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemReferenceComponent_1)[0];
      return (this.Lo = e), !0;
    }
    OnInit() {
      return (
        this.Lo.VolumesRef?.length &&
          (this.LMn =
            new ReferenceTriggerVolumeLogic_1.ReferenceTriggerVolumeLogic(
              this.Lo.VolumesRef,
            )),
        !0
      );
    }
    OnStart() {
      return (
        (this.Lln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
          GlobalData_1.GlobalData.World,
          UE.KuroActorSubsystem.StaticClass(),
        )),
        (this.Hte = this.Entity.GetComponent(182)),
        (this.Xte = this.Entity.GetComponent(177)),
        (this.SIe = this.Entity.GetComponent(0)),
        this.xMn(),
        this.wMn(),
        this.Lln.OnAddToSubsystem.Add(this.UMn),
        this.Lln.OnRemoveFromSubsystem.Add(this.PMn),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.qen,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
          this.Oen,
        ),
        !0
      );
    }
    ResetToInitState(e, t) {
      for (const s of this.Lo.ActorRefGroups) {
        var i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(e);
        if (i)
          if (s.EntityState === e)
            return void (0 < s.Actions?.length
              ? (Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "SceneItem",
                    7,
                    "[SceneItemReference]执行初始状态的action",
                    ["entityId", this.Entity.Id],
                    ["state", s.EntityState],
                  ),
                (this.gU = !0),
                (i = LevelGeneralContextDefine_1.EntityContext.Create(
                  this.Entity.Id,
                )),
                ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                  s.Actions,
                  i,
                  t,
                ))
              : t(1));
      }
    }
    xMn() {
      if (
        ((this.CMn = []),
        (this.gMn = new Set()),
        this.Lo.ActorRefGroups.length || this.Lo.VolumesRef?.length)
      ) {
        var e = this.Hte.CreatureData.GetPbDataId(),
          t = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(e);
        if (t) {
          for (const i of t)
            this.CMn.push(i.PathName.split(".")[1] + "." + i.ActorName),
              this.gMn.add(i.PathName.split(".")[1] + "." + i.ActorName);
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              34,
              "实体引用actor路径",
              ["pbDataId", e],
              ["actorList", this.CMn],
            );
        }
      }
    }
    wMn() {
      var e = [];
      for (const i of this.CMn) {
        var t = this.Lln.GetActor(new UE.FName(i));
        t
          ? this.LMn && t instanceof UE.Volume && this.LMn.AddVolume(i, t)
          : e.push(i);
      }
      (this.CMn = e), this.CMn.length <= 0 && ((this.Usi = !0), this.AMn());
    }
    TryReInitRefActor() {
      this.Usi
        ? Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneItem",
            40,
            "尝试重新InitRefActor: 已初始化过，不执行",
            ["pbDataId", this.Hte.CreatureData.GetPbDataId()],
          )
        : (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              40,
              "尝试重新InitRefActor: 开始",
              ["pbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["IsReady", this.Usi],
              ["actorList", this.CMn],
            ),
          this.wMn(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              40,
              "尝试重新InitRefActor: 结束",
              ["pbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["IsReady", this.Usi],
              ["actorList", this.CMn],
            ));
    }
    AMn(e = !1) {
      for (const s of this.Lo.ActorRefGroups) {
        var t,
          i = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(s.EntityState);
        i &&
          this.Xte.HasTag(i) &&
          0 < s.Actions?.length &&
          (!e && 0 < this.DMn.Size && this.DMn.Front === i
            ? this.DMn.Pop()
            : (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "SceneItem",
                  34,
                  "执行对应状态的action",
                  ["entityId", this.Entity.Id],
                  ["state", s.EntityState],
                ),
              (t = LevelGeneralContextDefine_1.EntityContext.Create(
                this.Entity.Id,
              )),
              this.UAn
                ? ((this.xAn = s.Actions), (this.PAn = i))
                : (ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                    s.Actions,
                    t,
                    this.RMn,
                  ),
                  (this.RAn = i),
                  (this.UAn = !0)),
              e && this.DMn.Push(i)));
      }
    }
    OnClear() {
      if (
        (EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.qen,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.qen,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
          this.Oen,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
            this.Oen,
          ),
        this.fMn?.Clear(),
        this.pMn)
      )
        for (const e of this.pMn.values())
          EffectSystem_1.EffectSystem.IsValid(e) &&
            EffectSystem_1.EffectSystem.StopEffectById(
              e,
              "[SceneItemReferenceComponent.OnClear]",
              !1,
            );
      return (
        this.BMn(),
        this.LMn && (this.LMn.Destroy(), (this.LMn = void 0)),
        this.Lln?.IsValid() &&
          (this.Lln.OnAddToSubsystem.Remove(this.UMn),
          this.Lln.OnRemoveFromSubsystem.Remove(this.PMn)),
        !0
      );
    }
    HandleActorMaterial(e) {
      switch (e.Config.Type) {
        case "ChangeMaterialData":
          this.bMn(
            e.Config.MaterialData,
            e.ActorRefs.map((e) => e.PathName),
          );
          break;
        case "ChangeMPC":
          this.qMn(e.Config.MpcData);
      }
    }
    bMn(e, r) {
      e && "None" !== e
        ? r.length
          ? (this.IMn || (this.IMn = new Map()),
            this.TMn || (this.TMn = new Map()),
            ResourceSystem_1.ResourceSystem.LoadAsync(
              e,
              UE.ItemMaterialControllerActorData_C,
              (t) => {
                if (t?.IsValid())
                  for (const n of r) {
                    var i = n.split(".");
                    if (i.length < PATH_LENGTH)
                      Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "LevelEvent",
                          7,
                          "[ReferenceComponent:ChangeMaterial]actor路径错误",
                          ["RefPath", n],
                        );
                    else {
                      (i = new UE.FName(i[1] + "." + i[2])),
                        (i = this.Lln.GetActor(i));
                      if (i?.IsValid()) {
                        if (!this.IMn.get(n)) {
                          this.IMn.set(n, !0);
                          var s = this.TMn.get(n);
                          if (s && s.length) {
                            for (const o of s)
                              ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(
                                o,
                              );
                            (s.length = 0), this.TMn.set(n, s);
                          }
                        }
                        s =
                          ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
                            t,
                            i,
                          );
                        let e = this.TMn.get(n);
                        (e = e || new Array()).push(s), this.TMn.set(n, e);
                      }
                    }
                  }
                else
                  Log_1.Log.CheckError() &&
                    Log_1.Log.Error(
                      "LevelEvent",
                      7,
                      "此LevelEvent只能配置在SceneActorRefComponent中",
                    );
              },
            ))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              7,
              "[ReferenceComponent]目标actor未配置",
            )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            7,
            "[ReferenceComponent]未配置对应MaterialData",
          );
    }
    qMn(e) {
      e && "None" !== e
        ? ResourceSystem_1.ResourceSystem.LoadAsync(
            e,
            UE.ItemMaterialControllerMPCData_C,
            (e) => {
              e?.IsValid() ||
                (Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    7,
                    "此LevelEvent只能配置在SceneActorRefComponent中",
                  )),
                ModelManager_1.ModelManager.RenderModuleModel.UpdateItemMaterialParameterCollection(
                  e,
                );
            },
          )
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneItem",
            7,
            "[ReferenceComponent]未配置对应MPCData",
          );
    }
    HandleSequence(t) {
      (t.LevelSequencePath && "None" !== t.LevelSequencePath) ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Interaction", 7, "LevelSequence"));
      const i = this.gU;
      let e = void 0,
        s = void 0,
        n = void 0;
      (s = t.Intro
        ? 0 === t.Intro?.Type
          ? ((e = t.Intro),
            new TransitStruct(
              0,
              e.Duration && 0 < e.Duration ? e.Duration : 0,
              0,
              0,
              !0,
            ))
          : ((e = t.Intro),
            new TransitStruct(
              1,
              e.Duration && 0 < e.Duration ? e.Duration : 0,
              e.FadeIn && 0 < e.FadeIn.Duration ? e.FadeIn.Duration : 1,
              e.FadeOut && 0 < e.FadeOut.Duration ? e.FadeOut.Duration : 1,
              !0,
              e.Mask,
            ))
        : new TransitStruct(0, 0, 0, 0, !1)),
        (n = t.Outro
          ? 0 === t.Outro?.Type
            ? ((e = t.Outro),
              new TransitStruct(
                0,
                e.Duration && 0 < e.Duration ? e.Duration : 0,
                0,
                0,
                !0,
              ))
            : ((e = t.Outro),
              new TransitStruct(
                1,
                e.Duration && 0 < e.Duration ? e.Duration : 0,
                e.FadeIn && 0 < e.FadeIn.Duration ? e.FadeIn.Duration : 1,
                e.FadeOut && 0 < e.FadeOut.Duration ? e.FadeOut.Duration : 1,
                !0,
                e.Mask,
              ))
          : new TransitStruct(0, 0, 0, 0, !1)),
        ResourceSystem_1.ResourceSystem.LoadAsync(
          t.LevelSequencePath,
          UE.LevelSequence,
          (e) => {
            e?.IsValid()
              ? (this.fMn
                  ? this.fMn.SetSequenceData(e)
                  : (this.fMn = new SimpleLevelSequenceActor_1.default(e)),
                this.fMn.UpdateSettings(t.KeepUI),
                "direct" !== t.PlayMode && "shortestPath" === t.PlayMode
                  ? this.fMn.PlayToMarkByCheckWay(t.Mark, s, n, i)
                  : this.fMn.PlayToMark(t.Mark, s, n, i))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "LevelEvent",
                  7,
                  "此LevelEvent只能配置在SceneActorRefComponent中",
                );
          },
        );
    }
    ForceEnterSeqCamera() {
      return !!this.fMn && this.fMn.ForceSwitchSceneCamera(!0);
    }
    ForceExitSeqCamera() {
      return !!this.fMn && this.fMn.ForceSwitchSceneCamera(!1);
    }
    HandleAirWall(e) {
      let t = !1,
        i = void 0;
      switch ((this.pMn || (this.pMn = new Map()), e.Option.Type)) {
        case IAction_1.EToggleAirWall.Open:
          (t = !0), (i = e.Option);
          break;
        case IAction_1.EToggleAirWall.Close:
      }
      for (const h of e.ActorRefs) {
        var s = h.PathName.split(".");
        if (s.length < PATH_LENGTH)
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "LevelEvent",
              7,
              "[ReferenceComponent:ChangeMaterial]actor路径错误",
              ["RefPath", h],
            );
        else {
          var s = s[1] + "." + s[2],
            n = new UE.FName(s),
            o = this.Lln.GetActor(n);
          if (o?.IsValid() && o instanceof UE.Brush) {
            var r = o.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
            switch (i?.CollisionPreset) {
              case IAction_1.EAirWallCollisionPreset.HugeBoss:
                r.SetCollisionProfileName(WALL_HUGE_BOSS_COLLISION_NAME);
                break;
              case IAction_1.EAirWallCollisionPreset.OnlyBullet:
                r.SetCollisionProfileName(WALL_ONLY_BULLET_COLLISION_NAME);
                break;
              case IAction_1.EAirWallCollisionPreset.OnlyMonster:
                r.SetCollisionProfileName(WALL_ONLY_MONSTER_COLLISION_NAME);
                break;
              default:
                r.SetCollisionProfileName(WALL_COMMON_COLLISION_NAME);
            }
            o.Tags.Add(exports.AIR_WALL),
              o.SetActorEnableCollision(t),
              i
                ? (this.vMn || (this.vMn = new Array()),
                  this.vMn.includes(n) || this.vMn.push(n),
                  this.GMn(s, o, i))
                : t ||
                  (o.OnActorHit.Clear(),
                  (n = this.pMn?.get(s)),
                  EffectSystem_1.EffectSystem.IsValid(n ?? 0) &&
                    EffectSystem_1.EffectSystem.StopEffectById(
                      n,
                      "[SceneItemReferenceComponent.HandleAirWall]",
                      !1,
                    ),
                  this.MMn.delete(o.GetName()),
                  this.SMn.delete(o.GetName()),
                  this.EMn.delete(o.GetName()));
          }
        }
      }
    }
    BMn() {
      if (this.vMn?.length) {
        for (const t of this.vMn) {
          var e = this.Lln.GetActor(t);
          e?.IsValid() && (e.OnActorHit.Clear(), e.SetActorEnableCollision(!1));
        }
        (this.vMn.length = 0),
          this.MMn.clear(),
          this.SMn.clear(),
          this.EMn.clear();
      }
    }
    GMn(r, h, a) {
      var e = a.AirWallEffectData ?? "";
      if (e) {
        const c = h.GetTransform();
        c.SetScale3D(Vector_1.Vector.OneVector),
          EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            c,
            e,
            "[SceneItemReferenceComponent.SpawnAirWallEffect]",
            new EffectContext_1.EffectContext(this.Entity.Id),
            3,
            void 0,
            (e, t) => {
              var i, s, n, o;
              5 !== e
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    7,
                    "[ReferenceComponent:SpawnAirWallEffect]生成空气墙特效失败",
                    ["Result", e],
                    ["PbDataId", this.SIe?.GetPbDataId()],
                  )
                : this.vMn?.length &&
                  h?.IsValid() &&
                  ((e = h.BrushComponent.Bounds),
                  (i = EffectSystem_1.EffectSystem.GetNiagaraComponent(t)),
                  h.SetActorEnableCollision(!1),
                  h.RootComponent.SetMobility(2),
                  h.K2_SetActorRotation(Rotator_1.Rotator.ZeroRotator, !0),
                  (s = new Rotator_1.Rotator(
                    c.Rotator().Pitch,
                    c.Rotator().Yaw,
                    c.Rotator().Roll,
                  )),
                  (o = a.AirWallEffectThickness ?? DEFAULT_THICKNESS),
                  (o = e?.BoxExtent.X - o / 2),
                  (n = a.AirWallEffectHeight ?? 0),
                  i?.SetFloatParameter(PLANEWIDTH, 2 * e?.BoxExtent.X),
                  i?.SetFloatParameter(CIRCLERADIUS, o),
                  n && i?.SetFloatParameter(PLANEHEIGHT, n),
                  e?.BoxExtent.Z &&
                    ((o = Vector_1.Vector.Create(0, 0, -e?.BoxExtent.Z)),
                    EffectSystem_1.EffectSystem.GetEffectActor(
                      t,
                    )?.K2_AddActorWorldOffset(o.ToUeVector(), !1, void 0, !0)),
                  h.K2_SetActorRotation(s.ToUeRotator(), !0),
                  h.RootComponent.SetMobility(0),
                  h.SetActorEnableCollision(!0),
                  this.pMn.set(r, t));
            },
            void 0,
            !1,
            !0,
          );
      }
      e = a.HitEffectData ?? "";
      e &&
        (this.SMn.set(h.GetName(), e),
        this.MMn.set(h.GetName(), a.HitCd || DEFAULT_HIT_CD),
        h.OnActorHit.Add((e, t, i, s) => {
          this.ExecuteHitWall(e, t, i, s);
        }));
    }
    ExecuteHitWall(e, t, i, s) {
      var n, o;
      t?.IsValid() &&
        t instanceof TsBaseCharacter_1.default &&
        void 0 !== (n = this.MMn.get(e.GetName())) &&
        (n <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              7,
              "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行",
            )
          : s.bBlockingHit &&
            (t = t.CharacterActorComponent) &&
            t.CreatureData.GetEntityType() ===
              Protocol_1.Aki.Protocol.HBs.Proto_Player &&
            t.IsWorldOwner() &&
            ((t = TimeUtil_1.TimeUtil.GetServerTime()),
            (void 0 !== (o = this.EMn.get(e.GetName())) && t < o) ||
              (this.EMn.set(e.GetName(), t + n),
              this.gme || (this.gme = Vector_1.Vector.Create(0, 0, 0)),
              this.yMn || (this.yMn = Quat_1.Quat.Create(0, 0, 0, 1)),
              Vector_1.Vector.CrossProduct(
                Vector_1.Vector.ForwardVectorProxy,
                Vector_1.Vector.Create(s.Normal),
                this.gme,
              ),
              this.gme.Normalize(),
              (o = Math.acos(
                Vector_1.Vector.DotProduct(
                  Vector_1.Vector.ForwardVectorProxy,
                  Vector_1.Vector.Create(s.Normal),
                ),
              )),
              Quat_1.Quat.ConstructorByAxisAngle(this.gme, o, this.yMn),
              this.NMn(e, this.yMn.ToUeQuat(), s.ImpactPoint))));
    }
    NMn(e, t, i) {
      (t = new UE.Transform(t, i, Vector_1.Vector.OneVector)),
        (i = this.SMn.get(e.GetName()));
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
        GlobalData_1.GlobalData.World,
        t,
        i,
        "[SceneItemReferenceComponent.ExecuteHitWall]",
      );
    }
    AddOnPlayerOverlapCallback(e) {
      this.LMn?.AddOnPlayerOverlapCallback(e);
    }
    RemoveOnPlayerOverlapCallback(e) {
      this.LMn?.RemoveOnPlayerOverlapCallback(e);
    }
    OnChangeTimeDilation(e) {
      var t = this.Entity.GetComponent(107)?.CurrentTimeScale ?? 1;
      this.fMn?.SetTimeDilation(e * t);
    }
    IsValidPlatFormPath(e) {
      return this.gMn.has(e);
    }
  });
(SceneItemReferenceComponent = SceneItemReferenceComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(147)],
    SceneItemReferenceComponent,
  )),
  (exports.SceneItemReferenceComponent = SceneItemReferenceComponent);
//# sourceMappingURL=SceneItemReferenceComponent.js.map
