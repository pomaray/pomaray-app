enum Sex {
    MALE = "Male",
    FEMALE = "Female",
}

enum Role {
    LECTOR = 0,
    ADMIN = 1,
    SUPER_ADMIN = 2,
}

export type User = {
    id: string
    display_name: string;
    username: string;
    sex: Sex;
    role: Role;
    password: string;
}

