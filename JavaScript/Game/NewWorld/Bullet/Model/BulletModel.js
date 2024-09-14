"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletPersistentTimeScale =
    exports.BulletModel =
    exports.BulletInitParams =
      void 0);
const UE = require("ue"),
  Info_1 = require("../../../../Core/Common/Info"),
  Log_1 = require("../../../../Core/Common/Log"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  Time_1 = require("../../../../Core/Common/Time"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  ModelBase_1 = require("../../../../Core/Framework/ModelBase"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  StatDefine_1 = require("../../../Common/StatDefine"),
  EffectSystem_1 = require("../../../Effect/EffectSystem"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  BulletActorPool_1 = require("../BulletActorPool"),
  BulletConstant_1 = require("../BulletConstant"),
  BulletController_1 = require("../BulletController"),
  BulletUtil_1 = require("../BulletUtil"),
  BulletMoveInfo_1 = require("./BulletMoveInfo"),
  BulletPool_1 = require("./BulletPool"),
  BulletTraceElementPool_1 = require("./BulletTraceElementPool");
class BulletInitParams {
  constructor(
    t,
    e,
    l,
    i,
    s = 0,
    o = 0,
    r = 0,
    n = 0,
    u = 0,
    h = void 0,
    a = !1,
    _ = 0,
    B = void 0,
    d = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
    v = void 0,
    c = void 0,
    f = -1,
  ) {
    (this.Owner = t),
      (this.BulletRowName = e),
      (this.InitialTransform = l),
      (this.InitTargetLocation = i),
      (this.SkillId = s),
      (this.ParentId = o),
      (this.TargetId = r),
      (this.BaseTransformId = n),
      (this.BaseVelocityId = u),
      (this.Size = h),
      (this.FromRemote = a),
      (this.SyncType = _),
      (this.ContextId = B),
      (this.Source = d),
      (this.LocationOffset = v),
      (this.BeginRotatorOffset = c),
      (this.DtType = f);
  }
}
exports.BulletInitParams = BulletInitParams;
class BulletModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ZHo = new Map()),
      (this.ejo = new Array()),
      (this.tjo = new Map()),
      (this.ijo = new Set()),
      (this.ojo = void 0),
      (this.Y$s = 0),
      (this.jva = !0),
      (this.nye = () => {
        BulletModel.rjo.Start(),
          ConfigManager_1.ConfigManager.BulletConfig.PreloadCommonBulletData(),
          BulletActorPool_1.BulletActorPool.Preload(),
          BulletModel.rjo.Stop();
      }),
      (this.njo = new Map()),
      (this.sjo = (t) => {
        this.njo.set(t.BulletEntityId, !0);
      }),
      (this.ajo = new Map()),
      (this.hjo = new Map()),
      (this.ljo = new Map()),
      (this._jo = new Map()),
      (this.ujo = new Map()),
      (this.SelfAdaptBeHitAnim = void 0),
      (this.HeavyHitAnim = void 0),
      (this.Index2LightHitAnimMap = void 0),
      (this.Index2HeavyHitAnimMap = void 0),
      (this.cjo = new Set()),
      (this.mjo = !1),
      (this.djo = () => {
        this.mjo = !0;
        for (const t of this.cjo) this.DestroyBullet(t, !1, 0);
        this.c5a(!0), this.cjo.clear();
      }),
      (this.Cjo = () => {
        this.c5a(!1), (this.mjo = !1);
      }),
      (this.PersistentTimeScaleMap = new Map()),
      (this.PersistentTimeScaleId = 0),
      (this.Jaa = 0),
      (this.IsSceneBulletOwnerCreated = !1),
      (this.ala = void 0);
  }
  GetBulletEntityMap() {
    return this.ZHo;
  }
  GetBulletEntityById(t) {
    return this.ZHo.get(t);
  }
  GetBulletSetByAttacker(t) {
    return this.tjo.get(t);
  }
  GetAttackerBulletIterator() {
    return this.tjo.values();
  }
  get OnHitMaterialMsDelay() {
    return this.Y$s;
  }
  get OpenHitMaterial() {
    return this.jva;
  }
  set OpenHitMaterial(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Bullet", 21, "Set Bullet Func OpenHitMaterial", [
        "val",
        t,
      ]),
      (this.jva = t);
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet",
      UE.BulletCommonDataAsset_C,
      (t) => {
        (this.ojo = t),
          (this.Y$s =
            t.OnHitMaterialDelay * MathUtils_1.MathUtils.SecondToMillisecond);
      },
    ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Bullet", 5, "BulletManagerTs Init Finish");
    for (let t = 0; t < 20; t++) this.ejo.push(new Set());
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.djo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Cjo,
      ),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.BulletHit,
          this.sjo,
        ),
      this.gjo(),
      !0
    );
  }
  IsBulletHit(t) {
    return this.njo.get(t) ?? !1;
  }
  OnLeaveLevel() {
    for (const t of this.ZHo.values())
      BulletPool_1.BulletPool.RecycleBulletEntity(t);
    this.ZHo.clear();
    for (const e of this.tjo.values()) e.clear(), this.ejo.push(e);
    return (
      this.tjo.clear(),
      this.ajo.clear(),
      this.hjo.clear(),
      BulletActorPool_1.BulletActorPool.Clear(),
      BulletTraceElementPool_1.BulletTraceElementPool.Clear(),
      (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace = void 0),
      this.fjo(),
      (this.SceneBulletOwnerId = 0),
      this.hla(),
      !0
    );
  }
  OnClear() {
    return (
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.djo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.Cjo,
      ),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.BulletHit,
          this.sjo,
        ),
      (BulletModel.DefaultBulletSceneInteraction = void 0),
      (this.ojo = void 0),
      BulletActorPool_1.BulletActorPool.Clear(),
      BulletTraceElementPool_1.BulletTraceElementPool.Clear(),
      this.ljo.clear(),
      (this.ejo.length = 0),
      this.pjo(),
      (this.SceneBulletOwnerId = 0),
      this.hla(),
      !0
    );
  }
  CreateBullet(
    t,
    e,
    l,
    i,
    s = 0,
    o,
    r = !1,
    n = 0,
    u,
    h,
    a,
    _,
    B = 0,
    d = void 0,
    v = Protocol_1.Aki.Protocol.E4s.Proto_NormalSource,
    c = void 0,
    f = void 0,
    m = -1,
    y = void 0,
    g = void 0,
  ) {
    var M = this.vjo(e);
    if (!this.mjo || !M)
      if (t?.Valid) {
        _ =
          _ ??
          ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(t, e, !0, m);
        if (_) {
          if (!r) {
            var S = t.GetComponent(190),
              E = _.Base.BornForbidTagIds;
            if (E)
              for (const C of E)
                if (S.HasTag(C))
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Bullet",
                      18,
                      "BulletModel.InitBullet 中止，攻击者存在该子弹禁止生成Tag ",
                      ["子弹名称:", e],
                    )
                  );
            E = _.Base.BornRequireTagIds;
            if (E)
              for (const I of E)
                if (!S.HasTag(I))
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Bullet",
                      18,
                      "BulletModel.InitBullet 中止，攻击者不存在该子弹生成所需Tag",
                      ["子弹名称:", e],
                    )
                  );
          }
          (E = new BulletInitParams(
            t,
            e,
            l,
            i,
            s,
            o,
            n,
            3 !== _.Base.BornPositionStandard &&
            2 !== _.Base.BornPositionStandard
              ? u
              : 0,
            h,
            a,
            r,
            B,
            d,
            v,
            c,
            f,
            m,
          )),
            (l =
              (BulletModel.Mjo.Start(),
              BulletPool_1.BulletPool.CreateBulletEntity()));
          if (l?.Valid)
            return (
              BulletConstant_1.BulletConstant.OpenCreateLog &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  18,
                  "创建子弹",
                  ["BulletId", e],
                  ["EntityId", l.Id],
                ),
              (i = l.GetBulletInfo()),
              r &&
                (y && i.RandomPosOffset.FromUeVector(y), g) &&
                i.RandomInitSpeedOffset.FromUeVector(g),
              i.Init(E, _),
              i.InitEntity(l),
              this.ZHo.set(l.Id, l),
              (s = i.AttackerId),
              (
                this.tjo.get(s) ||
                ((o = this.ejo.pop() ?? new Set()), this.tjo.set(s, o), o)
              ).add(l),
              EntitySystem_1.EntitySystem.Start(l),
              EntitySystem_1.EntitySystem.Activate(l),
              BulletModel.Mjo.Stop(),
              BulletController_1.BulletController.AddSimpleAction(i, 1),
              M && this.cjo.add(l.Id),
              l
            );
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              5,
              "BulletModel.InitBullet error, 子弹创建 失败!",
              ["子弹创建者:", t.GetComponent(1)?.Owner.GetName()],
              ["子弹名称:", e],
            ),
            BulletModel.Mjo.Stop();
        }
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Bullet",
            5,
            "BulletModel.InitBullet 中止，攻击者已不存在",
            ["子弹名称:", e],
          );
  }
  DestroyBullet(t, e, l = 0) {
    var i,
      s,
      o = this.ZHo.get(t);
    !o ||
      (o = o.GetBulletInfo()).NeedDestroy ||
      ((o.NeedDestroy = !0),
      BulletConstant_1.BulletConstant.OpenCreateLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          18,
          "销毁子弹开始",
          ["BulletId", o.BulletRowName],
          ["EntityId", o.BulletEntityId],
        ),
      (i = o.BulletRowName),
      StatDefine_1.BATTLESTAT_ENABLED &&
        BulletController_1.BulletController.GetBulletDestroyStat(i).Start(),
      ((s =
        BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
          13,
        )).SummonChild = e),
      (s.DestroyReason = l),
      this.ijo.add(t),
      BulletController_1.BulletController.GetActionRunner().AddAction(o, s),
      StatDefine_1.BATTLESTAT_ENABLED &&
        BulletController_1.BulletController.GetBulletDestroyStat(i).Stop());
  }
  DestroyAllBullet(t = !1) {
    for (var [e] of this.ZHo) this.DestroyBullet(e, t, 0);
  }
  ClearDestroyedBullets() {
    BulletModel.Ejo.Start();
    for (const s of this.ijo) {
      var t,
        e,
        l,
        i = this.ZHo.get(s);
      i &&
        ((l = (t = i.GetBulletInfo()).AttackerId),
        (e = this.tjo.get(l))
          ? (e.delete(i), e.size || (this.tjo.delete(l), this.ejo.push(e)))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Bullet",
              5,
              "BulletModel.DestroyBullet Warn, 获取被销毁子弹所在集合 失败！ ",
              ["子弹创建者Id:", l],
              ["子弹:", i],
            ),
        (e = this.GetBulletHandleById(s)) &&
          (((l = Protocol_1.Aki.Protocol.A3n.create()).uVn = e),
          CombatMessage_1.CombatNet.Call(20656, t.Attacker, l),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              20,
              "删除子弹Request",
              ["handleId", e?.cVn],
              ["playerId", e?.W5n],
            ),
          this.DeregisterBullet(e)),
        BulletConstant_1.BulletConstant.OpenCreateLog &&
          Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Bullet",
            18,
            "销毁子弹完成",
            ["BulletId", t.BulletRowName],
            ["EntityId", t.BulletEntityId],
          ),
        this.ZHo.delete(s),
        BulletModel.Sjo.Start(),
        BulletPool_1.BulletPool.RecycleBulletEntity(i),
        BulletModel.Sjo.Stop());
    }
    this.ijo.clear(), BulletModel.Ejo.Stop();
  }
  GetFastMoveTrace(t, e) {
    switch (t) {
      case "Bullet_Type1":
        return this.ojo.FastMoveTraceBullet_Type1;
      case "Bullet_Type2":
        return this.ojo.FastMoveTraceBullet_Type2;
      case "Bullet_Type3":
        return this.ojo.FastMoveTraceBullet_Type3;
      case "Bullet_Type1_Special":
        return this.ojo.FastMoveTraceBullet_Type1_Special;
      case "Bullet_Type2_Special":
        return this.ojo.FastMoveTraceBullet_Type2_Special;
      case "Bullet_OnlyBullet":
        return this.ojo.FastMoveTraceBullet_Only_Bullet;
    }
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Bullet",
        21,
        "找不到快速移动对应的检测类型配置",
        ["bulletRowName", e],
        ["profileName", t],
      );
  }
  get ObjectTypeTakeAim() {
    return this.ojo.TakeAim;
  }
  get ObjectTypeObstacles() {
    return this.ojo.Obstacles;
  }
  get ObjectTypeHitPoint() {
    return this.ojo.HitPoint;
  }
  RegisterBullet(t, e) {
    var l, i;
    t &&
      (({ W5n: l, cVn: i } = t),
      this.hjo.set(e, t),
      this.ajo.has(l) || this.ajo.set(l, new Map()),
      this.ajo.get(l).set(i, e));
  }
  DeregisterBullet(t) {
    var e, l;
    t &&
      ((e = this.GetIdByBulletHandle(t)),
      this.hjo.has(e) && this.hjo.delete(e),
      this.ajo.has(t.W5n)) &&
      (({ W5n: e, cVn: t } = t),
      (l = this.ajo.get(e)).delete(t),
      l.size <= 0) &&
      this.ajo.delete(e);
  }
  GetIdByBulletHandle(t) {
    var e;
    return t ? (({ W5n: t, cVn: e } = t), this.ajo.get(t)?.get(e) ?? 0) : 0;
  }
  GetBulletHandleById(t) {
    return this.hjo.get(t);
  }
  DestroyBulletRemote(t, e) {
    var l;
    t &&
      this.ajo.has(t.W5n) &&
      0 !== (l = this.GetIdByBulletHandle(t)) &&
      (this.DeregisterBullet(t), this.DestroyBullet(l, e, 2));
  }
  NewTraceElement(t, e, l, i = 0) {
    var s = UE.NewObject(t);
    if (((s.WorldContextObject = GlobalData_1.GlobalData.World), e))
      for (let t = 0; t < e.Num(); t++) {
        var o = e.Get(t);
        l?.has(o) || s.AddObjectTypeQuery(o);
      }
    return (s.bTraceComplex = !1), (s.bIgnoreSelf = !0), s;
  }
  GetEntityIdByCustomKey(t, e, l) {
    (e = e.concat(t.toString())), (t = this.ljo.get(e));
    return (
      t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Bullet",
          21,
          "获取自定义目标失败",
          ["Bullet", l],
          ["Key", e],
          ["Entity", t],
        ),
      0)
    );
  }
  SetEntityIdByCustomKey(t, e, l) {
    e = e.concat(t.toString());
    this.ljo.set(e, l),
      l ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Bullet",
            21,
            "设置自定义目标失败",
            ["Key", e],
            ["Entity", l],
          ));
  }
  ShowBulletCollision(t = 0) {
    return this._jo.has(t) && (this._jo.get(t) ?? !1);
  }
  ShowBulletTrace(t = 0) {
    return this.ujo.has(t) && (this.ujo.get(t) ?? !1);
  }
  SetBulletCollisionDraw(t, e) {
    this._jo.set(t, e);
  }
  SetBulletTraceDraw(t, e) {
    this.ujo.set(t, e);
  }
  gjo() {
    (this.SelfAdaptBeHitAnim = new Set([0, 1, 2, 3, 8, 9, 10, 11])),
      (this.HeavyHitAnim = new Set([2, 3, 10, 11])),
      (this.Index2LightHitAnimMap = [8, 1, 9, 0]),
      (this.Index2HeavyHitAnimMap = [10, 3, 11, 2]);
  }
  pjo() {
    (this.SelfAdaptBeHitAnim = void 0),
      (this.HeavyHitAnim = void 0),
      (this.Index2LightHitAnimMap = void 0),
      (this.Index2HeavyHitAnimMap = void 0);
  }
  vjo(t) {
    return "310000001" === t;
  }
  SetAllBulletTimeScale(t, e, l, i, s, o, r) {
    this.PersistentTimeScaleId--;
    var n = this.PersistentTimeScaleId;
    for (const a of this.GetBulletEntityMap().values()) {
      var u = a.GetBulletInfo();
      if (
        u.IsInit &&
        !u.NeedDestroy &&
        !u.BulletDataMain.TimeScale.TimeScaleWithAttacker
      ) {
        if (t) {
          var h = u.CollisionInfo.LastFramePosition;
          if (!h) continue;
          if (
            Math.abs(h.X - t.X) > e ||
            Math.abs(h.Y - t.Y) > e ||
            Math.abs(h.Z - t.Z) > e
          )
            continue;
        }
        BulletUtil_1.BulletUtil.SetTimeScale(u, l, i, s, o, 5, 0, n);
      }
    }
    return (
      r &&
        this.PersistentTimeScaleMap.set(
          n,
          new BulletPersistentTimeScale(
            t,
            e,
            Time_1.Time.WorldTimeSeconds,
            l,
            i,
            s,
            o,
            5,
            n,
          ),
        ),
      n
    );
  }
  RemoveAllBulletTimeScale(t, e) {
    for (const i of this.GetBulletEntityMap().values()) {
      var l = i.GetBulletInfo();
      l.IsInit && BulletUtil_1.BulletUtil.RemoveTimeScale(l, t);
    }
    e && this.PersistentTimeScaleMap.delete(t);
  }
  fjo() {
    (this.PersistentTimeScaleId = 0), this.PersistentTimeScaleMap.clear();
  }
  get SceneBulletOwnerId() {
    return this.Jaa;
  }
  set SceneBulletOwnerId(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Bullet", 18, "设置场景子弹owner", ["CreatureDataId", t]),
      (this.Jaa = t);
  }
  WaitSceneBulletOwnerInit() {
    const e = this.SceneBulletOwnerId;
    0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Bullet",
          18,
          "等待场景子弹owner创建失败, creatureDataId为0",
        )
      : (this.hla(),
        (this.ala = WaitEntityTask_1.WaitEntityTask.Create(
          e,
          (t) => {
            t
              ? this.SceneBulletOwnerId !== e
                ? Log_1.Log.CheckWarn() &&
                  Log_1.Log.Warn(
                    "Bullet",
                    18,
                    "等待场景子弹owner创建返回时，creatureDataId已改变",
                  )
                : ((this.ala = void 0),
                  (this.IsSceneBulletOwnerCreated = !0),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.SceneBulletOwnerCreated,
                  ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Bullet", 18, "等待场景子弹owner创建失败");
          },
          -1,
        )),
        this.IsSceneBulletOwnerCreated && (this.ala = void 0));
  }
  hla() {
    (this.IsSceneBulletOwnerCreated = !1),
      this.ala && (this.ala.Cancel(), (this.ala = void 0));
  }
  c5a(t) {
    for (var [e] of this.ZHo) {
      e = this.ZHo.get(e);
      this.m5a(e, t);
    }
  }
  m5a(t, e) {
    t?.Valid &&
      ((t = t.GetBulletInfo()),
      EffectSystem_1.EffectSystem.SetEffectHidden(t.EffectInfo.Effect, e));
  }
}
((exports.BulletModel = BulletModel).DefaultBulletSceneInteraction = void 0),
  (BulletModel.rjo = Stats_1.Stat.Create("BulletPreload")),
  (BulletModel.Mjo = Stats_1.Stat.Create("BulletCreateEntity")),
  (BulletModel.Ejo = Stats_1.Stat.Create("BulletClearDestroyed")),
  (BulletModel.Sjo = Stats_1.Stat.Create("BulletRecycleBulletEntity"));
class BulletPersistentTimeScale {
  constructor(t, e, l, i, s, o, r, n, u) {
    (this.CenterLocation = t),
      (this.Radius = e),
      (this.StartTime = l),
      (this.Priority = i),
      (this.TimeDilation = s),
      (this.Curve = o),
      (this.Duration = r),
      (this.SourceType = n),
      (this.TimeScaleId = u);
  }
}
exports.BulletPersistentTimeScale = BulletPersistentTimeScale;
//# sourceMappingURL=BulletModel.js.map
