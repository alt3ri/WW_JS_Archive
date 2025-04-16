"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RogueBattleSettleView = void 0);
const UE = require("ue"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ActivityPermanentRogueController_1 = require("../../PermanentRogue/ActivityPermanentRogueController"),
  RogueBattleSettleChallengeInfoPanel_1 = require("../Component/RogueBattleSettleChallengeInfoPanel"),
  RogueBattleSettleDataInfoPanel_1 = require("../Component/RogueBattleSettleDataInfoPanel");
class RogueBattleSettleView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.ChallengeInfoPanelComponent = void 0),
      (this.DataInfoPanelComponent = void 0),
      (this.PageIndex = 0),
      (this.LevelSequencePlayer = void 0),
      (this.oo1 = () => {
        this.PageIndex--,
          this.RefreshPanel(),
          this.LevelSequencePlayer?.PlayLevelSequenceByName("SwitchL");
      }),
      (this.no1 = () => {
        this.PageIndex++,
          this.RefreshPanel(),
          this.LevelSequencePlayer?.PlayLevelSequenceByName("SwitchR");
      }),
      (this.hJt = () => {
        var e;
        0 === this.PageIndex
          ? this.no1()
          : ControllerHolder_1.ControllerHolder.MapRogueController.CheckInMapRogueInstance()
            ? ((e =
                ModelManager_1.ModelManager.InstanceDungeonEntranceModel
                  .InstanceId),
              ActivityPermanentRogueController_1.ActivityPermanentRogueController.SetReturnToWorld(
                e,
              ),
              ControllerHolder_1.ControllerHolder.InstanceDungeonEntranceController.LeaveInstanceDungeon())
            : this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIButtonComponent],
      [2, UE.UIText],
      [4, UE.UIItem],
      [3, UE.UIButtonComponent],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIText],
      [12, UE.UIItem],
      [13, UE.UISprite],
    ]),
      (this.BtnBindInfo = [
        [0, this.oo1],
        [1, this.no1],
        [7, this.hJt],
        [3, this.hJt],
      ]);
  }
  async OnBeforeStartAsync() {
    (this.ChallengeInfoPanelComponent =
      new RogueBattleSettleChallengeInfoPanel_1.RogueBattleSettleChallengeInfoPanel()),
      (this.ChallengeInfoPanelComponent.ResultView = this.OpenParam),
      (this.DataInfoPanelComponent =
        new RogueBattleSettleDataInfoPanel_1.RogueBattleSettleDataInfoPanel()),
      (this.DataInfoPanelComponent.ResultView = this.OpenParam),
      (this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      )),
      await Promise.all([
        this.ChallengeInfoPanelComponent.CreateThenShowByActorAsync(
          this.GetItem(4).GetOwner(),
        ),
        this.DataInfoPanelComponent.CreateThenShowByActorAsync(
          this.GetItem(5).GetOwner(),
        ),
      ]),
      this.DataInfoPanelComponent.GetRootItem().SetUIActive(!1),
      this.ChallengeInfoPanelComponent.GetRootItem().SetUIActive(!0),
      this.RefreshDetail(),
      this.RefreshPanel();
  }
  RefreshDetail() {
    var t = this.OpenParam;
    if (t) {
      var i = t.Sr1,
        s = t.fUs.length,
        r = t.xh1.length;
      let e = 0;
      for (const n of t.fUs) e += n.Uac.F6n;
      this.GetText(8).SetText(i.toString()),
        this.GetText(9).SetText(s.toString()),
        this.GetText(10).SetText(e.toString()),
        this.GetText(11).SetText(r.toString()),
        this.GetItem(12).SetActive(t.Yxs);
      i = ConfigManager_1.ConfigManager.MapRogueConfig.GetExploreByInstId(
        t.r6n,
      );
      if (i) {
        let e = 0;
        for (var [o, a] of i.RankMap) {
          if (t.SMs < a) {
            e = o - 1;
            break;
          }
          e = o;
        }
        s = ConfigManager_1.ConfigManager.UiResourceConfig?.GetResourcePath(
          "RogueRes_Settle_Rank_" + e,
        );
        this.TrySetSpriteByPath(s, this.GetSprite(13), !1);
      }
    }
  }
  RefreshPanel() {
    this.ChallengeInfoPanelComponent?.GetRootItem().SetUIActive(
      0 === this.PageIndex,
    ),
      this.DataInfoPanelComponent?.GetRootItem().SetUIActive(
        1 === this.PageIndex,
      ),
      this.GetButton(0).RootUIComp.SetUIActive(0 < this.PageIndex),
      this.GetButton(1).RootUIComp.SetUIActive(this.PageIndex < 1);
  }
}
exports.RogueBattleSettleView = RogueBattleSettleView;
//# sourceMappingURL=RogueBattleSettleView.js.map
