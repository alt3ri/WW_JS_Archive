"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographAlbumItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  GridProxyAbstract_1 = require("../../Util/Grid/GridProxyAbstract");
class PhonographAlbumItem extends GridProxyAbstract_1.GridProxyAbstract {
  constructor() {
    super(...arguments),
      (this.OnClickAlbumItem = void 0),
      (this.AlbumId = 0),
      (this.IsPlayMusic = !1),
      (this.LevelSequencePlayer = void 0),
      (this.eTt = (e) => {
        1 === e &&
          this.OnClickAlbumItem &&
          this.OnClickAlbumItem(this.AlbumId, this.GridIndex);
      }),
      (this.oKl = () => {
        var e;
        0 === ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId &&
        this.IsPlayMusic
          ? ((this.IsPlayMusic = !1),
            this.LevelSequencePlayer?.PlaySequencePurely("Stop"))
          : 0 !==
              (e =
                ModelManager_1.ModelManager.PhonographModel
                  ?.CurrentPlayMusicId) &&
            (e =
              ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(
                e,
              )) &&
            ((e = e.Album.includes(this.AlbumId)) && !this.IsPlayMusic
              ? ((this.IsPlayMusic = !0),
                this.LevelSequencePlayer?.PlaySequencePurely("Play"))
              : !e &&
                this.IsPlayMusic &&
                ((this.IsPlayMusic = !1),
                this.LevelSequencePlayer?.PlaySequencePurely("Stop")));
      }),
      (this.W5l = () => {
        var e =
          ModelManager_1.ModelManager.PhonographModel.CheckAlbumHasNewMusic(
            this.AlbumId,
          );
        this.GetItem(2).SetUIActive(e);
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIExtendToggle],
      [1, UE.UISprite],
      [2, UE.UIItem],
    ]),
      (this.BtnBindInfo = [[0, this.eTt]]);
  }
  OnStart() {
    this.LevelSequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
      this.RootItem,
    );
  }
  OnBeforeShow() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.OnPhonographRemoveNewTag,
      this.W5l,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.OnPhonographSwitchMusic,
        this.oKl,
      );
  }
  OnBeforeHide() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.OnPhonographRemoveNewTag,
      this.W5l,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.OnPhonographSwitchMusic,
        this.oKl,
      );
  }
  Refresh(e, t, i) {
    this.AlbumId = e;
    var s =
      ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicAlbumById(e);
    s &&
      ((e =
        ModelManager_1.ModelManager.PhonographModel.CheckAlbumHasNewMusic(e)),
      this.GetItem(2).SetUIActive(e),
      this.SetSpriteByPath(s.Icon, this.GetSprite(1), !1));
  }
  OnSelected(e) {
    this.GetExtendToggle(0).SetToggleState(1),
      e &&
        this.OnClickAlbumItem &&
        this.OnClickAlbumItem(this.AlbumId, this.GridIndex),
      this.IsPlayMusic && this.LevelSequencePlayer?.PlaySequencePurely("Play");
  }
  OnDeselected(e) {
    this.GetExtendToggle(0).SetToggleState(0);
  }
}
exports.PhonographAlbumItem = PhonographAlbumItem;
//# sourceMappingURL=PhonographAlbumItem.js.map
