
interface TechObjects {
    title: string;
    experience: number;
}

interface CreateUserParams {
    name?: string;
    email: string;
    password: string | number;
    techs: Array<string | TechObjects>;
    friends: string[];
}

export default function createUser({ name = '', email, password }: CreateUserParams) {
    const user = {
        name,
        email,
        password
    }

    return user;
}