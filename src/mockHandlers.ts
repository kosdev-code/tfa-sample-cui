import { createHttpResponse, initHandlers } from "@coca-cola/kos-test-utils";

const handlers = {
  "/api/data": (requestId: string) => {
    const body = {
      brands: [
        {
          id: "12",
          name: "Coke Zero",
          beverages: ["1475623", "1475624", "1565594", "1565596"],
        },
        {
          id: "23",
          name: "Fanta Zero",
          beverages: ["1475655", "1475615"],
        },
        {
          id: "68",
          name: "Water Unbranded",
          beverages: ["1477221"],
        },
        {
          id: "47",
          name: "Pibb Xtra",
          beverages: ["1475645", "1590107"],
        },
        {
          id: "48",
          name: "Pibb Zero",
          beverages: ["1475646", "1590108"],
        },
        {
          id: "16",
          name: "Diet Coke",
          beverages: ["1475627", "1475629", "1733012", "1475628"],
        },
        {
          id: "18",
          name: "Dr Pepper",
          beverages: ["1522597", "1582394"],
        },
        {
          id: "19",
          name: "Dr Pepper Diet",
          beverages: ["1522598", "1582395"],
        },
        {
          id: "4",
          name: "Barqs",
          beverages: ["1475644"],
        },
        {
          id: "5",
          name: "Barqs Diet",
          beverages: ["1475691"],
        },
        {
          id: "159",
          name: "AHA",
          beverages: ["1574019", "1597843"],
        },
        {
          id: "91",
          name: "Minute Maid Sparkling",
          beverages: ["1866615", "1866616"],
        },
        {
          id: "41",
          name: "Minute Maid Drinks Light",
          beverages: ["1816618"],
        },
        {
          id: "42",
          name: "Minute Maid Lemonade",
          beverages: ["1475662", "1475663", "1748096", "1475664"],
        },
        {
          id: "20",
          name: "Fanta",
          beverages: ["1475647", "1475650"],
        },
        {
          id: "64",
          name: "Sprite",
          beverages: ["1475637", "1482850", "1565598", "2097498"],
        },
        {
          id: "10",
          name: "Coca-Cola",
          beverages: ["1475622", "1475620", "1624920", "1475619"],
        },
        {
          id: "65",
          name: "Sprite Zero",
          beverages: ["1475638", "1475639", "1565600", "2097499"],
        },
        {
          id: "43",
          name: "Minute Maid Lemonade Light",
          beverages: ["1475666", "1475667", "1748099", "1475668"],
        },
      ],
      beverages: [
        {
          id: "1475623",
          name: "Coke Zero",
          icon: "/assets/Coke_ZeroSugar_Parent.v1.143x143.png",
          available: false,
        },
        {
          id: "1475624",
          name: "Coke Zero Cherry",
          icon: "/assets/Coke_ZeroSugar_Child.v1.143x143.png",
          available: true,
        },
        {
          id: "1565594",
          name: "Coke Zero Lemon",
          icon: "/assets/Coke_ZeroSugar_Child.v1.143x143.png",
          available: true,
        },
        {
          id: "1565596",
          name: "Coke Zero Orange",
          icon: "/assets/Coke_ZeroSugar_Child.v1.143x143.png",
          available: true,
        },
        {
          id: "1475655",
          name: "Fanta Zero Cherry",
          icon: "/assets/f9k_FantaZero_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475615",
          name: "Fanta Zero Orange",
          icon: "/assets/f9k_FantaZero_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1477221",
          name: "Water - Plain Water",
          icon: "/assets/water button_256px.v1.256x256.png",
          available: true,
        },
        {
          id: "1475645",
          name: "Pibb Xtra",
          icon: "/assets/f9k_PibbXtra_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1590107",
          name: "Pibb Xtra Cherry",
          icon: "/assets/f9k_PibbXtra_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475646",
          name: "Pibb Zero",
          icon: "/assets/f9k_PibbZero_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1590108",
          name: "Pibb Zero Cherry",
          icon: "/assets/f9k_PibbZero_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475627",
          name: "Diet Coke",
          icon: "/assets/Diet Coke - Parent.v1.256x256.png",
          available: true,
        },
        {
          id: "1475629",
          name: "Diet Coke Cherry",
          icon: "/assets/f9k_DietCoke_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1733012",
          name: "Diet Coke Lemon",
          icon: "/assets/f9k_DietCoke_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475628",
          name: "Diet Coke Orange",
          icon: "/assets/f9k_DietCoke_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1522597",
          name: "Dr Pepper",
          icon: "/assets/f9k_DrPepper_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1582394",
          name: "Dr Pepper Cherry",
          icon: "/assets/f9k_DrPepper_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1522598",
          name: "Dr Pepper Zero",
          icon: "/assets/f9k_DrPepperDiet_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1582395",
          name: "Dr Pepper Zero Cherry",
          icon: "/assets/f9k_DrPepperDiet_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475644",
          name: "Barqs",
          icon: "/assets/f9k_BarqsRootBeer_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475691",
          name: "Barqs Diet",
          icon: "/assets/f9k_BarqsRootBeerDiet_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1574019",
          name: "AHA Sparkling Lemon Lime",
          icon: "/assets/AHA_LemonLime_Child.v1.143x143.png",
          available: true,
        },
        {
          id: "1597843",
          name: "AHA Sparkling Water",
          icon: "/assets/AHASparkling_Unflavored_Child.v1.143x143.png",
          available: true,
        },
        {
          id: "1866615",
          name: "Minute Maid Sparkling Lemonade",
          icon: "/assets/f9k_MinuteMaidSparkling_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1866616",
          name: "Minute Maid Sparkling Pink Lemonade",
          icon: "/assets/f9k_MinuteMaidSparkling_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1816618",
          name: "Minute Maid Drinks Light Orange",
          icon: "/assets/f9k_MinuteMaidDrinksLight_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475662",
          name: "Minute Maid Lemonade",
          icon: "/assets/f9k_MinuteMaidLemonade_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475663",
          name: "Minute Maid Lemonade Orange",
          icon: "/assets/f9k_MinuteMaidLemonade_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1748096",
          name: "Minute Maid Lemonade Pink",
          icon: "/assets/f9k_MinuteMaidLemonade_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475664",
          name: "Minute Maid Lemonade Cherry",
          icon: "/assets/f9k_MinuteMaidLemonade_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475647",
          name: "Fanta Cherry",
          icon: "/assets/f9k_Fanta_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475650",
          name: "Fanta Orange",
          icon: "/assets/f9k_Fanta_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475637",
          name: "Sprite",
          icon: "/assets/f9k_Sprite_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1482850",
          name: "Sprite Cherry",
          icon: "/assets/f9k_Sprite_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1565598",
          name: "Sprite Orange",
          icon: "/assets/f9k_Sprite_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "2097498",
          name: "Sprite Lymonade V2",
          icon: "/assets/f9k_SpriteLymonade_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475622",
          name: "Coca-Cola",
          icon: "/assets/f9k_Coca-Cola_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475620",
          name: "Coca-Cola Cherry",
          icon: "/assets/f9k_Coca-Cola_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1624920",
          name: "Coca-Cola Lemon",
          icon: "/assets/f9k_Coca-Cola_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475619",
          name: "Coca-Cola Orange",
          icon: "/assets/f9k_Coca-Cola_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475638",
          name: "Sprite Zero",
          icon: "/assets/f9k_SpriteZero_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475639",
          name: "Sprite Zero Cherry",
          icon: "/assets/f9k_SpriteZero_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1565600",
          name: "Sprite Zero Orange",
          icon: "/assets/f9k_SpriteZero_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "2097499",
          name: "Sprite Zero Lymonade V2",
          icon: "/assets/f9k_SpriteZeroLymonade_Parent_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475666",
          name: "Minute Maid Lemonade Light",
          icon: "/assets/f9k_MinuteMaidLemonadeLight_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475667",
          name: "Minute Maid Lemonade Light Orange",
          icon: "/assets/f9k_MinuteMaidLemonadeLight_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1748099",
          name: "Minute Maid Lemonade Light Pink",
          icon: "/assets/f9k_MinuteMaidLemonadeLight_Child_fos.v1.143x143.png",
          available: true,
        },
        {
          id: "1475668",
          name: "Minute Maid Lemonade Light Cherry",
          icon: "/assets/f9k_MinuteMaidLemonadeLight_Child_fos.v1.143x143.png",
          available: true,
        },
      ],
    };
    const response = createHttpResponse({
      body,
      headers: { "response-id": requestId },
    });
    return response;
  },
};

initHandlers(handlers, true);
