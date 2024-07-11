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
      switch (t._vs) {
        case Protocol_1.Aki.Protocol.vOs.cvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.cvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.dvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.dvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.mvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.mvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Cvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.Cvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Proto_EntityStateChangeAction:
          e = LevelGeneralContextUtil.UUe(t._vs, t.gvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.fvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.fvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.vvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.vvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Proto_EntityLeaveTrigger:
          e = LevelGeneralContextUtil.UUe(t._vs, t.pvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Mvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.Mvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Svs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.Svs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.wvs:
          e = LevelGeneralContextUtil.UUe(t._vs, t.wvs.Kvs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Evs:
          e = LevelGeneralContextDefine_1.LevelPlayContext.Create(
            t.Evs.rps,
            t._vs,
          );
          break;
        case Protocol_1.Aki.Protocol.vOs.yvs:
          e = LevelGeneralContextDefine_1.LevelPlayContext.Create(
            t.yvs.rps,
            t._vs,
          );
          break;
        case Protocol_1.Aki.Protocol.vOs.Ivs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.Ivs.I5n, t._vs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Tvs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.Tvs.I5n, t._vs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Lvs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.Lvs.I5n, t._vs);
          break;
        case Protocol_1.Aki.Protocol.vOs.Rvs:
          e = LevelGeneralContextUtil.AUe(t._vs, t.Rvs.ops);
          break;
        case Protocol_1.Aki.Protocol.vOs.Dvs:
          e = LevelGeneralContextUtil.AUe(t._vs, t.Dvs.ops);
          break;
        case Protocol_1.Aki.Protocol.vOs.Uvs:
          e = LevelGeneralContextUtil.AUe(t._vs, t.Uvs.ops);
          break;
        case Protocol_1.Aki.Protocol.vOs.xvs:
          e = LevelGeneralContextUtil.AUe(t._vs, t.xvs.ops);
          break;
        case Protocol_1.Aki.Protocol.vOs.bvs:
          e = LevelGeneralContextUtil.AUe(t._vs, t.bvs.ops);
          break;
        case Protocol_1.Aki.Protocol.vOs.Bvs:
          e = LevelGeneralContextUtil.AUe(t._vs, t.Bvs.ops);
      }
      return e;
    }
  }
  static AUe(e, t) {
    var o = MathUtils_1.MathUtils.LongToBigInt(t.T5n);
    return LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
      Protocol_1.Aki.Protocol.tps.Proto_BtTypeQuest,
      o,
      t.ips,
      t.L5n,
      e,
    );
  }
  static UUe(e, t) {
    (t = MathUtils_1.MathUtils.LongToNumber(t.T5n)),
      (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t));
    return LevelGeneralContextDefine_1.EntityContext.Create(t?.Id, e);
  }
}
exports.LevelGeneralContextUtil = LevelGeneralContextUtil;
//# sourceMappingURL=LevelGeneralContextUtil.js.map
