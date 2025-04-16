"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AsyncAiPerception = void 0);
const cpp_1 = require("cpp"),
  UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  Stats_1 = require("../../../Core/Common/Stats"),
  Time_1 = require("../../../Core/Common/Time"),
  EntitySystem_1 = require("../../../Core/Entity/EntitySystem"),
  JsModelManager_1 = require("../../../Core/Model/JsModelManager"),
  TickProcessSystem_1 = require("../../../Core/Tick/TickProcessSystem"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  CampUtils_1 = require("../../NewWorld/Character/Common/Blueprint/Utils/CampUtils"),
  CombatLog_1 = require("../../Utils/CombatLog"),
  AiConfig_1 = require("../Common/AiConfig"),
  MINUS_HALF = -180,
  MINUS_QUATER = -90;
class AiSenseObject {
  constructor(t) {
    (this.AiSense = t),
      (this.AiSenseObjectData = new cpp_1.FAiSenseObject()),
      (this.AiSenseObjectData.AiSenseId = t.Id),
      (this.AiSenseObjectData.AiSenseHorizontalAngle = new UE.Vector2D(
        t.HorizontalAngle.Min,
        t.HorizontalAngle.Max,
      )),
      (this.AiSenseObjectData.AiSenseVerticalAngle = new UE.Vector2D(
        t.VerticalAngle.Min,
        t.VerticalAngle.Max,
      )),
      (this.AiSenseObjectData.AiSenseCantBeBlock = t.CantBeBlock),
      (this.AiSenseObjectData.AiSenseBlockType = t.BlockType),
      (this.AiSenseObjectData.WithAngleHorizontal =
        t.HorizontalAngle.Min > MINUS_HALF || t.HorizontalAngle.Max < 180),
      (this.AiSenseObjectData.WithAngleVertical =
        t.VerticalAngle.Min > MINUS_QUATER || t.VerticalAngle.Max < 90),
      (this.AiSenseObjectData.SenseDistanceRangeMin = t.SenseDistanceRange.Min),
      (this.AiSenseObjectData.SenseDistanceRangeMax = t.SenseDistanceRange.Max),
      (this.AiSenseObjectData.SquaredWalkSenseRate =
        t.WalkSenseRate * t.WalkSenseRate),
      (this.AiSenseObjectData.SquaredAirSenseRate =
        t.AirSenseRate * t.AirSenseRate);
  }
}
class AsyncAiPerception {
  constructor(t, i, s) {
    (this.Bte = t),
      (this.AiSenseGroup = i),
      (this.AiPerceptionData = void 0),
      (this.Allies = new Set()),
      (this.Enemies = new Set()),
      (this.Neutrals = new Set()),
      (this.SceneItems = new Set()),
      (this.AllEnemies = new Set()),
      (this.ShareAllyLink = new Set()),
      (this.voe = new Set()),
      (this.Moe = new Set()),
      (this.Eoe = new Set()),
      (this.f6 = new Array()),
      (this.Ci_ = void 0),
      (this.gi_ = void 0),
      (this.pi_ = void 0),
      (this.yoe = void 0),
      (this.Ioe = []),
      (this.Loe = new Array()),
      (this.Doe = new Map()),
      (this.MaxSenseRange = 0),
      (this.Poe = !1),
      (this.X6_ = 0),
      (this.Y6_ = new Map()),
      (this.z6_ = -1),
      (this.J6_ = -1),
      (this.Z6_ = (t) => {
        if (
          (this.J6_ === Time_1.Time.Frame && this.mr_(t),
          this.z6_ === Time_1.Time.Frame && this.dr_(t),
          0 < this.Y6_.size)
        ) {
          for (const i of this.Y6_) this.e5_(i[0], i[1]);
          this.Y6_.clear();
        }
      }),
      (this.d3r = -1),
      (this.uoe = void 0),
      (this.vi_ = () => {
        if (this.AiPerceptionData && this.J6_ !== Time_1.Time.Frame) {
          AsyncAiPerception.yi_.Start();
          let i = this.Ci_.Num();
          for (let t = i - 1; -1 < t; t--) {
            var s,
              e = this.Ci_.GetKey(t);
            e === this.E0 ||
              ((s = EntitySystem_1.EntitySystem.Get(e))?.Valid && s.Active) ||
              (this.Ci_.Remove(e),
              this.yoe.Remove(e),
              this.Allies.delete(e) &&
                this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(
                  !1,
                  e,
                  1,
                ),
              this.Enemies.delete(e) &&
                this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(
                  !1,
                  e,
                  2,
                ),
              this.Neutrals.delete(e) &&
                this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(
                  !1,
                  e,
                  0,
                ),
              this.SceneItems.delete(e));
          }
          i = this.pi_.Num();
          for (let t = 0; t < i; t++) {
            var h = this.pi_.Get(t),
              h = EntitySystem_1.EntitySystem.Get(h);
            h?.Valid && this.Voe(h, !1);
          }
          this.pi_.Empty(), (i = this.gi_.Num());
          for (let t = 0; t < i; t++) {
            var r,
              n = this.gi_.GetKey(t);
            EntitySystem_1.EntitySystem.Get(n)?.Active &&
              void 0 !== (r = this.gi_.Get(n)) &&
              (this.Ci_.Set(n, r),
              (r = EntitySystem_1.EntitySystem.Get(n))?.Valid) &&
              this.Voe(r, !0);
          }
          this.gi_.Empty(),
            this.Woe(),
            this.Koe(),
            AsyncAiPerception.yi_.Stop();
        }
      }),
      (this.E0 = t.CharActorComp.Entity.Id),
      (this.AiPerceptionData = JsModelManager_1.JsModelManager.AddAiPerception(
        this.E0,
      )),
      (this.AiPerceptionData.AiSenseGroupLoseDelayRange = new UE.Vector2D(
        i.LoseDelay.Min,
        i.LoseDelay.Max,
      )),
      (this.Ci_ = this.AiPerceptionData.EntitiesInSense),
      (this.gi_ = this.AiPerceptionData.EntitiesToAdd),
      (this.yoe = this.AiPerceptionData.EntitiesRemoveTime),
      (this.pi_ = this.AiPerceptionData.EntitiesNotSense),
      (this.Noe = t.CharActorComp.Actor.Camp),
      this.Ci_.Add(this.E0, 0);
    let e = -1;
    for (const r of s) {
      var h = new AiSenseObject(r);
      this.Loe.push(h),
        0 < ++e ||
          (h.AiSenseObjectData.WithAngleHorizontal &&
            ++this.AiPerceptionData.WithAngleHorizontalCount,
          h.AiSenseObjectData.WithAngleVertical &&
            ++this.AiPerceptionData.WithAngleVerticalCount,
          r.SenseDistanceRange.Max > this.MaxSenseRange &&
            (this.MaxSenseRange = r.SenseDistanceRange.Max),
          this.AiPerceptionData.ActivateAiSenseObjects.Get(
            h.AiSense.SenseTarget,
          )?.Add(h.AiSenseObjectData));
    }
    (this.Ooe = i ? i.ShareDis * i.ShareDis : 0),
      0 < this.Ooe &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "AI",
          6,
          "共享感知距离应该不需要再是用了",
          ["Actor", this.Bte.CharActorComp?.Actor.GetName()],
          ["AiSenseGroup", i.Id],
        ),
      (this.X6_ = TickProcessSystem_1.TickProcessSystem.RegisterTickProcess(
        6,
        !0,
        this.Z6_,
        "AsyncAiPerception",
      ));
  }
  GetEnableAiSenseDebug() {
    let i = "感知配置激活情况: ";
    for (let t = 0; t < this.Loe.length; ++t) {
      var s = this.Loe[t],
        e = this.Loe[t].AiSense.Id,
        s = this.AiPerceptionData.ActivateAiSenseObjects.Get(
          s.AiSense.SenseTarget,
        ).Contains(s.AiSenseObjectData);
      i += e + ":" + s + "; ";
    }
    return i;
  }
  Foe(t, i) {
    this.Y6_.set(t, i);
  }
  e5_(t, i) {
    var s = this.AiPerceptionData.ActivateAiSenseObjects.Get(
      t.AiSense.SenseTarget,
    );
    s.Contains(t.AiSenseObjectData) !== i &&
      (Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "AI",
          6,
          "EnableAiSense",
          ["Actor", this.Bte.CharActorComp.Actor.GetName()],
          ["AiSenseObject", t.AiSense.Id],
          ["enable", i],
        ),
      i
        ? (t.AiSenseObjectData.WithAngleHorizontal &&
            ++this.AiPerceptionData.WithAngleHorizontalCount,
          t.AiSenseObjectData.WithAngleVertical &&
            ++this.AiPerceptionData.WithAngleVerticalCount,
          s.Add(t.AiSenseObjectData))
        : (t.AiSenseObjectData.WithAngleHorizontal &&
            --this.AiPerceptionData.WithAngleHorizontalCount,
          t.AiSenseObjectData.WithAngleVertical &&
            --this.AiPerceptionData.WithAngleVerticalCount,
          -1 < (i = s.FindIndex(t.AiSenseObjectData)) && s.RemoveAt(i)));
  }
  SetAiSenseEnable(t, i) {
    t < 0 || this.Loe.length <= t || this.Foe(this.Loe[t], i);
  }
  SetAllAiSenseEnable(t) {
    t || (this.z6_ = Time_1.Time.Frame),
      (this.Poe = !t),
      CombatLog_1.CombatLog.Info(
        "Ai",
        this.Bte.CharActorComp?.Entity,
        "禁用全部感知",
        ["forbid", this.Poe],
      );
  }
  dr_(t) {
    if (this.AiPerceptionData && this.Poe) {
      var i = this.Ci_.Num();
      for (let t = 0; t < i; t++) {
        var s = this.Ci_.GetKey(t);
        s !== this.E0 &&
          (s = EntitySystem_1.EntitySystem.Get(s)) &&
          this.Voe(s, !1);
      }
      this.Allies.clear(),
        this.Enemies.clear(),
        this.Neutrals.clear(),
        this.AllEnemies.clear(),
        this.Ci_.Empty(),
        this.Ci_.Add(this.E0, 0);
    }
  }
  AddOrRemoveAiSense(t, i) {
    i &&
      !this.Doe.has(t) &&
      (s = ConfigManager_1.ConfigManager.AiConfig.LoadAiSense(t.toString())) &&
      this.Doe.set(t, new AiSenseObject(s));
    var s = this.Doe.get(t);
    s && this.Foe(s, i);
  }
  EnableAiSenseByType(t, i) {
    for (const e of this.Loe) e.AiSense.SenseType === t && this.Foe(e, i);
    for (var [, s] of this.Doe) s.AiSense.SenseType === t && this.Foe(s, i);
  }
  Clear(t = !0, i = !1) {
    if (i) {
      for (const s of this.Allies)
        this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(!1, s, 1);
      for (const e of this.Enemies)
        this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(!1, e, 2);
      for (const h of this.Neutrals)
        this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(!1, h, 0);
    }
    this.Allies.clear(),
      this.Enemies.clear(),
      this.Neutrals.clear(),
      this.SceneItems.clear(),
      this.AllEnemies.clear(),
      (this.f6.length = 0),
      (this.J6_ = Time_1.Time.Frame),
      t &&
        ((this.Ioe.length = 0),
        this.AiPerceptionData &&
          (JsModelManager_1.JsModelManager.RemoveAiPerception(
            this.AiPerceptionData.Handle,
          ),
          (this.AiPerceptionData = void 0)),
        0 < this.X6_) &&
        (TickProcessSystem_1.TickProcessSystem.UnregisterTickProcess(this.X6_),
        (this.X6_ = 0));
  }
  mr_(t) {
    this.AiPerceptionData &&
      (this.Ci_.Empty(), this.Ci_.Add(this.E0, 0), this.gi_.Empty());
  }
  Tick() {
    Time_1.Time.Frame !== Time_1.Time.LastPauseTimeFrame &&
      Time_1.Time.Frame !== Time_1.Time.LastResumeTimeFrame &&
      Time_1.Time.Frame !== Time_1.Time.LastResumeTimeFrame + 1 &&
      this.Bte.CharActorComp?.Valid &&
      (this.AiSenseGroup
        ? this.Poe ||
          (this.d3r === Time_1.Time.Frame
            ? Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "AI",
                36,
                "[AsyncAiPerception::Tick] Execute twice or more in one frame. Error!!!!",
              )
            : ((this.d3r = Time_1.Time.Frame), this.fi_()))
        : this.Koe());
  }
  fi_() {
    var t;
    this.AiPerceptionData &&
      (AiConfig_1.AiConfig.CppAsyncAiPerception
        ? (this.uoe ||
            ((this.uoe = UE.NewObject(UE.TraceLineElement.StaticClass())),
            (this.uoe.WorldContextObject = this.Bte.CharActorComp.Actor),
            (this.uoe.bIsSingle = !0),
            (this.uoe.bIgnoreSelf = !0)),
          cpp_1.FKuroAIPerceptionUtils.StartAsyncAiPerception(
            this.vi_,
            this.AiPerceptionData.Handle,
            Time_1.Time.Now,
            this.uoe,
          ))
        : ((t = { AiPerceptionHandle: this.AiPerceptionData.Handle }),
          global.startAsyncTask(
            "Task/AiPerceptionTask",
            t,
            (t) => {
              this.vi_();
            },
            !0,
          )));
  }
  Voe(i, s) {
    AsyncAiPerception.boe.Start();
    var e = i.Id,
      i = i.GetComponent(3);
    if (i?.Valid) {
      var h = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, i.Actor.Camp);
      let t = void 0;
      switch (h) {
        case 1:
          t = this.Allies;
          break;
        case 2:
          t = this.Enemies;
          break;
        default:
          t = this.Neutrals;
      }
      s
        ? t.has(e) ||
          (t.add(e),
          this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(
            !0,
            i,
            h,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAiSenseEntityEnter,
            this.E0,
            i.Entity,
          ))
        : t.delete(e) &&
          (this.Bte.AiPerceptionEvents.CollectAiPerceptionEventByActorComp(
            !1,
            i,
            h,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnAiSenseEntityLeave,
            this.E0,
            i.Entity,
          ));
    } else
      s
        ? this.SceneItems.has(e) ||
          (this.SceneItems.add(e),
          this.Bte.AiPerceptionEvents.OnSenseSceneItem(i))
        : this.SceneItems.delete(e);
    AsyncAiPerception.boe.Stop();
  }
  Woe() {
    if (!(this.AiSenseGroup.ShareDis <= 0)) {
      AsyncAiPerception.qoe.Start();
      var t,
        i,
        s = this.Bte.CharActorComp.ActorLocationProxy,
        e =
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRangeWithLocation(
            s,
            this.AiSenseGroup.ShareDis,
            62,
            this.Ioe,
          ),
          this.voe.clear(),
          this.voe.add(this.E0),
          this.Bte.CharActorComp.Actor.Camp);
      for (const r of this.Ioe)
        !r.Entity?.Active ||
          this.voe.has(r.Entity.Id) ||
          !(t = r.Entity.GetComponent(3))?.Valid ||
          e !== t.Actor.Camp ||
          Vector_1.Vector.DistSquared(s, t.ActorLocationProxy) > this.Ooe ||
          (this.voe.add(r.Entity.Id), this.ShareAllyLink.has(r.Entity.Id)) ||
          ((t = r.Entity.GetComponent(46))?.Valid &&
            t.AiController.AiPerception?.Moe.add(this.E0));
      for (const n of this.ShareAllyLink)
        this.voe.has(n) ||
          ((i = EntitySystem_1.EntitySystem.Get(n))?.Valid &&
            (i = i.GetComponent(46))?.Valid &&
            i.AiController.AiPerception?.Moe.delete(this.E0));
      var h = this.voe;
      (this.voe = this.ShareAllyLink),
        (this.ShareAllyLink = h),
        AsyncAiPerception.qoe.Stop();
    }
  }
  Koe() {
    AsyncAiPerception.Goe.Start(), this.AllEnemies.clear();
    for (const i of this.Enemies) this.AllEnemies.add(i);
    this.Eoe.clear(), (this.f6.length = 0), this.Eoe.add(this.E0);
    for (const s of this.Moe) this.f6.push(s), this.Eoe.add(s);
    for (; 0 < this.f6.length; ) {
      var t = this.f6.pop(),
        t = EntitySystem_1.EntitySystem.Get(t);
      if (t?.Valid) {
        t = t.GetComponent(46);
        if (t?.Valid && t.AiController.AiPerception) {
          for (const e of t.AiController.AiPerception.Enemies)
            this.AllEnemies.add(e);
          for (const h of t.AiController.AiPerception.Moe)
            this.Eoe.has(h) || (this.Eoe.add(h), this.f6.push(h));
        }
      }
    }
    AsyncAiPerception.Goe.Stop();
  }
  OnEntityCampModified(i, s, t) {
    if (this.AiPerceptionData)
      if (i.Id === this.Bte.CharAiDesignComp?.Entity.Id)
        (this.Noe = this.Bte.CharActorComp.Actor.Camp), this.Clear(!1, !0);
      else {
        var e = cpp_1.FAiModel.GetEntitySenseType(this.AiPerceptionData, i.Id);
        if (0 === e) {
          (e = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, s)),
            (s = CampUtils_1.CampUtils.GetCampRelationship(this.Noe, t));
          if (e !== s) {
            let t = !1;
            switch (e) {
              case 2:
                (t = this.Enemies.delete(i.Id)), this.AllEnemies.delete(i.Id);
                break;
              case 1:
                t = this.Allies.delete(i.Id);
                break;
              default:
                t = this.Neutrals.delete(i.Id);
            }
            if (t) {
              switch (
                (this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(
                  !1,
                  i.Id,
                  e,
                ),
                s)
              ) {
                case 2:
                  this.Enemies.add(i.Id), this.AllEnemies.add(i.Id);
                  break;
                case 1:
                  this.Allies.add(i.Id);
                  break;
                default:
                  this.Neutrals.add(i.Id);
              }
              this.Bte.AiPerceptionEvents.CollectAiPerceptionEventById(
                !0,
                i.Id,
                s,
              );
            }
          }
        }
      }
  }
}
((exports.AsyncAiPerception = AsyncAiPerception).yi_ = Stats_1.Stat.Create(
  "AsyncAiPerception.AfterAsyncTask",
)),
  (AsyncAiPerception.boe = Stats_1.Stat.Create("AsyncAiPerception.SenseActor")),
  (AsyncAiPerception.qoe = Stats_1.Stat.Create(
    "AsyncAiPerception.FindShareAlly",
  )),
  (AsyncAiPerception.Goe = Stats_1.Stat.Create(
    "AsyncAiPerception.RefreshAllEnemies",
  ));
//# sourceMappingURL=AsyncAiPerception.js.map
