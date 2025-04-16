"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DangoAbyssConfig = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  AbyssActivityByActivityId_1 = require("../../../../Core/Define/ConfigQuery/AbyssActivityByActivityId"),
  AbyssCastDescById_1 = require("../../../../Core/Define/ConfigQuery/AbyssCastDescById"),
  AbyssInstByActivityId_1 = require("../../../../Core/Define/ConfigQuery/AbyssInstByActivityId"),
  AbyssInstById_1 = require("../../../../Core/Define/ConfigQuery/AbyssInstById"),
  AbyssItemById_1 = require("../../../../Core/Define/ConfigQuery/AbyssItemById"),
  AbyssLittleRoleAll_1 = require("../../../../Core/Define/ConfigQuery/AbyssLittleRoleAll"),
  AbyssLittleRoleById_1 = require("../../../../Core/Define/ConfigQuery/AbyssLittleRoleById"),
  AbyssPluginPropDescById_1 = require("../../../../Core/Define/ConfigQuery/AbyssPluginPropDescById"),
  AbyssQualityById_1 = require("../../../../Core/Define/ConfigQuery/AbyssQualityById"),
  AbyssRewardAll_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardAll"),
  AbyssRewardById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardById"),
  AbyssRewardTabById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardTabById"),
  AbyssRewardTypeById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRewardTypeById"),
  AbyssRoleLevelByGroupId_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoleLevelByGroupId"),
  AbyssRoleLevelByLevelAndGroupId_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoleLevelByLevelAndGroupId"),
  AbyssRoleSlotById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoleSlotById"),
  AbyssRoomById_1 = require("../../../../Core/Define/ConfigQuery/AbyssRoomById"),
  AbyssRouteByRouterAndFloor_1 = require("../../../../Core/Define/ConfigQuery/AbyssRouteByRouterAndFloor"),
  AbyssSettleById_1 = require("../../../../Core/Define/ConfigQuery/AbyssSettleById"),
  AbyssSynthesisAll_1 = require("../../../../Core/Define/ConfigQuery/AbyssSynthesisAll"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigBase_1 = require("../../../../Core/Framework/ConfigBase"),
  StringUtils_1 = require("../../../../Core/Utils/StringUtils");
class DangoAbyssConfig extends ConfigBase_1.ConfigBase {
  GetDangoAbyssInstById(e) {
    return AbyssInstById_1.configAbyssInstById.GetConfig(e);
  }
  GetDangoAbyssInstListByActivityId(e) {
    return AbyssInstByActivityId_1.configAbyssInstByActivityId.GetConfigList(e);
  }
  GetAbyssRewardById(e) {
    return AbyssRewardById_1.configAbyssRewardById.GetConfig(e);
  }
  GetAllAbyssReward() {
    return AbyssRewardAll_1.configAbyssRewardAll.GetConfigList();
  }
  GetAbyssRewardTypeById(e) {
    return AbyssRewardTypeById_1.configAbyssRewardTypeById.GetConfig(e);
  }
  GetDangoAbyssRoomById(e) {
    return AbyssRoomById_1.configAbyssRoomById.GetConfig(e);
  }
  GetDangoRoleById(e) {
    return AbyssLittleRoleById_1.configAbyssLittleRoleById.GetConfig(e);
  }
  GetAllDangoRole() {
    return AbyssLittleRoleAll_1.configAbyssLittleRoleAll.GetConfigList();
  }
  GetDangoLevelConfigByLevelAndGroupId(e, r) {
    return AbyssRoleLevelByLevelAndGroupId_1.configAbyssRoleLevelByLevelAndGroupId.GetConfig(
      e,
      r,
    );
  }
  GetDangoLevelConfigByGroupId(e) {
    return AbyssRoleLevelByGroupId_1.configAbyssRoleLevelByGroupId.GetConfigList(
      e,
    );
  }
  GetDangoItemById(e) {
    if (!(e <= 0)) return AbyssItemById_1.configAbyssItemById.GetConfig(e);
  }
  GetSlotTypeByIndex(e) {
    return (
      AbyssRoleSlotById_1.configAbyssRoleSlotById.GetConfig(e)?.SlotType ?? 0
    );
  }
  GetDangoCastDescById(e) {
    return AbyssCastDescById_1.configAbyssCastDescById.GetConfig(e);
  }
  GetDangoPluginPropDescById(e) {
    return AbyssPluginPropDescById_1.configAbyssPluginPropDescById.GetConfig(e);
  }
  GetAbyssQualityById(e) {
    return AbyssQualityById_1.configAbyssQualityById.GetConfig(e);
  }
  GetAbyssQualityByPluginItemId(e) {
    var e = this.GetDangoItemById(e);
    if (e)
      return (
        (e = e.QualityId),
        AbyssQualityById_1.configAbyssQualityById.GetConfig(e)
      );
  }
  GetWorldInstanceId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "DangoWorldInstanceId",
    );
  }
  GetWorldInstanceEntranceId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "DangoWorldInstanceEntranceId",
    );
  }
  GetWorldTeleportId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "DangoSmallWorldTeleportId",
    );
  }
  GetSmallWorldInsIdList() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "DangoSmallWorldInsId",
    );
  }
  GetAbyssKeyItemId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("AbyssKeyId");
  }
  GetAbyssLimitRewardTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "DangoAbyssLimitRewardTexture",
    );
  }
  GetAbyssLimitRewardRewardId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "DangoAbyssLimitRewardId",
    );
  }
  GetAbyssActivityData(e) {
    return AbyssActivityByActivityId_1.configAbyssActivityByActivityId.GetConfig(
      e,
    );
  }
  GetAbyssRouteByRouteIdAndFloorId(e, r) {
    return AbyssRouteByRouterAndFloor_1.configAbyssRouteByRouterAndFloor.GetConfigList(
      e,
      r,
    )?.[0];
  }
  GetAbyssRewardTabById(e) {
    return AbyssRewardTabById_1.configAbyssRewardTabById.GetConfig(e);
  }
  GetAbyssMarkByActivityId(e) {
    return AbyssActivityByActivityId_1.configAbyssActivityByActivityId.GetConfig(
      e,
    ).MarkId;
  }
  GetAbyssSettleById(e) {
    return AbyssSettleById_1.configAbyssSettleById.GetConfig(e);
  }
  GetAbyssSynthesisByQualityId(e) {
    for (const r of AbyssSynthesisAll_1.configAbyssSynthesisAll.GetConfigList())
      if (r.Quality === e) return r;
  }
  GetRecoveryRewardByQualityId(e) {
    e = this.GetAbyssSynthesisByQualityId(e);
    return e ? e.DecomposeInfo : new Map();
  }
  GetDangoShopAngryTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "DangoShopAngryTime",
    );
  }
  GetDangoShopBuyTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "DangoShopBuyTime",
    );
  }
  GetDangoShopClickTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "DangoShopClickTime",
    );
  }
  GetBadDangoMeshId() {
    return CommonParamById_1.configCommonParamById.GetIntConfig("BadDangoMesh");
  }
  GetBadDangoStandAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "BadDangoStandAnimation",
    );
  }
  GetBadDangoBuyAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "BadDangoBuyAnimation",
    );
  }
  GetBadDangoBadDangoPinkAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "BadDangoPinkAnimation",
    );
  }
  GetBadDangoBadDangoPinkOverAni() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "BadDangoPinkOverAnimation",
    );
  }
  GetBadDangoTransform() {
    return new UE.Transform(this.tu1(), this.iu1(), this.ru1());
  }
  tu1() {
    var e =
        CommonParamById_1.configCommonParamById.GetFloatArrayConfig(
          "BadDangoRotator",
        ),
      r = new UE.Rotator();
    return (
      3 === e.length && ((r.Roll = e[0]), (r.Pitch = e[1]), (r.Yaw = e[2])), r
    );
  }
  ru1() {
    var e =
        CommonParamById_1.configCommonParamById.GetFloatArrayConfig(
          "BadDangoZoom",
        ),
      r = new UE.Vector();
    return 3 === e.length && ((r.X = e[0]), (r.Y = e[1]), (r.Z = e[2])), r;
  }
  iu1() {
    var e =
        CommonParamById_1.configCommonParamById.GetFloatArrayConfig(
          "BadDangoLocation",
        ),
      r = new UE.Vector();
    return 3 === e.length && ((r.X = e[0]), (r.Y = e[1]), (r.Z = e[2])), r;
  }
  GetItemBgDesc(e) {
    var e = this.GetDangoItemById(e),
      r = e.BgDescription;
    return "" === r
      ? ""
      : ((e =
          0 < e.LevelDescStrArray.length
            ? e.LevelDescStrArray[0].ArrayString
            : []),
        StringUtils_1.StringUtils.Format(
          MultiTextLang_1.configMultiTextLang.GetLocalTextNew(r),
          ...e,
        ));
  }
}
exports.DangoAbyssConfig = DangoAbyssConfig;
//# sourceMappingURL=DangoAbyssConfig.js.map
