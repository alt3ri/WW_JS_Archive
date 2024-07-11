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
      (this.uBn = void 0),
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
    ];
  }
  OnStart() {
    (this.AEo = this.GetItem(0)),
      (this.PEo = this.GetItem(1)),
      (this.xEo = this.GetItem(2)),
      (this.uBn = this.GetItem(3)),
      this.wEo(),
      this.AEo.SetUIActive(!1),
      this.xEo.SetUIActive(!1),
      this.PEo.SetUIActive(!1),
      this.uBn.SetUIActive(!1);
  }
  wEo() {
    var t = ModelManager_1.ModelManager.SignalDecodeModel,
      e = t.CurrentMorseCode,
      s = ((this.Ist = t.Speed), t.StartDecisionSize),
      n = t.EndDecisionSize,
      o = 3 === t.CurrentGameplayType;
    this.UEo = [];
    for (let i = e.length - 1; 0 <= i; --i) {
      var a,
        h = e[i],
        r = Number(h) ?? 0;
      let t = void 0;
      switch (r) {
        case 1:
          var l = LguiUtil_1.LguiUtil.CopyItem(this.PEo, this.RootItem);
          (t = new SignalItem_1.SignalItem(r, s, n)).Init(l);
          break;
        case 2:
          l = LguiUtil_1.LguiUtil.CopyItem(this.AEo, this.RootItem);
          (t = new SignalItem_1.SignalItem(r, s, n)).Init(l);
          break;
        default:
          var g = LguiUtil_1.LguiUtil.CopyItem(this.xEo, this.RootItem);
          (t = new SignalLineItem_1.SignalLineItem(0, s, n)).Init(g);
      }
      0 === r &&
        o &&
        ((h = LguiUtil_1.LguiUtil.CopyItem(this.uBn, this.RootItem)),
        (a = new SignalLineItem_1.SignalLineItem(0, s, n)).Init(h),
        this.UEo.push(a)),
        this.UEo.push(t),
        0 !== i &&
          0 !== r &&
          ((h = LguiUtil_1.LguiUtil.CopyItem(this.xEo, this.RootItem)),
          (a = new SignalLineItem_1.SignalLineItem(0, s, n)).Init(h),
          this.UEo.push(a));
    }
  }
  InitByGameplayType(t) {
    if (this.UEo) for (const i of this.UEo) i.InitByGameplayType(t);
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
    t = this.RootItem.GetAnchorOffsetX() + (t / 1e3) * this.Ist;
    this.RootItem.SetAnchorOffsetX(t);
  }
  bEo() {
    var t = this.RootItem.GetAnchorOffsetX();
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
