"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TrainingDegreeModel = exports.TrainingData = void 0);
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById"),
  QualityInfoAll_1 = require("../../../Core/Define/ConfigQuery/QualityInfoAll"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  MAX_ROLE_SIZE = 3,
  MIN_PROCESS = 0.2;
class TrainingData {
  constructor() {
    (this.NameId = ""),
      (this.FillAmount = -0),
      (this.TipsId = ""),
      (this.Icon = ""),
      (this.BgColor = ""),
      (this.TrainingType = 0);
  }
}
exports.TrainingData = TrainingData;
class TrainingDegreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.yRo = -0),
      (this.IRo = void 0),
      (this.TRo = new Map());
  }
  OnInit() {
    (this.yRo = CommonParamById_1.configCommonParamById.GetFloatConfig(
      "RoleTrainingDegreeNormal",
    )),
      (this.IRo = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "TrainingDegreeSkillTypes",
      ));
    for (const e of QualityInfoAll_1.configQualityInfoAll.GetConfigList())
      this.TRo.set(e.Id, e.TrainingWeight);
    return !0;
  }
  OnClear() {
    return (this.IRo = void 0), this.TRo.clear(), !0;
  }
  GetTrainingDataList() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var r = this.LRo(),
        r =
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleTrainingDegreeConfig(
            r,
          );
      if (r) {
        let e = !0;
        var a = new Array();
        for (const D of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          var n = D.GetConfigId,
            n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
          n && (a.push(n), n.IsTrialRole() || (e = !1));
        }
        if (!e) {
          var o = [],
            i = [],
            t = [],
            l = [],
            s = this.IRo.length;
          for (const R of a) {
            var g = this.TRo.get(R.GetRoleConfig().QualityId) ?? 1;
            o.push(R.GetLevelData().GetLevel() * g);
            let e = 0;
            var M = R.GetSkillData();
            for (const E of M.GetSkillList())
              this.IRo.includes(E.SkillType) && (e += M.GetSkillLevel(E.Id));
            i.push(e / s);
            var _,
              g =
                ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
                  R.GetDataId(),
                );
            let r = 0;
            g &&
              ((_ = this.TRo.get(g.GetWeaponConfig().QualityId) ?? 1),
              (r = g.GetLevel() * _)),
              t.push(r);
            g =
              ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
                R.GetRoleId(),
              );
            l.push(g.GetAverageEquipLevel());
          }
          var f,
            v,
            d,
            h,
            C,
            I = r.RoleLevel,
            u = r.SkillLevel,
            m = r.WeaponLevel,
            r = r.EquipLevel,
            c = new Array();
          for ([f, v, d, h, C] of [
            ["ReviveTrainingItemRoleLevel", o, I, "SP_IconDeathLevel", 0],
            ["ReviveTrainingItemWeaponLevel", t, m, "SP_IconDeathWeapon", 1],
            ["ReviveTrainingItemEquipLevel", l, r, "SP_IconDeathVision", 2],
            ["ReviveTrainingItemSkillLevel", i, u, "SP_IconDeathTree", 3],
          ])
            if (!(d <= 0)) {
              var T = v.length;
              T > MAX_ROLE_SIZE &&
                (v.sort((e, r) => r - e),
                v.splice(MAX_ROLE_SIZE, T - MAX_ROLE_SIZE));
              let e = 0;
              for (const p of v) e += p;
              e /= MAX_ROLE_SIZE;
              var T = new TrainingData(),
                S =
                  ((T.Icon = h),
                  (T.NameId =
                    ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                      f,
                    )),
                  e / d);
              (T.FillAmount = S), (T.TrainingType = C), c.push(T);
            }
          if (!(c.length <= 0)) {
            let e = c[0];
            for (const L of c) L.FillAmount < e.FillAmount && (e = L);
            e.FillAmount < this.yRo &&
              ((e.TipsId =
                ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                  "ReviveTrainingItemBad",
                )),
              (e.BgColor = "6a2e2b"));
            for (const y of c)
              y.FillAmount = MathUtils_1.MathUtils.Clamp(
                y.FillAmount,
                MIN_PROCESS,
                1,
              );
          }
          return c;
        }
      }
    }
  }
  LRo() {
    var e,
      r = ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
      a = ConfigManager_1.ConfigManager.WorldLevelConfig.GetWorldLevelConfig(r);
    return a
      ? ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
        ? (e = ModelManager_1.ModelManager.GameModeModel.InstanceDungeon)
          ? 0 <
            (e =
              ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetRecommendLevel(
                e.Id,
                r,
              ))
            ? e
            : a.TrainingLevel
          : 1
        : a.TrainingLevel
      : 1;
  }
}
exports.TrainingDegreeModel = TrainingDegreeModel;
//# sourceMappingURL=TrainingDegreeModel.js.map
