"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiInteractionItemQueryManager =
    exports.ItemQueryResult =
    exports.AiInteractionSearchFilter =
      void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../Core/Utils/MathUtils");
const AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary");
const ModelManager_1 = require("../../../Manager/ModelManager");
const SceneItemUtility_1 = require("../Util/SceneItemUtility");
class AiInteractionSearchFilter {
  constructor() {
    (this.IsSearchedMarkByAi = void 0),
      (this.Tag = void 0),
      (this.Entity = void 0);
  }
}
exports.AiInteractionSearchFilter = AiInteractionSearchFilter;
class ItemQueryResult {
  constructor() {
    (this.Entity = void 0), (this.Length = -0);
  }
}
exports.ItemQueryResult = ItemQueryResult;
class AiInteractionItemQueryManager {
  constructor() {
    (this.orr = void 0), (this.cz = void 0);
  }
  AU() {
    (this.orr = new Set()), (this.cz = Vector_1.Vector.Create(0, 0, 0));
  }
  static Get() {
    return (
      this.za ||
        ((this.za = new AiInteractionItemQueryManager()), this.za.AU()),
      this.za
    );
  }
  RegisterItem(t) {
    return void 0 !== t && !this.orr.has(t) && (this.orr.add(t), !0);
  }
  UnRegisterItem(t) {
    return !!this.orr.has(t) && (this.orr.delete(t), !0);
  }
  GetCloseActor(t, e = 0, r = void 0, i = void 0) {
    if (this.orr.size !== 0)
      switch (e) {
        case 0:
          return this.rrr(t, r);
        case 1:
          return this.nrr(t, i, r);
      }
  }
  GetCloseActorsByRange(t, e, r = 0, i = void 0, s = void 0) {
    if (e !== 0 && this.orr.size !== 0)
      switch (r) {
        case 0:
          return this.srr(t, e, i);
        case 1:
          return this.arr(t, e, s, i);
      }
    return [];
  }
  srr(t, e, r) {
    let i;
    let s;
    const o = new Array();
    const n = e * e;
    for (const a of this.orr)
      this.hrr(a, r) ||
        ((i = this.lrr(t, a)) <= n &&
          (((s = new ItemQueryResult()).Entity = a),
          (s.Length = Math.sqrt(i)),
          o.push(s)));
    return o;
  }
  arr(t, e, r, i) {
    let s;
    let o;
    const n = new Array();
    for (const a of this.orr)
      this.hrr(a, i) ||
        ((s = this._rr(t, a, r))[1] &&
          (s = s[0]) <= e &&
          (((o = new ItemQueryResult()).Entity = a),
          (o.Length = s),
          n.push(o)));
    return n;
  }
  rrr(t, e) {
    let r;
    const i = new ItemQueryResult();
    i.Length = MathUtils_1.MathUtils.MaxFloat;
    let s = i.Length;
    for (const o of this.orr)
      this.hrr(o, e) ||
        ((r = this.lrr(t, o)) <= s && ((s = r), (i.Entity = o)));
    return (i.Length = Math.sqrt(s)), i;
  }
  nrr(t, e, r) {
    let i;
    const s = new ItemQueryResult();
    s.Length = MathUtils_1.MathUtils.MaxFloat;
    for (const o of this.orr)
      this.hrr(o, r) ||
        ((i = this._rr(t, o, e))[1] &&
          (i = i[0]) <= s.Length &&
          ((s.Entity = o), (s.Length = i)));
    return s;
  }
  lrr(t, e) {
    const r = this.cz;
    var t = (r.FromUeVector(t), e.GetComponent(182).ActorLocation);
    var e = (r.Subtraction(Vector_1.Vector.Create(t), r), r.SizeSquared());
    return e;
  }
  _rr(t, e, r) {
    const i = new Array();
    var e = e.GetComponent(182).ActorLocation;
    return AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
      r,
      t,
      e,
      i,
    )
      ? [AiContollerLibrary_1.AiControllerLibrary.GetPathLength(t, i), !0]
      : [-1, !1];
  }
  hrr(e, r) {
    const t = e.GetComponent(128);
    if (!SceneItemUtility_1.SceneItemUtility.GetBaseItemActor(e) || !e.Active)
      return !0;
    if (r) {
      if (!t.CanBeUsed()) return !0;
      if (t.IsSearchByAi !== r.IsSearchedMarkByAi) return !0;
      if (r) {
        let t = !1;
        for (const i of r.Tag)
          (i !== "Weapon" ||
            ModelManager_1.ModelManager.AiWeaponModel.HasWeaponConfig(
              e,
              r.Entity,
            )) &&
            (t = !0);
        if (!t) return !0;
      }
    }
    return !1;
  }
}
(exports.AiInteractionItemQueryManager = AiInteractionItemQueryManager).za =
  void 0;
// # sourceMappingURL=AiInteractionItemQueryManager.js.map
