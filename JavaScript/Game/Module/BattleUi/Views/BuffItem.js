"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BuffItem = void 0);
const UE = require("ue"),
  Time_1 = require("../../../../Core/Common/Time"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  BattleUiControl_1 = require("../BattleUiControl"),
  CLOSE_ANIM_TIME = 200,
  FADE_ANIM_PERCENT = 0.2,
  BUFF = "1",
  DEBUFF = "2";
class BuffItem extends UiPanelBase_1.UiPanelBase {
  constructor(t) {
    super(),
      (this.Art = void 0),
      (this.gnt = void 0),
      (this.fnt = void 0),
      (this.pnt = void 0),
      (this.vnt = ""),
      (this.Mnt = 0),
      (this.Snt = -0),
      (this.Ent = void 0),
      (this.ynt = void 0),
      (this.Tnt = 0),
      (this.Lnt = !1);
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
    (this.gnt = this.GetTexture(1)),
      (this.fnt = this.GetText(3)),
      (this.pnt = this.GetSprite(2)),
      this.hnt(5),
      this.hnt(6),
      this.hnt(7);
  }
  Activate(t, i, s = !1) {
    (this.Ent = i),
      this.Dnt(t.Path),
      this.Rnt(i.StackCount),
      i.Duration <= 0
        ? this.Unt(1)
        : this.Unt(i.GetRemainDuration() / i.Duration);
    i = t.Parameters.length;
    let h = void 0;
    0 < i && (h = t.Parameters[0]),
      this.GetSprite(8)?.SetUIActive(h === BUFF),
      this.GetSprite(4)?.SetUIActive(h === DEBUFF),
      1 < i && "" !== t.Parameters[1] ? this.Ant(t.Parameters[1]) : this.Ant(),
      this.SetActive(!0),
      s
        ? this.Ert(5)
        : (this.RootItem?.SetAlpha(1),
          this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector));
  }
  Dnt(t) {
    this.vnt !== t &&
      ((this.vnt = t),
      this.gnt.SetAlpha(0),
      this.SetTextureByPath(t, this.gnt, void 0, (t) => {
        t && this.gnt.SetAlpha(1);
      }));
  }
  Rnt(t) {
    t !== this.Mnt &&
      (t > this.Mnt && 0 < this.Mnt && this.Ert(5),
      (this.Mnt = t) <= 1
        ? this.fnt.SetText("")
        : this.fnt.SetText(t.toString()));
  }
  Unt(t) {
    t !== this.Snt &&
      ((this.Snt = t),
      this.pnt.SetFillAmount(t),
      this.Pnt(t <= FADE_ANIM_PERCENT));
  }
  Pnt(t) {
    this.Lnt !== t &&
      ((this.Lnt = t)
        ? this.Ert(7)
        : (this.Irt(7), this.GetItem(0)?.SetAlpha(1)));
  }
  Ant(t) {
    t
      ? this.pnt.SetColor(UE.Color.FromHex(t))
      : (this.ynt || (this.ynt = UE.Color.FromHex("FFFFFF7F")),
        this.pnt.SetColor(this.ynt));
  }
  Tick(t) {
    this.Ent &&
      (0 < this.Ent.Duration &&
        this.Unt(this.Ent.GetRemainDuration() / this.Ent.Duration),
      this.Rnt(this.Ent.StackCount));
  }
  TickHiding(t) {
    return this.Tnt > Time_1.Time.Now || (this.Irt(6), this.SetActive(!1), !1);
  }
  Deactivate() {
    this.Irt(5),
      this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector),
      this.Irt(6),
      this.Pnt(!1),
      this.SetActive(!1);
  }
  DeactivateWithCloseAnim() {
    this.Irt(5),
      this.RootItem?.SetUIItemScale(Vector_1.Vector.OneVector),
      this.Pnt(!1),
      this.Ert(6),
      (this.Tnt = Time_1.Time.Now + CLOSE_ANIM_TIME);
  }
  DestroyOverride() {
    return (
      this.RootActor &&
        BattleUiControl_1.BattleUiControl.Pool.RecycleBuffItem(this.RootActor),
      !0
    );
  }
  hnt(t) {
    var i = [],
      s = this.GetItem(t)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      h = s.Num();
    for (let t = 0; t < h; t++) i.push(s.Get(t));
    this.Art || (this.Art = new Map()), this.Art.set(t, i);
  }
  Ert(t) {
    t = this.Art?.get(t);
    if (t) for (const i of t) i.Play();
  }
  Irt(t) {
    t = this.Art?.get(t);
    if (t) for (const i of t) i.Stop();
  }
}
exports.BuffItem = BuffItem;
//# sourceMappingURL=BuffItem.js.map
