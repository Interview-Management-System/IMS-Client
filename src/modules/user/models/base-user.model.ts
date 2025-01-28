import { DepartmentEnum } from '../../../shared/enums/entity-enums/master-data.enum'

export interface BaseUserDTO {
    username?: string
    email?: string
    dob?: Date
    address?: string
    phoneNumber?: string
    gender?: boolean
    roleId?: string
    createdBy?: string
    departmentId?: DepartmentEnum
    isActive?: boolean
    note?: string
}
