"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, o, i) {
    var r,
      s = arguments.length,
      n =
        s < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, o, i);
    else
      for (var l = e.length - 1; 0 <= l; l--)
        (r = e[l]) && (n = (s < 3 ? r(n) : 3 < s ? r(t, o, n) : r(t, o)) || n);
    return 3 < s && n && Object.defineProperty(t, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlayerFollowerComponent = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask"),
  followerPriorityMap = new Map([
    [0, 100],
    [1, 102],
    [2, 101],
  ]);
let PlayerFollowerComponent = class PlayerFollowerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.j8 = 0),
      (this.qHa = new Map()),
      (this.qeh = 0),
      (this.OHa = void 0),
      (this.GHa = void 0),
      (this.kHa = void 0);
  }
  OnInitData() {
    var e = this.Entity.CheckGetComponent(0),
      e =
        ((this.j8 = e?.GetPlayerId() ?? 0),
        e?.ComponentDataMap.get("nI_")?.nI_?.OI_);
    return e && this.UpdateFollowers(e), !0;
  }
  OnClear() {
    return (this.j8 = 0), this.NHa(), this.qHa.clear(), !0;
  }
  UpdateFollowers(e) {
    for (const s of e) {
      let e = void 0;
      switch (s.h5n) {
        case Protocol_1.Aki.Protocol.Summon.tJs
          .Proto_EPlayerFollowerExploreSkill:
          e = 0;
          break;
        case Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerAuxiliary:
          e = 1;
          break;
        case Protocol_1.Aki.Protocol.Summon.tJs
          .Proto_EPlayerFollowerSpecialItem:
          e = 2;
      }
      var t;
      void 0 === e
        ? Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 48, "Follower类型异常", ["Type", s.h5n])
        : (t = MathUtils_1.MathUtils.LongToNumber(s.F4n)) <= 0
          ? this.qHa.delete(e)
          : this.qHa.set(e, t);
    }
    var o,
      i,
      r = [-1, 0];
    for ([o, i] of this.qHa)
      this.Fh_(o) > this.Fh_(r[0]) && ((r[0] = o), (r[1] = i));
    r[0] < 0
      ? this.NHa()
      : (e = r[1]) !== this.qeh && (this.NHa(), (this.qeh = e), this.FHa());
  }
  Fh_(e) {
    return followerPriorityMap.get(e) ?? -1;
  }
  OnFollowerAdd(e) {
    e === this.qeh && this.FHa();
  }
  FHa() {
    const t = this.qeh,
      o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    o?.Valid &&
      o.Id !== this.OHa?.Id &&
      (this.kHa?.Cancel(),
      (this.kHa = void 0),
      o.IsInit
        ? this.vGl(t, o)
        : (this.kHa = WaitEntityTask_1.WaitEntityTask.Create(
            "PlayerFollowerComponent.PossessFollower",
            t,
            (e) => {
              e && this.vGl(t, o);
            },
            -1,
          )));
  }
  async vGl(e, t) {
    var o = t.Entity?.GetComponent(219);
    o &&
      (await o.LoadConfigPromise?.Promise, t.Valid) &&
      e === this.qeh &&
      ((this.OHa = t),
      (this.GHa = o),
      this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) &&
      (o.Possess(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnPlayerFollowerCreate,
        t,
      ));
  }
  NHa() {
    this.kHa?.Cancel(),
      (this.kHa = void 0),
      this.GHa &&
        this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
        (this.GHa.UnPossess(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        )),
      (this.qeh = 0),
      (this.OHa = void 0),
      (this.GHa = void 0);
  }
  SetFollowerEnable(e) {
    this.GHa?.SetEnable(e);
  }
  GetFollower() {
    return this.OHa;
  }
  IsFollowerEnable() {
    return this.GHa?.IsEnable ?? !1;
  }
};
(PlayerFollowerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(221)],
  PlayerFollowerComponent,
)),
  (exports.PlayerFollowerComponent = PlayerFollowerComponent);
//# sourceMappingURL=PlayerFollowerComponent.js.map
