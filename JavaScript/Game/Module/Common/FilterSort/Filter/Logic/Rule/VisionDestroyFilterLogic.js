"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDestroyFilterLogic = void 0);
const ConfigManager_1 = require("../../../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const SUBATTRIBUTEID = 23;
class VisionDestroyFilterLogic {
  static ZTt(r, i, o = !1) {
    const a = r.length;
    for (let e = 0; e < a; e++)
      if (r[e].PhantomPropId === i) {
        if (o && r[e].IfPercentage) return r[e].Value;
        if (!o && !r[e].IfPercentage) return r[e].Value;
      }
    return 0;
  }
}
(exports.VisionDestroyFilterLogic = VisionDestroyFilterLogic),
  ((_a = VisionDestroyFilterLogic).GetPhantomRarity = (e) => {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
      e.GetConfigId(),
    ).PhantomItem.Rarity;
  }),
  (VisionDestroyFilterLogic.GetPhantomCost = (e) => {
    return ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomInstanceByItemId(
      e.GetConfigId(),
    ).PhantomItem.Rarity;
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
    let i;
    let o;
    let a;
    var r = Array.from(r.keys());
    const t =
      ModelManager_1.ModelManager.PhantomBattleModel?.GetPhantomDataBase(
        e.GetUniqueId(),
      );
    let n = !1;
    for (const g of r) {
      let e = 0;
      if (
        (e =
          g >= SUBATTRIBUTEID
            ? ((i = t?.GetSubPropArray()),
              (a =
                ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionSubPercentageAttributeSortArray().includes(
                  g,
                )),
              (o =
                ModelManager_1.ModelManager.PhantomBattleModel.GetSubAttributeKey(
                  g,
                )),
              _a.ZTt(i, o, a))
            : ((i = t?.GetMainPropArray()),
              (o =
                ConfigManager_1.ConfigManager.PhantomBattleConfig?.GetVisionMainPercentageAttributeSortArray().includes(
                  g,
                )),
              (a =
                ModelManager_1.ModelManager.PhantomBattleModel.GetMainAttributeKey(
                  g,
                )),
              _a.ZTt(i, a, o))) > 0
      ) {
        n = !0;
        break;
      }
    }
    return n ? r : [0];
  });
// # sourceMappingURL=VisionDestroyFilterLogic.js.map
