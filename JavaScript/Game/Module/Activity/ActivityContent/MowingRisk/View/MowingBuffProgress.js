"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffProgress = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  MowingBuffIntroduce_1 = require("./MowingBuffIntroduce"),
  MowingBuffUnit_1 = require("./MowingBuffUnit");
class MowingBuffProgress extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.w6a = []),
      (this.A6a = void 0),
      (this.ujr = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    let i = new MowingBuffUnit_1.MowingBuffUnit();
    await i.CreateThenShowByActorAsync(this.GetItem(2).GetOwner()),
      this.w6a.push(i),
      await (i =
        new MowingBuffUnit_1.MowingBuffUnit()).CreateThenShowByActorAsync(
        this.GetItem(3).GetOwner(),
      ),
      this.w6a.push(i),
      await (i =
        new MowingBuffUnit_1.MowingBuffUnit()).CreateThenShowByActorAsync(
        this.GetItem(4).GetOwner(),
      ),
      this.w6a.push(i),
      await (i =
        new MowingBuffUnit_1.MowingBuffUnit()).CreateThenShowByActorAsync(
        this.GetItem(5).GetOwner(),
      ),
      this.w6a.push(i),
      await (i =
        new MowingBuffUnit_1.MowingBuffUnit()).CreateThenShowByActorAsync(
        this.GetItem(6).GetOwner(),
      ),
      this.w6a.push(i);
    var e = new MowingBuffIntroduce_1.MowingBuffIntroduce();
    await e.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
      (this.A6a = e),
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem));
  }
  RefreshByCustomData(i) {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(0),
      i.CountTextId,
      ...i.CountTextArgs,
    ),
      this.GetSprite(1).SetFillAmount(i.ProgressPercentage);
    var e,
      t,
      s = i.SuperBuffList;
    for ([e, t] of this.w6a.entries())
      s.length > e ? t.RefreshByCustomData(s[e]) : t.SetUiActive(!1);
    this.A6a.RefreshByCustomData(i.IntroduceData);
  }
  PlayStartSequence() {
    this.ujr.LitePlayAsync("Start", !0);
  }
}
exports.MowingBuffProgress = MowingBuffProgress;
//# sourceMappingURL=MowingBuffProgress.js.map
