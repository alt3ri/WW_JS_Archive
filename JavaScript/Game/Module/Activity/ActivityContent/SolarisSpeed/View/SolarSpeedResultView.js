"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SolarSpeedResultView = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  UiViewBase_1 = require("../../../../../Ui/Base/UiViewBase"),
  ButtonItem_1 = require("../../../../Common/Button/ButtonItem"),
  GenericLayout_1 = require("../../../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../../../Util/LguiUtil"),
  SolarSpeedDefine_1 = require("../SolarSpeedDefine");
class SolarSpeedResultView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.tFe = void 0),
      (this.lGe = void 0),
      (this.hH_ = void 0),
      (this.Pe = void 0),
      (this.P3_ = () => new this.Pe.PanelType()),
      (this.kZs = () => {
        this.Pe.ConfirmClick?.(), this.GetItem(3)?.SetUIActive(!1);
      }),
      (this.eFl = (e) => {
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("SolarSpeed", 64, "结果界面《start》动画触发", [
            "passData",
            e,
          ]),
          this.lH_();
      }),
      (this.Huc = (e) => {
        for (const t of this.tFe.GetLayoutItemList())
          t.RefreshAddFriendByPlayerIdExternal(e);
      });
  }
  OnRegisterComponent() {
    (this.Pe = this.OpenParam),
      (this.ComponentRegisterInfos = [
        [0, UE.UIHorizontalLayout],
        [1, UE.UIItem],
        [2, UE.UIItem],
        [3, UE.UIItem],
        [4, UE.UIText],
      ]);
  }
  async OnBeforeStartAsync() {
    return (
      this.GetItem(3)?.SetUIActive(!0),
      (this.tFe = new GenericLayout_1.GenericLayout(
        this.GetHorizontalLayout(0),
        this.P3_,
      )),
      (this.hH_ = this.tFe.GetUiAnimController()),
      (this.lGe = new ButtonItem_1.ButtonItem(this.GetItem(2))),
      this.lGe.SetFunction(this.kZs),
      this.lGe.SetLocalTextNew(
        SolarSpeedDefine_1.SOLAR_SPEED_CONFIRM_BUTTON_TEXT_ID_IN_RESULT,
      ),
      Promise.resolve()
    );
  }
  OnStart() {
    this.tFe.SetActive(!1), this.mGe();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.eFl,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.ApplicationSent,
        this.Huc,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnActivitySequenceEmitEvent,
      this.eFl,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.ApplicationSent,
        this.Huc,
      );
  }
  async lH_() {
    await this.tFe.RefreshByDataAsync(this.Pe.RoleDataList),
      this.tFe.SetActive(!0),
      this.hH_.Play("Start");
  }
  mGe() {
    this.Pe.TitleId &&
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), this.Pe.TitleId);
  }
}
exports.SolarSpeedResultView = SolarSpeedResultView;
//# sourceMappingURL=SolarSpeedResultView.js.map
