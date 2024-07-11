"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MergeMonsterHeadStateView = void 0);
const UE = require("ue");
const CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById");
const ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem");
const PublicUtil_1 = require("../../../../Common/PublicUtil");
const GlobalData_1 = require("../../../../GlobalData");
const LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer");
const BattleChildView_1 = require("../BattleChildView/BattleChildView");
const HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine");
const VisibleAnimMachine_1 = require("../State/VisibleAnimMachine");
const rgbSplitProgress = new UE.FName("RGBSplit_Progress");
const SHOW_VIEW_ANIM_TIME = 667;
const CLOSE_VIEW_ANIM_TIME = 167;
class MergeMonsterHeadStateView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Info = void 0),
      (this.EPe = void 0),
      (this.Wot = void 0),
      (this.Qot = -0),
      (this.Xot = 1),
      (this.ert = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.ort = void 0),
      (this.rrt = -1),
      (this.nrt = -0),
      (this.srt = 0),
      (this.frt = !1),
      (this.Art = new Map()),
      (this.Prt = (i) => {
        i || this.Hide();
      }),
      (this.xrt = (i) => {
        i
          ? this.EPe.PlaySequencePurely("ShowView")
          : this.EPe.PlaySequencePurely("CloseView");
      }),
      (this.wrt = (i) => {
        this.EPe.StopCurrentSequence();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UISprite],
      [8, UE.UIItem],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UIItem],
      [12, UE.UINiagara],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIItem],
      [16, UE.UIItem],
      [17, UE.UIItem],
      [18, UE.UISprite],
      [19, UE.UINiagara],
      [20, UE.UISprite],
      [21, UE.UISprite],
      [22, UE.UIItem],
      [23, UE.UINiagara],
      [24, UE.UINiagara],
      [25, UE.UIItem],
      [26, UE.UIItem],
      [27, UE.UIItem],
      [28, UE.UIItem],
      [29, UE.UIItem],
      [30, UE.UIItem],
      [31, UE.UIItem],
    ]),
      (this.nrt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitEffectDuration",
        ));
  }
  OnStart() {
    (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Brt(),
      (this.Qot =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitLargeBufferPercent",
        ) / 1e4),
      (this.Wot = new VisibleAnimMachine_1.VisibleAnimMachine()),
      this.Wot.InitCallback(this.Prt, this.xrt, this.wrt),
      this.Wot.InitVisible(!1),
      this.cnt();
    const i = UE.Color.FromHex("ED601BFF");
    this.GetText(1).SetColor(i);
  }
  cnt() {
    this.GetSprite(10).SetUIActive(!1), this.GetItem(11).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.EPe.Clear(),
      (this.EPe = void 0),
      this.Wot.Reset(),
      (this.Wot = void 0);
  }
  OnBeforeShow() {
    this.mnt(), this.Wot.SetVisible(!0, SHOW_VIEW_ANIM_TIME);
  }
  Refresh(i) {
    (this.Info = i),
      this.IsShowOrShowing && (void 0 === i ? this.Hrt() : this.mnt());
  }
  mnt() {
    this.vrt(), this.dnt(), this.Cnt();
  }
  Initialize(i) {
    super.Initialize(i),
      (this.srt = this.GetItem(8).GetParentAsUIItem().GetWidth()),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        "/LGUI/MPC_UIShader.MPC_UIShader",
        UE.MaterialParameterCollection,
        (i) => {
          this.ort = i;
        },
        103,
      );
  }
  OnHealthChanged() {
    this.Cnt(!0);
  }
  OnLanguageChange() {
    this.dnt();
  }
  Tick(i) {
    let t;
    this.IsShowOrShowing &&
      (this.frt &&
        ((t = this.ert.UpdatePercent(i)) < 0
          ? this.Hrt()
          : t <= 1 && this.Xrt(t)),
      this.rrt > this.nrt && (this.$rt(0), (this.rrt = -1)),
      this.rrt >= 0) &&
      (this.rrt += i);
  }
  Cnt(i = !1) {
    let t;
    this.Info.TotalHpMax <= 0 ||
      ((t = this.Info.TotalHp / this.Info.TotalHpMax),
      this.int(t),
      i ? this.rnt(t) : this.Hrt(),
      (this.Xot = t));
  }
  rnt(i) {
    let t;
    i < this.Xot &&
      ((t = this.ert.IsOriginState()),
      this.ert.GetHit(i, this.Xot),
      t && !this.ert.IsOriginState() && this.Xrt(this.Xot),
      (this.frt = !0),
      this.Xot - i < this.Qot
        ? this.Ert(25)
        : (this.Ert(26), (this.rrt = 0), this.$rt(1)));
  }
  $rt(i) {
    this.ort &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.GameInstance.GetWorld(),
        this.ort,
        rgbSplitProgress,
        i,
      );
  }
  Hrt() {
    this.GetItem(8).SetUIActive(!1), this.ert.Reset(), (this.frt = !1);
  }
  int(i) {
    this.GetSprite(7).SetFillAmount(i);
  }
  Xrt(i) {
    var t = this.srt * this.Xot;
    var i = this.srt * i;
    var t = i - t;
    var i = i - (this.srt + t) / 2;
    const e = this.GetItem(8);
    e.SetAnchorOffsetX(i),
      e.SetWidth(t),
      e.SetUIActive(!0),
      this.GetSprite(9).SetAnchorOffsetX(-i);
  }
  vrt() {
    const i = this.GetText(0);
    i && i.SetUIActive(!1);
  }
  dnt() {
    const i = this.Info.MonsterGroupName;
    const t = this.GetText(1);
    i
      ? t.SetText(PublicUtil_1.PublicUtil.GetConfigTextByKey(i))
      : t.SetText("");
  }
  Brt() {
    this.hnt(25), this.hnt(26);
  }
  hnt(i) {
    const t = [];
    const e = this.GetItem(i)
      .GetOwner()
      .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
    const s = e.Num();
    for (let i = 0; i < s; i++) t.push(e.Get(i));
    this.Art.set(i, t);
  }
  Ert(i) {
    i = this.Art.get(i);
    if (i) for (const t of i) t.Play();
  }
  HideWithAnim() {
    this.Wot.SetVisible(!1, CLOSE_VIEW_ANIM_TIME);
  }
  GetResourceId() {
    return "UiItem_BossState_Prefab";
  }
}
exports.MergeMonsterHeadStateView = MergeMonsterHeadStateView;
// # sourceMappingURL=MergeMonsterHeadStateView.js.map
