"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.MediumItemGridVisionSlotComponent = void 0);
const UE = require("ue"),
  MediumItemGridComponent_1 = require("./MediumItemGridComponent"),
  UNLOCK_AND_HAVE_PROP_INDEX = 0,
  UNLOCK_AND_NO_PROP_INDEX = 1,
  PREVIEW_UNLOCK_INDEX = 2,
  LOCK_INDEX = 3,
  STATE_COUNT = 4,
  STATE_SLOT_COUNT = 3;
class MediumItemGridVisionSlotComponent extends MediumItemGridComponent_1.MediumItemGridComponent {
  constructor() {
    super(...arguments), (this.Nwt = []);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UISprite],
      [2, UE.UISprite],
      [3, UE.UISprite],
      [4, UE.UISprite],
      [5, UE.UISprite],
      [6, UE.UISprite],
      [7, UE.UISprite],
      [8, UE.UISprite],
      [9, UE.UISprite],
      [10, UE.UISprite],
      [11, UE.UISprite],
    ];
  }
  GetResourceId() {
    return "UiItem_ItemVisionStateA";
  }
  OnActivate() {
    this.Nwt = [
      [
        this.GetSprite(0),
        this.GetSprite(1),
        this.GetSprite(2),
        this.GetSprite(3),
      ],
      [
        this.GetSprite(4),
        this.GetSprite(5),
        this.GetSprite(6),
        this.GetSprite(7),
      ],
      [
        this.GetSprite(8),
        this.GetSprite(9),
        this.GetSprite(10),
        this.GetSprite(11),
      ],
    ];
  }
  OnDeactivate() {
    this.Nwt.length = 0;
  }
  OnRefresh(e) {
    if (e) {
      for (let _ = 0; _ < STATE_SLOT_COUNT; _++) {
        var t = e[_];
        this.Owt(_, t);
      }
      this.SetActive(!0);
    } else this.SetActive(!1);
  }
  Owt(_, e) {
    var t = this.Nwt[_];
    if (t && !(t.length < STATE_COUNT))
      if (void 0 === e) for (const N of t) N.SetUIActive(!1);
      else
        switch (e) {
          case 0:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(!1),
              t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(!1),
              t[PREVIEW_UNLOCK_INDEX].SetUIActive(!1),
              t[LOCK_INDEX].SetUIActive(!0);
            break;
          case 2:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(!1),
              t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(!1),
              t[PREVIEW_UNLOCK_INDEX].SetUIActive(!0),
              t[LOCK_INDEX].SetUIActive(!1);
            break;
          case 1:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(!1),
              t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(!0),
              t[PREVIEW_UNLOCK_INDEX].SetUIActive(!1),
              t[LOCK_INDEX].SetUIActive(!1);
            break;
          case 3:
            t[UNLOCK_AND_HAVE_PROP_INDEX].SetUIActive(!0),
              t[UNLOCK_AND_NO_PROP_INDEX].SetUIActive(!1),
              t[PREVIEW_UNLOCK_INDEX].SetUIActive(!1),
              t[LOCK_INDEX].SetUIActive(!1);
        }
  }
}
exports.MediumItemGridVisionSlotComponent = MediumItemGridVisionSlotComponent;
//# sourceMappingURL=MediumItemGridVisionSlotComponent.js.map
