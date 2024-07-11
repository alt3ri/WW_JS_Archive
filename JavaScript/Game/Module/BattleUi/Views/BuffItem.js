"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItem = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  GlobalData_1 = require("../../../GlobalData"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  ColorUtils_1 = require("../../../Utils/ColorUtils"),
  BattleUiControl_1 = require("../BattleUiControl"),
  CLOSE_ANIM_TIME = 200,
  FADE_ANIM_PERCENT = 0.2,
  BUFF = "1",
  DEBUFF = "2";
class BuffItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Hnt = void 0),
      (this.Ust = void 0),
      (this.Ast = void 0),
      (this.Pst = void 0),
      (this.xst = ""),
      (this.wst = 0),
      (this.Bst = -0),
      (this.bst = void 0),
      (this.qst = void 0),
      (this.Bda = void 0),
      (this.Gst = 0),
      (this.Nst = !1);
    t = BattleUiControl_1.BattleUiControl.Pool.GetBuffItem(t);
    this.CreateThenShowByActor(t);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [3, UE.UIText],
      [2, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UISprite],
    ];
  }
  OnStart() {
    (this.Ust = this.GetTexture(1)),
      (this.Ast = this.GetText(3)),
      (this.Pst = this.GetSprite(2)),
      this.Est(5),
      this.Est(6),
      this.Est(7);
  }
  Activate(t, i, s = !1) {
    GlobalData_1.GlobalData.IsPlayInEditor &&
      this.RootActor?.SetActorLabel("buffItem_" + t.Id),
      (this.bst = i),
      this.Ost(t.Path),
      i
        ? (this.kst(i.StackCount),
          i.Duration <= 0
            ? this.Fst(1)
            : this.Fst(i.GetRemainDuration() / i.Duration))
        : (this.kst(1), this.Fst(1));
    i = t.Parameters.length;
    let h = void 0;
    0 < i && (h = t.Parameters[0]),
      this.GetSprite(8)?.SetUIActive(h === BUFF),
      this.GetSprite(4)?.SetUIActive(h === DEBUFF),
      1 < i && "" !== t.Parameters[1] ? this.Vst(t.Parameters[1]) : this.Vst(),
      2 < i && "" !== t.Parameters[2] ? this.qda(t.Parameters[2]) : this.qda(),
      this.SetActive(!0),
      this.Gnt(6),
      s
        ? this.bnt(5)
        : (this.RootItem?.SetAlpha(1),
          this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector));
  }
  Ost(t) {
    this.xst !== t &&
      ((this.xst = t),
      this.Ust.SetAlpha(0),
      this.SetTextureByPath(t, this.Ust, void 0, (t) => {
        t && this.Ust.SetAlpha(1);
      }));
  }
  kst(t) {
    t !== this.wst &&
      (t > this.wst && 0 < this.wst && this.bnt(5),
      (this.wst = t) <= 1
        ? this.Ast.SetText("")
        : this.Ast.SetText(t.toString()));
  }
  Fst(t) {
    t !== this.Bst &&
      ((this.Bst = t),
      this.Pst.SetFillAmount(t),
      this.Hst(t <= FADE_ANIM_PERCENT));
  }
  Hst(t) {
    this.Nst !== t &&
      ((this.Nst = t)
        ? this.bnt(7)
        : (this.Gnt(7), this.GetItem(0)?.SetAlpha(1)));
  }
  Vst(t) {
    t
      ? this.Pst.SetColor(UE.Color.FromHex(t))
      : (this.qst || (this.qst = UE.Color.FromHex("FFFFFF7F")),
        this.Pst.SetColor(this.qst));
  }
  qda(t) {
    t !== this.Bda &&
      ((this.Bda = t)
        ? this.Ust.SetColor(UE.Color.FromHex(t))
        : this.Ust.SetColor(ColorUtils_1.ColorUtils.ColorWhile));
  }
  Tick(t) {
    this.bst &&
      (0 < this.bst.Duration &&
        this.Fst(this.bst.GetRemainDuration() / this.bst.Duration),
      this.kst(this.bst.StackCount));
  }
  TickHiding(t) {
    return this.Gst > Time_1.Time.Now || (this.Gnt(6), this.SetActive(!1), !1);
  }
  Deactivate() {
    this.Gnt(5),
      this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector),
      this.Gnt(6),
      this.Hst(!1),
      this.SetActive(!1);
  }
  DeactivateWithCloseAnim() {
    this.Gnt(5),
      this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector),
      this.Hst(!1),
      this.bnt(6),
      (this.Gst = Time_1.Time.Now + CLOSE_ANIM_TIME);
  }
  OnBeforeHide() {
    this.Hst(!1);
  }
  DestroyOverride() {
    return (
      this.RootActor &&
        (this.Bda &&
          this.Ust &&
          (this.Ust.SetColor(ColorUtils_1.ColorUtils.ColorWhile),
          (this.Bda = void 0)),
        BattleUiControl_1.BattleUiControl.Pool.RecycleBuffItem(this.RootActor)),
      !0
    );
  }
  Est(t) {
    var i = [],
      s = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      h = s.Num();
    for (let t = 0; t < h; t++) i.push(s.Get(t));
    this.Hnt || (this.Hnt = new Map()), this.Hnt.set(t, i);
  }
  bnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const i of t) i.Play();
  }
  Gnt(t) {
    t = this.Hnt?.get(t);
    if (t) for (const i of t) i.Stop();
  }
}
exports.BuffItem = BuffItem;
//# sourceMappingURL=BuffItem.js.map
