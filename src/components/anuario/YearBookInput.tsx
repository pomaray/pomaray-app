import useYearBook from "@/hooks/useYearBook";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

interface AutocompleteValue {
	key: number;
	value: string;
}

interface YearkBookInputProps {
	label?: string;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	values: Array<any>;

	startContent?: JSX.Element;
	onChange?: (value?: string) => void;
}

export function YearkBookInput({
	label = "Selecciona",
	values,

	startContent,
	onChange,
}: YearkBookInputProps) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const getObjects = (array: any[]): AutocompleteValue[] => {
		const objectArray: AutocompleteValue[] = [];
		for (let index = 0; index < array.length; index++) {
			const object = {
				key: index,
				value: String(array[index]),
			};
			objectArray.push(object);
		}

		return objectArray;
	};

	const { error, isLoading } = useYearBook();

	return (
		<Autocomplete
			size="sm"
			label={values.length > 0 ? label : "Sin resultados."}
			onSelectionChange={(key) => {
				if (onChange) onChange(key?.toString());
				return;
			}}
			isLoading={isLoading}
			defaultItems={getObjects(values)}
			isDisabled={values.length < 1 || !!error}
			className="col-span-1"
		>
			{(value) => (
				<AutocompleteItem startContent={startContent} key={value.key}>
					{value.value}
				</AutocompleteItem>
			)}
		</Autocomplete>
	);
}
