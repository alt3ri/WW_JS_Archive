"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhantomBattleConfig = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const ItemInfoById_1 = require("../../../../Core/Define/ConfigQuery/ItemInfoById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const PhantomExpItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomExpItemAll");
const PhantomExpItemByItemId_1 = require("../../../../Core/Define/ConfigQuery/PhantomExpItemByItemId");
const PhantomFetterAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterAll");
const PhantomFetterById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterById");
const PhantomFetterGroupAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupAll");
const PhantomFetterGroupById_1 = require("../../../../Core/Define/ConfigQuery/PhantomFetterGroupById");
const PhantomGrowthByGrowthIdAndLevel_1 = require("../../../../Core/Define/ConfigQuery/PhantomGrowthByGrowthIdAndLevel");
const PhantomItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemAll");
const PhantomItemByItemId_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemByItemId");
const PhantomItemByMonsterId_1 = require("../../../../Core/Define/ConfigQuery/PhantomItemByMonsterId");
const PhantomLevelByGroupId_1 = require("../../../../Core/Define/ConfigQuery/PhantomLevelByGroupId");
const PhantomLevelByGroupIdAndLevel_1 = require("../../../../Core/Define/ConfigQuery/PhantomLevelByGroupIdAndLevel");
const PhantomMainPropertyById_1 = require("../../../../Core/Define/ConfigQuery/PhantomMainPropertyById");
const PhantomMainPropItemById_1 = require("../../../../Core/Define/ConfigQuery/PhantomMainPropItemById");
const PhantomQualityByQuality_1 = require("../../../../Core/Define/ConfigQuery/PhantomQualityByQuality");
const PhantomRarityByRare_1 = require("../../../../Core/Define/ConfigQuery/PhantomRarityByRare");
const PhantomSkillById_1 = require("../../../../Core/Define/ConfigQuery/PhantomSkillById");
const PhantomSkillByPhantomSkillId_1 = require("../../../../Core/Define/ConfigQuery/PhantomSkillByPhantomSkillId");
const PhantomSubPropertyById_1 = require("../../../../Core/Define/ConfigQuery/PhantomSubPropertyById");
const PhantomSubPropertyByPropId_1 = require("../../../../Core/Define/ConfigQuery/PhantomSubPropertyByPropId");
const PhantomWildItemAll_1 = require("../../../../Core/Define/ConfigQuery/PhantomWildItemAll");
const TrailPhantomPropById_1 = require("../../../../Core/Define/ConfigQuery/TrailPhantomPropById");
const TrialPhantomPropItemById_1 = require("../../../../Core/Define/ConfigQuery/TrialPhantomPropItemById");
const ConfigBase_1 = require("../../../../Core/Framework/ConfigBase");
const ModelManager_1 = require("../../../Manager/ModelManager");
const COST3 = 3;
const COST1 = 1;
class PhantomBattleConfig extends ConfigBase_1.ConfigBase {
  constructor() {
    super(...arguments), (this.W5i = new Map());
  }
  GetPhantomItemList() {
    const e = PhantomItemAll_1.configPhantomItemAll.GetConfigList();
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象道具配置列表失败, 请检查配置表",
          )),
      e
    );
  }
  GetPhantomItemById(e) {
    const t = PhantomItemByItemId_1.configPhantomItemByItemId.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Phantom", 28, "获取幻象道具配置失败, 请检查配置表", [
            "id",
            e,
          ])),
      t
    );
  }
  GetPhantomItemByMonsterId(e) {
    return PhantomItemByMonsterId_1.configPhantomItemByMonsterId.GetConfigList(
      e,
    );
  }
  GetPhantomSkillList(e) {
    const t =
      PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(
        e,
      );
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象技能配置列表失败, 请检查配置表",
            ["SkillId", e],
          )),
      t
    );
  }
  GetPhantomSkillDescExByPhantomSkillIdAndQuality(e, t = 2) {
    var e =
      PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(
        e,
      )[0];
    const r = e.LevelDescStrArray.length;
    return (r < t ? e.LevelDescStrArray[r - 1] : e.LevelDescStrArray[t - 1])
      .ArrayString;
  }
  GetPhantomSkillDescExBySkillIdAndQuality(e, t = 2) {
    var e = PhantomSkillById_1.configPhantomSkillById.GetConfig(e);
    const r = e.LevelDescStrArray.length;
    return (r < t ? e.LevelDescStrArray[r - 1] : e.LevelDescStrArray[t - 1])
      .ArrayString;
  }
  GetPhantomSkillBySkillId(e) {
    const t =
      PhantomSkillByPhantomSkillId_1.configPhantomSkillByPhantomSkillId.GetConfigList(
        e,
      );
    return (
      t?.length === 0 &&
        Log_1.Log.CheckInfo() &&
        Log_1.Log.Info(
          "Phantom",
          28,
          "获取幻象技能配置失败, 请检查配置表, 也可能是探索技能",
          ["SkillId", e],
        ),
      t[0]
    );
  }
  GetPhantomRareConfig(e) {
    return PhantomRarityByRare_1.configPhantomRarityByRare.GetConfig(e);
  }
  GetPhantomQualityByItemQuality(e) {
    const t =
      PhantomQualityByQuality_1.configPhantomQualityByQuality.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Phantom", 28, "获取幻象品质配置失败, 请检查配置表", [
            "id",
            e,
          ])),
      t
    );
  }
  GetPhantomMainPropertyById(e) {
    const t =
      PhantomMainPropertyById_1.configPhantomMainPropertyById.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象主属性配置失败, 请检查配置表",
            ["id", e],
          )),
      t
    );
  }
  GetPhantomMainPropertyItemId(e) {
    const t =
      PhantomMainPropItemById_1.configPhantomMainPropItemById.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象主属性配置失败, 请检查配置表",
            ["id", e],
          )),
      t
    );
  }
  GetPhantomSubPropertyById(e) {
    const t =
      PhantomSubPropertyById_1.configPhantomSubPropertyById.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Phantom", 28, "获取幻象属性配置失败, 请检查配置表", [
            "id",
            e,
          ])),
      t
    );
  }
  GetPhantomFetterList() {
    const e = PhantomFetterAll_1.configPhantomFetterAll.GetConfigList();
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象羁绊配置列表失败, 请检查配置表",
          )),
      e
    );
  }
  GetPhantomFetterGroupList() {
    const e =
      PhantomFetterGroupAll_1.configPhantomFetterGroupAll.GetConfigList();
    return (
      e ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象羁绊配置列表失败, 请检查配置表",
          )),
      e
    );
  }
  GetPhantomFetterById(e) {
    const t = PhantomFetterById_1.configPhantomFetterById.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Phantom", 28, "获取幻象羁绊配置失败, 请检查配置表", [
            "Id",
            e,
          ])),
      t
    );
  }
  GetPhantomLevelExpByGroupIdAndLevel(e, t) {
    const r =
      PhantomLevelByGroupIdAndLevel_1.configPhantomLevelByGroupIdAndLevel.GetConfig(
        e,
        t,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象升级消耗配置失败, 请检查配置表",
            ["groupId", e],
            ["level", t],
          )),
      r.Exp
    );
  }
  GetPhantomLevelListByGroupId(e) {
    const t =
      PhantomLevelByGroupId_1.configPhantomLevelByGroupId.GetConfigList(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象升级消耗配置列表失败, 请检查配置表",
            ["groupId", e],
          )),
      t
    );
  }
  GetItemInfoById(e) {
    const t = ItemInfoById_1.configItemInfoById.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error("Phantom", 28, "获取道具配置失败, 请检查配置表", [
            "itemId",
            e,
          ])),
      t
    );
  }
  GetPhantomExpItemById(e) {
    const t =
      PhantomExpItemByItemId_1.configPhantomExpItemByItemId.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象经验道具配置失败, 请检查配置表",
            ["itemId", e],
          )),
      t
    );
  }
  GetPhantomExpItemList() {
    return PhantomExpItemAll_1.configPhantomExpItemAll.GetConfigList();
  }
  GetPhantomWildItem() {
    return PhantomWildItemAll_1.configPhantomWildItemAll.GetConfigList();
  }
  GetPhantomGrowthValueByGrowthIdAndLevel(e, t) {
    const r =
      PhantomGrowthByGrowthIdAndLevel_1.configPhantomGrowthByGrowthIdAndLevel.GetConfig(
        e,
        t,
      );
    return (
      r ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取幻象成长曲线值配置失败, 请检查配置表",
            ["growthId", e],
            ["level", t],
          )),
      r.Value
    );
  }
  GetPhantomSubPropertyByPropId(e) {
    return PhantomSubPropertyByPropId_1.configPhantomSubPropertyByPropId.GetConfigList(
      e,
    );
  }
  GetPhantomLevelUpCostRatio() {
    return (
      CommonParamById_1.configCommonParamById.GetIntConfig(
        "PhantomLevelUpCoinCost",
      ) / 1e3
    );
  }
  GetTrailPhantomPropItemById(e) {
    const t =
      TrialPhantomPropItemById_1.configTrialPhantomPropItemById.GetConfig(e);
    return (
      t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Phantom",
            28,
            "获取configTrialPhantomPropItemById, 请检查配置表",
            ["id", e],
          )),
      t.Prop
    );
  }
  GetQualityIdentifyCost(e) {
    return this.GetPhantomQualityByItemQuality(e).IdentifyCoin;
  }
  GetFetterGroupById(e) {
    return PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(e);
  }
  GetFetterGroupFetterDataById(e) {
    return PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(e)
      .FetterMap;
  }
  GetFetterGroupArray() {
    return PhantomFetterGroupAll_1.configPhantomFetterGroupAll.GetConfigList();
  }
  GetFetterGroupSourceMonster(t) {
    const e = this.GetPhantomItemList();
    const r = new Array();
    return (
      e.forEach((e) => {
        !e.ParentMonsterId && e.FetterGroup.includes(t) && r.push(e.MonsterId);
      }),
      r
    );
  }
  GetFetterMapResultBySuitMap(e) {
    const a = new Map();
    return (
      e.forEach((r, e) => {
        const t =
          PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(
            e,
          ).FetterMap;
        let o = 0;
        let n = 0;
        const i = new Map();
        t.forEach((e, t) => {
          t <= r && ((o = e), (n = t)), o > 0 && i.set(o, n);
        }),
          i.size > 0 && a.set(e, i);
      }),
      a
    );
  }
  GetFetterResultBySuitMap(e) {
    const t = new Array();
    return (
      e.forEach((r, e) => {
        e =
          PhantomFetterGroupById_1.configPhantomFetterGroupById.GetConfig(
            e,
          ).FetterMap;
        let o = 0;
        e.forEach((e, t) => {
          t <= r && (o = e);
        }),
          o > 0 && t.push(o);
      }),
      t
    );
  }
  GetPhantomQualityBgSprite(e) {
    return void 0 === e || e === 0
      ? CommonParamById_1.configCommonParamById.GetStringConfig(
          "VisionQualityDefaultSprite",
        )
      : this.GetPhantomQualityByItemQuality(e).QualitySprite;
  }
  GetPhantomSlotUnlockLevel(e) {
    return this.GetPhantomQualityByItemQuality(e).SlotUnlockLevel;
  }
  GetPhantomIdentifyCost(e) {
    return this.GetPhantomQualityByItemQuality(e).IdentifyCost;
  }
  GetMonsterIdName(e) {
    e = this.GetPhantomItemByMonsterId(e);
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
      e[0].MonsterName,
    );
  }
  GetFetterNameByFetterNameId(e) {
    return MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e);
  }
  GetTrialPhantomPropConfig(e) {
    return TrailPhantomPropById_1.configTrailPhantomPropById.GetConfig(e);
  }
  GetVisionLevelUpQualityLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionHighQuality",
    );
  }
  GetVisionLevelUpRareLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionHighRare",
    );
  }
  GetVisionLevelUpLevelLimit() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionHighLevel",
    );
  }
  GetVisionScrollerMoveDistance() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionScrollerMoveDistance",
    );
  }
  GetVisionScrollerPressTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionScrollerLongPressTime",
    );
  }
  GetVisionBeforeScrollerLongPressTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionBeforeScrollerLongPressTime",
    );
  }
  GetVisionScrollerOffsetX() {
    return ModelManager_1.ModelManager.PlatformModel.IsMobile()
      ? CommonParamById_1.configCommonParamById.GetFloatConfig(
          "VisionScrollerOffsetX",
        )
      : 0;
  }
  GetVisionScrollerOffsetY() {
    return ModelManager_1.ModelManager.PlatformModel.IsMobile()
      ? CommonParamById_1.configCommonParamById.GetFloatConfig(
          "VisionScrollerOffsetY",
        )
      : 0;
  }
  GetVisionScrollerOffsetXDir() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionScrollerOffsetXDir",
    );
  }
  GetVisionScrollerOffsetYDir() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionScrollerOffsetYDir",
    );
  }
  GetVisionDragCurve() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionDragCurve",
    );
  }
  GetVisionDragCurveTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionDragAnimationTime",
    );
  }
  GetFilterOwnTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFilterSpriteOwn",
    );
  }
  GetFilterNotOwnTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFilterSpriteNotOwn",
    );
  }
  GetFilterEquipTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFilterSpriteEquipped",
    );
  }
  GetFilterNoEquipTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFilterSpriteNotEquipped",
    );
  }
  GetVisionLevelUpTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionLevelUpUnlockTexture",
    );
  }
  GetVisionHeadSprBgB() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionHeadSprBgB",
    );
  }
  GetVisionHeadSprBgA() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionHeadSprBgA",
    );
  }
  GetVisionHeadLightBgA() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionHeadLightBgA",
    );
  }
  GetVisionHeadLightBgB() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionHeadLightBgB",
    );
  }
  GetVisionReachableCostMax() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "PhantomTotalCost",
    );
  }
  GetVisionFetterDefaultColor() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFetterDefaultColor",
    );
  }
  GetVisionFetterDefaultTexture() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFetterDefaultTexture",
    );
  }
  GetVisionLevelUpDelay() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionLevelUpDelay",
    );
  }
  GetVisionIdentifyDelay() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionIdentifyDelay",
    );
  }
  GetVisionCostColorBase() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionCostColorBase",
    );
  }
  GetVisionCostColorFull() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionCostColorFull",
    );
  }
  GetVisionCostColorAlert() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionCostColorAlert",
    );
  }
  GetVisionIdentifyAnimationTime() {
    return CommonParamById_1.configCommonParamById.GetIntConfig(
      "VisionIdentifyAnimationTime",
    );
  }
  GetVisionMainAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionMainAttributeSortArray",
    );
  }
  GetVisionMainPercentageAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionMainPercentageAttributeSortArray",
    );
  }
  GetVisionSubAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionSubAttributeSortArray",
    );
  }
  GetVisionSubPercentageAttributeSortArray() {
    return CommonParamById_1.configCommonParamById.GetIntArrayConfig(
      "VisionSubPercentageAttributeSortArray",
    );
  }
  GetVisionDestroyCostSpriteByCost(e) {
    return e === COST1
      ? this.GetVisionDestroyCost1()
      : e === COST3
        ? this.GetVisionDestroyCost3()
        : this.GetVisionDestroyCost4();
  }
  GetVisionDestroyCost1() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFilterSpriteCost1",
    );
  }
  GetVisionDestroyCost3() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFilterSpriteCost3",
    );
  }
  GetVisionDestroyCost4() {
    return CommonParamById_1.configCommonParamById.GetStringConfig(
      "VisionFilterSpriteCost4",
    );
  }
  OnClear() {
    return this.W5i.clear(), !0;
  }
}
exports.PhantomBattleConfig = PhantomBattleConfig;
// # sourceMappingURL=PhantomBattleConfig.js.map
