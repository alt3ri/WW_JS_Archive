"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BulletPersistentTimeScale =
    exports.BulletModel =
    exports.BulletInitParams =
      void 0);
const UE = require("ue");
const Info_1 = require("../../../../Core/Common/Info");
const Log_1 = require("../../../../Core/Common/Log");
const Stats_1 = require("../../../../Core/Common/Stats");
const Time_1 = require("../../../../Core/Common/Time");
const Protocol_1 = require("../../../../Core/Define/Net/Protocol");
const EntitySystem_1 = require("../../../../Core/Entity/EntitySystem");
const ModelBase_1 = require("../../../../Core/Framework/ModelBase");
const ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const StatDefine_1 = require("../../../Common/StatDefine");
const GlobalData_1 = require("../../../GlobalData");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const CombatMessage_1 = require("../../../Module/CombatMessage/CombatMessage");
const BulletActorPool_1 = require("../BulletActorPool");
const BulletConstant_1 = require("../BulletConstant");
const BulletController_1 = require("../BulletController");
const BulletUtil_1 = require("../BulletUtil");
const BulletMoveInfo_1 = require("./BulletMoveInfo");
const BulletPool_1 = require("./BulletPool");
const BulletTraceElementPool_1 = require("./BulletTraceElementPool");
class BulletInitParams {
  constructor(
    t,
    e,
    l,
    i,
    o = 0,
    s = 0,
    r = 0,
    n = 0,
    u = 0,
    h = void 0,
    a = !1,
    _ = 0,
    B = void 0,
    v = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
    d = void 0,
    m = -1,
  ) {
    (this.Owner = t),
      (this.BulletRowName = e),
      (this.InitialTransform = l),
      (this.InitTargetLocation = i),
      (this.SkillId = o),
      (this.ParentId = s),
      (this.TargetId = r),
      (this.BaseTransformId = n),
      (this.BaseVelocityId = u),
      (this.Size = h),
      (this.FromRemote = a),
      (this.SyncType = _),
      (this.ContextId = B),
      (this.Source = v),
      (this.LocationOffset = d),
      (this.DtType = m);
  }
}
exports.BulletInitParams = BulletInitParams;
class BulletModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.iHo = new Map()),
      (this.oHo = new Array()),
      (this.rHo = new Map()),
      (this.nHo = new Set()),
      (this.sHo = void 0),
      (this.nye = () => {
        ConfigManager_1.ConfigManager.BulletConfig.PreloadCommonBulletData(),
          BulletActorPool_1.BulletActorPool.Preload();
      }),
      (this.hHo = new Map()),
      (this.lHo = (t) => {
        this.hHo.set(t.BulletEntityId, !0);
      }),
      (this._Ho = new Map()),
      (this.uHo = new Map()),
      (this.cHo = new Map()),
      (this.mHo = new Map()),
      (this.dHo = new Map()),
      (this.SelfAdaptBeHitAnim = void 0),
      (this.HeavyHitAnim = void 0),
      (this.Index2LightHitAnimMap = void 0),
      (this.Index2HeavyHitAnimMap = void 0),
      (this.CHo = new Set()),
      (this.gHo = !1),
      (this.fHo = () => {
        this.gHo = !0;
        for (const t of this.CHo) this.DestroyBullet(t, !1, 0);
        this.CHo.clear();
      }),
      (this.pHo = () => {
        this.gHo = !1;
      }),
      (this.PersistentTimeScaleMap = new Map()),
      (this.PersistentTimeScaleId = 0);
  }
  GetBulletEntityMap() {
    return this.iHo;
  }
  GetBulletEntityById(t) {
    return this.iHo.get(t);
  }
  GetBulletSetByAttacker(t) {
    return this.rHo.get(t);
  }
  GetAttackerBulletIterator() {
    return this.rHo.values();
  }
  OnInit() {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      "/Game/Aki/Data/Fight/BulletDataAsset/DA_CommonBullet.DA_CommonBullet",
      UE.BulletCommonDataAsset_C,
      (t, e) => {
        this.sHo = t;
      },
    ),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Bullet", 5, "BulletManagerTs Init Finish");
    for (let t = 0; t < 20; t++) this.oHo.push(new Set());
    return (
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.nye,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkStart,
        this.fHo,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.pHo,
      ),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.Add(
          EventDefine_1.EEventName.BulletHit,
          this.lHo,
        ),
      this.vHo(),
      !0
    );
  }
  IsBulletHit(t) {
    return this.hHo.get(t) ?? !1;
  }
  OnLeaveLevel() {
    for (const t of this.iHo.values())
      BulletPool_1.BulletPool.RecycleBulletEntity(t);
    this.iHo.clear();
    for (const e of this.rHo.values()) e.clear(), this.oHo.push(e);
    return (
      this.rHo.clear(),
      this._Ho.clear(),
      this.uHo.clear(),
      BulletActorPool_1.BulletActorPool.Clear(),
      BulletTraceElementPool_1.BulletTraceElementPool.Clear(),
      (BulletMoveInfo_1.BulletMoveInfo.StickGroundLineTrace = void 0),
      this.MHo(),
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
        this.fHo,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotNetworkEnd,
        this.pHo,
      ),
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.BulletHit,
          this.lHo,
        ),
      (BulletModel.DefaultBulletSceneInteraction = void 0),
      (this.sHo = void 0),
      BulletActorPool_1.BulletActorPool.Clear(),
      BulletTraceElementPool_1.BulletTraceElementPool.Clear(),
      this.cHo.clear(),
      (this.oHo.length = 0),
      this.SHo(),
      !0
    );
  }
  CreateBullet(
    e,
    l,
    i,
    o,
    s = 0,
    r,
    n = !1,
    u = 0,
    h,
    a,
    _,
    B,
    v = 0,
    d = void 0,
    m = Protocol_1.Aki.Protocol.LOs.Proto_NormalSource,
    c = void 0,
    f = -1,
    y = void 0,
    g = void 0,
  ) {
    const M = this.EHo(l);
    if (!this.gHo || !M)
      if (e?.Valid) {
        B =
          B ??
          ConfigManager_1.ConfigManager.BulletConfig.GetBulletData(e, l, !0, f);
        if (B) {
          if (!n) {
            const C = e.GetComponent(185);
            var S = B.Base.BornForbidTagIds;
            if (S)
              for (const E of S)
                if (C.HasTag(E))
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Bullet",
                      18,
                      "BulletModel.InitBullet 中止，攻击者存在该子弹禁止生成Tag ",
                      ["子弹名称:", l],
                    )
                  );
            S = B.Base.BornRequireTagIds;
            if (S)
              for (const I of S)
                if (!C.HasTag(I))
                  return void (
                    Log_1.Log.CheckDebug() &&
                    Log_1.Log.Debug(
                      "Bullet",
                      18,
                      "BulletModel.InitBullet 中止，攻击者不存在该子弹生成所需Tag",
                      ["子弹名称:", l],
                    )
                  );
          }
          let t = s;
          t === 0 &&
            ((S = e.GetComponent(33)), (t = S.CurrentSkill?.SkillId ?? 0));
          (s = new BulletInitParams(
            e,
            l,
            i,
            o,
            t,
            r,
            u,
            B.Base.BornPositionStandard !== 3 &&
            B.Base.BornPositionStandard !== 2
              ? h
              : 0,
            a,
            _,
            n,
            v,
            d,
            m,
            c,
            f,
          )),
            (S = BulletPool_1.BulletPool.CreateBulletEntity());
          if (S?.Valid)
            return (
              BulletConstant_1.BulletConstant.OpenCreateLog &&
                Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug(
                  "Bullet",
                  18,
                  "创建子弹",
                  ["BulletId", l],
                  ["EntityId", S.Id],
                ),
              (i = S.GetBulletInfo()),
              n &&
                (y && i.RandomPosOffset.FromUeVector(y), g) &&
                i.RandomInitSpeedOffset.FromUeVector(g),
              i.Init(s, B),
              i.InitEntity(S),
              this.iHo.set(S.Id, S),
              (o = i.AttackerId),
              (
                this.rHo.get(o) ||
                ((r = this.oHo.pop() ?? new Set()), this.rHo.set(o, r), r)
              ).add(S),
              EntitySystem_1.EntitySystem.Start(S),
              EntitySystem_1.EntitySystem.Activate(S),
              BulletController_1.BulletController.AddSimpleAction(i, 1),
              M && this.CHo.add(S.Id),
              S
            );
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Bullet",
              5,
              "BulletModel.InitBullet error, 子弹创建 失败!",
              ["子弹创建者:", e.GetComponent(1)?.Owner.GetName()],
              ["子弹名称:", l],
            );
        }
      } else
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Bullet",
            5,
            "BulletModel.InitBullet 中止，攻击者已不存在",
            ["子弹名称:", l],
          );
  }
  DestroyBullet(t, e, l = 0) {
    let i;
    let o = this.iHo.get(t);
    o &&
      ((o = o.GetBulletInfo()),
      (l === 2 && o.BulletDataMain?.Base.SyncType !== 1) ||
        o.NeedDestroy ||
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
        o.BulletRowName,
        StatDefine_1.BATTLESTAT_ENABLED,
        ((i =
          BulletController_1.BulletController.GetActionCenter().CreateBulletActionInfo(
            13,
          )).SummonChild = e),
        (i.DestroyReason = l),
        this.nHo.add(t),
        BulletController_1.BulletController.GetActionRunner().AddAction(o, i),
        StatDefine_1.BATTLESTAT_ENABLED));
  }
  DestroyAllBullet(t = !1) {
    for (const [e] of this.iHo) this.DestroyBullet(e, t, 0);
  }
  ClearDestroyedBullets() {
    for (const o of this.nHo) {
      var t;
      var e;
      var l;
      const i = this.iHo.get(o);
      i &&
        ((l = (t = i.GetBulletInfo()).AttackerId),
        (e = this.rHo.get(l))
          ? (e.delete(i), e.size || (this.rHo.delete(l), this.oHo.push(e)))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Bullet",
              5,
              "BulletModel.DestroyBullet Warn, 获取被销毁子弹所在集合 失败！ ",
              ["子弹创建者Id:", l],
              ["子弹:", i],
            ),
        (e = this.GetBulletHandleById(o)) &&
          (((l = Protocol_1.Aki.Protocol.j2n.create()).E4n = e),
          CombatMessage_1.CombatNet.Call(29700, t.Attacker, l),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Bullet",
              20,
              "删除子弹Request",
              ["handleId", e?.y4n],
              ["playerId", e?.aFn],
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
        this.iHo.delete(o),
        BulletPool_1.BulletPool.RecycleBulletEntity(i));
    }
    this.nHo.clear();
  }
  GetFastMoveTrace(t, e) {
    switch (t) {
      case "Bullet_Type1":
        return this.sHo.FastMoveTraceBullet_Type1;
      case "Bullet_Type2":
        return this.sHo.FastMoveTraceBullet_Type2;
      case "Bullet_Type3":
        return this.sHo.FastMoveTraceBullet_Type3;
      case "Bullet_Type1_Special":
        return this.sHo.FastMoveTraceBullet_Type1_Special;
      case "Bullet_Type2_Special":
        return this.sHo.FastMoveTraceBullet_Type2_Special;
      case "Bullet_OnlyBullet":
        return this.sHo.FastMoveTraceBullet_Only_Bullet;
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
    return this.sHo.TakeAim;
  }
  get ObjectTypeObstacles() {
    return this.sHo.Obstacles;
  }
  get ObjectTypeHitPoint() {
    return this.sHo.HitPoint;
  }
  RegisterBullet(t, e) {
    let l, i;
    t &&
      (({ aFn: l, y4n: i } = t),
      this.uHo.set(e, t),
      this._Ho.has(l) || this._Ho.set(l, new Map()),
      this._Ho.get(l)?.set(i, e));
  }
  DeregisterBullet(t) {
    let e, l;
    t &&
      ((e = this.GetIdByBulletHandle(t)),
      this._Ho.has(e) && this.uHo.delete(e),
      this._Ho.has(t.aFn)) &&
      (({ aFn: e, y4n: t } = t),
      (l = this._Ho.get(e)).delete(t),
      l.size <= 0) &&
      this._Ho.delete(e);
  }
  GetIdByBulletHandle(t) {
    let e;
    return t ? (({ aFn: t, y4n: e } = t), this._Ho.get(t)?.get(e) ?? 0) : 0;
  }
  GetBulletHandleById(t) {
    return this.uHo.get(t);
  }
  DestroyBulletRemote(t, e) {
    let l;
    t &&
      this._Ho.has(t.aFn) &&
      (l = this.GetIdByBulletHandle(t)) !== 0 &&
      (this.DeregisterBullet(t), this.DestroyBullet(l, e, 2));
  }
  NewTraceElement(t, e, l, i = 0) {
    const o = UE.NewObject(t);
    if (((o.WorldContextObject = GlobalData_1.GlobalData.World), e))
      for (let t = 0; t < e.Num(); t++) {
        const s = e.Get(t);
        l?.has(s) || o.AddObjectTypeQuery(s);
      }
    return (o.bTraceComplex = !1), (o.bIgnoreSelf = !0), o;
  }
  GetEntityIdByCustomKey(t, e, l) {
    (e = e.concat(t.toString())), (t = this.cHo.get(e));
    return (
      t ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error("Bullet", 21, "自定义目标表不存在攻击者", [
          "Bullet.Data.RowName",
          l,
        ]),
      0)
    );
  }
  SetEntityIdByCustomKey(t, e, l) {
    e = e.concat(t.toString());
    this.cHo.set(e, l);
  }
  ShowBulletCollision(t = 0) {
    return this.mHo.has(t) && (this.mHo.get(t) ?? !1);
  }
  ShowBulletTrace(t = 0) {
    return this.dHo.has(t) && (this.dHo.get(t) ?? !1);
  }
  SetBulletCollisionDraw(t, e) {
    this.mHo.set(t, e);
  }
  SetBulletTraceDraw(t, e) {
    this.dHo.set(t, e);
  }
  vHo() {
    (this.SelfAdaptBeHitAnim = new Set([0, 1, 2, 3, 8, 9, 10, 11])),
      (this.HeavyHitAnim = new Set([2, 3, 10, 11])),
      (this.Index2LightHitAnimMap = [8, 1, 9, 0]),
      (this.Index2HeavyHitAnimMap = [10, 3, 11, 2]);
  }
  SHo() {
    (this.SelfAdaptBeHitAnim = void 0),
      (this.HeavyHitAnim = void 0),
      (this.Index2LightHitAnimMap = void 0),
      (this.Index2HeavyHitAnimMap = void 0);
  }
  EHo(t) {
    return t === "310000001";
  }
  SetAllBulletTimeScale(t, e, l, i, o, s, r) {
    this.PersistentTimeScaleId--;
    const n = this.PersistentTimeScaleId;
    for (const a of this.GetBulletEntityMap().values()) {
      const u = a.GetBulletInfo();
      if (
        u.IsInit &&
        !u.NeedDestroy &&
        !u.BulletDataMain.TimeScale.TimeScaleWithAttacker
      ) {
        if (t) {
          const h = u.CollisionInfo.LastFramePosition;
          if (!h) continue;
          if (
            Math.abs(h.X - t.X) > e ||
            Math.abs(h.Y - t.Y) > e ||
            Math.abs(h.Z - t.Z) > e
          )
            continue;
        }
        BulletUtil_1.BulletUtil.SetTimeScale(u, l, i, o, s, 5, 0, n);
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
            o,
            s,
            5,
            n,
          ),
        ),
      n
    );
  }
  RemoveAllBulletTimeScale(t, e) {
    for (const i of this.GetBulletEntityMap().values()) {
      const l = i.GetBulletInfo();
      l.IsInit && BulletUtil_1.BulletUtil.RemoveTimeScale(l, t);
    }
    e && this.PersistentTimeScaleMap.delete(t);
  }
  MHo() {
    (this.PersistentTimeScaleId = 0), this.PersistentTimeScaleMap.clear();
  }
}
((exports.BulletModel = BulletModel).DefaultBulletSceneInteraction = void 0),
  (BulletModel.aHo = void 0),
  (BulletModel.yHo = void 0),
  (BulletModel.IHo = void 0),
  (BulletModel.THo = void 0);
class BulletPersistentTimeScale {
  constructor(t, e, l, i, o, s, r, n, u) {
    (this.CenterLocation = t),
      (this.Radius = e),
      (this.StartTime = l),
      (this.Priority = i),
      (this.TimeDilation = o),
      (this.Curve = s),
      (this.Duration = r),
      (this.SourceType = n),
      (this.TimeScaleId = u);
  }
}
exports.BulletPersistentTimeScale = BulletPersistentTimeScale;
// # sourceMappingURL=BulletModel.js.map
