"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGridPath = void 0);
const UE = require("ue"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  shapeTypeMap = {
    [34]: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraight1.SP_RoadStraight1",
    43: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraight1.SP_RoadStraight1",
    12: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraight2.SP_RoadStraight2",
    21: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraight2.SP_RoadStraight2",
    32: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner1.SP_RoadCorner1",
    23: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner1.SP_RoadCorner1",
    31: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner3.SP_RoadCorner3",
    13: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner3.SP_RoadCorner3",
    42: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner4.SP_RoadCorner4",
    24: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner4.SP_RoadCorner4",
    41: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner2.SP_RoadCorner2",
    14: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCorner2.SP_RoadCorner2",
  },
  shapeArrowTypeMap = {
    [34]: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraightArrow1.SP_RoadStraightArrow1",
    43: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraightArrow2.SP_RoadStraightArrow2",
    12: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraightArrow4.SP_RoadStraightArrow4",
    21: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadStraightArrow3.SP_RoadStraightArrow3",
    32: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow3a.SP_RoadCornerArrow3a",
    23: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow4a.SP_RoadCornerArrow4a",
    31: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow1.SP_RoadCornerArrow1",
    13: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow4.SP_RoadCornerArrow4",
    42: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow3.SP_RoadCornerArrow3",
    24: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow2.SP_RoadCornerArrow2",
    41: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow1a.SP_RoadCornerArrow1a",
    14: "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/MapArrow/SP_RoadCornerArrow2a.SP_RoadCornerArrow2a",
  };
class MapRogueGridPath extends UiPanelBase_1.UiPanelBase {
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [[0, UE.UISprite]];
  }
  OnStart() {}
  SetShape(r, o) {
    o
      ? this.SetBgSprite(shapeArrowTypeMap[r])
      : this.SetBgSprite(shapeTypeMap[r]);
  }
  SetBgSprite(r) {
    var o = this.GetSprite(0);
    this.SetSpriteByPath(r, o, !1);
  }
}
exports.MapRogueGridPath = MapRogueGridPath;
//# sourceMappingURL=MapRogueGridPath.js.map
