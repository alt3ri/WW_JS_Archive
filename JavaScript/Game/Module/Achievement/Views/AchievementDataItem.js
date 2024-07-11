"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AchievementDataItem = void 0);
const UE = require("ue");
const Log_1 = require("../../../../Core/Common/Log");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ModelManager_1 = require("../../../Manager/ModelManager");
const GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
const LguiUtil_1 = require("../../Util/LguiUtil");
const AchievementController_1 = require("../AchievementController");
const AchievementGridItem_1 = require("./AchievementGridItem");
const AchievementStarItem_1 = require("./AchievementStarItem");
class AchievementDataItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ScrollViewDelegate = void 0),
      (this.GridIndex = 0),
      (this.DisplayIndex = 0),
      (this.tqe = void 0),
      (this.iqe = void 0),
      (this.oqe = void 0),
      (this.rqe = (e) => {
        e === this.iqe?.GetId() &&
          (this.iqe?.IfSingleAchievement() ||
            (!this.iqe?.IfSingleAchievement() &&
              this.iqe.GetNextLink() === 0)) &&
          this.RefreshUi(this.iqe);
      }),
      (this.nqe = () => {
        AchievementController_1.AchievementController.RequestGetAchievementReward(
          !1,
          this.iqe.GetId(),
        );
      });
  }
  async Init(e) {
    await this.CreateByActorAsync(e.GetOwner());
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [2, UE.UIButtonComponent],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UIText],
      [7, UE.UIText],
      [8, UE.UIItem],
      [9, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[2, this.nqe]]);
  }
  OnStart() {
    void 0 === this.oqe &&
      ((this.oqe = new AchievementGridItem_1.AchievementGridItem()),
      this.oqe.Initialize(this.GetItem(8).GetOwner())),
      this.oqe.SetActive(!1),
      this.AddEventListener();
  }
  Refresh(e, t, i) {
    this.RefreshUi(e);
  }
  RefreshUi(e) {
    let t, i, s, r, h, n, o;
    void 0 === e
      ? Log_1.Log.CheckError() &&
        Log_1.Log.Error("Achievement", 59, "AchievementDataItem Data为空")
      : ((t = (this.iqe = e).GetCurrentProgress()),
        (i = e.GetMaxProgress()),
        (s = e.GetFinishState()),
        (o = this.GetText(5)),
        (r = this.GetText(6)),
        (h = this.GetText(3)),
        ModelManager_1.ModelManager.AchievementModel.AchievementSearchState
          ? ((n =
              ModelManager_1.ModelManager.AchievementModel.CurrentSearchText),
            o.SetText(e.GetReplaceTitle(n)),
            r.SetText(e.GetReplaceDesc(n)))
          : (o.SetText(e.GetTitle()), r.SetText(e.GetDesc())),
        LguiUtil_1.LguiUtil.SetLocalText(
          this.GetText(7),
          "CollectProgress",
          t,
          i,
        ),
        this.SetButtonUiActive(2, s === 1),
        this.GetItem(1)?.SetUIActive(e.RedPoint()),
        this.GetItem(4)?.SetUIActive(s === 2),
        s === 0
          ? (h?.SetUIActive(!0),
            LguiUtil_1.LguiUtil.SetLocalTextNew(h, "Text_Doing_Text"))
          : s === 1
            ? h?.SetUIActive(!1)
            : (h?.SetUIActive(!0),
              (n = TimeUtil_1.TimeUtil.DateFormat4(
                new Date(
                  e.GetFinishTime() * TimeUtil_1.TimeUtil.InverseMillisecond,
                ),
              )),
              h?.SetText(n)),
        (o = e.GetRewards()).length > 0 && this.sqe(o[0]),
        this.aqe());
  }
  ClearItem() {
    this.Destroy();
  }
  GetUsingItem(e) {
    return this.GetRootItem().GetOwner();
  }
  AddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
      this.rqe,
    );
  }
  RemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnAchievementDataWithIdNotify,
      this.rqe,
    );
  }
  aqe() {
    void 0 !== this.tqe && (this.tqe.Destroy(), (this.tqe = void 0));
    const e = this.iqe.IfSingleAchievement()
      ? this.iqe.GetAchievementShowStar()
      : AchievementDataItem.hqe;
    this.tqe = new AchievementStarItem_1.AchievementStarItem(
      e,
      this.iqe,
      this.GetItem(9),
    );
  }
  sqe(e) {
    this.oqe.SetActive(!0);
    const t = new AchievementGridItem_1.AchievementGridItemData();
    (t.Data = e),
      (t.GetRewardState = this.iqe.GetFinishState() === 2),
      this.oqe.Refresh(t);
  }
  OnBeforeDestroy() {
    this.tqe && this.tqe.Destroy(),
      this.oqe && this.oqe.Destroy(),
      this.iqe && (this.iqe = void 0),
      this.RemoveEventListener();
  }
}
(exports.AchievementDataItem = AchievementDataItem).hqe = 3;
// # sourceMappingURL=AchievementDataItem.js.map
