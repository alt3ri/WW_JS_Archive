"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getServerEditorObjMeta = exports.setServerEditorObjMeta = void 0);
const Util_1 = require("../Misc/Util");
const EDITOR_SERVER_URL = "http://iloop.aki.kuro.com:8002/editor-object";
const CACHE_EXPIRE_TIME = 6e4;
const cache = new Map();
async function setServerEditorObjMeta(e, t, r) {
  (t = { uid: e, meta: t, operator: r }),
    (r = await (0, Util_1.doJsonHttpPost)(EDITOR_SERVER_URL, t));
  return cache.set(e, { Obj: r, FetchTime: Date.now() }), r;
}
async function getServerEditorObjMeta(e, t) {
  if (!t) {
    t = cache.get(e);
    if (t && Date.now() - t.FetchTime < CACHE_EXPIRE_TIME) return t.Obj;
  }
  t = await (0, Util_1.doJsonHttpGet)(EDITOR_SERVER_URL + "/" + e);
  return cache.set(e, { Obj: t, FetchTime: Date.now() }), t;
}
(exports.setServerEditorObjMeta = setServerEditorObjMeta),
  (exports.getServerEditorObjMeta = getServerEditorObjMeta);
// # sourceMappingURL=EditorObject.js.map
