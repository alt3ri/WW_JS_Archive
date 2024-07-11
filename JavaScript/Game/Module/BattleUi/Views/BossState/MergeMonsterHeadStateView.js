"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MergeMonsterHeadStateView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  ResourceSystem_1 = require("../../../../../Core/Resource/ResourceSystem"),
  PublicUtil_1 = require("../../../../Common/PublicUtil"),
  GlobalData_1 = require("../../../../GlobalData"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  BattleChildView_1 = require("../BattleChildView/BattleChildView"),
  HpBufferStateMachine_1 = require("../HeadState/HpBufferStateMachine"),
  VisibleAnimMachine_1 = require("../State/VisibleAnimMachine"),
  rgbSplitProgress = new UE.FName("RGBSplit_Progress"),
  SHOW_VIEW_ANIM_TIME = 667,
  CLOSE_VIEW_ANIM_TIME = 167;
class MergeMonsterHeadStateView extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.Info = void 0),
      (this.SPe = void 0),
      (this.ont = void 0),
      (this.nnt = -0),
      (this.snt = 1),
      (this.cnt = new HpBufferStateMachine_1.HpBufferStateMachine()),
      (this.Cnt = void 0),
      (this.gnt = -1),
      (this.fnt = -0),
      (this.pnt = 0),
      (this.Ant = !1),
      (this.Hnt = new Map()),
      (this.jnt = (i) => {
        i || this.Hide();
      }),
      (this.Wnt = (i) => {
        i
          ? this.SPe.PlaySequencePurely("ShowView")
          : this.SPe.PlaySequencePurely("CloseView");
      }),
      (this.Knt = (i) => {
        this.SPe.StopCurrentSequence();
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
      (this.fnt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitEffectDuration",
        ));
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Qnt(),
      (this.nnt =
        CommonParamById_1.configCommonParamById.GetIntConfig(
          "HitLargeBufferPercent",
        ) / 1e4),
      (this.ont = new VisibleAnimMachine_1.VisibleAnimMachine()),
      this.ont.InitCallback(this.jnt, this.Wnt, this.Knt),
      this.ont.InitVisible(!1),
      this.Tst();
    var i = UE.Color.FromHex("ED601BFF");
    this.GetText(1).SetColor(i);
  }
  Tst() {
    this.GetSprite(10).SetUIActive(!1), this.GetItem(11).SetUIActive(!1);
  }
  OnBeforeDestroy() {
    this.SPe.Clear(),
      (this.SPe = void 0),
      this.ont.Reset(),
      (this.ont = void 0);
  }
  OnBeforeShow() {
    this.Lst(), this.ont.SetVisible(!0, SHOW_VIEW_ANIM_TIME);
  }
  Refresh(i) {
    (this.Info = i),
      this.IsShowOrShowing && (void 0 === i ? this.ist() : this.Lst());
  }
  Lst() {
    this.xnt(), this.Dst(), this.Rst();
  }
  Initialize(i) {
    super.Initialize(i),
      (this.pnt = this.GetItem(8).GetParentAsUIItem().GetWidth()),
      ResourceSystem_1.ResourceSystem.LoadAsync(
        "/LGUI/MPC_UIShader.MPC_UIShader",
        UE.MaterialParameterCollection,
        (i) => {
          this.Cnt = i;
        },
        103,
      );
  }
  OnHealthChanged() {
    this.Rst(!0);
  }
  OnLanguageChange() {
    this.Dst();
  }
  Tick(i) {
    var t;
    this.IsShowOrShowing &&
      (this.Ant &&
        ((t = this.cnt.UpdatePercent(i)) < 0
          ? this.ist()
          : t <= 1 && this.ast(t)),
      this.gnt > this.fnt && (this.hst(0), (this.gnt = -1)),
      0 <= this.gnt) &&
      (this.gnt += i);
  }
  Rst(i = !1) {
    var t;
    this.Info.TotalHpMax <= 0 ||
      ((t = this.Info.TotalHp / this.Info.TotalHpMax),
      this.Cst(t),
      i ? this.fst(t) : this.ist(),
      (this.snt = t));
  }
  fst(i) {
    var t;
    i < this.snt &&
      ((t = this.cnt.IsOriginState()),
      this.cnt.GetHit(i, this.snt),
      t && !this.cnt.IsOriginState() && this.ast(this.snt),
      (this.Ant = !0),
      this.snt - i < this.nnt
        ? this.bnt(25)
        : (this.bnt(26), (this.gnt = 0), this.hst(1)));
  }
  hst(i) {
    this.Cnt &&
      UE.KismetMaterialLibrary.SetScalarParameterValue(
        GlobalData_1.GlobalData.GameInstance.GetWorld(),
        this.Cnt,
        rgbSplitProgress,
        i,
      );
  }
  ist() {
    this.GetItem(8).SetUIActive(!1), this.cnt.Reset(), (this.Ant = !1);
  }
  Cst(i) {
    this.GetSprite(7).SetFillAmount(i);
  }
  ast(i) {
    var t = this.pnt * this.snt,
      i = this.pnt * i,
      t = i - t,
      i = i - (this.pnt + t) / 2,
      e = this.GetItem(8);
    e.SetAnchorOffsetX(i),
      e.SetWidth(t),
      e.SetUIActive(!0),
      this.GetSprite(9).SetAnchorOffsetX(-i);
  }
  xnt() {
    var i = this.GetText(0);
    i && i.SetUIActive(!1);
  }
  Dst() {
    var i = this.Info.MonsterGroupName,
      t = this.GetText(1);
    i
      ? t.SetText(PublicUtil_1.PublicUtil.GetConfigTextByKey(i))
      : t.SetText("");
  }
  Qnt() {
    this.Est(25), this.Est(26);
  }
  Est(i) {
    var t = [],
      e = this.GetItem(i)
        .GetOwner()
        .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass()),
      s = e.Num();
    for (let i = 0; i < s; i++) t.push(e.Get(i));
    this.Hnt.set(i, t);
  }
  bnt(i) {
    i = this.Hnt.get(i);
    if (i) for (const t of i) t.Play();
  }
  HideWithAnim() {
    this.ont.SetVisible(!1, CLOSE_VIEW_ANIM_TIME);
  }
  GetResourceId() {
    return "UiItem_BossState_Prefab";
  }
}
exports.MergeMonsterHeadStateView = MergeMonsterHeadStateView;
//# sourceMappingURL=MergeMonsterHeadStateView.js.map
