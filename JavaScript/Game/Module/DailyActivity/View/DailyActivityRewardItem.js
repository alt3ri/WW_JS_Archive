"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.DailyActivityRewardItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const DailyActivityController_1 = require("../DailyActivityController");
const DailyActivityDefine_1 = require("../DailyActivityDefine");
class DailyActivityRewardItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.YOt = 0),
      (this.DailyActiveState = void 0),
      (this.JOt = () => {
        switch (this.DailyActiveState) {
          case 2:
            this.zOt(!1);
            break;
          case 1:
            this.ZOt();
            break;
          case 3:
            this.zOt(!0);
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
      (this.BtnBindInfo = [[1, this.JOt]]);
  }
  OnStart() {
    this.GetUiNiagara(6).SetAlpha(0), this.GetUiNiagara(7).SetUIActive(!1);
  }
  OnBeforeDestroy() {}
  Refresh(e, t, i) {
    this.YOt = e;
    e = ModelManager_1.ModelManager.DailyActivityModel.DailyActivityGoalMap.get(
      this.YOt,
    );
    e &&
      (this.SetRewardGoalValue(e.Goal),
      this.DailyActiveState !== e.State
        ? this.RefreshRewardState(e.State, void 0 === this.DailyActiveState)
        : this.DailyActiveState === 3 && this.GetUiNiagara(7).SetUIActive(!1));
  }
  RefreshSelf() {
    this.Refresh(this.YOt, !1, 0);
  }
  SetRewardGoalValue(e) {
    this.GetText(0).SetText(e.toString());
  }
  RefreshRewardState(t, e) {
    const i = [this.GetSprite(4), this.GetSprite(2), this.GetSprite(3)];
    for (let e = 0; e < i.length; e++) i[e].SetUIActive(e + 1 === t);
    this.GetItem(8).SetUIActive(t === 1);
    this.GetUiNiagara(6).SetAlpha(t === 1 ? 1 : 0);
    var r = this.GetUiNiagara(7);
    var e =
      (t !== 3 || e
        ? (r.SetUIActive(!1), r.Deactivate())
        : (r.SetUIActive(!0), r.ActivateSystem(!0)),
      t === 2
        ? DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_UNFINISHED
        : DailyActivityDefine_1.REWARD_BACKGROUND_COLOR_FINISHED);
    var r = UE.Color.FromHex(e);
    this.GetSprite(5).SetColor(r),
      (this.GetText(0).useChangeColor = t !== 2),
      (this.DailyActiveState = t);
  }
  ZOt() {
    DailyActivityController_1.DailyActivityController.RequestAllAvailableActivityReward();
  }
  zOt(e) {
    const t = [];
    for (const s of ModelManager_1.ModelManager.DailyActivityModel.GetActivityRewardById(
      this.YOt,
    )) {
      const i = { Id: s[0].ItemId, Num: s[1], Received: e };
      t.push(i);
    }
    const r = {
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
// # sourceMappingURL=DailyActivityRewardItem.js.map
