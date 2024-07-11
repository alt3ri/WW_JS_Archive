"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    var r,
      s = arguments.length,
      h =
        s < 3
          ? e
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(e, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      h = Reflect.decorate(t, e, i, o);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (r = t[n]) && (h = (s < 3 ? r(h) : 3 < s ? r(e, i, h) : r(e, i)) || h);
    return 3 < s && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterShieldComponent = exports.CharacterShield = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ShieldById_1 = require("../../../../../Core/Define/ConfigQuery/ShieldById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
class CharacterShield {
  constructor(t, e, i) {
    (this.Id = t),
      (this.TemplateId = e),
      (this.Value = i),
      (this.Priority = 0),
      (this.ShieldValue = 0),
      (this.HandleId = 0),
      (this.HandleId = t);
    t = ShieldById_1.configShieldById.GetConfig(e);
    t
      ? ((this.Priority = t.Priority), (this.ShieldValue = i))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Battle", 36, "护盾添加失败，护盾Id不存在", ["Id", e]);
  }
}
exports.CharacterShield = CharacterShield;
let CharacterShieldComponent = class CharacterShieldComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.m1t = void 0),
      (this.Xte = void 0),
      (this.Kjr = new Map()),
      (this.Qjr = 0);
  }
  get ShieldTotal() {
    return this.Qjr;
  }
  OnStart() {
    return (
      (this.m1t = this.Entity.CheckGetComponent(159)),
      (this.Xte = this.Entity.CheckGetComponent(188)),
      !0
    );
  }
  OnActivate() {
    this.Kjr.clear, (this.Qjr = 0);
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("Hys")?.Hys?.pTs;
    if (t) for (const e of t) this.Add(e.iVn, e._9n, e.CTs);
    return !0;
  }
  Xjr(t) {
    0 === this.Qjr && 0 < t
      ? this.Xte.AddTag(1219330576)
      : 0 < this.Qjr && this.Qjr + t <= 0 && this.Xte.RemoveTag(1219330576),
      (this.Qjr += t),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharShieldChange,
        this.Qjr,
      );
  }
  Add(t, e, i) {
    this.Kjr.get(t)
      ? this.ChangeValue(t, e, i)
      : ((e = new CharacterShield(t, e, i)),
        this.Kjr.set(t, e),
        this.Xjr(e.ShieldValue)),
      this.m1t.TriggerEvents(7, this.m1t, {});
  }
  Remove(t) {
    var e = this.Kjr.get(t);
    e && (this.Xjr(-e.ShieldValue), this.$jr(), this.Kjr.delete(t));
  }
  ChangeValue(t, e, i) {
    var o,
      r = this.Kjr.get(t);
    r
      ? ((o = r.ShieldValue), (r.ShieldValue = i), this.Xjr(i - o))
      : this.Add(t, e, i);
  }
  static OnShieldUpdateNotify(t, e) {
    var i = t?.GetComponent(66);
    if (i)
      for (const s of e.wAs) {
        var o = s.UAs,
          r = Protocol_1.Aki.Protocol.U4s;
        o === r.Proto_EShieldUpdateTypeAdd && 0 < s.CTs
          ? i.Add(s.iVn, s._9n, s.CTs)
          : o === r.Proto_EShieldUpdateTypeDel && 0 === s.CTs
            ? i.Remove(s.iVn)
            : o === r.Proto_EShieldUpdateTypeModify && 0 < s.CTs
              ? i.ChangeValue(s.iVn, s._9n, s.CTs)
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Battle", 36, "护盾更新错误", ["shield", s]);
      }
  }
  GetShieldValue(t) {
    if (0 === t) return this.ShieldTotal;
    let e = 0;
    for (const i of this.Kjr.values())
      i.TemplateId === t && (e += i.ShieldValue);
    return e;
  }
  $jr() {
    this.m1t.TriggerEvents(8, this.m1t, {});
  }
  GetDebugShieldInfo() {
    return this.Kjr.entries();
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("m3n", !1)],
  CharacterShieldComponent,
  "OnShieldUpdateNotify",
  null,
),
  (CharacterShieldComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(66)],
    CharacterShieldComponent,
  )),
  (exports.CharacterShieldComponent = CharacterShieldComponent);
//# sourceMappingURL=CharacterShieldComponent.js.map
