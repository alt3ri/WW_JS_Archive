"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HelpGuideView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  TutorialPageItem_1 = require("../../Tutorial/SubView/TutorialPageItem"),
  GenericLayoutNew_1 = require("../../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  HelpGuidePage_1 = require("./HelpGuidePage"),
  TWEEN_TIME = 0.3;
class HelpGuideView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.HelpGroupId = 0),
      (this.ZAe = []),
      (this.ePe = 0),
      (this.tPe = void 0),
      (this.iPe = void 0),
      (this.oPe = void 0),
      (this.rPe = void 0),
      (this.lPe = () => {
        this.CloseMe();
      }),
      (this.nPe = () => {
        var i, t, s;
        !this.rPe &&
          0 < this.ePe &&
          ((t = (i = this.iPe.GetRootItem()).RelativeLocation),
          (s = this.GetItem(12)).SetUIRelativeLocation(
            new UE.Vector(-s.Width, s.RelativeLocation.Y, s.RelativeLocation.Z),
          ),
          this.mei(),
          this.oPe
            .GetRootItem()
            .SetUIRelativeLocation(new UE.Vector(i.Width, t.Y, t.Z)),
          this.Og(this.ePe - 1),
          (this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(
            s,
            0,
            TWEEN_TIME,
            0,
            6,
          )),
          this.rPe.OnCompleteCallBack.Bind(() => {
            this.rPe = void 0;
          }));
      }),
      (this.aPe = () => {
        var i, t, s;
        !this.rPe &&
          this.ePe < this.ZAe.length - 1 &&
          ((t = (i = this.iPe.GetRootItem()).RelativeLocation),
          (s = this.GetItem(12)).SetUIRelativeLocation(
            new UE.Vector(s.Width, s.RelativeLocation.Y, s.RelativeLocation.Z),
          ),
          this.mei(),
          this.oPe
            .GetRootItem()
            .SetUIRelativeLocation(new UE.Vector(-i.Width, t.Y, t.Z)),
          this.Og(this.ePe + 1),
          (this.rPe = UE.LTweenBPLibrary.LocalPositionXTo(
            s,
            0,
            TWEEN_TIME,
            0,
            6,
          )),
          this.rPe.OnCompleteCallBack.Bind(() => {
            this.rPe = void 0;
          }));
      }),
      (this.hPe = (i, t, s) => {
        var e = void 0;
        return (
          (e = new TutorialPageItem_1.TutorialPageItem(t)).Init(),
          e.UpdateShow(!1),
          { Key: s, Value: e }
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIHorizontalLayout],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.lPe],
        [7, this.nPe],
        [8, this.aPe],
      ]);
  }
  OnBeforeDestroy() {
    this.tPe && (this.tPe.ClearChildren(), (this.tPe = void 0)),
      this.rPe && (this.rPe.Kill(), (this.rPe = void 0));
  }
  mei() {
    this.oPe.SetUiActive(!0), this.iPe.PlayAnime(!0), this.oPe.PlayAnime(!1);
  }
  async OnBeforeStartAsync() {
    (this.HelpGroupId = this.OpenParam),
      (this.ZAe =
        ConfigManager_1.ConfigManager.HelpConfig.GetHelpContentInfoByGroupId(
          this.HelpGroupId,
        ));
    var i,
      t = 1 < this.ZAe.length;
    (this.iPe = new HelpGuidePage_1.HelpGuidePage()),
      await this.iPe.CreateByActorAsync(this.GetItem(3).GetOwner()),
      this.AddChild(this.iPe),
      t &&
        ((i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(12))),
        (this.oPe = new HelpGuidePage_1.HelpGuidePage()),
        await this.oPe.CreateByActorAsync(i.GetOwner()),
        this.oPe.SetUiActive(!1)),
      (this.tPe = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(5),
        this.hPe,
        this.GetItem(6),
      )),
      t && this.tPe.RebuildLayoutByDataNew(this.ZAe),
      this.GetButton(7).RootUIComp.SetUIActive(t),
      this.GetButton(8).RootUIComp.SetUIActive(t),
      this.GetItem(4).SetUIActive(t);
  }
  OnStart() {
    this.Og(0);
  }
  OnBeforeShow() {
    this.UiViewSequence.PlaySequence("StartAtOnce"),
      this.GetItem(10).SetUIActive(!0),
      this.GetItem(11).SetUIActive(!0),
      this.GetItem(9).SetUIActive(!1);
  }
  Og(i) {
    1 < this.ZAe.length &&
      (this.tPe.GetLayoutItemByIndex(this.ePe).UpdateShow(!1),
      this.tPe.GetLayoutItemByIndex(i).UpdateShow(!0),
      this.GetButton(7).SetSelfInteractive(0 < i),
      this.GetButton(8).SetSelfInteractive(i < this.ZAe.length - 1),
      this.oPe) &&
      ((t = this.ZAe[this.ePe]), this.oPe.RefreshPage(t)),
      (this.ePe = i);
    var t = this.ZAe[this.ePe];
    this.iPe.RefreshPage(t),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title);
  }
}
exports.HelpGuideView = HelpGuideView;
//# sourceMappingURL=HelpGuideView.js.map
