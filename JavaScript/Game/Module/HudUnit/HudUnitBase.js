"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HudUnitBase = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../Ui/Base/UiPanelBase"),
  UiLayer_1 = require("../../Ui/UiLayer"),
  VisibleStateUtil_1 = require("../BattleUi/VisibleStateUtil");
class HudUnitBase extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ResourceId = void 0),
      (this.VisibleState = 0),
      (this.TweenAnimMap = void 0);
  }
  async Initialize(i, t, e) {
    this.ResourceId = i;
    e = UiLayer_1.UiLayer.GetBattleViewUnit(e ? 3 : 1);
    t
      ? await this.CreateThenShowByResourceIdAsync(i, e, !0)
      : await this.CreateByResourceIdAsync(i, e, !0);
  }
  Tick(i) {}
  AfterTick(i) {}
  SetVisible(i, t = 0) {
    var e = this.GetVisible(),
      t =
        ((this.VisibleState = VisibleStateUtil_1.VisibleStateUtil.SetVisible(
          this.VisibleState,
          i,
          t,
        )),
        this.GetVisible());
    (e === t && this.GetActive() === t) || this.SetActive(i);
  }
  GetVisible() {
    return VisibleStateUtil_1.VisibleStateUtil.GetVisible(this.VisibleState);
  }
  OnBeforeDestroy() {
    this.TweenAnimMap?.clear();
  }
  SetAnchorOffset(i, t) {
    this.RootItem &&
      (this.RootItem.SetAnchorOffsetX(i), this.RootItem.SetAnchorOffsetY(t));
  }
  InitTweenAnim(i) {
    var t = [],
      e = this.GetItem(i)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = e.Num();
    for (let i = 0; i < s; i++) t.push(e.Get(i));
    this.TweenAnimMap || (this.TweenAnimMap = new Map()),
      this.TweenAnimMap.set(i, t);
  }
  PlayTweenAnim(i) {
    i = this.TweenAnimMap.get(i);
    if (i) for (const t of i) t.Play();
  }
  StopTweenAnim(i) {
    i = this.TweenAnimMap.get(i);
    if (i) for (const t of i) t.Stop();
  }
}
exports.HudUnitBase = HudUnitBase;
//# sourceMappingURL=HudUnitBase.js.map
