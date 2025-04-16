"use strict";
var CharacterCatapultComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (t, e, i, n) {
      var o,
        a = arguments.length,
        r =
          a < 3
            ? e
            : null === n
              ? (n = Object.getOwnPropertyDescriptor(e, i))
              : n;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        r = Reflect.decorate(t, e, i, n);
      else
        for (var s = t.length - 1; 0 <= s; s--)
          (o = t[s]) &&
            (r = (a < 3 ? o(r) : 3 < a ? o(e, i, r) : o(e, i)) || r);
      return 3 < a && r && Object.defineProperty(e, i, r), r;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterCatapultComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  BigJumpUnit_1 = require("./BigJumpUnit"),
  CustomMovementDefine_1 = require("./CustomMovementDefine"),
  MODEL_BUFFER_TIME_LENGTH = 200,
  SUPER_CATAPULT_SKILL_ID = 400107;
let CharacterCatapultComponent =
  (CharacterCatapultComponent_1 = class CharacterCatapultComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.P$r = -0),
        (this.x$r = void 0),
        (this.LockRotator = !1),
        (this.w$r = !1),
        (this.B$r = (t) => {
          t < MathUtils_1.MathUtils.SmallNumber ||
            (this.x$r.GetOffset(this.P$r, t, CharacterCatapultComponent_1.Lz),
            (this.P$r += t),
            this.Gce.MoveCharacter(CharacterCatapultComponent_1.Lz, t),
            this.LockRotator && this.Hte?.SetInputRotator(this.x$r.Rotator),
            this.P$r > this.x$r.TimeLength &&
              (this.Hte?.Actor.KuroSetMovementMode({
                Mode: 3,
                Context: "[CharacterCatapultComponent.OnCustomMoveCatapult]",
              }),
              this.x$r.GetSpeed(this.P$r, CharacterCatapultComponent_1.Lz),
              this.Gce.SetForceSpeed(CharacterCatapultComponent_1.Lz)));
        });
    }
    static get Dependencies() {
      return [3, 176];
    }
    OnInitData() {
      return (this.x$r = new BigJumpUnit_1.BigJumpUnit()), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.Gce = this.Entity.GetComponent(176)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveCatapult,
          this.B$r,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveCatapult,
          this.B$r,
        ),
        !0
      );
    }
    SetConfig(
      t,
      e,
      i,
      n,
      o = "",
      a = BigJumpUnit_1.DEFAULT_GRAVITY,
      r = void 0,
      s = !1,
    ) {
      (this.w$r = s),
        (this.LockRotator = 0 < a),
        this.x$r.SetAll(t, e, i, n, o, a, r);
    }
    StartCatapult() {
      this.x$r.SetStartPoint(this.Hte.ActorLocationProxy),
        this.x$r.Init(),
        (this.P$r = 0),
        this.Hte?.Actor.KuroSetMovementMode({
          Mode: 6,
          CustomMode: CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE,
          Context: "[CharacterCatapultComponent.StartCatapult]",
        });
      var t,
        e,
        i = this.Entity.GetComponent(175);
      i &&
        i.SetLocationAndRotatorWithModelBuffer(
          this.Hte.ActorLocationProxy.ToUeVector(),
          this.x$r.Rotator.ToUeRotator(),
          MODEL_BUFFER_TIME_LENGTH,
          "Catapult Start",
        ),
        this.w$r &&
          ((t = this.Entity.GetComponent(39).GetSkillMontageInstance(
            Number(SUPER_CATAPULT_SKILL_ID),
            0,
          )),
          i?.MainAnimInstance) &&
          t?.IsValid() &&
          ((e = i.MainAnimInstance.Montage_GetPosition(t)),
          (e = (t.SequenceLength - e) / this.x$r.RisingTime),
          i.MainAnimInstance.Montage_SetPlayRate(t, e)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Movement",
            6,
            "StartCatapult",
            ["Actor", this.Hte.Actor.GetName()],
            ["CatapultUnit", this.x$r],
            ["IsSuperCatapult", this.w$r],
          );
    }
  });
(CharacterCatapultComponent.Lz = Vector_1.Vector.Create()),
  (CharacterCatapultComponent = CharacterCatapultComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(33)],
      CharacterCatapultComponent,
    )),
  (exports.CharacterCatapultComponent = CharacterCatapultComponent);
//# sourceMappingURL=CharacterCatapultComponent.js.map
