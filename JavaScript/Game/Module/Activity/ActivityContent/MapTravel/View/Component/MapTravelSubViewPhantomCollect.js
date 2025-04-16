"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapTravelSubViewPhantomCollect = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../../Core/Common/CustomPromise"),
  Protocol_1 = require("../../../../../../../Core/Define/Net/Protocol"),
  ConfigManager_1 = require("../../../../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../../../../Util/Grid/GridProxyAbstract"),
  LguiUtil_1 = require("../../../../../Util/LguiUtil"),
  LoopScrollView_1 = require("../../../../../Util/ScrollView/LoopScrollView");
class MapTravelSubViewPhantomCollect extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.ActivityBaseData = e),
      (this.LevelSequencePlayer = void 0),
      (this.AreaLayoutList = void 0),
      (this.NeedDestroySelf = !0),
      (this.oWi = () => {
        return new PhantomCardItem(this.ActivityBaseData);
      }),
      (this.uVl = (e, t) => {
        var r =
            ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetPhantomConfig(
              e,
            ),
          i =
            ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetPhantomConfig(
              t,
            );
        return r.Sort === i.Sort ? e - t : r.Sort - i.Sort;
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UILoopScrollViewComponent],
      [1, UE.UIItem],
      [2, UE.UIText],
      [3, UE.UIText],
    ];
  }
  OnStart() {
    (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    )),
      (this.AreaLayoutList = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(0),
        this.GetItem(1).GetOwner(),
        this.oWi,
      ));
  }
  async Refresh() {
    var e,
      t,
      r = this.ActivityBaseData.PhantomDataMap,
      i = new Array();
    let [o, s] = [0, 0],
      a = -1;
    for ([e, t] of r.entries()) {
      i.push(e);
      var n =
          ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetPhantomConfig(
            e,
          ),
        n =
          ConfigManager_1.ConfigManager.RewardConfig.GetDropPackagePreviewItemList(
            n.UnLockReward,
          )[0][1];
      t &&
        (-1 === a &&
          this.ActivityBaseData.GetPhantomNewUnlockState(e) &&
          (a = e),
        (o += n)),
        (s += n);
    }
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(3),
      "PhantomGain_Progress",
      o,
      s,
    ),
      await this.AreaLayoutList.RefreshByDataAsync(
        i.sort(this.uVl),
        void 0,
        !0,
      ),
      this.AreaLayoutList.ScrollToGridIndex(Math.max(i.indexOf(a), 0), !0);
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
exports.MapTravelSubViewPhantomCollect = MapTravelSubViewPhantomCollect;
class PhantomCardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor(e) {
    super(),
      (this.ActivityBaseData = e),
      (this.PhantomId = 0),
      (this.SPe = void 0),
      (this.UFe = () => {
        var e =
          ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetPhantomConfig(
            this.PhantomId,
          );
        ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance()
          ? ControllerHolder_1.ControllerHolder.GenericPromptController.ShowPromptByCode(
              "DungeonDetection",
            )
          : (ModelManager_1.ModelManager.AdventureGuideModel.SetFromManualDetect(
              !0,
            ),
            ControllerHolder_1.ControllerHolder.AdventureGuideController.RequestForDetection(
              Protocol_1.Aki.Protocol.r8n.Proto_NormalMonster,
              [],
              e.MonsterInfoId,
            ));
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UITexture],
      [5, UE.UIText],
      [6, UE.UITexture],
      [7, UE.UIItem],
      [8, UE.UIItem],
      [4, UE.UITexture],
      [10, UE.UITexture],
      [9, UE.UITexture],
      [11, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[0, this.UFe]]);
  }
  OnStart() {
    (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.GetItem(8).SetUIActive(!1);
  }
  Refresh(e) {
    this.PhantomId = e;
    var t =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetPhantomConfig(
          this.PhantomId,
        ),
      r = ConfigManager_1.ConfigManager.MonsterInfoConfig.GetMonsterInfoConfig(
        t.MonsterInfoId,
      ),
      e = this.ActivityBaseData.PhantomDataMap.get(e);
    this.GetItem(1).SetUIActive(!e),
      this.GetItem(2).SetUIActive(e),
      this.GetItem(7).SetUIActive(e),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(5), t.Name),
      this.SetTextureShowUntilLoaded(t.TexPhantom, this.GetTexture(6)),
      this.Aqe(r.RarityId),
      e && this.dVl();
  }
  Aqe(e) {
    var t,
      r,
      i = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
        "T_TravelMapAct_PhantomRarity" + e,
      );
    this.SetTextureShowUntilLoaded(i, this.GetTexture(3), () => {
      this.GetTexture(3).SetSizeFromTexture();
    });
    for ([t, r] of [
      [4, 1],
      [10, 2],
      [9, 3],
      [11, 4],
    ])
      this.GetTexture(t).SetUIActive(e === r);
  }
  dVl() {
    this.ActivityBaseData.SaveFirstCheckRedDotState(4, this.PhantomId) ||
      this.SPe.PlayLevelSequenceByName("Unlock");
  }
}
//# sourceMappingURL=MapTravelSubViewPhantomCollect.js.map
