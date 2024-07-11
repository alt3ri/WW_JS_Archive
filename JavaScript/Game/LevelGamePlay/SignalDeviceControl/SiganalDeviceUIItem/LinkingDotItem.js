"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkingDotItem = void 0);
const UE = require("ue"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LinkingDotItem extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.wAe = void 0),
      (this.BAe = void 0),
      (this.bAe = void 0),
      (this.qAe = void 0),
      (this.GAe = void 0),
      (this.NAe = void 0),
      (this.OAe = void 0),
      (this.kAe = void 0),
      (this.FAe = (t, i, e, n, o) => {});
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [6, UE.UISprite],
      [5, UE.UISprite],
      [4, UE.UIItem],
      [7, UE.UIItem],
    ];
  }
  OnStart() {
    (this.wAe = this.GetSprite(0)),
      (this.BAe = this.GetSprite(1)),
      (this.bAe = this.GetSprite(2)),
      (this.qAe = this.GetSprite(3)),
      (this.GAe = this.GetSprite(6)),
      (this.NAe = this.GetSprite(5)),
      (this.OAe = this.GetItem(4)),
      (this.kAe = this.GetItem(7)),
      this.wAe.SetUIActive(!1),
      this.BAe.SetUIActive(!1),
      this.bAe.SetUIActive(!1),
      this.qAe.SetUIActive(!1),
      this.GAe.SetUIActive(!1),
      this.NAe.SetUIActive(!1),
      this.kAe.SetUIActive(!1),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSignalDeviceLinking,
        this.FAe,
      );
  }
  OnBeforeDestroy() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSignalDeviceLinking,
      this.FAe,
    );
  }
  InitIcon(t) {
    var i = LinkingDotItem.VAe.get(t),
      e = LinkingDotItem.HAe.get(t),
      n = LinkingDotItem.ColorRayIconMap.get(t),
      o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(i),
      o =
        (this.SetSpriteByPath(o, this.wAe, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
          i + "Light",
        )),
      i =
        (this.SetSpriteByPath(o, this.BAe, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e)),
      o =
        (this.SetSpriteByPath(i, this.qAe, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(n)),
      e =
        (this.SetSpriteByPath(o, this.GAe, !1), LinkingDotItem.ColorMap.get(t)),
      i =
        (this.NAe.SetColor(UE.Color.FromHex(e)),
        LinkingDotItem.FxColorMap.get(t));
    this.kAe.SetColor(UE.Color.FromHex(i)), this.SetLight(!1);
  }
  ResetIcon() {
    this.SetLight(!1);
  }
  SetLight(t) {
    this.wAe.SetUIActive(!t),
      this.BAe.SetUIActive(t),
      this.bAe.SetUIActive(!t),
      this.qAe.SetUIActive(t),
      t || this.SetFxBoost(!1);
  }
  SetFxBoost(t) {
    this.kAe.SetUIActive(t);
  }
  RotateLine(t, i = 0) {
    this.GAe.SetUIActive(t), this.NAe.SetUIActive(t);
    (t = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(i)),
      (i = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator);
    (i.Yaw = t + 90), this.OAe.SetUIRelativeRotation(i.ToUeRotator());
  }
}
((exports.LinkingDotItem = LinkingDotItem).VAe = new Map([
  [IAction_1.EPieceColorType.Blue, "SP_DotBlue"],
  [IAction_1.EPieceColorType.Green, "SP_DotGreen"],
  [IAction_1.EPieceColorType.Red, "SP_DotRed"],
  [IAction_1.EPieceColorType.Yellow, "SP_DotYellow"],
])),
  (LinkingDotItem.HAe = new Map([
    [IAction_1.EPieceColorType.Blue, "SP_CornerBlue"],
    [IAction_1.EPieceColorType.Green, "SP_CornerGreen"],
    [IAction_1.EPieceColorType.Red, "SP_CornerRed"],
    [IAction_1.EPieceColorType.Yellow, "SP_CornerYellow"],
  ])),
  (LinkingDotItem.ColorRayIconMap = new Map([
    [IAction_1.EPieceColorType.Blue, "SP_LineBlue"],
    [IAction_1.EPieceColorType.Green, "SP_LineGreen"],
    [IAction_1.EPieceColorType.Red, "SP_LineRed"],
    [IAction_1.EPieceColorType.Yellow, "SP_LineYellow"],
  ])),
  (LinkingDotItem.ColorMap = new Map([
    [IAction_1.EPieceColorType.Blue, "3B82B9FF"],
    [IAction_1.EPieceColorType.Green, "64945FFF"],
    [IAction_1.EPieceColorType.Red, "B93B3CFF"],
    [IAction_1.EPieceColorType.Yellow, "B9823BFF"],
  ])),
  (LinkingDotItem.FxColorMap = new Map([
    [IAction_1.EPieceColorType.Blue, "41AEFBFF"],
    [IAction_1.EPieceColorType.Green, "4F8040FF"],
    [IAction_1.EPieceColorType.Red, "F0477EFF"],
    [IAction_1.EPieceColorType.Yellow, "F8E56CFF"],
  ]));
//# sourceMappingURL=LinkingDotItem.js.map
