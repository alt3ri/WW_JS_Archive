"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, r, i) {
    var s,
      o = arguments.length,
      a =
        o < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, r, i);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (s = t[n]) && (a = (o < 3 ? s(a) : 3 < o ? s(e, r, a) : s(e, r)) || a);
    return 3 < o && a && Object.defineProperty(e, r, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAttributeComponent = void 0);
const RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  BaseAttributeComponent_1 = require("./BaseAttributeComponent"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  energyAttrIds = [
    CharacterAttributeTypes_1.EAttributeId.Proto_Energy,
    CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy1,
    CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2,
    CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy3,
    CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy4,
  ];
let CharacterAttributeComponent = class CharacterAttributeComponent extends BaseAttributeComponent_1.BaseAttributeComponent {
  constructor() {
    super(...arguments),
      (this.m1t = void 0),
      (this.qbr = (e, t, r) => {
        (CharacterAttributeTypes_1.stateAttributeIds.has(e) ||
          [...CharacterAttributeTypes_1.attributeIdsWithMax.values()].some(
            (t) => t === e,
          )) &&
          this.Gbr?.InternalApplyModToAttribute(e, 3, r);
      }),
      (this.Gbr = void 0),
      (this.Nbr = (t, e, r) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharOnHealthChanged,
          this.Entity.Id,
          e,
          r,
        );
      }),
      (this.Obr = (t, e, r) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharOnHealthMaxChanged,
          this.Entity.Id,
          e,
          r,
        );
      }),
      (this.kbr = (t, e, r) => {
        EventSystem_1.EventSystem.EmitWithTarget(
          this.Entity,
          EventDefine_1.EEventName.CharOnEnergyChanged,
          t,
          e,
          r,
        );
      });
  }
  OnInitData() {
    return (
      this.Pia(),
      this.AddListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        this.Nbr,
      ),
      this.AddListener(CharacterAttributeTypes_1.EAttributeId.e5n, this.Obr),
      this.AddListeners(energyAttrIds, this.kbr),
      this.AddGeneralListener(this.qbr),
      !0
    );
  }
  OnActivate() {
    this.Pia();
  }
  Pia() {
    var t =
      this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("ZEs")?.ZEs?.sra;
    if (void 0 !== t) {
      var e = new Map(),
        r = [],
        i = this.Init();
      for (const n of t) {
        var s = n.QMs,
          o = n.ora,
          a = n.nra ?? 0;
        0 !== a ? e.set(s, a) : r.push(s),
          (this.BaseValues[s] = o),
          i || (this.CurrentValues[s] = o + a);
      }
      if (i) for (const h of r) this.UpdateCurrentValue(h);
      this.m1t?.Init() && this.m1t.UpdateSysGrowBuff(e);
    }
  }
  static AttributeChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.J4n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r),
      i = r?.Entity?.GetComponent(158);
    if (r && i) {
      for (const s of e.PSs)
        CharacterAttributeTypes_1.stateAttributeIds.has(s.QMs) &&
          (s.d6n = s.KMs),
          s.QMs && i.SyncValueFromServer(s.QMs, s.KMs, s.d6n);
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnServerAttributeChange,
        r.Id,
        e,
      );
    }
  }
  static RecoverPropChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.J4n),
      i =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          r,
        )?.Entity?.GetComponent(158);
    if (i) {
      var s =
        FormationAttributeController_1.FormationAttributeController.GetPredictedServerStopTime() -
        Number(MathUtils_1.MathUtils.LongToBigInt(e.c6n));
      for (const o of e.PSs)
        i.SyncRecoverPropFromServer(o.m6n, o.d6n, o.C6n, o.f6n, Number(s));
    }
  }
  OnInit() {
    return (this.m1t = this.Entity.CheckGetComponent(159)), !0;
  }
  OnStart() {
    this.Pia();
    var t = this.Entity.CheckGetComponent(3);
    this.Gbr = t?.Actor.AbilitySystemComponent;
    for (const e of CharacterAttributeTypes_1.stateAttributeIds.values())
      this.Gbr?.InternalApplyModToAttribute(e, 3, this.GetCurrentValue(e));
    for (const r of CharacterAttributeTypes_1.attributeIdsWithMax.values())
      this.Gbr?.InternalApplyModToAttribute(r, 3, this.GetCurrentValue(r));
    return !0;
  }
  OnEnd() {
    return (
      this.RemoveListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        this.Nbr,
      ),
      this.RemoveListener(CharacterAttributeTypes_1.EAttributeId.e5n, this.Obr),
      this.RemoveListeners(energyAttrIds, this.kbr),
      this.RemoveGeneralListener(this.qbr),
      !0
    );
  }
  OnClear() {
    return !0;
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("UFn")],
  CharacterAttributeComponent,
  "AttributeChangedNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("_3n")],
    CharacterAttributeComponent,
    "RecoverPropChangedNotify",
    null,
  ),
  (CharacterAttributeComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(158)],
    CharacterAttributeComponent,
  )),
  (exports.CharacterAttributeComponent = CharacterAttributeComponent);
//# sourceMappingURL=CharacterAttributeComponent.js.map
