"use strict";
var __decorate =
  (this && this.__decorate) ||
  function (t, i, s, e) {
    var h,
      o = arguments.length,
      a =
        o < 3
          ? i
          : null === e
            ? (e = Object.getOwnPropertyDescriptor(i, s))
            : e;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate)
      a = Reflect.decorate(t, i, s, e);
    else
      for (var r = t.length - 1; 0 <= r; r--)
        (h = t[r]) && (a = (o < 3 ? h(a) : 3 < o ? h(i, s, a) : h(i, s)) || a);
    return 3 < o && a && Object.defineProperty(i, s, a), a;
  };
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CharacterWeaponComponent = void 0);
const UE = require("ue"),
  AudioSystem_1 = require("../../../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../../../Core/Common/Log"),
  SoarById_1 = require("../../../../../Core/Define/ConfigQuery/SoarById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EntityComponent_1 = require("../../../../../Core/Entity/EntityComponent"),
  RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  TimerSystem_1 = require("../../../../../Core/Timer/TimerSystem"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  ModelUtil_1 = require("../../../../../Core/Utils/ModelUtil"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  EffectContext_1 = require("../../../../Effect/EffectContext/EffectContext"),
  EffectSystem_1 = require("../../../../Effect/EffectSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WeaponController_1 = require("../../../../Module/Weapon/WeaponController"),
  CharacterNameDefines_1 = require("../CharacterNameDefines"),
  CharacterUnifiedStateTypes_1 = require("./Abilities/CharacterUnifiedStateTypes"),
  CharacterWeaponMesh_1 = require("./Weapon/CharacterWeaponMesh"),
  KEEP_WEAPON_OUT_THREADHOLD = 0.1,
  WEAPON_IN_DELAY = 100,
  HIDE_WEAPON_AFTER_WEAPON_IN_DELAY = 1e3,
  glideRelativeRotator = new UE.Rotator(0, 90, -90),
  HULU_BASE_ID = 2e7,
  HULU_PARTY_ID = 1e5,
  noHideEffectWeaponIds = new Set([21040063, 21050063]),
  skinTag = -403067358;
class HideWeaponOrder {
  constructor(t, i, s, e = !0, h = 0) {
    (this.Index = 0),
      (this.Hide = !1),
      (this.WithEffect = !1),
      (this.NormaState = !0),
      (this.ExtraType = 0),
      (this.Index = t),
      (this.Hide = i),
      (this.WithEffect = s),
      (this.NormaState = e),
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
    if (!t.zys && !t.fTs)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            57,
            "[武器组件]获取武器配置失败 pb",
            ["weaponId", t.zys ?? void 0],
            ["WeaponBreachLevel", t.fTs ?? void 0],
          ),
        !1
      );
    if (this.WeaponId !== t.zys) {
      this.WeaponId = t.zys;
      var i =
        ConfigManager_1.ConfigManager.WeaponConfig.GetWeaponConfigByItemId(
          this.WeaponId,
        );
      if (!i)
        return (
          Log_1.Log.CheckError() &&
            Log_1.Log.Error("Character", 57, "[武器组件]获取武器配置失败", [
              "weaponId",
              this.WeaponId,
            ]),
          !1
        );
      this.WeaponConfig = i;
    }
    return (this.WeaponBreachLevel = t.fTs), !0;
  }
}
let CharacterWeaponComponent = class CharacterWeaponComponent extends EntityComponent_1.EntityComponent {
  constructor() {
    super(...arguments),
      (this.Hte = void 0),
      (this.oRe = void 0),
      (this.Lie = void 0),
      (this.y5r = void 0),
      (this.I5r = void 0),
      (this.Hulu = void 0),
      (this.WKr = 0),
      (this.Mba = !1),
      (this.HuluHideEffect = 0),
      (this.Paragliding = void 0),
      (this.ParaglidingIsOpen = !1),
      (this.ParaglidingIsHover = !1),
      (this.ParaglidingIsAscent = !1),
      (this.SoarWing = void 0),
      (this.KKr = -1),
      (this.QKr = void 0),
      (this.XKr = 0),
      (this.$Kr = 0),
      (this.YKr = void 0),
      (this.JKr = void 0),
      (this.Xjt = !1),
      (this.zKr = !1),
      (this.ZKr = new Array()),
      (this.AiItemMarkId = 0),
      (this.AiWeaponConfigId = 0),
      (this.CacheAiSocketItem = void 0),
      (this.eQr = void 0),
      (this.tQr = void 0),
      (this.iQr = 0),
      (this.oQr = 0),
      (this.rQr = void 0),
      (this.nQr = void 0),
      (this.sQr = void 0),
      (this.aQr = void 0),
      (this.hQr = 0),
      (this.lQr = void 0),
      (this._Qr = void 0),
      (this.uQr = void 0),
      (this.cQr = void 0),
      (this.mQr = Vector_1.Vector.Create()),
      (this.dQr = void 0),
      (this.Jsh = !1),
      (this.CQr = 10),
      (this.gQr = !0),
      (this.WeaponEquipInfo = void 0),
      (this.fQr = (t, i) => {
        this.SetWeaponVisibleByTag(i, t, !0);
      }),
      (this.pQr = (t, i) => {
        this.SetWeaponVisibleByTag(i, t, !1);
      }),
      (this.I3r = (t, i) => {
        var s;
        t?.Valid
          ? ((s = t.GetComponent(79)),
            this.vQr(),
            this.CheckAndHangWeapons(!1),
            (i
              ? (this.MQr(0),
                this.SyncParagliding(s),
                (i = t.GetComponent(203)).HasTag(this.oQr) &&
                  !this.Lie.HasTag(this.oQr) &&
                  (i.RemoveTag(this.oQr), this.Lie.AddTag(this.oQr)),
                s)
              : (this.MQr(0), this)
            ).OpenParagliding(!1),
            this.SoarWing &&
              s.SoarWing &&
              (this.SoarWing.SetHiddenInGame(s.SoarWing.bHiddenInGame),
              this.SoarWing.GetAnimInstance()?.SyncAnimStates(
                s.SoarWing.GetAnimInstance(),
              )))
          : this.OpenParagliding(!1);
      }),
      (this.EQr = (t, i) => {
        !i ||
          this.ParaglidingIsOpen ||
          this.Entity.GetComponent(173).MoveState !==
            CharacterUnifiedStateTypes_1.ECharMoveState.Glide ||
          this.OpenParagliding(!0);
      }),
      (this.SQr = (t, i) => {
        !i &&
          this.ParaglidingIsOpen &&
          ((i = EffectSystem_1.EffectSystem.SpawnEffect(
            this.Hte.Actor,
            this.Hte.Actor.Mesh.D_GetSocketTransform(
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
          this.Lie.RemoveTag(this.oQr));
      }),
      (this.yQr = (t, i) => {
        this.ParaglidingIsHover = i;
        var s = this.Paragliding.GetAnimInstance();
        s && s.SetHover(i);
      }),
      (this.P3r = (t, i) => {
        (t !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar &&
          i !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar) ||
          this.$gl(),
          this.Hte.IsMoveAutonomousProxy &&
            !this.Xjt &&
            this.AiWeaponConfigId &&
            i === CharacterUnifiedStateTypes_1.ECharMoveState.KnockUp &&
            t !== i &&
            this.ReceiveCharacterKnockUpDropWeapon();
      }),
      (this.IQr = (t, i) => {
        i
          ? EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) ||
            ((i = ModelUtil_1.ModelUtil.GetModelConfig(this.WKr)),
            this.MQr(0),
            (this.HuluHideEffect = EffectSystem_1.EffectSystem.SpawnEffect(
              this.Hte.Actor,
              this.Hte.Actor.Mesh.D_GetSocketTransform(
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
      (this.TQr = (t, i) => {
        i
          ? (this.MQr(1), this.SetHuluHidden(!1, !1))
          : (this.MQr(0), this.SetHuluHidden(!1));
      }),
      (this.LQr = (t, i) => {
        switch (this.hQr) {
          case 0:
            this.SetHuluHidden(i, !0, !0);
            break;
          case 1:
            this.SetHuluHidden(i, !1);
        }
      }),
      (this.DQr = new Set()),
      (this.RQr = (t, i) => {
        i ? this.DQr.add(t) : this.DQr.delete(t);
      }),
      (this.UQr = () => {
        this.AQr();
      }),
      (this.rc_ = new Set());
  }
  static get Dependencies() {
    return [3];
  }
  get _Pr() {
    return this.KKr;
  }
  set _Pr(t) {
    this.KKr !== t &&
      ((this.KKr = t), this.WOc(this.QKr?.CharacterWeapons[0]), this.Lie) &&
      (0 === t
        ? this.Lie.HasTag(-2075724632) || this.Lie.AddTag(-2075724632)
        : this.Lie.HasTag(-2075724632) && this.Lie.RemoveTag(-2075724632));
  }
  SetParaglidingIsAscent(t) {
    this.ParaglidingIsAscent = t;
    var i = this.Paragliding.GetAnimInstance();
    i && i.SetDash(t);
  }
  OnInitData() {
    return (
      (this.dQr = new UE.TransformDouble()),
      (this.WeaponEquipInfo = new WeaponEquipInfo()),
      !0
    );
  }
  OnInit() {
    return !0;
  }
  OnActivate() {
    return (
      TimerSystem_1.TimerSystem.Next(() => {
        this.Lie?.HasTag(skinTag) &&
          (this.Lie?.RemoveTag(skinTag), this.Lie?.AddTag(skinTag));
      }),
      !0
    );
  }
  OnStart() {
    if (
      ((this.Hte = this.Entity.CheckGetComponent(3)),
      (this.oRe = this.Entity.GetComponent(175)),
      (this.Lie = this.Entity.GetComponent(203)),
      (this.y5r = this.Entity.GetComponent(50)),
      (this.I5r = this.Entity.GetComponent(173)),
      (this.Xjt =
        this.Hte.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.kks.Proto_Player),
      (this.zKr =
        this.Xjt ||
        4 === this.Hte.CreatureData.GetBaseInfo()?.Category.MonsterMatchType),
      (this.iQr = 0),
      (this.AiItemMarkId = 0),
      !this.Hte)
    )
      return !1;
    this.Sba(), this.PQr(), this.xQr();
    var t = this.Hte.CreatureData.GetParaglidingSkinId(),
      t =
        (0 < t
          ? ((t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(t)),
            this.wQr(t.ModelId))
          : ((t =
              ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(
                1,
              )),
            this.wQr(t)),
        this.Hte.CreatureData.GetSoarWingSkinId());
    if (
      (0 < t
        ? ((t = ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(t)),
          this.Xgl(t.ModelId))
        : ((t =
            ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(
              0,
            )),
          this.Xgl(t)),
      this.Xjt)
    ) {
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.RoleOnStateInherit,
        this.I3r,
      ),
        (this.oQr = 1905601506),
        (this.rQr = this.Lie.ListenForTagAddOrRemove(this.oQr, this.EQr)),
        (this.nQr = this.Lie.ListenForTagAddOrRemove(262865373, this.SQr)),
        (this.sQr = this.Lie.ListenForTagAddOrRemove(921953316, this.yQr)),
        (this._Qr = this.Lie.ListenForTagAddOrRemove(-1660069905, this.IQr)),
        (this.lQr = this.Lie.ListenForTagAddOrRemove(507209871, this.TQr)),
        (this.uQr = this.Lie.ListenForTagAddOrRemove(-1775045118, this.LQr)),
        this.BQr(),
        this.InitWeaponVisibleData(),
        this.gYs();
      for (const i of this.QKr.CharacterWeapons) this.bQr(i, !0, !1);
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.P3r,
      );
    }
    return !0;
  }
  OnEntitySoarWingOrParaglidingSkinChangeNotify(t) {
    for (const s of t.gGc) {
      let t = 0;
      t =
        0 < s.Z7n
          ? ConfigManager_1.ConfigManager.SkinConfig.GetFlySkinConfig(s.Z7n)
              .ModelId
          : ConfigManager_1.ConfigManager.SkinConfig.GetDefaultFlySkinModelId(
              s.fGc,
            );
      var i = this.Entity.GetComponent(0);
      1 === s.fGc
        ? (i?.SetParaglidingSkinId(s.Z7n), this.wQr(t))
        : 0 === s.fGc && (i?.SetSoarWingSkinId(s.Z7n), this.Xgl(t));
    }
  }
  OnEnd() {
    return (
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnUnifiedMoveStateChanged,
        this.P3r,
      ),
      !0
    );
  }
  OnTick(t) {
    this.zKr && this.CheckAndHangWeapons(!0);
    for (const s of this.ZKr) {
      var i;
      if (s.Index < 0)
        for (const e of this.QKr.CharacterWeapons)
          s.NormaState ||
            e.VisibleHelper.EnableHiddenInGameByExtraVisibleType(
              s.ExtraType,
              !0,
            ),
            this.bQr(e, s.Hide, s.WithEffect, s.NormaState, s.ExtraType);
      else
        s.Index < this.QKr.CharacterWeapons.length
          ? ((i = this.QKr.CharacterWeapons[s.Index]),
            s.NormaState ||
              i.VisibleHelper.EnableHiddenInGameByExtraVisibleType(
                s.ExtraType,
                !0,
              ),
            this.bQr(i, s.Hide, s.WithEffect, s.NormaState, s.ExtraType))
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Character",
              6,
              "隐藏武器选择了错误的武器序号",
              ["index", s.Index],
              ["BP", this.Hte.Actor.GetName()],
            );
    }
    if ((this.ZKr.length = 0) === this._Pr && 0 < this.DQr.size)
      for (const h of this.QKr.CharacterWeapons) this.bQr(h, !0, !0);
    this.qQr(t), this.GQr(), this.NQr();
  }
  OnClear() {
    this.ClearWeaponVisibleData(),
      this.QKr?.Destroy(),
      (this.QKr = void 0),
      EffectSystem_1.EffectSystem.IsValid(this.HuluHideEffect) &&
        (EffectSystem_1.EffectSystem.StopEffectById(
          this.HuluHideEffect,
          "[CharacterWeaponComponent.OnClear]",
          !0,
        ),
        (this.HuluHideEffect = 0)),
      this.YKr &&
        (TimerSystem_1.TimerSystem.Remove(this.YKr), (this.YKr = void 0)),
      this.JKr &&
        (TimerSystem_1.TimerSystem.Remove(this.JKr), (this.JKr = void 0)),
      this.Xjt
        ? (EventSystem_1.EventSystem.RemoveWithTarget(
            this.Entity,
            EventDefine_1.EEventName.RoleOnStateInherit,
            this.I3r,
          ),
          this.rQr.EndTask(),
          this.nQr.EndTask(),
          this.sQr.EndTask(),
          (this.rQr = void 0),
          (this.nQr = void 0),
          (this.sQr = void 0),
          this._Qr.EndTask(),
          (this._Qr = void 0),
          this.uQr.EndTask(),
          (this.uQr = void 0),
          this.lQr.EndTask(),
          (this.lQr = void 0),
          this.aQr.forEach((t) => {
            t.EndTask();
          }),
          (this.aQr = []))
        : (this.ClearWeaponForAi(), (this.AiWeaponConfigId = 0));
    var t = this.Paragliding?.GetAnimInstance();
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
  BQr() {
    this.Lie.HasTag(this.oQr) && this.OpenParagliding(!0);
  }
  PQr() {
    this.QKr = new CharacterWeaponMesh_1.CharacterWeaponMesh();
    var t,
      i = this.Hte.Actor.K2_GetComponentsByClass(
        UE.MeshComponent.StaticClass(),
      ),
      s = new Array();
    for (let t = 0; t < i.Num(); ++t) {
      var e = i.Get(t);
      e instanceof UE.SkeletalMeshComponent &&
        e.GetName().startsWith("WeaponCase") &&
        (s.push(e), (e.bAbsoluteScale = !1));
    }
    this.Xjt
      ? ((t = this.Entity.GetComponent(0).GetRoleConfig().WeaponScale),
        this.mQr.Set(t[0], t[1], t[2]),
        this.dQr.SetScale3D(this.mQr.ToUeVector()))
      : this.mQr.Set(1, 1, 1),
      this.QKr.Init(s, this.Hte.Actor.Mesh, this.Hte.Actor, !1),
      0 < this.QKr.CharacterWeapons.length &&
        (this.Xjt
          ? (this.OQr(), this.EquipWeaponForRole(), this.kQr())
          : this.zKr &&
            (this.OQr(),
            this.kQr(),
            this.mQr.FromUeVector(
              this.QKr?.CharacterWeapons[0].Mesh.RelativeScale3D,
            ))),
      this.Xjt || this.FQr();
  }
  OQr() {
    var t = this.Entity.GetComponent(0).GetModelConfig(),
      i = t.NormalSockets,
      s = t.BattleSockets;
    i.Num() !== s.Num() &&
      Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "Character",
        57,
        "角色设置武器失败,两种类型槽位数量不统一",
        ["Id", this.Hte.Actor.GetName()],
        ["ModelId", t.ID],
      ),
      (i.Num() > this.QKr.CharacterWeapons.length ||
        s.Num() > this.QKr.CharacterWeapons.length) &&
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            57,
            "角色设置武器失败,角色蓝图武器组件少于武器数量配置",
            ["Id", this.Hte.Actor.GetName()],
            ["ModelId", t.ID],
          ),
        this.QKr.ChangeCharacterWeapons(i.Num()));
    let e = 0;
    for (const h of this.QKr.CharacterWeapons)
      (h.NormalSocket = FNameUtil_1.FNameUtil.GetDynamicFName(i.Get(e))),
        (h.BattleSocket = FNameUtil_1.FNameUtil.GetDynamicFName(s.Get(e))),
        ++e;
  }
  kQr() {
    this._Pr = 0;
    for (const t of this.QKr.CharacterWeapons)
      this.W7o(t, t.NormalSocket, this.dQr, !1);
    this.HideWeapon(-1, !0, !1), (this.JKr = void 0);
  }
  FQr() {
    this.VQr();
    var t = this.Hte.CreatureData?.ComponentDataMap.get("fys");
    t &&
      ((t = t.fys?.zys)
        ? (this.RegisterCharacterDropWeaponEvent(t),
          this.ChangeWeaponByWeaponByConfigId(t))
        : ((this._Pr = -1), this.WeaponIn(!1)));
  }
  wQr(t) {
    var i;
    this.Xjt &&
      (this.Paragliding ||
        ((i = this.Hte.Actor.AddComponentByClass(
          UE.SkeletalMeshComponent.StaticClass(),
          !1,
          MathUtils_1.MathUtils.DefaultTransform,
          !1,
          CharacterNameDefines_1.CharacterNameDefines
            .PARAGLIDING_MESH_COMP_NAME,
        )).K2_AttachToComponent(
          this.Hte.Actor.Mesh,
          CharacterNameDefines_1.CharacterNameDefines.GLIDEING_SOCKETNAME,
          0,
          0,
          0,
          !0,
        ),
        (this.Paragliding = i),
        this.Hte.Actor.CharRenderingComponent.AddComponentByCase(
          7,
          this.Paragliding,
        )),
      this.SetNewParagliding(t),
      this.Paragliding.D_K2_SetRelativeLocation(
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
      this.Paragliding.D_SetWorldScale3D(
        Vector_1.Vector.OneVectorProxy.ToUeVector(),
      ),
      this.HQr(!0),
      Log_1.Log.CheckDebug()) &&
      Log_1.Log.Debug(
        "Weapon",
        57,
        "加载滑翔伞",
        ["location", this.Paragliding?.D_K2_GetComponentLocation()?.ToString()],
        ["characterLocation", this.Hte?.ActorLocation?.ToString()],
        ["modelConfigId", t],
      );
  }
  Xgl(t) {
    if (this.Xjt) {
      var i,
        s = SoarById_1.configSoarById.GetConfig(
          this.Hte.CreatureData.GetRoleConfig().RoleBody,
        );
      if (s) {
        this.SoarWing ||
          ((i = this.Hte.Actor.AddComponentByClass(
            UE.SkeletalMeshComponent.StaticClass(),
            !1,
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
            CharacterNameDefines_1.CharacterNameDefines
              .SOAR_WING_MESH_COMP_NAME,
          )).K2_AttachToComponent(
            this.Hte.Actor.Mesh,
            new UE.FName(s.HangSocket),
            0,
            0,
            0,
            !0,
          ),
          (this.SoarWing = i),
          this.Hte.Actor.CharRenderingComponent.AddComponentByCase(12, i)),
          this.SoarWing.K2_SetRelativeTransform(
            MathUtils_1.MathUtils.DefaultTransform,
            !1,
            void 0,
            !1,
          ),
          this.$gl();
        const e = ModelUtil_1.ModelUtil.GetModelConfig(t);
        ResourceSystem_1.ResourceSystem.LoadAsync(
          e.网格体.ToAssetPathName(),
          UE.SkeletalMesh,
          (i) => {
            this.SoarWing.SetSkeletalMesh(i, !1),
              ResourceSystem_1.ResourceSystem.LoadAsync(
                e.动画蓝图.ToAssetPathName(),
                UE.Class,
                (t) => {
                  this.SoarWing.SetAnimClass(t),
                    this.SoarWing.GetAnimInstance() ||
                      (Log_1.Log.CheckError() &&
                        Log_1.Log.Error(
                          "Test",
                          6,
                          "SetNewSoarWing Error!",
                          ["Mesh", i?.GetName()],
                          ["NewClass", t?.GetName()],
                        ));
                },
              );
          },
        ),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "Weapon",
              6,
              "加载翱翔翼",
              [
                "location",
                this.SoarWing?.D_K2_GetComponentLocation()?.ToString(),
              ],
              ["characterLocation", this.Hte?.ActorLocation?.ToString()],
            );
      }
    }
  }
  HQr(t) {
    (this.ParaglidingIsOpen = !t),
      TimerSystem_1.TimerSystem.Next(() => {
        this.Paragliding.SetHiddenInGame(!this.ParaglidingIsOpen);
      });
  }
  OpenParagliding(t) {
    var i, s;
    (this.ParaglidingIsOpen = t),
      this.Paragliding &&
        ((i = this.Paragliding.GetAnimInstance())
          ? (Log_1.Log.CheckDebug() &&
              Log_1.Log.Debug(
                "Weapon",
                57,
                "打开滑翔伞",
                ["bOpen", t],
                [
                  "location",
                  this.Paragliding?.D_K2_GetComponentLocation()?.ToString(),
                ],
                ["characterLocation", this.Hte?.ActorLocation?.ToString()],
              ),
            (s = this.y5r?.GetAkComponent()) &&
              (t
                ? AudioSystem_1.AudioSystem.PostEvent(
                    "play_role_com_paragliding_open",
                    s,
                  )
                : AudioSystem_1.AudioSystem.PostEvent(
                    "play_role_com_paragliding_close",
                    s,
                  )),
            i.SetOpenParagliding(t),
            i.SyncAnimStates(void 0),
            this.HQr(!t),
            t || UE.KuroAnimLibrary.EndAnimNotifyStates(i))
          : Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("Weapon", 57, "打开滑翔伞: 异步未加载完成返回"));
  }
  SetNewParagliding(t) {
    const i = ModelUtil_1.ModelUtil.GetModelConfig(t);
    ResourceSystem_1.ResourceSystem.LoadAsync(
      i.网格体.ToAssetPathName(),
      UE.SkeletalMesh,
      (s) => {
        this.Paragliding.SetSkeletalMesh(s, !1),
          ResourceSystem_1.ResourceSystem.LoadAsync(
            i.动画蓝图.ToAssetPathName(),
            UE.Class,
            (t) => {
              this.Paragliding.SetAnimClass(t),
                this.ParaglidingIsOpen && this.OpenParagliding(!0);
              var i = this.Paragliding.GetAnimInstance();
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
                    ["Mesh", s?.GetName()],
                    ["NewClass", t?.GetName()],
                  );
            },
          );
      },
    );
  }
  SyncParagliding(t) {
    this.HQr(!t.ParaglidingIsOpen), t.HQr(!0);
    t = t.Paragliding.GetAnimInstance();
    this.Paragliding.GetAnimInstance()?.SyncAnim(t),
      t?.SyncAnim(void 0),
      UE.KuroAnimLibrary.EndAnimNotifyStates(t);
  }
  xQr() {
    var t;
    this.Xjt &&
      ((this.HuluHideEffect = 0),
      (this.cQr = void 0),
      (t = this.Entity.GetComponent(0)),
      (t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
        t.GetRoleId(),
      )),
      this.jQr(t.PartyId, 1));
  }
  jQr(t, i) {
    this.Hulu
      ? this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(6)
      : ((e = this.Hte.Actor.AddComponentByClass(
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
        (this.Hulu = e),
        this.MQr(0));
    const s = t * HULU_PARTY_ID + HULU_BASE_ID + i;
    var e = ModelUtil_1.ModelUtil.GetModelConfig(s);
    e
      ? ResourceSystem_1.ResourceSystem.LoadAsync(
          e.网格体.ToAssetPathName(),
          UE.SkeletalMesh,
          (t) => {
            t
              ? ((this.WKr = s),
                this.Hulu.SetSkeletalMesh(t),
                this.Hte.Actor.CharRenderingComponent.AddComponentByCase(
                  6,
                  this.Hulu,
                ),
                this.SetHuluHidden(!1, !0, !0))
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Character", 57, "该葫芦Id没有配置网格体", [
                  "Id",
                  s,
                ]);
          },
        )
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 57, "该葫芦Id没有配置Config", ["Id", s]);
  }
  MQr(s) {
    if (s !== this.hQr) {
      let t = void 0,
        i = FNameUtil_1.FNameUtil.EMPTY;
      switch (s) {
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
      this.Hulu.K2_AttachToComponent(t, i, 0, 0, 0, !0), (this.hQr = s);
    }
  }
  GetHuluId() {
    return this.WKr;
  }
  SetHuluHidden(t, i = !0, s = !1) {
    let e = t,
      h = i;
    this.Mba && 0 === this.hQr && ((e = !0), (h = !1)),
      (s && this.Hulu.bHiddenInGame === e) ||
        (h
          ? e
            ? (this.cQr &&
                0 <= this.cQr &&
                (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
                  this.cQr,
                ),
                (this.cQr = void 0)),
              this.Hulu.SetHiddenInGame(t))
            : (this.cQr &&
                0 <= this.cQr &&
                (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
                  this.cQr,
                ),
                (this.cQr = void 0)),
              this.Hulu.SetHiddenInGame(!0),
              ResourceSystem_1.ResourceSystem.LoadAsync(
                "/Game/Aki/Effect/MaterialController/Common/DA_Fx_HuluStart.DA_Fx_HuluStart",
                UE.PD_CharacterControllerData_C,
                (t) => {
                  1 !== this.hQr &&
                    ((this.cQr =
                      this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                        t,
                      )),
                    this.Hulu.SetHiddenInGame(!1));
                },
              ))
          : (this.cQr &&
              0 <= this.cQr &&
              (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
                this.cQr,
              ),
              (this.cQr = void 0)),
            this.Hulu.SetHiddenInGame(e)));
  }
  VQr() {
    this.AiWeaponConfigId = 0;
  }
  ClearWeaponForAi() {
    (this._Pr = 0),
      this.QKr?.ChangeCharacterWeapons(0),
      (this.AiItemMarkId = 0),
      this.UnRegisterCharacterDropWeaponEvent();
  }
  ChangeWeaponByWeaponByConfigId(t) {
    var i = ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
      t,
      this.Entity,
    );
    i
      ? this.ChangeWeaponByWeaponSocketItem(i)
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          57,
          "Ai改变武器失败,原因Config配置错误",
          ["Id", this.Hte.Actor.GetName()],
          ["Char", this.Hte.Actor.GetName()],
          ["Item config id", t],
        );
  }
  ChangeWeaponByWeaponSocketItem(t) {
    this.OldWeaponHidden(),
      (this._Pr = 1),
      (this.eQr = t),
      this.YKr &&
        (TimerSystem_1.TimerSystem.Remove(this.YKr), (this.YKr = void 0));
    t = this.QKr.ChangeCharacterWeapons(this.eQr.Meshes.Num());
    this.Hte.Actor.CharRenderingComponent.Init(this.Hte.Actor.RenderType);
    let i = 0;
    for (const e of t) {
      var s = this.eQr.Meshes.Get(i);
      const h = e.Mesh,
        o = this.eQr.WeaponEffectPath.AssetPathName?.toString(),
        a = s.AnimInstanceSoftPtr.ToAssetPathName();
      h instanceof UE.SkeletalMeshComponent &&
        ResourceSystem_1.ResourceSystem.LoadAsync(
          s.MeshSoftPtr.ToAssetPathName(),
          UE.SkeletalMesh,
          (t) => {
            h.SetSkeletalMesh(t),
              a &&
                "" !== a &&
                ResourceSystem_1.ResourceSystem.LoadAsync(a, UE.Class, (t) => {
                  h.SetAnimClass(t);
                }),
              o &&
                ResourceSystem_1.ResourceSystem.LoadAsync(
                  o,
                  UE.PD_CharacterControllerData_C,
                  (t) => {
                    e.BattleEffectId =
                      this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                        t,
                      );
                  },
                );
          },
        ),
        (e.WeaponHidden = !1),
        (e.BattleEffectId = void 0),
        (e.BattleSocket = s.SocketName),
        ++i;
    }
    this.WeaponOutInternal(0),
      (this.eQr = void 0),
      (this.tQr = void 0),
      this.tQr &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error("Character", 57, "Ai改变武器失败,Config没有被清理", [
          "Id",
          this.tQr,
        ]);
  }
  EquipWeaponForRole() {
    var t = this.Entity.GetComponent(0).ComponentDataMap.get("Lys")?.Lys;
    return !!t && this.EquipWeaponForRoleByWeaponComponent(t);
  }
  EquipWeaponForRoleByWeaponComponent(t) {
    var i;
    return this.WeaponEquipInfo.SetData(t)
      ? !!(i = this.WeaponEquipInfo.WeaponConfig) &&
          ((this.Jsh = noHideEffectWeaponIds.has(t.zys)),
          (this.gQr = 0 < i.HiddenTime),
          (this.CQr = i.HiddenTime),
          this.C_l(this.g_l()))
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            6,
            "[武器组件]获取武器配置失败 pb",
            ["Character", this.Hte?.Actor.GetName()],
            ["ConfigId", this.Hte?.CreatureData.GetRoleId()],
            ["weaponId", t.zys ?? void 0],
            ["WeaponBreachLevel", t.fTs ?? void 0],
          ),
        !1);
  }
  g_l() {
    let t = [];
    var i = this.Hte.CreatureData.GetWeaponSkinId();
    return (
      (t = (
        0 < i
          ? ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(i)
          : this.WeaponEquipInfo.WeaponConfig
      ).Models),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Character",
          4,
          "初始化武器皮肤",
          ["weaponSkinId", i],
          ["modelIds", t],
        ),
      t
    );
  }
  C_l(a) {
    if (a.length !== this.QKr.CharacterWeapons.length)
      return (
        Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Character",
            57,
            "角色配置武器失败 蓝图武器component数量与配置数量不配置",
            ["Id", this.tQr],
            ["ModelIds", a],
          ),
        !1
      );
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Character", 4, "开始设置武器模型", ["modelIds", a]);
    let r = 1;
    for (let t = 0; t < this.iQr; ++t)
      this.Hte.Actor.CharRenderingComponent.RemoveComponentByCase(r), (r += 1);
    let t = 0;
    (this.Jsh = !1),
      0 < this.rc_.size &&
        (Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Character", 4, "设置武器模型过期，丢弃此次"),
        this.rc_.forEach((t) => {
          ResourceSystem_1.ResourceSystem.CancelAsyncLoad(t);
        }),
        this.rc_.clear());
    for (const n of a) {
      this.Jsh = this.Jsh || noHideEffectWeaponIds.has(n);
      const _ = this.QKr.CharacterWeapons[t].Mesh;
      if (_ instanceof UE.SkeletalMeshComponent) {
        const r = 1 + t,
          f = ModelUtil_1.ModelUtil.GetModelConfig(n);
        var i;
        f &&
          ((i = ResourceSystem_1.ResourceSystem.LoadAsync(
            f.网格体.ToAssetPathName(),
            UE.SkeletalMesh,
            (t) => {
              if (t) {
                var i = _.GetNumMaterials();
                for (let t = 0; t < i; ++t) _.SetMaterial(t, void 0);
                var s = t.Materials,
                  e = s.Num();
                _.SetAnimClass(void 0), _.SetSkeletalMesh(t);
                for (let t = 0; t < e; ++t)
                  _.SetMaterial(t, s.Get(t).MaterialInterface);
                t = f.动画蓝图.ToAssetPathName();
                t &&
                  "" !== t &&
                  ResourceSystem_1.ResourceSystem.LoadAsync(
                    t,
                    UE.Class,
                    (t) => {
                      t && _.SetAnimClass(t);
                    },
                  ),
                  this.Hte.Actor.CharRenderingComponent.AddComponentByCase(
                    r,
                    _,
                  );
                const h = f.DA.AssetPathName?.toString();
                if (h && "" !== h) {
                  const o = _.SkeletalMesh;
                  ResourceSystem_1.ResourceSystem.LoadAsync(
                    h,
                    UE.PD_WeaponLevelMaterialDatas_C,
                    (t) => {
                      t &&
                        _.SkeletalMesh === o &&
                        (WeaponController_1.WeaponController.ApplyWeaponLevelMaterial(
                          _,
                          t,
                          this.WeaponEquipInfo.WeaponBreachLevel,
                        ),
                        Log_1.Log.CheckDebug()) &&
                        Log_1.Log.Debug(
                          "Character",
                          25,
                          "设置武器换色",
                          ["materialData", h],
                          ["level", this.WeaponEquipInfo.WeaponBreachLevel],
                        );
                    },
                  );
                }
                Log_1.Log.CheckDebug() &&
                  Log_1.Log.Debug(
                    "Character",
                    4,
                    "设置武器模型完成",
                    ["modelId", n],
                    ["weaponCount", a.length],
                  );
              }
            },
          )),
          this.rc_.add(i),
          ++t);
      }
    }
    return (
      (this.iQr = t),
      0 < this.Hte.CreatureData.GetWeaponSkinId()
        ? this.Lie?.AddTag(skinTag)
        : this.Lie?.RemoveTag(skinTag),
      !0
    );
  }
  OnEquipWeaponForRoleNotify(t) {
    this.EquipWeaponForRoleByWeaponComponent(t.Lys);
  }
  OnEntityEquipSkinChangeNotify(t) {
    var t = t.lI_.yI_;
    this.Hte.CreatureData.SetWeaponSkinId(t),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Character", 4, "服务器下发武器皮肤", [
          "weaponSkinId",
          t,
        ]),
      0 === t
        ? this.C_l(this.WeaponEquipInfo.WeaponConfig.Models)
        : ((t =
            ConfigManager_1.ConfigManager.SkinConfig.GetWeaponSkinConfig(
              t,
            ).Models),
          this.C_l(t));
  }
  CheckAndHangWeapons(t) {
    0 === this._Pr
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
  HideWeaponsWhenHideBones(i, s) {
    if (this.Hte) {
      var e = CharacterNameDefines_1.CharacterNameDefines.ROOT;
      for (const h of this.QKr.CharacterWeapons) {
        let t = h.Mesh.GetAttachSocketName();
        if (!FNameUtil_1.FNameUtil.IsEmpty(t)) {
          for (; !e.op_Equality(t) && !s.op_Equality(t); )
            t = this.Hte.Actor.Mesh.GetParentBone(t);
          t.op_Equality(s) && h.Mesh.SetHiddenInGame(i);
        }
      }
    }
  }
  qQr(t) {
    if (!(this.$Kr >= this.XKr) && this.Hte) {
      this.$Kr += t;
      var i = Math.min(this.$Kr / this.XKr, 1);
      for (const s of this.QKr.CharacterWeapons)
        UE.KismetMathLibrary.D_TLerp(
          s.LerpStartTransform,
          s.LerpEndTransform,
          i,
        ).SetScale3D(this.mQr.ToUeVector()),
          s.Mesh.D_K2_SetRelativeTransform(
            UE.KismetMathLibrary.D_TLerp(
              s.LerpStartTransform,
              s.LerpEndTransform,
              i,
            ),
            !1,
            void 0,
            !1,
          );
    }
  }
  WeaponInInternal(t, i = 0) {
    if (((this._Pr = 0), this.Hte))
      if (
        (this.YKr &&
          (TimerSystem_1.TimerSystem.Remove(this.YKr), (this.YKr = void 0)),
        this.JKr &&
          (TimerSystem_1.TimerSystem.Remove(this.JKr), (this.JKr = void 0)),
        this.gQr)
      )
        if (
          ((this.JKr = TimerSystem_1.TimerSystem.Delay(() => {
            this.HideWeapon(-1, !0, !0), (this.JKr = void 0);
          }, this.CQr * HIDE_WEAPON_AFTER_WEAPON_IN_DELAY)),
          (this.XKr = i),
          (this.$Kr = 0) < i || !t)
        )
          for (const s of this.QKr.CharacterWeapons)
            this.W7o(s, s.NormalSocket, this.dQr, 0 < i), this.bQr(s, !1);
        else {
          for (const e of this.QKr.CharacterWeapons)
            (e.BattleEffectId =
              this.Hte.Actor.CharRenderingComponent.AddMaterialControllerData(
                this.Hte.Actor.WeaponInEffect,
              )),
              e.WeaponHidden || this.bQr(e, !0);
          this.YKr = TimerSystem_1.TimerSystem.Delay(() => {
            this.YKr = void 0;
            for (const t of this.QKr.CharacterWeapons)
              this.W7o(t, t.NormalSocket, this.dQr, 0 < i), this.bQr(t, !1);
          }, WEAPON_IN_DELAY);
        }
      else
        for (const h of this.QKr.CharacterWeapons)
          this.W7o(h, h.NormalSocket, this.dQr, 0 < i), this.bQr(h, !0);
  }
  WeaponIn(t, i = 0) {
    0 !== this._Pr && this.WeaponInInternal(t, i);
  }
  OldWeaponHidden() {
    if (this.Hte) {
      this.YKr &&
        (TimerSystem_1.TimerSystem.Remove(this.YKr), (this.YKr = void 0));
      for (const t of this.QKr.CharacterWeapons) this.bQr(t, !0);
    }
  }
  WeaponOutInternal(t = 0) {
    if (((this._Pr = 1), this.Hte)) {
      this.YKr &&
        (TimerSystem_1.TimerSystem.Remove(this.YKr), (this.YKr = void 0)),
        this.JKr &&
          (TimerSystem_1.TimerSystem.Remove(this.JKr), (this.JKr = void 0)),
        0 < (this.XKr = t) && (this.$Kr = 0);
      for (const i of this.QKr.CharacterWeapons)
        this.W7o(i, i.BattleSocket, this.dQr, 0 < t),
          this.bQr(i, !1),
          i.BattleEffectId &&
            (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
              i.BattleEffectId,
            ),
            (i.BattleEffectId = 0));
    }
  }
  WeaponOut(t = 0) {
    1 !== this._Pr && this.WeaponOutInternal(t);
  }
  W7o(t, i, s, e) {
    var h = this.Hte.Actor.Mesh.D_GetSocketTransform(i, 0);
    s.SetScale3D(this.mQr.ToUeVector()),
      e &&
        ((t.LerpStartTransform = UE.KismetMathLibrary.D_ComposeTransforms(
          t.Mesh.D_K2_GetComponentToWorld(),
          h.Inverse(),
        )),
        t.LerpStartTransform.SetScale3D(this.mQr.ToUeVector()),
        (t.LerpEndTransform = s)),
      t.Mesh.K2_AttachToComponent(this.Hte.Actor.Mesh, i, 0, 0, 0, !0),
      e
        ? t.Mesh.D_K2_SetRelativeTransform(t.LerpStartTransform, !1, void 0, !0)
        : t.Mesh.D_K2_SetRelativeTransform(s, !1, void 0, !0);
  }
  ChangeWeaponHangState(t, i, s, e) {
    if (this._Pr !== t)
      switch (t) {
        case 0:
          this.WeaponIn(!1, e);
          break;
        case 1:
          this.WeaponOut(e);
          break;
        default:
          if (
            ((this._Pr = t),
            this.YKr &&
              (TimerSystem_1.TimerSystem.Remove(this.YKr), (this.YKr = void 0)),
            this.JKr &&
              (TimerSystem_1.TimerSystem.Remove(this.JKr), (this.JKr = void 0)),
            i.Num() !== this.QKr.CharacterWeapons.length ||
              s.Num() !== this.QKr.CharacterWeapons.length)
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
          0 < (this.XKr = e) && (this.$Kr = 0);
          {
            let t = 0;
            for (const o of this.QKr.CharacterWeapons) {
              var h = UE.KismetMathLibrary.Conv_TransformToTransformDouble(
                s.Get(t),
              );
              this.W7o(o, i.Get(t), h, 0 < e),
                this.bQr(o, !1),
                o.BattleEffectId &&
                  (this.Hte.Actor.CharRenderingComponent.RemoveMaterialControllerData(
                    o.BattleEffectId,
                  ),
                  (o.BattleEffectId = 0)),
                ++t;
            }
          }
      }
    return !0;
  }
  HideWeapon(t, i, s, e = !1, h = 0) {
    this.ZKr.push(new HideWeaponOrder(t, i, s, e, h));
  }
  vQr() {
    for (const t of this.ZKr) t.WithEffect = !1;
  }
  GQr() {
    if (this.QKr?.CharacterWeapons)
      for (const t of this.QKr.CharacterWeapons)
        t.SetBuffEffectsHiddenInGame(t.WeaponHidden);
  }
  bQr(t, i, s = !0, e = !0, h = 0) {
    e =
      (0 === this._Pr && 0 < this.DQr.size) ||
      t.VisibleHelper.RequestAndUpdateHiddenInGame(i, e, h);
    if (e === t.WeaponHidden) return !1;
    i && e && t.ReleaseHideEffect(),
      t.Mesh.SetHiddenInGame(e, !0),
      e &&
        t.Mesh instanceof UE.SkeletalMeshComponent &&
        ((h = t.Mesh.GetAnimInstance()),
        UE.KuroAnimLibrary.EndAnimNotifyStates(h));
    h = t.WeaponHidden;
    return (
      (t.WeaponHidden = e),
      i &&
        e &&
        s &&
        !h &&
        !this.Jsh &&
        t.ShowHideEffect(
          this.Hte?.GetReplaceEffect(
            CharacterWeaponMesh_1.WEAPON_HIDDEN_EFFECT,
          ),
        ),
      t.SetBuffEffectsHiddenInGame(i && e),
      this.WOc(t),
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
      this.WQr(this.CacheAiSocketItem.Tag),
      EventSystem_1.EventSystem.AddWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
        this.UQr,
      );
  }
  UnRegisterCharacterDropWeaponEvent() {
    this.AiWeaponConfigId &&
      0 !== this.AiWeaponConfigId &&
      ((this.CacheAiSocketItem =
        ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
          this.AiWeaponConfigId,
          this.Entity,
        )),
      this.KQr(this.CacheAiSocketItem.Tag),
      (this.AiWeaponConfigId = 0),
      EventSystem_1.EventSystem.RemoveWithTarget(
        this.Entity,
        EventDefine_1.EEventName.CharOnRoleDeadTargetSelf,
        this.UQr,
      ));
  }
  ReceiveCharacterKnockUpDropWeapon() {
    ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
  }
  AQr() {
    0 !== this.AiWeaponConfigId &&
      ModelManager_1.ModelManager.AiWeaponModel.Net.SendDiscardWeaponPush(this);
  }
  WQr(t) {
    t = t?.TagId;
    this.Lie ||
      (Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "Character",
          57,
          "怪物添加Tag 的TagComponent组件为初始化完成，请检查MonsterEntity的组件start顺序",
        )),
      t && !this.Lie.HasTag(t) && this.Lie.AddTag(t);
  }
  KQr(t) {
    this.Lie.Active && this.Lie.RemoveTag(t?.TagId);
  }
  get HasWeapon() {
    return 1 === this._Pr;
  }
  ResetWeaponTag() {
    (this.CacheAiSocketItem =
      ModelManager_1.ModelManager.AiWeaponModel.GetWeaponConfigByConfigId(
        this.AiWeaponConfigId,
        this.Entity,
      )),
      this.CacheAiSocketItem && this.WQr(this.CacheAiSocketItem.Tag);
  }
  GetWeaponBreachLevel() {
    return this.WeaponEquipInfo ? this.WeaponEquipInfo.WeaponBreachLevel : -1;
  }
  InitWeaponVisibleData() {
    var t =
      ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfig(
        this.Entity,
      );
    let i = 0;
    for (const s of this.QKr.CharacterWeapons)
      s.VisibleHelper.InitBaseTable(i < t.BaseType.length ? t.BaseType[i] : 0),
        s.VisibleHelper.InitTagHelper(
          this.Lie,
          i < t.BaseType.length ? t.VisibleTags[i] : "",
          this.fQr,
          i < t.BaseType.length ? t.HiddenTags[i] : "",
          this.pQr,
        ),
        i++;
  }
  gYs() {
    var t = this.Hte.CreatureData,
      t = ConfigManager_1.ConfigManager.RoleConfig.GetBaseRoleId(t.GetRoleId()),
      t =
        ConfigManager_1.ConfigManager.WeaponComponentConfig.GetHideWeaponTags(
          t,
        );
    (this.aQr = []),
      t.forEach((t) => {
        t = this.Lie.ListenForTagAddOrRemove(t, this.RQr);
        t && this.aQr.push(t);
      });
  }
  Sba() {
    var t;
    this.Xjt &&
      ((t = this.Hte.CreatureData),
      (this.Mba = t.GetModelConfig().隐藏葫芦),
      this.Mba ||
        ((t = ConfigManager_1.ConfigManager.RoleConfig.GetRoleConfig(
          t.GetRoleId(),
        )),
        (this.Mba = t?.HideHuLu ?? !1)));
  }
  InitDebugWeaponVisibleDataById(t) {
    var i =
      ConfigManager_1.ConfigManager.WeaponComponentConfig.GetWeaponVisibleConfigById(
        t,
      );
    let s = 0;
    for (const e of this.QKr.CharacterWeapons)
      e.VisibleHelper.InitBaseTable(s < i.BaseType.length ? i.BaseType[s] : 0),
        e.VisibleHelper.InitTagHelper(
          this.Lie,
          s < i.BaseType.length ? i.VisibleTags[s] : "",
          this.fQr,
          s < i.BaseType.length ? i.HiddenTags[s] : "",
          this.pQr,
        ),
        s++;
    this.HideWeapon(-1, !0, !1), (this.JKr = void 0);
  }
  ClearWeaponVisibleData() {
    if (this.QKr?.CharacterWeapons)
      for (const t of this.QKr.CharacterWeapons)
        t.VisibleHelper.ClearTagHelper();
  }
  SetWeaponVisibleByTag(t, i, s) {
    i
      ? this.HideWeapon(t.Index, !s, !0, !1, 2)
      : this.HideWeapon(t.Index, s, !0, !1, 2);
  }
  GetCurrentWeaponEquipDebugInfo() {
    let t = "";
    t += `[武器组件]{ weaponId: ${this.WeaponEquipInfo.WeaponId}, 'WeaponBreachLevel:' ${this.WeaponEquipInfo.WeaponBreachLevel}, models:${this.WeaponEquipInfo.WeaponConfig.Models}  }
`;
    for (const s of this.QKr.CharacterWeapons) {
      var i = s.Mesh;
      t += `[武器组件]{ weaponMesh: ${i.SkeletalMesh.GetName()}, AnimInstance: ${i.GetAnimInstance().GetName()},         BattleSocket: ${s.BattleSocket},NormalSocket: ${s.NormalSocket} }
`;
    }
    return t;
  }
  GetWeaponMesh() {
    return this.QKr;
  }
  IsCurrentWeaponHideEffectPlaying() {
    return (
      !!EffectSystem_1.EffectSystem.IsValid(
        this.QKr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0,
      ) &&
      EffectSystem_1.EffectSystem.IsPlaying(
        this.QKr?.CharacterWeapons[0]?.WeaponHideEffect ?? 0,
      )
    );
  }
  NQr() {
    if (this.zKr && this.QKr?.CharacterWeapons)
      for (const t of this.QKr.CharacterWeapons)
        !t.WeaponHidden &&
        EffectSystem_1.EffectSystem.IsValid(t.WeaponHideEffect) &&
        EffectSystem_1.EffectSystem.IsPlaying(t.WeaponHideEffect)
          ? this.Lie.HasTag(577301498) || this.Lie.AddTag(577301498)
          : this.Lie.HasTag(577301498) && this.Lie.RemoveTag(577301498);
  }
  $gl() {
    this.SoarWing?.SetHiddenInGame(
      this.I5r?.MoveState !== CharacterUnifiedStateTypes_1.ECharMoveState.Soar,
    );
  }
  WOc(t) {
    this.Xjt && 0 === t?.Index && t.UpdateSceneInteractEnable(0 !== this._Pr);
  }
};
(CharacterWeaponComponent = __decorate(
  [(0, RegisterComponent_1.RegisterComponent)(79)],
  CharacterWeaponComponent,
)),
  (exports.CharacterWeaponComponent = CharacterWeaponComponent);
//# sourceMappingURL=CharacterWeaponComponent.js.map
