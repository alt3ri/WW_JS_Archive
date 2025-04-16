"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsMatchBtnItem = exports.RacingBetsMatchView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsController_1 = require("../RacingBetsController"),
  RacingBetsMatchInfoItem_1 = require("./Item/RacingBetsMatchInfoItem");
class RacingBetsMatchView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.yt1 = [1, 3, 5, 4, 2]),
      (this.Mt1 = void 0),
      (this.Et1 = void 0),
      (this.It1 = void 0),
      (this.Tt1 = void 0),
      (this.LI1 = void 0),
      (this.R01 = []),
      (this.St1 = void 0),
      (this.Og = (t) => {
        this.Lt1();
      }),
      (this.ifa = () => {
        return new RacingBetsMatchBtnItem();
      }),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIGridLayout],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Jvt]]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsLegMatchEnd,
      this.Og,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsLegMatchEnd,
      this.Og,
    );
  }
  async OnBeforeStartAsync() {
    (this.Mt1 = new RacingBetsMatchInfoItem_1.RacingBetsSixDangoMatchInfo()),
      await this.Mt1.CreateThenShowByActorAsync(this.GetItem(3).GetOwner()),
      (this.Et1 = new RacingBetsMatchInfoItem_1.RacingBetsSixDangoMatchInfo()),
      await this.Et1.CreateThenShowByActorAsync(this.GetItem(5).GetOwner()),
      (this.It1 = new RacingBetsMatchInfoItem_1.RacingBetsFourDangoMatchInfo()),
      await this.It1.CreateThenShowByActorAsync(this.GetItem(4).GetOwner()),
      (this.Tt1 = new RacingBetsMatchInfoItem_1.RacingBetsFourDangoMatchInfo()),
      await this.Tt1.CreateThenShowByActorAsync(this.GetItem(6).GetOwner()),
      (this.LI1 = new RacingBetsMatchInfoItem_1.RacingBetsFinalMatchInfo()),
      await this.LI1.CreateThenShowByActorAsync(this.GetItem(7).GetOwner()),
      (this.St1 = new GenericLayout_1.GenericLayout(
        this.GetGridLayout(1),
        this.ifa,
      )),
      (this.R01 = []);
    for (const e of this.yt1) {
      var t =
        ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsGroupMatchData(
          e,
        );
      t && this.R01.push(...t.GetLegMatchList());
    }
    await this.St1.RefreshByDataAsync(this.R01);
  }
  OnStart() {
    this.Lt1();
  }
  OnTick() {
    this.bt1();
  }
  bt1() {
    for (const t of this.St1.GetLayoutItemList()) t.RefreshState();
  }
  Lt1() {
    this.Mt1?.SetData(1),
      this.Et1?.SetData(2),
      this.It1?.SetData(3),
      this.Tt1?.SetData(4),
      this.LI1?.SetData(5);
  }
  GetGuideUiItemAndUiItemForShowEx(t) {
    if (0 !== t.length)
      for (const i of Array.from(this.R01).sort(
        (t, e) => e.MatchEndTime - t.MatchEndTime,
      ))
        if (i.IsLegMatchFinished()) {
          var e = this.R01.indexOf(i),
            e = this.St1.GetGridByDisplayIndex(e);
          if (e) return [e, e];
        }
  }
}
exports.RacingBetsMatchView = RacingBetsMatchView;
class RacingBetsMatchBtnItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.ZPc = void 0),
      (this.Rt1 = () => {
        var t =
          ModelManager_1.ModelManager.RacingBetsModel.GetRacingBetsSeasonData();
        t &&
          this.ZPc &&
          this.ZPc.IsLegMatchFinished() &&
          RacingBetsController_1.RacingBetsController.RacingBetMatchActionRequest(
            t.Id,
            this.ZPc.Id,
          );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UISprite],
      [5, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.Rt1]]);
  }
  Refresh(t, e, i) {
    t && ((this.ZPc = t), this.RefreshItem());
  }
  RefreshItem() {
    this.ZPc &&
      (this.GetText(2).SetText(
        TimeUtil_1.TimeUtil.DateFormat6String(this.ZPc.MatchStartTime),
      ),
      this.GetText(3).ShowTextNew(this.ZPc.Name),
      this.SetSpriteByPath(this.ZPc.MatchBtnBgPath, this.GetSprite(1), !1),
      this.RefreshState());
  }
  RefreshState() {
    var t;
    this.ZPc &&
      ((t = this.ZPc.GetLegMatchState()),
      this.GetSprite(4).SetUIActive(4 === t),
      this.GetItem(5).SetUIActive(0 !== t && 4 !== t));
  }
}
exports.RacingBetsMatchBtnItem = RacingBetsMatchBtnItem;
//# sourceMappingURL=RacingBetsMatchView.js.map
