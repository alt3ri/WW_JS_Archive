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
    i,
    l,
    s = 0,
    o = 0,
    r = 0,
    n = 0,
    h = 0,
    u = void 0,
    a = !1,
    _ = 0,
    B = void 0,
    v = Protocol_1.Aki.Protocol.C4s.Proto_NormalSource,
    d = void 0,
    c = void 0,
    m = -1,
  ) {
    (this.Owner = t),
      (this.BulletRowName = e),
      (this.InitialTransform = i),
      (this.InitTargetLocation = l),
      (this.SkillId = s),
      (this.ParentId = o),
      (this.TargetId = r),
      (this.BaseTransformId = n),
      (this.BaseVelocityId = h),
      (this.Size = u),
      (this.FromRemote = a),
      (this.SyncType = _),
      (this.ContextId = B),
      (this.Source = v),
      (this.LocationOffset = d),
      (this.BeginRotatorOffset = c),
      (this.DtType = m);
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
      (this.BKs = 0),
      (this.C0a = !0),
      (this.nye = () => {
        ConfigManager_1.ConfigManager.BulletConfig.PreloadCommonBulletData(),
          BulletActorPool_1.BulletActorPool.Preload();
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
      (this.djo = (t) => {
        if (
          "LevelA" === t.PlotLevel ||
          "LevelB" === t.PlotLevel ||
          "LevelC" === t.PlotLevel
        ) {
          this.mjo = !0;
          for (const e of this.cjo) this.DestroyBullet(e, !1, 0);
          this.cjo.clear();
        }
      }),
      (this.Cjo = () => {
        this.mjo = !1;
      }),
      (this.PersistentTimeScaleMap = new Map()),
      (this.PersistentTimeScaleId = 0),
      (this.gna = 0),
      (this.IsSceneBulletOwnerCreated = !1),
      (this.fsa = void 0);
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
    return this.BKs;
  }
  get OpenHitMaterial() {
    return this.C0a;
  }
  set OpenHitMaterial(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("Bullet", 21, "Set Bullet Func OpenHitMaterial", [
        "val",
        t,
      ]),
      (this.C0a = t);
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet",
      UE.BulletCommonDataAsset_C,
      (t) => {
        (this.ojo = t),
          (this.BKs =
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
      this.psa(),
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
      this.psa(),
      !0
    );
  }
  CreateBullet(
    t,
    e,
    i,
    l,
    s = 0,
    o,
    r = !1,
    n = 0,
    h,
    u,
    a,
    _,
    B = 0,
    v = void 0,
    d = Protocol_1.Aki.Protocol.C4s.Proto_NormalSource,
    c = void 0,
    m = void 0,
    f = -1,
    y = void 0,
    g = void 0,
  ) {
    var M = this.vjo(e);
    if (!this.mjo || !M)
      if (t?.Valid) {
        _ =
          _ ??
          ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(t, e, !0, f);
        if (_) {
          if (!r) {
            var S = t.GetComponent(188),
              C = _.Base.BornForbidTagIds;
            if (C)
              for (const E of C)
                if (S.HasTag(E))
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Bullet",
                      18,
                      "BulletModel.InitBullet 中止，攻击者存在该子弹禁止生成Tag ",
                      ["子弹名称:", e],
                    )
                  );
            C = _.Base.BornRequireTagIds;
            if (C)
              for (const I of C)
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
          (C = new BulletInitParams(
            t,
            e,
            i,
            l,
            s,
            o,
            n,
            3 !== _.Base.BornPositionStandard &&
            2 !== _.Base.BornPositionStandard
              ? h
              : 0,
            u,
            a,
            r,
            B,
            v,
            d,
            c,
            m,
            f,
          )),
            (i = BulletPool_1.BulletPool.CreateBulletEntity());
          if (i?.Valid)
            return (
              BulletConstant_1.BulletConstant.OpenCreateLog &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  18,
                  "创建子弹",
                  ["BulletId", e],
                  ["EntityId", i.Id],
                ),
              (l = i.GetBulletInfo()),
              r &&
                (y && l.RandomPosOffset.FromUeVector(y), g) &&
                l.RandomInitSpeedOffset.FromUeVector(g),
              l.Init(C, _),
              l.InitEntity(i),
              this.ZHo.set(i.Id, i),
              (s = l.AttackerId),
              (
                this.tjo.get(s) ||
                ((o = this.ejo.pop() ?? new Set()), this.tjo.set(s, o), o)
              ).add(i),
              EntitySystem_1.EntitySystem.Start(i),
              EntitySystem_1.EntitySystem.Activate(i),
              BulletController_1.BulletController.AddSimpleAction(l, 1),
              M && this.cjo.add(i.Id),
              i
            );
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              5,
              "BulletModel.InitBullet error, 子弹创建 失败!",
              ["子弹创建者:", t.GetComponent(1)?.Owner.GetName()],
              ["子弹名称:", e],
            );
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
  DestroyBullet(t, e, i = 0) {
    var l,
      s = this.ZHo.get(t);
    !s ||
      (s = s.GetBulletInfo()).NeedDestroy ||
      ((s.NeedDestroy = !0),
      BulletConstant_1.BulletConstant.OpenCreateLog &&
        Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Bullet",
          18,
          "销毁子弹开始",
          ["BulletId", s.BulletRowName],
          ["EntityId", s.BulletEntityId],
        ),
      s.BulletRowName,
      StatDefine_1.BATTLESTAT_ENABLED,
      ((l =
        BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
          13,
        )).SummonChild = e),
      (l.DestroyReason = i),
      this.ijo.add(t),
      BulletController_1.BulletController.GetActionRunner().AddAction(s, l),
      StatDefine_1.BATTLESTAT_ENABLED);
  }
  DestroyAllBullet(t = !1) {
    for (var [e] of this.ZHo) this.DestroyBullet(e, t, 0);
  }
  ClearDestroyedBullets() {
    for (const s of this.ijo) {
      var t,
        e,
        i,
        l = this.ZHo.get(s);
      l &&
        ((i = (t = l.GetBulletInfo()).AttackerId),
        (e = this.tjo.get(i))
          ? (e.delete(l), e.size || (this.tjo.delete(i), this.ejo.push(e)))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Bullet",
              5,
              "BulletModel.DestroyBullet Warn, 获取被销毁子弹所在集合 失败！ ",
              ["子弹创建者Id:", i],
              ["子弹:", l],
            ),
        (e = this.GetBulletHandleById(s)) &&
          (((i = Protocol_1.Aki.Protocol.v3n.create()).iVn = e),
          CombatMessage_1.CombatNet.Call(20471, t.Attacker, i),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              20,
              "删除子弹Request",
              ["handleId", e?.rVn],
              ["playerId", e?.q5n],
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
        BulletPool_1.BulletPool.RecycleBulletEntity(l));
    }
    this.ijo.clear();
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
    var i, l;
    t &&
      (({ q5n: i, rVn: l } = t),
      this.hjo.set(e, t),
      this.ajo.has(i) || this.ajo.set(i, new Map()),
      this.ajo.get(i)?.set(l, e));
  }
  DeregisterBullet(t) {
    var e, i;
    t &&
      ((e = this.GetIdByBulletHandle(t)),
      this.ajo.has(e) && this.hjo.delete(e),
      this.ajo.has(t.q5n)) &&
      (({ q5n: e, rVn: t } = t),
      (i = this.ajo.get(e)).delete(t),
      i.size <= 0) &&
      this.ajo.delete(e);
  }
  GetIdByBulletHandle(t) {
    var e;
    return t ? (({ q5n: t, rVn: e } = t), this.ajo.get(t)?.get(e) ?? 0) : 0;
  }
  GetBulletHandleById(t) {
    return this.hjo.get(t);
  }
  DestroyBulletRemote(t, e) {
    var i;
    t &&
      this.ajo.has(t.q5n) &&
      0 !== (i = this.GetIdByBulletHandle(t)) &&
      (this.DeregisterBullet(t), this.DestroyBullet(i, e, 2));
  }
  NewTraceElement(t, e, i, l = 0) {
    var s = UE.NewObject(t);
    if (((s.WorldContextObject = GlobalData_1.GlobalData.World), e))
      for (let t = 0; t < e.Num(); t++) {
        var o = e.Get(t);
        i?.has(o) || s.AddObjectTypeQuery(o);
      }
    return (s.bTraceComplex = !1), (s.bIgnoreSelf = !0), s;
  }
  GetEntityIdByCustomKey(t, e, i) {
    (e = e.concat(t.toString())), (t = this.ljo.get(e));
    return (
      t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 21, "自定义目标表不存在攻击者", [
          "Bullet.Data.RowName",
          i,
        ]),
      0)
    );
  }
  SetEntityIdByCustomKey(t, e, i) {
    e = e.concat(t.toString());
    this.ljo.set(e, i);
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
    return "310000001" === t || "110504030" === t;
  }
  SetAllBulletTimeScale(t, e, i, l, s, o, r) {
    this.PersistentTimeScaleId--;
    var n = this.PersistentTimeScaleId;
    for (const a of this.GetBulletEntityMap().values()) {
      var h = a.GetBulletInfo();
      if (
        h.IsInit &&
        !h.NeedDestroy &&
        !h.BulletDataMain.TimeScale.TimeScaleWithAttacker
      ) {
        if (t) {
          var u = h.CollisionInfo.LastFramePosition;
          if (!u) continue;
          if (
            Math.abs(u.X - t.X) > e ||
            Math.abs(u.Y - t.Y) > e ||
            Math.abs(u.Z - t.Z) > e
          )
            continue;
        }
        BulletUtil_1.BulletUtil.SetTimeScale(h, i, l, s, o, 5, 0, n);
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
            i,
            l,
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
    for (const l of this.GetBulletEntityMap().values()) {
      var i = l.GetBulletInfo();
      i.IsInit && BulletUtil_1.BulletUtil.RemoveTimeScale(i, t);
    }
    e && this.PersistentTimeScaleMap.delete(t);
  }
  fjo() {
    (this.PersistentTimeScaleId = 0), this.PersistentTimeScaleMap.clear();
  }
  get SceneBulletOwnerId() {
    return this.gna;
  }
  set SceneBulletOwnerId(t) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Bullet", 18, "设置场景子弹owner", ["CreatureDataId", t]),
      (this.gna = t);
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
      : (this.psa(),
        (this.fsa = WaitEntityTask_1.WaitEntityTask.Create(
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
                : ((this.fsa = void 0),
                  (this.IsSceneBulletOwnerCreated = !0),
                  EventSystem_1.EventSystem.Emit(
                    EventDefine_1.EEventName.SceneBulletOwnerCreated,
                  ))
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Bullet", 18, "等待场景子弹owner创建失败");
          },
          !1,
          -1,
        )),
        this.IsSceneBulletOwnerCreated && (this.fsa = void 0));
  }
  psa() {
    (this.IsSceneBulletOwnerCreated = !1),
      this.fsa && (this.fsa.Cancel(), (this.fsa = void 0));
  }
}
((exports.BulletModel = BulletModel).DefaultBulletSceneInteraction = void 0),
  (BulletModel.rjo = void 0),
  (BulletModel.Mjo = void 0),
  (BulletModel.Ejo = void 0),
  (BulletModel.Sjo = void 0);
class BulletPersistentTimeScale {
  constructor(t, e, i, l, s, o, r, n, h) {
    (this.CenterLocation = t),
      (this.Radius = e),
      (this.StartTime = i),
      (this.Priority = l),
      (this.TimeDilation = s),
      (this.Curve = o),
      (this.Duration = r),
      (this.SourceType = n),
      (this.TimeScaleId = h);
  }
}
exports.BulletPersistentTimeScale = BulletPersistentTimeScale;
//# sourceMappingURL=BulletModel.js.map
