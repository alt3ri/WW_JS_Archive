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
                  Log_1.Log.Debug("Temp", 1, "测试加载战斗DT完成", [
                    "entityId",
                    r.Entity.Id,
                  ]);
              },
              (e) => {},
            )
          : this.LoadCharacterFightDtOldPreload(r.Entity, e).then(
              () => {
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Temp", 1, "测试加载战斗DT完成", [
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
      e = e.GetComponent(1),
      l = ModelManager_1.ModelManager.PreloadModel.AllEntityAssetMap.get(
        a.GetCreatureDataId(),
      );
    if (l) {
      (a = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        e.Actor.GetClass(),
      )),
        (e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(a)),
        (a =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e));
      if (a) {
        var i = a?.SkillDataTableMap.Get(o)?.ToAssetPathName(),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.SyncLoad(i, UE.DataTable)),
              (t.DtSkillInfoExtra = i)),
            a?.BulletDataTableMap.Get(o)?.ToAssetPathName()),
          i =
            (i &&
              0 < i.length &&
              "None" !== i &&
              ((i = ResourceSystem_1.ResourceSystem.SyncLoad(i, UE.DataTable)),
              (t.DtBulletInfoExtra = i)),
            a?.HitEffectTableMap.Get(o)?.ToAssetPathName());
        i &&
          0 < i.length &&
          "None" !== i &&
          ((a = ResourceSystem_1.ResourceSystem.SyncLoad(i, UE.DataTable)),
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
        const P = new GameModePromise_1.GameModePromise();
        if (
          (PreloadController_1.PreloadController.CheckPreloadByAssetElement(
            l,
            void 0,
            (e) => {
              P.SetResult(e);
            },
          ),
          await P.Promise,
          r?.Num())
        )
          for (let e = 0; e < r.Num(); e++) {
            var c = Number(r.Get(e).toString()),
              C = t.GetSkillInfo(c);
            C && 0 === C.SkillLoadType && t.GiveSkillDebug(c);
          }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 18, "找不到当前角色的FightInfo配置", [
            "actorPath",
            e,
          ]);
    }
  }
  static async LoadCharacterFightDtNewPreload(e, r) {
    var o = e.GetComponent(0),
      a = e.GetComponent(33),
      e = e.GetComponent(1),
      t = ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(
        o.GetCreatureDataId(),
      );
    if (t) {
      (o = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
        e.Actor.GetClass(),
      )),
        (e = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(o)),
        (o =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e));
      if (o) {
        var l = o?.SkillDataTableMap.Get(r)?.ToAssetPathName(),
          l =
            (l &&
              0 < l.length &&
              "None" !== l &&
              ((l = ResourceSystem_1.ResourceSystem.SyncLoad(l, UE.DataTable)),
              (a.DtSkillInfoExtra = l)),
            o?.BulletDataTableMap.Get(r)?.ToAssetPathName()),
          l =
            (l &&
              0 < l.length &&
              "None" !== l &&
              ((l = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                l,
                UE.DataTable,
              )),
              (a.DtBulletInfoExtra = l)),
            (0, puerts_1.$ref)(void 0)),
          i =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(
              a.DtBulletInfoExtra,
              l,
            ),
            (0, puerts_1.$unref)(l));
        for (let e = 0; e < i.Num(); e++) {
          var n = BigInt(i.Get(e).toString());
          PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
            t,
            n,
          );
        }
        var l = o?.HitEffectTableMap.Get(r)?.ToAssetPathName(),
          r =
            (l &&
              0 < l.length &&
              "None" !== l &&
              ((o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
                l,
                UE.DataTable,
              )),
              (a.DtHitEffectExtra = o)),
            new GameModePromise_1.GameModePromise()),
          l =
            (PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
              t.MainAsset,
              t.LoadPriority,
              !1,
              r,
            ),
            await r.Promise,
            (0, puerts_1.$ref)(void 0)),
          s =
            (UE.DataTableFunctionLibrary.GetDataTableRowNames(
              a.DtSkillInfoExtra,
              l,
            ),
            (0, puerts_1.$unref)(l));
        if (s?.Num())
          for (let e = 0; e < s.Num(); e++) {
            var _ = Number(s.Get(e).toString()),
              d = a.GetSkillInfo(_);
            d && 0 === d.SkillLoadType && a.GiveSkillDebug(_);
          }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 18, "找不到当前角色的FightInfo配置", [
            "actorPath",
            e,
          ]);
    }
  }
}
exports.CharacterDebugUtil = CharacterDebugUtil;
//# sourceMappingURL=CharacterDebugUtil.js.map
