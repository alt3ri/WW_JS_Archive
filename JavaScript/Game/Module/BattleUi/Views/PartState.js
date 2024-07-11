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
      (this.Nut = void 0),
      (this.gXe = void 0),
      (this.olt = void 0),
      (this.Out = (0, puerts_1.$ref)(void 0)),
      (this.tfe = void 0),
      (this.kut = !1),
      (this.Xot = -0),
      (this.xlt = -0),
      (this.wlt = -0),
      (this.Blt = -1),
      (this.Fut = -0),
      (this.Flt = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.srt = 0),
      (this.Vut = (t, i) => {
        var e = this.Nut.Life;
        this.SetVisible(2, 0 < e), this.Hut(!0);
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
    this.srt = this.GetSprite(2).GetParentAsUIItem().GetWidth();
  }
  OnBeforeDestroy() {
    this.ResetPartState();
  }
  InitializePartState(t, i) {
    this.RootItem?.IsValid() &&
      ((this.Jh = t),
      (this.Nut = i),
      (this.gXe = Global_1.Global.CharacterController),
      (this.olt = i.PartSocketName),
      (t = this.Jh.GetComponent(3).Actor),
      (this.tfe = t.Mesh),
      this.InitChildType(15),
      this.jut(),
      this.kut
        ? (this.Hut(),
          this.RefreshPosition(),
          this.ShowBattleVisibleChildView(),
          this.Ore())
        : this.HideBattleVisibleChildView());
  }
  jut() {
    this.Jh
      ? this.tfe
        ? this.tfe.DoesSocketExist(this.olt)
          ? (this.kut = !0)
          : ((this.kut = !1),
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Battle",
                18,
                "怪物部位血条非法：不存在SocketName",
                ["", this.olt],
              ))
        : ((this.kut = !1),
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Battle",
              18,
              "怪物部位血条非法：不存在SkeletalMesh",
            ))
      : ((this.kut = !1),
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Battle", 18, "怪物部位血条非法：不存在Entity"));
  }
  ResetPartState() {
    this.kut && (this.kre(), this.Hrt()),
      (this.Jh = void 0),
      (this.Nut = void 0),
      (this.gXe = void 0),
      (this.tfe = void 0),
      (this.Xot = void 0),
      (this.kut = !1);
  }
  Ore() {
    EventSystem_1.EventSystem.HasWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharPartDamage,
      this.Vut,
    ) ||
      EventSystem_1.EventSystem.AddWithTarget(
        this.Jh,
        EventDefine_1.EEventName.CharPartDamage,
        this.Vut,
      );
  }
  kre() {
    EventSystem_1.EventSystem.RemoveWithTarget(
      this.Jh,
      EventDefine_1.EEventName.CharPartDamage,
      this.Vut,
    );
  }
  Hut(t = !1) {
    var i,
      e,
      s = this.GetSprite(0);
    s &&
      ((i = this.Nut.Life),
      (e = this.Nut.LifeMax),
      s.SetFillAmount((s = i / e)),
      t
        ? (void 0 === this.Xot && (this.Xot = s), this.rnt(s))
        : (this.Hrt(), (this.Xot = s)));
  }
  rnt(t) {
    var i = t,
      e = this.Xot,
      s = this.Flt.IsOriginState();
    e <= i
      ? s && (this.Xot = t)
      : (this.Flt.GetHit(i, e),
        (this.xlt = i),
        (this.wlt = e),
        (this.Xot = t),
        (this.Blt = 0),
        s && !this.Flt.IsOriginState() && this.Wut(e));
  }
  Wut(t) {
    this.Xrt(t);
  }
  Hrt() {
    (this.xlt = 0),
      (this.wlt = 0),
      (this.Blt = -1),
      this.Flt.Reset(),
      this.GetSprite(1).SetUIActive(!1);
  }
  h1t(t) {
    Math.abs(this.Fut - t) < PERCENT_TOLERATION ||
      (t ? this.Kut(t) : this.Kut(this.Xot), (this.Fut = t));
  }
  Kut(t) {
    this.Xrt(t);
  }
  Xrt(t) {
    var i = this.GetSprite(1),
      i =
        (i.SetFillAmount(t),
        i.IsUIActiveSelf() || i.SetUIActive(!0),
        this.GetSprite(2));
    i.SetStretchLeft(this.srt * this.Xot - 2),
      i.SetStretchRight(this.srt * (1 - t) - 2);
  }
  RefreshPosition() {
    var t, i;
    this.kut &&
      (i = UiLayer_1.UiLayer.UiRootItem) &&
      ((t = this.tfe.GetSocketLocation(this.olt)),
      UE.GameplayStatics.ProjectWorldToScreen(this.gXe, t, this.Out, !1)
        ? ((t = (0, puerts_1.$unref)(this.Out)),
          (i = i.GetCanvasScaler().ConvertPositionFromViewportToLGUICanvas(t)),
          this.RootItem.SetAnchorOffset(i),
          this.SetVisible(1, !0))
        : this.SetVisible(1, !1));
  }
  Tick(t) {
    this.kut && (this.RefreshPosition(), this.Qut(t));
  }
  Qut(t) {
    var i;
    -1 === this.Blt ||
      ((i = this.Flt.UpdatePercent(t)) < 0 ? this.Hrt() : this.h1t(i),
      this.xlt >= this.wlt) ||
      (this.Blt = this.Blt + t);
  }
}
exports.PartState = PartState;
//# sourceMappingURL=PartState.js.map
