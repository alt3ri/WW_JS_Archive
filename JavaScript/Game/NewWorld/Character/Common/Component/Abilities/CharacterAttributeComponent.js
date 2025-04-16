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
const UE = require("ue"),
  Time_1 = require("../../../../../../Core/Common/Time"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  BaseAttributeComponent_1 = require("./BaseAttributeComponent"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes");
let CharacterAttributeComponent = class CharacterAttributeComponent extends BaseAttributeComponent_1.BaseAttributeComponent {
  constructor() {
    super(...arguments),
      (this.BuffComponent = void 0),
      (this.qbr = (e, t, r) => {
        (CharacterAttributeTypes_1.stateAttributeIds.has(e) ||
          [...CharacterAttributeTypes_1.attributeIdsWithMax.values()].some(
            (t) => t === e,
          )) &&
          this.Gbr?.InternalApplyModToAttribute(e, 3, t);
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
      this.Koa(),
      this.AddListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        this.Nbr,
      ),
      this.AddListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.Obr),
      this.AddListeners(CharacterAttributeTypes_1.energyAttrIds, this.kbr),
      this.AddGeneralListener(this.qbr),
      !0
    );
  }
  OnActivate() {
    this.Koa();
  }
  Koa() {
    var t =
      this.Entity.CheckGetComponent(0)?.ComponentDataMap.get("sys")?.sys?.Mna;
    if (void 0 !== t) {
      var e = new Map(),
        r = [],
        i = this.Init();
      for (const n of t) {
        var s = n.tSs,
          o = n.vna,
          a = n.pna ?? 0;
        0 !== a ? e.set(s, a) : r.push(s),
          (this.BaseValues[s] = o),
          (this.CurrentValues[s] = o + a);
      }
      if (i) for (const h of r) this.UpdateCurrentValue(h);
    }
  }
  static AttributeChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r),
      i = r?.Entity?.GetComponent(171);
    if (r && i) {
      for (const s of e.GSs)
        CharacterAttributeTypes_1.stateAttributeIds.has(s.tSs) &&
          (s.y6n = s.eSs),
          s.tSs && i.SyncValueFromServer(s.tSs, s.eSs, s.y6n);
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnServerAttributeChange,
        r.Id,
        e,
      );
    }
  }
  static RecoverPropChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.s5n),
      i =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          r,
        )?.Entity?.GetComponent(171);
    if (i) {
      var s =
        Time_1.Time.ServerCombatStopTime -
        Number(MathUtils_1.MathUtils.LongToBigInt(e.S6n));
      for (const o of e.GSs)
        i.SyncRecoverPropFromServer(o.E6n, o.y6n, o.I6n, o.L6n, Number(s));
    }
  }
  OnInit() {
    return (
      super.OnInit(),
      (this.BuffComponent = this.Entity.CheckGetComponent(172)),
      !0
    );
  }
  OnStart() {
    this.Koa();
    var t = this.Entity.CheckGetComponent(1)?.Owner;
    t && t instanceof UE.BaseCharacter && (this.Gbr = t.AbilitySystemComponent);
    for (const e of CharacterAttributeTypes_1.attributeIdsWithMax.values())
      this.Gbr?.InternalApplyModToAttribute(e, 3, this.GetCurrentValue(e));
    for (const r of CharacterAttributeTypes_1.stateAttributeIds.values())
      this.Gbr?.InternalApplyModToAttribute(r, 3, this.GetCurrentValue(r));
    return !0;
  }
  OnEnd() {
    return (
      this.RemoveListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        this.Nbr,
      ),
      this.RemoveListener(CharacterAttributeTypes_1.EAttributeId.l5n, this.Obr),
      this.RemoveListeners(CharacterAttributeTypes_1.energyAttrIds, this.kbr),
      this.RemoveGeneralListener(this.qbr),
      !0
    );
  }
  OnClear() {
    return !0;
  }
};
__decorate(
  [CombatMessage_1.CombatNet.Listen("OFn", !0)],
  CharacterAttributeComponent,
  "AttributeChangedNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.Listen("v3n", !0)],
    CharacterAttributeComponent,
    "RecoverPropChangedNotify",
    null,
  ),
  (CharacterAttributeComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(171)],
    CharacterAttributeComponent,
  )),
  (exports.CharacterAttributeComponent = CharacterAttributeComponent);
//# sourceMappingURL=CharacterAttributeComponent.js.map
