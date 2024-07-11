"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var r,
      n = arguments.length,
      s =
        n < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, i, o);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (r = e[a]) && (s = (n < 3 ? r(s) : 3 < n ? r(t, i, s) : r(t, i)) || s);
    return 3 < n && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterTimeScaleComponent = void 0);
const AudioDefine_1 = require("../../../../../Core/Audio/AudioDefine"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Time_1 = require("../../../../../Core/Common/Time"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PawnTimeScaleComponent_1 = require("../../../Pawn/Component/PawnTimeScaleComponent");
let CharacterTimeScaleComponent = class CharacterTimeScaleComponent extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
  constructor() {
    super(...arguments),
      (this.dKr = 1),
      (this.CKr = 1),
      (this.gKr = 1),
      (this.TimeStopEntitySet = new Set());
  }
  OnStart() {
    return !!super.OnStart();
  }
  IsTimescaleValid(e, t) {
    if (ModelManager_1.ModelManager.GameModeModel?.IsMulti)
      switch (e.SourceType) {
        case 3:
        case 4:
        case 6:
        case 5:
          break;
        default:
          return !1;
      }
    return super.IsTimescaleValid(e, t);
  }
  OnTick(e) {
    var t = Time_1.Time.WorldTimeSeconds;
    let i = 1,
      o = 0,
      r = 1;
    for (; !this.TimeScaleList.Empty; ) {
      var n = this.TimeScaleList.Top;
      if (!n) break;
      if (this.IsTimescaleValid(n, t)) {
        (i = n.CalculateTimeScale()),
          (o = n.SourceType),
          (r =
            n.EndTime - n.StartTime >=
            AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD
              ? i
              : this.CKr);
        break;
      }
      this.TimeScaleMap.delete(n.Id), this.TimeScaleList.Pop();
    }
    var s,
      a = this.Entity.GetComponent(15),
      a =
        (!this.ActorComp ||
          this.ActorComp.IsMoveAutonomousProxy ||
          (a && a.IsDead()) ||
          ((i = this.gKr), (r = this.gKr)),
        r * this.Entity.TimeDilation);
    a !== this.dKr &&
      ((s = this.ActorComp?.Actor)
        ? (AudioSystem_1.AudioSystem.SetRtpcValue(
            "entity_time_scale_combat",
            a,
            { Actor: s },
          ),
          a < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
            this.dKr >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
            AudioSystem_1.AudioSystem.PostEvent("time_scale_pause", s))
        : a >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
          this.dKr < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
          AudioSystem_1.AudioSystem.PostEvent("time_scale_resume", s)),
      (this.dKr = a),
      (this.CKr = r),
      i !== this.TimeScaleInternal &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            20,
            "实体流速变化",
            ["entityId", this.Entity.Id],
            ["newScale", i],
            ["oldScale", this.TimeScaleInternal],
            ["sourceType", o],
          ),
        (this.TimeScaleInternal = i),
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          i,
          o,
        ),
        this.Entity.SetTimeDilation(this.TimeDilation));
  }
  SetMoveSyncTimeScale(e) {
    this.gKr = e;
  }
};
(CharacterTimeScaleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(164)],
  CharacterTimeScaleComponent,
)),
  (exports.CharacterTimeScaleComponent = CharacterTimeScaleComponent);
//# sourceMappingURL=CharacterTimeScaleComponent.js.map
