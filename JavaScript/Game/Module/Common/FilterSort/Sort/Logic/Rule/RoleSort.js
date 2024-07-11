"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  RoleDefine_1 = require("../../../../../RoleUi/RoleDefine"),
  CommonSort_1 = require("./CommonSort");
class RoleSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.oRt = (e, t, i) => {
        (e = e.GetLevelData()), (t = t.GetLevelData());
        return e.GetLevel() !== t.GetLevel()
          ? (t.GetLevel() - e.GetLevel()) * (i ? -1 : 1)
          : e.GetBreachLevel() !== t.GetBreachLevel()
            ? (t.GetBreachLevel() - e.GetBreachLevel()) * (i ? -1 : 1)
            : void 0;
      }),
      (this.KDt = (e, t, i) => {
        (e = e.GetRoleConfig().QualityId), (t = t.GetRoleConfig().QualityId);
        if (e !== t) return (t - e) * (i ? -1 : 1);
      }),
      (this.XRt = (e, t, i) => {
        var r = e,
          s = t;
        let h = -1,
          o = -1;
        var n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        for (let e = 0; e < n.length; e++) {
          var a = n[e];
          r.GetDataId() === a.GetConfigId && (h = e),
            s.GetDataId() === a.GetConfigId && (o = e);
        }
        (e = void 0 !== n[h]), (t = void 0 !== n[o]);
        if (e || t) return e != t ? (t ? 1 : 0) - (e ? 1 : 0) : h - o;
      }),
      (this.$Rt = (e, t, i) => {
        if (e.GetRoleConfig().Priority !== t.GetRoleConfig().Priority)
          return (
            (t.GetRoleConfig().Priority - e.GetRoleConfig().Priority) *
            (i ? -1 : 1)
          );
      }),
      (this.YRt = (e, t, i) => {
        (e = e.GetResonanceData()),
          (t = t.GetResonanceData()),
          (e = e.GetResonantChainGroupIndex()),
          (t = t.GetResonantChainGroupIndex());
        if (e !== t) return (t - e) * (i ? -1 : 1);
      }),
      (this.JRt = (e, t, i) => {
        (e = e.GetResonanceData()),
          (t = t.GetResonanceData()),
          (e = e.GetResonanceIncreaseLevel()),
          (t = t.GetResonanceIncreaseLevel());
        if (e !== t) return (t - e) * (i ? -1 : 1);
      }),
      (this.zRt = (e, t, i) => {}),
      (this.ZRt = (e, t, i) => {
        var e = e.GetFavorData(),
          t = t.GetFavorData(),
          r = e.GetFavorLevel(),
          s = t.GetFavorLevel();
        if (e && t)
          return r !== s
            ? (s - r) * (i ? -1 : 1)
            : (s = e.GetFavorExp()) !== (r = t.GetFavorExp())
              ? (r - s) * (i ? -1 : 1)
              : void 0;
      }),
      (this.eUt = (e, t, i) => {
        (e = e.GetRoleCreateTime()), (t = t.GetRoleCreateTime());
        if (e !== t) return (t - e) * (i ? -1 : 1);
      }),
      (this.tUt = (e, t, i) => {
        (e = e.GetAttributeData()),
          (t = t.GetAttributeData()),
          (e = e.GetAttrValueById(RoleDefine_1.HP_ATTR_ID)),
          (t = t.GetAttrValueById(RoleDefine_1.HP_ATTR_ID));
        if (e !== t) return (t - e) * (i ? -1 : 1);
      }),
      (this.iUt = (e, t, i) => {
        (e = e.GetAttributeData()),
          (t = t.GetAttributeData()),
          (e = e.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID)),
          (t = t.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID));
        if (e !== t) return (t - e) * (i ? -1 : 1);
      }),
      (this.Bla = (e, t, i) => {
        var r,
          s =
            ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList.includes(
              e.GetRoleId(),
            ) && 0 !== e.GetLevelData().GetLevel();
        return s !==
          (ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewShowRoleList.includes(
            t.GetRoleId(),
          ) && 0 !== t.GetLevelData().GetLevel()) ||
          (s =
            ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList.includes(
              e.GetRoleId(),
            )) !==
            ModelManager_1.ModelManager.RoguelikeModel.SelectRoleViewRecommendRoleList.includes(
              t.GetRoleId(),
            )
          ? s
            ? -1
            : 1
          : (s = e.GetLevelData().GetLevel()) !==
              (r = t.GetLevelData().GetLevel())
            ? r < s
              ? -1
              : 1
            : (r = e.GetRoleConfig().QualityId) !==
                (s = t.GetRoleConfig().QualityId)
              ? s < r
                ? -1
                : 1
              : ((s = e.GetRoleId()),
                (r = t.GetRoleId()) < s ? -1 : s < r ? 1 : 0);
      }),
      (this.oUt = (e, t, i) => {
        (e = e.GetAttributeData()),
          (t = t.GetAttributeData()),
          (e = e.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID)),
          (t = t.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID));
        if (e !== t) return (t - e) * (i ? -1 : 1);
      }),
      (this.rUt = (e, t, i) => {
        var r = ModelManager_1.ModelManager.RoleSelectModel,
          e = e.GetDataId(),
          t = t.GetDataId(),
          e = r.GetRoleIndex(e),
          r = r.GetRoleIndex(t);
        return e <= 0 || r <= 0
          ? (r ? 1 : 0) - (e ? 1 : 0)
          : e !== r
            ? e - r
            : void 0;
      }),
      (this.nUt = (e, t, i) => {
        (e = e.IsTrialRole()), (t = t.IsTrialRole());
        if (e !== t) return ((t ? 1 : 0) - (e ? 1 : 0)) * (i ? -1 : 1);
      }),
      (this.sUt = (e, t, i) => {
        var r =
          ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
        return (
          (ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
            e.GetRoleId(),
            r,
          ) -
            ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
              t.GetRoleId(),
              r,
            )) *
          (i ? -1 : 1)
        );
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.oRt),
      this.SortMap.set(2, this.KDt),
      this.SortMap.set(3, this.XRt),
      this.SortMap.set(4, this.$Rt),
      this.SortMap.set(5, this.YRt),
      this.SortMap.set(6, this.JRt),
      this.SortMap.set(7, this.zRt),
      this.SortMap.set(8, this.ZRt),
      this.SortMap.set(9, this.eUt),
      this.SortMap.set(10, this.tUt),
      this.SortMap.set(11, this.iUt),
      this.SortMap.set(12, this.oUt),
      this.SortMap.set(13, this.rUt),
      this.SortMap.set(14, this.rUt),
      this.SortMap.set(15, this.nUt),
      this.SortMap.set(16, this.sUt),
      this.SortMap.set(17, this.Bla);
  }
}
exports.RoleSort = RoleSort;
//# sourceMappingURL=RoleSort.js.map
