"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Input,
	Button,
	Link,
} from "@nextui-org/react";
import useAuth, { AuthenticateRequest } from "@/hooks/useAuth";

export default function LoginPage() {
	const [isDisabled, setIsDisabled] = useState(true);
	const [formRequest, setFormRequest] = useState<AuthenticateRequest>({
		password: "",
		username: "",
	});
	const {
		isLoading,

		checkToken,
		authenticateUser,
	} = useAuth();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setFormRequest((prevData) => ({ ...prevData, [name]: value }));
	};

	useEffect(() => {
		const valid =
			formRequest.username.length > 1 && formRequest.password.length > 8;
		setIsDisabled(!valid);
	}, [formRequest]);

	return (
		<main className="grid place-content-center min-h-[90vh]">
			<Card className="bg-transparent py-5 px-4 min-h-[22rem] max-w-[26rem] sm:w-[26rem]">
				<CardHeader className="flex flex-col justify-center gap-y-4 sm:py-10">
					<h2 className="sm:text-2xl text-xl font-semibold">Pomaray Admin</h2>
					<p className="sm:text-lg text-md text-center">
						Este formulario es privado, tal vez no puedas acceder.
					</p>
				</CardHeader>

				<CardBody>
					<form className="flex flex-col gap-y-8">
						<Input
							onInput={handleChange}
							isRequired
							name="username"
							label="Nombre de usuario"
						/>
						<Input
							name="password"
							onInput={handleChange}
							isRequired
							label="Contraseña"
						/>
						<Button isDisabled={isDisabled} color="primary">
							Acceder
						</Button>
					</form>
				</CardBody>
				<CardFooter>
					<p className="w-full text-center">
						Ya inciaste seccion?{" "}
						<Link showAnchorIcon href="/admin">
							Ir a Admin.
						</Link>
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
