"use strict";
let _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SundialControlController = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const ActorSystem_1 = require("../../../Core/Actor/ActorSystem");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const Net_1 = require("../../../Core/Net/Net");
const ResourceSystem_1 = require("../../../Core/Resource/ResourceSystem");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const Vector_1 = require("../../../Core/Utils/Math/Vector");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const GlobalData_1 = require("../../GlobalData");
const ModelManager_1 = require("../../Manager/ModelManager");
const SceneInteractionLevel_1 = require("../../Render/Scene/Item/SceneInteractionLevel");
const UiControllerBase_1 = require("../../Ui/Base/UiControllerBase");
const UiManager_1 = require("../../Ui/UiManager");
const SEQ_PATH =
  "/Game/Aki/Scene/InteractionLevel/Animation/Sundial/TPrefab_SM_Sundial_Finish.TPrefab_SM_Sundial_Finish";
const leftTag = new UE.FName("Left");
const rightTag = new UE.FName("Right");
const rollTag = new UE.FName("Roll");
const decalTag = new UE.FName("Decal");
class SundialControlController extends UiControllerBase_1.UiControllerBase {
  static GenerateModel(e) {
    var t = GlobalData_1.GlobalData.World;
    let r =
      ModelManager_1.ModelManager.SundialControlModel.ModelConfig.场景交互物.AssetPathName?.toString();
    r.includes(".") && (r = r.split(".")[0]);
    const o = (0, puerts_1.$ref)(!1);
    var t = UE.LevelStreamingDynamic.LoadLevelInstance(
      t,
      r,
      Vector_1.Vector.ZeroVector,
      Rotator_1.Rotator.ZeroRotator,
      o,
    );
    (0, puerts_1.$unref)(o) &&
      t &&
      ((this.Ixe = new SceneInteractionLevel_1.SceneInteractionLevel()),
      this.Ixe.Init(
        t,
        r,
        Vector_1.Vector.ZeroVector,
        Rotator_1.Rotator.ZeroRotator,
        -1,
        0,
        () => {
          this.Txe(e);
        },
        !0,
      ));
  }
  static Txe(e) {
    this.Ixe.MainActor.K2_SetActorLocation(
      ModelManager_1.ModelManager.SundialControlModel.TargetLocation,
      !1,
      void 0,
      !1,
    ),
      this.Ixe.MainActor.K2_SetActorRotation(
        ModelManager_1.ModelManager.SundialControlModel.TargetRotation,
        !1,
      ),
      ModelManager_1.ModelManager.SundialControlModel.InitRingActors(this.Ixe),
      e(),
      this.Ixe.PlaySceneEffect(3);
  }
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnSundialRingChangeShine,
      this.Lxe,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnSundialRingSwitch,
        this.Dxe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnSundialRingChangeShine,
      this.Lxe,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnSundialRingSwitch,
        this.Dxe,
      );
  }
  static DestroyModel() {
    this.Ixe &&
      (this.Ixe.Destroy(),
      (this.Ixe = void 0),
      ModelManager_1.ModelManager.SundialControlModel.ClearCacheActor());
  }
  static SwitchCurrentRing() {
    this.Rxe ||
      ModelManager_1.ModelManager.SundialControlModel.ChangeCurrentRingIndex();
  }
  static SetOnFinishCallback(e) {
    this.Uxe = e;
  }
  static StartRotate(e) {
    this.Rxe ||
      ((this.Rxe = !0),
      (this.Axe = e),
      ModelManager_1.ModelManager.SundialControlModel.SimpleAddCurRingSocket());
  }
  static OnTick(e) {
    this.Rxe &&
      ModelManager_1.ModelManager.SundialControlModel.RotateCurrentRing(e) &&
      ((this.Rxe = !1), this.Axe) &&
      (ModelManager_1.ModelManager.SundialControlModel.UpdateTips(),
      this.Axe(),
      (this.Axe = void 0));
  }
  static ResetAll() {
    ModelManager_1.ModelManager.SundialControlModel.ResetAll();
  }
  static PlayFinishAnimation() {
    this.Uxe && this.Uxe(),
      this.Ixe.EndSceneEffect(3),
      this.Ixe.EndSceneEffect(4),
      this.Ixe.PlaySceneEffect(2);
    const t = ActorSystem_1.ActorSystem.Get(
      UE.LevelSequenceActor.StaticClass(),
      MathUtils_1.MathUtils.DefaultTransform,
      void 0,
      !1,
    );
    ResourceSystem_1.ResourceSystem.LoadAsync(
      SEQ_PATH,
      UE.LevelSequence,
      (e) => {
        e?.IsValid()
          ? (t.SetActorTickEnabled(!0),
            t.SetSequence(e),
            (e = SundialControlController.Ixe.GetActorByKey("Left")),
            t.AddBindingByTag(leftTag, e),
            (e = SundialControlController.Ixe.GetActorByKey("Right")),
            t.AddBindingByTag(rightTag, e),
            (e = SundialControlController.Ixe.GetActorByKey("Roll")),
            t.AddBindingByTag(rollTag, e),
            (e = SundialControlController.Ixe.GetActorByKey("Decal")),
            t.AddBindingByTag(decalTag, e),
            t.SequencePlayer.SetPlayRate(1),
            t.SequencePlayer.OnFinished.Add(() => {
              TimerSystem_1.TimerSystem.Delay(() => {
                SundialControlController.SDe(),
                  ActorSystem_1.ActorSystem.Put(t);
              }, 500);
            }),
            t.SequencePlayer.Play())
          : SundialControlController.SDe();
      },
    );
  }
  static SDe(e = "MainQuest") {
    const t = Protocol_1.Aki.Protocol.UKn.create();
    (t.ykn = e),
      (t.Ikn = Protocol_1.Aki.Protocol.dqs.Proto_SundialPuzzle),
      Net_1.Net.Call(19172, t, (e) => {
        e.uvs === Protocol_1.Aki.Protocol.lkn.Sys &&
          UiManager_1.UiManager.CloseView("SundialControlView");
      });
  }
  static UpdateViewTips() {
    ModelManager_1.ModelManager.SundialControlModel.UpdateTips();
  }
  static GetMainActor() {
    return this.Ixe?.MainActor;
  }
}
(exports.SundialControlController = SundialControlController),
  ((_a = SundialControlController).Ixe = void 0),
  (SundialControlController.Rxe = !1),
  (SundialControlController.Axe = void 0),
  (SundialControlController.Uxe = void 0),
  (SundialControlController.Lxe = (e, t) => {
    let r = void 0;
    switch (e) {
      case 0:
        r = 0;
        break;
      case 1:
        r = 1;
    }
    void 0 !== r && (t ? _a.Ixe.PlaySceneEffect(r) : _a.Ixe.EndSceneEffect(r));
  }),
  (SundialControlController.Dxe = (e) => {
    _a.Ixe.EndSceneEffect(e === 0 ? 4 : 3),
      _a.Ixe.PlaySceneEffect(e === 0 ? 3 : 4);
  });
// # sourceMappingURL=SundialControlController.js.map
