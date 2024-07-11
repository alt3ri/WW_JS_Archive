"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    let i;
    const s = arguments.length;
    let n =
      s < 3 ? e : r === null ? (r = Object.getOwnPropertyDescriptor(e, o)) : r;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      n = Reflect.decorate(t, e, o, r);
    else
      for (let l = t.length - 1; l >= 0; l--)
        (i = t[l]) && (n = (s < 3 ? i(n) : s > 3 ? i(e, o, n) : i(e, o)) || n);
    return s > 3 && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterFollowComponent = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActorUtils_1 = require("../../../../Utils/ActorUtils");
const EProtoSummonType = Protocol_1.Aki.Protocol.Oqs;
let CharacterFollowComponent = class CharacterFollowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.zht = void 0),
      (this.k5r = []),
      (this.Jqi = 0),
      (this.SummonTypeInternal = 0);
  }
  get FollowIds() {
    return this.k5r;
  }
  get RoleId() {
    return this.Jqi;
  }
  get SummonType() {
    return this.SummonTypeInternal;
  }
  OnStart() {
    return (this.zht = this.Entity.GetComponent(0)), !0;
  }
  OnActivate() {
    return this.q8s(), !0;
  }
  OnEnd() {
    return this.DeleteFollowEntity(), !0;
  }
  SetRoleId(t, e) {
    (this.Jqi = t),
      (this.SummonTypeInternal = e),
      this.Jqi !== 0 &&
        (t = EntitySystem_1.EntitySystem.Get(this.Jqi)?.GetComponent(83)) &&
        this.Entity.GetComponent(33)?.ResetRoleGrowComponent(t);
  }
  GetRoleActor() {
    const t = EntitySystem_1.EntitySystem.Get(this.Jqi);
    if (t?.Valid) return t.GetComponent(1).Owner;
  }
  GetFollowActor() {
    const t = this.k5r;
    const e = UE.NewArray(UE.Actor);
    if (t)
      for (const r of t) {
        let o = EntitySystem_1.EntitySystem.Get(r);
        o?.Valid && (o = o.GetComponent(1).Owner) && e.Add(o);
      }
    return e;
  }
  SetFollowId(t) {
    this.k5r.indexOf(t) !== -1
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 23, "Add the Same Summon Id:", ["id", t])
      : this.k5r.push(t);
  }
  DeleteFollowEntity() {
    const t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      this.zht.GetSummonerId(),
    );
    t?.Valid && t.Entity.GetComponent(47).G8s(this.Entity.Id);
  }
  GetAttributeHolder() {
    return this.RoleId !== 0 && this.SummonType === 2
      ? EntitySystem_1.EntitySystem.Get(this.RoleId)
      : this.Entity;
  }
  SetFollowData(t, e) {
    let o;
    t?.IsValid()
      ? (o = (t =
          ActorUtils_1.ActorUtils.GetEntityByActor(t))?.Entity?.GetComponent(
          47,
        ))
        ? (o.SetRoleId(this.Entity.Id, e), this.SetFollowId(t.Id))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            23,
            "该角色没有CharacterFollowComponent组件",
          )
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 23, "SetFollowData 对象为null");
  }
  Reset(t = 0) {
    this.G8s(t), (this.SummonTypeInternal = 0), (this.Jqi = 0);
  }
  GetToRoleDistance() {
    let t;
    return this.RoleId &&
      (t = EntitySystem_1.EntitySystem.Get(this.RoleId)) &&
      this.Entity &&
      this.Entity.GetComponent(1) &&
      t.GetComponent(1)
      ? UE.Vector.Dist(
          this.Entity.GetComponent(1).ActorLocation,
          t.GetComponent(1).ActorLocation,
        )
      : -1;
  }
  q8s() {
    let t;
    const e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      this.zht.GetSummonerId(),
    );
    e?.Valid &&
      this.zht.SummonType ===
        EProtoSummonType.Proto_ESummonTypeConcomitantVision &&
      ((t = e.Entity.GetComponent(47)),
      this.SetRoleId(e.Id, 2),
      t.SetFollowId(this.Entity.Id));
  }
  G8s(t) {
    t !== 0
      ? (t = this.k5r.indexOf(t)) !== -1 && this.k5r.splice(t, 1)
      : (this.k5r = []);
  }
};
(CharacterFollowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(47)],
  CharacterFollowComponent,
)),
  (exports.CharacterFollowComponent = CharacterFollowComponent);
// # sourceMappingURL=CharacterFollowComponent.js.map
