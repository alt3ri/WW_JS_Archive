"use strict";
let CharacterCatapultComponent_1;
const __decorate =
  (this && this.__decorate) ||
  function (t, e, i, n) {
    let r;
    const o = arguments.length;
    let s =
      o < 3 ? e : n === null ? (n = Object.getOwnPropertyDescriptor(e, i)) : n;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      s = Reflect.decorate(t, e, i, n);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (r = t[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(e, i, s) : r(e, i)) || s);
    return o > 3 && s && Object.defineProperty(e, i, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterCatapultComponent = void 0);
const Log_1 = require("../../../../../../Core/Common/Log");
const EntityComponent_1 = require("../../../../../../Core/Entity/EntityComponent");
const Vector_1 = require("../../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../../Common/Event/EventSystem");
const BigJumpUnit_1 = require("./BigJumpUnit");
const CustomMovementDefine_1 = require("./CustomMovementDefine");
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent");
const MODEL_BUFFER_TIME_LENGTH = 200;
const SUPER_CATAPULT_SKILL_ID = 400107;
let CharacterCatapultComponent =
  (CharacterCatapultComponent_1 = class CharacterCatapultComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.Hte = void 0),
        (this.Gce = void 0),
        (this.J$r = -0),
        (this.z$r = void 0),
        (this.LockRotator = !1),
        (this.Z$r = !1),
        (this.eYr = (t) => {
          t < MathUtils_1.MathUtils.SmallNumber ||
            (this.z$r.GetOffset(this.J$r, t, CharacterCatapultComponent_1.Lz),
            (this.J$r += t),
            this.Gce.MoveCharacter(CharacterCatapultComponent_1.Lz, t),
            this.LockRotator && this.Hte?.SetInputRotator(this.z$r.Rotator),
            this.J$r > this.z$r.TimeLength &&
              (this.Gce.CharacterMovement.SetMovementMode(3),
              this.z$r.GetSpeed(this.J$r, CharacterCatapultComponent_1.Lz),
              this.Gce.SetForceSpeed(CharacterCatapultComponent_1.Lz)));
        });
    }
    static get Dependencies() {
      return [3, 161];
    }
    OnInitData() {
      return (this.z$r = new BigJumpUnit_1.BigJumpUnit()), !0;
    }
    OnStart() {
      return (
        (this.Hte = this.Entity.GetComponent(3)),
        (this.Gce = this.Entity.GetComponent(161)),
        EventSystem_1.EventSystem.AddWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveCatapult,
          this.eYr,
        ),
        !0
      );
    }
    OnEnd() {
      return (
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CustomMoveCatapult,
          this.eYr,
        ),
        !0
      );
    }
    SetConfig(
      t,
      e,
      i,
      n,
      r = "",
      o = BigJumpUnit_1.DEFAULT_GRAVITY,
      s = void 0,
      a = !1,
    ) {
      (this.Z$r = a),
        (this.LockRotator = o > 0),
        this.z$r.SetAll(t, e, i, n, r, o, s);
    }
    StartCatapult() {
      this.z$r.SetStartPoint(this.Hte.ActorLocationProxy),
        this.z$r.Init(),
        (this.J$r = 0),
        this.Gce.CharacterMovement.SetMovementMode(
          6,
          CustomMovementDefine_1.CUSTOM_MOVEMENTMODE_LEISURE,
        );
      let t;
      let e;
      const i = this.Entity.GetComponent(160);
      i &&
        i.SetLocationAndRotatorWithModelBuffer(
          this.Hte.ActorLocationProxy.ToUeVector(),
          this.z$r.Rotator.ToUeRotator(),
          MODEL_BUFFER_TIME_LENGTH,
          "Catapult Start",
        ),
        this.Z$r &&
          ((t = this.Entity.GetComponent(33).GetSkillMontageInstance(
            Number(SUPER_CATAPULT_SKILL_ID),
            0,
          )),
          i?.MainAnimInstance) &&
          t?.IsValid() &&
          ((e = i.MainAnimInstance.Montage_GetPosition(t)),
          (e = (t.SequenceLength - e) / this.z$r.RisingTime),
          i.MainAnimInstance.Montage_SetPlayRate(t, e)),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "Movement",
            6,
            "StartCatapult",
            ["Actor", this.Hte.Actor.GetName()],
            ["CatapultUnit", this.z$r],
            ["IsSuperCatapult", this.Z$r],
          );
    }
  });
(CharacterCatapultComponent.Lz = Vector_1.Vector.Create()),
  (CharacterCatapultComponent = CharacterCatapultComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(30)],
      CharacterCatapultComponent,
    )),
  (exports.CharacterCatapultComponent = CharacterCatapultComponent);
// # sourceMappingURL=CharacterCatapultComponent.js.map
