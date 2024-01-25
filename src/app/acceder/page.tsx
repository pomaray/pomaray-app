"use client";

import {
    useState,
    useEffect
} from "react";

import {
    Card,
    CardBody,
    CardFooter,
    CardHeader,

    Input,
    Button,
} from "@nextui-org/react";
import useAuth from "@/hooks/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({ username: "", password: "" });

    const {
        loading,
        authenticateUser,
        checkToken
    } = useAuth()

    const router = useRouter();
    const isValidEmail = formData.username.trim().length > 2;
    const isValidPassword = formData.password.trim().length > 8;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const redirect = await authenticateUser(formData.username, formData.password)
            // if (redirect) router.push("/admin")
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            }
        }
    };

    useEffect(() => {
        if (isValidEmail && isValidPassword) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [isValidEmail, isValidPassword]);

    return (
        <main className="grid place-content-center min-h-[90vh]">
            <form onSubmit={handleSubmit} className="relative -top-24">
                <Card className="relative min-h-[22rem] shadow-none bg-transparent max-w-[26rem] sm:w-[26rem] py-5 px-4">
                    <CardHeader className="flex flex-col justify-center gap-y-4 sm:py-10">
                        <h2 className="sm:text-2xl text-xl font-semibold">Pomaray Admin</h2>
                        <p className="sm:text-lg text-md text-center">Este formulario es privado,
                            talvez no puedas acceder.</p>
                    </CardHeader>
                    <CardBody className="flex flex-col justify-center gap-y-8">
                        <Input
                            isInvalid={formData.username.trim() !== "" ?
                                !isValidEmail : false} isRequired
                            label="Nombre de usuario"
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            errorMessage={
                                formData.username.trim() !== "" ?
                                    !isValidEmail
                                    && "Correo electrónico invalido, debe contener '@' y al menos un '.'"
                                    : ""
                            }
                        />
                        <Input
                            isRequired
                            isInvalid={formData.password.trim() !== "" ?
                                !isValidPassword : false}
                            label="Contraseña"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            errorMessage={
                                formData.password.trim() !== "" ?
                                    !isValidPassword
                                    && "La contraseña debe tener más de 8 carácteres-"
                                    : ""
                            }
                        />
                    </CardBody>
                    <CardFooter className="flex flex-col justify-center gap-6">
                        {errorMessage && (
                            <Card className="bg-danger text-white w-full px-6 py-2 border-none shadow-none">
                                <p>{errorMessage}.</p>
                            </Card>
                        )}
                        <Button
                            size="lg"
                            isDisabled={!formValid}
                            isLoading={loading}
                            type="submit"
                            className="w-full"
                            color="primary">
                            Acceder
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </main>
    );
}
