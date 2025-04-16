"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (e, t, r, i) {
    var a,
      o = arguments.length,
      s =
        o < 3
          ? t
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(t, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      s = Reflect.decorate(e, t, r, i);
    else
      for (var n = e.length - 1; 0 <= n; n--)
        (a = e[n]) && (s = (o < 3 ? a(s) : 3 < o ? a(t, r, s) : a(t, r)) || s);
    return 3 < o && s && Object.defineProperty(t, r, s), s;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDamageComponent = void 0);
const Time_1 = require("../../../../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../../../Core/Define/ConfigCommon/CommonParamById"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  Vector_1 = require("../../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ControllerHolder_1 = require("../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  BaseDamageComponent_1 = require("./BaseDamageComponent"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  CharacterDamageCalculations_1 = require("./CharacterDamageCalculations");
let CharacterDamageComponent = class CharacterDamageComponent extends BaseDamageComponent_1.BaseDamageComponent {
  constructor() {
    super(...arguments),
      (this.ActorComponent = void 0),
      (this.$br = void 0),
      (this.HBr = void 0),
      (this.o4o = void 0),
      (this.eqr = 0),
      (this.tqr = 0);
  }
  OnStart() {
    return (
      !!super.OnStart() &&
      ((this.ActorComponent = this.Entity.CheckGetComponent(3)),
      (this.$br = this.Entity.CheckGetComponent(60)),
      (this.HBr = this.Entity.GetComponent(173)),
      (this.o4o = this.Entity.GetComponent(176)),
      (this.eqr = this.oqr()),
      !0)
    );
  }
  OnTick(e) {
    (this.o4o?.GravityDirect ?? Vector_1.Vector.DownVectorProxy).DotProduct(
      this.ActorComponent.ActorVelocityProxy,
    ) >= this.eqr
      ? 0 === this.tqr && (this.tqr = Time_1.Time.WorldTimeSeconds)
      : (this.tqr = 0);
  }
  FallInjure() {
    var e, t, r, i;
    this.TagComponent.HasTag(1918148596) ||
      !this.HBr?.IsInGame ||
      ModelManager_1.ModelManager.DeadReviveModel.SkipFallInjure ||
      this.TagComponent.HasTag(560942831) ||
      ((r = this.o4o?.GravityUp ?? Vector_1.Vector.UpVectorProxy),
      (e = MathUtils_1.MathUtils.CommonTempVector).FromUeVector(
        this.ActorComponent.Actor.CharacterMovement.GetLastUpdateVelocity(),
      ),
      (e = r.DotProduct(e)),
      (r = r.DotProduct(this.ActorComponent.ActorVelocityProxy)),
      (i = this.Pqr()),
      -e < this.eqr && (this.tqr = 0),
      (t = this.tqr ? Time_1.Time.WorldTimeSeconds - this.tqr : 0),
      (r = Math.ceil(this.xqr(-e, -r, i, t))) <= 0) ||
      ((i = this.CreatureDataComponent.GetCreatureDataId()),
      this.Entity.GetComponent(67).CollectSampleAndSend(),
      ControllerHolder_1.ControllerHolder.CreatureController.LandingDamageRequest(
        i,
        e,
        t * CommonDefine_1.MILLIONSECOND_PER_SECOND,
      ),
      EventSystem_1.EventSystem.EmitWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnFallInjure,
        r,
        !1,
      ),
      this.BuffComponent?.RemoveBuffByEffectType(36, "跌落伤害移除冰冻buff"),
      (this.$br.NeedCalculateFallInjure = !1));
  }
  xqr(e, t, r, i) {
    let a = 0;
    var o = this.AttributeComponent.GetCurrentValue(
      CharacterAttributeTypes_1.EAttributeId.l5n,
    );
    return (a = this.CreatureDataComponent.IsRealMonster()
      ? CharacterDamageCalculations_1.Calculation.LandingDamageCalculationMonster(
          r,
          o,
        )
      : CharacterDamageCalculations_1.Calculation.LandingDamageCalculationRole(
          e,
          t,
          i,
          o,
        )) <= 0
      ? 0
      : a;
  }
  Pqr() {
    var e, t;
    return this.$br.NeedCalculateFallInjure &&
      ((e = this.$br.BeHitLocation.Z),
      (t = this.ActorComponent.ActorLocationProxy.Z) < e)
      ? e - t
      : 0;
  }
  oqr() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "landing_damage_args_role",
    )[1];
  }
};
(CharacterDamageComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(20)],
  CharacterDamageComponent,
)),
  (exports.CharacterDamageComponent = CharacterDamageComponent);
//# sourceMappingURL=CharacterDamageComponent.js.map
