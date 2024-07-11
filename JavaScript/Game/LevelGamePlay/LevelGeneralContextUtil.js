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
      switch (t.Xms) {
        case Protocol_1.Aki.Protocol.Pbs.Jms:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.Jms);
          break;
        case Protocol_1.Aki.Protocol.Pbs.zms:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.zms.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.Zms:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.Zms.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.eCs:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.eCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.Proto_EntityStateChangeAction:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.tCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.iCs:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.iCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.rCs:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.rCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.Proto_EntityLeaveTrigger:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.oCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.nCs:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.nCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.sCs:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.sCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.fCs:
          e = LevelGeneralContextUtil.UUe(t.Xms, t.fCs.wCs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.aCs:
          e = LevelGeneralContextDefine_1.LevelPlayContext.Create(
            t.aCs.VCs,
            t.Xms,
          );
          break;
        case Protocol_1.Aki.Protocol.Pbs.hCs:
          e = LevelGeneralContextDefine_1.LevelPlayContext.Create(
            t.hCs.VCs,
            t.Xms,
          );
          break;
        case Protocol_1.Aki.Protocol.Pbs.lCs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.lCs.Xkn, t.Xms);
          break;
        case Protocol_1.Aki.Protocol.Pbs._Cs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t._Cs.Xkn, t.Xms);
          break;
        case Protocol_1.Aki.Protocol.Pbs.uCs:
          e = LevelGeneralContextDefine_1.QuestContext.Create(t.uCs.Xkn, t.Xms);
          break;
        case Protocol_1.Aki.Protocol.Pbs.cCs:
          e = LevelGeneralContextUtil.AUe(t.Xms, t.cCs.$Cs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.dCs:
          e = LevelGeneralContextUtil.AUe(t.Xms, t.dCs.$Cs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.gCs:
          e = LevelGeneralContextUtil.AUe(t.Xms, t.gCs.$Cs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.vCs:
          e = LevelGeneralContextUtil.AUe(t.Xms, t.vCs.$Cs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.pCs:
          e = LevelGeneralContextUtil.AUe(t.Xms, t.pCs.$Cs);
          break;
        case Protocol_1.Aki.Protocol.Pbs.MCs:
          e = LevelGeneralContextUtil.AUe(t.Xms, t.MCs.$Cs);
      }
      return e;
    }
  }
  static AUe(e, t) {
    var o = MathUtils_1.MathUtils.LongToBigInt(t.Ykn);
    return LevelGeneralContextDefine_1.GeneralLogicTreeContext.Create(
      Protocol_1.Aki.Protocol.NCs.Proto_BtTypeQuest,
      o,
      t.FCs,
      t.Jkn,
      e,
    );
  }
  static UUe(e, t) {
    (t = MathUtils_1.MathUtils.LongToNumber(t.Ykn)),
      (t = ModelManager_1.ModelManager.CreatureModel.GetEntity(t));
    return LevelGeneralContextDefine_1.EntityContext.Create(t?.Id, e);
  }
}
exports.LevelGeneralContextUtil = LevelGeneralContextUtil;
//# sourceMappingURL=LevelGeneralContextUtil.js.map
