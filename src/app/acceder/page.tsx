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
import { EyeFilledIcon, EyeSlashFilledIcon } from "@nextui-org/shared-icons";
import useAuth, { AuthenticateRequest } from "@/hooks/useAuth";
import i18n from "@/locales/acceder.json";
import { useRouter } from "next/navigation";

export default function LoginPage() {
	const [isShowPassword, setIsShowPassword] = useState(false);
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

		const result = await authenticateUser(formRequest);
		if (result) router.push("/admin");
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
				setInputError(errorKey, i18n.ERRORS[errorKey].LENGTH);
				return false;
			}

			if (!validateString(value)) {
				setInputError(errorKey, i18n.ERRORS[errorKey].CHARACTERS);
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
			const regex = /^[A-Za-z0-9.,_@#]+$/;
			const disallowedChars = /[${}]/;

			return regex.test(value) && !disallowedChars.test(value);
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
					<h2 className="sm:text-2xl text-xl font-semibold">
						{i18n.FORM.TITLE}
					</h2>
					<p className="sm:text-lg text-md text-center">
						{i18n.FORM.DESCRIPTION}
					</p>
				</CardHeader>

				<CardBody>
					<form onSubmit={onSubmit} className="flex flex-col gap-y-8">
						<Input
							isRequired
							name="username"
							label={i18n.FORM.USERNAME}
							onInput={onChange}
							errorMessage={usernameError}
						/>
						<Input
							isRequired
							name="password"
							type={isShowPassword ? "password" : "text"}
							label={i18n.FORM.PASSWORD}
							onInput={onChange}
							errorMessage={passwordError}
							endContent={
								<Button
									isIconOnly
									variant="light"
									className="relative top-1 text-lg text-foreground-500"
									onClick={() => setIsShowPassword(!isShowPassword)}
								>
									{isShowPassword ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
								</Button>
							}
						/>
						{error && <p className="text-danger text-center">{error}</p>}
						<Button
							isDisabled={isDisabled}
							isLoading={isLoading}
							type="submit"
							color="primary"
						>
							{i18n.FORM.ACCESS_BTN}
						</Button>
					</form>
				</CardBody>
				<CardFooter className="flex flex-col gap-y-6">
					<p className="text-center">
						{i18n.FORM.ALREADY_HAVE}{" "}
						<Link isDisabled={isLoading} showAnchorIcon href="/admin">
							{i18n.FORM.ALREADY_HAVE_ACCESS}
						</Link>
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
