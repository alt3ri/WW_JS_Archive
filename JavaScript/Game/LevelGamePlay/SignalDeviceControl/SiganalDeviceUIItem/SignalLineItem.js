"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkingLineItem = void 0);
const UE = require("ue"),
  Log_1 = require("../../../../Core/Common/Log"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiPanelBase_1 = require("../../../Ui/Base/UiPanelBase");
class LinkingLineItem extends UiPanelBase_1.UiPanelBase {
  constructor(i) {
    super(),
      (this.LineType = 3),
      (this.SprBg = void 0),
      (this.SprLine = void 0),
      (this.SprLineHalf = void 0),
      (this.SprSpot = void 0),
      (this.SprRay = void 0),
      (this.SprRayHalf = void 0),
      (this.LineType = i);
  }
  static Create(i) {
    return new LinkingLineItem(i);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
    ];
  }
  OnStart() {
    (this.SprBg = this.GetSprite(0)),
      (this.SprLine = this.GetSprite(1)),
      (this.SprLineHalf = this.GetSprite(2)),
      (this.SprSpot = this.GetSprite(3)),
      (this.SprRay = this.GetSprite(4)),
      (this.SprRayHalf = this.GetSprite(5)),
      this.SprBg.SetUIActive(!1),
      this.SprLine.SetUIActive(!1),
      this.SprLineHalf.SetUIActive(!1),
      this.SprSpot.SetUIActive(!1),
      this.SprRay.SetUIActive(!1),
      this.SprRayHalf.SetUIActive(!1);
  }
  InitIcon(i, e = !1) {
    var t = 1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType,
      n = ModelManager_1.ModelManager.SignalDeviceModel.CurrentColor;
    let s = LinkingLineItem.ColorSpotIconMap.get(n);
    t && (s += "CM");
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s);
    this.SetSpriteByPath(o, this.SprSpot, !1);
    let a = LinkingLineItem.ColorRayIconMap.get(n);
    t && (a += "CM");
    var o = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(a),
      t =
        (this.SetSpriteByPath(o, this.SprRay, !1),
        this.SetSpriteByPath(o, this.SprRayHalf, !1),
        LinkingLineItem.ColorMap.get(n)),
      o =
        (1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType
          ? ((o = LinkingLineItem.ColorSprBgMap.get(n)),
            (n =
              ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(
                o,
              )),
            this.SetSpriteByPath(n, this.SprBg, !1))
          : this.SprBg.SetColor(UE.Color.FromHex(t)),
        this.SprLine.SetColor(UE.Color.FromHex(t)),
        this.SprLineHalf.SetColor(UE.Color.FromHex(t)),
        this.RotateLine(i),
        3 === this.LineType || 4 === this.LineType);
    this.SprBg.SetUIActive(!0),
      this.SprLine.SetUIActive(!e),
      this.SprLineHalf.SetUIActive(e),
      this.SprRay.SetUIActive(!e),
      this.SprRayHalf.SetUIActive(e || !o),
      this.SprSpot.SetUIActive(!0);
  }
  RotateLine(i) {
    var i = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(i),
      e = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator;
    (e.Yaw = i),
      this.GetRootItem().SetUIRelativeRotation(e.ToUeRotator()),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug("Temp", 36, "RotateLine", ["angle", i]);
  }
  SetLineHalf(i) {
    this.SprLine.SetUIActive(!1),
      this.SprLineHalf.SetUIActive(!0),
      this.SprRay.SetUIActive(!1),
      this.SprRayHalf.SetUIActive(!0);
    var e = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator,
      i = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(i);
    (e.Yaw = i), this.GetRootItem().SetUIRelativeRotation(e.ToUeRotator());
  }
}
((exports.LinkingLineItem = LinkingLineItem).ColorSpotIconMap = new Map([
  [IAction_1.EPieceColorType.Blue, "SP_SpotBlue"],
  [IAction_1.EPieceColorType.Green, "SP_SpotGreen"],
  [IAction_1.EPieceColorType.Red, "SP_SpotRed"],
  [IAction_1.EPieceColorType.Yellow, "SP_SpotYellow"],
])),
  (LinkingLineItem.ColorRayIconMap = new Map([
    [IAction_1.EPieceColorType.Blue, "SP_LineBlue"],
    [IAction_1.EPieceColorType.Green, "SP_LineGreen"],
    [IAction_1.EPieceColorType.Red, "SP_LineRed"],
    [IAction_1.EPieceColorType.Yellow, "SP_LineYellow"],
  ])),
  (LinkingLineItem.ColorSprBgMap = new Map([
    [IAction_1.EPieceColorType.Blue, "SP_GridBgCMBlue"],
    [IAction_1.EPieceColorType.Green, "SP_GridBgCMGreen"],
    [IAction_1.EPieceColorType.Red, "SP_GridBgCMRed"],
    [IAction_1.EPieceColorType.Yellow, "SP_GridBgCMYellow"],
  ])),
  (LinkingLineItem.ColorMap = new Map([
    [IAction_1.EPieceColorType.Blue, "3B82B9FF"],
    [IAction_1.EPieceColorType.Green, "64945FFF"],
    [IAction_1.EPieceColorType.Red, "B93B3CFF"],
    [IAction_1.EPieceColorType.Yellow, "B9823BFF"],
  ]));
//# sourceMappingURL=SignalLineItem.js.map
