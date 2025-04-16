"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotKeyItemFactory = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  BackComponent_1 = require("../UIComponent/BackComponent"),
  BagTagNavigationNextComponent_1 = require("../UIComponent/BagTagNavigationNextComponent"),
  BattleViewCameraComponent_1 = require("../UIComponent/BattleViewCameraComponent"),
  ClickBtnComponent_1 = require("../UIComponent/ClickBtnComponent"),
  ClickBtnInsideComponent_1 = require("../UIComponent/ClickBtnInsideComponent"),
  ClickBtnInsideReleaseComponent_1 = require("../UIComponent/ClickBtnInsideReleaseComponent"),
  ClickBtnReleaseComponent_1 = require("../UIComponent/ClickBtnReleaseComponent"),
  CommonConsumeNavigationNext_1 = require("../UIComponent/CommonConsumeNavigationNext"),
  DraggableComponent_1 = require("../UIComponent/DraggableComponent"),
  DraggableInsideComponent_1 = require("../UIComponent/DraggableInsideComponent"),
  FollowItemComponent_1 = require("../UIComponent/FollowItemComponent"),
  GamepadInteractComponent_1 = require("../UIComponent/GamepadInteractComponent"),
  InstanceDungeonWorldClickComponent_1 = require("../UIComponent/InstanceDungeonWorldClickComponent"),
  InteractComponent_1 = require("../UIComponent/InteractComponent"),
  InteractReleaseComponent_1 = require("../UIComponent/InteractReleaseComponent"),
  InteractWheelComponent_1 = require("../UIComponent/InteractWheelComponent"),
  LongPressComponent_1 = require("../UIComponent/LongPressComponent"),
  LongPressInsideComponent_1 = require("../UIComponent/LongPressInsideComponent"),
  LongTimeToTriggerComponent_1 = require("../UIComponent/LongTimeToTriggerComponent"),
  MapDragComponent_1 = require("../UIComponent/MapDragComponent"),
  MapInteractComponent_1 = require("../UIComponent/MapInteractComponent"),
  MapRogueQuicklyMoveComponent_1 = require("../UIComponent/MapRogueQuicklyMoveComponent"),
  MapTravelTaskNavigationNextComponent_1 = require("../UIComponent/MapTravelTaskNavigationNextComponent"),
  MarkBookComponent_1 = require("../UIComponent/MarkBookComponent"),
  MaskComponent_1 = require("../UIComponent/MaskComponent"),
  NavigationGroupComponent_1 = require("../UIComponent/NavigationGroupComponent"),
  OpenRouletteSetViewComponent_1 = require("../UIComponent/OpenRouletteSetViewComponent"),
  PhotographSetVisibleComponent_1 = require("../UIComponent/PhotographSetVisibleComponent"),
  PlotInteractComponent_1 = require("../UIComponent/PlotInteractComponent"),
  RewardTakeComponent_1 = require("../UIComponent/RewardTakeComponent"),
  RoleInteractComponent_1 = require("../UIComponent/RoleInteractComponent"),
  RouletteNavigationComponent_1 = require("../UIComponent/RouletteNavigationComponent"),
  ScrollBarComponent_1 = require("../UIComponent/ScrollBarComponent"),
  ScrollBarInsideComponent_1 = require("../UIComponent/ScrollBarInsideComponent"),
  ScrollSwitchComponent_1 = require("../UIComponent/ScrollSwitchComponent"),
  ShipTowerAutoLeftTeamComponent_1 = require("../UIComponent/ShipTowerAutoLeftTeamComponent"),
  ShipTowerSwitchRightTeamComponent_1 = require("../UIComponent/ShipTowerSwitchRightTeamComponent"),
  ShowOnlyComponent_1 = require("../UIComponent/ShowOnlyComponent"),
  SliderComponent_1 = require("../UIComponent/SliderComponent"),
  SliderInsideComponent_1 = require("../UIComponent/SliderInsideComponent"),
  TermExplanationComponent_1 = require("../UIComponent/TermExplanationComponent"),
  TextInputComponent_1 = require("../UIComponent/TextInputComponent"),
  TextInputInsideComponent_1 = require("../UIComponent/TextInputInsideComponent"),
  WorldMapShowOnlyComponent_1 = require("../UIComponent/WorldMapShowOnlyComponent"),
  MultipleHotKeyItem_1 = require("./MultipleHotKeyItem"),
  SingleHotKeyItem_1 = require("./SingleHotKeyItem");
class HotKeyItemFactory {
  static async CreateHotKeyItem(e, o, n) {
    switch (o) {
      case "SingleHotKey":
        return HotKeyItemFactory.Bqe(e, SingleHotKeyItem_1.SingleHotKeyItem, n);
      case "MultipleHotKey":
        return HotKeyItemFactory.Bqe(
          e,
          MultipleHotKeyItem_1.MultipleHotKeyItem,
          n,
        );
      default:
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            10,
            "导航快捷键的参数配置错误!",
            ["Mode", o],
            ["index", n],
          )
        );
    }
  }
  static async Bqe(e, o, n) {
    o = new o();
    return await o.CreateThenShowByActorAsync(e, n), o;
  }
  static async CreateHotKeyComponent(e, o, n) {
    var t =
      ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(o);
    if (t) {
      var a = this.Aqo.get(t.Type);
      if (a)
        return (
          (a = this.Pqo(a, o)).SetHotKeyFunctionType(t.Type),
          await a.CreateThenShowByActorAsync(e),
          a.SetHotKeyType(n),
          a.InitHotKeyLogicMode(),
          a
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          10,
          "热键组件类型不存在!代码未进行注册",
          ["type", t.Type],
        );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiNavigation", 10, "导航组中单个配置找不到", [
          "hotKeyMapId",
          o,
        ]);
  }
  static Pqo(e, o) {
    return new e(o);
  }
}
(exports.HotKeyItemFactory = HotKeyItemFactory).Aqo = new Map([
  ["MarkBookNext", MarkBookComponent_1.MarkBookNextComponent],
  ["MarkBookPrev", MarkBookComponent_1.MarkBookPrevComponent],
  ["NavigationNext", NavigationGroupComponent_1.NavigationGroupNextComponent],
  [
    "NavigationUpNext",
    NavigationGroupComponent_1.NavigationGroupUpNextComponent,
  ],
  [
    "NavigationDownNext",
    NavigationGroupComponent_1.NavigationGroupDownNextComponent,
  ],
  ["NavigationPrev", NavigationGroupComponent_1.NavigationGroupPrevComponent],
  [
    "NavigationInside",
    NavigationGroupComponent_1.NavigationGroupInsideComponent,
  ],
  ["Back", BackComponent_1.BackComponent],
  ["Interact", InteractComponent_1.InteractComponent],
  ["ClickButton", ClickBtnComponent_1.ClickBtnComponent],
  ["ClickButtonInside", ClickBtnInsideComponent_1.ClickBtnInsideComponent],
  ["ScrollBar", ScrollBarComponent_1.ScrollBarComponent],
  ["ScrollBarInside", ScrollBarInsideComponent_1.ScrollBarInsideComponent],
  ["ScrollSwitch", ScrollSwitchComponent_1.ScrollSwitchComponent],
  ["InteractRelease", InteractReleaseComponent_1.InteractReleaseComponent],
  ["ClickButtonRelease", ClickBtnReleaseComponent_1.ClickBtnReleaseComponent],
  [
    "ClickButtonInsideRelease",
    ClickBtnInsideReleaseComponent_1.ClickBtnInsideReleaseComponent,
  ],
  ["LongPress", LongPressComponent_1.LongPressComponent],
  ["LongPressInside", LongPressInsideComponent_1.LongPressInsideComponent],
  ["InteractWheel", InteractWheelComponent_1.InteractWheelComponent],
  ["SliderIncrease", SliderComponent_1.SliderIncreaseComponent],
  ["SliderReduce", SliderComponent_1.SliderReduceComponent],
  [
    "SliderIncreaseInside",
    SliderInsideComponent_1.SliderIncreaseInsideComponent,
  ],
  ["SliderReduceInside", SliderInsideComponent_1.SliderReduceInsideComponent],
  ["SliderIncreaseReverse", SliderComponent_1.SliderIncreaseReverseComponent],
  ["SliderReduceReverse", SliderComponent_1.SliderReduceReverseComponent],
  [
    "LongTimeToTrigger",
    LongTimeToTriggerComponent_1.LongTimeToTriggerComponent,
  ],
  ["TextInput", TextInputComponent_1.TextInputComponent],
  ["TextInputInside", TextInputInsideComponent_1.TextInputInsideComponent],
  ["DraggablePrev", DraggableComponent_1.DraggablePrevComponent],
  ["DraggableNext", DraggableComponent_1.DraggableNextComponent],
  [
    "DraggablePrevInside",
    DraggableInsideComponent_1.DraggablePrevInsideComponent,
  ],
  [
    "DraggableNextInside",
    DraggableInsideComponent_1.DraggableNextInsideComponent,
  ],
  ["Mask", MaskComponent_1.MaskComponent],
  ["ShowOnly", ShowOnlyComponent_1.ShowOnlyComponent],
  ["WorldMapShowOnly", WorldMapShowOnlyComponent_1.WorldMapShowOnlyComponent],
  ["FollowItem", FollowItemComponent_1.FollowItemComponent],
  [
    "BagTagNavigationNext",
    BagTagNavigationNextComponent_1.BagTagNavigationNextComponent,
  ],
  [
    "CommonConsumeNavigationNext",
    CommonConsumeNavigationNext_1.CommonConsumeNavigationNext,
  ],
  ["BattleViewCamera", BattleViewCameraComponent_1.BattleViewCameraComponent],
  [
    "RouletteNavigation",
    RouletteNavigationComponent_1.RouletteNavigationComponent,
  ],
  [
    "SettingSliderIncreaseInside",
    SliderInsideComponent_1.SettingSliderIncreaseInsideComponent,
  ],
  [
    "SettingSliderReduceInside",
    SliderInsideComponent_1.SettingSliderReduceInsideComponent,
  ],
  ["RewardTake", RewardTakeComponent_1.RewardTakeComponent],
  ["MapCheck", MapInteractComponent_1.MapCheckComponent],
  ["MapFocusPlayer", MapInteractComponent_1.MapFocusPlayerComponent],
  ["MapMoveForward", MapInteractComponent_1.MapMoveForwardComponent],
  ["MapMoveRight", MapInteractComponent_1.MapMoveRightComponent],
  ["MapZoom", MapInteractComponent_1.MapZoomComponent],
  ["RoleLookUp", RoleInteractComponent_1.RoleLookUpComponent],
  ["RoleTurn", RoleInteractComponent_1.RoleTurnComponent],
  ["RoleZoom", RoleInteractComponent_1.RoleZoomComponent],
  ["RoleReset", RoleInteractComponent_1.RoleResetComponent],
  [
    "GamepadMoveForward",
    GamepadInteractComponent_1.GamepadMoveForwardComponent,
  ],
  ["GamepadMoveRight", GamepadInteractComponent_1.GamepadMoveRightComponent],
  ["GamepadCheck", GamepadInteractComponent_1.GamepadCheckComponent],
  ["GamepadWheel", GamepadInteractComponent_1.GamepadWheelComponent],
  ["PlotMoveForward", PlotInteractComponent_1.PlotMoveForwardComponent],
  ["PlotMoveRight", PlotInteractComponent_1.PlotMoveRightComponent],
  ["PlotZoom", PlotInteractComponent_1.PlotZoomComponent],
  ["PlotNextPage", PlotInteractComponent_1.PlotNextPageComponent],
  [
    "OpenRouletteSetView",
    OpenRouletteSetViewComponent_1.OpenRouletteSetViewComponent,
  ],
  [
    "PhotographSetVisible",
    PhotographSetVisibleComponent_1.PhotographSetVisibleComponent,
  ],
  [
    "MapTravelTaskNavigationNext",
    MapTravelTaskNavigationNextComponent_1.MapTravelTaskNavigationNextComponent,
  ],
  [
    "ShipTowerSwitchRightTeam",
    ShipTowerSwitchRightTeamComponent_1.ShipTowerSwitchRightTeamComponent,
  ],
  [
    "ShipTowerAutoLeftTeam",
    ShipTowerAutoLeftTeamComponent_1.ShipTowerAutoLeftTeamComponent,
  ],
  [
    "OpenTermExplanationView",
    TermExplanationComponent_1.TermExplanationComponent,
  ],
  [
    "MapRogueQuicklyMove",
    MapRogueQuicklyMoveComponent_1.MapRogueQuicklyMoveComponent,
  ],
  ["MapDragForward", MapDragComponent_1.MapDragForwardComponent],
  ["MapDragRight", MapDragComponent_1.MapDragRightComponent],
  [
    "DangoLevelUp",
    InstanceDungeonWorldClickComponent_1.InstanceDungeonWorldClickComponent,
  ],
  [
    "DangoShop",
    InstanceDungeonWorldClickComponent_1.InstanceDungeonWorldClickComponent,
  ],
]);
//# sourceMappingURL=HotKeyItemFactory.js.map
