"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueMoodBar = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  POSITIVE_TEXTURE_PATH =
    "/Game/Aki/UI/UIResources/UiRogue/Image/RogueView/T_RogueIconPositive.T_RogueIconPositive",
  NEGATIVE_TEXTURE_PATH =
    "/Game/Aki/UI/UIResources/UiRogue/Image/RogueView/T_RogueIconNegative.T_RogueIconNegative",
  MOOD_HELP_ID = 262;
class MapRogueMoodBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.LevelSequencePlayer = void 0),
      (this.PanelBarL = void 0),
      (this.PanelBarR = void 0),
      (this.BM1 = () => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          MOOD_HELP_ID,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIText],
      [9, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[9, this.BM1]]);
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      this.GetItem(1).SetUIActive(!1);
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.PanelBarL = new PanelBar()),
      this.PanelBarL.SetDirection(-1),
      e.push(
        this.PanelBarL.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      ),
      (this.PanelBarR = new PanelBar()),
      this.PanelBarR.SetDirection(1),
      e.push(
        this.PanelBarR.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      ),
      await Promise.all(e);
  }
  async OnShowAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Start", e);
  }
  async OnHideAsyncImplementImplement() {
    var e = new CustomPromise_1.CustomPromise();
    await this.LevelSequencePlayer.PlaySequenceAsync("Close", e);
  }
  SetMoodRuleId(e) {
    e = ConfigManager_1.ConfigManager.MapRogueConfig.GetMoodRuleById(e);
    if (e)
      switch (e.Type) {
        case 1:
          this.LevelSequencePlayer.PlayLevelSequenceByName("Light");
          break;
        case 2:
          this.LevelSequencePlayer.PlayLevelSequenceByName("LightRed");
      }
  }
  SetLimit(e, t) {
    this.PanelBarL.SetLimit(e), this.PanelBarR.SetLimit(t);
  }
  SetCurrentValue(e) {
    this.GetText(6).SetText(e.toString());
    var t = this.GetTexture(0),
      i = 0 <= e ? POSITIVE_TEXTURE_PATH : NEGATIVE_TEXTURE_PATH;
    this.SetTextureShowUntilLoaded(i, t),
      this.PanelBarL.SetCurrentValue(e),
      this.PanelBarR.SetCurrentValue(e);
  }
  ShowPreviewValue(e) {
    var t;
    0 !== e &&
      (this.GetText(2).SetText(e.toString()),
      this.GetItem(1).SetUIActive(!0),
      (t = this.GetText(6)).SetChangeColor(e < 0, t.changeColor),
      this.PanelBarL.SetPreviewValue(e),
      this.PanelBarR.SetPreviewValue(e));
  }
  ClosePreviewValue() {
    this.GetItem(1).SetUIActive(!1);
    var e = this.GetText(6);
    e.SetChangeColor(!1, e.changeColor),
      this.PanelBarL.ClosePreviewValue(),
      this.PanelBarR.ClosePreviewValue();
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    return e && !(e.length < 2) && (e = this.GetGuideUiItem(e[1]))
      ? [e, e]
      : void 0;
  }
}
exports.MapRogueMoodBar = MapRogueMoodBar;
class PanelBar extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Direction = 1),
      (this.Limit = 0),
      (this.Current = 0);
  }
  get IsActive() {
    return (
      (0 < this.Direction && 0 < this.Current) ||
      (this.Direction < 0 && this.Current < 0)
    );
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetSprite(1).SetUIActive(!1);
  }
  SetDirection(e) {
    this.Direction = e;
  }
  SetLimit(e) {
    (this.Limit = e), this.GetText(0).SetText(e.toString());
  }
  SetCurrentValue(e) {
    var t = this.GetSprite(2),
      i = this.GetItem(3),
      s = ((this.Current = e), this.IsActive);
    i.SetUIActive(s),
      t.SetUIActive(s),
      s &&
        ((s = MathUtils_1.MathUtils.Clamp(e / this.Limit, 0, 1)),
        t.SetFillAmount(s),
        (e = t.GetWidth() * s * this.Direction),
        i.SetAnchorOffsetX(e));
  }
  SetPreviewValue(e) {
    var t, i, s, r;
    0 < e ||
      ((t = this.IsActive ? this.Current / this.Limit : 0),
      (i = this.GetSprite(2)),
      (s = this.GetSprite(1)),
      0 < this.Direction
        ? ((r =
            MathUtils_1.MathUtils.Clamp(this.Current + e, 0, this.Limit) /
            this.Limit),
          i.SetFillAmount(r),
          i.SetUIActive(0 < r),
          s.SetFillAmount(t),
          s.SetUIActive(0 < t))
        : ((r =
            MathUtils_1.MathUtils.Clamp(this.Current + e, this.Limit, 0) /
            this.Limit),
          i.SetFillAmount(t),
          i.SetUIActive(0 < t),
          s.SetFillAmount(r),
          s.SetUIActive(0 < r)));
  }
  ClosePreviewValue() {
    this.GetSprite(1).SetUIActive(!1), this.SetCurrentValue(this.Current);
  }
}
//# sourceMappingURL=MapRogueMoodBar.js.map
