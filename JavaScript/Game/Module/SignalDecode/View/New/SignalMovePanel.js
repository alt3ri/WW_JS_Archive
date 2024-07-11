"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalMovePanel = void 0);
const UE = require("ue");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const UiComponentsAction_1 = require("../../../../Ui/Base/UiComponentsAction");
const LguiUtil_1 = require("../../../Util/LguiUtil");
const SignalItem_1 = require("./SignalItem");
const SignalLineItem_1 = require("./SignalLineItem");
class SignalMovePanel extends UiComponentsAction_1.UiComponentsAction {
  constructor() {
    super(...arguments),
      (this.xMo = void 0),
      (this.wMo = void 0),
      (this.BMo = void 0),
      (this.bMo = void 0),
      (this.Pxn = void 0),
      (this.unt = 0);
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
    ];
  }
  OnStart() {
    (this.wMo = this.GetItem(0)),
      (this.BMo = this.GetItem(1)),
      (this.bMo = this.GetItem(2)),
      (this.Pxn = this.GetItem(3)),
      this.qMo(),
      this.wMo.SetUIActive(!1),
      this.bMo.SetUIActive(!1),
      this.BMo.SetUIActive(!1),
      this.Pxn.SetUIActive(!1);
  }
  qMo() {
    const t = ModelManager_1.ModelManager.SignalDecodeModel;
    const e = t.CurrentMorseCode;
    const s = ((this.unt = t.Speed), t.StartDecisionSize);
    const n = t.EndDecisionSize;
    const o = t.CurrentGameplayType === 3;
    this.xMo = [];
    for (let i = e.length - 1; i >= 0; --i) {
      var a;
      let h = e[i];
      const r = Number(h) ?? 0;
      let t = void 0;
      switch (r) {
        case 1:
          var l = LguiUtil_1.LguiUtil.CopyItem(this.BMo, this.RootItem);
          (t = new SignalItem_1.SignalItem(r, s, n)).Init(l);
          break;
        case 2:
          l = LguiUtil_1.LguiUtil.CopyItem(this.wMo, this.RootItem);
          (t = new SignalItem_1.SignalItem(r, s, n)).Init(l);
          break;
        default:
          var g = LguiUtil_1.LguiUtil.CopyItem(this.bMo, this.RootItem);
          (t = new SignalLineItem_1.SignalLineItem(0, s, n)).Init(g);
      }
      r === 0 &&
        o &&
        ((h = LguiUtil_1.LguiUtil.CopyItem(this.Pxn, this.RootItem)),
        (a = new SignalLineItem_1.SignalLineItem(0, s, n)).Init(h),
        this.xMo.push(a)),
        this.xMo.push(t),
        i !== 0 &&
          r !== 0 &&
          ((h = LguiUtil_1.LguiUtil.CopyItem(this.bMo, this.RootItem)),
          (a = new SignalLineItem_1.SignalLineItem(0, s, n)).Init(h),
          this.xMo.push(a));
    }
  }
  InitByGameplayType(t) {
    if (this.xMo) for (const i of this.xMo) i.InitByGameplayType(t);
  }
  StartAgain() {
    if (this.xMo) for (const t of this.xMo) t.Reset();
  }
  UpdateMove(t) {
    this.GMo(t), this.NMo();
  }
  GetCompleteness() {
    let t = 0;
    let i = 0;
    for (const e of this.xMo)
      e instanceof SignalItem_1.SignalItem && ((i += e.GetCompleteness()), t++);
    return t === 0 ? 1 : i / t;
  }
  GetProgress() {
    let t = 0;
    let i = 0;
    for (const e of this.xMo) (i += e.GetProgress()), t++;
    return t === 0 ? 1 : i / t;
  }
  GMo(t) {
    t = this.RootItem.GetAnchorOffsetX() + (t / 1e3) * this.unt;
    this.RootItem.SetAnchorOffsetX(t);
  }
  NMo() {
    const t = this.RootItem.GetAnchorOffsetX();
    for (const e of this.xMo) {
      const i = t + e.GetRootItem().GetAnchorOffsetX();
      e.Update(i);
    }
  }
  OnCatchBtnDown() {
    for (const t of this.xMo) t.OnCatchBtnDown();
  }
  OnCatchBtnUp() {
    for (const t of this.xMo) t.OnCatchBtnUp();
  }
}
exports.SignalMovePanel = SignalMovePanel;
// # sourceMappingURL=SignalMovePanel.js.map
