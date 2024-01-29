import {
	BsLaptop,
	BsCalculator,
	BsBriefcase,
	BsPlug,
	BsLightning,
	BsSnow,
} from "react-icons/bs";

type TechIcon = {
	[key: string]: JSX.Element;
};

export const TechIcons: TechIcon[] = [
	{ DAAI: <BsLaptop size={60} /> },
	{ GAT: <BsCalculator size={60} /> },
	{ CM: <BsBriefcase size={60} /> },
	{ GAS: <BsBriefcase size={60} /> },
	{ TRO: <BsPlug size={60} /> },
	{ TRI: <BsLightning size={60} /> },
	{ RAE: <BsSnow size={60} /> },
];
