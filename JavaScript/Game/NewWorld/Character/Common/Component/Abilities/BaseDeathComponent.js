"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, a) {
    var i,
      n = arguments.length,
      s =
        n < 3
          ? e
          : null === a
            ? (a = Object.getOwnPropertyDescriptor(e, o))
            : a;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, o, a);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (i = t[h]) && (s = (n < 3 ? i(s) : 3 < n ? i(e, o, s) : i(e, o)) || s);
    return 3 < n && s && Object.defineProperty(e, o, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BaseDeathComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  CombatLog_1 = require("../../../../../Utils/CombatLog"),
  deathMontagePathMap = new Map([
    [0, "AM_Death"],
    [1, "AM_Death_InWater"],
    [2, "AM_Death_InAir"],
    [3, "AM_Death_Falling"],
  ]);
let BaseDeathComponent = class BaseDeathComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.IsDeadInternal = !1),
      (this.MontageComponent = void 0),
      (this.eqc = new Map()),
      (this.AOr = 0),
      (this.tqc = new Map());
  }
  OnStart() {
    return (
      (this.MontageComponent = this.Entity.CheckGetComponent(24)),
      this.iqc(),
      !0
    );
  }
  IsDead() {
    return this.IsDeadInternal;
  }
  ExecuteDeath(t) {
    return this.IsDeadInternal
      ? (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Character", 19, "实体重复死亡", [
            "entityId",
            this.Entity.Id,
          ]),
        !1)
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Battle",
            19,
            "[DeathComponent]执行角色死亡逻辑",
            ["Entity", this.Entity.toString()],
            ["PbDataId", this.Entity?.GetComponent(0)?.GetPbDataId()],
          ),
        (this.IsDeadInternal = !0));
  }
  HasDeathMontage(t) {
    return this.eqc.has(t) || this.tqc.has(t);
  }
  PlayDeathMontageWithType(t, e, o) {
    let a = void 0;
    var i = this.tqc.get(t);
    if (i && 0 < i.size) {
      let t = void 0;
      for (t of i.values());
      t && (a = this.MontageComponent.CreateTaskWithName(t, void 0, e));
    } else {
      var i = this.eqc.get(t);
      i && (a = this.MontageComponent.CreateTaskWithMontage(i, void 0, e));
    }
    void 0 === a
      ? ((i = deathMontagePathMap.get(t)),
        CombatLog_1.CombatLog.Warn(
          "Animation",
          this.Entity,
          "蒙太奇播放失败",
          ["montageType", t],
          ["path", i],
        ),
        e?.(!0))
      : this.MontageComponent.PlayMontageTaskWhenReady(a, 0, o);
  }
  ReplaceDeathMontage(t, e) {
    let o = this.tqc.get(t);
    return (
      o || this.tqc.set(t, (o = new Map())), o.set(++this.AOr, e), this.AOr
    );
  }
  ResetDeathMontage(t) {
    for (const e of this.tqc.values()) e?.delete(t);
  }
  iqc() {
    for (var [t, e] of deathMontagePathMap.entries()) {
      e = this.MontageComponent.GetMontageByName(e);
      e && this.eqc.set(t, e);
    }
  }
};
(BaseDeathComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(15)],
  BaseDeathComponent,
)),
  (exports.BaseDeathComponent = BaseDeathComponent);
//# sourceMappingURL=BaseDeathComponent.js.map
