import { DepartmentEnum, RoleEnum } from '../../../shared/enums/entity-enums/master-data.enum'
import { PaginatedSearchRequest } from '../../../shared/models/pagination'
import { BaseUserDTO, UserStatus } from './base-user.model'

export interface UserForRetrieveDTO extends BaseUserDTO {
    id: string
    role?: string
    userStatus?: UserStatus
}

export interface UserForDetailRetrieveDTO extends UserForRetrieveDTO {
    departmentId: DepartmentEnum
    department?: string
    gender?: string
}

export interface UserForPaginationRetrieveDTO {
    id: string
    role?: string
    email?: string
    isDeleted: boolean
    username?: string
    phoneNumber?: string
    userStatus?: UserStatus
}

export interface UserForCreateDTO extends BaseUserDTO {
    roleId: string
    isActive: boolean
    departmentId: DepartmentEnum
}

export interface UserForUpdateDTO extends BaseUserDTO {
    id: string
    roleId: string
    isActive: boolean
    departmentId: DepartmentEnum
}

export interface UserPaginatedSearchRequest extends PaginatedSearchRequest {
    roleId?: RoleEnum
}
