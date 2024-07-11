"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PingView = void 0);
const UE = require("ue"),
  Info_1 = require("../../../Core/Common/Info"),
  NetworkDefine_1 = require("../../../Launcher/NetworkDefine"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiViewBase_1 = require("../../Ui/Base/UiViewBase"),
  LguiUtil_1 = require("../Util/LguiUtil"),
  GOODPING = 100,
  MIDDLEPING = 200,
  LOOPPING = 500,
  BADCOLOR = "FF1F1EFF",
  MIDDLECOLOR = "FFD12FFF",
  GOODCOLOR = "30D82DFF";
class PingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.NKt = ""),
      (this.OKt = !1),
      (this.kKt = -9999),
      (this.FKt = 0),
      (this.VKt = (e) => {
        var i;
        Math.abs(e - this.kKt) < this.FKt ||
          ((i = (this.kKt = e) > LOOPPING) !== this.OKt &&
            (this.GetSprite(0).SetUIActive(!i),
            this.GetItem(1).SetUIActive(i),
            this.HKt(i),
            (this.OKt = i)),
          (i = this.jKt(e)),
          this.NKt !== i[0] &&
            (this.SetSpriteByPath(i[0], this.GetSprite(0), !1),
            (this.NKt = i[0]),
            this.GetText(2).SetColor(UE.Color.FromHex(i[1]))),
          LguiUtil_1.LguiUtil.SetLocalText(
            this.GetText(2),
            "PingStr",
            e.toString(),
          ));
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIItem],
      [2, UE.UIText],
    ];
  }
  OnStart() {
    this.GetItem(1).SetUIActive(!1),
      (this.OKt = !1),
      (this.FKt =
        ConfigManager_1.ConfigManager.CommonConfig.GetPingUnChangeValue());
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnCheckGamePing,
      this.VKt,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnCheckGamePing,
      this.VKt,
    );
  }
  OnAfterShow() {
    this.VKt(ModelManager_1.ModelManager.GamePingModel.CurrentPing);
  }
  HKt(e) {
    e
      ? this.UiViewSequence.PlaySequencePurely("Loop")
      : this.UiViewSequence.StopSequenceByKey("Loop");
  }
  jKt(e) {
    return e <= GOODPING
      ? [this.WKt(), GOODCOLOR]
      : e > GOODPING && e <= MIDDLEPING
        ? [this.KKt(), MIDDLECOLOR]
        : [this.QKt(), BADCOLOR];
  }
  WKt() {
    return !Info_1.Info.IsPcOrGamepadPlatform() &&
      UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
        NetworkDefine_1.ENetworkType.WiFi
      ? ConfigManager_1.ConfigManager.CommonConfig.GetNetGoodSpriteMobile()
      : ConfigManager_1.ConfigManager.CommonConfig.GetNetGoodSprite();
  }
  KKt() {
    return !Info_1.Info.IsPcOrGamepadPlatform() &&
      UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
        NetworkDefine_1.ENetworkType.WiFi
      ? ConfigManager_1.ConfigManager.CommonConfig.GetNetMiddleSpriteMobile()
      : ConfigManager_1.ConfigManager.CommonConfig.GetNetMiddleSprite();
  }
  QKt() {
    return !Info_1.Info.IsPcOrGamepadPlatform() &&
      UE.KuroLauncherLibrary.GetNetworkConnectionType() ===
        NetworkDefine_1.ENetworkType.WiFi
      ? ConfigManager_1.ConfigManager.CommonConfig.GetNetBadSpriteMobile()
      : ConfigManager_1.ConfigManager.CommonConfig.GetNetBadSprite();
  }
}
exports.PingView = PingView;
//# sourceMappingURL=PingView.js.map
