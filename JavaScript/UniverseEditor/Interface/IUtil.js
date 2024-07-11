"use strict";
function ignoreUnderScore(e) {
  return e.startsWith("_");
}
function isGuid(e) {
  return "Guid" === e || "ActionGuid" === e;
}
function isActionId(e) {
  return "ActionId" === e;
}
function isTemplateOnly(e) {
  return "EdIsLocked" === e;
}
function entityDataIgnoreFunc(e) {
  return ignoreUnderScore(e) || isGuid(e) || isActionId(e) || isTemplateOnly(e);
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
function deepEquals(r, t, o) {
  if (r !== t) {
    var e = typeof r;
    if (e != typeof t) return !1;
    if (
      "object" != e ||
      void 0 === r ||
      void 0 === t ||
      null === r ||
      null === t
    )
      return !1;
    if (r instanceof Array) {
      if (r.length !== t.length) return !1;
      for (let e = 0; e < r.length; e++)
        if (!deepEquals(r[e], t[e], o)) return !1;
    } else {
      for (const n in r) if (!o?.(n) && !deepEquals(r[n], t[n], o)) return !1;
      for (const i in t)
        if (!o?.(i) && void 0 === r[i] && void 0 !== t[i]) return !1;
    }
  }
  return !0;
}
function clearIgnoreField(r, t) {
  if (!t || null === r) return r;
  if (r instanceof Array) {
    var o = [];
    for (let e = 0; e < r.length; e++) o[e] = clearIgnoreField(r[e], t);
    return o;
  }
  if ("object" != typeof r) return r;
  var e,
    n = {};
  for (const i in r)
    t(i) ? (n[i] = void 0) : ((e = r[i]), (n[i] = clearIgnoreField(e, t)));
  return n;
}
function createDiff(e, r, t) {
  if (void 0 === r) return clearIgnoreField(e, t);
  if (void 0 === e) return null;
  if ("object" != typeof e || "object" != typeof r) return e;
  if (r instanceof Array)
    return r.length === e.length && deepEquals(r, e, t)
      ? void 0
      : clearIgnoreField(e, t);
  let o = 0;
  var n,
    i,
    u,
    f,
    c = {};
  for (const l in e)
    t?.(l) ||
      (void 0 === r[l] && ((n = e[l]), (c[l] = clearIgnoreField(n, t)), o++));
  for (const s in r)
    t?.(s) ||
      ((i = e[s]),
      (u = r[s]),
      void 0 !== i
        ? (f = typeof i) == typeof u && "object" == f
          ? ((f = createDiff(i, u, t)), void 0 !== (c[s] = f) && o++)
          : i !== u && ((c[s] = clearIgnoreField(i, t)), o++)
        : ((c[s] = null), o++));
  return 0 !== o ? c : void 0;
}
function containsNullField(e) {
  if (void 0 !== e) {
    if (null === e) return !0;
    if ("object" == typeof e)
      if (e instanceof Array) {
        for (const r of e) if (containsNullField(r)) return !0;
      } else for (const t in e) if (containsNullField(e[t])) return !0;
  }
  return !1;
}
function removeNullField(e) {
  if (null != e) {
    if ("object" != typeof e) return e;
    if (e instanceof Array) {
      var r = [];
      for (const n of e) r.push(removeNullField(n));
      return r;
    }
    var t = {};
    for (const i in e) {
      var o = removeNullField(e[i]);
      t[i] = o;
    }
    return t;
  }
}
function applyDiff(e, r, t) {
  if (void 0 === e) return r;
  if (null !== e) {
    if (void 0 === r) return e;
    if (null === r) throw new Error("Base can not be null");
    if ("object" != typeof e) return e;
    if ("object" != typeof r) return e;
    if (r instanceof Array) return e;
    var o,
      n,
      i,
      u,
      f = {};
    for (const c in e)
      t?.(c) ||
        (void 0 === r[c] && null !== (o = e[c]) && (f[c] = removeNullField(o)));
    for (const l in r)
      t?.(l) ||
        ((n = e[l]),
        (i = r[l]),
        void 0 === n
          ? (f[l] = i)
          : null !== n &&
            ((u = typeof n),
            (f[l] = u == typeof i && "object" == u ? applyDiff(n, i, t) : n)));
    return f;
  }
}
function diffArrays(r, t) {
  return t && r
    ? {
        Added: t.filter((e) => !r.includes(e)),
        Removed: r.filter((e) => !t.includes(e)),
      }
    : { Added: [], Removed: [] };
}
function matchCategory(e, r) {
  for (const n in e) {
    var t = e[n],
      o = r[n];
    if (void 0 === o || o !== t) return !1;
  }
  return !0;
}
function matchCategoryType(e, r) {
  return void 0 === e || void 0 !== r[e];
}
function isEntitiyMatch(e, r) {
  var t;
  return (
    !(!e || !r) &&
    ((void 0 === e.Category && void 0 === e.CategoryType) ||
      ((t = void 0 !== (t = e.Category) && matchCategory(t, r)),
      (e = void 0 !== (e = e.CategoryType) && matchCategoryType(e, r)),
      t) ||
      e)
  );
}
function isMatchCategory(r, e) {
  if (!e.Categories) return !1;
  let t = !1;
  return (
    e.Categories.forEach((e) => {
      t = t || matchCategory(e, r);
    }),
    t
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
    exports.isTemplateOnly =
    exports.isActionId =
    exports.isGuid =
    exports.ignoreUnderScore =
      void 0),
  (exports.ignoreUnderScore = ignoreUnderScore),
  (exports.isGuid = isGuid),
  (exports.isActionId = isActionId),
  (exports.isTemplateOnly = isTemplateOnly),
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
//# sourceMappingURL=IUtil.js.map
