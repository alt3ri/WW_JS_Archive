"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementSearchGroupData =
    exports.AchievementSearchData =
    exports.AchievementGroupData =
    exports.AchievementCategoryData =
    exports.AchievementData =
      void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const StringBuilder_1 = require("../../../Core/Utils/StringBuilder");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
class AchievementData {
  constructor(t) {
    (this._be = void 0),
      (this.ube = -1),
      (this.cbe = new Array()),
      (this.mbe = !1),
      (this.dbe = void 0),
      (this.Cbe = void 0),
      (this.xe = t),
      (this.gbe =
        ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementNextLink(
          this.xe,
        ));
  }
  SetLastLink(t) {
    this.ube = t;
  }
  Phrase(t) {
    (this._be = t.Bms),
      (this.mbe = t.qms),
      (this.dbe = t.Gms.xms),
      (this.Cbe = t.Gms.bms);
  }
  GetId() {
    return this.xe;
  }
  RedPoint() {
    return !(!this.GetShowState() || this.GetFinishState() !== 1);
  }
  GetIconPath() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementIcon(
      this.xe,
    );
  }
  IfSingleAchievement() {
    return this.gbe === -1;
  }
  GetShowState() {
    if (
      (this.GetHiddenState() && this.GetFinishState() === 0) ||
      void 0 === this.Cbe
    )
      return !1;
    if (
      this.ube !== -1 &&
      ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
        this.ube,
      ).GetFinishState() !== 2
    )
      return !1;
    return this.GetFinishState() !== 2 || !(this.gbe > 0);
  }
  GetHiddenState() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementHiddenState(
      this.xe,
    );
  }
  GetReplaceDesc(t) {
    let e = this.GetDesc();
    const r = new StringBuilder_1.StringBuilder();
    var i = CommonParamById_1.configCommonParamById.GetStringConfig(
      "TutorialSearchColor",
    );
    var i =
      (r.Append("<color="),
      r.Append(i?.toLowerCase() + ">"),
      r.Append(t),
      r.Append("</color>"),
      "" + t);
    return (e = e.replace(i, r.ToString()));
  }
  GetReplaceTitle(t) {
    let e = this.GetTitle();
    const r = new StringBuilder_1.StringBuilder();
    var i = CommonParamById_1.configCommonParamById.GetStringConfig(
      "TutorialSearchColor",
    );
    var i =
      (r.Append("<color="),
      r.Append(i?.toLowerCase() + ">"),
      r.Append(t),
      r.Append("</color>"),
      "" + t);
    return (e = e.replace(i, r.ToString()));
  }
  GetDesc() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementDesc(
      this.xe,
    );
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementTitle(
      this.xe,
    );
  }
  GetMaxStar() {
    if (this.IfSingleAchievement()) {
      const e =
        ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
          this.xe,
        );
      return e;
    }
    let t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
      this.xe,
    );
    for (; t?.gbe; )
      t = ModelManager_1.ModelManager.AchievementModel.GetAchievementData(
        t?.gbe,
      );
    const e =
      ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
        t.GetId(),
      );
    return e;
  }
  GetFinishedStar() {
    let t, e;
    return this.GetShowState()
      ? ((t =
          ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
            this.xe,
          )),
        this.IfSingleAchievement()
          ? this.GetFinishState() === 2 || this.GetFinishState() === 1
            ? t
            : 0
          : ((e = this.fbe()),
            this.GetFinishState() === 2 || this.GetFinishState() === 1
              ? t + e
              : this.GetFinishState() === 0
                ? e
                : (t - 1 >= 0 ? t - 1 : 0) + e))
      : 0;
  }
  fbe() {
    let t = 0;
    let e = this.ube;
    for (; e !== -1; ) {
      const r =
        ModelManager_1.ModelManager.AchievementModel.GetAchievementData(e);
      (t +=
        ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(e)),
        (e = r.ube);
    }
    return t;
  }
  GetAchievementShowStar() {
    let t;
    return this.GetShowState()
      ? ((t =
          ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
            this.xe,
          )),
        this.IfSingleAchievement() ||
        this.GetFinishState() === 2 ||
        this.GetFinishState() === 1
          ? t
          : t - 1 >= 0
            ? t - 1
            : 0)
      : 0;
  }
  GetAchievementConfigStar() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementLevel(
      this.GetId(),
    );
  }
  GetCurrentProgress() {
    return this.dbe;
  }
  GetMaxProgress() {
    return this.Cbe;
  }
  GetRewards() {
    if (this.cbe.length === 0) {
      this.cbe = new Array();
      const t =
        ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementReward(
          this.xe,
        );
      if (t)
        for (let [e, r] of t) {
          e = [{ IncId: 0, ItemId: e }, r];
          this.cbe.push(e);
        }
    }
    return this.cbe;
  }
  GetAllFinishState() {
    return (this.gbe === 0 || this.gbe === -1) && this.GetFinishState() === 1;
  }
  GetNextLink() {
    return this.gbe;
  }
  GetIfLastAchievement() {
    return !!this.IfSingleAchievement() || this.gbe === 0;
  }
  CanShowStarState() {
    return this.GetFinishState() === 2 || this.GetFinishState() === 1;
  }
  GetFinishState() {
    return this.mbe ? 2 : this._be > 0 ? 1 : 0;
  }
  GetFinishSort() {
    return this.GetFinishState() === 2
      ? 0
      : this.GetFinishState() === 1
        ? 2
        : 1;
  }
  GetFinishTime() {
    return this._be;
  }
  GetGroupId() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroup(
      this.xe,
    );
  }
}
exports.AchievementData = AchievementData;
class AchievementCategoryData {
  constructor(t) {
    this.xe = t;
  }
  GetId() {
    return this.xe;
  }
  GetFunctionType() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryFunctionType(
      this.xe,
    );
  }
  GetOrignalTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryOriginalTitle(
      this.xe,
    );
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTitle(
      this.xe,
    );
  }
  GetTexture() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategoryTexture(
      this.xe,
    );
  }
  GetSprite() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetCategorySprite(
      this.xe,
    );
  }
  GetAchievementCategoryProgress() {
    let t = 0;
    let e = 0;
    for (const i of ModelManager_1.ModelManager.AchievementModel.GetAchievementCategoryGroups(
      this.xe,
    ))
      for (const n of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
        i.GetId(),
        !1,
      )) {
        const r = n.GetFinishState();
        (n.GetHiddenState() && r === 0) ||
          void 0 === n.GetMaxProgress() ||
          (t++, r !== 0 && e++);
      }
    return Math.round((100 * e) / t) + "%";
  }
}
exports.AchievementCategoryData = AchievementCategoryData;
class AchievementGroupData {
  constructor(t) {
    (this.mbe = !1),
      (this._be = 0),
      (this.cbe = new Array()),
      (this.pbe = !1),
      (this.vbe = !1),
      (this.xe = t);
  }
  Phrase(t) {
    (this.mbe = t.qms), (this._be = t.Bms), (this.vbe = !0);
  }
  GetId() {
    return this.xe;
  }
  GetSort() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSort(
      this.xe,
    );
  }
  GetTitle() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupTitle(
      this.xe,
    );
  }
  GetTexture() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupIcon(
      this.xe,
    );
  }
  GetSmallIcon() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupSmallIcon(
      this.xe,
    );
  }
  GetBackgroundIcon() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupBackgroundIcon(
      this.xe,
    );
  }
  GetCategory() {
    return ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupCategory(
      this.xe,
    );
  }
  GetFinishTime() {
    return this._be;
  }
  GetShowState() {
    return !(
      !ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupEnable(
        this.xe,
      ) || !this.vbe
    );
  }
  GetRewards() {
    if (this.cbe.length === 0 && !this.pbe) {
      this.cbe = new Array();
      const t =
        ConfigManager_1.ConfigManager.AchievementConfig.GetAchievementGroupReward(
          this.xe,
        );
      if (t)
        for (let [e, r] of t) {
          e = [{ IncId: 0, ItemId: e }, r];
          this.cbe.push(e);
        }
      this.pbe = !0;
    }
    return this.cbe;
  }
  SmallItemRedPoint() {
    if (this.GetShowState()) {
      if (this.RedPoint()) return !0;
      const e =
        ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
          this.GetId(),
        );
      for (let t = 0; t < e.length; t++) if (e[t].RedPoint()) return !0;
    }
    return !1;
  }
  RedPoint() {
    return (
      !!this.GetShowState() &&
      this.GetRewards().length > 0 &&
      this.GetFinishState() === 1
    );
  }
  GetCurrentProgress() {
    const t = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
      this.xe,
    );
    let e = 0;
    return (
      t.forEach((t) => {
        t.GetFinishState() !== 0 && e++;
      }),
      e
    );
  }
  GetMaxProgress() {
    const t = ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
      this.xe,
    );
    let e = 0;
    return (
      t.forEach((t) => {
        t.GetShowState() && e++;
      }),
      e
    );
  }
  GetFinishState() {
    return this.mbe ? 2 : this._be > 0 ? 1 : 0;
  }
  GetAchievementGroupProgress() {
    let t = 0;
    let e = 0;
    for (const i of ModelManager_1.ModelManager.AchievementModel.GetGroupAchievements(
      this.xe,
      !1,
    )) {
      const r = i.GetFinishState();
      (i.GetHiddenState() && r === 0) ||
        void 0 === i.GetMaxProgress() ||
        (t++, r !== 0 && e++);
    }
    return Math.round((100 * e) / t) + "%";
  }
}
exports.AchievementGroupData = AchievementGroupData;
class AchievementSearchData {
  constructor() {
    (this.AchievementCategoryData = void 0),
      (this.AchievementSearchGroupData = void 0),
      (this.AchievementData = void 0);
  }
}
exports.AchievementSearchData = AchievementSearchData;
class AchievementSearchGroupData {
  constructor() {
    (this.AchievementGroupData = void 0), (this.AchievementDataLength = 0);
  }
}
exports.AchievementSearchGroupData = AchievementSearchGroupData;
// # sourceMappingURL=AchievementData.js.map
