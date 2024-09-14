"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.EntityComponent = void 0);
const Log_1 = require("../Common/Log"),
  Stats_1 = require("../Common/Stats"),
  PerformanceDecorators_1 = require("../Performance/PerformanceDecorators"),
  Entity_1 = require("./Entity");
class EntityComponent {
  constructor() {
    (this.UnResetPropertySet = void 0),
      (this.PW = void 0),
      (this.vW = 0),
      (this.PFa = new Map()),
      (this.wFa = new Map()),
      (this.m6 = void 0),
      (this._W = void 0),
      (this.uW = void 0),
      (this.cW = void 0),
      (this.mW = void 0),
      (this.dW = void 0),
      (this.xW = void 0),
      (this.wW = void 0),
      (this.BW = void 0),
      (this.bW = void 0),
      (this.qzo = !0),
      (this.qW = !1),
      (this.GW = !1),
      (this.oW = !1),
      (this.NW = !1),
      (this.rW = !1),
      (this.OW = !1),
      (this.kW = !1),
      (this.OnEntityWasRecentlyRenderedOnScreenChange = void 0),
      (this.OnEntityBudgetTickEnableChange = void 0),
      (this.qW = this.OnEnable !== EntityComponent.prototype.OnEnable),
      (this.GW = this.OnDisable !== EntityComponent.prototype.OnDisable),
      (this.oW = this.OnTick !== EntityComponent.prototype.OnTick),
      (this.NW = this.OnForceTick !== EntityComponent.prototype.OnForceTick),
      (this.rW = this.OnAfterTick !== EntityComponent.prototype.OnAfterTick),
      (this.OW =
        this.OnForceAfterTick !== EntityComponent.prototype.OnForceAfterTick),
      (this.kW =
        this.OnChangeTimeDilation !==
        EntityComponent.prototype.OnChangeTimeDilation);
    var t = this.constructor.name;
    let i = void 0;
    EntityComponent.UW.has(t)
      ? (i = EntityComponent.UW.get(t))
      : ((i = [
          Stats_1.Stat.Create(t + ".Create"),
          Stats_1.Stat.Create(t + ".Init"),
          Stats_1.Stat.Create(t + ".Clear"),
          Stats_1.Stat.Create(t + ".Start"),
          Stats_1.Stat.Create(t + ".End"),
          Stats_1.Stat.Create(t + ".Activate"),
          Stats_1.Stat.Create(t + ".Tick"),
          Stats_1.Stat.Create(t + ".ForceTick"),
          Stats_1.Stat.Create(t + ".AfterTick"),
          Stats_1.Stat.Create(t + ".ForceAfterTick"),
        ]),
        EntityComponent.UW.set(t, i)),
      ([
        this.m6,
        this._W,
        this.uW,
        this.cW,
        this.mW,
        this.dW,
        this.xW,
        this.wW,
        this.BW,
        this.bW,
      ] = i);
  }
  static get Dependencies() {}
  get Valid() {
    return !!this.Entity && this.Entity.IsCreate && !this.Entity.IsClear;
  }
  AW() {
    this.PFa.clear(), (this.vW = 0), (this.PW = void 0);
  }
  get Entity() {
    return this.PW;
  }
  get Active() {
    return this.qzo;
  }
  get NeedTick() {
    return this.oW;
  }
  get NeedForceTick() {
    return this.NW;
  }
  get NeedAfterTick() {
    return this.rW;
  }
  get NeedForceAfterTick() {
    return this.OW;
  }
  get TimeDilation() {
    return this.Entity.TimeDilation;
  }
  FW(t, i) {
    try {
      if (!t())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              1,
              "组件生命周期执行失败",
              ["name", i],
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
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
              "组件生命周期执行异常",
              t,
              ["name", i],
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              1,
              "组件生命周期执行异常",
              ["name", i],
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t],
            ),
        !1
      );
    }
    return !0;
  }
  VW(t, i, s) {
    i.Start();
    t = this.FW(t, s);
    return i.Stop(), t;
  }
  Create(t, i) {
    return (
      (this.PW = t),
      this.OnCreate === EntityComponent.prototype.OnCreate ||
        this.VW(() => this.OnCreate(i), this.m6, this.Create.name)
    );
  }
  Respawn(t, i) {
    return (
      (this.PW = t),
      this.OnCreate === EntityComponent.prototype.OnCreate ||
        this.VW(() => this.OnCreate(i), this.m6, this.Create.name)
    );
  }
  RespawnNew(t) {
    return (this.PW = t), !0;
  }
  InitData(t) {
    return this.OnInitData(t);
  }
  Init() {
    return (
      this.OnInit === EntityComponent.prototype.OnInit ||
      this.VW(() => this.OnInit(), this._W, this.OnInit.name)
    );
  }
  Deinit() {
    return (
      this.OnDeinit === EntityComponent.prototype.OnDeinit ||
      this.VW(() => this.OnDeinit(), this._W, this.OnDeinit.name)
    );
  }
  Clear() {
    var t;
    return this.OnClear === EntityComponent.prototype.OnClear
      ? (this.AW(), !0)
      : ((t = this.VW(() => this.OnClear(), this.uW, this.OnClear.name)),
        this.AW(),
        t);
  }
  Start() {
    return (
      this.OnStart === EntityComponent.prototype.OnStart ||
      this.VW(() => !!this.OnStart(), this.cW, this.OnStart.name)
    );
  }
  Activate() {
    this.OnActivate !== EntityComponent.prototype.OnActivate &&
      this.VW(() => (this.OnActivate(), !0), this.dW, this.OnActivate.name);
  }
  End() {
    return (
      this.OnEnd === EntityComponent.prototype.OnEnd ||
      this.VW(() => this.OnEnd(), this.mW, this.OnEnd.name)
    );
  }
  RefreshEnable(i) {
    var t = this.qzo;
    (this.qzo = 0 === this.PFa.size && 0 === this.wFa.size),
      this.PW && (this.qzo = this.qzo && this.PW.Active),
      this.qzo !== t &&
        (this.qzo
          ? this.qW && this.FW(() => (this.OnEnable(), !0), this.OnEnable.name)
          : this.GW &&
            this.FW(() => {
              var t =
                "string" == typeof i ? i : "EEntityDisableKey." + i?.toString();
              return this.OnDisable(t), !0;
            }, this.OnDisable.name));
  }
  Enable(t, i) {
    return t && this.PFa.delete(t)
      ? (this.RefreshEnable(i), !0)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Entity",
            1,
            "组件激活失败句柄不存在",
            ["EntityId", this.Entity.Id],
            ["EntityName", this.constructor.name],
            ["Handle", t],
            ["Reason", i],
          ),
        !1);
  }
  Disable(t) {
    t
      ? t.length < Entity_1.DISABLE_REASON_LENGTH_LIMIT &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Entity",
          3,
          "Disable的Reason字符串长度必须大于等于限制字符数量",
          ["Component", this.constructor.name],
          ["Reason", t],
          ["限制的字符数量", Entity_1.DISABLE_REASON_LENGTH_LIMIT],
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Entity", 3, "Disable的Reason不能使用undefined", [
          "Component",
          this.constructor.name,
        ]);
    var i = ++this.vW;
    return this.PFa.set(i, t), this.RefreshEnable(t), i;
  }
  EnableByKey(t, i = !0) {
    var s = this.wFa.get(t);
    !s || s <= 0
      ? void 0 !== s && this.wFa.delete(t)
      : (!i && 1 < s ? this.wFa.set(t, s - 1) : this.wFa.delete(t),
        this.RefreshEnable(t));
  }
  DisableByKey(t, i = !0) {
    var s = Math.max(0, this.wFa.get(t) ?? 0);
    (i && 0 < s) || (this.wFa.set(t, s + 1), this.RefreshEnable(t));
  }
  Tick(t) {
    if (this.Active) {
      var i = this.xW;
      i?.Start();
      try {
        this.OnTick(t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Entity",
              1,
              "组件 Tick 异常",
              t,
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              1,
              "组件 Tick 异常",
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t],
            );
      }
      i?.Stop();
    }
  }
  ForceTick(t) {
    if (this.Active) {
      this.wW.Start();
      try {
        this.OnForceTick(t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Entity",
              1,
              "组件 ForceTick 异常",
              t,
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              1,
              "组件 ForceTick 异常",
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t],
            );
      }
      this.wW.Stop();
    }
  }
  AfterTick(t) {
    if (this.Active) {
      this.BW.Start();
      try {
        this.OnAfterTick(t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Entity",
              1,
              "组件 AfterTick 异常",
              t,
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              1,
              "组件 AfterTick 异常",
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t],
            );
      }
      this.BW.Stop();
    }
  }
  ForceAfterTick(t) {
    if (this.Active) {
      this.bW.Start();
      try {
        this.OnForceAfterTick(t);
      } catch (t) {
        t instanceof Error
          ? Log_1.Log.CheckError() &&
            Log_1.Log.ErrorWithStack(
              "Entity",
              1,
              "组件 ForceAfterTick 异常",
              t,
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t.message],
            )
          : Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Entity",
              1,
              "组件 ForceAfterTick 异常",
              ["Id", this.Entity.Id],
              ["entity", this.Entity.constructor.name],
              ["component", this.constructor.name],
              ["error", t],
            );
      }
      this.bW.Stop();
    }
  }
  SetTimeDilation(t) {
    this.kW &&
      this.FW(
        () => (this.OnChangeTimeDilation(t), !0),
        this.OnChangeTimeDilation.name,
      );
  }
  OnCreate(t) {
    return !0;
  }
  OnInitData(t) {
    return !0;
  }
  OnInit(t) {
    return !0;
  }
  OnDeinit(t) {
    return !0;
  }
  OnClear() {
    return !0;
  }
  OnStart() {
    return !0;
  }
  OnActivate() {}
  OnEnd() {
    return !0;
  }
  OnEnable() {}
  OnDisable(t) {}
  OnTick(t) {}
  OnForceTick(t) {}
  OnAfterTick(t) {}
  OnForceAfterTick(t) {}
  OnChangeTimeDilation(t) {}
  toString() {
    return `[object ${this.constructor.name}(Id=${this.Entity?.Id})${this.Valid ? "" : "(D)"}]`;
  }
  DumpDisableInfo() {
    var t,
      i,
      s = new Array();
    let n = "";
    for ([t, i] of this.PFa)
      s.push(
        `${n}{Component:${this.constructor.name},Handle:${t},Reason:${i}}`,
      ),
        (n = " ");
    return s.join("");
  }
  AddUnResetProperty(...t) {
    this.UnResetPropertySet || (this.UnResetPropertySet = new Set());
    for (const i of t)
      this.UnResetPropertySet.has(i) || this.UnResetPropertySet.add(i);
  }
}
((exports.EntityComponent = EntityComponent).Id = -1),
  (EntityComponent.UW = new Map());
//# sourceMappingURL=EntityComponent.js.map
