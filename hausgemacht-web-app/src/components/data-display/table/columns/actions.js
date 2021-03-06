import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { Button, notification } from "antd";
import { DELETE_INGREDIENT } from "../../../../graphql/mutations";
import { useParams } from "react-router-dom";
import { RECIPE } from "../../../../graphql/queries";

export const IngredientActions = ({ _id }) => {
  const [deleteIngredient] = useMutation(DELETE_INGREDIENT, {
    onError: notification.error
  });
  const { _recipeId } = useParams();
  return (
    <Button
      type="link"
      onClick={() => {
        deleteIngredient({
          variables: { _id, _recipeId },
          update: cache => {
            let {
              recipe: [first]
            } = cache.readQuery({
              query: RECIPE,
              variables: { _id: _recipeId }
            });
            //update cache
            cache.writeQuery({
              query: RECIPE,
              variables: { _id: _recipeId },
              data: {
                recipe: [
                  {
                    ...first,
                    ...{
                      ingredients: first.ingredients.filter(i => i._id !== _id)
                    }
                  }
                ]
              }
            });
          }
        });
      }}
    >
      Löschen
    </Button>
  );
};
