"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MowingBuffOverview = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  UiSequencePlayer_1 = require("../../../../../Ui/Base/UiSequencePlayer"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  MowingBuffGridGroup_1 = require("./MowingBuffGridGroup"),
  MowingBuffIntroduce_1 = require("./MowingBuffIntroduce");
class MowingBuffOverview extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.u9a = void 0),
      (this.c9a = void 0),
      (this.ujr = void 0),
      (this.m9a = () => new MowingBuffGridGroup_1.MowingBuffGridGroup());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIVerticalLayout],
      [4, UE.UIItem],
      [5, UE.UIItem],
    ];
  }
  async OnBeforeStartAsync() {
    await this.d9a(),
      this.C9a(),
      this.g9a(),
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem));
  }
  async d9a() {
    var e = new MowingBuffIntroduce_1.MowingBuffIntroduce();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.u9a = e);
  }
  C9a() {
    this.GetItem(2).SetUIActive(!1);
  }
  g9a() {
    this.c9a = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.m9a,
      void 0,
      !0,
    );
  }
  async RefreshByCustomDataAsync(e) {
    void 0 === (this.Pe = e)
      ? (this.GetItem(1)?.SetUIActive(!0),
        this.GetItem(5)?.SetUIActive(!1),
        this.u9a.SetUiActive(!1))
      : (this.GetItem(1)?.SetUIActive(!1),
        this.GetItem(5)?.SetUIActive(!0),
        this.u9a.SetUiActive(!0),
        this.u9a.RefreshByCustomData(e.IntroduceData),
        await this.c9a.RefreshByDataAsync(e.BuffGroupData));
  }
  async PlayStartSequenceAsync() {
    await this.ujr.LitePlayAsync("Start", !0);
  }
  PlayUnlockSequenceAsync() {
    if (this.Pe)
      for (const e of this.c9a.GetLayoutItemList())
        for (const i of e.GetBuffGridItemLayout().GetLayoutItemList())
          i.CheckNeedPlayUnlockSequence() && i.PlayUnlockEffect();
  }
}
exports.MowingBuffOverview = MowingBuffOverview;
//# sourceMappingURL=MowingBuffOverview.js.map
