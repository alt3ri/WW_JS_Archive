"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TowerDefenseRankView = void 0);
const UE = require("ue"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiAsyncTask_1 = require("../../../Ui/Base/UiAsyncTask"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../Util/ScrollView/LoopScrollView"),
  TowerDefenceDefine_1 = require("../TowerDefenceDefine"),
  TowerDefenseRankItem_1 = require("./TowerDefenseRankItem");
class RankTabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Xyc = void 0),
      (this.R$l = void 0),
      (this.Bke = () => {
        this.R$l.TabItemToggle(this.Xyc);
      });
  }
  OnRegisterComponent() {
    (this.R$l = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UIExtendToggle],
        [1, UE.UIText],
      ]),
      (this.BtnBindInfo = [[0, this.Bke]]);
  }
  OnStart() {
    this.GetExtendToggle(0)?.CanExecuteChange.Bind(() =>
      this.R$l.TabItemCanExecuteChange(this.Xyc),
    );
  }
  GetKey(e, t) {
    return e;
  }
  Refresh(e, t, i) {
    (this.Xyc = e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        TowerDefenceDefine_1.tabText[e],
      );
  }
  SetToggleState(e, t = !1) {
    e = e ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(e, t);
  }
}
class TowerDefenseRankView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.B7t = void 0),
      (this.Yyc = void 0),
      (this.zyc = void 0),
      (this.HLn = void 0),
      (this.C5e = () => {
        var e = new RankTabItem();
        return (e.OpenParam = this.HLn), e;
      }),
      (this.Jyc = () => {
        var e = new TowerDefenseRankItem_1.TowerDefenseRankItem(!1);
        return (e.OpenParam = this.HLn), e;
      });
  }
  OnRegisterComponent() {
    (this.HLn = this.OpenParam),
      this.HLn.RegisterView(this),
      (this.ComponentRegisterInfos = [
        [0, UE.UILayoutBase],
        [1, UE.UIItem],
        [2, UE.UILoopScrollViewComponent],
        [3, UE.UIItem],
        [4, UE.UIItem],
        [5, UE.UIExtendToggle],
        [6, UE.UIItem],
      ]),
      (this.BtnBindInfo = [[5, this.HLn.ToggleAnonymousClick]]);
  }
  async OnBeforeStartAsync() {
    await Promise.all([this.HLn.RequestRankData(), this.Zyc(), this.eSc()]),
      this.tSc(),
      this.iSc();
  }
  OnStart() {
    (ModelManager_1.ModelManager.TowerDefenseModel.RankData.IsOwnSingleBestScore(
      this.HLn.InstanceId,
    )
      ? this.B7t.GetLayoutItemByIndex(TowerDefenceDefine_1.ETabType.Single)
      : this.B7t.GetLayoutItemByIndex(TowerDefenceDefine_1.ETabType.Online)
    )?.SetToggleState(!0, !0);
  }
  async eSc() {
    this.B7t = new GenericLayout_1.GenericLayout(
      this.GetLayoutBase(0),
      this.C5e,
      this.GetItem(1).GetOwner(),
    );
    var e = Object.values(TowerDefenceDefine_1.ETabType).filter(
      (e) => "number" == typeof e,
    );
    await this.B7t.RefreshByDataAsync(e);
  }
  tSc() {
    this.Yyc = new LoopScrollView_1.LoopScrollView(
      this.GetLoopScrollViewComponent(2),
      this.GetItem(3).GetOwner(),
      this.Jyc,
    );
  }
  iSc() {
    var e = ModelManager_1.ModelManager.TowerDefenseModel.RankData
      .IsOpenAnonymousName
      ? 1
      : 0;
    this.GetExtendToggle(5).SetToggleState(e);
  }
  async Zyc() {
    (this.zyc = new TowerDefenseRankItem_1.TowerDefenseRankItem(!0)),
      (this.zyc.OpenParam = this.HLn),
      await this.zyc.CreateThenShowByActorAsync(this.GetItem(4).GetOwner());
  }
  async rSc(e) {
    var t =
        ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetRankDataListByTabType(
          e,
        ),
      i = 0 < t.length,
      i =
        (this.GetItem(6)?.SetUIActive(!i),
        this.Yyc.SetTargetRootComponentActive(i),
        0 < t.length && (await this.Yyc.RefreshByDataAsync(t)),
        ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetSelfRankDataByTabType(
          e,
        ));
    this.zyc.Refresh(i);
  }
  oSc(e) {
    e =
      ModelManager_1.ModelManager.TowerDefenseModel.RankData.GetSelfRankDataByTabType(
        e,
      );
    this.GetExtendToggle(5).RootUIComp.SetUIActive(e.IsInRank);
  }
  ResetLastTabItemSelected(e) {
    e = this.B7t.GetLayoutItemByIndex(e);
    e && e.SetToggleState(!1);
  }
  RefreshContent(e) {
    var t = new UiAsyncTask_1.UiAsyncTask(
      "TowerDefenseRankView.RefreshContent",
      async () => {
        await this.rSc(e);
      },
    );
    this.RunAsyncTask(t), this.oSc(e);
  }
  RefreshContentShowName() {
    var t = this.Yyc.Iei,
      i = this.Yyc.NCi;
    for (let e = t; e <= i; ++e) {
      var s = this.Yyc.TryGetCachedData(e);
      s &&
        s.IsSelfInData &&
        this.Yyc.UnsafeGetGridProxy(e)?.RefreshPlayerName();
    }
  }
}
exports.TowerDefenseRankView = TowerDefenseRankView;
//# sourceMappingURL=TowerDefenseRankView.js.map
