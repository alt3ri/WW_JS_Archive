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
  WaitEntityTask_1 = require("../../../World/Define/WaitEntityTask");
let PlayerFollowerComponent = class PlayerFollowerComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.j8 = 0),
      (this.FVa = new Map()),
      (this.HYa = 0),
      (this.VVa = void 0),
      (this.HVa = void 0),
      (this.jVa = void 0);
  }
  OnInitData() {
    var e = this.Entity.CheckGetComponent(0),
      e =
        ((this.j8 = e?.GetPlayerId() ?? 0),
        e?.ComponentDataMap.get("Wih")?.Wih?.Yih);
    return e && this.UpdateFollowers(e), !0;
  }
  OnClear() {
    return (this.j8 = 0), this.WVa(), this.FVa.clear(), !0;
  }
  UpdateFollowers(e) {
    for (const s of e) {
      let e = void 0;
      switch (s.h5n) {
        case Protocol_1.Aki.Protocol.Summon.tJs
          .Proto_EPlayerFollowerExploreSkill:
          e = 100;
          break;
        case Protocol_1.Aki.Protocol.Summon.tJs.Proto_EPlayerFollowerAuxiliary:
          e = 101;
      }
      var t;
      e
        ? (t = MathUtils_1.MathUtils.LongToNumber(s.F4n)) <= 0
          ? this.FVa.delete(e)
          : this.FVa.set(e, t)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 49, "Follower类型异常", ["Type", s.h5n]);
    }
    var o,
      i,
      r = [-1, 0];
    for ([o, i] of this.FVa) o > r[0] && ((r[0] = o), (r[1] = i));
    r[0] < 0
      ? this.WVa()
      : (e = r[1]) !== this.HYa && (this.WVa(), (this.HYa = e), this.QVa());
  }
  OnFollowerAdd(e) {
    e === this.HYa && this.QVa();
  }
  QVa() {
    var e,
      t = this.HYa;
    const o = ModelManager_1.ModelManager.CreatureModel.GetEntity(t);
    o?.Valid &&
      o.Id !== this.VVa?.Id &&
      !this.jVa &&
      ((e = (e) => {
        (this.jVa = void 0),
          e &&
            (e = o.Entity?.GetComponent(204)) &&
            ((this.VVa = o),
            (this.HVa = e),
            this.j8 ===
              ModelManager_1.ModelManager.CreatureModel.GetPlayerId()) &&
            (e.Possess(),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnPlayerFollowerCreate,
              o,
            ));
      }),
      o.IsInit
        ? e(!0)
        : (this.jVa = WaitEntityTask_1.WaitEntityTask.Create(t, e, -1)));
  }
  WVa() {
    this.jVa?.Cancel(),
      (this.jVa = void 0),
      this.HVa &&
        this.j8 === ModelManager_1.ModelManager.CreatureModel.GetPlayerId() &&
        (this.HVa.UnPossess(),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnPlayerFollowerDestroy,
        )),
      (this.HYa = 0),
      (this.VVa = void 0),
      (this.HVa = void 0);
  }
  SetFollowerEnable(e) {
    this.HVa?.SetEnable(e);
  }
  GetFollower() {
    return this.VVa;
  }
  IsFollowerEnable() {
    return this.HVa?.IsEnable ?? !1;
  }
  IsFollowerNeedInput(e, t) {
    return this.HVa?.IsNeedInput(e, t) ?? !1;
  }
};
(PlayerFollowerComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(206)],
  PlayerFollowerComponent,
)),
  (exports.PlayerFollowerComponent = PlayerFollowerComponent);
//# sourceMappingURL=PlayerFollowerComponent.js.map
