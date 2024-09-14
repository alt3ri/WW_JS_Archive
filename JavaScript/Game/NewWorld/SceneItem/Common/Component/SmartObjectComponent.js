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
      (this.vtn = void 0),
      (this.k_n = void 0),
      (this.F_n = []),
      (this.V_n = !1),
      (this.H_n = (t, e) => {
        var i,
          e = e.Entity;
        0 <=
          this.k_n.ExcludeEntities?.indexOf(e.GetComponent(0).GetPbDataId()) ||
          (this.j_n(e) &&
            ((i = this.F_n.indexOf(e)),
            t ? i < 0 && this.F_n.push(e) : 0 <= i && this.F_n.splice(i, 1)));
      }),
      (this.W_n = () => {
        var t, e;
        this.V_n &&
          void 0 !== (t = this.k_n.AlertSound) &&
          ((e = Global_1.Global.BaseCharacter),
          AudioController_1.AudioController.PostEvent(t, e));
      }),
      (this.K_n = (t, e) => {
        e === CharacterUnifiedStateTypes_1.ECharMoveState.WalkStop ||
        e === CharacterUnifiedStateTypes_1.ECharMoveState.RunStop ||
        e === CharacterUnifiedStateTypes_1.ECharMoveState.SprintStop
          ? (this.V_n = !1)
          : (e !== CharacterUnifiedStateTypes_1.ECharMoveState.Walk &&
              e !== CharacterUnifiedStateTypes_1.ECharMoveState.Run &&
              e !== CharacterUnifiedStateTypes_1.ECharMoveState.Sprint) ||
            (this.V_n = !0);
      });
  }
  OnStart() {
    var t;
    return (
      (this.Hte = this.Entity.GetComponent(1)),
      (this.vtn = this.Entity.GetComponent(77)),
      this.Hte &&
        (t = this.Hte.CreatureData?.GetPbEntityInitData()?.ComponentsData) &&
        ((this.k_n = (0, IComponent_1.getComponent)(
          t,
          "AiAlertNotifyComponent",
        )),
        this.k_n) &&
        this.Q_n(),
      !0
    );
  }
  Q_n() {
    for (var [, t] of this.vtn.GetEntitiesInRangeLocal()) {
      if (
        this.k_n.ExcludeEntities?.length &&
        0 < this.k_n.ExcludeEntities?.length
      )
        if (
          0 <=
          this.k_n.ExcludeEntities?.indexOf(
            t.Entity.GetComponent(0).GetPbDataId(),
          )
        )
          continue;
      this.j_n(t.Entity) && this.F_n.push(t.Entity);
    }
    this.vtn.AddOnEntityOverlapCallback(this.H_n), this.X_n();
  }
  j_n(t) {
    var t = t.GetComponent(40);
    return !!t && !!(t = t.AiController?.AiAlert) && !!t.AiAlertConfig;
  }
  OnEnd() {
    return this.vtn.RemoveOnEntityOverlapCallback(this.H_n), this.$_n(), !0;
  }
  OnTick(t) {
    this.Y_n(t);
  }
  Y_n(e) {
    if (void 0 !== this.k_n && !(this.F_n.length <= 0)) {
      let t = 0;
      if (this.V_n) {
        var i = this.k_n.ExtraAiAlert.MoveAlert;
        if (!i) return;
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      } else {
        i = this.k_n.ExtraAiAlert.StopAlert;
        if (!i) return;
        t = i * e * TimeUtil_1.TimeUtil.Millisecond;
      }
      for (const r of this.F_n)
        EventSystem_1.EventSystem.EmitWithTarget(
          r,
          EventDefine_1.EEventName.SmartObjectAiAlterNotify,
          t,
        );
    }
  }
  X_n() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCharFootOnTheGround,
      this.W_n,
    ),
      EventSystem_1.EventSystem.AddWithTarget(
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.K_n,
      );
  }
  $_n() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCharFootOnTheGround,
      this.W_n,
    ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        Global_1.Global.BaseCharacter.CharacterActorComponent.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.K_n,
      );
  }
};
(SmartObjectComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(123)],
  SmartObjectComponent,
)),
  (exports.SmartObjectComponent = SmartObjectComponent);
//# sourceMappingURL=SmartObjectComponent.js.map
