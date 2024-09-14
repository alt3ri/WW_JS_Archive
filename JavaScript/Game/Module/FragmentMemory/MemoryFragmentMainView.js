"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MemoryFragmentMainView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../Core/Common/Log"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Vector_1 = require("../../../Core/Utils/Math/Vector"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  GlobalData_1 = require("../../GlobalData"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  RedDotController_1 = require("../../RedDot/RedDotController"),
  UiBlurLogic_1 = require("../../Ui/Base/UiBlur/UiBlurLogic"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem"),
  UiManager_1 = require("../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid"),
  MapDefine_1 = require("../Map/MapDefine"),
  PhotographController_1 = require("../Photograph/PhotographController"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView"),
  WorldMapController_1 = require("../WorldMap/WorldMapController"),
  FragmentMemoryController_1 = require("./FragmentMemoryController");
class MemoryFragmentMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Bwn = void 0),
      (this.lqe = void 0),
      (this.xqe = void 0),
      (this.b9i = 0),
      (this.H3e = void 0),
      (this.bwn = !1),
      (this.qwn = !1),
      (this.SPe = void 0),
      (this.DNn = 0),
      (this.$Gn = () => {
        var e = this.xqe.GetDisplayGridStartIndex(),
          i = this.Bwn.GetCollectDataList();
        let r = 0;
        for (let t = 0; t < e; t++) i[t].GetIfCanGetReward() && (r = t);
        this.xqe?.ScrollToGridIndex(r);
        var t = r !== this.b9i;
        (this.b9i = r), this.Og(), t && this.I3e();
      }),
      (this.UNn = () => {
        var t = this.kwn().GetQuestList();
        if (0 < t.length)
          for (const r of t) {
            var e =
              ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(r);
            if (!e)
              return ModelManager_1.ModelManager.QuestNewModel.GetQuest(r)
                ? void UiManager_1.UiManager.OpenView("QuestView", r)
                : void ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
                    MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
                      "Text_FragmentQuest",
                    ),
                  );
          }
        ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity(),
          (this.DNn = 0);
        var t = this.kwn().GetTraceEntityId(),
          i = this.kwn().GetTraceMarkId(),
          t =
            ModelManager_1.ModelManager.CreatureModel.GetEntityData(t)
              ?.Transform?.Pos;
        t
          ? ((t = new MapDefine_1.DynamicMarkCreateInfo(
              Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0),
              i,
              7,
              void 0,
              void 0,
              !0,
            )),
            0 === this.DNn &&
              (this.DNn =
                ModelManager_1.ModelManager.MapModel.CreateMapMark(t)),
            (i = { MarkId: this.DNn, MarkType: 7 }),
            WorldMapController_1.WorldMapController.OpenView(2, !1, i),
            (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackMapMarkId =
              this.DNn),
            (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackFragmentId =
              this.kwn().GetId()))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("FragmentMemory", 28, "没有找到实体");
      }),
      (this.YGn = () => {
        var e = this.xqe.GetDisplayGridEndIndex(),
          i = this.Bwn.GetCollectDataList();
        let r = e;
        var s = i.length;
        for (let t = e; t <= s - 1; t++)
          if (i[t].GetIfCanGetReward()) {
            r = t;
            break;
          }
        this.xqe?.ScrollToGridIndex(r);
        e = r !== this.b9i;
        (this.b9i = r), this.Og(), e && this.I3e();
      }),
      (this.$Ge = () => {
        this.qbn();
      }),
      (this.Gwn = () => {
        (this.Bwn =
          ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
            this.Bwn.GetId(),
          )),
          this.Og();
      }),
      (this.Own = () => {
        (this.Bwn =
          ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
            this.Bwn.GetId(),
          )),
          this.Og();
      }),
      (this.Nwn = () => {
        var t = this.kwn();
        FragmentMemoryController_1.FragmentMemoryController.RequestMemoryReward(
          [t.GetId()],
        );
      }),
      (this.Fwn = () => {
        PhotographController_1.PhotographController.ScreenShot({
          ScreenShot: !0,
          IsHiddenBattleView: !1,
          HandBookPhotoData: void 0,
          GachaData: void 0,
          FragmentMemory: this.kwn(),
        });
      }),
      (this.Vwn = () => {
        UiManager_1.UiManager.OpenView("FragmentedCluesView", this.kwn());
      }),
      (this.UMt = () => {
        return new GridItem();
      }),
      (this.Hwn = () => new TabItem()),
      (this.pFe = () => {
        this.CloseMe();
      }),
      (this.jwn = () => this.b9i),
      (this.Wwn = (t) => {
        var e = t !== this.b9i;
        (this.b9i = t), this.Og(!0), e && this.I3e();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIScrollViewWithScrollbarComponent],
      [9, UE.UIButtonComponent],
      [10, UE.UIItem],
      [11, UE.UIItem],
      [12, UE.UIItem],
      [13, UE.UIButtonComponent],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
      [16, UE.UIButtonComponent],
      [17, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [9, this.Nwn],
        [13, this.Fwn],
        [14, this.Vwn],
        [15, this.$Gn],
        [16, this.YGn],
        [17, this.UNn],
      ]);
  }
  OnStart() {
    (this.H3e = new GenericLayout_1.GenericLayout(
      this.GetScrollViewWithScrollbar(8)
        .GetContent()
        .GetComponentByClass(UE.UILayoutBase.StaticClass()),
      this.UMt,
    )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.pFe),
      this.lqe.SetHelpBtnActive(!1),
      (this.xqe = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(3).GetOwner(),
        this.Hwn,
      )),
      this.GetButton(15)?.RootUIComp.SetUIActive(!1),
      this.GetButton(16)?.RootUIComp.SetUIActive(!1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    var e = this.OpenParam;
    if ((e && (this.Bwn = e.FragmentMemoryTopicData), 0 < e?.CurrentSelectId)) {
      var i = this.Bwn.GetCollectDataList();
      for (let t = 0; t < i.length; t++)
        if (i[t].GetId() === e.CurrentSelectId) {
          this.b9i = t;
          break;
        }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
      this.Own,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
        this.Gwn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
      this.Own,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
        this.Gwn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnAfterHide() {
    UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
      GlobalData_1.GlobalData.GameInstance.GetWorld(),
    );
  }
  kwn() {
    return this.Bwn.GetCollectDataList()[this.b9i];
  }
  OnBeforeShow() {
    this.lqe?.SetTitleByTextIdAndArgNew(this.Bwn.GetConfig().Title),
      this.Og(),
      this.Nqe(),
      this.ROn(),
      0 < this.b9i && this.xqe?.ScrollToGridIndex(this.b9i);
  }
  ROn() {
    StringUtils_1.StringUtils.IsEmpty(
      ModelManager_1.ModelManager.FragmentMemoryModel
        .MemoryFragmentMainViewTryPlayAnimation,
    ) ||
      (this.SPe?.PlaySequencePurely(
        ModelManager_1.ModelManager.FragmentMemoryModel
          .MemoryFragmentMainViewTryPlayAnimation,
      ),
      (ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
        ""));
  }
  OnAfterShow() {
    this.qbn();
  }
  Og(t = !1) {
    this.Esi(t),
      this.Z3e(),
      this.mGe(),
      this.Aqe(),
      this.Pqe(),
      this.Kwn(),
      this.e6e(),
      this.Qwn(),
      this.WTt(),
      this.mKi(),
      this.Xwn(),
      this.H3i(),
      this.qbn();
  }
  qbn() {
    this.kwn()?.GetIfUnlock()
      ? UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
          GlobalData_1.GlobalData.GameInstance.GetWorld(),
        )
      : UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this);
  }
  Nqe() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      "FragmentCollectProgress",
      this.Bwn.GetFinishCollectNum(),
      this.Bwn.GetMemoryCollectNum(),
    );
  }
  Esi(t = !1) {
    var e = this.Bwn.GetCollectDataList();
    const i = [];
    for (const s of e) {
      var r = new TabItemData();
      (r.FragmentCollectData = s),
        (r.TabCallBack = this.Wwn),
        (r.GetCurrentSelectTabIndex = this.jwn),
        (r.NeedSwitchAnimation = t),
        i.push(r);
    }
    this.xqe?.RefreshByData(i, !1, () => {
      i.forEach((t) => {
        t.NeedSwitchAnimation = !1;
      });
    });
  }
  Z3e() {
    var t = this.kwn(),
      e = [];
    for (const r of t.GetPreviewReward()) {
      var i = new GridItemData();
      (i.Data = r), (i.GetRewardState = t.GetIfGetReward()), e.push(i);
    }
    this.H3e?.RefreshByData(e);
  }
  I3e() {
    "Switch" === this.SPe?.GetCurrentSequence()
      ? this.SPe?.ReplaySequenceByKey("Switch")
      : this.SPe?.PlayLevelSequenceByName("Switch");
  }
  mGe() {
    var t,
      e = this.kwn();
    void 0 !== e &&
      ((t = this.GetText(5)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetTitle()));
  }
  Pqe() {
    var t,
      e = this.kwn();
    void 0 !== e &&
      ((t = this.GetText(7))?.SetUIActive(!0),
      e.GetIfUnlock()
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetDesc())
        : LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetTipsDesc()));
  }
  Aqe() {
    var t,
      e = this.kwn();
    void 0 !== e &&
      ((t = this.GetTexture(1)),
      this.SetTextureByPath(e.GetBgResource(), t, "MemoryFragmentMainView"),
      t?.SetChangeColor(!e.GetIfUnlock(), t.changeColor));
  }
  Kwn() {
    var t = this.kwn();
    void 0 !== t &&
      this.GetButton(9)?.RootUIComp.SetUIActive(
        !t.GetIfGetReward() && t.GetIfUnlock(),
      );
  }
  e6e() {
    var t = this.kwn();
    void 0 !== t && this.GetItem(10)?.SetUIActive(t.GetIfGetReward());
  }
  Qwn() {
    var i = this.kwn();
    if (void 0 !== i) {
      var r = !i.GetIfGetReward() && !i.GetIfUnlock();
      let t = !1,
        e = !1;
      r &&
        (0 < i.GetTraceEntityId() && (t = !0), 0 < i.GetQuestList().length) &&
        (e = !0);
      i = t || e;
      this.GetItem(11)?.SetUIActive(r && !i),
        this.GetButton(17)?.RootUIComp.SetUIActive(r && i);
    }
  }
  WTt() {
    var t = this.kwn();
    void 0 !== t && this.GetItem(12)?.SetUIActive(!t.GetIfUnlock());
  }
  mKi() {
    var t = this.kwn();
    void 0 !== t && this.GetButton(13)?.RootUIComp.SetUIActive(t.GetIfUnlock());
  }
  OnTick(t) {
    var e = this.xqe.GetDisplayGridStartIndex(),
      i = this.xqe.GetDisplayGridEndIndex(),
      r = this.Bwn.GetCollectDataList();
    let s = !1;
    for (let t = 0; t < e; t++)
      if (r[t].GetIfCanGetReward()) {
        s = !0;
        break;
      }
    this.bwn !== s &&
      (this.GetButton(15)?.RootUIComp.SetUIActive(s), (this.bwn = s));
    let h = !1;
    var o = r.length;
    for (let t = i; t <= o - 1; t++)
      if (r[t].GetIfCanGetReward() && t !== i) {
        h = !0;
        break;
      }
    this.qwn !== h &&
      (this.GetButton(16)?.RootUIComp.SetUIActive(h), (this.qwn = h));
  }
  H3i() {
    var t = this.kwn();
    void 0 !== t &&
      this.GetButton(14)?.RootUIComp.SetUIActive(
        !t.GetIfUnlock() && 0 < t.GetClueId(),
      );
  }
  Xwn() {
    var t = this.kwn();
    void 0 === t
      ? this.GetText(6).SetText("")
      : LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(6),
          "FragmentMemoryCollectTime",
          t.GetTimeText(),
        );
  }
  OnBeforeHide() {
    ModelManager_1.ModelManager.FragmentMemoryModel.ActivitySubViewTryPlayAnimation =
      "ShowView01";
  }
}
exports.MemoryFragmentMainView = MemoryFragmentMainView;
class TabItemData {
  constructor() {
    (this.FragmentCollectData = void 0),
      (this.TabCallBack = () => {}),
      (this.GetCurrentSelectTabIndex = () => 0),
      (this.NeedSwitchAnimation = !1);
  }
}
class TabItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.SPe = void 0),
      (this.lkn = !1),
      (this.$wn = () => {
        this.Pe.TabCallBack(this.GridIndex);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIText],
    ]),
      (this.BtnBindInfo = [[0, this.$wn]]);
  }
  _kn() {
    return (
      void 0 === this.SPe &&
        (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem,
        )),
      this.SPe
    );
  }
  Refresh(t, e, i) {
    this.Pe = t;
    var r = this.GridIndex === t.GetCurrentSelectTabIndex(),
      s = r ? 1 : 0;
    this.GetExtendToggle(0)?.SetToggleState(s),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(7),
        t.FragmentCollectData.GetTitle(),
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(2),
        t.FragmentCollectData.GetTitle(),
      ),
      this.GetItem(3)?.SetUIActive(t.FragmentCollectData.GetIfGetReward()),
      this.BNe(),
      this.Ywn(),
      this.a9i(),
      this.abn(),
      this.lkn !== r && this.ukn(s),
      (this.lkn = r);
  }
  ukn(t) {
    var e,
      t = 1 === t ? "Select" : "Unselect";
    this.Pe?.NeedSwitchAnimation
      ? (e = this._kn()).GetCurrentSequence() === t
        ? e?.ReplaySequenceByKey(t)
        : e?.PlaySequencePurely(t)
      : ((e = this._kn())?.StopSequenceByKey("Select", !1, !1),
        e?.PlaySequencePurely(t),
        e.StopSequenceByKey(t, !1, !0));
  }
  abn() {
    var t;
    this.Pe.FragmentCollectData.GetIfUnlock()
      ? ((t = (this.GridIndex + 1).toString().padStart(2, "0")),
        this.GetText(1)?.SetText(t))
      : this.GetText(1)?.SetText("");
  }
  Ywn() {
    var t = this.Pe.FragmentCollectData.GetIfUnlock();
    this.GetItem(5)?.SetUIActive(t);
  }
  a9i() {
    var t = !this.Pe.FragmentCollectData.GetIfUnlock();
    this.GetItem(6)?.SetUIActive(t);
  }
  BNe() {
    RedDotController_1.RedDotController.UnBindGivenUi(
      "FragmentMemoryReward",
      this.GetItem(4),
      this.Pe.FragmentCollectData.GetId(),
    ),
      RedDotController_1.RedDotController.BindRedDot(
        "FragmentMemoryReward",
        this.GetItem(4),
        void 0,
        this.Pe.FragmentCollectData.GetId(),
      );
  }
}
class GridItemData {
  constructor() {
    (this.Data = void 0), (this.GetRewardState = !1);
  }
}
class GridItem extends LoopScrollSmallItemGrid_1.LoopScrollSmallItemGrid {
  constructor() {
    super(...arguments), (this.Mne = 0);
  }
  OnRefresh(t, e, i) {
    this.Refresh(t);
  }
  OnCanExecuteChange() {
    return !1;
  }
  OnExtendToggleClicked() {
    ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
      this.Mne,
    );
  }
  Refresh(t) {
    var e, i;
    t?.Data &&
      ((i = t.Data[0]),
      (e = t.Data[1]),
      (this.Mne = i.ItemId),
      (i = t.GetRewardState),
      (t = {
        Data: t,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: 0 < e ? "" + e : "",
        IsReceivedVisible: i,
      }),
      this.Apply(t));
  }
}
//# sourceMappingURL=MemoryFragmentMainView.js.map
