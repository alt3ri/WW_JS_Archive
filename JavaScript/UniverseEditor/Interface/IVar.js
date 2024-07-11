"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getVarTypeByIndex =
    exports.getVarConfigIndex =
    exports.getVarDefaultValue =
    exports.varConfig =
      void 0),
  (exports.varConfig = {
    Boolean: !1,
    Int: 0,
    String: "",
    Float: 0,
    Entity: 1,
    Quest: 1,
    QuestState: 0,
    Pos: {},
    Prefab: 1,
  });
const varIndexConfig = {
  Boolean: 0,
  Int: 1,
  String: 2,
  Float: 3,
  Entity: 4,
  Quest: 5,
  QuestState: 6,
  Pos: 7,
  Prefab: 8,
};
function getVarDefaultValue(e) {
  return exports.varConfig[e];
}
function getVarConfigIndex(e) {
  return varIndexConfig[e];
}
(exports.getVarDefaultValue = getVarDefaultValue),
  (exports.getVarConfigIndex = getVarConfigIndex);
let varTypeByIndex = void 0;
function getVarTypeByIndex(e) {
  if (!varTypeByIndex) {
    varTypeByIndex = {};
    for (const t in varIndexConfig) varTypeByIndex[varIndexConfig[t]] = t;
  }
  return varTypeByIndex[e];
}
exports.getVarTypeByIndex = getVarTypeByIndex;
//# sourceMappingURL=IVar.js.map
