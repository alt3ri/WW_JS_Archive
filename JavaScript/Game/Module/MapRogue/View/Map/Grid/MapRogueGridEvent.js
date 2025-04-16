"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MapRogueGridEvent = void 0);
const UE = require("ue"),
  CustomPromise_1 = require("../../../../../../Core/Common/CustomPromise"),
  StringUtils_1 = require("../../../../../../Core/Utils/StringUtils"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  UiPanelBase_1 = require("../../../../../Ui/Base/UiPanelBase"),
  LevelSequencePlayer_1 = require("../../../../Common/LevelSequencePlayer"),
  SPECIAL_NIAGARA_PATH =
    "/Game/Aki/Effect/UI/Niagaras/RouGe/NS_Fx_LGUI_RouGeStar_Start_Color.NS_Fx_LGUI_RouGeStar_Start_Color",
  SPECIAL_SPRITE_PATH =
    "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventVfx2.SP_EventVfx2",
  STAR_MAX_COUNT = 3,
  starSpriteMap = new Map([
    [
      1,
      "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventStar1.SP_EventStar1",
    ],
    [
      2,
      "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventStar2.SP_EventStar2",
    ],
    [
      3,
      "/Game/Aki/UI/UIResources/UiRogue/Atlas/RogueMap/SP_EventStar3.SP_EventStar3",
    ],
  ]);
class MapRogueGridEvent extends UiPanelBase_1.UiPanelBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.$R1 = -1),
      (this.LevelSequencePlayer = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UINiagara],
      [1, UE.UITexture],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
    ];
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  async OnHideAsyncImplementImplement() {
    var e;
    this.Pe &&
      ConfigManager_1.ConfigManager.MapRogueConfig.GetGlobalParamConfig().EventDisappearEventType.includes(
        this.Pe.EventType,
      ) &&
      ((e = new CustomPromise_1.CustomPromise()),
      await this.LevelSequencePlayer.PlaySequenceAsync("EventComplete", e));
  }
  Refresh(e) {
    var t, i, s, r;
    this.$R1 !== e.GridEventId &&
      ((this.Pe = e),
      (this.$R1 = e.GridEventId),
      (e = ConfigManager_1.ConfigManager.MapRogueConfig.GetGridEventConfigById(
        e.GridEventId,
      ))) &&
      (t =
        ConfigManager_1.ConfigManager.MapRogueConfig.GetRogueResEventCueByType(
          e.Fx,
        )) &&
      ((i = this.GetSprite(2)),
      (s = this.GetSprite(3)),
      (r = this.GetUiNiagara(0)),
      t.IsSpecial
        ? (this.SetSpriteByPath(SPECIAL_SPRITE_PATH, i, !1),
          this.SetSpriteByPath(SPECIAL_SPRITE_PATH, s, !1),
          this.SetNiagaraSystemByPath(SPECIAL_NIAGARA_PATH, r))
        : (StringUtils_1.StringUtils.IsEmpty(t.FxColor)
            ? r.SetUIActive(!1)
            : (r.ColorParameter.Get("Color").Constant =
                UE.LinearColor.FromSRGBColor(UE.Color.FromHex(t.FxColor))),
          (r = !StringUtils_1.StringUtils.IsEmpty(t.SpriteColor)) &&
            (i.SetColor(UE.Color.FromHex(t.SpriteColor)),
            s.SetColor(UE.Color.FromHex(t.SpriteColor))),
          i.SetUIActive(r),
          s.SetUIActive(r)),
      this.SetTextureShowUntilLoaded(t.IconPath, this.GetTexture(1)),
      this.aqe(0 < e.Star, e.Star));
  }
  aqe(e, t) {
    var i = this.GetSprite(4);
    e &&
      ((t = Math.min(STAR_MAX_COUNT, t)),
      this.SetSpriteByPath(starSpriteMap.get(t), i, !1)),
      i.SetUIActive(e);
  }
  SetVision(e) {
    this.SetActive(e);
  }
}
exports.MapRogueGridEvent = MapRogueGridEvent;
//# sourceMappingURL=MapRogueGridEvent.js.map
