"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDeviceGuideView = void 0);
const UE = require("ue");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const GuideTutorialPagePanel_1 = require("../../Module/Guide/Views/GuideTutorialPagePanel");
const TutorialPageItem_1 = require("../../Module/Tutorial/SubView/TutorialPageItem");
const GenericLayoutNew_1 = require("../../Module/Util/Layout/GenericLayoutNew");
const LguiUtil_1 = require("../../Module/Util/LguiUtil");
const UiViewBase_1 = require("../../Ui/Base/UiViewBase");
const TWEEN_TIME = 0.3;
const GUIDE_ID = 34033;
class SignalDeviceGuideView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IsPopView = !0),
      (this.ZAe = void 0),
      (this.ePe = 0),
      (this.tPe = void 0),
      (this.iPe = void 0),
      (this.oPe = void 0),
      (this.rPe = void 0),
      (this.nPe = () => {
        let i, t, s;
        !this.rPe &&
          this.ePe > 0 &&
          ((t = (i = this.iPe.GetRootItem()).RelativeLocation),
          (s = this.GetItem(12)).SetUIRelativeLocation(
            new UE.Vector(-s.Width, s.RelativeLocation.Y, s.RelativeLocation.Z),
          ),
          this.sPe(),
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
        let i, t, s;
        !this.rPe &&
          this.ePe < this.ZAe.length - 1 &&
          ((t = (i = this.iPe.GetRootItem()).RelativeLocation),
          (s = this.GetItem(12)).SetUIRelativeLocation(
            new UE.Vector(s.Width, s.RelativeLocation.Y, s.RelativeLocation.Z),
          ),
          this.sPe(),
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
        let e = void 0;
        return (
          (e = new TutorialPageItem_1.TutorialPageItem(t)).Init(),
          e.UpdateShow(!1),
          { Key: s, Value: e }
        );
      }),
      (this.lPe = () => {
        this.CloseMe();
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
      this.iPe.Destroy(),
      (this.iPe = void 0),
      this.oPe && (this.oPe.Destroy(), (this.oPe = void 0)),
      this.rPe && (this.rPe.Kill(), (this.rPe = void 0));
  }
  _Pe() {
    this.UiViewSequence.PlaySequence("StartAtOnce");
  }
  sPe() {
    let i;
    this.oPe ||
      ((i = LguiUtil_1.LguiUtil.CopyItem(this.GetItem(3), this.GetItem(12))),
      (this.oPe = new GuideTutorialPagePanel_1.GuideTutorialPagePanel()),
      this.oPe.Init(i)),
      this.iPe.PlayAnime(!0),
      this.oPe.PlayAnime(!1);
  }
  async OnBeforeStartAsync() {
    (this.iPe = new GuideTutorialPagePanel_1.GuideTutorialPagePanel()),
      await this.iPe.CreateThenShowByActorAsync(this.GetItem(3).GetOwner());
  }
  OnStart() {
    (this.tPe = new GenericLayoutNew_1.GenericLayoutNew(
      this.GetHorizontalLayout(5),
      this.hPe,
      this.GetItem(6),
    )),
      (this.ZAe =
        ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPageIds(
          GUIDE_ID,
        )),
      this.ZAe.length <= 1
        ? (this.GetButton(7).RootUIComp.SetUIActive(!1),
          this.GetButton(8).RootUIComp.SetUIActive(!1),
          this.GetItem(4).SetUIActive(!1))
        : (this.GetButton(7).RootUIComp.SetUIActive(!0),
          this.GetButton(8).RootUIComp.SetUIActive(!0),
          this.GetItem(4).SetUIActive(!0),
          this.tPe.RebuildLayoutByDataNew(this.ZAe)),
      this.Og(0);
  }
  OnBeforeShow() {
    this._Pe();
  }
  Og(i) {
    this.ZAe.length > 1 &&
      (this.tPe.GetLayoutItemByIndex(this.ePe).UpdateShow(!1),
      this.tPe.GetLayoutItemByIndex(i).UpdateShow(!0),
      this.GetButton(7).SetSelfInteractive(i > 0),
      this.GetButton(8).SetSelfInteractive(i < this.ZAe.length - 1),
      this.oPe) &&
      ((t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(
        this.ZAe[this.ePe],
      )),
      this.oPe.RefreshPage(t)),
      (this.ePe = i);
    var t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(
      this.ZAe[this.ePe],
    );
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), t.Title),
      this.iPe.RefreshPage(t);
  }
}
exports.SignalDeviceGuideView = SignalDeviceGuideView;
// # sourceMappingURL=SignalDeviceGuideView.js.map
