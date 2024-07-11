"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HeadStateData = void 0);
const UE = require("ue");
const Log_1 = require("../../../../../Core/Common/Log");
const Protocol_1 = require("../../../../../Core/Define/Net/Protocol");
const FNameUtil_1 = require("../../../../../Core/Utils/FNameUtil");
const Vector_1 = require("../../../../../Core/Utils/Math/Vector");
const CameraController_1 = require("../../../../Camera/CameraController");
const TsBaseCharacter_1 = require("../../../../Character/TsBaseCharacter");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const GlobalData_1 = require("../../../../GlobalData");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ColorUtils_1 = require("../../../../Utils/ColorUtils");
const EAttributeId = Protocol_1.Aki.Protocol.KBs;
const RegisterComponent_1 = require("../../../../../Core/Entity/RegisterComponent");
const SOCKET_NAME = new UE.FName("MarkCase");
class HeadStateData {
  constructor() {
    (this.CommonParam = void 0),
      (this.Jh = void 0),
      (this.E0 = 0),
      (this.OC = void 0),
      (this.$ht = void 0),
      (this.ActorComponent = void 0),
      (this.Xte = void 0),
      (this.$te = void 0),
      (this.Yht = void 0),
      (this.Jht = void 0),
      (this.zht = void 0),
      (this.Zht = void 0),
      (this.elt = void 0),
      (this.tlt = void 0),
      (this.ilt = !1),
      (this.tfe = void 0),
      (this.olt = void 0),
      (this.rlt = 0),
      (this.nlt = 0),
      (this.slt = void 0),
      (this.hlt = void 0),
      (this.llt = void 0),
      (this._lt = Vector_1.Vector.Create()),
      (this.ult = Vector_1.Vector.Create()),
      (this.clt = void 0),
      (this.mlt = void 0),
      (this.dlt = void 0),
      (this.Clt = void 0),
      (this.glt = void 0),
      (this.flt = void 0),
      (this.plt = void 0),
      (this.vlt = void 0),
      (this.Mlt = void 0),
      (this.Slt = void 0),
      (this.Elt = void 0),
      (this.ylt = void 0),
      (this.Ilt = void 0),
      (this.Tlt = void 0),
      (this.Llt = void 0),
      (this.Dlt = void 0),
      (this.HasHideTag = !1),
      (this.HasDeadTag = !1),
      (this.HasFightTag = !1),
      (this.HasFallDownTag = !1),
      (this.Camp = 1),
      (this.Rlt = ""),
      (this.DistanceSquared = 0),
      (this.OriginalHp = 0),
      (this.ZQe = (t) => {
        this.clt && this.clt(t);
      }),
      (this.kot = (t, i) => {
        (this.HasFallDownTag = i), this.mlt && this.mlt();
      }),
      (this.Ult = (t, i) => {
        this.dlt && this.dlt(t, i);
      }),
      (this.Bht = (t) => {
        this.Clt && this.Clt(t);
      }),
      (this.Alt = (t, i) => {
        this.glt && this.glt(i);
      }),
      (this.Not = (t, i) => {
        this.flt && this.flt(i);
      }),
      (this.Fot = (t, i) => {
        this.plt && this.plt(i);
      }),
      (this.Vot = (t, i) => {
        this.vlt && this.vlt(i);
      }),
      (this.Nnt = (t, i) => {
        this.HasHideTag = i;
      }),
      (this.QQe = (t, i) => {
        this.HasDeadTag = i;
      }),
      (this.$Ke = (t, i) => {
        this.HasFightTag = i;
      }),
      (this.Hot = (t, i, s) => {
        this.Mlt && this.Mlt(t, i, s);
      }),
      (this.m2 = (t, i, s) => {
        this.Slt && this.Slt(t, i, s);
      }),
      (this.Ght = () => {
        this.Elt && this.Elt();
      }),
      (this.Plt = (t) => {
        this.ylt && this.ylt(t);
      });
  }
  Initialize(t) {
    (this.CommonParam =
      ModelManager_1.ModelManager.BattleUiModel.HeadStateCommonParam),
      (this.Jh = t),
      (this.E0 = t.Id),
      (this.OC = t.GetComponent(1)?.Owner),
      (this.ActorComponent = t.GetComponent(1)),
      (this.$te = t.GetComponent(156)),
      (this.Xte = t.GetComponent(185)),
      (this.Yht = t.GetComponent(64)),
      (this.Jht = t.GetComponent(132)),
      (this.zht = t.GetComponent(0)),
      (this.Zht = this.Jh.GetComponent(19)),
      (this.elt = this.Jh.GetComponent(157)),
      (this.tlt = this.Jh.GetComponent(114));
    var t = this.zht.GetBaseInfo();
    (this.$ht = t?.HeadStateViewConfig),
      (this.ilt = !1),
      this.OC instanceof TsBaseCharacter_1.default &&
        ((this.tfe = this.OC.Mesh),
        (t = this.$ht?.HeadStateSocketName),
        (t = FNameUtil_1.FNameUtil.GetDynamicFName(t)),
        (this.olt = t || SOCKET_NAME),
        (this.ilt = this.tfe.DoesSocketExist(this.olt))),
      (this.rlt = this.$ht?.ZOffset ?? 0),
      (this.nlt = this.$ht?.ForwardOffset ?? 0),
      (this.Camp = this.zht.GetEntityCamp()),
      (this.Rlt = ModelManager_1.ModelManager.BattleUiModel.GetHeadStateHpColor(
        this.Camp,
      )),
      (this.HasHideTag = this.Xte?.HasTag(-13489149)),
      (this.HasFallDownTag = this.Xte?.HasTag(1922078392)),
      this.Rlt ||
        (Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "Battle",
            18,
            "[headState]该怪物阵营没有配置血条颜色",
            ["EntityId", this.E0],
            ["PbDataId", this.zht.GetPbDataId()],
            ["Camp", this.Camp],
            ["HpColor", this.Rlt],
          ),
        (this.Rlt =
          ModelManager_1.ModelManager.BattleUiModel.GetHeadStateHpColor(1))),
      this.eXe();
  }
  Clear() {
    this.tXe(),
      this.UnBindAllCallback(),
      (this.Jh = void 0),
      (this.OC = void 0),
      (this.ActorComponent = void 0),
      (this.$te = void 0),
      (this.Xte = void 0),
      (this.Yht = void 0),
      (this.Jht = void 0),
      (this.zht = void 0),
      (this.$ht = void 0),
      (this.HasHideTag = !1),
      (this.HasDeadTag = !1),
      (this.HasFightTag = !1),
      (this.HasFallDownTag = !1);
  }
  UnBindAllCallback() {
    (this.clt = void 0),
      (this.mlt = void 0),
      (this.dlt = void 0),
      (this.Clt = void 0),
      (this.glt = void 0),
      (this.flt = void 0),
      (this.plt = void 0),
      (this.vlt = void 0),
      (this.Mlt = void 0),
      (this.Slt = void 0),
      (this.Elt = void 0),
      (this.ylt = void 0);
  }
  eXe() {
    let t;
    this.Jh &&
      (EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharShieldChange,
        this.ZQe,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharShieldChange,
          this.ZQe,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharBeHitTimeScale,
        this.Ult,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.Ult,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemDurabilityChange,
        this.Bht,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Bht,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemEntityHit,
        this.Ght,
      ) ||
        EventSystem_1.EventSystem.AddWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemEntityHit,
          this.Ght,
        ),
      (t = this.Jh.GetComponent(185))?.Valid &&
        ((this.slt = t.ListenForTagAddOrRemove(242005298, this.Alt)),
        (this.slt = t.ListenForTagAddOrRemove(1261361093, this.Not)),
        (this.hlt = t.ListenForTagAddOrRemove(-1109506297, this.Fot)),
        (this.llt = t.ListenForTagAddOrRemove(-1838149281, this.Vot)),
        (this.Ilt = t.ListenForTagAddOrRemove(-13489149, this.Nnt)),
        (this.Tlt = t.ListenForTagAddOrRemove(1008164187, this.QQe)),
        (this.Llt = t.ListenForTagAddOrRemove(1996802261, this.$Ke)),
        (this.Dlt = t.ListenForTagAddOrRemove(1922078392, this.kot))),
      (t = this.Jh.GetComponent(156))?.Valid &&
        (t.AddListener(
          EAttributeId.Proto_Hardness,
          this.Hot,
          "Hardness.HeadState",
        ),
        t.AddListener(EAttributeId.Proto_Rage, this.Hot, "Range.HeadState"),
        t.AddListener(EAttributeId.Proto_Lv, this.m2, "Lv.HeadState")),
      (t = this.Jh.GetComponent(114))?.Valid) &&
      t.AddProgressDataChangedCallback(this.Plt);
  }
  tXe() {
    let t;
    this.Jh &&
      (EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharShieldChange,
        this.ZQe,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharShieldChange,
          this.ZQe,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharBeHitTimeScale,
        this.Ult,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.CharBeHitTimeScale,
          this.Ult,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemDurabilityChange,
        this.Bht,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemDurabilityChange,
          this.Bht,
        ),
      EventSystem_1.EventSystem.HasWithTarget(
        this.Jh,
        EventDefine_1.EEventName.OnSceneItemEntityHit,
        this.Ght,
      ) &&
        EventSystem_1.EventSystem.RemoveWithTarget(
          this.Jh,
          EventDefine_1.EEventName.OnSceneItemEntityHit,
          this.Ght,
        ),
      this.slt && (this.slt.EndTask(), (this.slt = void 0)),
      this.llt && (this.llt.EndTask(), (this.llt = void 0)),
      this.hlt && (this.hlt.EndTask(), (this.hlt = void 0)),
      this.Ilt && (this.Ilt.EndTask(), (this.Ilt = void 0)),
      this.Tlt && (this.Tlt.EndTask(), (this.Tlt = void 0)),
      this.Llt && (this.Llt.EndTask(), (this.Llt = void 0)),
      this.Dlt && (this.Dlt.EndTask(), (this.Dlt = void 0)),
      (t = this.Jh?.GetComponent(156)) &&
        (t.RemoveListener(EAttributeId.Proto_Hardness, this.Hot),
        t.RemoveListener(EAttributeId.Proto_Rage, this.Hot),
        t.RemoveListener(EAttributeId.Proto_Lv, this.m2)),
      (t = this.Jh?.GetComponent(114))) &&
      t.RemoveProgressDataChangedCallback(this.Plt);
  }
  BindOnShieldChanged(t) {
    this.clt = t;
  }
  BindOnFallDownVisibleChange(t) {
    this.mlt = t;
  }
  BindOnTimeScale(t) {
    this.dlt = t;
  }
  BindOnSceneItemDurabilityChange(t) {
    this.Clt = t;
  }
  BindOnHardnessHideChanged(t) {
    this.flt = t;
  }
  BindOnVulnerabilityActivated(t) {
    this.glt = t;
  }
  BindOnHardnessActivated(t) {
    this.plt = t;
  }
  BindOnRageActivated(t) {
    this.vlt = t;
  }
  BindOnHardnessChanged(t) {
    this.Mlt = t;
  }
  BindOnLevelChanged(t) {
    this.Slt = t;
  }
  BindOnSceneItemEntityHit(t) {
    this.Elt = t;
  }
  BindOnProgressControlDataChange(t) {
    this.ylt = t;
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
    return this.$te ? this.$te.GetCurrentValue(EAttributeId.Tkn) : 1;
  }
  GetHp() {
    return this.$te ? this.$te.GetCurrentValue(EAttributeId.Proto_Life) : 0;
  }
  GetShield() {
    return this.Yht ? this.Yht.ShieldTotal : 0;
  }
  GetHpAndMaxHp() {
    return [this.GetHp(), this.GetMaxHp()];
  }
  GetMaxDurable() {
    return this.Jht ? this.Jht.GetMaxDurablePoint() : 1;
  }
  GetDurable() {
    return this.zht ? this.zht.GetDurabilityValue() : 0;
  }
  GetHpAndShieldPercent() {
    const [t, i] = this.GetHpAndMaxHp();
    const s = this.GetShield();
    const h = s <= i ? s / i : 1;
    return [t / i, h];
  }
  GetWorldLocation() {
    let t;
    return (
      this.ilt
        ? this._lt.FromUeVector(this.tfe.GetSocketLocation(this.olt))
        : ((t = this.ActorComponent.ActorLocationProxy),
          this._lt.FromUeVector(t)),
      this.CommonParam.DrawHeadStateSocket &&
        UE.KismetSystemLibrary.DrawDebugSphere(
          GlobalData_1.GlobalData.World,
          this._lt.ToUeVector(),
          4,
          8,
          ColorUtils_1.ColorUtils.LinearYellow,
          0,
          3,
        ),
      (this._lt.Z += this.rlt),
      this.nlt !== 0 &&
        (CameraController_1.CameraController.CameraLocation.Subtraction(
          this._lt,
          this.ult,
        ),
        this.ult.Normalize(),
        this.ult.MultiplyEqual(this.nlt),
        this._lt.Addition(this.ult, this._lt)),
      this._lt
    );
  }
  RefreshDistance() {
    this.DistanceSquared = this.GetSquaredDistanceToMonster();
  }
  GetSquaredDistanceToMonster() {
    const t = CameraController_1.CameraController.CameraLocation;
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
          Protocol_1.Aki.Protocol.HBs.Proto_Monster ||
        ((0, RegisterComponent_1.isComponentInstance)(this.ActorComponent, 3) &&
          this.ActorComponent.IsBoss)
      )
    );
  }
  IsSceneItem() {
    return (
      !!this.ActorComponent?.Valid &&
      this.ActorComponent.CreatureData.GetEntityType() ===
        Protocol_1.Aki.Protocol.HBs.Proto_SceneItem
    );
  }
  GetHeadStateType() {
    if (this.zht?.Valid) return this.$ht?.HeadStateViewType ?? 0;
  }
  GetAllCurrentCueRef() {
    if (this.Zht) return this.Zht.GetAllCurrentCueRef();
  }
  GetHardnessColor() {
    if (this.zht) {
      let t = this.zht.GetAttributeComponent();
      if (t)
        return (
          (t = t.PropertyId),
          (t = ConfigManager_1.ConfigManager.BattleUiConfig.GetPropertyType(t)),
          ModelManager_1.ModelManager.BattleUiModel.GetPropertyColor(t)
        );
    }
  }
  GetHpColor() {
    return this.Rlt;
  }
  GetBuff(t) {
    return this.elt?.GetBuffByHandle(t);
  }
  GetProgressControlData() {
    return this.tlt?.GetProgressData();
  }
  SetOriginalHp(t) {
    this.OriginalHp = t;
  }
}
exports.HeadStateData = HeadStateData;
// # sourceMappingURL=HeadStateData.js.map
