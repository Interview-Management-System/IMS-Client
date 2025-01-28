import { DepartmentEnum, RoleEnum } from '../../../shared/enums/entity-enums/master-data.enum'
import { PaginatedSearchRequest } from '../../../shared/models/pagination'
import { BaseUserDTO } from './base-user.model'

export interface UserForRetrieveDTO {
    id: string
    username?: string
    email?: string
    dob: Date
    address?: string
    phoneNumber?: string
    gender?: string
    role?: string
    departmentId?: DepartmentEnum
    department?: string
    isActive?: boolean
    statusText?: string
    isDeleted: boolean
    note?: string
}

export interface UserForCreateDTO extends BaseUserDTO {}

export interface UserForUpdateDTO extends BaseUserDTO {
    id: string
}

export interface UserPaginatedSearchRequest extends PaginatedSearchRequest {
    roleId?: RoleEnum
}
