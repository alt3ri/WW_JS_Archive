"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CiacconaGalEndingView = void 0);
const UE = require("ue"),
  EventDefine_1 = require("../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../Common/Event/EventSystem"),
  ModelManager_1 = require("../../../Manager/ModelManager"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  PopupCaptionItem_1 = require("../../../Ui/Common/PopupCaptionItem"),
  CommonRewardPopup_1 = require("../../Common/CommonRewardPopup"),
  LguiUtil_1 = require("../../Util/LguiUtil"),
  CiacconaGalDefine_1 = require("../CiacconaGalDefine"),
  CiacconaGalTextConfig_1 = require("../CiacconaGalTextConfig"),
  CiacconaGalEndingItem_1 = require("./CiacconaGalEndingItem");
class CiacconaGalEndingView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.BPc = void 0),
      (this.kPc = void 0),
      (this.OPc = void 0),
      (this.Qyi = void 0),
      (this.wM1 = void 0),
      (this.m7s = (e) => {
        this.wM1?.SetUiActive(!0), this.wM1?.Refresh(e);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIItem],
      [2, UE.UIItem],
      [3, UE.UIItem],
      [4, UE.UIText],
    ];
  }
  async OnBeforeStartAsync() {
    var e = ModelManager_1.ModelManager.CiacconaGalModel.GetAllEndingDataList(),
      e =
        ((this.BPc = new CiacconaGalEndingItem_1.CiacconaGalEndingItem(
          e[0],
          "XKAVG_SystemTitle_12",
        )),
        (this.kPc = new CiacconaGalEndingItem_1.CiacconaGalEndingItem(
          e[1],
          "XKAVG_SystemTitle_13",
        )),
        (this.OPc = new CiacconaGalEndingItem_1.CiacconaGalEndingItem(
          e[2],
          "XKAVG_SystemTitle_14",
        )),
        (this.Qyi = new PopupCaptionItem_1.PopupCaptionItem()),
        this.Qyi.SetCloseCallBack(() => {
          this.CloseMe();
        }),
        (this.wM1 = new CommonRewardPopup_1.CommonRewardPopup(
          this.GetRootItem(),
        )),
        []),
      e =
        (e.push(
          this.BPc.CreateThenShowByActorAsync(this.GetItem(1).GetOwner()),
        ),
        e.push(this.kPc.CreateThenShowByActorAsync(this.GetItem(2).GetOwner())),
        e.push(this.OPc.CreateThenShowByActorAsync(this.GetItem(3).GetOwner())),
        e.push(this.Qyi.CreateThenShowByActorAsync(this.GetItem(0).GetOwner())),
        await Promise.all(e),
        CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
          CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_TITLE,
        )),
      e =
        (this.Qyi.SetTitleByTextIdAndArgNew(e),
        CiacconaGalTextConfig_1.CiacconaGalTextConfig.GetTextId(
          CiacconaGalDefine_1.TEXT_ID_CIACCONA_ENDING_INTERNAL_TITLE,
        ));
    LguiUtil_1.LguiUtil.SetLocalTextNew(this.GetText(4), e);
  }
  OnAddEventListener() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      this.m7s,
    );
  }
  OnRemoveEventListener() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.RefreshRewardPopUp,
      this.m7s,
    );
  }
}
exports.CiacconaGalEndingView = CiacconaGalEndingView;
//# sourceMappingURL=CiacconaGalEndingView.js.map
