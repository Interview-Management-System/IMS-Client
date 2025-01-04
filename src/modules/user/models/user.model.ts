import { DepartmentEnum, RoleEnum } from '../../../shared/enums/entity-enums/master-data.enum'
import { PaginatedSearchRequest } from '../../../shared/models/pagination'

interface BaseUserDTO {
    username?: string
    email: string
    dob: Date
    address?: string
    phoneNumber?: string
    gender: boolean
    roleId: string // Guid is typically represented as a string in TypeScript
    createdBy: string // Guid
    departmentId: DepartmentEnum
    isActive: boolean
    note?: string
}

export interface UserForRetrieveDTO {
    id: string
    username?: string
    email?: string
    dob: Date
    address?: string
    phoneNumber?: string
    gender?: string
    role?: string
    departmentId: DepartmentEnum
    department?: string
    status?: string
    isDeleted: boolean
    note?: string
}

export interface UserForCreateDTO {
    username?: string
    email: string
    dob: Date
    address?: string
    phoneNumber?: string
    gender: boolean
    roleId: string // Assuming Guid is represented as string in TypeScript
    createdBy: string // Assuming Guid is represented as string in TypeScript
    departmentId: DepartmentEnum
    isActive: boolean
    note?: string
}

export interface UserForUpdateDTO extends UserForCreateDTO {
    id: string
}

export interface UserPaginatedSearchRequest extends PaginatedSearchRequest {
    roleId?: RoleEnum
}
