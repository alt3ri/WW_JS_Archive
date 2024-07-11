"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.OnlineMatchSuccessView = void 0);
const UE = require("ue");
const CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById");
const MultiTextLang_1 = require("../../../../Core/Define/ConfigQuery/MultiTextLang");
const EventDefine_1 = require("../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../Manager/ModelManager");
const UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase");
const InstanceDungeonEntranceController_1 = require("../../InstanceDungeon/InstanceDungeonEntranceController");
const ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController");
const LguiUtil_1 = require("../../Util/LguiUtil");
class OnlineMatchSuccessView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.EGi = -1),
      (this.yGi = -1),
      (this.Q2t = void 0),
      (this.pGi = void 0),
      (this.eNi = !0),
      (this.G$e = () => {
        const e =
          ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingState();
        e === 3
          ? this.tNi()
          : (e === 1 &&
              ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "MatchingOtherCancel",
              ),
            this.CloseMe());
      }),
      (this.MGi = () => {
        InstanceDungeonEntranceController_1.InstanceDungeonEntranceController.MatchConfirmRequest(
          !0,
        ),
          (this.eNi = !1),
          this.tNi();
      }),
      (this.J9e = () => {
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
    ]),
      (this.BtnBindInfo = [
        [2, this.MGi],
        [8, this.J9e],
      ]);
  }
  OnStart() {
    this.GetButton(8).GetRootComponent().SetUIActive(!0),
      (this.Q2t = this.GetText(5)),
      (this.pGi = this.GetSprite(6));
    const e = CommonParamById_1.configCommonParamById.GetIntConfig(
      "match_confirm_time_out_seconds",
    );
    (this.EGi = e),
      (this.yGi = e),
      this.GetItem(9).SetUIActive(!0),
      this.GetItem(10).SetUIActive(!1),
      this.Og();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnMatchingChange,
      this.G$e,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnMatchingChange,
      this.G$e,
    );
  }
  OnTick(e) {
    this.eNi &&
      ((this.EGi -= e * TimeUtil_1.TimeUtil.Millisecond),
      this.EGi <= 0
        ? this.CloseMe()
        : (this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
          this.pGi.SetFillAmount(this.EGi / this.yGi)));
  }
  Og() {
    var e = this.GetItem(3);
    var i = this.GetItem(4);
    var e = (e.SetUIActive(!0), i.SetUIActive(!1), this.GetText(1));
    var i =
      (LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingSuccess"), this.GetText(7));
    var e =
      ModelManager_1.ModelManager.InstanceDungeonEntranceModel.GetMatchingId();
    var e =
      MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.GetConfig(e)
          .MapName,
      ) ?? "";
    i.SetText(e),
      this.Q2t.SetText(TimeUtil_1.TimeUtil.GetCoolDown(this.EGi)),
      this.pGi.SetFillAmount(this.EGi / this.yGi);
  }
  tNi() {
    this.GetButton(8).GetRootComponent().SetUIActive(!1),
      this.GetButton(2).GetRootComponent().SetUIActive(!1);
    const e = this.GetText(1);
    LguiUtil_1.LguiUtil.SetLocalText(e, "MatchingTeleport"),
      this.GetText(7).SetUIActive(!1),
      this.Q2t.SetUIActive(!1),
      this.pGi.SetUIActive(!1);
  }
}
exports.OnlineMatchSuccessView = OnlineMatchSuccessView;
// # sourceMappingURL=OnlineMatchSuccessView.js.map
