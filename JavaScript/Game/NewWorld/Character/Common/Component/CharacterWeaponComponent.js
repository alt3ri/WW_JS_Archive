"use strict";
const __decorate =
  (this && this.__decorate) ||
  function (t, i, e, s) {
    let h;
    const o = arguments.length;
    let r =
      o < 3 ? i : s === null ? (s = Object.getOwnPropertyDescriptor(i, e)) : s;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
      r = Reflect.decorate(t, i, e, s);
    else
      for (let a = t.length - 1; a >= 0; a--)
        (h = t[a]) && (r = (o < 3 ? h(r) : o > 3 ? h(i, e, r) : h(i, e)) || r);
    return o > 3 && r && Object.defineProperty(i, e, r), r;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterWeaponComponent = void 0);
const UE = require("ue");
const AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent");
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext");
const EffectSystem_1 = require("../../../../Effect/EffectSystem");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const WeaponController_1 = require("../../../../Module/Weapon/WeaponController");
const CharacterNameDefines_1 = require("../CharacterNameDefines");
const CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes");
const CharacterWeaponMesh_1 = require("./Weapon/CharacterWeaponMesh");
const KEEP_WEAPON_OUT_THREADHOLD = 0.1;
const WEAPON_IN_DELAY = 100;
const HIDE_WEAPON_AFTER_WEAPON_IN_DELAY = 1e3;
const BASE_GLIDING_ID = 20010001;
const glideRelativeRotator = new UE.Rotator(0, 90, -90);
const HULU_BASE_ID = 2e7;
const HULU_PARTY_ID = 1e5;
class HideWeaponOrder {
  constructor(t, i, e, s = !0, h = 0) {
    (this.Index = 0),
      (this.Hide = !1),
      (this.WithEffect = !1),
      (this.NormaState = !0),
      (this.ExtraType = 0),
      (this.Index = t),
      (this.Hide = i),
      (this.WithEffect = e),
      (this.NormaState = s),
      (this.ExtraType = h);
  }
}
class WeaponEquipInfo {
  constructor() {
    (this.WeaponId = 0),
      (this.WeaponConfig = void 0),
      (this.WeaponBreachLevel = 0);
  }
  SetData(t) {
    if (!t.Dps && !t.QMs)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            58,
            "[武器组件]获取武器配置失败 pb",
            ["weaponId", t.Dps ?? void 0],
            ["WeaponBreachLevel", t.QMs ?? void 0],
          ),
        !1
      );
    if (this.WeaponId !== t.Dps) {
      this.WeaponId = t.Dps;
      const i =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
          this.WeaponId,
        );
      if (!i)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 58, "[武器组件]获取武器配置失败", [
              "weaponId",
              this.WeaponId,
            ]),
          !1
        );
      this.WeaponConfig = i;
    }
    return (this.WeaponBreachLevel = t.QMs), !0;
  }
}
let CharacterWeaponComponent = class CharacterWeaponComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.oRe = void 0),
      (this.Lie = void 0),
      (this.Hulu = void 0),
      (this.uQr = 0),
      (this.HuluHideEffect = 0),
      (this.Paragliding = void 0),
      (this.ParaglidingIsOpen = !1),
      (this.ParaglidingIsHover = !1),
      (this.ParaglidingIsAscent = !1),
      (this.cQr = -1),
      (this.mQr = void 0),
      (this.dQr = 0),
      (this.CQr = 0),
      (this.gQr = void 0),
      (this.fQr = void 0),
      (this.XHt = !1),
      (this.pQr = !1),
      (this.vQr = new Array()),
      (this.AiItemMarkId = 0),
      (this.AiWeaponConfigId = 0),
      (this.CacheAiSocketItem = void 0),
      (this.MQr = void 0),
      (this.SQr = void 0),
      (this.EQr = 0),
      (this.yQr = 0),
      (this.IQr = void 0),
      (this.TQr = void 0),
      (this.LQr = void 0),
      (this.DQr = void 0),
      (this.RQr = 0),
      (this.AQr = void 0),
      (this.UQr = void 0),
      (this.PQr = void 0),
      (this.xQr = void 0),
      (this.wQr = Vector_1.Vector.Create()),
      (this.BQr = void 0),
      (this.bQr = 10),
      (this.qQr = !0),
      (this.WeaponEquipInfo = void 0),
      (this.GQr = (t, i) => {
        this.SetWeaponVisibleByTag(i, t, !0);
      }),
      (this.NQr = (t, i) => {
        this.SetWeaponVisibleByTag(i, t, !1);
      }),
      (this.W3r = (t, i, e) => {
        let s;
        (t?.Valid
          ? ((s = t.GetComponent(69)),
            this.OQr(),
            this.CheckAndHangWeapons(!1),
            i === 0 || e
              ? (this.kQr(0),
                this.SyncParagliding(s),
                (i = t.GetComponent(185)).HasTag(this.yQr) &&
                  !this.Lie.HasTag(this.yQr) &&
                  (i.RemoveTag(this.yQr), this.Lie.AddTag(this.yQr)),
                s)
              : (this.kQr(0), this))
          : this
        ).OpenParagliding(!1);
      }),
      (this.FQr = (t, i) => {
        !i ||
          this.ParaglidingIsOpen ||
          this.Entity.GetComponent(158).MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Glide ||
          this.OpenParagliding(!0);
      }),
      (this.VQr = (t, i) => {
        !i &&
          this.ParaglidingIsOpen &&
          ((i = EffectSystem_1.EffectSystem.SpawnEffect(
            this.Hte.Actor,
            this.Hte.Actor.Mesh.GetSocketTransform(
              CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
              1,
            ),
            "/Game/Aki/Effect/EffectGroup/Common/DA_Fx_Group_Huaxiang_End.DA_Fx_Group_Huaxiang_End",
            "[CharacterWeaponComponent.OnGlidingChanged]",
            new EffectContext_1.EffectContext(this.Entity.Id),
          )),
          EffectSystem_1.EffectSystem.IsValid(i) &&
            (i = EffectSystem_1.EffectSystem.GetEffectActor(i)) &&
            i.IsValid() &&
            i.K2_AttachToComponent(
              this.Paragliding,
              FNameUtil_1.FNameUtil.EMPTY,
              0,
              0,
              0,
              !1,
            ),
          this.OpenParagliding(!1),
          this.Lie.RemoveTag(this.yQr));
      }),
      (this.HQr = (t, i) => {
        this.ParaglidingIsHover = i;
        const e = this.Paragliding.GetAnimInstance();
        e && e.SetHover(i);
      }),
      (this.z3r = (t, i) => {
        this.Hte.IsMoveAutonomousProxy &&
          i === CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
          t !== i &&
          this.ReceiveCharacterKnockUpDropWeapon();
      }),
      (this.jQr = (t, i) => {
        i
          ? EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) ||
            ((i = ModelUtil_1.ModelUtil.GetModelConfig(this.uQr)),
            this.kQr(0),
            (this.HuluHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(
              this.Hte.Actor,
              this.Hte.Actor.Mesh.GetSocketTransform(
                CharacterNameDefines_1.CharacterNameDefines
                  .HULU_EFFECT_SOCKET_NAME,
                1,
              ),
              i.DA.AssetPathName?.toString(),
              "[CharacterWeaponComponent.OnHuluHandEffectShowChanged]",
              new EffectContext_1.EffectContext(this.Entity.Id),
            )),
            EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) &&
              (i = EffectSystem_1.EffectSystem.GetEffectActor(
                this.HuluHideEffect,
              )) &&
              i.IsValid() &&
              i.K2_AttachToComponent(
                this.Hte.Actor.Mesh,
                CharacterNameDefines_1.CharacterNameDefines
                  .HULU_EFFECT_SOCKET_NAME,
                2,
                2,
                2,
                !1,
              ))
          : (EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) &&
              (EffectSystem_1.EffectSystem.StopEffectById(
                this.HuluHideEffect,
                "[CharacterWeaponComponent.OnHuluHandEffectShowChanged]",
                !0,
              ),
              (this.HuluHideEffect = 0)),
            this.Lie.HasTag(-1775045118) || this.SetHuluHidden(!1));
      }),
      (this.WQr = (t, i) => {
        i
          ? (this.kQr(1), this.SetHuluHidden(!1, !1))
          : (this.kQr(0), this.SetHuluHidden(!1));
      }),
      (this.KQr = (t, i) => {
        switch (this.RQr) {
          case 0:
            this.SetHuluHidden(i, !0, !0);
            break;
          case 1:
            this.SetHuluHidden(i, !1);
        }
      }),
      (this.QQr = new Set()),
      (this.XQr = (t, i) => {
        i ? this.QQr.add(t) : this.QQr.delete(t);
      }),
      (this.$Qr = () => {
        this.YQr();
      });
  }
  static get Dependencies() {
    return [3];
  }
  get BPr() {
    return this.cQr;
  }
  set BPr(t) {
    this.cQr !== t &&
      ((this.cQr = t), this.Lie) &&
      (t === 0
        ? this.Lie.HasTag(-2075724632) || this.Lie.AddTag(-2075724632)
        : this.Lie.HasTag(-2075724632) && this.Lie.RemoveTag(-2075724632));
  }
  SetParaglidingIsAscent(t) {
    this.ParaglidingIsAscent = t;
    const i = this.Paragliding.GetAnimInstance();
    i && i.SetDash(t);
  }
  OnInitData() {
    return (
      (this.BQr = new UE.Transform()),
      (this.WeaponEquipInfo = new WeaponEquipInfo()),
      !0
    );
  }
  OnInit() {
    return !0;
  }
  OnStart() {
    if (
      ((this.Hte = this.Entity.CheckGetComponent(3)),
      (this.oRe = this.Entity.GetComponent(160)),
      (this.Lie = this.Entity.GetComponent(185)),
      (this.XHt =
        this.Hte.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.HBs.Proto_Player),
      (this.pQr =
        this.XHt ||
        this.Hte.CreatureData.GetBaseInfo()?.Category.MonsterMatchType === 4),
      (this.EQr = 0),
      (this.AiItemMarkId = 0),
      !this.Hte)
    )
      return !1;
    if ((this.JQr(), this.zQr(), this.ZQr(), this.XHt)) {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.W3r,
      ),
        (this.yQr = 1905601506),
        (this.IQr = this.Lie.ListenForTagAddOrRemove(this.yQr, this.FQr)),
        (this.TQr = this.Lie.ListenForTagAddOrRemove(262865373, this.VQr)),
        (this.LQr = this.Lie.ListenForTagAddOrRemove(921953316, this.HQr)),
        (this.UQr = this.Lie.ListenForTagAddOrRemove(-1660069905, this.jQr)),
        (this.AQr = this.Lie.ListenForTagAddOrRemove(507209871, this.WQr)),
        (this.PQr = this.Lie.ListenForTagAddOrRemove(-1775045118, this.KQr)),
        this.eXr(),
        this.InitWeaponVisibleData(),
        this.d8s();
      for (const t of this.mQr.CharacterWeapons) this.tXr(t, !0, !1);
    }
    return !0;
  }
  OnTick(t) {
    this.pQr && this.CheckAndHangWeapons(!0);
    for (const e of this.vQr) {
      var i;
      if (e.Index < 0)
        for (const s of this.mQr.CharacterWeapons)
          e.NormaState ||
            s.VisibleHelper.EnableHiddenInGameByExtraVisibleType(
              e.ExtraType,
              !0,
            ),
            this.tXr(s, e.Hide, e.WithEffect, e.NormaState, e.ExtraType);
      else
        e.Index < this.mQr.CharacterWeapons.length
          ? ((i = this.mQr.CharacterWeapons[e.Index]),
            e.NormaState ||
              i.VisibleHelper.EnableHiddenInGameByExtraVisibleType(
                e.ExtraType,
                !0,
              ),
            this.tXr(i, e.Hide, e.WithEffect, e.NormaState, e.ExtraType))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              6,
              "隐藏武器选择了错误的武器序号",
              ["index", e.Index],
              ["BP", this.Hte.Actor.GetName()],
            );
    }
    if ((this.vQr.length = 0) === this.BPr && this.QQr.size > 0)
      for (const h of this.mQr.CharacterWeapons) this.tXr(h, !0, !0);
    this.iXr(t), this.oXr(), this.rXr();
  }
  OnClear() {
    this.ClearWeaponVisibleData(),
      this.mQr?.Destroy(),
      (this.mQr = void 0),
      EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.HuluHideEffect,
          "[CharacterWeaponComponent.OnClear]",
          !0,
        ),
        (this.HuluHideEffect = 0)),
      this.gQr &&
        (TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
      this.fQr &&
        (TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
      this.XHt
        ? (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.RoleOnStateInherit,
            this.W3r,
          ),
          this.IQr.EndTask(),
          this.TQr.EndTask(),
          this.LQr.EndTask(),
          (this.IQr = void 0),
          (this.TQr = void 0),
          (this.LQr = void 0),
          this.UQr.EndTask(),
          (this.UQr = void 0),
          this.PQr.EndTask(),
          (this.PQr = void 0),
          this.AQr.EndTask(),
          (this.AQr = void 0),
          this.DQr.forEach((t) => {
            t.EndTask();
          }),
          (this.DQr = []))
        : (this.ClearWeaponForAi(), (this.AiWeaponConfigId = 0));
    const t = this.Paragliding?.GetAnimInstance();
    return (
      t?.DebugDestructText &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Role", 6, "Paragliding OnClear", [
            "DebugDesturctText",
            t.DebugDestructText,
          ]),
        (t.DebugDestructText = "")),
      !0
    );
  }
  eXr() {
    this.Lie.HasTag(this.yQr) && this.OpenParagliding(!0);
  }
  JQr() {
    this.mQr = new CharacterWeaponMesh_1.CharacterWeaponMesh();
    let t;
    const i = this.Hte.Actor.K2_GetComponentsByClass(
      UE.MeshComponent.StaticClass(),
    );
    const e = new Array();
    for (let t = 0; t < i.Num(); ++t) {
      const s = i.Get(t);
      s instanceof UE.SkeletalMeshComponent &&
        s.GetName().startsWith("WeaponCase") &&
        (e.push(s), (s.bAbsoluteScale = !1));
    }
    this.XHt
      ? ((t = this.Entity.GetComponent(0).GetRoleConfig().WeaponScale),
        this.wQr.Set(t[0], t[1], t[2]),
        this.BQr.SetScale3D(this.wQr.ToUeVector()))
      : this.wQr.Set(1, 1, 1),
      this.mQr.Init(e, this.Hte.Actor.Mesh, this.Hte.Actor, !1),
      this.mQr.CharacterWeapons.length > 0 &&
        (this.XHt
          ? (this.nXr(), this.EquipWeaponForRole(), this.sXr())
          : this.pQr &&
            (this.nXr(),
            this.sXr(),
            this.wQr.FromUeVector(
              this.mQr?.CharacterWeapons[0].Mesh.RelativeScale3D,
            ))),
      this.XHt || this.aXr();
  }
  nXr() {
    const t = this.Entity.GetComponent(0).GetModelConfig();
    const i = t.NormalSockets;
    const e = t.BattleSockets;
    i.Num() !== e.Num() &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Character",
        58,
        "角色设置武器失败,两种类型槽位数量不统一",
        ["Id", this.Hte.Actor.GetName()],
        ["ModelId", t.ID],
      ),
      (i.Num() > this.mQr.CharacterWeapons.length ||
        e.Num() > this.mQr.CharacterWeapons.length) &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            58,
            "角色设置武器失败,角色蓝图武器组件少于武器数量配置",
            ["Id", this.Hte.Actor.GetName()],
            ["ModelId", t.ID],
          ),
        this.mQr.ChangeCharacterWeapons(i.Num()));
    let s = 0;
    for (const h of this.mQr.CharacterWeapons)
      (h.NormalSocket = FNameUtil_1.FNameUtil.GetDynamicFName(i.Get(s))),
        (h.BattleSocket = FNameUtil_1.FNameUtil.GetDynamicFName(e.Get(s))),
        ++s;
  }
  sXr() {
    this.BPr = 0;
    for (const t of this.mQr.CharacterWeapons)
      this.X9o(t, t.NormalSocket, this.BQr, !1);
    this.HideWeapon(-1, !0, !1), (this.fQr = void 0);
  }
  aXr() {
    this.hXr();
    let t = this.Hte.CreatureData?.ComponentDataMap.get("Kvs");
    t &&
      ((t = t.Kvs?.Dps)
        ? (this.RegisterCharacterDropWeaponEvent(t),
          this.ChangeWeaponByWeaponByConfigId(t))
        : ((this.BPr = -1), this.WeaponIn(!1)));
  }
  ZQr() {
    let t;
    this.XHt &&
      ((t = this.Hte.Actor.AddComponentByClass(
        UE.SkeletalMeshComponent.StaticClass(),
        !1,
        MathUtils_1.MathUtils.DefaultTransform,
        !1,
        CharacterNameDefines_1.CharacterNameDefines.PARAGLIDING_MESH_COMP_NAME,
      )).K2_AttachToComponent(
        this.Hte.Actor.Mesh,
        CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
        0,
        0,
        0,
        !0,
      ),
      (this.Paragliding = t),
      this.SetNewParagliding(BASE_GLIDING_ID),
      this.Paragliding.K2_SetRelativeLocation(
        Vector_1.Vector.ZeroVectorProxy.ToUeVector(),
        !1,
        void 0,
        !1,
      ),
      this.Paragliding.K2_SetRelativeRotation(
        glideRelativeRotator,
        !1,
        void 0,
        !1,
      ),
      this.Paragliding.SetWorldScale3D(
        Vector_1.Vector.OneVectorProxy.ToUeVector(),
      ),
      this.lXr(!0),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Weapon",
        58,
        "加载滑翔伞",
        ["location", this.Paragliding?.K2_GetComponentLocation()?.ToString()],
        ["characterLocation", this.Hte?.ActorLocation?.ToString()],
      );
  }
  lXr(t) {
    (this.ParaglidingIsOpen = !t),
      TimerSystem_1.TimerSystem.Next(() => {
        this.Paragliding.SetHiddenInGame(!this.ParaglidingIsOpen);
      });
  }
  OpenParagliding(t) {
    let i;
    (this.ParaglidingIsOpen = t),
      this.Paragliding &&
        ((i = this.Paragliding.GetAnimInstance())
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Weapon",
                58,
                "打开滑翔伞",
                ["bOpen", t],
                [
                  "location",
                  this.Paragliding?.K2_GetComponentLocation()?.ToString(),
                ],
                ["characterLocation", this.Hte?.ActorLocation?.ToString()],
              ),
            this.Hte &&
              (t
                ? AudioSystem_1.AudioSystem.PostEvent(
                    "play_role_com_paragliding_open",
                    this.Hte.Actor,
                  )
                : AudioSystem_1.AudioSystem.PostEvent(
                    "play_role_com_paragliding_close",
                    this.Hte.Actor,
                  )),
            i.SetOpenParagliding(t),
            i.SyncAnimStates(void 0),
            this.lXr(!t),
            t || UE.KuroAnimLibrary.EndAnimNotifyStates(i))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Weapon", 58, "打开滑翔伞: 异步未加载完成返回"));
  }
  SetNewParagliding(t) {
    const i = ModelUtil_1.ModelUtil.GetModelConfig(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(
      i.网格体.ToAssetPathName(),
      UE.SkeletalMesh,
      (e) => {
        this.Paragliding.SetSkeletalMesh(e, !1),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            i.动画蓝图.ToAssetPathName(),
            UE.Class,
            (t) => {
              this.Paragliding.SetAnimClass(t),
                this.ParaglidingIsOpen && this.OpenParagliding(!0);
              const i = this.Paragliding.GetAnimInstance();
              i
                ? ((i.DebugDestructText =
                    `Owner: ${this.Hte?.Owner?.GetName()}, Self: ${this.Paragliding?.GetName()} entityId: ${this.Entity.Id} pbDataId: ` +
                    this.Hte?.CreatureData.GetPbDataId()),
                  Log_1.Log.CheckWarn() &&
                    Log_1.Log.Warn("Test", 6, i.DebugDestructText))
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error(
                    "Test",
                    6,
                    "SetNewParagliding Error!",
                    ["Mesh", e?.GetName()],
                    ["NewClass", t?.GetName()],
                  );
            },
          );
      },
    );
  }
  SyncParagliding(t) {
    this.lXr(!t.ParaglidingIsOpen), t.lXr(!0);
    t = t.Paragliding.GetAnimInstance();
    this.Paragliding.GetAnimInstance()?.SyncAnim(t),
      t?.SyncAnim(void 0),
      UE.KuroAnimLibrary.EndAnimNotifyStates(t);
  }
  zQr() {
    let t;
    this.XHt &&
      ((this.HuluHideEffect = 0),
      (this.xQr = void 0),
      (t = this.Entity.GetComponent(0)),
      (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        t.GetRoleId(),
      )),
      this._Xr(t.PartyId, 1));
  }
  _Xr(t, i) {
    this.Hulu
      ? this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(6)
      : ((s = this.Hte.Actor.AddComponentByClass(
          UE.SkeletalMeshComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
          CharacterNameDefines_1.CharacterNameDefines.HULU_MESH_COMP_NAME,
        )).K2_AttachToComponent(
          this.Hte.Actor.Mesh,
          CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME,
          0,
          0,
          0,
          !0,
        ),
        (this.Hulu = s),
        this.kQr(0));
    const e = t * HULU_PARTY_ID + HULU_BASE_ID + i;
    var s = ModelUtil_1.ModelUtil.GetModelConfig(e);
    s
      ? ResourceSystem_1.ResourceSystem.LoadAsync(
          s.网格体.ToAssetPathName(),
          UE.SkeletalMesh,
          (t) => {
            t
              ? ((this.uQr = e),
                this.Hulu.SetSkeletalMesh(t),
                this.Hte.Actor.CharRenderingComponent.AddComponentByCase(
                  6,
                  this.Hulu,
                ))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Character", 58, "该葫芦Id没有配置网格体", [
                  "Id",
                  e,
                ]);
          },
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 58, "该葫芦Id没有配置Config", ["Id", e]);
  }
  kQr(e) {
    if (e !== this.RQr) {
      let t = void 0;
      let i = FNameUtil_1.FNameUtil.EMPTY;
      switch (e) {
        case 0:
          (i = CharacterNameDefines_1.CharacterNameDefines.HULU_SOCKET_NAME),
            (t = this.Hte.Actor.Mesh);
          break;
        case 1:
          (i =
            CharacterNameDefines_1.CharacterNameDefines
              .HULU_GLIDEING_SOCKET_NAME),
            (t = this.Paragliding);
      }
      this.Hulu.K2_AttachToComponent(t, i, 0, 0, 0, !0), (this.RQr = e);
    }
  }
  GetHuluId() {
    return this.uQr;
  }
  SetHuluHidden(t, i = !0, e = !1) {
    (e && this.Hulu.bHiddenInGame === t) ||
      (!i || t
        ? (this.xQr &&
            this.xQr >= 0 &&
            (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
              this.xQr,
            ),
            (this.xQr = void 0)),
          this.Hulu.SetHiddenInGame(t))
        : (this.xQr &&
            this.xQr >= 0 &&
            (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
              this.xQr,
            ),
            (this.xQr = void 0)),
          this.Hulu.SetHiddenInGame(!0),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart",
            UE.PD_CharacterControllerData_C,
            (t) => {
              this.RQr !== 1 &&
                ((this.xQr =
                  this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                    t,
                  )),
                this.Hulu.SetHiddenInGame(!1));
            },
          )));
  }
  hXr() {
    this.AiWeaponConfigId = 0;
  }
  ClearWeaponForAi() {
    (this.BPr = 0),
      this.mQr?.ChangeCharacterWeapons(0),
      (this.AiItemMarkId = 0),
      this.UnRegisterCharacterDropWeaponEvent();
  }
  ChangeWeaponByWeaponByConfigId(t) {
    const i =
      ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
        t,
        this.Entity,
      );
    i
      ? this.ChangeWeaponByWeaponSocketItem(i)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          58,
          "Ai改变武器失败,原因Config配置错误",
          ["Id", this.Hte.Actor.GetName()],
          ["Char", this.Hte.Actor.GetName()],
          ["Item config id", t],
        );
  }
  ChangeWeaponByWeaponSocketItem(t) {
    this.OldWeaponHidden(),
      (this.BPr = 1),
      (this.MQr = t),
      this.gQr &&
        (TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0));
    t = this.mQr.ChangeCharacterWeapons(this.MQr.Meshes.Num());
    this.Hte.Actor.CharRenderingComponent.Init(this.Hte.Actor.RenderType);
    let i = 0;
    for (const s of t) {
      const e = this.MQr.Meshes.Get(i);
      const h = s.Mesh;
      const o = this.MQr.WeaponEffectPath.AssetPathName?.toString();
      const r = e.AnimInstanceSoftPtr.ToAssetPathName();
      h instanceof UE.SkeletalMeshComponent &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e.MeshSoftPtr.ToAssetPathName(),
          UE.SkeletalMesh,
          (t) => {
            h.SetSkeletalMesh(t),
              r &&
                r !== "" &&
                ResourceSystem_1.ResourceSystem.LoadAsync(r, UE.Class, (t) => {
                  h.SetAnimClass(t);
                }),
              o &&
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  o,
                  UE.PD_CharacterControllerData_C,
                  (t) => {
                    s.BattleEffectId =
                      this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                        t,
                      );
                  },
                );
          },
        ),
        (s.WeaponHidden = !1),
        (s.BattleEffectId = void 0),
        (s.BattleSocket = e.SocketName),
        ++i;
    }
    this.WeaponOutInternal(0),
      (this.MQr = void 0),
      (this.SQr = void 0),
      this.SQr &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 58, "Ai改变武器失败,Config没有被清理", [
          "Id",
          this.SQr,
        ]);
  }
  EquipWeaponForRole() {
    const t = this.Entity.GetComponent(0).ComponentDataMap.get("ips")?.ips;
    return !!t && this.EquipWeaponForRoleByWeaponComponent(t);
  }
  EquipWeaponForRoleByWeaponComponent(t) {
    if (!this.WeaponEquipInfo.SetData(t))
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            6,
            "[武器组件]获取武器配置失败 pb",
            ["Character", this.Hte?.Actor.GetName()],
            ["ConfigId", this.Hte?.CreatureData.GetRoleId()],
            ["weaponId", t.Dps ?? void 0],
            ["WeaponBreachLevel", t.QMs ?? void 0],
          ),
        !1
      );
    t = this.WeaponEquipInfo.WeaponConfig;
    if (!t) return !1;
    const i = t.Models;
    if (
      ((this.qQr = t.HiddenTime > 0),
      (this.bQr = t.HiddenTime),
      i.length !== this.mQr.CharacterWeapons.length)
    )
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            58,
            "角色配置武器失败 蓝图武器component数量与配置数量不配置",
            ["Id", this.SQr],
            ["ModelIds", i],
          ),
        !1
      );
    let h = 1;
    for (let t = 0; t < this.EQr; ++t)
      this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(h), (h += 1);
    let e = 0;
    for (const o of i) {
      const r = this.mQr.CharacterWeapons[e].Mesh;
      if (r instanceof UE.SkeletalMeshComponent) {
        const h = 1 + e;
        const a = ModelUtil_1.ModelUtil.GetModelConfig(o);
        a &&
          (ResourceSystem_1.ResourceSystem.LoadAsync(
            a.网格体.ToAssetPathName(),
            UE.SkeletalMesh,
            (t) => {
              if (t) {
                const i = r.GetNumMaterials();
                for (let t = 0; t < i; ++t) r.SetMaterial(t, void 0);
                const e = t.Materials;
                const s = e.Num();
                r.SetSkeletalMesh(t);
                for (let t = 0; t < s; ++t)
                  r.SetMaterial(t, e.Get(t).MaterialInterface);
                (t = a.动画蓝图.ToAssetPathName()),
                  (t =
                    (t && t !== ""
                      ? ResourceSystem_1.ResourceSystem.LoadAsync(
                          t,
                          UE.Class,
                          (t) => {
                            t && r.SetAnimClass(t);
                          },
                        )
                      : Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Character",
                          58,
                          "[武器组件]角色读取配置武器蓝图失败",
                          ["ModelId", o],
                          ["基础动画蓝图", a.动画蓝图.ToAssetPathName()],
                        ),
                    this.Hte.Actor.CharRenderingComponent.AddComponentByCase(
                      h,
                      r,
                    ),
                    a.DA.AssetPathName?.toString()));
                t &&
                  t !== "" &&
                  ResourceSystem_1.ResourceSystem.LoadAsync(
                    t,
                    UE.PD_WeaponLevelMaterialDatas_C,
                    (t) => {
                      t &&
                        WeaponController_1.WeaponController.ApplyWeaponLevelMaterial(
                          r,
                          t,
                          this.WeaponEquipInfo.WeaponBreachLevel,
                        );
                    },
                  );
              }
            },
          ),
          ++e);
      }
    }
    return (this.EQr = e), !0;
  }
  OnEquipWeaponForRoleNotify(t) {
    this.EquipWeaponForRoleByWeaponComponent(t.ips);
  }
  CheckAndHangWeapons(t) {
    this.BPr === 0
      ? this.Lie.HasTag(-1348147833) && this.WeaponOut()
      : (this.oRe?.Valid && !(this.oRe.BattleIdleEndTime <= 0)) ||
        this.Lie.HasTag(-1348147833) ||
        (this.oRe.Valid &&
          this.oRe.MainAnimInstance &&
          !(
            this.oRe.MainAnimInstance.GetMainAnimsCurveValueWithDelta(
              CharacterNameDefines_1.CharacterNameDefines.KEEP_WEAPON_OUT_NAME,
              0,
            ) < KEEP_WEAPON_OUT_THREADHOLD
          )) ||
        this.WeaponIn(t);
  }
  HideWeaponsWhenHideBones(i, e) {
    if (this.Hte) {
      const s = CharacterNameDefines_1.CharacterNameDefines.ROOT;
      for (const h of this.mQr.CharacterWeapons) {
        let t = h.Mesh.GetAttachSocketName();
        if (!FNameUtil_1.FNameUtil.IsEmpty(t)) {
          for (; !s.op_Equality(t) && !e.op_Equality(t); )
            t = this.Hte.Actor.Mesh.GetParentBone(t);
          t.op_Equality(e) && h.Mesh.SetHiddenInGame(i);
        }
      }
    }
  }
  iXr(t) {
    if (!(this.CQr >= this.dQr) && this.Hte) {
      this.CQr += t;
      const i = Math.min(this.CQr / this.dQr, 1);
      for (const e of this.mQr.CharacterWeapons)
        UE.KismetMathLibrary.TLerp(
          e.LerpStartTransform,
          e.LerpEndTransform,
          i,
        ).SetScale3D(this.wQr.ToUeVector()),
          e.Mesh.K2_SetRelativeTransform(
            UE.KismetMathLibrary.TLerp(
              e.LerpStartTransform,
              e.LerpEndTransform,
              i,
            ),
            !1,
            void 0,
            !1,
          );
    }
  }
  WeaponInInternal(t, i = 0) {
    if (((this.BPr = 0), this.Hte))
      if (
        (this.gQr &&
          (TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
        this.fQr &&
          (TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
        this.qQr)
      )
        if (
          ((this.fQr = TimerSystem_1.TimerSystem.Delay(() => {
            this.HideWeapon(-1, !0, !0), (this.fQr = void 0);
          }, this.bQr * HIDE_WEAPON_AFTER_WEAPON_IN_DELAY)),
          (this.dQr = i),
          (this.CQr = 0) < i || !t)
        )
          for (const e of this.mQr.CharacterWeapons)
            this.X9o(e, e.NormalSocket, this.BQr, i > 0), this.tXr(e, !1);
        else {
          for (const s of this.mQr.CharacterWeapons)
            s.WeaponHidden || this.tXr(s, !0);
          this.gQr = TimerSystem_1.TimerSystem.Delay(() => {
            this.gQr = void 0;
            for (const t of this.mQr.CharacterWeapons)
              (t.BattleEffectId =
                this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                  this.Hte.Actor.WeaponInEffect,
                )),
                this.X9o(t, t.NormalSocket, this.BQr, i > 0),
                this.tXr(t, !1);
          }, WEAPON_IN_DELAY);
        }
      else
        for (const h of this.mQr.CharacterWeapons)
          this.X9o(h, h.NormalSocket, this.BQr, i > 0), this.tXr(h, !0);
  }
  WeaponIn(t, i = 0) {
    this.BPr !== 0 && this.WeaponInInternal(t, i);
  }
  OldWeaponHidden() {
    if (this.Hte) {
      this.gQr &&
        (TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0));
      for (const t of this.mQr.CharacterWeapons) this.tXr(t, !0);
    }
  }
  WeaponOutInternal(t = 0) {
    if (((this.BPr = 1), this.Hte)) {
      this.gQr &&
        (TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
        this.fQr &&
          (TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
        (this.dQr = t) > 0 && (this.CQr = 0);
      for (const i of this.mQr.CharacterWeapons)
        this.X9o(i, i.BattleSocket, this.BQr, t > 0),
          this.tXr(i, !1),
          i.BattleEffectId &&
            (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
              i.BattleEffectId,
            ),
            (i.BattleEffectId = 0));
    }
  }
  WeaponOut(t = 0) {
    this.BPr !== 1 && this.WeaponOutInternal(t);
  }
  X9o(t, i, e, s) {
    const h = this.Hte.Actor.Mesh.GetSocketTransform(i, 0);
    e.SetScale3D(this.wQr.ToUeVector()),
      s &&
        ((t.LerpStartTransform = UE.KismetMathLibrary.ComposeTransforms(
          t.Mesh.K2_GetComponentToWorld(),
          h.Inverse(),
        )),
        t.LerpStartTransform.SetScale3D(this.wQr.ToUeVector()),
        (t.LerpEndTransform = e)),
      t.Mesh.K2_AttachToComponent(this.Hte.Actor.Mesh, i, 0, 0, 0, !0),
      s
        ? t.Mesh.K2_SetRelativeTransform(t.LerpStartTransform, !1, void 0, !0)
        : t.Mesh.K2_SetRelativeTransform(e, !1, void 0, !0);
  }
  ChangeWeaponHangState(t, i, e, s) {
    if (this.BPr !== t)
      switch (t) {
        case 0:
          this.WeaponIn(!1, s);
          break;
        case 1:
          this.WeaponOut(s);
          break;
        default:
          if (
            ((this.BPr = t),
            this.gQr &&
              (TimerSystem_1.TimerSystem.Remove(this.gQr), (this.gQr = void 0)),
            this.fQr &&
              (TimerSystem_1.TimerSystem.Remove(this.fQr), (this.fQr = void 0)),
            i.Num() !== this.mQr.CharacterWeapons.length ||
              e.Num() !== this.mQr.CharacterWeapons.length)
          )
            return (
              Log_1.Log.CheckError() &&
                Log_1.Log.Error(
                  "Character",
                  6,
                  "切换武器挂载需要与本身武器部件数量一样的输入数据",
                  ["Char", this.Hte.Actor.GetName()],
                ),
              !1
            );
          (this.dQr = s) > 0 && (this.CQr = 0);
          {
            let t = 0;
            for (const h of this.mQr.CharacterWeapons)
              this.X9o(h, i.Get(t), e.Get(t), s > 0),
                this.tXr(h, !1),
                h.BattleEffectId &&
                  (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
                    h.BattleEffectId,
                  ),
                  (h.BattleEffectId = 0)),
                ++t;
          }
      }
    return !0;
  }
  HideWeapon(t, i, e, s = !1, h = 0) {
    this.vQr.push(new HideWeaponOrder(t, i, e, s, h));
  }
  OQr() {
    for (const t of this.vQr) t.WithEffect = !1;
  }
  oXr() {
    if (this.mQr?.CharacterWeapons)
      for (const t of this.mQr.CharacterWeapons)
        t.SetBuffEffectsHiddenInGame(t.WeaponHidden);
  }
  tXr(t, i, e = !0, s = !0, h = 0) {
    s =
      (this.BPr === 0 && this.QQr.size > 0) ||
      t.VisibleHelper.RequestAndUpdateHiddenInGame(i, s, h);
    if (s === t.WeaponHidden) return !1;
    i && s && t.ReleaseHideEffect(),
      t.Mesh.SetHiddenInGame(s, !0),
      s &&
        t.Mesh instanceof UE.SkeletalMeshComponent &&
        ((h = t.Mesh.GetAnimInstance()),
        UE.KuroAnimLibrary.EndAnimNotifyStates(h));
    h = t.WeaponHidden;
    return (
      (t.WeaponHidden = s),
      i && s && e && !h && t.ShowHideEffect(),
      t.SetBuffEffectsHiddenInGame(i && s),
      !0
    );
  }
  RegisterCharacterDropWeaponEvent(t) {
    (this.AiWeaponConfigId = t),
      (this.CacheAiSocketItem =
        ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
          t,
          this.Entity,
        )),
      this.uXr(this.CacheAiSocketItem.Tag),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.z3r,
      ),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
        this.$Qr,
      );
  }
  UnRegisterCharacterDropWeaponEvent() {
    this.AiWeaponConfigId &&
      this.AiWeaponConfigId !== 0 &&
      ((this.CacheAiSocketItem =
        ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
          this.AiWeaponConfigId,
          this.Entity,
        )),
      this.cXr(this.CacheAiSocketItem.Tag),
      (this.AiWeaponConfigId = 0),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.z3r,
      ),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
        this.$Qr,
      ));
  }
  ReceiveCharacterKnockUpDropWeapon() {
    ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
  }
  YQr() {
    this.AiWeaponConfigId !== 0 &&
      ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
  }
  uXr(t) {
    t = t?.TagId;
    this.Lie ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          58,
          "怪物添加Tag 的TagComponent组件为初始化完成，请检查MonsterEntity的组件start顺序",
        )),
      t && !this.Lie.HasTag(t) && this.Lie.AddTag(t);
  }
  cXr(t) {
    this.Lie.Active && this.Lie.RemoveTag(t?.TagId);
  }
  get HasWeapon() {
    return this.BPr === 1;
  }
  ResetWeaponTag() {
    (this.CacheAiSocketItem =
      ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
        this.AiWeaponConfigId,
        this.Entity,
      )),
      this.CacheAiSocketItem && this.uXr(this.CacheAiSocketItem.Tag);
  }
  GetWeaponBreachLevel() {
    return this.WeaponEquipInfo ? this.WeaponEquipInfo.WeaponBreachLevel : -1;
  }
  InitWeaponVisibleData() {
    const t =
      ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfig(
        this.Entity,
      );
    let i = 0;
    for (const e of this.mQr.CharacterWeapons)
      e.VisibleHelper.InitBaseTable(i < t.BaseType.length ? t.BaseType[i] : 0),
        e.VisibleHelper.InitTagHelper(
          this.Lie,
          i < t.BaseType.length ? t.VisibleTags[i] : "",
          this.GQr,
          i < t.BaseType.length ? t.HiddenTags[i] : "",
          this.NQr,
        ),
        i++;
  }
  d8s() {
    const t = this.Hte.CreatureData;
    let i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(
      t.GetRoleId(),
    );
    let e = 0;
    e = i?.IsTrialRole() ? i.GetRoleId() : t.GetPbDataId();
    i =
      ConfigManager_1.ConfigManager.WeaponComponentConfig.GetHideWeaponTags(e);
    (this.DQr = []),
      i.forEach((t) => {
        t = this.Lie.ListenForTagAddOrRemove(t, this.XQr);
        t && this.DQr.push(t);
      });
  }
  InitDebugWeaponVisibleDataById(t) {
    const i =
      ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfigById(
        t,
      );
    let e = 0;
    for (const s of this.mQr.CharacterWeapons)
      s.VisibleHelper.InitBaseTable(e < i.BaseType.length ? i.BaseType[e] : 0),
        s.VisibleHelper.InitTagHelper(
          this.Lie,
          e < i.BaseType.length ? i.VisibleTags[e] : "",
          this.GQr,
          e < i.BaseType.length ? i.HiddenTags[e] : "",
          this.NQr,
        ),
        e++;
    this.HideWeapon(-1, !0, !1), (this.fQr = void 0);
  }
  ClearWeaponVisibleData() {
    if (this.mQr?.CharacterWeapons)
      for (const t of this.mQr.CharacterWeapons)
        t.VisibleHelper.ClearTagHelper();
  }
  SetWeaponVisibleByTag(t, i, e) {
    i
      ? this.HideWeapon(t.Index, !e, !0, !1, 2)
      : this.HideWeapon(t.Index, e, !0, !1, 2);
  }
  GetCurrentWeaponEquipDebugInfo() {
    let t = "";
    t += `[武器组件]{ weaponId: ${this.WeaponEquipInfo.WeaponId}, 'WeaponBreachLevel:' ${this.WeaponEquipInfo.WeaponBreachLevel}, models:${this.WeaponEquipInfo.WeaponConfig.Models}  }
`;
    for (const e of this.mQr.CharacterWeapons) {
      const i = e.Mesh;
      t += `[武器组件]{ weaponMesh: ${i.SkeletalMesh.GetName()}, AnimInstance: ${i.GetAnimInstance().GetName()},         BattleSocket: ${e.BattleSocket},NormalSocket: ${e.NormalSocket} }
`;
    }
    return t;
  }

  GetWeaponMesh() {
    return this.mQr;
  }
  IsCurrentWeaponHideEffectPlaying() {
    return (
      !!EffectSystem_1.EffectSystem.IsValid(
        this.mQr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0,
      ) &&
      EffectSystem_1.EffectSystem.IsPlaying(
        this.mQr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0,
      )
    );
  }
  rXr() {
    if (this.pQr && this.mQr?.CharacterWeapons)
      for (const t of this.mQr.CharacterWeapons)
        !t.WeaponHidden &&
        EffectSystem_1.EffectSystem.IsValid(t.WeaponHideEffect) &&
        EffectSystem_1.EffectSystem.IsPlaying(t.WeaponHideEffect)
          ? this.Lie.HasTag(577301498) || this.Lie.AddTag(577301498)
          : this.Lie.HasTag(577301498) && this.Lie.RemoveTag(577301498);
  }
};
(CharacterWeaponComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(69)],
  CharacterWeaponComponent,
)),
  (exports.CharacterWeaponComponent = CharacterWeaponComponent);
// # sourceMappingURL=CharacterWeaponComponent.js.map
