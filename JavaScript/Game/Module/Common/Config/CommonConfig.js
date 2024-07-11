"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonConfig = void 0);
const Info_1 = require("../../../../Core/Common/Info"),
  ConfigCommon_1 = require("../../../../Core/Config/ConfigCommon"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  ElementInfoById_1 = require("../../../../Core/Define/ConfigQuery/ElementInfoById"),
  LongPressConfigById_1 = require("../../../../Core/Define/ConfigQuery/LongPressConfigById"),
  QualityInfoAll_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoAll"),
  QualityInfoById_1 = require("../../../../Core/Define/ConfigQuery/QualityInfoById"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
class CommonConfig extends ConfigBase_1.ConfigBase {
  GetSelectablePropItemTickMaxTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "additem_accumulate_initialtime",
    );
  }
  GetSelectablePropItemTickMinTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "additem_accumulate_mintime",
    );
  }
  GetSelectablePropItemTickIntervalTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "additem_accumulate_deltaspeed",
    );
  }
  GetAutoAttachVelocityTime() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig(
      "AutoAttachVelocityTime",
    );
  }
  GetAutoAttachInertiaTime() {
    return CommonParamById_1.configCommonParamById.GetFloatConfig(
      "AutoAttachInertiaTime",
    );
  }
  GetNetGoodSprite() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetGood");
  }
  GetNetMiddleSprite() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetMiddle");
  }
  GetNetBadSprite() {
    return CommonParamById_1.configCommonParamById.GetStringConfig("NetBad");
  }
  GetNetGoodSpriteMobile() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "NetGoodMobile",
    );
  }
  GetNetMiddleSpriteMobile() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "NetMiddleMobile",
    );
  }
  GetNetBadSpriteMobile() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "NetBadMobile",
    );
  }
  GetItemQualityList() {
    var e = ConfigCommon_1.ConfigCommon.ToList(
      QualityInfoAll_1.configQualityInfoAll.GetConfigList(),
    );
    return e.sort((e, o) => e.Id - o.Id), e;
  }
  GetItemQualityById(e) {
    return QualityInfoById_1.configQualityInfoById.GetConfig(e);
  }
  GetElementConfig(e) {
    return ElementInfoById_1.configElementInfoById.GetConfig(e);
  }
  GetLongPressConfig(e) {
    return LongPressConfigById_1.configLongPressConfigById.GetConfig(e);
  }
  GetDebugGmViewPath(e) {
    return "GmView" === e
      ? Info_1.Info.IsInTouch()
        ? CommonParamById_1.configCommonParamById.GetStringConfig("GmViewPath")
        : CommonParamById_1.configCommonParamById.GetStringConfig(
            "GmPcViewPath",
          )
      : "LoginDebugView" === e
        ? Info_1.Info.IsInTouch()
          ? CommonParamById_1.configCommonParamById.GetStringConfig(
              "GmLoginViewPath",
            )
          : CommonParamById_1.configCommonParamById.GetStringConfig(
              "GmPcLoginViewPath",
            )
        : void 0;
  }
  GetNewMailGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("NewMailGap");
  }
  GetPingUnChangeValue() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "PingUnChangeValue",
    );
  }
  GetBetaBlockRecharge() {
    return CommonParamById_1.configCommonParamById.GetBoolConfig("BlockPay");
  }
  GetPioneerFlag() {
    return CommonParamById_1.configCommonParamById.GetBoolConfig("PioneerFlag");
  }
  GetShareGap() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("ShareGap");
  }
  GetIosReviewShieldMenuArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "BlockOnIosCheckServer",
    );
  }
}
exports.CommonConfig = CommonConfig;
//# sourceMappingURL=CommonConfig.js.map
