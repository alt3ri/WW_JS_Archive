"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MemoryDetailAttachItem = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  AutoAttachItem_1 = require("../AutoAttach/AutoAttachItem"),
  LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer"),
  LguiUtil_1 = require("../Util/LguiUtil");
class MemoryDetailAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.$8i = void 0),
      (this.NHe = 0),
      (this.SPe = void 0),
      (this.Ypt = !1);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UIText],
      [3, UE.UIText],
      [4, UE.UIItem],
      [5, UE.UIExtendToggle],
    ];
    this.BtnBindInfo = [
      [
        5,
        () => {
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnFragmentTopicClick,
            this.NHe,
          );
        },
      ],
    ];
  }
  MOn() {
    void 0 === this.SPe &&
      (this.SPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnRefreshItem(e) {
    this.MOn(),
      -1 === (this.NHe = e)
        ? (this.$8i = void 0)
        : ((e =
            ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
              e,
            )),
          (this.$8i = e)),
      this.e6e(),
      this.Iwn(),
      this.Wbe(),
      this.u7e();
  }
  u7e() {
    -1 === this.NHe
      ? (this.SetSpriteByPath(
          ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetTopicNotOpenTexturePath(),
          this.GetSprite(0),
          !1,
        ),
        this.SetSpriteByPath(
          ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetTopicNotOpenTextureLightPath(),
          this.GetSprite(1),
          !1,
        ))
      : (this.SetSpriteByPath(this.$8i.BgResource, this.GetSprite(0), !1),
        this.SetSpriteByPath(this.$8i.BgResourceLight, this.GetSprite(1), !1));
  }
  Wbe() {
    -1 === this.NHe || void 0 === this.$8i
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          "FragmentMemoryNotOpen",
        )
      : this.GetText(2)?.ShowTextNew(this.$8i.Title);
  }
  Iwn() {
    if (-1 === this.NHe || void 0 === this.$8i) this.GetText(3)?.SetText("");
    else {
      var t =
        ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectConfigListByTopicId(
          this.$8i.Id,
        );
      let e = 0;
      for (const s of t) {
        var i =
          ModelManager_1.ModelManager.FragmentMemoryModel.GetCollectDataById(
            s.Id,
          );
        i && i.GetIfUnlock() && e++;
      }
      LguiUtil_1.LguiUtil.SetLocalTextNew(
        this.GetText(3),
        "FragmentMemoryCollectProgress",
        e.toString(),
        t.length.toString(),
      );
    }
  }
  e6e() {
    if (void 0 === this.$8i) this.GetItem(4)?.SetUIActive(!1);
    else {
      var t = ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
        this.$8i.Id,
      );
      let e = !1;
      t && t.GetAllCollectState() && (e = !0), this.GetItem(4)?.SetUIActive(e);
    }
  }
  OnSelect() {
    this.GetExtendToggle(5)?.SetToggleState(1),
      this.SPe?.StopCurrentSequence(),
      this.SPe?.PlaySequencePurely("Select"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFragmentTopicSelect,
        this.NHe,
      ),
      (this.Ypt = !0);
  }
  OnUnSelect() {
    this.Ypt && this.SPe?.PlaySequencePurely("Unselect"),
      this.GetExtendToggle(5)?.SetToggleState(0),
      (this.Ypt = !1);
  }
  OnMoveItem() {}
}
exports.MemoryDetailAttachItem = MemoryDetailAttachItem;
//# sourceMappingURL=MemoryDetailAttachItem.js.map
