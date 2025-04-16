"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MailBindModel = void 0);
const CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  LocalStorage_1 = require("../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  FeatureRestrictionTemplate_1 = require("../Common/FeatureRestrictionTemplate");
class MailBindModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments), (this.nil = !1), (this.sil = !1), (this.tEt = -0);
  }
  UpdateByProtoMailBindInfo(e) {
    (this.nil = e.$b_),
      (this.sil = e.Wb_),
      (this.tEt = MathUtils_1.MathUtils.LongToNumber(e.Qb_) / 1e3);
  }
  GetIsBind() {
    return this.nil;
  }
  GetIsReward() {
    return this.sil;
  }
  GetCloseTime() {
    return this.tEt;
  }
  GetState() {
    return this.sil ? 2 : this.nil ? 1 : 0;
  }
  GetRemainTimeText(e) {
    var t,
      i = TimeUtil_1.TimeUtil.GetServerTime(),
      e = Math.max(e - i, 1),
      i = this.GetTimeTypeData(e);
    return 0 === i[0]
      ? ConfigManager_1.ConfigManager.TextConfig.GetTextById("NotEnoughOneHour")
      : ((t = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityRemainingTime",
        )),
        (e =
          TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, i[0], i[1])
            .CountDownText ?? ""),
        StringUtils_1.StringUtils.Format(t, e));
  }
  GetTimeTypeData(e) {
    return e > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : e > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 2]
        : [0, 0];
  }
  CheckMailBindRedDot() {
    var e;
    return (
      !this.GetIsReward() &&
      (!!this.GetIsBind() ||
        !(e = LocalStorage_1.LocalStorage.GetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .MailBindNextShowRedDotTime,
        )) ||
        e <= TimeUtil_1.TimeUtil.GetServerTimeStamp())
    );
  }
  CheckGlobalMailBindOpen() {
    return (
      !!ControllerHolder_1.ControllerHolder.KuroSdkController.GetIfGlobalSdk() &&
      !(
        FeatureRestrictionTemplate_1.FeatureRestrictionTemplate.TemplateForPioneerClient.Check() ||
        (this.GetIsReward() &&
          TimeUtil_1.TimeUtil.GetServerTime() > this.GetCloseTime())
      )
    );
  }
}
exports.MailBindModel = MailBindModel;
//# sourceMappingURL=MailBindModel.js.map
