"use strict";
function ignoreUnderScore(e) {
  return e.startsWith("_");
}
function isGuid(e) {
  return e.endsWith("Guid");
}
function isActionId(e) {
  return e === "ActionId";
}
function entityDataIgnoreFunc(e) {
  return ignoreUnderScore(e) || isGuid(e) || isActionId(e);
}
function treeDataIgnoreFunc(e) {
  return ignoreUnderScore(e) || isGuid(e) || isActionId(e);
}
function flowDataIgnoreFunc(e) {
  return ignoreUnderScore(e) || isGuid(e) || isActionId(e);
}
function editorFieldIgnoreFunc(e) {
  return ignoreUnderScore(e) || /^Ed[A-Z].*/.test(e);
}
function deepEquals(r, o, t) {
  if (r !== o) {
    const e = typeof r;
    if (e !== typeof o) return !1;
    if (
      e != "object" ||
      void 0 === r ||
      void 0 === o ||
      r === null ||
      o === null
    )
      return !1;
    if (r instanceof Array) {
      if (r.length !== o.length) return !1;
      for (let e = 0; e < r.length; e++)
        if (!deepEquals(r[e], o[e], t)) return !1;
    } else {
      for (const n in r) if (!t?.(n) && !deepEquals(r[n], o[n], t)) return !1;
      for (const i in o)
        if (!t?.(i) && void 0 === r[i] && void 0 !== o[i]) return !1;
    }
  }
  return !0;
}
function clearIgnoreField(r, o) {
  if (!o || r === null) return r;
  if (r instanceof Array) {
    const t = [];
    for (let e = 0; e < r.length; e++) t[e] = clearIgnoreField(r[e], o);
    return t;
  }
  if (typeof r !== "object") return r;
  let e;
  const n = {};
  for (const i in r)
    o(i) ? (n[i] = void 0) : ((e = r[i]), (n[i] = clearIgnoreField(e, o)));
  return n;
}
function createDiff(e, r, o) {
  if (void 0 === r) return clearIgnoreField(e, o);
  if (void 0 === e) return null;
  if (typeof e !== "object" || typeof r !== "object") return e;
  if (r instanceof Array)
    return r.length === e.length && deepEquals(r, e, o)
      ? void 0
      : clearIgnoreField(e, o);
  let t = 0;
  let n;
  let i;
  let f;
  let u;
  const c = {};
  for (const l in e)
    o?.(l) ||
      (void 0 === r[l] && ((n = e[l]), (c[l] = clearIgnoreField(n, o)), t++));
  for (const s in r)
    o?.(s) ||
      ((i = e[s]),
      (f = r[s]),
      void 0 !== i
        ? (u = typeof i) === typeof f && u == "object"
          ? ((u = createDiff(i, f, o)), void 0 !== (c[s] = u) && t++)
          : i !== f && ((c[s] = clearIgnoreField(i, o)), t++)
        : ((c[s] = null), t++));
  return t !== 0 ? c : void 0;
}
function containsNullField(e) {
  if (void 0 !== e) {
    if (e === null) return !0;
    if (typeof e === "object")
      if (e instanceof Array) {
        for (const r of e) if (containsNullField(r)) return !0;
      } else for (const o in e) if (containsNullField(e[o])) return !0;
  }
  return !1;
}
function removeNullField(e) {
  if (e != null) {
    if (typeof e !== "object") return e;
    if (e instanceof Array) {
      const r = [];
      for (const n of e) r.push(removeNullField(n));
      return r;
    }
    const o = {};
    for (const i in e) {
      const t = removeNullField(e[i]);
      o[i] = t;
    }
    return o;
  }
}
function applyDiff(e, r, o) {
  if (void 0 === e) return r;
  if (e !== null) {
    if (void 0 === r) return e;
    if (r === null) throw new Error("Base can not be null");
    if (typeof e !== "object") return e;
    if (typeof r !== "object") return e;
    if (r instanceof Array) return e;
    let t;
    let n;
    let i;
    let f;
    const u = {};
    for (const c in e)
      o?.(c) ||
        (void 0 === r[c] && (t = e[c]) !== null && (u[c] = removeNullField(t)));
    for (const l in r)
      o?.(l) ||
        ((n = e[l]),
        (i = r[l]),
        void 0 === n
          ? (u[l] = i)
          : n !== null &&
            ((f = typeof n),
            (u[l] = f === typeof i && f == "object" ? applyDiff(n, i, o) : n)));
    return u;
  }
}
function diffArrays(r, o) {
  return o && r
    ? {
        Added: o.filter((e) => !r.includes(e)),
        Removed: r.filter((e) => !o.includes(e)),
      }
    : { Added: [], Removed: [] };
}
function matchCategory(e, r) {
  for (const n in e) {
    const o = e[n];
    const t = r[n];
    if (void 0 === t || t !== o) return !1;
  }
  return !0;
}
function matchCategoryType(e, r) {
  return void 0 === e || void 0 !== r[e];
}
function isEntitiyMatch(e, r) {
  let o;
  return (
    !(!e || !r) &&
    ((void 0 === e.Category && void 0 === e.CategoryType) ||
      ((o = void 0 !== (o = e.Category) && matchCategory(o, r)),
      (e = void 0 !== (e = e.CategoryType) && matchCategoryType(e, r)),
      o) ||
      e)
  );
}
function isMatchCategory(r, e) {
  if (!e.Categories) return !1;
  let o = !1;
  return (
    e.Categories.forEach((e) => {
      o = o || matchCategory(e, r);
    }),
    o
  );
}
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.isMatchCategory =
    exports.isEntitiyMatch =
    exports.diffArrays =
    exports.applyDiff =
    exports.removeNullField =
    exports.containsNullField =
    exports.createDiff =
    exports.clearIgnoreField =
    exports.deepEquals =
    exports.editorFieldIgnoreFunc =
    exports.flowDataIgnoreFunc =
    exports.treeDataIgnoreFunc =
    exports.entityDataIgnoreFunc =
    exports.isActionId =
    exports.isGuid =
    exports.ignoreUnderScore =
      void 0),
  (exports.ignoreUnderScore = ignoreUnderScore),
  (exports.isGuid = isGuid),
  (exports.isActionId = isActionId),
  (exports.entityDataIgnoreFunc = entityDataIgnoreFunc),
  (exports.treeDataIgnoreFunc = treeDataIgnoreFunc),
  (exports.flowDataIgnoreFunc = flowDataIgnoreFunc),
  (exports.editorFieldIgnoreFunc = editorFieldIgnoreFunc),
  (exports.deepEquals = deepEquals),
  (exports.clearIgnoreField = clearIgnoreField),
  (exports.createDiff = createDiff),
  (exports.containsNullField = containsNullField),
  (exports.removeNullField = removeNullField),
  (exports.applyDiff = applyDiff),
  (exports.diffArrays = diffArrays),
  (exports.isEntitiyMatch = isEntitiyMatch),
  (exports.isMatchCategory = isMatchCategory);
// # sourceMappingURL=IUtil.js.map
