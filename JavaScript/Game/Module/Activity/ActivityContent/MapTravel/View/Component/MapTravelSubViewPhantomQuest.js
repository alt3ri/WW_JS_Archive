"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelSubViewQuest = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  GenericScrollViewNew_1 = require("../../../../../Util/ScrollView/GenericScrollViewNew");
class MapTravelSubViewQuest extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.ActivityBaseData = e),
      (this.LevelSequencePlayer = void 0),
      (this.AreaLayoutList = void 0),
      (this.NeedDestroySelf = !0),
      (this.sGe = () => {
        return new AreaLayout(this.ActivityBaseData);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIScrollViewWithScrollbarComponent],
      [1, UE.UIItem],
    ];
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      (this.AreaLayoutList = new GenericScrollViewNew_1.GenericScrollViewNew(
        this.GetScrollViewWithScrollbar(0),
        this.sGe,
      ));
  }
  async Refresh() {
    var t = this.ActivityBaseData.GetAllAreaData().filter(
      (e) => 0 < e.PhantomTaskIdSet.size,
    );
    let [i, r] = [-1, -1];
    for (let e = 0; e < t.length; e++)
      for (const s of Array.from(t[e].PhantomTaskIdSet)) {
        if (this.ActivityBaseData.GetPhantomQuestDoneCheckState(s)) {
          i = e;
          break;
        }
        -1 === r &&
          this.ActivityBaseData.GetPhantomQuestNewUnlockState(s) &&
          (r = e);
      }
    await this.AreaLayoutList.RefreshByDataAsync(t);
    var e = Math.max(0 <= i ? i : r, 0),
      e = this.AreaLayoutList.GetItemByIndex(e);
    e && this.AreaLayoutList.LateScrollTo(e);
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
    );
  }
}
exports.MapTravelSubViewQuest = MapTravelSubViewQuest;
class AreaLayout extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super(),
      (this.ActivityBaseData = e),
      (this.QuestLayout = void 0),
      (this.sGe = () => {
        return new QuestCardItem(this.ActivityBaseData);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIMultiTemplateLayout],
      [2, UE.UIItem],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    this.QuestLayout = new GenericLayout_1.GenericLayout(
      this.GetMultiTemplateLayout(1),
      this.sGe,
    );
  }
  GetTitleItem() {
    return this.GetText(0);
  }
  Refresh(e) {
    var t = ConfigManager_1.ConfigManager.AreaConfig.GetAreaInfo(e.AreaId);
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(0), t.Title);
    let [i, r] = [0, 0];
    t = Array.from(e.PhantomTaskIdSet).sort(
      this.ActivityBaseData.SortPhantomQuestItem,
    );
    for (const o of t) {
      var s =
          ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
            o,
          ),
        a = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(s.QuestId),
        s =
          ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
            s.QuestReward,
          )[0][1];
      3 === a && (i += s), (r += s);
    }
    this.QuestLayout.RefreshByData(t, void 0, !0),
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "TravelPhantomQuest_Progress",
        i,
        r,
      );
  }
}
class QuestCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super(),
      (this.ActivityBaseData = e),
      (this.PhantomTaskId = 0),
      (this.LevelSequencePlayer = void 0),
      (this.UFe = () => {
        var e = 0 < this.mVl(),
          t =
            ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
              this.PhantomTaskId,
            );
        e
          ? (this.ActivityBaseData.SaveFirstCheckRedDotState(
              2,
              this.PhantomTaskId,
            ),
            this.CVl(),
            ModelManager_1.ModelManager.MapModel.CreateTempMapMark(t.MapMarkId),
            (e = { MarkId: t.MapMarkId, MarkType: 30 }),
            ControllerHolder_1.ControllerHolder.WorldMapController.OpenView(
              1,
              !1,
              e,
            ))
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              t.UnlockTips,
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UITexture],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.UFe]]);
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  Refresh(e) {
    this.PhantomTaskId = e;
    var e =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(e),
      t = this.mVl(),
      i = 0 < t,
      t = 3 === t;
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(4),
      i ? e.Name : e.LockName,
    ),
      this.GetTexture(1).SetUIActive(i),
      i && this.SetTextureShowUntilLoaded(e.Texture, this.GetTexture(1)),
      this.GetItem(2).SetUIActive(t),
      this.CVl(),
      this.vjl();
  }
  CVl() {
    this.GetItem(3).SetUIActive(
      this.ActivityBaseData.GetPhantomQuestNewState(this.PhantomTaskId),
    );
  }
  vjl() {
    let e = !1;
    this.ActivityBaseData.GetPhantomQuestNewUnlockState(this.PhantomTaskId) &&
      (this.ActivityBaseData.SaveFirstCheckRedDotState(6, this.PhantomTaskId),
      this.LevelSequencePlayer.PlayLevelSequenceByName("Unlock"),
      (e = !0)),
      this.ActivityBaseData.GetPhantomQuestDoneCheckState(this.PhantomTaskId) &&
        (this.ActivityBaseData.SaveFirstCheckRedDotState(3, this.PhantomTaskId),
        e || this.LevelSequencePlayer.PlayLevelSequenceByName("Complete"));
  }
  mVl() {
    var e =
      ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
        this.PhantomTaskId,
      );
    return ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e.QuestId);
  }
}
//# sourceMappingURL=MapTravelSubViewPhantomQuest.js.map
