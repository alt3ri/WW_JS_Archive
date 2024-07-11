"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MemoryDetailAttachItem = void 0);
const UE = require("ue");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const ConfigManager_1 = require("../../Manager/ConfigManager");
const ModelManager_1 = require("../../Manager/ModelManager");
const AutoAttachItem_1 = require("../AutoAttach/AutoAttachItem");
const LevelSequencePlayer_1 = require("../Common/LevelSequencePlayer");
const LguiUtil_1 = require("../Util/LguiUtil");
class MemoryDetailAttachItem extends AutoAttachItem_1.AutoAttachItem {
  constructor() {
    super(...arguments),
      (this.Y6i = void 0),
      (this.I7e = 0),
      (this.EPe = void 0),
      (this.Nft = !1);
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
            this.I7e,
          );
        },
      ],
    ];
  }
  Sbn() {
    void 0 === this.EPe &&
      (this.EPe = new LevelSequencePlayer_1.LevelSequencePlayer(this.RootItem));
  }
  OnRefreshItem(e) {
    this.Sbn(),
      (this.I7e = e) === -1
        ? (this.Y6i = void 0)
        : ((e =
            ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryTopicById(
              e,
            )),
          (this.Y6i = e)),
      this.k5e(),
      this.KUn(),
      this.Wbe(),
      this.J8e();
  }
  J8e() {
    this.I7e === -1
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
      : (this.SetSpriteByPath(this.Y6i.BgResource, this.GetSprite(0), !1),
        this.SetSpriteByPath(this.Y6i.BgResourceLight, this.GetSprite(1), !1));
  }
  Wbe() {
    this.I7e === -1 || void 0 === this.Y6i
      ? LguiUtil_1.LguiUtil.SetLocalTextNew(
          this.GetText(2),
          "FragmentMemoryNotOpen",
        )
      : this.GetText(2)?.ShowTextNew(this.Y6i.Title);
  }
  KUn() {
    if (this.I7e === -1 || void 0 === this.Y6i) this.GetText(3)?.SetText("");
    else {
      const t =
        ConfigManager_1.ConfigManager.FragmentMemoryConfig.GetPhotoMemoryCollectConfigListByTopicId(
          this.Y6i.Id,
        );
      let e = 0;
      for (const s of t) {
        const i =
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
  k5e() {
    if (void 0 === this.Y6i) this.GetItem(4)?.SetUIActive(!1);
    else {
      const t =
        ModelManager_1.ModelManager.FragmentMemoryModel.GetTopicDataById(
          this.Y6i.Id,
        );
      let e = !1;
      t && t.GetAllCollectState() && (e = !0), this.GetItem(4)?.SetUIActive(e);
    }
  }
  OnSelect() {
    this.GetExtendToggle(5)?.SetToggleState(1),
      this.EPe?.StopCurrentSequence(),
      this.EPe?.PlaySequencePurely("Select"),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnFragmentTopicSelect,
        this.I7e,
      ),
      (this.Nft = !0);
  }
  OnUnSelect() {
    this.Nft && this.EPe?.PlaySequencePurely("Unselect"),
      this.GetExtendToggle(5)?.SetToggleState(0),
      (this.Nft = !1);
  }
  OnMoveItem() {}
}
exports.MemoryDetailAttachItem = MemoryDetailAttachItem;
// # sourceMappingURL=MemoryDetailAttachItem.js.map
