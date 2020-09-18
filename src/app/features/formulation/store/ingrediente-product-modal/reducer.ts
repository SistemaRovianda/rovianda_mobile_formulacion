import { createReducer, on } from "@ngrx/store";
import { SAVE_ALL_INGREDIENTS_AVAIALBLE } from "./actions";

export interface ingredientsOfProductRoviandaModal {
  productId: number;
  description: string;
  checked: boolean;
  original: boolean;
}

let initialValue: ingredientsOfProductRoviandaModal[] = [];

export const ingredientsProductRoviandaModalReducer = createReducer<
  ingredientsOfProductRoviandaModal[]
>(
  initialValue,
  on(
    SAVE_ALL_INGREDIENTS_AVAIALBLE,
    (state, { products, ingredientsOriginal }) => {
      let idsToMark = ingredientsOriginal.map((x) => x.productId);

      let ingredientsMapped: ingredientsOfProductRoviandaModal[] = products.map(
        (x) => {
          return {
            productId: x.id,
            description: x.description,
            checked: false,
            original: false,
          };
        }
      );
      // if(state.length){
      //     let currentIdsOfModal = ingredientsMapped.map(x=>x.productId);
      //     for(let ingredient of state){
      //         if(!currentIdsOfModal.includes(ingredient.productId)){
      //             ingredientsMapped.push({
      //                 productId:ingredient.productId,
      //                 description:ingredient.description,
      //                 checked: false,
      //                 original:false
      //             });
      //         }
      //     }
      // }

      return [...ingredientsMapped];
    }
  )
);
