"use strict";
var RolePreloadComponent_1,
  __decorate =
    (this && this.__decorate) ||
    function (e, t, o, r) {
      var i,
        l = arguments.length,
        n =
          l < 3
            ? t
            : null === r
              ? (r = Object.getOwnPropertyDescriptor(t, o))
              : r;
      if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
        n = Reflect.decorate(e, t, o, r);
      else
        for (var a = e.length - 1; 0 <= a; a--)
          (i = e[a]) &&
            (n = (l < 3 ? i(n) : 3 < l ? i(t, o, n) : i(t, o)) || n);
      return 3 < l && n && Object.defineProperty(t, o, n), n;
    };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RolePreloadComponent = exports.characterCommonSkillSet = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  DataTableUtil_1 = require("../../../../../Core/Utils/DataTableUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  PreloadDefine_1 = require("../../../../Preload/PreloadDefine"),
  CombatLog_1 = require("../../../../Utils/CombatLog"),
  PreloadControllerNew_1 = require("../../../../World/Controller/PreloadControllerNew"),
  Stats_1 = require("../../../../../Core/Common/Stats");
exports.characterCommonSkillSet = new Set([100005, 100006, 100007]);
let RolePreloadComponent =
  (RolePreloadComponent_1 = class RolePreloadComponent extends (
    EntityComponent_1.EntityComponent
  ) {
    constructor() {
      super(...arguments),
        (this.u1t = void 0),
        (this.tRr = void 0),
        (this.XJr = void 0),
        (this.$Jr = !1),
        (this.fGn = void 0),
        (this.pGn = 0),
        (this.YJr = (e, t) => {
          if (t && !this.$Jr && this.tRr) {
            t = this.u1t.GetEntityType();
            if (t === Protocol_1.Aki.Protocol.kks.Proto_Monster) {
              if (
                (CombatLog_1.CombatLog.Warn(
                  "Skill",
                  this.Entity,
                  "开始加载技能和子弹",
                ),
                (this.$Jr = !0),
                RolePreloadComponent_1.IJa.Start(),
                this.JJr(!0),
                RolePreloadComponent_1.IJa.Stop(),
                RolePreloadComponent_1.TJa.Start(),
                this.vGn(),
                RolePreloadComponent_1.TJa.Stop(),
                RolePreloadComponent_1.LJa.Start(),
                this.tRr.DtSkillInfo)
              ) {
                t = new Array();
                DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
                  this.tRr.DtSkillInfo,
                  t,
                );
                for (const i of t) {
                  var o = Number(i);
                  this.tRr.LoadedSkills.has(o) || this.LoadSkillAsync(o);
                }
              }
              RolePreloadComponent_1.LJa.Stop(),
                RolePreloadComponent_1.AJa.Start();
              for (const l of ConfigManager_1.ConfigManager.WorldConfig.GetMonsterCommonSkillRowNames()) {
                var r = Number(l);
                this.tRr.LoadedSkills.has(r) || this.LoadSkillAsync(r);
              }
              RolePreloadComponent_1.AJa.Stop(),
                RolePreloadComponent_1.DJa.Start(),
                this.MGn(),
                RolePreloadComponent_1.DJa.Stop();
            }
          }
        });
    }
    OnInitData() {
      return (
        PreloadDefine_1.PreloadSetting.UseNewPreload &&
          ((this.tRr = this.Entity.GetComponent(34)),
          (this.u1t = this.Entity.GetComponent(0)),
          this.Entity.GetComponent(190).ListenForTagAddOrRemove(
            1996802261,
            this.YJr,
          )),
        !0
      );
    }
    InitPreload(e) {
      (this.XJr = e),
        this.tRr && (this.SGn(), this.EGn(), this.zJr(), this.ZJr());
    }
    SGn() {
      var e = this.XJr?.BlueprintClassPath;
      e &&
        (this.fGn =
          ConfigManager_1.ConfigManager.WorldConfig.GetCharacterFightInfo(e));
    }
    EGn() {
      ModelManager_1.ModelManager.RoguelikeModel.CheckInRoguelike()
        ? (this.pGn = 1)
        : (this.pGn = 0);
    }
    zJr() {
      var e, t, o;
      this.tRr &&
        ((o = this.XJr),
        (e = this.fGn?.SkillDataTable.ToAssetPathName())?.length &&
          "None" !== e &&
          ((t = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
            e,
            UE.DataTable,
          ))?.IsValid() ||
            CombatLog_1.CombatLog.Warn(
              "Skill",
              this.Entity,
              "SkillComponent中找不到技能表",
              ["ActorPath", o.BlueprintClassPath],
              ["技能表Path", e],
            ),
          (this.tRr.DtSkillInfo = t)),
        (o = this.u1t.GetEntityType()) ===
        Protocol_1.Aki.Protocol.kks.Proto_Player
          ? this.tzr()
          : o === Protocol_1.Aki.Protocol.kks.Proto_Vision
            ? this.izr()
            : this.u1t?.SummonType !==
                Protocol_1.Aki.Protocol.Summon.x3s.Proto_ESummonTypeDefault
              ? this.tzr()
              : o === Protocol_1.Aki.Protocol.kks.Proto_Monster && this.ozr());
    }
    tzr() {
      if (this.tRr) {
        var e = new Array(),
          t =
            (DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
              this.tRr.DtSkillInfo,
              e,
            ),
            new Set());
        for (const i of e) {
          var o = Number(i);
          t.add(o),
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
              this.XJr,
              o,
              !1,
            );
        }
        this.MGn();
        for (const l of ConfigManager_1.ConfigManager.WorldConfig.GetRoleCommonSkillRowNames()) {
          var r = Number(l);
          exports.characterCommonSkillSet.has(r) &&
            !t.has(r) &&
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
              this.XJr,
              r,
              !1,
            );
        }
      }
    }
    LoadSkillAsync(t) {
      var e;
      this.XJr.FightAssetManager.SkillAssetManager.GetSkill(t) ||
        ((e = PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
          this.XJr,
          t,
          !1,
        )) &&
          PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
            e,
            this.XJr.LoadPriority,
            !1,
            void 0,
            (e) => {
              e
                ? Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug("Preload", 4, "技能加载完毕", ["SkillId", t])
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Preload", 4, "技能加载失败", ["SkillId", t]);
            },
          ));
    }
    FlushSkill(e) {
      PreloadControllerNew_1.PreloadControllerNew.FlushSkill(this.XJr, e);
    }
    RemoveSkill(e) {
      PreloadControllerNew_1.PreloadControllerNew.RemoveSkill(this.XJr, e);
    }
    ozr() {
      if (this.tRr && this.tRr.DtSkillInfo) {
        var e,
          t,
          o = new Array();
        DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(
          this.tRr.DtSkillInfo,
          o,
        );
        for (const r of o)
          void 0 !== r[0] &&
            void 0 !== r[1] &&
            ((e = Number(r[0])), (t = r[1]) && 8 === t.SkillGenre) &&
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
              this.XJr,
              e,
              !1,
            );
      }
    }
    izr() {
      if (this.tRr) {
        var e = new Array();
        if (this.tRr.DtSkillInfo) {
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(
            this.tRr.DtSkillInfo,
            e,
          );
          for (const t of e)
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
              this.XJr,
              Number(t),
              !1,
            );
        }
        for (const o of ConfigManager_1.ConfigManager.WorldConfig.GetVisionCommonSkillRowNames())
          PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
            this.XJr,
            Number(o),
            !1,
          );
        this.MGn();
      }
    }
    MGn() {
      if (this.tRr && 0 !== this.pGn) {
        var t = this.fGn?.SkillDataTableMap.Get(this.pGn)?.ToAssetPathName();
        let e = void 0;
        if (
          (e =
            t && 0 < t.length && "None" !== t
              ? ResourceSystem_1.ResourceSystem.GetLoadedAsset(t, UE.DataTable)
              : e)
        ) {
          this.tRr.DtSkillInfoExtra = e;
          t = new Array();
          DataTableUtil_1.DataTableUtil.GetDataTableAllRowNamesFromTable(e, t);
          for (const r of t) {
            var o = Number(r);
            PreloadControllerNew_1.PreloadControllerNew.CollectAssetBySkillId(
              this.XJr,
              o,
              !1,
            );
          }
        }
      }
    }
    ZJr() {
      var e = this.u1t.GetEntityType();
      e === Protocol_1.Aki.Protocol.kks.Proto_Player ||
      e === Protocol_1.Aki.Protocol.kks.Proto_Vision
        ? this.JJr(!1, !0)
        : this.JJr(!1, !1),
        this.vGn();
    }
    JJr(e = !1, t = !0) {
      var o;
      this.tRr &&
        (o = this.fGn?.BulletDataTable?.ToAssetPathName())?.length &&
        "None" !== o &&
        ((o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.DataTable)),
        this.IGn(o, e, t) && (this.tRr.DtBulletInfo = o),
        0 !== this.pGn) &&
        (o = this.fGn?.BulletDataTableMap.Get(this.pGn)?.ToAssetPathName()) &&
        0 < o.length &&
        "None" !== o &&
        ((o = ResourceSystem_1.ResourceSystem.GetLoadedAsset(o, UE.DataTable)),
        this.IGn(o, e, t)) &&
        (this.tRr.DtBulletInfoExtra = o);
    }
    IGn(e, t = !1, o = !0) {
      var r = this.XJr;
      if (!e?.IsValid())
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error(
              "Character",
              4,
              "[预加载] 加载角色子弹表失败。",
              ["Path", r.BlueprintClassPath],
              ["子弹表Path", this.fGn?.BulletDataTable?.ToAssetPathName()],
            ),
          !1
        );
      if (!e) return !1;
      if (o) {
        var i = new Array(),
          l =
            (DataTableUtil_1.DataTableUtil.GetDataTableAllRowWithKeysFromTable(
              e,
              i,
            ),
            i.length);
        for (let e = 0; e < l; ++e) {
          var n = i[e];
          if (void 0 !== n[0] && void 0 !== n[1]) {
            let e = void 0;
            try {
              e = BigInt(n[0]);
            } catch (e) {
              Log_1.Log.CheckError() &&
                Log_1.Log.Error("Editor", 4, "子弹ID不合法", ["子弹Id", n[0]]);
              continue;
            }
            n =
              PreloadControllerNew_1.PreloadControllerNew.CollectAssetByBulletId(
                r,
                e,
              );
            t &&
              n &&
              PreloadControllerNew_1.PreloadControllerNew.LoadAssetAsync(
                n,
                this.XJr.LoadPriority,
                !1,
              );
          }
        }
      }
      return !0;
    }
    vGn() {
      if (this.tRr) {
        const t = this.fGn?.HitEffectTable.ToAssetPathName();
        var e;
        if (
          (t &&
            0 < t.length &&
            "None" !== t &&
            ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              t,
              UE.DataTable,
            )),
            (this.tRr.DtHitEffect = e)),
          0 !== this.pGn)
        ) {
          const t = this.fGn?.HitEffectTableMap.Get(
            this.pGn,
          )?.ToAssetPathName();
          t &&
            0 < t.length &&
            "None" !== t &&
            ((e = ResourceSystem_1.ResourceSystem.GetLoadedAsset(
              t,
              UE.DataTable,
            )),
            (this.tRr.DtHitEffectExtra = e));
        }
      }
    }
  });
(RolePreloadComponent.IJa = Stats_1.Stat.Create(
  "Preload.MonsterBeginFight.InitAllBullet",
)),
  (RolePreloadComponent.TJa = Stats_1.Stat.Create(
    "Preload.MonsterBeginFight.InitHitEffect",
  )),
  (RolePreloadComponent.LJa = Stats_1.Stat.Create(
    "Preload.MonsterBeginFight.InitAllSkill",
  )),
  (RolePreloadComponent.AJa = Stats_1.Stat.Create(
    "Preload.MonsterBeginFight.InitAllCommonSkill",
  )),
  (RolePreloadComponent.DJa = Stats_1.Stat.Create(
    "Preload.MonsterBeginFight.InitAllExSkill",
  )),
  (RolePreloadComponent = RolePreloadComponent_1 =
    __decorate(
      [(0, RegisterComponent_1.RegisterComponent)(201)],
      RolePreloadComponent,
    )),
  (exports.RolePreloadComponent = RolePreloadComponent);
//# sourceMappingURL=RolePreloadComponent.js.map
