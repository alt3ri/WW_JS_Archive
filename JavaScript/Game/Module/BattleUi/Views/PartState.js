"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PartState = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView"),
  HpBufferStateMachine_1 = require("./HeadState/HpBufferStateMachine"),
  PERCENT_TOLERATION = 0.01;
class PartState extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor(t, i) {
    super(),
      (this.Jh = void 0),
      (this.Yct = void 0),
      (this.R$e = void 0),
      (this.g1t = void 0),
      (this.Jct = (0, puerts_1.$ref)(void 0)),
      (this.tfe = void 0),
      (this.zct = !1),
      (this.snt = -0),
      (this.j1t = -0),
      (this.W1t = -0),
      (this.K1t = -1),
      (this.Zct = -0),
      (this.Z1t = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.pnt = 0),
      (this.emt = (t, i) => {
        var e = this.Yct.Life;
        this.SetVisible(2, 0 < e), this.tmt(!0);
      });
    var e = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
      "UiItem_PartState_Prefab",
    );
    this.CreateThenShowByPathAsync(
      e,
      UiLayer_1.UiLayer.GetBattleViewUnit(2),
      !0,
    ).finally(() => {
      this.InitializePartState(t, i);
    });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
    ];
  }
  OnStart() {
    this.pnt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
  }
  OnBeforeDestroy() {
    this.ResetPartState();
  }
  InitializePartState(t, i) {
    this.RootItem?.IsValid() &&
      ((this.Jh = t),
      (this.Yct = i),
      (this.R$e = Global_1.Global.CharacterController),
      (this.g1t = i.PartSocketName),
      (t = this.Jh.GetComponent(3).Actor),
      (this.tfe = t.Mesh),
      this.InitChildType(15),
      this.imt(),
      this.zct
        ? (this.tmt(),
          this.RefreshPosition(),
          this.ShowBattleVisibleChildView(),
          this.Ore())
        : this.HideBattleVisibleChildView());
  }
  imt() {
    this.Jh
      ? this.tfe
        ? this.tfe.DoesSocketExist(this.g1t)
          ? (this.zct = !0)
          : ((this.zct = !1),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Battle",
                18,
                "怪物部位血条非法：不存在SocketName",
                ["", this.g1t],
              ))
        : ((this.zct = !1),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              18,
              "怪物部位血条非法：不存在SkeletalMesh",
            ))
      : ((this.zct = !1),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 18, "怪物部位血条非法：不存在Entity"));
  }
  ResetPartState() {
    this.zct && (this.kre(), this.ist()),
      (this.Jh = void 0),
      (this.Yct = void 0),
      (this.R$e = void 0),
      (this.tfe = void 0),
      (this.snt = void 0),
      (this.zct = !1);
  }
  Ore() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharPartDamage,
      this.emt,
    ) ||
      EventSystem_1.EventSystem.AddWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharPartDamage,
        this.emt,
      );
  }
  kre() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharPartDamage,
      this.emt,
    );
  }
  tmt(t = !1) {
    var i,
      e,
      s = this.GetSprite(0);
    s &&
      ((i = this.Yct.Life),
      (e = this.Yct.LifeMax),
      s.SetFillAmount((s = i / e)),
      t
        ? (void 0 === this.snt && (this.snt = s), this.fst(s))
        : (this.ist(), (this.snt = s)));
  }
  fst(t) {
    var i = t,
      e = this.snt,
      s = this.Z1t.IsOriginState();
    e <= i
      ? s && (this.snt = t)
      : (this.Z1t.GetHit(i, e),
        (this.j1t = i),
        (this.W1t = e),
        (this.snt = t),
        (this.K1t = 0),
        s && !this.Z1t.IsOriginState() && this.omt(e));
  }
  omt(t) {
    this.ast(t);
  }
  ist() {
    (this.j1t = 0),
      (this.W1t = 0),
      (this.K1t = -1),
      this.Z1t.Reset(),
      this.GetSprite(1).SetUIActive(!1);
  }
  M_t(t) {
    Math.abs(this.Zct - t) < PERCENT_TOLERATION ||
      (t ? this.rmt(t) : this.rmt(this.snt), (this.Zct = t));
  }
  rmt(t) {
    this.ast(t);
  }
  ast(t) {
    var i = this.GetSprite(1),
      i =
        (i.SetFillAmount(t),
        i.IsUIActiveSelf() || i.SetUIActive(!0),
        this.GetSprite(2));
    i.SetStretchLeft(this.pnt * this.snt - 2),
      i.SetStretchRight(this.pnt * (1 - t) - 2);
  }
  RefreshPosition() {
    var t, i;
    this.zct &&
      (i = UiLayer_1.UiLayer.UiRootItem) &&
      ((t = this.tfe.GetSocketLocation(this.g1t)),
      UE.GameplayStatics.ProjectWorldToScreen(this.R$e, t, this.Jct, !1)
        ? ((t = (0, puerts_1.$unref)(this.Jct)),
          (i = i.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t)),
          this.RootItem.SetAnchorOffset(i),
          this.SetVisible(1, !0))
        : this.SetVisible(1, !1));
  }
  Tick(t) {
    this.zct && (this.RefreshPosition(), this.nmt(t));
  }
  nmt(t) {
    var i;
    -1 === this.K1t ||
      ((i = this.Z1t.UpdatePercent(t)) < 0 ? this.ist() : this.M_t(i),
      this.j1t >= this.W1t) ||
      (this.K1t = this.K1t + t);
  }
}
exports.PartState = PartState;
//# sourceMappingURL=PartState.js.map
