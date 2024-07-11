"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MemoryFragmentMainView = void 0);
const UE = require("ue");
const Log_1 = require("../../../Core/Common/Log");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ControllerHolder_1 = require("../../Manager/ControllerHolder");
const ModelManager_1 = require("../../Manager/ModelManager");
const RedDotController_1 = require("../../RedDot/RedDotController");
const UiBlurLogic_1 = require("../../Ui/Base/UiBlur/UiBlurLogic");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const PopupCaptionItem_1 = require("../../Ui/Common/PopupCaptionItem");
const UiManager_1 = require("../../Ui/UiManager");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LoopScrollSmallItemGrid_1 = require("../Common/SmallItemGrid/LoopScrollSmallItemGrid");
const MapDefine_1 = require("../Map/MapDefine");
const PhotographController_1 = require("../Photograph/PhotographController");
const GridProxyAbstract_1 = require("../Util/Grid/GridProxyAbstract");
const GenericLayout_1 = require("../Util/Layout/GenericLayout");
const LguiUtil_1 = require("../Util/LguiUtil");
const LoopScrollView_1 = require("../Util/ScrollView/LoopScrollView");
const WorldMapController_1 = require("../WorldMap/WorldMapController");
const FragmentMemoryController_1 = require("./FragmentMemoryController");
class MemoryFragmentMainView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.ixn = void 0),
      (this.lqe = void 0),
      (this.xqe = void 0),
      (this.q8i = 0),
      (this.DFe = void 0),
      (this.rxn = !1),
      (this.oxn = !1),
      (this.EPe = void 0),
      (this.mGn = 0),
      (this.zwn = () => {
        const e = this.xqe.GetDisplayGridStartIndex();
        const i = this.ixn.GetCollectDataList();
        let r = 0;
        for (let t = 0; t < e; t++) i[t].GetIfCanGetReward() && (r = t);
        this.xqe?.ScrollToGridIndex(r);
        const t = r !== this.q8i;
        (this.q8i = r), this.Og(), t && this.hFe();
      }),
      (this.dGn = () => {
        ModelManager_1.ModelManager.FragmentMemoryModel.TryRemoveCurrentTrackEntity(),
          (this.mGn = 0);
        var t = this.hxn().GetTraceEntityId();
        let e = this.hxn().GetTraceMarkId();
        var t =
          ModelManager_1.ModelManager.CreatureModel.GetEntityData(t)?.Transform
            ?.Pos;
        t
          ? ((t = new MapDefine_1.DynamicMarkCreateInfo(
              Vector_1.Vector.Create(t.X ?? 0, t.Y ?? 0, t.Z ?? 0),
              e,
              7,
              void 0,
              void 0,
              !0,
            )),
            this.mGn === 0 &&
              (this.mGn =
                ModelManager_1.ModelManager.MapModel.CreateMapMark(t)),
            (e = { MarkId: this.mGn, MarkType: 7 }),
            WorldMapController_1.WorldMapController.OpenView(2, !1, e),
            (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackMapMarkId =
              this.mGn),
            (ModelManager_1.ModelManager.FragmentMemoryModel.CurrentTrackFragmentId =
              this.hxn().GetId()))
          : Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("FragmentMemory", 28, "没有找到实体");
      }),
      (this.Zwn = () => {
        let e = this.xqe.GetDisplayGridEndIndex();
        const i = this.ixn.GetCollectDataList();
        let r = e;
        const s = i.length;
        for (let t = e; t <= s - 1; t++)
          if (i[t].GetIfCanGetReward()) {
            r = t;
            break;
          }
        this.xqe?.ScrollToGridIndex(r);
        e = r !== this.q8i;
        (this.q8i = r), this.Og(), e && this.hFe();
      }),
      (this.nxn = () => {
        (this.ixn =
          ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
            this.ixn.GetId(),
          )),
          this.Og();
      }),
      (this.$Ge = () => {
        this._wn();
      }),
      (this.sxn = () => {
        (this.ixn =
          ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
            this.ixn.GetId(),
          )),
          this.Og();
      }),
      (this.axn = () => {
        const t = this.hxn();
        FragmentMemoryController_1.FragmentMemoryController.RequestMemoryReward(
          [t.GetId()],
        );
      }),
      (this.lxn = () => {
        PhotographController_1.PhotographController.ScreenShot({
          ScreenShot: !0,
          IsHiddenBattleView: !1,
          HandBookPhotoData: void 0,
          GachaData: void 0,
          FragmentMemory: this.hxn(),
        });
      }),
      (this._xn = () => {
        UiManager_1.UiManager.OpenView("FragmentedCluesView", this.hxn());
      }),
      (this.fvt = () => {
        return new GridItem();
      }),
      (this.uxn = () => new TabItem()),
      (this.i2e = () => {
        this.CloseMe();
      }),
      (this.cxn = () => this.q8i),
      (this.mxn = (t) => {
        const e = t !== this.q8i;
        (this.q8i = t), this.Og(!0), e && this.hFe();
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
        [9, this.axn],
        [13, this.lxn],
        [14, this._xn],
        [15, this.zwn],
        [16, this.Zwn],
        [17, this.dGn],
      ]);
  }
  OnStart() {
    (this.DFe = new GenericLayout_1.GenericLayout(
      this.GetScrollViewWithScrollbar(8)
        .GetContent()
        .GetComponentByClass(UE.UILayoutBase.StaticClass()),
      this.fvt,
    )),
      (this.lqe = new PopupCaptionItem_1.PopupCaptionItem(this.GetItem(0))),
      this.lqe.SetCloseCallBack(this.i2e),
      this.lqe.SetHelpBtnActive(!1),
      (this.xqe = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(3).GetOwner(),
        this.uxn,
      )),
      this.GetButton(15)?.RootUIComp.SetUIActive(!1),
      this.GetButton(16)?.RootUIComp.SetUIActive(!1),
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
    const e = this.OpenParam;
    if (((this.ixn = e.FragmentMemoryTopicData), e.CurrentSelectId > 0)) {
      const i = this.ixn.GetCollectDataList();
      for (let t = 0; t < i.length; t++)
        if (i[t].GetId() === e.CurrentSelectId) {
          this.q8i = t;
          break;
        }
    }
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
      this.sxn,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
        this.nxn,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnFragmentMemoryCollectUpdate,
      this.sxn,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnFragmentMemoryDataUpdate,
        this.nxn,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CloseView,
        this.$Ge,
      );
  }
  hxn() {
    return this.ixn.GetCollectDataList()[this.q8i];
  }
  OnBeforeShow() {
    this.lqe?.SetTitleByTextIdAndArgNew(this.ixn.GetConfig().Title),
      this.Og(),
      this.Nqe(),
      this.Ebn(),
      this.q8i > 0 && this.xqe?.ScrollToGridIndex(this.q8i);
  }
  Ebn() {
    StringUtils_1.StringUtils.IsEmpty(
      ModelManager_1.ModelManager.FragmentMemoryModel
        .MemoryFragmentMainViewTryPlayAnimation,
    ) ||
      (this.EPe?.PlaySequencePurely(
        ModelManager_1.ModelManager.FragmentMemoryModel
          .MemoryFragmentMainViewTryPlayAnimation,
      ),
      (ModelManager_1.ModelManager.FragmentMemoryModel.MemoryFragmentMainViewTryPlayAnimation =
        ""));
  }
  OnAfterShow() {
    this._wn();
  }
  Og(t = !1) {
    this.Mni(t),
      this.GFe(),
      this.mGe(),
      this.Aqe(),
      this.Pqe(),
      this.dxn(),
      this.k5e(),
      this.Cxn(),
      this.kIt(),
      this.CWi(),
      this.gxn(),
      this.HFi(),
      this._wn();
  }
  _wn() {
    this.hxn()?.GetIfUnlock()
      ? UE.LGUIBPLibrary.ResetGlobalBlurUIItem(
          GlobalData_1.GlobalData.GameInstance.GetWorld(),
        )
      : UiBlurLogic_1.UiBlurLogic.SetNormalUiRenderAfterBlur(this);
  }
  Nqe() {
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      "FragmentCollectProgress",
      this.ixn.GetFinishCollectNum(),
      this.ixn.GetMemoryCollectNum(),
    );
  }
  Mni(t = !1) {
    const e = this.ixn.GetCollectDataList();
    const i = [];
    for (const s of e) {
      const r = new TabItemData();
      (r.FragmentCollectData = s),
        (r.TabCallBack = this.mxn),
        (r.GetCurrentSelectTabIndex = this.cxn),
        (r.NeedSwitchAnimation = t),
        i.push(r);
    }
    this.xqe?.RefreshByData(i, !1, () => {
      i.forEach((t) => {
        t.NeedSwitchAnimation = !1;
      });
    });
  }
  GFe() {
    const t = this.hxn();
    const e = [];
    for (const r of t.GetPreviewReward()) {
      const i = new GridItemData();
      (i.Data = r), (i.GetRewardState = t.GetIfGetReward()), e.push(i);
    }
    this.DFe?.RefreshByData(e);
  }
  hFe() {
    this.EPe?.GetCurrentSequence() === "Switch"
      ? this.EPe?.ReplaySequenceByKey("Switch")
      : this.EPe?.PlayLevelSequenceByName("Switch");
  }
  mGe() {
    let t;
    const e = this.hxn();
    void 0 !== e &&
      ((t = this.GetText(5)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetTitle()));
  }
  Pqe() {
    let t;
    const e = this.hxn();
    void 0 !== e &&
      ((t = this.GetText(7))?.SetUIActive(!0),
      e.GetIfUnlock()
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetDesc())
        : LguiUtil_1.LguiUtil.SetLocalTextNew(t, e.GetTipsDesc()));
  }
  Aqe() {
    let t;
    const e = this.hxn();
    void 0 !== e &&
      ((t = this.GetTexture(1)),
      this.SetTextureByPath(e.GetBgResource(), t, "MemoryFragmentMainView"),
      t?.SetChangeColor(!e.GetIfUnlock(), t.changeColor));
  }
  dxn() {
    const t = this.hxn();
    void 0 !== t &&
      this.GetButton(9)?.RootUIComp.SetUIActive(
        !t.GetIfGetReward() && t.GetIfUnlock(),
      );
  }
  k5e() {
    const t = this.hxn();
    void 0 !== t && this.GetItem(10)?.SetUIActive(t.GetIfGetReward());
  }
  Cxn() {
    const e = this.hxn();
    if (void 0 !== e) {
      const i = !e.GetIfGetReward() && !e.GetIfUnlock();
      let t = !1;
      i && e.GetTraceEntityId() > 0 && (t = !0),
        this.GetItem(11)?.SetUIActive(i && !t),
        this.GetButton(17)?.RootUIComp.SetUIActive(i && t);
    }
  }
  kIt() {
    const t = this.hxn();
    void 0 !== t && this.GetItem(12)?.SetUIActive(!t.GetIfUnlock());
  }
  CWi() {
    const t = this.hxn();
    void 0 !== t && this.GetButton(13)?.RootUIComp.SetUIActive(t.GetIfUnlock());
  }
  OnTick(t) {
    const e = this.xqe.GetDisplayGridStartIndex();
    const i = this.xqe.GetDisplayGridEndIndex();
    const r = this.ixn.GetCollectDataList();
    let s = !1;
    for (let t = 0; t < e; t++)
      if (r[t].GetIfCanGetReward()) {
        s = !0;
        break;
      }
    this.rxn !== s &&
      (this.GetButton(15)?.RootUIComp.SetUIActive(s), (this.rxn = s));
    let h = !1;
    const o = r.length;
    for (let t = i; t <= o - 1; t++)
      if (r[t].GetIfCanGetReward() && t !== i) {
        h = !0;
        break;
      }
    this.oxn !== h &&
      (this.GetButton(16)?.RootUIComp.SetUIActive(h), (this.oxn = h));
  }
  HFi() {
    const t = this.hxn();
    void 0 !== t &&
      this.GetButton(14)?.RootUIComp.SetUIActive(
        !t.GetIfUnlock() && t.GetClueId() > 0,
      );
  }
  gxn() {
    const t = this.hxn();
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
      (this.EPe = void 0),
      (this.$Gn = !1),
      (this.fxn = () => {
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
      (this.BtnBindInfo = [[0, this.fxn]]);
  }
  XGn() {
    return (
      void 0 === this.EPe &&
        (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.RootItem,
        )),
      this.EPe
    );
  }
  Refresh(t, e, i) {
    this.Pe = t;
    const r = this.GridIndex === t.GetCurrentSelectTabIndex();
    const s = r ? 1 : 0;
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
      this.pxn(),
      this.h8i(),
      this.vPn(),
      this.$Gn !== r && this.YGn(s),
      (this.$Gn = r);
  }
  YGn(t) {
    let e;
    var t = t === 1 ? "Select" : "Unselect";
    this.Pe?.NeedSwitchAnimation
      ? (e = this.XGn()).GetCurrentSequence() === t
        ? e?.ReplaySequenceByKey(t)
        : e?.PlaySequencePurely(t)
      : ((e = this.XGn())?.StopSequenceByKey("Select", !1, !1),
        e?.PlaySequencePurely(t),
        e.StopSequenceByKey(t, !1, !0));
  }
  vPn() {
    let t;
    this.Pe.FragmentCollectData.GetIfUnlock()
      ? ((t = (this.GridIndex + 1).toString().padStart(2, "0")),
        this.GetText(1)?.SetText(t))
      : this.GetText(1)?.SetText("");
  }
  pxn() {
    const t = this.Pe.FragmentCollectData.GetIfUnlock();
    this.GetItem(5)?.SetUIActive(t);
  }
  h8i() {
    const t = !this.Pe.FragmentCollectData.GetIfUnlock();
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
    let e, i;
    t?.Data &&
      ((i = t.Data[0]),
      (e = t.Data[1]),
      (this.Mne = i.ItemId),
      (i = t.GetRewardState),
      (t = {
        Data: t,
        Type: 4,
        ItemConfigId: this.Mne,
        BottomText: e > 0 ? "" + e : "",
        IsReceivedVisible: i,
      }),
      this.Apply(t));
  }
}
// # sourceMappingURL=MemoryFragmentMainView.js.map
