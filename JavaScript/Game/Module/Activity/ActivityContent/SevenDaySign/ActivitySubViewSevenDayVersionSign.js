"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivitySubViewSevenDayVersionSign = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  ActivitySubViewBase_1 = require("../../View/SubView/ActivitySubViewBase"),
  ActivityTitleTypeA_1 = require("../UniversalComponents/Title/ActivityTitleTypeA"),
  ActivitySevenDaySignController_1 = require("./ActivitySevenDaySignController"),
  ActivitySevenDaySignDefine_1 = require("./ActivitySevenDaySignDefine"),
  SIGN_DAY_COUNT = 7;
class ActivitySubViewSevenDayVersionSign extends ActivitySubViewBase_1.ActivitySubViewBase {
  constructor() {
    super(...arguments),
      (this.LNe = void 0),
      (this.ItemList = void 0),
      (this.ActivitySignData = void 0),
      (this.IFe = (i) => {
        this.TFe(i) &&
          ActivitySevenDaySignController_1.ActivitySevenDaySignController.GetRewardByDay(
            this.ActivitySignData.Id,
            i,
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIItem],
      [6, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  OnSetData() {
    this.ActivitySignData = this.ActivityBaseData;
  }
  async OnBeforeStartAsync() {
    var i = this.GetItem(0),
      e =
        ((this.LNe = new ActivityTitleTypeA_1.ActivityTitleTypeA()),
        await this.LNe.CreateThenShowByActorAsync(i.GetOwner()),
        (this.ItemList = []),
        []);
    for (const s of [1, 2, 3, 4, 5, 6, 7]) {
      var t = this.GetItem(s),
        r = new ActivitySevenDaySignDefine_1.VersionSignRewardItem();
      this.ItemList.push(r),
        (r.OnClickToGet = this.IFe),
        e.push(r.CreateThenShowByActorAsync(t.GetOwner()));
    }
    await Promise.all(e);
  }
  OnStart() {
    this.LNe.SetTitleByText(this.ActivityBaseData.GetTitle());
  }
  OnRefreshView() {
    this.jqe();
  }
  OnTimer(i) {
    this.FNe();
  }
  jqe() {
    for (let i = 0; i < SIGN_DAY_COUNT; i++) {
      var e,
        t = this.ActivitySignData.GetRewardByDay(i),
        r = this.ActivitySignData.GetRewardStateByDay(i);
      void 0 === r ||
        void 0 === t ||
        t.length <= 0 ||
        ((e = this.ItemList[i]) && e.RefreshByData(t[0], r, i));
    }
  }
  FNe() {
    var [i, e] = this.GetTimeVisibleAndRemainTime();
    this.LNe.SetTimeTextVisible(i), i && this.LNe.SetTimeTextByText(e);
  }
  TFe(i) {
    return (
      this.ActivitySignData.GetRewardStateByDay(i) ===
      Protocol_1.Aki.Protocol.D0s.j0s
    );
  }
}
exports.ActivitySubViewSevenDayVersionSign = ActivitySubViewSevenDayVersionSign;
//# sourceMappingURL=ActivitySubViewSevenDayVersionSign.js.map
