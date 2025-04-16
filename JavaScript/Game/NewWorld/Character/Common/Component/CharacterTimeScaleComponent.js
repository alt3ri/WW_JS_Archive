"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, i, o) {
    var s,
      r = arguments.length,
      n =
        r < 3
          ? t
          : null === o
            ? (o = Object.getOwnPropertyDescriptor(t, i))
            : o;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      n = Reflect.decorate(e, t, i, o);
    else
      for (var a = e.length - 1; 0 <= a; a--)
        (s = e[a]) && (n = (r < 3 ? s(n) : 3 < r ? s(t, i, n) : s(t, i)) || n);
    return 3 < r && n && Object.defineProperty(t, i, n), n;
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
      (this.TimeStopEntitySet = new Set()),
      (this.lE1 = -1);
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
        case 7:
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
      s = 1;
    for (; !this.TimeScaleList.Empty; ) {
      var r = this.TimeScaleList.Top;
      if (!r) break;
      if (this.IsTimescaleValid(r, t)) {
        (i = r.CalculateTimeScale()),
          (o = r.SourceType),
          (s =
            r.EndTime - r.StartTime >=
            AudioDefine_1.ENTITY_TIMESCALE_ENABLE_THRESHOLD
              ? i
              : this.CKr);
        break;
      }
      this.TimeScaleMap.delete(r.Id), this.TimeScaleList.Pop();
    }
    var n,
      a = this.Entity.GetComponent(15),
      a =
        (!this.ActorComp ||
          this.ActorComp.IsMoveAutonomousProxy ||
          (a && a.IsDead()) ||
          ((i = this.gKr), (s = this.gKr)),
        0 <= this.lE1 && ((i = this.lE1), (s = this.lE1)),
        0 < this.RemoveLockTimestamp &&
          this.Entity.GetComponent(0)?.IsMonster() &&
          (2 < (a = Time_1.Time.NowSeconds - this.RemoveLockTimestamp)
            ? Log_1.Log.CheckError() &&
              Log_1.Log.Error("Character", 19, "大招时停恢复时间过长", [
                "gap time",
                a,
              ])
            : Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Character", 19, "大招时停恢复", ["gap time", a]),
          (this.RemoveLockTimestamp = -1)),
        s * this.Entity.TimeDilation);
    a !== this.dKr &&
      (n = this.ActorComp?.Owner) &&
      (AudioSystem_1.AudioSystem.SetRtpcValue("entity_time_scale_combat", a, {
        Actor: n,
      }),
      a < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
      this.dKr >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD
        ? AudioSystem_1.AudioSystem.PostEvent("time_scale_pause", n)
        : a >= AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
          this.dKr < AudioDefine_1.ENTITY_TIMESCALE_PAUSE_THRESHOLD &&
          AudioSystem_1.AudioSystem.PostEvent("time_scale_resume", n)),
      (this.dKr = a),
      (this.CKr = s),
      i !== this.TimeScaleInternal &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "Character",
            19,
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
  SetForceTimeScale(e, t = !1) {
    (this.lE1 = e), t && this.OnTick(0);
  }
  RemoveForceTimeScale(e = !1) {
    (this.lE1 = -1), e && this.OnTick(0);
  }
};
(CharacterTimeScaleComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(177)],
  CharacterTimeScaleComponent,
)),
  (exports.CharacterTimeScaleComponent = CharacterTimeScaleComponent);
//# sourceMappingURL=CharacterTimeScaleComponent.js.map
