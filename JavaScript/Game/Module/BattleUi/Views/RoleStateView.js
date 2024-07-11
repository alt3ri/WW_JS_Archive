"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RoleStateView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView");
var EAttributeId = Protocol_1.Aki.Protocol.KBs;
const LOW_HP_PERCENT = 0.2;
class RoleStateView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.wnt = void 0),
      (this.E0 = void 0),
      (this.$te = void 0),
      (this.Yht = void 0),
      (this.ect = void 0),
      (this.Xot = -1),
      (this.xlt = 0),
      (this.wlt = 0),
      (this.Blt = -1),
      (this.qot = 0),
      (this.tct = void 0),
      (this.ict = new UE.Margin()),
      (this.oct = 0),
      (this.rct = void 0),
      (this.nct = !1),
      (this.ZQe = (t) => {
        t === this.E0 && this.RefreshHpAndShield(!0);
      }),
      (this.YKe = (t) => {
        t === this.E0 &&
          (this.RefreshHpAndShield(!0), this.SetNiagaraActive(!0));
      }),
      (this.m2 = (t) => {
        t === this.E0 && this.sct();
      }),
      (this.act = () => {
        this.sct(), this.RefreshHpAndShield();
      }),
      (this.sct = () => {
        if (this.IsValid()) {
          var t = this.GetText(2);
          if (2 === this.wnt.RoleConfig?.RoleType) t.SetText("");
          else {
            var i = this.wnt.CreatureRoleId,
              i = ModelManager_1.ModelManager.RoleModel.GetRoleDataById(i);
            if (i?.IsTrialRole()) {
              const e = i.GetLevelData().GetLevel();
              void LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e);
            } else {
              i = this.$te;
              if (i) {
                const e = i.GetCurrentValue(EAttributeId.Proto_Lv);
                LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", e);
              } else t.SetText("");
            }
          }
        }
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UINiagara],
      [7, UE.UIText],
      [8, UE.UIItem],
    ];
  }
  Initialize(t) {
    super.Initialize(t),
      (this.qot = CommonParamById_1.configCommonParamById.GetIntConfig(
        "PlayerHPAttenuateBufferSpeed",
      )),
      (this.tct = this.GetItem(8)
        .GetOwner()
        .GetComponentByClass(UE.LGUICanvas.StaticClass())),
      (this.oct = this.GetText(1).GetWidth()),
      (this.rct = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.GetSprite(5),
      )),
      this.Ore();
  }
  OnBeforeDestroy() {
    this.Refresh(void 0);
  }
  Reset() {
    this.kre(), super.Reset();
  }
  Refresh(t) {
    t
      ? ((this.wnt = t),
        (this.E0 = t?.EntityHandle?.Id),
        (this.$te = t.AttributeComponent),
        (this.Yht = t?.EntityHandle?.Entity?.GetComponent(64)),
        this.RefreshRoleState())
      : ((this.wnt = void 0),
        (this.E0 = void 0),
        (this.$te = void 0),
        (this.Yht = void 0),
        this.hct());
  }
  IsValid() {
    return void 0 !== this.wnt?.EntityHandle;
  }
  GetEntityId() {
    return this.E0;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiHealthChanged,
      this.YKe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.ZQe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiLevelChanged,
        this.m2,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.act,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiHealthChanged,
      this.YKe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.ZQe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiLevelChanged,
        this.m2,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.act,
      );
  }
  Tick(t) {
    this.Qut(t);
  }
  hct() {
    TimerSystem_1.TimerSystem.Has(this.ect) &&
      TimerSystem_1.TimerSystem.Remove(this.ect),
      this.Hrt(),
      (this.ect = void 0),
      this.IsShowOrShowing && this.Hide();
  }
  Qut(t) {
    var i;
    -1 === this.Blt ||
      (this.Blt >= this.qot && this.Hrt(), this.xlt >= this.wlt) ||
      ((i = this.Blt / this.qot),
      (i = MathUtils_1.MathUtils.Lerp(this.wlt, this.xlt, i)),
      this.Xrt(i),
      (this.Blt = this.Blt + t));
  }
  SetNiagaraActive(t) {
    var i = this.GetUiNiagara(6);
    i.SetUIActive(t),
      t
        ? (i.SetNiagaraVarFloat("Dissolve", this.Xot), i.ActivateSystem(!0))
        : i.DeactivateSystem();
  }
  RefreshRoleState() {
    this.IsValid() &&
      (this.Hrt(),
      this.RefreshHpAndShield(),
      this.sct(),
      this.IsShowOrShowing || this.Show());
  }
  RefreshHpAndShield(t = !1) {
    var i, e, s, h;
    this.IsValid() &&
      (i = this.$te) &&
      ((h = i.GetCurrentValue(EAttributeId.Proto_Life)),
      (i = i.GetCurrentValue(EAttributeId.Tkn)),
      (s = this.Yht.ShieldTotal),
      (e = h / i),
      (s = Math.min(s / i, 1)),
      (h = Math.ceil(h) + "/" + Math.ceil(i)),
      (this.ict.Right = -(1 - e) * this.oct),
      this.tct.SetRectClipOffset(this.ict),
      this.GetText(1).SetText(h),
      this.GetText(7).SetText(h),
      this.int(e),
      this.ont(s),
      t ? this.rnt() : this.Hrt(),
      (this.Xot = e));
  }
  rnt() {
    var t,
      i = this.$te;
    i &&
      ((i =
        i.GetCurrentValue(EAttributeId.Proto_Life) /
        i.GetCurrentValue(EAttributeId.Tkn)),
      (t = this.Xot) <= i || ((this.xlt = i), (this.wlt = t), (this.Blt = 0)));
  }
  Xrt(t) {
    var i = this.GetSprite(4);
    i.SetFillAmount(t), i.SetUIActive(!0);
  }
  Hrt() {
    this.GetSprite(4).SetUIActive(!1),
      (this.xlt = 0),
      (this.wlt = 0),
      (this.Blt = -1);
  }
  int(t) {
    this.lct(t);
    var i = this.GetSprite(3),
      e = this.GetSprite(0);
    i.bIsUIActive && i.SetFillAmount(t), e.bIsUIActive && e.SetFillAmount(t);
  }
  lct(t) {
    var i = this.GetSprite(3),
      e = this.GetSprite(0);
    t <= LOW_HP_PERCENT
      ? (i.SetUIActive(!0), e.SetUIActive(!1))
      : (i.SetUIActive(!1), e.SetUIActive(!0));
  }
  ont(t) {
    var i = this.GetSprite(5),
      e = 0 < t;
    i.SetUIActive(e),
      this.nct !== e &&
        (this.nct = e) &&
        this.rct.PlayLevelSequenceByName("Start"),
      e && i.SetFillAmount(t);
  }
}
exports.RoleStateView = RoleStateView;
//# sourceMappingURL=RoleStateView.js.map
