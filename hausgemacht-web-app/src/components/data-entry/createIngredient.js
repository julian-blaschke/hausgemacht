import React from "react";
import {
  Form,
  Button,
  Select,
  notification,
  InputNumber,
  AutoComplete
} from "antd";
import { useForm, Controller } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_INGREDIENT } from "../../graphql/mutations";
import { ALL_INGREDIENTS } from "../../graphql/queries";

const { Option } = Select;

const InputLayout = ({ name, input, control }) => (
  <Controller
    name={name}
    style={{ marginTop: "1rem" }}
    as={input}
    control={control}
  ></Controller>
);

export default () => {
  const { control, handleSubmit, setValue } = useForm();
  const [addIngredient] = useMutation(ADD_INGREDIENT);
  const { data } = useQuery(ALL_INGREDIENTS);
  const history = useHistory();
  const { _recipeId } = useParams();
  const onSubmit = async ingredient => {
    try {
      await addIngredient({ variables: { _recipeId, ...ingredient } });
      history.goBack();
    } catch (error) {
      notification.error(error);
    }
  };
  return (
    <Form>
      <InputLayout
        control={control}
        name="title"
        input={
          <AutoComplete
            dataSource={data && data.ingredients.map(({ title }) => title)}
            filterOption={(inputValue, option) =>
              option.props.children
                .toUpperCase()
                .indexOf(inputValue.toUpperCase()) !== -1
            }
            onSelect={value => {
              const { unit } = data.ingredients.find(
                ({ title }) => title === value
              );
              setValue("unit", unit);
            }}
          ></AutoComplete>
        }
      ></InputLayout>
      <InputLayout
        control={control}
        name="unit"
        input={
          <Select placeholder="Einheit">
            <Option value="grams">Gramm</Option>
            <Option value="litres">Liter</Option>
            <Option value="teaspoon">Teelöffel</Option>
            <Option value="tablespoon">Esslöffel</Option>
            <Option value="piece">Stück</Option>
          </Select>
        }
      ></InputLayout>
      <InputLayout
        control={control}
        name="amount"
        input={<InputNumber placeholder="Menge"></InputNumber>}
      ></InputLayout>
      <Button
        type="submit"
        onClick={handleSubmit(onSubmit)}
        style={{ margin: "1rem" }}
      >
        Hinzufügen
      </Button>
    </Form>
  );
};