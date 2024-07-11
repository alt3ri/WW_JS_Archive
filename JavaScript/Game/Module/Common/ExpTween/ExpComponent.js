"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ExpComponent = void 0);
const UE = require("ue");
const StringUtils_1 = require("../../../../Core/Utils/StringUtils");
const UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
const LguiUtil_1 = require("../../Util/LguiUtil");
const ExpTweenComponent_1 = require("./ExpTweenComponent");
class ExpComponent extends UiPanelBase_1.UiPanelBase {
  constructor(t, i = !1) {
    super(),
      (this.IsAddUp = i),
      (this.ExpTweenComponent = void 0),
      (this.RTt = ""),
      (this.wqe = void 0),
      (this.UTt = () => {}),
      (this.ATt = 0),
      (this.wqe = t);
  }
  Init() {
    this.CreateThenShowByActor(this.wqe.GetOwner());
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ];
  }
  OnStart() {
    this.GetSprite(6).SetFillAmount(0),
      this.GetSprite(5).SetFillAmount(0),
      this.GetSprite(7).SetFillAmount(0),
      (this.ExpTweenComponent = new ExpTweenComponent_1.ExpTweenComponent(
        this.GetSprite(6),
        this.GetSprite(5),
        this.GetSprite(7),
        void 0,
        this.UTt,
      ));
  }
  SetLevelFormatText(t) {
    this.RTt = t;
  }
  PlayExpTween(t) {
    let i = 1;
    for (
      var e = t.GetArrivedFillAmount(), s = t.GetCurrentLevel();
      s + i < t.GetArrivedLevel();

    )
      i++;
    i > 2 && (i = 2),
      e >= 1 && (i = 1),
      this.ExpTweenComponent.PlayExpTween(i, e);
  }
  UpdateInitState(t) {
    let i, e;
    StringUtils_1.StringUtils.IsEmpty(this.RTt)
      ? this.GetText(0).SetText(t.GetCurrentLevel().toString())
      : LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(0),
          this.RTt,
          t.GetCurrentLevel().toString(),
        ),
      this.ExpTweenComponent.SetCurrentSpriteActive(!0),
      this.ExpTweenComponent.SetNextSpriteActive(!1),
      this.PTt(!1),
      this.GetText(2).SetUIActive(!1),
      this.SetMaxItemActive(t.GetArrivedLevel() === t.GetCurrentMaxLevel()),
      t.GetCurrentLevel() === t.GetCurrentMaxLevel()
        ? (this.ExpTweenComponent.SetCurrentFillAmount(1),
          this.ExpTweenComponent.SetAddFillAmount(1),
          (i = t.GetMaxExp(t.GetCurrentLevel() - 1)),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ExpShow", i, i))
        : ((i = t.StageMaxExp(t.GetCurrentLevel())),
          (i = t.GetCurrentExp() / i),
          this.ExpTweenComponent.SetCurrentFillAmount(i),
          this.ExpTweenComponent.SetAddFillAmount(i),
          (i = t.GetMaxExp(t.GetCurrentLevel())),
          (e = t.GetIsAddUp()
            ? t.AddUpMaxExp(t.GetCurrentLevel() - 1) + t.GetCurrentExp()
            : t.GetCurrentExp()),
          LguiUtil_1.LguiUtil.SetLocalText(this.GetText(3), "ExpShow", e, i)),
      (this.ATt = t.GetArrivedLevel());
  }
  Update(t, i = !0) {
    this.GetText(2).SetText("+" + Math.floor(t.GetCurrentAddExp()).toString()),
      this.GetText(2).SetUIActive(t.GetCurrentAddExp() > 0),
      t.GetIfNext() ? this.xTt(t, i) : this.wTt(t, i);
  }
  xTt(t, i = !0) {
    this.BTt(t.GetArrivedLevel()),
      this.SetMaxItemActive(t.GetArrivedLevel() === t.GetCurrentMaxLevel()),
      i ? this.bTt(t) : this.UpdateNextExpState(t.GetArrivedFillAmount());
  }
  wTt(t, i = !0) {
    this.PTt(!1),
      this.SetMaxItemActive(t.GetArrivedLevel() === t.GetCurrentMaxLevel()),
      i ? this.bTt(t) : this.UpdateCurrentExpState(t.GetArrivedFillAmount());
  }
  UpdateNextExpState(t) {
    this.ExpTweenComponent.SetCurrentSpriteActive(!1),
      this.ExpTweenComponent.SetAddFillAmount(1),
      this.ExpTweenComponent.SetNextSpriteActive(!0),
      this.ExpTweenComponent.SetNextFillAmount(t);
  }
  SetMaxItemActive(t) {
    this.GetItem(8).SetUIActive(t);
  }
  bTt(t) {
    this.ExpTweenComponent.PlayPreviewExpTween(
      t.GetCurrentLevel(),
      this.ATt,
      t.GetArrivedLevel(),
      t.GetCurrentMaxLevel(),
      t.GetArrivedFillAmount(),
    ),
      (this.ATt = t.GetArrivedLevel());
  }
  BindPlayCompleteCallBack(t) {
    this.ExpTweenComponent.BindPlayCompleteCallBack(t);
  }
  UpdateCurrentExpState(t) {
    this.ExpTweenComponent.SetCurrentSpriteActive(!0),
      this.ExpTweenComponent.SetAddFillAmount(t),
      this.ExpTweenComponent.SetNextSpriteActive(!1);
  }
  PTt(t) {
    t || this.GetText(1).SetText(""), this.GetItem(4).SetUIActive(t);
  }
  BTt(t) {
    this.PTt(!0),
      StringUtils_1.StringUtils.IsEmpty(this.RTt)
        ? this.GetText(1).SetText(t.toString())
        : LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(1),
            this.RTt,
            t.toString(),
          );
  }
  SetLevelItemShowState(t) {
    this.SetArrowShowState(t), this.SetAfterTextShowState(t);
  }
  SetArrowShowState(t) {
    this.GetItem(4).SetUIActive(t);
  }
  SetAfterTextShowState(t) {
    this.GetText(1).SetUIActive(t);
  }
  RefreshSingleText(t) {
    LguiUtil_1.LguiUtil.SetLocalText(this.GetText(0), t);
  }
  OnBeforeDestroy() {
    this.ExpTweenComponent.Destroy();
  }
}
exports.ExpComponent = ExpComponent;
// # sourceMappingURL=ExpComponent.js.map
