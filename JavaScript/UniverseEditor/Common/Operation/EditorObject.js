"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.setEntityTemplateOwner =
    exports.fetchEntityTemplateOwner =
    exports.fetchUid =
    exports.getFlowIdByUid =
    exports.getFlowListIdByUid =
    exports.getLevelIdByObjUid =
    exports.getIdByUid =
    exports.getEditorObjTypeByUid =
    exports.getEditorObjUid =
    exports.genFlowUid =
    exports.genEntityUid =
    exports.genPrefabUid =
    exports.genQuestUid =
    exports.genLevelPlayUid =
    exports.genEntityTemplateUid =
      void 0);
const EditorObject_1 = require("../EditorClient/EditorObject");
const Entity_1 = require("./Entity");
const SegmentIdGenerator_1 = require("./SegmentIdGenerator");
function genEntityTemplateUid(e) {
  return "et_" + e;
}
function genLevelPlayUid(e, t) {
  return `l_${e}_` + t;
}
function genQuestUid(e) {
  return "q_" + e;
}
function genPrefabUid(e) {
  return "p_" + e;
}
function genEntityUid(e, t) {
  return `e_${e}_` + t;
}
function genFlowUid(e, t) {
  return `f_${e}_` + t;
}
function getEditorObjUid(e) {
  switch (e.ObjType) {
    case "LevelPlay":
      return genLevelPlayUid(e.LevelId, e.Id);
    case "Quest":
      return genQuestUid(e.Id);
    case "Flow":
      return genFlowUid(e.FlowListId, e.Id);
    case "Entity":
      return genEntityUid(e.LevelId, e.Id);
    case "EntityTemplate":
      return genEntityTemplateUid(e.BlueprintType);
    case "Prefab":
      return genPrefabUid(e.Id);
  }
  return "";
}
function getEditorObjTypeByUid(e) {
  if (e)
    switch (e.split("_")[0].toString()) {
      case "l":
        return "LevelPlay";
      case "q":
        return "Quest";
      case "f":
        return "Flow";
      case "e":
        return "Entity";
      case "et":
        return "EntityTemplate";
      case "p":
        return "Prefab";
    }
}
function getIdByUid(e) {
  const t = e.split("_");
  const r = getEditorObjTypeByUid(e);
  switch (r) {
    case "LevelPlay":
      return t[2];
    case "Quest":
      return t[1];
    case "Flow":
      return t[1] + "_" + t[2];
    case "Entity":
      return t[2];
    case "EntityTemplate":
      return e.substring("et_".length);
    case "Prefab":
      return t[1];
    default:
      throw new Error(`未知的对象类型: ${r} uid: ` + e);
  }
}
function getLevelIdByObjUid(e) {
  switch (getEditorObjTypeByUid(e)) {
    case "LevelPlay":
      var t = e.split("_");
      return parseInt(t[1]);
    case "Quest":
    case "Flow":
      return;
    case "Entity":
      return (0, Entity_1.getLevelIdByEntityUid)(e);
    default:
  }
}
function getFlowListIdByUid(e) {
  let t = getEditorObjTypeByUid(e);
  if (t === "Flow") {
    t = e.split("_");
    return parseInt(t[1]);
  }
}
function getFlowIdByUid(e) {
  let t = getEditorObjTypeByUid(e);
  if (t === "Flow") {
    t = e.split("_");
    return parseInt(t[2]);
  }
}
function fetchUid(e, t) {
  if (!e) return [];
  const r = [];
  return (
    e.forEach((e) => {
      getEditorObjTypeByUid(e) === t && r.push(e);
    }),
    Array.from(r)
  );
}
async function fetchEntityTemplateOwner(e) {
  var t = genEntityTemplateUid(e.BlueprintType);
  var t = await (0, EditorObject_1.getServerEditorObjMeta)(t);
  return t ? t.meta.Owner : (0, SegmentIdGenerator_1.getCreaterNameById)(e.Id);
}
async function setEntityTemplateOwner(e, t) {
  e = genEntityTemplateUid(e.BlueprintType);
  return (
    await (0, EditorObject_1.setServerEditorObjMeta)(e, { Owner: t }, t), t
  );
}
(exports.genEntityTemplateUid = genEntityTemplateUid),
  (exports.genLevelPlayUid = genLevelPlayUid),
  (exports.genQuestUid = genQuestUid),
  (exports.genPrefabUid = genPrefabUid),
  (exports.genEntityUid = genEntityUid),
  (exports.genFlowUid = genFlowUid),
  (exports.getEditorObjUid = getEditorObjUid),
  (exports.getEditorObjTypeByUid = getEditorObjTypeByUid),
  (exports.getIdByUid = getIdByUid),
  (exports.getLevelIdByObjUid = getLevelIdByObjUid),
  (exports.getFlowListIdByUid = getFlowListIdByUid),
  (exports.getFlowIdByUid = getFlowIdByUid),
  (exports.fetchUid = fetchUid),
  (exports.fetchEntityTemplateOwner = fetchEntityTemplateOwner),
  (exports.setEntityTemplateOwner = setEntityTemplateOwner);
// # sourceMappingURL=EditorObject.js.map
