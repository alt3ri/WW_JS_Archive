"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.getNpcPerformStatesByType =
    exports.getNpcPerformStateTypes =
    exports.npcPerformStateConfig =
      void 0),
  (exports.npcPerformStateConfig = {
    幽灵态: ["常态", "幽灵"],
    禁锢态: ["常态", "禁锢"],
  });
const npcPerformStatesMap = new Map();
function getNpcPerformStateMap() {
  if (npcPerformStatesMap.size <= 0) {
    npcPerformStatesMap.clear();
    for (const t of Object.entries(exports.npcPerformStateConfig)) {
      var e = new Set();
      npcPerformStatesMap.set(t[0], e);
      for (const r of t[1]) e.add(r);
    }
  }
  return npcPerformStatesMap;
}
function getNpcPerformStateTypes() {
  return Array.from(getNpcPerformStateMap().keys());
}
function getNpcPerformStatesByType(e) {
  e = getNpcPerformStateMap().get(e);
  return e ? Array.from(e.keys()) : [];
}
(exports.getNpcPerformStateTypes = getNpcPerformStateTypes),
  (exports.getNpcPerformStatesByType = getNpcPerformStatesByType);
//# sourceMappingURL=ICommon.js.map
