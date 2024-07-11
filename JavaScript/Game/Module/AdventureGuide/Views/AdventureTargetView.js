"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdventureTargetView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTabViewBase_1 = require("../../../Ui/Base/UiTabViewBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../Util/ScrollView/GenericScrollViewNew"),
  AdventureGuideController_1 = require("../AdventureGuideController"),
  AdventureTargetItem_1 = require("./AdventureTargetItem"),
  AdventureTargetRewardItem_1 = require("./AdventureTargetRewardItem"),
  REWARD_RECEIVED = "ChapterRewardGet",
  NOT_FINISH_TIP = "NotFinishedTip",
  GET_REWARD = "GetReward",
  FRONT_ADD_FRAME = 0.01;
class AdventureTargetView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.H3e = void 0),
      (this.n6e = 0),
      (this.s6e = void 0),
      (this.a6e = void 0),
      (this.h6e = void 0),
      (this.l6e = 0),
      (this._6e = !1),
      (this.SPe = void 0),
      (this.YVe = () => {
        var e = new AdventureTargetRewardItem_1.AdventureTargetRewardItem();
        return (
          e.BindOnExtendToggleClicked(this.u6e),
          e.BindOnCanExecuteChange(this.c6e),
          e
        );
      }),
      (this.u6e = (e) => {
        ControllerHolder_1.ControllerHolder.ItemController.OpenItemTipsByItemId(
          e.Data[0].ItemId,
        );
      }),
      (this.c6e = () => !1),
      (this.m6e = () => {
        return new AdventureTargetItem_1.AdventureTargetItem();
      }),
      (this.d6e = () => {
        var e;
        1 < this.n6e &&
          (this.h6e?.SetFillAmount(0),
          (e = this.n6e - 1),
          this.SetAdventureTargetInfoByChapter(
            e,
            e <=
              ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
          )),
          this.SPe?.StopCurrentSequence(!1, !0),
          this.SPe?.PlayLevelSequenceByName("Switch");
      }),
      (this.C6e = () => {
        var e;
        this.n6e <
          ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter() &&
          (this.h6e?.SetFillAmount(0),
          (e = this.n6e + 1),
          this.SetAdventureTargetInfoByChapter(
            e,
            e <=
              ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
          )),
          this.SPe?.StopCurrentSequence(!1, !0),
          this.SPe?.PlayLevelSequenceByName("Switch");
      }),
      (this.g6e = () => {
        var e =
          ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(
            this.n6e,
          );
        e.Received === e.Total
          ? (ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForChapterReward(
              this.n6e,
            ),
            this.s6e.SetSelfInteractive(!1))
          : ((e =
              ConfigManager_1.ConfigManager.TextConfig.GetTextById(
                NOT_FINISH_TIP,
              )),
            ScrollingTipsController_1.ScrollingTipsController.ShowTipsByText(
              e,
            ));
      }),
      (this.f6e = (e) => {
        this.n6e === e &&
          (this.SetAdventureTargetInfoByChapter(e, !1),
          this.GetItem(9).SetUIActive(!1),
          this.C6e());
      }),
      (this.p6e = (e) => {
        ModelManager_1.ModelManager.AdventureGuideModel.IsTaskOfChapter(
          e,
          this.n6e,
        ) &&
          ((this._6e = !0),
          (e = ModelManager_1.ModelManager.AdventureGuideModel.GetChapterTasks(
            this.n6e,
          )),
          this.SetAdventureTargetInfoByChapter(this.n6e, !1),
          (e = ModelManager_1.ModelManager.AdventureGuideModel.SortChapterTasks(
            this.n6e,
          )),
          this.a6e?.RefreshByData(e));
      }),
      (this.v6e = () => {
        this._6e = !1;
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UIItem],
      [3, UE.UIButtonComponent],
      [4, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UILayoutBase],
      [8, UE.UISprite],
      [9, UE.UIItem],
      [10, UE.UIText],
      [11, UE.UIItem],
      [12, UE.UIScrollViewWithScrollbarComponent],
      [13, UE.UIItem],
      [14, UE.UIItem],
      [15, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.g6e],
        [3, this.d6e],
        [4, this.C6e],
      ]);
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.AdventureTaskStateChange,
      this.p6e,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ChapterRewardReceived,
        this.f6e,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCloseRewardView,
        this.v6e,
      );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.AdventureTaskStateChange,
      this.p6e,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ChapterRewardReceived,
        this.f6e,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCloseRewardView,
        this.v6e,
      );
  }
  OnTickUiTabViewBase(e) {
    var t;
    this._6e ||
      ((t = this.h6e.fillAmount) < this.l6e &&
        this.h6e.SetFillAmount(t + FRONT_ADD_FRAME));
  }
  OnStart() {
    (this.h6e = this.GetSprite(8)),
      this.h6e.SetFillAmount(0),
      this.GetItem(14).SetUIActive(!0),
      (this.s6e = this.GetButton(0)),
      this.GetItem(5).SetUIActive(!1),
      this.GetItem(2).SetUIActive(!1),
      (this.H3e = new GenericLayout_1.GenericLayout(
        this.GetLayoutBase(7),
        this.YVe,
      )),
      (this.a6e = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(12),
        this.m6e,
      )),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {
    (this.H3e = void 0),
      (this.a6e = void 0),
      this.SPe?.Clear(),
      (this.SPe = void 0);
  }
  M6e(e) {
    var t = this.GetButton(3),
      i = this.GetButton(4);
    t?.SetSelfInteractive(!0),
      i?.SetSelfInteractive(!0),
      1 === e && t?.SetSelfInteractive(!1),
      e ===
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter() &&
        i?.SetSelfInteractive(!1);
  }
  OnBeforeShow() {
    let e = ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter();
    var t = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetMaxChapter();
    e > t && (e = t),
      this.SetAdventureTargetInfoByChapter(e),
      this.SPe?.StopCurrentSequence(),
      this.SPe?.PlayLevelSequenceByName("Start"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.AdventureHelpBtn,
        0,
      );
  }
  SetAdventureTargetInfoByChapter(e, t = !0) {
    (this.n6e = e),
      this.SetChapterInfo(e),
      t &&
        ((t =
          ModelManager_1.ModelManager.AdventureGuideModel.SortChapterTasks(e)),
        this.E6e(t)),
      this.M6e(e),
      this.S6e(e);
  }
  SetChapterInfo(e) {
    var t =
        ConfigManager_1.ConfigManager.AdventureModuleConfig.GetChapterAdventureConfig(
          e,
        ),
      i = ConfigManager_1.ConfigManager.AdventureModuleConfig.GetDropShowInfo(
        t.DropIds,
      ),
      r = new Array(),
      t = ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter(),
      s = ModelManager_1.ModelManager.AdventureGuideModel.GetNowChapter(),
      n = this.GetItem(11),
      h = this.GetScrollViewWithScrollbar(12).GetRootComponent(),
      a = this.GetItem(13),
      o = this.GetText(10);
    for (const l of i.keys()) {
      var _ = [{ IncId: 0, ItemId: l }, i.get(l)];
      r.push(_);
    }
    this.H3e.RefreshByData(r),
      this.s6e?.RootUIComp.SetUIActive(e === s),
      e <= s
        ? (e <= t
            ? (this.s6e.SetSelfInteractive(!1),
              LguiUtil_1.LguiUtil.SetLocalText(o, REWARD_RECEIVED))
            : (this.s6e.SetSelfInteractive(!0),
              (s =
                ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(
                  e,
                )).Total === s.Received
                ? (LguiUtil_1.LguiUtil.SetLocalText(o, GET_REWARD),
                  this.s6e.SetSelfInteractive(!0))
                : (LguiUtil_1.LguiUtil.SetLocalText(
                    o,
                    AdventureGuideController_1.DOING,
                  ),
                  this.s6e.SetSelfInteractive(!1))),
          n.SetUIActive(!0),
          h.SetUIActive(!0),
          a.SetUIActive(!1))
        : (h.SetUIActive(!1), a.SetUIActive(!0));
  }
  E6e(e) {
    this.a6e?.RefreshByData(e);
  }
  S6e(e) {
    var t =
      ModelManager_1.ModelManager.AdventureGuideModel.GetChapterProgress(e);
    this.GetText(6).SetText(t.Received + "/" + t.Total),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(15),
        "Adventure_Taget_State_Number",
        e,
      ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(1),
        "Adventure_Taget_State",
      ),
      (this.l6e = t.Received / t.Total),
      this.GetItem(9).SetUIActive(
        t.Total === t.Received &&
          e >
            ModelManager_1.ModelManager.AdventureGuideModel.GetReceivedChapter(),
      );
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    var t = Number(e[0]),
      t = this.H3e.GetGridByDisplayIndex(t);
    if (t) return [t, t];
    Log_1.Log.CheckError() &&
      Log_1.Log.Error("Guide", 54, "聚焦引导extraParam项配置有误", [
        "configParams",
        e,
      ]);
  }
}
exports.AdventureTargetView = AdventureTargetView;
//# sourceMappingURL=AdventureTargetView.js.map
