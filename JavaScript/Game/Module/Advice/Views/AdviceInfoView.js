"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.AdviceInfoView = void 0);
const UE = require("ue"),
  Protocol_1 = require("../../../../Core/Define/Net/Protocol"),
  EntitySystem_1 = require("../../../../Core/Entity/EntitySystem"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector_1 = require("../../../../Core/Utils/Math/Vector"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  Global_1 = require("../../../Global"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiConfig_1 = require("../../../Ui/Define/UiConfig"),
  UiLayerType_1 = require("../../../Ui/Define/UiLayerType"),
  AdviceController_1 = require("../AdviceController"),
  CHECKTIMEGAP = 500,
  ROLEMOVERAGE = 3;
class AdviceInfoView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.IRe = void 0),
      (this.b9e = void 0),
      (this.f7e = void 0),
      (this.p7e = !1),
      (this.gHe = void 0),
      (this.fHe = () => {
        this.G7e();
      }),
      (this.v7e = (e, t) => {
        (this.p7e = t) && this.CloseMe();
      }),
      (this.pHe = () => !0),
      (this.vHe = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId(),
          e = EntitySystem_1.EntitySystem.Get(e)
            ?.GetComponent(0)
            .GetCreatureDataId(),
          t =
            ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData()
              .GetAdviceData()
              .GetAdviceBigId();
        ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds().includes(t) &&
          ((e = MathUtils_1.MathUtils.NumberToLong(e)),
          this.GetExtendToggle(6).SetToggleStateForce(0, !1),
          AdviceController_1.AdviceController.RequestVote(
            e,
            t,
            Protocol_1.Aki.Protocol.Uks.Proto_Cancel,
          ));
      }),
      (this.MHe = () => {
        var e = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId(),
          e = EntitySystem_1.EntitySystem.Get(e)
            ?.GetComponent(0)
            .GetCreatureDataId(),
          t =
            ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData()
              .GetAdviceData()
              .GetAdviceBigId(),
          e = MathUtils_1.MathUtils.NumberToLong(e);
        this.GetExtendToggle(7).SetToggleStateForce(0, !1),
          ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds().includes(t)
            ? AdviceController_1.AdviceController.RequestVote(
                e,
                t,
                Protocol_1.Aki.Protocol.Uks.Proto_Cancel,
              )
            : AdviceController_1.AdviceController.RequestVote(
                e,
                t,
                Protocol_1.Aki.Protocol.Uks.Proto_Up,
              );
      }),
      (this.EHe = () => {
        this.SHe();
      }),
      (this.yHe = () => {
        this.IHe(), this.THe();
      }),
      (this.LHe = () => {
        this.DHe(), this.RHe(), this.UHe();
      }),
      (this.AHe = (e) => {
        UiConfig_1.UiConfig.TryGetViewInfo(e.Info.Name).Type ===
          UiLayerType_1.ELayerType.Normal && this.CloseMe();
      }),
      (this.PHe = () => {
        this.CloseMe();
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UITexture],
      [2, UE.UIText],
      [3, UE.UIVerticalLayout],
      [4, UE.UIText],
      [5, UE.UIText],
      [6, UE.UIExtendToggle],
      [7, UE.UIExtendToggle],
      [8, UE.UIText],
    ]),
      (this.BtnBindInfo = [
        [6, this.vHe],
        [7, this.MHe],
      ]);
  }
  OnStart() {
    this.IRe = void 0;
    this.GetExtendToggle(6).SetToggleGroup(void 0);
    var e = this.GetExtendToggle(7);
    e.CanExecuteChange.Unbind(),
      e.CanExecuteChange.Bind(this.pHe),
      e.SetToggleGroup(void 0),
      this.GetText(8).SetUIActive(!1),
      this.G7e();
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnAdviceEntityNotify,
      this.yHe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnAdviceVoteNotify,
        this.yHe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.CreateViewInstance,
        this.AHe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.UiSceneStartLoad,
        this.PHe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnChangeRole,
        this.fHe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.RefreshAdviceInfoView,
        this.EHe,
      );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnChangeRole,
      this.fHe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAdviceEntityNotify,
        this.yHe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnAdviceVoteNotify,
        this.yHe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.CreateViewInstance,
        this.AHe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.UiSceneStartLoad,
        this.PHe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.RefreshAdviceInfoView,
        this.EHe,
      );
  }
  G7e() {
    var e,
      t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity;
    t.Valid &&
      ((e = t.Entity.GetComponent(188)),
      (this.p7e = e.HasTag(1996802261)),
      this.N7e(),
      this.p7e ? this.CloseMe() : this.O7e(t));
  }
  O7e(e) {
    e = e.Entity.GetComponent(188);
    this.f7e = e.ListenForTagAddOrRemove(1996802261, this.v7e);
  }
  N7e() {
    this.f7e?.EndTask(), (this.f7e = void 0);
  }
  IHe() {
    var e = ModelManager_1.ModelManager.AdviceModel.GetUpVoteIds(),
      t = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData()
        .GetAdviceData()
        .GetAdviceBigId();
    e.includes(t)
      ? this.GetExtendToggle(7).SetToggleStateForce(1, !1)
      : this.GetExtendToggle(7).SetToggleStateForce(0, !1);
  }
  OnAfterShow() {
    this.SHe();
  }
  SHe() {
    this.P3e(),
      (this.gHe = void 0),
      ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(
        !0,
      ),
      (this.b9e =
        ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetAdviceData()),
      this.Og();
  }
  P3e() {
    this.xHe(),
      void 0 === this.IRe &&
        (this.IRe = TimerSystem_1.TimerSystem.Forever(this.LHe, CHECKTIMEGAP));
  }
  xHe() {
    void 0 !== this.IRe &&
      (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0));
  }
  DHe() {
    var e;
    this.gHe ||
      ((e = Vector_1.Vector.Create()).DeepCopy(
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy,
      ),
      (this.gHe = e));
  }
  Og() {
    this.THe(), this.T2e(), this.wHe(), this.IHe(), this.K7e();
  }
  THe() {
    var e = this.b9e.GetVote(),
      e =
        (this.GetText(5).SetText(e.toString()),
        e >= ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceHighNum()
          ? "F9D751"
          : "FFFFFF"),
      e = UE.Color.FromHex(e);
    this.GetText(5).SetColor(e);
  }
  T2e() {
    var e = this.b9e.GetAdviceShowText();
    this.GetText(4).SetText(e);
  }
  K7e() {
    var e =
      ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityAdviceData().GetPlayerName();
    this.GetText(2).SetText(e);
  }
  wHe() {
    var e;
    0 < this.b9e.GetAdviceExpressionId()
      ? (this.GetTexture(1).SetUIActive(!0),
        (e = ConfigManager_1.ConfigManager.ChatConfig.GetExpressionConfig(
          this.b9e.GetAdviceExpressionId(),
        )),
        this.SetTextureByPath(e.ExpressionTexturePath, this.GetTexture(1)))
      : this.GetTexture(1).SetUIActive(!1);
  }
  UHe() {
    var e;
    ModelManager_1.ModelManager.InteractionModel.IsHideInteractHint &&
      ((e =
        Global_1.Global.BaseCharacter.CharacterActorComponent
          .ActorLocationProxy),
      (this.BHe(e.X, this.gHe.X, ROLEMOVERAGE) &&
        this.BHe(e.Y, this.gHe.Y, ROLEMOVERAGE) &&
        this.BHe(e.Z, this.gHe.Z, ROLEMOVERAGE)) ||
        ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(
          !1,
        ));
  }
  BHe(e, t, i) {
    e = Math.ceil(e) - Math.ceil(t);
    return e < i && -1 * i < e;
  }
  RHe() {
    var e,
      t,
      i = ModelManager_1.ModelManager.AdviceModel.GetCurrentEntityId(),
      i = EntitySystem_1.EntitySystem.Get(i);
    (!i ||
      ((t = Global_1.Global.BaseCharacter),
      (e = i.GetComponent(1)?.Owner),
      t &&
        i &&
        e &&
        ((i = e.K2_GetActorLocation()),
        (e = t.K2_GetActorLocation()),
        (t = UE.KismetMathLibrary.Vector_Distance(i, e)),
        ConfigManager_1.ConfigManager.AdviceConfig.GetAdviceViewCloseDistance() <
          t))) &&
      this.CloseMe();
  }
  OnBeforeDestroy() {
    this.xHe(),
      this.N7e(),
      ModelManager_1.ModelManager.InteractionModel.SetInteractionHintDisable(
        !1,
      );
  }
}
exports.AdviceInfoView = AdviceInfoView;
//# sourceMappingURL=AdviceInfoView.js.map
