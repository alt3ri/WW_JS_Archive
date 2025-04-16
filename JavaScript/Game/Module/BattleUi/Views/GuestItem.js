"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.GuestItem = void 0);
const UE = require("ue"),
  PlotGuestByGuestID_1 = require("../../../../Core/Define/ConfigQuery/PlotGuestByGuestID"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  BattleChildView_1 = require("./BattleChildView/BattleChildView");
class GuestItem extends BattleChildView_1.BattleChildView {
  constructor() {
    super(...arguments),
      (this.pdc = void 0),
      (this.vdc = !1),
      (this.ydc = (e, t) => {
        if (t)
          if (e.WhoId && this.pdc?.has(e.WhoId)) {
            if (!this.vdc) {
              this.vdc = !0;
              var i = this.GetItem(1)
                .GetOwner()
                .K2_GetComponentsByClass(
                  UE.LGUIPlayTweenComponent.StaticClass(),
                );
              for (let e = 0; e < i.Num(); e++) i.Get(e).Play();
            }
          } else this.Sdc();
      }),
      (this.Sdc = () => {
        if (this.vdc) {
          this.vdc = !1;
          var t = this.GetItem(2)
            .GetOwner()
            .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
          for (let e = 0; e < t.Num(); e++) t.Get(e).Play();
        }
      }),
      (this.EFc = (e) => {
        var t = this.GetItem(e ? 3 : 4)
          .GetOwner()
          .K2_GetComponentsByClass(UE.LGUIPlayTweenComponent.StaticClass());
        for (let e = 0; e < t.Num(); e++) t.Get(e).Play();
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnShowBattleChildView() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.PlotShowTalk,
      this.ydc,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PlotEndShowTalk,
        this.Sdc,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ShowGuestEffect,
        this.EFc,
      );
  }
  OnHideBattleChildView() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.PlotShowTalk,
      this.ydc,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PlotEndShowTalk,
        this.Sdc,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ShowGuestEffect,
        this.EFc,
      );
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.BattleUiModel.GuestId;
    0 !== e && (await this.SetGuest(e));
  }
  OnAfterShow() {
    ModelManager_1.ModelManager.BattleUiModel.GuestEffect && this.EFc(!0);
  }
  async SetGuest(e) {
    var e = PlotGuestByGuestID_1.configPlotGuestByGuestID.GetConfig(e),
      t = e.HeadIconPath;
    (this.pdc = new Set(e.SpeakerID)),
      await this.SetTextureAsync(t, this.GetTexture(0));
  }
}
exports.GuestItem = GuestItem;
//# sourceMappingURL=GuestItem.js.map
