"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, i, r) {
    var n,
      s = arguments.length,
      o =
        s < 3
          ? e
          : null === r
            ? (r = Object.getOwnPropertyDescriptor(e, i))
            : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      o = Reflect.decorate(t, e, i, r);
    else
      for (var h = t.length - 1; 0 <= h; h--)
        (n = t[h]) && (o = (s < 3 ? n(o) : 3 < s ? n(e, i, o) : n(e, i)) || o);
    return 3 < s && o && Object.defineProperty(e, i, o), o;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SmartObjectComponent = void 0);
const AudioController_1 = require("../../../../../Core/Audio/AudioController"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  IComponent_1 = require("../../../../../UniverseEditor/Interface/IComponent"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  Global_1 = require("../../../../Global"),
  CharacterUnifiedStateTypes_1 = require("../../../Character/Common/Component/Abilities/CharacterUnifiedStateTypes"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
let SmartObjectComponent = class SmartObjectComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.ktn = void 0),
      (this.aun = void 0),
      (this.hun = []),
      (this.lun = !1),
      (this._un = (t, e) => {
        var i,
          e = e.Entity;
        0 <=
          this.aun.ExcludeEntities?.indexOf(e.GetComponent(0).GetPbDataId()) ||
          (this.uun(e) &&
            ((i = this.hun.indexOf(e)),
            t ? i < 0 && this.hun.push(e) : 0 <= i && this.hun.splice(i, 1)));
      }),
      (this.cun = () => {
        var t, e;
        this.lun &&
          void 0 !== (t = this.aun.AlertSound) &&
          ((e = Global_1.Global.BaseCharacter),
          AudioController_1.AudioController.PostEvent(t, e));
      }),
      (this.mun = (t, e) => {
        e === CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop ||
        e === CharacterUnifiedStateTypes_1.ECharMoveState.RunStop ||
        e === CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop
          ? (this.lun = !1)
          : (e !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
              e !== CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
              e !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) ||
            (this.lun = !0);
      });
  }
  OnStart() {
    var t;
    return (
      (this.Hte = this.Entity.GetComponent(1)),
      (this.ktn = this.Entity.GetComponent(74)),
      this.Hte &&
        (t = this.Hte.CreatureData?.GetPbEntityInitData()?.ComponentsData) &&
        ((this.aun = (0, IComponent_1.getComponent)(
          t,
          "AiAlertNotifyComponent",
        )),
        this.aun) &&
        this.dun(),
      !0
    );
  }
  dun() {
    for (var [, t] of this.ktn.GetEntitiesInRangeLocal()) {
      if (
        this.aun.ExcludeEntities?.length &&
        0 < this.aun.ExcludeEntities?.length
      )
        if (
          0 <=
          this.aun.ExcludeEntities?.indexOf(
            t.Entity.GetComponent(0).GetPbDataId(),
          )
        )
          continue;
      this.uun(t.Entity) && this.hun.push(t.Entity);
    }
    this.ktn.AddOnEntityOverlapCallback(this._un), this.Cun();
  }
  uun(t) {
    var t = t.GetComponent(38);
    return !!t && !!(t = t.AiController?.AiAlert) && !!t.AiAlertConfig;
  }
  OnEnd() {
    return this.ktn.RemoveOnEntityOverlapCallback(this._un), this.gun(), !0;
  }
  OnTick(t) {
    this.fun(t);
  }
  fun(e) {
    if (void 0 !== this.aun && !(this.hun.length <= 0)) {
      let t = 0;
      if (this.lun) {
        var i = this.aun.ExtraAiAlert.MoveAlert;
        if (!i) return;
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      } else {
        i = this.aun.ExtraAiAlert.StopAlert;
        if (!i) return;
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      }
      for (const r of this.hun)
        EventSystem_1.EventSystem.EmitWithTarget(
          r,
          EventDefine_1.EEventName.SmartObjectAiAlterNotify,
          t,
        );
    }
  }
  Cun() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCharFootOnTheGround,
      this.cun,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.mun,
      );
  }
  gun() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCharFootOnTheGround,
      this.cun,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.mun,
      );
  }
};
(SmartObjectComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(120)],
  SmartObjectComponent,
)),
  (exports.SmartObjectComponent = SmartObjectComponent);
//# sourceMappingURL=SmartObjectComponent.js.map
