"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, n) {
    let s;
    const r = arguments.length;
    let o =
      r < 3 ? i : n === null ? (n = Object.getOwnPropertyDescriptor(i, e)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      o = Reflect.decorate(t, i, e, n);
    else
      for (let h = t.length - 1; h >= 0; h--)
        (s = t[h]) && (o = (r < 3 ? s(o) : r > 3 ? s(i, e, o) : s(i, e)) || o);
    return r > 3 && o && Object.defineProperty(i, e, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.Entity =
    exports.TickComponentManager =
    exports.DISABLE_REASON_LENGTH_LIMIT =
      void 0);
const Log_1 = require("../Common/Log");
const Stats_1 = require("../Common/Stats");
const CommonDefine_1 = require("../Define/CommonDefine");
const GameBudgetAllocatorConfig_1 = require("../GameBudgetAllocator/GameBudgetAllocatorConfig");
const GameBudgetInterfaceController_1 = require("../GameBudgetAllocator/GameBudgetInterfaceController");
const ObjectBase_1 = require("../Object/ObjectBase");
const PerformanceDecorators_1 = require("../Performance/PerformanceDecorators");
const FNameUtil_1 = require("../Utils/FNameUtil");
const MathUtils_1 = require("../Utils/MathUtils");
const EntityComponent_1 = require("./EntityComponent");
const EntityComponentSystem_1 = require("./EntityComponentSystem");
const EntityHelper_1 = require("./EntityHelper");
const EntitySystem_1 = require("./EntitySystem");
exports.DISABLE_REASON_LENGTH_LIMIT = 4;
class TickComponentInfo {
  constructor(t, i, e) {
    (this.Component = t), (this.Index = i), (this.Priority = e);
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
    (this.oW = this.nW.length > 0 || this.sW.length > 0),
      (this.rW = this.aW.length > 0 || this.hW.length > 0),
      this.nW.sort(TickComponentManager.S7),
      this.sW.sort(TickComponentManager.S7),
      this.aW.sort(TickComponentManager.S7),
      this.hW.sort(TickComponentManager.S7);
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
      for (const e of this.nW)
        e.Component.NeedTick && e.Component.Tick(this.Z7);
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
      for (const e of this.aW)
        e.Component.NeedAfterTick && e.Component.AfterTick(this.tW);
      (this.tW = 0), (this.iW = 0);
    }
  }
}
(exports.TickComponentManager = TickComponentManager).S7 = (t, i) =>
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
      (this.MW = 0),
      (this.SW = !1),
      (this.EW = 1),
      (this.yW = void 0),
      (this.IW = void 0),
      (this.TW = -1),
      (this.LW = new Array()),
      (this.DW = new Map()),
      (this.LocationProxyFunction = void 0);
  }
  get IsEncloseSpace() {
    return this.SW;
  }
  set IsEncloseSpace(t) {
    this.SW = t;
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
    const t = this.constructor.name;
    let i = Entity.UW.get(t);
    return (
      i ||
        ((i = [void 0, void 0, void 0, void 0, void 0, void 0, void 0, void 0]),
        Entity.UW.set(t, i)),
      i
    );
  }
  get Active() {
    return this.DW.size === 0;
  }
  get TimeDilation() {
    return this.EW;
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
    const i = this.GetComponent(t);
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
  AddComponent(t, i, e) {
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
      const n = t.Id;
      if (n < 0)
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            3,
            "组件没有加上RegisterComponent装饰器",
            ["entity", this.constructor.name],
            ["component", t.name],
          );
      else {
        var s = t.Dependencies;
        if (s)
          for (const y of s)
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
        var s = EntitySystem_1.EntitySystem.Get(this.Id);
        const r = EntityComponentSystem_1.EntityComponentSystem.Create(t, s, e);
        if (r) {
          if (void 0 === i || r.NeedTick || r.ForceTick) {
            let t = r?.__proto__;
            for (
              ;
              t?.constructor &&
              t instanceof EntityComponent_1.EntityComponent &&
              t.constructor !== EntityComponent_1.EntityComponent;

            ) {
              const o = t.constructor;
              const h = o.Id;
              if (h < 0)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    3,
                    "组件没有加上RegisterComponent装饰器",
                    ["id", n],
                    ["entity", this.constructor.name],
                    ["component", o.name],
                  )
                );
              const a = this.LW[h];
              if (a)
                return void (
                  Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Entity",
                    1,
                    "添加组件失败：组件已存在，请勿重复添加！",
                    ["entity", this.constructor.name],
                    ["Id", this.Id],
                    ["AddComponent", o.name],
                    ["ExistComponent", a.constructor.name],
                  )
                );
              for (; this.LW.length <= h; ) this.LW.push(void 0);
              (this.LW[h] = r), (t = t?.__proto__);
            }
            return (
              this.Components.push(r), this.TickComponentManager.Add(r, i), r
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
    this.EW = t;
    for (const i of this.Components) i.SetTimeDilation(t);
  }
  ChangeTickInterval(t) {
    this.MW = t;
  }
  GetTickInterval() {
    return this.MW;
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
        for (const e of this.Components)
          e.OnEntityWasRecentlyRenderedOnScreenChange &&
            (this.OnWasRecentlyRenderComponents ||
              (this.OnWasRecentlyRenderComponents = new Array()),
            this.OnWasRecentlyRenderComponents.push(e)),
            e.OnEntityBudgetTickEnableChange &&
              (this.OnBudgetTickEnableChangeComponents ||
                (this.OnBudgetTickEnableChangeComponents = new Array()),
              this.OnBudgetTickEnableChangeComponents.push(e));
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
    const i = this.RW();
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
          !1
        );
      }
    return (this.pW = 1), this.TickComponentManager.Sort(), !0;
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
    if (this.OnInit !== Entity.prototype.OnInit)
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
          !1
        );
      }
    for (const t of this.Components) if (!t.Init()) return !1;
    return (this.pW |= 2), !0;
  }
  Clear() {
    let i = !1;
    for (let t = this.Components.length - 1; t >= 0; --t)
      EntityComponentSystem_1.EntityComponentSystem.Destroy(
        this,
        this.Components[t],
      ) || (i = !0);
    if (i) return !1;
    if (this.OnClear !== Entity.prototype.OnClear)
      try {
        if (!this.OnClear())
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 1, "清理失败", [
                "entity",
                this.constructor.name,
              ]),
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
          !1
        );
      }
    return this.AW(), (this.pW |= 32), !0;
  }
  AW() {
    (this.vW = 0),
      (this.MW = 0),
      (this.EW = 1),
      (this.SW = !1),
      this.TickComponentManager.Clear(),
      this.DW.clear();
  }
  Start() {
    if (this.OnStart !== Entity.prototype.OnStart)
      try {
        if (!this.OnStart())
          return (
            Log_1.Log.CheckError() &&
              Log_1.Log.Error("Entity", 1, "Entity开始失败", [
                "entity",
                this.constructor.name,
              ]),
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
          !1
        );
      }
    for (const t of this.Components) if (!t.Start()) return !1;
    return (this.pW |= 4), !0;
  }
  Activate() {
    for (const t of this.Components) t.Activate();
    this.pW |= 8;
  }
  End() {
    if (4 & this.pW) {
      let i = !1;
      for (let t = this.Components.length - 1; t >= 0; --t)
        this.Components[t].End() || (i = !0);
      if (i) return !1;
      if (this.OnEnd !== Entity.prototype.OnEnd)
        try {
          if (!this.OnEnd())
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Entity", 1, "Entity结束失败", [
                  "entity",
                  this.constructor.name,
                ]),
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
            !1
          );
        }
      this.pW |= 16;
    }
    return !0;
  }
  Enable(t, i) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Entity",
        3,
        "Entity.Enable",
        ["EntityId", this.Id],
        ["EntityName", this.constructor.name],
        ["Handle", t],
        ["Reason", i],
      );
    const e = this.DW.get(t)[1];
    if (!e)
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
    this.DW.delete(t);
    let n = !0;
    for (let t = e.length - 1; t >= 0; --t)
      e[t][0].Enable(e[t][1], i) || (n = !1);
    return n;
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
    let e;
    const t = ++this.vW;
    const n = new Array();
    let s = (this.DW.set(t, [i, n]), void 0);
    for (let t = this.Components.length - 1; t >= 0; --t)
      (e = (s = this.Components[t]).Disable(i)), n.push([s, e]);
    return (
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
  ForceTick(i) {
    if (this.Active) {
      let t = void 0;
      (t = this.TickStatTdType || this.gW),
        this.TickComponentManager.ForceTick(i * this.EW);
    }
  }
  ScheduledTick(t, i, e) {
    (this.MW = i),
      MathUtils_1.MathUtils.IsNearlyEqual(this.TW, e) ||
        ((this.TW = e), EntityHelper_1.EntitySystemHelper.IsSortDirty) ||
        (EntityHelper_1.EntitySystemHelper.IsSortDirty = !0),
      this.Valid &&
        this.IsInit &&
        this.Tick(t * CommonDefine_1.MILLIONSECOND_PER_SECOND);
  }
  Tick(i) {
    if (this.Active) {
      let t = void 0;
      (t = this.TickStatTdType || this.gW),
        this.TickComponentManager.Tick(this.MW, i * this.EW);
    } else this.TickComponentManager.ClearDelta();
  }
  ForceAfterTick(i) {
    if (this.Active) {
      let t = void 0;
      (t = this.TickStatTdType || this.gW),
        this.TickComponentManager.ForceAfterTick(i * this.EW);
    }
  }
  ScheduledAfterTick(t, i, e) {
    this.Valid && this.IsInit && this.AfterTick(1e3 * t);
  }
  OnEnabledChange(t, i) {
    if (this.OnBudgetTickEnableChangeComponents)
      for (const e of this.OnBudgetTickEnableChangeComponents)
        e.OnEntityBudgetTickEnableChange(t);
  }
  OnWasRecentlyRenderedOnScreenChange(t) {
    if (this.OnWasRecentlyRenderComponents)
      for (const i of this.OnWasRecentlyRenderComponents)
        i.OnEntityWasRecentlyRenderedOnScreenChange(t);
  }
  AfterTick(t) {
    this.Active
      ? (this.AfterTickStatTdType,
        this.TickComponentManager.AfterTick(this.MW, t * this.EW),
        this.AfterTickStatTdType)
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
    let t;
    let i;
    const e = new Array();
    let n = "";
    for ([t, i] of this.DW)
      e.push(`${n}{Handle:${t},Reason:${i[0]}}`), (n = " ");
    return e.join("");
  }
  DumpComponentsDisableInfo() {
    const t = new Array();
    let i = "";
    for (const e of this.Components)
      e.DumpDisableInfo().length !== 0 &&
        (t.push(i + "componentInfo"), (i = " "));
    return t.join("");
  }
}
(Entity.StaticGameBudgetConfigInternal = void 0),
  (Entity.UW = new Map()),
  __decorate(
    [(0, PerformanceDecorators_1.EntityTickPerformanceEx)(!0)],
    Entity.prototype,
    "Tick",
    null,
  ),
  __decorate(
    [(0, PerformanceDecorators_1.EntityTickPerformanceEx)(!1)],
    Entity.prototype,
    "AfterTick",
    null,
  ),
  (exports.Entity = Entity);
// # sourceMappingURL=Entity.js.map
