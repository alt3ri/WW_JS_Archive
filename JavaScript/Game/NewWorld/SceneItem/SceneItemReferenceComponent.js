"use strict";
var SceneItemReferenceComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, i, s) {
      var o,
        n = arguments.length,
        r =
          n < 3
            ? t
            : null === s
              ? (s = Object.getOwnPropertyDescriptor(t, i))
              : s;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(e, t, i, s);
      else
        for (var h = e.length - 1; 0 <= h; h--)
          (o = e[h]) &&
            (r = (n < 3 ? o(r) : 3 < n ? o(t, i, r) : o(t, i)) || r);
      return 3 < n && r && Object.defineProperty(t, i, r), r;
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
  CharacterNameDefines_1 = require("../Character/Common/CharacterNameDefines"),
  ReferenceTriggerVolumeLogic_1 = require("../TriggerItems/ReferenceTriggerVolumeLogic"),
  DEBUG_DETAIL_KEY_PREFIX = "SceneItemReferenceComponent",
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
  constructor(e = 0, t = void 0, i = void 0, s = void 0, o = !1, n = void 0) {
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
      (this.IsValid = o),
      (this.Mask = n);
  }
}
exports.TransitStruct = TransitStruct;
let SceneItemReferenceComponent =
  (SceneItemReferenceComponent_1 = class SceneItemReferenceComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.EIe = void 0),
        (this.Hte = void 0),
        (this.mBe = void 0),
        (this.Xte = void 0),
        (this.Lo = void 0),
        (this.Qvn = void 0),
        (this.Xvn = void 0),
        (this.Uai = !1),
        (this.aln = void 0),
        (this.$vn = void 0),
        (this.gU = !0),
        (this.x7a = !1),
        (this.P7a = void 0),
        (this.Yvn = void 0),
        (this.Jvn = void 0),
        (this.zvn = new Map()),
        (this.Zvn = new Map()),
        (this.eMn = new Map()),
        (this.gme = void 0),
        (this.tMn = void 0),
        (this.iMn = void 0),
        (this.oMn = void 0),
        (this.rMn = void 0),
        (this.nMn = new Queue_1.Queue()),
        (this.yxn = !1),
        (this.Ixn = void 0),
        (this.Txn = void 0),
        (this.Lxn = void 0),
        (this.w7a = (e) => {
          (this.gU = !1),
            (this.x7a = !0),
            (this.yxn = !1),
            this.iMn?.clear(),
            this.aMn();
        }),
        (this.sMn = (e) => {
          (this.gU = !1), this.iMn?.clear(), this.Dxn();
        }),
        (this.Dxn = () => {
          var e;
          this.Txn
            ? this.Lxn === this.Ixn
              ? ((this.Txn = void 0), (this.Lxn = void 0), (this.Ixn = void 0))
              : ((e = LevelGeneralContextDefine_1.EntityContext.Create(
                  this.Entity.Id,
                )),
                ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                  this.Txn,
                  e,
                  this.Dxn,
                ),
                (this.Ixn = this.Lxn),
                (this.Txn = void 0),
                (this.Lxn = void 0))
            : (this.yxn = !1);
        }),
        (this.den = () => {
          var e;
          this.Uai
            ? this.aMn()
            : ((e = this.EIe.GetPbDataId()),
              ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
                DEBUG_DETAIL_KEY_PREFIX + "_" + e,
              ) &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  40,
                  "[RefComp] [疑难杂症] 实体状态改变，引用的actor未全部加载，继续等待",
                  ["PbDataId", this.EIe?.GetPbDataId()],
                  ["IsReady", this.Uai],
                ));
        }),
        (this.gen = () => {
          var e;
          this.Uai
            ? this.aMn(!0)
            : ((e = this.EIe.GetPbDataId()),
              ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
                DEBUG_DETAIL_KEY_PREFIX + "_" + e,
              ) &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  40,
                  "[RefComp] 实体状态预改变，引用的actor未全部加载，继续等待",
                  ["PbDataId", this.EIe?.GetPbDataId()],
                  ["IsReady", this.Uai],
                ));
        }),
        (this.hMn = (e) => {
          var t = this.Qvn.indexOf(e.toString());
          0 <= t &&
            (this.Qvn.splice(t, 1),
            this.Qvn.length <= 0 && ((this.Uai = !0), this.aMn()),
            (t = this.aln.GetActor(e)),
            this.rMn &&
              t instanceof UE.Volume &&
              this.rMn.AddVolume(e.toString(), t),
            t instanceof UE.StaticMeshActor) &&
            t.Tags.Add(CharacterNameDefines_1.CharacterNameDefines.INVALID_POS);
        }),
        (this.lMn = (e) => {
          this.Xvn.has(e.toString()) &&
            (this.Qvn.push(e.toString()),
            (this.Uai = !1),
            (this.gU = !0),
            this.$vn && (this.$vn.Clear(), (this.$vn = void 0)),
            this.rMn) &&
            this.rMn.RemoveVolume(e.toString());
        }),
        (this.PKs = (e, t, i) => {
          var s,
            o,
            n = this.zvn.get(e.GetName());
          void 0 !== n &&
            (n <= 0
              ? Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "SceneItem",
                  7,
                  "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行",
                )
              : ((s = TimeUtil_1.TimeUtil.GetServerTime()),
                (void 0 !== (o = this.eMn.get(e.GetName())) && s < o) ||
                  (this.eMn.set(e.GetName(), s + n),
                  this.gme || (this.gme = Vector_1.Vector.Create(0, 0, 0)),
                  this.tMn || (this.tMn = Quat_1.Quat.Create(0, 0, 0, 1)),
                  Vector_1.Vector.CrossProduct(
                    Vector_1.Vector.ForwardVectorProxy,
                    Vector_1.Vector.Create(i),
                    this.gme,
                  ),
                  this.gme.Normalize(),
                  (o = Math.acos(
                    Vector_1.Vector.DotProduct(
                      Vector_1.Vector.ForwardVectorProxy,
                      Vector_1.Vector.Create(i),
                    ),
                  )),
                  Quat_1.Quat.ConstructorByAxisAngle(this.gme, o, this.tMn),
                  this.gMn(e, this.tMn.ToUeQuat(), t.ToUeVector()))));
        });
    }
    static get Dependencies() {
      return [187, 181];
    }
    OnInitData(e) {
      e = e.GetParam(SceneItemReferenceComponent_1)[0];
      return (
        (this.Lo = e),
        (this.mBe = this.Entity.CheckGetComponent(120)),
        (this.P7a = this.mBe.StateTagId),
        !0
      );
    }
    OnInit() {
      return (
        this.Lo.VolumesRef?.length &&
          (this.rMn =
            new ReferenceTriggerVolumeLogic_1.ReferenceTriggerVolumeLogic(
              this.Lo.VolumesRef,
            )),
        !0
      );
    }
    OnStart() {
      return (
        (this.aln = UE.KuroRenderingRuntimeBPPluginBPLibrary.GetSubsystem(
          GlobalData_1.GlobalData.World,
          UE.KuroActorSubsystem.StaticClass(),
        )),
        (this.Hte = this.Entity.GetComponent(187)),
        (this.Xte = this.Entity.GetComponent(181)),
        (this.EIe = this.Entity.GetComponent(0)),
        (this.x7a = this.mBe.StateTagId === this.P7a),
        this._Mn(),
        this.uMn(),
        this.aln.OnAddToSubsystem.Add(this.hMn),
        this.aln.OnRemoveFromSubsystem.Add(this.lMn),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.den,
        ),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
          this.gen,
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
    _Mn() {
      if (
        ((this.Qvn = []),
        (this.Xvn = new Set()),
        this.Lo.ActorRefGroups.length || this.Lo.VolumesRef?.length)
      ) {
        var e = this.Hte.CreatureData.GetPbDataId(),
          t = StaticSceneUtils_1.StaticSceneUtils.GetActorRefByPbDataId(e);
        if (t) {
          for (const i of t)
            this.Qvn.push(i.PathName.split(".")[1] + "." + i.ActorName),
              this.Xvn.add(i.PathName.split(".")[1] + "." + i.ActorName);
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              34,
              "实体引用actor路径",
              ["pbDataId", e],
              ["actorList", this.Qvn],
            );
        }
      }
    }
    uMn() {
      var e = [];
      for (const i of this.Qvn) {
        var t = this.aln.GetActor(new UE.FName(i));
        t
          ? this.rMn && t instanceof UE.Volume
            ? this.rMn.AddVolume(i, t)
            : t instanceof UE.StaticMeshActor &&
              t.Tags.Add(
                CharacterNameDefines_1.CharacterNameDefines.INVALID_POS,
              )
          : e.push(i);
      }
      (this.Qvn = e), this.Qvn.length <= 0 && ((this.Uai = !0), this.aMn());
    }
    TryReInitRefActor() {
      this.Uai
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
              ["IsReady", this.Uai],
              ["actorList", this.Qvn],
            ),
          this.uMn(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "SceneItem",
              40,
              "尝试重新InitRefActor: 结束",
              ["pbDataId", this.Hte.CreatureData.GetPbDataId()],
              ["IsReady", this.Uai],
              ["actorList", this.Qvn],
            ));
    }
    aMn(e = !1) {
      var t, i, s, o;
      if (!this.x7a)
        return this.yxn
          ? void 0
          : (t = this.Lo.ActorRefGroups.find((e) => {
                e = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
                  e.EntityState,
                );
                return e && e === this.P7a;
              }))
            ? ((i = LevelGeneralContextDefine_1.EntityContext.Create(
                this.Entity.Id,
              )),
              ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                t.Actions,
                i,
                this.w7a,
              ),
              void (this.yxn = !0))
            : void (this.x7a = !0);
      for (const n of this.Lo.ActorRefGroups)
        0 !== n.Actions?.length &&
          (s = GameplayTagUtils_1.GameplayTagUtils.GetTagIdByName(
            n.EntityState,
          )) &&
          this.Xte.HasTag(s) &&
          (!e && 0 < this.nMn.Size && this.nMn.Front === s
            ? this.nMn.Pop()
            : ((o = this.EIe.GetPbDataId()),
              ModelManager_1.ModelManager.SundryModel?.GetModuleDebugLevel(
                DEBUG_DETAIL_KEY_PREFIX + "_" + o,
              ) &&
                Log_1.Log.CheckInfo() &&
                Log_1.Log.Info(
                  "SceneItem",
                  40,
                  "[RefComp] [疑难杂症] 执行对应状态的action",
                  ["PbDataId", o],
                  ["CreatureDataId", this.EIe?.GetCreatureDataId()],
                  ["EntityId", this.Entity.Id],
                  ["State", n.EntityState],
                  ["IsPrechange", e],
                  ["Actions", n.Actions],
                ),
              (o = LevelGeneralContextDefine_1.EntityContext.Create(
                this.Entity.Id,
              )),
              this.yxn
                ? ((this.Txn = n.Actions), (this.Lxn = s))
                : (ControllerHolder_1.ControllerHolder.LevelGeneralController.ExecuteActionsNew(
                    n.Actions,
                    o,
                    this.sMn,
                  ),
                  (this.Ixn = s),
                  (this.yxn = !0)),
              e && this.nMn.Push(s)));
    }
    OnClear() {
      if (
        (EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStateChange,
          this.den,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStateChange,
            this.den,
          ),
        EventSystem_1.EventSystem.HasWithTarget(
          this.Entity,
          EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
          this.gen,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.OnSceneItemStatePrechangeInSequence,
            this.gen,
          ),
        this.$vn?.Clear(),
        this.Yvn)
      )
        for (const e of this.Yvn.values())
          EffectSystem_1.EffectSystem.IsValid(e) &&
            EffectSystem_1.EffectSystem.StopEffectById(
              e,
              "[SceneItemReferenceComponent.OnClear]",
              !1,
            );
      return (
        this.cMn(),
        this.rMn && (this.rMn.Destroy(), (this.rMn = void 0)),
        this.aln?.IsValid() &&
          (this.aln.OnAddToSubsystem.Remove(this.hMn),
          this.aln.OnRemoveFromSubsystem.Remove(this.lMn)),
        !0
      );
    }
    HandleActorMaterial(e) {
      switch (e.Config.Type) {
        case "ChangeMaterialData":
          this.mMn(
            e.Config.MaterialData,
            e.ActorRefs.map((e) => e.PathName),
          );
          break;
        case "ChangeMPC":
          this.dMn(e.Config.MpcData);
      }
    }
    mMn(e, r) {
      e && "None" !== e
        ? r.length
          ? (this.iMn || (this.iMn = new Map()),
            this.oMn || (this.oMn = new Map()),
            ResourceSystem_1.ResourceSystem.LoadAsync(
              e,
              UE.ItemMaterialControllerActorData_C,
              (t) => {
                if (t?.IsValid())
                  for (const o of r) {
                    var i = o.split(".");
                    if (i.length < PATH_LENGTH)
                      Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "LevelEvent",
                          7,
                          "[ReferenceComponent:ChangeMaterial]actor路径错误",
                          ["RefPath", o],
                        );
                    else {
                      (i = new UE.FName(i[1] + "." + i[2])),
                        (i = this.aln.GetActor(i));
                      if (i?.IsValid()) {
                        if (!this.iMn.get(o)) {
                          this.iMn.set(o, !0);
                          var s = this.oMn.get(o);
                          if (s && s.length) {
                            for (const n of s)
                              ModelManager_1.ModelManager.RenderModuleModel.DisableActorData(
                                n,
                              );
                            (s.length = 0), this.oMn.set(o, s);
                          }
                        }
                        s =
                          ModelManager_1.ModelManager.RenderModuleModel.EnableActorData(
                            t,
                            i,
                          );
                        let e = this.oMn.get(o);
                        (e = e || new Array()).push(s), this.oMn.set(o, e);
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
    dMn(e) {
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
        o = void 0;
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
        (o = t.Outro
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
              ? (this.$vn
                  ? this.$vn.SetSequenceData(e)
                  : (this.$vn = new SimpleLevelSequenceActor_1.default(e)),
                this.$vn.UpdateSettings(t.KeepUI),
                "direct" !== t.PlayMode && "shortestPath" === t.PlayMode
                  ? this.$vn.PlayToMarkByCheckWay(t.Mark, s, o, i)
                  : this.$vn.PlayToMark(t.Mark, s, o, i))
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
      return this.$vn
        ? this.$vn.ForceSwitchSceneCamera(!0)
        : (Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "SceneGameplay",
              46,
              "时间控制装置启动请求:失败，SimpleSequenceActor为空",
            ),
          !1);
    }
    ForceExitSeqCamera() {
      return !!this.$vn && this.$vn.ForceSwitchSceneCamera(!1);
    }
    HandleAirWall(e) {
      let t = !1,
        i = void 0;
      switch ((this.Yvn || (this.Yvn = new Map()), e.Option.Type)) {
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
            o = new UE.FName(s),
            n = this.aln.GetActor(o);
          if (n?.IsValid() && n instanceof UE.Brush) {
            var r = n.GetComponentByClass(UE.PrimitiveComponent.StaticClass());
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
            n.Tags.Add(exports.AIR_WALL),
              n.SetActorEnableCollision(t),
              i
                ? (this.Jvn || (this.Jvn = new Array()),
                  this.Jvn.includes(o) || this.Jvn.push(o),
                  this.CMn(s, n, i))
                : t ||
                  (n.OnActorHit.Clear(),
                  (o = this.Yvn?.get(s)),
                  EffectSystem_1.EffectSystem.IsValid(o ?? 0) &&
                    EffectSystem_1.EffectSystem.StopEffectById(
                      o,
                      "[SceneItemReferenceComponent.HandleAirWall]",
                      !1,
                    ),
                  this.zvn.delete(n.GetName()),
                  this.Zvn.delete(n.GetName()),
                  this.eMn.delete(n.GetName()));
          }
        }
      }
    }
    cMn() {
      if (this.Jvn?.length) {
        for (const t of this.Jvn) {
          var e = this.aln.GetActor(t);
          e?.IsValid() && (e.OnActorHit.Clear(), e.SetActorEnableCollision(!1));
        }
        (this.Jvn.length = 0),
          this.zvn.clear(),
          this.Zvn.clear(),
          this.eMn.clear();
      }
    }
    CMn(r, h, a) {
      var e = a.AirWallEffectData ?? "";
      if (e) {
        const _ = h.GetTransform();
        _.SetScale3D(Vector_1.Vector.OneVector),
          EffectSystem_1.EffectSystem.SpawnEffect(
            GlobalData_1.GlobalData.World,
            _,
            e,
            "[SceneItemReferenceComponent.SpawnAirWallEffect]",
            new EffectContext_1.EffectContext(this.Entity.Id),
            3,
            void 0,
            (e, t) => {
              var i, s, o, n;
              5 !== e
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "LevelEvent",
                    7,
                    "[ReferenceComponent:SpawnAirWallEffect]生成空气墙特效失败",
                    ["Result", e],
                    ["PbDataId", this.EIe?.GetPbDataId()],
                  )
                : this.Jvn?.length &&
                  h?.IsValid() &&
                  ((e = h.BrushComponent.Bounds),
                  (i = EffectSystem_1.EffectSystem.GetNiagaraComponent(t)),
                  h.SetActorEnableCollision(!1),
                  h.RootComponent.SetMobility(2),
                  h.K2_SetActorRotation(Rotator_1.Rotator.ZeroRotator, !0),
                  (s = new Rotator_1.Rotator(
                    _.Rotator().Pitch,
                    _.Rotator().Yaw,
                    _.Rotator().Roll,
                  )),
                  (n = a.AirWallEffectThickness ?? DEFAULT_THICKNESS),
                  (n = e?.BoxExtent.X - n / 2),
                  (o = a.AirWallEffectHeight ?? 0),
                  i?.SetFloatParameter(PLANEWIDTH, 2 * e?.BoxExtent.X),
                  i?.SetFloatParameter(CIRCLERADIUS, n),
                  o && i?.SetFloatParameter(PLANEHEIGHT, o),
                  e?.BoxExtent.Z &&
                    ((n = Vector_1.Vector.Create(0, 0, -e?.BoxExtent.Z)),
                    EffectSystem_1.EffectSystem.GetEffectActor(
                      t,
                    )?.K2_AddActorWorldOffset(n.ToUeVector(), !1, void 0, !0)),
                  h.K2_SetActorRotation(s.ToUeRotator(), !0),
                  h.RootComponent.SetMobility(0),
                  h.SetActorEnableCollision(!0),
                  this.Yvn.set(r, t));
            },
            void 0,
            !1,
            !0,
          );
      }
      e = a.HitEffectData ?? "";
      e &&
        (this.Zvn.set(h.GetName(), e),
        this.zvn.set(h.GetName(), a.HitCd || DEFAULT_HIT_CD),
        h.OnActorHit.Add((e, t, i, s) => {
          this.ExecuteHitWall(e, t, i, s);
        }),
        EventSystem_1.EventSystem.AddWithTarget(
          h,
          EventDefine_1.EEventName.BulletHitAirWall,
          this.PKs,
        ));
    }
    ExecuteHitWall(e, t, i, s) {
      var o, n;
      t?.IsValid() &&
        t instanceof TsBaseCharacter_1.default &&
        void 0 !== (o = this.zvn.get(e.GetName())) &&
        (o <= 0
          ? Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "SceneItem",
              7,
              "[AirWall]hitCd小于0, 短时间内会多次触发，不允许往下执行",
            )
          : s.bBlockingHit &&
            (t = t.CharacterActorComponent) &&
            t.CreatureData.GetEntityType() ===
              Protocol_1.Aki.Protocol.kks.Proto_Player &&
            t.IsWorldOwner() &&
            ((t = TimeUtil_1.TimeUtil.GetServerTime()),
            (void 0 !== (n = this.eMn.get(e.GetName())) && t < n) ||
              (this.eMn.set(e.GetName(), t + o),
              this.gme || (this.gme = Vector_1.Vector.Create(0, 0, 0)),
              this.tMn || (this.tMn = Quat_1.Quat.Create(0, 0, 0, 1)),
              Vector_1.Vector.CrossProduct(
                Vector_1.Vector.ForwardVectorProxy,
                Vector_1.Vector.Create(s.Normal),
                this.gme,
              ),
              this.gme.Normalize(),
              (n = Math.acos(
                Vector_1.Vector.DotProduct(
                  Vector_1.Vector.ForwardVectorProxy,
                  Vector_1.Vector.Create(s.Normal),
                ),
              )),
              Quat_1.Quat.ConstructorByAxisAngle(this.gme, n, this.tMn),
              this.gMn(e, this.tMn.ToUeQuat(), s.ImpactPoint))));
    }
    gMn(e, t, i) {
      (t = new UE.Transform(t, i, Vector_1.Vector.OneVector)),
        (i = this.Zvn.get(e.GetName()));
      EffectSystem_1.EffectSystem.SpawnUnloopedEffect(
        GlobalData_1.GlobalData.World,
        t,
        i,
        "[SceneItemReferenceComponent.ExecuteHitWall]",
      );
    }
    AddOnPlayerOverlapCallback(e) {
      this.rMn?.AddOnPlayerOverlapCallback(e);
    }
    RemoveOnPlayerOverlapCallback(e) {
      this.rMn?.RemoveOnPlayerOverlapCallback(e);
    }
    OnChangeTimeDilation(e) {
      var t = this.Entity.GetComponent(110)?.CurrentTimeScale ?? 1;
      this.$vn?.SetTimeDilation(e * t);
    }
    IsValidPlatFormPath(e) {
      return this.Xvn.has(e);
    }
  });
(SceneItemReferenceComponent = SceneItemReferenceComponent_1 =
  __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(150)],
    SceneItemReferenceComponent,
  )),
  (exports.SceneItemReferenceComponent = SceneItemReferenceComponent);
//# sourceMappingURL=SceneItemReferenceComponent.js.map
