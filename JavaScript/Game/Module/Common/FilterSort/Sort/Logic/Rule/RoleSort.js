"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleSort = void 0);
const ModelManager_1 = require("../../../../../../Manager/ModelManager");
const RoleDefine_1 = require("../../../../../RoleUi/RoleDefine");
const CommonSort_1 = require("./CommonSort");
class RoleSort extends CommonSort_1.CommonSort {
  constructor() {
    super(...arguments),
      (this.ZLt = (t, i, e) => {
        (t = t.GetLevelData()), (i = i.GetLevelData());
        return t.GetLevel() !== i.GetLevel()
          ? (i.GetLevel() - t.GetLevel()) * (e ? -1 : 1)
          : t.GetBreachLevel() !== i.GetBreachLevel()
            ? (i.GetBreachLevel() - t.GetBreachLevel()) * (e ? -1 : 1)
            : void 0;
      }),
      (this.VLt = (t, i, e) => {
        (t = t.GetRoleConfig().QualityId), (i = i.GetRoleConfig().QualityId);
        if (t !== i) return (i - t) * (e ? -1 : 1);
      }),
      (this.jDt = (t, i, e) => {
        const r = t;
        const s = i;
        let h = -1;
        let o = -1;
        const n = ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems();
        for (let t = 0; t < n.length; t++) {
          const a = n[t];
          r.GetDataId() === a.GetConfigId && (h = t),
            s.GetDataId() === a.GetConfigId && (o = t);
        }
        (t = void 0 !== n[h]), (i = void 0 !== n[o]);
        if (t || i) return t != i ? (i ? 1 : 0) - (t ? 1 : 0) : h - o;
      }),
      (this.WDt = (t, i, e) => {
        if (t.GetRoleConfig().Priority !== i.GetRoleConfig().Priority)
          return (
            (i.GetRoleConfig().Priority - t.GetRoleConfig().Priority) *
            (e ? -1 : 1)
          );
      }),
      (this.KDt = (t, i, e) => {
        (t = t.GetResonanceData()),
          (i = i.GetResonanceData()),
          (t = t.GetResonantChainGroupIndex()),
          (i = i.GetResonantChainGroupIndex());
        if (t !== i) return (i - t) * (e ? -1 : 1);
      }),
      (this.QDt = (t, i, e) => {
        (t = t.GetResonanceData()),
          (i = i.GetResonanceData()),
          (t = t.GetResonanceIncreaseLevel()),
          (i = i.GetResonanceIncreaseLevel());
        if (t !== i) return (i - t) * (e ? -1 : 1);
      }),
      (this.XDt = (t, i, e) => {}),
      (this.$Dt = (t, i, e) => {
        var t = t.GetFavorData();
        var i = i.GetFavorData();
        let r = t.GetFavorLevel();
        let s = i.GetFavorLevel();
        if (t && i)
          return r !== s
            ? (s - r) * (e ? -1 : 1)
            : (s = t.GetFavorExp()) !== (r = i.GetFavorExp())
              ? (r - s) * (e ? -1 : 1)
              : void 0;
      }),
      (this.YDt = (t, i, e) => {
        (t = t.GetRoleCreateTime()), (i = i.GetRoleCreateTime());
        if (t !== i) return (i - t) * (e ? -1 : 1);
      }),
      (this.JDt = (t, i, e) => {
        (t = t.GetAttributeData()),
          (i = i.GetAttributeData()),
          (t = t.GetAttrValueById(RoleDefine_1.HP_ATTR_ID)),
          (i = i.GetAttrValueById(RoleDefine_1.HP_ATTR_ID));
        if (t !== i) return (i - t) * (e ? -1 : 1);
      }),
      (this.zDt = (t, i, e) => {
        (t = t.GetAttributeData()),
          (i = i.GetAttributeData()),
          (t = t.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID)),
          (i = i.GetAttrValueById(RoleDefine_1.ATTACK_ATTR_ID));
        if (t !== i) return (i - t) * (e ? -1 : 1);
      }),
      (this.ZDt = (t, i, e) => {
        (t = t.GetAttributeData()),
          (i = i.GetAttributeData()),
          (t = t.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID)),
          (i = i.GetAttrValueById(RoleDefine_1.DEF_ATTR_ID));
        if (t !== i) return (i - t) * (e ? -1 : 1);
      }),
      (this.eRt = (t, i, e) => {
        var r = ModelManager_1.ModelManager.RoleSelectModel;
        var t = t.GetDataId();
        var i = i.GetDataId();
        var t = r.GetRoleIndex(t);
        var r = r.GetRoleIndex(i);
        return t <= 0 || r <= 0
          ? (r ? 1 : 0) - (t ? 1 : 0)
          : t !== r
            ? t - r
            : void 0;
      }),
      (this.tRt = (t, i, e) => {
        (t = t.IsTrialRole()), (i = i.IsTrialRole());
        if (t !== i) return ((i ? 1 : 0) - (t ? 1 : 0)) * (e ? -1 : 1);
      }),
      (this.iRt = (t, i, e) => {
        const r =
          ModelManager_1.ModelManager.TowerModel.CurrentSelectDifficulties;
        return (
          (ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
            t.GetRoleId(),
            r,
          ) -
            ModelManager_1.ModelManager.TowerModel.GetRoleRemainCost(
              i.GetRoleId(),
              r,
            )) *
          (e ? -1 : 1)
        );
      });
  }
  OnInitSortMap() {
    this.SortMap.set(1, this.ZLt),
      this.SortMap.set(2, this.VLt),
      this.SortMap.set(3, this.jDt),
      this.SortMap.set(4, this.WDt),
      this.SortMap.set(5, this.KDt),
      this.SortMap.set(6, this.QDt),
      this.SortMap.set(7, this.XDt),
      this.SortMap.set(8, this.$Dt),
      this.SortMap.set(9, this.YDt),
      this.SortMap.set(10, this.JDt),
      this.SortMap.set(11, this.zDt),
      this.SortMap.set(12, this.ZDt),
      this.SortMap.set(13, this.eRt),
      this.SortMap.set(14, this.eRt),
      this.SortMap.set(15, this.tRt),
      this.SortMap.set(16, this.iRt);
  }
}
exports.RoleSort = RoleSort;
// # sourceMappingURL=RoleSort.js.map
