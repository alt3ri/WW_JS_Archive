"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaTitleInspirationItem = void 0);
const UE = require("ue"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  CiacconaGalDefine_1 = require("../CiacconaGalDefine");
class CiacconaTitleInspirationItem extends UiPanelBase_1.UiPanelBase {
  constructor(e) {
    super(),
      (this.CNe = e),
      (this.TDe = void 0),
      (this.r6 = () => {
        this.bl();
      }),
      (this.p4c = () => {
        this.bl();
      }),
      (this.eTt = () => {
        ControllerHolder_1.ControllerHolder.HelpController.OpenHelpById(
          CiacconaGalDefine_1.CIACCONA_INSPIRATION_HELP_ID,
        );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIText],
      [1, UE.UIText],
      [2, UE.UISprite],
      [3, UE.UIItem],
      [4, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[4, this.eTt]]);
  }
  OnStart() {
    this.bl(),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(
        this.r6,
        TimeUtil_1.TimeUtil.InverseMillisecond,
      )),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnCiacconaInspirationDataUpdate,
        this.p4c,
      );
  }
  OnBeforeDestroy() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0)),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnCiacconaInspirationDataUpdate,
        this.p4c,
      );
  }
  bl() {
    var e = this.CNe.InspirationCount,
      i = this.CNe.MaxInspirationCount,
      t =
        0 === e
          ? CiacconaGalDefine_1.TEXT_COLOR_INSPIRATION_ZERO
          : CiacconaGalDefine_1.TEXT_COLOR_INSPIRATION_NORMAL,
      t =
        (this.GetText(0).SetText(`<color=${t}>${e}</color>/` + i),
        this.CNe.RemainTimeToNextRefreshStr);
    t && this.GetText(1).SetText(t),
      this.GetSprite(2).SetUIActive(e < i),
      this.GetItem(3).SetUIActive(e < i);
  }
}
exports.CiacconaTitleInspirationItem = CiacconaTitleInspirationItem;
//# sourceMappingURL=CiacconaGalTitleItem.js.map
