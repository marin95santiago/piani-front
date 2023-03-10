import { User } from "../../schemas/User";

export default function userMapper(user: any | unknown): User {
  return {
    id: user.id ?? '',
    username: user.username ?? '',
    password: user.password ?? '',
    name: user.name ?? '',
    lastname: user.lastname ?? '',
    dni: user.dni ?? 0,
    cuil: user.cuil ?? '',
    birthday: user.birthday ?? null,
    address: user.address ?? null,
    position: {
      code: user.position.code ?? '',
      description: user.position.description ?? ''
    },
    startDate: user.startDate ?? '',
    phone: user.phone ?? null,
    email: user.email ?? null,
    state: user.state ?? '',
    permissions: user.permissions ?? [''],
    token: user.token ?? ''
  }
}

export function addressMapper(data: any) {
  return {
    street: data.street ?? '',
    number: data.number ?? 0,
    floor: data.floor ?? '',
    department: data.department ?? '',
    province: {
      code: data.province.code ?? '',
      description: data.province.description ?? ''
    },
    country: {
      code: data.country.code ?? '',
      description: data.country.description ?? ''
    }
  }
}
