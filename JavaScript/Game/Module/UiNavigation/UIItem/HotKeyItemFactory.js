"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.HotKeyItemFactory = void 0);
const Log_1 = require("../../../../Core/Common/Log");
const ConfigManager_1 = require("../../../Manager/ConfigManager");
const BackComponent_1 = require("../UIComponent/BackComponent");
const BagTagNavigationNextComponent_1 = require("../UIComponent/BagTagNavigationNextComponent");
const BattleViewCameraComponent_1 = require("../UIComponent/BattleViewCameraComponent");
const ClickBtnComponent_1 = require("../UIComponent/ClickBtnComponent");
const ClickBtnInsideComponent_1 = require("../UIComponent/ClickBtnInsideComponent");
const ClickBtnInsideReleaseComponent_1 = require("../UIComponent/ClickBtnInsideReleaseComponent");
const ClickBtnReleaseComponent_1 = require("../UIComponent/ClickBtnReleaseComponent");
const DraggableComponent_1 = require("../UIComponent/DraggableComponent");
const DraggableInsideComponent_1 = require("../UIComponent/DraggableInsideComponent");
const FollowItemComponent_1 = require("../UIComponent/FollowItemComponent");
const InteractComponent_1 = require("../UIComponent/InteractComponent");
const InteractReleaseComponent_1 = require("../UIComponent/InteractReleaseComponent");
const InteractWheelComponent_1 = require("../UIComponent/InteractWheelComponent");
const LongPressComponent_1 = require("../UIComponent/LongPressComponent");
const LongPressInsideComponent_1 = require("../UIComponent/LongPressInsideComponent");
const LongTimeToTriggerComponent_1 = require("../UIComponent/LongTimeToTriggerComponent");
const MapInteractComponent_1 = require("../UIComponent/MapInteractComponent");
const MarkBookComponent_1 = require("../UIComponent/MarkBookComponent");
const MaskComponent_1 = require("../UIComponent/MaskComponent");
const NavigationGroupComponent_1 = require("../UIComponent/NavigationGroupComponent");
const RoleInteractComponent_1 = require("../UIComponent/RoleInteractComponent");
const RouletteNavigationComponent_1 = require("../UIComponent/RouletteNavigationComponent");
const ScrollBarComponent_1 = require("../UIComponent/ScrollBarComponent");
const ScrollBarInsideComponent_1 = require("../UIComponent/ScrollBarInsideComponent");
const ScrollSwitchComponent_1 = require("../UIComponent/ScrollSwitchComponent");
const ShowOnlyComponent_1 = require("../UIComponent/ShowOnlyComponent");
const SliderComponent_1 = require("../UIComponent/SliderComponent");
const SliderInsideComponent_1 = require("../UIComponent/SliderInsideComponent");
const TextInputComponent_1 = require("../UIComponent/TextInputComponent");
const TextInputInsideComponent_1 = require("../UIComponent/TextInputInsideComponent");
const MultipleHotKeyItem_1 = require("./MultipleHotKeyItem");
const SingleHotKeyItem_1 = require("./SingleHotKeyItem");
class HotKeyItemFactory {
  static async CreateHotKeyItem(e, n, o) {
    switch (n) {
      case "SingleHotKey":
        return HotKeyItemFactory.Bqe(e, SingleHotKeyItem_1.SingleHotKeyItem, o);
      case "MultipleHotKey":
        return HotKeyItemFactory.Bqe(
          e,
          MultipleHotKeyItem_1.MultipleHotKeyItem,
          o,
        );
      default:
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "UiNavigation",
            11,
            "导航快捷键的参数配置错误!",
            ["Mode", n],
            ["index", o],
          )
        );
    }
  }
  static async Bqe(e, n, o) {
    n = new n();
    return await n.CreateThenShowByActorAsync(e, o), n;
  }
  static async CreateHotKeyComponent(e, n, o) {
    const t =
      ConfigManager_1.ConfigManager.UiNavigationConfig.GetHotKeyMapConfig(n);
    if (t) {
      let r = this.wbo.get(t.Type);
      if (r)
        return (
          (r = this.Bbo(r, n)).SetHotKeyFunctionType(t.Type),
          await r.CreateThenShowByActorAsync(e),
          r.SetHotKeyType(o),
          r.InitHotKeyLogicMode(),
          r
        );
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "UiNavigation",
          11,
          "热键组件类型不存在!代码未进行注册",
          ["type", t.Type],
        );
    } else
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn("UiNavigation", 11, "导航组中单个配置找不到", [
          "hotKeyMapId",
          n,
        ]);
  }
  static Bbo(e, n) {
    return new e(n);
  }
}
(exports.HotKeyItemFactory = HotKeyItemFactory).wbo = new Map([
  ["MarkBookNext", MarkBookComponent_1.MarkBookNextComponent],
  ["MarkBookPrev", MarkBookComponent_1.MarkBookPrevComponent],
  ["NavigationNext", NavigationGroupComponent_1.NavigationGroupNextComponent],
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
  ["FollowItem", FollowItemComponent_1.FollowItemComponent],
  [
    "BagTagNavigationNext",
    BagTagNavigationNextComponent_1.BagTagNavigationNextComponent,
  ],
  ["BattleViewCamera", BattleViewCameraComponent_1.BattleViewCameraComponent],
  [
    "RouletteNavigation",
    RouletteNavigationComponent_1.RouletteNavigationComponent,
  ],
  ["MapCheck", MapInteractComponent_1.MapCheckComponent],
  ["MapFocusPlayer", MapInteractComponent_1.MapFocusPlayerComponent],
  ["MapMoveForward", MapInteractComponent_1.MapMoveForwardComponent],
  ["MapMoveRight", MapInteractComponent_1.MapMoveRightComponent],
  ["MapZoom", MapInteractComponent_1.MapZoomComponent],
  ["RoleLookUp", RoleInteractComponent_1.RoleLookUpComponent],
  ["RoleTurn", RoleInteractComponent_1.RoleTurnComponent],
  ["RoleZoom", RoleInteractComponent_1.RoleZoomComponent],
  ["RoleReset", RoleInteractComponent_1.RoleResetComponent],
]);
// # sourceMappingURL=HotKeyItemFactory.js.map
