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
      (this.A6a = void 0),
      (this.D6a = void 0),
      (this.ujr = void 0),
      (this.R6a = () => new MowingBuffGridGroup_1.MowingBuffGridGroup());
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
    await this.U6a(),
      this.x6a(),
      this.P6a(),
      (this.ujr = new UiSequencePlayer_1.UiSequencePlayer(this.RootItem));
  }
  async U6a() {
    var e = new MowingBuffIntroduce_1.MowingBuffIntroduce();
    await e.CreateThenShowByActorAsync(this.GetItem(0).GetOwner()),
      (this.A6a = e);
  }
  x6a() {
    this.GetItem(2).SetUIActive(!1);
  }
  P6a() {
    this.D6a = new GenericLayout_1.GenericLayout(
      this.GetVerticalLayout(3),
      this.R6a,
    );
  }
  async RefreshByCustomDataAsync(e) {
    void 0 === e
      ? (this.GetItem(1)?.SetUIActive(!0),
        this.GetItem(5)?.SetUIActive(!1),
        this.A6a.SetUiActive(!1))
      : (this.GetItem(1)?.SetUIActive(!1),
        this.GetItem(5)?.SetUIActive(!0),
        this.A6a.SetUiActive(!0),
        this.A6a.RefreshByCustomData(e.IntroduceData),
        await this.D6a.RefreshByDataAsync(e.BuffGroupData));
  }
  PlayStartSequence() {
    this.ujr.LitePlayAsync("Start", !0);
  }
}
exports.MowingBuffOverview = MowingBuffOverview;
//# sourceMappingURL=MowingBuffOverview.js.map
