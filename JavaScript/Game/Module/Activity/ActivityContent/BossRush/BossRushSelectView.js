"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BossRushSelectView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  RedDotController_1 = require("../../../../RedDot/RedDotController"),
  UiTabViewBase_1 = require("../../../../Ui/Base/UiTabViewBase"),
  UiManager_1 = require("../../../../Ui/UiManager"),
  LevelSequencePlayer_1 = require("../../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../../ScrollingTips/ScrollingTipsController"),
  GridProxyAbstract_1 = require("../../../Util/Grid/GridProxyAbstract"),
  LoopScrollView_1 = require("../../../Util/ScrollView/LoopScrollView");
class BossRushSelectView extends UiTabViewBase_1.UiTabViewBase {
  constructor() {
    super(...arguments),
      (this.pyn = void 0),
      (this.vVt = void 0),
      (this.SPe = void 0),
      (this.I2i = () => {
        return new BossRushMainViewScrollItem();
      }),
      (this.lRo = () => {
        UiManager_1.UiManager.OpenView(
          "ActivityRewardPopUpView",
          this.pyn.GetRewardPopUpViewData(),
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIText],
      [2, UE.UILoopScrollViewComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.lRo]]);
  }
  OnStart() {
    var e = ModelManager_1.ModelManager.ActivityModel.GetActivityById(
      ModelManager_1.ModelManager.BossRushModel.CurrentSelectActivityId,
    );
    (this.pyn = e),
      (this.vVt = new LoopScrollView_1.LoopScrollView(
        this.GetLoopScrollViewComponent(2),
        this.GetItem(3).GetOwner(),
        this.I2i,
      )),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  K8e() {
    var e = this.GetItem(4);
    RedDotController_1.RedDotController.BindRedDot(
      "BossRushReward",
      e,
      void 0,
      this.pyn?.Id,
    );
  }
  Ovt() {
    var e = this.GetItem(4);
    RedDotController_1.RedDotController.UnBindGivenUi("BossRushReward", e);
  }
  Esi() {
    this.vVt && this.vVt.RefreshByData(this.pyn.GetBossRushLevelDetailInfo());
  }
  OnBeforeShow() {
    this.SOn(), this.Esi(), this.hDn(), this.K8e();
  }
  SOn() {
    let e = "Start";
    ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation &&
      (e = "ShowView"),
      this.SPe?.PlaySequencePurely(e),
      (ModelManager_1.ModelManager.BossRushModel.PlayBackAnimation = !1);
  }
  OnBeforeHide() {
    this.Ovt();
  }
  hDn() {
    this.GetText(1).SetText(this.pyn.GetFullScore().toString());
  }
  GetGuideUiItemAndUiItemForShowEx(e) {
    if (1 === e.length && !isNaN(Number(e[0])))
      return (
        (e = Number(e[0])),
        (e = this.vVt.UnsafeGetGridProxy(e).GetButtonItem()) ? [e, e] : void 0
      );
  }
}
exports.BossRushSelectView = BossRushSelectView;
class BossRushMainViewScrollItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.nqe = () => {
        var e;
        this.$8i?.GetUnLockState()
          ? ((e =
              ModelManager_1.ModelManager.BossRushModel.GetBossRushTeamInfoByActivityId(
                ModelManager_1.ModelManager.BossRushModel
                  .CurrentSelectActivityId,
              )).Clear(),
            e.SetCurrentSelectLevel(this.$8i),
            (ModelManager_1.ModelManager.BossRushModel.CurrentSelectLevelDetailData =
              this.$8i),
            (ModelManager_1.ModelManager.BossRushModel.CurrentTeamInfo =
              ModelManager_1.ModelManager.BossRushModel.CurrentSelectLevelDetailData.ConvertToTeamInfo()),
            EventSystem_1.EventSystem.Emit(
              EventDefine_1.EEventName.RequestChangeBossRushView,
              "BossRushLevelDetailView",
            ))
          : ScrollingTipsController_1.ScrollingTipsController.ShowTipsByTextId(
              "BossRushLevelLock",
            );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [2, UE.UIItem],
      [1, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UITexture],
    ]),
      (this.BtnBindInfo = [[5, this.nqe]]);
  }
  Refresh(e, i, t) {
    (this.$8i = e), this.wke(e), this.l3e(e), this.vyn(e), this.Myn(e);
  }
  Myn(e) {
    this.SetTextureByPath(e.GetMonsterTexturePath(), this.GetTexture(0));
    var i = this.GetTexture(6);
    i.SetUIActive(!e.GetUnLockState()),
      this.SetTextureByPath(e.GetMonsterTexturePath(), i);
  }
  wke(e) {
    e = e.GetUnLockState();
    this.GetItem(1).SetUIActive(e), this.GetItem(2).SetUIActive(!e);
  }
  l3e(e) {
    e.GetUnLockState() && this.GetText(3).SetText(e.GetScore().toString());
  }
  vyn(e) {
    e.GetUnLockState() || this.GetText(4).SetText(e.GetUnlockTimeText());
  }
  GetButtonItem() {
    return this.GetButton(5)?.RootUIComp;
  }
}
//# sourceMappingURL=BossRushSelectView.js.map
