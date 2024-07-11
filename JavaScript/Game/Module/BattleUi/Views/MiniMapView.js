"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MiniMapView = void 0);
const UE = require("ue"),
  Stats_1 = require("../../../../Core/Common/Stats"),
  CommonParamById_1 = require("../../../../Core/Define/ConfigCommon/CommonParamById"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  Vector2D_1 = require("../../../../Core/Utils/Math/Vector2D"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  GeneralLogicTreeUtil_1 = require("../../GeneralLogicTree/GeneralLogicTreeUtil"),
  MapDefine_1 = require("../../Map/MapDefine"),
  MapUtil_1 = require("../../Map/MapUtil"),
  MiniMap_1 = require("../../Map/View/BaseMap/MiniMap"),
  WorldMapController_1 = require("../../WorldMap/WorldMapController"),
  BattleVisibleChildView_1 = require("./BattleChildView/BattleVisibleChildView"),
  UPDATE_INTERVAL = 100;
class MiniMapView extends BattleVisibleChildView_1.BattleVisibleChildView {
  constructor() {
    super(...arguments),
      (this.RealMinimapScale = 0),
      (this.Nut = void 0),
      (this.Out = !1),
      (this.IRe = void 0),
      (this.cie = new UE.Rotator(0, 0, 0)),
      (this.kut = void 0),
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
          (this.cie.Yaw = t),
          e.SetUIRelativeRotation(this.cie),
          (t = -(
            ModelManager_1.ModelManager.CameraModel.CameraRotator.Yaw + 90
          )),
          (this.cie.Yaw = t),
          i.SetUIRelativeRotation(this.cie));
      }),
      (this.Vut = () => {
        this.jut();
      });
  }
  Initialize(e) {
    super.Initialize(e), this.InitChildType(4), (this.Out = !1);
  }
  async InitializeAsync() {
    var e,
      i = ConfigManager_1.ConfigManager.WorldMapConfig.GetAkiMapConfig(
        MapDefine_1.BIG_WORLD_MAP_ID,
      );
    i &&
      ((e = this.GetItem(0)),
      (this.kut = this.GetItem(4)),
      (i = i ? i.LittleMapDefaultScale / 100 : 1),
      (this.Nut = new MiniMap_1.MiniMap(
        1,
        this.kut,
        i,
        CommonParamById_1.configCommonParamById.GetFloatConfig(
          "MiniMap_Mark_Scale",
        ),
      )),
      await this.Nut.CreateThenShowByResourceIdAsync(
        "UiItem_MiniMap_Prefab",
        e,
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
      (this.IRe = TimerSystem_1.TimerSystem.Forever(
        this.Vut,
        UPDATE_INTERVAL,
      )));
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
      [4, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[3, this.Fut]]);
  }
  jut() {
    var e, i, t;
    this.IsUiActiveInHierarchy() &&
      (e = GeneralLogicTreeUtil_1.GeneralLogicTreeUtil.GetPlayerLocation()) &&
      ((i = Vector2D_1.Vector2D.Create(e.X, e.Y)),
      (i = MapUtil_1.MapUtil.WorldPosition2UiPosition2D(i, i))
        .MultiplyEqual(this.RealMinimapScale)
        .UnaryNegation(i),
      this.Nut.GetRootItem().SetAnchorOffset(i.ToUeVector2D(!0)),
      this.Nut.UpdateMinimapTiles(e),
      (i = Vector2D_1.Vector2D.Create(
        this.Nut.GetRootItem().GetAnchorOffset(),
      )),
      (t = this.RealMinimapScale),
      this.Nut.MiniMapUpdateMarkItems(i, t, e),
      this.Wut());
  }
  RefreshOnPlatformChanged() {
    EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.ModelReady);
  }
  SetRoguelikeVisible(e) {
    this.SetVisible(1, e);
  }
  Wut() {
    var e = this.Nut.GetRootItem(),
      i = e.GetAnchorOffset(),
      i = (this.kut.SetAnchorOffset(i), e.RelativeScale3D);
    this.kut.SetRelativeScale3D(i),
      this.kut.SetWidth(e.Width),
      this.kut.SetHeight(e.Height);
  }
}
(exports.MiniMapView = MiniMapView).Hut = void 0;
//# sourceMappingURL=MiniMapView.js.map
