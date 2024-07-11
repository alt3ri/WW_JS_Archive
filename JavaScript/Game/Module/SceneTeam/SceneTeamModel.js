"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SceneTeamModel = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Stats_1 = require("../../../Core/Common/Stats");
const CommonParamById_1 = require("../../../Core/Define/ConfigCommon/CommonParamById");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const StatDefine_1 = require("../../Common/StatDefine");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const CharacterController_1 = require("../../NewWorld/Character/CharacterController");
const RoleTeamComponent_1 = require("../../NewWorld/Character/Role/Component/RoleTeamComponent");
const GameModePromise_1 = require("../../World/Define/GameModePromise");
const WaitEntityTask_1 = require("../../World/Define/WaitEntityTask");
const WorldGlobal_1 = require("../../World/WorldGlobal");
const UiBlueprintFunctionLibrary_1 = require("../BpBridge/UiBlueprintFunctionLibrary");
const SceneTeamData_1 = require("./SceneTeamData");
const SceneTeamDefine_1 = require("./SceneTeamDefine");
const SceneTeamItem_1 = require("./SceneTeamItem");
class SceneTeamModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.Jfo = void 0),
      (this.zfo = new Map()),
      (this.PPr = new Array()),
      (this.epo = new Set()),
      (this.CurrentGroupType = void 0),
      (this.Wfo = void 0),
      (this.tpo = void 0),
      (this.Ywi = void 0),
      (this.IsTeamReady = !1),
      (this.GoBattleInvincible = !1),
      (this.ChangingRole = !1),
      (this.IsPhantomTeam = !1),
      (this.ChangeCreatureDataIdCache = 0),
      (this.ChangeRoleCooldown = -0),
      (this.ipo = void 0),
      (this.LastEntityIsOnGround = !0),
      (this.LoadTeamPromise = void 0);
  }
  OnInit() {
    return (
      (this.ChangeRoleCooldown =
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "change_role_cooldown",
        )),
      !(this.Jfo = void 0)
    );
  }
  OnLeaveLevel() {
    return this.opo(), !0;
  }
  OnChangeMode() {
    return this.opo(), !0;
  }
  opo() {
    (this.ChangeCreatureDataIdCache = 0), (this.ipo = void 0);
    for (const e of this.zfo.values()) e.Clear();
    this.zfo.clear();
    for (const t of this.PPr) t.Reset();
    (this.PPr.length = 0),
      this.epo.clear(),
      (this.Wfo = void 0),
      (this.Ywi = void 0),
      (this.IsPhantomTeam = !1),
      (this.tpo = void 0);
  }
  SwitchGroup(e, t, r = !1) {
    let o;
    const i = this.zfo.get(e);
    i
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "SceneTeam",
            49,
            "切换编队组",
            ["PlayerId", e],
            ["GroupType", t],
          ),
        t !== i.GetCurrentGroupType() &&
          ((o = this.CurrentGroupType),
          i.SwitchGroup(t),
          e === ModelManager_1.ModelManager.PlayerInfoModel?.GetId() &&
            ((this.CurrentGroupType = t), (this.IsPhantomTeam = t === 2)),
          this.rpo(o, r)))
      : Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 49, "切换编队组玩家不存在", [
          "PlayerId",
          e,
        ]);
  }
  UpdateAllPlayerGroup(e) {
    for (const t of this.zfo.values()) t.ResetServerGroupData();
    for (const r of e) this.ZEn(r);
    this.rpo();
  }
  UpdateGroup(e) {
    this.ZEn(e),
      e.GroupType === this.zfo.get(e.PlayerId)?.GetCurrentGroupType() &&
        this.rpo();
  }
  ZEn({
    PlayerId: e,
    GroupType: t,
    GroupRoleList: r,
    CurrentRoleId: o,
    IsRetain: i = !1,
  }) {
    let a = this.zfo.get(e);
    a || ((a = SceneTeamData_1.SceneTeamPlayer.Create(e)), this.zfo.set(e, a)),
      a.UpdateGroup(t, r, o, i);
  }
  rpo(n = this.CurrentGroupType ?? 0, s = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，开始"),
      (this.IsTeamReady = !1),
      this.RefreshLastTransform(),
      (this.PPr.length = 0),
      this.epo.clear(),
      this.LoadTeamPromise ||
        (this.LoadTeamPromise = new GameModePromise_1.GameModePromise()),
      this.Wfo &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，中断等待"),
        this.Wfo.Cancel());
    let l = void 0;
    const e = [];
    const _ = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
    for (const c of ModelManager_1.ModelManager.GameModeModel.IsMulti
      ? ModelManager_1.ModelManager.OnlineModel.GetAllWorldTeamPlayer()
      : [_]) {
      const t = this.zfo.get(c)?.GetCurrentGroup();
      const r = t?.GetRoleList();
      if (r && r.length !== 0) {
        const o = t.GetGroupType();
        const i = t.GetCurrentRole();
        for (const f of r) {
          var a;
          var h;
          const m = f.CreatureDataId;
          m <= 0 ||
            ((h = f.RoleId),
            (a = f === i),
            (h = SceneTeamItem_1.SceneTeamItem.Create(o, c, h, m)),
            this.PPr.push(h),
            this.epo.add(c),
            e.push(m),
            h.IsMyRole() ? a && (l = h) : h.SetRemoteIsControl(a));
        }
      }
    }
    this.GetTeamItems(!0).length <= 0
      ? Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，当前玩家无角色实体")
      : (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，等待加载开始"),
        (this.Wfo = WaitEntityTask_1.WaitEntityTask.Create(
          e,
          (e) => {
            e ||
              (Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，加载角色失败")),
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，等待加载结束");
            for (const i of this.PPr) i.UpdateEntityHandle();
            var e = this.CurrentGroupType;
            let t = e && e !== n;
            let r = this.Ywi?.EntityHandle?.Entity;
            const o = l?.EntityHandle?.Entity;
            r = r && r.Id !== o?.Id;
            if (
              (t &&
                r &&
                ((t = o?.CheckGetComponent(81)),
                SceneTeamDefine_1.innerGroupType.includes(n) ||
                SceneTeamDefine_1.innerGroupType.includes(e)
                  ? t?.SetTeamTag(2)
                  : (t?.SetTeamTag(0), (this.Ywi = void 0))),
              l && !l.IsDead())
            ) {
              const o = l.EntityHandle;
              o && o.Id === this.Ywi?.EntityHandle?.Id
                ? (this.Ywi = l)
                : this.ChangeRole(l.GetCreatureDataId(), s),
                void this.H4s();
            } else {
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn(
                  "SceneTeam",
                  49,
                  "刷新出战编队，当前角色不可上阵",
                );
              for (const a of this.PPr)
                if (a.IsMyRole() && !a.IsDead())
                  return (
                    ControllerHolder_1.ControllerHolder.SceneTeamController.RequestChangeRole(
                      a.GetCreatureDataId(),
                      !1,
                    ),
                    void this.H4s()
                  );
              Log_1.Log.CheckWarn() &&
                Log_1.Log.Warn("SceneTeam", 49, "刷新出战编队，未找到存活角色"),
                l
                  ? (this.ChangeRole(l.GetCreatureDataId(), !1, 0, !1, !0),
                    o &&
                      ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                        o,
                        !1,
                        "SceneTeamControl.SwitchRoleAllDead",
                      ))
                  : Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn(
                      "SceneTeam",
                      49,
                      "刷新出战编队，数据错误，当前玩家找不到可上阵角色",
                      [
                        "CurrentRole",
                        this.zfo.get(_)?.GetCurrentGroup()?.GetCurrentRole(),
                      ],
                    ),
                this.H4s();
            }
          },
          !0,
          -1,
        )));
  }
  H4s() {
    (this.Wfo = void 0),
      (this.IsTeamReady = !0),
      this.LoadTeamPromise?.SetResult(!0),
      (this.LoadTeamPromise = void 0),
      this.npo(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("SceneTeam", 49, "刷新出战编队，结束");
  }
  npo() {
    const e = this.CurrentGroupType;
    if (e && !SceneTeamDefine_1.innerGroupType.includes(e)) {
      if (!ModelManager_1.ModelManager.GameModeModel.IsMulti && e === 1) {
        const t = this.tpo ?? [];
        const r = [];
        for (const a of this.GetTeamItems()) r.push(a.GetConfigId);
        for (let e = 0; e < SceneTeamDefine_1.SCENE_TEAM_MAX_NUM; e++) {
          const o = t[e];
          const i = r[e];
          o !== i &&
            (o &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.RedDotRoleChange,
                o,
              ),
            i) &&
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RedDotRoleChange,
              i,
            );
        }
        this.tpo = r;
      }
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnUpdateSceneTeam,
      ),
        GlobalData_1.GlobalData.GameInstance &&
          GlobalData_1.GlobalData.BpEventManager.当编队更新时.Broadcast();
    }
  }
  AddEntity(e) {
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti) {
      e = e.Entity.GetComponent(0);
      if (e.GetEntityType() === Protocol_1.Aki.Protocol.HBs.Proto_Player) {
        let t;
        let r;
        const o = e.GetCreatureDataId();
        const i = ModelManager_1.ModelManager.CreatureModel;
        for (const a of this.GetTeamItems())
          o === a.GetCreatureDataId() &&
            ((t = i.GetEntity(o)?.Entity),
            (r = i.GetScenePlayerData(a.GetPlayerId())?.IsRemoteSceneLoading()),
            t && r) &&
            ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
              t,
              !1,
              "模拟端加载中，暂时隐藏实体",
            );
        if (ModelManager_1.ModelManager.SceneTeamModel.IsTeamReady)
          for (const n of this.PPr)
            if (n.GetCreatureDataId() === o) {
              Log_1.Log.CheckInfo() &&
                Log_1.Log.Info("SceneTeam", 49, "更新联机场景队伍"),
                n.UpdateEntityHandle(),
                this.npo();
              break;
            }
      }
    }
  }
  get GetCurrentTeamItem() {
    return this.Ywi;
  }
  get GetCurrentEntity() {
    return this.Ywi?.EntityHandle;
  }
  GetTeamLength() {
    return this.PPr.length;
  }
  GetTeamPlayerSize() {
    return this.epo.size;
  }
  GetTeamItem(e, t) {
    for (const r of this.PPr) if (this.spo(r, e, t)) return r;
  }
  spo(e, t, r) {
    if (r.OnlyMyRole && !e.IsMyRole()) return !1;
    if (r.IsControl && !e.IsControl()) return !1;
    switch (r.ParamType) {
      case 0:
        return e.GetConfigId === t;
      case 1:
        return e.EntityHandle?.Id === t;
      case 2:
        return e.GetPlayerId() === t;
      case 3:
        return e.GetCreatureDataId() === t;
      default:
        return !1;
    }
  }
  GetTeamItems(e = !1) {
    const t = [];
    for (const r of this.PPr) (e && !r.IsMyRole()) || t.push(r);
    return t;
  }
  GetTeamItemsByPlayer(e) {
    const t = [];
    for (const r of this.PPr) r.GetPlayerId() === e && t.push(r);
    return t;
  }
  GetTeamEntities(e = !1) {
    let t;
    const r = [];
    for (const o of this.PPr)
      (e && !o.IsMyRole()) || ((t = o.EntityHandle) && r.push(t));
    return r;
  }
  GetAllGroupEntities(e) {
    const t = [];
    var e = this.zfo.get(e);
    if (e) {
      const r = ModelManager_1.ModelManager.CreatureModel;
      for (const i of e.GetGroupList())
        for (const a of i.GetRoleList()) {
          const o = r.GetEntity(a.CreatureDataId);
          o?.IsInit && t.push(o);
        }
    }
    return t;
  }
  GetTeamItemsInRange(e, t) {
    let r;
    const o = [];
    const i = t * t;
    for (const a of this.PPr)
      a.EntityHandle?.Entity &&
        (r = ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
          a.GetPlayerId(),
        )?.GetLocation()) &&
        Vector_1.Vector.DistSquared(e, r) <= i &&
        o.push(a);
    return o;
  }
  ChangeRole(e, t, r = 0, o = !1, i = !1) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info("SceneTeam", 49, "开始切换角色", ["CreatureDataId", e]);
    const a = this.GetTeamItem(e, { ParamType: 3 });
    if (a && a.IsMyRole())
      if (!i && a.IsDead())
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneTeam", 49, "角色已经死亡", [
            "CreatureDataId",
            e,
          ]);
      else {
        let n;
        var i = this.GetCurrentTeamItem;
        const s = i?.EntityHandle;
        const l = a.EntityHandle;
        if (l)
          return (
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info("SceneTeam", 49, "角色上阵", [
                "CreatureDataId",
                e,
              ]),
            (n = ModelManager_1.ModelManager.PlayerInfoModel.GetId()),
            ModelManager_1.ModelManager.CreatureModel.GetScenePlayerData(
              n,
            )?.ControlRole(a.GetCreatureDataId()),
            this.zfo
              .get(n)
              ?.GetCurrentGroup()
              ?.SetCurrentRole(a.GetCreatureDataId()),
            Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "SceneTeam",
                49,
                "替换队伍当前角色",
                ["LastEntity", s?.Id],
                ["NewEntity", l.Id],
              ),
            (this.Ywi = a),
            RoleTeamComponent_1.RoleTeamComponent.OnChangeRole(s, l, t, r, o),
            s &&
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnRoleGoDown,
                s.Id,
              ),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.OnChangeRole,
              l,
              s,
            ),
            i
          );
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("SceneTeam", 49, "角色实体无效", [
            "CreatureDataId",
            e,
          ]);
      }
    else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("SceneTeam", 49, "队伍实例不存在或非本机角色", [
          "CreatureDataId",
          e,
        ]);
  }
  OtherPlayerChangeRole(e, t) {
    this.zfo.get(e)?.GetCurrentGroup()?.SetCurrentRole(t);
  }
  RefreshLastTransform() {
    let e = this.GetCurrentEntity;
    e?.Valid
      ? (e = CharacterController_1.CharacterController.GetActor(e))?.IsValid()
        ? ((e = e.GetTransform()),
          (this.ipo = e),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("SceneTeam", 8, "刷新上一个角色的位置信息成功", [
              "transform",
              e.ToString(),
            ]))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "SceneTeam",
            8,
            "刷新上一个角色的位置信息时，当前角色Actor已失效",
          )
      : Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "SceneTeam",
          8,
          "刷新上一个角色的位置信息时，当前角色实体已失效",
        );
  }
  SetLastTransform(e) {
    this.ipo = e;
  }
  GetSpawnTransform() {
    let r = this.ipo;
    if (r) return r;
    r = this.GetCurrentEntity;
    if (r?.Valid) return r.Entity.GetComponent(3).Actor.GetTransform();
    r = GlobalData_1.GlobalData.World;
    if (r) {
      let e = void 0;
      let t = void 0;
      var o =
        UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TestSceneLoadBornMode();
      var o =
        (o === 0
          ? ((e =
              UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempLocation.ToUeVector()),
            ((t =
              UiBlueprintFunctionLibrary_1.UiBlueprintFunctionLibrary.TempRotator.ToUeRotator()).Roll =
              0),
            (t.Pitch = 0))
          : o === 1 &&
            ((o = (0, puerts_1.$ref)(void 0)),
            UE.GameplayStatics.GetAllActorsOfClass(
              r,
              UE.PlayerStart.StaticClass(),
              o,
            ),
            (r = (0, puerts_1.$unref)(o).Get(0).GetTransform()),
            (e = r.GetLocation()),
            (t = r.Rotator())),
        UE.KismetMathLibrary.MakeTransform(e, t, new UE.Vector(1, 1, 1)));
      return o;
    }
  }
  IsAllDid() {
    for (const e of this.PPr) if (!e.IsDead()) return !1;
    return !0;
  }
  IsAnyRoleDead() {
    for (const e of this.PPr) if (e.IsDead()) return !0;
    return !1;
  }
  InitializeOfflineSceneTeam(e, t, r) {
    if (UE.Actor.GetKuroNetMode() !== 1) {
      const o = [
        ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
        ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
        ControllerHolder_1.ControllerHolder.CreatureController.GenUniqueId(),
      ];
      const i = 100003;
      const a = [e > 0 ? e : i, t > 0 ? t : i, r > 0 ? r : i];
      const n = this.GetSpawnTransform();
      if (n) {
        const m = [];
        const s = a.length;
        let t = s;
        for (let e = 1; e <= s; ++e) {
          const l = o[e - 1];
          const c = ModelManager_1.ModelManager.CreatureModel.GetPlayerId();
          const _ = a[e - 1];
          let h = Protocol_1.Aki.Protocol.fqs.create();
          (h.Ekn = MathUtils_1.MathUtils.NumberToLong(l)),
            (h.M3n = WorldGlobal_1.WorldGlobal.ToTsVector(n.GetLocation())),
            (h.S3n = WorldGlobal_1.WorldGlobal.ToTsRotator(
              n.GetRotation().Rotator(),
            )),
            (h.d4n = !0),
            (h.aFn = ModelManager_1.ModelManager.CreatureModel.GetPlayerId()),
            (h.cVn = Protocol_1.Aki.Protocol.HBs.Proto_Player),
            (h.mVn = Protocol_1.Aki.Protocol.USs.Proto_Character),
            (h.R5n = a[e - 1]);
          const f =
            ControllerHolder_1.ControllerHolder.CreatureController.CreateEntity(
              h,
            );
          h = new SceneTeamData_1.SceneTeamRole();
          (h.CreatureDataId = l),
            (h.RoleId = _),
            m.push(h),
            ControllerHolder_1.ControllerHolder.CreatureController.LoadEntityAsync(
              f,
              (e) => {
                e &&
                  (t--,
                  (e = f?.Entity) &&
                    (e.CheckGetComponent(81)?.SetTeamTag(2),
                    ControllerHolder_1.ControllerHolder.CreatureController.SetEntityEnable(
                      e,
                      !1,
                      "InitOfflineTeam",
                    )),
                  t === 0) &&
                  (this.UpdateGroup({
                    PlayerId: c,
                    GroupType: 1,
                    GroupRoleList: m,
                    CurrentRoleId: m[0].RoleId,
                  }),
                  this.SwitchGroup(c, 1));
              },
            );
        }
      } else
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "SceneTeam",
            49,
            "初始化失败队伍失败，GetSpawnTransform为空。",
          );
    }
  }
}
exports.SceneTeamModel = SceneTeamModel;
// # sourceMappingURL=SceneTeamModel.js.map
