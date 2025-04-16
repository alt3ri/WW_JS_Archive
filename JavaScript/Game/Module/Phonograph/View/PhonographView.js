"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PhonographView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  LevelSequencePlayer_1 = require("../../Common/LevelSequencePlayer"),
  ScrollingTipsController_1 = require("../../ScrollingTips/ScrollingTipsController"),
  GenericLayout_1 = require("../../Util/Layout/GenericLayout"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  PhonographAlbumItem_1 = require("../Component/PhonographAlbumItem"),
  PhonographMusicPlayItem_1 = require("../Component/PhonographMusicPlayItem");
class PhonographView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.AlbumGenericLayout = void 0),
      (this.MusicGenericLayout = void 0),
      (this.MusicMap = new Map()),
      (this.CaptionComponent = void 0),
      (this.SequencePlayer = void 0),
      (this.OnCreateAlbumItem = () => {
        var e = new PhonographAlbumItem_1.PhonographAlbumItem();
        return (e.OnClickAlbumItem = this.OnClickAlbumItem), e;
      }),
      (this.OnCreateMusicItem = () => {
        var e = new PhonographMusicPlayItem_1.PhonographMusicPlayItem();
        return (e.OnClickMusicItem = this.OnClickMusicItem), e;
      }),
      (this.OnClickAlbumItem = (e, r) => {
        this.AlbumGenericLayout.SelectGridProxy(r);
        var t,
          n = (this.MusicMap.get(e) ?? []).sort((e, r) => {
            var t =
                ModelManager_1.ModelManager.PhonographModel
                  .CurrentPlayMusicId === e,
              n =
                ModelManager_1.ModelManager.PhonographModel
                  .CurrentPlayMusicId === r;
            return t && !n
              ? -1
              : !t && n
                ? 1
                : ModelManager_1.ModelManager.PhonographModel.IsNewMusic(e) &&
                    !ModelManager_1.ModelManager.PhonographModel.IsNewMusic(r)
                  ? -1
                  : !ModelManager_1.ModelManager.PhonographModel.IsNewMusic(
                        e,
                      ) &&
                      ModelManager_1.ModelManager.PhonographModel.IsNewMusic(r)
                    ? 1
                    : ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(
                          e,
                        ) &&
                        !ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(
                          r,
                        )
                      ? -1
                      : !ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(
                            e,
                          ) &&
                          ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(
                            r,
                          )
                        ? 1
                        : e - r;
          });
        let i = 0,
          o = -1;
        for (const a of n)
          ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(a) && i++,
            ModelManager_1.ModelManager.PhonographModel?.CurrentPlayMusicId ===
              a &&
              (t =
                ModelManager_1.ModelManager.PhonographModel
                  ?.CurrentPlayMusicId) &&
              (o = n.indexOf(t));
        LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(9),
          "PrefabTextItem_1090321532_Text",
          i,
          n.length,
        ),
          (ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId =
            -1 !== o ? n[o] : 0),
          this.RefreshSwitchBtn(
            ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId,
          ),
          this.MusicGenericLayout?.GetUiAnimController()?.Stop(),
          this.MusicGenericLayout.RefreshByData(
            n,
            () => {
              -1 !== o &&
                (this.MusicGenericLayout.SelectGridProxy(o, !1),
                this.RefreshMusicInfo(
                  ModelManager_1.ModelManager.PhonographModel
                    .CurrentSelectMusicId,
                )),
                this.GetScrollViewWithScrollbar(11)?.SetScrollProgress(0);
            },
            !0,
          ),
          this.SequencePlayer?.PlaySequencePurely("Album"),
          this.RefreshAlbumInfo(e);
      }),
      (this.OnClickMusicItem = (e, r) => {
        (ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId = e),
          ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e)
            ? (this.MusicGenericLayout.SelectGridProxy(r),
              ControllerHolder_1.ControllerHolder.PhonographController.PlayMusic(
                e,
              ),
              ModelManager_1.ModelManager.PhonographModel?.RemoveNewMusic(e),
              this.RefreshMusicInfo(e),
              this.SequencePlayer?.PlaySequencePurely("Single"),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnPhonographRemoveNewTag,
              ),
              EventSystem_1.EventSystem.Emit(
                EventDefine_1.EEventName.OnPhonographSwitchMusic,
              ))
            : (this.RefreshMusicInfo(e),
              this.MusicGenericLayout.SelectGridProxy(r));
      }),
      (this.OnClickSetBgMusic = () => {
        var e =
            ModelManager_1.ModelManager.PhonographModel.CurrentSelectMusicId,
          r =
            ModelManager_1.ModelManager.PhonographModel.RecordMusicId === e
              ? 0
              : e;
        (ModelManager_1.ModelManager.PhonographModel.RecordMusicId = r),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnPhonographSetBgm,
            r,
          ),
          this.RefreshSwitchBtn(e),
          0 !== r
            ? ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "PhonographSwitchMusicSuccess",
              )
            : ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
                "PhonographSwitchMusicCancel",
              );
      });
  }
  OnRegisterComponent() {
    (this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIVerticalLayout],
      [2, UE.UIItem],
      [3, UE.UIText],
      [4, UE.UIVerticalLayout],
      [5, UE.UIItem],
      [6, UE.UIText],
      [7, UE.UIButtonComponent],
      [8, UE.UIText],
      [9, UE.UIText],
      [10, UE.UIText],
      [11, UE.UIScrollViewWithScrollbarComponent],
    ]),
      (this.BtnBindInfo = [[7, this.OnClickSetBgMusic]]);
  }
  async OnBeforeStartAsync() {
    ControllerHolder_1.ControllerHolder.PhonographController.StopMusic(),
      (ModelManager_1.ModelManager.PhonographModel.RecordMusicId = 0),
      await ControllerHolder_1.ControllerHolder.PhonographController.GetMusicInfoRequest(),
      (this.AlbumGenericLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(1),
        this.OnCreateAlbumItem,
      )),
      (this.MusicGenericLayout = new GenericLayout_1.GenericLayout(
        this.GetVerticalLayout(4),
        this.OnCreateMusicItem,
      ));
    const r = new Set();
    var e =
      ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicList() ?? [];
    const t = new Map();
    for (const n of e)
      n.Album.forEach((e) => {
        r.has(e) ||
          (r.add(e),
          t.set(
            e,
            ConfigManager_1.ConfigManager.PhonographConfig.GetMusicAlbumById(e),
          )),
          this.MusicMap.has(e) || this.MusicMap.set(e, []),
          this.MusicMap.get(e).push(n.Id);
      });
    await this.AlbumGenericLayout.RefreshByDataAsync(
      Array.from(r).sort((e, r) => {
        (e = t.get(e)), (r = t.get(r));
        return e.SortIndex - r.SortIndex;
      }),
    ),
      this.AlbumGenericLayout.SelectGridProxy(0, !0),
      (this.CaptionComponent = new PopupCaptionItem_1.PopupCaptionItem()),
      this.CaptionComponent.SetCloseCallBack(() => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnExitNpcInteract,
        ),
          this.CloseMe();
      }),
      await this.CaptionComponent.CreateThenShowByActorAsync(
        this.GetItem(0).GetOwner(),
      ),
      (this.SequencePlayer = new LevelSequencePlayer_1.LevelSequencePlayer(
        this.RootItem,
      ));
  }
  OnAddEventListener() {}
  OnRemoveEventListener() {}
  OnBeforeDestroy() {
    var e;
    (ModelManager_1.ModelManager.PhonographModel.NewMusicIds = []),
      ControllerHolder_1.ControllerHolder.PhonographController.ClearTimer(),
      ModelManager_1.ModelManager.PhonographModel.CurrentPlayMusicId !==
      ModelManager_1.ModelManager.PhonographModel.RecordMusicId
        ? (ControllerHolder_1.ControllerHolder.PhonographController.StopMusic(
            !1,
          ),
          0 !== ModelManager_1.ModelManager.PhonographModel.RecordMusicId &&
            ((e =
              ControllerHolder_1.ControllerHolder.PhonographController.PlayMusic(
                ModelManager_1.ModelManager.PhonographModel.RecordMusicId,
                !1,
              )),
            ModelManager_1.ModelManager.PhonographModel.SetPlayIdRecord(
              ModelManager_1.ModelManager.PhonographModel
                .CurrentPlayActorEntityId,
              e,
            )))
        : (ControllerHolder_1.ControllerHolder.PhonographController.ClearTimer(),
          ModelManager_1.ModelManager.PhonographModel.ClearPlayInfo());
  }
  RefreshAlbumInfo(e) {
    e = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicAlbumById(e);
    e &&
      (LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), e.Title),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), e.Desc),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(3), e.Title));
  }
  RefreshMusicInfo(e) {
    var r = ConfigManager_1.ConfigManager.PhonographConfig?.GetMusicById(e);
    r &&
      (ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e)
        ? LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(8), r.Desc)
        : LguiUtil_1.LguiUtil.SetLocalTextNew(
            this.GetText(8),
            r.UnlockConditionText,
          ),
      LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(6), r.Title),
      this.RefreshSwitchBtn(e));
  }
  RefreshSwitchBtn(e) {
    this.GetButton(7)
      .GetRootComponent()
      ?.SetUIActive(
        0 !== e && ModelManager_1.ModelManager.PhonographModel.IsUnlockMusic(e),
      );
    e = ModelManager_1.ModelManager.PhonographModel.RecordMusicId === e;
    LguiUtil_1.LguiUtil.SetLocalTextNew(
      this.GetText(10),
      e ? "PhonographSwitchBtnNormal" : "PhonographSwitchBtnSelect",
    );
  }
}
exports.PhonographView = PhonographView;
//# sourceMappingURL=PhonographView.js.map
