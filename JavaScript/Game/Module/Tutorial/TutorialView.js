"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TutorialView = void 0);
const UE = require("ue"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  CommonSearchComponent_1 = require("../Common/InputView/CommonSearchComponent"),
  CommonTabComponentData_1 = require("../Common/TabComponent/CommonTabComponentData"),
  CommonTabData_1 = require("../Common/TabComponent/CommonTabData"),
  CommonTabTitleData_1 = require("../Common/TabComponent/CommonTabTitleData"),
  TabComponentWithCaptionItem_1 = require("../Common/TabComponent/TabComponentWithCaptionItem"),
  CommonTabItem_1 = require("../Common/TabComponent/TabItem/CommonTabItem"),
  GenericLayoutNew_1 = require("../Util/Layout/GenericLayoutNew"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  DynScrollView_1 = require("../Util/ScrollView/DynScrollView"),
  TutorialDataItem_1 = require("./SubView/TutorialDataItem"),
  TutorialDynItem_1 = require("./SubView/TutorialDynItem"),
  TutorialPageItem_1 = require("./SubView/TutorialPageItem"),
  TutorialController_1 = require("./TutorialController"),
  TutorialDefine_1 = require("./TutorialDefine");
class TutorialView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Ivt = void 0),
      (this.JPt = void 0),
      (this.tPe = void 0),
      (this.dqe = void 0),
      (this.GRo = void 0),
      (this.NRo = void 0),
      (this.s8e = []),
      (this.ORo = 0),
      (this.fGt = void 0),
      (this.kRo = void 0),
      (this.Mbe = (t) => {
        var t = ModelManager_1.ModelManager.TutorialModel.MakeSearchList(
            t,
            this.GRo,
          ),
          i = t.ItemData;
        this.GetItem(5).SetUIActive(!i.length),
          i.length || this.FRo(),
          t.HasTutorial ||
            this.GRo === TutorialDefine_1.ETutorialType.All ||
            this.FRo(),
          this.JPt.RefreshByData(i);
      }),
      (this.Tqe = () => {
        this.VRo(this.GRo), this.GetItem(4).SetUIActive(!0);
      }),
      (this.hPe = (t, i, e) => {
        var s = void 0;
        return (
          (s = new TutorialPageItem_1.TutorialPageItem(i)).Init(),
          s.UpdateShow(!1),
          { Key: e, Value: s }
        );
      }),
      (this.R6e = (t, i) => {
        return new CommonTabItem_1.CommonTabItem();
      }),
      (this.VRo = (t) => {
        (t = this.s8e[t]),
          (this.GRo = t),
          this.dqe.ResetSearch(!0),
          (t =
            ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(
              t,
            ));
        this.JPt.RefreshByData(t),
          t.length
            ? TimerSystem_1.TimerSystem.Next(() => {
                this.JPt?.GetScrollItemFromIndex(0).OnSelected(!0);
              })
            : this.FRo(),
          this.GetItem(5).SetUIActive(!t.length),
          this.dqe.SetActive(!!t.length),
          this.UiViewSequence.PlaySequence("Switch"),
          this.GetUIDynScrollViewComponent(2).RootUIComp.SetUIActive(
            !!t.length,
          );
      }),
      (this.yqe = (t) => {
        var i = this.s8e[t],
          i = TutorialDefine_1.TutorialUtils.GetTutorialTypeIconPath(i),
          t = TutorialDefine_1.TutorialUtils.GetTutorialTypeTxt(this.s8e[t]);
        return new CommonTabData_1.CommonTabData(
          i,
          new CommonTabTitleData_1.CommonTabTitleData(t),
        );
      }),
      (this.HRo = (t, i, e) => {
        var s = new TutorialDataItem_1.TutorialDataItem();
        return s.InitData(t), s.SetOnToggleSelected(this.jRo), s;
      }),
      (this.HUn = () => {
        var t,
          i,
          e =
            ModelManager_1.ModelManager.TutorialModel.GetUnlockedTutorialDataByType(
              this.GRo,
            );
        for ([t, i] of e.entries()) i.Selected = 0 === t;
        this.JPt.RefreshByData(e);
      }),
      (this.WRo = () => {
        for (const t of this.JPt.GetScrollItemItems()) t.RefreshRed();
      }),
      (this.jRo = (t, i) => {
        this.NRo !== i && (this.NRo?.SetToggleState(0, !1), (this.NRo = i)),
          this.GetItem(5).SetUIActive(!1),
          this.FTt(t);
      }),
      (this.KRo = () => {
        0 < this.ORo &&
          (this.UiViewSequence.PlaySequence("SwitchLeft"),
          this.QRo(this.ORo - 1));
      }),
      (this.XRo = () => {
        this.ORo < this.kRo.length - 1 &&
          (this.UiViewSequence.PlaySequence("SwitchRight"),
          this.QRo(this.ORo + 1));
      }),
      (this.lPe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIDynScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UITexture],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIHorizontalLayout],
      [13, UE.UIItem],
      [14, UE.UIButtonComponent],
      [15, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [
        [14, this.KRo],
        [15, this.XRo],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RedDotNewTutorial,
      this.WRo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnTutorialUpdate,
        this.HUn,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RedDotNewTutorial,
      this.WRo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnTutorialUpdate,
        this.HUn,
      );
  }
  async OnBeforeStartAsync() {
    (this.JPt = new DynScrollView_1.DynamicScrollView(
      this.GetUIDynScrollViewComponent(2),
      this.GetItem(3),
      new TutorialDynItem_1.TutorialDynItem(),
      this.HRo,
    )),
      await this.JPt.Init();
  }
  OnStart() {
    this.GetItem(3).SetUIActive(!1);
    for (const e in TutorialDefine_1.ETutorialType) {
      var t = Number(e);
      isNaN(t) || this.s8e.push(t);
    }
    this.dqe = new CommonSearchComponent_1.CommonSearchComponent(
      this.GetItem(1),
      this.Mbe,
      this.Tqe,
    );
    var i = new CommonTabComponentData_1.CommonTabComponentData(
      this.R6e,
      this.VRo,
      this.yqe,
    );
    (this.Ivt = new TabComponentWithCaptionItem_1.TabComponentWithCaptionItem(
      this.GetItem(0),
      i,
      this.lPe,
    )),
      (this.tPe = new GenericLayoutNew_1.GenericLayoutNew(
        this.GetHorizontalLayout(12),
        this.hPe,
        this.GetItem(13),
      )),
      this.FRo();
  }
  FRo() {
    this.GetItem(4).SetUIActive(!1), (this.fGt = void 0);
  }
  OnBeforeShow() {
    var i = this.s8e.length,
      e = this.Ivt.CreateTabItemDataByLength(i);
    for (let t = 0; t < i; t++) {
      var s = this.s8e[t];
      s === TutorialDefine_1.ETutorialType.All &&
        ((e[t].RedDotName = "TutorialTypeNew"), (e[t].RedDotUid = s));
    }
    this.Ivt.RefreshTabItem(e, () => {
      this.Ivt.SelectToggleByIndex(0);
    });
  }
  OnAfterHide() {
    this.JPt.ClearChildren(), this.FRo(), (this.NRo = void 0);
  }
  OnBeforeDestroy() {
    this.Ivt && (this.Ivt.Destroy(), (this.Ivt = void 0)),
      this.tPe && (this.tPe.ClearChildren(), (this.tPe = void 0)),
      this.dqe?.Destroy(),
      this.JPt?.ClearChildren(),
      (this.JPt = void 0),
      (this.s8e = []),
      TutorialController_1.TutorialController.TryOpenAwardUiViewPending();
  }
  FTt(t) {
    this.GetItem(4).SetUIActive(!0),
      this.fGt !== t && this.UiViewSequence.PlaySequence("SwitchPage"),
      this.fGt && (this.fGt.Selected = !1),
      (this.fGt = t),
      (this.fGt.Selected = !0),
      (this.ORo = 0),
      this.fGt.SavedData.HasRedDot &&
        TutorialController_1.TutorialController.RemoveRedDotTutorialId(
          this.fGt.SavedData.TutorialId,
        );
    t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPageIds(
      this.fGt.SavedData.TutorialId,
    );
    (this.kRo = t).length <= 1
      ? (this.GetButton(14).RootUIComp.SetUIActive(!1),
        this.GetButton(15).RootUIComp.SetUIActive(!1),
        this.GetItem(11).SetUIActive(!1))
      : (this.GetButton(14).RootUIComp.SetUIActive(!0),
        this.GetButton(15).RootUIComp.SetUIActive(!0),
        this.GetItem(11).SetUIActive(!0),
        this.tPe.RebuildLayoutByDataNew(this.kRo)),
      this.QRo(this.ORo);
  }
  QRo(t) {
    1 < this.kRo.length &&
      (this.tPe.GetLayoutItemByIndex(this.ORo).UpdateShow(!1),
      this.tPe.GetLayoutItemByIndex(t).UpdateShow(!0)),
      (this.ORo = t);
    var i,
      t = ConfigManager_1.ConfigManager.GuideConfig.GetGuideTutorialPage(
        this.kRo[t],
      );
    t.Pic && ((i = this.GetTexture(6)), this.SetTextureByPath(t.Pic, i)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(7), t.Title),
      StringUtils_1.StringUtils.IsEmpty(t.SubTitle)
        ? this.GetItem(8).SetUIActive(!1)
        : (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(9), t.SubTitle),
          this.GetItem(8).SetUIActive(!0)),
      1 < this.kRo.length &&
        (this.GetButton(14).SetSelfInteractive(0 < this.ORo),
        this.GetButton(15).SetSelfInteractive(this.ORo < this.kRo.length - 1));
    let e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t.Content);
    (e = e.split("/n").join("")), this.GetText(10).SetText(e);
  }
}
exports.TutorialView = TutorialView;
//# sourceMappingURL=TutorialView.js.map
