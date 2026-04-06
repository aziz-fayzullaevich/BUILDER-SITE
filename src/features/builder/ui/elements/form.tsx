import { TextInput } from "@mantine/core";
import { type FormElement as IForm } from "../../types/builder-types";

export const FormElement = ({ id, style, props }: IForm) => {
    return (
        <TextInput
            id={id}
            placeholder={props?.placeholder || "Введите текст..."}
            style={{
                ...style,
                width: '100%'
            }}
            styles={{
                input: {
                    backgroundColor: 'transparent',
                    color: 'inherit',
                    fontSize: 'inherit',
                    fontWeight: 'inherit',
                    padding: 'inherit'
                }
            }}
            readOnly
        />
    );
};