"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, s) {
    var o,
      h = arguments.length,
      n =
        h < 3
          ? e
          : null === s
            ? (s = Object.getOwnPropertyDescriptor(e, i))
            : s;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, i, s);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (o = t[r]) && (n = (h < 3 ? o(n) : 3 < h ? o(e, i, n) : o(e, i)) || n);
    return 3 < h && n && Object.defineProperty(e, i, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MonsterDeathComponent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  Json_1 = require("../../../../../../Core/Common/Json"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../../../GlobalData"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  RenderConfig_1 = require("../../../../../Render/Config/RenderConfig"),
  BaseDeathComponent_1 = require("../../../Common/Component/Abilities/BaseDeathComponent"),
  CharacterUnifiedStateTypes_1 = require("../../../Common/Component/Abilities/CharacterUnifiedStateTypes"),
  DIE_IN_AIE_REMOVE_DELAY = 5e3,
  DEATH_EFFECT_MAX_TIME = 1e4;
let MonsterDeathComponent = class MonsterDeathComponent extends BaseDeathComponent_1.BaseDeathComponent {
  constructor() {
    super(...arguments),
      (this.Xte = void 0),
      (this.sDe = void 0),
      (this.s7r = void 0),
      (this.Nql = 0),
      (this.Fql = -1),
      (this.Vql = 0),
      (this.Hql = void 0),
      (this.jql = void 0),
      (this.z4l = void 0),
      (this.DeathTagTask = void 0),
      (this.DeathTimerTask = void 0),
      (this.OnDeathEnded = () => {
        this.ClearDeathTasks(),
          this.Xte?.Valid &&
            (this.Xte.AddTag(1963731483), this.Xte.AddTag(-208062360)),
          this.Entity.Disable("[DeathComponent.SetActive] 死亡隐藏"),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DropItemStarted,
            this.Entity?.Id,
          ),
          ControllerHolder_1.ControllerHolder.CreatureController.DelayRemoveEntityFinished(
            this.Entity,
          );
      }),
      (this.zpe = () => {
        this.IsDeadInternal || this.Bml();
      }),
      (this.Wql = (t, e) => {
        t === this.Nql &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              67,
              "[MonsterDeathComponent]怪物特殊死亡特效播放结束, 继续执行死亡流程",
              ["handleId", t],
            ),
          e && EffectSystem_1.EffectSystem.RemoveFinishCallback(t, this.Wql),
          this.OnDeathEnded(),
          this.Qql(),
          (this.Nql = -1));
      }),
      (this.Kql = (t, e) => {
        t === this.Fql &&
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              67,
              "[MonsterDeathComponent]怪物特殊死亡材质播放结束, 继续执行死亡流程",
              ["materialId", t],
            ),
          this.OnDeathEnded(),
          this.$ql(),
          this.Qql(),
          (this.Fql = -1),
          (this.Hql = void 0));
      });
  }
  OnInit() {
    return (this.Xte = this.Entity.CheckGetComponent(203)), !0;
  }
  OnStart() {
    var t, e;
    return (
      !!super.OnStart() &&
      (this.Entity.CheckGetComponent(0)?.GetLivingStatus() ===
        Protocol_1.Aki.Protocol.JEs.Proto_Dead && this.ExecuteDeath(void 0),
      (t = this.Entity.GetComponent(1)?.Owner)?.IsValid() &&
        ((t = t.GetComponentByClass(
          UE.KuroRegionDetectComponent.StaticClass(),
        )),
        (e = ModelManager_1.ModelManager.CreatureModel.GetEntityById(
          this.Entity.Id,
        )),
        t) &&
        e &&
        ((this.sDe = e),
        EventSystem_1.EventSystem.AddWithTarget(
          e,
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        )),
      !0)
    );
  }
  OnClear() {
    return (
      this.ClearDeathTasks(),
      this.sDe &&
        (EventSystem_1.EventSystem.HasWithTarget(
          this.sDe,
          EventDefine_1.EEventName.RemoveEntity,
          this.zpe,
        ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.sDe,
            EventDefine_1.EEventName.RemoveEntity,
            this.zpe,
          ),
        (this.sDe = void 0)),
      this.Xql(),
      !0
    );
  }
  ExecuteDeath(t) {
    return (
      !!super.ExecuteDeath(t) &&
      (this.Entity.GetComponent(172)?.RemoveBuffByEffectType(
        36,
        "实体死亡移除冰冻buff",
      ),
      this.Xte.AddTag(1008164187),
      this.Entity.GetComponent(178)?.DetachFromHost(!0, !1, !1),
      this.Entity.GetComponent(39)?.StopAllSkills(
        "MonsterDeathComponent.ExecuteDeath",
      ),
      this.Entity.GetComponent(99)?.ResetCharState(),
      this.Entity.GetComponent(172)?.RemoveAllDurationBuffs(
        "实体死亡清理持续型buff",
      ),
      this.PlayDeathAnimation(t),
      this.Bml(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.CharOnRoleDead,
        this.Entity.Id,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
      ),
      !0)
    );
  }
  PlayDeathAnimation(i) {
    if (
      !ModelManager_1.ModelManager.DeadReviveModel.SkipDeathAnim &&
      !this.Xte?.HasTag(-1943786195) &&
      this.MontageComponent?.Valid &&
      this.Entity.IsInit &&
      this.Entity.Active
    ) {
      var t = this.Entity.GetComponent(0)?.GetMonsterComponent();
      if (t) {
        t = t.PerformConfig?.ShowOnDeath?.EffectId;
        if (t) {
          t =
            ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterDeathEffectConfig(
              t,
            );
          if (t) {
            var e,
              t = Json_1.Json.Parse(t.Data);
            if (t)
              return (
                (e = []),
                t.ParticleEffect && e.push({ Path: t.ParticleEffect }),
                t.MaterialEffect && e.push({ Path: t.MaterialEffect }),
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    67,
                    "[MonsterDeathComponent]怪物特殊死亡特效流程开始",
                  ),
                void this.J4l(e)
              );
          }
        }
      }
      t = this.Entity.GetComponent(99)?.PositionState;
      if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Water)
        this.PlayDeathMontageWithType(1, this.OnDeathEnded, i);
      else {
        if (t === CharacterUnifiedStateTypes_1.ECharPositionState.Air) {
          if (this.Xte?.HasTag(31862857))
            return (
              (this.DeathTagTask = this.Xte.ListenForTagAddOrRemove(
                31862857,
                (t, e) => {
                  e ||
                    (this.HasDeathMontage(3)
                      ? this.PlayDeathMontageWithType(3, this.OnDeathEnded, i)
                      : this.OnDeathEnded());
                },
              )),
              void (this.DeathTimerTask = TimerSystem_1.TimerSystem.Delay(
                this.OnDeathEnded,
                DIE_IN_AIE_REMOVE_DELAY,
              ))
            );
          if (this.HasDeathMontage(2))
            return void this.PlayDeathMontageWithType(2, this.OnDeathEnded, i);
        } else if (
          t === CharacterUnifiedStateTypes_1.ECharPositionState.Ground &&
          this.HasDeathMontage(0)
        )
          return void this.PlayDeathMontageWithType(0, this.OnDeathEnded, i);
        this.OnDeathEnded();
      }
    } else this.OnDeathEnded();
  }
  ClearDeathTasks() {
    this.s7r?.EndTask(),
      (this.s7r = void 0),
      this.DeathTagTask?.EndTask(),
      (this.DeathTagTask = void 0),
      this.DeathTimerTask?.Remove(),
      (this.DeathTimerTask = void 0);
  }
  Bml() {
    var t = this.Entity.GetComponent(1)?.Owner;
    t?.IsValid() &&
      (t = t.GetComponentByClass(UE.KuroRegionDetectComponent.StaticClass())) &&
      t.ResetEventTargets();
  }
  async J4l(t) {
    var e = [];
    for (const o of t) e.push(this.Yql(o));
    await Promise.all(e);
    let i = !1,
      s = !1;
    if (this.z4l) {
      this.z4l.sort((t, e) => e.CallbackPriority - t.CallbackPriority);
      for (const h of this.z4l)
        h.DataAsset instanceof UE.EffectModelGroup_C
          ? (i = this.Jql(h.Path, h.DataAsset, h.NeedCallback && !s) || i)
          : h.DataAsset instanceof UE.PD_CharacterControllerData_C ||
              h.DataAsset instanceof UE.PD_CharacterControllerDataGroup_C
            ? (i = this.Zql(h.Path, h.DataAsset, h.NeedCallback && !s) || i)
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Battle",
                67,
                "[MonsterDeathComponent]怪物特殊死亡特效播放失败, 请检查资源类型",
                ["path", h.Path],
                ["type", typeof h.DataAsset],
              ),
          i && h.NeedCallback && (s = !0);
    }
    i ? (this.eGl(), this.tGl()) : this.OnDeathEnded();
  }
  async Yql(s) {
    const t = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(s.Path, UE.Object, (i) => {
        if (i) {
          let t = 0,
            e = !1;
          this.z4l || (this.z4l = []),
            i instanceof UE.EffectModelGroup_C
              ? ((t = 2), 0 < i.StartTime && 0 === i.LoopTime && (e = !0))
              : i instanceof UE.PD_CharacterControllerData_C &&
                ((t = 1), 0 === i.DataType) &&
                (e = !0),
            this.z4l.push({
              Path: s.Path,
              DataAsset: i,
              CallbackPriority: t,
              NeedCallback: e,
            });
        } else
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              67,
              "[MonsterDeathComponent]怪物特殊死亡特效加载失败, 请检查资源路径",
              ["path", s.Path],
            );
        t.SetResult();
      }),
      t.Promise
    );
  }
  Jql(t, e, i) {
    var s = this.Entity.GetComponent(3),
      o = s?.Owner,
      h = new EffectContext_1.EffectContext(),
      o =
        ((h.SourceObject = o),
        (h.EntityId = this.Entity.Id),
        EffectSystem_1.EffectSystem.SpawnEffect(
          GlobalData_1.GlobalData.World,
          o?.D_GetTransform(),
          t,
          "[MonsterDeathComponent.PlayDeathEffect]",
          h,
          0,
        ));
    return 0 !== o
      ? (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            67,
            "[MonsterDeathComponent]怪物特殊死亡特效开始播放",
            ["handleId", o],
          ),
        EffectSystem_1.EffectSystem.GetEffectActor(o).K2_AttachToComponent(
          s?.SkeletalMesh,
          RenderConfig_1.RenderConfig.RootName,
          2,
          1,
          1,
          !1,
        ),
        (this.Nql = o),
        i && EffectSystem_1.EffectSystem.AddFinishCallback(o, this.Wql),
        !0)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            67,
            "[MonsterDeathComponent]怪物特殊死亡特效播放失败, 请检查特效参数",
            ["path", t],
          ),
        !1);
  }
  Zql(e, i, s) {
    var o = this.Entity.GetComponent(3)?.Actor.CharRenderingComponent;
    if (o) {
      this.Hql = o;
      let t = -1;
      if (
        (i instanceof UE.PD_CharacterControllerData_C
          ? ((t = o.AddMaterialControllerData(i)),
            s &&
              (0 === i.DataType
                ? this.iGl(1) ||
                  (Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Battle",
                      67,
                      "[MonsterDeathComponent]怪物特殊死亡材质设置回调失败",
                      ["path", e],
                    ))
                : Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Battle",
                    67,
                    "[MonsterDeathComponent]怪物特殊死亡材质只支持Timeline类型",
                    ["path", e],
                    ["dataType", i.DataType],
                  )))
          : i instanceof UE.PD_CharacterControllerDataGroup_C &&
            ((t = o.AddMaterialControllerDataGroup(i)), s) &&
            this.iGl(2),
        -1 !== t)
      )
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              67,
              "[MonsterDeathComponent]怪物特殊死亡材质开始播放",
              ["materialId", t],
            ),
          (this.Fql = t),
          !0
        );
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          67,
          "[MonsterDeathComponent]怪物特殊死亡材质播放失败, 请检查资源类型",
          ["path", e],
          ["type", typeof i],
        );
    } else this.OnDeathEnded();
    return !1;
  }
  iGl(t) {
    if (this.Hql)
      if (1 === t) {
        var e = this.Hql.GetComponent(
          RenderConfig_1.RenderConfig.IdMaterialContainerV2,
        );
        if (e) return e.AddEffectFinishCallback(this.Kql), (this.Vql = 1), !0;
      } else if (2 === t)
        return (
          EventSystem_1.EventSystem.AddWithTarget(
            this.Hql,
            EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
            this.Kql,
          ),
          (this.Vql = 2),
          !0
        );
    return (this.Vql = 0), !1;
  }
  $ql() {
    var t;
    this.Hql &&
      (1 === this.Vql
        ? (t = this.Hql.GetComponent(
            RenderConfig_1.RenderConfig.IdMaterialContainerV2,
          )) && t.RemoveEffectFinishCallback(this.Kql)
        : 2 === this.Vql &&
          EventSystem_1.EventSystem.HasWithTarget(
            this.Hql,
            EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
            this.Kql,
          ) &&
          EventSystem_1.EventSystem.RemoveWithTarget(
            this.Hql,
            EventDefine_1.EEventName.OnRemoveMaterialControllerGroup,
            this.Kql,
          )),
      (this.Vql = 0);
  }
  eGl() {
    var t = this.Entity.GetComponent(120);
    t && t.SetTimeScale(100, 0, void 0, DEATH_EFFECT_MAX_TIME, 12);
  }
  tGl() {
    this.Qql(),
      (this.jql = TimerSystem_1.TimerSystem.Delay(() => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            67,
            "[MonsterDeathComponent]怪物特殊死亡特效播放超时, 执行保底逻辑, 请检查特效参数",
            ["handleId", this.Nql],
            ["materialId", this.Fql],
          ),
          (this.jql = void 0),
          0 !== this.Nql
            ? this.Wql(this.Nql, !0)
            : -1 !== this.Fql
              ? this.Kql(this.Fql, !0)
              : this.OnDeathEnded();
      }, DEATH_EFFECT_MAX_TIME));
  }
  Qql() {
    this.jql &&
      (TimerSystem_1.TimerSystem.Remove(this.jql), (this.jql = void 0));
  }
  Xql() {
    this.Qql(),
      0 !== this.Vql && this.$ql(),
      0 !== this.Nql &&
        EffectSystem_1.EffectSystem.RemoveFinishCallback(this.Nql, this.Wql),
      (this.z4l = void 0),
      (this.Hql = void 0),
      (this.Nql = 0),
      (this.Fql = -1);
  }
};
(MonsterDeathComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(181)],
  MonsterDeathComponent,
)),
  (exports.MonsterDeathComponent = MonsterDeathComponent);
//# sourceMappingURL=MonsterDeathComponent.js.map
