"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDebugUtil = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../Preload/PreloadDefine"),
  PreloadController_1 = require("../../World/Controller/PreloadController"),
  PreloadControllerNew_1 = require("../../World/Controller/PreloadControllerNew"),
  GameModePromise_1 = require("../../World/Define/GameModePromise");
class CharacterDebugUtil {
  static LoadFightDtDebug(e) {
    for (const r of ModelManager_1.ModelManager.SceneTeamModel.GetTeamEntities(
      !0,
    ))
      r.IsInit &&
        (PreloadDefine_1.PreloadSetting.UseNewPreload
          ? this.LoadCharacterFightDtNewPreload(r.Entity, e).then(
              () => {
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Battle", 18, "测试加载战斗DT完成", [
                    "entityId",
                    r.Entity.Id,
                  ]);
              },
              (e) => {},
            )
          : this.LoadCharacterFightDtOldPreload(r.Entity, e).then(
              () => {
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Battle", 18, "测试加载战斗DT完成", [
                    "entityId",
                    r.Entity.Id,
                  ]);
              },
              (e) => {},
            ));
  }
  static async LoadCharacterFightDtOldPreload(e, r) {
    var o = e.GetComponent(0),
      a = e.GetComponent(34),
      t = e.GetComponent(1),
      l = ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(
        o.GetCreatureDataId(),
      );
    if (l) {
      (o = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        t.Actor.GetClass(),
      )),
        (t = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(o)),
        (o =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(t));
      if (o) {
        var i = o?.SkillDataTableMap.Get(r)?.ToAssetPathName(),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.Load(i, UE.DataTable)),
              (a.DtSkillInfoExtra = i)),
            o?.BulletDataTableMap.Get(r)?.ToAssetPathName()),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.Load(i, UE.DataTable)),
              (a.DtBulletInfoExtra = i)),
            o?.HitEffectTableMap.Get(r)?.ToAssetPathName()),
          r =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((o = ResourceSystem_1.ResourceSystem.Load(i, UE.DataTable)),
              (a.DtHitEffectExtra = o)),
            new Array());
        if (a.DtSkillInfoExtra) {
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            a.DtSkillInfoExtra,
            r,
          );
          var n = new Array();
          for (const M of r) {
            var s = DataTableUtil_1.DataTableUtil.GetDataTableRow(
              a.DtSkillInfoExtra,
              M,
            );
            if (s) {
              PreloadController_1.PreloadController.CollectEntityAbility(l, s),
                PreloadController_1.PreloadController.CollectEntitySkillMontage(
                  l,
                  M,
                  s,
                );
              var _ = s.SkillStartBuff;
              if (_?.Num())
                for (let e = 0; e < _.Num(); ++e) {
                  var d = _.Get(e);
                  d && n.push(d);
                }
              var g = s.SkillEndBuff;
              if (g?.Num())
                for (let e = 0; e < g.Num(); ++e) {
                  var c = g.Get(e);
                  c && n.push(c);
                }
            }
          }
          PreloadController_1.PreloadController.CollectAssetByBuffIdList(l, n);
        }
        a.DtBulletInfoExtra &&
          PreloadController_1.PreloadController.CollectAssetByBulletDt(
            a.DtBulletInfoExtra,
            l,
          );
        const P = new GameModePromise_1.GameModePromise();
        PreloadController_1.PreloadController.CheckPreloadByAssetElement(
          l,
          void 0,
          (e) => {
            P.SetResult(e);
          },
        ),
          await P.Promise;
        var f = e.GetComponent(193);
        for (const m of r) {
          var u = Number(m),
            C = a.GetSkillInfo(u);
          C && (a.GiveSkillDebug(u, C), f.AddSkillTriggerDebug(u, C));
        }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 18, "找不到当前角色的FightInfo配置", [
            "actorPath",
            t,
          ]);
    }
  }
  static async LoadCharacterFightDtNewPreload(e, r) {
    var o = e.GetComponent(0),
      a = e.GetComponent(34),
      t = e.GetComponent(1),
      l = ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(
        o.GetCreatureDataId(),
      );
    if (l) {
      (o = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        t.Actor.GetClass(),
      )),
        (t = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(o)),
        (o =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(t));
      if (o) {
        var i = o?.SkillDataTableMap.Get(r)?.ToAssetPathName(),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.Load(i, UE.DataTable)),
              (a.DtSkillInfoExtra = i)),
            o?.BulletDataTableMap.Get(r)?.ToAssetPathName());
        if (
          (i &&
            0 < i.length &&
            "None" !== i &&
            ((i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              i,
              UE.DataTable,
            )),
            (a.DtBulletInfoExtra = i)),
          a.DtBulletInfoExtra)
        ) {
          i = new Array();
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            a.DtBulletInfoExtra,
            i,
          );
          for (const g of i) {
            var n = BigInt(g);
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
              l,
              n,
            );
          }
        }
        (i = o?.HitEffectTableMap.Get(r)?.ToAssetPathName()),
          (r =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                i,
                UE.DataTable,
              )),
              (a.DtHitEffectExtra = o)),
            new GameModePromise_1.GameModePromise()));
        if (
          (PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
            l.MainAsset,
            l.LoadPriority,
            !1,
            r,
          ),
          await r.Promise,
          a.DtSkillInfoExtra)
        ) {
          var s = e.GetComponent(193),
            i = new Array();
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            a.DtSkillInfoExtra,
            i,
          );
          for (const c of i) {
            var _ = Number(c),
              d = a.GetSkillInfo(_);
            d &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Battle", 18, "【debug】加载额外技能", [
                  "skillId",
                  _,
                ]),
              a.GiveSkillDebug(_, d),
              s.AddSkillTriggerDebug(_, d));
          }
        }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 18, "找不到当前角色的FightInfo配置", [
            "actorPath",
            t,
          ]);
    }
  }
}
exports.CharacterDebugUtil = CharacterDebugUtil;
//# sourceMappingURL=CharacterDebugUtil.js.map
