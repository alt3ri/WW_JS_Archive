"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, r) {
    var i,
      n = arguments.length,
      s =
        n < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, o))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, e, o, r);
    else
      for (var l = t.length - 1; 0 <= l; l--)
        (i = t[l]) && (s = (n < 3 ? i(s) : 3 < n ? i(e, o, s) : i(e, o)) || s);
    return 3 < n && s && Object.defineProperty(e, o, s), s;
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
var EProtoSummonType = Protocol_1.Aki.Protocol.Summon.x3s;
const PhantomUtil_1 = require("../../../../Module/Phantom/PhantomUtil");
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
    return this.fJs(), !0;
  }
  OnEnd() {
    return this.DeleteFollowEntity(), !0;
  }
  SetRoleId(t, e) {
    (this.JGi = t),
      (this.SummonTypeInternal = e),
      0 !== this.JGi &&
        (t = EntitySystem_1.EntitySystem.Get(this.JGi)?.GetComponent(86)) &&
        this.Entity.GetComponent(34)?.ResetRoleGrowComponent(t);
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
    t?.Valid && t.Entity.GetComponent(49).pJs(this.Entity.Id);
  }
  GetAttributeHolder() {
    if (0 !== this.RoleId && 2 === this.SummonType) {
      var t = EntitySystem_1.EntitySystem.Get(this.RoleId);
      if (t?.Valid) return t;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          21,
          "FollowComp role is inValid",
          ["Id", this.RoleId],
          ["SelfId", this.u1t?.GetCreatureDataId()],
        );
    }
    return this.Entity;
  }
  SetFollowData(t, e) {
    var o;
    t?.IsValid()
      ? (o = (t =
          ActorUtils_1.ActorUtils.GetEntityByActor(t))?.Entity?.GetComponent(
          49,
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
    this.pJs(t), (this.SummonTypeInternal = 0), (this.JGi = 0);
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
  fJs() {
    var e = ModelManager_1.ModelManager.CreatureModel.GetEntity(
      this.u1t.GetSummonerId(),
    );
    if (
      e?.Valid &&
      this.u1t.SummonType ===
        EProtoSummonType.Proto_ESummonTypeConcomitantVision
    ) {
      var o = this.u1t.GetVisionComponent();
      let t = !1;
      (t =
        o && (o = PhantomUtil_1.PhantomUtil.GetVisionData(o.VisionId))
          ? 0 === o.类型
          : t) ||
        ((o = e.Entity.GetComponent(49)),
        this.SetRoleId(e.Id, 2),
        o.SetFollowId(this.Entity.Id));
    }
  }
  pJs(t) {
    0 !== t
      ? -1 !== (t = this.v5r.indexOf(t)) && this.v5r.splice(t, 1)
      : (this.v5r = []);
  }
};
(CharacterFollowComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(49)],
  CharacterFollowComponent,
)),
  (exports.CharacterFollowComponent = CharacterFollowComponent);
//# sourceMappingURL=CharacterFollowComponent.js.map
