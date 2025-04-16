"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapAreaOnlyShowItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ExploreProgressDefine_1 = require("../ExploreProgressDefine"),
  lockKeys = ["Unlock01", "Unlock02", "Unlock03", "Unlock04"];
class MapAreaOnlyShowItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Cxo = void 0),
      (this.Xy = 0),
      (this.Pe = void 0),
      (this.I8l = (e) => {
        "Unlock04" === e &&
          0 !== this.Pe?.NewOpenCount &&
          this.IsUiActiveInHierarchy() &&
          !this.Cxo?.IsPlayingSequence("Unlock04") &&
          (this.Cxo?.PlayLevelSequenceByName("Complete"),
          Log_1.Log.CheckDebug()) &&
          Log_1.Log.Debug(
            "Temp",
            69,
            "SequenceTest3",
            ["Play Unlock04", this.Xy],
            ["", this.Pe],
          );
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UITexture],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
    ];
  }
  OnBeforeCreate() {
    (this.Cxo = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.Cxo?.BindSequenceCloseEvent(this.I8l);
  }
  Refresh(s, e) {
    (this.Xy = e ?? 0),
      (this.Pe = s),
      this.StopSequenceToFirst(),
      (0 < s.OpenCount || 0 < s.NewOpenCount) &&
        this.SetTextureByPath(s.IconPath, this.GetTexture(0));
    for (let e = 0; e < ExploreProgressDefine_1.AREA_ICON_UNLOCK_COUNT; e++) {
      var t = e < s.OpenCount,
        t =
          (this.GetSprite(1 + e)?.SetUIActive(!t),
          !t && e < s.OpenCount + s.NewOpenCount);
      t && this.Cxo?.PlayLevelSequenceByName(lockKeys[e]);
    }
    e =
      s.OpenCount + s.NewOpenCount <
      ExploreProgressDefine_1.AREA_ICON_UNLOCK_COUNT;
    this.GetSprite(5)?.SetUIActive(e),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Map", 69, this.constructor.name, ["", s]);
  }
  OnBeforeDestroy() {
    this.Cxo?.Clear(), (this.Cxo = void 0);
  }
  StopSequenceToFirst() {
    this.Cxo?.StopPlayingSequence(),
      this.Cxo?.PlayLevelSequenceByName("FirstStart"),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "Temp",
          69,
          "SequenceTest3",
          ["StopSequenceToFirst", this.Xy],
          ["", this.Pe],
        );
  }
}
exports.MapAreaOnlyShowItem = MapAreaOnlyShowItem;
//# sourceMappingURL=MapAreaOnlyShowItem.js.map
