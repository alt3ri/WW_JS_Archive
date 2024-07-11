"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    let r;
    const n = arguments.length;
    let s =
      n < 3 ? t : o === null ? (o = Object.getOwnPropertyDescriptor(t, i)) : o;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(e, t, i, o);
    else
      for (let a = e.length - 1; a >= 0; a--)
        (r = e[a]) && (s = (n < 3 ? r(s) : n > 3 ? r(t, i, s) : r(t, i)) || s);
    return n > 3 && s && Object.defineProperty(t, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterTimeScaleComponent = void 0);
const AudioDefine_1 = require("../../../../../Core/Audio/AudioDefine");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Time_1 = require("../../../../../Core/Common/Time");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const PawnTimeScaleComponent_1 = require("../../../Pawn/Component/PawnTimeScaleComponent");
let CharacterTimeScaleComponent = class CharacterTimeScaleComponent extends PawnTimeScaleComponent_1.PawnTimeScaleComponent {
  constructor() {
    super(...arguments),
      (this.BKr = 1),
      (this.bKr = 1),
      (this.qKr = 1),
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
    const t = Time_1.Time.WorldTimeSeconds;
    let i = 1;
    let o = 0;
    let r = 1;
    for (; !this.TimeScaleList.Empty; ) {
      const n = this.TimeScaleList.Top;
      if (!n) break;
      if (this.IsTimescaleValid(n, t)) {
        (i = n.CalculateTimeScale()),
          (o = n.SourceType),
          (r =
            n.EndTime - n.StartTime >=
            AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD
              ? i
              : this.bKr);
        break;
      }
      this.TimeScaleMap.delete(n.Id), this.TimeScaleList.Pop();
    }
    let s;
    var a = this.Entity.GetComponent(15);
    var a =
      (!this.ActorComp ||
        this.ActorComp.IsMoveAutonomousProxy ||
        (a && a.IsDead()) ||
        ((i = this.qKr), (r = this.qKr)),
      r * this.Entity.TimeDilation);
    a !== this.BKr &&
      ((s = this.ActorComp?.Actor)
        ? (AudioSystem_1.AudioSystem.SetRtpcValue(
            "entity_time_scale_combat",
            a,
            { Actor: s },
          ),
          a < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
            this.BKr >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
            AudioSystem_1.AudioSystem.PostEvent("time_scale_pause", s))
        : a >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
          this.BKr < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
          AudioSystem_1.AudioSystem.PostEvent("time_scale_resume", s)),
      (this.BKr = a),
      (this.bKr = r),
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
    this.qKr = e;
  }
};
(CharacterTimeScaleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(162)],
  CharacterTimeScaleComponent,
)),
  (exports.CharacterTimeScaleComponent = CharacterTimeScaleComponent);
// # sourceMappingURL=CharacterTimeScaleComponent.js.map
