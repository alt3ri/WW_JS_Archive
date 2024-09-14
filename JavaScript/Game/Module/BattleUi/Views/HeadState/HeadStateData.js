"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStateData = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil"),
  Vector_1 = require("../../../../../Core/Utils/Math/Vector"),
  CameraController_1 = require("../../../../Camera/CameraController"),
  TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../../../GlobalData"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ColorUtils_1 = require("../../../../Utils/ColorUtils");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent"),
  SOCKET_NAME = new UE.FName("MarkCase"),
  UPDATE_TOLERATION = 0.1;
class HeadStateData {
  constructor() {
    (this.CommonParam = void 0),
      (this.Jh = void 0),
      (this.E0 = 0),
      (this.OC = void 0),
      (this.h1t = void 0),
      (this.ActorComponent = void 0),
      (this.Xte = void 0),
      (this.$te = void 0),
      (this.l1t = void 0),
      (this._1t = void 0),
      (this.u1t = void 0),
      (this.c1t = void 0),
      (this.m1t = void 0),
      (this.d1t = void 0),
      (this.C1t = !1),
      (this.tfe = void 0),
      (this.g1t = void 0),
      (this.f1t = 0),
      (this.p1t = 0),
      (this.v1t = void 0),
      (this.M1t = void 0),
      (this.E1t = void 0),
      (this.S1t = Vector_1.Vector.Create()),
      (this._Oa = Vector_1.Vector.Create()),
      (this.uOa = Vector_1.Vector.Create()),
      (this.y1t = Vector_1.Vector.Create()),
      (this.I1t = void 0),
      (this.T1t = void 0),
      (this.L1t = void 0),
      (this.D1t = void 0),
      (this.R1t = void 0),
      (this.U1t = void 0),
      (this.A1t = void 0),
      (this.P1t = void 0),
      (this.x1t = void 0),
      (this.w1t = void 0),
      (this.B1t = void 0),
      (this.b1t = void 0),
      (this.q1t = void 0),
      (this.G1t = void 0),
      (this.N1t = void 0),
      (this.O1t = void 0),
      (this.HasHideTag = !1),
      (this.HasDeadTag = !1),
      (this.HasFightTag = !1),
      (this.HasFallDownTag = !1),
      (this.Camp = 1),
      (this.k1t = ""),
      (this.DistanceSquared = 0),
      (this.OriginalHp = 0),
      (this.u$e = (t) => {
        this.I1t && this.I1t(t);
      }),
      (this.zrt = (t, i) => {
        (this.HasFallDownTag = i), this.T1t && this.T1t();
      }),
      (this.F1t = (t, i) => {
        this.L1t && this.L1t(t, i);
      }),
      (this.Qlt = (t) => {
        this.D1t && this.D1t(t);
      }),
      (this.V1t = (t, i) => {
        this.R1t && this.R1t(i);
      }),
      (this.Yrt = (t, i) => {
        this.U1t && this.U1t(i);
      }),
      (this.Zrt = (t, i) => {
        this.A1t && this.A1t(i);
      }),
      (this.ent = (t, i) => {
        this.P1t && this.P1t(i);
      }),
      (this.Yst = (t, i) => {
        this.HasHideTag = i;
      }),
      (this.n$e = (t, i) => {
        this.HasDeadTag = i;
      }),
      (this.aXe = (t, i) => {
        this.HasFightTag = i;
      }),
      (this.tnt = (t, i, s) => {
        this.x1t && this.x1t(t, i, s);
      }),
      (this.m2 = (t, i, s) => {
        this.w1t && this.w1t(t, i, s);
      }),
      (this.Ylt = () => {
        this.B1t && this.B1t();
      }),
      (this.H1t = (t) => {
        this.b1t && this.b1t(t);
      });
  }
  Initialize(t) {
    (this.CommonParam =
      ModelManager_1.ModelManager.BattleUiModel.HeadStateCommonParam),
      (this.Jh = t),
      (this.E0 = t.Id),
      (this.OC = t.GetComponent(1)?.Owner),
      (this.ActorComponent = t.GetComponent(1)),
      (this.$te = t.GetComponent(159)),
      (this.Xte = t.GetComponent(190)),
      (this.l1t = t.GetComponent(67)),
      (this._1t = t.GetComponent(135)),
      (this.u1t = t.GetComponent(0)),
      (this.c1t = this.Jh.GetComponent(19)),
      (this.m1t = this.Jh.GetComponent(160)),
      (this.d1t = this.Jh.GetComponent(117));
    var t = this.u1t.GetBaseInfo();
    (this.h1t = t?.HeadStateViewConfig),
      (this.C1t = !1),
      this.OC instanceof TsBaseCharacter_1.default &&
        ((this.tfe = this.OC.Mesh),
        (t = this.h1t?.HeadStateSocketName),
        (t = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
        (this.g1t = t || SOCKET_NAME),
        (this.C1t = this.tfe.DoesSocketExist(this.g1t))),
      (this.f1t = this.h1t?.ZOffset ?? 0),
      (this.p1t = this.h1t?.ForwardOffset ?? 0),
      (this.Camp = this.u1t.GetEntityCamp()),
      (this.k1t = ModelManager_1.ModelManager.BattleUiModel.GetHeadStateHpColor(
        this.Camp,
      )),
      (this.HasHideTag = this.Xte?.HasTag(-13489149)),
      (this.HasFallDownTag = this.Xte?.HasTag(1922078392)),
      this.k1t ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            18,
            "[headState]该怪物阵营没有配置血条颜色",
            ["EntityId", this.E0],
            ["PbDataId", this.u1t.GetPbDataId()],
            ["Camp", this.Camp],
            ["HpColor", this.k1t],
          ),
        (this.k1t =
          ModelManager_1.ModelManager.BattleUiModel.GetHeadStateHpColor(1))),
      this.c$e();
  }
  Clear() {
    this.m$e(),
      this.UnBindAllCallback(),
      (this.Jh = void 0),
      (this.OC = void 0),
      (this.ActorComponent = void 0),
      (this.$te = void 0),
      (this.Xte = void 0),
      (this.l1t = void 0),
      (this._1t = void 0),
      (this.u1t = void 0),
      (this.h1t = void 0),
      (this.HasHideTag = !1),
      (this.HasDeadTag = !1),
      (this.HasFightTag = !1),
      (this.HasFallDownTag = !1);
  }
  UnBindAllCallback() {
    (this.I1t = void 0),
      (this.T1t = void 0),
      (this.L1t = void 0),
      (this.D1t = void 0),
      (this.R1t = void 0),
      (this.U1t = void 0),
      (this.A1t = void 0),
      (this.P1t = void 0),
      (this.x1t = void 0),
      (this.w1t = void 0),
      (this.B1t = void 0),
      (this.b1t = void 0);
  }
  c$e() {
    var t;
    this.Jh &&
      (EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharShieldChange,
        this.u$e,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharShieldChange,
          this.u$e,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharBeHitTimeScale,
        this.F1t,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.F1t,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemDurabilityChange,
        this.Qlt,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Qlt,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemEntityHit,
        this.Ylt,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemEntityHit,
          this.Ylt,
        ),
      (t = this.Jh.GetComponent(190))?.Valid &&
        ((this.v1t = t.ListenForTagAddOrRemove(242005298, this.V1t)),
        (this.v1t = t.ListenForTagAddOrRemove(1261361093, this.Yrt)),
        (this.M1t = t.ListenForTagAddOrRemove(-1109506297, this.Zrt)),
        (this.E1t = t.ListenForTagAddOrRemove(-1838149281, this.ent)),
        (this.q1t = t.ListenForTagAddOrRemove(-13489149, this.Yst)),
        (this.G1t = t.ListenForTagAddOrRemove(1008164187, this.n$e)),
        (this.N1t = t.ListenForTagAddOrRemove(1996802261, this.aXe)),
        (this.O1t = t.ListenForTagAddOrRemove(1922078392, this.zrt))),
      (t = this.Jh.GetComponent(159))?.Valid &&
        (t.AddListener(
          EAttributeId.Proto_Hardness,
          this.tnt,
          "Hardness.HeadState",
        ),
        t.AddListener(EAttributeId.Proto_Rage, this.tnt, "Range.HeadState"),
        t.AddListener(EAttributeId.Proto_Lv, this.m2, "Lv.HeadState")),
      (t = this.Jh.GetComponent(117))?.Valid) &&
      t.AddProgressDataChangedCallback(this.H1t);
  }
  m$e() {
    var t;
    this.Jh &&
      (EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharShieldChange,
        this.u$e,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharShieldChange,
          this.u$e,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharBeHitTimeScale,
        this.F1t,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.F1t,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemDurabilityChange,
        this.Qlt,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Qlt,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemEntityHit,
        this.Ylt,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemEntityHit,
          this.Ylt,
        ),
      this.v1t && (this.v1t.EndTask(), (this.v1t = void 0)),
      this.E1t && (this.E1t.EndTask(), (this.E1t = void 0)),
      this.M1t && (this.M1t.EndTask(), (this.M1t = void 0)),
      this.q1t && (this.q1t.EndTask(), (this.q1t = void 0)),
      this.G1t && (this.G1t.EndTask(), (this.G1t = void 0)),
      this.N1t && (this.N1t.EndTask(), (this.N1t = void 0)),
      this.O1t && (this.O1t.EndTask(), (this.O1t = void 0)),
      (t = this.Jh?.GetComponent(159)) &&
        (t.RemoveListener(EAttributeId.Proto_Hardness, this.tnt),
        t.RemoveListener(EAttributeId.Proto_Rage, this.tnt),
        t.RemoveListener(EAttributeId.Proto_Lv, this.m2)),
      (t = this.Jh?.GetComponent(117))) &&
      t.RemoveProgressDataChangedCallback(this.H1t);
  }
  BindOnShieldChanged(t) {
    this.I1t = t;
  }
  BindOnFallDownVisibleChange(t) {
    this.T1t = t;
  }
  BindOnTimeScale(t) {
    this.L1t = t;
  }
  BindOnSceneItemDurabilityChange(t) {
    this.D1t = t;
  }
  BindOnHardnessHideChanged(t) {
    this.U1t = t;
  }
  BindOnVulnerabilityActivated(t) {
    this.R1t = t;
  }
  BindOnHardnessActivated(t) {
    this.A1t = t;
  }
  BindOnRageActivated(t) {
    this.P1t = t;
  }
  BindOnHardnessChanged(t) {
    this.x1t = t;
  }
  BindOnLevelChanged(t) {
    this.w1t = t;
  }
  BindOnSceneItemEntityHit(t) {
    this.B1t = t;
  }
  BindOnProgressControlDataChange(t) {
    this.b1t = t;
  }
  ContainsTagById(t) {
    return !!this.Xte && this.Xte.HasTag(t);
  }
  GetAttributeCurrentValueById(t) {
    return this.$te ? this.$te.GetCurrentValue(t) : 0;
  }
  GetEntity() {
    return this.Jh;
  }
  GetEntityId() {
    return this.E0;
  }
  IsEntityActive() {
    return this.Jh.Active;
  }
  GetLevel() {
    return this.$te ? this.$te.GetCurrentValue(EAttributeId.Proto_Lv) : 0;
  }
  GetMaxHp() {
    return this.$te ? this.$te.GetCurrentValue(EAttributeId.l5n) : 1;
  }
  GetHp() {
    return this.$te ? this.$te.GetCurrentValue(EAttributeId.Proto_Life) : 0;
  }
  GetShield() {
    return this.l1t ? this.l1t.ShieldTotal : 0;
  }
  GetHpAndMaxHp() {
    return [this.GetHp(), this.GetMaxHp()];
  }
  GetMaxDurable() {
    return this._1t ? this._1t.GetMaxDurablePoint() : 1;
  }
  GetDurable() {
    return this.u1t ? this.u1t.GetDurabilityValue() : 0;
  }
  GetHpAndShieldPercent() {
    var [t, i] = this.GetHpAndMaxHp(),
      s = this.GetShield();
    let h = s <= i ? s / i : 1;
    return [t / i, h];
  }
  GetWorldLocation() {
    var t;
    return (
      this.C1t
        ? this.uOa.FromUeVector(this.tfe.GetSocketLocation(this.g1t))
        : ((t = this.ActorComponent.ActorLocationProxy),
          this.uOa.FromUeVector(t)),
      this.CommonParam.DrawHeadStateSocket &&
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          this.S1t.ToUeVector(),
          4,
          8,
          ColorUtils_1.ColorUtils.LinearYellow,
          0,
          3,
        ),
      this.uOa.Equals(this._Oa, UPDATE_TOLERATION) ||
        (this._Oa.FromUeVector(this.uOa),
        this.S1t.FromUeVector(this._Oa),
        (this.S1t.Z += this.f1t),
        0 !== this.p1t &&
          (CameraController_1.CameraController.CameraLocation.Subtraction(
            this.S1t,
            this.y1t,
          ),
          this.y1t.Normalize(),
          this.y1t.MultiplyEqual(this.p1t),
          this.S1t.Addition(this.y1t, this.S1t))),
      this.S1t
    );
  }
  RefreshDistance() {
    this.DistanceSquared = this.GetSquaredDistanceToMonster();
  }
  GetSquaredDistanceToMonster() {
    var t = CameraController_1.CameraController.CameraLocation;
    return Vector_1.Vector.DistSquared(
      t,
      this.ActorComponent.ActorLocationProxy,
    );
  }
  IsNormalMonster() {
    return (
      !!this.ActorComponent?.Valid &&
      !(
        this.ActorComponent.CreatureData.GetEntityType() !==
          Protocol_1.Aki.Protocol.kks.Proto_Monster ||
        ((0, RegisterComponent_1.isComponentInstance)(this.ActorComponent, 3) &&
          this.ActorComponent.IsBoss)
      )
    );
  }
  IsSceneItem() {
    return (
      !!this.ActorComponent?.Valid &&
      this.ActorComponent.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.kks.Proto_SceneItem
    );
  }
  GetHeadStateType() {
    if (this.u1t?.Valid) return this.h1t?.HeadStateViewType ?? 0;
  }
  GetAllCurrentCueRef() {
    if (this.c1t) return this.c1t.GetAllCurrentCueRef();
  }
  GetHardnessColor() {
    if (this.u1t) {
      var t = this.u1t.GetAttributeComponent();
      if (t)
        return (
          (t = t.PropertyId),
          (t = ConfigManager_1.ConfigManager.BattleUiConfig.GetPropertyType(t)),
          ModelManager_1.ModelManager.BattleUiModel.GetPropertyColor(t)
        );
    }
  }
  GetHpColor() {
    return this.k1t;
  }
  GetBuff(t) {
    return this.m1t?.GetBuffByHandle(t);
  }
  GetProgressControlData() {
    return this.d1t?.GetProgressData();
  }
  SetOriginalHp(t) {
    this.OriginalHp = t;
  }
}
exports.HeadStateData = HeadStateData;
//# sourceMappingURL=HeadStateData.js.map
