"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineMatchSuccessView = void 0);
const UE = require("ue"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  LguiUtil_1 = require("../../Util/LguiUtil");
class OnlineMatchSuccessView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.SNi = -1),
      (this.yNi = -1),
      (this.XFt = void 0),
      (this.pNi = void 0),
      (this.eOi = !0),
      (this.$Ye = () => {
        var e =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState();
        3 === e
          ? this.tOi()
          : (1 === e &&
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "MatchingOtherCancel",
              ),
            (this.eOi = !1),
            this.CloseMe());
      }),
      (this.MNi = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
          !0,
        ),
          (this.eOi = !1),
          this.tOi();
      }),
      (this.uHe = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
          !1,
        ),
          ModelManager_1.ModelManager.InstanceDungeonModel.ResetData(),
          this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UIText],
      [2, UE.UIButtonComponent],
      [3, UE.UIItem],
      [4, UE.UIItem],
      [5, UE.UIText],
      [6, UE.UISprite],
      [7, UE.UIText],
      [8, UE.UIButtonComponent],
      [9, UE.UIItem],
      [10, UE.UIItem],
      [11, UE.UIItem],
    ]),
      (this.BtnBindInfo = [
        [2, this.MNi],
        [8, this.uHe],
      ]);
  }
  OnStart() {
    this.GetItem(11)?.SetUIActive(!1),
      this.GetButton(8).GetRootComponent().SetUIActive(!0),
      (this.XFt = this.GetText(5)),
      (this.pNi = this.GetSprite(6));
    var e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "match_confirm_time_out_seconds",
    );
    (this.SNi = e),
      (this.yNi = e),
      this.GetItem(9).SetUIActive(!0),
      this.GetItem(10).SetUIActive(!1),
      this.Og();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMatchingChange,
      this.$Ye,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMatchingChange,
      this.$Ye,
    );
  }
  OnTick(e) {
    this.eOi &&
      ((this.SNi -= e * TimeUtil_1.TimeUtil.Millisecond),
      this.SNi <= 0
        ? ((this.eOi = !1), this.CloseMe())
        : (this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
          this.pNi.SetFillAmount(this.SNi / this.yNi)));
  }
  Og() {
    var e = this.GetItem(3),
      i = this.GetItem(4),
      e = (e.SetUIActive(!0), i.SetUIActive(!1), this.GetText(1)),
      i =
        (LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingSuccess"),
        this.GetText(7)),
      e =
        ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId(),
      e =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
            .MapName,
        ) ?? "";
    i.SetText(e),
      this.XFt.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.SNi)),
      this.pNi.SetFillAmount(this.SNi / this.yNi);
  }
  tOi() {
    this.GetButton(8).GetRootComponent().SetUIActive(!1),
      this.GetButton(2).GetRootComponent().SetUIActive(!1);
    var e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingTeleport"),
      this.GetText(7).SetUIActive(!1),
      this.XFt.SetUIActive(!1),
      this.pNi.SetUIActive(!1);
  }
}
exports.OnlineMatchSuccessView = OnlineMatchSuccessView;
//# sourceMappingURL=OnlineMatchSuccessView.js.map
