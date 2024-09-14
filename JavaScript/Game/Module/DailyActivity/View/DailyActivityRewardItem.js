"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityRewardItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  DailyActivityController_1 = require("../DailyActivityController"),
  DailyActivityDefine_1 = require("../DailyActivityDefine");
class DailyActivityRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.Jkt = 0),
      (this.DailyActiveState = void 0),
      (this.SPe = void 0),
      (this.zkt = () => {
        switch (this.DailyActiveState) {
          case 2:
            this.Zkt(!1);
            break;
          case 1:
            this.e2t();
            break;
          case 3:
            this.Zkt(!0);
        }
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIButtonComponent],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UINiagara],
      [7, UE.UINiagara],
      [8, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[1, this.zkt]]);
  }
  OnStart() {
    this.GetUiNiagara(6).SetAlpha(0),
      this.GetUiNiagara(7).SetUIActive(!1),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnBeforeDestroy() {}
  Refresh(e, t, i) {
    this.Jkt = e;
    e = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap.get(
      this.Jkt,
    );
    e &&
      (this.SetRewardGoalValue(e.Goal),
      this.DailyActiveState !== e.State
        ? this.RefreshRewardState(e.State, void 0 === this.DailyActiveState)
        : 3 === this.DailyActiveState && this.GetUiNiagara(7).SetUIActive(!1));
  }
  RefreshSelf() {
    this.Refresh(this.Jkt, !1, 0);
  }
  SetRewardGoalValue(e) {
    this.GetText(0).SetText(e.toString());
  }
  RefreshRewardState(t, e) {
    var i = [this.GetSprite(4), this.GetSprite(2), this.GetSprite(3)];
    for (let e = 0; e < i.length; e++) i[e].SetUIActive(e + 1 === t);
    this.GetItem(8).SetUIActive(1 === t);
    this.GetUiNiagara(6).SetAlpha(1 === t ? 1 : 0);
    var r = this.GetUiNiagara(7),
      r =
        (3 !== t || e
          ? (r.SetUIActive(!1), r.Deactivate())
          : (r.SetUIActive(!0), r.ActivateSystem(!0)),
        1 !== t || e || this.SPe.PlayLevelSequenceByName("Activate"),
        2 === t
          ? DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_UNFINISHED
          : DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_FINISHED),
      e = UE.Color.FromHex(r);
    this.GetSprite(5).SetColor(e),
      (this.GetText(0).useChangeColor = 2 !== t),
      (this.DailyActiveState = t);
  }
  e2t() {
    DailyActivityController_1.DailyActivityController.RequestAllAvailableActivityReward();
  }
  Zkt(e) {
    var t = [];
    for (const s of ModelManager_1.ModelManager.DailyActivityModel.GetActivityRewardById(
      this.Jkt,
    )) {
      var i = { Id: s[0].ItemId, Num: s[1], Received: e };
      t.push(i);
    }
    var r = {
      RewardLists: t,
      MountItem: this.GetButton(1).RootUIComp,
      PosBias: new UE.Vector(0, 30, 0),
    };
    (ModelManager_1.ModelManager.DailyActivityModel.RewardData = r),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshActivityRewardPopUp,
      );
  }
}
exports.DailyActivityRewardItem = DailyActivityRewardItem;
//# sourceMappingURL=DailyActivityRewardItem.js.map
