"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.StalkAlertMark = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  AudioController_1 = require("../../../../Core/Audio/AudioController"),
  Log_1 = require("../../../../Core/Common/Log"),
  ResourceSystem_1 = require("../../../../Core/Resource/ResourceSystem"),
  Rotator_1 = require("../../../../Core/Utils/Math/Rotator"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  AiAlertClass_1 = require("../../../AI/Controller/AiAlertClass"),
  Global_1 = require("../../../Global"),
  GlobalData_1 = require("../../../GlobalData"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  ActorUtils_1 = require("../../../Utils/ActorUtils"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  EntityHeadIconItem_1 = require("./EntityHeadIconItem"),
  CENTER_Y = 62.5,
  MAX_A = 1176,
  MARGIN_A = 1008,
  MAX_B = 712.5,
  MARGIN_B = 495,
  center = Vector2D_1.Vector2D.Create(0, CENTER_Y),
  ADD_AUDIO_ID = "play_ui_fb_warn";
class StalkAlertMark extends EntityHeadIconItem_1.EntityHeadIconItem {
  constructor(t, i) {
    super(),
      (this.E$e = void 0),
      (this.eCt = void 0),
      (this.tCt = void 0),
      (this.iCt = void 0),
      (this.S$e = (0, puerts_1.$ref)(void 0)),
      (this.AYe = Vector2D_1.Vector2D.Create()),
      (this.RYe = (0, puerts_1.$ref)(0)),
      (this.PYe = Vector2D_1.Vector2D.Create()),
      (this.A$e = Vector2D_1.Vector2D.Create(1, -1)),
      (this.oCt = Vector_1.Vector.Create()),
      (this.rCt = Vector_1.Vector.Create()),
      (this.nCt = Vector_1.Vector.Create()),
      (this.DYe = Vector_1.Vector.Create()),
      (this.sCt = (0, puerts_1.$ref)(0)),
      (this.aCt = !1),
      (this.SPe = void 0),
      (this.bre = void 0),
      (this.y$e = 0),
      (this.I$e = 0),
      (this.hCt = 0),
      (this.lCt = void 0),
      (this.bYe = (t) => {
        var i = 7.776280778151;
        return (
          367.327774667328 /
            (1 + Math.pow(t / 537.430940553175, 1.11393060779131)) +
          i
        );
      }),
      GlobalData_1.GlobalData.World &&
        (this.CreateThenShowByResourceIdAsync("UiItem_Alert", t),
        (this.E$e = i),
        (t = UiLayer_1.UiLayer.UiRootItem),
        (this.y$e = Math.min(MAX_A, ((t?.GetWidth() ?? 0) - MARGIN_A) / 2)),
        (this.I$e = Math.min(MAX_B, ((t?.GetHeight() ?? 0) - MARGIN_B) / 2)));
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    (this.eCt = this.GetSprite(0)),
      (this.tCt = this.GetSprite(1)),
      (this.iCt = this.GetItem(2)),
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem)),
      this.SetActive(!1);
  }
  Update() {
    GlobalData_1.GlobalData.World &&
      this.RootItem &&
      (this.qYe(), this.aCt || this.N$e(), super.Update());
  }
  qYe() {
    var t,
      i,
      e,
      s = UiLayer_1.UiLayer.UiRootItem,
      r = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation();
    r &&
      ((e = Global_1.Global.CharacterController),
      this.oCt.DeepCopy(this.E$e.K2_GetActorLocation()),
      (t = UE.GameplayStatics.ProjectWorldToScreen(
        e,
        this.oCt.ToUeVector(),
        this.S$e,
      )) ||
        (this.oCt.Subtraction(r, this.rCt),
        (i = Global_1.Global.CharacterCameraManager),
        Rotator_1.Rotator.Create(i.GetCameraRotation()).Vector(this.nCt),
        (i = UE.KismetMathLibrary.ProjectVectorOnToVector(
          this.rCt.ToUeVector(),
          this.nCt.ToUeVector(),
        ).op_Multiply(2)),
        this.DYe.Set(i.X, i.Y, i.Z),
        this.rCt.SubtractionEqual(this.DYe),
        r.Addition(this.rCt, this.oCt),
        UE.GameplayStatics.ProjectWorldToScreen(
          e,
          this.oCt.ToUeVector(),
          this.S$e,
        )),
      (i = (0, puerts_1.$unref)(this.S$e)),
      e.GetViewportSize(this.RYe, this.sCt),
      (e = (0, puerts_1.$unref)(this.RYe)),
      this.AYe.Set(i.X, i.Y),
      this.PYe.Set(0.5 * s.GetWidth(), 0.5 * s.GetHeight()),
      this.AYe.MultiplyEqual(s.GetWidth() / e)
        .SubtractionEqual(this.PYe)
        .MultiplyEqual(this.A$e),
      (i = this.H$e(this.AYe, t)),
      (s = this.AYe.AdditionEqual(center)),
      i &&
        ((e = Vector_1.Vector.Distance(r, this.oCt)),
        s.AdditionEqual(Vector2D_1.Vector2D.Create(0, this.bYe(e)))),
      this.RootItem.SetAnchorOffset(s.ToUeVector2D()),
      this.iCt?.SetUIActive(!i),
      this.iCt?.SetUIRelativeRotation(
        new UE.Rotator(0, (180 * Math.atan2(s.Y, s.X)) / Math.PI, 0),
      ));
  }
  H$e(t, i) {
    var e = t.X,
      s = t.Y,
      r = this.y$e,
      h = this.I$e;
    return (
      !!(i && (e * e) / (r * r) + (s * s) / (h * h) <= 1) ||
      ((i = (r * h) / Math.sqrt(h * h * e * e + r * r * s * s)),
      t.MultiplyEqual(i),
      !1)
    );
  }
  N$e() {
    var t = this.AiComponent?.AiController.AiAlert.AlertValue ?? 0;
    this.eCt.SetFillAmount(
      MathUtils_1.MathUtils.Clamp(t, 0, AiAlertClass_1.MAX_ALERT) /
        AiAlertClass_1.MAX_ALERT,
    ),
      0 === this.hCt &&
        0 < t &&
        (void 0 === this.lCt &&
          (this.lCt =
            ConfigManager_1.ConfigManager.AudioConfig?.GetAudioPath(
              ADD_AUDIO_ID,
            )?.Path),
        this.lCt) &&
        AudioController_1.AudioController.PostEvent(this.lCt, void 0),
      (this.hCt = t);
  }
  SetAlertIcon(t) {
    ResourceSystem_1.ResourceSystem.LoadAsync(
      t,
      UE.LGUISpriteData_BaseObject,
      (t) => {
        t &&
          t.IsValid() &&
          this &&
          this.RootItem?.IsValid() &&
          this.tCt?.IsValid() &&
          this.tCt.SetSprite(t);
      },
    );
  }
  StopUpdateAlertValue() {
    this.aCt = !0;
  }
  ActivateAlertEffect() {
    this.SPe?.PlaySequencePurely("Show"), this.qYe();
  }
  CheckShowUiCondition() {
    var t;
    return this.AiComponent
      ? ((t =
          this.E$e.WasRecentlyRenderedOnScreen() ||
          this.AiComponent.AiController.AiAlert.CheckInAlertRange() ||
          0 < this.AiComponent.AiController.AiAlert.AlertValue) &&
          !this.GetActive() &&
          (this.SetActive(!0), this.SPe?.PlaySequencePurely("Start")),
        !t && this.GetActive() && this.SetActive(!1),
        t)
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("AI", 43, "警戒NPC不能正常获取AiComponent"),
        !1);
  }
  get AiComponent() {
    var t;
    return (
      this.bre ||
        ((t = ActorUtils_1.ActorUtils.GetEntityByActor(this.E$e)),
        (this.bre = t.Entity.GetComponent(40))),
      this.bre
    );
  }
}
exports.StalkAlertMark = StalkAlertMark;
//# sourceMappingURL=StalkAlertMark.js.map
