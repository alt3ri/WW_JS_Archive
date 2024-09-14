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
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView");
var EAttributeId = Protocol_1.Aki.Protocol.Vks;
const LOW_HP_PERCENT = 0.2;
class RoleStateView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Wst = void 0),
      (this.E0 = void 0),
      (this.$te = void 0),
      (this.l1t = void 0),
      (this.cmt = void 0),
      (this.snt = -1),
      (this.j1t = 0),
      (this.W1t = 0),
      (this.K1t = -1),
      (this.Xrt = 0),
      (this.mmt = void 0),
      (this.dmt = new UE.Margin()),
      (this.Cmt = 0),
      (this.gmt = void 0),
      (this.fmt = !1),
      (this.u$e = (t) => {
        t === this.E0 && this.RefreshHpAndShield(!0);
      }),
      (this.hXe = (t) => {
        t === this.E0 &&
          (this.RefreshHpAndShield(!0), this.SetNiagaraActive(!0));
      }),
      (this.m2 = (t) => {
        t === this.E0 && this.pmt();
      }),
      (this.vmt = () => {
        this.pmt(), this.RefreshHpAndShield();
      }),
      (this.pmt = () => {
        var t, i;
        this.IsValid() &&
          ((t = this.GetText(2)),
          2 !== this.Wst.RoleConfig?.RoleType && (i = this.$te)
            ? ((i = i.GetCurrentValue(EAttributeId.Proto_Lv)),
              LguiUtil_1.LguiUtil.SetLocalText(t, "LevelShow", i))
            : t.SetText(""));
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
      (this.Xrt = CommonParamById_1.configCommonParamById.GetIntConfig(
        "PlayerHPAttenuateBufferSpeed",
      )),
      (this.mmt = this.GetItem(8)
        .GetOwner()
        .GetComponentByClass(UE.LGUICanvas.StaticClass())),
      (this.Cmt = this.GetText(1).GetWidth()),
      (this.gmt = new LevelSequencePlayer_1.LevelSequencePlayer(
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
      ? ((this.Wst = t),
        (this.E0 = t?.EntityHandle?.Id),
        (this.$te = t.AttributeComponent),
        (this.l1t = t?.EntityHandle?.Entity?.GetComponent(67)),
        this.RefreshRoleState())
      : ((this.Wst = void 0),
        (this.E0 = void 0),
        (this.$te = void 0),
        (this.l1t = void 0),
        this.Mmt());
  }
  IsValid() {
    return void 0 !== this.Wst?.EntityHandle;
  }
  GetEntityId() {
    return this.E0;
  }
  Ore() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.BattleUiHealthChanged,
      this.hXe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.u$e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BattleUiLevelChanged,
        this.m2,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.vmt,
      );
  }
  kre() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.BattleUiHealthChanged,
      this.hXe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiShieldChanged,
        this.u$e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BattleUiLevelChanged,
        this.m2,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.vmt,
      );
  }
  Tick(t) {
    this.nmt(t);
  }
  Mmt() {
    TimerSystem_1.TimerSystem.Has(this.cmt) &&
      TimerSystem_1.TimerSystem.Remove(this.cmt),
      this.ist(),
      (this.cmt = void 0),
      this.IsShowOrShowing && this.Hide();
  }
  nmt(t) {
    var i;
    -1 === this.K1t ||
      (this.K1t >= this.Xrt && this.ist(), this.j1t >= this.W1t) ||
      ((i = this.K1t / this.Xrt),
      (i = MathUtils_1.MathUtils.Lerp(this.W1t, this.j1t, i)),
      this.ast(i),
      (this.K1t = this.K1t + t));
  }
  SetNiagaraActive(t) {
    var i = this.GetUiNiagara(6);
    i.SetUIActive(t),
      t
        ? (i.SetNiagaraVarFloat("Dissolve", this.snt), i.ActivateSystem(!0))
        : i.DeactivateSystem();
  }
  RefreshRoleState() {
    this.IsValid() &&
      (this.ist(),
      this.RefreshHpAndShield(),
      this.pmt(),
      this.IsShowOrShowing || this.Show());
  }
  RefreshHpAndShield(t = !1) {
    var i, e, s, h;
    this.IsValid() &&
      (i = this.$te) &&
      ((h = i.GetCurrentValue(EAttributeId.Proto_Life)),
      (i = i.GetCurrentValue(EAttributeId.l5n)),
      (s = this.l1t.ShieldTotal),
      (e = h / i),
      (s = Math.min(s / i, 1)),
      (h = Math.ceil(h) + "/" + Math.ceil(i)),
      (this.dmt.Right = -(1 - e) * this.Cmt),
      this.mmt.SetRectClipOffset(this.dmt),
      this.GetText(1).SetText(h),
      this.GetText(7).SetText(h),
      this.Cst(e),
      this.gst(s),
      t ? this.fst() : this.ist(),
      (this.snt = e));
  }
  fst() {
    var t,
      i = this.$te;
    i &&
      ((i =
        i.GetCurrentValue(EAttributeId.Proto_Life) /
        i.GetCurrentValue(EAttributeId.l5n)),
      (t = this.snt) <= i || ((this.j1t = i), (this.W1t = t), (this.K1t = 0)));
  }
  ast(t) {
    var i = this.GetSprite(4);
    i.SetFillAmount(t), i.SetUIActive(!0);
  }
  ist() {
    this.GetSprite(4).SetUIActive(!1),
      (this.j1t = 0),
      (this.W1t = 0),
      (this.K1t = -1);
  }
  Cst(t) {
    this.Emt(t);
    var i = this.GetSprite(3),
      e = this.GetSprite(0);
    i.bIsUIActive && i.SetFillAmount(t), e.bIsUIActive && e.SetFillAmount(t);
  }
  Emt(t) {
    var i = this.GetSprite(3),
      e = this.GetSprite(0);
    t <= LOW_HP_PERCENT
      ? (i.SetUIActive(!0), e.SetUIActive(!1))
      : (i.SetUIActive(!1), e.SetUIActive(!0));
  }
  gst(t) {
    var i = this.GetSprite(5),
      e = 0 < t;
    i.SetUIActive(e),
      this.fmt !== e &&
        (this.fmt = e) &&
        this.gmt.PlayLevelSequenceByName("Start"),
      e && i.SetFillAmount(t);
  }
}
exports.RoleStateView = RoleStateView;
//# sourceMappingURL=RoleStateView.js.map
