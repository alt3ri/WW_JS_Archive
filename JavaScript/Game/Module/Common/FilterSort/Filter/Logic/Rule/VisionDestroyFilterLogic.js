"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDestroyFilterLogic = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  PhantomBattleConfig_1 = require("../../../../../Phantom/PhantomBattle/PhantomBattleConfig"),
  SUBATTRIBUTEID = 23;
class VisionDestroyFilterLogic {
  static oDt(r, o, t = !1) {
    var i = r.length;
    for (let e = 0; e < i; e++)
      if (r[e].PhantomPropId === o) {
        if (t && r[e].IfPercentage) return r[e].Value;
        if (!t && !r[e].IfPercentage) return r[e].Value;
      }
    return 0;
  }
}
((exports.VisionDestroyFilterLogic =
  VisionDestroyFilterLogic).GetPhantomRarity = (e) => {
  return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
    e.GetConfigId(),
  ).PhantomItem.Rarity;
}),
  (VisionDestroyFilterLogic.GetPhantomCost = (e) => {
    e = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
      e.GetUniqueId(),
    );
    return PhantomBattleConfig_1.COSTLIST.indexOf(e.GetCost());
  }),
  (VisionDestroyFilterLogic.GetPhantomQuality = (e) => {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
      e.GetConfigId(),
    ).PhantomItem.QualityId;
  }),
  (VisionDestroyFilterLogic.GetVisionDestroyFetterGroup = (e) => {
    e = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
      e.GetUniqueId(),
    );
    return e ? e.GetFetterGroupId() : 0;
  }),
  (VisionDestroyFilterLogic.GetVisionDestroyAttribute = (e, r) => {
    var o,
      t,
      i,
      r = Array.from(r.keys()),
      a = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
        e.GetUniqueId(),
      );
    let n = !1;
    for (const g of r) {
      let e = 0;
      if (
        0 <
        (e =
          g >= SUBATTRIBUTEID
            ? ((o = a?.GetSubPropArray()),
              (i =
                ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionSubPercentageAttributeSortArray().includes(
                  g,
                )),
              (t =
                ModelManager_1.ModelManager.PhantomBattleModel.GetSubAttributeKey(
                  g,
                )),
              VisionDestroyFilterLogic.oDt(o, t, i))
            : ((o = a?.GetMainPropArray()),
              (t =
                ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionMainPercentageAttributeSortArray().includes(
                  g,
                )),
              (i =
                ModelManager_1.ModelManager.PhantomBattleModel.GetMainAttributeKey(
                  g,
                )),
              VisionDestroyFilterLogic.oDt(o, i, t)))
      ) {
        n = !0;
        break;
      }
    }
    return n ? r : [0];
  });
//# sourceMappingURL=VisionDestroyFilterLogic.js.map
