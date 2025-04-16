"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MiniMapView = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapUtil_1 = require("../../Map/MapUtil"),
  MiniMap_1 = require("../../Map/View/BaseMap/MiniMap"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView"),
  UPDATE_INTERVAL = 100,
  PLAYER_ROTATE_UPDATE_THRESHOLD = 10;
class MiniMapView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.RealMinimapScale = 0),
      (this.Nut = void 0),
      (this.Out = !1),
      (this.IRe = void 0),
      (this.aN_ = new UE.Rotator(0, 0, 0)),
      (this.hN_ = new UE.Rotator(0, 0, 0)),
      (this.Fut = () => {
        WorldMapController_1.WorldMapController.OpenView(1, !0);
      }),
      (this.RefreshShow = () => {
        var e, i, t;
        this.Out &&
          (t = ModelManager_1.ModelManager.SceneTeamModel.GetCurrentEntity)
            ?.Valid &&
          (t = t.Entity.GetComponent(3)) &&
          ((e = this.GetItem(1)),
          (i = this.GetSprite(2)),
          (t = -(t.ActorRotationProxy.Yaw + 90)),
          Math.abs(this.hN_.Yaw - t) > PLAYER_ROTATE_UPDATE_THRESHOLD &&
            ((this.hN_.Yaw = t), e.SetUIRelativeRotation(this.hN_)),
          (t = ModelManager_1.ModelManager.CameraModel.CameraRotator.Yaw),
          (this.aN_.Yaw = this.lN_(-(t + 90))),
          i.SetUIRelativeRotation(this.aN_));
      }),
      (this.Vut = () => {
        MiniMapView.Hut.Start(), this.jut(), MiniMapView.Hut.Stop();
      });
  }
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), (this.Out = !1);
  }
  async InitializeAsync() {
    var e = ModelManager_1.ModelManager.MapModel.CurrentMapConfigId,
      e = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(e, !1),
      i = this.GetItem(0),
      e = e ? e.LittleMapDefaultScale / 100 : 1,
      t = ModelManager_1.ModelManager.CreatureModel.GetInstanceId();
    (this.Nut = new MiniMap_1.MiniMap(
      1,
      t,
      e,
      CommonParamById_1.configCommonParamById.GetFloatConfig(
        "MiniMap_Mark_Scale",
      ),
    )),
      await this.Nut.CreateThenShowByResourceIdAsync(
        "UiItem_MiniMap_Prefab",
        i,
        !0,
      ),
      (this.RealMinimapScale =
        this.Nut.GetRootActor().GetActorRelativeScale3D().X),
      this.Nut.GetRootItem().SetUIActive(
        ConfigManager_1.ConfigManager.InstanceDungeonConfig.IsMiniMapShow(
          ModelManager_1.ModelManager.CreatureModel.GetInstanceId(),
        ),
      ),
      (this.Out = !0),
      (this.IRe = TimerSystem_1.TimerSystem.Forever(this.Vut, UPDATE_INTERVAL));
  }
  Reset() {
    this.Nut.Destroy(),
      this.IRe &&
        (TimerSystem_1.TimerSystem.Remove(this.IRe), (this.IRe = void 0)),
      super.Reset();
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UISprite],
      [3, UE.UIButtonComponent],
    ]),
      (this.BtnBindInfo = [[3, this.Fut]]);
  }
  lN_(e) {
    if (
      0 === ModelManager_1.ModelManager.CameraModel.CameraMode &&
      ModelManager_1.ModelManager.CameraModel.FightCamera &&
      ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
    ) {
      var i =
          ModelManager_1.ModelManager.CameraModel.FightCamera.LogicComponent
            .CurrentCamera,
        t = i.YawLimitMin,
        t = (i.YawLimitMax - t) % 360;
      if (
        MathUtils_1.MathUtils.IsNearlyZero(t) ||
        MathUtils_1.MathUtils.IsNearlyEqual(t, 360)
      )
        return MathUtils_1.MathUtils.Clamp(
          MathUtils_1.MathUtils.WrapAngle(e),
          i.WorldYawMin,
          i.WorldYawMax,
        );
    }
    return e;
  }
  jut() {
    var e, i, t;
    this.IsUiActiveInHierarchy() &&
      (e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()) &&
      (this.Nut.Tick(),
      (i = Vector2D_1.Vector2D.Create(e.X, e.Y)),
      (i = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(i, i))
        .MultiplyEqual(this.RealMinimapScale)
        .UnaryNegation(i),
      this.Nut.GetRootItem().SetAnchorOffset(i.ToUeVector2D(!0)),
      this.Nut.UpdateMinimapTiles(e),
      (i = Vector2D_1.Vector2D.Create(
        this.Nut.GetRootItem().GetAnchorOffset(),
      )),
      (t = this.RealMinimapScale),
      this.Nut.MiniMapUpdateMarkItems(i, t, e));
  }
  RefreshOnPlatformChanged() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ModelReady);
  }
  SetRoguelikeVisible(e) {
    this.SetVisible(1, e);
  }
  SetBattleLinkVisible(e) {
    this.SetVisible(2, e);
  }
}
(exports.MiniMapView = MiniMapView).Hut = Stats_1.Stat.Create(
  "MiniMapView.UpdateMarkItems",
);
//# sourceMappingURL=MiniMapView.js.map
