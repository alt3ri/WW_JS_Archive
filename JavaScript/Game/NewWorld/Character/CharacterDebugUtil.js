"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterDebugUtil = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../Core/Utils/DataTableUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  PreloadControllerNew_1 = require("../../World/Controller/PreloadControllerNew"),
  GameModePromise_1 = require("../../World/Define/GameModePromise");
class CharacterDebugUtil {
  static LoadFightDtDebug(e = 0) {
    e = ModelManager_1.ModelManager.CharacterModel?.GetHandle(e);
    let r = [];
    for (const o of (r = e
      ? [e]
      : ModelManager_1.ModelManager.CreatureModel.GetAllEntities()))
      o.IsInit &&
        this.LoadCharacterFightDtNewPreload(o.Entity).then(
          () => {
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug("Battle", 17, "测试加载战斗DT完成", [
                "entityId",
                o.Entity.Id,
              ]);
          },
          (e) => {},
        );
  }
  static async LoadCharacterFightDtNewPreload(e) {
    var r = e.GetComponent(0),
      o = e.GetComponent(39),
      a = e.GetComponent(205),
      t = e.GetComponent(1),
      l = e.GetComponent(206),
      i = ModelManager_1.ModelManager.PreloadModelNew.GetEntityAssetElement(
        r.GetCreatureDataId(),
      );
    if (i) {
      var e = UE.KismetSystemLibrary.Conv_ClassToSoftClassReference(
          t.Actor.GetClass(),
        ),
        r = UE.KismetSystemLibrary.Conv_SoftClassReferenceToString(e),
        n = ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(r);
      if (n) {
        o.DtSkillInfoMapForDebug.set(0, o.DtSkillInfo),
          (o.DtSkillInfoExtraList = []),
          (o.DtBulletInfoExtraList = []),
          (o.DtHitEffectExtraList = []);
        for (let e = 0; e < n.SkillDataTableMap.Num(); ++e) {
          var s = n.SkillDataTableMap.GetKey(e),
            g = n.SkillDataTableMap.Get(s)?.ToAssetPathName(),
            g =
              (g &&
                0 < g.length &&
                "None" !== g &&
                ((g = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable)) &&
                  o.DtSkillInfoExtraList.push(g),
                o.DtSkillInfoMapForDebug.set(s, g)),
              n?.BulletDataTableMap.Get(s)?.ToAssetPathName());
          if (g && 0 < g.length && "None" !== g) {
            g = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable);
            if (g) {
              o.DtBulletInfoExtraList.push(g);
              var _ = new Array();
              DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
                g,
                _,
              );
              for (const c of _) {
                var d = BigInt(c);
                PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
                  i,
                  d,
                );
              }
            }
          }
          (g = n?.HitEffectTableMap.Get(s)?.ToAssetPathName()),
            (s =
              (g &&
                0 < g.length &&
                "None" !== g &&
                (_ = ResourceSystem_1.ResourceSystem.Load(g, UE.DataTable)) &&
                o.DtHitEffectExtraList.push(_),
              new GameModePromise_1.GameModePromise()));
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
            i.MainAsset,
            i.LoadPriority,
            !1,
            s,
          ),
            await s.Promise;
          for (const M of o.GetAllSkillData(4)) {
            var u = o.GetSkillInfo(M);
            u &&
              (Log_1.Log.CheckDebug() &&
                Log_1.Log.Debug("Battle", 17, "【debug】加载额外技能", [
                  "skillId",
                  M,
                ]),
              o.GiveSkillDebug(M),
              l.AddSkillTriggerDebug(M, u),
              a.InitSkillCdBySkillInfo(M, u));
          }
        }
      } else
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 17, "找不到当前角色的FightInfo配置", [
            "actorPath",
            r,
          ]);
    }
  }
}
exports.CharacterDebugUtil = CharacterDebugUtil;
//# sourceMappingURL=CharacterDebugUtil.js.map
