"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelGeneralContextUtil = void 0);
const Protocol_1 = require("../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../Core/Utils/MathUtils"),
  ModelManager_1 = require("../Manager/ModelManager"),
  LevelGeneralContextDefine_1 = require("./LevelGeneralContextDefine");
class LevelGeneralContextUtil {
  static CreateByServerContext(t) {
    if (t) {
      let e = void 0;
      switch (t.fvs) {
        case Protocol_1.Aki.Protocol.TOs.pvs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.pvs);
          break;
        case Protocol_1.Aki.Protocol.TOs.Mvs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Mvs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Svs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Svs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Evs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Evs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Proto_EntityStateChangeAction:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.yvs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Ivs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Ivs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Tvs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Tvs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Proto_EntityLeaveTrigger:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Lvs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Rvs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Rvs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Dvs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.Dvs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.kvs:
          e = LevelGeneralContextUtil.UUe(t.fvs, t.kvs.eps);
          break;
        case Protocol_1.Aki.Protocol.TOs.Avs:
          e = LevelGeneralContextDefine_1.LevelPlayContext.Create(
            t.Avs._ps,
            t.fvs,
          );
          break;
        case Protocol_1.Aki.Protocol.TOs.Pvs:
          e = LevelGeneralContextDefine_1.LevelPlayContext.Create(
            t.Pvs._ps,
            t.fvs,
          );
          break;
        case Protocol_1.Aki.Protocol.TOs.Uvs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.Uvs.B5n, t.fvs);
          break;
        case Protocol_1.Aki.Protocol.TOs.wvs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.wvs.B5n, t.fvs);
          break;
        case Protocol_1.Aki.Protocol.TOs.xvs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.xvs.B5n, t.fvs);
          break;
        case Protocol_1.Aki.Protocol.TOs.bvs:
          e = LevelGeneralContextUtil.AUe(t.fvs, t.bvs.ups);
          break;
        case Protocol_1.Aki.Protocol.TOs.Bvs:
          e = LevelGeneralContextUtil.AUe(t.fvs, t.Bvs.ups);
          break;
        case Protocol_1.Aki.Protocol.TOs.Ovs:
          e = LevelGeneralContextUtil.AUe(t.fvs, t.Ovs.ups);
          break;
        case Protocol_1.Aki.Protocol.TOs.Nvs:
          e = LevelGeneralContextUtil.AUe(t.fvs, t.Nvs.ups);
          break;
        case Protocol_1.Aki.Protocol.TOs.Fvs:
          e = LevelGeneralContextUtil.AUe(t.fvs, t.Fvs.ups);
          break;
        case Protocol_1.Aki.Protocol.TOs.Vvs:
          e = LevelGeneralContextUtil.AUe(t.fvs, t.Vvs.ups);
      }
      return e;
    }
  }
  static AUe(e, t) {
    var o = MathUtils_1.MathUtils.LongToBigInt(t.w5n);
    return LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
      Protocol_1.Aki.Protocol.hps.Proto_BtTypeQuest,
      o,
      t.lps,
      t.b5n,
      e,
    );
  }
  static UUe(e, t) {
    (t = MathUtils_1.MathUtils.LongToNumber(t.w5n)),
      (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t));
    return LevelGeneralContextDefine_1.EntityContext.Create(t?.Id, e);
  }
}
exports.LevelGeneralContextUtil = LevelGeneralContextUtil;
//# sourceMappingURL=LevelGeneralContextUtil.js.map
