"use client";

import { useState, useEffect, useMemo } from "react";
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
import LOCALE from "@/locales/acceder.json";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [isDisabled, setIsDisabled] = useState(true);
	const [passwordError, setPasswordError] = useState("");
	const [usernameError, setUsernameError] = useState("");
	const [formRequest, setFormRequest] = useState<AuthenticateRequest>({
		password: "",
		username: "",
	});

	const {
		usernameMinLength,
		passwordMinLength,
		error,
		isLoading,
		user,
		setError,
		authenticateUser,
	} = useAuth();

	const router = useRouter();

	const onSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await authenticateUser(formRequest);
		if (user) {
			router.push("/admin");
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setError("");
		setFormRequest((prevData) => ({ ...prevData, [name]: value }));
	};

	useEffect(() => {
		const validateInput = (
			value: string,
			minLength: number,
			errorKey: "USERNAME" | "PASSWORD",
		): boolean => {
			if (value.length < minLength) {
				setInputError(errorKey, LOCALE.ERRORES[errorKey].LONGITUD);
				return false;
			}

			if (!validateString(value)) {
				setInputError(errorKey, LOCALE.ERRORES[errorKey].CARACTERES);
				return false;
			}

			setInputError(errorKey, "");
			return true;
		};

		const setInputError = (key: "USERNAME" | "PASSWORD", value: string) => {
			if (key === "USERNAME") setUsernameError(value);
			if (key === "PASSWORD") setPasswordError(value);
		};

		const validateString = (value: string): boolean => {
			const regex = /^[A-Za-z0-9.,_]+$/;
			return regex.test(value);
		};

		const validUsername = validateInput(
			formRequest.username,
			usernameMinLength,
			"USERNAME",
		);

		const validPassword = validateInput(
			formRequest.password,
			passwordMinLength,
			"PASSWORD",
		);

		setIsDisabled(!(validUsername && validPassword));
	}, [formRequest, usernameMinLength, passwordMinLength]);

	return (
		<main className="grid place-content-center min-h-[90vh]">
			<Card
				shadow="none"
				className="sm:w-[26rem] max-w-[26rem] bg-transparent px-4 min-h-[22rem] shadow-none"
			>
				<CardHeader className="flex flex-col justify-center gap-y-4 sm:py-6">
					<h2 className="sm:text-2xl text-xl font-semibold">Pomaray Admin</h2>
					<p className="sm:text-lg text-md text-center">
						Este formulario es privado, tal vez no puedas acceder.
					</p>
				</CardHeader>

				<CardBody>
					<form onSubmit={onSubmit} className="flex flex-col gap-y-8">
						<Input
							isRequired
							name="username"
							label="Nombre de usuario."
							onInput={onChange}
							errorMessage={usernameError}
							color={usernameError ? "danger" : "default"}
						/>
						<Input
							isRequired
							name="password"
							label="Contraseña."
							onInput={onChange}
							errorMessage={passwordError}
							color={passwordError ? "danger" : "default"}
						/>
						{error && <p className="text-danger">{error}</p>}
						<Button
							isDisabled={isDisabled}
							isLoading={isLoading}
							type="submit"
							color="primary"
						>
							Acceder
						</Button>
					</form>
				</CardBody>
				<CardFooter className="flex flex-col gap-y-6">
					<p className="text-nowrap text-center">
						¿Ya iniciaste la sesión?{" "}
						<Link isDisabled={isLoading} showAnchorIcon href="/admin">
							Si, soy administrador.
						</Link>
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
