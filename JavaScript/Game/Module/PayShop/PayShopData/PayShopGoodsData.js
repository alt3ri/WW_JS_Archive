
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.PayShopGoodsData=void 0;const LanguageSystem_1=require("../../../../Core/Common/LanguageSystem"),MultiTextLang_1=require("../../../../Core/Define/ConfigQuery/MultiTextLang"),MathUtils_1=require("../../../../Core/Utils/MathUtils"),StringUtils_1=require("../../../../Core/Utils/StringUtils"),TimeUtil_1=require("../../../Common/TimeUtil"),LevelGeneralCommons_1=require("../../../LevelGamePlay/LevelGeneralCommons"),ConfigManager_1=require("../../../Manager/ConfigManager"),ModelManager_1=require("../../../Manager/ModelManager"),ItemDefines_1=require("../../Item/Data/ItemDefines"),PayShopDefine_1=require("../PayShopDefine"),PayShopGoodsPrice_1=require("./PayShopGoodsPrice");class PayShopGoodsData{constructor(){this.Id=0,this.TabId=0,this.ItemId=0,this.ItemCount=0,this.Locked=!1,this.y2i=!0,this.BuyLimit=0,this.BoughtCount=0,this.Price=new PayShopGoodsPrice_1.PayShopGoodsPrice,this.UpdateType=0,this.ShopItemType=0,this.BeginTime=0,this.EndTime=0,this.BeginPromotionTime=0,this.EndPromotionTime=0,this.UpdateTime=0,this.LabelId=0,this.LabelBeginTime=0,this.LabelEndTime=0,this.Sort=0,this.Show=!0,this.PromotionShow=0,this.he="",this.StageImage="",this.I2i=0,this.Yxn="",this.UnFinishedCondition=void 0}Phrase(t){this.Id=t.Ekn;var i=ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(t.Ekn);this.TabId=i.TabId,this.ItemId=t.G3n,this.ItemCount=t.g5n,this.Locked=t.KPs,this.y2i=t.eUs,this.BuyLimit=t.FPs,this.BoughtCount=t.s8n,this.Price.Phrase(t.QPs),this.BeginTime=Number(MathUtils_1.MathUtils.LongToBigInt(t.HCs)),this.EndTime=Number(MathUtils_1.MathUtils.LongToBigInt(t.jCs)),this.BeginPromotionTime=Number(MathUtils_1.MathUtils.LongToBigInt(t.XPs)),this.EndPromotionTime=Number(MathUtils_1.MathUtils.LongToBigInt(t.YPs)),this.UpdateTime=Number(MathUtils_1.MathUtils.LongToBigInt(t.eAs)),this.UpdateType=Number(t.cTs),this.ShopItemType=Number(t.JPs),this.LabelId=i.Tag,this.LabelBeginTime=Number(MathUtils_1.MathUtils.LongToBigInt(t.zPs)),this.LabelEndTime=Number(MathUtils_1.MathUtils.LongToBigInt(t.ZPs)),this.Sort=i.Sort,this.PromotionShow=i.PromotionShow,this.M2i()}GetIfCanBuy(){return this.IfRoleCallBackItem()?!(!this.IfHaveRoleCallBackItemNeedRole()||!this.IfCanResonant()):!!this.y2i}IfRoleCallBackItem(){return this.GetItemConfig().ShowTypes.includes(30)}IfHaveRoleCallBackItemNeedRole(){if(this.IfRoleCallBackItem()){var t=ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.ItemId)[0];if(void 0===ModelManager_1.ModelManager.RoleModel.GetRoleInstanceById(t))return!1}return!0}IfCanResonant(){if(this.IfRoleCallBackItem()){var t=ModelManager_1.ModelManager.RoleModel.GetResonantItemRoleId(this.ItemId)[0];if(ModelManager_1.ModelManager.RoleModel.GetRoleLeftResonantCountWithInventoryItem(t)<=0)return!1}return!0}GetUnFinishConditionText(){if(this.IfRoleCallBackItem()){if(!this.IfHaveRoleCallBackItemNeedRole())return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("DontHaveRole");if(!this.IfCanResonant())return MultiTextLang_1.configMultiTextLang.GetLocalTextNew("RoleBrenchItemMax")}var t=ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id).BuyConditionId;return 0!==t?(t=LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t)??"",MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t)):""}M2i(){let t="";var i;""===t&&(t=MultiTextLang_1.configMultiTextLang.GetLocalTextNew(ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId).Name)),1<this.ItemCount&&(i=ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById("GoodsName"),i=MultiTextLang_1.configMultiTextLang.GetLocalTextNew(i),t=StringUtils_1.StringUtils.Format(i,t,this.ItemCount.toString())),this.Yxn=LanguageSystem_1.LanguageSystem.PackageLanguage,this.he=t}PhraseFromPayPackageData(t){this.Id=t.Id,this.ItemId=t.ItemId,this.ItemCount=t.ItemCount,this.Locked=!1,this.y2i=!0,this.BuyLimit=t.BuyLimit,this.BoughtCount=t.BoughtCount,this.Price.Id=t.PayId,this.BeginTime=t.BeginTime,this.EndTime=t.EndTime,this.UpdateTime=t.EndTime,this.UpdateType=0,this.ShopItemType=1,this.LabelId=0,this.LabelBeginTime=0,this.LabelEndTime=0,this.Sort=t.Sort,this.PromotionShow=0,this.TabId=t.TabId,this.StageImage=t.StageImage,this.I2i=1,ModelManager_1.ModelManager.RechargeModel.SetRechargeInfo(t.PayId,t.Amount,t.ProductId),this.he=t.GetName()}GetItemConfig(){return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId)}GetGoodsName(t){return this.Yxn!==LanguageSystem_1.LanguageSystem.PackageLanguage&&this.M2i(),this.he}CheckIfSame(t){return!!(this.Id===t.Ekn&&this.ItemId===t.G3n&&this.ItemCount===t.g5n&&this.Locked===t.KPs&&this.y2i===t.eUs&&this.BuyLimit===t.FPs&&this.BoughtCount===t.s8n&&this.T2i(t)&&this.L2i(this.BeginTime,t.HCs??void 0)&&this.L2i(this.EndTime,t.jCs??void 0)&&this.L2i(this.BeginPromotionTime,t.XPs??void 0)&&this.L2i(this.EndPromotionTime,t.YPs??void 0)&&this.L2i(this.UpdateTime,t.eAs??void 0)&&Number(this.UpdateType)===t.cTs&&Number(this.ShopItemType)===t.JPs&&this.L2i(this.LabelBeginTime,t.zPs??void 0)&&this.L2i(this.LabelEndTime,t.ZPs??void 0))}IfMayReSell(){if(0!==this.UpdateType&&4!==this.UpdateType){if(0===Number(this.EndTime))return!0;if(Number(this.UpdateTime)<Number(this.EndTime))return!0}return!1}L2i(t,i){return void 0!==t&&void 0!==i?Number(t)===Number(i):!(void 0===t&&void 0!==i||void 0!==t&&void 0===i)}T2i(t){return this.Price.Id===t.QPs.Ekn&&this.Price.Count===t.QPs.I5n&&this.Price.PromotionCount===t.QPs.WPs}InLabelShowTime(){var t=TimeUtil_1.TimeUtil.GetServerTime();return 0!==this.LabelId&&(0<this.LabelBeginTime&&t>=Number(this.LabelBeginTime)&&0===this.LabelEndTime||0===this.LabelBeginTime&&0===this.LabelEndTime||Number(this.LabelEndTime)>t&&t>=Number(this.LabelBeginTime))}GetSortValue(){return(0===this.Sort?ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id):this).Sort}ShopId(){return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id).ShopId}GetUpdateTime(){if(0===this.UpdateTime&&this.IsWeeklyRefresh())return ModelManager_1.ModelManager.PayShopModel.GetPayShopUpdateTime(this.ShopId());return this.UpdateTime}IsWeeklyRefresh(){return 0!==this.UpdateType&&4!==this.UpdateType}HasDiscount(){var t,i;return!(this.Price.PromotionCount<=0)&&(i=TimeUtil_1.TimeUtil.GetServerTime(),0===this.EndPromotionTime&&0===this.BeginPromotionTime||0===this.EndPromotionTime&&0<this.BeginPromotionTime&&i>=Number(this.BeginPromotionTime)||(t=TimeUtil_1.TimeUtil.IsExceededServerTime(this.EndPromotionTime),i=Number(this.EndPromotionTime)>i&&i>=Number(this.BeginPromotionTime),t&&i))}GetOriginalPrice(){if(this.HasDiscount())return this.Price.Count}GetDiscount(){return this.Price.GetDiscount()}GetRemainingCount(){return this.BuyLimit-this.BoughtCount}GetRemainingTextId(){return PayShopDefine_1.payShopUpdateTypeTextId[this.UpdateType]}HasBuyLimit(){return 0<this.BuyLimit}SetUnLock(){this.Locked=!1}IsDirect(){return 1===this.ShopItemType}GetNowPrice(){return this.HasDiscount()?this.Price.PromotionCount:this.Price.Count}GetConditionTextId(){var t;return 0===this.I2i&&0!==(t=ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id).BuyConditionId)?LevelGeneralCommons_1.LevelGeneralCommons.GetConditionGroupHintText(t)??"":""}Discount(){var t;return 0===this.I2i?0!==this.PromotionShow?Math.ceil(this.PromotionShow/PayShopDefine_1.DISCOUNT_PERCENT):0!==(t=ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id)).PromotionShow?Math.ceil(t.PromotionShow/PayShopDefine_1.DISCOUNT_PERCENT):Math.ceil(this.GetDiscount()):Math.ceil(this.GetDiscount())}GetPromotionText(){if(0===this.I2i){var t=ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id);if(t.PromotionTimeText)return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsLocalText(t.PromotionTimeText)}return""}GetSellTimeText(){if(0===this.I2i){var t=ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id);if(t.SellTimeText)return ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsLocalText(t.SellTimeText)}return""}IsShowInShop(){if(0===this.I2i){var t=ConfigManager_1.ConfigManager.PayShopConfig.GetPayShopGoodsConfig(this.Id);if(t)return t.Show&&!this.Locked}return!0}IfPayGift(){return 1===this.I2i}GetGiftId(){let t=void 0;var i=ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId);return t=11===i.ItemType?(t=i.Parameters.get(ItemDefines_1.EItemFunctionType.ManualOpenGift))||i.Parameters.get(ItemDefines_1.EItemFunctionType.AutoOpenGift):t}GetRewardItemType(){return ConfigManager_1.ConfigManager.InventoryConfig.GetItemConfigData(this.ItemId).ItemType}}exports.PayShopGoodsData=PayShopGoodsData;
//# sourceMappingURL=PayShopGoodsData.js.map