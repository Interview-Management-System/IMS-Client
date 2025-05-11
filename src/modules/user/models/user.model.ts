import { DepartmentEnum, RoleEnum } from '../../../shared/enums/entity-enums/master-data.enum'
import { PaginatedSearchRequest } from '../../../shared/models/pagination'
import { BaseUserDTO, UserStatus } from './base-user.model'

export interface UserRetrieveDTO extends BaseUserDTO {
    id: string
    role?: string
    userStatus?: UserStatus
}

export interface UserDetailRetrieveDTO extends UserRetrieveDTO {
    departmentId: DepartmentEnum
    department?: string
    gender?: string
}

export interface UserPaginationRetrieveDTO {
    id: string
    role?: string
    email?: string
    isDeleted: boolean
    username?: string
    phoneNumber?: string
    userStatus?: UserStatus
}

export interface UserCreateDTO extends BaseUserDTO {
    roleId: string
    isActive: boolean
    departmentId: DepartmentEnum
}

export interface UserUpdateDTO extends BaseUserDTO {
    id: string
    roleId: string
    isActive: boolean
    departmentId: DepartmentEnum
}

export interface UserPaginatedSearchRequest extends PaginatedSearchRequest {
    roleId?: RoleEnum
}
