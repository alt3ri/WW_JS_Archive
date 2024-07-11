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
      (this.BgColor = "");
  }
}
exports.TrainingData = TrainingData;
class TrainingDegreeModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.LDo = -0),
      (this.DDo = void 0),
      (this.RDo = new Map());
  }
  OnInit() {
    (this.LDo = CommonParamById_1.configCommonParamById.GetFloatConfig(
      "RoleTrainingDegreeNormal",
    )),
      (this.DDo = CommonParamById_1.configCommonParamById.GetIntArrayConfig(
        "TrainingDegreeSkillTypes",
      ));
    for (const e of QualityInfoAll_1.configQualityInfoAll.GetConfigList())
      this.RDo.set(e.Id, e.TrainingWeight);
    return !0;
  }
  OnClear() {
    return (this.DDo = void 0), this.RDo.clear(), !0;
  }
  GetTrainingDataList() {
    if (!ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      var r = this.UDo(),
        r =
          ConfigManager_1.ConfigManager.RoleConfig.GetRoleTrainingDegreeConfig(
            r,
          );
      if (r) {
        let e = !0;
        var a = new Array();
        for (const S of ModelManager_1.ModelManager.SceneTeamModel.GetTeamItems()) {
          var n = S.GetConfigId,
            n = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(n);
          n && (a.push(n), n.IsTrialRole() || (e = !1));
        }
        if (!e) {
          var o = [],
            i = [],
            t = [],
            l = [],
            s = this.DDo.length;
          for (const D of a) {
            var g = this.RDo.get(D.GetRoleConfig().QualityId) ?? 1;
            o.push(D.GetLevelData().GetLevel() * g);
            let e = 0;
            var M = D.GetSkillData();
            for (const R of M.GetSkillList())
              this.DDo.includes(R.SkillType) && (e += M.GetSkillLevel(R.Id));
            i.push(e / s);
            var _,
              g =
                ModelManager_1.ModelManager.WeaponModel.GetWeaponDataByRoleDataId(
                  D.GetDataId(),
                );
            let r = 0;
            g &&
              ((_ = this.RDo.get(g.GetWeaponConfig().QualityId) ?? 1),
              (r = g.GetLevel() * _)),
              t.push(r);
            g =
              ModelManager_1.ModelManager.PhantomBattleModel.GetBattleDataById(
                D.GetRoleId(),
              );
            l.push(g.GetAverageEquipLevel());
          }
          var f,
            v,
            d,
            h,
            C = r.RoleLevel,
            I = r.SkillLevel,
            u = r.WeaponLevel,
            r = r.EquipLevel,
            m = new Array();
          for ([f, v, d, h] of [
            ["ReviveTrainingItemRoleLevel", o, C, "SP_IconDeathLevel"],
            ["ReviveTrainingItemWeaponLevel", t, u, "SP_IconDeathWeapon"],
            ["ReviveTrainingItemEquipLevel", l, r, "SP_IconDeathVision"],
            ["ReviveTrainingItemSkillLevel", i, I, "SP_IconDeathTree"],
          ])
            if (!(d <= 0)) {
              var c = v.length;
              c > MAX_ROLE_SIZE &&
                (v.sort((e, r) => r - e),
                v.splice(MAX_ROLE_SIZE, c - MAX_ROLE_SIZE));
              let e = 0;
              for (const E of v) e += E;
              e /= MAX_ROLE_SIZE;
              var c = new TrainingData(),
                T =
                  ((c.Icon = h),
                  (c.NameId =
                    ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                      f,
                    )),
                  e / d);
              (c.FillAmount = T), m.push(c);
            }
          if (!(m.length <= 0)) {
            let e = m[0];
            for (const p of m) p.FillAmount < e.FillAmount && (e = p);
            e.FillAmount < this.LDo &&
              ((e.TipsId =
                ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
                  "ReviveTrainingItemBad",
                )),
              (e.BgColor = "6a2e2b"));
            for (const L of m)
              L.FillAmount = MathUtils_1.MathUtils.Clamp(
                L.FillAmount,
                MIN_PROCESS,
                1,
              );
          }
          return m;
        }
      }
    }
  }
  UDo() {
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
