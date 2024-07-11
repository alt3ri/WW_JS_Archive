"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, e, r, i) {
    var o,
      s = arguments.length,
      a =
        s < 3
          ? e
          : null === i
            ? (i = Object.getOwnPropertyDescriptor(e, r))
            : i;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, e, r, i);
    else
      for (var n = t.length - 1; 0 <= n; n--)
        (o = t[n]) && (a = (s < 3 ? o(a) : 3 < s ? o(e, r, a) : o(e, r)) || a);
    return 3 < s && a && Object.defineProperty(e, r, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterAttributeComponent = void 0);
const MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  FormationAttributeController_1 = require("../../../../../Module/Abilities/FormationAttributeController"),
  CombatMessage_1 = require("../../../../../Module/CombatMessage/CombatMessage"),
  BaseAttributeComponent_1 = require("./BaseAttributeComponent"),
  CharacterAttributeTypes_1 = require("./CharacterAttributeTypes"),
  RegisterComponent_1 = require("../../../../../../Core/Entity/RegisterComponent"),
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
      (this.elt = void 0),
      (this.zht = void 0),
      (this.sqr = (e, t, r) => {
        (CharacterAttributeTypes_1.stateAttributeIds.has(e) ||
          [...CharacterAttributeTypes_1.attributeIdsWithMax.values()].some(
            (t) => t === e,
          )) &&
          this.aqr?.InternalApplyModToAttribute(e, 3, r);
      }),
      (this.aqr = void 0),
      (this.hqr = (t, e, r) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharOnHealthChanged,
          this.Entity.Id,
          e,
          r,
        );
      }),
      (this.lqr = (t, e, r) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.CharOnHealthMaxChanged,
          this.Entity.Id,
          e,
          r,
        );
      }),
      (this._qr = (t, e, r) => {
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
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("qvs");
    return (
      t && this.InitAttributesFromPbData(t.qvs?.Gps ?? void 0),
      this.AddListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        this.hqr,
      ),
      this.AddListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.lqr),
      this.AddListeners(energyAttrIds, this._qr),
      this.AddGeneralListener(this.sqr),
      !0
    );
  }
  OnActivate() {
    var t = this.Entity.GetComponent(0)?.ComponentDataMap.get("qvs")?.qvs?.Gps;
    if (t)
      for (const e of t)
        void 0 !== e.Ugs &&
          CharacterAttributeTypes_1.stateAttributeIds.has(e.Ugs) &&
          (e.NFn = e.Pgs),
          e.Ugs ===
            CharacterAttributeTypes_1.EAttributeId.Proto_ParalysisTime &&
            (e.NFn = e.Pgs),
          e.Ugs && this.SyncValueFromServer(e.Ugs, e.Pgs, e.NFn);
  }
  InitAttributesFromPbData(t) {
    if (void 0 !== t)
      for (const e of t)
        void 0 !== e.Ugs &&
          CharacterAttributeTypes_1.stateAttributeIds.has(e.Ugs) &&
          (e.NFn = e.Pgs),
          e.Ugs ===
            CharacterAttributeTypes_1.EAttributeId.Proto_ParalysisTime &&
            (e.NFn = e.Pgs),
          e.Ugs && this.InitValueFromServer(e.Ugs, e.Pgs, e.NFn);
  }
  static AttributeChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
      r = ModelManager_1.ModelManager.CreatureModel.GetEntity(r),
      i = r?.Entity?.GetComponent(156);
    if (r && i) {
      for (const o of e.dfs)
        CharacterAttributeTypes_1.stateAttributeIds.has(o.Ugs) &&
          (o.NFn = o.Pgs),
          o.Ugs && i.SyncValueFromServer(o.Ugs, o.Pgs, o.NFn);
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnServerAttributeChange,
        r.Id,
        e,
      );
    }
  }
  static RecoverPropChangedNotify(t, e) {
    var r = MathUtils_1.MathUtils.LongToNumber(e.Ekn),
      i =
        ModelManager_1.ModelManager.CreatureModel.GetEntity(
          r,
        )?.Entity?.GetComponent(156);
    if (i) {
      var o =
        FormationAttributeController_1.FormationAttributeController.GetPredictedServerStopTime() -
        Number(MathUtils_1.MathUtils.LongToBigInt(e.GFn));
      for (const s of e.dfs)
        i.SyncRecoverPropFromServer(s.OFn, s.NFn, s.kFn, s.VFn, Number(o));
    }
  }
  OnInit() {
    return (
      (this.elt = this.Entity.CheckGetComponent(157)),
      (this.zht = this.Entity.CheckGetComponent(0)),
      !0
    );
  }
  OnStart() {
    var t = this.zht?.ComponentDataMap.get("qvs")?.qvs,
      t = (t && this.uqr(t.Gps), this.Entity.CheckGetComponent(3));
    this.aqr = t?.Actor.AbilitySystemComponent;
    for (const e of CharacterAttributeTypes_1.stateAttributeIds.values())
      this.aqr?.InternalApplyModToAttribute(e, 3, this.GetCurrentValue(e));
    for (const r of CharacterAttributeTypes_1.attributeIdsWithMax.values())
      this.aqr?.InternalApplyModToAttribute(r, 3, this.GetCurrentValue(r));
    return !0;
  }
  uqr(t) {
    var e = new Map();
    for (const o of t) {
      var r = o.Ugs,
        i = o.NFn - o.Pgs;
      0 != i && e.set(r, i);
    }
    this.elt?.UpdateSysGrowBuff(e);
  }
  OnEnd() {
    return (
      this.RemoveListener(
        CharacterAttributeTypes_1.EAttributeId.Proto_Life,
        this.hqr,
      ),
      this.RemoveListener(CharacterAttributeTypes_1.EAttributeId.Tkn, this.lqr),
      this.RemoveListeners(energyAttrIds, this._qr),
      this.RemoveGeneralListener(this.sqr),
      !0
    );
  }
  OnClear() {
    return !0;
  }
};
__decorate(
  [CombatMessage_1.CombatNet.SyncHandle("e2n")],
  CharacterAttributeComponent,
  "AttributeChangedNotify",
  null,
),
  __decorate(
    [CombatMessage_1.CombatNet.SyncHandle("b2n")],
    CharacterAttributeComponent,
    "RecoverPropChangedNotify",
    null,
  ),
  (CharacterAttributeComponent = __decorate(
    [(0, RegisterComponent_1.RegisterComponent)(156)],
    CharacterAttributeComponent,
  )),
  (exports.CharacterAttributeComponent = CharacterAttributeComponent);
//# sourceMappingURL=CharacterAttributeComponent.js.map
