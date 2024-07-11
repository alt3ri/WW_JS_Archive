"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    var i,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, o, r);
    else
      for (var l = t.length - 1; 0 <= l; l--)
        (i = t[l]) && (n = (s < 3 ? i(n) : 3 < s ? i(e, o, n) : i(e, o)) || n);
    return 3 < s && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterFollowComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  EntitySystem_1 = require("../../../../../Core/Entity/EntitySystem"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActorUtils_1 = require("../../../../Utils/ActorUtils");
var EProtoSummonType = Protocol_1.Aki.Protocol.Summon.L3s;
let CharacterFollowComponent = class CharacterFollowComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.u1t = void 0),
      (this.v5r = []),
      (this.JGi = 0),
      (this.SummonTypeInternal = 0);
  }
  get FollowIds() {
    return this.v5r;
  }
  get RoleId() {
    return this.JGi;
  }
  get SummonType() {
    return this.SummonTypeInternal;
  }
  OnStart() {
    return (this.u1t = this.Entity.GetComponent(0)), !0;
  }
  OnActivate() {
    return this.SXs(), !0;
  }
  OnEnd() {
    return this.DeleteFollowEntity(), !0;
  }
  SetRoleId(t, e) {
    (this.JGi = t),
      (this.SummonTypeInternal = e),
      0 !== this.JGi &&
        (t = EntitySystem_1.EntitySystem.Get(this.JGi)?.GetComponent(85)) &&
        this.Entity.GetComponent(33)?.ResetRoleGrowComponent(t);
  }
  GetRoleActor() {
    var t = EntitySystem_1.EntitySystem.Get(this.JGi);
    if (t?.Valid) return t.GetComponent(1).Owner;
  }
  GetFollowActor() {
    var t = this.v5r,
      e = UE.NewArray(UE.Actor);
    if (t)
      for (const r of t) {
        var o = EntitySystem_1.EntitySystem.Get(r);
        o?.Valid && (o = o.GetComponent(1).Owner) && e.Add(o);
      }
    return e;
  }
  SetFollowId(t) {
    -1 !== this.v5r.indexOf(t)
      ? Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 23, "Add the Same Summon Id:", ["id", t])
      : this.v5r.push(t);
  }
  DeleteFollowEntity() {
    var t = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      this.u1t.GetSummonerId(),
    );
    t?.Valid && t.Entity.GetComponent(48).EXs(this.Entity.Id);
  }
  GetAttributeHolder() {
    return 0 !== this.RoleId && 2 === this.SummonType
      ? EntitySystem_1.EntitySystem.Get(this.RoleId)
      : this.Entity;
  }
  SetFollowData(t, e) {
    var o;
    t?.IsValid()
      ? (o = (t =
          ActorUtils_1.ActorUtils.GetEntityByActor(t))?.Entity?.GetComponent(
          48,
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
    this.EXs(t), (this.SummonTypeInternal = 0), (this.JGi = 0);
  }
  GetToRoleDistance() {
    var t;
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
  SXs() {
    var t,
      e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
        this.u1t.GetSummonerId(),
      );
    e?.Valid &&
      this.u1t.SummonType ===
        EProtoSummonType.Proto_ESummonTypeConcomitantVision &&
      ((t = e.Entity.GetComponent(48)),
      this.SetRoleId(e.Id, 2),
      t.SetFollowId(this.Entity.Id));
  }
  EXs(t) {
    0 !== t
      ? -1 !== (t = this.v5r.indexOf(t)) && this.v5r.splice(t, 1)
      : (this.v5r = []);
  }
};
(CharacterFollowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(48)],
  CharacterFollowComponent,
)),
  (exports.CharacterFollowComponent = CharacterFollowComponent);
//# sourceMappingURL=CharacterFollowComponent.js.map
