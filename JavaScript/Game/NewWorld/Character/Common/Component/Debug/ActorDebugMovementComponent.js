"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, o, i) {
    var r,
      s = arguments.length,
      n =
        s < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, o))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(t, e, o, i);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (r = t[h]) && (n = (s < 3 ? r(n) : 3 < s ? r(e, o, n) : r(e, o)) || n);
    return 3 < s && n && Object.defineProperty(e, o, n), n;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActorDebugMovementComponent = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  WARNING_THRESHOLD_SQUARED = 25e6;
let ActorDebugMovementComponent = class ActorDebugMovementComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.ActorComp = void 0),
      (this.UeDebugComp = void 0),
      (this.IsDebug = !1),
      (this.LastRecordLocation = Vector_1.Vector.Create()),
      (this.FLa = !1),
      (this.VLa = [
        Protocol_1.Aki.Protocol.kks.Proto_Monster,
        Protocol_1.Aki.Protocol.kks.Proto_Player,
        Protocol_1.Aki.Protocol.kks.Proto_Npc,
      ]);
  }
  OnStart() {
    return (
      (this.ActorComp = this.Entity.GetComponent(1)),
      (this.IsDebug = !1),
      this.ActorComp &&
        ((this.FLa = this.VLa.includes(
          this.ActorComp.CreatureData.GetEntityType(),
        )),
        this.LastRecordLocation.DeepCopy(this.ActorComp.ActorLocationProxy)),
      !0
    );
  }
  SetDebug(t) {
    this.IsDebug !== t &&
      ((this.IsDebug = t), this.IsDebug) &&
      (this.ActorComp?.Owner &&
        (this.UeDebugComp = this.ActorComp.Owner.AddComponentByClass(
          UE.KuroDebugMovementComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
        )),
      this.UeDebugComp.Resigter());
  }
  MarkDebugRecord(t, e = 15, o = !1) {
    this.FLa &&
      this.ActorComp &&
      (!o &&
        Vector_1.Vector.DistSquared(
          this.LastRecordLocation,
          this.ActorComp.ActorLocationProxy,
        ) > WARNING_THRESHOLD_SQUARED &&
        Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "Movement",
          6,
          "MarkDebugRecord 移动距离超五十米",
          ["PbDataId", this.ActorComp.CreatureData.GetPbDataId()],
          ["EntityId", this.ActorComp.Entity.Id],
          ["Context", t],
          ["From", this.LastRecordLocation],
          ["To", this.ActorComp.ActorLocationProxy],
          ["Actor", this.ActorComp.Owner.GetName()],
        ),
      this.LastRecordLocation.DeepCopy(this.ActorComp.ActorLocationProxy)),
      this.IsDebug &&
        ((o =
          "[PbDataId:" +
          (this.ActorComp?.CreatureData.GetPbDataId() ?? "") +
          "][CreatureDataId:" +
          (this.ActorComp?.CreatureData.GetCreatureDataId() ?? "") +
          "]"),
        this.UeDebugComp.RecordModifyInfo(o + t, void 0, e));
  }
  static StaticMarkDebugRecord(t, e, o = 15, i = Vector_1.Vector.ZeroVector) {
    t.GetComponent(27).MarkDebugRecord(e, o);
  }
};
(ActorDebugMovementComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(27)],
  ActorDebugMovementComponent,
)),
  (exports.ActorDebugMovementComponent = ActorDebugMovementComponent);
//# sourceMappingURL=ActorDebugMovementComponent.js.map
