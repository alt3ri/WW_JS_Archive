"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SpecialEnergyBarDengDeng = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  CharacterAttributeTypes_1 = require("../../../../../NewWorld/Character/Common/Component/Abilities/CharacterAttributeTypes"),
  SpecialEnergyBarBase_1 = require("../SpecialEnergyBarBase"),
  SpecialEnergyBarPercentMachine_1 = require("../SpecialEnergyBarPercentMachine"),
  SpecialEnergyBarSlotItem_1 = require("../SpecialEnergyBarSlotItem"),
  WIDTH = 190,
  EFFECT_BASE_PERCENT = 20 / 41,
  tagRed = 1783680056;
class SpecialEnergyBarDengDeng extends SpecialEnergyBarBase_1.SpecialEnergyBarBase {
  constructor() {
    super(...arguments),
      (this.ydl = void 0),
      (this.Edl = void 0),
      (this.Idl =
        new SpecialEnergyBarPercentMachine_1.SpecialEnergyBarPercentMachine()),
      (this.Tdl = 0),
      (this.Ldl = 0),
      (this.Rdl = !1),
      (this.ACl = !1),
      (this.xCl = !1),
      (this.Udl = (t, i, e) => {
        this.Idl.SetTargetPercent(this.Ddl()), this.Adl();
      }),
      (this.xdl = (t, i, e) => {
        this.Idl.SetTargetPercent(this.Ddl()), this.Adl();
      }),
      (this.Pdl = (t, i) => {
        i !== this.Rdl && ((this.Rdl = i), this.wdl());
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UINiagara],
      [6, UE.UINiagara],
    ];
  }
  OnInitData() {
    super.OnInitData(),
      (this.Tdl = CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2),
      (this.Ldl =
        CharacterAttributeTypes_1.EAttributeId.Proto_SpecialEnergy2Max),
      (this.Rdl = this.TagComponent.HasTag(tagRed)),
      this.Idl.Init(this.Ddl());
  }
  async OnBeforeStartAsync() {
    var t = [];
    t.push(this.Bdl(this.GetItem(0))),
      t.push(this.bdl(this.GetItem(1))),
      t.push(this.LoadEffects()),
      t.push(this.InitKeyItem(this.GetItem(2))),
      await Promise.all(t);
  }
  async Bdl(t) {
    (this.ydl = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem()),
      await this.ydl.CreateThenShowByActorAsync(t.GetOwner());
  }
  async bdl(t) {
    (this.Edl = new SpecialEnergyBarSlotItem_1.SpecialEnergyBarSlotItem()),
      await this.Edl.CreateThenShowByActorAsync(t.GetOwner());
  }
  AddEvents() {
    super.AddEvents(),
      this.ListenForAttributeChanged(this.Tdl, this.Udl),
      this.ListenForAttributeChanged(this.Ldl, this.xdl),
      this.ListenForTagAddOrRemoveChanged(tagRed, this.Pdl);
  }
  RemoveEvents() {
    super.RemoveEvents(),
      this.RemoveListenAttributeChanged(this.Tdl, this.Udl),
      this.RemoveListenAttributeChanged(this.Ldl, this.xdl);
  }
  OnStart() {
    this.Config &&
      (this.ydl.SetEffectBasePercent(EFFECT_BASE_PERCENT),
      this.Edl.SetEffectBasePercent(EFFECT_BASE_PERCENT),
      this.qdl(
        this.ydl,
        this.Config.PointColorList[0],
        this.Config.PointColorList[1],
        this.Config.EffectColor,
      ),
      this.qdl(
        this.Edl,
        this.Config.PointColorList[2],
        this.Config.PointColorList[3],
        this.Config.OtherEffectColorList[0],
      ),
      this.ydl.ReplaceFullEffect(this.NiagaraList[0]),
      this.Edl.ReplaceFullEffect(this.NiagaraList[1]),
      this.wdl(!0),
      this.Gdl(!0),
      this.kdl(!0),
      this.Odl(!0));
  }
  qdl(t, i, e, s) {
    (i = UE.Color.FromHex(i)),
      (e = UE.Color.FromHex(e)),
      (s = new UE.LinearColor(UE.Color.FromHex(s)));
    t.SetPointBgColor(i),
      t.SetBarColor(e),
      t.SetPointColor(e),
      t.SetBgAndUseEffectColor(s);
  }
  wdl(t = !1) {
    Log_1.Log.CheckDebug() &&
      Log_1.Log.Debug("Battle", 17, "灯灯能量条改变状态", ["isRed", this.Rdl]),
      this.GetItem(3)?.SetUIActive(!this.Rdl),
      this.GetItem(4)?.SetUIActive(this.Rdl),
      t || this.Odl();
  }
  Gdl(t = !1) {
    var i = this.PercentMachine.GetCurPercent(),
      i =
        (this.ydl.UpdatePercent(i, i >= this.Config.DisableKeyOnPercent),
        this.GetItem(3)?.SetAnchorOffsetX(-i * WIDTH),
        this.Rdl || t || this.Odl(),
        0 < i);
    (!t && i === this.ACl) ||
      ((this.ACl = i), this.GetUiNiagara(5)?.SetUIActive(i));
  }
  kdl(t = !1) {
    var i = this.Idl.GetCurPercent(),
      i =
        (this.Edl.UpdatePercent(i, i >= this.Config.DisableKeyOnPercent),
        this.GetItem(4)?.SetAnchorOffsetX(i * WIDTH),
        this.Rdl && !t && this.Odl(t),
        0 < i);
    (!t && i === this.xCl) ||
      ((this.xCl = i), this.GetUiNiagara(6)?.SetUIActive(i));
  }
  Odl(t = !1) {
    this.KeyItem?.RefreshKeyEnable(this.GetKeyEnable(), t);
  }
  GetKeyEnable() {
    let t = 0;
    return (
      (t = (this.Rdl ? this.Idl : this.PercentMachine).GetCurPercent()) >=
      this.Config.DisableKeyOnPercent
    );
  }
  OnBarPercentChanged() {
    this.Gdl();
  }
  Adl() {
    this.kdl();
  }
  Tick(t) {
    super.Tick(t),
      this.Idl.Update(t) && this.Adl(),
      this.ydl?.Tick(t),
      this.Edl?.Tick(t);
  }
  Ddl() {
    var t = this.AttributeComponent.GetCurrentValue(this.Tdl),
      i = this.AttributeComponent.GetCurrentValue(this.Ldl);
    let e = 0 < i ? t / i : 0;
    return e;
  }
}
exports.SpecialEnergyBarDengDeng = SpecialEnergyBarDengDeng;
//# sourceMappingURL=SpecialEnergyBarDengDeng.js.map
