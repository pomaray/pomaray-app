import {
	BsLaptop,
	BsCalculator,
	BsBriefcase,
	BsPlug,
	BsLightning,
	BsSnow,
} from "react-icons/bs";

type TECH_ICON = {
	[key: string]: JSX.Element;
};

export const TECH_ICONS: TECH_ICON[] = [
	{ DAAI: <BsLaptop size={60} /> },
	{ GAT: <BsCalculator size={60} /> },
	{ CM: <BsBriefcase size={60} /> },
	{ GAS: <BsBriefcase size={60} /> },
	{ TRO: <BsPlug size={60} /> },
	{ TRI: <BsLightning size={60} /> },
	{ RAE: <BsSnow size={60} /> },
];
