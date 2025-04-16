"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelSubViewSoarChallenge = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  EventDefine_1 = require("../../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  SkipTaskManager_1 = require("../../../../../SkipInterface/SkipTaskManager"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  DynScrollView_1 = require("../../../../../Util/ScrollView/DynScrollView"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew"),
  ActivityMapTravelController_1 = require("../../ActivityMapTravelController"),
  MapTravelTabDynamicItem_1 = require("./MapTravelTabDynamicItem"),
  MapTravelTaskItem_1 = require("./MapTravelTaskItem"),
  SoarChallengeTabDynamicScrollItem_1 = require("./SoarChallengeTabDynamicScrollItem");
class MapTravelSubViewSoarChallenge extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.ActivityBaseData = e),
      (this.LayoutList = void 0),
      (this.TabLayout = void 0),
      (this.LevelSequencePlayer = void 0),
      (this.fVl = -1),
      (this.Hwn = (e, i, t) => {
        var s =
          new SoarChallengeTabDynamicScrollItem_1.SoarChallengeTabDynamicScrollItem();
        return (
          s.BindSelectedCallBack(this.pVl), s.BindIsSelectedOn(this.vIl), s
        );
      }),
      (this.sGe = () => {
        return new SoarChallengeItem(this.ActivityBaseData);
      }),
      (this.vVl = () => {
        var e = this.ActivityBaseData.GetAllSoarTabData()[this.fVl];
        this.TabLayout.GetScrollItemFromIndex(this.fVl).Update(e, this.fVl),
          this.Dke(e);
      }),
      (this.pVl = (e) => {
        0 <= this.fVl && e.TabIndex !== this.fVl && this.XN(this.fVl, !1, !1),
          (this.fVl = e.TabIndex),
          e.IsUnlock &&
            !this.ActivityBaseData.SaveFirstCheckRedDotState(7, e.PlayId) &&
            this.TabLayout.GetScrollItemFromIndex(this.fVl)?.SetItemNewVisible(
              !1,
            ),
          this.Dke(e);
      }),
      (this.vIl = (e) => this.fVl === e.TabIndex),
      (this.yVl = () => {
        var e = this.ActivityBaseData.GetAllSoarTabData()[this.fVl];
        SkipTaskManager_1.SkipTaskManager.RunByConfigId(e.JumpId);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIDynScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[6, this.yVl]]);
  }
  async OnBeforeStartAsync() {
    var e = [];
    (this.LayoutList = new GenericScrollViewNew_1.GenericScrollViewNew(
      this.GetScrollViewWithScrollbar(2),
      this.sGe,
    )),
      (this.TabLayout = new DynScrollView_1.DynamicScrollView(
        this.GetUIDynScrollViewComponent(0),
        this.GetItem(1),
        new MapTravelTabDynamicItem_1.SoarTabDynamicItem(),
        this.Hwn,
      )),
      e.push(this.TabLayout.Init()),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      await Promise.all(e);
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.MapTravelSoarRefresh,
      this.vVl,
    );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.MapTravelSoarRefresh,
      this.vVl,
    );
  }
  async Refresh() {
    var i = this.ActivityBaseData.GetAllSoarTabData();
    this.TabLayout.RefreshByData(i), await this.TabLayout.WaitForInit();
    let t = 0;
    for (let e = 0; e < i.length; e++)
      if (i[e].IsNew) {
        t = e;
        break;
      }
    this.XN(t, !0, !0);
  }
  XN(e, i, t) {
    this.TabLayout.GetScrollItemFromIndex(e).SetSelected(i, t);
  }
  Dke(e) {
    var i = e.IsUnlock,
      t = i ? this.ActivityBaseData.GetSoarItemDataList(e.RewardIds) : [];
    this.LayoutList.RefreshByData(t, void 0, !0),
      this.GetItem(4).SetUIActive(!i),
      i ||
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(5),
          this.ActivityBaseData.GetSoarPlayLockTips(e.PlayId),
        ),
      this.GetButton(6).RootUIComp.SetUIActive(i);
  }
  async PlayStartSequence() {
    await this.Refresh(),
      await this.LevelSequencePlayer.PlaySequenceAsync(
        "Start",
        new CustomPromise_1.CustomPromise(),
        !0,
      );
  }
  async PlayCloseSequence() {
    await this.LevelSequencePlayer.PlaySequenceAsync(
      "Close",
      new CustomPromise_1.CustomPromise(),
      !0,
    ),
      this.XN(this.fVl, !1, !1),
      (this.fVl = -1);
  }
}
exports.MapTravelSubViewSoarChallenge = MapTravelSubViewSoarChallenge;
class SoarChallengeItem extends MapTravelTaskItem_1.TaskItemBase {
  constructor() {
    super(...arguments),
      (this.TaskData = void 0),
      (this.OnClickedRewardButton = () => {
        ActivityMapTravelController_1.ActivityMapTravelController.RequestTakeSoarChallengeReward(
          this.TaskData.Id,
        );
      });
  }
  Refresh(e) {
    this.TaskData = e;
    var i =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetSoarChallengeConfig(
          this.TaskData.Id,
        ),
      t = 2 === e.Status;
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), i.ScoreText),
      this.GetText(1).SetText(e.Current + "/" + e.Target),
      this.SVl(i.Reward),
      this.RewardButtonItem.SetUiActive(0 === e.Status),
      this.GetItem(6).SetUIActive(1 === e.Status),
      this.GetItem(5).SetUIActive(t);
  }
  SVl(e) {
    var i = [];
    for (const s of ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
      e,
    )) {
      var t = { Item: s, HasClaimed: 2 === this.TaskData.Status };
      i.push(t);
    }
    this.RewardScrollView.RefreshByData(i);
  }
}
//# sourceMappingURL=MapTravelSubViewSoarChallenge.js.map
