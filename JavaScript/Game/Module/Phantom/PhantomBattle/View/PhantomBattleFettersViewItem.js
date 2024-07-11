"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.VisionDetailMonsterItem =
    exports.VisionDetailMonsterItemData =
    exports.PhantomBattleFettersViewItem =
      void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../Core/Common/CustomPromise"),
  Log_1 = require("../../../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../../../Core/Define/ConfigQuery/MultiTextLang"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../Ui/Base/UiPanelBase"),
  FilterEntrance_1 = require("../../../Common/FilterSort/Filter/View/FilterEntrance"),
  SortEntrance_1 = require("../../../Common/FilterSort/Sort/View/SortEntrance"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  LoopScrollSmallItemGrid_1 = require("../../../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  UiSceneManager_1 = require("../../../UiComponent/UiSceneManager"),
  UiModelUtil_1 = require("../../../UiModel/UiModelUtil"),
  GenericLayout_1 = require("../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView"),
  PhantomBattleItemView_1 = require("./PhantomBattleItemView");
class PhantomBattleFettersViewItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Z6i = 14),
      (this.e8i = void 0),
      (this.t8i = void 0),
      (this.vpt = void 0),
      (this.Mpt = void 0),
      (this.eGe = void 0),
      (this.H1i = void 0),
      (this.SPe = void 0),
      (this.i8i = 0),
      (this.dFe = 0),
      (this.o8i = 0),
      (this.r8i = !1),
      (this.OnFastFilter = void 0),
      (this.n8i = () => {
        return new VisionDetailMonsterItem();
      }),
      (this.sGe = () => {
        return new VisionFetterDescItem();
      }),
      (this.cHe = () => {
        var e = new PhantomBattleItemView_1.PhantomFettersItem();
        return e.BindOnItemButtonClickedCallback(this.BTt), e;
      }),
      (this.Qvt = (e) => {
        (this.t8i = e), this.Esi(), this.s8i(e);
      }),
      (this.Esi = () => {
        if (this.t8i)
          if (
            (this.e8i.DeselectCurrentGridProxy(),
            this.e8i.ReloadData(this.t8i),
            0 === this.o8i)
          )
            this.e8i.SelectGridProxy(0), this.e8i.RefreshGridProxy(0);
          else {
            let t = 0;
            var i = this.t8i.length;
            for (let e = 0; e < i; e++)
              if (this.t8i[e].Id === this.o8i) {
                t = e;
                break;
              }
            this.e8i.ScrollToGridIndex(t, !0),
              this.e8i.SelectGridProxy(t),
              this.e8i.RefreshGridProxy(t);
          }
        else
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("Phantom", 28, "没有羁绊幻象");
      }),
      (this.BTt = (e) => {
        this.e8i.DeselectCurrentGridProxy();
        var t = this.t8i.indexOf(e);
        this.e8i.IsGridDisplaying(t) &&
          (this.a8i(e),
          this.e8i.SelectGridProxy(t),
          this.e8i.RefreshGridProxy(t));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIItem],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [9, UE.UIGridLayout],
      [10, UE.UIText],
    ]),
      this.OnFastFilter && (this.BtnBindInfo = [[5, this.OnFastFilter]]);
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.GetRootItem(),
    )),
      (this.e8i = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.cHe,
      )),
      (this.vpt = new FilterEntrance_1.FilterEntrance(
        this.GetItem(6),
        this.Qvt,
      )),
      (this.Mpt = new SortEntrance_1.SortEntrance(this.GetItem(7), this.Qvt)),
      (this.eGe = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(3),
        this.sGe,
      )),
      (this.H1i = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(9),
        this.n8i,
      )),
      this.vpt.SetUiActive(
        !ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab,
      ),
      this.Mpt.SetUiActive(
        !ModelManager_1.ModelManager.CalabashModel.OnlyShowBattleFettersTab,
      );
  }
  async PlayStartSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Start", e);
  }
  async PlayHideSequence() {
    var e = new CustomPromise_1.CustomPromise();
    await this.SPe.PlaySequenceAsync("Close", e);
  }
  OnBeforeShow() {
    var e;
    UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() &&
      ((e =
        UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle().Model?.CheckGetComponent(
          0,
        )),
      (this.r8i = e?.GetVisible() ?? !1),
      e?.SetVisible(!1)),
      this.h8i();
  }
  h8i() {
    var e =
      ModelManager_1.ModelManager.CalabashModel.GetPhantomFetterGroupList();
    this.vpt.UpdateData(this.Z6i, e), this.Mpt.UpdateData(this.Z6i, e);
  }
  s8i(e) {
    this.GetItem(8).SetUIActive(0 < e.length),
      this.GetButton(5).RootUIComp.SetUIActive(
        0 < e.length && void 0 !== this.OnFastFilter,
      );
  }
  l8i(t) {
    var i = new Array(),
      r = t.length;
    for (let e = 0; e < r; e++)
      i.push(new VisionDetailMonsterItemData(t[e], 0, this.dFe));
    var e = 0 < r,
      e =
        (e && this.H1i.RefreshByData(i),
        this.GetGridLayout(9).RootUIComp.SetUIActive(e),
        ModelManager_1.ModelManager.PhantomBattleModel.GetMonsterFindCountByMonsterIdArray(
          t,
        ));
    this.GetText(10).SetText(e + "/" + t.length);
  }
  SelectByFetterId(t) {
    var e = this.t8i.findIndex((e) => e.Id === t);
    0 < e && (this.e8i.ScrollToGridIndex(e, !0), this.e8i.SelectGridProxy(e));
  }
  SetSelectRoleId(e) {
    this.dFe = e;
  }
  a8i(e) {
    (this.i8i = e.Id),
      this.P5e(e.FetterGroupName),
      this.nOe(e.FetterMap),
      this._8i(e.FetterGroupDesc);
    (e =
      ModelManager_1.ModelManager.PhantomBattleModel.GetFetterGroupMonsterIdArray(
        this.i8i,
      )),
      (e = Array.from(e));
    this.l8i(e);
  }
  P5e(e) {
    this.GetText(2).ShowTextNew(e);
  }
  nOe(e) {
    const r = new Array();
    e.forEach((e, t) => {
      var i = new DescData();
      (i.Key = t), (i.Value = e), r.push(i);
    }),
      this.eGe.RefreshByData(r, void 0, !0),
      "Switch" === this.SPe?.GetCurrentSequence()
        ? this.SPe?.ReplaySequenceByKey("Switch")
        : (this.SPe?.StopCurrentSequence(),
          this.SPe?.PlayLevelSequenceByName("Switch"));
  }
  _8i(e) {
    this.GetText(4).ShowTextNew(e);
  }
  GetCurrentSelectGroupId() {
    return this.i8i;
  }
  OnBeforeDestroy() {
    var e;
    (ModelManager_1.ModelManager.PhantomBattleModel.CurrentSelectedFetter =
      void 0),
      UiSceneManager_1.UiSceneManager.HasVisionSkeletalHandle() &&
        (e =
          UiSceneManager_1.UiSceneManager.GetVisionSkeletalHandle()?.Model) &&
        UiModelUtil_1.UiModelUtil.SetVisible(e, this.r8i),
      this.e8i && (this.e8i.ClearGridProxies(), (this.e8i = void 0));
  }
}
exports.PhantomBattleFettersViewItem = PhantomBattleFettersViewItem;
class DescData {
  constructor() {
    (this.Key = 0), (this.Value = 0);
  }
}
class VisionFetterDescItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0);
  }
  Refresh(e, t, i) {
    this.Update(e);
  }
  Clear() {
    this.OnClear();
  }
  OnClear() {}
  OnSelected(e) {}
  OnDeselected(e) {}
  GetKey(e, t) {
    return this.GridIndex;
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
    ];
  }
  Update(e) {
    var t = e.Value;
    this.Dke(t), this.P5e(t, e.Key);
  }
  P5e(e, t) {
    (e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(
        e,
      )),
      (e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e.Name));
    this.GetText(0).SetText(e ?? ""),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(0),
        "VisionFetterDetailViewName",
        e,
        t.toString(),
      );
  }
  Dke(e) {
    e =
      ConfigManager_1.ConfigManager.PhantomBattleConfig.GetPhantomFetterById(e);
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(1),
      e.EffectDescription,
      ...e.EffectDescriptionParam,
    );
  }
}
class VisionDetailMonsterItemData {
  constructor(e = 0, t = 0, i = 0) {
    (this.MonsterId = e), (this.QualityId = t), (this.RoleId = i);
  }
}
exports.VisionDetailMonsterItemData = VisionDetailMonsterItemData;
class VisionDetailMonsterItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments),
      (this.u8i = 0),
      (this.RFe = () => {}),
      (this.c8i = () => {
        ModelManager_1.ModelManager.FunctionModel.IsOpen(10023)
          ? ControllerHolder_1.ControllerHolder.AdventureGuideController.JumpToTargetView(
              "MonsterDetectView",
              ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
                this.u8i,
              )?.MonsterProbeId,
            )
          : ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "NoJumpTo",
            );
      });
  }
  OnStart() {
    this.BindOnExtendToggleClicked(this.RFe);
  }
  OnExtendToggleClicked() {
    this.c8i();
  }
  OnExtendToggleStateChanged(e) {
    this.SetSelected(!1, !1);
  }
  OnRefresh(e, t, i) {
    this.Refresh(e);
  }
  Refresh(t) {
    this.u8i = t.MonsterId;
    var i = ModelManager_1.ModelManager.HandBookModel.GetHandBookInfo(
        1,
        this.u8i,
      ),
      e = ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t.RoleId),
      r = e?.GetPhantomData()?.GetDataMap();
    let s = 0;
    if (r)
      for (var [, o] of r)
        if (o?.GetConfig().MonsterId === this.u8i) {
          s = e?.GetRoleId();
          break;
        }
    r =
      ConfigManager_1.ConfigManager.CalabashConfig.GetCalabashDevelopRewardByMonsterId(
        this.u8i,
      );
    if (r) {
      i = void 0 !== i;
      let e = void 0;
      0 < t.QualityId &&
        ((a =
          ModelManager_1.ModelManager.PhantomBattleModel.GetPhantomItemIdArrayByMonsterId(
            this.u8i,
          )),
        (e = a[t.QualityId - 1]));
      var a = {
        Data: t,
        Type: 3,
        ItemConfigId: e,
        BottomText: "",
        IsNotFoundVisible: !i,
        MonsterId: r.MonsterInfoId,
        IconHidden: !i,
      };
      (a.VisionRoleHeadInfo = s), this.Apply(a);
    }
  }
}
exports.VisionDetailMonsterItem = VisionDetailMonsterItem;
//# sourceMappingURL=PhantomBattleFettersViewItem.js.map
