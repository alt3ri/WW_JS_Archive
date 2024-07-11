"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SoundAreaPlayTips = void 0);
const UE = require("ue");
const SoundAreaPlayInfoById_1 = require("../../../Core/Define/ConfigQuery/SoundAreaPlayInfoById");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const LocalStorage_1 = require("../../Common/LocalStorage");
const LocalStorageDefine_1 = require("../../Common/LocalStorageDefine");
const TimeUtil_1 = require("../../Common/TimeUtil");
const UiTickViewBase_1 = require("../../Ui/Base/UiTickViewBase");
const LguiUtil_1 = require("../Util/LguiUtil");
class SoundAreaPlayTips extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments),
      (this.Hvt = 0),
      (this.Ryo = (e) => {
        this.SetBuffInfo(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIText],
      [2, UE.UIText],
    ];
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.SilentTipsRefresh,
      this.Ryo,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.SilentTipsRefresh,
      this.Ryo,
    );
  }
  OnStart() {
    this.SetBuffInfo(this.OpenParam);
  }
  SetBuffInfo(e) {
    let i;
    let t;
    var e = SoundAreaPlayInfoById_1.configSoundAreaPlayInfoById.GetConfig(e);
    e?.ShowTitle
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(1), e.BuffTitle)
      : this.GetText(1)?.SetUIActive(!1),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(2), e.BuffDescription),
      e?.Time &&
        (this.Hvt =
          TimeUtil_1.TimeUtil.GetServerTimeStamp() +
          e.Time * TimeUtil_1.TimeUtil.InverseMillisecond),
      e?.MaxCount &&
        ((t =
          (i =
            LocalStorage_1.LocalStorage.GetPlayer(
              LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips,
            ) ?? new Map()).get(e.Id) ?? 0),
        i.set(e.Id, (t += 1)),
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey.SilentTips,
          i,
        ));
  }
  OnTick(e) {
    this.Hvt > 0 &&
      TimeUtil_1.TimeUtil.GetServerTimeStamp() > this.Hvt &&
      (this.CloseMe(), (this.Hvt = 0));
  }
  OnAfterPlayStartSequence() {
    this.Hvt || this.CloseMe();
  }
}
exports.SoundAreaPlayTips = SoundAreaPlayTips;
// # sourceMappingURL=SoundAreaPlayTips.js.map
