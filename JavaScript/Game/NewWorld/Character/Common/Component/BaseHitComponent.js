"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var s,
      r = arguments.length,
      a =
        r < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, i, o);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (a = (r < 3 ? s(a) : 3 < r ? s(e, i, a) : s(e, i)) || a);
    return 3 < r && a && Object.defineProperty(e, i, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseHitComponent = exports.OnHitMaterialAction = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Long = require("../../../../../Core/Define/Net/long"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  BattleUiDefine_1 = require("../../../../Module/BattleUi/BattleUiDefine"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage"),
  SceneTeamController_1 = require("../../../../Module/SceneTeam/SceneTeamController"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  WorldGlobal_1 = require("../../../../World/WorldGlobal"),
  BulletTypes_1 = require("../../../Bullet/BulletTypes");
class OnHitMaterialAction {
  constructor(t, e = void 0) {
    (this.Z$s = t),
      (this.vHr = e),
      (this.TDe = void 0),
      (this.vJ = 0),
      (this.mSa = 0),
      (this.eXs = void 0),
      (this.tXs = 0),
      (this.iXs = 0),
      (this.rXs = 0),
      (this.oXs = !1),
      (this.nXs = 0),
      (this.PHo = 0),
      (this.dSa = void 0),
      (this.CSa = void 0),
      (this.aXs = !1),
      (this.FFe = 0),
      (this.kC = (t) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Battle",
            20,
            "OnHitMaterialAction Loop",
            ["Delta", t],
            ["Path", this.eXs],
            ["ElapsedMs", this.tXs],
          ),
          (this.tXs += t * (this.vHr?.CurrentTimeScale ?? 1)),
          !this.oXs && this.IsDelayFinish()
            ? this.S9e(this.dSa, this.CSa)
            : this.oXs &&
              this.r$t() &&
              (this.Stop(),
              this.End(),
              TimerSystem_1.TimerSystem.Remove(this.TDe),
              (this.TDe = void 0));
      });
  }
  get IsPlaying() {
    return this.oXs;
  }
  get BulletId() {
    return this.nXs;
  }
  get AttackerId() {
    return this.PHo;
  }
  IsDelayFinish() {
    return this.tXs >= this.rXs;
  }
  r$t() {
    return this.tXs > this.iXs + this.rXs;
  }
  ComparePriority(t, e) {
    return this.aXs
      ? this.PHo === e
        ? (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Battle", 20, "同一个角色新的更优先"),
          !0)
        : ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity.Id !==
            this.PHo ||
          (Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              20,
              "不同角色，前台角色更优先，如果都不在前台，新的更优先",
            ),
          !1)
      : (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Battle", 20, "当前没有播放就直接播放"),
        !0);
  }
  Start(t, e, i, o, s = void 0) {
    (this.aXs = !0),
      (this.eXs = t),
      (this.iXs = CommonDefine_1.MILLIONSECOND_PER_SECOND),
      (this.rXs = e),
      (this.nXs = i),
      (this.PHo = o),
      (this.oXs = !1),
      (this.dSa = void 0),
      (this.CSa = void 0),
      (this.tXs = 0),
      this.FFe++,
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Battle", 20, "OnHitMaterialAction 行为开始"),
      this.gSa(this.FFe, t, s),
      TimerSystem_1.TimerSystem.Has(this.TDe) ||
        (this.TDe = TimerSystem_1.TimerSystem.Forever(
          this.kC,
          TimerSystem_1.MIN_TIME,
          1,
          void 0,
          "[OnHitMaterial.Loop]",
        ));
  }
  async gSa(t, e, i) {
    var o = new Array(2),
      s = [];
    s.push(this.fSa(e, o, 0)),
      i && s.push(this.fSa(i, o, 1)),
      await Promise.all(s),
      o[0]
        ? t !== this.FFe
          ? Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Battle",
              20,
              "有优先级更高的资源替代了正要播放的材质",
              ["oldPath", e],
              ["newPath", this.eXs],
            )
          : ((s = (i = o[0]).LoopTime),
            (this.iXs =
              BattleUiDefine_1.SECOND_TO_MILLISECOND *
                (s.Start + s.Loop + s.End) +
              this.tXs -
              this.rXs),
            (t = o[1]),
            this.IsDelayFinish()
              ? this.S9e(
                  i,
                  t,
                  "OnHitMaterialAction 加载完已经Delay完成, 直接播放",
                )
              : ((this.dSa = i), (this.CSa = t)))
        : ((this.oXs = !1),
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Battle", 20, "无法找到材质效果", [
              "materialDataPath",
              this.eXs,
            ]));
  }
  async fSa(t, i, o) {
    const s = new CustomPromise_1.CustomPromise();
    return (
      ResourceSystem_1.ResourceSystem.LoadAsync(
        t,
        UE.PD_CharacterControllerData_C,
        (t, e) => {
          (i[o] = t), s.SetResult();
        },
      ),
      s.Promise
    );
  }
  S9e(t, e, i = "OnHitMaterialAction 开始播放") {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        20,
        i,
        ["Path", this.eXs],
        ["Duration", this.iXs],
        ["Asset is null", void 0 === t],
        ["Asset Part is null", void 0 === e],
      ),
      (this.oXs = !0),
      t && (this.vJ = this.Z$s.AddMaterialControllerData(t)),
      e && (this.mSa = this.Z$s.AddMaterialControllerData(e));
  }
  Stop(t = !1) {
    this.vJ &&
      (Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Battle",
          20,
          "OnHitMaterialAction 停止播放",
          ["Path", this.eXs],
          ["Force", t],
          ["Elapsed", this.tXs],
        ),
      this.Z$s.RemoveMaterialControllerData(this.vJ)),
      this.mSa && this.Z$s.RemoveMaterialControllerData(this.mSa),
      (this.vJ = 0),
      (this.mSa = 0),
      (this.dSa = void 0),
      (this.CSa = void 0),
      (this.oXs = !1);
  }
  End() {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug(
        "Battle",
        20,
        "OnHitMaterialAction 行为结束",
        ["Path", this.eXs],
        ["Elapsed", this.tXs],
      ),
      (this.aXs = !1);
  }
}
exports.OnHitMaterialAction = OnHitMaterialAction;
let BaseHitComponent = class BaseHitComponent extends EntityComponent_1.EntityComponent {
  HitRequest(
    t,
    e,
    i,
    o = 0,
    s = !1,
    r = !1,
    a = 0,
    n = void 0,
    l = !1,
    h = void 0,
    _ = void 0,
  ) {
    var m = Protocol_1.Aki.Protocol.I4s.create(),
      u = this.Entity.GetComponent(0).GetCreatureDataId(),
      e =
        ((m.s5n = MathUtils_1.MathUtils.NumberToLong(e)),
        (m.CVn = MathUtils_1.MathUtils.NumberToLong(u)),
        (m.Mjn = Long.fromNumber(i.BulletId)),
        i.HitPosition),
      u =
        ((m.cWn = { X: e.X, Y: e.Y, Z: e.Z }),
        (m.mWn = {
          Pitch: i.HitEffectRotation.Pitch,
          Yaw: i.HitEffectRotation.Yaw,
          Roll: i.HitEffectRotation.Roll,
        }),
        (m.dWn = { X: e.X, Y: e.Y, Z: e.Z }),
        (m.CWn = o),
        (m.gWn = s),
        (m.fWn = r),
        (m.pWn = 1 === a),
        (m.vWn = 2 === a),
        (m.MWn = n),
        void 0 !== i.HitEffect),
      e =
        ((m.SWn = u),
        (m.EWn = i.HitPart?.toString() ?? ""),
        (m.yWn = l),
        t.GetBulletInfo()),
      o =
        ((m.r5n = e.BulletInitParams.SkillId),
        (m.IWn = e.BulletInitParams.Source),
        void 0 !== h && (m.mVn = h),
        Protocol_1.Aki.Protocol.P3n.create());
    (o.TWn = m),
      e.BulletInitParams.SkillContextId &&
        (o.ptc = MathUtils_1.MathUtils.BigIntToLong(
          e.BulletInitParams.SkillContextId,
        )),
      this.lra(o),
      CombatMessage_1.CombatNet.Call(
        20454,
        this.Entity,
        o,
        (t) => {
          _?.(t);
        },
        t?.GetBulletInfo().ContextId,
      );
  }
  lra(t) {
    ModelManager_1.ModelManager.GameModeModel.IsMulti ||
      ((t.TWn.Y8n = 0),
      (t.TWn.CVn = 0),
      (t.TWn.SWn = !1),
      (t.TWn.cWn = void 0),
      (t.TWn.mWn = void 0),
      (t.TWn.zDs = !1),
      (t.TWn.gWn = !1),
      (t.TWn.fWn = !1),
      (t.TWn.MWn = void 0),
      (t.TWn.yWn = !1),
      (t.TWn.EWn = ""),
      (t.TWn.CWn = 0));
  }
  static HitEndRequest(t) {
    var e = Protocol_1.Aki.Protocol.oe_.create();
    CombatMessage_1.CombatNet.Send(16791, t, e);
  }
  static PreHitNotify(t, e) {
    return (
      e.TWn?.SWn &&
        !e.TWn.gWn &&
        (t = t.GetComponent(54)) &&
        !t.PreSwitchRemoteFightState(e.TWn.mVn) &&
        ((e.TWn.gWn = !0), (e.TWn.mVn = 0)),
      !0
    );
  }
  static HitNotify(t, e) {
    var i,
      o,
      s,
      r = MathUtils_1.MathUtils.LongToNumber(e.TWn.s5n),
      a = ModelManager_1.ModelManager.CreatureModel.GetEntity(r);
    a?.Valid
      ? ((a = a.Entity),
        (i = e.TWn.Mjn
          ? MathUtils_1.MathUtils.LongToBigInt(e.TWn.Mjn).toString()
          : ""),
        (o = ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(a, i))
          ? ((o = new BulletTypes_1.HitInformation(
              a,
              t,
              void 0,
              0,
              void 0,
              e.TWn.zDs ?? !1,
              void 0,
              void 0,
              0,
              o,
              i,
              o.Base.DamageId,
            )),
            e.TWn.mWn &&
              o.HitEffectRotation.Set(
                e.TWn.mWn.Pitch,
                e.TWn.mWn.Yaw,
                e.TWn.mWn.Roll,
              ),
            e.TWn.dWn &&
              o.HitPosition.Set(e.TWn.dWn.X, e.TWn.dWn.Y, e.TWn.dWn.Z),
            e.TWn.EWn &&
              (o.HitPart = FNameUtil_1.FNameUtil.GetDynamicFName(e.TWn.EWn)),
            (s = WorldGlobal_1.WorldGlobal.ToUeRotator(e.TWn.MWn)),
            (t = t?.GetComponent(59))?.ReceiveOnHit(
              o,
              a,
              e.TWn.SWn ?? !1,
              e.TWn.yWn ?? !1,
              e.TWn.gWn ?? !1,
              e.TWn.fWn ?? !1,
              e.TWn.pWn ?? !1,
              e.TWn.vWn ?? !1,
              s,
              e.TWn.mVn,
              e.TWn.CWn,
            ),
            t?.BroadcastRemoteEvent(a, e.TWn))
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "World",
              14,
              `[ControllerHolder.CreatureController.HitNotify] 子弹数据不存在;${i}。`,
            ))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "World",
          14,
          "[ControllerHolder.CreatureController.HitNotify] 攻击者为空，不存在动态实体:" +
            r,
        );
  }
  ReceiveOnHit(t, e, i, o, s, r, a, n, l, h, _) {}
  BroadcastEvent(t) {
    var e = EntitySystem_1.EntitySystem.Get(t.Attacker.Id),
      i = EntitySystem_1.EntitySystem.Get(t.BulletEntityId).GetBulletInfo(),
      o = Number(i.BulletInitParams.SkillId),
      s = i.BulletInitParams.SkillContextId,
      r = e?.GetComponent(38),
      s = {
        Attacker: e,
        Target: this.Entity,
        BulletId: t.BulletId,
        HasBeHitAnim: !1,
        BeHitAnim: 0,
        VisionCounterAttackId: 0,
        CounterAttackType: 0,
        SkillId: o,
        SkillHitCount:
          ModelManager_1.ModelManager.CombatMessageModel?.AddSkillHitCount(s),
        BulletHitCount: i.HitNumberAll,
        SkillGenre: r?.GetSkillInfo(o)?.SkillGenre ?? 0,
        BattleFlags: r?.GetSkill(o)?.BattleFlags ?? [],
      };
    e &&
      SceneTeamController_1.SceneTeamController.EmitEvent(
        e,
        EventDefine_1.EEventName.CharHitLocal,
        t,
        s,
      ),
      SceneTeamController_1.SceneTeamController.EmitEvent(
        this.Entity,
        EventDefine_1.EEventName.CharBeHitLocal,
        t,
        s,
      );
  }
  BroadcastRemoteEvent(t, e) {
    var i, o;
    t &&
      e &&
      t &&
      ((i = e.r5n),
      (o = t.GetComponent(38)),
      (e = {
        Attacker: t,
        Target: this.Entity,
        BulletId: MathUtils_1.MathUtils.LongToNumber(e.Mjn),
        HasBeHitAnim: !1,
        BeHitAnim: e.CWn ?? 0,
        VisionCounterAttackId: 0,
        CounterAttackType: e.vWn ? 2 : e.pWn ? 1 : 0,
        SkillId: i,
        SkillHitCount: void 0,
        BulletHitCount: void 0,
        SkillGenre: o?.GetSkillInfo(i)?.SkillGenre ?? 0,
        BattleFlags: o?.GetSkill(i)?.BattleFlags ?? [],
      }),
      SceneTeamController_1.SceneTeamController.EmitEvent(
        t,
        EventDefine_1.EEventName.CharHitRemote,
        e,
      ),
      SceneTeamController_1.SceneTeamController.EmitEvent(
        this.Entity,
        EventDefine_1.EEventName.CharBeHitRemote,
        e,
      ));
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Preprocess("TFn")],
  BaseHitComponent,
  "PreHitNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("TFn", !0)],
    BaseHitComponent,
    "HitNotify",
    null,
  ),
  (BaseHitComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(59)],
    BaseHitComponent,
  )),
  (exports.BaseHitComponent = BaseHitComponent);
//# sourceMappingURL=BaseHitComponent.js.map
