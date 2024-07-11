"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDebugUtil = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
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
  static async LoadCharacterFightDtOldPreload(e, o) {
    var a = e.GetComponent(0),
      t = e.GetComponent(33),
      r = e.GetComponent(1),
      l = ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(
        a.GetCreatureDataId(),
      );
    if (l) {
      (a = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        r.Actor.GetClass(),
      )),
        (r = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(a)),
        (a =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(r));
      if (a) {
        var i = a?.SkillDataTableMap.Get(o)?.ToAssetPathName(),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.Load(i, UE.DataTable)),
              (t.DtSkillInfoExtra = i)),
            a?.BulletDataTableMap.Get(o)?.ToAssetPathName()),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.Load(i, UE.DataTable)),
              (t.DtBulletInfoExtra = i)),
            a?.HitEffectTableMap.Get(o)?.ToAssetPathName());
        i &&
          0 < i.length &&
          "None" !== i &&
          ((a = ResourceSystem_1.ResourceSystem.Load(i, UE.DataTable)),
          (t.DtHitEffectExtra = a));
        let r = void 0;
        if (t.DtSkillInfoExtra) {
          var o = (0, puerts_1.$ref)(void 0),
            n =
              (UE.DataTableFunctionLibrary.GetDataTableRowNames(
                t.DtSkillInfoExtra,
                o,
              ),
              new Array());
          if ((r = (0, puerts_1.$unref)(o))?.Num())
            for (let e = 0; e < r.Num(); e++) {
              var s = r.Get(e).toString(),
                _ = DataTableUtil_1.DataTableUtil.GetDataTableRow(
                  t.DtSkillInfoExtra,
                  s,
                );
              if (_) {
                PreloadController_1.PreloadController.CollectEntityAbility(
                  l,
                  _,
                ),
                  PreloadController_1.PreloadController.CollectEntitySkillMontage(
                    l,
                    s,
                    _,
                  );
                var d = _.SkillStartBuff;
                if (d?.Num())
                  for (let e = 0; e < d.Num(); ++e) {
                    var u = d.Get(e);
                    u && n.push(u);
                  }
                var g = _.SkillEndBuff;
                if (g?.Num())
                  for (let e = 0; e < g.Num(); ++e) {
                    var f = g.Get(e);
                    f && n.push(f);
                  }
              }
            }
          PreloadController_1.PreloadController.CollectAssetByBuffIdList(l, n);
        }
        t.DtBulletInfoExtra &&
          PreloadController_1.PreloadController.CollectAssetByBulletDt(
            t.DtBulletInfoExtra,
            l,
          );
        const v = new GameModePromise_1.GameModePromise();
        PreloadController_1.PreloadController.CheckPreloadByAssetElement(
          l,
          void 0,
          (e) => {
            v.SetResult(e);
          },
        ),
          await v.Promise;
        var c = e.GetComponent(191);
        if (r?.Num())
          for (let e = 0; e < r.Num(); e++) {
            var C = Number(r.Get(e).toString()),
              P = t.GetSkillInfo(C);
            P && (t.GiveSkillDebug(C, P), c.AddSkillTriggerDebug(C, P));
          }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 18, "找不到当前角色的FightInfo配置", [
            "actorPath",
            r,
          ]);
    }
  }
  static async LoadCharacterFightDtNewPreload(e, r) {
    var o = e.GetComponent(0),
      a = e.GetComponent(33),
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
            o?.BulletDataTableMap.Get(r)?.ToAssetPathName()),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                i,
                UE.DataTable,
              )),
              (a.DtBulletInfoExtra = i)),
            (0, puerts_1.$ref)(void 0)),
          n =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(
              a.DtBulletInfoExtra,
              i,
            ),
            (0, puerts_1.$unref)(i));
        for (let e = 0; e < n.Num(); e++) {
          var s = BigInt(n.Get(e).toString());
          PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
            l,
            s,
          );
        }
        var i = o?.HitEffectTableMap.Get(r)?.ToAssetPathName(),
          r =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                i,
                UE.DataTable,
              )),
              (a.DtHitEffectExtra = o)),
            new GameModePromise_1.GameModePromise()),
          _ =
            (PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
              l.MainAsset,
              l.LoadPriority,
              !1,
              r,
            ),
            await r.Promise,
            e.GetComponent(191)),
          i = (0, puerts_1.$ref)(void 0),
          d =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(
              a.DtSkillInfoExtra,
              i,
            ),
            (0, puerts_1.$unref)(i));
        if (d?.Num())
          for (let e = 0; e < d.Num(); e++) {
            var u = Number(d.Get(e).toString()),
              g = a.GetSkillInfo(u);
            g &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Battle", 18, "【debug】加载额外技能", [
                  "skillId",
                  u,
                ]),
              a.GiveSkillDebug(u, g),
              _.AddSkillTriggerDebug(u, g));
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
