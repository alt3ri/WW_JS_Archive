"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.RacingBetsActivityRewardView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  RacingBetsActivityRewardItem_1 = require("./Item/RacingBetsActivityRewardItem"),
  RacingBetsRewardTabItem_1 = require("./Item/RacingBetsRewardTabItem");
class RacingBetsActivityRewardView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Nvc = void 0),
      (this.Vvc = void 0),
      (this.B7t = void 0),
      (this.H3e = void 0),
      (this.Og = () => {
        if (this.Nvc) {
          for (const e of this.B7t.GetLayoutItemList()) e.RefreshItem();
          var t = this.Nvc.GetRewardDataList();
          this.H3e.RefreshByData(t);
        }
      }),
      (this.jvc = () =>
        new RacingBetsActivityRewardItem_1.RacingBetsActivityRewardItem()),
      (this.fqe = () => {
        var t = new RacingBetsRewardTabItem_1.RacingBetsRewardTabItem();
        return t.BindClickToggleCallBack(this.onl), t;
      }),
      (this.onl = (e) => {
        var t;
        this.Nvc !== e &&
          ((this.Nvc = e),
          (t = this.Vvc.findIndex((t) => t === e)),
          this.B7t.SelectGridProxy(t),
          (t = e.GetRewardDataList()),
          this.H3e.RefreshByData(t));
      }),
      (this.Jvt = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIButtonComponent],
      [1, UE.UIHorizontalLayout],
      [2, UE.UIVerticalLayout],
      [3, UE.UIItem],
      [4, UE.UIText],
      [5, UE.UIButtonComponent],
      [6, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [0, this.Jvt],
        [5, this.Jvt],
      ]);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnRacingBetsRewardRefresh,
      this.Og,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnRacingBetsRewardRefresh,
      this.Og,
    );
  }
  async OnBeforeStartAsync() {
    var t;
    (this.Vvc = this.OpenParam),
      void 0 === this.Vvc || this.Vvc.length <= 0
        ? Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "RacingBets",
            58,
            "RacingBetsActivityRewardView invalid OpenParam",
          )
        : ((this.H3e = new GenericLayout_1.GenericLayout(
            this.GetVerticalLayout(2),
            this.jvc,
          )),
          (this.B7t = new GenericLayout_1.GenericLayout(
            this.GetHorizontalLayout(1),
            this.fqe,
          )),
          await this.B7t.RefreshByDataAsync(this.Vvc),
          this.B7t.SelectGridProxy(0),
          (this.Nvc = this.Vvc[0]),
          (t = this.Nvc.GetRewardDataList()),
          await this.H3e.RefreshByDataAsync(t),
          this.GetText(4).SetUIActive(!1));
  }
}
exports.RacingBetsActivityRewardView = RacingBetsActivityRewardView;
//# sourceMappingURL=RacingBetsActivityRewardView.js.map
