"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundAreaPlayTips = void 0);
const UE = require("ue"),
  SoundAreaPlayInfoById_1 = require("../../../Core/Define/ConfigQuery/SoundAreaPlayInfoById"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase"),
  LguiUtil_1 = require("../Util/LguiUtil");
class SoundAreaPlayTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.tEt = 0),
      (this.TIo = (e) => {
        this.SetBuffInfo(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
      [3, UE.UIItem],
      [4, UE.UIItem],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SilentTipsRefresh,
      this.TIo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SilentTipsRefresh,
      this.TIo,
    );
  }
  OnStart() {
    this.SetBuffInfo(this.OpenParam);
  }
  SetBuffInfo(e) {
    e = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
    e?.ShowTitle
      ? (this.GetItem(3).SetUIActive(!0),
        this.GetItem(4).SetUIActive(!1),
        LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.BuffTitle))
      : (this.GetItem(3).SetUIActive(!1), this.GetItem(4).SetUIActive(!0)),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.BuffDescription),
      e?.Time &&
        (this.tEt =
          TimeUtil_1.TimeUtil.GetServerTimeStamp() +
          e.Time * TimeUtil_1.TimeUtil.InverseMillisecond),
      e?.MaxCount &&
        ModelManager_1.ModelManager.SoundAreaPlayTipsModel.AddShowInfoIdCount(
          e.Id,
        );
  }
  OnTick(e) {
    0 < this.tEt &&
      TimeUtil_1.TimeUtil.GetServerTimeStamp() > this.tEt &&
      (this.CloseMe(), (this.tEt = 0));
  }
  OnAfterPlayStartSequence() {
    this.tEt || this.CloseMe();
  }
}
exports.SoundAreaPlayTips = SoundAreaPlayTips;
//# sourceMappingURL=SoundAreaPlayTips.js.map
