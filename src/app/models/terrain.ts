export interface Terrain {
    governorate: string;
    delegation: string;
    surface: string;
    site: string;
    typeCultures: string[];
    moreSpecificity: string;
    //
    plantationDensity: string;
    treeAge: string;
    //
    vegetable: string;
    //
    irrigation: string;
    //
    cattleBreeding: string;
    cattleBreedingType: string;
    cattleBreedingNumber: string;
    //
    fieldCropsWheatTendre: boolean;
    fieldCropsWheatDur: boolean;
    fieldCropsBarley: boolean;
    fieldCropsTriticale: boolean;    
    fieldCropsOther: boolean;
    //
    forageCropsAlfalfa: boolean;
    forageCropsTrefleRay: boolean;
    forageCropsRay_Grass: boolean; 
    forageCropsForageSorghum: boolean;
    forageCropsOther: boolean;
    //
    fruitGrowingOliveTreeTable: boolean;
    fruitGrowingOliveTreeOil: boolean;
    fruitGrowingAlmond: boolean;
    fruitGrowingArgumes: boolean;
    fruitGrowingVineTable: boolean;
    fruitGrowingVineCurve: boolean;
    fruitGrowingApple: boolean;
    fruitGrowingPearTree: boolean;  
    fruitGrowingPeach: boolean;
    fruitGrowingPomegranate: boolean;
    fruitGrowingPistachioTree: boolean;
    fruitGrowingPalmDate: boolean;
    fruitGrowingOther: boolean;
    //
    cucurbitsPasteque: boolean;
    cucurbitsMelon: boolean;
    cucurbitsSquash: boolean;
    cucurbitsZucchini: boolean;
    cucurbitsCucumber: boolean;
    cucurbitsOther: boolean;
    //
    leafyVegetableLettuce: boolean;
    leafyVegetableCelery: boolean;
    leafyVegetableSpinach: boolean;
    leafyVegetableParsley: boolean;
    leafyVegetableSwiss_chard: boolean;
    leafyVegetableOther: boolean;
    //
    marketGardeningPotato: boolean;
    marketGardeningTomato: boolean; 
    marketGardeningChili: boolean;
    marketGardeningOnion: boolean;
    marketGardeningCarrots: boolean;
    marketGardeningGarlic: boolean;
    marketGardeningArcihaut: boolean;
    marketGardeningStrawberry: boolean;
    marketGardeningEggplant: boolean;
    marketGardeningCabbage: boolean;
    marketGardeningOther: boolean;
    //
    AromaticPlantMint: boolean;
    AromaticPlantsCariander: boolean; 
    AromaticPlantsThyme: boolean;
    AromaticPlantsRosemary: boolean;
    AromaticPlantsBasil: boolean;
    AromaticPlantsGeraniul: boolean; 
    AromaticPlantsOther: boolean;
}