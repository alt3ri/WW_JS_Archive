"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AiInteractionItemQueryManager =
    exports.ItemQueryResult =
    exports.AiInteractionSearchFilter =
      void 0);
const Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  AiContollerLibrary_1 = require("../../../AI/Controller/AiContollerLibrary"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  SceneItemUtility_1 = require("../Util/SceneItemUtility");
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
    (this.enr = void 0), (this.cz = void 0);
  }
  AU() {
    (this.enr = new Set()), (this.cz = Vector_1.Vector.Create(0, 0, 0));
  }
  static Get() {
    return (
      this.za ||
        ((this.za = new AiInteractionItemQueryManager()), this.za.AU()),
      this.za
    );
  }
  RegisterItem(t) {
    return void 0 !== t && !this.enr.has(t) && (this.enr.add(t), !0);
  }
  UnRegisterItem(t) {
    return !!this.enr.has(t) && (this.enr.delete(t), !0);
  }
  GetCloseActor(t, e = 0, r = void 0, i = void 0) {
    if (0 !== this.enr.size)
      switch (e) {
        case 0:
          return this.tnr(t, r);
        case 1:
          return this.inr(t, i, r);
      }
  }
  GetCloseActorsByRange(t, e, r = 0, i = void 0, s = void 0) {
    if (0 !== e && 0 !== this.enr.size)
      switch (r) {
        case 0:
          return this.onr(t, e, i);
        case 1:
          return this.rnr(t, e, s, i);
      }
    return [];
  }
  onr(t, e, r) {
    var i,
      s,
      o = new Array(),
      n = e * e;
    for (const a of this.enr)
      this.nnr(a, r) ||
        ((i = this.snr(t, a)) <= n &&
          (((s = new ItemQueryResult()).Entity = a),
          (s.Length = Math.sqrt(i)),
          o.push(s)));
    return o;
  }
  rnr(t, e, r, i) {
    var s,
      o,
      n = new Array();
    for (const a of this.enr)
      this.nnr(a, i) ||
        ((s = this.anr(t, a, r))[1] &&
          (s = s[0]) <= e &&
          (((o = new ItemQueryResult()).Entity = a),
          (o.Length = s),
          n.push(o)));
    return n;
  }
  tnr(t, e) {
    var r,
      i = new ItemQueryResult();
    i.Length = MathUtils_1.MathUtils.MaxFloat;
    let s = i.Length;
    for (const o of this.enr)
      this.nnr(o, e) ||
        ((r = this.snr(t, o)) <= s && ((s = r), (i.Entity = o)));
    return (i.Length = Math.sqrt(s)), i;
  }
  inr(t, e, r) {
    var i,
      s = new ItemQueryResult();
    s.Length = MathUtils_1.MathUtils.MaxFloat;
    for (const o of this.enr)
      this.nnr(o, r) ||
        ((i = this.anr(t, o, e))[1] &&
          (i = i[0]) <= s.Length &&
          ((s.Entity = o), (s.Length = i)));
    return s;
  }
  snr(t, e) {
    var r = this.cz,
      t = (r.FromUeVector(t), e.GetComponent(187).ActorLocation),
      e = (r.Subtraction(Vector_1.Vector.Create(t), r), r.SizeSquared());
    return e;
  }
  anr(t, e, r) {
    var i = new Array(),
      e = e.GetComponent(187).ActorLocation;
    return AiContollerLibrary_1.AiControllerLibrary.NavigationFindPath(
      r,
      t,
      e,
      i,
    )
      ? [AiContollerLibrary_1.AiControllerLibrary.GetPathLength(t, i), !0]
      : [-1, !1];
  }
  nnr(e, r) {
    var t = e.GetComponent(131);
    if (!SceneItemUtility_1.SceneItemUtility.GetBaseItemActor(e) || !e.Active)
      return !0;
    if (r) {
      if (!t.CanBeUsed()) return !0;
      if (t.IsSearchByAi !== r.IsSearchedMarkByAi) return !0;
      if (r) {
        let t = !1;
        for (const i of r.Tag)
          ("Weapon" !== i ||
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
//# sourceMappingURL=AiInteractionItemQueryManager.js.map
