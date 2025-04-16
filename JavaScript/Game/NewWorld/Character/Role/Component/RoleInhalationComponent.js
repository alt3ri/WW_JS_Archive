"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, e, o) {
    var r,
      n = arguments.length,
      s =
        n < 3
          ? i
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(i, e))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(t, i, e, o);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (r = t[h]) && (s = (n < 3 ? r(s) : 3 < n ? r(i, e, s) : r(i, e)) || s);
    return 3 < n && s && Object.defineProperty(i, e, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleInhalationComponent = void 0);
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  GlobalData_1 = require("../../../../GlobalData"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
let RoleInhalationComponent = class RoleInhalationComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Rne = void 0),
      (this.Hte = void 0),
      (this.Kel = -1),
      (this.$el = !1),
      (this.Xel = 0),
      (this.jgl = void 0),
      (this.DKo = []),
      (this.Yel = new Set()),
      (this.Wgl = -1),
      (this.r7r = Vector_1.Vector.Create());
  }
  OnActivate() {
    (this.Hte = this.Entity.GetComponent(3)),
      (this.Rne = this.Disable("RoleInhalationComponent 默认关闭Tick"));
  }
  OnTick(t) {
    ModelManager_1.ModelManager.CreatureModel.GetEntitiesInRange(
      this.Xel,
      1,
      this.DKo,
    );
    for (const r of this.DKo) {
      var i,
        e = r.Entity;
      e?.Valid &&
        this.zel(e, !1) &&
        ((i = e.GetComponent(258)).StartInhalation(this.Entity),
        this.Yel.add(i),
        (i = e.GetComponent(0))) &&
        GlobalData_1.GlobalData.BpEventManager.开始吸取污染物.Broadcast(
          i.GetPbDataId(),
        );
    }
    for (const n of this.Yel) {
      var o;
      n?.Valid && n.Entity?.Valid
        ? !this.zel(n.Entity, !0) &&
          (n.StopInhalation(),
          this.Yel.delete(n),
          (o = n.Entity.GetComponent(0))) &&
          GlobalData_1.GlobalData.BpEventManager.停止吸取污染物.Broadcast(
            o.GetPbDataId(),
          )
        : this.Yel.delete(n);
    }
  }
  zel(t, i) {
    var e = t.GetComponent(258),
      o = t.GetComponent(200),
      r = t.GetComponent(194);
    if (void 0 === e || void 0 === o || void 0 === r) return !1;
    if (r.HasTag(-991879492)) return !1;
    if (this.Yel.has(e) && !i) return !1;
    if (e.IsInCooldown) return !1;
    (t = Vector_1.Vector.Create(this.Hte?.ActorLocationProxy)),
      (o = Vector_1.Vector.Create(o.ActorLocation));
    if (Vector_1.Vector.Dist(t, o) > this.Xel) return !1;
    if (e.IsHaling && !i) return !1;
    if (-1 !== this.Wgl && !this.$el) {
      CameraController_1.CameraController.CameraRotator.Vector(this.r7r),
        this.r7r.Normalize();
      (t = Vector_1.Vector.Create(0, 0, 0)),
        (i =
          (o.Subtraction(CameraController_1.CameraController.CameraLocation, t),
          t.Normalize(),
          MathUtils_1.MathUtils.DotProduct(t, this.r7r)));
      if (i < Math.cos((this.Wgl * Math.PI) / 180)) return !1;
    }
    if (this.jgl && 0 < this.jgl.length)
      for (const n of this.jgl) if (!r.HasTag(n)) return !1;
    return !(e.InhaledStrength > this.Kel);
  }
  StartInhalation(t, i, e, o, r) {
    if (
      void 0 !== this.Rne &&
      (this.Enable(this.Rne, "RoleInhalationComponent 开始吸取"),
      (this.Rne = void 0),
      (this.Kel = t),
      (this.Xel = i),
      (this.$el = e),
      (this.Wgl = o),
      (this.jgl = []),
      void 0 !== r)
    )
      for (const n of r) this.jgl.push(n.TagId);
  }
  StopInhalation() {
    if (void 0 === this.Rne) {
      (this.Wgl = -1),
        (this.Rne = this.Disable("RoleInhalationComponent 停止吸取"));
      for (const t of this.Yel) t.StopInhalation();
      this.Yel.clear();
    }
  }
};
(RoleInhalationComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(260)],
  RoleInhalationComponent,
)),
  (exports.RoleInhalationComponent = RoleInhalationComponent);
//# sourceMappingURL=RoleInhalationComponent.js.map
