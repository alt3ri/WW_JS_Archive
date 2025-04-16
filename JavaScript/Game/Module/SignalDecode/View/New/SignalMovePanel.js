"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalMovePanel = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  SignalItem_1 = require("./SignalItem"),
  SignalLineItem_1 = require("./SignalLineItem");
class SignalMovePanel extends UiComponentsAction_1.UiComponentsAction {
  constructor() {
    super(...arguments),
      (this.UEo = void 0),
      (this.AEo = void 0),
      (this.PEo = void 0),
      (this.xEo = void 0),
      (this.aBn = void 0),
      (this.$Rr = void 0),
      (this.Ist = 0);
  }
  async Init(t, i) {
    t.SetAnchorOffsetY(0),
      await this.CreateThenShowByActorAsync(t.GetOwner()),
      this.InitByGameplayType(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIHorizontalLayout],
    ];
  }
  OnStart() {
    (this.AEo = this.GetItem(0)),
      (this.PEo = this.GetItem(1)),
      (this.xEo = this.GetItem(2)),
      (this.aBn = this.GetItem(3)),
      (this.$Rr = this.GetHorizontalLayout(4)),
      this.$Rr.SetEnable(!1),
      this.$Rr.SetAlign(3),
      this.wEo(),
      this.AEo.SetUIActive(!1),
      this.xEo.SetUIActive(!1),
      this.PEo.SetUIActive(!1),
      this.aBn.SetUIActive(!1);
  }
  wEo() {
    var t = ModelManager_1.ModelManager.SignalDecodeModel,
      e = t.CurrentMorseCode,
      s = ((this.Ist = t.Speed), t.StartDecisionSize),
      n = t.EndDecisionSize,
      o = 3 === t.CurrentGameplayType,
      h = ((this.UEo = []), this.RootItem.GetWidth() / 2);
    let a = 0;
    for (let i = 0; i < e.length; ++i) {
      var r,
        l = e[i],
        g = Number(l) ?? 0;
      i !== e.length - 1 &&
        0 !== g &&
        ((l = LguiUtil_1.LguiUtil.CopyItem(this.xEo, this.$Rr.RootUIComp)),
        (r = new SignalLineItem_1.SignalLineItem(0, h, s, n)).Init(l, a),
        this.UEo.push(r),
        (a -= r.Width));
      let t = void 0;
      switch (g) {
        case 1:
          var _ = LguiUtil_1.LguiUtil.CopyItem(this.PEo, this.$Rr.RootUIComp);
          (t = new SignalItem_1.SignalItem(g, h, s, n)).Init(_, a);
          break;
        case 2:
          _ = LguiUtil_1.LguiUtil.CopyItem(this.AEo, this.$Rr.RootUIComp);
          (t = new SignalItem_1.SignalItem(g, h, s, n)).Init(_, a);
          break;
        default:
          var c = LguiUtil_1.LguiUtil.CopyItem(this.xEo, this.$Rr.RootUIComp);
          (t = new SignalLineItem_1.SignalLineItem(0, h, s, n)).Init(c, a);
      }
      0 === g && o && t.AddWidth(this.aBn.Width),
        (a -= t.Width),
        this.UEo.push(t);
    }
  }
  InitByGameplayType(t) {
    if (this.UEo) for (const i of this.UEo) i.InitByGameplayType(t);
  }
  InitMoveNode() {
    this.$Rr.RootUIComp.SetAnchorOffsetX(-1280);
  }
  StartAgain() {
    if (this.UEo) for (const t of this.UEo) t.Reset();
  }
  UpdateMove(t) {
    this.BEo(t), this.bEo();
  }
  GetCompleteness() {
    let t = 0,
      i = 0;
    for (const e of this.UEo)
      e instanceof SignalItem_1.SignalItem && ((i += e.GetCompleteness()), t++);
    return 0 === t ? 1 : i / t;
  }
  GetProgress() {
    let t = 0,
      i = 0;
    for (const e of this.UEo) (i += e.GetProgress()), t++;
    return 0 === t ? 1 : i / t;
  }
  BEo(t) {
    t = this.$Rr.RootUIComp.GetAnchorOffsetX() + (t / 1e3) * this.Ist;
    this.$Rr.RootUIComp.SetAnchorOffsetX(t);
  }
  bEo() {
    var t = this.$Rr.RootUIComp.GetAnchorOffsetX();
    for (const e of this.UEo) {
      var i = t + e.GetRootItem().GetAnchorOffsetX();
      e.Update(i);
    }
  }
  OnCatchBtnDown() {
    for (const t of this.UEo) t.OnCatchBtnDown();
  }
  OnCatchBtnUp() {
    for (const t of this.UEo) t.OnCatchBtnUp();
  }
}
exports.SignalMovePanel = SignalMovePanel;
//# sourceMappingURL=SignalMovePanel.js.map
