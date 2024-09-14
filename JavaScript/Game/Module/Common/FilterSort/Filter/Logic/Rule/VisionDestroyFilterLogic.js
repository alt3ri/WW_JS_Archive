"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDestroyFilterLogic = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  CalabashDefine_1 = require("../../../../../Calabash/CalabashDefine"),
  PhantomBattleConfig_1 = require("../../../../../Phantom/PhantomBattle/PhantomBattleConfig"),
  SUBATTRIBUTEID = 23;
class VisionDestroyFilterLogic {
  static oDt(r, a, i = !1) {
    var o = r.length;
    for (let e = 0; e < o; e++)
      if (r[e].PhantomPropId === a) {
        if (i && r[e].IfPercentage) return r[e].Value;
        if (!i && !r[e].IfPercentage) return r[e].Value;
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
    var a,
      i,
      o,
      r = Array.from(r.keys()),
      t = ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
        e.GetUniqueId(),
      );
    let n = !1;
    for (const s of r) {
      let e = 0;
      if (
        0 <
        (e =
          s >= SUBATTRIBUTEID
            ? ((a = t?.GetSubPropArray()),
              (o =
                ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionSubPercentageAttributeSortArray().includes(
                  s,
                )),
              (i =
                ModelManager_1.ModelManager.PhantomBattleModel.GetSubAttributeKey(
                  s,
                )),
              VisionDestroyFilterLogic.oDt(a, i, o))
            : ((a = t?.GetMainPropArray()),
              (i =
                ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionMainPercentageAttributeSortArray().includes(
                  s,
                )),
              (o =
                ModelManager_1.ModelManager.PhantomBattleModel.GetMainAttributeKey(
                  s,
                )),
              VisionDestroyFilterLogic.oDt(a, o, i)))
      ) {
        n = !0;
        break;
      }
    }
    return n ? r : [0];
  }),
  (VisionDestroyFilterLogic.GetPhantomDeprecate = (e) => {
    return ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
      e.GetUniqueId(),
    )?.GetIsDeprecated()
      ? CalabashDefine_1.VISION_RECOVERT_FILTER_DEPERCATE
      : CalabashDefine_1.VISION_RECOVERT_FILTER_UNDEPERCATE;
  });
//# sourceMappingURL=VisionDestroyFilterLogic.js.map
