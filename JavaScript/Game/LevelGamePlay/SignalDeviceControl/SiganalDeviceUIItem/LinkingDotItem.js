"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LinkingDotItem = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../Core/Common/CustomPromise"),
  IAction_1 = require("../../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../../Module/Common/LevelSequencePlayer"),
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
      (this.Tia = void 0),
      (this.Lia = void 0),
      (this.oga = void 0),
      (this.SPe = void 0),
      (this.FAe = (i, t, e, n, o) => {});
  }
  OnRegisterComponent() {
    var i = 1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType;
    this.ComponentRegisterInfos = i
      ? [
          [0, UE.UISprite],
          [1, UE.UISprite],
          [2, UE.UISprite],
          [3, UE.UISprite],
          [6, UE.UISprite],
          [5, UE.UISprite],
          [4, UE.UIItem],
          [7, UE.UIItem],
          [8, UE.UISprite],
          [9, UE.UISprite],
          [10, UE.UISprite],
          [11, UE.UISprite],
          [12, UE.UIItem],
          [13, UE.UIExtendToggle],
        ]
      : [
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
      1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType &&
        ((this.Tia = this.GetSprite(9)),
        (this.Lia = this.GetSprite(8)),
        (this.oga = this.GetSprite(10)),
        this.Tia.SetUIActive(!1),
        this.Lia.SetUIActive(!1),
        this.oga.SetUIActive(!1),
        (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(
          this.GetRootItem(),
        ))),
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
  InitIcon(i) {
    var t = 1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType;
    let e = LinkingDotItem.VAe.get(i),
      n = e + "Light",
      o = LinkingDotItem.HAe.get(i),
      s = LinkingDotItem.ColorRayIconMap.get(i);
    t && ((e += "CM"), (n += "CM"), (o += "CM"), (s += "CM"));
    var h = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(e),
      h =
        (this.SetSpriteByPath(h, this.wAe, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(n)),
      h =
        (this.SetSpriteByPath(h, this.BAe, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(o)),
      h =
        (this.SetSpriteByPath(h, this.qAe, !1),
        ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(s)),
      h =
        (this.SetSpriteByPath(h, this.GAe, !1), LinkingDotItem.ColorMap.get(i)),
      h =
        (this.NAe.SetColor(UE.Color.FromHex(h)),
        LinkingDotItem.FxColorMap.get(i));
    this.kAe.SetColor(UE.Color.FromHex(h)),
      t &&
        ((h = LinkingDotItem.Dia.get(i)),
        (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(h)),
        this.SetSpriteByPath(t, this.Tia, !1),
        (h = LinkingDotItem.nga.get(i)),
        (t = ConfigManager_1.ConfigManager.UiResourceConfig.GetResourcePath(h)),
        this.SetSpriteByPath(t, this.oga, !1),
        (h = LinkingDotItem.CmColorMap.get(i)),
        this.Lia.SetColor(UE.Color.FromHex(h)),
        (t = LinkingDotItem.CmAnimColorMap.get(i)),
        this.GetSprite(11)?.SetColor(UE.Color.FromHex(t)),
        this.GetSprite(11)?.SetUIActive(!1),
        this.GetItem(12)?.SetColor(UE.Color.FromHex(t))),
      this.SetLight(!1),
      this.ResetIcon();
  }
  async ResetIcon() {
    var i;
    1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType
      ? (this.oga.SetUIActive(!1),
        this.GetSprite(11)?.SetUIActive(!1),
        (i = new CustomPromise_1.CustomPromise()),
        await this.SPe.PlaySequenceAsync("PressUp", i),
        (this.GetExtendToggle(13).AllowEventBubbleUp = !0))
      : this.SetLight(!1);
  }
  async OnPressed(i) {
    var t, e;
    1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType
      ? (this.oga.SetUIActive(!0),
        (t = i ? "PressDown" : "PressUp"),
        (e = new CustomPromise_1.CustomPromise()),
        await this.SPe.PlaySequenceAsync(t, e))
      : this.SetLight(i);
  }
  async OnLinked() {
    var i;
    1 === ModelManager_1.ModelManager.SignalDeviceModel.ViewType
      ? (this.oga.SetUIActive(!0),
        this.GetSprite(11)?.SetUIActive(!0),
        (i = new CustomPromise_1.CustomPromise()),
        await this.SPe.PlaySequenceAsync("Activate", i),
        (this.GetExtendToggle(13).AllowEventBubbleUp = !1))
      : this.SetLight(!0);
  }
  SetLight(i) {
    this.wAe.SetUIActive(!i),
      this.BAe.SetUIActive(i),
      this.bAe.SetUIActive(!i),
      this.qAe.SetUIActive(i),
      i || this.SetFxBoost(!1);
  }
  SetFxBoost(i) {
    1 !== ModelManager_1.ModelManager.SignalDeviceModel.ViewType &&
      this.kAe.SetUIActive(i);
  }
  RotateLine(i, t = 0) {
    this.GAe.SetUIActive(i), this.NAe.SetUIActive(i);
    (i = ModelManager_1.ModelManager.SignalDeviceModel.RotateMap.get(t)),
      (t = ModelManager_1.ModelManager.SignalDeviceModel.CacheRotator);
    (t.Yaw = i + 90), this.OAe.SetUIRelativeRotation(t.ToUeRotator());
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
  (LinkingDotItem.Dia = new Map([
    [IAction_1.EPieceColorType.Blue, "SP_AnimLineBlue"],
    [IAction_1.EPieceColorType.Green, "SP_AnimLineGreen"],
    [IAction_1.EPieceColorType.Red, "SP_AnimLineRed"],
    [IAction_1.EPieceColorType.Yellow, "SP_AnimLineYellow"],
  ])),
  (LinkingDotItem.nga = new Map([
    [IAction_1.EPieceColorType.Blue, "SP_AnimDotBlue"],
    [IAction_1.EPieceColorType.Green, "SP_AnimDotGreen"],
    [IAction_1.EPieceColorType.Red, "SP_AnimDotRed"],
    [IAction_1.EPieceColorType.Yellow, "SP_AnimDotYellow"],
  ])),
  (LinkingDotItem.ColorMap = new Map([
    [IAction_1.EPieceColorType.Blue, "3B82B9FF"],
    [IAction_1.EPieceColorType.Green, "64945FFF"],
    [IAction_1.EPieceColorType.Red, "B93B3CFF"],
    [IAction_1.EPieceColorType.Yellow, "B9823BFF"],
  ])),
  (LinkingDotItem.CmColorMap = new Map([
    [IAction_1.EPieceColorType.Blue, "5CA1FF88"],
    [IAction_1.EPieceColorType.Green, "96FF5C88"],
    [IAction_1.EPieceColorType.Red, "FFA15C88"],
    [IAction_1.EPieceColorType.Yellow, "FFB85C88"],
  ])),
  (LinkingDotItem.CmAnimColorMap = new Map([
    [IAction_1.EPieceColorType.Blue, "00FBE7FF"],
    [IAction_1.EPieceColorType.Green, "DFFF55FF"],
    [IAction_1.EPieceColorType.Red, "FFA73FFF"],
    [IAction_1.EPieceColorType.Yellow, "FAE56CFF"],
  ])),
  (LinkingDotItem.FxColorMap = new Map([
    [IAction_1.EPieceColorType.Blue, "41AEFBFF"],
    [IAction_1.EPieceColorType.Green, "4F8040FF"],
    [IAction_1.EPieceColorType.Red, "F0477EFF"],
    [IAction_1.EPieceColorType.Yellow, "F8E56CFF"],
  ]));
//# sourceMappingURL=LinkingDotItem.js.map
