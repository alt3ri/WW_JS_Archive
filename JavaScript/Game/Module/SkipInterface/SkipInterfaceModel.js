"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SkipInterfaceModel = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  SkipConditionContext_1 = require("./SkipCondition/SkipConditionContext");
class SkipInterfaceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.ResetToBattleViewCount = 0),
      (this.ContainerLimitCount = 3),
      (this.aql = new SkipConditionContext_1.SkipConditionContext()),
      (this.pFl = new Map());
  }
  OnInit() {
    return (
      (this.ResetToBattleViewCount =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "ResetToBattleViewCount",
        )),
      !0
    );
  }
  CheckAccessPathCondition(e) {
    let t = !0;
    var i,
      o =
        ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
          e,
        );
    return (
      o &&
        (o = o.ClientCondition) &&
        1 < o.length &&
        ((i = o[0]), (o = o.splice(1)), (i = this.aql.Check(i, o)), (t = i)),
      (t = t && this.IsAccessPathInOpenTime(e))
    );
  }
  FullUpdateAccessPathTimeServerConfig(e) {
    this.pFl.clear(),
      e.forEach((e) => {
        this.pFl.set(e.s5n, e);
      });
  }
  IsAccessPathInOpenTime(e) {
    var t,
      e = this.pFl.get(e);
    return (
      !e ||
      ((t = MathUtils_1.MathUtils.LongToNumber(e.cps)),
      (e = MathUtils_1.MathUtils.LongToNumber(e.dps)),
      t <= (t = TimeUtil_1.TimeUtil.GetServerTimeStamp()) && t <= e)
    );
  }
}
exports.SkipInterfaceModel = SkipInterfaceModel;
//# sourceMappingURL=SkipInterfaceModel.js.map
