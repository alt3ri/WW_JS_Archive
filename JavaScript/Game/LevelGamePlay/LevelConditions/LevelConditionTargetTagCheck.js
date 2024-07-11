"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionTargetTagCheck = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const ModelManager_1 = require("../../Manager/ModelManager");
const LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionTargetTagCheck extends LevelGeneralBase_1.LevelConditionBase {
  Check(r, e) {
    if (r.LimitParams) {
      var t = r.LimitParams.get("CreatureGen");
      const a = r.LimitParams.get("Tag");
      const i = r.LimitParams.get("CheckTag");
      if (t && a && i) {
        const n = r.LimitParams.get("MatchAll");
        var r = r.LimitParams.get("Negative");
        var t = UE.KismetStringLibrary.Conv_StringToInt64(t);
        const l = new Array();
        if (
          (ModelManager_1.ModelManager.CreatureModel.GetEntitiesWithOwnerId(
            t,
            l,
          ),
          l.length)
        ) {
          var t = n && n === StringUtils_1.ONE_STRING;
          const o = r && r === StringUtils_1.ONE_STRING;
          let e = !1;
          if (t) {
            for (const g of l) {
              const s = g.Entity.GetComponent(0);
              if (!s.ContainsTag(a)) return e;
              if (((e = s.ContainsTag(i)), o && e)) return !1;
              if (!e) return e;
            }
            return e;
          }
          for (const f of l) {
            const u = f.Entity.GetComponent(0);
            if (u.ContainsTag(a)) {
              if (((e = u.ContainsTag(i)), o && !e)) return !0;
              if (e) return e;
            }
          }
        }
      }
    }
    return !1;
  }
}
exports.LevelConditionTargetTagCheck = LevelConditionTargetTagCheck;
// # sourceMappingURL=LevelConditionTargetTagCheck.js.map
