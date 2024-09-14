"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Entity =
    exports.TickComponentManager =
    exports.DISABLE_REASON_LENGTH_LIMIT =
      void 0);
const Info_1 = require("../Common/Info"),
  Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  Time_1 = require("../Common/Time"),
  CommonDefine_1 = require("../Define/CommonDefine"),
  GameBudgetAllocatorConfig_1 = require("../GameBudgetAllocator/GameBudgetAllocatorConfig"),
  GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController"),
  ObjectBase_1 = require("../Object/ObjectBase"),
  PerformanceDecorators_1 = require("../Performance/PerformanceDecorators"),
  FNameUtil_1 = require("../Utils/FNameUtil"),
  MathUtils_1 = require("../Utils/MathUtils"),
  EntityComponent_1 = require("./EntityComponent"),
  EntityComponentSystem_1 = require("./EntityComponentSystem"),
  EntityHelper_1 = require("./EntityHelper"),
  EntitySystem_1 = require("./EntitySystem");
exports.DISABLE_REASON_LENGTH_LIMIT = 4;
class TickComponentInfo {
  constructor(t, i, s) {
    (this.Component = t), (this.Index = i), (this.Priority = s);
  }
}
class TickComponentManager {
  constructor() {
    (this.Z7 = 0),
      (this.eW = 0),
      (this.tW = 0),
      (this.iW = 0),
      (this.oW = !1),
      (this.rW = !1),
      (this.nW = new Array()),
      (this.sW = new Array()),
      (this.aW = new Array()),
      (this.hW = new Array()),
      (this.lW = 0);
  }
  GetCurrentTickIntervalCount() {
    return this.eW;
  }
  get NeedTick() {
    return this.oW;
  }
  get NeedAfterTick() {
    return this.rW;
  }
  Clear() {
    (this.Z7 = 0), (this.eW = 0), (this.tW = 0), (this.iW = 0);
  }
  ClearDelta() {
    this.Z7 = 0;
  }
  Add(t, i) {
    (t.NeedTick ||
      t.NeedForceTick ||
      t.NeedAfterTick ||
      t.NeedForceAfterTick) &&
      ((i = new TickComponentInfo(t, this.lW, i || 0)),
      (t.NeedTick || t.NeedForceTick) && this.nW.push(i),
      t.NeedForceTick && this.sW.push(i),
      (t.NeedAfterTick || t.NeedForceAfterTick) && this.aW.push(i),
      t.NeedForceAfterTick && this.hW.push(i),
      this.lW++);
  }
  Sort() {
    (this.oW = 0 < this.nW.length || 0 < this.sW.length),
      (this.rW = 0 < this.aW.length || 0 < this.hW.length),
      this.nW.sort(TickComponentManager.E7),
      this.sW.sort(TickComponentManager.E7),
      this.aW.sort(TickComponentManager.E7),
      this.hW.sort(TickComponentManager.E7);
  }
  ForceTick(t) {
    for (const i of this.sW) i.Component.ForceTick(t);
  }
  Tick(t, i) {
    if (
      ((this.Z7 += i),
      this.eW++,
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen ||
        !(this.eW < t))
    ) {
      for (const s of this.nW)
        s.Component.NeedTick && s.Component.Tick(this.Z7);
      (this.Z7 = 0), (this.eW = 0);
    }
  }
  ForceAfterTick(t) {
    for (const i of this.hW) i.Component.ForceAfterTick(t);
  }
  AfterTick(t, i) {
    if (
      ((this.tW += i),
      this.iW++,
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen ||
        !(this.iW < t))
    ) {
      for (const s of this.aW)
        s.Component.NeedAfterTick && s.Component.AfterTick(this.tW);
      (this.tW = 0), (this.iW = 0);
    }
  }
}
(exports.TickComponentManager = TickComponentManager).E7 = (t, i) =>
  t.Priority === i.Priority ? t.Index - i.Index : i.Priority - t.Priority;
class Entity extends ObjectBase_1.ObjectBase {
  constructor(t, i) {
    super(t, i),
      (this.UsePool = !1),
      (this.m6 = void 0),
      (this._W = void 0),
      (this.InitStatTdType = void 0),
      (this.uW = void 0),
      (this.ClearStatTdType = void 0),
      (this.cW = void 0),
      (this.StartStatTdType = void 0),
      (this.mW = void 0),
      (this.EndStatTdType = void 0),
      (this.dW = void 0),
      (this.ActivateStatTdType = void 0),
      (this.gW = void 0),
      (this.TickStatTdType = void 0),
      (this.fW = void 0),
      (this.AfterTickStatTdType = void 0),
      (this.pW = 0),
      (this.Components = new Array()),
      (this.OnWasRecentlyRenderComponents = void 0),
      (this.OnBudgetTickEnableChangeComponents = void 0),
      (this.TickComponentManager = new TickComponentManager()),
      (this.vW = 0),
      (this.lDa = 0),
      (this.MW = 0),
      (this.LastTickFrame = 0),
      (this.EW = !1),
      (this.SW = 1),
      (this.yW = void 0),
      (this.IW = void 0),
      (this.TW = -1),
      (this.LW = new Array()),
      (this.PFa = new Map()),
      (this.wFa = new Map()),
      (this.LocationProxyFunction = void 0);
  }
  get IsEncloseSpace() {
    return this.EW;
  }
  set IsEncloseSpace(t) {
    this.EW = t;
  }
  static StaticGameBudgetConfig(t) {
    return (
      this.StaticGameBudgetConfigInternal ||
        (this.StaticGameBudgetConfigInternal =
          new GameBudgetAllocatorConfig_1.TsGameBudgetGroupConfig(
            FNameUtil_1.FNameUtil.GetDynamicFName("NormalEntity"),
            1,
          )),
      this.StaticGameBudgetConfigInternal
    );
  }
  get GameBudgetManagedToken() {
    return this.yW;
  }
  get Flag() {
    return this.pW;
  }
  get GameBudgetConfig() {
    return this.IW;
  }
  get DistanceWithCamera() {
    return this.TW;
  }
  RW() {
    var t = this.constructor.name;
    let i = Entity.UW.get(t);
    return (
      i ||
        ((i = [
          Stats_1.Stat.Create(t + ".Create"),
          Stats_1.Stat.Create(t + ".Init"),
          Stats_1.Stat.Create(t + ".Clear"),
          Stats_1.Stat.Create(t + ".Start"),
          Stats_1.Stat.Create(t + ".End"),
          Stats_1.Stat.Create(t + ".Activate"),
          Stats_1.Stat.Create(t + ".Tick"),
          Stats_1.Stat.Create(t + ".AfterTick"),
        ]),
        Entity.UW.set(t, i)),
      i
    );
  }
  get Active() {
    return 0 === this.PFa.size && 0 === this.wFa.size;
  }
  get TimeDilation() {
    return this.SW;
  }
  get IsCreate() {
    return !!(1 & this.pW);
  }
  get IsInit() {
    return !!(8 & this.pW);
  }
  get IsEnd() {
    return !!(16 & this.pW);
  }
  get IsClear() {
    return !!(32 & this.pW);
  }
  ResetFlag() {
    this.pW = 0;
  }
  GetComponent(t) {
    return this.LW[t];
  }
  CheckGetComponent(t) {
    var i = this.GetComponent(t);
    return (
      i ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            1,
            "获取组件失败",
            ["Id", this.Id],
            ["entity", this.constructor.name],
            ["component", t],
          )),
      i
    );
  }
  AddComponent(t, i, s) {
    if (1 & this.pW)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          1,
          "实体已创建完成不能再添加组件",
          ["Id", this.Id],
          ["entity", this.constructor.name],
          ["component", t.name],
        );
    else {
      var e = t.Id;
      if (e < 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "组件没有加上RegisterComponent装饰器",
            ["entity", this.constructor.name],
            ["component", t.name],
          );
      else {
        var n = t.Dependencies;
        if (n)
          for (const y of n)
            if (!this.LW[y])
              return void (
                Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  1,
                  "添加组件检查依赖失败",
                  ["Id", this.Id],
                  ["entity", this.constructor.name],
                  ["component", t.name],
                  ["dependence", y],
                )
              );
        var n = EntitySystem_1.EntitySystem.Get(this.Id),
          h = EntityComponentSystem_1.EntityComponentSystem.Create(t, n, s);
        if (h) {
          if (void 0 === i || h.NeedTick || h.ForceTick) {
            let t = h?.__proto__;
            for (
              ;
              t?.constructor &&
              t instanceof EntityComponent_1.EntityComponent &&
              t.constructor !== EntityComponent_1.EntityComponent;

            ) {
              var r = t.constructor,
                o = r.Id;
              if (o < 0)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "组件没有加上RegisterComponent装饰器",
                    ["id", e],
                    ["entity", this.constructor.name],
                    ["component", r.name],
                  )
                );
              var a = this.LW[o];
              if (a)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    1,
                    "添加组件失败：组件已存在，请勿重复添加！",
                    ["entity", this.constructor.name],
                    ["Id", this.Id],
                    ["AddComponent", r.name],
                    ["ExistComponent", a.constructor.name],
                  )
                );
              for (; this.LW.length <= o; ) this.LW.push(void 0);
              (this.LW[o] = h), (t = t?.__proto__);
            }
            return (
              this.Components.push(h), this.TickComponentManager.Add(h, i), h
            );
          }
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              1,
              "组件不需要更新不需要设置更新优先级",
              ["Id", this.Id],
              ["entity", this.constructor.name],
              ["component", t.name],
            );
        }
      }
    }
  }
  SetTimeDilation(t) {
    this.SW = t;
    for (const i of this.Components) i.SetTimeDilation(t);
  }
  ChangeTickInterval(t) {
    this.MW = t;
  }
  GetTickInterval() {
    return this.MW;
  }
  GetDeltaSeconds() {
    return this.lDa;
  }
  RegisterToGameBudgetController(t, i) {
    if (GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen)
      if (this.IW)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            25,
            "Entity注册到时间预算管理器中失败，Token已经存在",
            ["entity", this.constructor.name],
            ["GameBudgetManagedToken", this.yW],
          );
      else {
        this.IW = this.constructor.StaticGameBudgetConfig(i || this);
        for (const s of this.Components)
          s.OnEntityWasRecentlyRenderedOnScreenChange &&
            (this.OnWasRecentlyRenderComponents ||
              (this.OnWasRecentlyRenderComponents = new Array()),
            this.OnWasRecentlyRenderComponents.push(s)),
            s.OnEntityBudgetTickEnableChange &&
              (this.OnBudgetTickEnableChangeComponents ||
                (this.OnBudgetTickEnableChangeComponents = new Array()),
              this.OnBudgetTickEnableChangeComponents.push(s));
        this.yW =
          GameBudgetInterfaceController_1.GameBudgetInterfaceController.RegisterTick(
            this.IW.GroupName,
            this.IW.SignificanceGroup,
            this,
            t,
            void 0 !== this.OnWasRecentlyRenderComponents,
          );
      }
  }
  UnregisterFromGameBudgetController() {
    GameBudgetInterfaceController_1.GameBudgetInterfaceController.IsOpen &&
      this.yW &&
      ((this.yW = void 0),
      (this.IW = void 0),
      GameBudgetInterfaceController_1.GameBudgetInterfaceController.UnregisterTick(
        this,
      ));
  }
  Create(t) {
    var i = this.RW();
    if (
      (([
        this.m6,
        this._W,
        this.uW,
        this.cW,
        this.mW,
        this.dW,
        this.gW,
        this.fW,
      ] = i),
      this.m6.Start(),
      this.OnCreate !== Entity.prototype.OnCreate)
    )
      try {
        if (!this.OnCreate(t))
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                1,
                "Entity创建失败，请检查前面组件的报错",
                ["entity", this.constructor.name],
              ),
            this.m6.Stop(),
            !1
          );
      } catch (t) {
        return (
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Entity",
                1,
                "Entity创建执行异常",
                t,
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                1,
                "Entity创建执行异常",
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t],
              ),
          this.m6.Stop(),
          !1
        );
      }
    return (this.pW = 1), this.TickComponentManager.Sort(), this.m6.Stop(), !0;
  }
  Respawn(t) {
    this.OnRespawn(t);
    for (const i of this.Components) if (!i.Respawn(this, t)) return !1;
    return (this.pW = 1), !0;
  }
  OnRespawn(t) {
    return !0;
  }
  InitData(t) {
    return this.OnInitData(t), !0;
  }
  OnInitData(t) {
    return !0;
  }
  Init() {
    if (2 & this.pW)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            1,
            "Entity重复执行Init",
            ["Id", this.Id],
            ["entity", this.constructor.name],
          ),
        !1
      );
    if (
      (this._W.Start(),
      this.InitStatTdType?.Start(),
      this.OnInit !== Entity.prototype.OnInit)
    )
      try {
        if (!this.OnInit())
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                1,
                "Entity初始化失败，请检查前面组件的报错",
                ["entity", this.constructor.name],
              ),
            this.InitStatTdType?.Stop(),
            this._W.Stop(),
            !1
          );
      } catch (t) {
        return (
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Entity",
                1,
                "Entity初始化执行异常",
                t,
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                1,
                "Entity初始化执行异常",
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t],
              ),
          this.InitStatTdType?.Stop(),
          this._W.Stop(),
          !1
        );
      }
    for (const t of this.Components)
      if (!t.Init()) return this.InitStatTdType?.Stop(), this._W.Stop(), !1;
    return (this.pW |= 2), this.InitStatTdType?.Stop(), this._W.Stop(), !0;
  }
  Clear() {
    this.uW.Start(), this.ClearStatTdType?.Start();
    let i = !1;
    for (let t = this.Components.length - 1; 0 <= t; --t)
      EntityComponentSystem_1.EntityComponentSystem.Destroy(
        this,
        this.Components[t],
      ) || (i = !0);
    if (i) return this.ClearStatTdType?.Stop(), this.uW.Stop(), !1;
    if (this.OnClear !== Entity.prototype.OnClear)
      try {
        if (!this.OnClear())
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 1, "清理失败", [
                "entity",
                this.constructor.name,
              ]),
            this.ClearStatTdType?.Stop(),
            this.uW.Stop(),
            !1
          );
      } catch (t) {
        return (
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Entity",
                1,
                "Entity清理执行异常",
                t,
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                1,
                "Entity清理执行异常",
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t],
              ),
          this.ClearStatTdType?.Stop(),
          this.uW.Stop(),
          !1
        );
      }
    return (
      this.AW(),
      this.ClearStatTdType?.Stop(),
      this.uW.Stop(),
      (this.pW |= 32),
      !0
    );
  }
  AW() {
    (this.vW = 0),
      (this.MW = 0),
      (this.SW = 1),
      (this.EW = !1),
      this.TickComponentManager.Clear(),
      this.PFa.clear(),
      this.wFa.clear();
  }
  Start() {
    if (4 & this.pW)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            1,
            "Entity重复执行Start",
            ["Id", this.Id],
            ["entity", this.constructor.name],
          ),
        !1
      );
    if (
      (this.cW.Start(),
      this.StartStatTdType?.Start(),
      this.OnStart !== Entity.prototype.OnStart)
    )
      try {
        if (!this.OnStart())
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 1, "Entity开始失败", [
                "entity",
                this.constructor.name,
              ]),
            this.StartStatTdType?.Stop(),
            this.cW.Stop(),
            !1
          );
      } catch (t) {
        return (
          t instanceof Error
            ? Log_1.Log.CheckError() &&
              Log_1.Log.ErrorWithStack(
                "Entity",
                1,
                "Entity开始执行异常",
                t,
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t.message],
              )
            : Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Entity",
                1,
                "Entity开始执行异常",
                ["Id", this.Id],
                ["entity", this.constructor.name],
                ["error", t],
              ),
          this.StartStatTdType?.Stop(),
          this.cW.Stop(),
          !1
        );
      }
    for (const t of this.Components)
      if (!t.Start()) return this.StartStatTdType?.Stop(), this.cW.Stop(), !1;
    return (this.pW |= 4), this.StartStatTdType?.Stop(), this.cW.Stop(), !0;
  }
  Activate() {
    this.dW.Start(), this.ActivateStatTdType?.Start();
    for (const t of this.Components) t.Activate();
    (this.pW |= 8), this.ActivateStatTdType?.Stop(), this.dW.Stop();
  }
  End() {
    if (4 & this.pW) {
      this.mW.Start(), this.EndStatTdType?.Start();
      let i = !1;
      for (let t = this.Components.length - 1; 0 <= t; --t)
        this.Components[t].End() || (i = !0);
      if (i) return this.EndStatTdType?.Stop(), this.mW.Stop(), !1;
      if (this.OnEnd !== Entity.prototype.OnEnd)
        try {
          if (!this.OnEnd())
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 1, "Entity结束失败", [
                  "entity",
                  this.constructor.name,
                ]),
              this.EndStatTdType?.Stop(),
              this.mW.Stop(),
              !1
            );
        } catch (t) {
          return (
            t instanceof Error
              ? Log_1.Log.CheckError() &&
                Log_1.Log.ErrorWithStack(
                  "Entity",
                  1,
                  "Entity结束执行异常",
                  t,
                  ["Id", this.Id],
                  ["entity", this.constructor.name],
                  ["error", t.message],
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Entity",
                  1,
                  "Entity结束执行异常",
                  ["Id", this.Id],
                  ["entity", this.constructor.name],
                  ["error", t],
                ),
            this.EndStatTdType?.Stop(),
            this.mW.Stop(),
            !1
          );
        }
      (this.pW |= 16), this.EndStatTdType?.Stop(), this.mW.Stop();
    }
    return !0;
  }
  Enable(t, i) {
    if (
      (Info_1.Info.IsBuildDevelopmentOrDebug &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "Entity.Enable",
          ["EntityId", this.Id],
          ["EntityName", this.constructor.name],
          ["Handle", t],
          ["Reason", i],
        ),
      !this.PFa.get(t)[1])
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            1,
            "Entity实体激活失败句柄不存在",
            ["EntityId", this.Id],
            ["EntityName", this.constructor.name],
            ["Handle", t],
            ["Reason", i],
          ),
        !1
      );
    this.PFa.delete(t);
    for (let t = this.Components.length - 1; 0 <= t; --t)
      this.Components[t].RefreshEnable(i);
    return !0;
  }
  Disable(i) {
    i
      ? i.length < exports.DISABLE_REASON_LENGTH_LIMIT &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "Disable的Reason字符串长度必须大于等于限制字符数量",
          ["EntityId", this.Id],
          ["Entity", this.constructor.name],
          ["Reason", i],
          ["限制的字符数量", exports.DISABLE_REASON_LENGTH_LIMIT],
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", [
          "Entity",
          this.constructor.name,
        ]);
    var t = ++this.vW;
    this.PFa.set(t, i);
    for (let t = this.Components.length - 1; 0 <= t; --t)
      this.Components[t].RefreshEnable(i);
    return (
      Info_1.Info.IsBuildDevelopmentOrDebug &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Entity",
          3,
          "Entity.Disable",
          ["EntityId", this.Id],
          ["EntityName", this.constructor.name],
          ["Handle", t],
          ["Reason", i],
        ),
      t
    );
  }
  EnableByKey(i, t = !0) {
    2 !== i && this.EnableByKey(2, !0);
    var s = this.wFa.get(i);
    if (!s || s <= 0) void 0 !== s && this.wFa.delete(i);
    else {
      !t && 1 < s ? this.wFa.set(i, s - 1) : this.wFa.delete(i);
      for (let t = this.Components.length - 1; 0 <= t; --t)
        this.Components[t].RefreshEnable(i);
    }
  }
  HasDisableKey(t) {
    return this.wFa.has(t);
  }
  DisableByKey(i, t = !0) {
    var s = Math.max(0, this.wFa.get(i) ?? 0);
    if (!(t && 0 < s)) {
      this.wFa.set(i, s + 1);
      for (let t = this.Components.length - 1; 0 <= t; --t)
        this.Components[t].RefreshEnable(i);
    }
  }
  ForceTick(t) {
    this.Active &&
      (this.gW?.Start(),
      this.TickStatTdType?.Start(),
      this.TickComponentManager.ForceTick(t * this.SW),
      this.TickStatTdType?.Stop(),
      this.gW?.Stop());
  }
  ScheduledTick(t, i, s) {
    (this.lDa = t),
      (this.MW = i),
      (this.LastTickFrame = Time_1.Time.Frame),
      MathUtils_1.MathUtils.IsNearlyEqual(this.TW, s) ||
        ((this.TW = s), EntityHelper_1.EntitySystemHelper.IsSortDirty) ||
        (EntityHelper_1.EntitySystemHelper.IsSortDirty = !0),
      this.Valid &&
        this.IsInit &&
        this.Tick(t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  Tick(t) {
    this.Active
      ? (this.gW?.Start(),
        this.TickStatTdType?.Start(),
        this.TickComponentManager.Tick(this.MW, t * this.SW),
        this.TickStatTdType?.Stop(),
        this.gW?.Stop())
      : this.TickComponentManager.ClearDelta();
  }
  ForceAfterTick(t) {
    this.Active &&
      (this.fW?.Start(),
      this.AfterTickStatTdType?.Start(),
      this.TickComponentManager.ForceAfterTick(t * this.SW),
      this.AfterTickStatTdType?.Stop(),
      this.fW?.Stop());
  }
  ScheduledAfterTick(t, i, s) {
    this.Valid && this.IsInit && this.AfterTick(1e3 * t);
  }
  OnEnabledChange(t, i) {
    if (this.OnBudgetTickEnableChangeComponents)
      for (const s of this.OnBudgetTickEnableChangeComponents)
        s.OnEntityBudgetTickEnableChange(t);
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    if (this.OnWasRecentlyRenderComponents)
      for (const i of this.OnWasRecentlyRenderComponents)
        i.OnEntityWasRecentlyRenderedOnScreenChange(t);
  }
  AfterTick(t) {
    this.Active
      ? (this.fW?.Start(),
        this.AfterTickStatTdType?.Start(),
        this.TickComponentManager.AfterTick(this.MW, t * this.SW),
        this.AfterTickStatTdType?.Stop(),
        this.fW?.Stop())
      : this.TickComponentManager.ClearDelta();
  }
  OnCreate(t) {
    return !0;
  }
  OnInit(t) {
    return !0;
  }
  OnDeinit() {
    return !0;
  }
  OnClear() {
    return !0;
  }
  OnStart() {
    return !0;
  }
  OnEnd() {
    return !0;
  }
  toString() {
    return `[object ${this.constructor.name}(Id=${this.Id})${this.Valid ? "" : "(D)"}]`;
  }
  DumpDisableInfo() {
    var t,
      i,
      s = new Array();
    let e = "";
    for ([t, i] of this.PFa)
      s.push(`${e}{Handle:${t},Reason:${i[0]}}`), (e = " ");
    return s.join("");
  }
  DumpComponentsDisableInfo() {
    var t = new Array();
    let i = "";
    for (const s of this.Components)
      0 !== s.DumpDisableInfo().length &&
        (t.push(i + "componentInfo"), (i = " "));
    return t.join("");
  }
}
((exports.Entity = Entity).StaticGameBudgetConfigInternal = void 0),
  (Entity.UW = new Map());
//# sourceMappingURL=Entity.js.map
