"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiConditionEvents = exports.AiAttributeRate = void 0);
const Vector_1 = require("../../../Core/Utils/Math/Vector"),
  TsFloatRange_1 = require("../../../Core/Utils/TsFloatRange"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem");
class AiAttributeRate {
  constructor(t) {
    (this.Denominator = t.Denominator),
      (this.Numerator = t.Numerator),
      (this.Range = new TsFloatRange_1.TsFloatRange(
        0 === t.Range.LowerBound.Type,
        t.Range.LowerBound.Value,
        t.Range.UpperBound.Value,
      ));
  }
}
exports.AiAttributeRate = AiAttributeRate;
class AiConditions {
  constructor(s) {
    (this.Tags = new Map()),
      (this.Attributes = new Map()),
      (this.AttributeRates = new Array()),
      (this.AttributeRateDenominatorMap = new Map()),
      (this.AttributeRateNumeratorMap = new Map()),
      (this.Logic = s.Logic);
    let h = s.Tags.Num();
    for (let t = 0; t < h; ++t) {
      var i = s.Tags.GetKey(t),
        e = s.Tags.Get(i);
      this.Tags.set(
        i.TagId,
        new TsFloatRange_1.TsFloatRange(
          0 === e.LowerBound.Type,
          e.LowerBound.Value,
          e.UpperBound.Value,
        ),
      );
    }
    h = s.Attributes.Num();
    for (let t = 0; t < h; ++t) {
      var o = s.Attributes.GetKey(t),
        n = s.Attributes.Get(o);
      this.Attributes.set(
        o,
        new TsFloatRange_1.TsFloatRange(
          0 === n.LowerBound.Type,
          n.LowerBound.Value,
          n.UpperBound.Value,
        ),
      );
    }
    h = s.AttributeRates.Num();
    for (let i = 0; i < h; ++i) {
      var r = new AiAttributeRate(s.AttributeRates.Get(i));
      this.AttributeRates.push(r);
      let t = this.AttributeRateDenominatorMap.get(r.Denominator);
      t || ((t = []), this.AttributeRateDenominatorMap.set(r.Denominator, t)),
        t.push(i),
        (t = this.AttributeRateNumeratorMap.get(r.Numerator)) ||
          ((t = []), this.AttributeRateNumeratorMap.set(r.Numerator, t)),
        t.push(i);
    }
  }
}
class ConditionEventPair {
  constructor() {
    (this.Qte = void 0),
      (this.EventBinder = void 0),
      (this.Xte = void 0),
      (this.$te = void 0),
      (this.Yte = new Set()),
      (this.Jte = new Set()),
      (this.zte = new Set()),
      (this.Zte = 0),
      (this.eie = 0),
      (this.tie = new Array()),
      (this.iie = void 0),
      (this.oie = (t, i, s) => {
        this.Qte.Attributes.get(t).InRange(i)
          ? this.Jte.has(t) || (this.Jte.add(t), this.rie())
          : this.Jte.has(t) && (this.Jte.delete(t), this.nie());
      }),
      (this.sie = void 0),
      (this.aie = (t, i, s) => {
        if (this.$te) {
          var h = this.Qte.AttributeRateNumeratorMap.get(t);
          if (h)
            for (const v of h) {
              var e = this.Qte.AttributeRates[v],
                o = this.$te.GetCurrentValue(e.Denominator);
              0 !== o &&
                (e.Range.InRange(i / o)
                  ? this.zte.has(v) || (this.zte.add(v), this.rie())
                  : this.zte.has(v) && (this.zte.delete(v), this.nie()));
            }
          h = this.Qte.AttributeRateDenominatorMap.get(t);
          if (h && 0 !== i)
            for (const a of h) {
              var n = this.Qte.AttributeRates[a],
                r = this.$te.GetCurrentValue(n.Numerator);
              n.Range.InRange(r / i)
                ? this.zte.has(a) || (this.zte.add(a), this.rie())
                : this.zte.has(a) && (this.zte.delete(a), this.nie());
            }
        }
      });
  }
  hie(i) {
    return (t) => {
      this.Qte.Tags.get(i).InRange(t)
        ? this.Yte.has(i) || (this.Yte.add(i), this.rie())
        : this.Yte.has(i) && (this.Yte.delete(i), this.nie());
    };
  }
  InitConditions(t, i, s) {
    this.Clear(),
      (this.Qte = new AiConditions(t)),
      (this.EventBinder = i),
      (this.Xte = s.Entity.GetComponent(190)),
      (this.$te = s.Entity.GetComponent(159)),
      (this.eie =
        this.Qte.Tags.size +
        this.Qte.Attributes.size +
        this.Qte.AttributeRates.length);
    var h = s.Entity.GetComponent(190);
    if (h)
      for (var [e] of this.Qte.Tags) {
        e = h.ListenForTagAnyCountChanged(e, this.hie(e));
        this.tie.push(e);
      }
    if (this.$te) {
      var o,
        n = new Set();
      for ([o] of this.Qte.Attributes) n.add(o);
      this.Qte.Attributes.size &&
        this.$te &&
        ((this.iie = [...n]),
        this.$te.AddListeners(this.iie, this.oie, "AiConditionEvent")),
        n.clear();
      for (const r of this.Qte.AttributeRates)
        n.add(r.Numerator), n.add(r.Denominator);
      this.Qte.AttributeRates.length &&
        this.$te &&
        ((this.sie = [...n]),
        this.$te.AddListeners(this.sie, this.aie, "AiConditionEvent2"));
    }
    this.ResetConditions(!0);
  }
  Clear() {
    this.iie &&
      (this.$te?.RemoveListeners(this.iie, this.oie), (this.iie = void 0)),
      this.sie &&
        (this.$te?.RemoveListeners(this.sie, this.aie), (this.sie = void 0)),
      (this.Qte = void 0),
      this.EventBinder &&
        (this.EventBinder.Callback.Clear(), (this.EventBinder = void 0)),
      (this.Xte = void 0),
      (this.$te = void 0),
      this.Yte.clear(),
      this.Jte.clear(),
      this.zte.clear(),
      (this.Zte = 0),
      (this.eie = 0),
      this.tie.forEach((t) => {
        t.EndTask();
      }),
      this.tie.splice(0, this.tie.length);
  }
  rie() {
    ++this.Zte,
      0 === this.Qte.Logic
        ? this.Zte === this.eie && this.EventBinder.Callback.Broadcast(!0)
        : 1 === this.Zte && this.EventBinder.Callback.Broadcast(!0);
  }
  nie() {
    --this.Zte,
      0 === this.Qte.Logic
        ? this.Zte === this.eie - 1 && this.EventBinder.Callback.Broadcast(!1)
        : 0 === this.Zte && this.EventBinder.Callback.Broadcast(!1);
  }
  ResetConditions(t = !1) {
    if (((this.Zte = 0), this.Xte))
      for (var [i, s] of this.Qte.Tags)
        s.InRange(this.Xte.GetTagCount(i)) && (this.Yte.add(i), ++this.Zte);
    if (this.$te) {
      for (var [h, e] of this.Qte.Attributes) {
        var o = this.$te.GetCurrentValue(h);
        e.InRange(o) && (this.Jte.add(h), ++this.Zte);
      }
      let t = 0;
      for (const v of this.Qte.AttributeRates) {
        var n = this.$te.GetCurrentValue(v.Numerator),
          r = this.$te.GetCurrentValue(v.Denominator);
        0 !== r && v.Range.InRange(n / r) && (this.zte.add(t), ++this.Zte), ++t;
      }
    }
    if (0 === this.Qte.Logic) {
      if (this.Zte === this.eie)
        return void this.EventBinder.Callback.Broadcast(!0);
    } else if (0 < this.Zte)
      return void this.EventBinder.Callback.Broadcast(!0);
    t || this.EventBinder.Callback.Broadcast(!1);
  }
}
class AiConditionEvents {
  constructor(t) {
    (this.Bte = t),
      (this.lie = new Array()),
      (this._ie = new Map()),
      (this.uie = (t) => {
        var i = t.GetComponent(1);
        if (i?.Valid) {
          var s,
            h,
            e = Vector_1.Vector.DistSquared(
              this.Bte.CharActorComp.ActorLocationProxy,
              i.ActorLocationProxy,
            );
          for ([s, h] of this._ie) e < h && s.Callback.Broadcast(i.Owner, !0);
        }
      });
  }
  AddConditionEvent(t, i) {
    var s = new ConditionEventPair();
    s.InitConditions(t, i, this.Bte.CharActorComp), this.lie.push(s);
  }
  RemoveConditionEvent(t) {
    let i = 0;
    for (const s of this.lie) {
      if (s.EventBinder === t) {
        s.Clear();
        break;
      }
      ++i;
    }
    return i < this.lie.length && (this.lie.splice(i), !0);
  }
  AddSceneItemDestroyEvent(t, i) {
    0 === this._ie.size &&
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSceneItemDestroy,
        this.uie,
      ),
      this._ie.set(i, t * t);
  }
  RemoveSceneItemDestroyEvent(t) {
    this._ie.delete(t) &&
      0 === this._ie.size &&
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSceneItemDestroy,
        this.uie,
      );
  }
  Clear() {
    this.lie.forEach((t, i, s) => {
      t.Clear();
    }),
      this.lie.splice(0, this.lie.length),
      0 < this._ie.size &&
        EventSystem_1.EventSystem.Remove(
          EventDefine_1.EEventName.OnSceneItemDestroy,
          this.uie,
        ),
      this._ie.clear();
  }
  ResetAllConditionEvent() {
    for (const t of this.lie) t.ResetConditions();
  }
}
exports.AiConditionEvents = AiConditionEvents;
//# sourceMappingURL=AiConditionEvents.js.map
