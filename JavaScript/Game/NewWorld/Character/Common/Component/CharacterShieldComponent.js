"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, o) {
    let r;
    const s = arguments.length;
    let h =
      s < 3 ? e : o === null ? (o = Object.getOwnPropertyDescriptor(e, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      h = Reflect.decorate(t, e, i, o);
    else
      for (let n = t.length - 1; n >= 0; n--)
        (r = t[n]) && (h = (s < 3 ? r(h) : s > 3 ? r(e, i, h) : r(e, i)) || h);
    return s > 3 && h && Object.defineProperty(e, i, h), h;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterShieldComponent = exports.CharacterShield = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const ShieldById_1 = require("../../../../../Core/Define/ConfigQuery/ShieldById");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const CombatMessage_1 = require("../../../../Module/CombatMessage/CombatMessage");
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
      (this.elt = void 0),
      (this.Xte = void 0),
      (this.cWr = new Map()),
      (this.mWr = 0);
  }
  get ShieldTotal() {
    return this.mWr;
  }
  OnStart() {
    return (
      (this.elt = this.Entity.CheckGetComponent(157)),
      (this.Xte = this.Entity.CheckGetComponent(185)),
      !0
    );
  }
  OnActivate() {
    this.cWr.clear, (this.mWr = 0);
    const t = this.Entity.GetComponent(0).ComponentDataMap.get("Rps")?.Rps?.eSs;
    if (t) for (const e of t) this.Add(e.E4n, e.R5n, e.YMs);
    return !0;
  }
  dWr(t) {
    this.mWr === 0 && t > 0
      ? this.Xte.AddTag(1219330576)
      : this.mWr > 0 && this.mWr + t <= 0 && this.Xte.RemoveTag(1219330576),
      (this.mWr += t),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharShieldChange,
        this.mWr,
      );
  }
  Add(t, e, i) {
    this.cWr.get(t)
      ? this.ChangeValue(t, e, i)
      : ((e = new CharacterShield(t, e, i)),
        this.cWr.set(t, e),
        this.dWr(e.ShieldValue)),
      this.elt.TriggerEvents(7, this.elt, {});
  }
  Remove(t) {
    const e = this.cWr.get(t);
    e && (this.dWr(-e.ShieldValue), this.CWr(), this.cWr.delete(t));
  }
  ChangeValue(t, e, i) {
    let o;
    const r = this.cWr.get(t);
    r
      ? ((o = r.ShieldValue), (r.ShieldValue = i), this.dWr(i - o))
      : this.Add(t, e, i);
  }
  static OnShieldUpdateNotify(t, e) {
    const i = t?.GetComponent(64);
    if (i)
      for (const s of e.dTs) {
        const o = s.cTs;
        const r = Protocol_1.Aki.Protocol.VOs;
        o === r.Proto_EShieldUpdateTypeAdd && s.YMs > 0
          ? i.Add(s.E4n, s.R5n, s.YMs)
          : o === r.Proto_EShieldUpdateTypeDel && s.YMs === 0
            ? i.Remove(s.E4n)
            : o === r.Proto_EShieldUpdateTypeModify && s.YMs > 0
              ? i.ChangeValue(s.E4n, s.R5n, s.YMs)
              : Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("Battle", 36, "护盾更新错误", ["shield", s]);
      }
  }
  GetShieldValue(t) {
    if (t === 0) return this.ShieldTotal;
    let e = 0;
    for (const i of this.cWr.values())
      i.TemplateId === t && (e += i.ShieldValue);
    return e;
  }
  CWr() {
    this.elt.TriggerEvents(8, this.elt, {});
  }
  GetDebugShieldInfo() {
    return this.cWr.entries();
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("O2n", !1)],
  CharacterShieldComponent,
  "OnShieldUpdateNotify",
  null,
),
  (CharacterShieldComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(64)],
    CharacterShieldComponent,
  )),
  (exports.CharacterShieldComponent = CharacterShieldComponent);
// # sourceMappingURL=CharacterShieldComponent.js.map
